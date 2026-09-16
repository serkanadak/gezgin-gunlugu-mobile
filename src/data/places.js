// Yerel (çevrimdışı) tarihi & kültürel yerler veri tabanı.
// Kullanıcı bir konum/mekan ismi girdiğinde ya da fotoğraf eklerken burada eşleşme aranır.
// Eşleşme bulunursa hazır tarihi/kültürel özet ve kaynakça kullanılır; bulunmazsa
// (Ayarlar'dan canlı AI açık değilse) boş şablon üretilir.

export const PLACES = [
  // ===================== TÜRKİYE — ŞEHİRLER =====================
  {
    id: 'istanbul',
    name: 'İstanbul',
    city: 'İstanbul',
    country: 'Türkiye',
    lat: 41.0082,
    lng: 28.9784,
    aliases: ['istanbul', 'constantinople', 'konstantinopolis', 'byzantion', 'stambul'],
    summary:
      'İki kıtayı birbirine bağlayan İstanbul, Roma, Bizans ve Osmanlı imparatorluklarına başkentlik yapmış; tarih boyunca dünyanın en stratejik ve görkemli şehirlerinden biri olmuştur. Boğaz’ın iki yakasına yayılan kent; Ayasofya, Sultanahmet ve Topkapı gibi anıtlarıyla farklı medeniyetlerin izlerini aynı silüette taşır.\n\nKapalıçarşı’nın labirent sokaklarından Galata’nın dar yokuşlarına, Boğaz vapurlarından tarihî yarımadanın minarelerine kadar İstanbul, geçmiş ile bugünü kesintisiz bir enerjiyle harmanlar. Tarihi Yarımada UNESCO Dünya Mirası Listesi’ndedir.',
    sources: [
      'UNESCO World Heritage List — Historic Areas of Istanbul',
      'T.C. Kültür ve Turizm Bakanlığı — İstanbul',
    ],
  },
  {
    id: 'edirne',
    name: 'Edirne',
    city: 'Edirne',
    country: 'Türkiye',
    lat: 41.6771,
    lng: 26.5557,
    aliases: ['edirne', 'adrianople', 'hadrianopolis'],
    summary:
      'Bir zamanlar Osmanlı’nın başkenti olan Edirne, Bulgaristan ve Yunanistan sınırının hemen yanında, ülkenin Avrupa’ya açılan kapısıdır. Kentin tacı, Mimar Sinan’ın “ustalık eserim” dediği ve UNESCO Dünya Mirası Listesi’nde yer alan Selimiye Camii’dir.\n\nEski Cami, Üç Şerefeli Cami, tarihî bedestenler ve Meriç Nehri üzerindeki zarif Osmanlı köprüleriyle Edirne bir açık hava müzesidir. Her yıl düzenlenen Kırkpınar Yağlı Güreşleri de kente özgü asırlık bir gelenektir.',
    sources: [
      'UNESCO World Heritage List — Selimiye Mosque and its Social Complex',
      'T.C. Kültür ve Turizm Bakanlığı — Edirne',
    ],
  },
  {
    id: 'izmir',
    name: 'İzmir',
    city: 'İzmir',
    country: 'Türkiye',
    lat: 38.4237,
    lng: 27.1428,
    aliases: ['izmir', 'smyrna', 'smirna'],
    summary:
      'Ege’nin incisi İzmir, üç bin yılı aşan geçmişiyle antik Smyrna’dan bugüne uzanan bir liman kentidir. Körfez boyunca uzanan Kordon, Saat Kulesi’nin bulunduğu Konak Meydanı ve tarihî Kemeraltı Çarşısı kentin canlı kalbini oluşturur.\n\nAkdeniz esintili, özgür ruhlu atmosferiyle İzmir; Efes, Bergama ve Çeşme gibi hazinelere de kapı açar. Agora, Kadifekale ve tarihî asansörü, kentin katmanlı geçmişini bugüne taşır.',
    sources: [
      'T.C. Kültür ve Turizm Bakanlığı — İzmir',
      'Lonely Planet — İzmir',
    ],
  },
  {
    id: 'bursa',
    name: 'Bursa',
    city: 'Bursa',
    country: 'Türkiye',
    lat: 40.1885,
    lng: 29.061,
    aliases: ['bursa', 'prusa'],
    summary:
      'Osmanlı Devleti’nin ilk başkenti Bursa, “Yeşil Bursa” lakabıyla anılan, Uludağ’ın eteğine kurulu tarihî bir kenttir. Ulu Cami, Yeşil Cami ve Yeşil Türbe, erken Osmanlı mimarisinin en zarif örneklerindendir.\n\nİpek ticaretinin merkezi Koza Han, kaplıcaları ve UNESCO Dünya Mirası Listesi’ndeki Cumalıkızık köyüyle Bursa, tarihi ve doğayı bir arada sunar. Kış aylarında Uludağ önemli bir kayak merkezidir.',
    sources: [
      'UNESCO World Heritage List — Bursa and Cumalıkızık',
      'T.C. Kültür ve Turizm Bakanlığı — Bursa',
    ],
  },
  {
    id: 'canakkale',
    name: 'Çanakkale',
    city: 'Çanakkale',
    country: 'Türkiye',
    lat: 40.1553,
    lng: 26.4142,
    aliases: ['canakkale', 'çanakkale', 'dardanelles', 'gelibolu', 'gallipoli'],
    summary:
      'Çanakkale, Boğaz’ın iki yakasında Asya ile Avrupa’yı buluşturan, tarih ve mitolojiyle yüklü bir kenttir. Efsanevi Truva antik kenti (UNESCO) ile I. Dünya Savaşı’nın kader anlarına sahne olan Gelibolu Yarımadası buradadır.\n\nŞehitlikler, anıtlar ve Anzak Koyu her yıl binlerce ziyaretçiyi ağırlar. Çimenlik Kalesi, kordon boyu ve karşı kıyıdaki Truva Atı replikasıyla Çanakkale, geçmişin ağırlığını huzurlu bir deniz kentiyle birleştirir.',
    sources: [
      'UNESCO World Heritage List — Archaeological Site of Troy',
      'T.C. Kültür ve Turizm Bakanlığı — Çanakkale (Tarihi Alan Başkanlığı)',
    ],
  },
  {
    id: 'antalya',
    name: 'Antalya',
    city: 'Antalya',
    country: 'Türkiye',
    lat: 36.8969,
    lng: 30.7133,
    aliases: ['antalya', 'attaleia'],
    summary:
      'Akdeniz kıyısının turizm başkenti Antalya, antik Attaleia’dan bugüne uzanan tarihi ve turkuaz sahilleriyle ünlüdür. Surlarla çevrili tarihî Kaleiçi, dar sokakları, Osmanlı konakları ve Roma dönemi Hadrian Kapısı ile bir açık hava müzesini andırır.\n\nKent merkezindeki Düden Şelalesi, zengin Antalya Müzesi ve çevredeki Aspendos, Perge, Side gibi antik kentlerle bölge, tarih ve tatili bir arada sunar. Toroslar ile deniz arasındaki konumu eşsiz manzaralar yaratır.',
    sources: [
      'T.C. Kültür ve Turizm Bakanlığı — Antalya',
      'Lonely Planet — Antalya',
    ],
  },
  {
    id: 'ankara',
    name: 'Ankara',
    city: 'Ankara',
    country: 'Türkiye',
    lat: 39.9334,
    lng: 32.8597,
    aliases: ['ankara', 'angora', 'ankyra'],
    summary:
      'Türkiye Cumhuriyeti’nin başkenti Ankara, Hitit’ten Frig’e, Roma’dan Osmanlı’ya uzanan köklü bir geçmişe sahiptir. Cumhuriyet’in kurucusu Atatürk’ün anıtmezarı Anıtkabir, kentin en önemli simgesi ve ulusal bir buluşma noktasıdır.\n\nTepedeki Ankara Kalesi, dünyaca ünlü Anadolu Medeniyetleri Müzesi ve Roma dönemi kalıntılarıyla başkent, idari kimliğinin yanında derin bir tarih de barındırır.',
    sources: [
      'T.C. Kültür ve Turizm Bakanlığı — Ankara',
      'Anadolu Medeniyetleri Müzesi — resmi portal',
    ],
  },
  {
    id: 'konya',
    name: 'Konya',
    city: 'Konya',
    country: 'Türkiye',
    lat: 37.8746,
    lng: 32.4932,
    aliases: ['konya', 'iconium', 'ikonyum'],
    summary:
      'Selçuklu Devleti’ne başkentlik yapan Konya, Mevlânâ Celâleddîn-i Rûmî’nin şehri olarak dünyaca tanınır. Yeşil kubbeli Mevlânâ Müzesi ve türbesi, her yıl milyonlarca ziyaretçiyi ağırlar; Şeb-i Arûs törenleri ve sema, kentin manevi kimliğini yaşatır.\n\nAlâeddin Camii, İnce Minareli Medrese gibi Selçuklu eserleri ve insanlık tarihinin en eski yerleşimlerinden Çatalhöyük (UNESCO) ile Konya, maneviyat ve tarihin buluştuğu bir merkezdir.',
    sources: [
      'UNESCO World Heritage List — Çatalhöyük Neolithic Site',
      'T.C. Kültür ve Turizm Bakanlığı — Konya',
    ],
  },
  {
    id: 'trabzon',
    name: 'Trabzon',
    city: 'Trabzon',
    country: 'Türkiye',
    lat: 41.0027,
    lng: 39.7168,
    aliases: ['trabzon', 'trebizond', 'trapezus'],
    summary:
      'Karadeniz kıyısının en önemli tarihî kenti Trabzon, bir zamanlar İpek Yolu’nun batı ucundaki zengin bir liman ve Trabzon Rum İmparatorluğu’nun başkentiydi. Kentin simgesi, sarp bir kaya yüzeyine tutunan Sümela Manastırı’dır.\n\nFreskli Ayasofya Müzesi, Atatürk Köşkü ve çevredeki Uzungöl gibi doğa harikalarıyla Trabzon, tarih ile yemyeşil dağların iç içe geçtiği eşsiz bir bölgedir.',
    sources: [
      'T.C. Kültür ve Turizm Bakanlığı — Trabzon (Sümela)',
      'Lonely Planet — Trabzon',
    ],
  },
  {
    id: 'gaziantep',
    name: 'Gaziantep',
    city: 'Gaziantep',
    country: 'Türkiye',
    lat: 37.0662,
    lng: 37.3833,
    aliases: ['gaziantep', 'antep', 'ayintab'],
    summary:
      'Güneydoğu’nun köklü kenti Gaziantep, binlerce yıllık geçmişi ve dünyaca ünlü mutfağıyla bir UNESCO Gastronomi Şehri’dir. Dünyanın en büyük mozaik koleksiyonlarından birini barındıran Zeugma Mozaik Müzesi, kentin en görkemli hazinesidir.\n\nTarihî Gaziantep Kalesi, bakırcılar çarşısı, tarihî hanları ve baklavasıyla ünlü mutfak kültürüyle Antep, tarih ve lezzeti bir arada sunar.',
    sources: [
      'Zeugma Mozaik Müzesi — resmi portal',
      'T.C. Kültür ve Turizm Bakanlığı — Gaziantep',
    ],
  },

  // ============= TÜRKİYE — DİĞER İLLER =============
  { id: 'adana', name: 'Adana', city: 'Adana', country: 'Türkiye', lat: 37.0, lng: 35.3213, aliases: ['adana'], summary: 'Çukurova ovasının bereketli topraklarına kurulu Adana, Türkiye’nin en büyük kentlerinden biri olup sıcak iklimi, canlı sokak yaşamı ve zengin mutfağıyla tanınır. Seyhan Nehri kenti ikiye böler ve şehir tarih boyunca önemli bir ticaret merkezi olmuştur.\n\nRoma döneminden kalma taş kemerli tarihî Taşköprü, Türkiye’nin en büyük camilerinden Sabancı Merkez Camii ve arkeoloji müzeleri başlıca duraklardır. Şalgam suyu eşliğinde közde pişen dünyaca ünlü Adana kebabı ise kentin lezzet simgesidir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Adana', 'Lonely Planet — Adana'] },
  { id: 'mersin', name: 'Mersin', city: 'Mersin', country: 'Türkiye', lat: 36.8121, lng: 34.6415, aliases: ['mersin', 'icel', 'içel'], summary: 'Doğu Akdeniz kıyısındaki Mersin, Türkiye’nin en büyük limanlarından birine ev sahipliği yapan modern bir kent olmasının yanı sıra köklü bir tarihe sahiptir. Uzun sahil şeridi, palmiyeli bulvarları ve narenciye bahçeleriyle Akdeniz ruhunu taşır.\n\nAntik Soli-Pompeiopolis’in sütunlu caddesi, göküyle cehennemiyle efsanevi Cennet-Cehennem obrukları, denizin ortasındaki Kızkalesi ve Tarsus’taki tarihî izler başlıca duraklardır. Tantuni ve cezerye gibi lezzetleriyle Mersin, deniz ve tarihi bir araya getirir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Mersin', 'Lonely Planet — Mersin'] },
  { id: 'hatay', name: 'Hatay (Antakya)', city: 'Antakya', country: 'Türkiye', lat: 36.2025, lng: 36.1606, aliases: ['hatay', 'antakya', 'antioch', 'antakia'], summary: 'Bir medeniyetler mozaiği olan Hatay (Antakya), Antik çağın en büyük kentlerinden Antiokheia olarak Hristiyanlığın ilk yayıldığı merkezlerden biridir. Yüzyıllar boyunca farklı din ve kültürlerin bir arada yaşadığı bu topraklar, benzersiz bir hoşgörü geleneği taşır.\n\nDünyanın en zengin Roma mozaiği koleksiyonlarından birini barındıran Hatay Arkeoloji Müzesi, ilk mağara kiliselerinden Sen Piyer Kilisesi ve tarihî çarşıları başlıca duraklardır. Künefesi ve zengin sofrasıyla Hatay, UNESCO tarafından “Gastronomi Şehri” ilan edilmiştir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Hatay', 'Lonely Planet — Antakya'] },
  { id: 'kahramanmaras', name: 'Kahramanmaraş', city: 'Kahramanmaraş', country: 'Türkiye', lat: 37.5858, lng: 36.9371, aliases: ['kahramanmaras', 'kahramanmaraş', 'maras', 'maraş'], summary: 'Toroslar’ın eteğinde, Akdeniz ile Güneydoğu arasında kurulu Kahramanmaraş, köklü tarihi ve güçlü el sanatları gelenekleriyle tanınır. Kurtuluş Savaşı’ndaki direnişi nedeniyle adına “Kahraman” unvanı eklenmiştir.\n\nTepedeki tarihî kalesi, bakırcılar ve semerci çarşıları ile müzeleri kentin dokusunu oluşturur. En büyük ünü ise keçi sütü ve salepten yapılan, bıçakla kesilecek kadar yoğun kıvamlı dövme dondurması ile acılı, bol etli mutfağından gelir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Kahramanmaraş'] },
  { id: 'osmaniye', name: 'Osmaniye', city: 'Osmaniye', country: 'Türkiye', lat: 37.0682, lng: 36.2616, aliases: ['osmaniye'], summary: 'Çukurova ovası ile Amanos (Nur) Dağları arasında kurulu Osmaniye, verimli toprakları ve zengin arkeolojik mirasıyla tanınan bir Akdeniz kentidir. Geç Hitit dönemine uzanan köklü bir geçmişe sahiptir.\n\nGeç Hitit krallarının kabartma ve yazıtlarını açık havada sergileyen Karatepe-Aslantaş Milli Parkı ile antik Kastabala (Hierapolis) kenti kalıntıları başlıca duraklardır. Yer fıstığı üretimiyle de ünlü kent, tarih ile doğayı bir arada sunar.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Osmaniye'] },
  { id: 'kilis', name: 'Kilis', city: 'Kilis', country: 'Türkiye', lat: 36.7184, lng: 37.1212, aliases: ['kilis'], summary: 'Suriye sınırında, zeytinlikler arasına kurulu küçük Kilis, yüzyıllar boyunca Halep ile Anadolu arasındaki ticaret yolunda önemli bir durak olmuştur. Bu geçmiş, kente zengin bir Osmanlı mirası bırakmıştır.\n\nTarihî camileri, kubbeli çarşıları, hanları ve taş konaklarıyla kent adeta bir açık hava müzesidir. Kendi adıyla anılan zeytinyağı, tereyağlı katmeri ve özgün yemekleriyle Kilis, sınır kültürünün lezzetli bir buluşma noktasıdır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Kilis'] },
  { id: 'isparta', name: 'Isparta', city: 'Isparta', country: 'Türkiye', lat: 37.7648, lng: 30.5566, aliases: ['isparta'], summary: 'Göller Yöresi’nin kalbindeki Isparta, uçsuz bucaksız gül bahçeleri ve dünyaca ünlü gülyağıyla “Güller Şehri” olarak anılır. Toros Dağları’yla çevrili yaylaları ve gölleriyle doğal güzelliklere sahiptir.\n\nHer mayıs-haziranda pembe güllerle kaplanan bahçeler, ortasında adası bulunan Eğirdir Gölü ve dağ yamacındaki görkemli antik Sagalassos kenti başlıca duraklardır. Gül ürünleri, halı dokumacılığı ve elmasıyla Isparta, doğa ile geleneği birleştirir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Isparta'] },
  { id: 'burdur', name: 'Burdur', city: 'Burdur', country: 'Türkiye', lat: 37.7203, lng: 30.2908, aliases: ['burdur'], summary: 'Göller Yöresi’nde kurulu Burdur, çevresindeki eşsiz gölleri ve zengin arkeolojik mirasıyla tanınır. Sakin ve doğal dokusuyla henüz keşfedilmemiş güzellikler barındırır.\n\nMineralli beyaz kıyıları ve turkuaz suyuyla “Türkiye’nin Maldivleri” denen Salda Gölü, dağ yamacındaki olağanüstü korunmuş antik Sagalassos kenti ve neolitik höyükleri başlıca duraklardır. Burdur, doğa fotoğrafçıları ve tarih meraklıları için gizli bir cennettir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Burdur (Salda)'] },
  { id: 'afyon', name: 'Afyonkarahisar', city: 'Afyonkarahisar', country: 'Türkiye', lat: 38.7507, lng: 30.5567, aliases: ['afyon', 'afyonkarahisar'], summary: 'İç Ege’de, üzerinde tarihî kalesinin yükseldiği devasa bir volkanik kaya kütlesiyle özdeşleşen Afyonkarahisar, köklü tarihi ve şifalı termal kaynaklarıyla tanınır. Kurtuluş Savaşı’nın kaderini belirleyen Büyük Taarruz bu topraklarda başlamıştır.\n\nSarp kalesi, Selçuklu eseri Ulu Camii ve zafer anıtları başlıca duraklardır. Termal otelleriyle önemli bir sağlık turizmi merkezi olan kent; mermeri, kaymağı, sucuğu ve lokumuyla da dilimize yerleşmiş lezzetler sunar.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Afyonkarahisar'] },
  { id: 'kutahya', name: 'Kütahya', city: 'Kütahya', country: 'Türkiye', lat: 39.42, lng: 29.9833, aliases: ['kutahya', 'kütahya'], summary: 'İç Ege’deki Kütahya, yüzyıllardır süren çini ve seramik geleneğiyle Türk el sanatlarının başkentlerinden biridir. Frig, Roma ve Osmanlı dönemlerinden izler taşıyan zengin bir kültüre sahiptir.\n\nRengârenk çinilerle bezeli camileri, tarihî konakları, kalesi ve çini atölyeleri kentin dokusunu oluşturur. Yakınındaki, dünyanın en iyi korunmuş Zeus Tapınağı’nı barındıran antik Aizanoi kenti ile Frigya Vadisi de görülmeye değer duraklardır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Kütahya'] },
  { id: 'usak', name: 'Uşak', city: 'Uşak', country: 'Türkiye', lat: 38.6823, lng: 29.4082, aliases: ['usak', 'uşak'], summary: 'Ege ile İç Anadolu’nun kavşağındaki Uşak, tarihî halı ve battaniye dokumacılığıyla ünlü, köklü bir Batı Anadolu kentidir. Lidya uygarlığının izlerini taşıyan topraklara sahiptir.\n\nLidya Kralı Karun’un efsanevi zenginliğinden kalan altın ve gümüş eserlerden oluşan ünlü “Karun Hazineleri”, kentin arkeoloji müzesinde sergilenir. Blaundos antik kenti, Ulubey Kanyonu ve geleneksel dokumacılığıyla Uşak, tarih ile doğayı bir arada sunar.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Uşak'] },
  { id: 'manisa', name: 'Manisa', city: 'Manisa', country: 'Türkiye', lat: 38.6191, lng: 27.4289, aliases: ['manisa', 'magnesia'], summary: 'Ege’nin verimli Gediz Ovası’na bakan Spil Dağı’nın eteğinde kurulu Manisa, Osmanlı şehzadelerinin yönetim deneyimi kazandığı bir “şehzadeler şehri” olarak tarihe geçmiştir. Antik çağlara uzanan köklü bir geçmişe sahiptir.\n\nHer yıl geleneksel Mesir Macunu Festivali’ne sahne olan tarihî camileri, mitolojik Ağlayan Kaya (Niobe) ve Lidya’nın başkenti antik Sardes kenti başlıca duraklardır. Üzümü ve zengin tarımıyla da anılan Manisa, tarih ile bereketi birleştirir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Manisa'] },
  { id: 'aydin', name: 'Aydın', city: 'Aydın', country: 'Türkiye', lat: 37.856, lng: 27.8416, aliases: ['aydin', 'aydın', 'kusadasi', 'kuşadası', 'didim'], summary: 'Ege Bölgesi’nin verimli Büyük Menderes Ovası’na yayılan Aydın, incir ve zeytin bahçeleriyle ünlü, aynı zamanda antik kentler bakımından Türkiye’nin en zengin illerinden biridir. Ilıman iklimi ve turkuaz kıyılarıyla turizmin kalbindedir.\n\nGörkemli Apollon Tapınağı’yla Didim, dünyanın en iyi korunmuş antik kentlerinden Afrodisias, ızgara planlı Priene ve büyük liman kenti Milet başlıca hazineleridir. Kuşadası tatil beldesi, plajları ve marinasıyla deniz turizminin de merkezidir.', sources: ['UNESCO World Heritage List — Aphrodisias', 'T.C. Kültür ve Turizm Bakanlığı — Aydın'] },
  { id: 'mugla', name: 'Muğla', city: 'Muğla', country: 'Türkiye', lat: 37.2153, lng: 28.3636, aliases: ['mugla', 'muğla', 'bodrum', 'fethiye', 'marmaris', 'dalyan'], summary: 'Türkiye’nin güneybatı ucundaki Muğla, turkuaz koyları, çam ormanlarıyla kaplı yarımadaları ve dünyaca ünlü tatil beldeleriyle ülkenin en gözde turizm bölgesidir. Yüzlerce kilometrelik girintili çıkıntılı kıyısı, mavi yolculukların kalbidir.\n\nGece hayatıyla Bodrum, marinasıyla Marmaris, göz alıcı lagünüyle Fethiye-Ölüdeniz, sakinliğiyle Datça ve Göcek başlıca beldeleridir. Antik Knidos, Kaunos kaya mezarları ve badem çiçekli Datça yarımadasıyla Muğla, deniz ile tarihi buluşturur.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Muğla', 'Lonely Planet — Bodrum'] },
  { id: 'denizli', name: 'Denizli', city: 'Denizli', country: 'Türkiye', lat: 37.7765, lng: 29.0864, aliases: ['denizli', 'pamukkale denizli'], summary: 'İç Ege’deki Denizli, dünyanın en olağanüstü doğa harikalarından birine, bembeyaz kalsiyum traverten teraslarıyla Pamukkale’ye ev sahipliği yapar. Bu benzersiz manzara, üzerindeki antik kentle birlikte UNESCO Dünya Mirası Listesi’ndedir.\n\nSıcak su kaynaklarının biriktirdiği pamuk beyazı travertenler, hemen yukarısındaki antik sağlık kenti Hierapolis ve “Kutsal Havuz” başlıca duraklardır. Yakınındaki Laodikeia antik kenti, horoz sembolü ve dokumacılığıyla Denizli zengin bir duraktır.', sources: ['UNESCO World Heritage List — Hierapolis-Pamukkale', 'T.C. Kültür ve Turizm Bakanlığı — Denizli'] },
  { id: 'balikesir', name: 'Balıkesir', city: 'Balıkesir', country: 'Türkiye', lat: 39.6484, lng: 27.8826, aliases: ['balikesir', 'balıkesir', 'ayvalik', 'ayvalık', 'edremit', 'cunda'], summary: 'Hem Marmara hem Ege denizlerine kıyısı olan Balıkesir, zeytinlikleri, körfezleri ve doğal güzellikleriyle Türkiye’nin en çok yönlü illerinden biridir. Kaz Dağları’nın (mitolojik İda Dağı) yüksek oksijenli havası bölgeye kimlik katar.\n\nZeytinyağıyla ünlü Ayvalık ve karşısındaki taş evli Cunda Adası, sakin Edremit Körfezi kıyıları ve yayla köyleri başlıca duraklardır. Sındırgı halısı, Susurluk ayranı ve Gönen kaplıcalarıyla Balıkesir, deniz ile doğayı bir arada sunar.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Balıkesir'] },
  { id: 'tekirdag', name: 'Tekirdağ', city: 'Tekirdağ', country: 'Türkiye', lat: 40.9781, lng: 27.5117, aliases: ['tekirdag', 'tekirdağ'], summary: 'Marmara Denizi’nin kuzey kıyısında, Trakya’nın verimli topraklarına kurulu Tekirdağ, ayçiçeği tarlaları, bağları ve sahil şeridiyle tanınır. Antik dönemden Osmanlı’ya uzanan köklü bir liman kenti geçmişine sahiptir.\n\nIzgarada pişirilen ünlü Tekirdağ köftesi, kentte üretilen rakısı ve Macar prensi Rákóczi’nin sürgün yıllarını geçirdiği ev-müzesi başlıca duraklardır. Şarköy’ün bağları ve plajları, deniz kıyısı balık lokantalarıyla Tekirdağ keyifli bir Trakya kentidir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Tekirdağ'] },
  { id: 'kirklareli', name: 'Kırklareli', city: 'Kırklareli', country: 'Türkiye', lat: 41.7355, lng: 27.2244, aliases: ['kirklareli', 'kırklareli', 'kiyikoy', 'kıyıköy'], summary: 'Trakya’nın kuzeyinde, Bulgaristan sınırında kurulu Kırklareli, Istranca (Yıldız) Dağları’nın yemyeşil ormanları ve el değmemiş Karadeniz kıyısıyla doğa turizminin gözde bir adresidir. Trakya kültürünün ve tarımının önemli bir merkezidir.\n\nKanyonu ve dev sarkıtlarıyla Dupnisa Mağarası, surları ve manastırıyla tarihî balıkçı kasabası Kıyıköy, Istranca ormanları ve yayla köyleri başlıca duraklardır. Hardaliyesi ve şarabıyla da anılan Kırklareli, sakin bir doğa kaçamağı sunar.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Kırklareli'] },
  { id: 'kocaeli', name: 'Kocaeli', city: 'İzmit', country: 'Türkiye', lat: 40.8533, lng: 29.8815, aliases: ['kocaeli', 'izmit', 'i̇zmit'], summary: 'Marmara’nın doğu ucunda, İzmit Körfezi kıyısında kurulu Kocaeli (İzmit), Türkiye’nin en önemli sanayi ve liman merkezlerinden biri olmasının yanı sıra tarih ve doğayı da barındırır. Antik Nikomedia olarak bir dönem Roma İmparatorluğu’na başkentlik yapmıştır.\n\nOsmanlı’dan kalma Saat Kulesi, tarihî konakları ve müzeleri kentin geçmişini taşır. Kış aylarında Kartepe kayak merkezi, yaz aylarında ise yemyeşil Maşukiye yaylaları ve alabalık lokantalarıyla Kocaeli, sanayi ile doğayı bir arada sunar.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Kocaeli'] },
  { id: 'sakarya', name: 'Sakarya', city: 'Adapazarı', country: 'Türkiye', lat: 40.7569, lng: 30.3783, aliases: ['sakarya', 'adapazari', 'adapazarı', 'sapanca'], summary: 'Marmara ile Karadeniz arasında, verimli Sakarya Ovası’na kurulu Sakarya (Adapazarı), gölleri, yaylaları ve yemyeşil doğasıyla İstanbul’a yakın popüler bir hafta sonu kaçamağıdır. Sakarya Nehri kente adını verir.\n\nDağların yansıdığı berrak Sapanca Gölü, alabalık lokantalarıyla ünlü Maşukiye, su samurlarına ev sahipliği yapan Acarlar Longozu (subasar ormanı) ve şelaleleri başlıca duraklardır. Doğa yürüyüşleri ve göl kıyısı kafeleriyle Sakarya huzurlu bir duraktır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Sakarya'] },
  { id: 'yalova', name: 'Yalova', city: 'Yalova', country: 'Türkiye', lat: 40.65, lng: 29.2667, aliases: ['yalova'], summary: 'Marmara Denizi’nin güney kıyısında, İstanbul’a feribotla yakın konumdaki küçük Yalova, şifalı termal kaynakları ve yeşil doğasıyla bir dinlence kentidir. Ilıman iklimi ve bahçeleriyle huzurlu bir atmosfer sunar.\n\nRomatizma ve cilt hastalıklarına iyi geldiğine inanılan Termal kaplıcaları, Atatürk’ün bir çınar ağacı için raylar üzerinde kaydırılan tarihî Yürüyen Köşk’ü ve Sudüşen Şelalesi başlıca duraklardır. Dağ köyleri ve deniz kıyısıyla Yalova, kısa bir kaçamak için idealdir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Yalova'] },
  { id: 'bilecik', name: 'Bilecik', city: 'Bilecik', country: 'Türkiye', lat: 40.1451, lng: 29.9799, aliases: ['bilecik', 'sogut', 'söğüt'], summary: 'Marmara ile İç Anadolu arasında kurulu Bilecik, Osmanlı Devleti’nin kuruluş topraklarından biri olarak Türk tarihinde özel bir yere sahiptir. Sakin dokusu ve tarihî köyleriyle geçmişe açılan bir penceredir.\n\nOsmanlı’nın kurucusu Osman Gazi’nin babası Ertuğrul Gazi’nin türbesinin bulunduğu Söğüt ilçesi, her yıl anma törenlerine sahne olur. Tarihî Osmaneli evleri, Şeyh Edebali Türbesi ve mermer ocaklarıyla Bilecik, kuruluş ruhunu yaşatan köklü bir kenttir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Bilecik'] },
  { id: 'eskisehir', name: 'Eskişehir', city: 'Eskişehir', country: 'Türkiye', lat: 39.7767, lng: 30.5206, aliases: ['eskisehir', 'eskişehir'], summary: 'İç Anadolu’nun kuzeybatısındaki Eskişehir, canlı öğrenci nüfusu, düzenli kent dokusu ve yenilikçi belediyeciliğiyle Türkiye’nin en modern ve yaşanası kentlerinden biri kabul edilir. Frigya uygarlığının izlerini taşıyan köklü bir geçmişe de sahiptir.\n\nPorsuk Çayı’nda gondol turları, rengârenk restore edilmiş Odunpazarı Osmanlı evleri, Sazova (Masal Şatosu) temalı parkı ve dünyaca ünlü lületaşı işçiliği başlıca cazibelerdir. Kafe kültürü ve enerjisiyle Eskişehir gençlik dolu bir kenttir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Eskişehir'] },
  { id: 'kayseri', name: 'Kayseri', city: 'Kayseri', country: 'Türkiye', lat: 38.7312, lng: 35.4787, aliases: ['kayseri', 'caesarea'], summary: 'İç Anadolu’da, sönmüş volkan Erciyes Dağı’nın eteğinde kurulu Kayseri, güçlü ticaret geleneği ve köklü tarihiyle tanınan büyük bir Anadolu kentidir. Selçuklu döneminin görkemli eserlerine ev sahipliği yapar.\n\nTarihî kalesi, taç kapılı Selçuklu medreseleri ve kümbetleri, kapalı çarşısı başlıca duraklardır. Kışın Erciyes kayak merkezi, yaz aylarında yaylalarıyla anılan kent; pastırması, sucuğu ve mantısıyla Türk mutfağının simge lezzetlerini sunar. Kapadokya’ya da yakındır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Kayseri'] },
  { id: 'nevsehir', name: 'Nevşehir', city: 'Nevşehir', country: 'Türkiye', lat: 38.6939, lng: 34.6857, aliases: ['nevsehir', 'nevşehir', 'kapadokya nevsehir'], summary: 'İç Anadolu’da, volkanik tüf kayaların binlerce yılda aşınmasıyla oluşan masalsı peyzajıyla Nevşehir, dünyaca ünlü Kapadokya bölgesinin kalbidir. Peri bacaları ve yer altı şehirleriyle benzersiz bir doğa ve tarih dokusu sunar.\n\nKayalara oyulmuş kilise ve manastırlarıyla Göreme Açık Hava Müzesi (UNESCO), Uçhisar ve Ortahisar kaya kaleleri, Derinkuyu-Kaymaklı yer altı şehirleri başlıca duraklardır. Gün doğumunda yüzlerce sıcak hava balonunun süzüldüğü manzara, Kapadokya’yı Türkiye’nin en büyülü destinasyonu yapar.', sources: ['UNESCO World Heritage List — Göreme and Cappadocia', 'T.C. Kültür ve Turizm Bakanlığı — Nevşehir'] },
  { id: 'nigde', name: 'Niğde', city: 'Niğde', country: 'Türkiye', lat: 37.9667, lng: 34.6833, aliases: ['nigde', 'niğde'], summary: 'İç Anadolu’nun güneyinde, Kapadokya ile Toroslar arasında kurulu Niğde, tarihî mirası ve el değmemiş doğasıyla tanınır. Volkanik topraklarında yetişen elması ve patatesiyle de ünlüdür.\n\nSarp zirveleri ve buzul gölleriyle Aladağlar Milli Parkı, kayaya oyulmuş fresklerle bezeli Gümüşler Manastırı ve krater gölü Narlıgöl başlıca duraklardır. Tarihî Alaeddin Camii ve kalesiyle Niğde, doğa yürüyüşçüleri ve tarih meraklıları için sakin bir duraktır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Niğde'] },
  { id: 'aksaray', name: 'Aksaray', city: 'Aksaray', country: 'Türkiye', lat: 38.3687, lng: 34.037, aliases: ['aksaray'], summary: 'İç Anadolu’da, Hasan Dağı’nın eteğinde ve Tuz Gölü’nün güneyinde kurulu Aksaray, Kapadokya bölgesinin batı kapısı sayılır. Kervan yollarının kavşağındaki konumu, ona zengin bir tarihî miras bırakmıştır.\n\nYamaçlarına kaya kiliseleri oyulmuş yemyeşil Ihlara Vadisi, dev bir kaya kütlesine oyulmuş Selime Katedrali ve Selçuklu döneminin en görkemli kervansaraylarından Sultanhanı başlıca duraklardır. Doğa ile tarihin buluştuğu Aksaray, Kapadokya turlarının önemli bir durağıdır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Aksaray (Ihlara)'] },
  { id: 'kirsehir', name: 'Kırşehir', city: 'Kırşehir', country: 'Türkiye', lat: 39.1425, lng: 34.1709, aliases: ['kirsehir', 'kırşehir'], summary: 'İç Anadolu’nun ortasında kurulu Kırşehir, Ahilik teşkilatının (esnaf dayanışması ve ahlak kurumu) doğduğu topraklar olarak Türk kültür tarihinde önemli bir yere sahiptir. Halk ozanları ve neşeli müzik geleneğiyle de anılır.\n\nSelçuklu döneminde astronomi gözlemevi olarak da kullanılan Cacabey Medresesi, Ahilik’in kurucusu Ahi Evran ile şair Aşık Paşa’nın türbeleri başlıca duraklardır. Terme ve Karakurt gibi şifalı termal kaynaklarıyla Kırşehir, kültür ile sağlık turizmini birleştirir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Kırşehir'] },
  { id: 'karaman', name: 'Karaman', city: 'Karaman', country: 'Türkiye', lat: 37.1811, lng: 33.2149, aliases: ['karaman'], summary: 'İç Anadolu’nun güneyinde, Toroslar’ın eteğinde kurulu Karaman, Türkçenin 1277’de Karamanoğlu Mehmet Bey tarafından resmî dil ilan edildiği kent olarak dil tarihimizde onurlu bir yere sahiptir. Karamanoğulları Beyliği’nin başkenti olmuştur.\n\nErken Hristiyanlık döneminden kalma yüzlerce kaya kilisesinin bulunduğu Binbir Kilise (Madenşehir), tarihî Karaman Kalesi ve mutasavvıf şair Yunus Emre’nin izleri başlıca duraklardır. Anadolu Türk kültürünün köklerini taşıyan Karaman, tarih dolu bir duraktır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Karaman'] },
  { id: 'kirikkale', name: 'Kırıkkale', city: 'Kırıkkale', country: 'Türkiye', lat: 39.8468, lng: 33.5153, aliases: ['kirikkale', 'kırıkkale'], summary: 'İç Anadolu’da, başkent Ankara’nın hemen doğusunda, Kızılırmak kıyısında kurulu Kırıkkale, Cumhuriyet döneminde sanayi ve silah fabrikalarıyla gelişmiş genç bir ildir. Anadolu’yu doğuya bağlayan yol güzergâhı üzerindedir.\n\nKızılırmak manzaralı Kapulukaya Barajı ve mesire alanları, tarihî köprüleri ve çevredeki Hitit dönemi izleriyle kent, doğa ve tarih için sakin duraklar sunar. Anadolu’nun kalbindeki konumuyla Kırıkkale, seyahat rotalarında keyifli bir moladır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Kırıkkale'] },
  { id: 'cankiri', name: 'Çankırı', city: 'Çankırı', country: 'Türkiye', lat: 40.6013, lng: 33.6134, aliases: ['cankiri', 'çankırı'], summary: 'İç Anadolu’nun kuzeyinde kurulu Çankırı, yeraltındaki olağanüstü tuz mağarasıyla ünlü, köklü bir Anadolu kentidir. Antik Gangra olarak tarih boyunca önemli bir yerleşim olmuştur.\n\nMilyonlarca yıllık tuz katmanlarının içine oyulmuş, tuz kristalleriyle parıldayan koridorlar ve salonlardan oluşan, astım hastalarına iyi geldiğine inanılan Tuz Mağarası kentin en büyük cazibesidir. Tarihî Taş Mescit, çarşısı ve tuzuyla Çankırı özgün bir duraktır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Çankırı'] },
  { id: 'yozgat', name: 'Yozgat', city: 'Yozgat', country: 'Türkiye', lat: 39.8181, lng: 34.8147, aliases: ['yozgat'], summary: 'İç Anadolu’nun doğusunda, yüksek bir platoya kurulu Yozgat, çam ormanları ve tarihî mirasıyla tanınan sakin bir Anadolu kentidir. Osmanlı döneminde Çapanoğlu ailesinin yönetiminde parlamıştır.\n\nŞehrin hemen yanı başındaki, Türkiye’nin il merkezine en yakın milli parklarından Çamlık Milli Parkı, ahşap işçiliğiyle görkemli Çapanoğlu Büyük Camii ve yakınındaki demir çağı kenti Kerkenes başlıca duraklardır. Şifalı Sarıkaya termal kaynaklarıyla da anılan Yozgat, huzurlu bir duraktır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Yozgat'] },
  { id: 'corum', name: 'Çorum', city: 'Çorum', country: 'Türkiye', lat: 40.5506, lng: 34.9556, aliases: ['corum', 'çorum', 'hattusa', 'hattuşa'], summary: 'İç Anadolu’nun kuzeyinde kurulu Çorum, dünya tarihinin en güçlü uygarlıklarından Hitit İmparatorluğu’nun kalbine ev sahipliği yapmasıyla tanınır. Bu köklü geçmiş, kenti bir arkeoloji hazinesi kılar.\n\nHitit İmparatorluğu’nun başkenti Hattuşa (UNESCO) devasa sur ve tapınak kalıntıları, kayalara işlenmiş tanrı kabartmalarıyla açık hava tapınağı Yazılıkaya ve zengin arkeoloji müzesi başlıca duraklardır. Kavrularak yapılan dünyaca ünlü leblebisi de kentin simgesidir.', sources: ['UNESCO World Heritage List — Hattusha (Boğazköy)', 'T.C. Kültür ve Turizm Bakanlığı — Çorum'] },
  { id: 'amasya', name: 'Amasya', city: 'Amasya', country: 'Türkiye', lat: 40.6499, lng: 35.8353, aliases: ['amasya'], summary: 'Karadeniz’in iç kesiminde, dar bir vadide Yeşilırmak’ın iki yakasına kurulu Amasya, kayalıklara yaslanmış tarihî konakları ve şiirsel dokusuyla Türkiye’nin en zarif kentlerinden biridir. Antik çağda Pontus Krallığı’nın başkenti, Osmanlı’da şehzadelerin eğitim yeriydi.\n\nNehre yansıyan Osmanlı dönemi Yalıboyu konakları, kayalara oyulmuş görkemli Pontus kral kaya mezarları, tepedeki Amasya Kalesi ve tarihî medreseleri başlıca duraklardır. Ünlü elması ve şehzadeler geçmişiyle Amasya, adeta bir açık hava müzesidir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Amasya'] },
  { id: 'tokat', name: 'Tokat', city: 'Tokat', country: 'Türkiye', lat: 40.3167, lng: 36.5544, aliases: ['tokat'], summary: 'Karadeniz ile İç Anadolu arasında, verimli bir vadide kurulu Tokat, tarihî kalesi, kervan yolu üzerindeki konumu ve zengin el sanatlarıyla tanınan köklü bir Anadolu kentidir. Selçuklu ve Osmanlı’dan pek çok eser barındırır.\n\nKente tepeden bakan tarihî Tokat Kalesi, sarkıt ve dikitleriyle dünyanın en görkemli mağaralarından sayılan Ballıca Mağarası ve asırlık ahşap kalıplarla kumaş desenleme sanatı “yazmacılık” başlıca öne çıkanlardır. Tokat kebabı ve bağlarıyla da anılır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Tokat'] },
  { id: 'sivas', name: 'Sivas', city: 'Sivas', country: 'Türkiye', lat: 39.7477, lng: 37.0179, aliases: ['sivas'], summary: 'İç Anadolu’nun doğusunda, geniş bir yayla üzerine kurulu Sivas, Kurtuluş Savaşı’na giden yolda toplanan tarihî Sivas Kongresi’yle Cumhuriyet tarihimizde onurlu bir yere sahiptir. Selçuklu döneminin en görkemli taş işçiliği örneklerini barındırır.\n\nDantel gibi işlenmiş taç kapılarıyla göz kamaştıran Çifte Minareli Medrese, Gök Medrese ve Şifaiye Medresesi başlıca duraklardır. İnsan derisindeki hastalıkları temizlediğine inanılan “doktor balıklarıyla” ünlü Kangal Balıklı Kaplıcası da kentin özgün bir cazibesidir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Sivas'] },
  { id: 'samsun', name: 'Samsun', city: 'Samsun', country: 'Türkiye', lat: 41.2867, lng: 36.33, aliases: ['samsun'], summary: 'Karadeniz kıyısının en büyük kenti Samsun, Kızılırmak ve Yeşilırmak deltalarının arasında, geniş ve verimli ovalara kurulu modern bir liman ve ticaret merkezidir. Türk tarihi için özel bir anlam taşır.\n\nMustafa Kemal Atatürk’ün 19 Mayıs 1919’da çıkarak Kurtuluş Savaşı’nı başlattığı kent, onu getiren Bandırma Vapuru replikası ve anıtlarıyla anılır. Uzun sahil şeridi, Amazon kadın savaşçıları temalı adası ve tarihî Amisos tepesiyle Samsun, tarih ile deniz keyfini birleştirir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Samsun'] },
  { id: 'ordu', name: 'Ordu', city: 'Ordu', country: 'Türkiye', lat: 40.9839, lng: 37.8764, aliases: ['ordu'], summary: 'Doğu Karadeniz kıyısında, fındık bahçeleriyle kaplı yeşil tepelerin denize indiği noktada kurulu Ordu, Türkiye’nin fındık üretiminin kalbidir. Sıcakkanlı halkı ve dingin sahil dokusuyla sevilen bir kenttir.\n\nTeleferikle çıkılan Boztepe’den izlenen körfez ve şehir manzarası, tarihî Paşaoğlu Konağı ve serin yaylaları (Çambaşı, Perşembe) başlıca duraklardır. Yeşil yaylaları, fındık bahçeleri ve deniz kıyısıyla Ordu, Karadeniz’in en şirin kentlerinden biridir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Ordu'] },
  { id: 'giresun', name: 'Giresun', city: 'Giresun', country: 'Türkiye', lat: 40.9128, lng: 38.3895, aliases: ['giresun'], summary: 'Doğu Karadeniz kıyısındaki Giresun, adını antik çağda buradan Avrupa’ya götürülen kirazdan (Latince cerasus) aldığı söylenen köklü bir liman kentidir. Fındık bahçeleri ve serin yaylalarıyla ünlüdür.\n\nKaradeniz’in Türk kıyılarındaki tek adası olan, efsanelere konu Giresun Adası, tepedeki tarihî kalesi ve manzarası ile Kümbet, Bektaş gibi yeşil yaylaları başlıca duraklardır. Aksu Festivali gelenekleri ve fındığıyla anılan Giresun, doğa ve tarih dolu bir duraktır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Giresun'] },
  { id: 'rize', name: 'Rize', city: 'Rize', country: 'Türkiye', lat: 41.0201, lng: 40.5234, aliases: ['rize', 'ayder', ' i̇kizdere'], summary: 'Doğu Karadeniz’in en yağışlı ve en yeşil köşesindeki Rize, sırtlarını dağlara yaslamış çay bahçeleriyle Türkiye’nin çay üretiminin merkezidir. Sisli yaylaları, coşkun dereleri ve bulutların içindeki köyleriyle büyüleyici bir doğaya sahiptir.\n\nBulutların üzerindeki Ayder Yaylası ve kaplıcaları, Fırtına Deresi üzerindeki zarif taş kemer köprüler, sarp bir kayaya kurulu Zil Kale ve Pokut gibi yaylalar başlıca duraklardır. Çay tarlaları, hamsisi ve muhlamasıyla Rize, Doğu Karadeniz’in yeşil cennetidir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Rize'] },
  { id: 'artvin', name: 'Artvin', city: 'Artvin', country: 'Türkiye', lat: 41.1828, lng: 41.8183, aliases: ['artvin', 'karagol', 'karagöl'], summary: 'Türkiye’nin kuzeydoğu ucunda, Çoruh Nehri’nin derin vadilerine ve sarp dağlara kurulu Artvin, “yeşilin bin tonu” olarak anılan olağanüstü doğasıyla ünlüdür. Kafkasya’ya komşu konumu, ona zengin bir kültürel çeşitlilik katar.\n\nSisli göller ve sararan ormanlarıyla Karagöl-Sahara Milli Parkı, geleneksel boğa güreşlerine sahne olan Kafkasör Yaylası, ortaçağdan kalma Gürcü kiliseleri ve Çoruh Nehri’nin dünyaca ünlü rafting parkurları başlıca cazibelerdir. El değmemiş doğasıyla Artvin bir keşif durağıdır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Artvin'] },
  { id: 'gumushane', name: 'Gümüşhane', city: 'Gümüşhane', country: 'Türkiye', lat: 40.4603, lng: 39.4814, aliases: ['gumushane', 'gümüşhane'], summary: 'Doğu Karadeniz’in iç kesiminde, dağların arasına kurulu Gümüşhane, adını tarihteki gümüş madenlerinden alan köklü bir kenttir. Yaylaları, mağaraları ve manastır kalıntılarıyla doğa ve tarih tutkunlarına hitap eder.\n\nDünyanın en büyük mağaralarından biri sayılan, ışıklandırılmış sarkıt ve dikitleriyle Karaca Mağarası, terk edilmiş taş evleriyle gizemli Santa Harabeleri ve serin Zigana ile Kadırga yaylaları başlıca duraklardır. Pestili ve kuşburnu ürünleriyle de anılan Gümüşhane, sakin bir dağ durağıdır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Gümüşhane'] },
  { id: 'bayburt', name: 'Bayburt', city: 'Bayburt', country: 'Türkiye', lat: 40.2552, lng: 40.2249, aliases: ['bayburt'], summary: 'Doğu Anadolu’nun kuzeyinde, Çoruh Nehri kıyısında kurulu Bayburt, Türkiye’nin en küçük illerinden biri olmasına karşın görkemli tarihî mirasıyla dikkat çeker. Kervan yolları üzerindeki konumu ona stratejik bir önem kazandırmıştır.\n\nKenti gözeten, Anadolu’nun en büyük kalelerinden biri olan tarihî Bayburt Kalesi ve çağdaş sanatı Anadolu’ya taşıyan Baksı Müzesi başlıca duraklardır. Ehram dokuması, yaylaları ve tarih kokan sokaklarıyla Bayburt, keşfedilmeyi bekleyen sakin bir duraktır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Bayburt'] },
  { id: 'sinop', name: 'Sinop', city: 'Sinop', country: 'Türkiye', lat: 42.0231, lng: 35.1531, aliases: ['sinop'], summary: 'Türkiye’nin en kuzey ucundaki yarımadaya kurulu Sinop, korunaklı doğal limanı ve tarih boyunca stratejik konumuyla köklü bir Karadeniz kentidir. Kinik filozof Diogenes’in doğduğu yer olmasıyla da anılır.\n\nUzun yıllar hapishane olarak kullanılan tarihî Sinop Cezaevi, antik surları ve kalesi, şirin balıkçı limanı ve müzeleri başlıca duraklardır. Sakin plajları, deniz ürünü lokantaları ve huzurlu atmosferiyle Sinop, dinlendirici bir Karadeniz kaçamağıdır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Sinop'] },
  { id: 'kastamonu', name: 'Kastamonu', city: 'Kastamonu', country: 'Türkiye', lat: 41.3887, lng: 33.7827, aliases: ['kastamonu'], summary: 'Batı Karadeniz’in iç kesiminde, ormanlarla çevrili Kastamonu, olağanüstü korunmuş tarihî konakları ve köklü Osmanlı dokusuyla tanınan bir kenttir. Kurtuluş Savaşı’nda ve şapka devriminde önemli bir rol oynamıştır.\n\nKente tepeden bakan tarihî kalesi, anıtsal Nasrullah Camii, ahşap konakları ve müzeleri başlıca duraklardır. Yakınındaki, çivi kullanılmadan yapılmış UNESCO korumalı ahşap Mahmutbey Camii (Kasaba köyü) ve Ilgaz Dağı kayak merkeziyle Kastamonu, tarih ve doğayı birleştirir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Kastamonu'] },
  { id: 'karabuk', name: 'Karabük (Safranbolu)', city: 'Safranbolu', country: 'Türkiye', lat: 41.2061, lng: 32.6204, aliases: ['karabuk', 'karabük', 'safranbolu'], summary: 'Batı Karadeniz’de kurulu Karabük, dünyaca ünlü Safranbolu ilçesiyle özdeşleşmiştir. Bir zamanlar İpek Yolu üzerindeki zengin bir ticaret kasabası olan Safranbolu, olağanüstü korunmuş Osmanlı kent dokusuyla adeta zamanda donmuştur.\n\nCumbalı ahşap Osmanlı konakları, tarihî çarşısı (Arasta), hamamları ve hanlarıyla Safranbolu bütünüyle UNESCO Dünya Mirası Listesi’ndedir. Adını verdiği değerli safran baharatı, lokumu ve yaşayan tarih dokusuyla kent, bir açık hava müzesi gibidir.', sources: ['UNESCO World Heritage List — City of Safranbolu', 'T.C. Kültür ve Turizm Bakanlığı — Karabük'] },
  { id: 'bartin', name: 'Bartın', city: 'Bartın', country: 'Türkiye', lat: 41.6344, lng: 32.3375, aliases: ['bartin', 'bartın', 'amasra'], summary: 'Batı Karadeniz kıyısında, adını taşıyan nehrin iki yakasına kurulu Bartın, tarihî ahşap evleri ve özellikle sahil ilçesi Amasra’sıyla ünlüdür. Yeşil ile mavinin buluştuğu doğal güzellikler sunar.\n\nİki koyu ve limanıyla kartpostal gibi bir yarımadaya kurulu Amasra; Roma-Bizans kalesi, taş sokakları ve balık lokantalarıyla Karadeniz’in en sevilen kasabalarından biridir. Bartın’ın tarihî çarşısı, ahşap konakları ve tel kırma işlemeleriyle bölge, tarih ile deniz keyfini birleştirir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Bartın (Amasra)'] },
  { id: 'zonguldak', name: 'Zonguldak', city: 'Zonguldak', country: 'Türkiye', lat: 41.4564, lng: 31.7987, aliases: ['zonguldak'], summary: 'Batı Karadeniz kıyısındaki Zonguldak, Türkiye’nin taşkömürü madenciliğinin kalbi olarak sanayi tarihinde önemli bir yere sahiptir. Sarp kıyıları, ormanları ve mağaralarıyla doğal güzellikler de barındırır.\n\nİçinde yeraltı nehri bulunan ve tekneyle gezilebilen Gökgöl Mağarası, tarih öncesi izler taşıyan Cehennemağzı Mağaraları ve Karadeniz’in dalgalı kıyıları başlıca duraklardır. Madencilik kültürünü anlatan müzeleri ve kıyı kasabalarıyla Zonguldak özgün bir duraktır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Zonguldak'] },
  { id: 'duzce', name: 'Düzce', city: 'Düzce', country: 'Türkiye', lat: 40.8438, lng: 31.1565, aliases: ['duzce', 'düzce'], summary: 'Batı Karadeniz ile Marmara arasında, verimli bir ovaya kurulu Düzce, şelaleleri, yaylaları ve el değmemiş ormanlarıyla doğa turizminin gözde bir adresidir. İstanbul ve Ankara’ya yakınlığıyla popüler bir kaçamaktır.\n\nBasamak basamak akan Güzeldere ve Samandere şelaleleri, yemyeşil Uğursuyu ve Aydınpınar tabiat alanları ile Karadeniz kıyısındaki Akçakoca’nın plajları başlıca duraklardır. Doğa yürüyüşleri, kamp alanları ve serin ormanlarıyla Düzce huzurlu bir doğa durağıdır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Düzce'] },
  { id: 'bolu', name: 'Bolu', city: 'Bolu', country: 'Türkiye', lat: 40.7392, lng: 31.6089, aliases: ['bolu', 'abant', 'kartalkaya', 'yedigoller', 'yedigöller'], summary: 'Batı Karadeniz’in iç kesiminde, sık ormanlar ve göllerle çevrili dağlara kurulu Bolu, Türkiye’nin en ünlü doğa kaçamaklarından biridir. Ayrıca aşçılık geleneğiyle ülke mutfağına usta şefler yetiştirmesiyle anılır.\n\nSisin üzerinde yüzen Abant Gölü, sonbaharda rengârenk yapraklarıyla büyüleyen yedi buzul göllü Yedigöller Milli Parkı ve Kartalkaya kayak merkezi başlıca duraklardır. Serin yaylaları, kaplıcaları ve doğa yürüyüşleriyle Bolu, dört mevsim ziyaretçi çeker.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Bolu'] },
  { id: 'malatya', name: 'Malatya', city: 'Malatya', country: 'Türkiye', lat: 38.3552, lng: 38.3095, aliases: ['malatya'], summary: 'Doğu Anadolu’nun batı kapısındaki Malatya, uçsuz bucaksız kayısı bahçeleriyle dünya kayısı üretiminin merkezidir; “kayısı diyarı” olarak anılır. Fırat’ın suladığı verimli ovaları ve köklü tarihiyle önemli bir kenttir.\n\nİnsanlık tarihinin en eski kentsel yerleşimlerinden ve devlet oluşumlarından biri olan, UNESCO korumasındaki Aslantepe Höyüğü, tarihî Battalgazi (Eski Malatya) surları ve Ulu Camii başlıca duraklardır. Nemrut Dağı’na açılan konumu ve kayısısıyla Malatya, tarih ile bereketi buluşturur.', sources: ['UNESCO World Heritage List — Arslantepe Mound', 'T.C. Kültür ve Turizm Bakanlığı — Malatya'] },
  { id: 'elazig', name: 'Elazığ', city: 'Elazığ', country: 'Türkiye', lat: 38.681, lng: 39.2264, aliases: ['elazig', 'elazığ', 'harput'], summary: 'Doğu Anadolu’da, Keban Barajı’nın oluşturduğu göllerle çevrili Elazığ, verimli ovaları ve köklü Harput mirasıyla tanınır. Çevresindeki su kütleleri kente özgün bir manzara katar.\n\nKentin üzerindeki tepede kurulu tarihî Harput mahallesi; kalesi, camileri ve konaklarıyla adeta bir açık hava müzesidir. Kıyısında fay hattının izlerini taşıyan turkuaz Hazar Gölü ve Keban Barajı başlıca duraklardır. Kirazı, gakguk türküleri ve orcik tatlısıyla Elazığ özgün bir kültür sunar.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Elazığ (Harput)'] },
  { id: 'tunceli', name: 'Tunceli', city: 'Tunceli', country: 'Türkiye', lat: 39.1079, lng: 39.5401, aliases: ['tunceli', 'dersim'], summary: 'Doğu Anadolu’da, sarp dağlar ve derin vadilerle çevrili Tunceli (Dersim), el değmemiş doğal güzellikleri ve özgün kültürüyle tanınır. Munzur Dağları’nın kaynak suları bölgeye kutsal bir anlam katar.\n\nBerrak turkuaz suları, gözeleri ve alabalıklarıyla Munzur Vadisi Milli Parkı, rafting parkurları ve dağ manzaraları başlıca cazibelerdir. Doğa yürüyüşü ve fotoğrafçılık için eşsiz olanaklar sunan Tunceli, Anadolu’nun en bakir köşelerinden biridir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Tunceli (Munzur)'] },
  { id: 'bingol', name: 'Bingöl', city: 'Bingöl', country: 'Türkiye', lat: 38.8853, lng: 40.4966, aliases: ['bingol', 'bingöl'], summary: 'Doğu Anadolu’da, adının anlamına (“bin göl”) uygun biçimde buzul göletleri ve yaylalarla dolu Bingöl, dağlık coğrafyası ve doğal güzellikleriyle tanınır. Yüksek platoları ve kaplıcaları öne çıkar.\n\nZirvelerdeki buzul gölleriyle Bingöl (Yüzengöller) Dağı, şifalı Kös ve Ilıcalar kaplıcaları ve serin yaylaları başlıca duraklardır. Balı, doğal kaynak suları ve el değmemiş dağ manzaralarıyla Bingöl, doğa tutkunları için sakin bir keşif durağıdır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Bingöl'] },
  { id: 'mus', name: 'Muş', city: 'Muş', country: 'Türkiye', lat: 38.9462, lng: 41.7539, aliases: ['mus', 'muş'], summary: 'Doğu Anadolu’da, geniş bir ovaya bakan yamaca kurulu Muş, ilkbaharda ovayı mor renge boyayan menekşeleri ve lalezarlarıyla ünlüdür. Murat Nehri’nin suladığı verimli topraklara sahiptir.\n\nİlkbaharda çiçek açan geniş ovası, Murat Nehri kanyonu, tarihî Muş Kalesi ve Selçuklu eseri Ulu Camii başlıca duraklardır. Malazgirt Zaferi’nin yaşandığı topraklara yakınlığı ve doğal güzellikleriyle Muş, tarih ile doğayı birleştiren bir Doğu Anadolu kentidir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Muş'] },
  { id: 'bitlis', name: 'Bitlis', city: 'Bitlis', country: 'Türkiye', lat: 38.4006, lng: 42.1095, aliases: ['bitlis', 'ahlat', 'nemrut krater'], summary: 'Doğu Anadolu’da, dar bir vadide dik yamaçlara kurulu tarihî taş evleriyle Bitlis, köklü geçmişi ve çevresindeki doğal harikalarla tanınır. Van Gölü’ne yakın konumu ona stratejik bir önem katar.\n\nSönmüş bir yanardağın ağzındaki devasa Nemrut Krater Gölü, Selçuklu dönemi anıtsal mezar taşlarıyla ünlü Ahlat, tarihî Bitlis Kalesi ve kervansarayları başlıca duraklardır. Büryan kebabı ve tütünüyle de anılan Bitlis, tarih ve doğa dolu bir duraktır.', sources: ['UNESCO Tentative List — Ahlat', 'T.C. Kültür ve Turizm Bakanlığı — Bitlis'] },
  { id: 'van', name: 'Van', city: 'Van', country: 'Türkiye', lat: 38.4891, lng: 43.4089, aliases: ['van'], summary: 'Doğu Anadolu’da, Türkiye’nin en büyük gölü olan Van Gölü’nün kıyısında kurulu Van, binlerce yıllık Urartu uygarlığının merkezi olarak köklü bir tarihe sahiptir. Gölün eşsiz manzarası ve zengin kültürüyle bölgenin en önemli kentlerindendir.\n\nGölün ortasındaki adada yükselen, kabartmalarıyla ünlü 10. yüzyıldan kalma Akdamar Kilisesi ve Urartu başkenti Tuşpa’dan kalan tarihî Van Kalesi başlıca duraklardır. Zengin serpme kahvaltısı ve beyaz tüylü, mavi-sarı gözlü Van kedisiyle Van, tarih ile doğal güzelliği buluşturur.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Van (Akdamar)'] },
  { id: 'hakkari', name: 'Hakkâri', city: 'Hakkâri', country: 'Türkiye', lat: 37.5744, lng: 43.7408, aliases: ['hakkari', 'hakkâri', 'cilo'], summary: 'Türkiye’nin dağlık güneydoğu ucunda, sarp zirveler ve derin vadilerle çevrili Hakkâri, buzullarıyla ve el değmemiş doğasıyla dağcıların ve doğa tutkunlarının gözdesidir. Yüksek rakımı ona görkemli bir manzara kazandırır.\n\nBuzul gölleri ve zirveleriyle Cilo-Sat Dağları (Buzul Dağı), Türkiye’nin en yüksek şelalelerinden sayılan çağlayanları ve serin yaylaları başlıca doğal cazibelerdir. Kilim ve el sanatlarıyla da anılan Hakkâri, Türkiye’nin en görkemli dağ manzaralarından bazılarını sunar.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Hakkâri'] },
  { id: 'siirt', name: 'Siirt', city: 'Siirt', country: 'Türkiye', lat: 37.9333, lng: 41.95, aliases: ['siirt'], summary: 'Güneydoğu Anadolu’da kurulu Siirt, dokuma ve el sanatları gelenekleri, köklü ilim geçmişi ve zengin mutfağıyla tanınır. Tarihî yapıları ve çevredeki kutsal mekânlarıyla manevi bir dokuya sahiptir.\n\nTiftik keçilerinden dokunan ünlü Siirt battaniyesi, fıstığı, tarihî Ulu Camii ve bilim insanlarının yetiştiği Aydınlar (Tillo) ilçesi ile evliya türbeleri başlıca öne çıkanlardır. Perde pilavı ve büryan kebabıyla da anılan Siirt, özgün bir Güneydoğu kentidir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Siirt'] },
  { id: 'sirnak', name: 'Şırnak', city: 'Şırnak', country: 'Türkiye', lat: 37.5164, lng: 42.4611, aliases: ['sirnak', 'şırnak', 'cizre'], summary: 'Güneydoğu Anadolu’da, Cudi Dağı’nın eteğinde kurulu Şırnak, dağlık coğrafyası ve efsanelerle örülü köklü tarihiyle tanınan bir sınır kentidir. Suriye ve Irak’a komşu konumu ona kavşak niteliği kazandırır.\n\nDicle kıyısındaki tarihî Cizre ilçesi; Nuh’un Gemisi ve mezarı efsaneleri, tarihî Kırmızı Medrese (Medresa Sor) ve köprüsüyle bölgenin en önemli kültür noktalarındandır. Tufan efsanelerine konu Cudi Dağı ve el sanatlarıyla Şırnak, mitoloji dolu bir duraktır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Şırnak'] },
  { id: 'batman', name: 'Batman', city: 'Batman', country: 'Türkiye', lat: 37.8812, lng: 41.1351, aliases: ['batman', 'hasankeyf'], summary: 'Güneydoğu Anadolu’da, Dicle Nehri’nin bir kolu üzerinde kurulu Batman, petrolüyle hızla büyüyen genç bir kent olsa da çevresinde binlerce yıllık tarihî hazineler barındırır. Antik ile modern burada iç içedir.\n\nDicle kıyısındaki, mağara evleri ve minaresiyle ünlü binlerce yıllık Hasankeyf (bir bölümü baraj gölü nedeniyle taşınmıştır) ve Anadolu’nun en büyük taş kemerli köprülerinden Malabadi Köprüsü başlıca duraklardır. Tarihî yapılar ve doğal güzelliklerle Batman, zengin bir çevreye açılan bir üstür.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Batman (Hasankeyf)'] },
  { id: 'diyarbakir', name: 'Diyarbakır', city: 'Diyarbakır', country: 'Türkiye', lat: 37.9144, lng: 40.2306, aliases: ['diyarbakir', 'diyarbakır', 'amed'], summary: 'Güneydoğu Anadolu’nun kalbinde, Dicle Nehri kıyısında kurulu Diyarbakır, bazalt taşından örülü görkemli kara surlarıyla dünyaca ünlü, binlerce yıllık bir Mezopotamya kentidir. Çin Seddi’nden sonra dünyanın en uzun ikinci surları burada yükselir.\n\nSurları ve nehir kıyısındaki Hevsel Bahçeleri UNESCO Dünya Mirası Listesi’ndedir. Farklı mimarilerin buluştuğu tarihî Ulu Camii, geleneksel avlulu taş konaklar ve Dicle üzerindeki On Gözlü Köprü başlıca duraklardır. Karpuzu ve zengin mutfağıyla da anılan Diyarbakır köklü bir kültür merkezidir.', sources: ['UNESCO World Heritage List — Diyarbakır Fortress and Hevsel Gardens', 'T.C. Kültür ve Turizm Bakanlığı — Diyarbakır'] },
  { id: 'mardin', name: 'Mardin', city: 'Mardin', country: 'Türkiye', lat: 37.3212, lng: 40.7245, aliases: ['mardin'], summary: 'Güneydoğu Anadolu’da, Mezopotamya ovasına bakan bir yamaca basamak basamak kurulu Mardin, bal rengi taş evleri ve çok kültürlü dokusuyla adeta bir açık hava müzesidir. Farklı din ve dillerin yüzyıllardır bir arada yaşadığı eşsiz bir kenttir.\n\nOvaya bakan taş konakları ve dar sokakları, telkâri (gümüş tel işçiliği) sanatı, tarihî Deyrulzafaran Süryani Manastırı ve medreseleri başlıca duraklardır. Yakınındaki tarih öncesi tapınak Göbeklitepe’ye yakınlığı ve zengin mutfağıyla Mardin, büyüleyici bir kültür durağıdır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Mardin', 'Lonely Planet — Mardin'] },
  { id: 'sanliurfa', name: 'Şanlıurfa', city: 'Şanlıurfa', country: 'Türkiye', lat: 37.1591, lng: 38.7969, aliases: ['sanliurfa', 'şanlıurfa', 'urfa', 'gobeklitepe sehir'], summary: 'Güneydoğu Anadolu’da kurulu Şanlıurfa, birçok peygamberin izini taşıdığına inanılan geçmişiyle “Peygamberler Şehri” olarak anılır. İnsanlık tarihi açısından da olağanüstü bir öneme sahiptir.\n\nBilinen en eski tapınak yapısı olan ve tarihi yeniden yazan, UNESCO korumasındaki Göbeklitepe, Hz. İbrahim’in ateşe atıldığı yerde oluştuğuna inanılan kutsal Balıklıgöl, tarihî çarşıları ve kalesi başlıca duraklardır. Sıra geceleri, çiğ köftesi ve zengin mutfağıyla Şanlıurfa köklü bir kültür merkezidir.', sources: ['UNESCO World Heritage List — Göbekli Tepe', 'T.C. Kültür ve Turizm Bakanlığı — Şanlıurfa'] },
  { id: 'adiyaman', name: 'Adıyaman', city: 'Adıyaman', country: 'Türkiye', lat: 37.7648, lng: 38.2786, aliases: ['adiyaman', 'adıyaman', 'nemrut adiyaman'], summary: 'Güneydoğu Anadolu’da kurulu Adıyaman, zirvesindeki devasa heykelleriyle dünyaca ünlü Nemrut Dağı’na ev sahipliği yapmasıyla tanınır. Antik Kommagene Krallığı’nın görkemli mirasını barındırır.\n\nGün doğumu ve batımında büyüleyici bir manzara sunan, dev tanrı-kral heykelleriyle bezeli Nemrut Dağı tümülüsü (UNESCO), Roma dönemi Cendere Köprüsü ve Kommagene kalıntıları başlıca duraklardır. Tarih tutkunları için Adıyaman, açık hava bir uygarlık müzesi gibidir.', sources: ['UNESCO World Heritage List — Nemrut Dağ', 'T.C. Kültür ve Turizm Bakanlığı — Adıyaman'] },
  { id: 'erzurum', name: 'Erzurum', city: 'Erzurum', country: 'Türkiye', lat: 39.9, lng: 41.27, aliases: ['erzurum'], summary: 'Doğu Anadolu’nun yüksek platosunda kurulu Erzurum, sert kışları, köklü tarihi ve görkemli Selçuklu eserleriyle tanınan bölgenin en büyük kentlerindendir. Kurtuluş Savaşı’na giden yolda toplanan Erzurum Kongresi’yle de tarihe geçmiştir.\n\nİkiz minareleri ve taş işçiliğiyle simge yapı Çifte Minareli Medrese, Selçuklu mezar anıtları Üç Kümbetler ve tarihî kalesi başlıca duraklardır. Türkiye’nin önemli kış sporları merkezlerinden Palandöken kayak merkezi ve şişte pişen cağ kebabıyla Erzurum, tarih ile kışı buluşturur.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Erzurum'] },
  { id: 'erzincan', name: 'Erzincan', city: 'Erzincan', country: 'Türkiye', lat: 39.75, lng: 39.5, aliases: ['erzincan', 'kemaliye'], summary: 'Doğu Anadolu’da, Fırat’ın kollarının suladığı verimli bir ovaya kurulu Erzincan, çevresindeki görkemli kanyonları ve doğal güzellikleriyle tanınır. Tarih boyunca depremler ve yeniden doğuşlarla anılan köklü bir kenttir.\n\nSarp kayalara oyulmuş “Taş Yolu” ile ünlü, tarihî taş evleriyle Kemaliye (Eğin) ve Karanlık Kanyon, Ergan Dağı kayak merkezi başlıca duraklardır. Dünyaca ünlü tulum peyniri, bakır işçiliği ve doğal güzellikleriyle Erzincan, doğa ve lezzet dolu bir duraktır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Erzincan'] },
  { id: 'kars', name: 'Kars', city: 'Kars', country: 'Türkiye', lat: 40.6013, lng: 43.0975, aliases: ['kars', 'ani'], summary: 'Doğu Anadolu’nun yüksek yaylalarında kurulu Kars, Baltık esintili taş mimarisi, zengin tarihi ve peynir gelenekleriyle özgün bir sınır kentidir. Rus yönetiminde geçirdiği dönem, kente Avrupai bir doku bırakmıştır.\n\nBir zamanlar “bin bir kilise şehri” olarak anılan, görkemli kalıntılarıyla antik Ani harabeleri (UNESCO), Baltık mimarili taş konaklar ve tarihî Kars Kalesi başlıca duraklardır. Kaz eti, gravyer peyniri, balı ve Sarıkamış kayak merkeziyle Kars, tarih ve doğa dolu bir duraktır.', sources: ['UNESCO World Heritage List — Archaeological Site of Ani', 'T.C. Kültür ve Turizm Bakanlığı — Kars'] },
  { id: 'ardahan', name: 'Ardahan', city: 'Ardahan', country: 'Türkiye', lat: 41.1105, lng: 42.7022, aliases: ['ardahan', 'cildir', 'çıldır'], summary: 'Doğu Anadolu’nun kuzeydoğu ucunda, yüksek yaylalara kurulu Ardahan, sert iklimi, uçsuz bucaksız çayırları ve el değmemiş doğasıyla tanınır. Gürcistan sınırındaki konumu ona kavşak niteliği katar.\n\nKışın buz tutan ve üzerinde atlı kızak turları yapılan Çıldır Gölü, gür Ardahan yaylaları ve şelaleleri başlıca cazibelerdir. Kaşar peyniri, balı ve bakir dağ manzaralarıyla Ardahan, doğa tutkunları için sakin ve otantik bir keşif durağıdır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Ardahan'] },
  { id: 'igdir', name: 'Iğdır', city: 'Iğdır', country: 'Türkiye', lat: 39.888, lng: 44.0048, aliases: ['igdir', 'iğdır'], summary: 'Doğu Anadolu’nun en doğu ucunda, Türkiye’nin çatısı Ağrı Dağı’nın eteğine kurulu Iğdır, ılıman mikroklimasıyla bölgenin diğer illerinden ayrılan verimli bir ovaya sahiptir. Azerbaycan, Ermenistan ve İran’a komşu bir sınır kentidir.\n\nKarlı Ağrı Dağı’nın nefes kesen manzarası, dağ tırmanışlarına açılan konumu, kayısı ve pamuk yetişen verimli ovası başlıca öne çıkanlardır. Türkiye’nin Nahçıvan ile tek kara bağlantısına yakınlığı ve tarih boyunca kavşak olmasıyla Iğdır, doğa ve kültür açısından özgün bir kenttir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Iğdır'] },
  { id: 'agri', name: 'Ağrı', city: 'Ağrı', country: 'Türkiye', lat: 39.7191, lng: 43.0503, aliases: ['agri', 'ağrı', 'agri dagi', 'ararat'], summary: 'Doğu Anadolu’nun en doğusunda kurulu Ağrı, üzerinde Türkiye’nin en yüksek zirvesi olan görkemli Ağrı Dağı’nı (Ararat) barındırmasıyla dünyaca ünlüdür. Nuh’un Gemisi efsaneleriyle özdeşleşen bu dağ, kente mistik bir hava katar.\n\n5.137 metrelik karlı zirvesiyle Ağrı Dağı, Doğubayazıt’taki masalsı İshak Paşa Sarayı ve dünyanın en büyük ikinci göktaşı çukurlarından biri olan Meteor Çukuru başlıca duraklardır. Dağcıların hayali olan zirveye tırmanışlarıyla Ağrı, doğa ve efsane dolu bir duraktır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Ağrı (İshak Paşa)'] },

  // ============= TÜRKİYE — SINIR GİRİŞ/ÇIKIŞ KAPILARI =============
  {
    id: 'kapikule',
    name: 'Kapıkule Sınır Kapısı',
    city: 'Edirne',
    country: 'Türkiye',
    lat: 41.7186,
    lng: 26.34,
    aliases: ['kapikule', 'kapıkule', 'kapitan andreevo'],
    summary:
      'Türkiye’nin Bulgaristan’a (ve Avrupa’ya) açılan en büyük ve en işlek kara sınır kapısıdır; karşı tarafta Bulgaristan’ın Kapitan Andreevo kapısı yer alır. Edirne’ye yaklaşık 18 km uzaklıktadır ve Avrupa’ya karayolu seyahatlerinin ana güzergâhıdır. Yoğun dönemlerde bekleme süreleri uzayabilir.',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
      'Emniyet Genel Müdürlüğü — Sınır Kapıları',
    ],
  },
  {
    id: 'hamzabeyli',
    name: 'Hamzabeyli Sınır Kapısı',
    city: 'Edirne',
    country: 'Türkiye',
    lat: 41.9772,
    lng: 26.6839,
    aliases: ['hamzabeyli', 'lesovo'],
    summary:
      'Edirne’nin kuzeyinde, Türkiye’yi Bulgaristan’ın Lesovo kapısına bağlayan sınır kapısıdır. Kapıkule’ye alternatif olarak, özellikle yoğun dönemlerde tercih edilir.',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },
  {
    id: 'dereko',
    name: 'Dereköy Sınır Kapısı',
    city: 'Kırklareli',
    country: 'Türkiye',
    lat: 41.926,
    lng: 27.546,
    aliases: ['dereko', 'dereköy', 'malko tarnovo'],
    summary:
      'Kırklareli’nde, Türkiye’yi Bulgaristan’ın Malko Tarnovo kapısına bağlayan sınır kapısıdır. Istranca Dağları üzerinden geçen, Karadeniz kıyısına yakın alternatif bir güzergâhtır.',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },
  {
    id: 'ipsala',
    name: 'İpsala Sınır Kapısı',
    city: 'Edirne',
    country: 'Türkiye',
    lat: 40.9268,
    lng: 26.3878,
    aliases: ['ipsala', 'i̇psala', 'kipoi'],
    summary:
      'Edirne’nin İpsala ilçesinde, Türkiye’yi Yunanistan’ın Kipoi kapısına bağlayan sınır kapısıdır. Yunanistan ve Batı Avrupa’ya (Meriç Nehri üzerinden) karayolu geçişlerinin başlıca noktasıdır.',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },
  {
    id: 'sarp',
    name: 'Sarp Sınır Kapısı',
    city: 'Artvin',
    country: 'Türkiye',
    lat: 41.514,
    lng: 41.548,
    aliases: ['sarp', 'sarpi'],
    summary:
      'Karadeniz kıyısında, Artvin’in Hopa ilçesine bağlı Sarp’ta yer alan; Türkiye’yi Gürcistan’ın Sarpi kapısına bağlayan sınır kapısıdır. Kafkaslara ve Batum’a açılan ana geçiştir.',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },
  {
    id: 'turkgozu',
    name: 'Türkgözü Sınır Kapısı',
    city: 'Ardahan',
    country: 'Türkiye',
    lat: 41.42,
    lng: 42.85,
    aliases: ['turkgozu', 'türkgözü', 'kartsakhi'],
    summary:
      'Ardahan’ın Posof ilçesinde, Türkiye’yi Gürcistan’ın Kartsakhi kapısına bağlayan sınır kapısıdır. Tiflis yönüne iç bölgelerden geçiş sağlar.',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },
  {
    id: 'gurbulak',
    name: 'Gürbulak Sınır Kapısı',
    city: 'Ağrı',
    country: 'Türkiye',
    lat: 39.382,
    lng: 44.348,
    aliases: ['gurbulak', 'gürbulak', 'bazargan'],
    summary:
      'Ağrı’nın Doğubayazıt ilçesinde, Ağrı Dağı eteğinde; Türkiye’yi İran’ın Bazargan kapısına bağlayan en işlek doğu sınır kapısıdır. İran’a karayolu geçişinin ana noktasıdır.',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },
  {
    id: 'kapikoy',
    name: 'Kapıköy Sınır Kapısı',
    city: 'Van',
    country: 'Türkiye',
    lat: 38.72,
    lng: 44.35,
    aliases: ['kapikoy', 'kapıköy', 'razi'],
    summary:
      'Van’ın Saray ilçesinde, Türkiye’yi İran’ın Razi kapısına bağlayan sınır kapısıdır. Demiryolu bağlantısıyla da öne çıkar.',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },
  {
    id: 'esendere',
    name: 'Esendere Sınır Kapısı',
    city: 'Hakkâri',
    country: 'Türkiye',
    lat: 38.3,
    lng: 44.55,
    aliases: ['esendere', 'sero'],
    summary:
      'Hakkâri’nin Yüksekova ilçesinde, Türkiye’yi İran’ın Sero kapısına bağlayan güneydoğu sınır kapısıdır.',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },
  {
    id: 'habur',
    name: 'Habur Sınır Kapısı',
    city: 'Şırnak',
    country: 'Türkiye',
    lat: 37.135,
    lng: 42.453,
    aliases: ['habur', 'ibrahim khalil', 'i̇brahim halil'],
    summary:
      'Şırnak’ın Silopi ilçesinde, Türkiye’yi Irak’ın (Kürt Bölgesi) İbrahim Halil kapısına bağlayan, ticaretin yoğun olduğu güney sınır kapısıdır.',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },
  {
    id: 'cilvegozu',
    name: 'Cilvegözü Sınır Kapısı',
    city: 'Hatay',
    country: 'Türkiye',
    lat: 36.22,
    lng: 36.68,
    aliases: ['cilvegozu', 'cilvegözü', 'bab al-hawa'],
    summary:
      'Hatay’ın Reyhanlı ilçesinde, Türkiye’yi Suriye’nin Bab el-Hava kapısına bağlayan sınır kapısıdır. (Geçiş durumu güncel koşullara göre değişebilir.)',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },
  {
    id: 'oncupinar',
    name: 'Öncüpınar Sınır Kapısı',
    city: 'Kilis',
    country: 'Türkiye',
    lat: 36.66,
    lng: 37.12,
    aliases: ['oncupinar', 'öncüpınar', 'bab al-salam'],
    summary:
      'Kilis’te, Türkiye’yi Suriye’nin Bab es-Selam kapısına bağlayan sınır kapısıdır. (Geçiş durumu güncel koşullara göre değişebilir.)',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },
  {
    id: 'dilucu',
    name: 'Dilucu Sınır Kapısı',
    city: 'Iğdır',
    country: 'Türkiye',
    lat: 39.61,
    lng: 44.98,
    aliases: ['dilucu', 'nahcivan', 'nahçıvan', 'sadarak'],
    summary:
      'Iğdır’ın Aralık ilçesinde, Türkiye’yi Azerbaycan’ın Nahçıvan Özerk Cumhuriyeti’ne (Sederek) bağlayan sınır kapısıdır. Türkiye’nin Azerbaycan ile tek doğrudan kara bağlantısıdır.',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },

  // ===================== AVRUPA — ŞEHİRLER =====================
  // --- Fransa ---
  {
    id: 'paris',
    name: 'Paris',
    city: 'Paris',
    country: 'Fransa',
    lat: 48.8566,
    lng: 2.3522,
    aliases: ['paris', 'pari'],
    summary:
      'Işık Şehri Paris, yüzyıllardır sanatın, modanın, felsefenin ve romantizmin dünya başkenti olmuş; Fransız tarihinin ve devriminin de kalbinde yer almıştır. Seine Nehri’nin iki yakasına yayılan kent, zarif bulvarları ve anıtsal mimarisiyle bir açık hava müzesi gibidir.\n\nEyfel Kulesi, dünyanın en büyük müzelerinden Louvre, gotik Notre-Dame Katedrali, Champs-Élysées Bulvarı ve sanatçıların uğrağı Montmartre tepesi başlıca simgeleridir. Kafeleri, pastaneleri ve Seine kıyısı yürüyüşleriyle Paris, dünyanın en çok ziyaret edilen şehirlerinden biridir.',
    sources: ['UNESCO World Heritage List — Paris, Banks of the Seine', 'Lonely Planet — Paris'],
  },
  {
    id: 'nice',
    name: 'Nice',
    city: 'Nice',
    country: 'Fransa',
    lat: 43.7102,
    lng: 7.262,
    aliases: ['nice', 'nis fransa', 'cote dazur'],
    summary:
      'Fransız Rivierası’nın (Côte d’Azur) parlayan incisi Nice, ılıman iklimi ve turkuaz deniziyle 19. yüzyıldan beri Avrupa seçkinlerinin gözde kışlık durağı olmuştur. Uzun süre İtalyan etkisi taşıyan kent, kendine özgü bir Akdeniz kimliği sunar.\n\nDeniz boyunca uzanan ünlü Promenade des Anglais, renkli binaları ve pazarıyla Eski Şehir (Vieux Nice) ve tepedeki kale manzarası başlıca cazibelerdir. Nice ayrıca Monako, Cannes, Antibes ve kartpostal köyü Èze’e açılan mükemmel bir üstür.',
    sources: ['Lonely Planet — Nice', 'Explore Nice Côte d’Azur — resmi turizm'],
  },
  {
    id: 'lyon',
    name: 'Lyon',
    city: 'Lyon',
    country: 'Fransa',
    lat: 45.764,
    lng: 4.8357,
    aliases: ['lyon', 'lugdunum'],
    summary:
      'Rhône ve Saône nehirlerinin buluştuğu Lyon, Roma döneminden Rönesans’a ve ipek ticaretine uzanan iki bin yıllık zengin bir geçmişe sahip Fransa’nın ikinci büyük metropolüdür. Tarihî bölgeleri UNESCO Dünya Mirası Listesi’ndedir.\n\nRönesans dokulu Vieux Lyon, ipek işçilerinin kullandığı gizli geçitler (traboules), tepedeki Fourvière Bazilikası ve Roma tiyatroları kentin öne çıkanlarıdır. Geleneksel “bouchon” lokantaları ve köklü mutfağıyla Lyon, Fransa’nın gastronomi başkenti olarak da anılır.',
    sources: ['UNESCO World Heritage List — Historic Site of Lyon', 'Lonely Planet — Lyon'],
  },
  {
    id: 'marseille',
    name: 'Marsilya',
    city: 'Marseille',
    country: 'Fransa',
    lat: 43.2965,
    lng: 5.3698,
    aliases: ['marsilya', 'marseille'],
    summary:
      'Fransa’nın en eski kenti Marsilya, 2.600 yıl önce Antik Yunanlılar tarafından kurulmuş, Akdeniz’in en büyük ve en çok kültürlü limanlarından biridir. Farklı halkların buluştuğu bu canlı liman, ham ve tutkulu bir enerji taşır.\n\nBalıkçı teknelerinin dizildiği tarihî Eski Liman (Vieux-Port), şehre tepeden bakan Notre-Dame de la Garde Bazilikası, modern MuCEM müzesi ve kentin çevresindeki turkuaz Calanques koyları başlıca duraklardır. Balık çorbası bouillabaisse kentin simge lezzetidir.',
    sources: ['Lonely Planet — Marseille', 'Fransa Turizm — Marsilya'],
  },
  {
    id: 'bordeaux',
    name: 'Bordeaux',
    city: 'Bordeaux',
    country: 'Fransa',
    lat: 44.8378,
    lng: -0.5792,
    aliases: ['bordeaux', 'bordo'],
    summary:
      'Dünyanın en ünlü şarap bölgelerinden birinin merkezi Bordeaux, Garonne Nehri kıyısındaki zarif 18. yüzyıl mimarisiyle “Küçük Paris” olarak anılan bir kenttir. Tarihî merkezi UNESCO Dünya Mirası Listesi’ndedir.\n\nDünyanın en büyük yaya meydanlarından Place de la Bourse ve karşısındaki büyüleyici “su aynası” (Miroir d’eau), zarif bulvarları ve şarap kültürünü anlatan modern Cité du Vin müzesi başlıca cazibelerdir. Çevredeki Médoc ve Saint-Émilion bağları şarap turları için idealdir.',
    sources: ['UNESCO World Heritage List — Bordeaux, Port of the Moon', 'Lonely Planet — Bordeaux'],
  },

  // --- İtalya ---
  {
    id: 'roma',
    name: 'Roma',
    city: 'Roma',
    country: 'İtalya',
    lat: 41.9028,
    lng: 12.4964,
    aliases: ['roma', 'rome', 'roman'],
    summary:
      'Ebedî Şehir Roma, iki bin yılı aşkın süredir Batı uygarlığının kalbi olmuş; önce Roma İmparatorluğu’na, ardından Katolik dünyasına başkentlik yapmıştır. Kolezyum ve Forum Romanum’dan Panteon’a uzanan antik anıtlar, kentin sokaklarında Rönesans ve barok katmanlarıyla iç içe geçer.\n\nTrevi Çeşmesi’ne bozuk para atmaktan İspanyol Merdivenleri’nde oturmaya, dünyanın en küçük devleti Vatikan’da Sistine Şapeli’ni görmekten Trastevere’nin dar sokaklarında akşam yemeğine kadar Roma her adımda tarih ile yaşam sevincini birleştirir. Tarihî merkezi UNESCO Dünya Mirası Listesi’ndedir.',
    sources: ['UNESCO World Heritage List — Historic Centre of Rome', 'Lonely Planet — Rome'],
  },
  {
    id: 'venedik',
    name: 'Venedik',
    city: 'Venezia',
    country: 'İtalya',
    lat: 45.4408,
    lng: 12.3155,
    aliases: ['venedik', 'venezia', 'venice', 'venesia'],
    summary:
      'Adriyatik’in bir lagünündeki 100’den fazla küçük ada üzerine kurulu Venedik, yüzyıllar boyunca Doğu ile Batı arasındaki deniz ticaretine hükmeden güçlü bir cumhuriyetin başkentiydi. Otomobilsiz kent, kanallar ve köprülerle örülü benzersiz bir labirenttir.\n\nSan Marco Meydanı ve Bazilikası, Doj Sarayı, Rialto Köprüsü ve gondol turlarıyla Venedik dünyanın en romantik şehirlerinden biridir. Renkli evleriyle Burano ve cam ustalarıyla Murano adaları da kolayca gezilebilir. Tüm kent ve lagünü UNESCO Dünya Mirası Listesi’ndedir.',
    sources: ['UNESCO World Heritage List — Venice and its Lagoon', 'Lonely Planet — Venice'],
  },
  {
    id: 'floransa',
    name: 'Floransa',
    city: 'Firenze',
    country: 'İtalya',
    lat: 43.7696,
    lng: 11.2558,
    aliases: ['floransa', 'firenze', 'florence'],
    summary:
      'Rönesans’ın doğduğu şehir Floransa, Medici ailesinin himayesinde Leonardo, Michelangelo ve Botticelli gibi dehalara ev sahipliği yaparak Avrupa sanatının seyrini değiştirmiştir. Arno Nehri kıyısındaki kent, adeta açık hava sanat galerisi gibidir.\n\nBrunelleschi’nin kubbesiyle taçlanan Duomo, dünyanın en zengin koleksiyonlarından Uffizi Galerisi, dükkânlarla dolu Ponte Vecchio ve Michelangelo’nun David heykeliyle Floransa paha biçilmez bir hazinedir. Piazzale Michelangelo’dan izlenen gün batımı kentin en sevilen manzarasıdır. Tarihî merkezi UNESCO Dünya Mirası Listesi’ndedir.',
    sources: ['UNESCO World Heritage List — Historic Centre of Florence', 'Lonely Planet — Florence'],
  },
  {
    id: 'milano',
    name: 'Milano',
    city: 'Milano',
    country: 'İtalya',
    lat: 45.4642,
    lng: 9.19,
    aliases: ['milano', 'milan'],
    summary:
      'İtalya’nın kuzeyindeki Milano, ülkenin ekonomi, moda ve tasarım başkentidir; aynı zamanda katmanlı bir tarihe ve zengin bir sanat mirasına sahiptir. Lombardiya’nın bu canlı metropolü, geleneksel İtalyan zarafetini modern bir dinamizmle harmanlar.\n\nYüzyıllarca süren inşaatıyla görkemli gotik Duomo, cam tavanlı Galleria Vittorio Emanuele II pasajı, dünyaca ünlü La Scala opera binası ve Leonardo da Vinci’nin “Son Akşam Yemeği” freski kentin başlıca cazibeleridir. Milano ayrıca alışveriş ve futbol tutkusunun da merkezidir.',
    sources: ['Lonely Planet — Milan', 'İtalya Turizm — Milano'],
  },
  {
    id: 'napoli',
    name: 'Napoli',
    city: 'Napoli',
    country: 'İtalya',
    lat: 40.8518,
    lng: 14.2681,
    aliases: ['napoli', 'naples'],
    summary:
      'Vezüv Yanardağı’nın gölgesinde, Napoli Körfezi’ne kurulu Napoli, tutkulu ve gürültülü ruhuyla İtalya’nın en özgün kentlerinden biridir. Pizzanın doğduğu şehir olarak kabul edilir; sokak yaşamı ve mutfağı efsanevidir.\n\nUNESCO korumasındaki labirent gibi tarihî merkezi, yer altı kalıntıları ve müzeleriyle keşfedilmeyi bekler. Napoli aynı zamanda küllerin altında donmuş antik Pompeii, masalsı Amalfi Kıyısı ve Capri Adası’na açılan bir kapıdır.',
    sources: ['UNESCO World Heritage List — Historic Centre of Naples', 'Lonely Planet — Naples'],
  },

  // --- İspanya ---
  {
    id: 'barselona',
    name: 'Barselona',
    city: 'Barcelona',
    country: 'İspanya',
    lat: 41.3874,
    lng: 2.1686,
    aliases: ['barselona', 'barcelona'],
    summary:
      'Katalonya’nın canlı başkenti Barselona, Akdeniz kıyısında sanat, mimari ve deniz keyfini birleştiren dünyanın en çekici kentlerinden biridir. Katalan kimliğini gururla taşıyan şehir, yaratıcı bir enerjiyle doludur.\n\nMimar Antoni Gaudí’nin hâlâ tamamlanmakta olan görkemli Sagrada Família kilisesi, masalsı Park Güell ve Casa Batlló gibi eserleri (UNESCO) kente eşsiz bir siluet katar. Ortaçağ dokulu Gotik Mahalle, hareketli La Rambla bulvarı, plajları ve tapas kültürüyle Barselona her zevke hitap eder.',
    sources: ['UNESCO World Heritage List — Works of Antoni Gaudí', 'Lonely Planet — Barcelona'],
  },
  {
    id: 'madrid',
    name: 'Madrid',
    city: 'Madrid',
    country: 'İspanya',
    lat: 40.4168,
    lng: -3.7038,
    aliases: ['madrid'],
    summary:
      'İspanya’nın başkenti ve en büyük kenti Madrid, geniş bulvarları, anıtsal meydanları ve dünya çapındaki sanat koleksiyonlarıyla ülkenin canlı kalbidir. Kraliyet geçmişi ile modern enerjisini iç içe yaşar; gece hayatı efsanevidir.\n\nVelázquez ve Goya başyapıtlarını barındıran Prado Müzesi, görkemli Kraliyet Sarayı, arkatlı Plaza Mayor meydanı ve şehrin yeşil vahası Retiro Parkı başlıca duraklardır. Tapas barları, meydanları ve geç saatlere uzanan sokak yaşamıyla Madrid coşkulu bir başkenttir.',
    sources: ['Lonely Planet — Madrid', 'İspanya Turizm — Madrid'],
  },
  {
    id: 'sevilla',
    name: 'Sevilla',
    city: 'Sevilla',
    country: 'İspanya',
    lat: 37.3891,
    lng: -5.9845,
    aliases: ['sevilla', 'seville', 'sevilya'],
    summary:
      'Endülüs’ün başkenti Sevilla, Mağribi ve Hristiyan uygarlıklarının yüzyıllar boyunca kaynaştığı, tutkulu ruhuyla İspanya’nın kalbini yansıtan bir kenttir. Flamenko dansının da merkezi sayılır.\n\nİslam ve Hristiyan sanatının başyapıtı Alcázar Sarayı, dünyanın en büyük gotik katedrallerinden biri ve eski minareden dönüşen Giralda kulesi UNESCO korumasındadır. Yarım daire biçimli görkemli Plaza de España, portakal ağaçlı sokakları ve sıcak atmosferiyle Sevilla göz kamaştırır.',
    sources: ['UNESCO World Heritage List — Cathedral, Alcázar and Archivo de Indias, Seville', 'Lonely Planet — Seville'],
  },
  {
    id: 'granada',
    name: 'Granada',
    city: 'Granada',
    country: 'İspanya',
    lat: 37.1773,
    lng: -3.5986,
    aliases: ['granada'],
    summary:
      'Sierra Nevada dağlarının eteğinde kurulu Granada, İber Yarımadası’ndaki son Müslüman krallığın başkenti olarak İslam sanatının Avrupa’daki en görkemli mirasını barındırır. Endülüs kültürünün romantik atmosferi sokaklarına sinmiştir.\n\nKentin tacı, İslam mimarisinin doruğu sayılan görkemli Elhamra Sarayı ve su oyunlarıyla ünlü Generalife bahçeleridir (UNESCO). Dar sokaklı beyaz Albaicín mahallesi, çingene mağaralarının bulunduğu Sacromonte ve tapas geleneğiyle Granada Endülüs mirasını yaşatır.',
    sources: ['UNESCO World Heritage List — Alhambra, Generalife and Albayzín, Granada', 'Lonely Planet — Granada'],
  },
  {
    id: 'valensiya',
    name: 'Valensiya',
    city: 'Valencia',
    country: 'İspanya',
    lat: 39.4699,
    lng: -0.3763,
    aliases: ['valensiya', 'valencia'],
    summary:
      'İspanya’nın Akdeniz kıyısındaki üçüncü büyük kenti Valensiya, geleneksel dokusunu cesur modern mimariyle birleştiren canlı bir liman kentidir. Ünlü pirinç yemeği paella’nın doğduğu yer olmasıyla da anılır.\n\nMimar Santiago Calatrava’nın tasarladığı fütüristik Sanat ve Bilim Şehri, gotik ipek borsası Lonja de la Seda (UNESCO) ve tarihî katedrali başlıca duraklardır. Eski nehir yatağından dönüştürülen geniş Turia Parkı, plajları ve meydan pazarlarıyla Valensiya keyifli bir kenttir.',
    sources: ['UNESCO World Heritage List — La Lonja de la Seda de Valencia', 'Lonely Planet — Valencia'],
  },

  // --- Almanya ---
  {
    id: 'berlin',
    name: 'Berlin',
    city: 'Berlin',
    country: 'Almanya',
    lat: 52.52,
    lng: 13.405,
    aliases: ['berlin'],
    summary:
      'Almanya’nın başkenti Berlin, 20. yüzyılın en dramatik olaylarına sahne olmuş; iki dünya savaşı, Nazi dönemi ve Soğuk Savaş’ta kenti ikiye bölen Berlin Duvarı’nın izlerini taşır. Bugün ise Avrupa’nın en yaratıcı ve özgür metropollerinden biridir.\n\nBrandenburg Kapısı, Reichstag, Duvar’ın açık hava galerisi East Side Gallery ve dünyaca ünlü müzelerin toplandığı Müze Adası (UNESCO) başlıca duraklardır. Dinamik sanat sahnesi, gece hayatı ve katmanlı tarihiyle Berlin geçmiş ile geleceği çarpıcı biçimde birleştirir.',
    sources: ['UNESCO World Heritage List — Museumsinsel (Museum Island), Berlin', 'Lonely Planet — Berlin'],
  },
  {
    id: 'munih',
    name: 'Münih',
    city: 'München',
    country: 'Almanya',
    lat: 48.1351,
    lng: 11.582,
    aliases: ['munih', 'münih', 'munchen', 'münchen', 'munich'],
    summary:
      'Bavyera’nın başkenti Münih, geleneksel Alman kültürünün, biranın ve refahın simgesi olmuş canlı bir kenttir. Kraliyet geçmişi, sanat müzeleri ve Alplere yakınlığıyla gelenek ile modern yaşamı zarifçe harmanlar.\n\nSaatli kulesiyle Marienplatz meydanı, asırlık bira bahçeleri, Hofbräuhaus ve her sonbahar milyonlarca ziyaretçi çeken Oktoberfest kentin ruhunu yansıtır. Münih ayrıca Neuschwanstein Şatosu, Alpler ve göller gibi masalsı Bavyera manzaralarına açılan bir kapıdır.',
    sources: ['Lonely Planet — Munich', 'Almanya Turizm — München'],
  },
  {
    id: 'koln',
    name: 'Köln',
    city: 'Köln',
    country: 'Almanya',
    lat: 50.9375,
    lng: 6.9603,
    aliases: ['koln', 'köln', 'cologne', 'kolonya'],
    summary:
      'Ren Nehri kıyısındaki Köln, iki bin yıllık Roma geçmişine sahip Almanya’nın en eski büyük kentlerinden biridir. Simgesi, gökyüzüne uzanan ikiz kuleleriyle Avrupa’nın en görkemli gotik yapılarından Köln Katedrali’dir (UNESCO).\n\nİnşası altı yüzyıldan fazla süren katedralin yanı sıra tarihî eski şehir, Ren kıyısı, Roman-Germen Müzesi ve çikolata müzesi kenti canlı kılar. Kendine özgü lehçesi, yerel Kölsch birası ve coşkulu karnavalıyla Köln keyifli bir Ren metropolüdür.',
    sources: ['UNESCO World Heritage List — Cologne Cathedral', 'Lonely Planet — Cologne'],
  },
  {
    id: 'hamburg',
    name: 'Hamburg',
    city: 'Hamburg',
    country: 'Almanya',
    lat: 53.5511,
    lng: 9.9937,
    aliases: ['hamburg'],
    summary:
      'Almanya’nın kuzeyindeki Hamburg, ülkenin en büyük limanı ve su kanallarıyla örülü zengin bir ticaret kentidir; Venedik ve Amsterdam’dan daha fazla köprüsü olduğu söylenir. Yüzyıllardır denizciliğin ve ticaretin kalbi olmuştur.\n\nKızıl tuğlalı antrepolardan oluşan Speicherstadt semti (UNESCO), liman üzerinde yükselen modern Elbphilharmonie konser salonu ve efsanevi eğlence caddesi Reeperbahn kentin simgeleridir. Alster gölleri, canlı pazarları ve deniz atmosferiyle Hamburg zarif bir metropoldür.',
    sources: ['UNESCO World Heritage List — Speicherstadt and Kontorhaus District', 'Lonely Planet — Hamburg'],
  },

  // --- Yunanistan ---
  {
    id: 'atina',
    name: 'Atina',
    city: 'Athína',
    country: 'Yunanistan',
    lat: 37.9838,
    lng: 23.7275,
    aliases: ['atina', 'athens', 'athina'],
    summary:
      'Batı uygarlığının, demokrasinin ve felsefenin doğduğu kent Atina, üç bin yılı aşkın geçmişiyle dünyanın en eski yerleşimlerinden biridir. Sokrates, Platon ve Aristoteles’in düşüncelerini yaydığı bu antik başkent, bugün canlı ve gürültülü bir Akdeniz metropolüdür.\n\nŞehre tepeden bakan Akropolis ve Parthenon, antik Agora, Panathinaiko Stadyumu ve zengin arkeoloji müzeleri geçmişin ihtişamını yaşatır. Akropolis’in eteğindeki Plaka ve Monastiraki’nin dar sokakları, tavernaları ve pazarlarıyla tarih, modern kent yaşamıyla iç içe geçer.',
    sources: ['UNESCO World Heritage List — Acropolis, Athens', 'Lonely Planet — Athens'],
  },
  {
    id: 'selanik',
    name: 'Selanik',
    city: 'Thessaloniki',
    country: 'Yunanistan',
    lat: 40.6401,
    lng: 22.9444,
    aliases: ['selanik', 'thessaloniki', 'salonika'],
    summary:
      'Yunanistan’ın ikinci büyük kenti Selanik (Thessaloniki), Ege kıyısında iki bin yılı aşkın süredir Roma, Bizans ve Osmanlı uygarlıklarının izlerini taşıyan katmanlı bir liman kentidir. Canlı öğrenci nüfusu ve mutfağıyla ülkenin kültürel başkenti sayılır.\n\nKörfeze bakan simge Beyaz Kule, Bizans surları ve kiliseleri (UNESCO), Roma dönemi Galerius Takı ve Rotunda başlıca duraklardır. Atatürk’ün doğduğu ev de buradadır. Deniz kıyısı yürüyüşü, hareketli meydanları ve meyhaneleriyle Selanik sıcak bir atmosfer sunar.',
    sources: ['UNESCO World Heritage List — Palaeochristian and Byzantine Monuments of Thessalonika', 'Lonely Planet — Thessaloniki'],
  },
  {
    id: 'santorini',
    name: 'Santorini',
    city: 'Santorini',
    country: 'Yunanistan',
    lat: 36.4162,
    lng: 25.4325,
    aliases: ['santorini', 'thira', 'fira'],
    summary:
      'Ege Denizi’nde, binlerce yıl önce yaşanan devasa bir yanardağ patlamasının oluşturduğu su dolu kalderanın kenarına kurulu Santorini, dünyanın en çarpıcı manzaralı adalarından biridir. Bu patlamanın Atlantis efsanesine ve Minos uygarlığının çöküşüne ilham verdiği düşünülür.\n\nUçurumlara asılı beyaz badanalı evler, mavi kubbeli kiliseler ve dünyaca ünlü Oia gün batımı adaya kartpostal görüntüsünü kazandırır. Kaldera manzaralı Fira kasabası, siyah ve kırmızı kumlu volkanik plajları ve yerel şaraplarıyla Santorini romantik bir kaçamaktır.',
    sources: ['Lonely Planet — Santorini', 'Yunanistan Turizm — Santorini'],
  },

  // --- Hollanda ---
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    city: 'Amsterdam',
    country: 'Hollanda',
    lat: 52.3676,
    lng: 4.9041,
    aliases: ['amsterdam'],
    summary:
      'Hollanda’nın başkenti Amsterdam, iç içe geçmiş kanalları, dar cepheli tarihî evleri ve bisikletli yaşamıyla dünyanın en özgün ve özgür ruhlu kentlerinden biridir. Altın Çağ’da bir ticaret ve sanat merkezi olarak zenginleşmiştir; halka biçimli kanalları UNESCO korumasındadır.\n\nRembrandt ve Vermeer başyapıtlarını barındıran Rijksmuseum, Van Gogh Müzesi, Anne Frank Evi ve çiçek pazarları başlıca duraklardır. Kanal tekne turları, kahvehaneleri ve rahat atmosferiyle Amsterdam, hem sanatseverlere hem de gezginlere hitap eder.',
    sources: ['UNESCO World Heritage List — Seventeenth-century canal ring of Amsterdam', 'Lonely Planet — Amsterdam'],
  },
  {
    id: 'rotterdam',
    name: 'Rotterdam',
    city: 'Rotterdam',
    country: 'Hollanda',
    lat: 51.9244,
    lng: 4.4777,
    aliases: ['rotterdam'],
    summary:
      'Hollanda’nın büyük liman kenti Rotterdam, İkinci Dünya Savaşı’nda merkezi neredeyse tümüyle yıkıldıktan sonra cesur ve deneysel bir modern mimariyle yeniden doğmuştur. Bu yönüyle Hollanda’nın en fütüristik ve dinamik kenti sayılır.\n\nEğik sarı Küp Evler, at nalı biçimli kapalı pazar Markthal, zarif Erasmus Köprüsü ve Avrupa’nın en büyük limanı başlıca duraklardır. Çağdaş sanat, tasarım ve mimari tutkunları için Rotterdam, sürekli kendini yenileyen açık hava bir sergi gibidir.',
    sources: ['Lonely Planet — Rotterdam', 'Hollanda Turizm — Rotterdam'],
  },

  // --- Portekiz ---
  {
    id: 'lizbon',
    name: 'Lizbon',
    city: 'Lisboa',
    country: 'Portekiz',
    lat: 38.7223,
    lng: -9.1393,
    aliases: ['lizbon', 'lisboa', 'lisbon'],
    summary:
      'Yedi tepeye yayılan, Tejo Nehri’nin Atlantik’e kavuştuğu noktada kurulu Lizbon, Portekiz’in denizci geçmişinin izlerini taşıyan ışıltılı başkentidir. Keşifler Çağı’nda dünyanın dört bir yanına açılan gemiler buradan yola çıkmıştır.\n\nDik sokaklarda gıcırdayarak ilerleyen sarı tramvaylar, hüzünlü fado ezgilerinin yükseldiği Alfama mahallesi, nehir kıyısındaki Belém Kulesi ve görkemli Jerónimos Manastırı (UNESCO) kentin simgeleridir. Renkli çinileri (azulejo), manzara terasları ve pastel de nata tatlısıyla Lizbon büyüler.',
    sources: ['UNESCO World Heritage List — Monastery of the Hieronymites and Tower of Belém', 'Lonely Planet — Lisbon'],
  },
  {
    id: 'porto',
    name: 'Porto',
    city: 'Porto',
    country: 'Portekiz',
    lat: 41.1579,
    lng: -8.6291,
    aliases: ['porto', 'oporto'],
    summary:
      'Portekiz’in kuzeyindeki Porto, Douro Nehri’nin Atlantik’e döküldüğü noktada kurulu, ülkeye adını veren köklü bir liman ve şarap kentidir. Dünyaca ünlü Porto şarabı, nehrin karşı kıyısındaki mahzenlerde olgunlaştırılır.\n\nRenkli evlerin nehre doğru yığıldığı Ribeira mahallesi (UNESCO), iki katlı demir Dom Luís I Köprüsü, mavi-beyaz çinilerle kaplı São Bento tren istasyonu ve görkemli Livraria Lello kitapçısı başlıca duraklardır. Nehir tekneleri ve şarap tadımlarıyla Porto sıcak bir atmosfer sunar.',
    sources: ['UNESCO World Heritage List — Historic Centre of Oporto', 'Lonely Planet — Porto'],
  },

  // --- Birleşik Krallık ---
  {
    id: 'londra',
    name: 'Londra',
    city: 'London',
    country: 'Birleşik Krallık',
    lat: 51.5074,
    lng: -0.1278,
    aliases: ['londra', 'london'],
    summary:
      'Dünyanın en etkili ve kozmopolit metropollerinden Londra, iki bin yıllık geçmişiyle bir zamanlar üzerinde güneş batmayan imparatorluğun başkentiydi. Tarih, kraliyet geleneği ve çağdaş kültür bu devasa kentte iç içe yaşar.\n\nParlamento ile Big Ben, kraliyet mücevherlerini barındıran Londra Kulesi (UNESCO), Buckingham Sarayı, British Museum ve Tate Modern başlıca duraklardır. Kırmızı çift katlı otobüsleri, tarihî pub’ları, West End tiyatroları ve çok kültürlü semtleriyle Londra tükenmez bir keşif sunar.',
    sources: ['UNESCO World Heritage List — Tower of London', 'Lonely Planet — London'],
  },
  {
    id: 'edinburgh',
    name: 'Edinburgh',
    city: 'Edinburgh',
    country: 'Birleşik Krallık',
    lat: 55.9533,
    lng: -3.1883,
    aliases: ['edinburgh', 'edinburg'],
    summary:
      'İskoçya’nın başkenti Edinburgh, sönmüş bir yanardağın üzerine kurulu kalesi ve dramatik siluetiyle Avrupa’nın en etkileyici kentlerinden biridir. Güçlü edebi geleneği sayesinde UNESCO tarafından ilk “Edebiyat Şehri” ilan edilmiştir.\n\nKayalık tepedeki görkemli Edinburgh Kalesi, ortaçağ dokulu Old Town ile zarif Gürcü tarzı New Town (birlikte UNESCO), tarihî Royal Mile caddesi ve Arthur’s Seat tepesi başlıca duraklardır. Her ağustos düzenlenen dünyanın en büyük sanat festivali Fringe, kenti coşkuyla doldurur.',
    sources: ['UNESCO World Heritage List — Old and New Towns of Edinburgh', 'Lonely Planet — Edinburgh'],
  },

  // --- İsviçre ---
  {
    id: 'zurih',
    name: 'Zürih',
    city: 'Zürich',
    country: 'İsviçre',
    lat: 47.3769,
    lng: 8.5417,
    aliases: ['zurih', 'zürih', 'zurich', 'zürich'],
    summary:
      'İsviçre’nin en büyük kenti Zürih, Zürih Gölü’nün kuzey ucunda ve Limmat Nehri kıyısında kurulu, dünyanın önde gelen finans merkezlerinden biridir; aynı zamanda beklenmedik ölçüde canlı bir kültür ve gece hayatı sunar. Yüksek yaşam kalitesiyle sürekli anılır.\n\nŞık Bahnhofstrasse alışveriş caddesi, dar sokaklı tarihî Old Town (Altstadt), Chagall vitraylarıyla ünlü Fraumünster kilisesi ve göl kıyısı gezileri başlıca cazibelerdir. Uzaktaki karlı Alp zirvelerinin göle yansıması kente muhteşem bir arka plan katar.',
    sources: ['Lonely Planet — Zürich', 'İsviçre Turizm — Zürich'],
  },
  {
    id: 'luzern',
    name: 'Luzern',
    city: 'Luzern',
    country: 'İsviçre',
    lat: 47.0502,
    lng: 8.3093,
    aliases: ['luzern', 'lucerne'],
    summary:
      'Orta İsviçre’de, adını taşıyan gölün kıyısında karlı dağların eteğinde kurulu Luzern, ülkenin en pitoresk kentlerinden biridir. Korunmuş ortaçağ dokusu ve göl-dağ manzarasıyla İsviçre’nin kartpostal görüntüsünü sunar.\n\nGölün üstünden geçen, çiçeklerle bezeli 14. yüzyıldan kalma ahşap Kapellbrücke köprüsü, kayaya oyulmuş dokunaklı Ağlayan Aslan anıtı ve tarihî meydanları kentin simgeleridir. Buradan Pilatus ve Rigi dağlarına çıkan dişli tren ve teleferik turları yapılabilir.',
    sources: ['Lonely Planet — Lucerne', 'İsviçre Turizm — Luzern'],
  },
  {
    id: 'interlaken',
    name: 'Interlaken',
    city: 'Interlaken',
    country: 'İsviçre',
    lat: 46.6863,
    lng: 7.8632,
    aliases: ['interlaken'],
    summary:
      'İki gölün (Thun ve Brienz) arasında, tam da isminin anlamına uygun biçimde kurulu Interlaken, İsviçre Alpleri’nin görkemli Jungfrau bölgesine açılan kapıdır. Eiger, Mönch ve Jungfrau zirvelerinin çevrelediği bir dağ tatili merkezidir.\n\nTrenle ulaşılan, “Avrupa’nın Çatısı” Jungfraujoch’un buzul manzarası, çağlayanlarıyla ünlü Lauterbrunnen vadisi ve Grindelwald köyü başlıca duraklardır. Yamaç paraşütü, kayak ve dağ yürüyüşleri gibi macera sporlarıyla Interlaken adrenalin tutkunlarının da gözdesidir.',
    sources: ['Lonely Planet — Interlaken', 'İsviçre Turizm — Interlaken'],
  },

  // --- Belçika ---
  {
    id: 'bruksel',
    name: 'Brüksel',
    city: 'Brussel',
    country: 'Belçika',
    lat: 50.8503,
    lng: 4.3517,
    aliases: ['bruksel', 'brüksel', 'brussels', 'bruxelles'],
    summary:
      'Belçika’nın başkenti Brüksel, Avrupa Birliği ve NATO gibi kurumlara ev sahipliği yapmasıyla fiilen “Avrupa’nın başkenti” sayılan uluslararası bir kenttir. Görkemli tarihî çekirdeği ile modern diplomasi dünyasını iç içe barındırır.\n\nAltın işlemeli lonca evleriyle çevrili, Avrupa’nın en güzel meydanlarından Grand-Place (UNESCO), simge çeşme Manneken Pis, atom biçimli dev yapı Atomium ve çizgi roman müzeleri başlıca duraklardır. Dünyaca ünlü çikolatası, waffle’ı, patates kızartması ve biralarıyla Brüksel bir lezzet cennetidir.',
    sources: ['UNESCO World Heritage List — La Grand-Place, Brussels', 'Lonely Planet — Brussels'],
  },
  {
    id: 'bruges',
    name: 'Bruges',
    city: 'Brugge',
    country: 'Belçika',
    lat: 51.2093,
    lng: 3.2247,
    aliases: ['bruges', 'brugge', 'brugge belcika'],
    summary:
      'Belçika’nın kuzeyindeki Bruges (Brugge), ortaçağdan kalma dokusunu neredeyse hiç bozulmadan koruyan kanalları ve arnavut kaldırımlı sokaklarıyla “Kuzeyin Venedik’i” olarak anılır. Tarihî merkezi bütünüyle UNESCO Dünya Mirası Listesi’ndedir.\n\nMeydana tepeden bakan, tırmanılabilen Çan Kulesi (Belfort), pitoresk Markt meydanı, romantik kanal tekne turları ve Michelangelo’nun bir heykelini barındıran kilisesi başlıca duraklardır. Çikolatacıları, bira barları ve masalsı atmosferiyle Bruges büyüleyici bir kaçamaktır.',
    sources: ['UNESCO World Heritage List — Historic Centre of Brugge', 'Lonely Planet — Bruges'],
  },

  // --- Polonya ---
  {
    id: 'krakow',
    name: 'Krakow',
    city: 'Kraków',
    country: 'Polonya',
    lat: 50.0647,
    lng: 19.945,
    aliases: ['krakow', 'kraków', 'cracow'],
    summary:
      'Polonya’nın eski kraliyet başkenti Krakow, İkinci Dünya Savaşı’ndan neredeyse hasarsız çıkmasıyla ülkenin en zengin tarihî kent dokusunu korumuş kültür başkentidir. Yüzyıllar boyunca Polonya krallarının taç giydiği bu kent, ulusun ruhunu taşır.\n\nAvrupa’nın en büyük ortaçağ meydanlarından biri olan Rynek Główny, ortasındaki tarihî Kumaş Hali (Sukiennice), tepedeki Wawel Kalesi ve katedrali ile eski Yahudi mahallesi Kazimierz başlıca duraklardır (tarihî merkez UNESCO’dadır). Hüzünlü Auschwitz-Birkenau anıtı ve yeraltı Wieliczka Tuz Madeni de yakınındadır.',
    sources: ['UNESCO World Heritage List — Historic Centre of Kraków', 'Lonely Planet — Kraków'],
  },
  {
    id: 'varsova',
    name: 'Varşova',
    city: 'Warszawa',
    country: 'Polonya',
    lat: 52.2297,
    lng: 21.0122,
    aliases: ['varsova', 'varşova', 'warsaw', 'warszawa'],
    summary:
      'Polonya’nın başkenti Varşova, İkinci Dünya Savaşı’nda neredeyse tümüyle yerle bir edildikten sonra halkının kararlılığıyla eski fotoğraf ve tablolara bakılarak taş taş yeniden inşa edilmiştir. Bu diriliş, kentin sarsılmaz ruhunun simgesidir.\n\nAslına uygun yeniden kurulan renkli Eski Şehir (UNESCO), Kraliyet Kalesi, besteci Chopin’in mirasını taşıyan Łazienki Parkı ve modern gökdelenleri başlıca duraklardır. Trajik geçmişini anlatan müzeleri ve yeniden doğan enerjisiyle Varşova, tarih ile geleceği bir arada yaşayan canlı bir başkenttir.',
    sources: ['UNESCO World Heritage List — Historic Centre of Warsaw', 'Lonely Planet — Warsaw'],
  },

  // ===================== AFRİKA — ŞEHİRLER =====================
  // --- Mısır ---
  {
    id: 'kahire',
    name: 'Kahire',
    city: 'Cairo',
    country: 'Mısır',
    lat: 30.0444,
    lng: 31.2357,
    aliases: ['kahire', 'cairo', 'kahira', 'giza', 'gize'],
    summary:
      'Nil Nehri kıyısına yayılan devasa Kahire, Afrika ve Arap dünyasının en büyük kentlerinden biri olup binlerce yıllık firavun mirasını hareketli modern yaşamla birleştirir. “Bin minareli şehir” olarak da anılan kaotik ve büyüleyici bir metropoldür.\n\nHemen yanı başındaki Giza Piramitleri ve Sfenks, antik dünyanın ayakta kalan tek harikasıdır; firavun hazinelerini barındıran müzeleri, labirent gibi Han el-Halili çarşısı ve İslami Kahire’nin tarihî camileri başlıca duraklardır. Nil üzerindeki tekne gezileriyle Kahire, çağları bir arada sunar.',
    sources: ['UNESCO World Heritage List — Memphis and its Necropolis (Pyramids of Giza)', 'Lonely Planet — Cairo'],
  },
  {
    id: 'luksor',
    name: 'Luksor',
    city: 'Luxor',
    country: 'Mısır',
    lat: 25.6872,
    lng: 32.6396,
    aliases: ['luksor', 'luxor', 'teb', 'thebes'],
    summary:
      'Nil Nehri kıyısında, antik Mısır’ın görkemli başkenti Teb’in üzerine kurulu Luksor, açık havada bu kadar çok anıt barındırması nedeniyle “dünyanın en büyük açık hava müzesi” olarak anılır. Firavunların ihtişamının en yoğun hissedildiği yerdir.\n\nSütunlu salonlarıyla devasa Karnak ve Luksor tapınakları, Nil’in batı yakasındaki kayalara oyulmuş kral mezarlarıyla Krallar Vadisi ve teraslı Hatşepsut Tapınağı başlıca duraklardır. Sıcak hava balonuyla gün doğumunda uçmak, bu antik manzarayı görmenin en büyüleyici yoludur.',
    sources: ['UNESCO World Heritage List — Ancient Thebes with its Necropolis', 'Lonely Planet — Luxor'],
  },
  {
    id: 'asvan',
    name: 'Asvan',
    city: 'Aswan',
    country: 'Mısır',
    lat: 24.0889,
    lng: 32.8998,
    aliases: ['asvan', 'aswan', 'assuan'],
    summary:
      'Mısır’ın güneyinde, Nil’in en dingin ve en güzel manzaralarına sahip Asvan, tarihî Nubya kültürünün merkezi ve rahat atmosferiyle sevilen bir kenttir. Nehir üzerindeki granit adaları ve yelkenlileriyle huzur dolu bir dokuya sahiptir.\n\nBeyaz yelkenli geleneksel feluka tekneleriyle nehir gezisi, bir adaya taşınan zarif Philae Tapınağı ve renkli Nubya köyleri başlıca öne çıkanlardır. Kentin güneyindeki, kayalara oyulmuş dev heykelleriyle Abu Simbel tapınakları ise Mısır’ın en görkemli anıtlarından biridir.',
    sources: ['UNESCO World Heritage List — Nubian Monuments from Abu Simbel to Philae', 'Lonely Planet — Aswan'],
  },
  {
    id: 'iskenderiye',
    name: 'İskenderiye',
    city: 'Alexandria',
    country: 'Mısır',
    lat: 31.2001,
    lng: 29.9187,
    aliases: ['iskenderiye', 'alexandria', 'iskandariya'],
    summary:
      'Büyük İskender’in MÖ 331’de kurduğu Akdeniz kenti İskenderiye, antik çağda dünyanın ünlü kütüphanesine ve deniz fenerine (dünyanın yedi harikasından biri) ev sahipliği yapmış köklü bir liman kentidir. Mısır’ın “ikinci başkenti” ve yaz merkezidir.\n\nAntik kütüphanenin anısına inşa edilen görkemli modern Bibliotheca Alexandrina, eski deniz fenerinin yerinde yükselen Kaitbay Kalesi, Roma dönemi yeraltı mezarları ve deniz kıyısı Corniche başlıca duraklardır. Akdeniz esintisi ve katmanlı tarihiyle İskenderiye zarif bir kenttir.',
    sources: ['Lonely Planet — Alexandria', 'Bibliotheca Alexandrina — resmi portal'],
  },

  // --- Fas ---
  {
    id: 'marakes',
    name: 'Marakeş',
    city: 'Marrakech',
    country: 'Fas',
    lat: 31.6295,
    lng: -7.9811,
    aliases: ['marakes', 'marakeş', 'marrakech', 'marrakesh'],
    summary:
      'Fas’ın Atlas Dağları eteğindeki Marakeş, kızıl toprak rengi binaları nedeniyle “Kızıl Şehir” olarak anılan, duyulara hitap eden büyüleyici bir kenttir. Bir zamanlar önemli bir kervan ticareti başkentiydi ve bu miras onu bir kültür merkezi kılar.\n\nYılan oynatıcıları, hikâye anlatıcıları ve yemek tezgâhlarıyla dolan efsanevi Jemaa el-Fnaa meydanı, labirent gibi çarşıları (souk) ve Koutoubia Camii’nin minaresi başlıca duraklardır. Bahia Sarayı, mavi Majorelle Bahçesi ve geleneksel avlulu riad otelleriyle Marakeş, renk ile dinginliği birleştirir.',
    sources: ['UNESCO World Heritage List — Medina of Marrakesh', 'Lonely Planet — Marrakesh'],
  },
  {
    id: 'fes',
    name: 'Fes',
    city: 'Fès',
    country: 'Fas',
    lat: 34.0181,
    lng: -5.0078,
    aliases: ['fes', 'fez', 'fès'],
    summary:
      'Fas’ın manevi ve kültürel başkenti Fes, dünyanın en büyük ve en iyi korunmuş ortaçağ kent merkezlerinden birine (medina) ev sahipliği yapar. Bu labirent gibi doku, adeta yaşayan bir Orta Çağ şehridir ve UNESCO korumasındadır.\n\nBinlerce dar sokağın kesiştiği, araçların giremediği medinada; dünyanın en eski üniversitelerinden Al-Karaouine, süslü medreseler ve derilerin asırlık yöntemlerle renklendirildiği rengârenk Chouara tabakhanesi başlıca duraklardır. El sanatları ve zanaat gelenekleriyle Fes, zamanda yolculuk yaşatır.',
    sources: ['UNESCO World Heritage List — Medina of Fez', 'Lonely Planet — Fez'],
  },
  {
    id: 'safsavan',
    name: 'Şafşavan',
    city: 'Chefchaouen',
    country: 'Fas',
    lat: 35.1688,
    lng: -5.2636,
    aliases: ['safsavan', 'şafşavan', 'chefchaouen', 'chaouen', 'mavi sehir'],
    summary:
      'Fas’ın kuzeyinde, Rif Dağları’na yaslanmış Şafşavan, sokaklarının, duvarlarının ve evlerinin mavinin her tonuna boyanmış olmasıyla “Mavi Şehir” olarak dünyaca ünlüdür. Bu düşsel görüntü, onu Fas’ın en fotojenik köşesi kılar.\n\nMavi rengin hâkim olduğu dar sokakları, çiçekli avluları, tepedeki İspanyol Camii’nden panoraması ve el yapımı ürünler satan dükkânları başlıca cazibelerdir. Dağ havası, sakin atmosferi ve masalsı renkleriyle Şafşavan, huzurlu ve keyifli bir kaçış noktasıdır.',
    sources: ['Lonely Planet — Chefchaouen', 'Fas Turizm — Chefchaouen'],
  },
  {
    id: 'kazablanka',
    name: 'Kazablanka',
    city: 'Casablanca',
    country: 'Fas',
    lat: 33.5731,
    lng: -7.5898,
    aliases: ['kazablanka', 'casablanca', 'dar el beida'],
    summary:
      'Atlantik kıyısındaki Kazablanka, Fas’ın en büyük kenti ve ekonomik başkentidir; art deco mimarisi ve modern dokusuyla ülkenin çağdaş yüzünü temsil eder. Aynı adı taşıyan klasik filmle de dünya belleğine kazınmıştır.\n\nDenizin üzerine uzanan, göğe yükselen minaresiyle dünyanın en büyük camilerinden II. Hassan Camii kentin görkemli simgesidir. Sömürge dönemi art deco binaları, hareketli Corniche sahili ve medinasıyla Kazablanka, gelenek ile moderni buluşturan canlı bir metropoldür.',
    sources: ['Lonely Planet — Casablanca', 'Fas Turizm — Casablanca'],
  },

  // --- Güney Afrika ---
  {
    id: 'capetown',
    name: 'Cape Town',
    city: 'Cape Town',
    country: 'Güney Afrika',
    lat: -33.9249,
    lng: 18.4241,
    aliases: ['cape town', 'capetown', 'kaapstad', 'kap sehri'],
    summary:
      'Table Mountain’ın (Masa Dağı) eteğinde, iki okyanusun buluştuğu bir yarımadaya kurulu Cape Town, çarpıcı doğası ve zengin tarihiyle dünyanın en güzel konumlu kentlerinden biridir. Güney Afrika’nın en sevilen destinasyonudur.\n\nTeleferikle çıkılan düz zirveli Table Mountain, iki okyanusun buluştuğu efsanevi Ümit Burnu, canlı V&A Waterfront limanı ve penguen kolonili plajları başlıca duraklardır. Çevredeki dünyaca ünlü şarap bağları (Stellenbosch) ile Cape Town, doğa, tarih ve lezzeti kusursuzca birleştirir.',
    sources: ['UNESCO World Heritage List — Cape Floral Region', 'Lonely Planet — Cape Town'],
  },
  {
    id: 'johannesburg',
    name: 'Johannesburg',
    city: 'Johannesburg',
    country: 'Güney Afrika',
    lat: -26.2041,
    lng: 28.0473,
    aliases: ['johannesburg', 'joburg', 'jozi'],
    summary:
      'Güney Afrika’nın en büyük kenti Johannesburg, bir zamanlar altın madenciliğiyle yoktan var olmuş, bugün ülkenin ekonomik dinamosu olan enerjik bir metropoldür. Ülkenin çalkantılı yakın tarihinin de merkezinde yer alır.\n\nApartheid rejiminin acılarını ve sona erişini anlatan çarpıcı Apartheid Müzesi ile Nelson Mandela’nın yaşadığı, mücadelenin simgesi Soweto mahallesi başlıca duraklardır. Yakınındaki, ilk insan atalarının fosillerinin bulunduğu UNESCO korumalı “İnsanlığın Beşiği” ise kentin en köklü hazinesidir.',
    sources: ['UNESCO World Heritage List — Fossil Hominid Sites (Cradle of Humankind)', 'Lonely Planet — Johannesburg'],
  },

  // --- Tanzanya ---
  {
    id: 'zanzibar',
    name: 'Zanzibar (Stone Town)',
    city: 'Zanzibar',
    country: 'Tanzanya',
    lat: -6.1659,
    lng: 39.2026,
    aliases: ['zanzibar', 'stone town', 'unguja'],
    summary:
      'Tanzanya kıyılarının açığında, Hint Okyanusu’ndaki Zanzibar, yüzyıllarca baharat ticaretinin merkezi olmuş, Afrika, Arap, Fars ve Hint kültürlerinin kaynaştığı büyüleyici bir adadır. Tarihî dokusu ve plajlarıyla eşsiz bir cazibe sunar.\n\nDaracık sokakları, oymalı ahşap kapıları, çarşıları ve sultan saraylarıyla tarihî başkenti Stone Town (UNESCO), adanın kalbidir. Baharat çiftlikleri, bembeyaz kumlu turkuaz plajları ve yelkenli tekne (dhow) turlarıyla Zanzibar, tarih ile tropik cenneti birleştirir.',
    sources: ['UNESCO World Heritage List — Stone Town of Zanzibar', 'Lonely Planet — Zanzibar'],
  },
  {
    id: 'arusha',
    name: 'Arusha',
    city: 'Arusha',
    country: 'Tanzanya',
    lat: -3.3869,
    lng: 36.683,
    aliases: ['arusha', 'serengeti', 'ngorongoro'],
    summary:
      'Kuzey Tanzanya’da, Meru Dağı’nın eteğinde kurulu Arusha, ülkenin efsanevi safari parklarına açılan kapı olarak “safari başkenti” diye anılır. Serin iklimi ve yeşil dokusuyla maceraların başlangıç noktasıdır.\n\nUçsuz bucaksız ovaları ve büyük göçüyle Serengeti Milli Parkı, dünyanın en büyük sağlam volkanik kalderası Ngorongoro Krateri ve Afrika’nın çatısı Kilimanjaro Dağı buradan yola çıkılarak keşfedilir. Vahşi yaşamın ve doğa harikalarının kalbine açılan Arusha, unutulmaz maceraların üssüdür.',
    sources: ['UNESCO World Heritage List — Serengeti National Park', 'Lonely Planet — Arusha'],
  },

  // --- Kenya ---
  {
    id: 'nairobi',
    name: 'Nairobi',
    city: 'Nairobi',
    country: 'Kenya',
    lat: -1.2921,
    lng: 36.8219,
    aliases: ['nairobi'],
    summary:
      'Kenya’nın başkenti Nairobi, gökdelenlerinin hemen yanı başındaki milli parkta aslan ve gergedanların dolaştığı, dünyada eşi az bulunan bir metropoldür. Doğu Afrika’nın ekonomik ve ulaşım merkezi olarak canlı bir kenttir.\n\nŞehrin sınırındaki Nairobi Milli Parkı’nda safari yapmak, öksüz fil yavrularının bakıldığı yetimhane ve zürafaların elden beslendiği Zürafa Merkezi başlıca deneyimlerdir. Nairobi aynı zamanda, büyük göçün yaşandığı ünlü Maasai Mara rezervine açılan ana kapıdır.',
    sources: ['Kenya Wildlife Service — Nairobi National Park', 'Lonely Planet — Nairobi'],
  },

  // --- Tunus ---
  {
    id: 'tunus',
    name: 'Tunus',
    city: 'Tunis',
    country: 'Tunus',
    lat: 36.8065,
    lng: 10.1815,
    aliases: ['tunus', 'tunis', 'kartaca', 'carthage'],
    summary:
      'Tunus’un başkenti Tunus, antik Kartaca’nın komşuluğunda, Akdeniz, Arap ve Roma miraslarını bir arada barındıran zarif bir kenttir. Ülkenin siyasi ve kültürel kalbi olarak tarih ile modern yaşamı harmanlar.\n\nUNESCO korumasındaki tarihî medinası ve çarşıları, hemen dışındaki antik Kartaca kalıntıları ve tepede denize bakan mavi-beyaz köy Sidi Bou Said başlıca duraklardır. Dünyanın en zengin Roma mozaiği koleksiyonlarından birini barındıran Bardo Müzesi ise kentin en görkemli hazinesidir.',
    sources: ['UNESCO World Heritage List — Medina of Tunis / Carthage', 'Lonely Planet — Tunis'],
  },

  // --- Etiyopya ---
  {
    id: 'lalibela',
    name: 'Lalibela',
    city: 'Lalibela',
    country: 'Etiyopya',
    lat: 12.0319,
    lng: 39.0413,
    aliases: ['lalibela'],
    summary:
      'Etiyopya’nın dağlık kuzeyindeki Lalibela, 12.-13. yüzyıllarda tek parça kayanın içine oyularak inşa edilen on bir anıtsal kilisesiyle dünyada eşi olmayan bir Hristiyan hac merkezidir. Bu olağanüstü yapılar UNESCO Dünya Mirası Listesi’ndedir.\n\nHaç biçiminde yerin altına oyulmuş, tünel ve geçitlerle birbirine bağlı kaya kiliseleri, hâlâ aktif birer ibadet yeridir ve “Yeni Kudüs” olarak anılır. Beyaz cübbeli hacıları, kaya oyma işçiliği ve manevi atmosferiyle Lalibela, insanı hayrete düşüren bir kutsal kenttir.',
    sources: ['UNESCO World Heritage List — Rock-Hewn Churches, Lalibela', 'Lonely Planet — Lalibela'],
  },

  // ===================== ASYA — ŞEHİRLER =====================
  // --- Japonya ---
  {
    id: 'tokyo',
    name: 'Tokyo',
    city: 'Tokyo',
    country: 'Japonya',
    lat: 35.6762,
    lng: 139.6503,
    aliases: ['tokyo', 'tokio', 'edo'],
    summary:
      'Japonya’nın başkenti Tokyo, geleneksel kültür ile baş döndürücü modernliğin eşsiz bir uyumla buluştuğu, dünyanın en büyük ve en dinamik metropollerinden biridir. Bir zamanlar Edo adıyla balıkçı köyüyken, bugün küresel bir merkezdir.\n\nDünyanın en kalabalık yaya geçidi Shibuya, huzurlu Meiji Tapınağı ve ormanı, tarihî Asakusa’daki Senso-ji Tapınağı, elektronik cenneti Akihabara ve gökdelen manzaraları başlıca duraklardır. Michelin yıldızlı restoranları, sokak lezzetleri ve baharda çiçek açan kiraz ağaçlarıyla Tokyo tükenmez bir keşif sunar.',
    sources: ['Japan National Tourism Organization — Tokyo', 'Lonely Planet — Tokyo'],
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    city: 'Kyoto',
    country: 'Japonya',
    lat: 35.0116,
    lng: 135.7681,
    aliases: ['kyoto', 'kioto'],
    summary:
      'Japonya’nın bin yıldan uzun süre başkentliğini yapan Kyoto, ülkenin kültürel ve manevi kalbi olarak binlerce tapınak, saray ve geleneksel bahçeye ev sahipliği yapar. İkinci Dünya Savaşı’ndan büyük ölçüde hasarsız çıkması, eski Japonya’nın ruhunu bugüne taşımıştır.\n\nAltın kaplama Kinkaku-ji (Altın Pavyon), binlerce kırmızı torii kapısıyla Fushimi Inari Tapınağı, bambu ormanıyla Arashiyama ve geyşaların dolaştığı tarihî Gion mahallesi başlıca duraklardır (birçoğu UNESCO). Çay evleri, zen bahçeleri ve mevsimsel güzellikleriyle Kyoto zarafetin simgesidir.',
    sources: ['UNESCO World Heritage List — Historic Monuments of Ancient Kyoto', 'Lonely Planet — Kyoto'],
  },
  {
    id: 'osaka',
    name: 'Osaka',
    city: 'Osaka',
    country: 'Japonya',
    lat: 34.6937,
    lng: 135.5023,
    aliases: ['osaka'],
    summary:
      'Japonya’nın üçüncü büyük kenti Osaka, sıcakkanlı halkı, canlı enerjisi ve efsanevi sokak mutfağıyla ülkenin “mutfağı” olarak anılır. Tarihî bir ticaret merkezi olan kent, Tokyo’ya göre daha rahat ve samimi bir atmosfer sunar.\n\nGörkemli Osaka Kalesi, dev neon tabelaları ve kanalıyla ünlü Dotonbori eğlence bölgesi ve gökten manzara sunan Umeda Sky Building başlıca duraklardır. Takoyaki ve okonomiyaki gibi sokak lezzetleriyle Osaka, aynı zamanda Kyoto, Nara ve Kobe’ye açılan bir üstür.',
    sources: ['Japan National Tourism Organization — Osaka', 'Lonely Planet — Osaka'],
  },
  {
    id: 'hiroshima',
    name: 'Hiroşima',
    city: 'Hiroshima',
    country: 'Japonya',
    lat: 34.3853,
    lng: 132.4553,
    aliases: ['hiroshima', 'hiroşima'],
    summary:
      'Batı Japonya’daki Hiroşima, 1945’te atom bombasının atıldığı kent olarak insanlık tarihinin en trajik anlarından birine tanıklık etmiş; bu acıyı evrensel bir barış mesajına dönüştürmüştür. Bugün canlı, modern ve umut dolu bir kenttir.\n\nBombanın izlerini taşıyan, ayakta kalan tek yapı Genbaku Dome (Barış Anıtı, UNESCO), Barış Anıt Parkı ve müzesi kentin en anlamlı duraklarıdır. Yakınındaki Miyajima Adası’nda, gelgitle denizin ortasında yükseliyormuş gibi görünen ünlü kırmızı torii kapısı ise Japonya’nın en ikonik manzaralarındandır.',
    sources: ['UNESCO World Heritage List — Hiroshima Peace Memorial', 'Lonely Planet — Hiroshima'],
  },
  {
    id: 'nara',
    name: 'Nara',
    city: 'Nara',
    country: 'Japonya',
    lat: 34.6851,
    lng: 135.8048,
    aliases: ['nara'],
    summary:
      'Japonya’nın ilk kalıcı başkenti olan Nara, 8. yüzyıldaki bu görkemli döneminden kalan anıtsal tapınakları ve kutsal geyikleriyle huzurlu bir açık hava müzesi gibidir. Kyoto ve Osaka’ya yakınlığıyla kolayca gezilebilir.\n\nDünyanın en büyük bronz Buda heykellerinden birini barındıran devasa ahşap Todai-ji Tapınağı, yüzlerce taş ve bronz fenerle bezeli Kasuga Tapınağı ve bu yapıları çevreleyen geniş park (UNESCO) başlıca duraklardır. Parkta özgürce dolaşan, ziyaretçilere selam veren evcil geyikler kentin sevimli simgesidir.',
    sources: ['UNESCO World Heritage List — Historic Monuments of Ancient Nara', 'Lonely Planet — Nara'],
  },

  // --- Çin ---
  {
    id: 'pekin',
    name: 'Pekin',
    city: 'Beijing',
    country: 'Çin',
    lat: 39.9042,
    lng: 116.4074,
    aliases: ['pekin', 'beijing', 'peking'],
    summary:
      'Çin’in başkenti Pekin, yüzyıllardır imparatorlukların ve modern Çin’in merkezi olarak ülkenin siyasi ve kültürel kalbidir. Anıtsal yapıları, geniş meydanları ve katmanlı tarihiyle adeta bir açık hava tarih kitabıdır.\n\nİmparatorların yaşadığı devasa saray kompleksi Yasak Şehir, dünyanın en büyük meydanlarından Tiananmen, gökyüzüne adanan Cennet Tapınağı ve tarihî hutong sokakları başlıca duraklardır. Kentin hemen dışında ise tepeler boyunca uzanan görkemli Çin Seddi, insan elinden çıkma en büyük yapılardan biri olarak yükselir.',
    sources: ['UNESCO World Heritage List — Imperial Palace / Great Wall', 'Lonely Planet — Beijing'],
  },
  {
    id: 'sanghay',
    name: 'Şanghay',
    city: 'Shanghai',
    country: 'Çin',
    lat: 31.2304,
    lng: 121.4737,
    aliases: ['sanghay', 'şanghay', 'shanghai'],
    summary:
      'Çin’in en büyük kenti ve finans başkenti Şanghay, bir yüzyıl önceki sömürge geçmişini baş döndürücü bir modernlikle birleştiren fütüristik bir metropoldür. Doğu ile Batı’nın buluştuğu kozmopolit bir enerji taşır.\n\nNehrin bir yakasında 1920’lerin Avrupai binalarıyla tarihî Bund rıhtımı, karşı yakasında ise ışıl ışıl Pudong gökdelenleri (Şanghay Kulesi) yükselir. Klasik Çin bahçesi Yu Bahçesi, canlı çarşıları ve Fransız Konsesyonu’nun ağaçlı sokaklarıyla Şanghay geçmiş ile geleceği aynı silüette buluşturur.',
    sources: ['Lonely Planet — Shanghai', 'Çin Turizm — Shanghai'],
  },
  {
    id: 'xian',
    name: "Xi'an",
    city: "Xi'an",
    country: 'Çin',
    lat: 34.3416,
    lng: 108.9398,
    aliases: ['xian', "xi'an", 'sian'],
    summary:
      'İpek Yolu’nun doğu ucundaki Xi’an, Çin’in ilk birleşik imparatorluğuna başkentlik yapmış, ülkenin en eski ve en önemli tarihî kentlerinden biridir. On üç hanedana ev sahipliği yapan bu kent, Çin uygarlığının beşiği sayılır.\n\nİlk imparator Qin Shi Huang’ın mezarını korumak için yapılan, binlerce gerçek boyutta pişmiş toprak asker ve attan oluşan Terracotta Ordusu (UNESCO), kentin dünyaca ünlü hazinesidir. Tümüyle korunmuş görkemli şehir surları, Büyük Yaban Kazı Pagodası ve canlı Müslüman Çarşısı da başlıca duraklardır.',
    sources: ['UNESCO World Heritage List — Mausoleum of the First Qin Emperor (Terracotta Army)', 'Lonely Planet — Xi’an'],
  },
  {
    id: 'guilin',
    name: 'Guilin',
    city: 'Guilin',
    country: 'Çin',
    lat: 25.2736,
    lng: 110.2907,
    aliases: ['guilin', 'yangshuo'],
    summary:
      'Güney Çin’deki Guilin ve çevresi, Li Nehri boyunca sisler içinde yükselen kubbe biçimli karst tepeleriyle geleneksel Çin resimlerinden fırlamış gibi büyüleyici bir manzara sunar. Bu peyzaj, yüzyıllardır şairlere ve ressamlara ilham vermiştir.\n\nGuilin’den Yangshuo’ya Li Nehri üzerinde yapılan tekne turu, dünyanın en ikonik doğa manzaralarından birini gözler önüne serer. Pirinç terasları, mağaraları ve bisikletle keşfedilen kırsalıyla bölge, doğa tutkunları için Çin’in en büyüleyici köşelerinden biridir.',
    sources: ['Lonely Planet — Guilin', 'Çin Turizm — Guilin'],
  },

  // --- Hindistan ---
  {
    id: 'delhi',
    name: 'Delhi',
    city: 'Delhi',
    country: 'Hindistan',
    lat: 28.6139,
    lng: 77.209,
    aliases: ['delhi', 'yeni delhi', 'new delhi'],
    summary:
      'Hindistan’ın başkenti Delhi, binlerce yıllık tarihi, Babür İmparatorluğu’nun ihtişamı ve modern başkentin buluştuğu bir zıtlıklar kentidir. Kaotik enerjisi, renkleri ve kokularıyla Hindistan’ın tüm yoğunluğunu tek bir kentte sunar.\n\nBabür döneminin kızıl kumtaşı Kızıl Kale’si, göğe uzanan Kutub Minar, mimari bir başyapıt olan Humayun Türbesi (hepsi UNESCO) ve devasa Cuma Camii başlıca duraklardır. Eski Delhi’nin dar çarşıları ile Yeni Delhi’nin geniş bulvarları, kentin ikili ruhunu yansıtır.',
    sources: ['UNESCO World Heritage List — Humayun’s Tomb / Qutb Minar', 'Lonely Planet — Delhi'],
  },
  {
    id: 'agra',
    name: 'Agra',
    city: 'Agra',
    country: 'Hindistan',
    lat: 27.1767,
    lng: 78.0081,
    aliases: ['agra', 'tac mahal', 'taj mahal'],
    summary:
      'Hindistan’ın kuzeyindeki Agra, dünyanın en ünlü anıtı sayılan Tac Mahal’e ev sahipliği yapmasıyla milyonlarca ziyaretçiyi çeker. Bir zamanlar Babür İmparatorluğu’nun başkenti olan kent, görkemli bir mimari mirasa sahiptir.\n\nBabür imparatoru Şah Cihan’ın eşinin anısına yaptırdığı, gün doğumunda büyülü bir görüntü sunan beyaz mermer Tac Mahal, kentin kalbidir. Kızıl kumtaşından Agra Kalesi ve yakınlardaki terk edilmiş görkemli başkent Fatehpur Sikri de UNESCO Dünya Mirası Listesi’ndedir.',
    sources: ['UNESCO World Heritage List — Taj Mahal', 'Lonely Planet — Agra'],
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    city: 'Jaipur',
    country: 'Hindistan',
    lat: 26.9124,
    lng: 75.7873,
    aliases: ['jaipur', 'pembe sehir'],
    summary:
      'Racastan eyaletinin başkenti Jaipur, tarihî merkezindeki binaların rengi nedeniyle “Pembe Şehir” olarak anılır ve Hindistan’ın masalsı maharaja mirasını yaşatır. Görkemli sarayları ve renkli çarşılarıyla büyüleyicidir.\n\nBir tepeye kurulu görkemli Amber Kalesi, yüzlerce kafesli pencereden oluşan Rüzgâr Sarayı (Hawa Mahal), Şehir Sarayı ve devasa güneş saatleriyle Jantar Mantar gözlemevi (UNESCO) başlıca duraklardır. Kumaş, mücevher ve el sanatları çarşılarıyla Jaipur, renk dolu bir kraliyet kentidir.',
    sources: ['UNESCO World Heritage List — Jaipur City', 'Lonely Planet — Jaipur'],
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    city: 'Varanasi',
    country: 'Hindistan',
    lat: 25.3176,
    lng: 82.9739,
    aliases: ['varanasi', 'benares', 'kasi'],
    summary:
      'Kutsal Ganj Nehri’nin kıyısındaki Varanasi, Hinduizmin en kutsal kenti ve dünyanın kesintisiz yaşayan en eski yerleşimlerinden biridir. Hindular için en kutsal yerlerden sayılan kent, derin bir manevi yoğunluk taşır.\n\nNehir kıyısındaki basamaklarda (ghat) şafak vakti yapılan yıkanma ve dua ritüelleri, akşamları düzenlenen ışıklı ve müzikli Ganga Aarti töreni ve nehir üzerinde tekne gezisi eşsiz bir deneyim sunar. Dar sokakları, tapınakları ve ipeğiyle Varanasi, Hindistan’ın ruhunu yansıtır.',
    sources: ['Lonely Planet — Varanasi', 'Hindistan Turizm — Varanasi'],
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    city: 'Mumbai',
    country: 'Hindistan',
    lat: 19.076,
    lng: 72.8777,
    aliases: ['mumbai', 'bombay'],
    summary:
      'Hindistan’ın batı kıyısındaki Mumbai, ülkenin finans başkenti ve dünyaca ünlü Bollywood film endüstrisinin evi olan enerjik bir metropoldür. Zenginlik ile yoksulluğun, gelenek ile hırsın iç içe geçtiği bir hayaller şehridir.\n\nDenize bakan tak Hindistan Kapısı, görkemli Viktorya dönemi tren garı Chhatrapati Shivaji Terminus (UNESCO) ve gün batımında yürünen sahil bulvarı Marine Drive başlıca duraklardır. Sömürge mimarisi, çarşıları ve durmak bilmeyen enerjisiyle Mumbai, modern Hindistan’ın kalbidir.',
    sources: ['UNESCO World Heritage List — Chhatrapati Shivaji Terminus', 'Lonely Planet — Mumbai'],
  },

  // --- Birleşik Arap Emirlikleri ---
  {
    id: 'dubai',
    name: 'Dubai',
    city: 'Dubai',
    country: 'Birleşik Arap Emirlikleri',
    lat: 25.2048,
    lng: 55.2708,
    aliases: ['dubai'],
    summary:
      'Basra Körfezi kıyısında, çölün ortasında yükselen Dubai, birkaç on yılda küçük bir balıkçı kasabasından baş döndürücü bir lüks ve mimari harika kentine dönüşmüştür. Ölçek ve ihtişam tutkusuyla mühendislik sınırlarını zorlar.\n\nDünyanın en yüksek binası Burj Khalifa, palmiye biçimli yapay ada Palm Jumeirah, dev alışveriş merkezleri ve gösterişli otelleriyle kent, modern lüksün simgesidir. Öte yandan, rüzgâr kuleleri ve dar sokaklarıyla tarihî Al Fahidi semti ile geleneksel çarşıları, eski Dubai’nin ruhunu yaşatır.',
    sources: ['Visit Dubai — resmi turizm portalı', 'Lonely Planet — Dubai'],
  },
  {
    id: 'abudabi',
    name: 'Abu Dabi',
    city: 'Abu Dhabi',
    country: 'Birleşik Arap Emirlikleri',
    lat: 24.4539,
    lng: 54.3773,
    aliases: ['abu dabi', 'abu dhabi', 'abudabi'],
    summary:
      'Birleşik Arap Emirlikleri’nin başkenti Abu Dabi, petrol zenginliğini kültür, sanat ve mimariye yatıran, Dubai’ye göre daha sakin ve görkemli bir körfez kentidir. Geniş bulvarları ve ada konumuyla ferah bir dokuya sahiptir.\n\nDünyanın en büyük ve en göz kamaştırıcı camilerinden bembeyaz Şeyh Zayed Camii, çölün ışığını mimariyle buluşturan Louvre Abu Dhabi müzesi ve heyecan dolu Ferrari World başlıca duraklardır. Corniche sahil bulvarı ve lüks otelleriyle Abu Dabi, kültür ve eğlenceyi bir araya getirir.',
    sources: ['Visit Abu Dhabi — resmi turizm portalı', 'Lonely Planet — Abu Dhabi'],
  },

  // --- Tayland ---
  {
    id: 'bangkok',
    name: 'Bangkok',
    city: 'Bangkok',
    country: 'Tayland',
    lat: 13.7563,
    lng: 100.5018,
    aliases: ['bangkok', 'krung thep'],
    summary:
      'Tayland’ın canlı başkenti Bangkok, ışıltılı tapınakları, hareketli kanalları ve durmak bilmeyen sokak yaşamıyla duyulara ziyafet çeken bir Güneydoğu Asya metropolüdür. Geleneksel maneviyat ile modern eğlenceyi çarpıcı biçimde birleştirir.\n\nİçinde Zümrüt Buda’nın bulunduğu görkemli Büyük Saray, nehir kıyısındaki Şafak Tapınağı Wat Arun, uzanan altın Buda’sıyla Wat Pho ve yüzen pazarlar başlıca duraklardır. Efsanevi sokak yemekleri, tuk-tuk’ları ve gece pazarlarıyla Bangkok, coşkulu ve baş döndürücü bir kenttir.',
    sources: ['Tourism Authority of Thailand — Bangkok', 'Lonely Planet — Bangkok'],
  },
  {
    id: 'chiangmai',
    name: 'Chiang Mai',
    city: 'Chiang Mai',
    country: 'Tayland',
    lat: 18.7883,
    lng: 98.9853,
    aliases: ['chiang mai', 'chiangmai'],
    summary:
      'Kuzey Tayland’ın dağlık kültür başkenti Chiang Mai, bir zamanlar bağımsız Lanna Krallığı’nın merkeziydi; bu miras, kente Bangkok’tan çok farklı, huzurlu ve gelenekli bir atmosfer kazandırmıştır. Ormanlarla çevrili konumu da onu cazip kılar.\n\nSurlar ve hendekle çevrili eski şehirdeki yüzlerce antik tapınak, kente tepeden bakan kutsal Doi Suthep Tapınağı ve etik fil bakım kampları başlıca öne çıkanlardır. Gece pazarları, dağ köyleri ve Yi Peng fener festivaliyle Chiang Mai, sakin ve otantik bir kaçış sunar.',
    sources: ['Tourism Authority of Thailand — Chiang Mai', 'Lonely Planet — Chiang Mai'],
  },
  {
    id: 'phuket',
    name: 'Phuket',
    city: 'Phuket',
    country: 'Tayland',
    lat: 7.8804,
    lng: 98.3923,
    aliases: ['phuket', 'puket'],
    summary:
      'Andaman Denizi’ndeki Phuket, Tayland’ın en büyük adası ve ülkenin en popüler tropik tatil merkezidir. Beyaz kumlu plajları, turkuaz koyları ve canlı gece hayatıyla her tür gezgine hitap eder.\n\nGeniş plajları ve sahil beldelerinin yanı sıra, çevredeki masalsı Phi Phi Adaları ve dev kayaların yükseldiği Phang Nga Körfezi (James Bond Adası) tekne turlarının gözdesidir. Portekiz-Çin karışımı mimarisiyle Eski Phuket Kasabası ve tepedeki Büyük Buda heykeliyle ada, deniz ile kültürü birleştirir.',
    sources: ['Tourism Authority of Thailand — Phuket', 'Lonely Planet — Phuket'],
  },

  // --- Endonezya ---
  {
    id: 'bali',
    name: 'Bali',
    city: 'Bali (Ubud)',
    country: 'Endonezya',
    lat: 8.5069,
    lng: 115.2625,
    aliases: ['bali', 'ubud', 'denpasar'],
    summary:
      'Endonezya’nın en ünlü adası Bali, yemyeşil pirinç terasları, volkanik dağları, tapınakları ve kendine özgü Hindu kültürüyle bir “Tanrılar Adası” olarak anılır. Manevi atmosferi ve doğal güzelliğiyle dünyanın en sevilen tropik cennetlerindendir.\n\nSanat ve maneviyat merkezi Ubud’un pirinç terasları ve maymun ormanı, denizin ortasındaki kayaya kurulu Tanah Lot ve uçurumdaki Uluwatu tapınakları başlıca duraklardır. Sörf plajları, spa gelenekleri ve günlük adaklarla süslü sokaklarıyla Bali, dinlence ve ruhun buluştuğu bir adadır.',
    sources: ['UNESCO World Heritage List — Cultural Landscape of Bali Province', 'Lonely Planet — Bali'],
  },
  {
    id: 'yogyakarta',
    name: 'Yogyakarta',
    city: 'Yogyakarta',
    country: 'Endonezya',
    lat: -7.7956,
    lng: 110.3695,
    aliases: ['yogyakarta', 'jogja', 'yogya'],
    summary:
      'Endonezya’nın Java adasındaki Yogyakarta, hâlâ bir sultanın yönettiği, ülkenin sanat, batik ve klasik dans geleneklerinin kalbi sayılan bir kültür kentidir. Aynı zamanda dünyanın en görkemli iki antik tapınağına açılan kapıdır.\n\nDünyanın en büyük Budist anıtı olan devasa Borobudur ve zarif kuleleriyle Hindu tapınağı Prambanan (her ikisi de UNESCO), gün doğumunda büyüleyici bir görüntü sunar. Sultan Sarayı (Kraton), gölge kuklası (wayang) gösterileri ve batik atölyeleriyle Yogyakarta, Java kültürünün özüdür.',
    sources: ['UNESCO World Heritage List — Borobudur / Prambanan Temple Compounds', 'Lonely Planet — Yogyakarta'],
  },

  // --- Vietnam ---
  {
    id: 'hanoi',
    name: 'Hanoi',
    city: 'Hanoi',
    country: 'Vietnam',
    lat: 21.0278,
    lng: 105.8342,
    aliases: ['hanoi'],
    summary:
      'Vietnam’ın bin yıllık başkenti Hanoi, dar sokaklı tarihî mahalleleri, huzurlu gölleri ve Fransız sömürge mimarisiyle Doğu ile Batı’nın çarpıcı bir karışımını sunar. Ülkenin siyasi ve kültürel kalbidir.\n\nHer biri bir zanaata adanmış dükkânlarla dolu hareketli Eski Mahalle, efsanevi Hoan Kiem Gölü ve tapınağı, anıtsal yapıları ve sokak kahvesi kültürü başlıca öne çıkanlardır. Ünlü pho çorbası, su kuklası gösterileri ve dünya harikası Ha Long Körfezi’ne yakınlığıyla Hanoi zengin bir duraktır.',
    sources: ['Lonely Planet — Hanoi', 'Vietnam Turizm — Hanoi'],
  },
  {
    id: 'hochiminh',
    name: 'Ho Chi Minh',
    city: 'Ho Chi Minh',
    country: 'Vietnam',
    lat: 10.8231,
    lng: 106.6297,
    aliases: ['ho chi minh', 'saigon', 'hochiminh'],
    summary:
      'Vietnam’ın güneyindeki en büyük ve en canlı kenti Ho Chi Minh (eski adıyla Saigon), motosiklet selleri, hareketli pazarları ve durmak bilmeyen enerjisiyle ülkenin ekonomik dinamosudur. Sömürge geçmişi ile modern hırsı iç içe yaşar.\n\nFransız döneminden kalma Notre-Dame Bazilikası ve Merkez Postane, Vietnam Savaşı’nın acılarını anlatan Savaş Kalıntıları Müzesi, tarihî Ben Thanh Pazarı ve yakınındaki Cu Chi yeraltı tünelleri başlıca duraklardır. Sokak yemekleri ve gece hayatıyla kent coşkuludur.',
    sources: ['Lonely Planet — Ho Chi Minh City', 'Vietnam Turizm — Ho Chi Minh'],
  },
  {
    id: 'halong',
    name: 'Ha Long Körfezi',
    city: 'Ha Long',
    country: 'Vietnam',
    lat: 20.9101,
    lng: 107.1839,
    aliases: ['ha long', 'halong', 'ha long korfezi'],
    summary:
      'Kuzey Vietnam’da, Tonkin Körfezi’nde zümrüt yeşili sulardan yükselen binlerce sarp kireçtaşı adası ve kayalığıyla Ha Long Körfezi, dünyanın en büyüleyici deniz manzaralarından biridir ve UNESCO Dünya Mirası Listesi’ndedir. Adı “alçalan ejderha” anlamına gelir.\n\nGeleneksel yelkenli (junk) teknelerle yapılan bir veya birkaç günlük turlar, adalar arasında süzülmeyi, gizli mağaraları ve deniz mağaralarını keşfetmeyi sağlar. Kano turları, yüzen balıkçı köyleri ve sisli gün doğumlarıyla körfez, unutulmaz bir doğa deneyimi sunar.',
    sources: ['UNESCO World Heritage List — Ha Long Bay', 'Lonely Planet — Ha Long Bay'],
  },

  // --- Kamboçya ---
  {
    id: 'siemreap',
    name: 'Siem Reap (Angkor)',
    city: 'Siem Reap',
    country: 'Kamboçya',
    lat: 13.3671,
    lng: 103.8448,
    aliases: ['siem reap', 'angkor', 'angkor wat', 'siemreap'],
    summary:
      'Kamboçya’daki Siem Reap, dünyanın en büyük dinî yapısı olan görkemli Angkor Wat’a ve bir zamanlar güçlü Khmer İmparatorluğu’nun devasa tapınak-şehrine açılan kapıdır. Bu kalıntılar, Güneydoğu Asya’nın en büyüleyici arkeolojik hazinesidir.\n\nGün doğumunda gölete yansıyan beş kuleli Angkor Wat (UNESCO), dev taş yüzlerle bezeli Bayon Tapınağı ve ağaç kökleriyle sarılıp doğaya karışmış Ta Prohm başlıca duraklardır. Canlı gece pazarları ve rahat havasıyla Siem Reap, tarih tutkunları için bir başnoktadır.',
    sources: ['UNESCO World Heritage List — Angkor', 'Lonely Planet — Siem Reap'],
  },

  // --- Singapur ---
  {
    id: 'singapur',
    name: 'Singapur',
    city: 'Singapore',
    country: 'Singapur',
    lat: 1.3521,
    lng: 103.8198,
    aliases: ['singapur', 'singapore'],
    summary:
      'Güneydoğu Asya’nın ucundaki şehir-devlet Singapur, tertemiz sokakları, kusursuz düzeni ve fütüristik mimarisiyle bir modernlik simgesidir. Çin, Malay, Hint ve Batı kültürlerini harmanlayan gerçek bir kavşak noktasıdır.\n\nDev yapay “Süper Ağaçları” ve seralarıyla Gardens by the Bay, çatısında gemi biçimli sonsuzluk havuzu bulunan Marina Bay Sands ve renkli Çin, Hint ve Arap mahalleleri başlıca duraklardır. Dünya çapındaki sokak lezzetleri (hawker center) ve yeşiliyle Singapur, geleceğin bahçe-kentidir.',
    sources: ['Visit Singapore — resmi turizm portalı', 'Lonely Planet — Singapore'],
  },

  // --- İran ---
  {
    id: 'isfahan',
    name: 'İsfahan',
    city: 'Isfahan',
    country: 'İran',
    lat: 32.6546,
    lng: 51.668,
    aliases: ['isfahan', 'i̇sfahan', 'esfahan'],
    summary:
      'İran’ın merkezindeki İsfahan, Safevi İmparatorluğu döneminde başkent olarak yaşadığı görkemli çağ nedeniyle “Dünyanın Yarısı” (Nesf-e Cahan) olarak anılır. Mavi-turkuaz çinileri ve zarif mimarisiyle İslam sanatının doruğunu temsil eder.\n\nDünyanın en büyük meydanlarından biri olan Nakş-ı Cihan (İmam Meydanı, UNESCO), onu çevreleyen çini kubbeli İmam ve Şeyh Lütfullah camileri, Ali Kapı Sarayı ve tarihî kapalı çarşı başlıca duraklardır. Zayanderud Nehri üzerindeki zarif çok gözlü köprüler (Si-o-se Pol) ise akşamları buluşma noktasıdır.',
    sources: ['UNESCO World Heritage List — Meidan Emam, Esfahan', 'Lonely Planet — Esfahan'],
  },
  {
    id: 'siraz',
    name: 'Şiraz',
    city: 'Shiraz',
    country: 'İran',
    lat: 29.5918,
    lng: 52.5837,
    aliases: ['siraz', 'şiraz', 'shiraz'],
    summary:
      'İran’ın güneyindeki Şiraz, yüzyıllardır şairlerin, güllerin, bülbüllerin ve şarabın kenti olarak anılan, İran kültürünün ve edebiyatının kalbidir. Ilıman iklimi ve zarif bahçeleriyle romantik bir atmosfer taşır.\n\nSabah güneşiyle içi rengârenk ışıklarla dolan Nasır el-Mülk Camii (Pembe Cami), ünlü şairler Hafız ile Sadi’nin türbeleri ve Eram gibi klasik İran bahçeleri başlıca duraklardır. Şiraz aynı zamanda, Pers İmparatorluğu’nun görkemli başkenti antik Persepolis’e (UNESCO) açılan kapıdır.',
    sources: ['UNESCO World Heritage List — Persepolis', 'Lonely Planet — Shiraz'],
  },
  {
    id: 'tahran',
    name: 'Tahran',
    city: 'Tehran',
    country: 'İran',
    lat: 35.6892,
    lng: 51.389,
    aliases: ['tahran', 'tehran', 'teheran'],
    summary:
      'İran’ın başkenti ve en büyük kenti Tahran, karlı Elburz Dağları’nın eteğinde kurulu, geleneksel çarşılar ile modern bulvarların iç içe geçtiği canlı bir metropoldür. Ülkenin siyasi, ekonomik ve kültürel merkezidir.\n\nKaçar hanedanından kalma görkemli çini ve ayna işçilikli Golestan Sarayı (UNESCO), dünyanın en değerli mücevher koleksiyonlarından birini barındıran hazine, çağdaş sanat müzeleri ve devasa Büyük Çarşı (Bazar) başlıca duraklardır. Dağ manzarası ve kafeleriyle Tahran modern İran’ı yansıtır.',
    sources: ['UNESCO World Heritage List — Golestan Palace', 'Lonely Planet — Tehran'],
  },

  // --- Ürdün ---
  {
    id: 'petra',
    name: 'Petra',
    city: 'Petra (Wadi Musa)',
    country: 'Ürdün',
    lat: 30.3285,
    lng: 35.4444,
    aliases: ['petra', 'wadi musa'],
    summary:
      'Ürdün’ün güneyindeki Petra, iki bin yıldan uzun süre önce Nebatiler tarafından pembe-kızıl kaya duvarlarına oyulmuş görkemli bir antik kenttir. Bir zamanlar zengin bir kervan ticareti başkenti olan kent, dünyanın yeni yedi harikasından biri sayılır (UNESCO).\n\nKilometrelerce uzunluğundaki dar ve yüksek bir kanyonun (Siq) sonunda aniden beliren, kayaya oyulmuş görkemli Hazine (Al-Khazneh) cephesi, Petra’nın ikonik görüntüsüdür. Manastır (Ad-Deir), kraliyet mezarları ve antik tiyatrosuyla kent, keşfedilmeyi bekleyen devasa bir açık hava müzesidir.',
    sources: ['UNESCO World Heritage List — Petra', 'Lonely Planet — Petra'],
  },
  {
    id: 'amman',
    name: 'Amman',
    city: 'Amman',
    country: 'Ürdün',
    lat: 31.9454,
    lng: 35.9284,
    aliases: ['amman'],
    summary:
      'Ürdün’ün başkenti Amman, yedi tepe üzerine kurulu, antik geçmişini modern bir Ortadoğu metropolüyle birleştiren canlı bir kenttir. Bölgeyi keşfetmek için ideal bir üs ve giriş noktası işlevi görür.\n\nKente tepeden bakan, Roma ve Emevi kalıntılarını barındıran antik Kale (Citadel), iyi korunmuş devasa Roma Tiyatrosu ve hareketli çarşıları (souk) başlıca duraklardır. Amman aynı zamanda görkemli Petra’ya, çöl manzaralı Wadi Rum’a ve dünyanın en tuzlu sularından Ölü Deniz’e açılan kapıdır.',
    sources: ['Visit Jordan — resmi turizm portalı', 'Lonely Planet — Amman'],
  },

  // --- Özbekistan ---
  {
    id: 'semerkand',
    name: 'Semerkand',
    city: 'Samarkand',
    country: 'Özbekistan',
    lat: 39.627,
    lng: 66.975,
    aliases: ['semerkand', 'samarkand', 'samarkant'],
    summary:
      'Özbekistan’daki Semerkand, İpek Yolu’nun en görkemli duraklarından biri ve büyük hükümdar Timur’un imparatorluğunun parlayan başkentiydi. Turkuaz kubbeleri ve devasa çinili yapılarıyla Orta Asya İslam sanatının doruğunu temsil eder.\n\nÜç görkemli medresenin çevrelediği efsanevi Registan Meydanı, Timur’un türbesi Gur-ı Emir, dev Bibi-Hanım Camii ve mavi çinilerle bezeli Şah-ı Zinde mezar sokağı başlıca duraklardır (hepsi UNESCO). İpek Yolu’nun ihtişamını yaşatan Semerkand, adeta açık hava bir sanat galerisidir.',
    sources: ['UNESCO World Heritage List — Samarkand – Crossroad of Cultures', 'Lonely Planet — Samarkand'],
  },
  {
    id: 'buhara',
    name: 'Buhara',
    city: 'Bukhara',
    country: 'Özbekistan',
    lat: 39.7747,
    lng: 64.4286,
    aliases: ['buhara', 'bukhara', 'buchara'],
    summary:
      'Özbekistan’daki Buhara, iki bin yılı aşkın geçmişiyle İpek Yolu’nun en kutsal kervan şehirlerinden biridir; bir zamanlar İslam dünyasının önemli bir ilim ve maneviyat merkeziydi. Tarihî merkezi, çağlar boyunca dokusunu koruyarak bugüne ulaşmıştır.\n\nGöğe uzanan Kalyan Minaresi ve camisi, medreseleri, kervansarayları ve kubbeli ticaret çarşılarıyla kentin tamamı UNESCO Dünya Mirası Listesi’ndedir. Dar toprak sokakları, havuz başındaki (Lyabi-Hauz) çınar gölgeli meydanı ve el sanatları dükkânlarıyla Buhara, yaşayan bir açık hava müzesidir.',
    sources: ['UNESCO World Heritage List — Historic Centre of Bukhara', 'Lonely Planet — Bukhara'],
  },

  // --- Nepal ---
  {
    id: 'katmandu',
    name: 'Katmandu',
    city: 'Kathmandu',
    country: 'Nepal',
    lat: 27.7172,
    lng: 85.324,
    aliases: ['katmandu', 'kathmandu'],
    summary:
      'Himalayalar’ın eteğinde bir vadide kurulu Katmandu, Nepal’in başkenti ve Hindu ile Budist kültürlerinin yüzyıllardır iç içe yaşadığı manevi bir merkezdir. Oymalı ahşap tapınakları ve canlı sokaklarıyla eşsiz bir atmosfer sunar.\n\nUsta işçilikli saray ve tapınaklarla dolu Durbar Meydanları, kutsal Hindu yakma alanı Pashupatinath ve dev gözleriyle bakan Boudhanath Budist stupası (hepsi UNESCO) başlıca duraklardır. Aynı zamanda Everest ve Annapurna trekleri ile Himalaya maceralarına açılan ana kapıdır.',
    sources: ['UNESCO World Heritage List — Kathmandu Valley', 'Lonely Planet — Kathmandu'],
  },

  // --- Güney Kore ---
  {
    id: 'seul',
    name: 'Seul',
    city: 'Seoul',
    country: 'Güney Kore',
    lat: 37.5665,
    lng: 126.978,
    aliases: ['seul', 'seoul'],
    summary:
      'Güney Kore’nin başkenti Seul, beş yüzyıllık saraylarını göğe uzanan gökdelenlerle ve K-pop çağının parıltısıyla birleştiren, sürekli hareket hâlindeki bir metropoldür. Han Nehri’nin iki yakasına yayılan kent, gelenek ile teknolojiyi ustaca harmanlar.\n\nGörkemli Gyeongbokgung Sarayı ve renkli nöbet değişim töreni, geleneksel hanok evleriyle Bukchon köyü, kente tepeden bakan N Seoul Kulesi ve canlı çarşıları başlıca duraklardır. Gece hayatı, alışverişi, Kore mutfağı ve teknoloji tutkusuyla Seul, dinamik bir Asya başkentidir.',
    sources: ['Korea Tourism Organization — Seoul', 'Lonely Planet — Seoul'],
  },

  // ================ AVUSTRALYA & OKYANUSYA — ŞEHİRLER ================
  {
    id: 'sydney',
    name: 'Sydney',
    city: 'Sydney',
    country: 'Avustralya',
    lat: -33.8688,
    lng: 151.2093,
    aliases: ['sydney', 'sidney'],
    summary:
      'Avustralya’nın en büyük ve en tanınmış kenti Sydney, dünyanın en güzel doğal limanlarından birine kurulu, güneşli yaşam tarzı ve simge yapılarıyla ünlüdür. Plajları, körfezi ve canlı dokusuyla ülkenin vitrini gibidir.\n\nYelken biçimli çatısıyla ikonik Sydney Opera Binası, dev çelik Liman Köprüsü (üzerine tırmanılabilir) ve sörfçülerin uğrağı ünlü Bondi Plajı başlıca duraklardır. Feribotla gezilen körfezi, Kraliyet Botanik Bahçesi ve rahat sahil semtleriyle Sydney, doğa ile kenti buluşturur.',
    sources: ['UNESCO World Heritage List — Sydney Opera House', 'Lonely Planet — Sydney'],
  },
  {
    id: 'melbourne',
    name: 'Melbourne',
    city: 'Melbourne',
    country: 'Avustralya',
    lat: -37.8136,
    lng: 144.9631,
    aliases: ['melbourne'],
    summary:
      'Avustralya’nın güneyindeki Melbourne, sanat, kahve ve spor tutkusuyla ülkenin kültür başkenti sayılır; yıllarca “dünyanın en yaşanabilir kenti” seçilmiştir. Viktorya dönemi zarafetini modern yaratıcılıkla birleştiren zarif bir metropoldür.\n\nSokak sanatıyla bezeli gizli ara sokakları (laneway), butik kafeleri, görkemli viktoryen binaları ve Melbourne Cricket Ground gibi spor tapınakları başlıca öne çıkanlardır. Avustralya Açık tenis turnuvası ve Grand Prix gibi etkinlikleri, tramvayları ve yeme-içme sahnesiyle Melbourne dinamik bir kenttir.',
    sources: ['Lonely Planet — Melbourne', 'Visit Victoria — Melbourne'],
  },
  {
    id: 'cairns',
    name: 'Cairns',
    city: 'Cairns',
    country: 'Avustralya',
    lat: -16.9186,
    lng: 145.7781,
    aliases: ['cairns', 'great barrier reef', 'buyuk set resifi'],
    summary:
      'Avustralya’nın tropik kuzeydoğusundaki Cairns, dünyanın en büyük mercan resifi sistemi Büyük Set Resifi’ne (UNESCO) açılan kapı olarak dünyaca ünlüdür. Rahat havası ve doğa maceralarıyla gezginlerin üssüdür.\n\nRengârenk mercanları ve deniz yaşamıyla Büyük Set Resifi’nde dalış ve şnorkel, dünyanın en eski tropik yağmur ormanlarından Daintree ve teleferikle geçilen Kuranda başlıca cazibelerdir. Deniz kıyısı yürüyüş yolu (Esplanade) ve tropik iklimiyle Cairns, resif ve orman keşfinin merkezidir.',
    sources: ['UNESCO World Heritage List — Great Barrier Reef', 'Lonely Planet — Cairns'],
  },
  {
    id: 'uluru',
    name: 'Uluru',
    city: 'Uluru (Ayers Rock)',
    country: 'Avustralya',
    lat: -25.3444,
    lng: 131.0369,
    aliases: ['uluru', 'ayers rock'],
    summary:
      'Avustralya’nın kızıl çölünün tam ortasında tek başına yükselen devasa kumtaşı kaya Uluru (Ayers Rock), kıtanın en ikonik doğa anıtı ve yerli Aborjin halkı için kutsal bir yerdir. Uçsuz bucaksız çölün ortasındaki bu görkemli oluşum, derin bir manevi anlam taşır (UNESCO).\n\nGün doğumu ve batımında kırmızıdan mora uzanan renk değişimiyle büyüleyen kaya, çevresindeki yürüyüş yolları, mağara resimleri ve Aborjin kültür merkeziyle keşfedilir. Yakınındaki kubbe biçimli Kata Tjuta oluşumlarıyla birlikte Uluru, Avustralya’nın ruhunu yansıtır.',
    sources: ['UNESCO World Heritage List — Uluru-Kata Tjuta National Park', 'Lonely Planet — Uluru'],
  },
  {
    id: 'auckland',
    name: 'Auckland',
    city: 'Auckland',
    country: 'Yeni Zelanda',
    lat: -36.8485,
    lng: 174.7633,
    aliases: ['auckland', 'okland'],
    summary:
      'Yeni Zelanda’nın en büyük kenti Auckland, iki limanın arasına ve sönmüş volkan tepelerinin üzerine kurulu, teknelere olan tutkusu nedeniyle “Yelkenler Şehri” olarak anılır. Doğa ile kent yaşamının iç içe geçtiği çok kültürlü bir metropoldür.\n\nKente panoramik manzara sunan Sky Tower, hareketli liman bölgesi, volkanik tepeler (Mount Eden) ve çevredeki adalar başlıca duraklardır. Feribotla ulaşılan bağlı adaları, plajları ve yelkenli gezileriyle Auckland, Yeni Zelanda maceralarının canlı bir başlangıç noktasıdır.',
    sources: ['Lonely Planet — Auckland', 'Tourism New Zealand — Auckland'],
  },
  {
    id: 'queenstown',
    name: 'Queenstown',
    city: 'Queenstown',
    country: 'Yeni Zelanda',
    lat: -45.0312,
    lng: 168.6626,
    aliases: ['queenstown'],
    summary:
      'Yeni Zelanda’nın Güney Adası’nda, karlı Remarkables dağlarının eteğinde ve berrak Wakatipu Gölü kıyısında kurulu Queenstown, nefes kesen manzaraları ve adrenalin dolu aktiviteleriyle dünyanın “macera başkenti” olarak anılır.\n\nBungee jumping’in doğduğu yer olan kent; jet bot turları, kayak merkezleri, göl gezileri ve dağ yürüyüşleriyle her mevsim heyecan sunar. Aynı zamanda, dünyanın en görkemli fiyortlarından Milford Sound’a ve “Yüzüklerin Efendisi” manzaralarına açılan bir üstür.',
    sources: ['Lonely Planet — Queenstown', 'Tourism New Zealand — Queenstown'],
  },

  // ===================== AMERİKA — ŞEHİRLER =====================
  // --- ABD ---
  {
    id: 'newyork',
    name: 'New York',
    city: 'New York',
    country: 'Amerika Birleşik Devletleri',
    lat: 40.7128,
    lng: -74.006,
    aliases: ['new york', 'newyork', 'nyc', 'manhattan'],
    summary:
      'ABD’nin en büyük kenti New York, göçmenlerin kurduğu, dünyanın dört bir yanından kültürleri bir araya getiren bir “eritme potası” ve küresel kültür, sanat, moda ile finansın başkentlerinden biridir. Baş döndürücü enerjisiyle “Uyumayan Şehir” olarak anılır.\n\nÖzgürlük Heykeli, ışıl ışıl Times Square, kentin ortasındaki dev yeşil vaha Central Park, Empire State Binası ve dünya çapındaki müzeleri (Met, MoMA) başlıca duraklardır. Broadway tiyatroları, çok kültürlü semtleri ve gökdelen silüetiyle New York, tükenmez bir keşif sunar.',
    sources: ['UNESCO World Heritage List — Statue of Liberty', 'Lonely Planet — New York City'],
  },
  {
    id: 'sanfrancisco',
    name: 'San Francisco',
    city: 'San Francisco',
    country: 'Amerika Birleşik Devletleri',
    lat: 37.7749,
    lng: -122.4194,
    aliases: ['san francisco', 'sanfrancisco', 'frisco'],
    summary:
      'Kaliforniya’nın kuzeyinde, bir yarımada üzerine kurulu San Francisco, sisli körfezi, dik tepeleri ve tarihî tramvaylarıyla ABD’nin en özgün ve en güzel kentlerinden biridir. Özgür ruhu ve teknoloji dünyasına (Silikon Vadisi) yakınlığıyla da tanınır.\n\nKörfezin ağzında yükselen kızıl-turuncu Golden Gate Köprüsü, bir zamanlar hapishane olan Alcatraz adası, dönerek yol alan tramvayları ve renkli Victoria dönemi evleri başlıca duraklardır. Fisherman’s Wharf, Çin Mahallesi ve tepe manzaralarıyla San Francisco büyüleyicidir.',
    sources: ['Lonely Planet — San Francisco', 'Visit California — San Francisco'],
  },
  {
    id: 'losangeles',
    name: 'Los Angeles',
    city: 'Los Angeles',
    country: 'Amerika Birleşik Devletleri',
    lat: 34.0522,
    lng: -118.2437,
    aliases: ['los angeles', 'losangeles', 'la', 'hollywood'],
    summary:
      'Güney Kaliforniya’nın uçsuz bucaksız metropolü Los Angeles, sinemanın başkenti Hollywood’a ev sahipliği yapmasıyla yıldız tozu ve hayal fabrikası çağrışımı yapar. Yıl boyu süren güneşi, plajları ve rahat yaşam tarzıyla ünlüdür.\n\nTepedeki ünlü Hollywood tabelası, yıldızların adlarını taşıyan Walk of Fame, Getty ve LACMA müzeleri, Santa Monica sahili ve tema parkları (Disneyland, Universal) başlıca duraklardır. Otoyolları, sörf plajları ve çeşitliliğiyle Los Angeles, Kaliforniya rüyasının simgesidir.',
    sources: ['Lonely Planet — Los Angeles', 'Discover Los Angeles — resmi turizm'],
  },
  {
    id: 'lasvegas',
    name: 'Las Vegas',
    city: 'Las Vegas',
    country: 'Amerika Birleşik Devletleri',
    lat: 36.1699,
    lng: -115.1398,
    aliases: ['las vegas', 'lasvegas', 'vegas'],
    summary:
      'Nevada çölünün ortasında bir vaha gibi yükselen Las Vegas, gösterişli otelleri, kumarhaneleri ve durmak bilmeyen eğlencesiyle dünyanın gösteri ve eğlence başkentidir. Yoktan var edilmiş bu kent, abartının ve fantezinin cisimleşmiş hâlidir.\n\nDünyanın simge yapılarının kopyalarını barındıran temalı dev otelleriyle ışıltılı ana bulvar “Strip”, kumarhaneleri, sahne şovları ve konserleri kenti 7/24 canlı tutar. Las Vegas aynı zamanda görkemli Grand Canyon, Hoover Barajı ve çöl milli parklarına açılan bir üstür.',
    sources: ['Lonely Planet — Las Vegas', 'Visit Las Vegas — resmi turizm'],
  },
  {
    id: 'washington',
    name: 'Washington D.C.',
    city: 'Washington',
    country: 'Amerika Birleşik Devletleri',
    lat: 38.9072,
    lng: -77.0369,
    aliases: ['washington', 'washington dc', 'dc'],
    summary:
      'Amerika Birleşik Devletleri’nin başkenti Washington D.C., anıtsal binaları, geniş bulvarları ve ulusun kurucu değerlerini simgeleyen yapılarıyla planlı bir başkenttir. Ülkenin siyasi kalbi olarak tarihe yön veren kararların alındığı yerdir.\n\nKongre binası Capitol, Beyaz Saray, Lincoln ve Washington anıtları ve bunların sıralandığı geniş yeşil National Mall başlıca duraklardır. Mall boyunca uzanan, uzay mekiklerinden sanata dünyaca ünlü ve ücretsiz Smithsonian müzeleri ise kenti bir bilgi hazinesine dönüştürür.',
    sources: ['Lonely Planet — Washington DC', 'Smithsonian — resmi portal'],
  },

  // --- Kanada ---
  {
    id: 'toronto',
    name: 'Toronto',
    city: 'Toronto',
    country: 'Kanada',
    lat: 43.6532,
    lng: -79.3832,
    aliases: ['toronto'],
    summary:
      'Ontario Gölü kıyısındaki Toronto, Kanada’nın en büyük kenti ve dünyanın en çok kültürlü metropollerinden biridir; sakinlerinin yarısından fazlası ülke dışında doğmuştur. Bu çeşitlilik, kente canlı ve kozmopolit bir hava katar.\n\nGöl kıyısındaki silüete hâkim, camdan zeminli seyir terasıyla simge CN Kulesi, tarihî Distillery Bölgesi, çarşıları ve müzeleri başlıca duraklardır. Kent aynı zamanda, dünyanın en görkemli doğa harikalarından biri olan Niagara Şelalesi’ne açılan kapıdır.',
    sources: ['Lonely Planet — Toronto', 'Destination Toronto — resmi turizm'],
  },
  {
    id: 'vancouver',
    name: 'Vancouver',
    city: 'Vancouver',
    country: 'Kanada',
    lat: 49.2827,
    lng: -123.1207,
    aliases: ['vancouver'],
    summary:
      'Kanada’nın batı kıyısında, Pasifik Okyanusu ile karlı Coast Dağları arasına kurulu Vancouver, doğa ile kent yaşamını eşsiz biçimde birleştiren dünyanın en yaşanası kentlerinden biridir. Ilıman iklimi ve yeşil dokusuyla dışarıda yaşama tutkusunu yansıtır.\n\nYağmur ormanı, plajları ve deniz kıyısı yürüyüş yoluyla devasa Stanley Park, tarihî Gastown semti, Capilano asma köprüsü ve yakındaki Grouse ile Whistler kayak merkezleri başlıca cazibelerdir. Aynı gün hem kayak hem sahil keyfi sunan Vancouver, doğa tutkunlarının cennetidir.',
    sources: ['Lonely Planet — Vancouver', 'Destination Vancouver — resmi turizm'],
  },
  {
    id: 'montreal',
    name: 'Montreal',
    city: 'Montréal',
    country: 'Kanada',
    lat: 45.5019,
    lng: -73.5674,
    aliases: ['montreal', 'montréal'],
    summary:
      'Quebec’teki Montreal, Fransızcanın konuşulduğu, arnavut kaldırımlı sokakları ve zarif kiliseleriyle Kuzey Amerika’nın en Avrupai kentlerinden biridir. Fransız çekiciliğini Kuzey Amerika enerjisiyle birleştiren canlı bir kültür merkezidir.\n\nSt. Lawrence Nehri kıyısındaki tarihî Eski Montreal, mavi ışıklı görkemli Notre-Dame Bazilikası, tepedeki Mont-Royal Parkı ve yer altı şehri başlıca duraklardır. Caz ve komedi festivalleri, bistroları ve çok dilli atmosferiyle Montreal, coşkulu bir kenttir.',
    sources: ['Lonely Planet — Montréal', 'Tourisme Montréal — resmi turizm'],
  },

  // --- Meksika ---
  {
    id: 'mexicocity',
    name: 'Meksiko',
    city: 'Ciudad de México',
    country: 'Meksika',
    lat: 19.4326,
    lng: -99.1332,
    aliases: ['meksiko', 'mexico city', 'mexico', 'cdmx'],
    summary:
      'Meksika’nın devasa başkenti Meksiko, bir zamanlar bir gölün ortasındaki Aztek başkenti Tenochtitlan’ın üzerine kuruludur; katmanlı tarihiyle Amerika’nın en köklü ve en canlı metropollerinden biridir. Yüksek rakımlı geniş bir vadide yer alır.\n\nDevasa merkez meydanı Zócalo ve altındaki Aztek Templo Mayor kalıntıları, dünyanın en zengin arkeoloji müzelerinden Antropoloji Müzesi ve yakınlardaki devasa Güneş ve Ay piramitleriyle Teotihuacan (UNESCO) başlıca duraklardır. Renkli mahalleleri ve mutfağıyla kent büyüler.',
    sources: ['UNESCO World Heritage List — Historic Centre of Mexico City / Teotihuacan', 'Lonely Planet — Mexico City'],
  },
  {
    id: 'cancun',
    name: 'Cancún',
    city: 'Cancún',
    country: 'Meksika',
    lat: 21.1619,
    lng: -86.8515,
    aliases: ['cancun', 'cancún', 'riviera maya'],
    summary:
      'Meksika’nın Yucatán Yarımadası’nda, Karayip Denizi’nin turkuaz sularına açılan Cancún, bembeyaz kumlu plajları ve lüks tatil bölgeleriyle dünyanın en popüler deniz destinasyonlarından biridir. Modern otel şeridiyle keyifli bir tatil sunar.\n\nGeniş plajlarının ve Riviera Maya beldelerinin yanı sıra, dünyanın yeni yedi harikasından Maya piramidi Chichén Itzá, deniz kıyısındaki Tulum kalıntıları ve yüzülebilen doğal kuyular (cenote) çevredeki başlıca cazibelerdir. Cancún deniz ile antik tarihi birleştirir.',
    sources: ['UNESCO World Heritage List — Chichen-Itza', 'Lonely Planet — Cancún'],
  },

  // --- Küba ---
  {
    id: 'havana',
    name: 'Havana',
    city: 'La Habana',
    country: 'Küba',
    lat: 23.1136,
    lng: -82.3666,
    aliases: ['havana', 'la habana'],
    summary:
      'Küba’nın başkenti Havana, 1950’lerden kalma klasik Amerikan arabaları, solmuş ama görkemli sömürge binaları ve canlı müziğiyle adeta zamanda donmuş büyüleyici bir Karayip kentidir. Nostaljik atmosferiyle benzersizdir.\n\nRengârenk sömürge cephelerinin sıralandığı, meydanları ve kaleleriyle tarihî Eski Havana (UNESCO), deniz kıyısı boyunca uzanan hareketli Malecón bulvarı ve tarihî barları başlıca duraklardır. Salsa ritimleri, puroları ve sıcakkanlı halkıyla Havana eşsiz bir deneyim sunar.',
    sources: ['UNESCO World Heritage List — Old Havana and its Fortifications', 'Lonely Planet — Havana'],
  },

  // --- Brezilya ---
  {
    id: 'rio',
    name: 'Rio de Janeiro',
    city: 'Rio de Janeiro',
    country: 'Brezilya',
    lat: -22.9068,
    lng: -43.1729,
    aliases: ['rio', 'rio de janeiro'],
    summary:
      'Brezilya’nın “Muhteşem Şehir” (Cidade Maravilhosa) lakaplı Rio de Janeiro, dağların, ormanın ve okyanusun iç içe geçtiği çarpıcı doğasıyla dünyanın en güzel konumlu kentlerinden biridir. Coşkulu ruhu ve karnavalıyla ünlüdür.\n\nBir tepeden kollarını açmış dev Kurtarıcı İsa heykeli (Cristo Redentor), teleferikle çıkılan Şeker Somunu Tepesi ve dünyaca ünlü Copacabana ile İpanema plajları başlıca duraklardır. Samba ritimleri, futbol tutkusu ve görkemli karnavalıyla Rio, enerji doludur.',
    sources: ['UNESCO World Heritage List — Rio de Janeiro: Carioca Landscapes', 'Lonely Planet — Rio de Janeiro'],
  },
  {
    id: 'saopaulo',
    name: 'São Paulo',
    city: 'São Paulo',
    country: 'Brezilya',
    lat: -23.5505,
    lng: -46.6333,
    aliases: ['sao paulo', 'são paulo', 'saopaulo'],
    summary:
      'Brezilya’nın ve güney yarımkürenin en büyük kenti São Paulo, uçsuz bucaksız gökdelenleri, güçlü ekonomisi ve zengin kültür sahnesiyle ülkenin dinamosudur. Dünyanın her yerinden göçmenleri barındıran, kozmopolit bir metropoldür.\n\nCadde üzerinde asılı gibi duran mimarisiyle São Paulo Sanat Müzesi (MASP), hareketli Paulista Bulvarı, sokak sanatı ve sınırsız dünya mutfağı başlıca öne çıkanlardır. Sanat galerileri, restoranları ve durmak bilmeyen gece hayatıyla São Paulo, Brezilya’nın kültür ve iş merkezidir.',
    sources: ['Lonely Planet — São Paulo', 'Visit São Paulo — resmi turizm'],
  },

  // --- Arjantin ---
  {
    id: 'buenosaires',
    name: 'Buenos Aires',
    city: 'Buenos Aires',
    country: 'Arjantin',
    lat: -34.6037,
    lng: -58.3816,
    aliases: ['buenos aires', 'buenosaires'],
    summary:
      'Arjantin’in başkenti Buenos Aires, zarif bulvarları, Avrupai mimarisi ve tutkulu tango kültürüyle “Güney Amerika’nın Parisi” olarak anılır. Latin ateşini Avrupa şıklığıyla birleştiren büyüleyici bir metropoldür.\n\nRenkli teneke evleriyle La Boca mahallesi, görkemli anıt mezarlarıyla Recoleta Mezarlığı, geniş 9 Temmuz Bulvarı ve tarihî kafeleri başlıca duraklardır. Sokaklarda dans edilen tango, biftek kültürü (asado) ve gece geç saatlere uzanan yaşamıyla Buenos Aires, ihtiraslı bir kenttir.',
    sources: ['Lonely Planet — Buenos Aires', 'Turismo Buenos Aires — resmi'],
  },

  // --- Peru ---
  {
    id: 'cusco',
    name: 'Cusco (Machu Picchu)',
    city: 'Cusco',
    country: 'Peru',
    lat: -13.5319,
    lng: -71.9675,
    aliases: ['cusco', 'cuzco', 'machu picchu', 'machupicchu'],
    summary:
      'And Dağları’nda, yüksek bir vadide kurulu Cusco, bir zamanlar güçlü İnka İmparatorluğu’nun başkentiydi; İnka taş duvarları üzerine inşa edilen sömürge yapılarıyla iki uygarlığın iç içe geçtiği büyüleyici bir kenttir. Tarihî merkezi UNESCO korumasındadır.\n\nKusursuz işçilikli İnka duvarları, sömürge katedrali ve meydanı, çevredeki Kutsal Vadi ve renkli pazarları öne çıkar. Cusco her şeyden önce, bulutların üzerindeki efsanevi kayıp İnka şehri Machu Picchu’ya (UNESCO) açılan kapıdır; bu antik kent dünyanın en büyüleyici manzaralarından birini sunar.',
    sources: ['UNESCO World Heritage List — Historic Sanctuary of Machu Picchu', 'Lonely Planet — Cusco'],
  },
  {
    id: 'lima',
    name: 'Lima',
    city: 'Lima',
    country: 'Peru',
    lat: -12.0464,
    lng: -77.0428,
    aliases: ['lima'],
    summary:
      'Peru’nun başkenti Lima, Pasifik Okyanusu’na bakan uçurumlara kurulu, sömürge geçmişi ile modern yaşamı ve olağanüstü mutfağını birleştiren canlı bir kenttir. Bir zamanlar İspanyol sömürge imparatorluğunun Güney Amerika’daki merkeziydi.\n\nGörkemli meydanı, katedrali ve balkonlu sömürge yapılarıyla tarihî merkezi (UNESCO), okyanusa bakan zarif Miraflores ve sanatçı semti Barranco başlıca duraklardır. Ceviche gibi lezzetleri ve dünyanın en iyi restoranlarına ev sahipliği yapmasıyla Lima, Güney Amerika’nın gastronomi başkentidir.',
    sources: ['UNESCO World Heritage List — Historic Centre of Lima', 'Lonely Planet — Lima'],
  },

  // --- Şili ---
  {
    id: 'santiago',
    name: 'Santiago',
    city: 'Santiago',
    country: 'Şili',
    lat: -33.4489,
    lng: -70.6693,
    aliases: ['santiago', 'santiago sili'],
    summary:
      'Şili’nin başkenti Santiago, karlı And Dağları’nın nefes kesen zirveleri altında uzanan, modern ve canlı bir metropoldür. Ülkenin siyasi, kültürel ve ekonomik kalbi olarak dinamik bir enerji taşır.\n\nTarihî Plaza de Armas meydanı, kente panoramik manzara sunan San Cristóbal ve Santa Lucía tepeleri, müzeleri ve çağdaş semtleri başlıca duraklardır. Santiago aynı zamanda dünyaca ünlü Şili şaraplarının üretildiği çevre vadilere, kayak merkezlerine ve Pasifik sahiline açılan bir üstür.',
    sources: ['Lonely Planet — Santiago', 'Chile Travel — Santiago'],
  },

  // --- Kolombiya ---
  {
    id: 'cartagena',
    name: 'Cartagena',
    city: 'Cartagena',
    country: 'Kolombiya',
    lat: 10.391,
    lng: -75.4794,
    aliases: ['cartagena', 'kartagena'],
    summary:
      'Kolombiya’nın Karayip kıyısındaki Cartagena, surlarla çevrili rengârenk sömürge eski şehri ve sıcak Latin atmosferiyle ülkenin en büyüleyici kentidir. Bir zamanlar İspanyol hazine gemilerinin ve korsanların uğrağı olan stratejik bir liman kalesiydi.\n\nÇiçekli balkonları, arnavut kaldırımlı sokakları ve renkli evleriyle surlarla çevrili tarihî merkez (UNESCO), görkemli San Felipe Kalesi ve canlı meydanları başlıca duraklardır. Deniz, müzik ve renk dolu havasıyla Cartagena, romantik bir Karayip kaçamağı sunar.',
    sources: ['UNESCO World Heritage List — Port, Fortresses and Group of Monuments, Cartagena', 'Lonely Planet — Cartagena'],
  },

  {
    id: 'ayasofya',
    name: 'Ayasofya',
    city: 'İstanbul',
    country: 'Türkiye',
    lat: 41.0086,
    lng: 28.9802,
    aliases: ['ayasofya', 'hagia sophia', 'sancta sophia', 'aya sofya', 'hagia sofia'],
    summary:
      'Ayasofya, 537 yılında Doğu Roma (Bizans) İmparatoru I. Justinianus tarafından bir katedral olarak tamamlandı ve neredeyse bin yıl boyunca dünyanın en büyük kubbeli yapısı olarak kaldı. Isidoros ve Anthemios’un tasarladığı, yeri âdeta havada asılı gibi görünen devasa merkezi kubbesi, mühendislik tarihinin dönüm noktalarından biri sayılır. 1453’te İstanbul’un fethiyle camiye çevrildi; Osmanlı döneminde eklenen minareler, mihrap ve hat levhalarıyla iki büyük medeniyetin izlerini aynı mekânda taşır.\n\n1935’te Atatürk’ün kararıyla müzeye dönüştürülen yapı, 2020’de yeniden ibadete açıldı. İçindeki altın zeminli Bizans mozaikleri, devşirme sütunları ve “terleyen sütun” gibi efsaneleriyle, Doğu ile Batı’nın, Hristiyanlık ile İslam’ın kesiştiği eşsiz bir kültürel katman sunar. İstanbul’un tarihi yarımadasının kalbinde, Sultanahmet Meydanı’na bakar.',
    sources: [
      'UNESCO World Heritage List — Historic Areas of Istanbul',
      'T.C. Kültür ve Turizm Bakanlığı — Ayasofya-i Kebir Cami-i Şerifi',
    ],
  },
  {
    id: 'sultanahmet',
    name: 'Sultanahmet Camii (Mavi Cami)',
    city: 'İstanbul',
    country: 'Türkiye',
    lat: 41.0054,
    lng: 28.9768,
    aliases: ['sultanahmet', 'sultan ahmet', 'blue mosque', 'mavi cami', 'sultanahmet camii'],
    summary:
      'Sultan I. Ahmed adına Mimar Sedefkâr Mehmed Ağa tarafından 1609–1616 arasında inşa edilen Sultanahmet Camii, altı minaresi ve iç mekânını süsleyen on binlerce İznik çinisiyle ünlüdür. Bu mavi-yeşil tonlu çiniler yapıya Batı dillerinde “Blue Mosque” (Mavi Cami) adını kazandırmıştır. Klasik Osmanlı mimarisinin doruk örneklerinden biri olan cami, kademeli yarım kubbeleriyle Ayasofya’ya bilinçli bir karşılık niteliği taşır.\n\nCami, Bizans’ın Hipodrom alanının hemen yanında yükselir; avlusu, Dikilitaş ve çevredeki tarihi yapılarla birlikte İstanbul’un en yoğun ziyaret edilen meydanını oluşturur. Hâlâ aktif bir ibadethane olduğundan namaz vakitleri dışında ziyarete açıktır.',
    sources: [
      'UNESCO World Heritage List — Historic Areas of Istanbul',
      'Lonely Planet — Blue Mosque (Sultanahmet Camii)',
    ],
  },
  {
    id: 'topkapi',
    name: 'Topkapı Sarayı',
    city: 'İstanbul',
    country: 'Türkiye',
    lat: 41.0115,
    lng: 28.9834,
    aliases: ['topkapi', 'topkapı', 'topkapi sarayi', 'topkapı sarayı', 'topkapi palace'],
    summary:
      'Topkapı Sarayı, Fatih Sultan Mehmed’in emriyle 1460’lı yıllarda kurulmuş ve yaklaşık dört yüzyıl boyunca Osmanlı padişahlarının hem devlet merkezi hem de ikametgâhı olmuştur. Avlular halinde genişleyen yapı; Divan-ı Hümâyun, Harem, mutfaklar ve hazine daireleriyle bir saraydan çok küçük bir şehir gibidir. Sarayın konumu, Haliç, Boğaz ve Marmara’nın buluştuğu Sarayburnu’na hâkimdir.\n\nBugün müze olan sarayda Kutsal Emanetler Dairesi, murassa Topkapı Hançeri ve Kaşıkçı Elması gibi hazineler sergilenir. İnce işçilikli çeşmeleri, çini panoları ve manzara köşkleriyle Osmanlı saray yaşamının en zengin maddi tanığıdır.',
    sources: [
      'UNESCO World Heritage List — Historic Areas of Istanbul',
      'Millî Saraylar / Topkapı Sarayı Müzesi resmi portalı',
    ],
  },
  {
    id: 'kapadokya',
    name: 'Kapadokya (Göreme)',
    city: 'Nevşehir',
    country: 'Türkiye',
    lat: 38.6431,
    lng: 34.8289,
    aliases: ['kapadokya', 'cappadocia', 'goreme', 'göreme', 'peribacaları', 'peri bacaları', 'uchisar', 'uçhisar'],
    summary:
      'Kapadokya, milyonlarca yıl önce Erciyes, Hasan ve Göllü dağlarının püskürttüğü volkanik tüfün rüzgâr ve suyla aşınmasıyla oluşan “peri bacaları” manzarasıyla dünyaca tanınır. Yumuşak kayaların kolay oyulabilir yapısı, insanların binlerce yıl boyunca buraya evler, kiliseler ve Derinkuyu gibi çok katlı yeraltı şehirleri kazmasına imkân vermiştir.\n\nGöreme Açık Hava Müzesi’ndeki kaya kiliseleri, erken Hristiyanlık döneminin fresklerini barındırır ve bölge UNESCO Dünya Mirası Listesi’nde yer alır. Gün doğumunda yüzlerce sıcak hava balonunun vadiler üzerinde süzülmesi, Kapadokya’nın simgesi hâline gelmiştir.',
    sources: [
      'UNESCO World Heritage List — Göreme National Park and the Rock Sites of Cappadocia',
      'T.C. Kültür ve Turizm Bakanlığı — Kapadokya',
    ],
  },
  {
    id: 'efes',
    name: 'Efes Antik Kenti',
    city: 'İzmir (Selçuk)',
    country: 'Türkiye',
    lat: 37.9410,
    lng: 27.3419,
    aliases: ['efes', 'ephesus', 'efes antik kenti', 'celsus', 'celsus kütüphanesi'],
    summary:
      'Efes, Antik Çağ’da Ege kıyısının en görkemli liman kentlerinden biriydi; İyon, Helenistik ve Roma dönemlerinde önemli bir ticaret, din ve kültür merkezi olarak parladı. Cephe mimarisiyle büyüleyen Celsus Kütüphanesi, 25 bin kişilik Büyük Tiyatro ve mermer döşeli Kuretler Caddesi, kentin ihtişamını bugüne taşır. Dünyanın Yedi Harikası’ndan Artemis Tapınağı da buradaydı.\n\nHristiyanlık tarihinde de merkezî bir yere sahip olan Efes, Aziz Pavlus’un vaaz verdiği ve Meryem Ana’nın son yıllarını geçirdiğine inanılan bölgeye ev sahipliği yapar. Kent, 2015’ten bu yana UNESCO Dünya Mirası Listesi’nde yer almaktadır.',
    sources: [
      'UNESCO World Heritage List — Ephesus',
      'Lonely Planet — Ephesus',
    ],
  },
  {
    id: 'pamukkale',
    name: 'Pamukkale & Hierapolis',
    city: 'Denizli',
    country: 'Türkiye',
    lat: 37.9203,
    lng: 29.1206,
    aliases: ['pamukkale', 'hierapolis', 'travertenler', 'cotton castle', 'pamukkale travertenleri'],
    summary:
      'Pamukkale, kalsiyum karbonatça zengin termal suların yamaç boyunca akarken bıraktığı bembeyaz traverten teraslarıyla âdeta bir “pamuk kalesi” görünümü sunar. Bu doğal oluşum, binlerce yıldır şifa arayanları kendine çekmiştir. Teraslardan yükselen sıcak sular, üstteki antik havuzlarda hâlâ ziyaretçilere açıktır.\n\nTeraslarin hemen üzerinde, MÖ 2. yüzyılda kurulan antik kaplıca kenti Hierapolis uzanır; geniş nekropolü, tiyatrosu ve Apollon Tapınağı’yla dikkat çeker. Doğal ve kültürel değerleri birleştiren alan, UNESCO Dünya Mirası Listesi’nde karma miras olarak yer alır.',
    sources: [
      'UNESCO World Heritage List — Hierapolis-Pamukkale',
      'T.C. Kültür ve Turizm Bakanlığı — Pamukkale',
    ],
  },
  {
    id: 'gobeklitepe',
    name: 'Göbeklitepe',
    city: 'Şanlıurfa',
    country: 'Türkiye',
    lat: 37.2233,
    lng: 38.9224,
    aliases: ['gobeklitepe', 'göbeklitepe', 'göbekli tepe', 'gobekli tepe', 'potbelly hill'],
    summary:
      'Göbeklitepe, yaklaşık 12 bin yıl öncesine (MÖ 9600 dolayları) tarihlenen ve bilinen en eski anıtsal tapınma yapılarını barındıran Neolitik bir alandır. Buradaki T biçimli dev dikili taşlar; tilki, yılan, yaban domuzu ve turna gibi hayvan kabartmalarıyla süslüdür. Alanın en çarpıcı yanı, henüz tarımın ve yerleşik köy yaşamının yaygınlaşmadığı bir çağda inşa edilmiş olmasıdır — bu, “önce tapınak mı, önce şehir mi?” tartışmasını başlatmıştır.\n\nSık sık “tarihin sıfır noktası” olarak anılan Göbeklitepe, insanlık tarihinin başlangıcına dair pek çok varsayımı yeniden yazdırmıştır. Alan 2018’de UNESCO Dünya Mirası Listesi’ne girmiştir.',
    sources: [
      'UNESCO World Heritage List — Göbekli Tepe',
      'Alman Arkeoloji Enstitüsü (DAI) — Göbekli Tepe kazı raporları',
    ],
  },
  {
    id: 'nemrut',
    name: 'Nemrut Dağı',
    city: 'Adıyaman',
    country: 'Türkiye',
    lat: 37.9809,
    lng: 38.7411,
    aliases: ['nemrut', 'nemrut dağı', 'nemrut dagi', 'mount nemrut', 'kommagene'],
    summary:
      'Nemrut Dağı’nın 2.100 metrelik zirvesinde, MÖ 1. yüzyılda Kommagene Kralı I. Antiokhos tarafından yaptırılan görkemli bir hierothesion (anıt-mezar ve kült alanı) yer alır. Kırılıp yere düşmüş dev tanrı ve kral başları, Yunan ve Pers panteonlarını birleştiren eşsiz bir sentezi temsil eder; bu da Kommagene’nin Doğu ile Batı arasındaki köprü konumunu yansıtır.\n\nDevasa heykellerin çevrelediği doğu ve batı terasları, özellikle gün doğumu ve gün batımında büyüleyici bir manzara sunar. Alan 1987’den beri UNESCO Dünya Mirası Listesi’nde yer almaktadır.',
    sources: [
      'UNESCO World Heritage List — Nemrut Dağ',
      'Lonely Planet — Nemrut Dağı (Mount Nemrut)',
    ],
  },
  {
    id: 'truva',
    name: 'Truva (Troya) Antik Kenti',
    city: 'Çanakkale',
    country: 'Türkiye',
    lat: 39.9576,
    lng: 26.2389,
    aliases: ['truva', 'troya', 'troy', 'troia', 'ilion', 'truva atı'],
    summary:
      'Truva, Homeros’un İlyada destanında anlatılan efsanevi savaşın geçtiği kenttir ve arkeolojik olarak üst üste kurulmuş dokuz yerleşim katmanını barındırır; en eskisi MÖ 3000’lere kadar iner. 19. yüzyılda Heinrich Schliemann’ın kazıları, uzun süre yalnızca mit sanılan kentin gerçekliğini gün ışığına çıkarmıştır.\n\nSurları, rampası ve tapınak kalıntılarıyla Truva, mit ile tarihin iç içe geçtiği ender yerlerden biridir. Ziyaretçi alanındaki tahta Truva Atı replikası, destanın en ünlü sahnesini simgeler. Kent 1998’den beri UNESCO Dünya Mirası Listesi’ndedir.',
    sources: [
      'UNESCO World Heritage List — Archaeological Site of Troy',
      'T.C. Kültür ve Turizm Bakanlığı — Troya Ören Yeri',
    ],
  },
  {
    id: 'anitkabir',
    name: 'Anıtkabir',
    city: 'Ankara',
    country: 'Türkiye',
    lat: 39.9250,
    lng: 32.8367,
    aliases: ['anitkabir', 'anıtkabir', 'ataturk mausoleum', 'atatürk anıtmezar'],
    summary:
      'Anıtkabir, Türkiye Cumhuriyeti’nin kurucusu Mustafa Kemal Atatürk’ün anıtmezarıdır. Mimar Emin Onat ve Orhan Arda’nın tasarımıyla 1944–1953 arasında inşa edilmiş, Selçuklu ve Hitit motiflerinden esinlenen sade ama anıtsal bir üslupla yükselmiştir. Aslanlı Yol, tören meydanı ve mermer sütunlu mozole, ziyaretçileri saygılı bir sükûnete davet eder.\n\nKompleks içindeki Atatürk ve Kurtuluş Savaşı Müzesi, ulusal tarih açısından zengin bir koleksiyon sunar. Ankara’nın en çok ziyaret edilen anıtı olan Anıtkabir, resmî törenlerin ve ulusal günlerin de merkezidir.',
    sources: [
      'T.C. Millî Savunma Bakanlığı — Anıtkabir resmi portalı',
      'Lonely Planet — Anıtkabir',
    ],
  },
  {
    id: 'sumela',
    name: 'Sümela Manastırı',
    city: 'Trabzon',
    country: 'Türkiye',
    lat: 40.6903,
    lng: 39.6586,
    aliases: ['sumela', 'sümela', 'sumela manastırı', 'sumela monastery'],
    summary:
      'Sümela Manastırı, Karadeniz’in sarp Altındere Vadisi’nde, dik bir kaya yüzeyine âdeta yapışmış gibi konumlanan bir Rum Ortodoks manastırıdır. Kuruluşu 4. yüzyıla kadar geriye götürülür; bugünkü görkemli hâlini ise yüzyıllar içinde eklenen şapeller, kütüphane ve keşiş hücreleriyle almıştır. Ana kaya kilisesinin iç ve dış yüzeylerini kaplayan freskler, Bizans dinî resim sanatının etkileyici örnekleridir.\n\nSis içinden yükselen ormanlık dağların ortasındaki konumu, manastıra mistik bir atmosfer katar. Restorasyonların ardından yeniden ziyarete açılan yapı, Karadeniz turizminin simge duraklarından biridir.',
    sources: [
      'T.C. Kültür ve Turizm Bakanlığı — Sümela Manastırı',
      'UNESCO World Heritage Tentative List — Sümela Monastery',
    ],
  },
  {
    id: 'eyfel',
    name: 'Eyfel Kulesi',
    city: 'Paris',
    country: 'Fransa',
    lat: 48.8584,
    lng: 2.2945,
    aliases: ['eyfel', 'eiffel', 'eiffel tower', 'tour eiffel', 'eyfel kulesi'],
    summary:
      'Eyfel Kulesi, 1889 Dünya Fuarı için mühendis Gustave Eiffel’in şirketi tarafından inşa edilen 330 metrelik demir kafes bir kuledir. İlk yapıldığında pek çok Parisli tarafından eleştirilmiş olsa da kısa sürede Paris’in ve modern mühendisliğin simgesi hâline gelmiştir. Üç katındaki seyir teraslarından şehrin ışıltılı panoraması izlenebilir.\n\nGece boyunca her saat başı parıldayan aydınlatmasıyla kule, romantizmin ve Fransız kültürünün dünya çapındaki en tanınmış imgelerinden biridir. Şehrin Champ de Mars bahçelerine bakan konumu, piknik ve fotoğraf için idealdir.',
    sources: [
      'La Tour Eiffel — resmi site (toureiffel.paris)',
      'Lonely Planet — Eiffel Tower',
    ],
  },
  {
    id: 'kolezyum',
    name: 'Kolezyum',
    city: 'Roma',
    country: 'İtalya',
    lat: 41.8902,
    lng: 12.4922,
    aliases: ['kolezyum', 'colosseum', 'colosseo', 'flavian amphitheatre', 'amfitiyatro roma'],
    summary:
      'Kolezyum (Flavius Amfitiyatrosu), MS 70–80 arasında Roma İmparatorluğu’nun Flavius hanedanı döneminde inşa edilen, yaklaşık 50 bin seyirci kapasiteli devasa bir arenadır. Gladyatör dövüşleri, hayvan avları ve halka açık gösterilere ev sahipliği yapmıştır. Çok katlı kemer sistemi ve seyirci akışını yöneten planı, Roma mühendisliğinin ustalığını gösterir.\n\nYüzyıllar içinde depremler ve taş yağmasıyla kısmen yıkılsa da Kolezyum, Antik Roma’nın en güçlü simgesi olarak ayaktadır. Roma’nın tarihi merkezinde, Forum Romanum ve Palatino Tepesi’ne komşu konumdadır ve UNESCO Dünya Mirası kapsamındadır.',
    sources: [
      'UNESCO World Heritage List — Historic Centre of Rome',
      'Parco archeologico del Colosseo — resmi site',
    ],
  },
  {
    id: 'akropolis',
    name: 'Akropolis (Parthenon)',
    city: 'Atina',
    country: 'Yunanistan',
    lat: 37.9715,
    lng: 23.7257,
    aliases: ['akropolis', 'acropolis', 'parthenon', 'atina akropolisi', 'partenon'],
    summary:
      'Atina Akropolisi, şehrin üzerinde yükselen kayalık tepede kurulmuş kutsal bir yapılar topluluğudur; en görkemli anıtı, tanrıça Athena’ya adanan Parthenon Tapınağı’dır. MÖ 5. yüzyılda, Perikles döneminde Iktinos ve Kallikrates’in tasarımıyla inşa edilen tapınak, Klasik Yunan mimarisinin ve Dor düzeninin doruk örneği kabul edilir.\n\nErekhtheion, Athena Nike Tapınağı ve anıtsal giriş Propylaia ile birlikte Akropolis, Batı uygarlığının, demokrasinin ve felsefenin doğduğu Antik Atina’nın simgesidir. Alan, UNESCO Dünya Mirası Listesi’nin ilk kayıtlarından biridir.',
    sources: [
      'UNESCO World Heritage List — Acropolis, Athens',
      'Odysseus — Yunanistan Kültür Bakanlığı portalı',
    ],
  },

  // --- Balkanlar & Orta Avrupa rotası ---
  {
    id: 'filibe',
    name: 'Filibe',
    city: 'Plovdiv',
    country: 'Bulgaristan',
    lat: 42.1354,
    lng: 24.7453,
    aliases: ['filibe', 'plovdiv', 'philippopolis', 'filibe plovdiv'],
    summary:
      'Filibe (Plovdiv), Avrupa’nın kesintisiz yerleşilen en eski kentlerinden biridir; kökleri Trak yerleşimi Eumolpias’a, sekiz bin yıl öncesine uzanır. Makedon Kralı II. Filip’ten aldığı Philippopolis adıyla anıldı; Romalılar döneminde ise yamaca oyulmuş, bugün hâlâ konserlere ev sahipliği yapan görkemli antik tiyatrosuyla parladı. Yedi tepe üzerine kurulu kent, katman katman uygarlığı taşıyan bir açık hava müzesi gibidir.\n\nArnavut kaldırımlı Eski Şehir’i (Stariyat Grad), cumbalı ve renkli Bulgar Uyanış Dönemi konaklarıyla ünlüdür. 2019’da Avrupa Kültür Başkenti seçilen Filibe, antik Roma stadyumu, Osmanlı Cuma Camii ve canlı sanatçı mahallesi Kapana ile geçmişi ve bugünü iç içe yaşatır.',
    sources: [
      'Visit Plovdiv — Resmî kent turizm portalı',
      'Lonely Planet — Plovdiv',
    ],
  },
  {
    id: 'sofya',
    name: 'Sofya',
    city: 'Sofia',
    country: 'Bulgaristan',
    lat: 42.6977,
    lng: 23.3219,
    aliases: ['sofya', 'sofia', 'serdica', 'sredets'],
    summary:
      'Bulgaristan’ın başkenti Sofya, iki bin yılı aşan tarihiyle Balkanların en eski kentlerindendir; Roma döneminde Serdica adıyla önemli bir merkezdi ve İmparator Konstantin’in “Serdica benim Roma’mdır” dediği söylenir. Şehrin merkezindeki metro kazılarında ortaya çıkan Roma kalıntıları, modern kentin altındaki antik dokuyu gözler önüne serer. Kentin arması “Büyür ama yaşlanmaz” sözünü taşır.\n\nSofya’nın simgesi, altın kubbeleriyle görkemli Aleksandr Nevski Katedrali’dir. Yakınındaki UNESCO Dünya Mirası Boyana Kilisesi’nin freskleri, ortaçağ Bulgar resminin başyapıtı sayılır. Arka planda yükselen Vitoşa Dağı, şehre dört mevsim doğa ve kayak imkânı sunar.',
    sources: [
      'UNESCO World Heritage List — Boyana Church',
      'Lonely Planet — Sofia',
    ],
  },
  {
    id: 'nis',
    name: 'Niş',
    city: 'Niš',
    country: 'Sırbistan',
    lat: 43.3209,
    lng: 21.8958,
    aliases: ['nis', 'niš', 'naissus'],
    summary:
      'Niş, Balkanların en eski kentlerinden biridir ve Roma döneminde Naissus adıyla bilinirdi; Hristiyanlığı serbest bırakan Milano Fermanı’nın sahibi Büyük Konstantin’in doğduğu yer olmasıyla tarihe geçer. Konumu, yüzyıllar boyunca Orta Avrupa ile İstanbul’u bağlayan yol üzerinde stratejik bir kavşak olmasını sağladı.\n\nKentin Osmanlı yapımı kalesi (Niš Kalesi) bugün canlı bir park ve etkinlik alanıdır. 1809’daki Sırp ayaklanmasının ardından yapılan ürpertici Kafatası Kulesi (Ćele Kula) ve Roma imparatorluk villası Mediana, Niş’in acı ve ihtişamla örülü tarihini anlatır.',
    sources: [
      'Sırbistan Ulusal Turizm Örgütü (Serbia.travel) — Niš',
      'Lonely Planet — Niš',
    ],
  },
  {
    id: 'belgrad',
    name: 'Belgrad',
    city: 'Beograd',
    country: 'Sırbistan',
    lat: 44.7866,
    lng: 20.4489,
    aliases: ['belgrad', 'beograd', 'belgrade', 'singidunum'],
    summary:
      'Sırbistan’ın başkenti Belgrad, adını “Beyaz Şehir” anlamına gelen Beograd’dan alır ve Sava ile Tuna nehirlerinin buluştuğu noktada yükselir. Kelt Singidunum’undan Roma’ya, Bizans’tan Osmanlı ve Avusturya-Macaristan’a kadar sayısız uygarlığın el değiştirdiği kent, tam kırk kez yıkılıp yeniden kurulduğu söylenen bir hayatta kalma öyküsüdür.\n\nİki nehre hâkim Kalemegdan Kalesi, kentin tarihî kalbi ve en sevilen buluşma yeridir. Bohem Skadarlija sokağı, nehir üzerindeki yüzer kulüpleriyle (splav) Belgrad, Balkanların en enerjik gece hayatına da ev sahipliği yapar.',
    sources: [
      'Sırbistan Ulusal Turizm Örgütü (Serbia.travel) — Belgrad',
      'Lonely Planet — Belgrade',
    ],
  },
  {
    id: 'budapeste',
    name: 'Budapeşte',
    city: 'Budapest',
    country: 'Macaristan',
    lat: 47.4979,
    lng: 19.0402,
    aliases: ['budapeste', 'budapeşte', 'budapest', 'buda', 'peşte', 'peste'],
    summary:
      'Macaristan’ın başkenti Budapeşte, 1873’te Tuna’nın iki yakasındaki Buda ile Peşte’nin birleşmesiyle doğdu ve “Tuna’nın İncisi” olarak anılır. Nehir kıyısındaki panoraması, Buda Kalesi ve Andrássy Bulvarı UNESCO Dünya Mirası Listesi’ndedir. Tepedeki Balıkçı Tabyası ve Matyas Kilisesi’nden bakıldığında, karşı yakadaki neo-gotik Parlamento binası masalsı bir görüntü sunar.\n\nZincir Köprü iki yakayı zarifçe birbirine bağlar. Yüzlerce yıllık termal kaynakları üzerine kurulu Széchenyi ve Gellért kaplıcaları, kenti dünyanın en ünlü “kaplıca başkenti” yapar. Kahvehaneleri, ruin barları ve zengin müzik geleneğiyle Budapeşte, ihtişamı ve keyfi bir arada sunar.',
    sources: [
      'UNESCO World Heritage List — Budapest, the Banks of the Danube',
      'Lonely Planet — Budapest',
    ],
  },
  {
    id: 'viyana',
    name: 'Viyana',
    city: 'Wien',
    country: 'Avusturya',
    lat: 48.2082,
    lng: 16.3738,
    aliases: ['viyana', 'wien', 'vienna', 'vindobona'],
    summary:
      'Avusturya’nın başkenti Viyana, yüzyıllarca Habsburg İmparatorluğu’nun görkemli merkezi oldu ve tarihî çekirdeği UNESCO Dünya Mirası Listesi’ndedir. Barok Schönbrunn ve Belvedere sarayları, gotik Aziz Stephan Katedrali ve Ringstrasse boyunca sıralanan anıtsal yapılar, imparatorluk ihtişamını bugüne taşır.\n\nViyana aynı zamanda “müziğin başkenti”dir: Mozart, Beethoven, Schubert ve Strauss bu şehirde yaşadı, besteledi. Yeni Yıl Konseri, opera baloları ve köşe başındaki geleneksel kahvehaneleriyle kent, klasik zarafeti günlük yaşamın içine yerleştirir.',
    sources: [
      'UNESCO World Heritage List — Historic Centre of Vienna',
      'Wien.info — Viyana resmî turizm portalı',
    ],
  },
  {
    id: 'hallstatt',
    name: 'Hallstatt',
    city: 'Salzkammergut',
    country: 'Avusturya',
    lat: 47.5622,
    lng: 13.6493,
    aliases: ['hallstatt', 'hallstatt gölü', 'hallstatter see'],
    summary:
      'Hallstatt, Avusturya Alpleri’nde bir gölün kıyısı ile dik dağlar arasına sıkışmış, dünyanın en çok fotoğraflanan köylerinden biridir. Ahşap evlerinin gölde yansıması, kartpostal güzelliğinde bir manzara sunar. Köyün bulunduğu Hallstatt-Dachstein / Salzkammergut kültürel peyzajı UNESCO Dünya Mirası Listesi’ndedir.\n\nBölgenin asıl zenginliği tuzdur: yaklaşık yedi bin yıldır işletilen dünyanın en eski tuz madeni buradadır. Demir Çağı’nın bir evresi (“Hallstatt kültürü”) adını bu yerden alır. Dağ eteğindeki panoramik teras ve tuz madeni turu, köyün derin tarihini gözler önüne serer.',
    sources: [
      'UNESCO World Heritage List — Hallstatt-Dachstein/Salzkammergut Cultural Landscape',
      'Hallstatt.net — Resmî bölge turizm portalı',
    ],
  },
  {
    id: 'salzburg',
    name: 'Salzburg',
    city: 'Salzburg',
    country: 'Avusturya',
    lat: 47.8095,
    lng: 13.0550,
    aliases: ['salzburg', 'mozart şehri'],
    summary:
      'Salzburg, Alplerin eteğinde, barok mimarisiyle bütünlük taşıyan tarihî merkeziyle UNESCO Dünya Mirası Listesi’nde yer alır. Adı “tuz kalesi” anlamına gelir ve kentin zenginliği yüzyıllarca tuz ticaretinden geldi. Tepede yükselen Hohensalzburg Kalesi, Orta Avrupa’nın en iyi korunmuş ortaçağ kalelerinden biridir.\n\nSalzburg, Wolfgang Amadeus Mozart’ın doğduğu şehir olmasıyla dünya çapında ünlüdür; her yıl düzenlenen Salzburg Festivali klasik müzik takviminin zirvelerindendir. Mirabell Bahçeleri ve dar barok sokakları, aynı zamanda “Bir Aşk Uğruna” (The Sound of Music) filminin de sahnesi olmuştur.',
    sources: [
      'UNESCO World Heritage List — Historic Centre of the City of Salzburg',
      'Salzburg.info — Resmî kent turizm portalı',
    ],
  },
  {
    id: 'graz',
    name: 'Graz',
    city: 'Steiermark',
    country: 'Avusturya',
    lat: 47.0707,
    lng: 15.4395,
    aliases: ['graz', 'steiermark', 'styria'],
    summary:
      'Avusturya’nın ikinci büyük kenti Graz, kırmızı kiremitli çatıları ve iyi korunmuş Rönesans-barok dokusuyla dikkat çeker; tarihî merkezi ve Eggenberg Sarayı UNESCO Dünya Mirası Listesi’ndedir. Kentin ortasındaki Schlossberg tepesi ve simgesi olan Saat Kulesi (Uhrturm), şehre panoramik bir bakış sunar.\n\nCanlı bir üniversite kenti olan Graz, geçmişin zarafetini çağdaş tasarımla harmanlar; nehir üzerindeki yapay ada Murinsel ve fütüristik çağdaş sanat müzesi Kunsthaus (“dost canlısı uzaylı” lakaplı) bunun en çarpıcı örnekleridir. 2003’te Avrupa Kültür Başkenti seçilmiştir.',
    sources: [
      'UNESCO World Heritage List — City of Graz – Historic Centre and Schloss Eggenberg',
      'Graz Tourismus — Resmî kent turizm portalı',
    ],
  },
  {
    id: 'bratislava',
    name: 'Bratislava',
    city: 'Bratislava',
    country: 'Slovakya',
    lat: 48.1486,
    lng: 17.1077,
    aliases: ['bratislava', 'pressburg', 'pozsony'],
    summary:
      'Slovakya’nın başkenti Bratislava, Tuna kıyısında, Avusturya ve Macaristan sınırlarının hemen yanında yükselen kompakt ve keyifli bir kenttir. Nehre ve şehre hâkim tepedeki dört köşe kulesiyle Bratislava Kalesi, kentin simgesidir. Bir zamanlar Macar krallarının taç giydiği Aziz Martin Katedrali de buradadır.\n\nBarok sarayları, dar Arnavut kaldırımlı sokakları ve neşeli meydanlarıyla Eski Şehir, gezmesi kolay ve samimi bir atmosfer sunar. Köşe başlarındaki bronz heykeller (özellikle rögardan başını uzatan “Čumil”) kente eğlenceli bir dokunuş katar. Viyana’ya yalnızca bir saat uzaklıktadır.',
    sources: [
      'Visit Bratislava — Resmî kent turizm portalı',
      'Lonely Planet — Bratislava',
    ],
  },
  {
    id: 'saraybosna',
    name: 'Saraybosna',
    city: 'Sarajevo',
    country: 'Bosna-Hersek',
    lat: 43.8563,
    lng: 18.4131,
    aliases: ['saraybosna', 'sarajevo', 'baščaršija', 'bascarsija'],
    summary:
      'Bosna-Hersek’in başkenti Saraybosna, cami, kilise, katedral ve sinagogun yürüme mesafesinde bir arada bulunduğu kültürel çeşitliliğiyle “Avrupa’nın Kudüs’ü” olarak anılır. Osmanlı’nın kurduğu Başçarşı (Baščaršija), bakır ustaları, çeşmeleri ve Gazi Hüsrev Bey Camii ile kentin tarihî kalbidir. Bir sokak, âdeta doğu ile batının buluştuğu çizgi gibi Osmanlı çarşısından Avusturya-Macaristan cephelerine geçiverir.\n\nLatin Köprüsü, 1914’te Arşidük Franz Ferdinand’a düzenlenen ve I. Dünya Savaşı’nı ateşleyen suikastin yeridir. 1984 Kış Olimpiyatları’na ev sahipliği yapan kent, 1990’ların uzun kuşatmasının izlerini “Saraybosna gülleri” denen anıtlarla hâlâ taşır; yine de dayanıklılığın ve bir arada yaşamanın simgesi olmayı sürdürür.',
    sources: [
      'Sarajevo Navigator — Resmî kent turizm portalı',
      'Lonely Planet — Sarajevo',
    ],
  },
  {
    id: 'mostar',
    name: 'Mostar',
    city: 'Hersek',
    country: 'Bosna-Hersek',
    lat: 43.3438,
    lng: 17.8078,
    aliases: ['mostar', 'stari most', 'mostar köprüsü'],
    summary:
      'Mostar, adını Neretva Nehri üzerindeki eşsiz taş köprüsünü bekleyen köprü muhafızlarından (mostari) alır. Osmanlı mimarı Mimar Hayruddin’in 1566’da tamamladığı Stari Most (Eski Köprü), tek kemerli zarif kavisiyle yüzyıllarca kentin simgesi oldu. 1993’te savaşta yıkılan köprü, 2004’te aslına uygun biçimde yeniden inşa edildi ve UNESCO Dünya Mirası Listesi’ne girdi.\n\nCesur dalgıçların köprüden yeşil Neretva sularına atladığı manzara, Mostar’ın en ünlü geleneğidir. Arnavut kaldırımlı çarşısı, camileri ve bakır işleriyle Eski Şehir, farklı kültürlerin yüzyıllarca yan yana yaşadığı bir buluşma noktasıdır.',
    sources: [
      'UNESCO World Heritage List — Old Bridge Area of the Old City of Mostar',
      'Lonely Planet — Mostar',
    ],
  },
  {
    id: 'jajce',
    name: 'Jajce',
    city: 'Jajce',
    country: 'Bosna-Hersek',
    lat: 44.3419,
    lng: 17.2708,
    aliases: ['jajce', 'yayce', 'yayçe', 'pliva şelalesi', 'pliva selalesi'],
    summary:
      'Orta Bosna’da, Pliva Nehri’nin Vrbas’a kavuştuğu noktada kurulu Jajce, şehir merkezinin tam ortasında dökülen yaklaşık 20 metrelik Pliva Şelalesi ile Avrupa’da benzeri az bulunan bir manzaraya sahiptir. Kayalık bir tepeye yayılan surlar, sokakları basamak basamak yukarı çıkaran eski şehri kucaklar; kale kapısının üzerinde Hrvatinić hanedanının arması hâlâ görülebilir.\n\nJajce, ortaçağda Bosna Krallığı’nın başkenti ve kralların taç giydiği şehirdi; son Bosna kralı Stjepan Tomašević 1463’te burada Osmanlılar tarafından idam edildi. Şehir 1527’de kalıcı olarak Osmanlı hâkimiyetine girdi. 20. yüzyılda ise başka bir tarihe sahne oldu: 29 Kasım 1943’te toplanan ikinci AVNOJ oturumu, sosyalist Yugoslavya’nın temellerinin atıldığı yer olarak Jajce’yi ülkenin kuruluş şehri yaptı. Kentin doğal ve mimari bütünü UNESCO Dünya Mirası geçici listesinde yer alır.',
    sources: [
      'UNESCO World Heritage Tentative List — Natural and Architectural Ensemble of Jajce',
      'Lonely Planet — Jajce',
    ],
  },
  {
    id: 'uskup',
    name: 'Üsküp',
    city: 'Skopje',
    country: 'Kuzey Makedonya',
    lat: 41.9981,
    lng: 21.4254,
    aliases: ['uskup', 'üsküp', 'skopje', 'skopye'],
    summary:
      'Kuzey Makedonya’nın başkenti Üsküp, Vardar Nehri’nin iki yakasına yayılır ve Balkanların en büyük Osmanlı çarşılarından birine ev sahipliği yapar. 15. yüzyıldan kalma Taş Köprü, eski çarşı ile modern meydanı birbirine bağlar; tepedeki Kale (Kale Fortress) kente hâkimdir. Kentin dar sokaklarındaki camiler, hanlar ve hamamlar, yüzyıllık ticaret geleneğini yaşatır.\n\nÜsküp, Rahibe Teresa’nın doğduğu şehir olmasıyla da anılır. Son yıllarda meydanlara dikilen çok sayıda anıt ve neoklasik cephe (“Skopje 2014” projesi) kente tartışmalı ama çarpıcı bir görünüm kazandırmıştır. Eski ile yeninin keskin karşıtlığı, Üsküp’ü Balkanların en özgün başkentlerinden biri yapar.',
    sources: [
      'Kuzey Makedonya Ulusal Turizm Portalı (Macedonia-Timeless)',
      'Lonely Planet — Skopje',
    ],
  },
  {
    id: 'ohrid',
    name: 'Ohrid',
    city: 'Ohrid',
    country: 'Kuzey Makedonya',
    lat: 41.1231,
    lng: 20.8016,
    aliases: ['ohrid', 'ohri', 'ohrid gölü', 'lake ohrid', 'kaneo'],
    summary:
      'Ohrid, Avrupa’nın en eski ve en derin göllerinden biri olan, üç milyon yılı aşkın yaşıyla âdeta canlı bir fosil sayılan Ohrid Gölü’nün kıyısında kuruludur. Hem doğal hem kültürel değerleriyle UNESCO Dünya Mirası Listesi’nde yer alan ender karma alanlardandır. Gölün üzerindeki kayalığa tüneyen Sveti Jovan Kaneo Kilisesi, Balkanların en ikonik manzaralarından biridir.\n\nBir zamanlar 365 kilisesiyle “Balkanların Kudüs’ü” olarak anılan Ohrid, Slav yazısının ve Ortodoks kültürünün önemli bir beşiğiydi. Kentin tepesindeki Çar Samuil Kalesi, antik tiyatrosu ve arnavut kaldırımlı eski mahalleleri, göl kıyısı huzuruyla birleşir.',
    sources: [
      'UNESCO World Heritage List — Natural and Cultural Heritage of the Ohrid region',
      'Lonely Planet — Ohrid',
    ],
  },
  {
    id: 'prizren',
    name: 'Prizren',
    city: 'Prizren',
    country: 'Kosova',
    lat: 42.2139,
    lng: 20.7397,
    aliases: ['prizren', 'prizen'],
    summary:
      'Prizren, Kosova’nın kültür ve tarih başkenti kabul edilir; Osmanlı dokusunu en iyi koruyan Balkan kentlerinden biridir. Bistrica Deresi’nin böldüğü kent, taş köprüsü, arnavut kaldırımlı sokakları ve zarif Sinan Paşa Camii ile bir açık hava müzesini andırır. Tepedeki Prizren Kalesi (Kaljaja), çatıların ve minarelerin üzerinden geniş bir panorama sunar.\n\nKent, 1878’de Arnavut ulusal uyanışının simgesi olan Prizren Birliği’nin kurulduğu yer olmasıyla da tarihe geçer. Camileri, kiliseleri ve tekkeleriyle çok katmanlı bir miras taşıyan Prizren, her yaz düzenlenen DokuFest belgesel film festivaliyle de tanınır.',
    sources: [
      'Kosova Turizm — Resmî tanıtım portalı',
      'Lonely Planet — Prizren',
    ],
  },
  {
    id: 'dubrovnik',
    name: 'Dubrovnik',
    city: 'Dalmaçya',
    country: 'Hırvatistan',
    lat: 42.6407,
    lng: 18.1077,
    aliases: ['dubrovnik', 'ragusa', 'dubrovnik surları'],
    summary:
      'Adriyatik’in İncisi olarak anılan Dubrovnik, denize bakan sarp kıyıda, neredeyse eksiksiz korunmuş ortaçağ surlarıyla çevrili görkemli bir kenttir; tarihî merkezi UNESCO Dünya Mirası Listesi’ndedir. Bir zamanlar bağımsız ve zengin bir deniz cumhuriyeti (Ragusa) olan şehir, Venedik’e rakip bir ticaret gücüydü ve diplomasideki inceliğiyle ün yaptı.\n\nCilalı taş ana caddesi Stradun, barok kiliseleri ve iki kilometreyi aşan sur yürüyüşü, ziyaretçileri geçmişe götürür. Surların üzerinden bakıldığında turuncu çatılar ile masmavi deniz kusursuz bir kompozisyon oluşturur; kent, “Taht Oyunları”nda King’s Landing olarak da dünyaca tanınmıştır.',
    sources: [
      'UNESCO World Heritage List — Old City of Dubrovnik',
      'Hırvatistan Turizm Kurumu (Croatia.hr) — Dubrovnik',
    ],
  },
  {
    id: 'zadar',
    name: 'Zadar',
    city: 'Dalmaçya',
    country: 'Hırvatistan',
    lat: 44.1194,
    lng: 15.2314,
    aliases: ['zadar', 'iadera', 'deniz orgu', 'sea organ'],
    summary:
      'Zadar, üç bin yıllık geçmişiyle Dalmaçya kıyısının en eski kentlerindendir; Roma dönemi forumu, dairesel Aziz Donatus Kilisesi ve antik sütunları, modern kent dokusunun içine serpiştirilmiştir. Yarımada üzerindeki eski şehir, tarih ile deniz arasında zarif bir denge kurar.\n\nKentin en özgün iki eseri çağdaştır: Nikola Bašić’in tasarladığı Deniz Orgu, dalgaların basıncıyla mermer basamaklardan doğaçlama melodiler üretir; hemen yanındaki “Güneşe Selam” ise gün boyu depoladığı güneş enerjisiyle geceleri ışık gösterisine dönüşür. Alfred Hitchcock’un “dünyanın en güzel gün batımı” dediği manzara da buradan izlenir.',
    sources: [
      'Hırvatistan Turizm Kurumu (Croatia.hr) — Zadar',
      'Lonely Planet — Zadar',
    ],
  },
  {
    id: 'zagreb',
    name: 'Zagreb',
    city: 'Zagreb',
    country: 'Hırvatistan',
    lat: 45.8150,
    lng: 15.9819,
    aliases: ['zagreb', 'agram'],
    summary:
      'Hırvatistan’ın başkenti Zagreb, ortaçağ dokusunu koruyan tepedeki Yukarı Şehir (Gornji Grad) ile 19. yüzyıl Avusturya-Macaristan mimarisinin egemen olduğu Aşağı Şehir’in buluştuğu bir kenttir. Yukarı Şehir’deki Aziz Mark Kilisesi, rengârenk çinili çatısındaki armalarla şehrin en tanınmış imgelerinden biridir; Lotrščak Kulesi’nden her öğlen atılan top sesi asırlık bir gelenektir.\n\nBan Jelačić Meydanı kentin canlı kalbidir; çevresindeki kafeler, çarşılar ve müzeler (aralarında özgün “Kopmuş İlişkiler Müzesi”) Zagreb’e rahat ve kültürlü bir hava katar. Funiküleriyle, yeşil parkları ve kahve keyfiyle şehir, gösterişten çok samimiyetiyle öne çıkar.',
    sources: [
      'Hırvatistan Turizm Kurumu (Croatia.hr) — Zagreb',
      'Lonely Planet — Zagreb',
    ],
  },
  {
    id: 'prag',
    name: 'Prag',
    city: 'Praha',
    country: 'Çekya',
    lat: 50.0755,
    lng: 14.4378,
    aliases: ['prag', 'praha', 'prague', 'prag kalesi', 'charles köprüsü'],
    summary:
      '“Yüz Kuleli Şehir” olarak anılan Prag, Çekya’nın başkentidir ve tarihî merkezi UNESCO Dünya Mirası Listesi’ndedir. Vltava Nehri üzerindeki heykellerle bezeli Charles Köprüsü, dünyanın en büyük antik kale kompleksi sayılan Prag Kalesi’ni Eski Şehir’e bağlar. Gotik, barok ve rönesans yapılar iç içe geçerek masalsı bir siluet oluşturur.\n\nEski Şehir Meydanı’ndaki 15. yüzyıldan kalma Astronomik Saat (Orloj), her saat başı figürlü gösterisiyle kalabalıkları toplar. Franz Kafka’nın izlerini taşıyan dar sokakları, bira kültürü ve konser salonlarıyla Prag, Orta Avrupa’nın en romantik başkentlerinden biridir.',
    sources: [
      'UNESCO World Heritage List — Historic Centre of Prague',
      'Prague City Tourism (Prague.eu) — Resmî portal',
    ],
  },
  {
    id: 'budva',
    name: 'Budva',
    city: 'Budva Rivierası',
    country: 'Karadağ',
    lat: 42.2911,
    lng: 18.8401,
    aliases: ['budva', 'budua'],
    summary:
      'Budva, Adriyatik kıyısındaki iki bin beş yüz yılı aşkın geçmişiyle Karadağ’ın en eski yerleşimlerindendir. Venedik döneminden kalma surlarla çevrili Eski Şehir (Stari Grad), dar taş sokakları, meydanları ve deniz kenarındaki kalesiyle küçük ama etkileyici bir labirenttir. Kıvrımlı sahil şeridi ve canlı gece hayatı, kente “Karadağ’ın Miami’si” lakabını kazandırmıştır.\n\nBudva Rivierası, ince çakıllı koyları ve turkuaz sularıyla ünlüdür. Yakınındaki, bir zamanlar balıkçı köyü olup lüks bir otele dönüşen Sveti Stefan adacığı, bölgenin en ikonik manzarasını sunar.',
    sources: [
      'Karadağ Ulusal Turizm Örgütü (Montenegro.travel) — Budva',
      'Lonely Planet — Budva',
    ],
  },
  {
    id: 'kotor',
    name: 'Kotor',
    city: 'Kotor Körfezi',
    country: 'Karadağ',
    lat: 42.4247,
    lng: 18.7712,
    aliases: ['kotor', 'cattaro', 'kotor körfezi', 'boka kotorska'],
    summary:
      'Kotor, sarp dağların denize dik indiği, âdeta bir fiyort görünümündeki Boka Kotorska (Kotor Körfezi) kıyısında saklıdır; körfez ve tarihî kent birlikte UNESCO Dünya Mirası Listesi’nde yer alır. Venedik izleri taşıyan surlarla çevrili Eski Şehir, meydanları, kiliseleri ve romanesk Aziz Trifon Katedrali ile ortaçağ atmosferini korur.\n\nKentin en unutulmaz deneyimi, dağ yamacına tırmanan surlar boyunca yaklaşık 1.350 basamak çıkarak Aziz İoannes (San Giovanni) Kalesi’ne ulaşmaktır; zirveden körfezin ve kırmızı çatıların panoraması nefes kesicidir. Kotor, Adriyatik’in en dramatik doğal ve tarihî manzaralarından birini sunar.',
    sources: [
      'UNESCO World Heritage List — Natural and Culturo-Historical Region of Kotor',
      'Karadağ Ulusal Turizm Örgütü (Montenegro.travel) — Kotor',
    ],
  },

  // --- Arnavutluk & İtalya & Yunanistan rota ek şehirleri ---
  { id: 'tiran', name: 'Tiran', city: 'Tiran', country: 'Arnavutluk', lat: 41.3275, lng: 19.8187, aliases: ['tiran', 'tirana'], summary: 'Arnavutluk’un başkenti Tiran, uzun ve kapalı komünist dönemin ardından rengârenk cephelere boyanmış binaları ve enerjik kafe kültürüyle canlanan genç bir kenttir. Balkanların en hızlı değişen başkentlerinden biri olarak özgün bir atmosfer sunar.\n\nKentin kalbindeki geniş Skanderbeg Meydanı, Osmanlı’dan kalma zarif Et’hem Bey Camii, geçmişin sığınaklarını müzeye çeviren Bunk’Art ve şehre tepeden bakan Dajti Dağı teleferiği başlıca duraklardır. Sokakları, pazarları ve gece hayatıyla Tiran giderek büyüyen bir çekim merkezidir.', sources: ['Arnavutluk Ulusal Turizm Ajansı — Tiran', 'Lonely Planet — Tirana'] },
  { id: 'shkoder', name: 'İşkodra (Shkodër)', city: 'İşkodra', country: 'Arnavutluk', lat: 42.0685, lng: 19.5126, aliases: ['shkoder', 'shkodër', 'iskodra', 'işkodra', 'scutari', 'skadar'], summary: 'Kuzey Arnavutluk’un kültür başkenti sayılan İşkodra (Shkodër), ülkenin en eski kentlerinden biridir ve göl, nehir ile dağların buluştuğu bir noktada kuruludur. Katolik ve Müslüman toplulukların bir arada yaşadığı köklü bir geçmişe sahiptir.\n\nGöle ve nehirlere hâkim, geçmişi antik çağlara uzanan görkemli Rozafa Kalesi ve trajik efsanesi kentin simgesidir. Balkanların ilk fotoğraf stüdyosunu belgeleyen Marubi Müzesi, canlı yaya caddesi ve yaygın bisiklet kültürüyle İşkodra keyifli bir duraktır; yakındaki İşkodra Gölü Avrupa’nın en büyük göllerindendir.', sources: ['Arnavutluk Ulusal Turizm Ajansı — Shkodër'] },
  { id: 'lezhe', name: 'Lezhë (Lesh)', city: 'Lezhë', country: 'Arnavutluk', lat: 41.7836, lng: 19.6436, aliases: ['lezhe', 'lezhë', 'lesh', 'leş', 'alessio'], summary: 'Kuzey Arnavutluk’ta, Adriyatik kıyısına yakın tarihî bir kent olan Lezhë (Lesh), Arnavut beylerinin 1444’te Osmanlı’ya karşı birleşme kararı aldıkları “Lezhë Birliği” toplantısına ev sahipliği yapmasıyla ulusal tarihe geçmiştir.\n\nÜlkenin ulusal kahramanı Skanderbeg’in mezar-anıtının bulunduğu kilise, kentin en önemli anma noktasıdır. Tepedeki eski kale, çevredeki tarım ovaları ve yakındaki kıyı plajlarıyla Lezhë, sakin ve tarihi bir geçiş durağıdır.', sources: ['Arnavutluk Ulusal Turizm Ajansı — Lezhë'] },
  { id: 'trieste', name: 'Trieste', city: 'Trieste', country: 'İtalya', lat: 45.6495, lng: 13.7768, aliases: ['trieste', 'triyeste', 'tergeste'], summary: 'İtalya’nın kuzeydoğu ucunda, Slovenya sınırındaki Trieste; bir zamanlar Avusturya-Macaristan İmparatorluğu’nun en önemli limanı olarak Orta Avrupa esintisi taşıyan kozmopolit bir kenttir. Farklı kültürlerin, dinlerin ve edebiyatların buluştuğu bir sınır şehridir.\n\nDenize açılan görkemli Piazza Unità d’Italia, körfeze tepeden bakan bembeyaz Miramare Şatosu, Roma tiyatrosu kalıntıları ve James Joyce ile Italo Svevo’nun uğrağı tarihî kahvehaneleriyle Trieste, kahve ve edebiyat kültürüyle anılır.', sources: ['Italia.it — Trieste'] },
  { id: 'treviso', name: 'Treviso', city: 'Treviso', country: 'İtalya', lat: 45.6669, lng: 12.2431, aliases: ['treviso'], summary: 'Venedik’in yalnızca yarım saat kuzeyindeki Treviso; su kanalları, freskli evleri ve surlarla çevrili tarihî merkeziyle çoğu zaman gözden kaçan bir Veneto incisidir. Prosecco köpüklü şarabının ve tiramisu tatlısının anavatanı sayılır.\n\nKemer altı yolları, kanal kıyısındaki eski su değirmenleri ve kalbindeki Piazza dei Signori meydanıyla kent, kalabalıklardan uzak sakin bir İtalyan atmosferi sunar. Çevredeki Prosecco bağları UNESCO Dünya Mirası kapsamındadır.', sources: ['Italia.it — Treviso'] },
  { id: 'pisa', name: 'Pisa', city: 'Pisa', country: 'İtalya', lat: 43.7228, lng: 10.3966, aliases: ['pisa'], summary: 'Toskana’da Arno Nehri kıyısındaki Pisa, Orta Çağ’da güçlü bir deniz cumhuriyetiydi ve dünyanın en tanınmış yapılarından birine ev sahipliği yapar. “Mucizeler Meydanı” (Piazza dei Miracoli) UNESCO Dünya Mirası Listesi’ndedir.\n\nZemininin çökmesiyle eğilen ünlü Çan Kulesi’nin (Eğik Kule) yanı sıra meydandaki görkemli katedral, yuvarlak vaftizhane ve anıtsal mezarlık da görülmeye değerdir. Köklü üniversitesiyle Pisa aynı zamanda canlı bir öğrenci kentidir.', sources: ['UNESCO World Heritage List — Piazza del Duomo, Pisa'] },
  { id: 'bari', name: 'Bari', city: 'Bari', country: 'İtalya', lat: 41.1171, lng: 16.8719, aliases: ['bari'], summary: 'Güney İtalya’da Puglia bölgesinin başkenti Bari, Adriyatik kıyısındaki hareketli bir liman ve feribot kentidir. Yunanistan ile Balkanlar’a açılan konumu, onu yüzyıllardır bir kavşak noktası kılmıştır.\n\nLabirent gibi dar sokaklarıyla eski şehir Bari Vecchia’da kadınlar hâlâ kapı önünde el yapımı orecchiette makarnası açar. Aziz Nikolaos’un (Noel Baba’nın esin kaynağı) kutsal emanetlerini barındıran görkemli bazilika, kenti Ortodoks dünyası için önemli bir hac merkezine dönüştürür.', sources: ['Italia.it — Bari'] },
  { id: 'igumenitsa', name: 'İgumenitsa', city: 'İgumenitsa', country: 'Yunanistan', lat: 39.504, lng: 20.266, aliases: ['igumenitsa', 'igoumenitsa', 'igoumenitza', 'lgumemiça', 'igumenice'], summary: 'Yunanistan’ın kuzeybatı ucunda, Epir kıyısındaki İgumenitsa, İtalya (Bari, Ancona, Venedik) ve Korfu Adası’na giden feribotların kalkış noktası olan hareketli bir liman kentidir. Çoğu gezgin için Yunanistan’a giriş veya çıkış kapısı işlevi görür.\n\nKentin kendisi sade olsa da çevresindeki yeşil tepeler, sakin koylar ve Sivota gibi turkuaz sulu plajlar bölgeyi cazip kılar. İç kesimdeki dağ köyleri ve antik kalıntılara açılan konumuyla İgumenitsa, keyifli bir geçiş ve dinlenme durağıdır.', sources: ['Visit Greece — Igoumenitsa'] },
  { id: 'kavala', name: 'Kavala', city: 'Kavala', country: 'Yunanistan', lat: 40.9397, lng: 24.4019, aliases: ['kavala', 'kavála', 'neapolis'], summary: 'Kuzey Yunanistan’ın Ege kıyısındaki liman kenti Kavala, antik çağda Neapolis adıyla Aziz Pavlus’un Avrupa’ya ilk ayak bastığı yer olarak bilinir. Amfitiyatro gibi denize bakan yamaca kurulu kent, güçlü bir Osmanlı geçmişi taşır.\n\nYamaçtaki Panagia eski mahallesi, kaleye çıkan dar sokakları, kentin üzerinden geçen görkemli Kamares su kemeri ve Mısır’ın kurucusu Mehmet Ali Paşa’nın doğduğu ev ile İmaret külliyesi başlıca duraklardır. Balıkçı limanı ve yakındaki Filippi antik kentiyle (UNESCO) Kavala zengin bir durak sunar.', sources: ['Visit Greece — Kavala'] },
  { id: 'ljubljana', name: 'Ljubljana', city: 'Ljubljana', country: 'Slovenya', lat: 46.0569, lng: 14.5058, aliases: ['ljubljana', 'lübliyana', 'lubliyana', 'laybach'], summary: 'Slovenya’nın şirin başkenti Ljubljana, Ljubljanica Nehri’nin ikiye böldüğü, tepedeki kalesinin gözettiği yaya dostu ve yemyeşil bir Orta Avrupa kentidir. Küçük ölçeğine karşın canlı bir kültür ve kafe hayatı sunar.\n\nNehri geçen zarif Üç Köprü (Tromostovje) ve Ejderha Köprüsü, mimar Jože Plečnik’in kente kazandırdığı özgün eserlerdir; ejderha kentin simgesidir. Tepedeki Ljubljana Kalesi’nden panorama, açık hava pazarları ve nehir kıyısı kafeleriyle başkent rahat ve keyifli bir atmosfer taşır.', sources: ['Slovenya Turizm Kurulu (I Feel Slovenia) — Ljubljana', 'Lonely Planet — Ljubljana'] },
  { id: 'bled', name: 'Bled Gölü', city: 'Bled', country: 'Slovenya', lat: 46.3683, lng: 14.1146, aliases: ['bled', 'bled gölü', 'bled golu', 'blejsko jezero', 'bled lake'], summary: 'Slovenya’nın Julian Alpleri eteğinde, buzul suyuyla dolu Bled Gölü’nün kıyısında kurulu Bled, ülkenin kartpostal simgesi ve en ünlü doğa durağıdır. Karlı dağlarla çevrili berrak gölü, romantik bir manzara sunar.\n\nGölün tam ortasındaki minik adada bir hac kilisesi, kıyıdaki sarp uçurumun tepesinde ise ortaçağdan kalma Bled Kalesi yükselir. Geleneksel ahşap “pletna” tekneleriyle adaya geçiş, göl çevresinde yürüyüş ve ünlü Bled kreması (kremšnita) kentin başlıca deneyimleridir.', sources: ['Slovenya Turizm Kurulu (I Feel Slovenia) — Bled', 'Lonely Planet — Lake Bled'] },
  { id: 'sirmione', name: 'Sirmione', city: 'Sirmione', country: 'İtalya', lat: 45.4949, lng: 10.606, aliases: ['sirmione', 'garda sirmione'], summary: 'Garda Gölü’nün güneyinde göle doğru uzanan ince bir yarımadanın ucundaki Sirmione, sularla çevrili masalsı konumuyla İtalya’nın en sevilen göl kasabalarından biridir. Antik çağlardan beri termal kaplıcalarıyla ünlüdür.\n\nKasabanın girişini koruyan, su üstüne kurulu Scaliger Kalesi ve yarımadanın ucundaki devasa Roma villası kalıntıları “Catullus Mağaraları” başlıca cazibelerdir. Dar sokakları, dondurmacıları ve göl manzaralı kıyısıyla Sirmione huzurlu bir kaçamak sunar.', sources: ['Italia.it — Sirmione', 'Lonely Planet — Sirmione'] },
  // --- İtalya ara/geçiş durakları ---
  { id: 'verona', name: 'Verona', city: 'Verona', country: 'İtalya', lat: 45.4384, lng: 10.9916, aliases: ['verona'], summary: 'Adige Nehri’nin kıvrımına kurulu Verona, Shakespeare’in “Romeo ve Juliet” trajedisine sahne olmasıyla dünya çapında ün kazanmış romantik bir kenttir. Roma’dan Orta Çağ’a uzanan zengin geçmişiyle tarihî merkezi UNESCO Dünya Mirası Listesi’ndedir.\n\nHer yaz opera festivaline ev sahipliği yapan olağanüstü korunmuş Roma Arenası, efsanevi Juliet’in balkonu ve zarif Piazza delle Erbe meydanı kentin başlıca noktalarıdır. Verona ayrıca Garda Gölü’ne açılan bir kapıdır.', sources: ['UNESCO World Heritage List — City of Verona', 'Italia.it — Verona'] },
  { id: 'padova', name: 'Padova', city: 'Padova', country: 'İtalya', lat: 45.4064, lng: 11.8768, aliases: ['padova', 'padua'], summary: 'Venedik’in hemen batısındaki Padova (Padua), İtalya’nın en eski üniversite kentlerinden biridir; Galileo’nun da ders verdiği üniversitesi 1222’de kurulmuştur. Sanat ve bilim geleneğiyle köklü bir kültür merkezidir.\n\nGiotto’nun çığır açan fresklerini barındıran Scrovegni Şapeli (UNESCO), büyük bir hac merkezi olan Aziz Antonio Bazilikası ve dünyanın en eski akademik botanik bahçelerinden biri kentin hazineleridir. Geniş meydanları ve kemer altı yollarıyla Padova canlı bir öğrenci atmosferi taşır.', sources: ['UNESCO World Heritage List — Padua’s fourteenth-century fresco cycles', 'Italia.it — Padova'] },
  { id: 'vicenza', name: 'Vicenza', city: 'Vicenza', country: 'İtalya', lat: 45.5455, lng: 11.5354, aliases: ['vicenza'], summary: 'Kuzey İtalya’da Vicenza, 16. yüzyıl mimarı Andrea Palladio’nun kentidir; onun klasik oranlara dayalı üslubu tüm dünyada “Palladyan” mimariyi doğurmuştur. Kentin kendisi ve çevresindeki villalar UNESCO Dünya Mirası Listesi’ndedir.\n\nPalladio’nun ahşap sahne dekoruyla dünyanın en eski kapalı tiyatrolarından Teatro Olimpico, şehir meydanındaki Basilica Palladiana ve tepedeki Villa La Rotonda başlıca eserleridir. Vicenza aynı zamanda köklü bir kuyumculuk ve altın işleme merkezidir.', sources: ['UNESCO World Heritage List — City of Vicenza and the Palladian Villas of the Veneto'] },
  { id: 'bologna', name: 'Bologna', city: 'Bologna', country: 'İtalya', lat: 44.4949, lng: 11.3426, aliases: ['bologna'], summary: 'Emilia-Romagna’nın başkenti Bologna, 1088’de kurulan ve dünyanın en eski üniversitesine ev sahipliği yapan canlı bir öğrenci kentidir. Kızıl tuğlalı yapıları nedeniyle “la Rossa”, köklü mutfağı nedeniyle “la Grassa” (bereketli) lakaplarıyla anılır.\n\nKilometrelerce uzanan tarihî kemer altı yolları (portici) UNESCO Dünya Mirası Listesi’ndedir. Devasa Piazza Maggiore meydanı, göğe yükselen iki eğik kule (Asinelli ve Garisenda) ve tagliatelle, tortellini gibi lezzetleriyle Bologna İtalyan mutfağının kalbidir.', sources: ['UNESCO World Heritage List — The Porticoes of Bologna', 'Italia.it — Bologna'] },
  { id: 'bergamo', name: 'Bergamo', city: 'Bergamo', country: 'İtalya', lat: 45.6983, lng: 9.6773, aliases: ['bergamo'], summary: 'Milano’nun kuzeydoğusundaki Bergamo, iki farklı yüzü olan bir kenttir: ovadaki modern aşağı şehir (Città Bassa) ve tepede Venedik surlarıyla çevrili büyüleyici tarihî üst şehir (Città Alta). Surlar UNESCO Dünya Mirası kapsamındadır.\n\nBir füniküler ile ulaşılan Città Alta’da zarif Piazza Vecchia meydanı, Colleoni Şapeli ve Santa Maria Maggiore Bazilikası bulunur. Dar taş sokakları ve panoramik teraslarıyla Bergamo, Alpler’e ve göllere açılan keyifli bir duraktır.', sources: ['Italia.it — Bergamo'] },
  { id: 'como', name: 'Como Gölü', city: 'Como', country: 'İtalya', lat: 45.8081, lng: 9.0852, aliases: ['como', 'como gölü', 'lago di como', 'lake como', 'bellagio'], summary: 'Alpler’in eteğinde buzul oyuğunda uzanan ters Y biçimli Como Gölü, İtalya’nın en derin ve en zarif göllerinden biridir. Yüzyıllardır aristokratları, sanatçıları ve günümüzde ünlüleri kıyısındaki villalara çeken bir cazibe merkezidir.\n\nGöl kıyısındaki Bellagio, Varenna ve Menaggio gibi renkli kasabalar; görkemli bahçeleriyle Villa del Balbianello ve Villa Carlotta ile tekne turları başlıca deneyimlerdir. Karlı dağların suya yansıdığı manzarası, gölü İtalya’nın en romantik köşelerinden biri yapar.', sources: ['Italia.it — Lago di Como'] },
  { id: 'bolzano', name: 'Bolzano', city: 'Bolzano', country: 'İtalya', lat: 46.4983, lng: 11.3548, aliases: ['bolzano', 'bozen'], summary: 'Güney Tirol’ün (Alto Adige) başkenti Bolzano, İtalyan ve Cermen kültürlerinin iç içe geçtiği, Dolomitler’e açılan bir Alp kentidir. Sokaklarında hem İtalyanca hem Almanca konuşulur; mimarisi ve mutfağı bu ikili kimliği yansıtır.\n\nKentin en ünlü sakini, buzulda donmuş halde bulunan 5.300 yıllık “Buz Adamı Ötzi”dir ve Güney Tirol Arkeoloji Müzesi’nde sergilenir. Kemerli Via dei Portici çarşısı, meydan pazarı ve çevredeki üzüm bağlarıyla Bolzano, dağ yürüyüşleri için ideal bir üstür.', sources: ['Italia.it — Bolzano'] },
  { id: 'trento', name: 'Trento', city: 'Trento', country: 'İtalya', lat: 46.0679, lng: 11.1211, aliases: ['trento', 'trent'], summary: 'Adige Vadisi’nde, Dolomitler’in eteğinde kurulu Trento, İtalyan ve Alp kültürünün buluştuğu zarif bir kenttir. 16. yüzyılda Katolik Kilisesi’nin kaderini belirleyen Trento Konsili’ne ev sahipliği yapmasıyla tarihe geçmiştir.\n\nFreskli cepheleriyle ünlü tarihî merkezinde, prens-piskoposların ikametgâhı görkemli Castello del Buonconsiglio ve Konsil kararlarının alındığı katedral öne çıkar. Çevresindeki dağlar, üzüm bağları ve kayak merkezleriyle Trento doğa ile kültürü birleştirir.', sources: ['Italia.it — Trento'] },
  { id: 'siena', name: 'Siena', city: 'Siena', country: 'İtalya', lat: 43.3188, lng: 11.3308, aliases: ['siena'], summary: 'Toskana tepelerine kurulu Siena, Orta Çağ’da Floransa’nın büyük rakibi olan zengin bir cumhuriyetti; olağanüstü korunmuş gotik kent dokusu bu altın çağı bugüne taşır. Tarihî merkezi bütünüyle UNESCO Dünya Mirası Listesi’ndedir.\n\nDeniz kabuğu biçimli, eğimli Piazza del Campo meydanı kentin kalbidir ve yılda iki kez düzenlenen efsanevi Palio at yarışına sahne olur. Alacalı siyah-beyaz mermer katedrali ve dar ortaçağ sokaklarıyla Siena, adeta zamanda donmuş bir açık hava müzesidir.', sources: ['UNESCO World Heritage List — Historic Centre of Siena'] },
  { id: 'sangimignano', name: 'San Gimignano', city: 'San Gimignano', country: 'İtalya', lat: 43.4674, lng: 11.0431, aliases: ['san gimignano', 'sangimignano'], summary: 'Toskana’nın üzüm bağları arasında bir tepeye kurulu San Gimignano, göğe yükselen ortaçağ taş kuleleriyle “Ortaçağ’ın Manhattan’ı” olarak anılır. Bir zamanlar 70’i aşan kuleden bugün 14’ü ayakta kalmıştır ve kasaba UNESCO korumasındadır.\n\nZengin ailelerin güç gösterisi olarak yükselttiği bu kuleler, kasabaya benzersiz bir siluet kazandırır. Meydanları, sarnıcı ve yerel beyaz şarabı Vernaccia di San Gimignano ile kasaba, Toskana kırsalının en fotojenik duraklarından biridir.', sources: ['UNESCO World Heritage List — Historic Centre of San Gimignano'] },
  { id: 'lucca', name: 'Lucca', city: 'Lucca', country: 'İtalya', lat: 43.843, lng: 10.5027, aliases: ['lucca'], summary: 'Toskana’da, tümüyle sağlam kalmış görkemli Rönesans surlarıyla çevrili Lucca, surların üstünde ağaçlı bir yürüyüş ve bisiklet parkuru bulunan ender kentlerden biridir. Antik Roma dokusunu koruyan sokakları bugün de canlıdır.\n\nRoma amfitiyatrosunun izinden şekillenen oval Piazza dell’Anfiteatro meydanı, çan kuleleri ve kiliseleriyle kent büyüleyicidir. Besteci Giacomo Puccini’nin doğduğu şehir olan Lucca, her yaz müzik etkinlikleriyle de anılır.', sources: ['Italia.it — Lucca'] },
  { id: 'cinqueterre', name: 'Cinque Terre', city: 'Cinque Terre', country: 'İtalya', lat: 44.1069, lng: 9.7292, aliases: ['cinque terre', 'cinqueterre', 'riomaggiore', 'vernazza', 'manarola'], summary: 'Ligurya kıyısında sarp uçurumlara tutunmuş beş renkli balıkçı köyünden (Monterosso, Vernazza, Corniglia, Manarola, Riomaggiore) oluşan Cinque Terre, İtalyan Rivierası’nın en büyüleyici köşelerinden biridir. Bölge hem UNESCO Dünya Mirası hem millî park statüsündedir.\n\nYüzyıllar içinde elle örülen taş teraslarda üzüm ve limon yetiştirilir; köyleri birbirine bağlayan uçurum kenarı patikalar (özellikle “Aşk Yolu”) muhteşem deniz manzaraları sunar. Renkli evler, küçük limanlar ve taze deniz ürünleriyle köyler bir kartpostal gibidir.', sources: ['UNESCO World Heritage List — Portovenere, Cinque Terre'] },
  { id: 'rimini', name: 'Rimini', city: 'Rimini', country: 'İtalya', lat: 44.0594, lng: 12.5683, aliases: ['rimini'], summary: 'Adriyatik kıyısındaki Rimini, geniş kumsalları ve hareketli sahil hayatıyla İtalya’nın en popüler tatil kentlerinden biri olsa da köklü bir Roma geçmişine sahiptir. Yönetmen Federico Fellini’nin doğduğu şehir olmasıyla da anılır.\n\nMÖ 1. yüzyıla ait, hâlâ kullanılan Tiberius Köprüsü ve kente giren Augustus Takı, antik dönemden kalan görkemli anıtlardır. Uzun plajları ve eğlence hayatının yanı sıra Rimini, dünyanın en küçük devletlerinden San Marino’ya açılan bir kapıdır.', sources: ['Italia.it — Rimini'] },
  // --- Slovenya / Hırvatistan / Adriyatik ara duraklar ---
  { id: 'maribor', name: 'Maribor', city: 'Maribor', country: 'Slovenya', lat: 46.5547, lng: 15.6459, aliases: ['maribor'], summary: 'Slovenya’nın ikinci büyük kenti Maribor, Drava Nehri kıyısında, üzüm bağları ve kayak merkezleriyle çevrili canlı bir üniversite kentidir. Sakin ama keyifli havasıyla bölgenin kültür ve şarap merkezidir.\n\nNehir kıyısındaki tarihî Lent semtinde, dünyanın kayıtlı en yaşlı asma çubuğu (400 yılı aşkın) hâlâ üzüm verir. Eski meydanları, kalesi ve her yaz düzenlenen festivalleriyle Maribor; yakınındaki Pohorje dağı ve şarap yollarına açılan hoş bir duraktır.', sources: ['I Feel Slovenia — Maribor'] },
  { id: 'postojna', name: 'Postojna', city: 'Postojna', country: 'Slovenya', lat: 45.7756, lng: 14.2136, aliases: ['postojna', 'postojna magarasi', 'predjama'], summary: 'Slovenya’nın karst bölgesindeki Postojna, Avrupa’nın en görkemli yeraltı dünyalarından birine ev sahipliği yapar. Kentin adı, milyonlarca yılda oluşmuş devasa damlataş mağara sistemiyle özdeşleşmiştir.\n\nZiyaretçilerin özel bir yeraltı treniyle içine girdiği Postojna Mağarası, sarkıt ve dikitlerden oluşan büyüleyici salonları ve endemik “insan balığı” (olm) ile ünlüdür. Hemen yakında, bir uçurum mağarasının ağzına oyulmuş dünyanın en büyük mağara kalesi Predjama da görülmeye değer.', sources: ['I Feel Slovenia — Postojna Cave'] },
  { id: 'piran', name: 'Piran', city: 'Piran', country: 'Slovenya', lat: 45.5285, lng: 13.5683, aliases: ['piran'], summary: 'Slovenya’nın kısa Adriyatik kıyısında, denize uzanan ince bir burnun ucuna kurulu Piran, yüzyıllarca Venedik yönetiminde kaldığı için güçlü bir İtalyan atmosferi taşıyan büyüleyici bir liman kasabasıdır. Dar taş sokakları ve kırmızı çatılarıyla adeta zamanda donmuştur.\n\nBesteci Giuseppe Tartini’ye adanmış zarif Tartini Meydanı, denize bakan çan kulesi, eski deniz surları ve balıkçı limanı kasabanın simgeleridir. Berrak Adriyatik suları, deniz ürünü lokantaları ve gün batımı manzarasıyla Piran, huzurlu bir sahil kaçamağıdır.', sources: ['I Feel Slovenia — Piran'] },
  { id: 'rovinj', name: 'Rovinj', city: 'Rovinj', country: 'Hırvatistan', lat: 45.0811, lng: 13.6387, aliases: ['rovinj', 'rovigno'], summary: 'Hırvatistan’ın İstria Yarımadası’nda, Adriyatik’e uzanan bir kayalık üzerine kurulu Rovinj, renkli balıkçı evleri ve dar sokaklarıyla ülkenin en fotojenik kasabalarından biridir. Yüzyıllarca Venedik yönetiminde kalması, ona güçlü bir İtalyan atmosferi kazandırmıştır.\n\nKasabanın en yüksek noktasında denizden yükselen çan kulesiyle Aziz Euphemia Kilisesi kentin simgesidir. Sanatçı atölyeleriyle dolu arnavut kaldırımlı sokaklar, küçük limanı ve gün batımı manzarasıyla Rovinj romantik bir kaçamak sunar; çevredeki takımadalar tekne turları için idealdir.', sources: ['Croatia.hr — Rovinj'] },
  { id: 'pula', name: 'Pula', city: 'Pula', country: 'Hırvatistan', lat: 44.8666, lng: 13.8496, aliases: ['pula', 'pola'], summary: 'İstria Yarımadası’nın güney ucundaki Pula, Adriyatik kıyısında zengin bir Roma geçmişine sahip liman kentidir. Antik dönemde önemli bir Roma kolonisiydi ve bu miras kente görkemli anıtlar bırakmıştır.\n\nDünyanın en iyi korunmuş altı Roma amfitiyatrosundan biri olan devasa Arena kentin simgesidir ve bugün konser ile festivallere ev sahipliği yapar. Augustus Tapınağı, zafer takları ve eski şehir dokusunun yanı sıra çevredeki koylar ve plajlarıyla Pula, tarih ile deniz keyfini birleştirir.', sources: ['Croatia.hr — Pula'] },
  { id: 'plitvice', name: 'Plitvice Gölleri', city: 'Plitvice', country: 'Hırvatistan', lat: 44.8654, lng: 15.582, aliases: ['plitvice', 'plitvice golleri', 'plitvice lakes', 'plitvicka'], summary: 'Hırvatistan’ın iç kesimindeki Plitvice Gölleri Milli Parkı, ülkenin en ünlü doğal harikası ve UNESCO Dünya Mirası alanıdır. Kireçtaşı barajların binlerce yılda oluşturduğu bir sistemdir ve suyun mineral yapısı göllere büyüleyici turkuaz-yeşil tonlar verir.\n\nBirbirine irili ufaklı şelalelerle bağlanan on altı teraslı göl; ahşap yürüyüş yolları ve patikalarla gezilebilir, tekne ve panoramik tren de ulaşımı kolaylaştırır. Orman içindeki çağlayanlar ve berrak sularıyla park, her mevsim ayrı bir güzellik sunan bir doğa cennetidir.', sources: ['UNESCO World Heritage List — Plitvice Lakes National Park'] },
  { id: 'split', name: 'Split', city: 'Split', country: 'Hırvatistan', lat: 43.5081, lng: 16.4402, aliases: ['split', 'spalato'], summary: 'Dalmaçya kıyısının en büyük kenti Split, Roma İmparatoru Diocletianus’un MS 4. yüzyılda emeklilik için yaptırdığı devasa sarayın içine kurulu olmasıyla dünyada benzersizdir. Yaşayan bu antik saray, bugün de kentin canlı kalbini oluşturur.\n\nİçinde evlerin, dükkânların ve kafelerin bulunduğu Diocletianus Sarayı (UNESCO), deniz kıyısındaki hareketli Riva promenadı ve tepedeki Marjan ormanı başlıca duraklardır. Adalara (Hvar, Brač, Vis) açılan feribot limanıyla Split, Adriyatik gezileri için de ana üstür.', sources: ['UNESCO World Heritage List — Historical Complex of Split with the Palace of Diocletian'] },
  { id: 'sibenik', name: 'Šibenik', city: 'Šibenik', country: 'Hırvatistan', lat: 43.735, lng: 15.8952, aliases: ['sibenik', 'şibenik'], summary: 'Dalmaçya sahilinde, Krka Nehri’nin Adriyatik’e döküldüğü noktada kurulu Šibenik, Venedik ya da Roma tarafından değil, bizzat Hırvatlar tarafından kurulmuş ender bir kıyı kentidir. Dar taş sokakları yamaçtan denize doğru iner.\n\nHiç harç kullanılmadan tümüyle taştan inşa edilen, kubbesi ve yüzlerce insan portresiyle ünlü Aziz Yakup Katedrali UNESCO Dünya Mirası’dır. Kenti koruyan kaleler ve hemen yakındaki Krka Şelaleleri Milli Parkı, Šibenik’i tarih ve doğa açısından zengin bir durak yapar.', sources: ['UNESCO World Heritage List — The Cathedral of St James in Šibenik'] },
  { id: 'trogir', name: 'Trogir', city: 'Trogir', country: 'Hırvatistan', lat: 43.515, lng: 16.2517, aliases: ['trogir', 'trau'], summary: 'Split’in hemen batısında, karayla köprülerle bağlı küçük bir ada üzerine kurulu Trogir, iki bin yılı aşkın geçmişiyle Orta Avrupa’nın en iyi korunmuş Romanesk-gotik kent dokularından birine sahiptir. Tarihî merkezi bütünüyle UNESCO korumasındadır.\n\nDar taş sokakları, meydanı ve özellikle usta Radovan’ın taş oymalarıyla ünlü Aziz Lawrence (Sveti Lovro) Katedrali kentin hazineleridir. Deniz kıyısı promenadı, Venedik kalesi ve balıkçı atmosferiyle Trogir, adeta açık hava müzesi gibi bir Dalmaçya incisidir.', sources: ['UNESCO World Heritage List — Historic City of Trogir'] },
  { id: 'opatija', name: 'Opatija', city: 'Opatija', country: 'Hırvatistan', lat: 45.3378, lng: 14.3053, aliases: ['opatija', 'abbazia'], summary: 'Kvarner Körfezi kıyısındaki Opatija, 19. yüzyılın sonunda Avusturya-Macaristan aristokrasisinin gözde deniz kaplıcası olarak parlayan zarif bir belle époque tatil kasabasıdır. Görkemli villaları ve otelleri o dönemin ihtişamını bugüne taşır.\n\nDeniz boyunca kilometrelerce uzanan ünlü Lungomare sahil yürüyüş yolu, çiçekli parkları ve kayalıkta duran “Martı Kayalıklı Kız” (Denizkızı) heykeli kasabanın simgeleridir. Ilıman iklimi ve zarif atmosferiyle Opatija, dinlendirici bir Adriyatik durağıdır.', sources: ['Croatia.hr — Opatija'] },
  // --- Almanya ara/geçiş durakları ---
  { id: 'regensburg', name: 'Regensburg', city: 'Regensburg', country: 'Almanya', lat: 49.0134, lng: 12.1016, aliases: ['regensburg'], summary: 'Tuna Nehri kıyısındaki Regensburg, İkinci Dünya Savaşı’ndan neredeyse hasarsız çıkan, Almanya’nın en iyi korunmuş ortaçağ kentlerinden biridir. Roma döneminden Orta Çağ’a uzanan dokusuyla tarihî merkezi UNESCO Dünya Mirası Listesi’ndedir.\n\n12. yüzyıldan kalma ünlü Taş Köprü (Steinerne Brücke), göğe yükselen gotik Aziz Petrus Katedrali ve dar sokaklardaki patrisyen kuleleri kenti büyüleyici kılar. Tuna kıyısı bira bahçeleri ve öğrenci nüfusuyla Regensburg canlı bir Bavyera kentidir.', sources: ['UNESCO World Heritage List — Old town of Regensburg with Stadtamhof'] },
  { id: 'nurnberg', name: 'Nürnberg', city: 'Nürnberg', country: 'Almanya', lat: 49.4521, lng: 11.0767, aliases: ['nurnberg', 'nürnberg', 'nuremberg'], summary: 'Bavyera’nın ikinci büyük kenti Nürnberg, Orta Çağ’da Kutsal Roma İmparatorluğu’nun en önemli merkezlerinden biriydi; sanatçı Albrecht Dürer’in de memleketidir. 20. yüzyılda ise Nazi mitingleri ve savaş sonrası Nürnberg Duruşmaları’yla tarihe geçmiştir.\n\nTepedeki görkemli İmparatorluk Kalesi, yarım ahşap evli eski şehir, Dürer’in evi ve Nazi dönemini anlatan Belgeleme Merkezi başlıca duraklardır. Kışın kurulan asırlık Christkindlesmarkt, dünyanın en ünlü Noel pazarlarından biridir.', sources: ['Germany.travel — Nuremberg'] },
  { id: 'wurzburg', name: 'Würzburg', city: 'Würzburg', country: 'Almanya', lat: 49.7913, lng: 9.9534, aliases: ['wurzburg', 'würzburg'], summary: 'Franken bölgesinde, Main Nehri kıyısındaki Würzburg, ünlü “Romantik Yol”un kuzey başlangıç noktasıdır ve şarap kültürüyle anılan zarif bir barok kenttir. Prens-piskoposların yönetiminde görkemli bir sanat merkezi olmuştur.\n\nTiepolo’nun dünyanın en büyük tavan freskini yaptığı görkemli Residenz Sarayı UNESCO Dünya Mirası Listesi’ndedir. Nehre hâkim Marienberg Kalesi, Eski Ana Köprü ve çevredeki bağlarda üretilen Franken şarapları kenti tamamlar.', sources: ['UNESCO World Heritage List — Würzburg Residence'] },
  { id: 'rothenburg', name: 'Rothenburg ob der Tauber', city: 'Rothenburg', country: 'Almanya', lat: 49.3775, lng: 10.1789, aliases: ['rothenburg', 'rothenburg ob der tauber'], summary: 'Romantik Yol’un en sevilen durağı Rothenburg ob der Tauber, surlarıyla tümüyle çevrili, yarım ahşap evleri ve taş sokaklarıyla adeta bir masal kitabından çıkmış ortaçağ kasabasıdır. Zamanın donduğu bu doku, dünyanın dört bir yanından ziyaretçi çeker.\n\nSur boyunca yapılan yürüyüş, meydandaki belediye binası, Plönlein’ın ünlü kartpostal köşesi ve yıl boyu açık Noel dükkânı kasabanın simgeleridir. Franken şarabı ve geleneksel Schneeball tatlısıyla Rothenburg, geçmişe yolculuk gibidir.', sources: ['Germany.travel — Rothenburg ob der Tauber'] },
  { id: 'fussen', name: 'Füssen (Neuschwanstein)', city: 'Füssen', country: 'Almanya', lat: 47.5716, lng: 10.7017, aliases: ['fussen', 'füssen', 'neuschwanstein', 'schwangau'], summary: 'Bavyera Alpleri’nin eteğinde, Avusturya sınırına yakın Füssen, dünyanın en ünlü şatolarına açılan kapı olan şirin bir dağ kasabasıdır. Göller ve karlı zirvelerle çevrili konumu onu doğa tutkunları için de cazip kılar.\n\nKral II. Ludwig’in masalsı Neuschwanstein Şatosu (Disney kalelerine ilham veren yapı) ve sarı Hohenschwangau Şatosu hemen yakınındadır. Renkli tarihî merkezi, Lech Nehri ve çevredeki Alp gölleriyle Füssen, Romantik Yol’un görkemli finalidir.', sources: ['Germany.travel — Neuschwanstein / Füssen'] },
  { id: 'heidelberg', name: 'Heidelberg', city: 'Heidelberg', country: 'Almanya', lat: 49.3988, lng: 8.6724, aliases: ['heidelberg'], summary: 'Neckar Nehri vadisinde kurulu Heidelberg, romantizm çağının şairlerine ilham vermiş, Almanya’nın en eski (1386) üniversitesine ev sahipliği yapan büyüleyici bir kenttir. Savaştan sağ çıkan tarihî merkezi bugün de canlıdır.\n\nŞehre tepeden bakan yıkık kızıl kumtaşı kalesi, Neckar üzerindeki zarif Eski Köprü ve karşı yamaçtaki manzaralı “Filozoflar Yolu” kentin simgeleridir. Öğrenci enerjisi, tarihî meyhaneleri ve romantik atmosferiyle Heidelberg unutulmaz bir duraktır.', sources: ['Germany.travel — Heidelberg'] },
  { id: 'dresden', name: 'Dresden', city: 'Dresden', country: 'Almanya', lat: 51.0504, lng: 13.7373, aliases: ['dresden'], summary: 'Elbe Nehri kıyısındaki Dresden, görkemli barok mimarisiyle “Elbe’nin Floransası” olarak anılır. 1945’teki yıkıcı bombardımanın ardından tarihî merkezi büyük bir titizlikle yeniden inşa edilerek geçmişin ihtişamına kavuşturulmuştur.\n\nUzun süre harabe kalıp yeniden ayağa kaldırılan Frauenkirche, avlusuyla Zwinger sarayı, Semperoper opera binası ve dünyaca ünlü sanat koleksiyonlarıyla kent bir barok hazinesidir. Elbe kıyısı terasları (“Avrupa’nın Balkonu”) da görülmeye değerdir.', sources: ['Germany.travel — Dresden'] },
  { id: 'leipzig', name: 'Leipzig', city: 'Leipzig', country: 'Almanya', lat: 51.3397, lng: 12.3731, aliases: ['leipzig'], summary: 'Doğu Almanya’nın canlı kültür ve müzik kenti Leipzig, Johann Sebastian Bach’ın uzun yıllar çalıştığı bir müzik başkentidir. 1989’da komünist rejimin sonunu getiren barışçıl “Pazartesi Gösterileri” de burada başlamıştır.\n\nBach’ın mezarını barındıran Thomaskirche, zarif tarihî alışveriş pasajları, çağdaş sanat sahnesi ve devasa Uluslar Savaşı Anıtı başlıca duraklardır. Ticaret fuarları, yaratıcı semtleri ve öğrenci nüfusuyla Leipzig yeniden yükselen bir merkezdir.', sources: ['Germany.travel — Leipzig'] },
  { id: 'badenbaden', name: 'Baden-Baden', city: 'Baden-Baden', country: 'Almanya', lat: 48.7606, lng: 8.2396, aliases: ['baden-baden', 'baden baden', 'badenbaden'], summary: 'Kara Orman’ın eteğinde kurulu Baden-Baden, antik Romalılardan bu yana termal kaynaklarıyla ünlü zarif bir kaplıca kentidir. 19. yüzyılda Avrupa aristokrasisinin gözde “yazlık başkenti” olmuştur.\n\nTarihî Friedrichsbad ve modern Caracalla termal hamamları, görkemli Kurhaus kumarhanesi, zarif parklar ve Lichtentaler Allee ağaçlıklı yürüyüş yolu kentin simgeleridir. Festival salonu, at yarışları ve şık atmosferiyle Baden-Baden klasik bir dinlence durağıdır.', sources: ['Germany.travel — Baden-Baden'] },
  { id: 'freiburg', name: 'Freiburg', city: 'Freiburg', country: 'Almanya', lat: 47.999, lng: 7.8421, aliases: ['freiburg', 'freiburg im breisgau'], summary: 'Kara Orman’ın güney kapısı Freiburg, Almanya’nın en güneşli ve en çevreci kentlerinden biridir; canlı bir üniversite kenti olarak genç ve dinamik bir ruh taşır. Ortaçağ dokusu savaş sonrası özenle korunmuştur.\n\nGöğe yükselen kırmızı kumtaşı kulesiyle gotik Freiburg Münster katedrali, sokak kenarlarından şırıl şırıl akan tarihî su kanalları (Bächle) ve renkli meydan pazarı kenti büyüleyici kılar. Çevresindeki bağlar, ormanlar ve yürüyüş yollarıyla Freiburg doğaya açılır.', sources: ['Germany.travel — Freiburg'] },
  // --- İsviçre & Doğu Fransa ara durakları ---
  { id: 'bern', name: 'Bern', city: 'Bern', country: 'İsviçre', lat: 46.948, lng: 7.4474, aliases: ['bern', 'berne'], summary: 'İsviçre’nin başkenti Bern, Aare Nehri’nin bir kıvrımının çevrelediği yarımadaya kurulu, olağanüstü korunmuş ortaçağ dokusuyla UNESCO Dünya Mirası Listesi’nde yer alan zarif bir kenttir. Sakin ve düzenli havasıyla ülkenin siyasi kalbidir.\n\nAltı kilometreyi bulan kemer altı arkatlı alışveriş sokakları, hareketli figürlü Zytglogge saat kulesi, gotik katedrali ve kentin simgesi ayıların yaşadığı park başlıca cazibelerdir. Albert Einstein’ın görelilik kuramını geliştirdiği ev de ziyaret edilebilir.', sources: ['UNESCO World Heritage List — Old City of Berne', 'MySwitzerland — Bern'] },
  { id: 'cenevre', name: 'Cenevre', city: 'Cenevre', country: 'İsviçre', lat: 46.2044, lng: 6.1432, aliases: ['cenevre', 'geneva', 'geneve', 'genf'], summary: 'Léman Gölü’nün güneybatı ucunda, Fransa sınırında kurulu Cenevre, Birleşmiş Milletler’in Avrupa merkezi ve Kızılhaç’ın doğduğu yer olarak dünya diplomasisinin başkentlerinden biridir. Kozmopolit ve zarif bir uluslararası kenttir.\n\nGöl üzerinde 140 metre yükselen su fıskiyesi Jet d’Eau kentin simgesidir; dar sokaklı Eski Şehir, katedrali ve çiçek saati de görülmeye değerdir. Göl kıyısı gezileri, lüks saat mağazaları ve BM binası turlarıyla Cenevre uluslararası bir cazibe sunar.', sources: ['MySwitzerland — Geneva'] },
  { id: 'lausanne', name: 'Lausanne', city: 'Lausanne', country: 'İsviçre', lat: 46.5197, lng: 6.6323, aliases: ['lausanne'], summary: 'Léman Gölü’ne bakan yamaçlara kurulu Lausanne, İsviçre’nin Fransızca konuşulan bölgesinin canlı üniversite ve kültür kentidir. Aynı zamanda Uluslararası Olimpiyat Komitesi’nin merkezi olarak “Olimpiyat Başkenti” unvanını taşır.\n\nGöğe uzanan gotik katedrali, göl kıyısındaki keyifli Ouchy semti ve modern Olimpiyat Müzesi başlıca duraklardır. Dik sokakları, metrosu ve göl manzarasıyla Lausanne, çevredeki Lavaux bağları (UNESCO) için de mükemmel bir üstür.', sources: ['MySwitzerland — Lausanne'] },
  { id: 'montreux', name: 'Montreux', city: 'Montreux', country: 'İsviçre', lat: 46.4312, lng: 6.9107, aliases: ['montreux'], summary: 'Léman Gölü’nün doğu ucunda, dağların koruduğu ılıman bir mikroklime sahip Montreux, palmiyeli sahil promenadıyla “İsviçre Rivierası”nın incisidir. Yıllardır sanatçıları ve müzikseverleri kendine çekmiştir.\n\nGöl kıyısında bir kayalığa kurulu, İsviçre’nin en çok ziyaret edilen tarihî yapısı Chillon Şatosu kentin simgesidir. Çiçeklerle bezeli göl yürüyüş yolu ve dünyaca ünlü Montreux Caz Festivali kenti canlı kılar; Freddie Mercury’nin heykeli de burada göle bakar.', sources: ['MySwitzerland — Montreux'] },
  { id: 'lugano', name: 'Lugano', city: 'Lugano', country: 'İsviçre', lat: 46.0037, lng: 8.9511, aliases: ['lugano'], summary: 'İsviçre’nin İtalyanca konuşulan Ticino bölgesinde, adını taşıyan gölün kıyısında kurulu Lugano, palmiyeleri ve Akdeniz havasıyla “İsviçre’nin güney yüzü” olarak anılır. İtalyan zarafeti ile İsviçre düzenini birleştirir.\n\nGöl kıyısı parkları ve promenadı, arkatlı meydanlar, şık butikler ve göle tepeden bakan Monte Brè ile Monte San Salvatore manzaraları başlıca cazibelerdir. Ilıman iklimi ve göl gezileriyle Lugano, rahat bir dinlence durağıdır.', sources: ['MySwitzerland — Lugano'] },
  { id: 'strasbourg', name: 'Strasbourg', city: 'Strasbourg', country: 'Fransa', lat: 48.5734, lng: 7.7521, aliases: ['strasbourg', 'strazburg'], summary: 'Fransa ile Almanya arasında, Alsas bölgesinin başkenti Strasbourg, iki kültürün yüzyıllar boyunca iç içe geçtiği zarif bir kenttir. Avrupa Parlamentosu’na ev sahipliği yaparak “Avrupa’nın başkenti” unvanını taşır.\n\nPembe kumtaşından göğe uzanan görkemli gotik katedrali, kanallarla çevrili yarım ahşap evli Petite France mahallesi (UNESCO) ve Ill Nehri üzerindeki tekne turları başlıca duraklardır. Alsas mutfağı ve dünyanın en eski Noel pazarlarından biriyle de ünlüdür.', sources: ['UNESCO World Heritage List — Strasbourg, Grande-Île and Neustadt'] },
  { id: 'colmar', name: 'Colmar', city: 'Colmar', country: 'Fransa', lat: 48.0794, lng: 7.3585, aliases: ['colmar'], summary: 'Alsas Şarap Yolu’nun kalbindeki Colmar, renkli yarım ahşap evleri ve çiçekli kanallarıyla adeta bir masal kasabasıdır; çoğu zaman Fransa’nın en güzel küçük kentlerinden biri sayılır. Alman ve Fransız kültürünün kaynaştığı özgün bir atmosfer sunar.\n\nKanal kıyısındaki “Küçük Venedik” (La Petite Venise) semti, korunmuş ortaçağ meydanları ve ressam Grünewald’ın başyapıtını barındıran Unterlinden Müzesi kentin öne çıkanlarıdır. Çevresindeki bağlarda üretilen Alsas beyaz şarapları da meşhurdur.', sources: ['France.fr — Colmar'] },
  { id: 'dijon', name: 'Dijon', city: 'Dijon', country: 'Fransa', lat: 47.322, lng: 5.0415, aliases: ['dijon'], summary: 'Burgonya (Bourgogne) bölgesinin başkenti Dijon, güçlü Burgonya düklerinin yönetiminde bir zamanlar Avrupa’nın en zengin ve sanat dolu saraylarından birine ev sahipliği yapmıştır. Bugün zarif bir şarap ve gastronomi kentidir.\n\nGörkemli Dük Sarayı, rengârenk çinili çatılarıyla ünlü tarihî yapıları ve dokunulduğunda şans getirdiğine inanılan baykuş kabartmasının izlediği yürüyüş rotası kenti keyifli kılar. Ünlü Dijon hardalı ve Côte d’Or bağları bölgeye kimlik katar.', sources: ['France.fr — Dijon'] },
  { id: 'annecy', name: 'Annecy', city: 'Annecy', country: 'Fransa', lat: 45.8992, lng: 6.1294, aliases: ['annecy'], summary: 'Fransız Alpleri’nde, adını taşıdığı berrak gölün kıyısında kurulu Annecy, kanalları ve pastel renkli evleriyle “Alplerin Venedik’i” olarak anılır. Dağlarla çevrili konumu ve tertemiz gölüyle nefes kesen bir doğaya sahiptir.\n\nGölün suladığı kanalların ortasında yükselen eski hapishane Palais de l’Isle, çiçeklerle bezeli köprüleri ve ortaçağ kalesi kentin simgeleridir. Yaz aylarında yüzme, tekne ve bisiklet, kışın ise yakındaki kayak merkezleriyle Annecy dört mevsim cazip bir duraktır.', sources: ['France.fr — Annecy'] },
  { id: 'avignon', name: 'Avignon', city: 'Avignon', country: 'Fransa', lat: 43.9493, lng: 4.8055, aliases: ['avignon'], summary: 'Provence’ta Rhône Nehri kıyısındaki Avignon, 14. yüzyılda papaların Roma yerine burada yaşadığı dönemde Hristiyan dünyasının merkezi olmuştur. Bu görkemli geçmiş kente anıtsal bir miras bırakmıştır ve tarihî merkez UNESCO korumasındadır.\n\nAvrupa’nın en büyük gotik yapılarından devasa Papalık Sarayı (Palais des Papes) ve çocuk şarkısına konu olan yarım kalmış Pont Saint-Bénézet (Pont d’Avignon) köprüsü başlıca simgelerdir. Her yaz düzenlenen ünlü tiyatro festivaliyle de anılır.', sources: ['UNESCO World Heritage List — Historic Centre of Avignon'] },
  { id: 'aix', name: 'Aix-en-Provence', city: 'Aix-en-Provence', country: 'Fransa', lat: 43.5297, lng: 5.4474, aliases: ['aix', 'aix-en-provence', 'aix en provence'], summary: 'Provence’ın zarif kültür kenti Aix-en-Provence, çeşmeleri, ağaçlı bulvarları ve güneşli meydanlarıyla klasik bir güney Fransa atmosferi taşır. Bir zamanlar Provence’ın başkenti olan kent, sanat ve öğrenci enerjisiyle canlıdır.\n\nÇınarlarla gölgelenen görkemli Cours Mirabeau bulvarı, rengârenk meydan pazarları ve ressam Paul Cézanne’ın atölyesi ile onu esinleyen manzaralar başlıca duraklardır. Çevredeki lavanta tarlaları ve bağlarıyla Aix, Provence’ı keşfetmek için ideal bir üstür.', sources: ['France.fr — Aix-en-Provence'] },
  // --- Orta Avrupa (Çekya/Slovakya/Macaristan/Avusturya) ara durakları ---
  { id: 'brno', name: 'Brno', city: 'Brno', country: 'Çekya', lat: 49.1951, lng: 16.6068, aliases: ['brno'], summary: 'Çekya’nın ikinci büyük kenti Brno, Moravya bölgesinin başkenti ve canlı bir üniversite kentidir; Prag’ın gölgesinde kalsa da özgün bir çekiciliğe sahiptir. Modern mimarinin ve bilim tarihinin önemli bir merkezidir.\n\nKente tepeden bakan Špilberk Kalesi, dişleri sarkan ejderha efsanesiyle ünlü katedrali ve modern mimarinin başyapıtı sayılan Villa Tugendhat (UNESCO) başlıca duraklardır. Kalıtım yasalarını burada bir manastır bahçesinde keşfeden Gregor Mendel’in mirası ve hareketli kafe-bar sahnesiyle Brno gençlik doludur.', sources: ['UNESCO World Heritage List — Tugendhat Villa in Brno'] },
  { id: 'ceskykrumlov', name: 'Český Krumlov', city: 'Český Krumlov', country: 'Çekya', lat: 48.8127, lng: 14.3175, aliases: ['cesky krumlov', 'ceskykrumlov', 'krumlov'], summary: 'Güney Çekya’da, Vltava Nehri’nin keskin bir kıvrımına kurulu Český Krumlov, olağanüstü korunmuş ortaçağ ve Rönesans dokusuyla adeta zamanda donmuş bir masal kasabasıdır. Tarihî merkezi bütünüyle UNESCO Dünya Mirası Listesi’ndedir.\n\nNehre ve kırmızı çatılı eski şehre tepeden bakan devasa Český Krumlov Şatosu (Prag’dan sonra ülkenin en büyüğü), renkli kule ve barok tiyatrosuyla büyüler. Dar arnavut kaldırımlı sokakları, nehir üzerinde rafting ve şato bahçeleriyle kasaba romantik bir kaçamak sunar.', sources: ['UNESCO World Heritage List — Historic Centre of Český Krumlov'] },
  { id: 'melk', name: 'Melk (Wachau)', city: 'Melk', country: 'Avusturya', lat: 48.2281, lng: 15.3336, aliases: ['melk', 'wachau'], summary: 'Avusturya’da Tuna Nehri kıyısında, UNESCO korumasındaki güzel Wachau bağ vadisinin girişindeki Melk, nehre tepeden bakan görkemli manastırıyla ünlü küçük bir kasabadır. Vadi boyunca yapılan Tuna gezilerinin gözde duraklarından biridir.\n\nSarı cepheli, barok mimarinin başyapıtı sayılan Melk Manastırı; altın yaldızlı kilisesi, freskli salonları ve tarihî el yazmalarıyla dolu görkemli kütüphanesiyle büyüler. Nehir manzarası ve çevredeki üzüm bağları, kayısı bahçeleriyle Melk, Wachau’yu keşfetmek için ideal bir üstür.', sources: ['UNESCO World Heritage List — Wachau Cultural Landscape'] },
  { id: 'gyor', name: 'Győr', city: 'Győr', country: 'Macaristan', lat: 47.6875, lng: 17.6504, aliases: ['gyor', 'győr'], summary: 'Viyana ile Budapeşte arasında, üç nehrin (Rába, Rábca, Mosoni-Duna) buluştuğu noktada kurulu Győr, çoğu gezginin hızla geçtiği ama zengin bir barok mirasa sahip keyifli bir ara duraktır. Macaristan’ın en güzel korunmuş barok kent merkezlerinden birine sahiptir.\n\nDar sokaklı eski şehri, kabartmalı köşe balkonlarıyla süslü tarihî evleri, tepedeki bazilikası ve nehir kıyısı yürüyüşleri kenti şirin kılar. Ünlü termal kaplıcası ise yorgun yolculara dinlendirici bir mola sunar.', sources: ['Hungary.hu — Győr'] },
  { id: 'eger', name: 'Eger', city: 'Eger', country: 'Macaristan', lat: 47.9026, lng: 20.3772, aliases: ['eger'], summary: 'Kuzey Macaristan’daki Eger, güçlü kalesi, barok mimarisi ve şarap kültürüyle ünlü büyüleyici bir kasabadır. 1552’de kalenin çok daha büyük bir Osmanlı ordusuna karşı verdiği efsanevi savunma, Macar ulusal tarihinin gurur sayfalarındandır.\n\nKentin üzerindeki Eger Kalesi, Avrupa’nın en kuzeyinde ayakta kalan Osmanlı minaresi ve barok katedrali başlıca duraklardır. Şehrin hemen dışındaki “Güzel Kadınlar Vadisi”nde sıralanan şarap mahzenlerinde, dünyaca ünlü “Bikavér (Boğa Kanı)” kırmızı şarabı tadılabilir.', sources: ['Hungary.hu — Eger'] },
  { id: 'pecs', name: 'Pécs', city: 'Pécs', country: 'Macaristan', lat: 46.0727, lng: 18.2323, aliases: ['pecs', 'pécs'], summary: 'Güney Macaristan’ın en büyük kenti Pécs, ılıman iklimi, Akdeniz havası ve iç içe geçmiş uygarlıkların izleriyle ülkenin en katmanlı kültür merkezlerinden biridir. Roma, Osmanlı ve Hristiyan mirası burada bir arada yaşar.\n\nUNESCO korumasındaki erken Hristiyan dönemi yeraltı mezarları (nekropol), bir zamanlar cami olan ve bugün kilise olarak kullanılan Gazi Kasım Paşa Camii ve dünyaca ünlü Zsolnay porselen çinileriyle bezeli yapıları başlıca duraklardır. Canlı meydanı ve galerileriyle Pécs zarif bir kenttir.', sources: ['UNESCO World Heritage List — Early Christian Necropolis of Pécs'] },
  { id: 'szentendre', name: 'Szentendre', city: 'Szentendre', country: 'Macaristan', lat: 47.6694, lng: 19.0759, aliases: ['szentendre'], summary: 'Budapeşte’nin hemen kuzeyinde, Tuna Nehri kıyısında kurulu Szentendre, renkli barok evleri, dar arnavut kaldırımlı sokakları ve sanatçı atmosferiyle sevilen şirin bir gezi kasabasıdır. Başkentten günübirlik kaçamak için en popüler duraklardan biridir.\n\nOsmanlı’dan kaçan Sırpların kurduğu kasaba, Ortodoks kiliseleri ve müzeleriyle özgün bir kültür taşır. Küçük galerileri, el sanatları dükkânları, marzipan müzesi ve nehir manzaralı kafeleriyle Szentendre gün boyu keyifli bir dolaşma sunar.', sources: ['Hungary.hu — Szentendre'] },
  { id: 'balaton', name: 'Balaton Gölü', city: 'Balaton', country: 'Macaristan', lat: 46.91, lng: 17.889, aliases: ['balaton', 'balaton golu', 'lake balaton', 'tihany', 'balatonfured'], summary: 'Orta Avrupa’nın en büyük gölü olan Balaton, denize kıyısı olmayan Macaristan’ın “iç denizi” olarak anılır ve ülkenin en gözde yaz tatili bölgesidir. Sığ, ılık suları aileler için idealdir; kıyıları tatil kasabaları ve bağlarla doludur.\n\nGölün içine uzanan Tihany Yarımadası, tepedeki tarihî manastırı ve lavanta tarlalarıyla öne çıkar; kuzey kıyısındaki Balatonfüred zarif bir kaplıca ve yelken merkezidir. Çevredeki volkanik tepelerde üretilen şaraplar ve kıyı boyunca uzanan plajlarıyla Balaton, Macaristan’ın yaz neşesini simgeler.', sources: ['Hungary.hu — Lake Balaton'] },
  { id: 'kosice', name: 'Košice', city: 'Košice', country: 'Slovakya', lat: 48.7164, lng: 21.2611, aliases: ['kosice', 'košice', 'kassa'], summary: 'Doğu Slovakya’nın en büyük kenti Košice, ülkenin tarihî ve kültürel ikinci başkenti sayılır; zarif eski şehri ve canlı meydanıyla bilinir. Yüzyıllar boyunca Macar, Slovak ve diğer toplulukların buluştuğu bir kavşak olmuştur.\n\nSlovakya’nın en büyük kilisesi olan görkemli gotik Aziz Elizabeth Katedrali kentin kalbinde yükselir. Onu çevreleyen uzun yaya ana caddesi (Hlavná), tarihî tiyatrosu, çeşmeleri ve kafeleriyle Košice keyifli ve zarif bir Orta Avrupa atmosferi sunar.', sources: ['Slovakia.travel — Košice'] },
  // --- Yunanistan & Balkan ara/geçiş durakları ---
  { id: 'meteora', name: 'Meteora (Kalambaka)', city: 'Kalambaka', country: 'Yunanistan', lat: 39.7217, lng: 21.6306, aliases: ['meteora', 'kalambaka', 'kalabaka'], summary: 'Orta Yunanistan’da, ovadan yüzlerce metre yükselen dev kaya sütunlarının tepesine kurulmuş Meteora manastırları, doğa ile inancın buluştuğu nefes kesici bir manzaradır. Adı Yunanca “havada asılı” anlamına gelir ve alan UNESCO Dünya Mirası Listesi’ndedir.\n\nOrtaçağda keşişlerin dünyadan el etek çekmek için ulaşılması güç bu kayalara kurduğu manastırlardan bugün altısı ziyarete açıktır. Bir zamanlar yalnızca ip ve ağlarla çıkılabilen bu Ortodoks manastırlar, freskleri ve panoramik manzaralarıyla eşsiz bir deneyim sunar.', sources: ['UNESCO World Heritage List — Meteora'] },
  { id: 'delphi', name: 'Delphi', city: 'Delphi', country: 'Yunanistan', lat: 38.4824, lng: 22.501, aliases: ['delphi', 'delfi'], summary: 'Antik Yunanlıların dünyanın merkezi (“omphalos”) saydığı Delphi, Parnassos Dağı’nın görkemli yamaçlarında kurulu kutsal bir alandır. Yüzyıllar boyunca krallar ve sıradan insanlar, geleceği öğrenmek için buradaki ünlü kâhine (Pythia) danışmaya gelmiştir.\n\nApollon Tapınağı, hazine binaları, antik tiyatro ve stadyum, dağ manzarası eşliğinde geçmişin ihtişamını yansıtır; alan UNESCO korumasındadır. Yakındaki müzede sergilenen tunç Arabacı heykeli, antik Yunan sanatının başyapıtlarından biridir.', sources: ['UNESCO World Heritage List — Archaeological Site of Delphi'] },
  { id: 'nafplio', name: 'Nafplio', city: 'Nafplio', country: 'Yunanistan', lat: 37.5679, lng: 22.801, aliases: ['nafplio', 'nauplio', 'napoli di romania'], summary: 'Mora (Peloponnese) Yarımadası’nın doğu kıyısındaki zarif liman kenti Nafplio, Yunanistan’ın bağımsızlık sonrası ilk başkenti olmasıyla özel bir yere sahiptir. Venedik ve Osmanlı izleri taşıyan neoklasik dokusuyla ülkenin en romantik kentlerinden sayılır.\n\nKente tepeden bakan, yüzlerce basamakla çıkılan Palamidi Kalesi, limanın ortasındaki minik ada kalesi Bourtzi ve arnavut kaldırımlı, begonvillerle bezeli eski şehir başlıca cazibelerdir. Yakındaki antik Mikene ve Epidauros tiyatrosuyla Nafplio, bölge gezileri için ideal bir üstür.', sources: ['Visit Greece — Nafplio'] },
  { id: 'ioannina', name: 'Ioannina', city: 'Ioannina', country: 'Yunanistan', lat: 39.665, lng: 20.8537, aliases: ['ioannina', 'yanya', 'janina'], summary: 'Yunanistan’ın kuzeybatısında, Epir bölgesinin başkenti Ioannina (Yanya), bir gölün kıyısında kurulu, güçlü Osmanlı izleri taşıyan tarihî bir kenttir. 19. yüzyılda efsanevi Tepedelenli Ali Paşa’nın yönetim merkezi olarak parlamıştır.\n\nGöle bakan surlarıyla kale içi (Kastro), camileri, gölün ortasındaki manastırlarla dolu ada ve geleneksel gümüş işçiliği kenti özgün kılar. Yakındaki gizemli Perama Mağarası ve Zagori bölgesinin taş köyleriyle Ioannina, doğa ve tarih tutkunlarına hitap eder.', sources: ['Visit Greece — Ioannina'] },
  { id: 'bitola', name: 'Bitola', city: 'Bitola', country: 'Kuzey Makedonya', lat: 41.0314, lng: 21.3347, aliases: ['bitola', 'manastir'], summary: 'Kuzey Makedonya’nın güneyindeki Bitola (Osmanlı adıyla Manastır), bir zamanlar çok sayıda yabancı konsolosluğa ev sahipliği yaptığı için “Konsoloslar Şehri” olarak anılan zarif bir kenttir. Manastır Askerî İdadisi’nde okuyan Atatürk’le de anılan güçlü bir Osmanlı geçmişine sahiptir.\n\nRenkli neoklasik binalarla çevrili canlı yaya caddesi Şirok Sokak, saat kulesi, camileri ve çarşısı kentin kalbini oluşturur. Hemen yakınındaki antik Heraklea Lynkestis kentinin mozaikleri ve tiyatrosu da görülmeye değerdir.', sources: ['Macedonia Timeless — Bitola'] },
  { id: 'trebinje', name: 'Trebinje', city: 'Trebinje', country: 'Bosna-Hersek', lat: 42.7113, lng: 18.3444, aliases: ['trebinje'], summary: 'Bosna-Hersek’in en güneyinde, Dubrovnik’e yalnızca yarım saat mesafedeki Trebinje, ılıman iklimi, üzüm bağları ve sakin atmosferiyle çoğu zaman gözden kaçan şirin bir Hersek kasabasıdır. Trebišnjica Nehri’nin suladığı verimli bir vadide kuruludur.\n\nÇınar ağaçlarıyla gölgelenen tarihî meydanı, dar sokaklı Osmanlı eski şehri ve nehir üzerindeki zarif Arslanagić Köprüsü kasabanın kalbini oluşturur. Kente tepeden bakan, şair Jovan Dučić’in defnedildiği Hercegovačka Gračanica manastırından panorama ve çevredeki şaraphaneleriyle Trebinje huzurlu bir duraktır.', sources: ['Trebinje Turizm — Trebinje'] },
  { id: 'ston', name: 'Ston', city: 'Ston', country: 'Hırvatistan', lat: 42.8372, lng: 17.6982, aliases: ['ston', 'mali ston'], summary: 'Dubrovnik’in kuzeyinde, Pelješac Yarımadası’nın girişindeki Ston, ortaçağdan kalma olağanüstü uzunluktaki savunma surlarıyla ünlüdür; “Avrupa’nın Çin Seddi” olarak anılan bu duvarlar kıyı boyunca kilometrelerce uzanır. Dubrovnik Cumhuriyeti bu surları değerli tuzlalarını korumak için inşa etmiştir.\n\nHâlâ geleneksel yöntemlerle işletilen asırlık tuzlaları, surlarda yapılan yürüyüş ve körfezinde yetiştirilen dünyaca ünlü taze istiridye ve midyeleri kasabanın öne çıkanlarıdır. Ston, tarih ile lezzeti birleştiren küçük ama özgün bir duraktır.', sources: ['Croatia.hr — Ston'] },
  // --- İskandinavya: Norveç ---
  { id: 'oslo', name: 'Oslo', city: 'Oslo', country: 'Norveç', lat: 59.9139, lng: 10.7522, aliases: ['oslo'], summary: 'Norveç’in başkenti Oslo, bir fiyortun ucunda, ormanlar ve tepelerle çevrili konumuyla doğa ile modern kent yaşamını benzersiz biçimde birleştirir. Zengin denizcilik geçmişini çağdaş mimari ve tasarımla harmanlayan yeşil bir başkenttir.\n\nFiyort kıyısında buzul gibi yükselen Opera binası, Viking gemilerini ve kâşif Amundsen’in mirasını barındıran müzeler, Edvard Munch’un “Çığlık”ını sergileyen müze ve yüzlerce heykelle dolu Vigeland Parkı başlıca duraklardır. Fiyort adaları ve çevredeki kayak alanlarıyla Oslo dört mevsim doğaya açılır.', sources: ['VisitNorway — Oslo'] },
  { id: 'bergen', name: 'Bergen', city: 'Bergen', country: 'Norveç', lat: 60.3913, lng: 5.3221, aliases: ['bergen'], summary: 'Norveç’in batı kıyısındaki Bergen, çevresindeki görkemli fiyortlara açılan kapı olarak “Fiyortların Başkenti” diye anılır. Bir zamanlar güçlü Hansa Birliği’nin önemli bir ticaret merkeziydi ve bu geçmiş kente özgün bir liman kimliği kazandırmıştır.\n\nRıhtım boyunca dizilen renkli ahşap Hansa evleri Bryggen (UNESCO), kente tepeden bakan Fløibanen fünikülerinin manzarası ve canlı balık hali başlıca duraklardır. Yedi tepe ve sık yağmurlarıyla ünlü Bergen, Sognefjord ve Hardangerfjord gibi fiyort turlarının çıkış noktasıdır.', sources: ['UNESCO World Heritage List — Bryggen', 'VisitNorway — Bergen'] },
  { id: 'tromso', name: 'Tromsø', city: 'Tromsø', country: 'Norveç', lat: 69.6492, lng: 18.9553, aliases: ['tromso', 'tromsø'], summary: 'Kuzey Kutup Dairesi’nin çok ötesinde, karlı dağlar ve fiyortlarla çevrili bir adada kurulu Tromsø, “Arktik’in Başkenti” olarak anılan canlı bir kutup kentidir. Tarihte kutup keşiflerinin önemli bir üssü olmuştur.\n\nKışın gökyüzünü aydınlatan kuzey ışıkları (aurora), yazın hiç batmayan gece yarısı güneşi kenti büyülü kılar. Üçgen mimarisiyle Arktik Katedrali, teleferikle çıkılan dağ manzarası ve dünyanın en kuzeydeki üniversitesi ile bira fabrikası kentin öne çıkanlarıdır. Balina ve köpekli kızak turları da popülerdir.', sources: ['VisitNorway — Tromsø'] },
  { id: 'stavanger', name: 'Stavanger', city: 'Stavanger', country: 'Norveç', lat: 58.97, lng: 5.7331, aliases: ['stavanger', 'preikestolen'], summary: 'Güneybatı Norveç’in liman kenti Stavanger, iyi korunmuş beyaz ahşap eski şehri ve modern petrol sanayisiyle geçmiş ile bugünü birleştirir. Çevresindeki muhteşem fiyort manzaralarına açılan bir üs olarak da sevilir.\n\nDar sokaklı, çiçekli Gamle Stavanger mahallesi ve renkli sokak sanatı kenti keyifli kılar. En büyük cazibesi ise yakınındaki Lysefjord’un 600 metre yükseklikteki dümdüz uçurumu Preikestolen (Vaiz Kürsüsü) yürüyüşüdür; bu manzara dünyanın en ünlü doğa yürüyüşlerinden biridir.', sources: ['VisitNorway — Stavanger'] },
  { id: 'alesund', name: 'Ålesund', city: 'Ålesund', country: 'Norveç', lat: 62.4722, lng: 6.1549, aliases: ['alesund', 'ålesund'], summary: 'Norveç’in batı kıyısında, adalara yayılan Ålesund, 1904’teki büyük yangının ardından baştan sona art nouveau (Jugendstil) tarzında yeniden inşa edilmesiyle benzersiz bir mimari bütünlüğe sahiptir. Kuleleri ve süslü cepheleriyle adeta bir masal kentidir.\n\nAksla tepesindeki seyir terasından adalar, kanallar ve denizin oluşturduğu panorama izlenir. Balıkçılığın ve denizciliğin kalbi olan kent, aynı zamanda dünyanın en görkemli fiyortlarından Geirangerfjord’a açılan bir kapıdır.', sources: ['VisitNorway — Ålesund'] },
  { id: 'geiranger', name: 'Geirangerfjord', city: 'Geiranger', country: 'Norveç', lat: 62.101, lng: 7.205, aliases: ['geiranger', 'geirangerfjord', 'geiranger fiyort'], summary: 'Norveç’in batısındaki Geirangerfjord, dik yeşil yamaçları, dökülen şelaleleri ve derin mavi sularıyla dünyanın en görkemli fiyortlarından biri kabul edilir ve UNESCO Dünya Mirası Listesi’ndedir. Fiyortun ucundaki küçük Geiranger köyü, bu doğa harikasının kapısıdır.\n\nUçurumlardan aşağı süzülen “Yedi Kızkardeş” şelaleleri, yamaçlara tutunmuş terk edilmiş çiftlikler ve zikzaklı Ørnevegen (Kartal Yolu) manzaraları başlıca cazibelerdir. Fiyort turu tekneleri, kano ve panoramik seyir noktalarıyla Geiranger, Norveç doğasının doruğunu sunar.', sources: ['UNESCO World Heritage List — West Norwegian Fjords'] },
  { id: 'lofoten', name: 'Lofoten Adaları', city: 'Lofoten', country: 'Norveç', lat: 68.2339, lng: 14.568, aliases: ['lofoten', 'svolvaer', 'reine'], summary: 'Norveç’in kuzeyinde, Kuzey Kutup Dairesi’nin ötesinde bir takımada olan Lofoten, sivri granit dağların doğrudan denizden yükseldiği nefes kesici manzaralarıyla ünlüdür. Bin yıllık balıkçılık geleneği bölgenin kimliğini belirler.\n\nKıyıdaki geleneksel kırmızı balıkçı kulübeleri (rorbu), turkuaz koylar ve beyaz kumlu plajlar adeta gerçeküstü bir güzellik sunar. Yazın hiç batmayan gece yarısı güneşi, kışın ise dans eden kuzey ışıklarıyla Lofoten, fotoğrafçıların ve doğa tutkunlarının hayalidir.', sources: ['VisitNorway — Lofoten'] },
  // --- İskandinavya: İsveç ---
  { id: 'stockholm', name: 'Stockholm', city: 'Stockholm', country: 'İsveç', lat: 59.3293, lng: 18.0686, aliases: ['stockholm'], summary: 'İsveç’in başkenti Stockholm, bir gölün Baltık Denizi’ne kavuştuğu noktada, on dört ada üzerine kurulu olmasıyla “Kuzeyin Venedik’i” olarak anılır. Suyla iç içe geçmiş bu zarif kent, tarih ile modern İskandinav tasarımını ustaca birleştirir.\n\nOrtaçağ dokusunu koruyan renkli Gamla Stan (Eski Şehir), Kraliyet Sarayı, batıp çıkarılan 17. yüzyıl savaş gemisini sergileyen olağanüstü Vasa Müzesi ve ABBA Müzesi başlıca duraklardır. Adalar arası tekne gezileri ve takımada (arşipel) turlarıyla Stockholm su üzerinde bir kenttir.', sources: ['VisitSweden — Stockholm'] },
  { id: 'goteborg', name: 'Göteborg', city: 'Göteborg', country: 'İsveç', lat: 57.7089, lng: 11.9746, aliases: ['goteborg', 'göteborg', 'gothenburg'], summary: 'İsveç’in batı kıyısındaki Göteborg (Gothenburg), ülkenin en büyük limanı ve sıcakkanlı, rahat atmosferiyle sevilen ikinci büyük kentidir. Hollandalı mimarların tasarladığı kanalları ona zarif bir dokunuş katar.\n\nAhşap evleriyle şirin Haga semti, kanal boyu gezileri, İskandinavya’nın en büyük lunaparklarından Liseberg ve taze deniz ürünlerinin satıldığı “Feskekôrka” balık hali başlıca duraklardır. Kafe kültürü (fika), müzik sahnesi ve takımadalarıyla Göteborg keyifli bir liman kentidir.', sources: ['VisitSweden — Gothenburg'] },
  { id: 'malmo', name: 'Malmö', city: 'Malmö', country: 'İsveç', lat: 55.605, lng: 13.0038, aliases: ['malmo', 'malmö'], summary: 'İsveç’in en güneyindeki Malmö, Öresund Köprüsü ile Danimarka’nın başkenti Kopenhag’a bağlanan, çok kültürlü ve modern bir kenttir. Eski sanayi kimliğini yenilikçi bir kentsel dönüşümle geride bırakmıştır.\n\nBurgu gibi kıvrılan gökdelen Turning Torso kentin simgesidir; ortaçağ meydanları Stortorget ve Lilla Torg, kalesi ve deniz kıyısı yürüyüş yolu da öne çıkar. Dünya mutfaklarını buluşturan sokak lezzetleri ve genç nüfusuyla Malmö, dinamik bir İskandinav kentidir.', sources: ['VisitSweden — Malmö'] },
  { id: 'uppsala', name: 'Uppsala', city: 'Uppsala', country: 'İsveç', lat: 59.8586, lng: 17.6389, aliases: ['uppsala'], summary: 'Stockholm’ün kuzeyindeki Uppsala, İskandinavya’nın en eski üniversitesine (1477) ev sahipliği yapan, İsveç’in tarihî ve manevi merkezlerinden biridir. Bilim insanı Carl Linnaeus’un çalıştığı kent, köklü bir akademik gelenek taşır.\n\nİskandinavya’nın en büyük kilisesi olan görkemli gotik Uppsala Katedrali, tepedeki kalesi ve nehir kıyısı kafeleri kenti süsler. Yakınındaki Gamla Uppsala’nın Viking dönemi kral höyükleri, İsveç tarihinin en eski katmanlarına ışık tutar.', sources: ['VisitSweden — Uppsala'] },
  { id: 'kiruna', name: 'Kiruna', city: 'Kiruna', country: 'İsveç', lat: 67.8558, lng: 20.2253, aliases: ['kiruna', 'abisko', 'icehotel'], summary: 'İsveç Laponyası’nın en kuzeyindeki Kiruna, dünyanın en büyük yeraltı demir madeninin çevresinde kurulmuş bir Arktik kentidir. İlginç biçimde, madenin genişlemesi nedeniyle kentin merkezi zamanla birkaç kilometre öteye taşınmaktadır.\n\nKutup gecelerinde dans eden kuzey ışıkları, her kış yeniden inşa edilen ünlü Buz Otel (Icehotel) ve el değmemiş Abisko Milli Parkı bölgenin başlıca cazibeleridir. Yerli Sami kültürü, ren geyiği safarileri ve köpekli kızak turlarıyla Kiruna, gerçek bir Arktik deneyimi sunar.', sources: ['VisitSweden — Kiruna & Swedish Lapland'] },
  { id: 'visby', name: 'Visby (Gotland)', city: 'Visby', country: 'İsveç', lat: 57.6348, lng: 18.2948, aliases: ['visby', 'gotland'], summary: 'İsveç’in Baltık Denizi’ndeki Gotland adasında yer alan Visby, ortaçağda güçlü Hansa Birliği’nin parlayan bir ticaret merkeziydi. Bu altın çağdan kalan olağanüstü korunmuş kent dokusu, onu UNESCO Dünya Mirası Listesi’ne taşımıştır.\n\nKenti tümüyle çevreleyen 13. yüzyıldan kalma taş surlar, çok sayıda ortaçağ kilise kalıntısı ve gül bahçeleriyle bezeli dar sokaklar Visby’yi büyüleyici kılar. Her yaz düzenlenen ortaçağ festivali, kasabayı geçmişe götüren renkli bir şölene dönüştürür.', sources: ['UNESCO World Heritage List — Hanseatic Town of Visby'] },
  // --- İskandinavya: Danimarka ---
  { id: 'kopenhag', name: 'Kopenhag', city: 'Kopenhag', country: 'Danimarka', lat: 55.6761, lng: 12.5683, aliases: ['kopenhag', 'copenhagen', 'kobenhavn', 'københavn'], summary: 'Danimarka’nın başkenti Kopenhag, bisiklet dostu sokakları, zarif tasarımı ve rahat “hygge” yaşam felsefesiyle dünyanın en yaşanası kentlerinden biri kabul edilir. Denizle iç içe kraliyet geçmişi, kente zarif bir hava katar.\n\nRenkli evleriyle ünlü tarihî liman Nyhavn, limandaki Küçük Deniz Kızı heykeli, dünyanın en eski eğlence parklarından Tivoli Bahçeleri ve kraliyet sarayları başlıca duraklardır. Michelin yıldızlı restoranları, tasarım mağazaları ve bisiklet kültürüyle Kopenhag modern İskandinav yaşamının vitrinidir.', sources: ['VisitDenmark — Copenhagen'] },
  { id: 'aarhus', name: 'Aarhus', city: 'Aarhus', country: 'Danimarka', lat: 56.1629, lng: 10.2039, aliases: ['aarhus', 'århus'], summary: 'Jutland Yarımadası’ndaki Aarhus, Danimarka’nın ikinci büyük kenti ve genç, canlı bir üniversite ve kültür merkezidir. Viking geçmişini çağdaş sanat ve tasarımla harmanlayan enerjik bir atmosfere sahiptir.\n\nÇatısında rengârenk bir cam koridor (Your Rainbow Panorama) bulunan ARoS sanat müzesi, tarihî binaların yeniden kurulduğu açık hava müzesi Den Gamle By ve modern mimarili liman semti başlıca duraklardır. Öğrenci nüfusu, kafeleri ve festivalleriyle Aarhus keyifli bir keşif sunar.', sources: ['VisitDenmark — Aarhus'] },
  { id: 'odense', name: 'Odense', city: 'Odense', country: 'Danimarka', lat: 55.4038, lng: 10.4024, aliases: ['odense'], summary: 'Fyn Adası’nın kalbindeki Odense, dünyaca ünlü masal yazarı Hans Christian Andersen’in doğduğu kent olarak anılır. Bu edebi miras, kentin dokusuna masalsı bir hava katar ve pek çok cazibesinin merkezinde yer alır.\n\nAndersen’in çocukluk evi ve ona adanmış interaktif müze, arnavut kaldırımlı renkli eski şehir sokakları ve yeşil bahçeleri kenti şirin kılar. Danimarka’nın en eski kentlerinden biri olan Odense, tarih ile çocuksu bir hayal gücünü bir arada sunar.', sources: ['VisitDenmark — Odense'] },
  { id: 'skagen', name: 'Skagen', city: 'Skagen', country: 'Danimarka', lat: 57.7211, lng: 10.5883, aliases: ['skagen'], summary: 'Danimarka’nın en kuzey ucundaki Skagen, iki denizin (Skagerrak ve Kattegat) gözle görülür biçimde çarpıştığı Grenen kum dili ile ünlü, özgün bir balıkçı ve tatil kasabasıdır. Bu benzersiz coğrafya, ona güçlü bir çekim kazandırır.\n\nKuzey ucundaki kumsalda buluşan iki denizin dalgaları, karakteristik sarı boyalı Skagen evleri ve göç eden kumulların gömdüğü kilise başlıca cazibelerdir. 19. yüzyılda buranın eşsiz ışığı “Skagen Ressamları” akımını doğurmuş; kasaba bir sanat merkezine dönüşmüştür.', sources: ['VisitDenmark — Skagen'] },
  // --- İskandinavya: Finlandiya ---
  { id: 'helsinki', name: 'Helsinki', city: 'Helsinki', country: 'Finlandiya', lat: 60.1699, lng: 24.9384, aliases: ['helsinki'], summary: 'Finlandiya’nın başkenti Helsinki, Baltık Denizi kıyısında, adalara ve koylara yayılan zarif bir “deniz kızı” kentidir. Doğanın içine yerleşmiş modern mimarisi ve dünyaca ünlü tasarım geleneğiyle sakin ama çağdaş bir atmosfer sunar.\n\nBembeyaz neoklasik katedraliyle Senato Meydanı, doğrudan kayanın içine oyulmuş olağanüstü Temppeliaukio Kilisesi, canlı liman pazarı ve “Design District” tasarım semti başlıca duraklardır. Deniz üzerindeki Suomenlinna kale adası (UNESCO) ve sauna geleneğiyle Helsinki, İskandinav rahatlığını yansıtır.', sources: ['MyHelsinki — Helsinki'] },
  { id: 'rovaniemi', name: 'Rovaniemi', city: 'Rovaniemi', country: 'Finlandiya', lat: 66.5039, lng: 25.7294, aliases: ['rovaniemi', 'lapland', 'laponya', 'noel baba koyu'], summary: 'Finlandiya Laponyası’nın başkenti Rovaniemi, tam Kuzey Kutup Dairesi üzerinde yer alan, kışın masalsı bir kar diyarına dönüşen bir Arktik kentidir. Resmî Noel Baba Köyü’ne ev sahipliği yapmasıyla dünya çapında ünlüdür.\n\nYıl boyu açık Noel Baba Köyü’nde kutup dairesi çizgisini geçmek, mektup göndermek ve Noel Baba ile tanışmak mümkündür. Gökyüzünü aydınlatan kuzey ışıkları, ren geyiği ve husky kızak safarileri, cam iglolarda konaklama ve kar motoru turlarıyla Rovaniemi kışın büyülü bir destinasyondur.', sources: ['VisitRovaniemi — Rovaniemi'] },
  { id: 'turku', name: 'Turku', city: 'Turku', country: 'Finlandiya', lat: 60.4518, lng: 22.2666, aliases: ['turku', 'åbo'], summary: 'Finlandiya’nın en eski kenti ve eski başkenti Turku, Aura Nehri’nin iki yakasına yayılan, ülkenin İsveç dönemine dayanan köklü bir tarihe sahiptir. Bugün canlı bir üniversite ve kültür kentidir.\n\nNehrin ağzındaki ortaçağdan kalma görkemli Turku Kalesi, Finlandiya’nın ana kilisesi olan katedrali ve nehir kıyısındaki kafe-restoranlar (bazıları eski gemilerde) kenti keyifli kılar. Binlerce adadan oluşan büyüleyici Turku Takımadası’na açılan konumu, kenti doğa gezileri için de bir üs yapar.', sources: ['VisitTurku — Turku'] },
  { id: 'tampere', name: 'Tampere', city: 'Tampere', country: 'Finlandiya', lat: 61.4978, lng: 23.761, aliases: ['tampere'], summary: 'İki büyük gölün arasındaki bir berzah üzerine kurulu Tampere, bir zamanlar “Kuzeyin Manchester’ı” diye anılan bir sanayi kentiyken bugün canlı bir kültür ve sauna merkezine dönüşmüştür. Kızıl tuğlalı fabrikaları özgün bir karakter taşır.\n\nEski dokuma fabrikalarından dönüştürülen müze, sinema ve restoran mekânları, kenti ikiye bölen Tammerkoski akıntısı ve dünyanın “sauna başkenti” unvanını doğrulayan çok sayıda kamusal sauna başlıca cazibelerdir. Sevilen Mumin (Moomin) karakterlerine adanmış müze de buradadır.', sources: ['VisitTampere — Tampere'] },
  // --- İskandinavya: İzlanda ---
  { id: 'reykjavik', name: 'Reykjavik', city: 'Reykjavik', country: 'İzlanda', lat: 64.1466, lng: -21.9426, aliases: ['reykjavik', 'reykjavík'], summary: 'Dünyanın en kuzeydeki başkenti Reykjavik, İzlanda nüfusunun büyük bölümünü barındıran, renkli ve yaratıcı ruhuyla küçük ama canlı bir kenttir. Adı “dumanlı koy” anlamına gelir ve çevredeki jeotermal buharlardan gelir.\n\nGöğe uzanan modern Hallgrímskirkja kilisesi, camdan cephesiyle parıldayan Harpa konser salonu, renkli teneke evleri ve müzeleri başlıca duraklardır. Ünlü Altın Çember rotasına, gayzerlere, şelalelere ve süt mavisi Mavi Lagün’e açılan kapı olarak Reykjavik, İzlanda maceralarının merkezidir.', sources: ['VisitReykjavik — Reykjavik'] },
  { id: 'vik', name: 'Vík', city: 'Vík', country: 'İzlanda', lat: 63.4194, lng: -19.006, aliases: ['vik', 'vík', 'reynisfjara'], summary: 'İzlanda’nın güney kıyısındaki küçük Vík köyü, ülkenin en dramatik doğa manzaralarının ortasında yer alır. Atlantik’in dövdüğü ıssız kıyısı ve etrafındaki volkanik peyzajıyla adeta başka bir gezegen gibidir.\n\nSiyah volkanik kumlu Reynisfjara plajı, denizden yükselen sivri Reynisdrangar bazalt kayalıkları ve altıgen bazalt sütunları başlıca cazibelerdir. Yakınındaki Skógafoss ve Seljalandsfoss şelaleleri ile buzullar, Vík’i güney sahil turlarının vazgeçilmez bir durağı yapar.', sources: ['Visit South Iceland — Vík'] },
  { id: 'akureyri', name: 'Akureyri', city: 'Akureyri', country: 'İzlanda', lat: 65.6885, lng: -18.1262, aliases: ['akureyri'], summary: 'İzlanda’nın kuzeyinde, uzun bir fiyortun kıyısında kurulu Akureyri, ülkenin başkent dışındaki en büyük kenti olarak “Kuzeyin Başkenti” diye anılır. Şaşırtıcı derecede ılıman bahçeleri ve canlı kültür sahnesiyle sıcak bir atmosfer sunar.\n\nFiyort manzaralı konumu, dünyanın en kuzeydeki botanik bahçelerinden biri ve renkli merkezi kenti keyifli kılar. Görkemli Goðafoss (“Tanrılar Şelalesi”), balina gözlemiyle ünlü kıyısı ve volkanik Mývatn gölü bölgesine yakınlığıyla Akureyri, kuzey İzlanda’nın keşif üssüdür.', sources: ['Visit Akureyri — Akureyri'] },
  // --- Japonya genişletme ---
  { id: 'hakone', name: 'Hakone', city: 'Hakone', country: 'Japonya', lat: 35.2325, lng: 139.1069, aliases: ['hakone'], summary: 'Tokyo’ya yakın dağlık bir bölgede, Fuji Dağı manzarasına ve şifalı sıcak su kaynaklarına sahip Hakone, Japonların en sevdiği kaplıca (onsen) kaçamaklarından biridir. Volkanik doğası ve manzaralarıyla dinlendirici bir atmosfer sunar.\n\nGeleneksel onsen otelleri, Ashi Gölü üzerinde korsan gemisi turu, göl kıyısındaki Hakone Tapınağı’nın sudaki torii kapısı ve volkanik buharların yükseldiği Owakudani vadisine çıkan teleferik başlıca deneyimlerdir. Açık hava heykel müzesi ve Fuji manzarasıyla Hakone çok yönlü bir duraktır.', sources: ['Japan.travel — Hakone'] },
  { id: 'nikko', name: 'Nikko', city: 'Nikko', country: 'Japonya', lat: 36.7199, lng: 139.6982, aliases: ['nikko', 'nikkō'], summary: 'Tokyo’nun kuzeyinde, ormanlık dağların içinde yer alan Nikko, görkemli tapınakları ve etkileyici doğasıyla önemli bir manevi ve doğal duraktır. “Nikko’yu görmeden ‘muhteşem’ deme” sözü, kentin güzelliğini anlatır.\n\nJaponya’yı yüzyıllarca yöneten Tokugawa şogunlarının kurucusuna adanmış, altın işleme ve oymalarla bezeli gösterişli Toshogu Tapınağı (UNESCO) başlıca duraktır. Kegon Şelalesi, Chuzenji Gölü ve sonbaharda kızıla bürünen ormanlarıyla Nikko, tarih ile doğayı birleştirir.', sources: ['UNESCO World Heritage List — Shrines and Temples of Nikko'] },
  { id: 'kanazawa', name: 'Kanazawa', city: 'Kanazawa', country: 'Japonya', lat: 36.5613, lng: 136.6562, aliases: ['kanazawa'], summary: 'Japon Denizi kıyısındaki Kanazawa, İkinci Dünya Savaşı’ndan hasarsız çıkması sayesinde samuray ve geyşa mahallelerini, geleneksel dokusunu koruyan zarif bir kültür kentidir. Bir zamanlar güçlü Maeda klanının zengin merkeziydi.\n\nJaponya’nın “en güzel üç bahçesinden” biri sayılan Kenroku-en, korunmuş Nagamachi samuray mahallesi, Higashi Chaya geyşa semti ve altın varak (ülke üretiminin neredeyse tamamı burada yapılır) sanatı başlıca öne çıkanlardır. Çağdaş 21. Yüzyıl Müzesi ile Kanazawa geleneği ve moderni birleştirir.', sources: ['Japan.travel — Kanazawa'] },
  { id: 'takayama', name: 'Takayama', city: 'Takayama', country: 'Japonya', lat: 36.1461, lng: 137.2522, aliases: ['takayama', 'shirakawa-go', 'shirakawago'], summary: 'Japon Alpleri’nin dağları arasında yer alan Takayama, olağanüstü korunmuş Edo dönemi eski şehri ve zengin gelenekleriyle “Küçük Kyoto” olarak anılır. İzole konumu, ona özgün bir kültür ve mutfak kazandırmıştır.\n\nAhşap tüccar evleriyle dizili tarihî Sanmachi sokakları, nehir kıyısında kurulan renkli sabah pazarları ve görkemli festival arabaları başlıca cazibelerdir. Yakınındaki, dik saz çatılı geleneksel çiftlik evleriyle ünlü UNESCO korumalı Shirakawa-go köyü de kısa mesafededir.', sources: ['Japan.travel — Takayama', 'UNESCO — Shirakawa-go'] },
  { id: 'sapporo', name: 'Sapporo', city: 'Sapporo', country: 'Japonya', lat: 43.0618, lng: 141.3545, aliases: ['sapporo'], summary: 'Japonya’nın kuzey adası Hokkaido’nun başkenti Sapporo, geniş caddeleri, ferah dokusu ve sert kışlarıyla ülkenin diğer kentlerinden ayrılan modern bir merkezdir. 1972 Kış Olimpiyatları’na ev sahipliği yapmıştır.\n\nHer şubat düzenlenen, devasa kar ve buz heykelleriyle ünlü Sapporo Kar Festivali kentin en büyük çekim noktasıdır. Sapporo birası, zengin miso ramen’i, tarihî saat kulesi ve çevredeki dünya çapında kayak merkezleriyle kent, kış turizminin başkentidir.', sources: ['Japan.travel — Sapporo'] },
  { id: 'fukuoka', name: 'Fukuoka', city: 'Fukuoka', country: 'Japonya', lat: 33.5904, lng: 130.4017, aliases: ['fukuoka', 'hakata'], summary: 'Japonya’nın güney adası Kyushu’nun en büyük kenti Fukuoka, canlı sokak yemeği kültürü, sıcakkanlı atmosferi ve deniz kıyısı konumuyla sevilen bir liman kentidir. Asya anakarasına yakınlığı, ona kozmopolit bir hava katar.\n\nNehir kıyılarında ve sokaklarda kurulan geleneksel açık hava yemek tezgâhları (yatai) ve dünyaca ünlü tonkotsu (domuz kemiği) ramen’i kentin simgesidir. Tarihî tapınakları, sahil parkları ve modern alışveriş bölgeleriyle Fukuoka, rahat ve lezzet dolu bir duraktır.', sources: ['Japan.travel — Fukuoka'] },
  { id: 'kamakura', name: 'Kamakura', city: 'Kamakura', country: 'Japonya', lat: 35.3192, lng: 139.5466, aliases: ['kamakura'], summary: 'Tokyo’nun hemen güneyinde, sahil kenarındaki Kamakura, 12.-14. yüzyıllarda Japonya’nın fiilî başkenti (ilk şogunluk merkezi) olarak köklü bir tarihe sahiptir. Tapınakları ve rahat sahil havasıyla popüler bir günübirlik kaçamaktır.\n\nAçık havada oturan devasa bronz Büyük Buda heykeli (Daibutsu), denize bakan Hase-dera Tapınağı, bambu ormanıyla Hokoku-ji ve sörfçülerin uğrağı plajları başlıca duraklardır. Manzaralı yürüyüş yolları ve nostaljik tramvayıyla Kamakura, tarih ile deniz keyfini birleştirir.', sources: ['Japan.travel — Kamakura'] },
  { id: 'kobe', name: 'Kobe', city: 'Kobe', country: 'Japonya', lat: 34.6901, lng: 135.1955, aliases: ['kobe'], summary: 'Osaka Körfezi’nde, dağlar ile deniz arasına sıkışmış zarif liman kenti Kobe, Japonya’nın dışa açılan ilk limanlarından biri olarak kozmopolit bir kimlik taşır. Dünyaca ünlü mermerimsi Kobe eti de adını buradan alır.\n\n19. yüzyıl yabancı tüccar konaklarının bulunduğu Kitano semti, canlı liman manzarası, Çin Mahallesi ve gece ışıklarıyla parıldayan kent silueti başlıca cazibelerdir. Arkasındaki Rokko ve Maya dağlarına çıkan teleferikler ise “milyon dolarlık gece manzarasını” sunar.', sources: ['Japan.travel — Kobe'] },
  { id: 'nagoya', name: 'Nagoya', city: 'Nagoya', country: 'Japonya', lat: 35.1815, lng: 136.9066, aliases: ['nagoya'], summary: 'Japonya’nın sanayi ve otomotiv kalbi olan Nagoya, ülkenin dördüncü büyük kenti ve önemli bir ekonomik merkezdir; aynı zamanda köklü bir tarihe ve özgün bir mutfağa sahiptir. Toyota’nın anavatanı olarak da bilinir.\n\nÇatısında altın kaplama balık figürleri (kinshachi) bulunan görkemli Nagoya Kalesi, Japonya’nın en kutsal tapınaklarından Atsuta Tapınağı ve otomotiv tarihini anlatan Toyota müzeleri başlıca duraklardır. Kızarmış tavuk kanadı ve hitsumabushi (yılan balığı) gibi kendine özgü lezzetleriyle Nagoya öne çıkar.', sources: ['Japan.travel — Nagoya'] },
  { id: 'fuji', name: 'Fuji (Kawaguchiko)', city: 'Fujikawaguchiko', country: 'Japonya', lat: 35.5171, lng: 138.753, aliases: ['fuji', 'fuji dagi', 'mount fuji', 'kawaguchiko', 'fujiyama'], summary: 'Japonya’nın kutsal simgesi, kusursuz koni biçimli Fuji Dağı’nın (3.776 m) eteğindeki Beş Göl bölgesi, dağın en güzel manzaralarını sunan bir doğa cennetidir. Kawaguchiko gölü, bu bölgenin en popüler ve ulaşımı en kolay merkezidir.\n\nBerrak gölün suyuna yansıyan karlı Fuji manzarası, arkasında dağ yükselen Chureito Pagodası ve çevredeki onsen’ler başlıca cazibelerdir. Yaz aylarında dağın zirvesine tırmanışlar yapılır; ilkbaharda kiraz çiçekleri, sonbaharda kızıl yapraklarla bölge kartpostal gibidir.', sources: ['UNESCO World Heritage List — Fujisan', 'Japan.travel — Mt. Fuji'] },
  // --- İspanya derinleştirme ---
  { id: 'bilbao', name: 'Bilbao', city: 'Bilbao', country: 'İspanya', lat: 43.263, lng: -2.935, aliases: ['bilbao'], summary: 'İspanya’nın kuzeyinde, Bask Ülkesi’nin en büyük kenti Bilbao, bir zamanlar ağır sanayi limanıyken kültür odaklı çarpıcı bir dönüşümle yeniden doğmuştur. Bu değişim “Bilbao etkisi” olarak dünya kentçiliğine örnek gösterilir.\n\nFrank Gehry’nin tasarladığı, parlak titanyum kıvrımlarıyla ünlü Guggenheim Modern Sanat Müzesi bu dönüşümün simgesidir. Nervión Nehri kıyısı yürüyüşleri, dar sokaklı eski şehir Casco Viejo ve dünyaca ünlü pintxos (Bask tapası) barlarıyla Bilbao gastronomi tutkunlarının da gözdesidir.', sources: ['Spain.info — Bilbao'] },
  { id: 'sansebastian', name: 'San Sebastián', city: 'San Sebastián', country: 'İspanya', lat: 43.3183, lng: -1.9812, aliases: ['san sebastian', 'donostia'], summary: 'Bask Ülkesi’nin Atlantik kıyısındaki San Sebastián (Donostia), belle époque zarafeti ve olağanüstü mutfağıyla İspanya’nın en şık sahil kentlerinden biridir. Bir zamanlar İspanyol kraliyetinin gözde yazlık merkeziydi.\n\nDeniz kabuğu biçimli, altın kumlu La Concha plajı kentin simgesidir; körfezi çevreleyen tepeler panoramik manzaralar sunar. Dünyanın en yoğun Michelin yıldızlı restoran ağına ve efsanevi pintxos barlarına ev sahipliği yapan San Sebastián, bir gurme başkentidir.', sources: ['Spain.info — San Sebastián'] },
  { id: 'toledo', name: 'Toledo', city: 'Toledo', country: 'İspanya', lat: 39.8628, lng: -4.0273, aliases: ['toledo'], summary: 'Madrid’in hemen güneyinde, Tajo Nehri’nin çevrelediği bir tepeye kurulu Toledo, yüzyıllarca Müslüman, Yahudi ve Hristiyan toplulukların bir arada yaşadığı “Üç Kültür Kenti” olarak anılır. Bir zamanlar İspanya’nın başkenti olan kentin tamamı UNESCO korumasındadır.\n\nSurları, göğe uzanan gotik katedrali, Alcázar kalesi, sinagogları ve camileri bu çok katmanlı geçmişi bugüne taşır. Ressam El Greco’nun eserlerini barındıran kent, ayrıca asırlık kılıç ve bıçak işçiliğiyle de ünlüdür.', sources: ['UNESCO World Heritage List — Historic City of Toledo'] },
  { id: 'cordoba', name: 'Córdoba', city: 'Córdoba', country: 'İspanya', lat: 37.8882, lng: -4.7794, aliases: ['cordoba', 'córdoba', 'kordoba'], summary: 'Endülüs’teki Córdoba, Orta Çağ’da Avrupa’nın en büyük ve en aydınlık kentlerinden biriydi; Emevi halifeliğinin başkenti olarak bilim ve sanatta altın bir çağ yaşadı. Farklı dinlerin bir arada geliştiği bu miras kente eşsiz bir kimlik kazandırmıştır.\n\nİçinde sonradan bir katedral inşa edilen, kırmızı-beyaz kemerleriyle büyüleyici Mezquita (Cami-Katedral) UNESCO Dünya Mirası’dır ve İslam mimarisinin başyapıtlarındandır. Çiçeklerle bezeli avluları (patio), Yahudi Mahallesi ve Roma köprüsüyle Córdoba adeta bir açık hava müzesidir.', sources: ['UNESCO World Heritage List — Historic Centre of Córdoba'] },
  { id: 'malaga', name: 'Málaga', city: 'Málaga', country: 'İspanya', lat: 36.7213, lng: -4.4214, aliases: ['malaga', 'málaga'], summary: 'Costa del Sol’ün başkenti Málaga, güneşli plajlarıyla bir tatil kapısı olmasının yanında ressam Pablo Picasso’nun doğduğu, köklü ve canlı bir Endülüs kentidir. Son yıllarda müzeleriyle bir kültür merkezine dönüşmüştür.\n\nMağribi Alcazaba kalesi ve Gibralfaro surları, tarihî katedrali, Picasso Müzesi ve yenilenen liman promenadı başlıca duraklardır. Akdeniz mutfağı, tapas barları ve güneşli sokaklarıyla Málaga, Endülüs’ün sahil neşesini yansıtır.', sources: ['Spain.info — Málaga'] },
  { id: 'santiagocompostela', name: 'Santiago de Compostela', city: 'Santiago de Compostela', country: 'İspanya', lat: 42.8805, lng: -8.5457, aliases: ['santiago de compostela', 'compostela'], summary: 'Galiçya’nın başkenti Santiago de Compostela, Orta Çağ’dan bu yana Hristiyanlığın en önemli hac merkezlerinden biridir; ünlü “Camino de Santiago” yollarının vardığı son noktadır. Yağmurlu, yeşil dokusu ve manevi havasıyla özgün bir kenttir.\n\nAziz Yakup’un (Santiago) mezarının bulunduğuna inanılan görkemli katedral, granit taşından örülü büyüleyici eski şehri ile birlikte UNESCO Dünya Mirası Listesi’ndedir. Hacıların vardığı Praza do Obradoiro meydanı, arkatlı sokakları ve Galiçya mutfağıyla kent unutulmaz bir atmosfer sunar.', sources: ['UNESCO World Heritage List — Santiago de Compostela (Old Town)'] },
  // --- Portekiz derinleştirme ---
  { id: 'sintra', name: 'Sintra', city: 'Sintra', country: 'Portekiz', lat: 38.8029, lng: -9.3817, aliases: ['sintra'], summary: 'Lizbon’un hemen batısında, serin ve sisli bir dağ yamacına kurulu Sintra, sarayları ve malikâneleriyle Portekiz kraliyetinin ve soylularının gözde yazlık kaçamağı olmuştur. Yemyeşil doğası ve masalsı yapılarıyla romantik mimarinin doruğudur.\n\nSarı-kırmızı renkleriyle bir tepeye kurulu düşsel Pena Sarayı, gizemli kuyuları ve tünelleriyle Quinta da Regaleira malikânesi ve tepedeki Mağribi kalesi kentin öne çıkanlarıdır. Tüm kültürel manzara UNESCO Dünya Mirası Listesi’ndedir.', sources: ['UNESCO World Heritage List — Cultural Landscape of Sintra'] },
  { id: 'faro', name: 'Faro (Algarve)', city: 'Faro', country: 'Portekiz', lat: 37.0194, lng: -7.9304, aliases: ['faro', 'algarve'], summary: 'Portekiz’in güneyindeki güneşli Algarve bölgesinin başkenti Faro, altın kayalıklı koylara ve turkuaz sulara açılan bir kapıdır. Çoğu ziyaretçinin geçtiği kent, aslında sakin ve otantik bir tarihî çekirdek barındırır.\n\nSurlarla çevrili eski şehri (Cidade Velha), katedrali ve leylekleriyle huzurlu bir atmosfer sunar; hemen yanı başındaki Ria Formosa lagünü ise kuşları, kumsalları ve adalarıyla bir doğa cennetidir. Algarve’nin ünlü plajları ve kaya kemerleri de kısa mesafededir.', sources: ['VisitPortugal — Algarve / Faro'] },
  { id: 'coimbra', name: 'Coimbra', city: 'Coimbra', country: 'Portekiz', lat: 40.2033, lng: -8.4103, aliases: ['coimbra'], summary: 'Mondego Nehri kıyısındaki Coimbra, Portekiz’in eski başkenti ve Avrupa’nın en köklü üniversite kentlerinden biridir; 1290’da kurulan üniversitesi hâlâ kentin ruhunu belirler. Öğrenci gelenekleri ve kendine özgü fado müziğiyle canlıdır.\n\nAltın yaldızlı, barok Joanina Kütüphanesi ve tarihî üniversite binaları (UNESCO) kentin en görkemli hazineleridir. Dik sokaklı eski şehri, katedralleri ve pelerinli öğrencilerin söylediği melankolik Coimbra fadosuyla kent, bilgi ve gelenek doludur.', sources: ['UNESCO World Heritage List — University of Coimbra'] },
  { id: 'obidos', name: 'Óbidos', city: 'Óbidos', country: 'Portekiz', lat: 39.3606, lng: -9.1575, aliases: ['obidos', 'óbidos'], summary: 'Portekiz’in ortasında bir tepeye kurulu Óbidos, tümüyle surlarla çevrili, beyaz badanalı evleri ve çiçekli sokaklarıyla ülkenin en iyi korunmuş ortaçağ kasabalarından biridir. Yüzyıllar boyunca Portekiz kraliçelerine armağan edilen bir “kraliçeler kenti” olmuştur.\n\nSurların üstünde yürünebilen kasabada ortaçağ kalesi (bugün tarihî bir otel), dar arnavut kaldırımlı sokaklar ve rengârenk begonvillerle bezeli evler büyüler. Yerel vişne likörü ginjinha’nın çikolata bardakta ikram edilmesi ve yıllık ortaçağ festivali kasabaya özgü keyiflerdir.', sources: ['VisitPortugal — Óbidos'] },
  // --- Birleşik Krallık derinleştirme ---
  { id: 'bath', name: 'Bath', city: 'Bath', country: 'Birleşik Krallık', lat: 51.3811, lng: -2.359, aliases: ['bath'], summary: 'İngiltere’nin güneybatısındaki Bath, adını Romalıların iki bin yıl önce buradaki şifalı termal kaynaklara kurduğu hamamlardan alır. Zarif Georgian mimarisiyle bütünlük taşıyan kent, bütünüyle UNESCO Dünya Mirası Listesi’ndedir.\n\nOlağanüstü korunmuş Roma Hamamları, bal rengi taştan yarım daire biçimli görkemli konut sırası Royal Crescent ve gotik Bath Abbey başlıca duraklardır. Yazar Jane Austen’ın yaşadığı ve eserlerine yansıttığı kent, zarif dükkânları ve modern termal kaplıcasıyla da sevilir.', sources: ['UNESCO World Heritage List — City of Bath'] },
  { id: 'york', name: 'York', city: 'York', country: 'Birleşik Krallık', lat: 53.96, lng: -1.0873, aliases: ['york'], summary: 'Kuzey İngiltere’nin tarihî kalbi York, Romalılar, Vikingler ve Normanların izlerini taşıyan, ortaçağ surlarıyla çevrili büyüleyici bir kenttir. Sokakları ve kuleleri, iki bin yıllık katmanlı geçmişi bugüne taşır.\n\nİngiltere’nin en büyük ortaçağ gotik yapılarından biri olan devasa York Minster katedrali, üstü sarkan yapılarıyla dar ortaçağ sokağı The Shambles ve Viking geçmişini anlatan Jorvik Merkezi başlıca duraklardır. Surların üzerinde yürüyüş ve çay salonlarıyla York, klasik bir İngiliz atmosferi sunar.', sources: ['VisitBritain — York'] },
  { id: 'oxford', name: 'Oxford', city: 'Oxford', country: 'Birleşik Krallık', lat: 51.752, lng: -1.2577, aliases: ['oxford'], summary: 'İngiltere’nin Oxford’u, İngilizce konuşulan dünyanın en eski üniversitesine ev sahipliği yapan, “rüya gibi kuleler kenti” olarak anılan zarif bir akademik merkezdir. Yüzyıllardır bilim insanlarını, yazarları ve devlet adamlarını yetiştirmiştir.\n\nTaştan görkemli kolejleri, yuvarlak kütüphane binası Radcliffe Camera, Bodleian Kütüphanesi ve Ahlar Köprüsü başlıca duraklardır. Bazı kolejlerin Harry Potter filmlerine mekân olması ve nehirde tekne kaydırma (punting) geleneğiyle Oxford, tarih ile öğrenci enerjisini birleştirir.', sources: ['VisitBritain — Oxford'] },
  { id: 'cambridge', name: 'Cambridge', city: 'Cambridge', country: 'Birleşik Krallık', lat: 52.2053, lng: 0.1218, aliases: ['cambridge'], summary: 'İngiltere’nin doğusundaki Cambridge, dünyanın en prestijli üniversitelerinden birinin merkezidir; Newton’dan Darwin’e sayısız bilim insanını yetiştirmiş köklü bir akademik gelenek taşır. Cam Nehri kıyısındaki zarif kolejleriyle huzurlu bir atmosfer sunar.\n\nVitray ve yelpaze tavanıyla ünlü King’s College Şapeli, tarihî kolej avluları ve nehir üzerindeki köprüler kentin simgeleridir. Nehirde sırıkla itilen düz tekneyle (punting) yapılan gezi, kolejleri suyun üzerinden görmenin en keyifli yoludur.', sources: ['VisitBritain — Cambridge'] },
  { id: 'liverpool', name: 'Liverpool', city: 'Liverpool', country: 'Birleşik Krallık', lat: 53.4084, lng: -2.9916, aliases: ['liverpool'], summary: 'Kuzeybatı İngiltere’nin liman kenti Liverpool, denizcilik geçmişi ve dünyayı değiştiren müzik mirasıyla anılır; efsanevi grup The Beatles bu kentte doğmuştur. Güçlü bir yerel kimliğe ve mizah anlayışına sahip canlı bir kenttir.\n\nYenilenmiş tarihî Albert Dock rıhtımı, denizcilik ve kölelik müzeleri, The Beatles Story sergisi ve kentin iki büyük katedrali başlıca duraklardır. Tutkulu futbol kültürü (Liverpool ve Everton) ve gece hayatıyla kent, ziyaretçilere sıcak bir enerji sunar.', sources: ['VisitBritain — Liverpool'] },
  // --- İrlanda ---
  { id: 'dublin', name: 'Dublin', city: 'Dublin', country: 'İrlanda', lat: 53.3498, lng: -6.2603, aliases: ['dublin'], summary: 'İrlanda’nın başkenti Dublin, Liffey Nehri’nin ikiye böldüğü, edebiyat ve müzik dolu sıcak bir kenttir; James Joyce, Oscar Wilde ve W. B. Yeats gibi devleri yetiştirmiştir. Tarihî mimarisi ile canlı pub kültürünü keyifle harmanlar.\n\nMuhteşem Kells Kitabı’nı barındıran Trinity College kütüphanesi, canlı müzikli Temple Bar semti, Dublin Kalesi ve dünyaca ünlü Guinness Storehouse başlıca duraklardır. Geleneksel İrlanda müziğinin çaldığı tarihî meyhaneleri, kenti unutulmaz bir buluşma noktası yapar.', sources: ['Ireland.com — Dublin'] },
  { id: 'galway', name: 'Galway', city: 'Galway', country: 'İrlanda', lat: 53.2707, lng: -9.0568, aliases: ['galway'], summary: 'İrlanda’nın vahşi Atlantik kıyısındaki Galway, renkli sokakları, canlı sokak müziği ve rahat sanatçı ruhuyla ülkenin en neşeli kentlerinden biridir. Geleneksel İrlanda kültürünün ve Gaelic dilinin güçlü olduğu bir bölgenin kalbidir.\n\nOrtaçağ Latin Mahallesi’nin dar sokakları, kafeleri ve pub’ları kentin kalbini oluşturur. Galway aynı zamanda nefes kesen Moher Uçurumları’na, taşlık Aran Adaları’na ve yaban güzelliğiyle Connemara doğasına açılan mükemmel bir kapıdır.', sources: ['Ireland.com — Galway'] },
  { id: 'cork', name: 'Cork', city: 'Cork', country: 'İrlanda', lat: 51.8985, lng: -8.4756, aliases: ['cork'], summary: 'İrlanda’nın güneyindeki Cork, River Lee’nin kollarının çevrelediği bir ada üzerine kurulu, rahat ve gururlu bir kimliğe sahip ülkenin ikinci büyük kentidir. Yerel halkın kendi kentini “gerçek başkent” diye anması, bu güçlü ruhu yansıtır.\n\nÇatısı altında taze balık, peynir ve yerel lezzetler satılan tarihî English Market, nehir kıyısı yürüyüşleri ve renkli mahalleleri kenti keyifli kılar. Hemen yakınındaki, öpüldüğünde güzel konuşma yeteneği verdiğine inanılan “Blarney Taşı”yla ünlü Blarney Kalesi de gözde bir duraktır.', sources: ['Ireland.com — Cork'] },
  // --- Hollanda derinleştirme ---
  { id: 'utrecht', name: 'Utrecht', city: 'Utrecht', country: 'Hollanda', lat: 52.0907, lng: 5.1214, aliases: ['utrecht'], summary: 'Amsterdam’ın hemen güneyindeki Utrecht, iki katlı, su seviyesindeki kafe ve teraslı kanal rıhtımlarıyla (wharf) Hollanda’da benzeri olmayan özgün bir kent dokusuna sahiptir. Kalabalıktan uzak, otantik bir Hollanda atmosferi sunar.\n\nÜlkenin en yüksek kilise kulesi olan ve tepesine tırmanılabilen gotik Dom Kulesi kentin simgesidir. Bisikletli yaşamı, kanal kenarı yürüyüşleri ve dünyaca ünlü tavşan karakteri Miffy’nin (Nijntje) yaratıcısına adanmış müzesiyle Utrecht keyifli bir üniversite kentidir.', sources: ['Holland.com — Utrecht'] },
  { id: 'delft', name: 'Delft', city: 'Delft', country: 'Hollanda', lat: 52.0116, lng: 4.3571, aliases: ['delft'], summary: 'Hollanda’nın güneyindeki zarif Delft, mavi-beyaz seramikleriyle (Delftware) ve ressam Johannes Vermeer’in memleketi olmasıyla dünya çapında ünlüdür. Kanalları ve tarihî meydanıyla adeta canlı bir Hollanda tablosu gibidir.\n\nGörkemli Yeni Kilise (Nieuwe Kerk) Hollanda kraliyet ailesinin defnedildiği yerdir; karşısındaki tarihî belediye binası ve çevredeki lonca evleri meydanı süsler. Kanal kıyısı yürüyüşleri, seramik atölyeleri ve öğrenci enerjisiyle Delft, huzurlu bir kaçamak sunar.', sources: ['Holland.com — Delft'] },
  { id: 'lahey', name: 'Lahey (Den Haag)', city: 'Lahey', country: 'Hollanda', lat: 52.0705, lng: 4.3007, aliases: ['lahey', 'den haag', 'the hague', 'la haye'], summary: 'Hollanda’nın idari başkenti ve kraliyet ailesinin ikamet ettiği kent olan Lahey (Den Haag), aynı zamanda Uluslararası Adalet Divanı gibi kurumlara ev sahipliği yapan bir dünya diplomasi merkezidir. Zarif ve resmî bir havası vardır.\n\nVermeer’in “İnci Küpeli Kız” tablosunu barındıran Mauritshuis müzesi, tarihî parlamento kompleksi Binnenhof ve minyatür Hollanda parkı Madurodam başlıca duraklardır. Kentin sahil semti Scheveningen ise plajı ve iskelesiyle keyifli bir deniz kaçamağı sunar.', sources: ['Holland.com — The Hague'] },
  { id: 'giethoorn', name: 'Giethoorn', city: 'Giethoorn', country: 'Hollanda', lat: 52.7386, lng: 6.0781, aliases: ['giethoorn'], summary: 'Hollanda’nın kuzeyinde, arabaların giremediği ve ulaşımın yalnızca kanallar ile patikalar üzerinden sağlandığı Giethoorn köyü, “Hollanda’nın Venedik’i” olarak anılır. Motorsuz teknelerin sessizce süzüldüğü köy, olağanüstü huzurlu bir atmosfer sunar.\n\nKamış çatılı, çiçek bahçeli tarihî çiftlik evleri, onları birbirine bağlayan zarif tahta yaya köprüleri ve söğüt gölgeli su yollarıyla köy adeta bir masal dünyasıdır. Kiralık sessiz elektrikli “fısıltı tekneleri” ile yapılan gezi, Giethoorn’u keşfetmenin en keyifli yoludur.', sources: ['Holland.com — Giethoorn'] },
  // --- Belçika derinleştirme ---
  { id: 'gent', name: 'Gent', city: 'Gent', country: 'Belçika', lat: 51.0543, lng: 3.7174, aliases: ['gent', 'ghent', 'gand'], summary: 'Belçika’nın Gent’i (Ghent), ortaçağda Avrupa’nın en zengin ve en güçlü kentlerinden biriydi; bu görkemli geçmiş, kanal kıyısındaki lonca evlerine ve anıtsal yapılarına yansımıştır. Canlı öğrenci nüfusu, tarihî dokuya çağdaş bir enerji katar.\n\nOrtaçağdan kalma Gravensteen (Kontlar Kalesi), Van Eyck kardeşlerin başyapıtı “Gent Altarı”nı barındıran Aziz Bavo Katedrali ve nehir kıyısındaki Graslei-Korenlei lonca evleri başlıca duraklardır. Bruges’ten daha az turistik, daha canlı havasıyla Gent özgün bir keşif sunar.', sources: ['VisitFlanders — Ghent'] },
  { id: 'anvers', name: 'Anvers (Antwerpen)', city: 'Anvers', country: 'Belçika', lat: 51.2194, lng: 4.4025, aliases: ['anvers', 'antwerp', 'antwerpen'], summary: 'Belçika’nın liman kenti Anvers (Antwerpen), yüzyıllardır dünya elmas ticaretinin başkenti ve moda ile sanatın önemli bir merkezidir. Ressam Peter Paul Rubens’in yaşadığı kent, zengin bir kültürel mirasa sahiptir.\n\nRubens’in başyapıtlarını barındıran görkemli Onze-Lieve-Vrouwe Katedrali, saray gibi tasarlanmış anıtsal merkez tren garı ve lonca evleriyle çevrili Grote Markt meydanı başlıca duraklardır. Elmas mahallesi, avangart moda okulu ve canlı gece hayatıyla Anvers, zarif ve modern bir kenttir.', sources: ['VisitFlanders — Antwerp'] },
];

// Basit normalleştirme: küçük harf + Türkçe/aksan sadeleştirme + boşluk temizliği.
// Bir yeri id'siyle bulur (temel foto/amblem gibi yerlerde takma ad aramak için).
export function placeById(id) {
  if (!id) return null;
  return PLACES.find((p) => p.id === id) || null;
}

export function normalize(text) {
  return (text || '')
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'i')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Bir yerin tüm eşleştirme adaylarını (ad, şehir, takma adlar) normalize edip döndürür.
function candidatesOf(place) {
  return [place.name, place.city, ...(place.aliases || [])].map(normalize).filter(Boolean);
}

// Girdiyi (mekan ismi veya "mekan, şehir") yerel veri tabanıyla eşleştirir.
// Öncelik: (1) tam eşleşme, (2) sorguda bütün kelime olarak geçen ad — en uzun ad
// kazanır. Böylece "Sofya", "Ayasofya"nın alt dizesi olsa da yanlış eşleşmez.
export function matchPlace(query) {
  const q = normalize(query);
  if (!q) return null;

  // 1) Tam eşleşme
  for (const place of PLACES) {
    if (candidatesOf(place).some((c) => c === q)) return place;
  }

  // 2) Sorgu, bilinen bir adı bütün kelime(ler) olarak içeriyor mu?
  //    (ör. "efes antik kenti" -> "efes", "kotor körfezi gezisi" -> "kotor körfezi")
  //    Kısa bir alt dizenin yanlış eşleşmemesi için en uzun aday kazanır.
  const padded = ` ${q} `;
  let best = null;
  let bestLen = 0;
  for (const place of PLACES) {
    for (const c of candidatesOf(place)) {
      if (c.length >= 3 && padded.includes(` ${c} `) && c.length > bestLen) {
        best = place;
        bestLen = c.length;
      }
    }
  }
  return best;
}
