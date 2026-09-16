// Keşif fotoğrafı yardımcıları (tek kaynak).
//
// Yeni kayıtlarda fotoğraflar `photos` dizisindedir; çok eski kayıtlarda tek
// `photoUri` alanı vardı. Kapak fotoğrafı bir zamanlar `photoUri`ye de
// KOPYALANIYORDU; bu, aynı base64 verisini iki kez saklayarak depolamayı
// (ve her yazmada JSON boyutunu) iki katına çıkarıyordu. Artık kopyalanmaz;
// okurken ikisi de desteklenir.

export function photosOf(d) {
  if (Array.isArray(d?.photos) && d.photos.length) return d.photos;
  return d?.photoUri ? [d.photoUri] : [];
}

// Kapak (ilk) fotoğrafı; yoksa null.
export function coverOf(d) {
  const list = photosOf(d);
  return list.length ? list[0] : null;
}

export function hasPhoto(d) {
  return photosOf(d).length > 0;
}
