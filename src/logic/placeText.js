// Mekân özetini SEÇİLİ ARAYÜZ DİLİNDE getirir (çevrimiçiyken).
//
// Yerel arşivdeki (data/places, attractions) açıklamalar Türkçedir. Arayüz
// İngilizce/Almanca seçildiğinde, mekânın özetini Wikipedia'nın o dildeki
// sürümünden çekip gösteririz. Bulunamazsa ya da çevrimdışıysak arşivdeki
// Türkçe metne düşülür — yani hiçbir durumda boş kalmaz.
//
// Not: Bu yalnızca GÖSTERİM içindir; kayıtlı veriyi değiştirmez.
import { storageGet, storageSet } from './storage';
import { getLang, DEFAULT_LANG } from '../i18n';

const CACHE_KEY = 'gg_place_text_cache_v1';
const FAIL_TTL = 7 * 24 * 3600 * 1000; // başarısız aramayı 7 gün sonra tekrar dene

let mem = null;

async function loadCache() {
  if (mem) return mem;
  try {
    const raw = await storageGet(CACHE_KEY);
    mem = raw ? (typeof raw === 'string' ? JSON.parse(raw) : raw) : {};
  } catch (e) {
    mem = {};
  }
  return mem;
}

async function saveCache() {
  try {
    await storageSet(CACHE_KEY, JSON.stringify(mem));
  } catch (e) {
    /* yoksay */
  }
}

// Parantez içini ve gereksiz ekleri atarak arama başlığı üretir.
function cleanTitle(name) {
  return (name || '')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Denenecek başlık adayları: temiz ad, parantez içi ad, "ad, şehir".
export function titleCandidates(place) {
  const out = [];
  const push = (v) => {
    const s = (v || '').trim();
    if (s.length >= 2 && !out.includes(s)) out.push(s);
  };
  push(cleanTitle(place?.name));
  const m = (place?.name || '').match(/\(([^)]+)\)/);
  if (m) push(m[1]);
  if (place?.city) push(`${cleanTitle(place.name)}, ${place.city}`);
  return out;
}

// Wikipedia REST özeti. Bulunamazsa null; ağ hatasında throw.
async function fetchSummary(lang, title) {
  const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  let res;
  try {
    res = await fetch(url, { headers: { accept: 'application/json' } });
  } catch (e) {
    throw new Error('network');
  }
  if (!res.ok) return null;
  let data;
  try {
    data = await res.json();
  } catch (e) {
    return null;
  }
  // Belirsizlik (disambiguation) sayfalarını ve boş özetleri atla.
  if (!data || data.type === 'disambiguation') return null;
  const extract = (data.extract || '').trim();
  if (extract.length < 40) return null;
  return {
    extract,
    title: data.title || title,
    url: (data.content_urls && data.content_urls.desktop && data.content_urls.desktop.page) || '',
    lang,
  };
}

function keyOf(place, lang) {
  return `${lang}|${place?.id || cleanTitle(place?.name)}|${place?.city || ''}`;
}

// Seçili dilde özet döndürür. Dil Türkçe ise (arşiv zaten Türkçe) null döner —
// çağıran arşivdeki metni kullanır.
export async function resolveLocalizedSummary(place, langOverride) {
  const lang = langOverride || getLang();
  if (!place || !(place.name || place.id)) return null;
  if (lang === DEFAULT_LANG) return null; // Türkçe: yerel arşiv zaten uygun

  const cache = await loadCache();
  const key = keyOf(place, lang);
  const hit = cache[key];
  const now = Date.now();
  if (hit && hit.extract) return hit;
  if (hit && hit.fail && now - hit.fail < FAIL_TTL) return null;

  try {
    for (const title of titleCandidates(place)) {
      // eslint-disable-next-line no-await-in-loop
      const found = await fetchSummary(lang, title);
      if (found) {
        cache[key] = found;
        await saveCache();
        return found;
      }
    }
    cache[key] = { fail: now };
    await saveCache();
    return null;
  } catch (e) {
    // Çevrimdışı: önbelleğe yazma, sonraki denemede tekrar sor.
    return null;
  }
}
