// Harcama raporu için saf toplama yardımcıları.
// Her harcamanın eq = { EUR, USD, TRY } karşılığı üzerinden, seçilen hedef para
// biriminde tutarlı toplamlar üretir. Karşılığı olmayan (çevrimdışı eklenmiş)
// kayıtlar `missing` olarak sayılır ama toplama katılmaz.
import { BUILTIN_EXPENSE_CATEGORIES, catLabel, catIcon } from '../data/expenseCategories';
import { paymentLabel, paymentIcon } from '../data/paymentMethods';
import { t } from '../i18n';
import { currencySymbol } from './fx';

// Katalog verilmezse yerleşik türlere düşer (etiket/sıra için).
function catalogOf(catalog) {
  return catalog && catalog.length ? catalog : BUILTIN_EXPENSE_CATEGORIES;
}

// Tür başına harcama sayısı (tüm seyahatlerde): { [kind]: adet }.
// Ayarlar'da bir türün silinebilir mi (hiç kullanılmamış) olduğunu belirlemek için.
export function categoryUsage(trips) {
  const out = {};
  for (const tr of trips || []) {
    for (const e of tr.expenses || []) {
      const key = (e && e.kind) || 'diger';
      out[key] = (out[key] || 0) + 1;
    }
  }
  return out;
}

export function sumIn(expenses, cur) {
  let total = 0;
  let converted = 0;
  let missing = 0;
  for (const e of expenses || []) {
    if (e && e.eq && typeof e.eq[cur] === 'number') {
      total += e.eq[cur];
      converted += 1;
    } else {
      missing += 1;
    }
  }
  return { total, converted, missing, count: (expenses || []).length };
}

// Ödeme şekli kırılımı: seçilen para biriminde nakit / kart / diğer toplamları.
export function paymentSplit(expenses, cur) {
  const out = { nakit: 0, kart: 0, other: 0 };
  for (const e of expenses || []) {
    if (!(e && e.eq && typeof e.eq[cur] === 'number')) continue;
    if (e.payment === 'nakit') out.nakit += e.eq[cur];
    else if (e.payment === 'kart') out.kart += e.eq[cur];
    else out.other += e.eq[cur];
  }
  return out;
}

// Tür (kategori) bazında kırılım: [{ value, label, icon, total, count }] tutara göre azalan.
// `catalog` verilirse etiket/ikon oradan (kullanıcı türleri dahil) okunur.
export function categoryBreakdown(expenses, cur, catalog) {
  const cat = catalogOf(catalog);
  const map = new Map();
  for (const e of expenses || []) {
    const key = (e && e.kind) || 'diger';
    const row = map.get(key) || { value: key, total: 0, count: 0 };
    row.count += 1;
    if (e && e.eq && typeof e.eq[cur] === 'number') row.total += e.eq[cur];
    map.set(key, row);
  }
  const rows = [...map.values()].map((r) => ({ ...r, label: catLabel(cat, r.value), icon: catIcon(cat, r.value) }));
  rows.sort((a, b) => b.total - a.total || b.count - a.count);
  return rows;
}

// Ödendiği (özgün) para birimine göre kırılım.
//  native : o para biriminde ödenen HAM toplam (asıl merak edilen: kaç euro
//           nakit/kart çıktı, kaç lira harcandı…)
//  total  : seçilen rapor para birimindeki karşılığı (çubuk/sıralama için —
//           farklı para birimleri ancak böyle kıyaslanabilir)
export function currencyBreakdown(expenses, cur) {
  const map = new Map();
  for (const e of expenses || []) {
    const code = (e && e.currency) || '?';
    const row = map.get(code) || { value: code, native: 0, total: 0, count: 0, missing: 0 };
    row.count += 1;
    const amt = Number(e && e.amount);
    if (isFinite(amt)) row.native += amt;
    if (e && e.eq && typeof e.eq[cur] === 'number') row.total += e.eq[cur];
    else row.missing += 1;
    map.set(code, row);
  }
  const rows = [...map.values()].map((r) => ({ ...r, label: `${currencySymbol(r.value)} ${r.value}` }));
  rows.sort((a, b) => b.total - a.total || b.count - a.count);
  return rows;
}

// Para birimi × Seyahat çapraz tablosu. Hücreler SEÇİLEN rapor para biriminde
// (farklı birimler ancak çevrilmiş hâlde toplanabilir); satır etiketi harcamanın
// ödendiği özgün para birimidir.
export function currencyTripMatrix(trips, cur) {
  const cols = (trips || [])
    .filter((tr) => (tr.expenses || []).length)
    .map((tr) => ({ id: tr.id, title: tr.title || t('nav.trip'), startDate: tr.startDate || '', total: 0 }));

  const used = new Set();
  const data = {};
  for (const tr of trips || []) {
    if (!(tr.expenses || []).length) continue;
    for (const e of tr.expenses || []) {
      const code = (e && e.currency) || '?';
      used.add(code);
      if (!(e && e.eq && typeof e.eq[cur] === 'number')) continue;
      data[code] = data[code] || {};
      data[code][tr.id] = (data[code][tr.id] || 0) + e.eq[cur];
    }
  }

  const rows = [...used]
    .map((code) => {
      const row = data[code] || {};
      const total = Object.values(row).reduce((a, b) => a + b, 0);
      return { value: code, label: `${currencySymbol(code)} ${code}`, icon: '💱', total };
    })
    .sort((a, b) => b.total - a.total);

  let grand = 0;
  for (const col of cols) {
    let s = 0;
    for (const r of rows) s += (data[r.value] && data[r.value][col.id]) || 0;
    col.total = s;
    grand += s;
  }

  return { rows, cols, data, grand };
}

