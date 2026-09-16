import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, useWindowDimensions, Platform, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '../state/JournalContext';
import { VEHICLES, getVehicle } from '../data/vehicles';
import { computeRoute, formatKm, formatDuration, hasCoords } from '../logic/geo';
import { fetchRoadKm } from '../logic/roadRoute';
import { matchPlace } from '../data/places';
import { attractionsFor, attractionToDiscovery } from '../data/attractions';
import { routeSvgDataUri, mappableStopCount } from '../logic/routeMap';
import { exportRoutePdf } from '../logic/tripDoc';
import { todayKey, formatShortDate } from '../logic/date';
import { hasPhoto } from '../logic/photos';
import { colors } from '../theme';
import { t } from '../i18n';
import { ChipPicker, ConfirmModal, EmptyState } from '../components/common';
import PlacePhoto from '../components/PlacePhoto';

// Güzergah haritası (koyu tema paletiyle) — koordinatlı duraklar SVG üzerinde.
function RouteMap({ stops }) {
  const { width } = useWindowDimensions();
  if (mappableStopCount(stops) < 2) return null;
  const W = Math.min(width - 32, 560);
  const H = Math.round(W * 0.62);
  const uri = routeSvgDataUri(stops, {
    W: 620,
    H: 380,
    sea: colors.bg,
    land: colors.surfaceAlt,
    line: colors.primary,
    dot: colors.primary,
    dotStroke: colors.surface,
    dotText: colors.onPrimary,
    text: colors.text,
  });
  if (!uri) return null;
  return (
    <View style={styles.mapWrap}>
      <Image source={{ uri }} style={{ width: W, height: H, borderRadius: 12 }} resizeMode="contain" />
      <Text style={styles.mapHint}>{t('route.schematic')}</Text>
    </View>
  );
}

