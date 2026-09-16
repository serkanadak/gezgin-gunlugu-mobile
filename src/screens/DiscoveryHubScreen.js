import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Platform, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '../state/JournalContext';
import { matchPlace } from '../data/places';
import { attractionsFor, attractionToDiscovery } from '../data/attractions';
import { exportDiscoveryPdf } from '../logic/tripDoc';
import { todayKey, formatShortDate } from '../logic/date';
import { coverOf, hasPhoto } from '../logic/photos';
import { colors } from '../theme';
import { t } from '../i18n';
import { Card, SectionHeader, EmptyState, Pill, ConfirmModal, Field } from '../components/common';
import PlacePhoto from '../components/PlacePhoto';

const norm = (s) => (s || '').toLocaleLowerCase('tr').replace(/\s+/g, ' ').trim();

// Bir keşif satırı (kaydedilmiş) — detaya götürür.
function DiscoveryRow({ disc, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.discRow, pressed && { opacity: 0.85 }]}>
      {coverOf(disc) ? (
        <Image source={{ uri: coverOf(disc) }} style={styles.thumb} resizeMode="cover" />
      ) : (
        <Text style={styles.discIcon}>📍</Text>
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.discName} numberOfLines={1}>
          {disc.placeName}
        </Text>
        <Text style={styles.discMeta} numberOfLines={1}>
          {disc.userNotes ? '📝 ' : ''}
          {disc.date ? formatShortDate(disc.date) : '—'}
          {hasPhoto(disc) ? ' · 📷' : ''}
        </Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

// Rotadaki bir durağın açılır kartı: gezilecek mekanlar + eklenen keşifler.
function StopSection({ trip, stop, navigation }) {
  const { addDiscovery, removeDiscovery, updateStop } = useJournal();
  const [open, setOpen] = useState(false);
  const [pendingUnmark, setPendingUnmark] = useState(null);
  // Şehir/durak notu: mekanlardan bağımsız, durağın kendisine yazılan günlük notu.
  const [cityNote, setCityNote] = useState(stop.journalNote || '');
  const [editCityNote, setEditCityNote] = useState(false);
  const saveCityNote = () => {
    updateStop(trip.id, stop.id, { journalNote: cityNote.trim() });
    setEditCityNote(false);
  };

  const place = matchPlace(stop.name);
  const attractions = place ? attractionsFor(place.id) : [];
  const dateForAdd = stop.date || todayKey();

  const stopDiscoveries = (trip.discoveries || []).filter((d) => d.stopId === stop.id);
  const discByName = new Map(stopDiscoveries.map((d) => [norm(d.placeName), d]));

  // Mekan listesindeki isimlerle eşleşmeyen (kullanıcının eklediği) keşifler.
  const attractionNames = new Set(attractions.map((a) => norm(a.name)));
  const extraDiscoveries = stopDiscoveries.filter((d) => !attractionNames.has(norm(d.placeName)));

  const markVisited = (attraction) => {
    addDiscovery(trip.id, { ...attractionToDiscovery(attraction, place, dateForAdd), stopId: stop.id });
  };

  // "Gidildi" işaretini geri al. Not/fotoğraf eklenmişse silmeden önce onay iste;
  // sadece hızlıca işaretlenmiş (boş) keşifleri doğrudan kaldır.
  const unmarkVisited = (disc) => {
    if (disc.userNotes || hasPhoto(disc)) {
      setPendingUnmark(disc);
    } else {
      removeDiscovery(trip.id, disc.id);
    }
  };

  const openDisc = (d) => navigation.navigate('DiscoveryDetail', { tripId: trip.id, discoveryId: d.id });

  const visitedCount = stopDiscoveries.length;

  return (
    <View style={styles.stopCard}>
      <Pressable onPress={() => setOpen((o) => !o)} style={styles.stopHead}>
        <View style={{ flex: 1 }}>
          <Text style={styles.stopName}>🗺️ {stop.name}</Text>
          <Text style={styles.stopSub}>
            {stop.date ? `${formatShortDate(stop.date)} · ` : ''}
            {visitedCount > 0 ? t('disc.visitedCount', { n: visitedCount }) : t('disc.noneYet')}
            {attractions.length ? t('disc.suggestedCount', { n: attractions.length }) : ''}
          </Text>
        </View>
        <Text style={styles.chevronDown}>{open ? '▲' : '▼'}</Text>
      </Pressable>

      {open ? (
        <View style={styles.stopBody}>
          {place ? <PlacePhoto place={place} height={170} /> : null}
          {place?.summary ? <Text style={styles.stopSummary}>{place.summary}</Text> : null}

          {/* Şehir/durak notu — mekana değil, durağın kendisine */}
          {editCityNote ? (
            <View style={styles.cityNoteBox}>
              <Text style={styles.subLabel}>{t('disc.cityNote')}</Text>
              <Field
                value={cityNote}
                onChangeText={setCityNote}
                placeholder={t('disc.cityNotePlaceholder')}
                multiline
              />
              <View style={styles.cityNoteActions}>
                <Pressable onPress={saveCityNote} hitSlop={8}>
                  <Text style={styles.cityNoteSave}>{t('common.save')}</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setCityNote(stop.journalNote || '');
                    setEditCityNote(false);
                  }}
                  hitSlop={8}
                >
                  <Text style={styles.cityNoteCancel}>{t('common.cancel')}</Text>
                </Pressable>
              </View>
            </View>
          ) : stop.journalNote ? (
            <Pressable style={styles.cityNoteBox} onPress={() => setEditCityNote(true)}>
              <Text style={styles.subLabel}>{t('disc.cityNote')}</Text>
              <Text style={styles.cityNoteText}>{stop.journalNote}</Text>
              <Text style={styles.cityNoteEdit}>{t('common.edit')} ›</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.cityNoteAdd} onPress={() => setEditCityNote(true)}>
              <Text style={styles.cityNoteAddText}>{t('disc.cityNoteAdd')}</Text>
            </Pressable>
          )}
          {attractions.length ? (
            <>
              <Text style={styles.subLabel}>{t('disc.toVisit')}</Text>
              {attractions.map((a) => {
                const existing = discByName.get(norm(a.name));
                if (existing) {
                  return (
                    <View key={a.name} style={[styles.attrRow, styles.attrVisited]}>
                      <Pressable
                        onPress={() => openDisc(existing)}
                        style={({ pressed }) => [styles.attrVisitedMain, pressed && { opacity: 0.85 }]}
                      >
                        <Text style={styles.check}>✓</Text>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.attrName}>{a.name}</Text>
                          <Text style={styles.attrVisitedHint}>
                            {t('disc.visitedHint', { noteState: existing.userNotes ? t('disc.noted') : t('disc.addNote') })} {hasPhoto(existing) ? '· 📷' : ''} →
                          </Text>
                        </View>
                      </Pressable>
                      <Pressable
                        onPress={() => unmarkVisited(existing)}
                        style={styles.unmarkBtn}
                        hitSlop={6}
                      >
                        <Text style={styles.unmarkBtnText}>↩︎ Geri al</Text>
                      </Pressable>
                    </View>
                  );
                }
                return (
                  <View key={a.name} style={styles.attrRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.attrName}>{a.name}</Text>
                      <Text style={styles.attrDesc}>{a.desc}</Text>
                    </View>
                    <Pressable onPress={() => markVisited(a)} style={styles.markBtn} hitSlop={6}>
                      <Text style={styles.markBtnText}>{t('disc.markVisited')}</Text>
                    </Pressable>
                  </View>
                );
              })}
            </>
          ) : (
            <Text style={styles.noAttr}>{t('disc.noSuggestions')}</Text>
          )}

          {extraDiscoveries.length ? (
            <>
              <Text style={styles.subLabel}>{t('disc.addedPlaces')}</Text>
              {extraDiscoveries.map((d) => (
                <DiscoveryRow key={d.id} disc={d} onPress={() => openDisc(d)} />
              ))}
            </>
          ) : null}

          <Pressable
            style={styles.addUnderStop}
            onPress={() =>
              navigation.navigate('AddDiscovery', {
                tripId: trip.id,
                stopId: stop.id,
                stopName: stop.name,
                presetCity: place?.city || stop.name,
                presetCountry: place?.country || '',
                presetLat: stop.lat ?? place?.lat ?? null,
                presetLng: stop.lng ?? place?.lng ?? null,
              })
            }
          >
            <Text style={styles.addUnderStopText}>{t('disc.addToStop')}</Text>
          </Pressable>
        </View>
      ) : null}

      <ConfirmModal
        visible={!!pendingUnmark}
        title={t('disc.unmark')}
        message={pendingUnmark ? t('disc.unmarkMsg', { name: pendingUnmark.placeName }) : ''}
        confirmLabel={t('route.undoBtn')}
        destructive
        onConfirm={() => {
          removeDiscovery(trip.id, pendingUnmark.id);
          setPendingUnmark(null);
        }}
        onCancel={() => setPendingUnmark(null)}
      />
    </View>
  );
}

