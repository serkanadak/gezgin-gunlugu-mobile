import React, { useState } from 'react';
import { t } from '../i18n';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '../state/JournalContext';
import {
  CHECK_STATUS,
  CHECK_STATUS_META,
  STATUS_CYCLE,
  nextStatus,
  checklistProgress,
  checklistNeedsUpdate,
  mergeChecklistWithDefaults,
  itemTitle,
} from '../data/checklist';
import { CHECK_COLORS, colors } from '../theme';
import { ProgressBar, ConfirmModal, EmptyState } from '../components/common';

function StatusButton({ status, onPress }) {
  const meta = CHECK_STATUS_META[status];
  const color = CHECK_COLORS[status];
  return (
    <Pressable onPress={onPress} style={[styles.statusBtn, { borderColor: color, backgroundColor: color + '22' }]}>
      <Text style={styles.statusIcon}>{meta.icon}</Text>
      <Text style={[styles.statusLabel, { color }]}>{meta.label}</Text>
    </Pressable>
  );
}

function ChecklistRow({ item, onCycle, onSetStatus, onSetNote, onRemove }) {
  const [expanded, setExpanded] = useState(false);
  const [note, setNote] = useState(item.note || '');
  const meta = CHECK_STATUS_META[item.status];
  const color = CHECK_COLORS[item.status];
  const done = item.status === CHECK_STATUS.DONE;

  const saveNote = () => {
    const trimmed = note.trim();
    if ((item.note || '') !== trimmed) onSetNote(trimmed);
  };

  return (
    <View style={styles.row}>
      <Pressable onPress={onCycle} onLongPress={() => setExpanded((e) => !e)} style={styles.rowMain}>
        <Text style={styles.rowIcon}>{item.icon}</Text>
        <View style={{ flex: 1 }}>
          <Text style={[styles.rowTitle, done && styles.rowTitleDone]}>{itemTitle(item)}</Text>
          {!expanded && item.note ? (
            <Text style={styles.notePreview} numberOfLines={1}>
              📝 {item.note}
            </Text>
          ) : null}
        </View>
        <View style={[styles.rowStatusPill, { borderColor: color, backgroundColor: color + '22' }]}>
          <Text style={[styles.rowStatusText, { color }]}>
            {meta.icon} {meta.label}
          </Text>
        </View>
      </Pressable>

      {expanded ? (
        <View style={styles.rowExpanded}>
          <View style={styles.statusChoices}>
            {STATUS_CYCLE.map((s) => (
              <StatusButton key={s} status={s} onPress={() => onSetStatus(s)} />
            ))}
          </View>

          <Text style={styles.noteLabel}>{t('check.note')}</Text>
          <TextInput
            style={styles.noteInput}
            value={note}
            onChangeText={setNote}
            onBlur={saveNote}
            placeholder={t('check.notePlaceholder')}
            placeholderTextColor={colors.textMuted}
            multiline
          />

          <View style={styles.expandedActions}>
            <Pressable
              onPress={() => {
                saveNote();
                setExpanded(false);
              }}
              style={styles.noteSaveBtn}
            >
              <Text style={styles.noteSaveText}>Notu kaydet</Text>
            </Pressable>
            {item.custom ? (
              <Pressable onPress={onRemove} style={styles.removeBtn}>
                <Text style={styles.removeText}>Maddeyi sil</Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      ) : null}
    </View>
  );
}

export default function ChecklistScreen({ route }) {
  const { tripId } = route.params;
  const { getTrip, setCheckStatus, setCheckNote, setChecklist, addCheckItem, removeCheckItem } = useJournal();
  const trip = getTrip(tripId);
  const [newTitle, setNewTitle] = useState('');
  const [pendingRemove, setPendingRemove] = useState(null);

  if (!trip) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState icon="🧳" title="Seyahat bulunamadı" />
      </SafeAreaView>
    );
  }

  const prog = checklistProgress(trip.checklist || []);
  const needsUpdate = checklistNeedsUpdate(trip.checklist || [], trip.vehicle);

  const addItem = () => {
    if (!newTitle.trim()) return;
    addCheckItem(tripId, newTitle);
    setNewTitle('');
  };

  const updateList = () => {
    setChecklist(tripId, mergeChecklistWithDefaults(trip.checklist || [], trip.vehicle));
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTitle}>{t('check.progress')}</Text>
            <Text style={styles.summaryPct}>{t('common.pct', { n: Math.round(prog.ratio * 100) })}</Text>
          </View>
          <ProgressBar ratio={prog.ratio} color={colors.primary} />
          <Text style={styles.hint}>{t('check.hint')}{' '}{t('check.hintLong')}</Text>
        </View>

        {needsUpdate ? (
          <Pressable style={styles.updateBox} onPress={updateList}>
            <Text style={styles.updateTitle}>{t('check.update')}</Text>
            <Text style={styles.updateText}>{t('check.outdated')}</Text>
            <Text style={styles.updateCta}>{t('check.updateLink')}</Text>
          </Pressable>
        ) : null}

        {trip.checklist.map((item) => (
          <ChecklistRow
            key={item.id}
            item={item}
            onCycle={() => setCheckStatus(tripId, item.id, nextStatus(item.status))}
            onSetStatus={(s) => setCheckStatus(tripId, item.id, s)}
            onSetNote={(v) => setCheckNote(tripId, item.id, v)}
            onRemove={() => setPendingRemove(item)}
          />
        ))}

        {/* Elle madde ekleme */}
        <View style={styles.addBox}>
          <Text style={styles.addLabel}>{t('check.addOwn')}</Text>
          <View style={styles.addRow}>
            <TextInput
              style={styles.addInput}
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder={t('check.newItem')}
              placeholderTextColor={colors.textMuted}
              onSubmitEditing={addItem}
              returnKeyType="done"
            />
            <Pressable style={[styles.addBtn, !newTitle.trim() && { opacity: 0.5 }]} onPress={addItem}>
              <Text style={styles.addBtnText}>Ekle</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <ConfirmModal
        visible={!!pendingRemove}
        title="Maddeyi sil?"
        message={pendingRemove ? itemTitle(pendingRemove) : ''}
        confirmLabel="Sil"
        destructive
        onConfirm={() => {
          removeCheckItem(tripId, pendingRemove.id);
          setPendingRemove(null);
        }}
        onCancel={() => setPendingRemove(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  summary: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 8,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  summaryTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  summaryPct: { color: colors.primary, fontSize: 15, fontWeight: '800' },
  hint: { color: colors.textMuted, fontSize: 12, marginTop: 12, lineHeight: 18 },
  bold: { color: colors.text, fontWeight: '700' },
  updateBox: {
    backgroundColor: colors.accent + '18',
    borderColor: colors.accent,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  updateTitle: { color: colors.accent, fontSize: 14, fontWeight: '800' },
  updateText: { color: colors.textMuted, fontSize: 12, lineHeight: 18, marginTop: 6 },
  updateCta: { color: colors.accent, fontSize: 13, fontWeight: '700', marginTop: 8 },
  row: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  rowMain: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 10 },
  rowIcon: { fontSize: 18 },
  rowTitle: { color: colors.text, fontSize: 14, fontWeight: '600' },
  rowTitleDone: { textDecorationLine: 'line-through', color: colors.textMuted },
  notePreview: { color: colors.accent, fontSize: 12, marginTop: 3 },
  rowStatusPill: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 },
  rowStatusText: { fontSize: 11, fontWeight: '700' },
  rowExpanded: { paddingHorizontal: 14, paddingBottom: 14, borderTopWidth: 1, borderTopColor: colors.border },
  statusChoices: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  noteLabel: { color: colors.textMuted, fontSize: 12, marginTop: 14, marginBottom: 6 },
  noteInput: {
    backgroundColor: colors.surfaceAlt,
    color: colors.text,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  expandedActions: { flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 12 },
  noteSaveBtn: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  noteSaveText: { color: colors.onPrimary, fontWeight: '800', fontSize: 13 },
  statusBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  statusIcon: { fontSize: 14 },
  statusLabel: { fontSize: 12, fontWeight: '700' },
  removeBtn: { alignSelf: 'center' },
  removeText: { color: colors.danger, fontSize: 13, fontWeight: '700' },
  addBox: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addLabel: { color: colors.textMuted, fontSize: 12, marginBottom: 8 },
  addRow: { flexDirection: 'row', gap: 8 },
  addInput: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
    color: colors.text,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  addBtn: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  addBtnText: { color: colors.onPrimary, fontWeight: '800' },
});
