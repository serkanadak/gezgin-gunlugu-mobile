// Mekân özetini gösterir.
//
// Arayüz dili Türkçe değilse, özet seçili dilde Wikipedia'dan çekilir ve
// kaynağıyla birlikte gösterilir. Getirilemezse (çevrimdışı / sayfa yok)
// arşivdeki Türkçe metin gösterilir ve bunun Türkçe olduğu belirtilir.
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Linking, Pressable } from 'react-native';
import { resolveLocalizedSummary } from '../logic/placeText';
import { getLang, DEFAULT_LANG, t } from '../i18n';
import { colors } from '../theme';

export default function PlaceSummary({ place, fallback, style, emptyStyle }) {
  const [loc, setLoc] = useState(null);
  const [busy, setBusy] = useState(false);
  const lang = getLang();

  useEffect(() => {
    let alive = true;
    if (lang === DEFAULT_LANG || !place || !(place.name || place.id)) {
      setLoc(null);
      return () => {
        alive = false;
      };
    }
    setBusy(true);
    resolveLocalizedSummary(place, lang)
      .then((r) => {
        if (alive) setLoc(r);
      })
      .finally(() => {
        if (alive) setBusy(false);
      });
    return () => {
      alive = false;
    };
  }, [lang, place?.id, place?.name, place?.city]);

  if (loc && loc.extract) {
    return (
      <>
        <Text style={style}>{loc.extract}</Text>
        {loc.url ? (
          <Pressable onPress={() => Linking.openURL(loc.url).catch(() => {})}>
            <Text style={styles.src}>{t('placeText.source')}</Text>
          </Pressable>
        ) : null}
      </>
    );
  }

  if (!fallback) {
    return busy ? <Text style={emptyStyle || styles.note}>{t('placeText.loading')}</Text> : null;
  }

  return (
    <>
      <Text style={style}>{fallback}</Text>
      {lang !== DEFAULT_LANG ? <Text style={styles.note}>{t('placeText.turkishOnly')}</Text> : null}
    </>
  );
}

const styles = StyleSheet.create({
  src: { color: colors.primary, fontSize: 11, marginTop: 6, fontWeight: '700' },
  note: { color: colors.textMuted, fontSize: 11, marginTop: 6, fontStyle: 'italic' },
});
