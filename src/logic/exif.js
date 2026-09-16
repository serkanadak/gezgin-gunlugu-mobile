// expo-image-picker'ın döndürdüğü EXIF nesnesinden tarih ve GPS koordinatı ayıklar.
// Farklı platformlar (iOS/Android/web) farklı biçimler döndürebildiği için savunmacı yazıldı.

// "2024:06:15 10:30:00" -> "2024-06-15"
export function exifDateKey(exif) {
  if (!exif) return null;
  const raw = exif.DateTimeOriginal || exif.DateTime || exif.DateTimeDigitized;
  if (typeof raw !== 'string') return null;
  const m = raw.match(/^(\d{4})[:\-](\d{2})[:\-](\d{2})/);
  if (!m) return null;
  return `${m[1]}-${m[2]}-${m[3]}`;
}

// EXIF GPS alanlarını ondalık dereceye çevirir. Bulunamazsa null.
export function exifCoords(exif) {
  if (!exif) return null;

  // Bazı platformlar doğrudan ondalık verir.
  if (typeof exif.GPSLatitude === 'number' && typeof exif.GPSLongitude === 'number') {
    let lat = exif.GPSLatitude;
    let lng = exif.GPSLongitude;
    if (exif.GPSLatitudeRef === 'S') lat = -Math.abs(lat);
    if (exif.GPSLongitudeRef === 'W') lng = -Math.abs(lng);
    if (isValid(lat, lng)) return { lat, lng };
  }

  // Bazıları [derece, dakika, saniye] dizisi verir.
  const lat = dmsToDecimal(exif.GPSLatitude, exif.GPSLatitudeRef);
  const lng = dmsToDecimal(exif.GPSLongitude, exif.GPSLongitudeRef);
  if (lat != null && lng != null && isValid(lat, lng)) return { lat, lng };

  return null;
}

function dmsToDecimal(value, ref) {
  if (!Array.isArray(value) || value.length < 3) return null;
  const [d, m, s] = value.map(Number);
  if ([d, m, s].some((n) => Number.isNaN(n))) return null;
  let dec = d + m / 60 + s / 3600;
  if (ref === 'S' || ref === 'W') dec = -dec;
  return dec;
}

function isValid(lat, lng) {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    !Number.isNaN(lat) &&
    !Number.isNaN(lng) &&
    Math.abs(lat) <= 90 &&
    Math.abs(lng) <= 180 &&
    !(lat === 0 && lng === 0)
  );
}
