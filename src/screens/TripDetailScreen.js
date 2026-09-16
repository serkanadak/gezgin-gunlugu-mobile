import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '../state/JournalContext';
import { getVehicle } from '../data/vehicles';
import { checklistProgress } from '../data/checklist';
import { computeRoute, formatKm, formatDuration } from '../logic/geo';
import { formatLongDate, formatShortDate, daysBetween } from '../logic/date';
import { colors } from '../theme';
import { t } from '../i18n';
import { Card, ProgressBar, Pill, ConfirmModal, EmptyState } from '../components/common';

function NavCard({ icon, title, subtitle, onPress, badge }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.navCard, pressed && { opacity: 0.85 }]}>
      <Text style={styles.navIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.navTitle}>{title}</Text>
        {subtitle ? <Text style={styles.navSub}>{subtitle}</Text> : null}
      </View>
      {badge != null ? <Pill label={String(badge)} color={colors.accent} /> : null}
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

export default function TripDetailScreen({ route, navigation }) {
  const { tripId } = route.params;
  const { getTrip, removeTrip, finishTrip, reopenTrip } = useJournal();
  const trip = getTrip(tripId);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmFinish, setConfirmFinish] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: trip?.title || t('nav.trip'),
      headerRight: () =>
        trip ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <Pressable onPress={() => navigation.navigate('NewTrip', { tripId })} hitSlop={10}>
              <Text style={{ color: colors.primary, fontWeight: '700' }}>{t('common.edit')}</Text>
            </Pressable>
            <Pressable onPress={() => setConfirmDelete(true)} hitSlop={10}>
              <Text style={{ color: colors.danger, fontWeight: '700' }}>{t('common.delete')}</Text>
            </Pressable>
          </View>
        ) : null,
    });
  }, [navigation, trip, tripId]);

  if (!trip) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState icon="🧳" title={t('trip.notFound')} subtitle={t('trip.notFoundSub')} />
      </SafeAreaView>
    );
  }

  const vehicle = getVehicle(trip.vehicle);
  const prog = checklistProgress(trip.checklist || []);
  const route2 = computeRoute(trip.stops || [], trip.vehicle);
  const span = daysBetween(trip.startDate, trip.endDate);
  const sortedDisc = [...(trip.discoveries || [])].sort((a, b) => ((a.date || '') < (b.date || '') ? -1 : 1));

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Özet başlık */}
        <Pressable
          style={({ pressed }) => [styles.hero, pressed && { opacity: 0.9 }]}
          onPress={() => navigation.navigate('NewTrip', { tripId })}
        >
          <View style={styles.heroTop}>
            <Text style={styles.heroVehicle}>
              {vehicle.icon} {vehicle.label}
            </Text>
            {trip.finished ? (
              <Pill label={t('trips.finished')} color={colors.success} filled />
            ) : (
              <Pill label={t('trips.active')} color={colors.accent} />
            )}
          </View>
          <Text style={styles.heroDates}>
            {trip.startDate ? formatLongDate(trip.startDate) : t('trips.noDate')}
            {trip.endDate ? `  →  ${formatShortDate(trip.endDate)}` : ''}
            {span ? `  ·  ${span} ${t('date.dayShort')}` : ''}
          </Text>
          {route2.hasAny ? (
            <Text style={styles.heroRoute}>
              🗺️ {formatKm(route2.totalKm)} · ⏱️ {formatDuration(route2.totalHours)}
            </Text>
          ) : null}
          <Text style={styles.heroEditHint}>{t('trip.editInfo')}</Text>
        </Pressable>

        {/* Hazırlık */}
        <Text style={styles.sectionLabel}>{t('trip.section.prep')}</Text>
        <Card>
          <View style={styles.progRow}>
            <Text style={styles.progTitle}>{t('trip.checklistCard')}</Text>
            <Text style={styles.progPct}>{t('common.pct', { n: Math.round(prog.ratio * 100) })}</Text>
          </View>
          <ProgressBar ratio={prog.ratio} color={colors.primary} />
          <Text style={styles.progMeta}>
            {t('trip.checklistMeta', { done: prog.done, partial: prog.partial, skip: prog.skip, todo: prog.todo })}
          </Text>
          <Pressable style={styles.linkBtn} onPress={() => navigation.navigate('Checklist', { tripId })}>
            <Text style={styles.linkText}>{t('trip.openList')}</Text>
          </Pressable>
        </Card>

        {/* Planlama */}
        <Text style={styles.sectionLabel}>{t('trip.section.plan')}</Text>
        <NavCard
          icon="🗺️"
          title={t('trip.routeCard')}
          subtitle={
            (trip.stops || []).length
              ? t('trip.routeCardSub', { n: trip.stops.length, dist: route2.hasAny ? formatKm(route2.totalKm) : t('trip.routeNeedCoords') })
              : t('trip.routeCardEmpty')
          }
          badge={(trip.stops || []).length || null}
          onPress={() => navigation.navigate('Route', { tripId })}
        />

        <NavCard
          icon="🗓️"
          title={t('plan.card')}
          subtitle={
            (trip.plan || []).length ? t('plan.cardSub', { n: trip.plan.length }) : t('plan.cardEmpty')
          }
          badge={(trip.plan || []).length || null}
          onPress={() => navigation.navigate('Itinerary', { tripId })}
        />

        {/* Günlük / Keşifler — detaylar keşif günlüğünün içinde */}
        <Text style={styles.sectionLabel}>{t('trip.section.journal')}</Text>
        <NavCard
          icon="🧭"
          title={t('trip.journalCard')}
          subtitle={
            sortedDisc.length
              ? t('trip.journalCardSub', { n: sortedDisc.length })
              : t('trip.journalCardEmpty')
          }
          badge={sortedDisc.length || null}
          onPress={() => navigation.navigate('DiscoveryHub', { tripId })}
        />

        <NavCard
          icon="📔"
          title={t('day.card')}
          subtitle={
            (trip.dayNotes || []).length
              ? t('day.cardSub', { n: trip.dayNotes.length })
              : t('day.cardEmpty')
          }
          badge={(trip.dayNotes || []).length || null}
          onPress={() => navigation.navigate('DayNotes', { tripId })}
        />

        {/* Harcamalar */}
        <Text style={styles.sectionLabel}>{t('trip.section.budget')}</Text>
        <NavCard
          icon="🧾"
          title={t('trip.expensesCard')}
          subtitle={
            (trip.expenses || []).length
              ? t('trip.expensesCardSub', { n: trip.expenses.length })
              : t('trip.expensesCardEmpty')
          }
          badge={(trip.expenses || []).length || null}
          onPress={() => navigation.navigate('Expenses', { tripId })}
        />

        {/* Çıktılar */}
        <Text style={styles.sectionLabel}>{t('trip.section.outputs')}</Text>
        <NavCard
          icon="📖"
          title={t('trip.albumCard')}
          subtitle={t('trip.albumCardSub')}
          onPress={() => navigation.navigate('Album', { tripId })}
        />
        <NavCard
          icon="🎬"
          title={t('trip.videoCard')}
          subtitle={t('trip.videoCardSub')}
          onPress={() => navigation.navigate('VideoScript', { tripId })}
        />

        <Pressable
          style={styles.finishBtn}
          onPress={() => (trip.finished ? reopenTrip(tripId) : setConfirmFinish(true))}
        >
          <Text style={styles.finishText}>
            {trip.finished ? t('trip.reopen') : t('trip.finish')}
          </Text>
        </Pressable>
      </ScrollView>

      <ConfirmModal
        visible={confirmFinish}
        title={t('trip.finishConfirm')}
        message={t('trip.finishConfirmMsg')}
        confirmLabel={t('trip.finishBtn')}
        onConfirm={() => {
          finishTrip(tripId);
          setConfirmFinish(false);
        }}
        onCancel={() => setConfirmFinish(false)}
      />
      <ConfirmModal
        visible={confirmDelete}
        title={t('trip.deleteConfirm')}
        message={t('trip.deleteConfirmMsg')}
        confirmLabel={t('common.delete')}
        destructive
        onConfirm={() => {
          setConfirmDelete(false);
          removeTrip(tripId);
          navigation.goBack();
        }}
        onCancel={() => setConfirmDelete(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  hero: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heroVehicle: { color: colors.primary, fontSize: 15, fontWeight: '800' },
  heroDates: { color: colors.text, fontSize: 14, marginTop: 10 },
  heroRoute: { color: colors.textMuted, fontSize: 13, marginTop: 6 },
  heroEditHint: { color: colors.primary, fontSize: 12, fontWeight: '700', marginTop: 12 },
  sectionLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginHorizontal: 16,
    marginTop: 22,
    marginBottom: 8,
  },
  progRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  progTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  progPct: { color: colors.primary, fontSize: 15, fontWeight: '800' },
  progMeta: { color: colors.textMuted, fontSize: 12, marginTop: 10 },
  linkBtn: { marginTop: 12, alignSelf: 'flex-start' },
  linkText: { color: colors.primary, fontWeight: '700', fontSize: 13 },
  navCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  navIcon: { fontSize: 22 },
  navTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  navSub: { color: colors.textMuted, fontSize: 12, marginTop: 3 },
  chevron: { color: colors.textMuted, fontSize: 22, fontWeight: '400' },
  discHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 16 },
  addLink: { color: colors.primary, fontWeight: '700', fontSize: 13, marginTop: 22, marginBottom: 8 },
  emptyDisc: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  discCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  discIcon: { fontSize: 20 },
  discTitle: { color: colors.text, fontSize: 15, fontWeight: '600' },
  discMeta: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  finishBtn: {
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  finishText: { color: colors.primary, fontWeight: '800', fontSize: 15 },
});
