// Güzergah ve Keşif sayfalarının DETAYLI (tüm kulakçıklar açık) PDF/HTML üretimi.
// Aynı yapı taşları hem bağımsız PDF'lerde (Güzergah PDF, Keşif PDF) hem de albüm
// PDF'inin içine gömülü olarak kullanılır. Mekân özetleri arşivden CANLI okunur
// (kaydedilmiş eski kopya değil), böylece zenginleştirilmiş açıklamalar görünür.
import { computeRoute, formatKm, formatDuration, hasCoords } from './geo';
import { LANG_TAG, getLang, t } from '../i18n';
import { getVehicle } from '../data/vehicles';
import { matchPlace } from '../data/places';
import { attractionsFor } from '../data/attractions';
import { buildRouteSvg } from './routeMap';
import { formatShortDate } from './date';
import { resolvePlacePhoto } from './placePhoto';
import { printDocument } from './printDoc';

const norm = (s) => (s || '').toLocaleLowerCase('tr').replace(/\s+/g, ' ').trim();

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function photosOf(d) {
  if (Array.isArray(d?.photos) && d.photos.length) return d.photos;
  return d?.photoUri ? [d.photoUri] : [];
}

function tripTitle(trip) {
  if (trip?.title) return trip.title;
  const s = trip?.stops || [];
  if (s.length >= 2) return `${s[0].name} → ${s[s.length - 1].name}`;
  if (s.length === 1) return s[0].name;
  return t('doc.journal');
}

// --------------------------------------------------------- temel foto çözümleme
function keyFor(p) {
  return p && p.id ? 'id:' + p.id : 'nm:' + norm(p && p.name);
}

// Duraklar ve keşifler için serbest lisanslı temel fotoları (varsa) çözer.
// Dönüş: { key -> uri }. Çevrimdışı/uygun foto yoksa ilgili anahtar boş kalır.
export async function resolveBasePhotos(trip) {
  const map = {};
  const seen = new Set();
  const jobs = [];
  const add = (p) => {
    if (!p || (!p.id && !p.name)) return;
    const k = keyFor(p);
    if (seen.has(k)) return;
    seen.add(k);
    jobs.push(
      resolvePlacePhoto(p)
        .then((r) => {
          if (r && r.uri) {
            map[k] = r.uri;
            if (p.name) map['nm:' + norm(p.name)] = r.uri;
          }
        })
        .catch(() => {})
    );
  };
  for (const s of trip.stops || []) add(matchPlace(s.name) || { name: s.name });
  for (const d of trip.discoveries || []) add({ id: d.placeId, name: d.placeName, country: d.country });
  await Promise.all(jobs);
  return map;
}

function photoFor(map, p) {
  if (!map || !p) return null;
  return map[keyFor(p)] || map['nm:' + norm(p.name)] || null;
}

// --------------------------------------------------------- HTML parçaları
function attractionsList(attractions, visitedSet, { withDesc = true } = {}) {
  if (!attractions.length) return '';
  return (
    `<div class="attrs">` +
    attractions
      .map((a) => {
        const done = visitedSet.has(norm(a.name));
        return (
          `<div class="attr${done ? ' attr-done' : ''}">` +
          `<div class="attr-main"><span class="attr-name">${done ? '✓ ' : '• '}${esc(a.name)}</span>` +
          (withDesc && a.desc ? `<span class="attr-desc">${esc(a.desc)}</span>` : '') +
          `</div>` +
          (done ? `<span class="attr-vis">gidildi</span>` : '') +
          `</div>`
        );
      })
      .join('') +
    `</div>`
  );
}

function discPhotos(d) {
  const ph = photosOf(d);
  if (!ph.length) return '';
  return `<div class="disc-photos">${ph.map((p) => `<img src="${p}" />`).join('')}</div>`;
}

function discBlock(d) {
  const loc = [d.city, d.country].filter(Boolean).join(', ');
  return (
    `<div class="disc">` +
    `<div class="disc-name">📍 ${esc(d.placeName)}${d.date ? ` <span class="disc-date">${esc(formatShortDate(d.date))}</span>` : ''}</div>` +
    (loc ? `<div class="disc-loc">${esc(loc)}</div>` : '') +
    (d.summary ? `<div class="disc-sum">${esc(d.summary)}</div>` : '') +
    (d.userNotes ? `<div class="disc-note">✍️ ${esc(d.userNotes)}</div>` : '') +
    discPhotos(d) +
    `</div>`
  );
}

