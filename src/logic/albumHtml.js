// Uygulama içi PDF albüm üretimi (web).
// Baskıya hazır tek parça (self-contained) HTML üretir. Fotoğraflar AYNEN
// gömülür (yeniden kodlanmaz); yalnızca en/boy oranları ölçülüp düzen için
// kullanılır. Düzen: güzergah sırasıyla her durak YENİ SAYFADAN başlar; her
// mekanın bilgisi + ardından fotoğrafları. Fotoğraflar yönüne göre gruplanır
// (önce yatay, sonra dik) ve ikişerli, bölünmez satırlar hâlinde dizilir;
// böylece bir foto sayfada yarıda kesilmez, sığmıyorsa komple sonraki sayfaya
// geçer.
import { generateAlbumPlan } from './publish';
import { LANG_TAG, getLang, t } from '../i18n';
import { buildRouteSvg } from './routeMap';
import { formatLongDate } from './date';
import { matchPlace } from '../data/places';
import { printDocument } from './printDoc';
import { resolveBasePhotos } from './tripDoc';

const norm = (s) => (s || '').toLocaleLowerCase('tr').replace(/\s+/g, ' ').trim();

function photosOf(d) {
  if (Array.isArray(d?.photos) && d.photos.length) return d.photos;
  return d?.photoUri ? [d.photoUri] : [];
}

// "Büyük göster" (featured) seçilen fotoğraflar. Yeni kayıtlarda çoklu
// `featuredPhotos` dizisi; eski kayıtlarda tek `featuredPhoto`.
function featuredListOf(d) {
  if (Array.isArray(d?.featuredPhotos)) return d.featuredPhotos;
  return d?.featuredPhoto ? [d.featuredPhoto] : [];
}

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

// Bir görselin doğal boyutunu ölçer (yeniden kodlamaz). Ölçülemezse null.
function imgSize(uri) {
  return new Promise((resolve) => {
    if (!uri || typeof window === 'undefined') {
      resolve(null);
      return;
    }
    try {
      const img = new window.Image();
      img.onload = () => resolve({ w: img.naturalWidth || img.width || 1, h: img.naturalHeight || img.height || 1 });
      img.onerror = () => resolve(null);
      img.src = uri;
      setTimeout(() => resolve(null), 6000);
    } catch (e) {
      resolve(null);
    }
  });
}

// Keşifleri güzergah sırasına diz: durak sırasına göre, rota dışı olanlar en
// sona. Aynı durak içinde ekleme sırası korunur (kararlı).
function orderByRoute(trip) {
  const stops = trip.stops || [];
  const stopOrder = new Map(stops.map((s, i) => [s.id, i]));
  const discoveries = trip.discoveries || [];
  return discoveries
    .map((d, idx) => ({
      d,
      idx,
      rank: d.stopId && stopOrder.has(d.stopId) ? stopOrder.get(d.stopId) : Number.MAX_SAFE_INTEGER,
    }))
    .sort((a, b) => a.rank - b.rank || a.idx - b.idx);
}

// Aynı yöndeki fotoğrafları ikişerli, bölünmez satır dizilerine böler (dizi döner).
function rowsArr(list, orient) {
  const out = [];
  for (let i = 0; i < list.length; i += 2) {
    const pair = list.slice(i, i + 2);
    out.push(`<div class="prow ${orient}">${pair.map((src) => `<figure class="ph"><img src="${src}" /></figure>`).join('')}</div>`);
  }
  return out;
}

