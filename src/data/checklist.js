// Seyahat hazırlık checklist'i — varsayılan şablon + durum modeli.
// Her seyahat oluşturulurken bu şablon kopyalanır; kullanıcı elle madde ekleyebilir.
import { isOwnVehicle } from './vehicles';
import { t } from '../i18n';

export const CHECK_STATUS = {
  TODO: 'todo',
  DONE: 'done',
  PARTIAL: 'partial',
  SKIP: 'skip',
};

export const CHECK_STATUS_META = {
  todo: { label: t('check.status.todo'), short: '', icon: '⬜' },
  done: { label: t('check.status.done'), short: t('check.status.done'), icon: '✅' },
  partial: { label: t('check.status.partial'), short: t('check.status.partial'), icon: '🟡' },
  skip: { label: t('check.status.skip'), short: t('check.status.skip'), icon: '⛔' },
};

// Dokununca sıradaki duruma geçiş: bekliyor → tamam → kısmen → gerek yok → bekliyor
export const STATUS_CYCLE = ['todo', 'done', 'partial', 'skip'];

export function nextStatus(status) {
  const i = STATUS_CYCLE.indexOf(status);
  return STATUS_CYCLE[(i + 1) % STATUS_CYCLE.length];
}

// Birbiriyle sıkı ilişkili olmayan işler ayrı maddeler olarak tutulur (ör. vize
// pasaporttan; sigorta ilaçtan; kart bildirimi paradan; çeviri uygulaması haritadan
// bağımsız birer görevdir). Yalnızca aynı amaca hizmet edenler tek maddede birleşiktir
// (ör. şarj/adaptör/powerbank hepsi "güç"; bavul & kıyafet aynı hazırlık).
// `key` KALICIDIR ve seyahat verisine yazılır; başlık her zaman seçili dilde
// gösterilir. Böylece dil değişince eski seyahatlerin durum/notları korunur.
const DEFAULT_ITEMS = [
  { key: 'chk.passport', icon: '🛂' },
  { key: 'chk.visa', icon: '📄' },
  { key: 'chk.exitFee', icon: '🛃' },
  { key: 'chk.tickets', icon: '🎫' },
  { key: 'chk.accommodation', icon: '🏨' },
  { key: 'chk.meds', icon: '💊' },
  { key: 'chk.healthInsurance', icon: '🛡️' },
  { key: 'chk.money', icon: '💳' },
  { key: 'chk.bankNotice', icon: '🏦' },
  { key: 'chk.power', icon: '🔌' },
  { key: 'chk.sim', icon: '📱' },
  { key: 'chk.offlineMap', icon: '📲' },
  { key: 'chk.translator', icon: '🈯' },
  { key: 'chk.luggage', icon: '🎒' },
  { key: 'chk.camera', icon: '📷' },
  { key: 'chk.dayPlan', icon: '🗺️' },
];

// ESKİ kayıtlar (anahtarsız, Türkçe başlıklı) için başlık→anahtar eşlemesi.
// Dil değişse bile eski seyahatlerin maddeleri doğru anahtara bağlanır.
const LEGACY_TITLE_KEYS = {
  'pasaport / kimlik geçerliliği': 'chk.passport',
  'vize başvurusu / kontrolü': 'chk.visa',
  'yurt dışı çıkış harcı (ödeme)': 'chk.exitFee',
  'ulaşım biletleri (uçak/tren/otobüs)': 'chk.tickets',
  'konaklama rezervasyonları': 'chk.accommodation',
  'ilaç & kişisel sağlık malzemeleri': 'chk.meds',
  'seyahat sağlık sigortası': 'chk.healthInsurance',
  'para / döviz': 'chk.money',
  'bankaya yurt dışı kart bildirimi': 'chk.bankNotice',
  'şarj aleti, priz adaptörü & powerbank': 'chk.power',
  'e-sim / yerel data hattı': 'chk.sim',
  'offline harita indir': 'chk.offlineMap',
  'çeviri uygulaması': 'chk.translator',
  'bavul & kıyafet (hava durumuna göre)': 'chk.luggage',
  'kamera / telefon & yedek hafıza': 'chk.camera',
  'günlük gezi rotası taslağı': 'chk.dayPlan',
  'yeşil kart (yurt dışı araç trafik sigortası)': 'chk.greenCard',
  'kasko yurt dışı kapsam genişletme': 'chk.kasko',
  'vinyet / otoyol geçiş (hgs · ogs · vinyet)': 'chk.vignette',
};

// Bir maddenin ekranda/belgede görünecek başlığı (anahtar varsa çevrilir).
export function itemTitle(item) {
  if (item?.key) return t(item.key);
  return item?.title || '';
}

// Eşleştirme kimliği: anahtar varsa anahtar, yoksa eski Türkçe başlıktan çözülen
// anahtar, o da yoksa normalleştirilmiş başlık (elle eklenen maddeler).
function identOf(item) {
  if (item?.key) return item.key;
  const n = normTitle(item?.title);
  return LEGACY_TITLE_KEYS[n] || n;
}

