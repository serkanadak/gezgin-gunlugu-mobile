// Gezgin Günlüğü durumu: seyahatler (her biri kendi hazırlık checklist'i, durakları,
// keşifleri ile) ve genel ayarlar. AsyncStorage ile cihazda kalıcı saklanır.

import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { storageGet, storageSet, storageRemove, requestPersistentStorage } from '../logic/storage';
import { photoStoreUsable, writePhotos, readPhotos, pruneUnreferenced } from '../logic/photoStore';
import { extractPhotos, commitAssigned, inlinePhotos, collectRefs, hasInlinePhotos, richness, looksLikeDataLoss } from '../logic/tripPhotos';
import { createDefaultChecklist, createChecklistItem, dedupeChecklist } from '../data/checklist';
import { DEFAULT_VEHICLE } from '../data/vehicles';
import { BUILTIN_EXPENSE_CATEGORIES, slugifyCategory } from '../data/expenseCategories';
import { todayKey } from '../logic/date';

const STORAGE_KEY = '@gezgin_gunlugu_v1';
// Pencereler arası senkronizasyon: bir pencere yazınca diğerleri haberdar olur.
// Fotoğrafları ayrı kayıtlara taşırken alınan geçici yedek. Göç doğrulanınca
// silinir; doğrulanamazsa yerinde kalır ki hiçbir şey kaybolmasın.
const BACKUP_KEY = '@gezgin_gunlugu_v1__yedek_foto_gocu';
const SYNC_CHANNEL = 'gezgin_gunlugu_sync';
const SYNC_KEY = 'gg_sync_rev';

// Bayatlık kontrolü UCUZ olmalı: her pencere odağında 35 MB'lık kaydı okuyup
// JSON.parse etmek yeni bir yavaşlık kaynağı olurdu. Bu yüzden sürüm numarası
// ayrıca küçücük bir localStorage anahtarında tutulur; büyük kayıt yalnızca
// bu işaret gerçekten ilerlediyse okunur.
function readRevMarker() {
  if (Platform.OS !== 'web' || typeof window === 'undefined' || !window.localStorage) return null;
  try {
    const v = window.localStorage.getItem(SYNC_KEY);
    return v == null ? null : Number(v) || 0;
  } catch (e) {
    return null;
  }
}

// Kayıttaki sürüm bilgisini TAM ÇÖZÜMLEME YAPMADAN okur: rev/savedAt her
// zaman JSON'un sonuna yazılır, bu yüzden kuyruğa bakmak yeterli. 35 MB'lık
// veriyi çözümlemeden sürüm karşılaştırması yapılabilir.
function metaOf(raw) {
  if (!raw) return { rev: 0, savedAt: 0 };
  const m = /"rev":(\d+),"savedAt":(\d+)\}\s*$/.exec(raw);
  if (m) return { rev: Number(m[1]) || 0, savedAt: Number(m[2]) || 0 };
  try {
    const o = JSON.parse(raw);
    return { rev: Number(o.rev) || 0, savedAt: Number(o.savedAt) || 0 };
  } catch (e) {
    return { rev: 0, savedAt: 0 };
  }
}

function writeRevMarker(rev) {
  if (Platform.OS !== 'web' || typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(SYNC_KEY, String(rev));
  } catch (e) {
    /* işaret yazılamazsa büyük kaydın rev'i yine doğruyu söylüyor */
  }
}
const JournalContext = createContext(null);

const DEFAULT_SETTINGS = {
  aiMode: 'local', // 'local' | 'ai'
  apiProvider: 'openai', // 'openai' | 'claude'
  apiKey: '',
  apiModel: '',
  roadOnline: true, // çevrimiçiyken gerçek yol mesafesi (OSRM); kapalıysa yalnızca tahmin
  lang: 'tr', // arayüz dili: 'tr' | 'en' | 'de' (dil önyüklemede localStorage'dan uygulanır)
  theme: 'deniz', // ekran renk paleti: 'deniz' | 'gunes' | 'dag' | 'kar' (palet önyüklemede localStorage'dan uygulanır)
  expenseCatsCustom: [], // Ayarlar'dan eklenen harcama türleri: [{ value, label, icon }]
  expenseCatsInactive: [], // pasif türler (seyahatlerde seçilemez, geçmiş kayıtlarda görünür)
  expenseCatsOverrides: {}, // yeniden adlandırma: { [value]: { label, icon } } — anahtar sabit kalır
  lastBackupAt: 0, // en son yedek dosyası alındığı an (yedek hatırlatıcısı için)
  lastBackupStats: null, // o anki kayıt sayıları: { trips, discoveries, expenses, photos }
};

