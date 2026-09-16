// Mekâna eşlik eden temel foto. Yalnızca Wikimedia'dan serbest lisanslı gerçek bir
// görsel bulunduğunda görünür; bulunamazsa hiçbir şey çizmez (boşluk bırakmaz).
import React, { useEffect, useState } from 'react';
import { View, Image, Text, Pressable, Linking, StyleSheet, Platform } from 'react-native';
import { resolvePlacePhoto } from '../logic/placePhoto';
import { colors } from '../theme';

export default function PlacePhoto({ place, height = 190, style }) {
  const [photo, setPhoto] = useState(null);
  const key = place ? place.id || `${place.name}|${place.country}` : null;

  useEffect(() => {
    let alive = true;
    setPhoto(null);
    if (place && (place.name || place.id)) {
      resolvePlacePhoto(place)
        .then((p) => {
          if (alive && p && p.uri) setPhoto(p);
        })
        .catch(() => {});
    }
    return () => {
      alive = false;
    };
  }, [key]);

  if (!photo) return null; // serbest lisanslı gerçek foto yoksa hiçbir şey gösterme

  const credit = [photo.artist, photo.license].filter(Boolean).join(' · ');
  const openSource = () => {
    const url = photo.page || photo.articlePage;
    if (url) Linking.openURL(url).catch(() => {});
  };

  return (
    <View style={[styles.wrap, { height }, style]}>
      <Image source={{ uri: photo.uri }} style={styles.img} resizeMode="cover" accessibilityLabel={place?.name} />
      <Pressable style={styles.credit} onPress={openSource} hitSlop={6}>
        <Text style={styles.creditText} numberOfLines={1}>
          📷 {credit ? credit + ' · ' : ''}Wikimedia
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.surfaceAlt,
    marginBottom: 12,
    ...(Platform.OS === 'web' ? { cursor: 'default' } : null),
  },
  img: { width: '100%', height: '100%' },
  credit: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  creditText: { color: 'rgba(255,255,255,0.92)', fontSize: 11 },
});
