// Yerel tarih yardımcıları (saat dilimi kaymasını önlemek için Date.toISOString yerine elle biçimlendirme).
// Ay/gün adları seçili arayüz dilinden gelir.
import { t } from '../i18n';

export function todayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const AYLAR = t('date.months').split(',');
const AYLAR_KISA = t('date.monthsShort').split(',');
const GUNLER = t('date.days').split(',');

// 'YYYY-MM-DD' -> '9 Temmuz 2026, Perşembe'
export function formatLongDate(key) {
  if (!key) return '';
  const [y, m, d] = key.split('-').map(Number);
  if (!y || !m || !d) return key;
  const date = new Date(y, m - 1, d);
  return `${d} ${AYLAR[m - 1]} ${y}, ${GUNLER[date.getDay()]}`;
}

// 'YYYY-MM-DD' -> '9 Tem'
export function formatShortDate(key) {
  if (!key) return '';
  const [y, m, d] = key.split('-').map(Number);
  if (!y || !m || !d) return key;
  return `${d} ${AYLAR_KISA[m - 1] || AYLAR[m - 1].slice(0, 3)}`;
}

// İki tarih arasındaki gün sayısı (dahil). Geçersizse null.
export function daysBetween(startKey, endKey) {
  if (!startKey || !endKey) return null;
  const s = new Date(startKey);
  const e = new Date(endKey);
  if (isNaN(s) || isNaN(e)) return null;
  return Math.round((e - s) / 86400000) + 1;
}

// 'YYYY-MM-DD' biçim doğrulaması.
export function isValidDateKey(key) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(key || '')) return false;
  const d = new Date(key);
  return !isNaN(d);
}
