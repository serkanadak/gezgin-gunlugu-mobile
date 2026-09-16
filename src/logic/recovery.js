// VERİ KURTARMA.
//
// Veri birkaç ayrı yerde bulunabilir ve uygulama yanlış olanı yüklemiş
// olabilir:
//   * IndexedDB / kv / ana anahtar        -> normal kayıt
//   * IndexedDB / kv / göç yedeği         -> fotoğraf göçü doğrulanamadıysa
//   * localStorage / ana anahtar          -> IndexedDB öncesi ÇOK ESKİ kopya
//                                            (fotoğraflar 5 MB kotasına
//                                             sığmadığı için eksik olabilir)
//   * IndexedDB / photos                  -> ayrı fotoğraf kayıtları
//
// Bu modül hepsini OKUR, içeriğini sayar ve kullanıcıya "hangisi en zengin"
// diye gösterir. Hiçbir şeyi kendi başına silmez veya üzerine yazmaz.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { photoKeys, PHOTO_STORE } from './storage';
import { richness, collectRefs } from './tripPhotos';

const DB_NAME = 'gezgin_gunlugu';
const KV = 'kv';

function isWeb() {
  return Platform.OS === 'web' && typeof indexedDB !== 'undefined';
}

// Sürüm belirtmeden, hiçbir şeyi değiştirmeden açar.
function openReadOnly() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error('open failed'));
    req.onblocked = () => reject(new Error('blocked'));
  });
}

function getAllFromKv(db) {
  return new Promise((resolve, reject) => {
    if (!db.objectStoreNames.contains(KV)) return resolve([]);
    const tx = db.transaction(KV, 'readonly');
    const store = tx.objectStore(KV);
    const keysReq = store.getAllKeys();
    const valsReq = store.getAll();
    tx.oncomplete = () =>
      resolve((keysReq.result || []).map((k, i) => ({ key: String(k), value: (valsReq.result || [])[i] })));
    tx.onerror = () => reject(tx.error);
    return undefined;
  });
}

function summarize(label, source, key, raw) {
  const out = { label, source, key, ok: false, bytes: 0, rev: null, savedAt: null, counts: null, error: null };
  if (typeof raw !== 'string' || !raw) {
    out.error = 'boş';
    return out;
  }
  out.bytes = raw.length;
  try {
    const d = JSON.parse(raw);
    const trips = Array.isArray(d.trips) ? d.trips : [];
    out.rev = Number(d.rev) || 0;
    out.savedAt = Number(d.savedAt) || 0;
    out.counts = richness(trips);
    // Referanslı kayıtlarda fotoğraf sayısı referanslardan gelir.
    const refs = collectRefs(trips);
    if (refs.size) out.counts.photos = refs.size;
    out.photoSplit = !!d.photoSplit || refs.size > 0;
    out.ok = true;
  } catch (e) {
    out.error = 'okunamadı';
  }
  return out;
}

// Cihazdaki TÜM veri kaynaklarını listeler (en zengin en başta).
// -> { sources: [...], photoRecords, error }
export async function scanSources(mainKey) {
  const sources = [];
  let photoRecords = null;
  let error = null;

  if (isWeb()) {
    try {
      const db = await openReadOnly();
      const rows = await getAllFromKv(db);
      rows.forEach((r) => {
        const isMain = r.key === mainKey;
        sources.push(
          summarize(isMain ? 'IndexedDB · ana kayıt' : `IndexedDB · ${r.key.replace(mainKey, '').replace(/^__/, '')}`,
            'idb', r.key, r.value)
        );
      });
      if (db.objectStoreNames.contains(PHOTO_STORE)) {
        try {
          photoRecords = (await photoKeys()).length;
        } catch (e) {
          photoRecords = null;
        }
      }
      db.close();
    } catch (e) {
      error = e && e.message ? e.message : 'IndexedDB açılamadı';
    }
  }

  // localStorage'daki eski kopya (AsyncStorage web'de localStorage kullanır).
  try {
    const old = await AsyncStorage.getItem(mainKey);
    if (old != null) sources.push(summarize('Tarayıcı belleği (eski kopya)', 'local', mainKey, old));
  } catch (e) {
    /* yoksay */
  }

  const score = (s) =>
    s.ok ? s.counts.discoveries * 100 + s.counts.expenses * 50 + s.counts.photos * 10 + s.counts.trips : -1;
  sources.sort((a, b) => score(b) - score(a));
  return { sources, photoRecords, error };
}

// Seçilen kaynağın seyahat/ayar verisini döndürür (yazma yapmaz).
export async function readSource(src) {
  if (src.source === 'local') {
    const raw = await AsyncStorage.getItem(src.key);
    return raw ? JSON.parse(raw) : null;
  }
  const db = await openReadOnly();
  const raw = await new Promise((resolve, reject) => {
    const tx = db.transaction(KV, 'readonly');
    const rq = tx.objectStore(KV).get(src.key);
    rq.onsuccess = () => resolve(rq.result);
    rq.onerror = () => reject(rq.error);
  });
  db.close();
  return raw ? JSON.parse(raw) : null;
}
