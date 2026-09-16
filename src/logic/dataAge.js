// "Bu veriler yeni mi girdiklerim, yoksa eski verim mi?"
//
// Kayıt kimlikleri `tur_<zaman36>_<rastgele>` biçiminde üretilir (bkz.
// JournalContext'teki uid). Ortadaki parça, kaydın OLUŞTURULDUĞU anın
// base36 hâlidir. Yani her seyahat/durak/keşif/harcama kendi giriliş
// zamanını taşıyor; yedekten geri yüklenen kayıtlar da kimliğini
// koruduğu için bu zaman değişmez.
//
// Not: keşif/harcamalardaki `date` alanı KULLANICININ girdiği gezi tarihidir,
// veri girişi zamanı değildir. Bu yüzden burada yalnızca kimlikten okunan
// zamana bakılır.

const MIN_MS = Date.UTC(2020, 0, 1);

// 'disc_m1abc23_x9f2' -> ms (çözülemezse null)
export function idTime(id) {
  if (typeof id !== 'string') return null;
  const parts = id.split('_');
  if (parts.length < 2) return null;
  const ms = parseInt(parts[1], 36);
  if (!isFinite(ms) || ms < MIN_MS || ms > Date.now() + 86400000) return null;
  return ms;
}

function collectIds(trip) {
  const ids = [trip.id];
  (trip.stops || []).forEach((x) => ids.push(x.id));
  (trip.discoveries || []).forEach((x) => ids.push(x.id));
  (trip.expenses || []).forEach((x) => ids.push(x.id));
  (trip.dayNotes || []).forEach((x) => ids.push(x.id));
  (trip.plan || []).forEach((x) => ids.push(x.id));
  return ids;
}

// Bir seyahatin yaş bilgisi.
// -> { created, first, last, known, unknown, counts }
export function tripAge(trip) {
  const times = collectIds(trip).map(idTime);
  const known = times.filter((v) => v != null);
  known.sort((a, b) => a - b);
  return {
    created: idTime(trip.id),
    first: known.length ? known[0] : null,
    last: known.length ? known[known.length - 1] : null,
    known: known.length,
    unknown: times.length - known.length,
    counts: {
      stops: (trip.stops || []).length,
      discoveries: (trip.discoveries || []).length,
      expenses: (trip.expenses || []).length,
      dayNotes: (trip.dayNotes || []).length,
    },
  };
}

// Tüm veri bugün mü girildi, yoksa eski kayıtlar da var mı?
// -> { newestDay, oldestDay, hasOld, todayCount, oldCount }
export function ageSummary(trips, now = Date.now()) {
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  let todayCount = 0;
  let oldCount = 0;
  let oldest = null;
  let newest = null;
  (trips || []).forEach((trip) => {
    collectIds(trip).forEach((id) => {
      const ms = idTime(id);
      if (ms == null) return;
      if (ms >= startOfToday.getTime()) todayCount += 1;
      else oldCount += 1;
      if (oldest == null || ms < oldest) oldest = ms;
      if (newest == null || ms > newest) newest = ms;
    });
  });
  return { todayCount, oldCount, oldest, newest, hasOld: oldCount > 0 };
}
