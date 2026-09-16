// YEDEK HATIRLATICISI.
//
// Tarayıcı verisi kalıcı değilse (iOS'ta site 7 gün açılmazsa, ya da disk
// daralırsa) silinebiliyor; bir kullanıcı bütün seyahat kaydını böyle
// kaybetti. Tek gerçek güvence, verinin cihazda bir DOSYA olarak da durması.
// Bu yüzden yedek almak Ayarlar'ın dibinde beklemek yerine ana ekranda tek
// dokunuşla erişilebilir ve gerektiğinde kendisi hatırlatır.
//
// Hatırlatma koşulu (birinden biri):
//   * hiç yedek alınmamış,
//   * son yedekten bu yana 3 günden fazla geçmiş,
//   * son yedekten bu yana 5+ yeni kayıt (keşif/harcama/fotoğraf) eklenmiş.
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useJournal } from '../state/JournalContext';
import { buildBackup, backupFileName, backupStats } from '../logic/backup';
import { canShareFiles, shareBackup, downloadBackup } from '../logic/backupFile';
import { isStoragePersisted, requestPersistentStorage } from '../logic/storage';
import { colors } from '../theme';
import { t } from '../i18n';

const DAY = 86400000;
const REMIND_AFTER = 3 * DAY;
const REMIND_AFTER_N = 5;

export function shouldRemind(settings, stats) {
  const last = Number(settings?.lastBackupAt) || 0;
  if (!last) return true;
  if (Date.now() - last > REMIND_AFTER) return true;
  const before = settings?.lastBackupStats || {};
  const grew =
    (stats.discoveries - (before.discoveries || 0)) +
    (stats.expenses - (before.expenses || 0)) +
    (stats.photos - (before.photos || 0));
  return grew >= REMIND_AFTER_N;
}

export default function BackupReminder() {
  const { trips, settings, updateSettings } = useJournal();
  const [hidden, setHidden] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState('');
  const [persisted, setPersisted] = useState(undefined);

  useEffect(() => {
    let alive = true;
    isStoragePersisted().then((v) => {
      if (alive) setPersisted(v);
    });
    return () => {
      alive = false;
    };
  }, []);

  const stats = backupStats(trips);
  if (Platform.OS !== 'web') return null;
  if (!stats.trips || hidden) return null;
  // Yalnızca gerçekten hatırlatma gerektiğinde çık. Kalıcı depolama kapalı
  // olsa bile taze bir yedek varsa kart gösterilmez — sürekli ekranda duran
  // bir uyarı okunmaz hâle gelir. (Kalıcılık uyarısı Ayarlar'da da duruyor.)
  // `done` varken kart açık kalır: yedek alındıktan sonra koşul düşse bile
  // kullanıcı "✓ Yedek hazır" onayını görmeden kart kaybolmasın.
  if (!done && !shouldRemind(settings, stats)) return null;

  const takeBackup = async () => {
    setBusy(true);
    setDone('');
    try {
      const text = buildBackup(trips, settings);
      const name = backupFileName();
      const ok = canShareFiles() ? await shareBackup(text, name) : downloadBackup(text, name);
      if (ok) {
        updateSettings({ lastBackupAt: Date.now(), lastBackupStats: stats });
        setDone(t('backup.saved', { mb: (text.length / 1048576).toFixed(1) }));
      } else {
        setDone(t('backup.saveFailed'));
      }
    } catch (e) {
      setDone(t('backup.saveFailed'));
    } finally {
      setBusy(false);
    }
  };

  const askPersist = async () => {
    const r = await requestPersistentStorage();
    setPersisted(r.supported ? r.persisted : null);
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>{t('backup.remindTitle')}</Text>
        <Pressable onPress={() => setHidden(true)} hitSlop={8}>
          <Text style={styles.close}>✕</Text>
        </Pressable>
      </View>
      <Text style={styles.text}>
        {t('backup.remindBody', { trips: stats.trips, disc: stats.discoveries, photos: stats.photos })}
      </Text>
      {persisted === false ? <Text style={styles.warn}>{t('backup.remindPersist')}</Text> : null}
      <View style={styles.actions}>
        <Pressable onPress={takeBackup} disabled={busy} style={styles.btn}>
          <Text style={styles.btnText}>{busy ? t('common.preparing') : t('backup.remindBtn')}</Text>
        </Pressable>
        {persisted === false ? (
          <Pressable onPress={askPersist} hitSlop={6}>
            <Text style={styles.link}>{t('set.persistAsk')}</Text>
          </Pressable>
        ) : null}
      </View>
      {done ? <Text style={styles.done}>{done}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 14,
    padding: 14,
  },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  title: { color: colors.text, fontSize: 14, fontWeight: '800', flex: 1 },
  close: { color: colors.textMuted, fontSize: 14, fontWeight: '800' },
  text: { color: colors.textMuted, fontSize: 12, lineHeight: 17, marginTop: 4 },
  warn: { color: colors.danger, fontSize: 12, lineHeight: 17, marginTop: 8 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 12, flexWrap: 'wrap' },
  btn: { backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 14 },
  btnText: { color: colors.onPrimary, fontSize: 13, fontWeight: '800' },
  link: { color: colors.primary, fontSize: 12, fontWeight: '700' },
  done: { color: colors.success, fontSize: 12, lineHeight: 17, marginTop: 10 },
});
