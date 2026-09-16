// Hazırlık listesi madde başlıkları ve durum etiketleri.
// Maddeler seyahat verisine ANAHTARLA kaydedilir; başlık her zaman seçili dilde
// gösterilir, böylece dil değişince eski seyahatlerin işaretleri korunur.
export default {
  'chk.passport': {
    tr: 'Pasaport / kimlik geçerliliği',
    en: 'Passport / ID validity',
    de: 'Gültigkeit von Pass / Ausweis',
  },
  'chk.visa': { tr: 'Vize başvurusu / kontrolü', en: 'Visa application / check', de: 'Visumantrag / -prüfung' },
  'chk.exitFee': {
    tr: 'Yurt dışı çıkış harcı (ödeme)',
    en: 'Departure fee payment',
    de: 'Ausreisegebühr (Zahlung)',
  },
  'chk.tickets': {
    tr: 'Ulaşım biletleri (uçak/tren/otobüs)',
    en: 'Travel tickets (plane/train/bus)',
    de: 'Fahrkarten (Flug/Zug/Bus)',
  },
  'chk.accommodation': { tr: 'Konaklama rezervasyonları', en: 'Accommodation bookings', de: 'Unterkunftsbuchungen' },
  'chk.meds': {
    tr: 'İlaç & kişisel sağlık malzemeleri',
    en: 'Medication & personal health supplies',
    de: 'Medikamente & Gesundheitsartikel',
  },
  'chk.healthInsurance': { tr: 'Seyahat sağlık sigortası', en: 'Travel health insurance', de: 'Reisekrankenversicherung' },
  'chk.money': { tr: 'Para / döviz', en: 'Money / foreign currency', de: 'Geld / Devisen' },
  'chk.bankNotice': {
    tr: 'Bankaya yurt dışı kart bildirimi',
    en: 'Notify bank of travel abroad',
    de: 'Bank über Auslandsreise informieren',
  },
  'chk.power': {
    tr: 'Şarj aleti, priz adaptörü & powerbank',
    en: 'Charger, plug adapter & power bank',
    de: 'Ladegerät, Steckeradapter & Powerbank',
  },
  'chk.sim': { tr: 'E-SIM / yerel data hattı', en: 'eSIM / local data plan', de: 'eSIM / lokaler Datentarif' },
  'chk.offlineMap': { tr: 'Offline harita indir', en: 'Download offline maps', de: 'Offline-Karten herunterladen' },
  'chk.translator': { tr: 'Çeviri uygulaması', en: 'Translation app', de: 'Übersetzungs-App' },
  'chk.luggage': {
    tr: 'Bavul & kıyafet (hava durumuna göre)',
    en: 'Luggage & clothing (per weather)',
    de: 'Gepäck & Kleidung (nach Wetter)',
  },
  'chk.camera': {
    tr: 'Kamera / telefon & yedek hafıza',
    en: 'Camera / phone & spare storage',
    de: 'Kamera / Telefon & Ersatzspeicher',
  },
  'chk.dayPlan': { tr: 'Günlük gezi rotası taslağı', en: 'Draft daily itinerary', de: 'Entwurf des Tagesprogramms' },

  // kendi aracıyla çıkanlar için ek maddeler
  'chk.greenCard': {
    tr: 'Yeşil kart (yurt dışı araç trafik sigortası)',
    en: 'Green card (international motor insurance)',
    de: 'Grüne Karte (internationale Kfz-Versicherung)',
  },
  'chk.kasko': {
    tr: 'Kasko yurt dışı kapsam genişletme',
    en: 'Extend comprehensive cover abroad',
    de: 'Vollkaskoschutz im Ausland erweitern',
  },
  'chk.vignette': {
    tr: 'Vinyet / otoyol geçiş (HGS · OGS · vinyet)',
    en: 'Vignette / toll passes',
    de: 'Vignette / Autobahngebühren',
  },
};