const LIGHT_MAP = {
  W: 620,
  H: 380,
  sea: '#dceaf5',
  land: '#eef3ea',
  line: '#c0392b',
  dot: '#f5a623',
  dotStroke: '#0b3a5b',
  dotText: '#0b3a5b',
  text: '#14202b',
};

// Güzergah detayı (iç HTML): toplamlar + harita + duraklar (özet + temel foto +
// tüm gezilecek yerler + bacak mesafeleri). Albümde ve bağımsız PDF'de kullanılır.
export function routeDetailHtml(trip, basePhotos) {
  const stops = trip.stops || [];
  const vehicle = getVehicle(trip.vehicle);
  const result = computeRoute(stops, trip.vehicle, null);
  const svg = buildRouteSvg(stops, LIGHT_MAP);
  const visited = new Set((trip.discoveries || []).map((d) => norm(d.placeName)));

  const totals = result.hasAny
    ? `<div class="totals">` +
      `<div class="tot"><b>${esc(formatKm(result.totalKm))}</b><span>Toplam mesafe</span></div>` +
      `<div class="tot"><b>${esc(formatDuration(result.totalHours))}</b><span>${t('doc.estDuration')}</span></div>` +
      `<div class="tot"><b>${stops.length}</b><span>Durak</span></div>` +
      `</div>`
    : '';

  const stopsHtml = stops
    .map((s, i) => {
      const place = matchPlace(s.name) || { name: s.name };
      const attractions = place.id ? attractionsFor(place.id) : [];
      const bp = photoFor(basePhotos, place);
      const summary = place.summary || '';
      const leg = result.legs[i];
      const meta = [
        hasCoords(s) ? `${s.lat.toFixed(3)}, ${s.lng.toFixed(3)}` : 'koordinat yok',
        s.accommodation ? `🏨 ${s.accommodation}${s.nights ? ` · ${s.nights} gece` : ''}` : s.nights ? `🌙 ${s.nights} gece` : '',
        s.note ? `📝 ${s.note}` : '',
      ]
        .filter(Boolean)
        .map(esc)
        .join(' · ');
      const legHtml =
        i < stops.length - 1
          ? `<div class="leg">${esc(vehicle.icon)} ${
              leg && leg.km != null ? `${esc(formatKm(leg.km))} · ${esc(formatDuration(leg.hours))}` : t('doc.needCoords')
            }</div>`
          : '';
      return (
        `<div class="stopd">` +
        `<div class="stopd-lead">` +
        `<div class="stopd-head"><span class="stopd-num">${i + 1}</span> ${esc(s.name)}${
          s.date ? ` <span class="stopd-date">${esc(formatShortDate(s.date))}</span>` : ''
        }</div>` +
        (meta ? `<div class="stopd-meta">${meta}</div>` : '') +
        (bp ? `<img class="stopd-photo" src="${bp}" />` : '') +
        (summary ? `<div class="stopd-summary">${esc(summary)}</div>` : '') +
        `</div>` +
        (attractions.length ? `<div class="attrs-label">🏛️ Gezilecek yerler (${attractions.length})</div>` + attractionsList(attractions, visited) : '') +
        `</div>` +
        legHtml
      );
    })
    .join('');

  return (
    (svg ? `<div class="mapbox">${svg}</div>` : '') +
    totals +
    (stopsHtml || `<div class="muted">${t('doc.noStops')}</div>`)
  );
}

