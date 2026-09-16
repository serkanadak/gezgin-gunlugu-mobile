// Dinamik video kolaj senaryosu üreticisi.
// Yüklenen fotoğraf/keşiflerden sahne sahne (timeline) sinematik bir kurgu çıkarır;
// harita geçişlerini, müzik/ritim ve alt yazı/dış ses metinlerini planlar.
import { formatShortDate } from './date';
import { t } from '../i18n';
import { getVehicle } from '../data/vehicles';
import { computeRoute, formatKm } from './geo';

// Geriye uyumlu foto listesi (yeni: photos[], eski: tek photoUri).
function photosOf(d) {
  if (Array.isArray(d?.photos) && d.photos.length) return d.photos;
  return d?.photoUri ? [d.photoUri] : [];
}

const MUSIC_MOODS = {
  plane: t('vid.moodCinematic'),
  car: 'Yol hissi veren indie-folk, gitar riff (BPM ~110)',
  bus: t('vid.moodLofi'),
  train: t('vid.moodTrain'),
  motorbike: t('vid.moodRock'),
  bike: t('vid.moodPop'),
  walk: 'Sakin ambient / piyano (BPM ~75)',
};

const SCENE_TYPE = {
  INTRO: 'intro',
  TRANSITION: 'transition',
  PLACE: 'place',
  OUTRO: 'outro',
};

// Saniyeyi "0:08" biçimine çevirir.
function ts(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function generateVideoScript(trip, opts = {}) {
  const perPlace = opts.perPlaceSeconds || 5; // her keşif sahnesi
  const transition = opts.transitionSeconds || 2; // harita geçişi
  const vehicle = getVehicle(trip.vehicle);
  const route = computeRoute(trip.stops || [], trip.vehicle);
  const discoveries = [...(trip.discoveries || [])].sort((a, b) => ((a.date || '') < (b.date || '') ? -1 : 1));

  const scenes = [];
  let t = 0;

  // 1) Giriş / açılış kartı
  scenes.push({
    index: scenes.length + 1,
    start: t,
    type: SCENE_TYPE.INTRO,
    title: t('vid.opening'),
    duration: 3,
    visual: photosOf(trip.discoveries?.[0]).length
      ? t('vid.visFirstPhoto')
      : t('vid.visOpening'),
    transition: 'Fade-in',
    onScreenText: `${trip.title || 'Seyahat'} · ${vehicle.icon} ${vehicle.label}`,
    voiceover: t('vid.startsNow', { title: trip.title || t('vid.ourJourney') }),
    music: t('vid.musSoft'),
  });
  t += 3;

  // 2) Her keşif için: harita fly-through geçişi + mekan sahnesi
  discoveries.forEach((d, i) => {
    const prev = discoveries[i - 1];
    scenes.push({
      index: scenes.length + 1,
      start: t,
      type: SCENE_TYPE.TRANSITION,
      title: t('vid.mapTransition', { place: d.placeName }),
      duration: transition,
      visual:
        prev && prev.lat != null && d.lat != null
          ? t('vid.visFly', { from: prev.placeName, to: d.placeName })
          : t('vid.visDive', { place: d.placeName }),
      transition: 'Map fly-through (3D)',
      onScreenText: [d.city, d.country].filter(Boolean).join(', '),
      voiceover: '',
      music: t('vid.musBuild'),
    });
    t += transition;

    scenes.push({
      index: scenes.length + 1,
      start: t,
      type: SCENE_TYPE.PLACE,
      title: d.placeName,
      duration: perPlace,
      visual:
        photosOf(d).length > 1
          ? t('vid.visCollage', { n: photosOf(d).length })
          : photosOf(d).length === 1
          ? t('vid.visFullscreen')
          : t('vid.visPlaceName'),
      transition: i % 2 === 0 ? 'Whip-pan' : 'Cross-dissolve',
      onScreenText: `${d.placeName}${d.date ? ' · ' + formatShortDate(d.date) : ''}`,
      voiceover: shortLine(d),
      music: 'Ana tema, sahne temposunda',
    });
    t += perPlace;
  });

  // 3) Kapanış
  scenes.push({
    index: scenes.length + 1,
    start: t,
    type: SCENE_TYPE.OUTRO,
    title: t('vid.closing'),
    duration: 4,
    visual: t('vid.visClosing'),
    transition: 'Zoom-out + fade',
    onScreenText: route.hasAny
      ? t('vid.tripMeta', { stops: (trip.stops || []).length, km: formatKm(route.totalKm), disc: discoveries.length })
      : t('vid.memories', { n: discoveries.length }),
    voiceover: 'Ve yolculuk burada son buldu — bir sonrakine kadar.',
    music: t('vid.musPeak'),
  });
  t += 4;

  return {
    meta: {
      title: trip.title || 'Seyahat',
      totalScenes: scenes.length,
      totalDuration: t,
      totalDurationLabel: ts(t),
      musicMood: MUSIC_MOODS[vehicle.id] || MUSIC_MOODS.car,
      vehicle,
    },
    scenes,
  };
}

function shortLine(d) {
  if (!d.summary) return d.placeName;
  const firstSentence = d.summary.split(/(?<=[.!?])\s/)[0];
  return firstSentence.length > 140 ? firstSentence.slice(0, 137) + '...' : firstSentence;
}

// Senaryoyu panoya kopyalanabilir düz metne (Markdown) çevirir.
export function videoScriptToText(trip) {
  const script = generateVideoScript(trip);
  const L = [];
  L.push(`# ${script.meta.title} — Video Kolaj Senaryosu`);
  L.push(
    t('vid.totalMeta', { n: script.meta.totalScenes, dur: script.meta.totalDurationLabel, mood: script.meta.musicMood })
  );
  L.push('');
  L.push('## Timeline');
  script.scenes.forEach((s) => {
    L.push('');
    L.push(`### ${ts(s.start)} — Sahne ${s.index}: ${s.title} (${s.duration}s)`);
    L.push(t('vid.visual', { v: s.visual }));
    L.push(t('vid.transition', { v: s.transition }));
    if (s.onScreenText) L.push(t('vid.subtitle', { v: s.onScreenText }));
    if (s.voiceover) L.push(t('vid.voiceover', { v: s.voiceover }));
    L.push(t('vid.music', { v: s.music }));
  });
  return L.join('\n');
}

export { SCENE_TYPE };
