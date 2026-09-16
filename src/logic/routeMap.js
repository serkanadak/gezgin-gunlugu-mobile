// Bağımsız (kütüphanesiz) güzergah haritası: durakların enlem/boylamını basit
// bir eş dörtgen (equirectangular) izdüşümle x/y'ye yerleştirir, arka plana kara
// sınırlarını (Natural Earth 110m) çizer, durakları sırayla bağlar ve numaralı/
// etiketli bir SVG üretir. İnternet gerektirmez; web'e ve PDF'e gömülür.
import { LAND_RINGS } from '../data/landGeo';

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function hasXY(s) {
  return s && typeof s.lat === 'number' && typeof s.lng === 'number' && !Number.isNaN(s.lat) && !Number.isNaN(s.lng);
}

// Durakları çevreleyen coğrafi görüş kutusunu (marj + asgari açıklıkla) ve bu
// kutuyu W×H tuvale oturtan izdüşüm fonksiyonunu hesaplar.
function makeView(pts, W, H, pad, minSpanDeg, marginFrac) {
  const lats = pts.map((s) => s.lat);
  const lngs = pts.map((s) => s.lng);
  let minLat = Math.min(...lats);
  let maxLat = Math.max(...lats);
  let minLng = Math.min(...lngs);
  let maxLng = Math.max(...lngs);
  // marj ekle
  const mLat = Math.max((maxLat - minLat) * marginFrac, minSpanDeg / 2);
  const mLng = Math.max((maxLng - minLng) * marginFrac, minSpanDeg / 2);
  minLat -= mLat;
  maxLat += mLat;
  minLng -= mLng;
  maxLng += mLng;

  const meanLat = (minLat + maxLat) / 2;
  const k = Math.cos((meanLat * Math.PI) / 180) || 1;
  let Xmin = minLng * k;
  let Xmax = maxLng * k;
  let Ymin = minLat;
  let Ymax = maxLat;
  let rx = Xmax - Xmin || 1e-6;
  let ry = Ymax - Ymin || 1e-6;
  // Görüş kutusunu tuval en/boy oranına genişlet (rota ince şerit görünmesin).
  const targetAR = (W - 2 * pad) / (H - 2 * pad);
  if (rx / ry > targetAR) {
    const needRy = rx / targetAR;
    const add = (needRy - ry) / 2;
    Ymin -= add;
    Ymax += add;
    ry = needRy;
  } else {
    const needRx = ry * targetAR;
    const add = (needRx - rx) / 2;
    Xmin -= add;
    Xmax += add;
    rx = needRx;
  }
  const scale = Math.min((W - 2 * pad) / rx, (H - 2 * pad) / ry);
  const offX = (W - rx * scale) / 2;
  const offY = (H - ry * scale) / 2;
  const project = (lng, lat) => ({
    x: offX + (lng * k - Xmin) * scale,
    y: offY + (Ymax - lat) * scale, // kuzey yukarıda
  });
  return { project, bbox: { minLat: Ymin, maxLat: Ymax, minLng: Xmin / k, maxLng: Xmax / k } };
}

function bboxIntersects(ring, b) {
  let minx = Infinity;
  let maxx = -Infinity;
  let miny = Infinity;
  let maxy = -Infinity;
  for (const [x, y] of ring) {
    if (x < minx) minx = x;
    if (x > maxx) maxx = x;
    if (y < miny) miny = y;
    if (y > maxy) maxy = y;
  }
  return !(maxx < b.minLng || minx > b.maxLng || maxy < b.minLat || miny > b.maxLat);
}

function landPaths(view, W, H, fill) {
  const { project, bbox } = view;
  const out = [];
  for (const ring of LAND_RINGS) {
    if (!bboxIntersects(ring, bbox)) continue;
    let d = '';
    for (let i = 0; i < ring.length; i += 1) {
      const p = project(ring[i][0], ring[i][1]);
      // tuval sınırlarını çok aşan noktaları kırp (SVG clipPath zaten var, ama
      // aşırı büyük path'leri küçültmek için).
      const x = Math.max(-W, Math.min(2 * W, p.x));
      const y = Math.max(-H, Math.min(2 * H, p.y));
      d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    d += 'Z';
    out.push(`<path d="${d}" fill="${fill}"/>`);
  }
  return out.join('');
}

// Güzergahı SVG dizesi olarak döndürür. En az bir koordinatlı durak gerekir.
export function buildRouteSvg(stops, opts = {}) {
  const {
    W = 620,
    H = 380,
    pad = 30,
    sea = '#dceaf5',
    land = '#eef3ea',
    line = '#c0392b',
    dot = '#f5a623',
    dotStroke = '#0b3a5b',
    dotText = '#0b3a5b',
    text = '#14202b',
    minSpanDeg = 2,
    marginFrac = 0.4,
  } = opts;
  const pts = (stops || []).filter(hasXY);
  if (!pts.length) return '';

  const view = makeView(pts, W, H, pad, minSpanDeg, marginFrac);
  const projected = pts.map((s) => ({ s, ...view.project(s.lng, s.lat) }));
  const land0 = landPaths(view, W, H, land);

  const poly =
    projected.length > 1
      ? `<polyline points="${projected.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')}" fill="none" stroke="${line}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="7 5"/>`
      : '';

  const marks = projected
    .map((p, i) => {
      const n = i + 1;
      const name = esc(p.s.name || '');
      const anchorEnd = p.x > W * 0.6;
      const tx = anchorEnd ? p.x - 12 : p.x + 12;
      const anchor = anchorEnd ? 'end' : 'start';
      return (
        `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="7" fill="${dot}" stroke="${dotStroke}" stroke-width="2"/>` +
        `<text x="${p.x.toFixed(1)}" y="${(p.y + 3.3).toFixed(1)}" font-size="9" font-weight="700" text-anchor="middle" fill="${dotText}">${n}</text>` +
        `<text x="${tx.toFixed(1)}" y="${(p.y - 10).toFixed(1)}" font-size="12" font-weight="700" text-anchor="${anchor}" fill="${text}" paint-order="stroke" stroke="${sea}" stroke-width="3">${n}. ${name}</text>`
      );
    })
    .join('');

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">` +
    `<defs><clipPath id="mv"><rect x="0" y="0" width="${W}" height="${H}"/></clipPath></defs>` +
    `<rect x="0" y="0" width="${W}" height="${H}" rx="12" fill="${sea}"/>` +
    `<g clip-path="url(#mv)">${land0}${poly}${marks}</g>` +
    `<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="12" fill="none" stroke="rgba(0,0,0,0.12)"/>` +
    `</svg>`
  );
}

// SVG'yi <img> / RN Image kaynağı olarak kullanılabilir data URI'ye çevirir.
// Not: ";utf8," biçimi tarayıcıların <img> etiketinde güvenilir değildir;
// ";charset=utf-8," kullanılır.
export function routeSvgDataUri(stops, opts = {}) {
  const svg = buildRouteSvg(stops, opts);
  if (!svg) return null;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// Koordinatı olan durak sayısı (harita gösterip göstermeme kararı için).
export function mappableStopCount(stops) {
  return (stops || []).filter(hasXY).length;
}
