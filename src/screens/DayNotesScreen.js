import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '../state/JournalContext';
import { todayKey, isValidDateKey, formatLongDate } from '../logic/date';
import { colors } from '../theme';
import { t } from '../i18n';
import { Field, PrimaryButton, ConfirmModal, EmptyState, Card } from '../components/common';

function emptyForm() {
  return { date: todayKey(), title: '', text: '' };
}

export default function DayNotesScreen({ route, navigation }) {
  const { tripId } = route.params;
  const { getTrip, addDayNote, updateDayNote, removeDayNote } = useJournal();
  const trip = getTrip(tripId);

  const [form, setForm] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({ title: t('day.title') });
  }, [navigation]);

  if (!trip) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState icon="📔" title={t('trip.notFound')} />
      </SafeAreaView>
    );
  }

  // En yeni gün üstte.
  const notes = [...(trip.dayNotes || [])].sort((a, b) => ((a.date || '') < (b.date || '') ? 1 : -1));

  const openAdd = () => {
    setForm(emptyForm());
    setEditingId(null);
  };
  const openEdit = (n) => {
    setForm({ date: n.date || todayKey(), title: n.title || '', text: n.text || '' });
    setEditingId(n.id);
  };
  const closeForm = () => {
    setForm(null);
    setEditingId(null);
  };
  const patch = (p) => setForm((f) => ({ ...f, ...p }));

  const dateOk = !!form && isValidDateKey(form.date);
  // Aynı güne ikinci bir not eklenmesin (düzenlenen kaydın kendisi hariç).
  const clash =
    !!form && notes.some((n) => n.date === form.date && n.id !== editingId);
  const canSave = !!form && form.text.trim().length > 0 && dateOk && !clash;

  const save = () => {
    if (!canSave) return;
    const payload = { date: form.date.trim(), title: form.title.trim(), text: form.text.trim() };
    if (editingId) updateDayNote(tripId, editingId, payload);
    else addDayNote(tripId, payload);
    closeForm();
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        {!form ? (
          <PrimaryButton title={t('day.add')} onPress={openAdd} style={{ marginTop: 14 }} />
        ) : null}

        {form ? (
          <Card style={{ marginTop: 14 }}>
            <Text style={styles.formTitle}>{editingId ? t('day.editTitle') : t('day.newTitle')}</Text>
            <Field
              label={t('disc.dateField')}
              value={form.date}
              onChangeText={(v) => patch({ date: v })}
              autoCapitalize="none"
              placeholder={todayKey()}
            />
            {!dateOk ? <Text style={styles.err}>{t('common.invalidDate')}</Text> : null}
            {clash ? <Text style={styles.err}>{t('day.exists')}</Text> : null}
            <Field
              label={t('day.titleField')}
              value={form.title}
              onChangeText={(v) => patch({ title: v })}
              placeholder={t('day.titlePlaceholder')}
            />
            <Field
              label={t('day.text')}
              value={form.text}
              onChangeText={(v) => patch({ text: v })}
              placeholder={t('day.textPlaceholder')}
              multiline
            />
            <View style={styles.actions}>
              <PrimaryButton
                title={t('common.save')}
                onPress={save}
                disabled={!canSave}
                style={{ flex: 1, marginHorizontal: 0 }}
              />
              <Pressable onPress={closeForm} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>{t('common.cancel')}</Text>
              </Pressable>
            </View>
          </Card>
        ) : null}

        {notes.length ? (
          notes.map((n) => (
            <Pressable key={n.id} style={styles.note} onPress={() => openEdit(n)}>
              <View style={styles.noteHead}>
                <Text style={styles.noteDate}>📅 {formatLongDate(n.date)}</Text>
                <Pressable onPress={() => setConfirmDeleteId(n.id)} hitSlop={8}>
                  <Text style={styles.del}>{t('common.delete')}</Text>
                </Pressable>
              </View>
              {n.title ? <Text style={styles.noteTitle}>{n.title}</Text> : null}
              <Text style={styles.noteText}>{n.text}</Text>
            </Pressable>
          ))
        ) : !form ? (
          <EmptyState icon="📔" title={t('day.empty')} subtitle={t('day.emptySub')} />
        ) : null}
      </ScrollView>

      <ConfirmModal
        visible={!!confirmDeleteId}
        title={t('day.deleteConfirm')}
        confirmLabel={t('common.delete')}
        destructive
        onConfirm={() => {
          removeDayNote(tripId, confirmDeleteId);
          setConfirmDeleteId(null);
        }}
        onCancel={() => setConfirmDeleteId(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  formTitle: { color: colors.text, fontSize: 16, fontWeight: '800' },
  err: { color: colors.danger, fontSize: 11, marginTop: 4 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 16 },
  cancelBtn: { paddingHorizontal: 14, paddingVertical: 12 },
  cancelText: { color: colors.textMuted, fontSize: 14, fontWeight: '700' },
  note: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  noteHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  noteDate: { color: colors.primary, fontSize: 13, fontWeight: '800' },
  del: { color: colors.danger, fontSize: 12, fontWeight: '700' },
  noteTitle: { color: colors.text, fontSize: 16, fontWeight: '800', marginTop: 8 },
  noteText: { color: colors.text, fontSize: 15, lineHeight: 22, marginTop: 8 },
});
