// Fotoğraf kayıtları: her fotoğraf IndexedDB'de KENDİ kaydında yaşar.
// Native'de (IndexedDB yok) fotoğraflar eskisi gibi seyahat verisinin içinde
// kalır; orada dosya URI'si saklandığı için boyut sorunu da yoktur.
import { idbUsable, photoGet, photoSet, photoDel, photoKeys } from './storage';

export function photoStoreUsable() {
  return idbUsable();
}

// [{ id, uri }] yazar. Biri başarısız olursa hata yükselir ki çağıran
// ince kaydı YAZMASIN (yoksa referansı olup fotoğrafı olmayan kayıt oluşur).
export async function writePhotos(items) {
  for (const it of items || []) {
    // eslint-disable-next-line no-await-in-loop
    await photoSet(it.id, it.uri);
  }
}

// Referans kümesini okur -> Map(id -> uri). Okunamayanlar Map'e girmez.
export async function readPhotos(refs) {
  const map = new Map();
  for (const id of refs || []) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const uri = await photoGet(id);
      if (uri) map.set(id, uri);
    } catch (e) {
      /* eksik fotoğraf çağıran tarafta sayılır */
    }
  }
  return map;
}

// Artık hiçbir seyahatte kullanılmayan fotoğraf kayıtlarını siler.
// -> silinen adet
export async function pruneUnreferenced(usedRefs) {
  let removed = 0;
  try {
    const keys = await photoKeys();
    for (const k of keys) {
      if (!usedRefs.has(k)) {
        // eslint-disable-next-line no-await-in-loop
        await photoDel(k);
        removed += 1;
      }
    }
  } catch (e) {
    /* temizlik yapılamazsa yalnızca yer kullanımı artar, veri bozulmaz */
  }
  return removed;
}

export async function photoCount() {
  try {
    return (await photoKeys()).length;
  } catch (e) {
    return null;
  }
}
