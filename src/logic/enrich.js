// Tarihi & kültürel zenginleştirme.
// Öncelik sırası:
//   1) Yerel (çevrimdışı) yerler veri tabanında eşleşme ara.
//   2) Ayarlar'dan "Canlı AI" açıksa ve API anahtarı varsa, gerçek AI özeti iste.
//   3) Aksi hâlde kullanıcının elle dolduracağı boş şablon üret.
import { matchPlace } from '../data/places';
import { todayKey } from './date';
import { LANG_NAME, getLang } from '../i18n';

export const ENRICH_SOURCE = {
  LOCAL: 'local',
  AI: 'ai',
  TEMPLATE: 'template',
};

// Girdiden şehir/ülke ayıklamaya çalışır ("Efes, Selçuk" gibi).
function splitQuery(query) {
  const parts = (query || '').split(',').map((s) => s.trim()).filter(Boolean);
  return { placeName: parts[0] || query || '', hint: parts.slice(1).join(', ') };
}

function templateResult(query, { date, coords } = {}) {
  const { placeName } = splitQuery(query);
  return {
    source: ENRICH_SOURCE.TEMPLATE,
    placeName: placeName || 'Bilinmeyen Mekan',
    city: '',
    country: '',
    date: date || todayKey(),
    lat: coords?.lat ?? null,
    lng: coords?.lng ?? null,
    summary: '',
    sources: [],
  };
}

// Ana giriş noktası. Her zaman bir sonuç objesi döndürür (asla throw etmez).
export async function enrichPlace(query, { settings, date, coords } = {}) {
  const local = matchPlace(query);
  if (local) {
    return {
      source: ENRICH_SOURCE.LOCAL,
      placeId: local.id,
      placeName: local.name,
      city: local.city,
      country: local.country,
      date: date || todayKey(),
      lat: coords?.lat ?? local.lat,
      lng: coords?.lng ?? local.lng,
      summary: local.summary,
      sources: local.sources,
    };
  }

  if (settings?.aiMode === 'ai' && settings?.apiKey) {
    try {
      const ai = await enrichWithAI(query, settings, { date, coords });
      return ai;
    } catch (e) {
      // AI başarısız olursa şablona düş, ama hatayı bildir.
      return { ...templateResult(query, { date, coords }), aiError: e.message || 'AI isteği başarısız.' };
    }
  }

  return templateResult(query, { date, coords });
}

const PROMPT = (place, hint, coords) => {
  const loc = [hint, coords ? `koordinat: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : '']
    .filter(Boolean)
    .join(' — ');
  return (
    `Bir seyahat günlüğü için "${place}"${loc ? ' (' + loc + ')' : ''} hakkında ${LANG_NAME[getLang()] || 'Türkçe'} bir bölüm hazırla.\n` +
    `Kurallar: Akıcı, ilgi çekici, edebi ama bilgilendirici; en fazla 3 paragraf. ` +
    `Yerin tarihi önemini, mitolojisini veya kültürel mirasını vurgula.\n` +
    `Yanıtı SADECE şu JSON şemasıyla ver (başka metin yok):\n` +
    `{"placeName":"tam ad","city":"şehir","country":"ülke","summary":"özet metni","sources":["kaynak1","kaynak2"]}`
  );
};

// Canlı AI çağrısı — OpenAI veya Anthropic (Claude) uçları desteklenir.
async function enrichWithAI(query, settings, { date, coords } = {}) {
  const { placeName, hint } = splitQuery(query);
  const prompt = PROMPT(placeName, hint, coords);
  const provider = settings.apiProvider || 'openai';

  let text;
  if (provider === 'claude') {
    text = await callClaude(prompt, settings);
  } else {
    text = await callOpenAI(prompt, settings);
  }

  const parsed = safeParseJson(text);
  return {
    source: ENRICH_SOURCE.AI,
    placeName: parsed.placeName || placeName,
    city: parsed.city || '',
    country: parsed.country || '',
    date: date || todayKey(),
    lat: coords?.lat ?? null,
    lng: coords?.lng ?? null,
    summary: (parsed.summary || '').trim(),
    sources: Array.isArray(parsed.sources) ? parsed.sources : [],
  };
}

async function callOpenAI(prompt, settings) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${settings.apiKey}`,
    },
    body: JSON.stringify({
      model: settings.apiModel || 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI hata: ${res.status}`);
  const data = await res.json();
  return data?.choices?.[0]?.message?.content || '';
}

async function callClaude(prompt, settings) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': settings.apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: settings.apiModel || 'claude-3-5-sonnet-latest',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!res.ok) throw new Error(`Claude hata: ${res.status}`);
  const data = await res.json();
  return data?.content?.[0]?.text || '';
}

// Modelin döndürdüğü metinden ilk JSON bloğunu güvenle ayıklar.
function safeParseJson(text) {
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch (e) {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(text.slice(start, end + 1));
      } catch (e2) {
        return { summary: text.trim() };
      }
    }
    return { summary: text.trim() };
  }
}
