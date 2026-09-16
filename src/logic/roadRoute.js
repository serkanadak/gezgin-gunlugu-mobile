// Çevrimiçi gerçek yol mesafesi — OSRM açık sunucusu (anahtar gerektirmez).
// Ardışık (koordinatlı) duraklar arası gerçek karayolu mesafesini döndürür; böylece
// güzergah km'leri Google Haritalar'a yakın olur. Çevrimdışı/başarısızsa null döner ve
// uygulama kuş uçuşu + detour tahminine geri düşer.
import { hasCoords } from './geo';

const OSRM_BASE = 'https://router.project-osrm.org/route/v1/driving/';

// stops: sıralı durak dizisi. Dönüş: { 'fromId->toId': km } veya null.
export async function fetchRoadKm(stops, { signal } = {}) {
  const cs = (stops || []).filter(hasCoords);
  if (cs.length < 2) return null;

  const coords = cs.map((s) => `${s.lng},${s.lat}`).join(';');
  const url = `${OSRM_BASE}${coords}?overview=false&alternatives=false&steps=false`;

  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`OSRM ${res.status}`);
  const data = await res.json();
  if (data.code !== 'Ok' || !data.routes?.[0]?.legs) throw new Error('OSRM: route not found');

  const legs = data.routes[0].legs;
  const map = {};
  for (let i = 0; i < legs.length && i + 1 < cs.length; i++) {
    map[`${cs[i].id}->${cs[i + 1].id}`] = legs[i].distance / 1000; // m → km
  }
  return map;
}