// Yurt dışına kendi aracıyla çıkanlar için ek maddeler (yeşil kart + kasko kapsam).
// Yalnızca "kendi aracı" olan vasıtalarda (araba, karavanlar, motosiklet) eklenir.
const VEHICLE_EXIT_ITEMS = [
  { key: 'chk.greenCard', icon: '🟢' },
  { key: 'chk.kasko', icon: '🚗' },
  { key: 'chk.vignette', icon: '🛣️' },
];

// Verilen araca göre tam varsayılan madde listesini ({icon,title}) döndürür.
// Araç sigortası maddeleri, çıkış harcının hemen ardından eklenir.
export function defaultItemsFor(vehicleId) {
  if (!isOwnVehicle(vehicleId)) return [...DEFAULT_ITEMS];
  const at = DEFAULT_ITEMS.findIndex((i) => i.key === 'chk.exitFee') + 1;
  return [...DEFAULT_ITEMS.slice(0, at), ...VEHICLE_EXIT_ITEMS, ...DEFAULT_ITEMS.slice(at)];
}

let counter = 0;
function uid() {
  counter += 1;
  return `chk_${Date.now().toString(36)}_${counter}`;
}

// Yeni bir seyahat için taze checklist üretir (her madde 'todo' durumunda).
// Araç bilgisi verilirse (ör. 'car', 'motokaravan') araç sigortası maddeleri de eklenir.
export function createDefaultChecklist(vehicleId) {
  return defaultItemsFor(vehicleId).map((it) => ({
    id: uid(),
    key: it.key,
    icon: it.icon,
    title: t(it.key),
    status: CHECK_STATUS.TODO,
    note: '',
    custom: false,
  }));
}

// Basit başlık normalleştirmesi (mevcut listede eksik varsayılanları bulmak için).
function normTitle(title) {
  return (title || '').toLocaleLowerCase('tr').replace(/\s+/g, ' ').trim();
}

// Aynı başlıklı yinelenen maddeleri temizler; İLK görüleni korur (kullanıcının
// durumu/notu onda saklıdır), sonrakileri düşürür. Eski kayıtlarda oluşmuş
// çift maddeleri (ör. iki kez eklenen E-SIM) sadeleştirmek için kullanılır.
export function dedupeChecklist(items = []) {
  const seen = new Set();
  const out = [];
  for (const it of items) {
    const key = identOf(it);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(it);
  }
  return out;
}

// Mevcut listeyi güncel varsayılanlarla birleştirir:
//  - Güncel varsayılan maddeler (araca göre) sırasıyla yer alır; başlığı hâlâ
//    eşleşen maddelerin durum ve notu KORUNUR.
//  - Artık varsayılan olmayan eski maddeler (ör. "Pasaport & vize" birleşiği)
//    düşer; elle eklenen (custom) maddeler aynen saklanır.
export function mergeChecklistWithDefaults(existingItems, vehicleId) {
  const existing = existingItems || [];
  const defs = defaultItemsFor(vehicleId);
  const defTitles = new Set(defs.map((d) => d.key));
  const merged = defs.map((it) => {
    const prev = existing.find((e) => identOf(e) === it.key);
    return {
      id: prev?.id || uid(),
      key: it.key,
      icon: it.icon,
      title: t(it.key),
      status: prev?.status || CHECK_STATUS.TODO,
      note: prev?.note || '',
      custom: false,
    };
  });
  const customs = existing.filter((e) => e.custom && !defTitles.has(identOf(e)));
  return dedupeChecklist([...merged, ...customs]);
}

// Mevcut listenin varsayılan bölümü güncel varsayılanlardan farklı mı?
export function checklistNeedsUpdate(existingItems, vehicleId) {
  const defs = new Set(defaultItemsFor(vehicleId).map((d) => d.key));
  const cur = new Set((existingItems || []).filter((e) => !e.custom).map((e) => identOf(e)));
  if (defs.size !== cur.size) return true;
  for (const k of defs) if (!cur.has(k)) return true;
  return false;
}

// Kullanıcının elle eklediği madde.
export function createChecklistItem(title, icon = '📌') {
  return {
    id: uid(),
    icon,
    title: title.trim(),
    status: CHECK_STATUS.TODO,
    note: '',
    custom: true,
  };
}

// Checklist ilerleme özeti.
export function checklistProgress(items = []) {
  const total = items.length;
  const done = items.filter((i) => i.status === 'done').length;
  const partial = items.filter((i) => i.status === 'partial').length;
  const skip = items.filter((i) => i.status === 'skip').length;
  const todo = items.filter((i) => i.status === 'todo').length;
  // "Gerek Yok" hariç tutularak tamamlanma oranı; kısmi = yarım sayılır.
  const relevant = total - skip;
  const ratio = relevant === 0 ? 1 : (done + partial * 0.5) / relevant;
  return { total, done, partial, skip, todo, ratio };
}
