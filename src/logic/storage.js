// Kalıcı depolama katmanı.
// Web'de localStorage'ın ~5 MB kotası fotoğraflı verilerde yetersiz kalıyor ve
// kayıtlar sessizce başarısız oluyordu. Bu yüzden web'de büyük kapasiteli
// IndexedDB kullanılır (yüzlerce MB). Native'de AsyncStorage'a düşülür.
// Eski localStorage verisi ilk okumada IndexedDB'ye taşınır (migrasyon).
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const DB_NAME = 'gezgin_gunlugu';
const STORE = 'kv';
// Fotoğraflar artık AYRI kayıtlarda tutulur (bkz. logic/photoStore.js):
// eskiden tüm fotoğraflar seyahat verisiyle aynı tek JSON'un içindeydi ve her
// küçük değişiklikte 35 MB'lık metin baştan yazılıyordu.
export const PHOTO_STORE = 'photos';
const DB_VERSION = 2;

function idbAvailable() {
  return Platform.OS === 'web' && typeof indexedDB !== 'undefined';
}

// Veritabanını SÜRÜM ÇAKIŞMASI OLMADAN açar.
//
// Eskiden sabit bir sürüm numarası isteniyordu. Bu, veritabanı daha yüksek bir
// sürümdeyse VersionError veriyor, açma başarısız olunca da okuma sessizce
// localStorage'a düşüyordu — orada kalmış ÇOK ESKİ ve eksik bir kopya güncel
// veri gibi gösterilebiliyordu. Artık: önce sürüm belirtmeden açılır, eksik
// depo varsa yalnızca o zaman mevcut sürümün bir üstüne yükseltilir.
function openRaw(version) {
  return new Promise((resolve, reject) => {
    const req = version ? indexedDB.open(DB_NAME, version) : indexedDB.open(DB_NAME);
    req.onupgradeneeded = () => {
      // Mevcut depolara DOKUNULMAZ; yalnızca eksik olanlar eklenir.
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
      if (!req.result.objectStoreNames.contains(PHOTO_STORE)) req.result.createObjectStore(PHOTO_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error('indexedDB open failed'));
    // Başka bir sekme eski sürümü açık tutuyorsa yükseltme "blocked" olur ve
    // istek hiç sonuçlanmaz; süresiz beklemek yerine hata verilir.
    req.onblocked = () => reject(new Error('indexedDB upgrade blocked'));
  });
}

let dbPromise = null;
function openDB() {
  if (!dbPromise) {
    dbPromise = (async () => {
      let db = await openRaw();
      const missing = !db.objectStoreNames.contains(STORE) || !db.objectStoreNames.contains(PHOTO_STORE);
      if (missing) {
        const next = (db.version || 1) + 1;
        db.close();
        db = await openRaw(next);
      }
      // Başka bir sekme yükseltme isterse bağlantıyı bırak ki bloklamayalım.
      db.onversionchange = () => {
        try {
          db.close();
        } catch (e) {
          /* yoksay */
        }
        dbPromise = null;
      };
      return db;
    })().catch((e) => {
      dbPromise = null;
      throw e;
    });
  }
  return dbPromise;
}

async function idbGet(key, store = STORE) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const r = tx.objectStore(store).get(key);
    r.onsuccess = () => resolve(r.result == null ? null : r.result);
    r.onerror = () => reject(r.error);
  });
}

async function idbSet(key, val, store = STORE) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    tx.objectStore(store).put(val, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

// --- Fotoğraf deposu için düşük seviye erişim (yalnızca web) ---
export function idbUsable() {
  return idbAvailable();
}

export function photoGet(id) {
  return idbGet(id, PHOTO_STORE);
}

export function photoSet(id, val) {
  return idbSet(id, val, PHOTO_STORE);
}

export async function photoDel(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PHOTO_STORE, 'readwrite');
    tx.objectStore(PHOTO_STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

export async function photoKeys() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PHOTO_STORE, 'readonly');
    const r = tx.objectStore(PHOTO_STORE).getAllKeys();
    r.onsuccess = () => resolve(r.result || []);
    r.onerror = () => reject(r.error);
  });
}