// Bir durağın şehrindeki önemli mekanları açılır liste olarak gösterir; her biri
// tek dokunuşla keşfe eklenebilir. Zaten eklenmişse "Eklendi" olarak işaretlenir.
function StopAttractions({ place, discoveries, onAdd, onRemove }) {
  const [open, setOpen] = useState(false);
  const list = attractionsFor(place.id);
  if (!list.length) return null;
  const addedMap = new Map(
    (discoveries || []).map((d) => [(d.placeName || '').toLocaleLowerCase('tr'), d])
  );
  return (
    <View style={styles.attrWrap}>
      <Pressable onPress={() => setOpen((o) => !o)} style={styles.attrToggle}>
        <Text style={styles.attrToggleText}>
          {t('route.attractions', { n: list.length })}
        </Text>
        <Text style={styles.attrChevron}>{open ? '▲' : '▼'}</Text>
      </Pressable>
      {open ? (
        <View style={styles.attrList}>
          {list.map((a) => {
            const existing = addedMap.get(a.name.toLocaleLowerCase('tr'));
            return (
              <View key={a.name} style={styles.attrItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.attrName}>{a.name}</Text>
                  <Text style={styles.attrDesc}>{a.desc}</Text>
                </View>
                {existing ? (
                  <Pressable
                    onPress={() => onRemove(existing)}
                    style={styles.attrRemoveBtn}
                    hitSlop={6}
                  >
                    <Text style={styles.attrAdded}>{t('route.added')}</Text>
                    <Text style={styles.attrRemoveHint}>↩︎ geri al</Text>
                  </Pressable>
                ) : (
                  <Pressable onPress={() => onAdd(a, place)} style={styles.attrAddBtn} hitSlop={6}>
                    <Text style={styles.attrAddText}>{t('route.addToDisc')}</Text>
                  </Pressable>
                )}
              </View>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

export default function RouteScreen({ route, navigation }) {
  const { tripId } = route.params;
  const { getTrip, updateTrip, removeStop, reorderStops, addDiscovery, removeDiscovery, settings } = useJournal();
  const trip = getTrip(tripId);
  const [pendingRemove, setPendingRemove] = useState(null);
  const [pendingUnadd, setPendingUnadd] = useState(null);
  const [roadKm, setRoadKm] = useState(null); // OSRM gerçek yol mesafeleri
  const [roadState, setRoadState] = useState('idle'); // idle | loading | ok | error
  const [pdfBusy, setPdfBusy] = useState(false);

  const makePdf = async () => {
    if (Platform.OS !== 'web') {
      Alert.alert(t('pdf.webOnly'), t('route.pdfWebOnlyMsg'));
      return;
    }
    setPdfBusy(true);
    try {
      const res = await exportRoutePdf(trip);
      if (res && !res.ok && res.reason === 'popup') {
        Alert.alert(t('pdf.popupBlocked'), t('pdf.popupBlockedMsg'));
      }
    } catch (e) {
      Alert.alert(t('pdf.failed'), t('common.unexpectedError'));
    } finally {
      setPdfBusy(false);
    }
  };

  const stopsKey = (trip?.stops || [])
    .map((s) => `${s.id}:${s.lat},${s.lng}`)
    .join('|');

  // Çevrimiçi gerçek yol mesafesini getir (duraklar/koordinatlar değişince).
  useEffect(() => {
    const roadStops = (trip?.stops || []).filter(hasCoords);
    if (!settings?.roadOnline || roadStops.length < 2) {
      setRoadKm(null);
      setRoadState('idle');
      return;
    }
    let cancelled = false;
    const controller = new AbortController();
    setRoadState('loading');
    fetchRoadKm(trip.stops, { signal: controller.signal })
      .then((map) => {
        if (cancelled) return;
        setRoadKm(map);
        setRoadState('ok');
      })
      .catch(() => {
        if (cancelled) return;
        setRoadKm(null);
        setRoadState('error');
      });
    return () => {
      cancelled = true;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopsKey, settings?.roadOnline]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate('AddStop', { tripId })} hitSlop={10}>
          <Text style={{ color: colors.primary, fontWeight: '800' }}>{t('route.addStopShort')}</Text>
        </Pressable>
      ),
    });
  }, [navigation, tripId]);

  if (!trip) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState icon="🧳" title={t('trip.notFound')} />
      </SafeAreaView>
    );
  }

  const stops = trip.stops || [];
  const result = computeRoute(stops, trip.vehicle, roadKm);
  const vehicle = getVehicle(trip.vehicle);
  const usingRoad = result.roadLegs > 0;

  const move = (index, dir) => {
    const next = [...stops];
    const j = index + dir;
    if (j < 0 || j >= next.length) return;
    [next[index], next[j]] = [next[j], next[index]];
    reorderStops(tripId, next);
  };

  const addAttraction = (attraction, place) => {
    addDiscovery(tripId, attractionToDiscovery(attraction, place, todayKey()));
  };

  // Keşfe eklemeyi geri al. Not/fotoğraf varsa önce onay iste; boş kaydı doğrudan sil.
  const removeAttraction = (disc) => {
    if (disc.userNotes || hasPhoto(disc)) {
      setPendingUnadd(disc);
    } else {
      removeDiscovery(tripId, disc.id);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.label}>{t('route.vehicle')}</Text>
        <View style={{ paddingHorizontal: 16 }}>
          <ChipPicker
            options={VEHICLES.map((v) => ({ value: v.id, ...v }))}
            value={trip.vehicle}
            onChange={(id) => updateTrip(tripId, { vehicle: id })}
            renderLabel={(o) => `${o.icon} ${o.label}`}
          />
        </View>

        {result.hasAny ? (
          <View style={styles.totals}>
            <View style={styles.totalItem}>
              <Text style={styles.totalNum}>{formatKm(result.totalKm)}</Text>
              <Text style={styles.totalLabel}>Toplam mesafe</Text>
            </View>
            <View style={styles.totalItem}>
              <Text style={styles.totalNum}>{formatDuration(result.totalHours)}</Text>
              <Text style={styles.totalLabel}>{t('route.estDuration')}</Text>
            </View>
            <View style={styles.totalItem}>
              <Text style={styles.totalNum}>{stops.length}</Text>
              <Text style={styles.totalLabel}>Durak</Text>
            </View>
          </View>
        ) : null}

        <RouteMap stops={stops} />

        {stops.length ? (
          <Pressable style={[styles.pdfBtn, pdfBusy && { opacity: 0.7 }]} onPress={makePdf} disabled={pdfBusy}>
            {pdfBusy ? (
              <ActivityIndicator color={colors.onPrimary} />
            ) : (
              <Text style={styles.pdfText}>{t('route.pdfBtn')}</Text>
            )}
          </Pressable>
        ) : null}

        {result.hasAny ? (
          <Text style={styles.sourceBadge}>
            {usingRoad
              ? t('route.modeReal')
              : roadState === 'loading'
              ? t('route.fetchingRoad')
              : settings?.roadOnline
              ? t('route.modeEstOnline')
              : t('route.modeEstOffline')}
          </Text>
        ) : null}

        {stops.length === 0 ? (
          <EmptyState
            icon="🗺️"
            title="Durak yok"
            subtitle={t('route.empty')}
          />
        ) : (
          <View style={styles.timeline}>
            {stops.map((stop, i) => {
              const leg = result.legs[i]; // bu duraktan sonrakine
              const place = matchPlace(stop.name); // bilinen şehir → gezilecek yerler
              return (
                <View key={stop.id}>
                  <View style={styles.stopRow}>
                    <View style={styles.stopIndex}>
                      <Text style={styles.stopIndexText}>{i + 1}</Text>
                    </View>
                    <Pressable
                      style={{ flex: 1 }}
                      onPress={() => navigation.navigate('AddStop', { tripId, stopId: stop.id })}
                    >
                      <View style={styles.stopNameRow}>
                        <Text style={styles.stopName}>{stop.name}</Text>
                        {stop.date ? <Text style={styles.stopDate}>📅 {formatShortDate(stop.date)}</Text> : null}
                      </View>
                      <Text style={styles.stopMeta}>
                        {hasCoords(stop)
                          ? `${stop.lat.toFixed(3)}, ${stop.lng.toFixed(3)}`
                          : t('route.noCoords')}
                      </Text>
                      {stop.accommodation ? (
                        <Text style={styles.stopExtra}>
                          🏨 {stop.accommodation}
                          {stop.nights ? ` · ${stop.nights} gece` : ''}
                        </Text>
                      ) : stop.nights ? (
                        <Text style={styles.stopExtra}>{t('route.nightsN', { n: stop.nights })}</Text>
                      ) : null}
                      {stop.note ? <Text style={styles.stopNote}>📝 {stop.note}</Text> : null}
                      <Text style={styles.editHint}>{t('route.tapToEdit')}</Text>
                    </Pressable>
                    <View style={styles.stopActions}>
                      <Pressable onPress={() => move(i, -1)} hitSlop={6} disabled={i === 0}>
                        <Text style={[styles.moveBtn, i === 0 && styles.moveDisabled]}>▲</Text>
                      </Pressable>
                      <Pressable onPress={() => move(i, 1)} hitSlop={6} disabled={i === stops.length - 1}>
                        <Text style={[styles.moveBtn, i === stops.length - 1 && styles.moveDisabled]}>▼</Text>
                      </Pressable>
                      <Pressable onPress={() => setPendingRemove(stop)} hitSlop={6}>
                        <Text style={styles.removeBtn}>✕</Text>
                      </Pressable>
                    </View>
                  </View>

                  {place ? (
                    <View style={styles.stopInfo}>
                      <PlacePhoto place={place} height={150} />
                      {place.summary ? <Text style={styles.stopSummary}>{place.summary}</Text> : null}
                    </View>
                  ) : null}

                  {place ? (
                    <StopAttractions
                      place={place}
                      discoveries={trip.discoveries}
                      onAdd={addAttraction}
                      onRemove={removeAttraction}
                    />
                  ) : null}

                  {i < stops.length - 1 ? (
                    <View style={styles.legRow}>
                      <View style={styles.legLine} />
                      <Text style={styles.legText}>
                        {vehicle.icon}{' '}
                        {leg && leg.km != null
                          ? `${formatKm(leg.km)} · ${formatDuration(leg.hours)}`
                          : t('route.needBothCoords')}
                      </Text>
                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>
        )}

        <Pressable style={styles.addStopBtn} onPress={() => navigation.navigate('AddStop', { tripId })}>
          <Text style={styles.addStopText}>{t('route.addStopBtn')}</Text>
        </Pressable>

        {result.unknownLegs > 0 && result.hasAny ? (
          <Text style={styles.warn}>
            Not: {result.unknownLegs} bacak koordinat eksikliğinden toplama dahil edilmedi.
          </Text>
        ) : null}
      </ScrollView>

      <ConfirmModal
        visible={!!pendingRemove}
        title={t('route.deleteStop')}
        message={pendingRemove?.name}
        confirmLabel={t('common.delete')}
        destructive
        onConfirm={() => {
          removeStop(tripId, pendingRemove.id);
          setPendingRemove(null);
        }}
        onCancel={() => setPendingRemove(null)}
      />

      <ConfirmModal
        visible={!!pendingUnadd}
        title={t('route.undoAdd')}
        message={pendingUnadd ? t('route.undoAddMsg', { name: pendingUnadd.placeName }) : ''}
        confirmLabel={t('route.undoBtn')}
        destructive
        onConfirm={() => {
          removeDiscovery(tripId, pendingUnadd.id);
          setPendingUnadd(null);
        }}
        onCancel={() => setPendingUnadd(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  label: { color: colors.textMuted, fontSize: 12, marginHorizontal: 16, marginTop: 16, marginBottom: 8 },
  totals: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  totalItem: { flex: 1, alignItems: 'center' },
  totalNum: { color: colors.primary, fontSize: 18, fontWeight: '800' },
  totalLabel: { color: colors.textMuted, fontSize: 11, marginTop: 4 },
  mapWrap: { alignItems: 'center', marginTop: 16, marginHorizontal: 16 },
  mapHint: { color: colors.textMuted, fontSize: 11, marginTop: 6, textAlign: 'center' },
  pdfBtn: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  pdfText: { color: colors.onPrimary, fontWeight: '800', fontSize: 15 },
  stopInfo: { marginHorizontal: 16, marginTop: 8 },
  stopSummary: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginTop: 2 },
  timeline: { marginTop: 16 },
  stopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  stopIndex: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopIndexText: { color: colors.onPrimary, fontWeight: '800' },
  sourceBadge: {
    color: colors.textMuted,
    fontSize: 11,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 2,
    lineHeight: 15,
  },
  stopNameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  stopName: { color: colors.text, fontSize: 15, fontWeight: '700', flexShrink: 1 },
  stopDate: { color: colors.accent, fontSize: 12, fontWeight: '700' },
  stopMeta: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  stopExtra: { color: colors.accent, fontSize: 12, marginTop: 4 },
  stopNote: { color: colors.textMuted, fontSize: 12, marginTop: 3, fontStyle: 'italic' },
  editHint: { color: colors.primary, fontSize: 11, marginTop: 5, fontWeight: '600' },
  stopActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  moveBtn: { color: colors.textMuted, fontSize: 14 },
  moveDisabled: { opacity: 0.3 },
  removeBtn: { color: colors.danger, fontSize: 16, fontWeight: '700' },
  attrWrap: { marginHorizontal: 16, marginTop: 4 },
  attrToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
  },
  attrToggleText: { color: colors.accent, fontSize: 13, fontWeight: '700' },
  attrChevron: { color: colors.accent, fontSize: 11 },
  attrList: { marginTop: 6, gap: 6 },
  attrItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  attrName: { color: colors.text, fontSize: 14, fontWeight: '600' },
  attrDesc: { color: colors.textMuted, fontSize: 12, marginTop: 2, lineHeight: 16 },
  attrAddBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  attrAddText: { color: colors.primary, fontSize: 12, fontWeight: '800' },
  attrRemoveBtn: { alignItems: 'flex-end', paddingHorizontal: 4, paddingVertical: 2 },
  attrAdded: { color: colors.success, fontSize: 12, fontWeight: '700' },
  attrRemoveHint: { color: colors.danger, fontSize: 11, fontWeight: '700', marginTop: 2 },
  legRow: { flexDirection: 'row', alignItems: 'center', paddingLeft: 30, paddingVertical: 6 },
  legLine: { width: 2, height: 22, backgroundColor: colors.border, marginRight: 12, marginLeft: 12 },
  legText: { color: colors.textMuted, fontSize: 12 },
  addStopBtn: {
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  addStopText: { color: colors.primary, fontWeight: '800', fontSize: 15 },
  warn: { color: colors.textMuted, fontSize: 12, marginHorizontal: 16, marginTop: 14, lineHeight: 17 },
});
