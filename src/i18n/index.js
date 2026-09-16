// Çok dilli arayüz (i18n): Türkçe, İngilizce, Almanca.
//
// Dil, tema paletiyle AYNI mantıkla çalışır: bazı metinler modül yüklenirken
// (ör. ay adları, hazırlık listesi şablonu, araç adları) sabitlere yazıldığı
// için dil, önyüklemede localStorage'dan SENKRON okunur. Ayarlar'dan dil
// değişince seçim kaydedilir ve sayfa bir kez yenilenir; böylece tüm ekranlar
// ve sabitler yeni dille kurulur.
import { CATALOG } from './catalog';

export const LANGS = [
  { id: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { id: 'en', label: 'English', flag: '🇬🇧' },
  { id: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

export const DEFAULT_LANG = 'tr';
const STORAGE_KEY = 'gg_lang_v1';

function readSavedLang() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const v = window.localStorage.getItem(STORAGE_KEY);
      if (v && LANGS.some((l) => l.id === v)) return v;
      // Kayıt yoksa VARSAYILAN (Türkçe) kalır. Tarayıcı diline göre otomatik
      // seçim yapılmaz: mevcut kullanıcıların uygulaması bir gün aniden başka
      // dilde açılmasın. Dil, Ayarlar'dan bilinçli olarak seçilir.
    }
  } catch (e) {
    /* yoksay */
  }
  return DEFAULT_LANG;
}

export const activeLang = readSavedLang();

export function getLang() {
  return activeLang;
}

export function saveLang(id) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, id);
    }
  } catch (e) {
    /* yoksay */
  }
}

// Belge/AI istemleri için tam dil adı ve BCP-47 kodu.
export const LANG_NAME = { tr: 'Türkçe', en: 'English', de: 'Deutsch' };
export const LANG_TAG = { tr: 'tr', en: 'en', de: 'de' };
export const LOCALE = { tr: 'tr-TR', en: 'en-GB', de: 'de-DE' };

// Ana çeviri işlevi.
//   t('common.save')                     -> "Kaydet"
//   t('expenses.count', { n: 3 })        -> "3 kayıt"   ({n} yer tutucusu)
// Anahtar bulunamazsa Türkçesine, o da yoksa anahtarın kendisine düşer
// (ekranda boşluk kalmasın, eksik çeviri fark edilsin).
export function t(key, params) {
  const entry = CATALOG[key];
  let s;
  if (entry) s = entry[activeLang] != null ? entry[activeLang] : entry[DEFAULT_LANG];
  if (s == null) s = key;
  if (params) {
    s = String(s).replace(/\{(\w+)\}/g, (m, p) => (params[p] != null ? String(params[p]) : m));
  }
  return s;
}

// Çoğul/sayı biçimlendirme yardımcıları
export function nf(n, opts) {
  try {
    return Number(n).toLocaleString(LOCALE[activeLang] || 'tr-TR', opts);
  } catch (e) {
    return String(n);
  }
}