export default function DiscoveryHubScreen({ route, navigation }) {
  const { tripId } = route.params;
  const { getTrip } = useJournal();
  const trip = getTrip(tripId);
  const [pdfBusy, setPdfBusy] = useState(false);

  const makePdf = async () => {
    if (Platform.OS !== 'web') {
      Alert.alert(t('pdf.webOnly'), t('disc.pdfWebOnlyMsg'));
      return;
    }
    setPdfBusy(true);
    try {
      const res = await exportDiscoveryPdf(trip);
      if (res && !res.ok && res.reason === 'popup') {
        Alert.alert(t('pdf.popupBlocked'), t('pdf.popupBlockedMsg'));
      }
    } catch (e) {
      Alert.alert(t('pdf.failed'), t('common.unexpectedError'));
    } finally {
      setPdfBusy(false);
    }
  };

  if (!trip) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState icon="🧭" title="Seyahat bulunamadı" />
      </SafeAreaView>
    );
  }

  const stops = trip.stops || [];
  const stopIds = new Set(stops.map((s) => s.id));
  // stopId'si olmayan ya da artık silinmiş bir durağa ait keşifler = rotadan bağımsız.
  const freeDiscoveries = (trip.discoveries || []).filter((d) => !d.stopId || !stopIds.has(d.stopId));
  const sortedFree = [...freeDiscoveries].sort((a, b) => ((a.date || '') < (b.date || '') ? -1 : 1));

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <SectionHeader
          title={t('disc.hubTitle')}
          subtitle={t('disc.hubSub')}
        />

        <Pressable style={[styles.pdfBtn, pdfBusy && { opacity: 0.7 }]} onPress={makePdf} disabled={pdfBusy}>
          {pdfBusy ? (
            <ActivityIndicator color={colors.onPrimary} />
          ) : (
            <Text style={styles.pdfText}>{t('disc.pdfAll')}</Text>
          )}
        </Pressable>

        {stops.length ? (
          stops.map((s) => <StopSection key={s.id} trip={trip} stop={s} navigation={navigation} />)
        ) : (
          <Card>
            <Text style={styles.emptyStops}>
              Henüz durak yok. Önce Güzergah Planı’ndan durak ekle; keşifleri duraklara göre burada
              düzenleyebilirsin. Rota dışı keşifleri yine de aşağıdan ekleyebilirsin.
            </Text>
          </Card>
        )}

        {/* Rotadan bağımsız */}
        <View style={styles.freeHeader}>
          <Text style={styles.freeTitle}>{t('disc.freeSection')}</Text>
        </View>
        {sortedFree.length ? (
          <View style={{ marginHorizontal: 16 }}>
            {sortedFree.map((d) => (
              <DiscoveryRow
                key={d.id}
                disc={d}
                onPress={() => navigation.navigate('DiscoveryDetail', { tripId, discoveryId: d.id })}
              />
            ))}
          </View>
        ) : (
          <Text style={styles.freeEmpty}>
            {t('disc.freeSectionSub')}
          </Text>
        )}
        <Pressable
          style={styles.addFree}
          onPress={() => navigation.navigate('AddDiscovery', { tripId, stopId: null })}
        >
          <Text style={styles.addFreeText}>{t('disc.addFree')}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cityNoteBox: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  cityNoteText: { color: colors.text, fontSize: 14, lineHeight: 21 },
  cityNoteEdit: { color: colors.primary, fontSize: 12, fontWeight: '700', marginTop: 8 },
  cityNoteActions: { flexDirection: 'row', gap: 18, marginTop: 12 },
  cityNoteSave: { color: colors.primary, fontSize: 13, fontWeight: '800' },
  cityNoteCancel: { color: colors.textMuted, fontSize: 13, fontWeight: '700' },
  cityNoteAdd: { marginTop: 12, paddingVertical: 8 },
  cityNoteAddText: { color: colors.primary, fontSize: 13, fontWeight: '700' },
  container: { flex: 1, backgroundColor: colors.bg },
  stopCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  stopHead: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 10 },
  stopName: { color: colors.text, fontSize: 16, fontWeight: '700' },
  stopSub: { color: colors.textMuted, fontSize: 12, marginTop: 3 },
  chevronDown: { color: colors.textMuted, fontSize: 12 },
  stopBody: { paddingHorizontal: 16, paddingBottom: 16, gap: 8 },
  stopSummary: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  pdfBtn: {
    marginHorizontal: 16,
    marginBottom: 6,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  pdfText: { color: colors.onPrimary, fontWeight: '800', fontSize: 14 },
  subLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginTop: 8,
    textTransform: 'uppercase',
  },
  attrRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  attrVisited: { borderWidth: 1, borderColor: colors.success + '66' },
  attrVisitedMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  unmarkBtn: {
    borderWidth: 1,
    borderColor: colors.danger + '99',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  unmarkBtnText: { color: colors.danger, fontSize: 12, fontWeight: '700' },
  attrName: { color: colors.text, fontSize: 14, fontWeight: '600' },
  attrDesc: { color: colors.textMuted, fontSize: 12, marginTop: 2, lineHeight: 16 },
  attrVisitedHint: { color: colors.success, fontSize: 12, marginTop: 2, fontWeight: '600' },
  check: { color: colors.success, fontSize: 18, fontWeight: '800', width: 20, textAlign: 'center' },
  markBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  markBtnText: { color: colors.primary, fontSize: 13, fontWeight: '700' },
  noAttr: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginTop: 6, fontStyle: 'italic' },
  discRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    padding: 10,
  },
  thumb: { width: 40, height: 40, borderRadius: 8, backgroundColor: colors.surface },
  discIcon: { fontSize: 20, width: 40, textAlign: 'center' },
  discName: { color: colors.text, fontSize: 14, fontWeight: '600' },
  discMeta: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  chevron: { color: colors.textMuted, fontSize: 20 },
  addUnderStop: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: colors.primary + '99',
    borderStyle: 'dashed',
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  addUnderStopText: { color: colors.primary, fontSize: 13, fontWeight: '700' },
  emptyStops: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  freeHeader: { marginHorizontal: 16, marginTop: 26, marginBottom: 8 },
  freeTitle: { color: colors.text, fontSize: 15, fontWeight: '800' },
  freeEmpty: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    marginHorizontal: 16,
    fontStyle: 'italic',
  },
  addFree: {
    marginHorizontal: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  addFreeText: { color: colors.primary, fontSize: 14, fontWeight: '800' },
});
