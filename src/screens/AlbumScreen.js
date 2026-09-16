import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, Alert, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { useJournal } from '../state/JournalContext';
import { generateAlbumPlan, albumPlanToText } from '../logic/publish';
import { exportAlbumPdf } from '../logic/albumHtml';
import { colors } from '../theme';
import { t } from '../i18n';
import { EmptyState } from '../components/common';

function tripPhotos(trip) {
  const out = [];
  for (const d of trip.discoveries || []) {
    const arr = Array.isArray(d.photos) && d.photos.length ? d.photos : d.photoUri ? [d.photoUri] : [];
    for (const p of arr) if (p && !out.includes(p)) out.push(p);
  }
  return out;
}

function Block({ children, style }) {
  return <View style={[styles.block, style]}>{children}</View>;
}

export default function AlbumScreen({ route }) {
  const { tripId } = route.params;
  const { getTrip, updateTrip } = useJournal();
  const trip = getTrip(tripId);
  const [copied, setCopied] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);

  if (!trip) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState icon="📖" title={t('trip.notFound')} />
      </SafeAreaView>
    );
  }

  if (!(trip.discoveries || []).length) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState
          icon="📖"
          title={t('album.empty')}
          subtitle={t('album.emptySub')}
        />
      </SafeAreaView>
    );
  }

  const plan = generateAlbumPlan(trip);
  const photos = tripPhotos(trip);

  const copyPlan = async () => {
    await Clipboard.setStringAsync(albumPlanToText(trip));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const makePdf = async () => {
    if (Platform.OS !== 'web') {
      Alert.alert(t('pdf.webOnly'), t('album.pdfWebOnlyMsg'));
      return;
    }
    setPdfBusy(true);
    try {
      const res = await exportAlbumPdf(trip);
      if (!res.ok && res.reason === 'popup') {
        Alert.alert(t('pdf.popupBlocked'), t('pdf.popupBlockedMsg'));
      }
    } catch (e) {
      Alert.alert(t('pdf.failed'), t('common.unexpectedError'));
    } finally {
      setPdfBusy(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.intro}>
          <Text style={styles.introTitle}>{t('album.title')}</Text>
          <Text style={styles.introSub}>
            {plan.discoveryCount} keşif · {plan.pages.length} sayfa · {plan.vehicle.icon} {plan.vehicle.label}
          </Text>
          <Pressable style={[styles.pdfBtn, pdfBusy && { opacity: 0.7 }]} onPress={makePdf} disabled={pdfBusy}>
            {pdfBusy ? (
              <ActivityIndicator color={colors.onPrimary} />
            ) : (
              <Text style={styles.pdfText}>📄 PDF olarak kaydet</Text>
            )}
          </Pressable>
          <Pressable style={styles.copyBtn} onPress={copyPlan}>
            <Text style={styles.copyText}>{copied ? t('common.copied') : t('album.copyPlan')}</Text>
          </Pressable>
          <Text style={styles.pdfHint}>
            PDF, fotoğrafların gömülü olarak baskıya hazır sayfalara dizilir; açılan pencerede “PDF olarak kaydet”i
            seç. Her şey cihazında kalır.
          </Text>
        </View>

        {/* Kapak fotoğrafı seçimi */}
        {photos.length ? (
          <>
            <Text style={styles.stage}>{t('album.coverPhoto')}</Text>
            <View style={styles.coverPick}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingRight: 8 }}>
                <Pressable
                  onPress={() => updateTrip(tripId, { coverPhoto: null })}
                  style={[styles.coverAuto, !trip.coverPhoto && styles.coverSelected]}
                >
                  <Text style={styles.coverAutoText}>Otomatik</Text>
                </Pressable>
                {photos.map((uri) => (
                  <Pressable
                    key={uri}
                    onPress={() => updateTrip(tripId, { coverPhoto: uri })}
                    style={[styles.coverThumbWrap, trip.coverPhoto === uri && styles.coverSelected]}
                  >
                    <Image source={{ uri }} style={styles.coverThumb} resizeMode="cover" />
                    {trip.coverPhoto === uri ? (
                      <View style={styles.coverCheck}>
                        <Text style={styles.coverCheckText}>✓</Text>
                      </View>
                    ) : null}
                  </Pressable>
                ))}
              </ScrollView>
              <Text style={styles.coverHint}>
          {t('album.coverHint')}
              </Text>
            </View>
          </>
        ) : null}

        {/* Kapak */}
        <Text style={styles.stage}>KAPAK</Text>
        <Block style={styles.cover}>
          <Text style={styles.coverTitle}>{plan.cover.title}</Text>
          {plan.cover.subtitle ? <Text style={styles.coverSub}>{plan.cover.subtitle}</Text> : null}
          <Text style={styles.ideaLabel}>🎨 Renk/Tema</Text>
          <Text style={styles.idea}>{plan.cover.colorIdea}</Text>
          <Text style={styles.ideaLabel}>{t('album.visual')}</Text>
          <Text style={styles.idea}>{plan.cover.imageIdea}</Text>
        </Block>

        {/* Giriş */}
        <Text style={styles.stage}>{t('album.introPage')}</Text>
        <Block>
          <Text style={styles.introText}>{plan.intro.text}</Text>
          <Text style={styles.layout}>📐 {plan.intro.layout}</Text>
        </Block>

        {/* Sayfalar */}
        <Text style={styles.stage}>{t('album.pages')}</Text>
        {plan.pages.map((p) => (
          <Block key={p.pageNo}>
            <View style={styles.pageHead}>
              <View style={styles.pageNo}>
                <Text style={styles.pageNoText}>{p.pageNo}</Text>
              </View>
              <Text style={styles.pageDate}>{p.date}</Text>
            </View>
            <Text style={styles.layout}>
              🖼️ {p.photoCount} fotoğraf · {p.layout}
            </Text>
            {p.entries.map((e, i) => (
              <View key={i} style={styles.entry}>
                <Text style={styles.entryTitle}>
                  {e.hasPhoto ? '📷' : '📍'} {e.placeName}
                  {e.photoCount > 1 ? <Text style={styles.entryLoc}>  ×{e.photoCount}</Text> : null}
                  {e.location ? <Text style={styles.entryLoc}>  {e.location}</Text> : null}
                </Text>
                {e.userNotes ? <Text style={styles.entryNote}>✍️ {e.userNotes}</Text> : null}
              </View>
            ))}
          </Block>
        ))}

        {/* Harita */}
        <Text style={styles.stage}>{t('album.mapPage')}</Text>
        <Block>
          <Text style={styles.mapRoute}>{plan.mapPage.routeText}</Text>
          {plan.mapPage.totalDistance ? (
            <Text style={styles.mapDist}>Toplam mesafe: {plan.mapPage.totalDistance}</Text>
          ) : null}
          <Text style={styles.layout}>📐 {plan.mapPage.layout}</Text>
        </Block>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  intro: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  introTitle: { color: colors.text, fontSize: 18, fontWeight: '800' },
  introSub: { color: colors.textMuted, fontSize: 13, marginTop: 4 },
  pdfBtn: {
    marginTop: 14,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  pdfText: { color: colors.onPrimary, fontWeight: '800', fontSize: 15 },
  copyBtn: {
    marginTop: 10,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  copyText: { color: colors.text, fontWeight: '700', fontSize: 14 },
  pdfHint: { color: colors.textMuted, fontSize: 12, lineHeight: 17, marginTop: 10 },
  coverPick: { marginHorizontal: 16 },
  coverThumbWrap: { borderRadius: 10, overflow: 'hidden', borderWidth: 2, borderColor: 'transparent' },
  coverThumb: { width: 84, height: 84, backgroundColor: colors.surfaceAlt },
  coverSelected: { borderColor: colors.primary },
  coverCheck: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.primary,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverCheckText: { color: colors.onPrimary, fontWeight: '800', fontSize: 13 },
  coverAuto: {
    width: 84,
    height: 84,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverAutoText: { color: colors.textMuted, fontSize: 13, fontWeight: '700' },
  coverHint: { color: colors.textMuted, fontSize: 12, lineHeight: 17, marginTop: 8 },
  stage: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginHorizontal: 16,
    marginTop: 22,
    marginBottom: 8,
  },
  block: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cover: { borderColor: colors.primary + '55' },
  coverTitle: { color: colors.primary, fontSize: 22, fontWeight: '900' },
  coverSub: { color: colors.text, fontSize: 14, marginTop: 4 },
  ideaLabel: { color: colors.text, fontSize: 13, fontWeight: '700', marginTop: 14 },
  idea: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginTop: 4 },
  introText: { color: colors.text, fontSize: 14, lineHeight: 21 },
  layout: { color: colors.accent, fontSize: 12, marginTop: 10, lineHeight: 17 },
  pageHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  pageNo: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageNoText: { color: colors.onPrimary, fontWeight: '800', fontSize: 13 },
  pageDate: { color: colors.text, fontSize: 14, fontWeight: '700' },
  entry: { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.border },
  entryTitle: { color: colors.text, fontSize: 14, fontWeight: '600' },
  entryLoc: { color: colors.textMuted, fontSize: 12, fontWeight: '400' },
  entryNote: { color: colors.textMuted, fontSize: 12, marginTop: 4, fontStyle: 'italic' },
  mapRoute: { color: colors.text, fontSize: 14, fontWeight: '600', lineHeight: 21 },
  mapDist: { color: colors.textMuted, fontSize: 13, marginTop: 6 },
});
