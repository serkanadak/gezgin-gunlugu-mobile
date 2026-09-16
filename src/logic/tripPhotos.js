// Fotoğrafları seyahat verisinden AYIRIP ayrı kayıtlara taşıma mantığı.
//
// NEDEN?
// Eskiden her fotoğrafın base64 hâli seyahat verisiyle aynı tek JSON'un
// içindeydi. Bir onay kutusunu işaretlemek bile 35 MB'lık metnin baştan
// üretilip (ölçüm: ~1,3 sn ana iş parçacığı kilitli) yeniden yazılması
// demekti; tek bir yazma hatası da bütün günlüğü riske atıyordu.
//
// Artık kayıtta fotoğrafın yerine kısa bir REFERANS durur ("ph:ph_ab12"),
// fotoğrafın kendisi ayrı bir kayıtta yaşar. Yazılan JSON kilobayt boyutuna
// düşer; fotoğraf kayıtları yalnızca eklendiklerinde bir kez yazılır.
//
// Bellekteki (React durumundaki) biçim DEĞİŞMEZ: yükleme sırasında
// referanslar yeniden data URI'ye çevrilir. Böylece ekran kodlarının hiçbiri
// değişmek zorunda kalmaz — kapak/büyük fotoğraf seçimleri de metin
// eşitliğiyle çalışmaya devam eder.

export const REF_PREFIX = 'ph:';

export function isRef(v) {
  return typeof v === 'string' && v.startsWith(REF_PREFIX);
}

// Saklanabilir bir fotoğraf değeri mi? (data URI ya da dosya/blob adresi)
export function isPhotoValue(v) {
  return typeof v === 'string' && v.length > 0 && !isRef(v);
}

let seq = 0;
export function newPhotoId() {
  seq += 1;
  return `${REF_PREFIX}ph_${Date.now().toString(36)}_${seq}_${Math.random().toString(36).slice(2, 6)}`;
}

// Bir seyahatteki fotoğraf taşıyan tüm alanlar tek yerde tanımlı olsun ki
// yeni bir alan eklendiğinde burayı güncellemek yeterli olsun.
//   trip.coverPhoto
//   trip.discoveries[].photos[] / .photoUri / .featuredPhotos[] / .featuredPhoto
//   trip.expenses[].receiptPhoto
function mapTripPhotos(trip, fn) {
  const single = (v) => (isPhotoValue(v) || isRef(v) ? fn(v) : v);
  const list = (arr) => (Array.isArray(arr) ? arr.map(single).filter((v) => v != null) : arr);
  return {
    ...trip,
    coverPhoto: single(trip.coverPhoto) || null,
    discoveries: (trip.discoveries || []).map((d) => ({
      ...d,
      photos: list(d.photos),
      photoUri: single(d.photoUri) || null,
      featuredPhotos: list(d.featuredPhotos),
      featuredPhoto: single(d.featuredPhoto) || null,
    })),
    expenses: (trip.expenses || []).map((e) => ({ ...e, receiptPhoto: single(e.receiptPhoto) || null })),
  };
}

// Kayda yazılacak "ince" hâli üretir.
//
// uriToRef: daha önce KAYDEDİLMİŞ fotoğrafların referanslarını bilen Map.
// Yeni fotoğraflara yeni kimlik atanır, `toWrite`'a ve `assigned`'a girer.
//
// DİKKAT: uriToRef burada DEĞİŞTİRİLMEZ. Yeni atamalar yalnızca fotoğraflar
// gerçekten yazıldıktan sonra `commitAssigned` ile işlenir. Eskiden atama
// hemen yapılıyordu; fotoğraf yazımı başarısız olunca (ör. kota dolu) ikinci
// denemede "bu fotoğrafın referansı var" sanılıp REFERANSI OLAN AMA GÖRÜNTÜSÜ
// OLMAYAN kayıt yazılıyordu. Bu, testte yakalandı.
//
// -> { trips, toWrite: [{ id, uri }], refs: Set, assigned: Map }
export function extractPhotos(trips, uriToRef) {
  const toWrite = [];
  const refs = new Set();
  const assigned = new Map();
  const slim = (trips || []).map((trip) =>
    mapTripPhotos(trip, (v) => {
      if (isRef(v)) {
        refs.add(v);
        return v;
      }
      let id = uriToRef.get(v) || assigned.get(v);
      if (!id) {
        id = newPhotoId();
        assigned.set(v, id);
        toWrite.push({ id, uri: v });
      }
      refs.add(id);
      return id;
    })
  );
  return { trips: slim, toWrite, refs, assigned };
}

// Fotoğraflar başarıyla yazıldıktan SONRA çağrılır.
export function commitAssigned(uriToRef, assigned) {
  assigned.forEach((id, uri) => uriToRef.set(uri, id));
}

// Kayıttaki referansları tekrar data URI'ye çevirir (bellekteki biçim).
// Çözülemeyen referans varsa fotoğraf atlanır ve `missing` sayısı artar —
// böylece sessiz bozulma yerine sayılabilir bir durum oluşur.
export function inlinePhotos(trips, byId) {
  let missing = 0;
  const full = (trips || []).map((trip) =>
    mapTripPhotos(trip, (v) => {
      if (!isRef(v)) return v;
      const uri = byId.get(v);
      if (!uri) {
        missing += 1;
        return null;
      }
      return uri;
    })
  );
  return { trips: full, missing };
}

// Kayıttaki tüm referansları toplar (yükleme sırasında hangi fotoğrafların
// okunacağını ve artık kullanılmayanların hangileri olduğunu bulmak için).
export function collectRefs(trips) {
  const refs = new Set();
  (trips || []).forEach((trip) =>
    mapTripPhotos(trip, (v) => {
      if (isRef(v)) refs.add(v);
      return v;
    })
  );
  return refs;
}

// Veri "zenginliği": kaç seyahat, keşif, harcama, program maddesi, not var.
// Bir yazmanın kazara BÜYÜK veri kaybına yol açıp açmadığını anlamak için.
export function richness(trips) {
  const r = { trips: 0, stops: 0, discoveries: 0, expenses: 0, plan: 0, dayNotes: 0, photos: 0 };
  (trips || []).forEach((t) => {
    r.trips += 1;
    r.stops += (t.stops || []).length;
    r.discoveries += (t.discoveries || []).length;
    r.expenses += (t.expenses || []).length;
    r.plan += (t.plan || []).length;
    r.dayNotes += (t.dayNotes || []).length;
    (t.discoveries || []).forEach((d) => {
      r.photos += (d.photos || []).length + (d.photoUri ? 1 : 0);
    });
    (t.expenses || []).forEach((e) => {
      if (e.receiptPhoto) r.photos += 1;
    });
  });
  return r;
}

// Yazılacak veri, depodakine göre CİDDİ kayıp içeriyor mu?
// Kullanıcı elle silme yapmış olabileceği için küçük farklar sorun değildir;
// burada aranan, bir kayıt türünün TAMAMEN yok olması gibi ağır kayıplardır.
export function looksLikeDataLoss(stored, next) {
  const keys = ['trips', 'discoveries', 'expenses', 'plan', 'dayNotes', 'photos'];
  return keys.some((k) => stored[k] > 0 && next[k] === 0 && stored[k] >= 2);
}

// Kayıtta hiç fotoğraf gömülü kalmış mı? (göç gerekiyor mu?)
export function hasInlinePhotos(trips) {
  let found = false;
  (trips || []).forEach((trip) =>
    mapTripPhotos(trip, (v) => {
      if (isPhotoValue(v)) found = true;
      return v;
    })
  );
  return found;
}
