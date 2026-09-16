// Harcama raporunun yazdırılabilir (PDF) hâli.
//
// Ekrandaki raporun TÜM bölümlerini aynı sırayla, kâğıda uygun biçimde üretir:
// toplam + ödeme şekli, tür kırılımı, durak kırılımı, para birimi kırılımı,
// para birimi × seyahat, tür × seyahat, ödeme × seyahat, seyahat
// karşılaştırması ve en sonda harcama dökümü (satır satır liste). Döküm
// kâğıtta işe yarıyor: raporun sayıları nereden geldiği görünür oluyor.
//
// Hesaplar ekranla AYNI fonksiyonlardan gelir (logic/expenseReport.js), bu
// yüzden PDF ile ekran arasında sayı farkı oluşamaz.
import {
  sumIn,
  paymentSplit,
  categoryBreakdown,
  currencyBreakdown,
  currencyTripMatrix,
  stopBreakdown,
  categoryTripMatrix,
  paymentTripMatrix,
  tripComparison,
} from './expenseReport';
import { formatMoney, currencySymbol } from './fx';
import { resolveCategories, catLabel, catIcon } from '../data/expenseCategories';
import { paymentLabel, paymentIcon } from '../data/paymentMethods';
import { formatShortDate, formatLongDate } from './date';
import { LANG_TAG, getLang, t } from '../i18n';
import { printDocument } from './printDoc';

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

const CSS = `
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #f2f2f2; color: #14202b;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
  .doc { background: #fff; max-width: 210mm; margin: 10px auto; padding: 16mm; box-shadow: 0 2px 12px rgba(0,0,0,0.15); }
  .doc-title { font-size: 26px; font-weight: 900; color: #0b3a5b; }
  .doc-sub { font-size: 14px; color: #55636e; margin: 4px 0 6px; }
  .sec { margin-top: 18px; break-inside: avoid; }
  .sec-h { font-size: 12px; font-weight: 800; letter-spacing: .6px; text-transform: uppercase;
    color: #0b3a5b; border-bottom: 2px solid #0b3a5b; padding-bottom: 3px; margin-bottom: 8px; }
  .sec-sub { font-size: 11.5px; color: #7a8791; margin: -4px 0 8px; line-height: 1.45; }
  .total { background: #0b3a5b; color: #fff; border-radius: 8px; padding: 12px 14px; }
  .total .cap { font-size: 11px; opacity: .85; }
  .total .big { font-size: 26px; font-weight: 900; margin-top: 2px; }
  .total .meta { font-size: 11px; opacity: .85; margin-top: 4px; }
  .pay { display: flex; gap: 10px; margin-top: 8px; }
  .pay div { flex: 1; border: 1px solid #dde3e8; border-radius: 8px; padding: 8px 10px; }
  .pay .l { font-size: 11px; color: #7a8791; }
  .pay .v { font-size: 15px; font-weight: 800; }
  table { width: 100%; border-collapse: collapse; font-size: 11.5px; }
  th, td { border: 1px solid #dde3e8; padding: 5px 7px; text-align: right; vertical-align: top; }
  th { background: #eef3f7; font-weight: 800; color: #0b3a5b; }
  th:first-child, td:first-child { text-align: left; }
  tr.total-row td { font-weight: 800; background: #f6f9fb; }
  td.cur-col, th.cur-col { background: #fff8e6; }
  .bar { height: 5px; background: #e6ecf1; border-radius: 3px; margin-top: 3px; }
  .bar span { display: block; height: 5px; background: #0b3a5b; border-radius: 3px; }
  .muted { color: #7a8791; font-style: italic; font-size: 12px; }
  .wide { overflow-x: visible; }
  /* Döküm tablosu 7 kolonlu: A4'e sığması için sabit yerleşim ve küçük punto. */
  table.items { table-layout: fixed; font-size: 10px; }
  table.items th, table.items td { padding: 4px 5px; overflow-wrap: anywhere; }
  table.items col.c-date { width: 11%; }
  table.items col.c-desc { width: 22%; }
  table.items col.c-cat  { width: 16%; }
  table.items col.c-pay  { width: 14%; }
  table.items col.c-stop { width: 15%; }
  table.items col.c-amt  { width: 11%; }
  table.items col.c-eq   { width: 11%; }
  .foot { margin-top: 22px; font-size: 10.5px; color: #9aa5ad; border-top: 1px solid #e6ecf1; padding-top: 6px; }
  @media print {
    html, body { background: #fff; }
    .doc { max-width: none; margin: 0; padding: 0; box-shadow: none; }
    thead { display: table-header-group; }
    tr { break-inside: avoid; }
    @page { size: A4; margin: 12mm; }
  }
`;

