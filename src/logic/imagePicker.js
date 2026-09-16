// Fotoğraf seçme — belleği patlatmayan yol.
//
// NEDEN KENDİ SEÇİCİMİZ VAR?
// expo-image-picker'ın web uygulaması seçilen HER dosyayı FileReader ile
// baştan sona base64 data URI'ye çevirir ve bunu Promise.all ile hepsini
// AYNI ANDA yapar. Telefon fotoğrafı 3-10 MB olduğundan base64 hâli ~1,37
// katına çıkar: 8 fotoğraf seçmek 40-100 MB metni ve aynı anda çözülmüş
// 8 tam boy bitmap'i (her biri onlarca MB) bellekte tutmak demek. Ölçümde
// 3 fotoğraf bile 38 MB base64 üretip 3,5 saniye harcıyordu. Telefonda bu
// ya "Fotoğraf seçilemedi" hatası (FileReader düşüyor) ya da sekmenin
// bellek yetersizliğinden çöküp yeniden başlaması anlamına geliyor.
//
// Bunun yerine web'de:
//   * dosya HİÇBİR ZAMAN tam boy base64'e çevrilmez,
//   * fotoğraflar TEK TEK çözülür, küçültülür ve kaynak hemen serbest
//     bırakılır (peak bellek = 1 fotoğraf),
//   * sonuçta sadece küçültülmüş (~100-200 KB) JPEG data URI kalır.
// Native'de dosya URI'si zaten kalıcı ve hafif olduğu için expo-image-picker
// olduğu gibi kullanılır (EXIF okumak da orada çalışıyor).
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const DEFAULTS = { maxPx: 1000, quality: 0.55 };

function isWeb() {
  return Platform.OS === 'web' && typeof window !== 'undefined' && !!window.document;
}

// Küçük blob -> data URI (yalnızca küçültülmüş görüntü için kullanılır).
function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error('read failed'));
    reader.readAsDataURL(blob);
  });
}

// Dosyayı çöz, küçült, JPEG data URI döndür. Kaynağı hemen serbest bırakır.
async function shrinkFile(file, { maxPx, quality }) {
  let bitmap = null;
  let objectUrl = null;
  let canvas = null;
  try {
    let width;
    let height;
    let source;
    if (typeof window.createImageBitmap === 'function') {
      bitmap = await window.createImageBitmap(file);
      width = bitmap.width;
      height = bitmap.height;
      source = bitmap;
    } else {
      // Eski tarayıcı: object URL ile çöz (yine tam boy base64 üretmeden).
      objectUrl = window.URL.createObjectURL(file);
      source = await new Promise((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('decode failed'));
        img.src = objectUrl;
      });
      width = source.naturalWidth || source.width;
      height = source.naturalHeight || source.height;
    }
    if (!width || !height) throw new Error('empty image');

    const scale = Math.min(1, maxPx / Math.max(width, height));
    const w = Math.max(1, Math.round(width * scale));
    const h = Math.max(1, Math.round(height * scale));
    canvas = window.document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.getContext('2d').drawImage(source, 0, 0, w, h);

    let uri;
    if (typeof canvas.toBlob === 'function') {
      const small = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
      if (!small) throw new Error('encode failed');
      uri = await blobToDataUrl(small);
    } else {
      uri = canvas.toDataURL('image/jpeg', quality);
    }
    if (!uri || uri.length < 32) throw new Error('encode empty');
    return { uri, width: w, height: h };
  } finally {
    // Belleği beklemeden bırak: bir sonraki fotoğrafa temiz başla.
    if (bitmap && typeof bitmap.close === 'function') bitmap.close();
    if (objectUrl) window.URL.revokeObjectURL(objectUrl);
    if (canvas) {
      canvas.width = 0;
      canvas.height = 0;
    }
  }
}

// Web'de gizli <input type="file"> açar ve seçilen dosyaları döndürür.
function chooseFiles({ multiple }) {
  return new Promise((resolve) => {
    const input = window.document.createElement('input');
    input.style.display = 'none';
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    if (multiple) input.setAttribute('multiple', 'multiple');
    let settled = false;
    const finish = (files) => {
      if (settled) return;
      settled = true;
      if (input.parentNode) input.parentNode.removeChild(input);
      resolve(files);
    };
    input.addEventListener('change', () => finish(input.files ? Array.from(input.files) : []));
    // Kullanıcı vazgeçerse input DOM'da asılı kalmasın.
    input.addEventListener('cancel', () => finish([]));
    window.document.body.appendChild(input);
    input.click();
  });
}

// Fotoğraf seçtirir ve SAKLANABİLİR (küçültülmüş) hâle getirir.
//
// { multiple, maxPx, quality, onProgress(done, total) }
// -> { canceled, assets: [{ uri, width, height, exif }], failed }
export async function pickImages(opts = {}) {
  const { multiple = false, onProgress } = opts;
  const size = { maxPx: opts.maxPx || DEFAULTS.maxPx, quality: opts.quality || DEFAULTS.quality };

  if (!isWeb()) {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return { canceled: true, assets: [], failed: 0 };
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      exif: true,
      allowsMultipleSelection: multiple,
      selectionLimit: multiple ? 0 : 1,
    });
    if (res.canceled || !res.assets?.length) return { canceled: true, assets: [], failed: 0 };
    return { canceled: false, assets: res.assets, failed: 0 };
  }

  const files = await chooseFiles({ multiple });
  if (!files.length) return { canceled: true, assets: [], failed: 0 };
  const total = files.length;
  const assets = [];
  let failed = 0;
  if (onProgress) onProgress(0, total);
  for (let i = 0; i < total; i += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      assets.push(await shrinkFile(files[i], size));
    } catch (e) {
      failed += 1; // okunamayan dosyayı atla; tam boy hâlini ASLA saklamayız
    }
    if (onProgress) onProgress(i + 1, total);
  }
  return { canceled: false, assets, failed };
}
