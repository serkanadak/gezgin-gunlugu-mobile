// Ortak arayüz metinleri, gezinme başlıkları, tarih adları, araçlar.
export default {
  // --- genel eylemler ---
  'common.save': { tr: 'Kaydet', en: 'Save', de: 'Speichern' },
  'common.saveChanges': { tr: 'Değişiklikleri Kaydet', en: 'Save changes', de: 'Änderungen speichern' },
  'common.cancel': { tr: 'Vazgeç', en: 'Cancel', de: 'Abbrechen' },
  'common.confirm': { tr: 'Onayla', en: 'Confirm', de: 'Bestätigen' },
  'common.delete': { tr: 'Sil', en: 'Delete', de: 'Löschen' },
  'common.edit': { tr: 'Düzenle', en: 'Edit', de: 'Bearbeiten' },
  'common.add': { tr: 'Ekle', en: 'Add', de: 'Hinzufügen' },
  'common.close': { tr: 'Kapat', en: 'Close', de: 'Schließen' },
  'common.back': { tr: 'Geri', en: 'Back', de: 'Zurück' },
  'common.preparing': { tr: 'Hazırlanıyor…', en: 'Preparing…', de: 'Wird vorbereitet…' },
  // --- fotoğraf seçme ---
  'photo.preparing': {
    tr: '📷 Fotoğraflar hazırlanıyor… {done}/{total}',
    en: '📷 Preparing photos… {done}/{total}',
    de: '📷 Fotos werden vorbereitet… {done}/{total}',
  },
  'photo.someFailed': {
    tr: '{n} fotoğraf okunamadı ve atlandı. Çok büyük veya desteklenmeyen bir biçim olabilir.',
    en: '{n} photo(s) could not be read and were skipped. They may be too large or in an unsupported format.',
    de: '{n} Foto(s) konnten nicht gelesen werden und wurden übersprungen. Möglicherweise zu groß oder ein nicht unterstütztes Format.',
  },
  'photo.failed': {
    tr: 'Fotoğraf alınamadı. Lütfen tekrar deneyin.',
    en: 'Could not add the photo. Please try again.',
    de: 'Foto konnte nicht hinzugefügt werden. Bitte erneut versuchen.',
  },
  'photo.exifNote': { tr: 'Meta veriden okundu:', en: 'Read from metadata:', de: 'Aus Metadaten gelesen:' },
  'common.copied': { tr: '✓ Kopyalandı', en: '✓ Copied', de: '✓ Kopiert' },
  'common.invalidDate': { tr: 'Geçersiz tarih biçimi.', en: 'Invalid date format.', de: 'Ungültiges Datumsformat.' },
  'common.optional': { tr: 'opsiyonel', en: 'optional', de: 'optional' },
  'common.pct': { tr: '%{n}', en: '{n}%', de: '{n} %' },
  'common.all': { tr: 'Tümü', en: 'All', de: 'Alle' },
  'common.total': { tr: 'Toplam', en: 'Total', de: 'Gesamt' },
  'common.city': { tr: 'Şehir', en: 'City', de: 'Stadt' },
  'common.country': { tr: 'Ülke', en: 'Country', de: 'Land' },
  'common.date': { tr: 'Tarih', en: 'Date', de: 'Datum' },
  'common.unexpectedError': {
    tr: 'Beklenmedik bir hata oluştu. Tekrar deneyebilirsin.',
    en: 'An unexpected error occurred. You can try again.',
    de: 'Ein unerwarteter Fehler ist aufgetreten. Du kannst es erneut versuchen.',
  },

  // --- PDF / açılır pencere ---
  'pdf.failed': { tr: 'PDF oluşturulamadı', en: 'Could not create PDF', de: 'PDF konnte nicht erstellt werden' },
  'pdf.popupBlocked': { tr: 'Açılır pencere engellendi', en: 'Pop-up blocked', de: 'Pop-up blockiert' },
  'pdf.popupBlockedMsg': {
    tr: 'PDF için yeni bir sekme açılması gerekiyor. Tarayıcının açılır pencere (popup) iznini verip tekrar dene.',
    en: 'A new tab is required for the PDF. Allow pop-ups in your browser and try again.',
    de: 'Für das PDF muss ein neuer Tab geöffnet werden. Erlaube Pop-ups im Browser und versuche es erneut.',
  },
  'pdf.webOnly': { tr: 'PDF web sürümünde', en: 'PDF on the web version', de: 'PDF in der Web-Version' },

  // --- gezinme başlıkları ---
  'nav.trips': { tr: 'Seyahatler', en: 'Trips', de: 'Reisen' },
  'nav.settings': { tr: 'Ayarlar', en: 'Settings', de: 'Einstellungen' },
  'nav.newTrip': { tr: 'Yeni Seyahat', en: 'New trip', de: 'Neue Reise' },
  'nav.trip': { tr: 'Seyahat', en: 'Trip', de: 'Reise' },
  'nav.checklist': { tr: 'Hazırlık Listesi', en: 'Preparation list', de: 'Vorbereitungsliste' },
  'nav.route': { tr: 'Güzergah Planı', en: 'Route plan', de: 'Routenplan' },
  'nav.addStop': { tr: 'Durak Ekle', en: 'Add stop', de: 'Halt hinzufügen' },
  'nav.discoveryHub': { tr: 'Keşif Günlüğü', en: 'Discovery journal', de: 'Entdeckungstagebuch' },
  'nav.addDiscovery': { tr: 'Keşif Ekle', en: 'Add discovery', de: 'Entdeckung hinzufügen' },
  'nav.discovery': { tr: 'Keşif', en: 'Discovery', de: 'Entdeckung' },
  'nav.expenses': { tr: 'Harcamalar', en: 'Expenses', de: 'Ausgaben' },
  'nav.expenseReport': { tr: 'Harcama Raporu', en: 'Expense report', de: 'Ausgabenbericht' },
  'nav.album': { tr: 'Albüm / Yayın', en: 'Album / Publish', de: 'Album / Veröffentlichung' },
  'nav.videoScript': { tr: 'Video Senaryosu', en: 'Video script', de: 'Videoskript' },

  // --- aylar / günler (tarih biçimlendirme) ---
  'date.months': {
    tr: 'Ocak,Şubat,Mart,Nisan,Mayıs,Haziran,Temmuz,Ağustos,Eylül,Ekim,Kasım,Aralık',
    en: 'January,February,March,April,May,June,July,August,September,October,November,December',
    de: 'Januar,Februar,März,April,Mai,Juni,Juli,August,September,Oktober,November,Dezember',
  },
  'date.monthsShort': {
    tr: 'Oca,Şub,Mar,Nis,May,Haz,Tem,Ağu,Eyl,Eki,Kas,Ara',
    en: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec',
    de: 'Jan,Feb,Mär,Apr,Mai,Jun,Jul,Aug,Sep,Okt,Nov,Dez',
  },
  'date.days': {
    tr: 'Pazar,Pazartesi,Salı,Çarşamba,Perşembe,Cuma,Cumartesi',
    en: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
    de: 'Sonntag,Montag,Dienstag,Mittwoch,Donnerstag,Freitag,Samstag',
  },
  'date.dayShort': { tr: 'gün', en: 'days', de: 'Tage' },
  'date.night': { tr: 'gece', en: 'nights', de: 'Nächte' },

  // --- araçlar ---
  'vehicle.plane': { tr: 'Uçak', en: 'Plane', de: 'Flugzeug' },
  'vehicle.car': { tr: 'Araba', en: 'Car', de: 'Auto' },
  'vehicle.motorhome': { tr: 'Motokaravan', en: 'Motorhome', de: 'Wohnmobil' },
  'vehicle.caravan': { tr: 'Çekme Karavan', en: 'Caravan', de: 'Wohnwagen' },
  'vehicle.bus': { tr: 'Otobüs', en: 'Bus', de: 'Bus' },
  'vehicle.train': { tr: 'Tren', en: 'Train', de: 'Zug' },
  'vehicle.motorcycle': { tr: 'Motosiklet', en: 'Motorcycle', de: 'Motorrad' },
  'vehicle.bicycle': { tr: 'Bisiklet', en: 'Bicycle', de: 'Fahrrad' },
  'vehicle.walk': { tr: 'Yürüyüş', en: 'Walking', de: 'Wandern' },
  'vehicle.roadFactor': { tr: 'yol/kuş uçuşu', en: 'road/straight-line', de: 'Straße/Luftlinie' },

  // --- ödeme şekilleri ---
  'pay.cash': { tr: 'Nakit', en: 'Cash', de: 'Bargeld' },
  'pay.card': { tr: 'Kredi Kartı', en: 'Credit card', de: 'Kreditkarte' },
  'pay.unknown': { tr: 'Belirsiz', en: 'Unspecified', de: 'Unbestimmt' },

  // --- para birimleri ---
  'cur.TRY': { tr: 'Türk Lirası', en: 'Turkish lira', de: 'Türkische Lira' },
  'cur.EUR': { tr: 'Euro', en: 'Euro', de: 'Euro' },
  'cur.USD': { tr: 'ABD Doları', en: 'US dollar', de: 'US-Dollar' },
  'cur.GBP': { tr: 'İngiliz Sterlini', en: 'Pound sterling', de: 'Britisches Pfund' },
  'cur.CHF': { tr: 'İsviçre Frangı', en: 'Swiss franc', de: 'Schweizer Franken' },
  'cur.JPY': { tr: 'Japon Yeni', en: 'Japanese yen', de: 'Japanischer Yen' },
};
