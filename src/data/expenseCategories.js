// Harcama türleri (kategoriler).
//
// İki kaynak birleşir:
//   1) Buradaki yerleşik (builtin) liste — sıralama korunur.
//   2) Kullanıcının Ayarlar'dan eklediği türler (settings.expenseCatsCustom).
//
// Pasif türler (settings.expenseCatsInactive) seyahatlerde SEÇİLEMEZ; ancak
// daha önce girilmiş harcamaların türü olarak okunmaya devam eder (raporlarda
// ve listede etiketi görünür). Böylece geçmiş veri bozulmaz.
import { t } from '../i18n';

export const BUILTIN_EXPENSE_CATEGORIES = [
  { value: 'yemek', label: t('cat.yemek'), icon: '🍽️' },
  { value: 'yiyecek_icecek', label: t('cat.yiyecek_icecek'), icon: '🥤' },
  { value: 'hediye', label: t('cat.hediye'), icon: '🎁' },
  { value: 'giyim', label: t('cat.giyim'), icon: '👕' },
  { value: 'akaryakit', label: t('cat.akaryakit'), icon: '⛽' },
  { value: 'konaklama', label: t('cat.konaklama'), icon: '🏨' },
  { value: 'vergi_harc', label: t('cat.vergi_harc'), icon: '🧾' },
  { value: 'ulasim', label: t('cat.ulasim'), icon: '🚌' },
  { value: 'demirbas', label: t('cat.demirbas'), icon: '📦' },
  { value: 'iletisim', label: t('cat.iletisim'), icon: '📱' },
  { value: 'tamir_bakim', label: t('cat.tamir_bakim'), icon: '🔧' },
  { value: 'sigorta', label: t('cat.sigorta'), icon: '🛡️' },
  { value: 'bilet', label: t('cat.bilet'), icon: '🎫' },
  { value: 'diger', label: t('cat.diger'), icon: '🔖' },
];

// Geriye uyumluluk: eskiden tek sabit liste ihraç ediliyordu.
export const EXPENSE_CATEGORIES = BUILTIN_EXPENSE_CATEGORIES;

export const DEFAULT_EXPENSE_CATEGORY = 'yemek';
// "Diğer" her zaman durur: fiş okuma ve bilinmeyen türler buraya düşer.
export const FALLBACK_EXPENSE_CATEGORY = 'diger';

const BUILTIN_BY_VALUE = BUILTIN_EXPENSE_CATEGORIES.reduce((m, c) => ((m[c.value] = c), m), {});
export const EXPENSE_CATEGORY_VALUES = BUILTIN_EXPENSE_CATEGORIES.map((c) => c.value);

// Ayarlardaki kullanıcı türlerini güvenle okur.
function customOf(settings) {
  const arr = settings && Array.isArray(settings.expenseCatsCustom) ? settings.expenseCatsCustom : [];
  return arr.filter((c) => c && typeof c.value === 'string' && c.value);
}

function inactiveOf(settings) {
  const arr = settings && Array.isArray(settings.expenseCatsInactive) ? settings.expenseCatsInactive : [];
  return arr.filter((v) => typeof v === 'string' && v);
}

// Yeniden adlandırmalar: { [value]: { label, icon } }.
// Ad/ikon değişse de ANAHTAR (value) sabit kalır; böylece o türdeki mevcut
// harcamalar kategorisini kaybetmez. Yerleşik türler de bu yolla adlandırılır.
function overridesOf(settings) {
  const o = settings && settings.expenseCatsOverrides;
  return o && typeof o === 'object' ? o : {};
}

// Bir türün yerleşik (özgün) adı — yeniden adlandırma sonrası geri dönmek için.
export function builtinDefaultOf(value) {
  return BUILTIN_BY_VALUE[value] || null;
}

// Yerleşik + kullanıcı türlerinin tamamı (pasifler de dahil), `active` bayrağıyla.
// [{ value, label, icon, builtin, active }]
export function resolveCategories(settings) {
  const inactive = new Set(inactiveOf(settings));
  const ov = overridesOf(settings);
  const seen = new Set();
  const out = [];
  const apply = (c, builtin) => {
    const o = ov[c.value] || {};
    return {
      value: c.value,
      label: (o.label || c.label || c.value).trim() || c.value,
      icon: o.icon || c.icon || '🔖',
      builtin,
      active: !inactive.has(c.value),
      renamed: !!(o.label || o.icon),
    };
  };
  for (const c of BUILTIN_EXPENSE_CATEGORIES) {
    seen.add(c.value);
    out.push(apply(c, true));
  }
  for (const c of customOf(settings)) {
    if (seen.has(c.value)) continue; // yerleşikle çakışmayı yoksay
    seen.add(c.value);
    out.push(apply(c, false));
  }
  return out;
}

// Yalnızca seyahatlerde seçilebilen (aktif) türler.
export function activeCategories(settings) {
  return resolveCategories(settings).filter((c) => c.active);
}

// Çözümlenmiş katalogdan etiket/ikon okur; katalog verilmezse yerleşiğe düşer.
export function catLabel(catalog, value) {
  const hit = (catalog || []).find((c) => c.value === value);
  if (hit) return hit.label;
  return (BUILTIN_BY_VALUE[value] && BUILTIN_BY_VALUE[value].label) || t('cat.diger');
}

export function catIcon(catalog, value) {
  const hit = (catalog || []).find((c) => c.value === value);
  if (hit) return hit.icon;
  return (BUILTIN_BY_VALUE[value] && BUILTIN_BY_VALUE[value].icon) || '🔖';
}

// Yerleşik liste üzerinden etiket/ikon (katalog elde yokken kullanılır).
export function categoryLabel(value) {
  return (BUILTIN_BY_VALUE[value] && BUILTIN_BY_VALUE[value].label) || t('cat.diger');
}

export function categoryIcon(value) {
  return (BUILTIN_BY_VALUE[value] && BUILTIN_BY_VALUE[value].icon) || '🔖';
}

// Kullanıcının yazdığı addan kalıcı bir anahtar üretir ("Otopark Ücreti" → "u_otopark_ucreti").
export function slugifyCategory(label) {
  const base = String(label || '')
    .toLocaleLowerCase('tr')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 32);
  return `u_${base || 'tur'}`;
}