const money = (v, cur) => esc(formatMoney(v, cur));

// Satır etiketi + tutar + pay çubuğu olan basit tablo.
function shareTable(rows, cur, total, headLabel) {
  if (!rows.length) return '';
  const body = rows
    .map((r) => {
      const share = total ? Math.max(0, Math.min(1, r.total / total)) : 0;
      return (
        `<tr><td>${esc(r.icon || '')} ${esc(r.label)}` +
        `<div class="bar"><span style="width:${(share * 100).toFixed(1)}%"></span></div></td>` +
        `<td>${money(r.total, cur)}</td>` +
        `<td>${esc(t('common.pct', { n: Math.round(share * 100) }))}</td>` +
        `<td>${r.count}</td></tr>`
      );
    })
    .join('');
  return (
    `<table><thead><tr><th>${esc(headLabel)}</th><th>${esc(t('common.total'))}</th>` +
    `<th>${esc(t('rep.colShare'))}</th><th>${esc(t('rep.colCount'))}</th></tr></thead>` +
    `<tbody>${body}</tbody></table>`
  );
}

// Çapraz tablo (satır = tür/ödeme/para birimi, kolon = seyahat).
function matrixTable(rows, cols, data, grand, currentId, cur, headLabel) {
  if (!rows.length || !cols.length) return `<div class="muted">${esc(t('rep.tableEmpty'))}</div>`;
  const head =
    `<tr><th>${esc(headLabel)}</th>` +
    cols
      .map(
        (c) =>
          `<th class="${c.id === currentId ? 'cur-col' : ''}">${c.id === currentId ? '➤ ' : ''}${esc(c.title)}` +
          (c.startDate ? `<div style="font-weight:400;color:#7a8791">${esc(formatShortDate(c.startDate))}</div>` : '') +
          `</th>`
      )
      .join('') +
    `<th>${esc(t('common.total'))}</th></tr>`;
  const body = rows
    .map((r) => {
      const rowTotal = cols.reduce((n, c) => n + ((data[r.value] && data[r.value][c.id]) || 0), 0);
      return (
        `<tr><td>${esc(r.icon || '')} ${esc(r.label)}</td>` +
        cols
          .map((c) => {
            const v = (data[r.value] && data[r.value][c.id]) || 0;
            return `<td class="${c.id === currentId ? 'cur-col' : ''}">${v ? money(v, cur) : '—'}</td>`;
          })
          .join('') +
        `<td><b>${money(rowTotal, cur)}</b></td></tr>`
      );
    })
    .join('');
  const foot =
    `<tr class="total-row"><td>${esc(t('common.total'))}</td>` +
    cols.map((c) => `<td class="${c.id === currentId ? 'cur-col' : ''}">${money(c.total, cur)}</td>`).join('') +
    `<td>${money(grand, cur)}</td></tr>`;
  return `<div class="wide"><table><thead>${head}</thead><tbody>${body}${foot}</tbody></table></div>`;
}

function section(title, sub, inner) {
  if (!inner) return '';
  return (
    `<div class="sec"><div class="sec-h">${esc(title)}</div>` +
    (sub ? `<div class="sec-sub">${esc(sub)}</div>` : '') +
    `${inner}</div>`
  );
}

