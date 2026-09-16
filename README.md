# 🧭 Gezgin Günlüğü

Akıllı seyahat notu, dijital albüm ve video kolaj asistanı. Seyahatin sırasında **fotoğraf/konum** ekle; uygulama bunlara **tarihi & kültürel derinlik** kazandırsın. Seyahat bitince tek dokunuşla **albüm/PDF mizanpaj planı** ve **sinematik video kolaj senaryosu** üret.

Expo (React Native) ile yazılmıştır; iOS, Android ve web'de çalışır. Tüm veriler yalnızca cihazda (AsyncStorage) saklanır — sunucu yok.

---

## ✨ Özellikler

- **🧳 Çoklu seyahat** — Her seyahat kendi hazırlık listesi, durakları ve keşif günlüğüyle ayrı yönetilir.
- **✅ Hazırlık checklist'i** — 10 maddelik hazır şablon + elle madde ekleme. Her madde `Bekliyor → Tamam → Kısmen → Gerek Yok` durumları arasında geçer (dokun: sıradaki; uzun bas: doğrudan seç/sil). İlerleme yüzdesi hesaplanır.
- **🗺️ Güzergah & mesafe** — Duraklar ekle, seyahat aracını seç; duraklar arası **mesafe ve tahmini süre** araca göre otomatik hesaplanır (uçak kuş uçuşu; kara/ray araçları yol payıyla). Durakları sırala/sil.
- **📍 Keşif ekleme** — Fotoğraf yükle (EXIF'ten tarih & GPS okunur) ve/veya mekan adı gir. Uygulama şablonlu bir kart üretir:
  - Mekanın tam adı, şehir/ülke, keşif tarihi
  - 🏛️ Tarihi ve kültürel özet
  - 📚 Kaynakça & referanslar
  - ✍️ Gezginin Notları (kişisel not alanı — elle doldurulur)
- **📓 Kronolojik günlük** — Tüm keşifler tarih sırasına göre listelenir.
- **📖 Albüm / Yayın Planı** — Kapak fikri, giriş sayfası, gün gün sayfa yerleşim şablonları ve çift-sayfa seyahat haritası taslağı. Metin olarak panoya kopyalanır.
- **🎬 Video Kolaj Senaryosu** — Sahne sahne timeline: açılış, 3B harita fly-through geçişleri, mekan sahneleri, kapanış; her sahne için görsel/geçiş/alt yazı/dış ses/müzik notlarıyla. Araca göre müzik atmosferi önerilir. Metin olarak kopyalanır.

## 🧠 Tarihi/Kültürel Özet Kaynağı (Ayarlar)

İki mod desteklenir, Ayarlar'dan geçiş yapılır:

1. **🗄️ Yerel arşiv (varsayılan)** — Çevrimdışı çalışır. Ayasofya, Kapadokya, Efes, Pamukkale, Göbeklitepe, Nemrut, Truva, Anıtkabir, Sümela, Eyfel Kulesi, Kolezyum, Akropolis gibi tanınmış yerler için hazır özet ve kaynakça sunar.
2. **🤖 Canlı AI** — Arşivde olmayan yerler için OpenAI veya Anthropic (Claude) API'siyle gerçek AI özeti üretir. İnternet + API anahtarı gerekir; anahtar yalnızca cihazda saklanır. Her durumda önce yerel arşiv denenir.

Arşivde bulunmayan ve AI kapalıysa, boş şablon üretilir ve özeti kullanıcı kendi yazabilir.

---

## 🚀 Çalıştırma

```bash
cd gezgin-gunlugu
npm install
npm run start      # Expo geliştirme sunucusu
npm run web        # tarayıcıda
npm run android    # Android
npm run ios        # iOS
```

Uygulama görselleri (ikon/splash) koddan üretilir:

```bash
npm run gen:assets
```

Testler (saf mantık katmanı):

```bash
npm test
```

---

## 🏗️ Mimari

```
gezgin-gunlugu/
├── App.js                     # SafeArea + JournalProvider + RootNavigator
├── src/
│   ├── theme.js               # Renk paleti (gece mavisi + altın)
│   ├── navigation/
│   │   └── RootNavigator.js   # Bottom tabs (Seyahatler/Ayarlar) + Stack
│   ├── state/
│   │   └── JournalContext.js  # Tüm durum: seyahatler, checklist, duraklar, keşifler, ayarlar (AsyncStorage)
│   ├── components/
│   │   └── common.js          # Card, PrimaryButton, ChipPicker, ConfirmModal, ProgressBar, ...
│   ├── data/
│   │   ├── vehicles.js        # Araçlar + hız + yol payı çarpanı
│   │   ├── checklist.js       # Hazırlık şablonu + durum modeli + ilerleme
│   │   └── places.js          # Yerel tarihi/kültürel yerler veri tabanı + eşleştirme
│   ├── logic/
│   │   ├── date.js            # Tarih biçimlendirme yardımcıları
│   │   ├── geo.js             # Haversine mesafe + araç bazlı rota/süre
│   │   ├── exif.js            # Fotoğraf EXIF → tarih & GPS
│   │   ├── enrich.js          # Yerel arşiv → (opsiyonel) canlı AI → şablon
│   │   ├── publish.js         # Albüm/PDF mizanpaj planı üreticisi
│   │   └── video.js           # Video kolaj senaryosu üreticisi
│   └── screens/               # 11 ekran
└── scripts/gen-assets.js      # PNG ikon/splash üretici (bağımlılıksız)
```

## 🔒 Gizlilik

Seyahatler, fotoğraf referansları, notlar ve API anahtarı yalnızca cihazda saklanır. Uygulamanın kendi sunucusu yoktur. Canlı AI modunda yalnızca girdiğin mekan adı seçtiğin sağlayıcıya gönderilir.