// Ana kaydı siler (göç yedeğini temizlemek için).
export async function storageRemove(key) {
  if (idbAvailable()) {
    try {
      const db = await openDB();
      await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).delete(key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
      });
      return;
    } catch (e) {
      /* AsyncStorage'a düş */
    }
  }
  return AsyncStorage.removeItem(key);
}

// IndexedDB okunamadığında ne olduğunu çağıran taraf bilsin.
export class StorageReadError extends Error {}

// ÖNEMLİ: IndexedDB okunabildiği hâlde okuma HATA verirse localStorage'a
// DÜŞÜLMEZ. Eskiden düşülüyordu ve localStorage'da kalmış çok eski, eksik bir
// kopya (fotoğraflar 5 MB kotasına sığmadığı için yarım kalmış hâli) güncel
// veri sanılıp yükleniyor, ardından da üstüne yazılabiliyordu. Artık hata
// yükseltilir; uygulama kullanıcıya "veri okunamadı" der ve hiçbir şey yazmaz.
export async function storageGet(key) {
  if (idbAvailable()) {
    let v;
    try {
      v = await idbGet(key);
    } catch (e) {
      throw new StorageReadError(e && e.message ? e.message : 'indexedDB read failed');
    }
    if (v != null) return v;
    // IndexedDB'de kayıt YOK: eski localStorage verisini bir kez taşı.
    try {
      const old = await AsyncStorage.getItem(key);
      if (old != null) {
        await idbSet(key, old);
        return old;
      }
    } catch (e) {
      /* yoksay */
    }
    return null;
  }
  return AsyncStorage.getItem(key);
}

// KALICI DEPOLAMA İSTEĞİ.
// Varsayılan olarak tarayıcı verimizi "best-effort" kovada tutar: disk
// daralınca silebilir, iOS Safari ise siteye 7 gün girilmezse script ile
// yazılmış tüm veriyi (IndexedDB dahil) SİLER. Bu yüzden fotoğraflar
// "kendiliğinden" kaybolabiliyor. persist() izni verilirse veri kalıcı
// kovaya taşınır ve otomatik silinmez.
//
// -> { supported, persisted } döner. İzin verilmezse persisted false kalır;
//    (iOS'ta genellikle site ana ekrana eklenince veriliyor.)
export async function requestPersistentStorage() {
  if (Platform.OS !== 'web' || typeof navigator === 'undefined' || !navigator.storage) {
    return { supported: false, persisted: false };
  }
  const { persist, persisted } = navigator.storage;
  if (typeof persisted !== 'function') return { supported: false, persisted: false };
  try {
    let already = await navigator.storage.persisted();
    if (!already && typeof persist === 'function') {
      already = await navigator.storage.persist();
    }
    return { supported: true, persisted: !!already };
  } catch (e) {
    return { supported: true, persisted: false };
  }
}

// Verinin kalıcı kovada olup olmadığını sadece OKUR (izin istemez).
export async function isStoragePersisted() {
  if (
    Platform.OS !== 'web' ||
    typeof navigator === 'undefined' ||
    !navigator.storage ||
    typeof navigator.storage.persisted !== 'function'
  ) {
    return null;
  }
  try {
    return await navigator.storage.persisted();
  } catch (e) {
    return null;
  }
}

// Tarayıcının verdiği depolama tahmini (kullanılan/kota, bayt). Web dışında null.
export async function storageEstimate() {
  if (
    Platform.OS === 'web' &&
    typeof navigator !== 'undefined' &&
    navigator.storage &&
    typeof navigator.storage.estimate === 'function'
  ) {
    try {
      const e = await navigator.storage.estimate();
      return { usage: e.usage || 0, quota: e.quota || 0 };
    } catch (err) {
      return null;
    }
  }
  return null;
}

export async function storageSet(key, val) {
  if (idbAvailable()) {
    try {
      await idbSet(key, val);
      return;
    } catch (e) {
      // IndexedDB yazamazsa AsyncStorage'ı dene (kota aşabilir ama son çare).
    }
  }
  return AsyncStorage.setItem(key, val);
}