// Harcama dökümü: tarih, tür, ödeme, durak, özgün tutar ve seçilen birimdeki karşılığı.
function itemTable(trip, cur, catalog) {
  const list = [...(trip.expenses || [])].sort((a, b) => ((a.date || '') < (b.date || '') ? -1 : 1));
  if (!list.length) return '';
  const stops = trip.stops || [];
  const stopName = (id) => {
    const i = stops.findIndex((s) => s.id === id);
    return i >= 0 ? `${i + 1}. ${stops[i].name}` : '—';
  };
  const body = list
    .map(
      (e) =>
        `<tr><td>${esc(formatShortDate(e.date))}</td>` +
        `<td>${esc(e.label || '')}</td>` +
        `<td>${esc(catIcon(catalog, e.kind))} ${esc(catLabel(catalog, e.kind))}</td>` +
        `<td>${e.payment ? `${esc(paymentIcon(e.payment))} ${esc(paymentLabel(e.payment))}` : '—'}</td>` +
        `<td>${esc(e.stopId ? stopName(e.stopId) : '—')}</td>` +
        `<td>${money(e.amount, e.currency)}</td>` +
        `<td>${e.eq && typeof e.eq[cur] === 'number' ? money(e.eq[cur], cur) : '—'}</td></tr>`
    )
    .join('');
  const s = sumIn(list, cur);
  return (
    `<table class="items">` +
    `<colgroup><col class="c-date"><col class="c-desc"><col class="c-cat"><col class="c-pay">` +
    `<col class="c-stop"><col class="c-amt"><col class="c-eq"></colgroup>` +
    `<thead><tr>` +
    `<th>${esc(t('rep.colDate'))}</th><th>${esc(t('rep.colDesc'))}</th><th>${esc(t('rep.colCategory'))}</th>` +
    `<th>${esc(t('rep.colPayment'))}</th><th>${esc(t('rep.colStop'))}</th>` +
    `<th>${esc(t('exp.amount'))}</th><th>${esc(cur)}</th></tr></thead>` +
    `<tbody>${body}` +
    `<tr class="total-row"><td colspan="6">${esc(t('common.total'))}</td><td>${money(s.total, cur)}</td></tr>` +
    `</tbody></table>`
  );
}

