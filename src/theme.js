// Ortak tema/renkler — kullanıcı Ayarlar'dan 4 AÇIK ve NEŞELİ renk paleti seçebilir:
// Deniz (varsayılan), Güneş, Dağ, Kar. Hepsi açık zeminli/koyu metinlidir; canlı ve
// neşeli vurgu renkleri kullanır. Buton yazıları `onPrimary` (beyaz) ile yazılır,
// böylece canlı primary üzerinde okunaklı kalır.
//
// StyleSheet.create modül yüklenirken çalıştığından palet, önyüklemede senkron
// okunabilen localStorage'dan seçilir. Seçim değişince Ayarlar sayfası localStorage'a
// yazıp sayfayı yeniler; yeni palet böylece tüm ekranlara uygulanır.

export const THEMES = {
  deniz: {
    id: 'deniz',
    label: 'Deniz',
    emoji: '🌊',
    palette: {
      bg: '#ecf7fe',
      surface: '#ffffff',
      surfaceAlt: '#d4ecfa',
      text: '#0b3550',
      textMuted: '#4a7391',
      primary: '#0284c7',
      onPrimary: '#ffffff',
      accent: '#06b6d4',
      border: '#bfe1f4',
      success: '#16a34a',
      danger: '#dc2626',
    },
  },
  gunes: {
    id: 'gunes',
    label: 'Güneş',
    emoji: '☀️',
    palette: {
      bg: '#fff6e6',
      surface: '#ffffff',
      surfaceAlt: '#ffe6c2',
      text: '#5c3a12',
      textMuted: '#8a5a1e',
      primary: '#ea580c',
      onPrimary: '#ffffff',
      accent: '#e11d48',
      border: '#f7d9a8',
      success: '#16a34a',
      danger: '#dc2626',
    },
  },
  dag: {
    id: 'dag',
    label: 'Dağ',
    emoji: '🏔️',
    palette: {
      bg: '#ecf9f2',
      surface: '#ffffff',
      surfaceAlt: '#d2f0e0',
      text: '#0f3a2c',
      textMuted: '#3f7561',
      primary: '#0d9488',
      onPrimary: '#ffffff',
      accent: '#ea7317',
      border: '#c0e8d3',
      success: '#16a34a',
      danger: '#dc2626',
    },
  },
  kar: {
    id: 'kar',
    label: 'Kar',
    emoji: '❄️',
    palette: {
      bg: '#f0f4ff',
      surface: '#ffffff',
      surfaceAlt: '#e0e7fb',
      text: '#1c2748',
      textMuted: '#57648a',
      primary: '#4f46e5',
      onPrimary: '#ffffff',
      accent: '#0ea5e9',
      border: '#d2ddf6',
      success: '#16a34a',
      danger: '#dc2626',
    },
  },
};

export const DEFAULT_THEME = 'deniz';
const STORAGE_KEY = 'gg_theme_v1';

function readSavedThemeId() {
  try {
    if (typeof localStorage !== 'undefined') {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v && THEMES[v]) return v;
    }
  } catch (e) {
    /* localStorage erişilemezse varsayılana düş */
  }
  return DEFAULT_THEME;
}

// Önyüklemede seçili palet (senkron).
export const activeThemeId = readSavedThemeId();

// Tüm ekranların import ettiği renkler — seçili paletten kopyalanır.
export const colors = { ...THEMES[activeThemeId].palette };

// Hazırlık checklist durum renkleri — palete göre türetilir.
export const CHECK_COLORS = {
  todo: colors.textMuted,
  done: colors.success,
  partial: colors.primary,
  skip: '#64748b',
};

export function getThemeId() {
  return activeThemeId;
}

// Seçimi kalıcı yap. Palet ancak sayfa yeniden yüklendiğinde uygulanır.
export function saveThemeId(id) {
  if (!THEMES[id]) return false;
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, id);
      return true;
    }
  } catch (e) {
    /* yoksay */
  }
  return false;
}
