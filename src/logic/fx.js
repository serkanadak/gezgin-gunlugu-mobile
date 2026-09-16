// Döviz kuru & çevrim yardımcıları (harcama takibi için).
//
// Harcama tutarını EUR / USD / TL karşılıklarına çevirir. Canlı kurlar
// anahtarsız, ücretsiz bir uçtan (open.er-api.com — USD tabanlı) alınır ve
// günde bir önbelleğe yazılır. Çevrimdışıysa en son önbellek kullanılır; hiç
// kur yoksa çevrim yapılamaz (null döner) ama harcama yine de kaydedilir.
import { storageGet, storageSet } from './storage';
import { t, LOCALE, getLang } from '../i18n';

const CACHE_KEY = 'gg_fx_rates_v1';
const API_URL = 'https://open.er-api.com/v6/latest/USD';

// Uygulamada seçilebilen para birimleri (sembol + ad). Kur uçları hepsini kapsar.
export const CURRENCIES = [
  { code: 'TRY', symbol: '₺', label: t('cur.TRY') },
  { code: 'EUR', symbol: '€', label: t('cur.EUR') },
  { code: 'USD', symbol: '$', label: t('cur.USD') },
  { code: 'GBP', symbol: '£', label: t('cur.GBP') },
  { code: 'CHF', symbol: 'CHF', label: t('cur.CHF') },
  { code: 'JPY', symbol: '¥', label: t('cur.JPY') },
];

// Harcamalarda özet gösterilen üç hedef para birimi.
export const TARGETS = ['EUR', 'USD', 'TRY'];

export const SYMBOLS = CURRENCIES.reduce((m, c) => ((m[c.code] = c.symbol), m), {});

export function currencySymbol(code) {
  return SYMBOLS[code] || code || '';
}

let mem = null;

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

// USD tabanlı kur tablosunu döndürür: { base:'USD', rates:{USD:1,EUR:..,TRY:..}, date }.
// Günlük önbellek; çevrimdışıysa eldeki önbelleği verir; hiç yoksa null.
export async function getRates() {
  const today = todayStr();
  if (mem && mem.day === today) return mem;
  if (!mem) {
    try {
      const cached = await storageGet(CACHE_KEY);
      if (cached) mem = typeof cached === 'string' ? JSON.parse(cached) : cached;
    } catch (e) {
      /* yoksay */
    }
  }
  if (mem && mem.day === today && mem.rates) return mem;

  try {
    const res = await fetch(API_URL, { headers: { accept: 'application/json' } });
    if (res.ok) {
      const data = await res.json();
      if (data && data.result === 'success' && data.rates) {
        mem = { day: today, base: 'USD', rates: data.rates, fetchedAt: Date.now() };
        try {
          await storageSet(CACHE_KEY, JSON.stringify(mem));
        } catch (e) {
          /* yoksay */
        }
        return mem;
      }
    }
  } catch (e) {
    /* ağ hatası → eldeki önbellek (eskimiş olsa da) kullanılır */
  }
  return mem && mem.rates ? mem : null;
}

// USD tabanlı kurlarla `amount` (currency cinsinden) → hedef para birimine çevirir.
function convertOne(amount, currency, target, rates) {
  const rc = rates[currency];
  const rt = rates[target];
  if (!rc || !rt) return null;
  return (amount / rc) * rt;
}

// Tutarı EUR / USD / TL karşılıklarına çevirir. Kur yoksa null döner.
// { EUR, USD, TRY } sayısal karşılıklar (yoksa alan null).
export function convertAll(amount, currency, ratesObj) {
  const rates = ratesObj && ratesObj.rates ? ratesObj.rates : null;
  const n = Number(amount);
  if (!rates || !isFinite(n)) return null;
  const out = {};
  for (const code of TARGETS) out[code] = convertOne(n, currency, code, rates);
  if (TARGETS.every((code) => out[code] == null)) return null;
  return out;
}

// Tutarı okunur biçimde yazar: "₺1.250,50" benzeri (TR yerelleştirme).
export function formatMoney(amount, currency) {
  const n = Number(amount);
  if (!isFinite(n)) return '—';
  const frac = currency === 'JPY' ? 0 : 2;
  let num;
  try {
    num = n.toLocaleString(LOCALE[getLang()] || 'tr-TR', { minimumFractionDigits: frac, maximumFractionDigits: frac });
  } catch (e) {
    num = n.toFixed(frac);
  }
  const sym = currencySymbol(currency);
  // Sembol harf ise (CHF) arkaya, değilse öne.
  return /^[A-Za-z]/.test(sym) ? `${num} ${sym}` : `${sym}${num}`;
}