// Keşif detayı (iç HTML): her durak açık — özet + temel foto + gezilecek yerler
// (gidilenler işaretli, notlu ve fotolu) + eklenen diğer yerler; sonra rota dışı.
export function discoveryDetailHtml(trip, basePhotos) {
  const stops = trip.stops || [];
  const stopIds = new Set(stops.map((s) => s.id));

  const stopsHtml = stops
    .map((s, i) => {
      const place = matchPlace(s.name) || { name: s.name };
      const attractions = place.id ? attractionsFor(place.id) : [];
      const stopDisc = (trip.discoveries || []).filter((d) => d.stopId === s.id);
      const discByName = new Map(stopDisc.map((d) => [norm(d.placeName), d]));
      const bp = photoFor(basePhotos, place);
      const summary = place.summary || '';

      const attrHtml = attractions.length
        ? attractions
            .map((a) => {
              const ex = discByName.get(norm(a.name));
              return (
                `<div class="attr${ex ? ' attr-done' : ''}">` +
                `<div class="attr-main"><span class="attr-name">${ex ? '✓ ' : '• '}${esc(a.name)}</span>` +
                (a.desc ? `<span class="attr-desc">${esc(a.desc)}</span>` : '') +
                (ex && ex.userNotes ? `<span class="disc-note">✍️ ${esc(ex.userNotes)}</span>` : '') +
                `</div></div>` +
                (ex ? discPhotos(ex) : '')
              );
            })
            .join('')
        : `<div class="muted">${t('doc.noSuggestions')}</div>`;

      const attrNames = new Set(attractions.map((a) => norm(a.name)));
      const extra = stopDisc.filter((d) => !attrNames.has(norm(d.placeName)));
      const extraHtml = extra.length ? `<div class="attrs-label">${t('doc.otherPlaces')}</div>` + extra.map(discBlock).join('') : '';

      return (
        `<div class="stopd">` +
        `<div class="stopd-lead">` +
        `<div class="stopd-head"><span class="stopd-num">${i + 1}</span> ${esc(s.name)}${
          s.date ? ` <span class="stopd-date">${esc(formatShortDate(s.date))}</span>` : ''
        }</div>` +
        (bp ? `<img class="stopd-photo" src="${bp}" />` : '') +
        (summary ? `<div class="stopd-summary">${esc(summary)}</div>` : '') +
        (s.journalNote ? `<div class="stopd-note">✍️ ${esc(s.journalNote)}</div>` : '') +
        `</div>` +
        `<div class="attrs-label">🏛️ ${t('disc.toVisit')}${attractions.length ? ` (${attractions.length})` : ''}</div>` +
        `<div class="attrs">${attrHtml}</div>` +
        extraHtml +
        `</div>`
      );
    })
    .join('');

  const free = (trip.discoveries || []).filter((d) => !d.stopId || !stopIds.has(d.stopId));
  const freeHtml = free.length
    ? `<div class="stopd"><div class="stopd-head">${t('doc.freePlaces')}</div>${free.map(discBlock).join('')}</div>`
    : '';

  return (stopsHtml || `<div class="muted">${t('doc.noStops')}</div>`) + freeHtml;
}

