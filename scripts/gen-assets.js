#!/usr/bin/env node
/**
 * Uygulama görsellerini (icon / adaptive-icon / splash / favicon) koddan üretir.
 * Harici kütüphane yok — yalnızca Node'un yerleşik zlib'i ile PNG yazar.
 * Motif: gece mavisi zemin + altın pusula gülü + merkezde harita pini (seyahat teması).
 *
 * Kullanım: npm run gen:assets   (veya node scripts/gen-assets.js)
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const OUT = path.resolve(__dirname, '..', 'assets');

const BG = [11, 26, 43, 255]; // #0b1a2b
const GOLD = [245, 166, 35, 255]; // #f5a623
const TEXT = [234, 244, 255, 255]; // #eaf4ff

function makeCanvas(w, h, bg) {
  const buf = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    buf[i * 4] = bg[0];
    buf[i * 4 + 1] = bg[1];
    buf[i * 4 + 2] = bg[2];
    buf[i * 4 + 3] = bg[3];
  }
  return { w, h, buf };
}

function setPx(c, x, y, color) {
  x = Math.round(x);
  y = Math.round(y);
  if (x < 0 || y < 0 || x >= c.w || y >= c.h) return;
  const a = color[3] / 255;
  const i = (y * c.w + x) * 4;
  c.buf[i] = Math.round(color[0] * a + c.buf[i] * (1 - a));
  c.buf[i + 1] = Math.round(color[1] * a + c.buf[i + 1] * (1 - a));
  c.buf[i + 2] = Math.round(color[2] * a + c.buf[i + 2] * (1 - a));
  c.buf[i + 3] = 255;
}

function disc(c, cx, cy, r, color) {
  for (let y = Math.floor(cy - r); y <= cy + r; y++) {
    for (let x = Math.floor(cx - r); x <= cx + r; x++) {
      const d = Math.hypot(x - cx, y - cy);
      if (d <= r) {
        const edge = r - d;
        const aa = edge < 1.5 ? Math.max(0, edge / 1.5) : 1;
        setPx(c, x, y, [color[0], color[1], color[2], Math.round(color[3] * aa)]);
      }
    }
  }
}

function ring(c, cx, cy, rOuter, rInner, color) {
  for (let y = Math.floor(cy - rOuter); y <= cy + rOuter; y++) {
    for (let x = Math.floor(cx - rOuter); x <= cx + rOuter; x++) {
      const d = Math.hypot(x - cx, y - cy);
      if (d <= rOuter && d >= rInner) setPx(c, x, y, color);
    }
  }
}

// İçi dolu üçgen (pusula gülünün bir kanadı için).
function triangle(c, ax, ay, bx, by, dx, dy, color) {
  const minX = Math.floor(Math.min(ax, bx, dx));
  const maxX = Math.ceil(Math.max(ax, bx, dx));
  const minY = Math.floor(Math.min(ay, by, dy));
  const maxY = Math.ceil(Math.max(ay, by, dy));
  const area = (bx - ax) * (dy - ay) - (dx - ax) * (by - ay);
  if (area === 0) return;
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const w0 = ((bx - ax) * (y - ay) - (by - ay) * (x - ax)) / area;
      const w1 = ((dx - bx) * (y - by) - (dy - by) * (x - bx)) / area;
      const w2 = ((ax - dx) * (y - dy) - (ay - dy) * (x - dx)) / area;
      if (w0 >= 0 && w1 >= 0 && w2 >= 0) setPx(c, x, y, color);
    }
  }
}

// Dört ana + dört ara yönlü pusula gülü.
function compass(c, cx, cy, r) {
  ring(c, cx, cy, r, r * 0.86, GOLD);
  const long = r * 0.78;
  const wide = r * 0.16;
  const dirs = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];
  for (const [dx, dy] of dirs) {
    const tipX = cx + dx * long;
    const tipY = cy + dy * long;
    // dik eksen için genişlik vektörü
    const px = -dy * wide;
    const py = dx * wide;
    triangle(c, tipX, tipY, cx + px, cy + py, cx - px, cy - py, GOLD);
  }
  // ara yönler (daha kısa, soluk)
  const faint = [GOLD[0], GOLD[1], GOLD[2], 150];
  const dlong = r * 0.5;
  const dwide = r * 0.1;
  for (const [dx, dy] of [
    [0.707, -0.707],
    [0.707, 0.707],
    [-0.707, 0.707],
    [-0.707, -0.707],
  ]) {
    const tipX = cx + dx * dlong;
    const tipY = cy + dy * dlong;
    const px = -dy * dwide;
    const py = dx * dwide;
    triangle(c, tipX, tipY, cx + px, cy + py, cx - px, cy - py, faint);
  }
  disc(c, cx, cy, r * 0.12, TEXT);
}

// Harita pini (damla + iç halka).
function mapPin(c, cx, cy, r, color) {
  disc(c, cx, cy - r * 0.2, r, color);
  triangle(c, cx - r * 0.62, cy + r * 0.15, cx + r * 0.62, cy + r * 0.15, cx, cy + r * 1.25, color);
  disc(c, cx, cy - r * 0.2, r * 0.42, BG);
}

function drawMotif(c) {
  const cx = c.w / 2;
  const cy = c.h / 2;
  const r = Math.min(c.w, c.h) * 0.26;
  compass(c, cx, cy, r);
  mapPin(c, cx, cy - r * 0.02, r * 0.34, GOLD);
}

function encodePng(c) {
  const raw = Buffer.alloc((c.w * 4 + 1) * c.h);
  for (let y = 0; y < c.h; y++) {
    raw[y * (c.w * 4 + 1)] = 0;
    c.buf.copy(raw, y * (c.w * 4 + 1) + 1, y * c.w * 4, (y + 1) * c.w * 4);
  }
  const idat = zlib.deflateSync(raw, { level: 9 });

  const chunk = (type, data) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])) >>> 0, 0);
    return Buffer.concat([len, typeBuf, data, crc]);
  };

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(c.w, 0);
  ihdr.writeUInt32BE(c.h, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))]);
}

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return c ^ 0xffffffff;
}

function write(name, c) {
  fs.writeFileSync(path.join(OUT, name), encodePng(c));
  console.log(`+ assets/${name} (${c.w}x${c.h})`);
}

function main() {
  fs.mkdirSync(OUT, { recursive: true });

  const icon = makeCanvas(1024, 1024, BG);
  drawMotif(icon);
  write('icon.png', icon);

  const adaptive = makeCanvas(1024, 1024, BG);
  drawMotif(adaptive);
  write('adaptive-icon.png', adaptive);

  const splash = makeCanvas(1242, 2436, BG);
  drawMotif({ w: 1242, h: 2436, buf: splash.buf });
  write('splash.png', splash);

  const favicon = makeCanvas(96, 96, BG);
  drawMotif(favicon);
  write('favicon.png', favicon);

  console.log('\nGörseller üretildi.');
}

main();