// Güzergah durağına göre kırılım (TEK seyahat içinde).
// Duraklar seyahate özgü olduğu için bu bir çapraz tablo değil, o seyahatin
// durak listesidir; durağa bağlanmamış harcamalar sonda "rota dışı" satırında.
export function stopBreakdown(trip, cur) {
  const stops = (trip && trip.stops) || [];
  const expenses = (trip && trip.expenses) || [];
  const rows = stops.map((st, i) => ({
    value: st.id,
    label: `${i + 1}. ${st.name}`,
    icon: '🗺️',
    total: 0,
    count: 0,
  }));
  const byId = new Map(rows.map((r) => [r.value, r]));
  const free = { value: '__free__', label: t('doc.offRoute'), icon: '🌟', total: 0, count: 0 };
  for (const e of expenses) {
    const row = (e && e.stopId && byId.get(e.stopId)) || free;
    row.count += 1;
    if (e && e.eq && typeof e.eq[cur] === 'number') row.total += e.eq[cur];
  }
  const out = rows.filter((r) => r.count > 0);
  if (free.count) out.push(free);
  return out;
}

// Tür × Seyahat çapraz tablosu (pivot): satır = tür, kolon = seyahat,
// hücre = seçilen para biriminde harcama. Yalnızca harcaması olan seyahatler
// (kolon) ve kullanılmış türler (satır) yer alır. Satır/kolon toplamları ve
// genel toplam da döner.
export function categoryTripMatrix(trips, cur, catalog) {
  const cat = catalogOf(catalog);
  const cols = (trips || [])
    .filter((tr) => (tr.expenses || []).length)
    .map((tr) => ({ id: tr.id, title: tr.title || t('nav.trip'), startDate: tr.startDate || '', total: 0 }));

  const used = new Set();
  const data = {}; // data[catValue][tripId] = toplam
  for (const tr of trips || []) {
    if (!(tr.expenses || []).length) continue;
    for (const e of tr.expenses || []) {
      const key = (e && e.kind) || 'diger';
      used.add(key);
      if (!(e && e.eq && typeof e.eq[cur] === 'number')) continue;
      data[key] = data[key] || {};
      data[key][tr.id] = (data[key][tr.id] || 0) + e.eq[cur];
    }
  }

  const rowOf = (value) => {
    const row = data[value] || {};
    const total = Object.values(row).reduce((a, b) => a + b, 0);
    return { value, label: catLabel(cat, value), icon: catIcon(cat, value), total };
  };
  // Katalog sırasında kullanılmış türler + katalogda olmayan (ör. sonradan
  // kaldırılmış) türler sonda → hiçbir harcama tablodan düşmez.
  const known = new Set(cat.map((c) => c.value));
  const cats = [
    ...cat.filter((c) => used.has(c.value)).map((c) => rowOf(c.value)),
    ...[...used].filter((v) => !known.has(v)).map(rowOf),
  ];

  let grand = 0;
  for (const col of cols) {
    let s = 0;
    for (const c of cats) s += (data[c.value] && data[c.value][col.id]) || 0;
    col.total = s;
    grand += s;
  }

  return { cats, cols, data, grand };
}

// Ödeme şekli × Seyahat çapraz tablosu (pivot): satır = ödeme şekli
// (nakit / kart / belirsiz), kolon = seyahat, hücre = seçilen para biriminde
// harcama. Kullanılmayan satırlar gizlenir.
export function paymentTripMatrix(trips, cur) {
  const cols = (trips || [])
    .filter((tr) => (tr.expenses || []).length)
    .map((tr) => ({ id: tr.id, title: tr.title || t('nav.trip'), startDate: tr.startDate || '', total: 0 }));

  const used = new Set();
  const data = {};
  for (const tr of trips || []) {
    if (!(tr.expenses || []).length) continue;
    for (const e of tr.expenses || []) {
      const key = e && (e.payment === 'nakit' || e.payment === 'kart') ? e.payment : 'other';
      used.add(key);
      if (!(e && e.eq && typeof e.eq[cur] === 'number')) continue;
      data[key] = data[key] || {};
      data[key][tr.id] = (data[key][tr.id] || 0) + e.eq[cur];
    }
  }

  const defs = [
    { value: 'nakit', label: paymentLabel('nakit'), icon: paymentIcon('nakit') },
    { value: 'kart', label: paymentLabel('kart'), icon: paymentIcon('kart') },
    { value: 'other', label: t('pay.unknown'), icon: '💰' },
  ];
  const rows = defs
    .filter((d) => used.has(d.value))
    .map((d) => {
      const row = data[d.value] || {};
      const total = Object.values(row).reduce((a, b) => a + b, 0);
      return { ...d, total };
    });

  let grand = 0;
  for (const col of cols) {
    let s = 0;
    for (const r of rows) s += (data[r.value] && data[r.value][col.id]) || 0;
    col.total = s;
    grand += s;
  }

  return { rows, cols, data, grand };
}

// Seyahatler arası karşılaştırma: her seyahat için seçilen para biriminde toplam.
// `category` verilirse yalnızca o tür (kategori); `payment` verilirse yalnızca o
// ödeme şekli (nakit/kart) süzülür. İkisi de boşsa tüm harcamalar toplanır.
export function tripComparison(trips, cur, category, payment) {
  return (trips || [])
    .map((tr) => {
      let list = tr.expenses || [];
      if (category) list = list.filter((e) => ((e && e.kind) || 'diger') === category);
      if (payment) list = list.filter((e) => e && e.payment === payment);
      const s = sumIn(list, cur);
      return {
        id: tr.id,
        title: tr.title || t('nav.trip'),
        startDate: tr.startDate || '',
        finished: !!tr.finished,
        total: s.total,
        count: s.count,
        missing: s.missing,
      };
    })
    .sort((a, b) => b.total - a.total);
}
