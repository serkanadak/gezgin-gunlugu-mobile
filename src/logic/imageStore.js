// Seçilen fotoğrafları saklanabilir hâle getirir.
// Web'de expo-image-picker blob:/geçici URL veya büyük base64 döndürebilir;
// bunlar sayfa yenilenince ölür ya da localStorage kotasını taşırır. Bu yüzden
// web'de fotoğrafı küçültüp kalıcı bir JPEG data URI'ye çeviririz (hem yeniden
// açılışta kalır hem PDF'e gömülür). Native'de dosya URI'si kalıcı olduğundan
// olduğu gibi bırakılır.
import { Platform } from 'react-native';

export async function preparePhoto(uri, { maxPx = 1000, quality = 0.55 } = {}) {
  if (Platform.OS !== 'web' || !uri) return uri;
  if (typeof window === 'undefined' || !window.document) return uri;
  return new Promise((resolve) => {
    try {
      const img = new window.Image();
      img.onload = () => {
        try {
          const scale = Math.min(1, maxPx / Math.max(img.width || 1, img.height || 1));
          const w = Math.max(1, Math.round((img.width || 1) * scale));
          const h = Math.max(1, Math.round((img.height || 1) * scale));
          const canvas = window.document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } catch (e) {
          resolve(uri); // taint vb. → orijinali bırak
        }
      };
      img.onerror = () => resolve(uri);
      img.src = uri;
    } catch (e) {
      resolve(uri);
    }
  });
}

export async function preparePhotos(uris, opts) {
  const out = [];
  for (const u of uris || []) {
    // eslint-disable-next-line no-await-in-loop
    out.push(await preparePhoto(u, opts));
  }
  return out;
}
