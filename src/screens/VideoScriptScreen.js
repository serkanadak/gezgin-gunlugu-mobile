import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { useJournal } from '../state/JournalContext';
import { generateVideoScript, videoScriptToText, SCENE_TYPE } from '../logic/video';
import { colors } from '../theme';
import { t } from '../i18n';
import { EmptyState } from '../components/common';

const TYPE_COLOR = {
  [SCENE_TYPE.INTRO]: colors.primary,
  [SCENE_TYPE.TRANSITION]: colors.accent,
  [SCENE_TYPE.PLACE]: colors.text,
  [SCENE_TYPE.OUTRO]: colors.primary,
};
const TYPE_ICON = {
  [SCENE_TYPE.INTRO]: '🎬',
  [SCENE_TYPE.TRANSITION]: '🗺️',
  [SCENE_TYPE.PLACE]: '📍',
  [SCENE_TYPE.OUTRO]: '🏁',
};

function ts(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function VideoScriptScreen({ route }) {
  const { tripId } = route.params;
  const { getTrip } = useJournal();
  const trip = getTrip(tripId);
  const [copied, setCopied] = useState(false);

  if (!trip) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState icon="🎬" title={t('trip.notFound')} />
      </SafeAreaView>
    );
  }

  if (!(trip.discoveries || []).length) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState
          icon="🎬"
          title={t('vidScr.empty')}
          subtitle={t('vidScr.emptySub')}
        />
      </SafeAreaView>
    );
  }

  const script = generateVideoScript(trip);

  const copy = async () => {
    await Clipboard.setStringAsync(videoScriptToText(trip));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.intro}>
          <Text style={styles.introTitle}>{t('vidScr.title')}</Text>
          <Text style={styles.introSub}>
            {script.meta.totalScenes} sahne · ~{t('vidScr.duration', { dur: script.meta.totalDurationLabel })}
          </Text>
          <Text style={styles.music}>🎵 {script.meta.musicMood}</Text>
          <Pressable style={styles.copyBtn} onPress={copy}>
            <Text style={styles.copyText}>{copied ? t('common.copied') : t('vidScr.copy')}</Text>
          </Pressable>
        </View>

        <Text style={styles.stage}>TIMELINE</Text>
        {script.scenes.map((s) => (
          <View key={s.index} style={styles.scene}>
            <View style={styles.sceneHead}>
              <Text style={styles.time}>{ts(s.start)}</Text>
              <Text style={[styles.sceneTitle, { color: TYPE_COLOR[s.type] }]}>
                {TYPE_ICON[s.type]} {s.title}
              </Text>
              <Text style={styles.dur}>{s.duration}s</Text>
            </View>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>{t('vidScr.visual')}</Text>
              {s.visual}
            </Text>
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>{t('vidScr.transition')}</Text>
              {s.transition}
            </Text>
            {s.onScreenText ? (
              <Text style={styles.field}>
                <Text style={styles.fieldLabel}>{t('vidScr.subtitle')}</Text>
                {s.onScreenText}
              </Text>
            ) : null}
            {s.voiceover ? (
              <Text style={styles.field}>
                <Text style={styles.fieldLabel}>{t('vidScr.voiceover')}</Text>
                {s.voiceover}
              </Text>
            ) : null}
            <Text style={styles.field}>
              <Text style={styles.fieldLabel}>{t('vidScr.music')}</Text>
              {s.music}
            </Text>
          </View>
        ))}
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
  music: { color: colors.accent, fontSize: 13, marginTop: 6 },
  copyBtn: {
    marginTop: 14,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  copyText: { color: colors.onPrimary, fontWeight: '800', fontSize: 14 },
  stage: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginHorizontal: 16,
    marginTop: 22,
    marginBottom: 8,
  },
  scene: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sceneHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  time: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  sceneTitle: { flex: 1, fontSize: 14, fontWeight: '700' },
  dur: { color: colors.textMuted, fontSize: 12 },
  field: { color: colors.text, fontSize: 13, lineHeight: 19, marginTop: 3 },
  fieldLabel: { color: colors.textMuted, fontWeight: '700' },
});