const initialState = {
  loaded: false,
  trips: [],
  settings: DEFAULT_SETTINGS,
};

function uid(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

// Belirli bir seyahati güncelleyen küçük yardımcı (immutable).
function mapTrip(trips, tripId, fn) {
  return trips.map((t) => (t.id === tripId ? fn(t) : t));
}

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE': {
      const rawTrips = Array.isArray(action.payload?.trips) ? action.payload.trips : [];
      // Eski kayıtlarda oluşmuş yinelenen hazırlık maddelerini (ör. çift E-SIM) temizle.
      // Ayrıca kapak fotoğrafının `photoUri` kopyasını düşür: aynı base64 verisi
      // hem photos[0] hem photoUri'de duruyordu ve kayıtlı veriyi (dolayısıyla
      // her yazmadaki JSON boyutunu) gereksiz yere iki katına çıkarıyordu.
      // Veri kaybı yok: aynı fotoğraf photos[0]'da duruyor.
      const trips = rawTrips.map((t) => ({
        ...t,
        checklist: dedupeChecklist(t.checklist || []),
        discoveries: (t.discoveries || []).map((d) =>
          Array.isArray(d.photos) && d.photos.length && d.photoUri ? { ...d, photoUri: null } : d
        ),
      }));
      return {
        ...state,
        loaded: true,
        trips,
        settings: { ...DEFAULT_SETTINGS, ...(action.payload?.settings || {}) },
      };
    }

    case 'ADD_TRIP':
      return { ...state, trips: [action.trip, ...state.trips] };

    case 'UPDATE_TRIP':
      return { ...state, trips: mapTrip(state.trips, action.tripId, (t) => ({ ...t, ...action.patch })) };

    case 'REMOVE_TRIP':
      return { ...state, trips: state.trips.filter((t) => t.id !== action.tripId) };

    // --- Checklist ---
    case 'SET_CHECK_STATUS':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          checklist: t.checklist.map((c) => (c.id === action.itemId ? { ...c, status: action.status } : c)),
        })),
      };
    case 'SET_CHECK_NOTE':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          checklist: t.checklist.map((c) => (c.id === action.itemId ? { ...c, note: action.note } : c)),
        })),
      };
    case 'SET_CHECKLIST':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({ ...t, checklist: action.checklist })),
      };
    case 'ADD_CHECK_ITEM':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({ ...t, checklist: [...t.checklist, action.item] })),
      };
    case 'REMOVE_CHECK_ITEM':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          checklist: t.checklist.filter((c) => c.id !== action.itemId),
        })),
      };

    // --- Duraklar ---
    case 'ADD_STOP':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({ ...t, stops: [...(t.stops || []), action.stop] })),
      };
    case 'UPDATE_STOP':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          stops: (t.stops || []).map((s) => (s.id === action.stopId ? { ...s, ...action.patch } : s)),
        })),
      };
    case 'REMOVE_STOP':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          stops: (t.stops || []).filter((s) => s.id !== action.stopId),
        })),
      };
    case 'REORDER_STOPS':
      return { ...state, trips: mapTrip(state.trips, action.tripId, (t) => ({ ...t, stops: action.stops })) };

    // --- Keşifler ---
    case 'ADD_DISCOVERY':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          discoveries: [...(t.discoveries || []), action.discovery],
        })),
      };
    case 'UPDATE_DISCOVERY':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          discoveries: (t.discoveries || []).map((d) =>
            d.id === action.discoveryId ? { ...d, ...action.patch } : d
          ),
        })),
      };
    case 'REMOVE_DISCOVERY':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          discoveries: (t.discoveries || []).filter((d) => d.id !== action.discoveryId),
        })),
      };

    // --- Harcamalar ---
    case 'ADD_EXPENSE':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          expenses: [...(t.expenses || []), action.expense],
        })),
      };
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          expenses: (t.expenses || []).map((e) =>
            e.id === action.expenseId ? { ...e, ...action.patch } : e
          ),
        })),
      };
    case 'REMOVE_EXPENSE':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          expenses: (t.expenses || []).filter((e) => e.id !== action.expenseId),
        })),
      };

    // --- Günlük saatlik program ---
    case 'SET_PLAN':
      return { ...state, trips: mapTrip(state.trips, action.tripId, (t) => ({ ...t, plan: action.plan })) };
    case 'ADD_PLAN_ITEM':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({ ...t, plan: [...(t.plan || []), action.item] })),
      };
    case 'UPDATE_PLAN_ITEM':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          plan: (t.plan || []).map((i) => (i.id === action.itemId ? { ...i, ...action.patch } : i)),
        })),
      };
    case 'REMOVE_PLAN_ITEM':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          plan: (t.plan || []).filter((i) => i.id !== action.itemId),
        })),
      };

    // --- Günlük notlar (tarihe bağlı serbest günlük) ---
    case 'ADD_DAY_NOTE':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          dayNotes: [...(t.dayNotes || []), action.note],
        })),
      };
    case 'UPDATE_DAY_NOTE':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          dayNotes: (t.dayNotes || []).map((n) => (n.id === action.noteId ? { ...n, ...action.patch } : n)),
        })),
      };
    case 'REMOVE_DAY_NOTE':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          dayNotes: (t.dayNotes || []).filter((n) => n.id !== action.noteId),
        })),
      };

    // Yedek dosyasından aktarım: aynı kimlikli seyahat dosyadaki hâliyle
    // değişir, yenileri eklenir, dosyada olmayanlara DOKUNULMAZ.
    case 'IMPORT_TRIPS':
      return {
        ...state,
        trips: action.trips,
        settings: action.settings ? { ...state.settings, ...action.settings } : state.settings,
      };

    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.patch } };

    default:
      return state;
  }
}

