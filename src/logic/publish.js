// Yayın (kitapçık / fotoğraf albümü / e-kitap) mizanpaj planı üreticisi.
// Toplanan keşifleri kronolojik olarak dizip sayfa sayfa yerleşim taslağı çıkarır.
import { formatLongDate, formatShortDate, daysBetween } from './date';
import { t } from '../i18n';
import { computeRoute, formatKm } from './geo';
import { getVehicle } from '../data/vehicles';

// Geriye uyumlu foto listesi (yeni: photos[], eski: tek photoUri).
function photosOf(d) {
  if (Array.isArray(d?.photos) && d.photos.length) return d.photos;
  return d?.photoUri ? [d.photoUri] : [];
}

// Keşifleri tarihe göre grupla (gün gün).
function groupByDay(discoveries) {
  const map = new Map();
  for (const d of discoveries) {
    const key = d.date || 'tarihsiz';
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(d);
  }
  return [...map.entries()].sort((a, b) => (a[0] < b[0] ? -1 : 1));
}

// Fotoğraf sayısına göre uygun yerleşim şablonu öner.
function layoutFor(count) {
  if (count <= 1) return t('pub.layoutSolo');
  if (count === 2) return t('pub.layoutPair');
  if (count <= 4) return t('pub.layoutGrid');
  return t('pub.layoutMosaic');
}

export function generateAlbumPlan(trip) {
  const discoveries = [...(trip.discoveries || [])].sort((a, b) => ((a.date || '') < (b.date || '') ? -1 : 1));
  const days = groupByDay(discoveries);
  const vehicle = getVehicle(trip.vehicle);
  const route = computeRoute(trip.stops || [], trip.vehicle);
  const span = daysBetween(trip.startDate, trip.endDate);

  const cover = {
    title: trip.title || t('doc.journal'),
    subtitle: [
      trip.startDate ? formatShortDate(trip.startDate) : null,
      trip.endDate ? formatShortDate(trip.endDate) : null,
    ]
      .filter(Boolean)
      .join(' – '),
    colorIdea: t('pub.colorIdea'),
    imageIdea:
      photosOf(discoveries[0]).length
        ? t('pub.imageIdeaPhoto')
        : t('pub.imageIdeaMap'),
  };

  const intro = {
    heading: t('pub.introPage'),
    text:
      t('pub.introFull', {
        title: trip.title || t('pub.thisTrip'),
        vehicle: `${vehicle.icon} ${vehicle.label}`,
        route: (trip.stops || []).map((s) => s.name).filter(Boolean).join(' → ') || t('pub.variousStops'),
        span: span ? t('pub.spanDays', { n: span }) : '',
      }) +
      ' ' +
      t('pub.totals', { disc: discoveries.length, stops: (trip.stops || []).length }),
    layout: t('pub.layoutIntro'),
  };

  const pages = days.map(([dateKey, items], idx) => {
    const totalPhotos = items.reduce((n, i) => n + photosOf(i).length, 0);
    return {
      pageNo: idx + 1,
      date: dateKey === 'tarihsiz' ? 'Tarihsiz' : formatLongDate(dateKey),
      photoCount: totalPhotos,
      layout: layoutFor(totalPhotos || items.length),
      entries: items.map((i) => {
        const ph = photosOf(i);
        return {
          placeName: i.placeName,
          location: [i.city, i.country].filter(Boolean).join(', '),
          hasPhoto: ph.length > 0,
          photoCount: ph.length,
          photoUri: ph[0] || null,
          summary: i.summary || '',
          userNotes: i.userNotes || '',
          sources: i.sources || [],
        };
      }),
    };
  });

  const mapPage = {
    heading: t('pub.mapPage'),
    routeText:
      (trip.stops || []).map((s) => s.name).filter(Boolean).join('  →  ') || t('pub.noStops'),
    totalDistance: route.hasAny ? formatKm(route.totalKm) : null,
    layout: t('pub.layoutMap'),
  };

  return { cover, intro, pages, mapPage, vehicle, route, discoveryCount: discoveries.length };
}

// Planı panoya kopyalanabilir düz metne (Markdown) çevirir.
export function albumPlanToText(trip) {
  const plan = generateAlbumPlan(trip);
  const L = [];
  L.push(`# ${plan.cover.title} ${t('pub.albumPlan')}`);
  if (plan.cover.subtitle) L.push(`_${plan.cover.subtitle}_`);
  L.push('');
  L.push('## Kapak');
  L.push(`- Renk/tema: ${plan.cover.colorIdea}`);
  L.push(t('pub.visual', { v: plan.cover.imageIdea }));
  L.push('');
  L.push(`## ${plan.intro.heading}`);
  L.push(plan.intro.text);
  L.push(t('pub.layout', { v: plan.intro.layout }));
  L.push('');
  L.push('## Sayfalar (Kronolojik)');
  plan.pages.forEach((p) => {
    L.push('');
    L.push(`### Sayfa ${p.pageNo} — ${p.date}`);
    L.push(t('pub.photoLayout', { n: p.photoCount, layout: p.layout }));
    p.entries.forEach((e) => {
      L.push(
        `  - **${e.placeName}**${e.location ? ' (' + e.location + ')' : ''}${
          e.photoCount ? ` 📷×${e.photoCount}` : ''
        }`
      );
      if (e.userNotes) L.push(`    - Not: ${e.userNotes}`);
    });
  });
  L.push('');
  L.push(`## ${plan.mapPage.heading}`);
  L.push(`- Rota: ${plan.mapPage.routeText}`);
  if (plan.mapPage.totalDistance) L.push(`- Toplam mesafe: ${plan.mapPage.totalDistance}`);
  L.push(t('pub.layout', { v: plan.mapPage.layout }));
  return L.join('\n');
}
