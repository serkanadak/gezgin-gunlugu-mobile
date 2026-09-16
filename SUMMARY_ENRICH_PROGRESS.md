# Özet (summary) Zenginleştirme Planı

Amaç: Keşif günlüğündeki her mekânın `places.js` içindeki `summary` alanını
(turistik + tarihi özet) zengin, iki paragraflı biçime çıkarmak — İstanbul/Edirne
kalitesinde. Avrupa'dan başla, sonra tüm dünya. Her batch: özetleri genişlet →
doğrula (node --check) → commit → PR → merge → deploy → sıradaki. Bitince zamanlayıcıyı durdur.

Hedef stil: 2 paragraf, ~400-600 karakter; ilk paragraf tarihi/kültürel bağlam,
ikinci paragraf gezilecek yerler/atmosfer. `\n\n` ile ayır. id/name/coords/aliases/sources DOKUNMA.

İşaretleme: [x] tamamlandı, [ ] bekliyor.

## AVRUPA

- [x] IT1 — İtalya A: Roma, Venedik, Floransa, Milano, Napoli, Trieste, Treviso, Pisa, Bari, Sirmione, Verona, Padova
- [x] IT2 — İtalya B: Vicenza, Bologna, Bergamo, Como, Bolzano, Trento, Siena, San Gimignano, Lucca, Cinque Terre, Rimini
- [x] DE1 — Almanya: Regensburg, Nürnberg, Würzburg, Rothenburg, Füssen, Heidelberg, Dresden, Leipzig, Baden-Baden, Freiburg + Münih/Berlin/Köln/Hamburg
- [x] FR1 — Fransa + İsviçre: Paris, Nice, Lyon, Marsilya, Bordeaux, Strasbourg, Colmar, Dijon, Annecy, Avignon, Aix + Zürih, Luzern, Interlaken, Bern, Cenevre, Lausanne, Montreux, Lugano
- [x] ES1 — İspanya + Portekiz: Barselona, Madrid, Sevilla, Granada, Valensiya, Bilbao, San Sebastián, Toledo, Córdoba, Málaga, Santiago + Lizbon, Porto, Sintra, Faro, Coimbra, Óbidos
- [x] GR1 — Yunanistan + Balkan: Atina, Selanik, Santorini, Meteora, Delphi, Nafplio, Ioannina, İgumenitsa, Kavala + Tiran, İşkodra, Lesh, Bitola
- [x] HR1 — Hırvatistan + Slovenya + Avusturya/Slovakya: Split, Šibenik, Trogir, Opatija, Pula, Rovinj, Plitvice, Ston + Ljubljana, Bled, Maribor, Piran, Postojna + Melk, Košice
- [x] UK1 — BK + İrlanda + Hollanda + Belçika: Londra, Edinburgh, Bath, York, Oxford, Cambridge, Liverpool + Dublin, Galway, Cork + Amsterdam, Rotterdam, Utrecht, Delft, Lahey, Giethoorn + Brüksel, Bruges, Gent, Anvers
- [x] SC1 — İskandinavya A: Norveç (Oslo, Bergen, Tromsø, Stavanger, Ålesund, Geiranger, Lofoten) + İzlanda (Reykjavik, Vík, Akureyri)
- [x] SC2 — İskandinavya B: İsveç (Stockholm, Göteborg, Malmö, Uppsala, Kiruna, Visby) + Danimarka (Kopenhag, Aarhus, Odense, Skagen) + Finlandiya (Helsinki, Rovaniemi, Turku, Tampere)
- [x] CE1 — Orta Avrupa: Macaristan (Győr, Eger, Pécs, Szentendre, Balaton) + Çekya (Brno, Český Krumlov) + Polonya (Krakow, Varşova) + Trebinje

## DURUM: AVRUPA TAMAMLANDI (tüm ülkelerde thin özet kalmadı; Balkanlar zaten zengindi).

## DÜNYA (Avrupa sonrası)

- [x] TR-A..TR-E — Türkiye 71 il özeti zenginleştirildi (Akdeniz/Ege, Marmara, İç Anadolu, Karadeniz, Doğu/Güneydoğu). Sınır kapısı girdileri (13) işlevsel bırakıldı.
- [x] AS1 — Asya (Japonya 15, Çin 4, Hindistan 5, GD Asya 10, Kore, Nepal)
- [x] ME1 — Orta Doğu & Orta Asya (İran 3, Ürdün 2, BAE 2, Özbekistan 2)
- [x] AM1 — Amerika (ABD 5, Kanada 3, Latin Amerika 10)
- [x] AF1 — Afrika (Mısır 4, Fas 4, Tunus 1, G.Afrika 2, Doğu Afrika 4)
- [x] OC1 — Okyanusya (Avustralya 4, Yeni Zelanda 2, Endonezya)

## DURUM: GÖREV TAMAMLANDI. Tüm ülkelerdeki tüm turistik mekânların özeti
iki paragraflı zengin biçime çıkarıldı (368 mekân; 0 thin turistik özet kaldı).
Yalnızca 13 sınır kapısı girdisi işlevsel açıklamalarıyla bırakıldı.

Not: "kontrol" = zaten yeterince zengin olabilir, kontrol edip gerekiyorsa genişlet.