export async function buildAlbumHtml(trip) {
  const plan = generateAlbumPlan(trip);
  const stops = trip.stops || [];
  const stopOrder = new Map(stops.map((s, i) => [s.id, i]));
  const stopName = new Map(stops.map((s) => [s.id, s.name]));
  const ranked = orderByRoute(trip);

  // Duraklar/keşifler için serbest lisanslı temel fotolar (varsa) — çevrimdışıysa boş.
  const basePhotos = await resolveBasePhotos(trip);

  // Tüm fotoğrafların yönünü (dik/yatay) ölç.
  const allPhotos = [];
  for (const { d } of ranked) for (const p of photosOf(d)) allPhotos.push(p);
  const sizes = await Promise.all(allPhotos.map(imgSize));
  const orient = new Map();
  allPhotos.forEach((p, i) => {
    const s = sizes[i];
    orient.set(p, s && s.h > s.w * 1.05 ? 'port' : 'land');
  });

  // Kapak görseli: kullanıcı seçtiyse onu kullan (hâlâ mevcutsa), yoksa sırayla
  // ilk fotoğraflı keşif.
  let coverImg = trip.coverPhoto && allPhotos.includes(trip.coverPhoto) ? trip.coverPhoto : null;
  if (!coverImg) {
    for (const { d } of ranked) {
      const ph = photosOf(d);
      if (ph.length) {
        coverImg = ph[0];
        break;
      }
    }
  }

  // Keşifleri güzergah sırasına göre gruplandır (her durak ayrı grup).
  const groups = [];
  let cur = null;
  for (const { d } of ranked) {
    const inStop = d.stopId && stopOrder.has(d.stopId);
    const key = inStop ? d.stopId : '__free__';
    if (!cur || cur.key !== key) {
      cur = {
        key,
        title: inStop ? `${stopOrder.get(key) + 1}. ${stopName.get(key)}` : t('doc.offRoute'),
        stopName: inStop ? stopName.get(key) : null,
        items: [],
      };
      groups.push(cur);
    }
    cur.items.push(d);
  }

  const placeBlock = (d) => {
    const loc = [d.city, d.country].filter(Boolean).join(', ');
    const head =
      `<div class="place-title">${esc(d.placeName)}${d.date ? ` <span class="place-date">${esc(formatLongDate(d.date))}</span>` : ''}</div>` +
      (loc ? `<div class="place-loc">${esc(loc)}</div>` : '') +
      (d.summary ? `<div class="place-summary">${esc(d.summary)}</div>` : '') +
      (d.userNotes ? `<div class="place-note">✍️ ${esc(d.userNotes)}</div>` : '');

    const photos = photosOf(d);
    // Kullanıcı bir veya birden fazla fotoğrafı "büyük göster" (featured) seçtiyse
    // her birini solo/büyük ver, kalanları ikişerli/küçük diz. Hepsi seçilmişse
    // hepsi büyük olur.
    const featuredSet = new Set(featuredListOf(d));
    const featured = photos.filter((p) => featuredSet.has(p)); // karesel sırayı korur
    const soloRow = (src) => {
      const o = orient.get(src) || 'land';
      return `<div class="prow ${o} solo"><figure class="ph"><img src="${src}" /></figure></div>`;
    };
    // Küçük (ikişerli) satırlar. KULLANICININ SIRASI KORUNUR: eskiden tüm
    // yatay fotoğraflar öne, dikeyler sona alınıyordu; kullanıcı albümdeki
    // sırayı elle düzenleyebildiği için bu, verdiği sırayı bozuyordu.
    // Artık sıra hiç değişmez; yalnızca YAN YANA gelecek iki fotoğrafın yönü
    // aynıysa eşleştirilir (karışık satır çirkin durur ve satırı gereksiz
    // yükseltir), değilse fotoğraf kendi satırında kalır.
    const gridRows = (list) => {
      const out = [];
      let i = 0;
      while (i < list.length) {
        const o = orient.get(list[i]) || 'land';
        const next = list[i + 1];
        const sameOrient = next && (orient.get(next) || 'land') === o;
        out.push(...rowsArr(sameOrient ? [list[i], next] : [list[i]], o));
        i += sameOrient ? 2 : 1;
      }
      return out;
    };
    let rows = [];
    if (photos.length === 1) {
      // Tek foto: kullanıcı seçimi. Varsayılan büyük; `soloSmall` ile küçük.
      rows = d.soloSmall ? gridRows(photos) : [soloRow(photos[0])];
    } else if (featured.length) {
      const rest = photos.filter((p) => !featuredSet.has(p));
      rows = [...featured.map(soloRow), ...gridRows(rest)];
    } else if (photos.length) {
      rows = gridRows(photos);
    }

    // ÖNEMLİ (sayfa bölünmesi): mekan bilgisi ile İLK fotoğraf satırı eskiden
    // TEK bir "bölünmez" öbeğe konuyordu. Uzun bir arşiv özeti + büyük (solo)
    // bir fotoğraf bir araya geldiğinde bu öbek A4'in basılabilir yüksekliğini
    // (273mm) aşıyor, motor da mecburen ortasından bölüyordu — kesik tam
    // fotoğrafın üzerine düşüyordu (ölçüm: 292,8mm).
    // Çözüm: başlık metni kendi başına bölünmez kalır ve `break-after: avoid`
    // ile mümkünse fotoğrafıyla aynı sayfada tutulur; her fotoğraf satırı ise
    // BAĞIMSIZ bölünmez bir öbektir. Böylece hiçbir öbek sayfadan uzun olmaz.
    const lead = `<div class="place-lead">${head}</div>`;
    return `<div class="place">${lead}${rows.join('')}</div>`;
  };

  // Her durak (güzergah) YENİ SAYFADAN başlar → ayrı .page section.
  // Durak başına: canlı arşiv özeti (zenginleştirilmiş) + temel foto — kullanıcının
  // kendi fotoğrafları olsa bile gösterilir.
  const stopIntro = (g) => {
    if (!g.stopName) return '';
    const place = matchPlace(g.stopName);
    const bp = place ? basePhotos['id:' + place.id] || basePhotos['nm:' + norm(place.name)] : basePhotos['nm:' + norm(g.stopName)];
    const summary = place && place.summary ? place.summary : '';
    // Kullanıcının o şehir/durak için yazdığı günlük notu (mekan notlarından ayrı).
    const st = (trip.stops || []).find((x) => x.id === g.key);
    const cityNote = (st && st.journalNote) || '';
    if (!bp && !summary && !cityNote) return '';
    return (
      `<div class="stop-intro">` +
      (bp ? `<img class="stop-intro-photo" src="${bp}" />` : '') +
      (summary ? `<div class="place-summary">${esc(summary)}</div>` : '') +
      (cityNote ? `<div class="place-note">✍️ ${esc(cityNote)}</div>` : '') +
      `</div>`
    );
  };

  // --- Günlük notlar: albümde AYRI bir bölüm (tarih sırasına göre) ---
  const dayNotesHtml = () => {
    const notes = [...(trip.dayNotes || [])]
      .filter((n) => (n.text || '').trim())
      .sort((a, b) => ((a.date || '') < (b.date || '') ? -1 : 1));
    if (!notes.length) return '';
    const blocks = notes
      .map(
        (n) =>
          `<div class="daynote">` +
          `<div class="daynote-date">${esc(formatLongDate(n.date))}</div>` +
          (n.title ? `<div class="daynote-title">${esc(n.title)}</div>` : '') +
          `<div class="daynote-text">${esc(n.text).replace(/\n+/g, '</p><p>')}</div>` +
          `</div>`
      )
      .join('');
    return `<section class="page"><h2>${t('doc.dayNotes')}</h2>${blocks}</section>`;
  };

  // Sade güzergah özeti: ülke / şehir / mekan adları — AÇIKLAMASIZ. Mekan
  // açıklamaları zaten albüm gövdesinde (keşif blokları) verilir; burada yalnızca
  // gezilen yerlerin listesi yer alır, böylece detaylı sayfa mükerrerliği önlenir.
  const countryOf = (stopName, items) => {
    const p = matchPlace(stopName);
    if (p && p.country) return p.country;
    const withC = (items || []).find((d) => d.country);
    return withC ? withC.country : '';
  };
  const simpleRouteHtml = () => {
    const rows = [];
    stops.forEach((s, i) => {
      const items = (trip.discoveries || []).filter((d) => d.stopId === s.id);
      const country = countryOf(s.name, items);
      const names = items.map((d) => d.placeName).filter(Boolean);
      rows.push(
        `<li class="rl-stop">` +
          `<div class="rl-city">${i + 1}. ${esc(s.name)}` +
          (country ? ` <span class="rl-country">· ${esc(country)}</span>` : '') +
          (s.date ? ` <span class="rl-date">${esc(formatLongDate(s.date))}</span>` : '') +
          `</div>` +
          (names.length
            ? `<ul class="rl-places">${names.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>`
            : '') +
          `</li>`
      );
    });
    const stopIds = new Set(stops.map((s) => s.id));
    const free = (trip.discoveries || []).filter((d) => !d.stopId || !stopIds.has(d.stopId));
    if (free.length) {
      const items = free
        .map((d) => {
          const loc = [d.city, d.country].filter(Boolean).join(', ');
          return `<li>${esc(d.placeName)}${loc ? ` <span class="rl-country">· ${esc(loc)}</span>` : ''}</li>`;
        })
        .join('');
      rows.push(
        `<li class="rl-stop"><div class="rl-city">${t('doc.offRoute')}</div><ul class="rl-places">${items}</ul></li>`
      );
    }
    return rows.length ? `<ol class="route-list">${rows.join('')}</ol>` : '';
  };

  const journalSections = groups
    .map(
      (g) =>
        `<section class="page stop-section">` +
        `<div class="stop-head">🗺️ ${esc(g.title)}</div>` +
        stopIntro(g) +
        g.items.map(placeBlock).join('') +
        `</section>`
    )
    .join('');

  const routeText = esc(plan.mapPage.routeText || '');
  const totalDist = plan.mapPage.totalDistance ? esc(plan.mapPage.totalDistance) : '';
  const routeSvg = buildRouteSvg(trip.stops || [], {
    W: 620,
    H: 380,
    sea: '#dceaf5',
    land: '#eef3ea',
    line: '#c0392b',
    dot: '#f5a623',
    dotStroke: '#0b3a5b',
    dotText: '#0b3a5b',
    text: '#14202b',
  });

  return `<!doctype html><html lang="${LANG_TAG[getLang()] || 'tr'}"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(plan.cover.title)} — Albüm</title>
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #f2f2f2; color: #14202b;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
  .page { background: #fff; width: 210mm; min-height: 297mm; margin: 10px auto; padding: 18mm 16mm;
    box-shadow: 0 2px 12px rgba(0,0,0,0.15); }
  .cover { display: flex; flex-direction: column; }
  /* Kapak görseli KIRPILMAZ ve bant/çerçeve oluşmaz — kendi oranında, ortalı. */
  .cover-img { max-width: 100%; max-height: 150mm; width: auto; height: auto; display: block; margin: 0 auto; border-radius: 6px; }
  .cover-title { font-size: 34px; font-weight: 800; color: #0b3a5b; margin-top: 22mm; }
  .cover-sub { font-size: 16px; color: #55636e; margin-top: 8px; }
  .cover-meta { font-size: 13px; color: #7a8791; margin-top: auto; }
  h2 { font-size: 13px; letter-spacing: 1px; color: #9aa4ad; text-transform: uppercase; margin: 0 0 10px; }
  .intro-text { font-size: 15px; line-height: 1.6; }
  .stop-head { font-size: 20px; font-weight: 800; color: #0b3a5b; border-bottom: 2px solid #0b3a5b;
    padding-bottom: 5px; margin: 0 0 14px; page-break-after: avoid; break-after: avoid; }
  .place { margin-bottom: 16px; }
  /* Başlık metni bölünmez ve mümkünse fotoğrafıyla AYNI sayfada kalır. */
  .place-lead { break-inside: avoid; page-break-inside: avoid;
    break-after: avoid; page-break-after: avoid; }
  .place-title { font-size: 17px; font-weight: 700; }
  .place-title .place-date { font-weight: 400; color: #7a8791; font-size: 13px; }
  .place-loc { font-size: 13px; color: #7a8791; margin-top: 1px; }
  .place-summary { font-size: 13.5px; line-height: 1.55; color: #33404b; margin-top: 6px; }
  .place-note { font-size: 13px; color: #55636e; font-style: italic; margin-top: 5px; }
  /* Günlük notlar bölümü */
  .daynote { break-inside: avoid; page-break-inside: avoid; margin-bottom: 14mm; }
  .daynote-date { font-size: 12px; font-weight: 800; color: #0f6fa8; letter-spacing: .3px; }
  .daynote-title { font-size: 16px; font-weight: 800; color: #16202a; margin-top: 3px; }
  .daynote-text { font-size: 13.5px; line-height: 1.6; color: #26313b; margin-top: 5px; white-space: pre-wrap; }
  /* Fotoğraflar: satırda EN FAZLA 2 foto (bölünmez satır; sığmazsa komple sonraki
     sayfaya iner). Fotoğraflar KENDİ ORANINDA gösterilir (max-width/max-height +
     width/height:auto) → ne kırpma ne de yandan/üstten bant/çerçeve oluşur; yalnızca
     sığmazsa orantılı küçültülür ve ortalanır.
     DİKKAT: burada FLEX KULLANILMAZ. Chromium/WebKit, flex kaplarında
     "break-inside: avoid" kuralını yok sayıyor; satır flex olduğu sürece
     fotoğraflar sayfa sonunda ikiye bölünebiliyordu. Blok + inline-block
     yerleşimde kural gerçekten uygulanıyor. */
  .prow { display: block; text-align: center; font-size: 0; margin-top: 10px;
    break-inside: avoid; page-break-inside: avoid; }
  .prow figure.ph { display: inline-block; width: calc(50% - 5px); margin: 0; vertical-align: top;
    text-align: center; }
  .prow figure.ph + figure.ph { margin-left: 8px; }
  .prow.solo figure.ph { width: 100%; margin-left: 0; }
  .prow img { max-width: 100%; width: auto; height: auto; border-radius: 4px; display: block; margin: 0 auto; }
  /* Yükseklikler, satır + boşluklar TEK sayfaya (273mm) rahatça sığacak
     biçimde sınırlandı. */
  .prow.land img { max-height: 128mm; }
  .prow.port img { max-height: 168mm; }
  .prow.solo.land img { max-height: 178mm; }
  .prow.solo.port img { max-height: 215mm; }
  .mapbox { width: 100%; margin-bottom: 14px; }
  .mapbox svg { width: 100%; height: auto; border: 1px solid #e6ebf0; border-radius: 8px; }
  .route { font-size: 15px; font-weight: 600; line-height: 1.6; }
  .dist { font-size: 13px; color: #7a8791; margin-top: 6px; }
  .stop-intro { break-inside: avoid; margin-bottom: 12px; }
  /* Şehir temel fotoğrafı da KIRPILMAZ ve bant oluşturmaz — kendi oranında, ortalı. */
  .stop-intro-photo { max-width: 100%; max-height: 92mm; width: auto; height: auto;
    border-radius: 6px; margin: 0 auto 8px; display: block; }
  /* Sade güzergah listesi: ülke / şehir / mekan adları (açıklamasız). */
  .route-list { margin: 0; padding-left: 22px; }
  .rl-stop { margin-bottom: 12px; }
  .rl-city { font-size: 16px; font-weight: 700; color: #0b3a5b; }
  .rl-country { font-weight: 600; color: #55636e; font-size: 14px; }
  .rl-date { font-weight: 400; color: #7a8791; font-size: 12px; }
  .rl-places { margin: 4px 0 0; padding-left: 18px; }
  .rl-places li { font-size: 13.5px; color: #33404b; line-height: 1.5; }
  @media print {
    html, body { background: #fff; }
    .page { box-shadow: none; margin: 0; width: auto; min-height: auto; padding: 0; page-break-after: always; }
    .page:last-child { page-break-after: auto; }
    @page { size: A4; margin: 12mm; }
  }
</style></head><body>
  <section class="page cover">
    ${coverImg ? `<img class="cover-img" src="${coverImg}" />` : ''}
    <div class="cover-title">${esc(plan.cover.title)}</div>
    ${plan.cover.subtitle ? `<div class="cover-sub">${esc(plan.cover.subtitle)}</div>` : ''}
    <div class="cover-meta">${esc(plan.vehicle.icon)} ${esc(plan.vehicle.label)} · ${plan.discoveryCount} keşif</div>
  </section>
  <section class="page">
    <h2>Giriş</h2>
    <div class="intro-text">${esc(plan.intro.text)}</div>
  </section>
  <section class="page">
    <h2>Seyahat Haritası</h2>
    ${routeSvg ? `<div class="mapbox">${routeSvg}</div>` : ''}
    <div class="route">${routeText}</div>
    ${totalDist ? `<div class="dist">Toplam mesafe: ${totalDist}</div>` : ''}
  </section>
  <section class="page">
    <h2>${t('doc.route')}</h2>
    ${simpleRouteHtml() || `<div class="intro-text">${t('pub.noStops')}</div>`}
  </section>
  ${dayNotesHtml()}
  ${journalSections || `<section class="page"><div class="intro-text">${t('doc.noDiscoveries')}</div></section>`}
</body></html>`;
}

// Web'de albümü yazdır/PDF olarak kaydet diyaloğunu açar.
export function exportAlbumPdf(trip) {
  return printDocument(() => buildAlbumHtml(trip), '📖 ' + t('common.preparing'));
}
