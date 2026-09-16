// Fiş okuma (görüntüden harcama ayıklama).
//
// Ayarlar'da "Canlı AI" açık ve API anahtarı varsa, fiş fotoğrafı bir görüntü
// anlayan modele gönderilir ve alınan hizmet/mal + tutar + para birimi JSON
// olarak ayıklanır. Anahtar yoksa veya çağrı başarısızsa hata fırlatır; çağıran
// ekran kullanıcıyı elle doldurmaya yönlendirir.
import { CURRENCIES } from './fx';
import { activeCategories, FALLBACK_EXPENSE_CATEGORY } from '../data/expenseCategories';
import { PAYMENT_VALUES } from '../data/paymentMethods';
import { LANG_NAME, getLang } from '../i18n';

const CODES = CURRENCIES.map((c) => c.code).join(', ');

// İstem, kullanıcının o an AKTİF türlerine göre kurulur (kendi eklediği türler
// dahil, pasifleştirdikleri hariç) — fiş otomatik olarak doğru türe düşsün.
function buildPrompt(cats) {
  const list = cats.map((c) => `${c.value} (${c.label})`).join(', ');
  return (
    `Bu bir alışveriş/hizmet fişi ya da fatura fotoğrafı. Görüntüyü incele ve ` +
    `harcamayı çıkar. Alınan mal veya hizmetin kısa ${LANG_NAME[getLang()] || 'Türkçe'} adını, ödenen TOPLAM ` +
    `tutarı (sayı) ve para birimini belirle. Para birimi şu kodlardan biri olmalı: ` +
    `${CODES} (fişteki sembol/ülkeye göre; ₺/TL→TRY, €→EUR, $→USD, £→GBP). ` +
    `Harcamayı şu kategorilerden EN UYGUN olanına yerleştir ve anahtar değerini ("value") döndür: ` +
    `${list}. Emin değilsen "${FALLBACK_EXPENSE_CATEGORY}" kullan.\n` +
    `Ödeme şeklini belirle: fişte NAKİT/CASH yazıyorsa "nakit", KREDİ KARTI/KART/VISA/` +
    `MASTERCARD/CARD yazıyorsa "kart". Anlaşılmıyorsa "payment" alanını boş bırak.\n` +
    `Yanıtı SADECE şu JSON şemasıyla ver, başka metin yazma:\n` +
    `{"label":"kısa ad","amount":123.45,"currency":"TRY","kind":"${cats[0]?.value || FALLBACK_EXPENSE_CATEGORY}","payment":"kart"}`
  );
}

// data URI ("data:image/jpeg;base64,....") → { mediaType, base64 }.
function splitDataUri(uri) {
  const m = /^data:([^;]+);base64,(.*)$/.exec(uri || '');
  if (!m) return null;
  return { mediaType: m[1], base64: m[2] };
}

function safeParseJson(text) {
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch (e) {
    const s = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (s >= 0 && end > s) {
      try {
        return JSON.parse(text.slice(s, end + 1));
      } catch (e2) {
        return {};
      }
    }
    return {};
  }
}

async function callOpenAIVision(dataUri, settings, prompt) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${settings.apiKey}`,
    },
    body: JSON.stringify({
      model: settings.apiModel || 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: dataUri } },
          ],
        },
      ],
      temperature: 0,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI hata: ${res.status}`);
  const data = await res.json();
  return data?.choices?.[0]?.message?.content || '';
}

async function callClaudeVision(dataUri, settings, prompt) {
  const parts = splitDataUri(dataUri);
  if (!parts) throw new Error('Fiş görüntüsü okunamadı.');
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': settings.apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: settings.apiModel || 'claude-3-5-sonnet-latest',
      max_tokens: 512,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: parts.mediaType, data: parts.base64 } },
            { type: 'text', text: prompt },
          ],
        },
      ],
    }),
  });
  if (!res.ok) throw new Error(`Claude hata: ${res.status}`);
  const data = await res.json();
  return data?.content?.[0]?.text || '';
}

const VALID_CODES = new Set(CURRENCIES.map((c) => c.code));

// Fiş fotoğrafından { label, amount, currency, kind } ayıklar. Başarısızsa throw.
export async function readReceipt(dataUri, settings) {
  if (!(settings?.aiMode === 'ai' && settings?.apiKey)) {
    throw new Error('AI kapalı');
  }
  if (!dataUri || !/^data:image\//.test(dataUri)) {
    throw new Error('Geçerli bir fiş görüntüsü gerekli (web).');
  }
  // Yalnızca aktif türler önerilir; hepsi pasifse yerleşiklere düşülür.
  const cats = activeCategories(settings);
  const usable = cats.length ? cats : [{ value: FALLBACK_EXPENSE_CATEGORY, label: 'Diğer' }];
  const prompt = buildPrompt(usable);
  const provider = settings.apiProvider || 'openai';
  const text = provider === 'claude'
    ? await callClaudeVision(dataUri, settings, prompt)
    : await callOpenAIVision(dataUri, settings, prompt);

  const parsed = safeParseJson(text);
  const amount = Number(String(parsed.amount).replace(',', '.'));
  const currency = VALID_CODES.has(parsed.currency) ? parsed.currency : 'TRY';
  const kind = usable.some((c) => c.value === parsed.kind) ? parsed.kind : FALLBACK_EXPENSE_CATEGORY;
  const payment = PAYMENT_VALUES.includes(parsed.payment) ? parsed.payment : null;
  return {
    label: (parsed.label || '').toString().trim(),
    amount: isFinite(amount) ? amount : null,
    currency,
    kind,
    payment,
  };
}