// Rapor HTML'i. `trips` verilirse seyahatler arası tablolar da eklenir.
export function buildExpenseReportHtml(trip, trips, cur, settings) {
  const catalog = resolveCategories(settings);
  const expenses = trip.expenses || [];
  const s = sumIn(expenses, cur);
  const pay = paymentSplit(expenses, cur);
  const curSym = `${currencySymbol(cur)} ${cur}`;

  const cats = categoryBreakdown(expenses, cur, catalog).filter((c) => c.count > 0);
  const stopRows = stopBreakdown(trip, cur);
  const curRows = currencyBreakdown(expenses, cur);
  const matrix = categoryTripMatrix(trips || [], cur, catalog);
  const payMatrix = paymentTripMatrix(trips || [], cur);
  const curMatrix = currencyTripMatrix(trips || [], cur);
  const comp = tripComparison(trips || [], cur).filter((x) => x.count > 0);

  const totalCard =
    `<div class="total"><div class="cap">${esc(t('rep.tripTotal', { trip: trip.title || '' }))}</div>` +
    `<div class="big">${money(s.total, cur)}</div>` +
    `<div class="meta">${esc(t('rep.expenseCount', { n: s.count }))}` +
    `${s.missing ? esc(t('rep.missing', { n: s.missing })) : ''}</div></div>` +
    `<div class="pay">` +
    `<div><div class="l">${esc(paymentIcon('nakit'))} ${esc(paymentLabel('nakit'))}</div><div class="v">${money(pay.nakit, cur)}</div></div>` +
    `<div><div class="l">${esc(paymentIcon('kart'))} ${esc(paymentLabel('kart'))}</div><div class="v">${money(pay.kart, cur)}</div></div>` +
    (pay.other
      ? `<div><div class="l">${esc(t('rep.payOther'))}</div><div class="v">${money(pay.other, cur)}</div></div>`
      : '') +
    `</div>`;

  const curTable = curRows.length
    ? `<table><thead><tr><th>${esc(t('rep.colCurrency'))}</th><th>${esc(t('rep.colNative'))}</th>` +
      `<th>${esc(curSym)}</th><th>${esc(t('rep.colCount'))}</th></tr></thead><tbody>` +
      curRows
        .map(
          (c) =>
            `<tr><td>${esc(c.label)}</td><td>${money(c.native, c.value)}</td>` +
            `<td>${money(c.total, cur)}</td><td>${c.count}${c.missing ? ' *' : ''}</td></tr>`
        )
        .join('') +
      `</tbody></table>`
    : '';

  const compTable = comp.length
    ? `<table><thead><tr><th>${esc(t('nav.trip'))}</th><th>${esc(t('common.total'))}</th>` +
      `<th>${esc(t('rep.colCount'))}</th></tr></thead><tbody>` +
      comp
        .map(
          (c) =>
            `<tr${c.id === trip.id ? ' class="total-row"' : ''}><td>${c.id === trip.id ? '➤ ' : ''}${esc(c.title)}` +
            (c.startDate ? ` <span style="color:#7a8791">${esc(formatShortDate(c.startDate))}</span>` : '') +
            `</td><td>${money(c.total, cur)}</td><td>${c.count}</td></tr>`
        )
        .join('') +
      `</tbody></table>`
    : '';

  const inner =
    `<div class="doc-title">${esc(t('rep.docTitle'))}</div>` +
    `<div class="doc-sub">${esc(trip.title || '')}` +
    (trip.startDate ? ` · ${esc(formatLongDate(trip.startDate))}` : '') +
    ` · ${esc(t('rep.docCur', { cur: curSym }))}</div>` +
    totalCard +
    section(t('rep.byCategory'), '', shareTable(cats, cur, s.total, t('rep.colCategory'))) +
    section(t('rep.byStop'), t('rep.byStopSub'), shareTable(stopRows, cur, s.total, t('rep.colStop'))) +
    section(t('rep.byCurrency'), t('rep.byCurrencySub', { cur: curSym }), curTable) +
    section(
      t('rep.curTable'),
      t('rep.curTableHint', { cur: curSym }),
      matrixTable(curMatrix.rows, curMatrix.cols, curMatrix.data, curMatrix.grand, trip.id, cur, t('rep.colCurrency'))
    ) +
    section(
      t('rep.catTable'),
      t('rep.catTableHint', { cur: curSym }),
      matrixTable(matrix.cats, matrix.cols, matrix.data, matrix.grand, trip.id, cur, t('rep.colCategory'))
    ) +
    section(
      t('rep.payTable'),
      t('rep.payTableHint', { cur: curSym }),
      matrixTable(payMatrix.rows, payMatrix.cols, payMatrix.data, payMatrix.grand, trip.id, cur, t('rep.colPayment'))
    ) +
    section(t('rep.compare'), t('rep.compareSub'), compTable) +
    section(t('rep.items'), t('rep.itemsSub'), itemTable(trip, cur, catalog)) +
    `<div class="foot">${esc(t('rep.docFoot', { date: formatLongDate(new Date().toISOString().slice(0, 10)) }))}</div>`;

  return (
    `<!doctype html><html lang="${LANG_TAG[getLang()] || 'tr'}"><head><meta charset="utf-8" />` +
    `<meta name="viewport" content="width=device-width, initial-scale=1" />` +
    `<title>${esc(t('rep.docTitle'))} — ${esc(trip.title || '')}</title>` +
    `<style>${CSS}</style></head><body><div class="doc">${inner}</div></body></html>`
  );
}

export function exportExpenseReportPdf(trip, trips, cur, settings) {
  return printDocument(
    async () => buildExpenseReportHtml(trip, trips, cur, settings),
    '🧾 ' + t('common.preparing')
  );
}