// Detay bileşen stilleri — hem bağımsız belgelerde hem albümde kullanılır.
export const DETAIL_CSS = `
  .mapbox { width: 100%; margin: 4px 0 14px; }
  .mapbox svg { width: 100%; height: auto; border: 1px solid #e6ebf0; border-radius: 8px; }
  .totals { display: flex; gap: 10px; margin-bottom: 14px; }
  .tot { flex: 1; text-align: center; background: #f4f7fa; border: 1px solid #e6ebf0; border-radius: 10px; padding: 10px 6px; }
  .tot b { display: block; color: #0b3a5b; font-size: 17px; }
  .tot span { color: #7a8791; font-size: 11px; }
  .stopd { margin-bottom: 14px; }
  .stopd-lead { break-inside: avoid; page-break-inside: avoid; }
  .stopd-head { font-size: 17px; font-weight: 800; color: #0b3a5b; display: flex; align-items: center; gap: 8px;
    border-bottom: 1px solid #e6ebf0; padding-bottom: 5px; margin-bottom: 6px; break-after: avoid; }
  .stopd-num { background: #0b3a5b; color: #fff; width: 22px; height: 22px; border-radius: 11px; display: inline-flex;
    align-items: center; justify-content: center; font-size: 13px; }
  .stopd-date { font-weight: 500; color: #7a8791; font-size: 13px; }
  .stopd-meta { font-size: 12px; color: #7a8791; margin-bottom: 6px; }
  .stopd-photo { width: 100%; max-height: 78mm; object-fit: cover; border-radius: 6px; margin: 4px 0 8px; display: block; }
  .stopd-summary { font-size: 13px; line-height: 1.55; color: #33404b; margin-bottom: 8px; }
  .stopd-note { font-size: 12.5px; line-height: 1.5; color: #55636e; font-style: italic; margin-bottom: 8px; }
  .attrs-label { font-size: 11px; letter-spacing: .5px; text-transform: uppercase; color: #9aa4ad; font-weight: 800; margin: 8px 0 5px; }
  .attrs { display: flex; flex-direction: column; gap: 5px; }
  .attr { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px;
    background: #f7f9fb; border: 1px solid #edf1f5; border-radius: 8px; padding: 7px 10px; break-inside: avoid; }
  .attr-done { border-color: #bfe6c8; background: #f2fbf4; }
  .attr-main { flex: 1; }
  .attr-name { font-size: 13.5px; font-weight: 700; color: #1e2a35; }
  .attr-desc { display: block; font-size: 12px; color: #55636e; margin-top: 1px; line-height: 1.4; }
  .attr-vis { color: #1f9d55; font-size: 11px; font-weight: 800; white-space: nowrap; }
  .disc { margin: 8px 0; padding: 8px 10px; background: #f7f9fb; border: 1px solid #edf1f5; border-radius: 8px; break-inside: avoid; }
  .disc-name { font-size: 14px; font-weight: 700; color: #1e2a35; }
  .disc-date { font-weight: 500; color: #7a8791; font-size: 12px; }
  .disc-loc { font-size: 12px; color: #7a8791; }
  .disc-sum { font-size: 12.5px; color: #33404b; line-height: 1.5; margin-top: 3px; }
  .disc-note { display: block; font-size: 12px; color: #55636e; font-style: italic; margin-top: 4px; }
  .disc-photos { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 7px; }
  .disc-photos img { width: calc(33.33% - 4px); max-height: 55mm; object-fit: cover; border-radius: 5px; break-inside: avoid; }
  .leg { font-size: 12px; color: #7a8791; padding: 4px 0 4px 30px; }
  .muted { color: #7a8791; font-style: italic; font-size: 13px; }
`;

const BASE_DOC_CSS = `
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #f2f2f2; color: #14202b;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
  .doc { background: #fff; max-width: 210mm; margin: 10px auto; padding: 16mm; box-shadow: 0 2px 12px rgba(0,0,0,0.15); }
  .doc-title { font-size: 26px; font-weight: 900; color: #0b3a5b; }
  .doc-sub { font-size: 14px; color: #55636e; margin: 4px 0 16px; }
  @media print {
    html, body { background: #fff; }
    .doc { max-width: none; margin: 0; padding: 0; box-shadow: none; }
    @page { size: A4; margin: 14mm; }
  }
`;

function wrapDoc(title, innerHtml) {
  return (
    `<!doctype html><html lang="${LANG_TAG[getLang()] || 'tr'}"><head><meta charset="utf-8" />` +
    `<meta name="viewport" content="width=device-width, initial-scale=1" />` +
    `<title>${esc(title)}</title><style>${BASE_DOC_CSS}${DETAIL_CSS}</style></head><body>` +
    `<div class="doc">${innerHtml}</div></body></html>`
  );
}

export async function buildRouteDoc(trip) {
  const basePhotos = await resolveBasePhotos(trip);
  const inner = `<div class="doc-title">${t('doc.routeHead')}</div><div class="doc-sub">${esc(tripTitle(trip))} · ${esc(
    getVehicle(trip.vehicle).icon
  )} ${esc(getVehicle(trip.vehicle).label)}</div>${routeDetailHtml(trip, basePhotos)}`;
  return wrapDoc(`${tripTitle(trip)} — ${t('doc.route')}`, inner);
}

export async function buildDiscoveryDoc(trip) {
  const basePhotos = await resolveBasePhotos(trip);
  const inner = `<div class="doc-title">${t('doc.discHead')}</div><div class="doc-sub">${esc(tripTitle(trip))}</div>${discoveryDetailHtml(
    trip,
    basePhotos
  )}`;
  return wrapDoc(`${tripTitle(trip)} — ${t('nav.discovery')}`, inner);
}

export function exportRoutePdf(trip) {
  return printDocument(() => buildRouteDoc(trip), '🗺️ ' + t('common.preparing'));
}

export function exportDiscoveryPdf(trip) {
  return printDocument(() => buildDiscoveryDoc(trip), '🧭 ' + t('common.preparing'));
}
