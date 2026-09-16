// Yedekleme / taşıma dosyası.
//
// NEDEN GEREKLİ?
// Tarayıcı verisi ORİJİN + BAĞLAM başına ayrı tutulur. Site ana ekrana
// eklenip oradan açıldığında (standalone) iOS bunu ayrı bir depolama alanı
// gibi ele alabiliyor: Safari sekmesindeki seyahatler yeni uygulamada
// görünmez. Veri SİLİNMEZ, sadece öbür alanda kalır. Bu yüzden verinin tek
// bir dosyaya alınıp diğer tarafta geri yüklenmesi gerekiyor.
//
// Dosya KENDİ KENDİNE YETERLİ: fotoğraflar da (data URI olarak) içindedir,
// çünkü bellekteki biçimde fotoğraflar zaten çözülmüş hâlde durur.

export const BACKUP_APP = 'gezgin-gunlugu';
export const BACKUP_FORMAT = 1;

export function buildBackup(trips, settings) {
  return JSON.stringify({
    app: BACKUP_APP,
    formatVersion: BACKUP_FORMAT,
    exportedAt: new Date().toISOString(),
    trips: trips || [],
    settings: settings || {},
  });
}

export function backupFileName(now = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `gezgin-gunlugu-yedek-${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}.json`;
}

// Dosyayı doğrular. Hatalıysa açıklayıcı bir Error atar (kullanıcıya gösterilir).
// -> { trips, settings, exportedAt }
export function parseBackup(text, msg) {
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    throw new Error(msg.notJson);
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error(msg.notBackup);
  if (data.app && data.app !== BACKUP_APP) throw new Error(msg.otherApp);
  if (!Array.isArray(data.trips)) throw new Error(msg.notBackup);
  // Seyahatlerin en azından kimliği olmalı; olmayanlara kimlik üretilir ki
  // birleştirme sırasında birbirini ezmesinler.
  const trips = data.trips
    .filter((t) => t && typeof t === 'object')
    .map((t, i) => (t.id ? t : { ...t, id: `imp_${Date.now().toString(36)}_${i}` }));
  if (!trips.length) throw new Error(msg.empty);
  return { trips, settings: data.settings && typeof data.settings === 'object' ? data.settings : {}, exportedAt: data.exportedAt || null };
}

// Kimliğe göre birleştirir: aynı kimlikli seyahat DOSYADAKİ hâliyle değişir,
// yeni olanlar eklenir, dosyada olmayan mevcut seyahatlere DOKUNULMAZ.
// Böylece boş bir uygulamaya aktarım "tam kopya", dolu bir uygulamaya
// aktarım ise hiçbir şeyi silmeyen bir birleştirme olur.
// -> { trips, added, updated, kept }
export function mergeTrips(current, incoming) {
  const cur = current || [];
  const byId = new Map(cur.map((t) => [t.id, t]));
  let added = 0;
  let updated = 0;
  (incoming || []).forEach((t) => {
    if (byId.has(t.id)) updated += 1;
    else added += 1;
    byId.set(t.id, t);
  });
  return { trips: [...byId.values()], added, updated, kept: cur.length - updated };
}

// Yedekteki fotoğraf/keşif sayısı — kullanıcıya "ne aktarılacak" demek için.
export function backupStats(trips) {
  let discoveries = 0;
  let photos = 0;
  let expenses = 0;
  (trips || []).forEach((t) => {
    discoveries += (t.discoveries || []).length;
    expenses += (t.expenses || []).length;
    (t.discoveries || []).forEach((d) => {
      photos += (d.photos || []).length || (d.photoUri ? 1 : 0);
    });
    (t.expenses || []).forEach((e) => {
      if (e.receiptPhoto) photos += 1;
    });
  });
  return { trips: (trips || []).length, discoveries, photos, expenses };
}
