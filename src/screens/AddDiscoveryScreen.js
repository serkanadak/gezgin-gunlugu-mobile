import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '../state/JournalContext';
import { enrichPlace, ENRICH_SOURCE } from '../logic/enrich';
import { exifDateKey, exifCoords } from '../logic/exif';
import { pickImages } from '../logic/imagePicker';
import { todayKey, formatLongDate } from '../logic/date';
import { colors } from '../theme';
import { t } from '../i18n';
import { Card, Field, PrimaryButton, SecondaryButton, SectionHeader, Pill } from '../components/common';
import PlacePhoto from '../components/PlacePhoto';

const SOURCE_LABEL = {
  [ENRICH_SOURCE.LOCAL]: { label: t('disc.source.local'), color: colors.success },
  [ENRICH_SOURCE.AI]: { label: t('disc.source.ai'), color: colors.accent },
  [ENRICH_SOURCE.TEMPLATE]: { label: t('addDisc.emptyTemplate'), color: colors.textMuted },
};

export default function AddDiscoveryScreen({ route, navigation }) {
  const {
    tripId,
    stopId = null,
    stopName = '',
    presetCity = '',
    presetCountry = '',
    presetLat = null,
    presetLng = null,
  } = route.params || {};
  const { addDiscovery, settings } = useJournal();

  useLayoutEffect(() => {
    navigation.setOptions({ title: stopName ? t('addDisc.forStop', { stop: stopName }) : t('addDisc.title') });
  }, [navigation, stopName]);

  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]); // uri listesi — aynı mekana birden fazla foto
  const [photoCoords, setPhotoCoords] = useState(null);
  const [photoDate, setPhotoDate] = useState(null);
  const [picking, setPicking] = useState(null); // { done, total } — hazırlama göstergesi
  const [photoWarn, setPhotoWarn] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [userNotes, setUserNotes] = useState('');

  // Fotoğraflar TEK TEK küçültülerek alınır (bkz. logic/imagePicker.js):
  // tam boy base64 hiç oluşmadığı için telefonda bellek taşması / hata olmaz.
  const pickPhoto = async () => {
    setPhotoWarn('');
    try {
      const res = await pickImages({
        multiple: true,
        onProgress: (done, total) => setPicking(total > 1 ? { done, total } : null),
      });
      if (res.canceled) return;
      // Meta veriyi (tarih/konum) asset'lerden oku (native'de EXIF gelir).
      for (const a of res.assets) {
        const coords = exifCoords(a.exif);
        const date = exifDateKey(a.exif);
        if (coords && !photoCoords) setPhotoCoords(coords);
        if (date && !photoDate) setPhotoDate(date);
      }
      if (res.assets.length) setPhotos((prev) => [...prev, ...res.assets.map((a) => a.uri)]);
      if (res.failed) setPhotoWarn(t('photo.someFailed', { n: res.failed }));
    } catch (e) {
      setPhotoWarn(t('photo.failed'));
    } finally {
      setPicking(null);
    }
  };

  const removePhoto = (uri) => setPhotos((prev) => prev.filter((u) => u !== uri));

  const analyze = async () => {
    const q = query.trim();
    if (!q && !photos.length) return;
    setAnalyzing(true);
    try {
      const coords = photoCoords || (presetLat != null && presetLng != null ? { lat: presetLat, lng: presetLng } : null);
      const enriched = await enrichPlace(q || 'Bilinmeyen konum', {
        settings,
        date: photoDate || todayKey(),
        coords,
      });
      setResult(enriched);
    } finally {
      setAnalyzing(false);
    }
  };

  const save = () => {
    if (!result) return;
    addDiscovery(tripId, {
      placeName: result.placeName,
      placeId: result.placeId ?? null,
      city: result.city || presetCity || '',
      country: result.country || presetCountry || '',
      date: result.date,
      lat: result.lat ?? presetLat ?? null,
      lng: result.lng ?? presetLng ?? null,
      summary: result.summary,
      sources: result.sources,
      userNotes: userNotes.trim(),
      photos,
      photoUri: null, // kapak `photos[0]`tan okunur; kopyalamak veriyi iki katına çıkarıyordu
      enrichSource: result.source,
      stopId: stopId ?? null,
    });
    navigation.goBack();
  };

  const meta = result ? SOURCE_LABEL[result.source] : null;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <SectionHeader
          title={stopName ? t('addDisc.stopTitle') : t('addDisc.freeTitle')}
          subtitle={
            stopName
              ? t('addDisc.stopSub', { stop: stopName })
              : t('addDisc.freeSub')
          }
        />
        {stopName ? (
          <View style={styles.ctxBanner}>
            <Text style={styles.ctxText}>{t('addDisc.stopCtx', { stop: stopName })}</Text>
          </View>
        ) : null}

        <Card>
          {photos.length ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoStrip}>
              {photos.map((uri) => (
                <View key={uri} style={styles.photoThumbWrap}>
                  <Image source={{ uri }} style={styles.photoThumb} resizeMode="cover" />
                  <Pressable style={styles.removeThumb} onPress={() => removePhoto(uri)} hitSlop={6}>
                    <Text style={styles.removeThumbText}>✕</Text>
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          ) : null}

          <SecondaryButton
            title={photos.length ? t('addDisc.addPhotoN', { n: photos.length }) : t('addDisc.uploadPhoto')}
            onPress={pickPhoto}
            disabled={!!picking}
            style={{ marginHorizontal: 0 }}
          />

          {picking ? (
            <View style={styles.pickingRow}>
              <ActivityIndicator color={colors.primary} />
              <Text style={styles.pickingText}>{t('photo.preparing', picking)}</Text>
            </View>
          ) : null}
          {photoWarn ? <Text style={styles.photoWarn}>{photoWarn}</Text> : null}

          {photos.length && (photoCoords || photoDate) ? (
            <Text style={styles.exifNote}>
              {t('photo.exifNote')}
              {photoDate ? ` 📅 ${photoDate}` : ''}
              {photoCoords ? ` · 📍 ${photoCoords.lat.toFixed(3)}, ${photoCoords.lng.toFixed(3)}` : ''}
            </Text>
          ) : null}

          <Field
            label={t('addDisc.name')}
            value={query}
            onChangeText={setQuery}
            placeholder={t('addDisc.namePlaceholder')}
          />

          <PrimaryButton
            title={analyzing ? t('addDisc.analysing') : t('addDisc.analyse')}
            onPress={analyze}
            disabled={analyzing || (!query.trim() && !photos.length)}
            style={{ marginHorizontal: 0, marginTop: 16 }}
          />
          {analyzing ? <ActivityIndicator color={colors.primary} style={{ marginTop: 12 }} /> : null}
        </Card>

        {/* Zenginleştirilmiş sonuç — çıktı şablonu */}
        {result ? (
          <View style={styles.resultCard}>
            <View style={styles.resultHeaderRow}>
              <Text style={styles.pin}>📍</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.resultTitle}>{result.placeName}</Text>
                {[result.city, result.country].filter(Boolean).length ? (
                  <Text style={styles.resultLoc}>{[result.city, result.country].filter(Boolean).join(' / ')}</Text>
                ) : null}
              </View>
              {meta ? <Pill label={meta.label} color={meta.color} /> : null}
            </View>

            <Text style={styles.resultDate}>{t('disc.dateLabel', { date: formatLongDate(result.date) })}</Text>

            <PlacePhoto
              place={{ id: result.placeId, name: result.placeName, city: result.city, country: result.country }}
            />

            <Text style={styles.h}>{t('disc.summaryHead')}</Text>
            {result.summary ? (
              <Text style={styles.summary}>{result.summary}</Text>
            ) : (
              <Text style={styles.summaryEmpty}>
                {t('addDisc.notInArchive')}
              </Text>
            )}
            {result.aiError ? <Text style={styles.err}>{t('addDisc.aiError', { msg: result.aiError })}</Text> : null}

            {result.sources?.length ? (
              <>
                <Text style={styles.h}>{t('disc.sourcesHead')}</Text>
                {result.sources.map((s, i) => (
                  <Text key={i} style={styles.source}>
                    • {s}
                  </Text>
                ))}
              </>
            ) : null}

            <Text style={styles.h}>{t('disc.notesHead')}</Text>
            <Field
              value={userNotes}
              onChangeText={setUserNotes}
              placeholder={t('addDisc.notePlaceholder')}
              multiline
            />

            <PrimaryButton title={t('addDisc.save')} onPress={save} style={{ marginHorizontal: 0, marginTop: 16 }} />
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  ctxBanner: {
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: colors.accent + '22',
    borderColor: colors.accent,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 12,
  },
  ctxText: { color: colors.text, fontSize: 13, fontWeight: '600' },
  photoStrip: { marginBottom: 12 },
  photoThumbWrap: { position: 'relative', marginRight: 10 },
  photoThumb: { width: 120, height: 120, borderRadius: 12, backgroundColor: colors.surfaceAlt },
  removeThumb: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeThumbText: { color: '#fff', fontWeight: '800', fontSize: 12 },
  exifNote: { color: colors.accent, fontSize: 12, marginTop: 10 },
  pickingRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  pickingText: { color: colors.textMuted, fontSize: 13 },
  photoWarn: { color: colors.danger, fontSize: 12, marginTop: 10, lineHeight: 17 },
  resultCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.primary + '55',
  },
  resultHeaderRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  pin: { fontSize: 18 },
  resultTitle: { color: colors.text, fontSize: 18, fontWeight: '800' },
  resultLoc: { color: colors.textMuted, fontSize: 13, marginTop: 2 },
  resultDate: { color: colors.text, fontSize: 13, marginTop: 12, fontWeight: '600' },
  h: { color: colors.primary, fontSize: 14, fontWeight: '800', marginTop: 18, marginBottom: 8 },
  summary: { color: colors.text, fontSize: 14, lineHeight: 21 },
  summaryEmpty: { color: colors.textMuted, fontSize: 13, lineHeight: 19, fontStyle: 'italic' },
  source: { color: colors.textMuted, fontSize: 13, lineHeight: 20 },
  err: { color: colors.danger, fontSize: 12, marginTop: 8 },
});
