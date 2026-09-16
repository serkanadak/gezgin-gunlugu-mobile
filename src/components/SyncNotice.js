// Başka bir pencere/sekme veriyi güncellediğinde bu pencere kendini tazeler.
// Kullanıcı bunu bilmeli: aksi hâlde ekranın "kendiliğinden değişmesi" ya da
// o pencerede yaptığı son değişikliğin uygulanmaması kafa karıştırır.
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useJournal } from '../state/JournalContext';
import { colors } from '../theme';
import { t } from '../i18n';

// floating: uygulama kökünde, hangi ekranda olursak olalım altta görünür.
export default function SyncNotice({ floating = false }) {
  const { refreshedFromOther, ackRefreshed } = useJournal();
  if (!refreshedFromOther) return null;
  return (
    <View style={[styles.bar, floating && styles.floating]}>
      <Text style={styles.text}>{t('sync.refreshed')}</Text>
      <Pressable onPress={ackRefreshed} hitSlop={8}>
        <Text style={styles.close}>✕</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  floating: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 12,
    marginTop: 0,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },
  text: { color: colors.text, fontSize: 12, lineHeight: 17, flex: 1 },
  close: { color: colors.textMuted, fontSize: 14, fontWeight: '800' },
});
