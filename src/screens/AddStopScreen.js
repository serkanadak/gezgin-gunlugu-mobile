import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '../state/JournalContext';
import { matchPlace } from '../data/places';
import { isValidDateKey } from '../logic/date';
import { colors } from '../theme';
import { t } from '../i18n';
import { Card, Field, PrimaryButton, SectionHeader } from '../components/common';

export default function AddStopScreen({ route, navigation }) {
  const { tripId, stopId } = route.params;
  const { addStop, updateStop, getTrip } = useJournal();

  const existing = stopId ? getTrip(tripId)?.stops?.find((s) => s.id === stopId) : null;
  const isEdit = !!existing;

  const [name, setName] = useState(existing?.name || '');
  const [lat, setLat] = useState(existing?.lat != null ? String(existing.lat) : '');
  const [lng, setLng] = useState(existing?.lng != null ? String(existing.lng) : '');
  const [date, setDate] = useState(existing?.date || '');
  const [accommodation, setAccommodation] = useState(existing?.accommodation || '');
  const [nights, setNights] = useState(existing?.nights != null ? String(existing.nights) : '');
  const [note, setNote] = useState(existing?.note || '');

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEdit ? t('stop.editTitle') : t('stop.addTitle') });
  }, [navigation, isEdit]);

  // Girilen isim bilinen bir yerse koordinat önerisi sun.
  const suggestion = name.trim().length >= 3 ? matchPlace(name) : null;
  const showSuggestion = suggestion && (!lat || !lng);

  const applySuggestion = () => {
    if (!suggestion) return;
    if (!name.trim() || name.trim().length < suggestion.name.length) setName(suggestion.name);
    setLat(String(suggestion.lat));
    setLng(String(suggestion.lng));
  };

  const parsedLat = parseFloat(lat);
  const parsedLng = parseFloat(lng);
  const parsedNights = parseInt(nights, 10);
  const latOk = !lat || (!Number.isNaN(parsedLat) && parsedLat >= -90 && parsedLat <= 90);
  const lngOk = !lng || (!Number.isNaN(parsedLng) && parsedLng >= -180 && parsedLng <= 180);
  const nightsOk = !nights || (!Number.isNaN(parsedNights) && parsedNights >= 0 && parsedNights <= 365);
  const dateOk = !date || isValidDateKey(date);
  const canSave = name.trim().length > 0 && latOk && lngOk && nightsOk && dateOk;

  const save = () => {
    if (!canSave) return;
    const payload = {
      name: name.trim(),
      lat: lat ? parsedLat : null,
      lng: lng ? parsedLng : null,
      date: date.trim(),
      accommodation: accommodation.trim(),
      nights: nights ? parsedNights : null,
      note: note.trim(),
    };
    if (isEdit) updateStop(tripId, stopId, payload);
    else addStop(tripId, payload);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <SectionHeader
          title={isEdit ? t('stop.editTitle') : t('stop.addTitle')}
          subtitle={t('stop.sub')}
        />
        <Card>
          <Field label={t('stop.name')} value={name} onChangeText={setName} placeholder={t('stop.namePlaceholder')} />

          {showSuggestion ? (
            <Pressable style={styles.suggestion} onPress={applySuggestion}>
              <Text style={styles.suggestionText}>
                {t('stop.suggestion', { name: suggestion.name, city: suggestion.city })} (
                {suggestion.lat.toFixed(3)}, {suggestion.lng.toFixed(3)})
              </Text>
            </Pressable>
          ) : null}

          <View style={styles.coordRow}>
            <View style={{ flex: 1 }}>
              <Field
                label="Enlem (lat)"
                value={lat}
                onChangeText={setLat}
                placeholder="37.9410"
                keyboardType="numbers-and-punctuation"
                autoCapitalize="none"
              />
              {!latOk ? <Text style={styles.err}>{t('stop.latRange')}</Text> : null}
            </View>
            <View style={{ flex: 1 }}>
              <Field
                label="Boylam (lng)"
                value={lng}
                onChangeText={setLng}
                placeholder="27.3419"
                keyboardType="numbers-and-punctuation"
                autoCapitalize="none"
              />
              {!lngOk ? <Text style={styles.err}>{t('stop.lngRange')}</Text> : null}
            </View>
          </View>
        </Card>

        <SectionHeader title="Tarih, Konaklama & Notlar" />
        <Card>
          <Field
            label={t('stop.dateField')}
            value={date}
            onChangeText={setDate}
            placeholder={t('stop.datePlaceholder')}
            autoCapitalize="none"
          />
          {!dateOk ? <Text style={styles.err}>{t('common.invalidDate')}</Text> : null}
          <Field
            label={t('stop.stay')}
            value={accommodation}
            onChangeText={setAccommodation}
            placeholder={t('stop.stayPlaceholder')}
          />
          <Field
            label={t('stop.nights')}
            value={nights}
            onChangeText={setNights}
            placeholder={t('stop.nightsPlaceholder')}
            keyboardType="number-pad"
          />
          {!nightsOk ? <Text style={styles.err}>{t('stop.nightsRange')}</Text> : null}
          <Text style={styles.nightsHint}>{t('stop.nightsHint')}</Text>
          <Field
            label={t('stop.note')}
            value={note}
            onChangeText={setNote}
            placeholder={t('stop.notePlaceholder')}
            multiline
          />
          <Text style={styles.hint}>
          {t('stop.coordHint')}
          </Text>
        </Card>

        <PrimaryButton title={isEdit ? t('common.saveChanges') : t('stop.save')} onPress={save} disabled={!canSave} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  nightsHint: { color: colors.textMuted, fontSize: 11, marginTop: 6, lineHeight: 16 },
  container: { flex: 1, backgroundColor: colors.bg },
  suggestion: {
    marginTop: 12,
    backgroundColor: colors.accent + '22',
    borderColor: colors.accent,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  suggestionText: { color: colors.text, fontSize: 13, lineHeight: 18 },
  bold: { fontWeight: '800' },
  coordRow: { flexDirection: 'row', gap: 12 },
  err: { color: colors.danger, fontSize: 11, marginTop: 4 },
  hint: { color: colors.textMuted, fontSize: 12, marginTop: 12, lineHeight: 17 },
});