export function JournalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Kayıtta tutulan sürüm numarası. Her yazma bunu bir artırır; böylece bir
  // pencerenin elindeki verinin bayat mı olduğu anlaşılır.
  const revRef = useRef(0);
  // rev taşımayan ESKİ kayıtlar için ikinci ölçüt: son yazma zamanı.
  const savedAtRef = useRef(0);
  // Uzaktan gelen veriyle tazelendikten sonra aynı veriyi geri yazmayalım.
  const skipWriteRef = useRef(false);
  // Başka bir pencere veri güncellediği için bu pencere tazelendi mi?
  const [refreshedFromOther, setRefreshedFromOther] = useState(false);

  // Fotoğraf data URI'si -> kayıt referansı eşlemesi. Aynı fotoğrafın her
  // kaydetmede yeniden yazılmasını engeller.
  const uriToRefRef = useRef(new Map());
  // Kayıtta referansı olup fotoğraf kaydı bulunamayanların sayısı.
  const [missingPhotos, setMissingPhotos] = useState(0);

  const applyRaw = useCallback(async (raw) => {
    const payload = raw ? JSON.parse(raw) : {};
    revRef.current = Number(payload.rev) || 0;
    savedAtRef.current = Number(payload.savedAt) || 0;
    const marker = readRevMarker();
    if (marker == null || marker < revRef.current) writeRevMarker(revRef.current);

    let trips = Array.isArray(payload.trips) ? payload.trips : [];
    if (photoStoreUsable()) {
      const refs = collectRefs(trips);
      if (refs.size) {
        const byId = await readPhotos(refs);
        // Bu fotoğrafların referansı zaten var; yeniden yazmaya gerek yok.
        byId.forEach((uri, id) => uriToRefRef.current.set(uri, id));
        const res = inlinePhotos(trips, byId);
        trips = res.trips;
        setMissingPhotos(res.missing);
      } else {
        setMissingPhotos(0);
      }
    }
    dispatch({ type: 'HYDRATE', payload: { ...payload, trips } });
  }, []);

  // Depodaki kayıt bizimkinden yeni mi? rev asıl ölçüt; rev'i olmayan eski
  // kayıtlarda savedAt'e bakılır.
  const isNewer = (rev, savedAt) =>
    rev > revRef.current || (rev === revRef.current && savedAt > savedAtRef.current);

  // ESKİ KAYITTAN GÖÇ: fotoğraflar seyahat verisinin içindeyse ayrı
  // kayıtlara taşınır. Sıra veri kaybı OLMAYACAK şekilde kurulmuştur:
  //   1) mevcut kaydın tam kopyası yedeğe yazılır,
  //   2) fotoğraflar ayrı kayıtlara yazılır,
  //   3) ancak bunlar bittiyse ince kayıt ana anahtarın üzerine yazılır,
  //   4) ince kayıt geri okunup TÜM referanslar çözülebiliyorsa yedek silinir.
  // Herhangi bir adım başarısız olursa eski kayıt yerinde kalır (2. adımdan
  // artakalan fotoğraf kayıtları zararsızdır, sonradan temizlenir).
  const migrateInlinePhotos = useCallback(async (raw, payload) => {
    const trips = Array.isArray(payload.trips) ? payload.trips : [];
    if (!photoStoreUsable() || !hasInlinePhotos(trips)) return false;
    try {
      await storageSet(BACKUP_KEY, raw);
      const { trips: slim, toWrite, refs, assigned } = extractPhotos(trips, uriToRefRef.current);
      await writePhotos(toWrite);
      commitAssigned(uriToRefRef.current, assigned);
      const rev = (Number(payload.rev) || 0) + 1;
      const savedAt = Date.now();
      await storageSet(
        STORAGE_KEY,
        JSON.stringify({ ...payload, trips: slim, rev, savedAt, photoSplit: 1 })
      );
      // Doğrula: yazdığımızı geri oku, her referans çözülüyor mu?
      const check = await storageGet(STORAGE_KEY);
      const parsed = JSON.parse(check);
      const backRefs = collectRefs(parsed.trips || []);
      const byId = await readPhotos(backRefs);
      if (backRefs.size !== refs.size || byId.size !== backRefs.size) {
        return false; // yedek yerinde kalsın
      }
      revRef.current = rev;
      savedAtRef.current = savedAt;
      writeRevMarker(rev);
      await storageRemove(BACKUP_KEY);
      await pruneUnreferenced(refs);
      return true;
    } catch (e) {
      return false; // eski kayıt ve yedek duruyor
    }
  }, []);

  useEffect(() => {
    (async () => {
      // Verinin tarayıcı tarafından silinmesini engelle (iOS'ta 7 gün kuralı).
      requestPersistentStorage().catch(() => {});
      try {
        let raw = await storageGet(STORAGE_KEY);
        // Yarıda kalmış bir göçten sonra ana kayıt boşsa yedekten devam et.
        if (!raw) {
          const backup = await storageGet(BACKUP_KEY);
          if (backup) raw = backup;
        }
        if (raw) {
          const payload = JSON.parse(raw);
          await migrateInlinePhotos(raw, payload);
          // Göç başarılı olduysa ince kayıt, olmadıysa eski kayıt okunur.
          await applyRaw(await storageGet(STORAGE_KEY));
        } else {
          dispatch({ type: 'HYDRATE', payload: {} });
        }
      } catch (e) {
        dispatch({ type: 'HYDRATE', payload: {} });
      }
    })();
  }, [applyRaw, migrateInlinePhotos]);

  // Kalıcılaştırma GECİKTİRİLİR (debounce).
  // Tüm seyahatler (fotoğraflar base64 gömülü) tek bir JSON olarak yazılır; bu
  // veri onlarca MB olabilir ve JSON.stringify ana iş parçacığını kilitler.
  // Her tuş vuruşunda/işaretlemede yazmak telefonda donmaya ve sekmenin
  // bellek yetersizliğinden çökip yeniden başlamasına yol açıyordu. Bu yüzden
  // hızlı ardışık değişiklikler tek bir yazmada birleştirilir; sekme
  // kapanırken/arka plana alınırken bekleyen yazma hemen boşaltılır.
  const pendingRef = useRef(null);
  const timerRef = useRef(null);

  // Yazma başarısız olursa (depolama dolu / tarayıcı engeli) kullanıcıya
  // söylenir. Eskiden storageSet'in Promise'i yakalanmıyordu: kota aşımında
  // "unhandled rejection" oluşuyor, kullanıcı verisinin kaydedilmediğini
  // hiç öğrenemiyordu.
  const [writeFailed, setWriteFailed] = useState(false);
  // Ağır veri kaybı olacağı için engellenen yazma (depodaki zenginlik bilgisi).
  const [blockedLoss, setBlockedLoss] = useState(null);

  // Diğer pencerelere "veri değişti" haberi verir.
  const notifyOthers = useCallback((rev) => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;
    // İşaret her zaman yazılır: hem ucuz bayatlık kontrolü hem de
    // BroadcastChannel olmayan tarayıcılarda 'storage' olayı için.
    writeRevMarker(rev);
    try {
      if (typeof window.BroadcastChannel === 'function') {
        const ch = new window.BroadcastChannel(SYNC_CHANNEL);
        ch.postMessage({ rev });
        ch.close();
      }
    } catch (e) {
      /* haber verilemezse sürüm kontrolü yine koruyor */
    }
  }, []);

  // Depodaki veri bizden yeniyse onu al (bayat anlık görüntüyü yazmadan).
  // trustMarker: sık tetiklenen (odak/görünürlük) yolda ucuz localStorage
  // işaretine güvenip büyük kaydı hiç okumayız. YAZMA yolunda ise buna
  // güvenilmez — işaret geride kalmışsa yeni veriyi ezerdik ki düzeltmeye
  // çalıştığımız hata tam olarak buydu.
  const pullIfNewer = useCallback(async (trustMarker = true) => {
    if (trustMarker) {
      const marker = readRevMarker();
      if (marker != null && marker <= revRef.current) return false;
    }
    try {
      const raw = await storageGet(STORAGE_KEY);
      const meta = metaOf(raw);
      if (isNewer(meta.rev, meta.savedAt)) {
        skipWriteRef.current = true;
        pendingRef.current = null;
        applyRaw(raw);
        setRefreshedFromOther(true);
        return true;
      }
    } catch (e) {
      /* okunamadıysa mevcut durumla devam */
    }
    return false;
  }, [applyRaw]);

  // ÖNEMLİ: Yazmadan HEMEN ÖNCE depodaki sürüm kontrol edilir.
  // Eskiden bu kontrol yoktu: uzun süre açık kalmış (ör. telefonda arka plana
  // atılmış) bir pencerede küçük bir değişiklik yapmak, o pencerenin ELİNDEKİ
  // ESKİ anlık görüntüyü tüm verinin üzerine yazıyordu. Bu yüzden başka bir
  // pencerede/oturumda eklenen fotoğraflar ve güncellemeler sessizce yok
  // oluyordu (testle birebir yeniden üretildi). Artık depo daha yeniyse
  // yazma iptal edilir, pencere tazelenir ve kullanıcıya haber verilir.
  const flushNow = useCallback(async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const data = pendingRef.current;
    if (!data) return;
    pendingRef.current = null;
    // Depodaki GERÇEK sürümü oku (işarete güvenmeden): daha yeniyse ezme.
    if (await pullIfNewer(false)) return;
    // AĞIR VERİ KAYBI KORUMASI.
    // Depoda keşif/harcama/fotoğraf varken elimizdeki durumda hiç yoksa bu
    // normal bir düzenleme değildir (ör. veri okunamadığı için boş/eksik bir
    // durumla açılmışız). Böyle bir yazma sessizce yapılırsa kullanıcının
    // günlüğü yok olur; bu yüzden yazma DURDURULUR ve kullanıcıya bildirilir.
    try {
      const storedRaw = await storageGet(STORAGE_KEY);
      if (storedRaw) {
        const stored = richness(JSON.parse(storedRaw).trips || []);
        if (looksLikeDataLoss(stored, richness(data.trips))) {
          pendingRef.current = null;
          setBlockedLoss(stored);
          return;
        }
      }
    } catch (e) {
      // Depo okunamıyorsa körlemesine yazmak yerine bekle.
      pendingRef.current = data;
      setWriteFailed(true);
      return;
    }
    const rev = revRef.current + 1;
    const savedAt = Date.now();
    try {
      // Fotoğraflar AYRI kayıtlara yazılır; kayda yalnızca kısa referansları
      // girer. Böylece her kaydetmede üretilen JSON 35 MB değil kilobayt
      // boyutunda olur. Fotoğraf yazımı başarısız olursa ince kayıt YAZILMAZ
      // (yoksa referansı olup görüntüsü olmayan kayıt oluşurdu) ve değişiklik
      // yeniden denenmek üzere bekletilir.
      let toStore = data;
      let refs = null;
      if (photoStoreUsable()) {
        const ex = extractPhotos(data.trips, uriToRefRef.current);
        try {
          await writePhotos(ex.toWrite);
        } catch (photoErr) {
          // Fotoğraflar yazılamadı: kimlik ataması İŞLENMEZ ki bir sonraki
          // deneme yeniden yazmayı denesin. İnce kayıt da yazılmaz.
          pendingRef.current = data;
          setWriteFailed(true);
          return;
        }
        commitAssigned(uriToRefRef.current, ex.assigned);
        refs = ex.refs;
        toStore = { ...data, trips: ex.trips, photoSplit: 1 };
        // Artık kullanılmayan fotoğrafları eşlemeden düş (bellek sızmasın).
        uriToRefRef.current.forEach((id, uri) => {
          if (!refs.has(id)) uriToRefRef.current.delete(uri);
        });
      }
      const p = storageSet(STORAGE_KEY, JSON.stringify({ ...toStore, rev, savedAt }));
      if (p && typeof p.then === 'function') {
        p.then(
          () => {
            revRef.current = rev;
            savedAtRef.current = savedAt;
            setWriteFailed(false);
            notifyOthers(rev);
            // Silinen fotoğrafların kayıtlarını temizle (yer boşalsın).
            if (refs) pruneUnreferenced(refs).catch(() => {});
          },
          () => setWriteFailed(true)
        );
      } else {
        revRef.current = rev;
        savedAtRef.current = savedAt;
        notifyOthers(rev);
        if (refs) pruneUnreferenced(refs).catch(() => {});
      }
    } catch (e) {
      // JSON.stringify bile başarısız olduysa (veri çok büyük) da bildir.
      setWriteFailed(true);
    }
  }, [notifyOthers, pullIfNewer]);

  useEffect(() => {
    if (!state.loaded) return undefined;
    if (skipWriteRef.current) {
      // Bu değişiklik depodan gelen tazeleme; geri yazma gereksiz.
      skipWriteRef.current = false;
      return undefined;
    }
    pendingRef.current = { trips: state.trips, settings: state.settings };
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(flushNow, 800);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [state.trips, state.settings, state.loaded, flushNow]);

  // Sekme kapanırken / gizlenirken bekleyen yazmayı kaybetme; geri
  // dönüldüğünde ise başka pencerenin yazdığı veriyi al.
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return undefined;
    const onHide = () => flushNow();
    const pullCheap = () => pullIfNewer(true);
    const onVisible = () => {
      if (document.visibilityState === 'hidden') flushNow();
      else pullCheap();
    };
    window.addEventListener('pagehide', onHide);
    window.addEventListener('beforeunload', onHide);
    window.addEventListener('focus', pullCheap);
    document.addEventListener('visibilitychange', onVisible);
    let ch = null;
    const onSync = (e) => {
      if (!e || !e.data || (Number(e.data.rev) || 0) > revRef.current) pullCheap();
    };
    const onStorage = (e) => {
      if (e && e.key === SYNC_KEY) pullCheap();
    };
    if (typeof window.BroadcastChannel === 'function') {
      ch = new window.BroadcastChannel(SYNC_CHANNEL);
      ch.addEventListener('message', onSync);
    } else {
      window.addEventListener('storage', onStorage);
    }
    return () => {
      window.removeEventListener('pagehide', onHide);
      window.removeEventListener('beforeunload', onHide);
      window.removeEventListener('focus', pullCheap);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('storage', onStorage);
      if (ch) ch.close();
    };
  }, [flushNow, pullIfNewer]);

  const value = useMemo(() => {
    const createTrip = ({ title, startDate, endDate, vehicle }) => {
      const trip = {
        id: uid('trip'),
        title: (title || '').trim() || 'Yeni Seyahat',
        startDate: startDate || todayKey(),
        endDate: endDate || '',
        vehicle: vehicle || DEFAULT_VEHICLE,
        finished: false,
        createdAt: new Date().toISOString(),
        checklist: createDefaultChecklist(vehicle || DEFAULT_VEHICLE),
        stops: [],
        discoveries: [],
        expenses: [],
        dayNotes: [],
        plan: [],
      };
      dispatch({ type: 'ADD_TRIP', trip });
      return trip.id;
    };

    const getTrip = (tripId) => state.trips.find((t) => t.id === tripId) || null;

    return {
      loaded: state.loaded,
      trips: state.trips,
      settings: state.settings,
      // son kaydetme denemesi başarısız mı? (depolama dolu vb.)
      writeFailed,
      // başka bir pencere veriyi güncellediği için bu pencere tazelendi mi?
      refreshedFromOther,
      // kayıtta referansı olup görüntüsü bulunamayan fotoğraf sayısı
      missingPhotos,
      // depoda veri varken boş/eksik durumla üzerine yazma engellendi mi?
      blockedLoss,
      // yedek dosyasından aktarım (birleştirilmiş seyahat listesiyle)
      importTrips: (trips, settings) => dispatch({ type: 'IMPORT_TRIPS', trips, settings }),
      ackRefreshed: () => setRefreshedFromOther(false),
      // trip
      createTrip,
      getTrip,
      updateTrip: (tripId, patch) => dispatch({ type: 'UPDATE_TRIP', tripId, patch }),
      removeTrip: (tripId) => dispatch({ type: 'REMOVE_TRIP', tripId }),
      finishTrip: (tripId) => dispatch({ type: 'UPDATE_TRIP', tripId, patch: { finished: true } }),
      reopenTrip: (tripId) => dispatch({ type: 'UPDATE_TRIP', tripId, patch: { finished: false } }),
      // checklist
      setCheckStatus: (tripId, itemId, status) => dispatch({ type: 'SET_CHECK_STATUS', tripId, itemId, status }),
      setCheckNote: (tripId, itemId, note) => dispatch({ type: 'SET_CHECK_NOTE', tripId, itemId, note }),
      setChecklist: (tripId, checklist) => dispatch({ type: 'SET_CHECKLIST', tripId, checklist }),
      addCheckItem: (tripId, title, icon) =>
        dispatch({ type: 'ADD_CHECK_ITEM', tripId, item: createChecklistItem(title, icon) }),
      removeCheckItem: (tripId, itemId) => dispatch({ type: 'REMOVE_CHECK_ITEM', tripId, itemId }),
      // stops
      addStop: (tripId, stop) => dispatch({ type: 'ADD_STOP', tripId, stop: { id: uid('stop'), ...stop } }),
      updateStop: (tripId, stopId, patch) => dispatch({ type: 'UPDATE_STOP', tripId, stopId, patch }),
      removeStop: (tripId, stopId) => dispatch({ type: 'REMOVE_STOP', tripId, stopId }),
      reorderStops: (tripId, stops) => dispatch({ type: 'REORDER_STOPS', tripId, stops }),
      // discoveries
      // Yeni keşfin KİMLİĞİNİ döndürür: çağıran (ör. günlük program) hemen o
      // keşfin detayına gidebilsin ve maddesini ona bağlayabilsin.
      addDiscovery: (tripId, discovery) => {
        const id = uid('disc');
        dispatch({ type: 'ADD_DISCOVERY', tripId, discovery: { ...discovery, id } });
        return id;
      },
      updateDiscovery: (tripId, discoveryId, patch) =>
        dispatch({ type: 'UPDATE_DISCOVERY', tripId, discoveryId, patch }),
      removeDiscovery: (tripId, discoveryId) => dispatch({ type: 'REMOVE_DISCOVERY', tripId, discoveryId }),
      // expenses
      addExpense: (tripId, expense) =>
        dispatch({ type: 'ADD_EXPENSE', tripId, expense: { id: uid('exp'), ...expense } }),
      updateExpense: (tripId, expenseId, patch) =>
        dispatch({ type: 'UPDATE_EXPENSE', tripId, expenseId, patch }),
      removeExpense: (tripId, expenseId) => dispatch({ type: 'REMOVE_EXPENSE', tripId, expenseId }),
      // günlük saatlik program
      setPlan: (tripId, plan) => dispatch({ type: 'SET_PLAN', tripId, plan }),
      addPlanItem: (tripId, item) => dispatch({ type: 'ADD_PLAN_ITEM', tripId, item }),
      updatePlanItem: (tripId, itemId, patch) => dispatch({ type: 'UPDATE_PLAN_ITEM', tripId, itemId, patch }),
      removePlanItem: (tripId, itemId) => dispatch({ type: 'REMOVE_PLAN_ITEM', tripId, itemId }),
      // günlük notlar
      addDayNote: (tripId, note) =>
        dispatch({ type: 'ADD_DAY_NOTE', tripId, note: { id: uid('day'), createdAt: new Date().toISOString(), ...note } }),
      updateDayNote: (tripId, noteId, patch) => dispatch({ type: 'UPDATE_DAY_NOTE', tripId, noteId, patch }),
      removeDayNote: (tripId, noteId) => dispatch({ type: 'REMOVE_DAY_NOTE', tripId, noteId }),
      // settings
      updateSettings: (patch) => dispatch({ type: 'UPDATE_SETTINGS', patch }),
      // harcama türleri (Ayarlar) — pasif tür seyahatlerde seçilemez ama geçmişte kalır
      addExpenseCategory: (label, icon) => {
        const name = (label || '').trim();
        if (!name) return null;
        const value = slugifyCategory(name);
        const custom = Array.isArray(state.settings.expenseCatsCustom) ? state.settings.expenseCatsCustom : [];
        const builtinHit = BUILTIN_EXPENSE_CATEGORIES.some((c) => c.value === value);
        const customHit = custom.some((c) => c.value === value);
        // Zaten varsa yeniden ekleme; pasifse aktifleştir.
        if (builtinHit || customHit) {
          dispatch({
            type: 'UPDATE_SETTINGS',
            patch: {
              expenseCatsInactive: (state.settings.expenseCatsInactive || []).filter((v) => v !== value),
            },
          });
          return value;
        }
        dispatch({
          type: 'UPDATE_SETTINGS',
          patch: {
            expenseCatsCustom: [...custom, { value, label: name, icon: (icon || '').trim() || '🔖' }],
            expenseCatsInactive: (state.settings.expenseCatsInactive || []).filter((v) => v !== value),
          },
        });
        return value;
      },
      // Türün adını/ikonunu değiştirir. ANAHTAR (value) korunur; bu yüzden o
      // türde girilmiş harcamalar yeni adla görünmeye devam eder.
      renameExpenseCategory: (value, label, icon) => {
        const name = (label || '').trim();
        if (!value || !name) return;
        const ov = { ...(state.settings.expenseCatsOverrides || {}) };
        ov[value] = { label: name, icon: (icon || '').trim() || ov[value]?.icon || '' };
        dispatch({ type: 'UPDATE_SETTINGS', patch: { expenseCatsOverrides: ov } });
      },
      // Yeniden adlandırmayı kaldırıp özgün ada döner.
      resetExpenseCategoryName: (value) => {
        const ov = { ...(state.settings.expenseCatsOverrides || {}) };
        delete ov[value];
        dispatch({ type: 'UPDATE_SETTINGS', patch: { expenseCatsOverrides: ov } });
      },
      // Kullanıcı türünü tamamen kaldırır (yalnızca hiç harcama girilmemişse çağrılmalı).
      deleteExpenseCategory: (value) => {
        const ov = { ...(state.settings.expenseCatsOverrides || {}) };
        delete ov[value];
        dispatch({
          type: 'UPDATE_SETTINGS',
          patch: {
            expenseCatsCustom: (state.settings.expenseCatsCustom || []).filter((c) => c.value !== value),
            expenseCatsInactive: (state.settings.expenseCatsInactive || []).filter((v) => v !== value),
            expenseCatsOverrides: ov,
          },
        });
      },
      // Türü pasifleştir / yeniden aktifleştir.
      setExpenseCategoryActive: (value, active) => {
        const cur = state.settings.expenseCatsInactive || [];
        const next = active ? cur.filter((v) => v !== value) : cur.includes(value) ? cur : [...cur, value];
        dispatch({ type: 'UPDATE_SETTINGS', patch: { expenseCatsInactive: next } });
      },
    };
  }, [state, writeFailed, refreshedFromOther, missingPhotos, blockedLoss]);

  return <JournalContext.Provider value={value}>{children}</JournalContext.Provider>;
}

export function useJournal() {
  const ctx = useContext(JournalContext);
  if (!ctx) throw new Error('useJournal must be used within JournalProvider');
  return ctx;
}
