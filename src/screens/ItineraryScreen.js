import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '../state/JournalContext';
import { generateItinerary, groupByDay, newItem, isValidTime, ITEM_KIND } from '../logic/itinerary';
import { attractionsFor, attractionToDiscovery } from '../data/attractions';
import { matchPlace } from '../data/places';
import { formatLongDate, todayKey } from '../logic/date';
import { colors } from '../theme';
import { t } from '../i18n';
import { Field, PrimaryButton, SecondaryButton, ConfirmModal, EmptyState, Card } from '../components/common';

const KIND_ICON = {
  [ITEM_KIND.TRAVEL]: '🚗',
  [ITEM_KIND.VISIT]: '📍',
  [ITEM_KIND.MEAL]: '🍽️',
  [ITEM_KIND.FREE]: '⭐',
};

export default function ItineraryScreen({ route, navigation }) {
  const { tripId } = route.params;
  const {
    getTrip,
    setPlan,
    addPlanItem,
    updatePlanItem,
    removePlanItem,
    addDiscovery,
  } = useJournal();
  const trip = getTrip(tripId);

  const [form, setForm] = useState(null); // düzenlenen/eklenen madde
  const [confirmRegen, setConfirmRegen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({ title: t('plan.title') });
  }, [navigation]);

  if (!trip) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState icon="🗓️" title={t('trip.notFound')} />
      </SafeAreaView>
    );
  }

  const plan = trip.plan || [];
  const days = groupByDay(plan);
  const stops = trip.stops || [];
  const stopName = (id) => {
    const i = stops.findIndex((s) => s.id === id);
    return i >= 0 ? `${i + 1}. ${stops[i].name}` : null;
  };

  const build = () => setPlan(tripId, generateItinerary(trip));

  // --- İLİŞKİ: bir maddeye dokununca ne olacak? ---
  // Keşfe bağlıysa keşif detayına git (fotoğraf, not, özet — keşifte yapılan her şey).
  // Henüz keşif değilse (arşiv önerisi) önce keşfe ekle, sonra detayını aç.
  // Yolculuk/durak maddesinde güzergah durağını düzenlemeye git.
  const openItem = (item) => {
    if (item.discoveryId && (trip.discoveries || []).some((d) => d.id === item.discoveryId)) {
      navigation.navigate('DiscoveryDetail', { tripId, discoveryId: item.discoveryId });
      return;
    }
    if (item.kind === ITEM_KIND.VISIT && item.title) {
      const stop = stops.find((s) => s.id === item.stopId);
      const place = stop ? matchPlace(stop.name) : null;
      const attraction = item.attractionId && place
        ? attractionsFor(place.id).find((a) => a.id === item.attractionId)
        : null;
      const disc = attraction
        ? { ...attractionToDiscovery(attraction, place, item.date || todayKey()), stopId: item.stopId }
        : {
            placeName: item.title,
            date: item.date || todayKey(),
            city: place?.city || stop?.name || '',
            country: place?.country || '',
            summary: '',
            sources: [],
            stopId: item.stopId,
          };
      const id = addDiscovery(tripId, disc);
      // Program maddesini yeni keşfe bağla ki bir daha kopya oluşmasın.
      if (id) updatePlanItem(tripId, item.id, { discoveryId: id, attractionId: null });
      if (id) navigation.navigate('DiscoveryDetail', { tripId, discoveryId: id });
      return;
    }
    if (item.stopId) navigation.navigate('AddStop', { tripId, stopId: item.stopId });
  };

  const linkLabel = (item) => {
    if (item.discoveryId && (trip.discoveries || []).some((d) => d.id === item.discoveryId)) {
      return t('plan.openDiscovery');
    }
    if (item.kind === ITEM_KIND.VISIT && item.title) return t('plan.addToDiscovery');
    if (item.stopId) return t('plan.openStop');
    return null;
  };

  // --- form ---
  const openNew = (date) => setForm({ ...newItem(date), _new: true });
  const openEdit = (it) => setForm({ ...it, _new: false });
  const patch = (p) => setForm((f) => ({ ...f, ...p }));
  const timeOk = !!form && isValidTime(form.time);
  const canSave = !!form && timeOk && (form.title.trim().length > 0 || form.kind === ITEM_KIND.MEAL);
  const save = () => {
    if (!canSave) return;
    const payload = {
      date: form.date,
      time: form.time.trim(),
      title: form.title.trim(),
      note: (form.note || '').trim(),
      durationMin: Number(form.durationMin) || 60,
      kind: form.kind,
      stopId: form.stopId || null,
      discoveryId: form.discoveryId || null,
      attractionId: form.attractionId || null,
    };
    if (form._new) addPlanItem(tripId, { ...newItem(form.date), ...payload });
    else updatePlanItem(tripId, form.id, payload);
    setForm(null);
  };

  if (!plan.length && !form) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <EmptyState icon="🗓️" title={t('plan.empty')} subtitle={t('plan.emptySub')} />
          {stops.length ? (
            <PrimaryButton title={t('plan.generate')} onPress={build} style={{ marginTop: 8 }} />
          ) : (
            <Text style={styles.needStops}>{t('plan.needStops')}</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <Text style={styles.hint}>{t('plan.linkedHint')}</Text>

        {form ? (
          <Card>
            <Text style={styles.formTitle}>{form._new ? t('plan.newItem') : t('plan.editItem')}</Text>
            <Field label={t('plan.time')} value={form.time} onChangeText={(v) => patch({ time: v })} placeholder="09:00" />
            {!timeOk ? <Text style={styles.err}>{t('plan.invalidTime')}</Text> : null}
            <Field
              label={t('plan.itemTitle')}
              value={form.title}
              onChangeText={(v) => patch({ title: v })}
              placeholder={t('plan.itemPlaceholder')}
            />
            <Field
              label={t('plan.duration')}
              value={String(form.durationMin ?? '')}
              onChangeText={(v) => patch({ durationMin: v.replace(/[^0-9]/g, '') })}
              keyboardType="number-pad"
            />
            <Field label={t('plan.itemNote')} value={form.note || ''} onChangeText={(v) => patch({ note: v })} multiline />
            <View style={styles.formActions}>
              <PrimaryButton title={t('common.save')} onPress={save} disabled={!canSave} style={{ flex: 1, marginHorizontal: 0 }} />
              <Pressable onPress={() => setForm(null)} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>{t('common.cancel')}</Text>
              </Pressable>
            </View>
          </Card>
        ) : null}

        {days.map((day) => (
          <View key={day.date} style={styles.day}>
            <Text style={styles.dayHead}>📅 {formatLongDate(day.date)}</Text>
            {day.items.map((it) => {
              const link = linkLabel(it);
              return (
                <View key={it.id} style={styles.item}>
                  <Pressable style={styles.timeBox} onPress={() => openEdit(it)}>
                    <Text style={styles.time}>{it.time}</Text>
                    {it.durationMin ? <Text style={styles.dur}>{it.durationMin}′</Text> : null}
                  </Pressable>
                  <View style={{ flex: 1 }}>
                    <Pressable onPress={() => (link ? openItem(it) : openEdit(it))}>
                      <Text style={styles.itemTitle}>
                        {KIND_ICON[it.kind] || '•'} {it.title || t('plan.kind.' + it.kind)}
                      </Text>
                      {it.stopId && stopName(it.stopId) ? (
                        <Text style={styles.itemStop}>🗺️ {stopName(it.stopId)}</Text>
                      ) : null}
                      {it.note ? <Text style={styles.itemNote}>{it.note}</Text> : null}
                      {link ? <Text style={styles.link}>{link}</Text> : null}
                    </Pressable>
                  </View>
                  <View style={styles.itemActions}>
                    <Pressable onPress={() => openEdit(it)} hitSlop={8}>
                      <Text style={styles.edit}>✏️</Text>
                    </Pressable>
                    <Pressable onPress={() => setConfirmDeleteId(it.id)} hitSlop={8}>
                      <Text style={styles.del}>✕</Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}
            <Pressable style={styles.addRow} onPress={() => openNew(day.date)}>
              <Text style={styles.addText}>{t('plan.addItem')}</Text>
            </Pressable>
          </View>
        ))}

        <SecondaryButton title={t('plan.regenerate')} onPress={() => setConfirmRegen(true)} style={{ marginTop: 16 }} />
      </ScrollView>

      <ConfirmModal
        visible={confirmRegen}
        title={t('plan.regenConfirm')}
        message={t('plan.regenConfirmMsg')}
        confirmLabel={t('plan.regenerate')}
        destructive
        onConfirm={() => {
          build();
          setConfirmRegen(false);
        }}
        onCancel={() => setConfirmRegen(false)}
      />
      <ConfirmModal
        visible={!!confirmDeleteId}
        title={t('plan.deleteConfirm')}
        confirmLabel={t('common.delete')}
        destructive
        onConfirm={() => {
          removePlanItem(tripId, confirmDeleteId);
          setConfirmDeleteId(null);
        }}
        onCancel={() => setConfirmDeleteId(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  hint: { color: colors.textMuted, fontSize: 12, marginHorizontal: 16, marginTop: 14, lineHeight: 17 },
  needStops: { color: colors.textMuted, fontSize: 13, textAlign: 'center', marginHorizontal: 32, marginTop: 12 },
  formTitle: { color: colors.text, fontSize: 16, fontWeight: '800' },
  err: { color: colors.danger, fontSize: 11, marginTop: 4 },
  formActions: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 16 },
  cancelBtn: { paddingHorizontal: 14, paddingVertical: 12 },
  cancelText: { color: colors.textMuted, fontSize: 14, fontWeight: '700' },
  day: { marginTop: 18 },
  dayHead: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
    marginHorizontal: 16,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  timeBox: { alignItems: 'center', minWidth: 52 },
  time: { color: colors.primary, fontSize: 15, fontWeight: '800' },
  dur: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  itemTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  itemStop: { color: colors.textMuted, fontSize: 11, marginTop: 3 },
  itemNote: { color: colors.textMuted, fontSize: 12, marginTop: 4, lineHeight: 17 },
  link: { color: colors.primary, fontSize: 12, fontWeight: '700', marginTop: 6 },
  itemActions: { alignItems: 'center', gap: 12 },
  edit: { fontSize: 14 },
  del: { color: colors.danger, fontSize: 15, fontWeight: '800' },
  addRow: { marginHorizontal: 16, paddingVertical: 8 },
  addText: { color: colors.primary, fontSize: 13, fontWeight: '700' },
});
