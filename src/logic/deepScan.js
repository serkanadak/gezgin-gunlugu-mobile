// DERİN TARAMA — "veri gerçekten var mı, nerede?" sorusuna kesin cevap.
//
// Normal tarama yalnızca uygulamanın kendi anahtarlarına bakar. Veri
// beklenmedik bir yerde olabilir: başka bir veritabanı adı, başka bir
// anahtar, ya da ana ekran uygulamasının AYRI depolama alanı. Bu modül
// tarayıcının bu origin'de tuttuğu HER ŞEYİ listeler ve tek bir metin rapor
// üretir; rapor kopyalanıp paylaşılabilir.
//
// EN ÖNEMLİ SATIR: "kullanılan alan". Onlarca MB görünüyorsa veri fiziksel
// olarak DURUYOR ve bulunması gerekir; ~0 ise tarayıcı silmiş demektir.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const KNOWN_DBS = ['gezgin_gunlugu'];

function isWeb() {
  return Platform.OS === 'web' && typeof indexedDB !== 'undefined';
}

function openByName(name) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(name);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error('open failed'));
    req.onblocked = () => reject(new Error('blocked'));
  });
}

function sizeOf(v) {
  if (typeof v === 'string') return v.length;
  if (v && typeof v === 'object') {
    try {
      return JSON.stringify(v).length;
    } catch (e) {
      return 0;
    }
  }
  return 0;
}

// Bir kaydın içinde ne var? (seyahat/keşif/harcama sayıları)
function peek(v) {
  try {
    const d = typeof v === 'string' ? JSON.parse(v) : v;
    if (!d || !Array.isArray(d.trips)) return null;
    let disc = 0;
    let exp = 0;
    let photos = 0;
    d.trips.forEach((t) => {
      disc += (t.discoveries || []).length;
      exp += (t.expenses || []).length;
      (t.discoveries || []).forEach((x) => {
        photos += (x.photos || []).length + (x.photoUri ? 1 : 0);
      });
    });
    return { trips: d.trips.length, disc, exp, photos, rev: Number(d.rev) || 0 };
  } catch (e) {
    return null;
  }
}

async function scanStore(db, storeName) {
  const out = { name: storeName, count: 0, bytes: 0, entries: [], error: null };
  try {
    const rows = await new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const st = tx.objectStore(storeName);
      const kReq = st.getAllKeys();
      const vReq = st.getAll();
      tx.oncomplete = () => resolve({ keys: kReq.result || [], vals: vReq.result || [] });
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
    out.count = rows.keys.length;
    rows.keys.forEach((k, i) => {
      const v = rows.vals[i];
      const bytes = sizeOf(v);
      out.bytes += bytes;
      // Fotoğraf deposunda yüzlerce kayıt olabilir; hepsini listelemeyelim.
      if (out.entries.length < 25) {
        out.entries.push({ key: String(k), bytes, peek: peek(v), db: db.name, store: storeName });
      }
    });
  } catch (e) {
    out.error = e && e.message ? e.message : 'okunamadı';
  }
  return out;
}

export async function deepScan() {
  const report = {
    standalone: false,
    origin: '',
    estimate: null,
    persisted: null,
    dbs: [],
    local: [],
    errors: [],
  };
  if (typeof window !== 'undefined') {
    report.origin = window.location ? window.location.href : '';
    try {
      report.standalone =
        (window.navigator && window.navigator.standalone === true) ||
        (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
    } catch (e) {
      /* yoksay */
    }
  }
  if (typeof navigator !== 'undefined' && navigator.storage) {
    try {
      if (navigator.storage.estimate) report.estimate = await navigator.storage.estimate();
    } catch (e) {
      report.errors.push('estimate: ' + e.message);
    }
    try {
      if (navigator.storage.persisted) report.persisted = await navigator.storage.persisted();
    } catch (e) {
      /* yoksay */
    }
  }

  if (isWeb()) {
    // Bu origin'deki TÜM veritabanlarını bul (destekleyen tarayıcılarda).
    let names = [];
    try {
      if (indexedDB.databases) {
        const list = await indexedDB.databases();
        names = list.map((d) => d.name).filter(Boolean);
      }
    } catch (e) {
      report.errors.push('databases(): ' + e.message);
    }
    KNOWN_DBS.forEach((n) => {
      if (!names.includes(n)) names.push(n);
    });

    for (const name of names) {
      const entry = { name, version: null, stores: [], error: null };
      try {
        // eslint-disable-next-line no-await-in-loop
        const db = await openByName(name);
        entry.version = db.version;
        const storeNames = [...db.objectStoreNames];
        for (const sn of storeNames) {
          // eslint-disable-next-line no-await-in-loop
          entry.stores.push(await scanStore(db, sn));
        }
        db.close();
      } catch (e) {
        entry.error = e && e.message ? e.message : 'açılamadı';
      }
      report.dbs.push(entry);
    }
  }

  // localStorage (web'de AsyncStorage bunu kullanır) — TÜM anahtarlar.
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      for (let i = 0; i < window.localStorage.length; i += 1) {
        const k = window.localStorage.key(i);
        const v = window.localStorage.getItem(k);
        report.local.push({ key: k, bytes: (v || '').length, peek: peek(v) });
      }
    } else {
      const keys = await AsyncStorage.getAllKeys();
      for (const k of keys) {
        // eslint-disable-next-line no-await-in-loop
        const v = await AsyncStorage.getItem(k);
        report.local.push({ key: k, bytes: (v || '').length, peek: peek(v) });
      }
    }
  } catch (e) {
    report.errors.push('localStorage: ' + e.message);
  }
  return report;
}

