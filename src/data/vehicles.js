// Seyahat araçları — ortalama seyir hızı (km/sa) ve "detour" (dolambaç) çarpanı.
//
// MESAFE: Çevrimiçiyken gerçek yol mesafesi OSRM yol ağından alınır (Google'a yakın).
// Çevrimdışıyken kuş uçuşu (haversine) mesafe, detour çarpanıyla düzeltilir. Gelişmiş
// yol ağlarında şehirler arası "yol/kuş uçuşu" oranı ortalama ~1.2'dir (otoyol
// koridorlarında daha düşük); bu yüzden çarpan 1.3'ten 1.2'ye çekildi. Uçak great-circle (1.0).
//
// HIZ: Uzun yol ortalamaları (otoyol + şehir içi + sınır dahil) esas alındı. Süre =
// (gerçek/tahmini yol km) / etkin hız. Karavanlar arabaya göre ~%15 yavaş; çekme
// karavan ayrıca ≤ 90 km/sa (maxSpeed) ile sınırlı.
import { t } from '../i18n';

export const VEHICLES = [
  { id: 'plane', label: t('vehicle.plane'), icon: '✈️', speed: 750, detour: 1.0 },
  { id: 'car', label: t('vehicle.car'), icon: '🚗', speed: 95, detour: 1.2 },
  { id: 'motokaravan', label: t('vehicle.motorhome'), icon: '🚐', speed: 81, detour: 1.2 },
  { id: 'cekme_karavan', label: t('vehicle.caravan'), icon: '🚙', speed: 81, detour: 1.2, maxSpeed: 90 },
  { id: 'bus', label: t('vehicle.bus'), icon: '🚌', speed: 78, detour: 1.2 },
  { id: 'train', label: t('vehicle.train'), icon: '🚆', speed: 105, detour: 1.15 },
  { id: 'motorbike', label: t('vehicle.motorcycle'), icon: '🏍️', speed: 92, detour: 1.2 },
  { id: 'bike', label: t('vehicle.bicycle'), icon: '🚲', speed: 16, detour: 1.25 },
  { id: 'walk', label: t('vehicle.walk'), icon: '🚶', speed: 4.5, detour: 1.3 },
];

// Bir aracın rota planında kullanılacak etkin seyir hızı (varsa maxSpeed tavanı uygulanır).
export function effectiveSpeed(vehicle) {
  if (!vehicle) return 0;
  return vehicle.maxSpeed ? Math.min(vehicle.speed, vehicle.maxSpeed) : vehicle.speed;
}

export const DEFAULT_VEHICLE = 'car';

// Kişinin yurt dışına kendi kullandığı araçla çıktığı vasıtalar. Yeşil kart
// (zorunlu yurt dışı trafik sigortası) ve kasko yurt dışı kapsam genişletme
// yalnızca bu araçlar için gerekir (uçak/tren/otobüs yolcusu vb. için değil).
export const OWN_VEHICLE_IDS = ['car', 'motokaravan', 'cekme_karavan', 'motorbike'];

export function isOwnVehicle(id) {
  return OWN_VEHICLE_IDS.includes(id);
}

export function getVehicle(id) {
  return VEHICLES.find((v) => v.id === id) || VEHICLES.find((v) => v.id === DEFAULT_VEHICLE);
}