const mb = (n) => (n == null ? '?' : (n / 1048576).toFixed(2) + ' MB');

// Paylaşılabilir metin rapor.
export function reportText(r) {
  const L = [];
  L.push('GEZGİN GÜNLÜĞÜ — DEPOLAMA RAPORU');
  L.push('adres: ' + r.origin);
  L.push('ana ekran uygulaması mı: ' + (r.standalone ? 'EVET' : 'hayır (tarayıcı sekmesi)'));
  L.push(
    'kullanılan alan: ' +
      (r.estimate ? mb(r.estimate.usage) + ' / ' + mb(r.estimate.quota) : 'bilinmiyor') +
      ' · kalıcı: ' +
      (r.persisted === null ? '?' : r.persisted ? 'evet' : 'hayır')
  );
  L.push('');
  if (!r.dbs.length) L.push('IndexedDB: hiç veritabanı yok');
  r.dbs.forEach((db) => {
    L.push(`IndexedDB "${db.name}" (sürüm ${db.version == null ? '?' : db.version})${db.error ? ' — HATA: ' + db.error : ''}`);
    db.stores.forEach((st) => {
      L.push(`  depo "${st.name}": ${st.count} kayıt, ${mb(st.bytes)}${st.error ? ' — HATA: ' + st.error : ''}`);
      st.entries.forEach((e) => {
        const p = e.peek;
        L.push(
          `    • ${e.key} — ${mb(e.bytes)}` +
            (p ? ` → ${p.trips} seyahat, ${p.disc} keşif, ${p.exp} harcama, ${p.photos} foto (rev ${p.rev})` : '')
        );
      });
      if (st.count > st.entries.length) L.push(`    … ve ${st.count - st.entries.length} kayıt daha`);
    });
  });
  L.push('');
  L.push(`Tarayıcı belleği (localStorage): ${r.local.length} anahtar`);
  r.local.forEach((e) => {
    const p = e.peek;
    L.push(
      `  • ${e.key} — ${mb(e.bytes)}` +
        (p ? ` → ${p.trips} seyahat, ${p.disc} keşif, ${p.exp} harcama, ${p.photos} foto` : '')
    );
  });
  if (r.errors.length) {
    L.push('');
    L.push('sorunlar: ' + r.errors.join(' | '));
  }
  return L.join('\n');
}

// Raporda bulunan HERHANGİ bir kaydı okur (veritabanı + depo + anahtar).
export async function readEntry(entry) {
  const db = await openByName(entry.db);
  const raw = await new Promise((resolve, reject) => {
    const tx = db.transaction(entry.store, 'readonly');
    const rq = tx.objectStore(entry.store).get(entry.key);
    rq.onsuccess = () => resolve(rq.result);
    rq.onerror = () => reject(rq.error);
  });
  db.close();
  if (typeof raw !== 'string') return raw || null;
  return JSON.parse(raw);
}

// Rapordaki tüm kayıtlar arasından içinde seyahat OLAN adayları döndürür.
export function candidates(r) {
  const out = [];
  r.dbs.forEach((db) =>
    db.stores.forEach((st) =>
      st.entries.forEach((e) => {
        if (e.peek && e.peek.trips > 0) out.push({ ...e, source: 'idb' });
      })
    )
  );
  r.local.forEach((e) => {
    if (e.peek && e.peek.trips > 0) out.push({ ...e, source: 'local', db: 'localStorage', store: '-' });
  });
  out.sort((a, b) => b.peek.disc * 100 + b.peek.photos - (a.peek.disc * 100 + a.peek.photos));
  return out;
}
