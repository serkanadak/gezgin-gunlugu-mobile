import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '../state/JournalContext';
import { PLACES } from '../data/places';
import { storageEstimate, isStoragePersisted, requestPersistentStorage } from '../logic/storage';
import { buildBackup, backupFileName, parseBackup, mergeTrips, backupStats } from '../logic/backup';
import { canShareFiles, shareBackup, downloadBackup, pickBackupFile } from '../logic/backupFile';
import { scanSources, readSource } from '../logic/recovery';
import { deepScan, reportText, candidates, readEntry } from '../logic/deepScan';
import { tripAge, ageSummary } from '../logic/dataAge';
import { readPhotos } from '../logic/photoStore';
import { collectRefs, inlinePhotos } from '../logic/tripPhotos';
import { resolveCategories } from '../data/expenseCategories';
import { categoryUsage } from '../logic/expenseReport';
import { colors, THEMES, getThemeId, saveThemeId } from '../theme';
import { t, LANGS, getLang, saveLang } from '../i18n';
import {
  Card,
  Field,
  ChipPicker,
  SectionHeader,
  ProgressBar,
  ConfirmModal,
  SecondaryButton,
} from '../components/common';

// Bir renk paleti önizleme kartı — zemin, yazı ve iki vurgu rengini gösterir.
function ThemeOption({ theme, selected, onPress }) {
  const p = theme.palette;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.themeCard,
        { backgroundColor: p.bg, borderColor: selected ? p.primary : colors.border },
        selected && styles.themeCardSelected,
        pressed && { opacity: 0.9 },
      ]}
    >
      <View style={styles.themeSwatches}>
        <View style={[styles.swatch, { backgroundColor: p.surfaceAlt }]} />
        <View style={[styles.swatch, { backgroundColor: p.primary }]} />
        <View style={[styles.swatch, { backgroundColor: p.accent }]} />
      </View>
      <Text style={[styles.themeLabel, { color: p.text }]}>
        {theme.emoji} {t('theme.' + theme.id)}
      </Text>
      <Text style={[styles.themeCheck, { color: p.primary }]}>{selected ? t('set.themeSelected') : t('set.themeSelect')}</Text>
    </Pressable>
  );
}

function fmtBytes(n) {
  if (!n) return '0 MB';
  const mb = n / 1048576;
  if (mb >= 1024) return `${(mb / 1024).toFixed(2)} GB`;
  return `${mb.toFixed(mb < 10 ? 1 : 0)} MB`;
}

function photoCountOf(trips) {
  let n = 0;
  for (const tr of trips) {
    for (const d of tr.discoveries || []) {
      const arr = Array.isArray(d.photos) && d.photos.length ? d.photos : d.photoUri ? [d.photoUri] : [];
      n += arr.length;
    }
  }
  return n;
}

export default function SettingsScreen() {
  const {
    settings,
    updateSettings,
    trips,
    addExpenseCategory,
    deleteExpenseCategory,
    setExpenseCategoryActive,
    renameExpenseCategory,
    resetExpenseCategoryName,
    writeFailed,
    missingPhotos,
    importTrips,
    blockedLoss,
  } = useJournal();

  // --- Harcama türleri ---
  const catalog = resolveCategories(settings);
  const usage = categoryUsage(trips);
  const [newCatLabel, setNewCatLabel] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('');
  const [pendingCatDelete, setPendingCatDelete] = useState(null); // silinecek tür
  const [editCat, setEditCat] = useState(null); // { value, label, icon } — adı düzenlenen tür

  const startEdit = (c) => setEditCat({ value: c.value, label: c.label, icon: c.icon });
  const saveEdit = () => {
    if (!editCat || !editCat.label.trim()) return;
    renameExpenseCategory(editCat.value, editCat.label, editCat.icon);
    setEditCat(null);
  };

  const addCat = () => {
    const name = newCatLabel.trim();
    if (!name) return;
    addExpenseCategory(name, newCatIcon);
    setNewCatLabel('');
    setNewCatIcon('');
  };

  const totalDiscoveries = trips.reduce((n, tr) => n + (tr.discoveries || []).length, 0);
  const photoCount = photoCountOf(trips);

  const [storage, setStorage] = useState(undefined); // undefined: yükleniyor, null: yok
  useEffect(() => {
    let alive = true;
    storageEstimate().then((e) => {
      if (alive) setStorage(e);
    });
    return () => {
      alive = false;
    };
  }, [photoCount, totalDiscoveries]);

  // Veri kalıcı kovada mı? Değilse tarayıcı (özellikle iOS Safari, 7 gün
  // kullanılmayan siteler için) fotoğrafları silebiliyor.
  const [persisted, setPersisted] = useState(undefined);
  const [asking, setAsking] = useState(false);
  useEffect(() => {
    let alive = true;
    isStoragePersisted().then((v) => {
      if (alive) setPersisted(v);
    });
    return () => {
      alive = false;
    };
  }, []);
  const askPersist = async () => {
    setAsking(true);
    const r = await requestPersistentStorage();
    setPersisted(r.supported ? r.persisted : null);
    setAsking(false);
  };

  // --- YEDEKLE / TAŞI ---
  // Ana ekrana eklenen uygulama ayrı bir depolama alanı kullanabildiği için
  // veriyi tek dosyayla taşımak gerekiyor (bkz. logic/backup.js).
  const [backupBusy, setBackupBusy] = useState('');
  const [backupNote, setBackupNote] = useState('');
  const [backupErr, setBackupErr] = useState('');
  const [pendingImport, setPendingImport] = useState(null); // { trips, settings, stats, merge }
  const currentTrips = trips;
  const mineStats = backupStats(trips);

  const doExport = async (share) => {
    setBackupErr('');
    setBackupNote('');
    setBackupBusy(share ? 'share' : 'save');
    try {
      const text = buildBackup(trips, settings);
      const name = backupFileName();
      const ok = share ? await shareBackup(text, name) : downloadBackup(text, name);
      if (ok) {
        // Hatırlatıcı bu ikisine bakıyor: en son ne zaman ve hangi hacimde
        // yedek alındı.
        updateSettings({ lastBackupAt: Date.now(), lastBackupStats: mineStats });
        setBackupNote(t('backup.saved', { mb: (text.length / 1048576).toFixed(1) }));
      }
      else setBackupErr(t('backup.saveFailed'));
    } catch (e) {
      setBackupErr(t('backup.saveFailed'));
    } finally {
      setBackupBusy('');
    }
  };

  const doPickImport = async () => {
    setBackupErr('');
    setBackupNote('');
    setBackupBusy('pick');
    try {
      const text = await pickBackupFile();
      if (!text) return;
      const parsed = parseBackup(text, {
        notJson: t('backup.errNotJson'),
        notBackup: t('backup.errNotBackup'),
        otherApp: t('backup.errOtherApp'),
        empty: t('backup.errEmpty'),
      });
      const merged = mergeTrips(trips, parsed.trips);
      setPendingImport({ ...parsed, merged, stats: backupStats(parsed.trips) });
    } catch (e) {
      setBackupErr(e.message || t('backup.errNotBackup'));
    } finally {
      setBackupBusy('');
    }
  };

  const confirmImport = () => {
    if (!pendingImport) return;
    importTrips(pendingImport.merged.trips, pendingImport.settings);
    setBackupNote(
      t('backup.imported', { added: pendingImport.merged.added, updated: pendingImport.merged.updated })
    );
    setPendingImport(null);
  };

  // --- VERİ KURTARMA ---
  // Veri birkaç ayrı yerde bulunabiliyor ve uygulama yanlış/eksik olanı
  // yüklemiş olabilir. Burada hepsi listelenir, kullanıcı en zenginini geri
  // yükleyebilir. Hiçbir kaynak silinmez.
  const [scan, setScan] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [recoverNote, setRecoverNote] = useState('');
  const [pendingRecover, setPendingRecover] = useState(null);

  // VERİ YAŞI: "bu gördüklerim yeni girdiklerim mi, eski verim mi?"
  // Kayıt kimlikleri oluşturulma zamanını taşıyor (bkz. logic/dataAge.js).
  const age = ageSummary(trips);
  const fmtStamp = (ms) => {
    if (!ms) return '—';
    const d = new Date(ms);
    const p = (n) => String(n).padStart(2, '0');
    return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
  };

  // DERİN TARAMA: bu origin'deki her veritabanı, her depo, her anahtar.
  const [deep, setDeep] = useState(null);
  const [deepBusy, setDeepBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const doDeepScan = async () => {
    setDeepBusy(true);
    setCopied(false);
    setRecoverNote('');
    try {
      const r = await deepScan();
      setDeep({ r, text: reportText(r), cands: candidates(r) });
    } catch (e) {
      setDeep({ r: null, text: 'Tarama başarısız: ' + (e.message || ''), cands: [] });
    } finally {
      setDeepBusy(false);
    }
  };
  const copyReport = async () => {
    if (!deep) return;
    try {
      await navigator.clipboard.writeText(deep.text);
      setCopied(true);
    } catch (e) {
      setCopied(false);
    }
  };
  // Rapordaki bir kaydı doğrudan geri yükle.
  const recoverEntry = async (c) => {
    setRecoverNote('');
    try {
      const data = c.source === 'local' ? JSON.parse(window.localStorage.getItem(c.key)) : await readEntry(c);
      if (!data || !Array.isArray(data.trips) || !data.trips.length) {
        setRecoverNote(t('rec.emptySource'));
        return;
      }
      let trips = data.trips;
      const refs = collectRefs(trips);
      if (refs.size) {
        const byId = await readPhotos(refs);
        trips = inlinePhotos(trips, byId).trips;
      }
      const merged = mergeTrips(currentTrips, trips);
      setPendingRecover({ src: { label: c.db + ' / ' + c.key }, merged, count: trips.length });
    } catch (e) {
      setRecoverNote(t('rec.failed'));
    }
  };

  const doScan = async () => {
    setScanning(true);
    setRecoverNote('');
    try {
      setScan(await scanSources('@gezgin_gunlugu_v1'));
    } catch (e) {
      setScan({ sources: [], photoRecords: null, error: e.message });
    } finally {
      setScanning(false);
    }
  };

  const doRecover = async (src) => {
    setRecoverNote('');
    try {
      const data = await readSource(src);
      if (!data || !Array.isArray(data.trips) || !data.trips.length) {
        setRecoverNote(t('rec.emptySource'));
        return;
      }
      let trips = data.trips;
      // Referanslı kayıtsa fotoğrafları ayrı kayıtlardan çöz.
      const refs = collectRefs(trips);
      if (refs.size) {
        const byId = await readPhotos(refs);
        trips = inlinePhotos(trips, byId).trips;
      }
      const merged = mergeTrips(currentTrips, trips);
      setPendingRecover({ src, merged, count: trips.length });
    } catch (e) {
      setRecoverNote(t('rec.failed'));
    }
  };

  const confirmRecover = () => {
    if (!pendingRecover) return;
    importTrips(pendingRecover.merged.trips, null);
    setRecoverNote(
      t('backup.imported', { added: pendingRecover.merged.added, updated: pendingRecover.merged.updated })
    );
    setPendingRecover(null);
    setScan(null);
  };

  const ratio = storage && storage.quota ? Math.min(1, storage.usage / storage.quota) : 0;
  const barColor = ratio > 0.9 ? colors.danger : ratio > 0.7 ? colors.primary : colors.success;

  // Aktif palet önyüklemede localStorage'dan gelir; seçim onun kimliğiyle eşleşir.
  const activeTheme = getThemeId();
  const [pendingTheme, setPendingTheme] = useState(null);

  // Dil: tema gibi önyüklemede okunur; seçim değişince sayfa bir kez yenilenir.
  const activeLangId = getLang();
  const [pendingLang, setPendingLang] = useState(null);
  const applyLang = (id) => {
    saveLang(id);
    updateSettings({ lang: id });
    setPendingLang(null);
    if (Platform.OS === 'web' && typeof window !== 'undefined') window.location.reload();
  };

  const chooseTheme = (id) => {
    if (id === activeTheme) return;
    setPendingTheme(id);
  };

  const applyTheme = (id) => {
    saveThemeId(id); // önyüklemede uygulanacak palet
    updateSettings({ theme: id }); // durum/dışa aktarma için de sakla
    setPendingTheme(null);
    // Palet, StyleSheet'ler modül yüklenirken oluştuğundan sayfa yenilenince uygulanır.
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.appName}>{t('set.title')}</Text>
        </View>

        <SectionHeader title={t('set.lang')} subtitle={t('set.langSub')} />
        <Card>
          <ChipPicker
            options={LANGS.map((l) => ({ value: l.id }))}
            value={activeLangId}
            onChange={(id) => {
              if (id !== activeLangId) setPendingLang(id);
            }}
            renderLabel={(o) => {
              const l = LANGS.find((x) => x.id === o.value);
              return `${l.flag} ${l.label}`;
            }}
          />
          <Text style={styles.hint}>{t('set.langNote')}</Text>
        </Card>

        <SectionHeader
          title={t('set.theme')}
          subtitle={t('set.themeSub')}
        />
        <Card>
          <View style={styles.themeGrid}>
            {Object.values(THEMES).map((th) => (
              <ThemeOption
                key={th.id}
                theme={th}
                selected={th.id === activeTheme}
                onPress={() => chooseTheme(th.id)}
              />
            ))}
          </View>
          <Text style={styles.hint}>
            {t('set.themeHint')}
          </Text>
        </Card>

        <SectionHeader
          title={t('catmgr.title')}
          subtitle={t('catmgr.sub')}
        />
        <Card>
          {catalog.map((c) => {
            const used = usage[c.value] || 0;
            const canDelete = !c.builtin && used === 0; // kullanılmamış kullanıcı türü tamamen silinir
            const editing = editCat && editCat.value === c.value;

            if (editing) {
              return (
                <View key={c.value} style={styles.catEditBox}>
                  <Text style={styles.catEditTitle}>{t('catmgr.renameTitle')}</Text>
                  <View style={styles.catAddRow}>
                    <View style={{ flex: 1 }}>
                      <Field
                        value={editCat.label}
                        onChangeText={(v) => setEditCat((s) => ({ ...s, label: v }))}
                        placeholder={t('catmgr.nameField')}
                      />
                    </View>
                    <View style={{ width: 88 }}>
                      <Field
                        value={editCat.icon}
                        onChangeText={(v) => setEditCat((s) => ({ ...s, icon: v }))}
                        placeholder="🔖"
                      />
                    </View>
                  </View>
                  <Text style={styles.catMeta}>
                    {t('catmgr.renameHint', { n: used || 0 })}
                  </Text>
                  <View style={styles.catEditActions}>
                    <Pressable onPress={saveEdit} hitSlop={8} disabled={!editCat.label.trim()}>
                      <Text style={[styles.catAction, !editCat.label.trim() && styles.catActionMuted]}>{t('common.save')}</Text>
                    </Pressable>
                    <Pressable onPress={() => setEditCat(null)} hitSlop={8}>
                      <Text style={styles.catActionMuted}>{t('common.cancel')}</Text>
                    </Pressable>
                    {c.renamed ? (
                      <Pressable
                        onPress={() => {
                          resetExpenseCategoryName(c.value);
                          setEditCat(null);
                        }}
                        hitSlop={8}
                      >
                        <Text style={styles.catActionMuted}>{t('catmgr.resetName')}</Text>
                      </Pressable>
                    ) : null}
                  </View>
                </View>
              );
            }

            return (
              <View key={c.value} style={styles.catRow}>
                <Pressable style={{ flex: 1 }} onPress={() => startEdit(c)}>
                  <Text style={[styles.catName, !c.active && styles.catNamePassive]}>
                    {c.icon} {c.label}
                    {c.builtin ? '' : t('catmgr.added')}
                  </Text>
                  <Text style={styles.catMeta}>
                    {c.active ? t('catmgr.active') : t('catmgr.passive')}
                    {used ? t('catmgr.usedN', { n: used }) : t('catmgr.unused')}
                  </Text>
                </Pressable>
                <Pressable onPress={() => startEdit(c)} hitSlop={8}>
                  <Text style={styles.catAction}>✏️</Text>
                </Pressable>
                <Pressable onPress={() => setExpenseCategoryActive(c.value, !c.active)} hitSlop={8}>
                  <Text style={[styles.catAction, c.active && styles.catActionMuted]}>
                    {c.active ? t('catmgr.deactivate') : t('catmgr.activate')}
                  </Text>
                </Pressable>
                {canDelete ? (
                  <Pressable onPress={() => setPendingCatDelete(c)} hitSlop={8}>
                    <Text style={styles.catDelete}>{t('common.delete')}</Text>
                  </Pressable>
                ) : null}
              </View>
            );
          })}

          <View style={styles.catAddBox}>
            <Text style={styles.label}>{t('catmgr.newLabel')}</Text>
            <View style={styles.catAddRow}>
              <View style={{ flex: 1 }}>
                <Field
                  value={newCatLabel}
                  onChangeText={setNewCatLabel}
                  placeholder={t('catmgr.namePlaceholder')}
                />
              </View>
              <View style={{ width: 88 }}>
                <Field value={newCatIcon} onChangeText={setNewCatIcon} placeholder="🅿️" />
              </View>
            </View>
            <SecondaryButton
              title={t('catmgr.addBtn')}
              onPress={addCat}
              disabled={!newCatLabel.trim()}
              style={{ marginHorizontal: 0, marginTop: 4 }}
            />
          </View>

          <Text style={styles.hint}>
            {t('catmgr.hint')}
          </Text>
        </Card>

        <SectionHeader
          title={t('set.roadTitle')}
          subtitle={t('set.roadSub')}
        />
        <Card>
          <ChipPicker
            options={[
              { value: 'on', label: t('set.roadOn') },
              { value: 'off', label: t('set.roadOff') },
            ]}
            value={settings.roadOnline ? 'on' : 'off'}
            onChange={(v) => updateSettings({ roadOnline: v === 'on' })}
            renderLabel={(o) => o.label}
          />
          <Text style={styles.hint}>
            {settings.roadOnline ? t('set.roadOnHint') : t('set.roadOffHint')}
          </Text>
        </Card>

        <SectionHeader
          title={t('set.aiTitle')}
          subtitle={t('set.aiSub')}
        />
        <Card>
          <ChipPicker
            options={[
              { value: 'local', label: t('set.aiLocal') },
              { value: 'ai', label: t('set.aiLive') },
            ]}
            value={settings.aiMode}
            onChange={(v) => updateSettings({ aiMode: v })}
            renderLabel={(o) => o.label}
          />
          {settings.aiMode === 'local' ? (
            <Text style={styles.hint}>
              {t('set.aiLocalHint', { n: PLACES.length })}
            </Text>
          ) : (
            <Text style={styles.hint}>
              {t('set.aiLiveHint')}
            </Text>
          )}
        </Card>

        {settings.aiMode === 'ai' ? (
          <>
            <SectionHeader title={t('set.providerTitle')} subtitle={t('set.providerSub')} />
            <Card>
              <Text style={styles.label}>{t('set.provider')}</Text>
              <ChipPicker
                options={[
                  { value: 'openai', label: 'OpenAI' },
                  { value: 'claude', label: 'Anthropic (Claude)' },
                ]}
                value={settings.apiProvider}
                onChange={(v) => updateSettings({ apiProvider: v })}
                renderLabel={(o) => o.label}
              />
              <Field
                label={t('set.apiKey')}
                value={settings.apiKey}
                onChangeText={(v) => updateSettings({ apiKey: v })}
                placeholder={settings.apiProvider === 'claude' ? 'sk-ant-...' : 'sk-...'}
                autoCapitalize="none"
              />
              <Field
                label={t('set.model')}
                value={settings.apiModel}
                onChangeText={(v) => updateSettings({ apiModel: v })}
                placeholder={settings.apiProvider === 'claude' ? 'claude-3-5-sonnet-latest' : 'gpt-4o-mini'}
                autoCapitalize="none"
              />
              <Text style={styles.warn}>
                {t('set.keyWarn')}
              </Text>
            </Card>
          </>
        ) : null}

        {trips.length ? (
          <>
            <SectionHeader title={t('age.title')} subtitle={t('age.sub')} />
            <Card>
              <Text style={age.hasOld ? styles.okLine : styles.hint}>
                {age.hasOld
                  ? t('age.mixed', { old: age.oldCount, today: age.todayCount, oldest: fmtStamp(age.oldest) })
                  : t('age.allNew', { n: age.todayCount })}
              </Text>
              {trips.map((tr) => {
                const a = tripAge(tr);
                return (
                  <View key={tr.id} style={styles.recRow}>
                    <Text style={styles.recLabel}>{tr.title || t('nav.trip')}</Text>
                    <Text style={styles.recMeta}>
                      {t('age.tripLine', {
                        created: fmtStamp(a.created),
                        first: fmtStamp(a.first),
                        last: fmtStamp(a.last),
                      })}
                    </Text>
                    <Text style={styles.recMeta}>
                      {t('age.tripCounts', {
                        stops: a.counts.stops,
                        disc: a.counts.discoveries,
                        exp: a.counts.expenses,
                        notes: a.counts.dayNotes,
                      })}
                      {a.unknown ? t('age.unknown', { n: a.unknown }) : ''}
                    </Text>
                  </View>
                );
              })}
            </Card>
          </>
        ) : null}

        <SectionHeader title={t('rec.title')} subtitle={t('rec.sub')} />
        <Card>
          {blockedLoss ? (
            <Text style={styles.warn}>
              {t('set.blockedLoss', { disc: blockedLoss.discoveries, exp: blockedLoss.expenses })}
            </Text>
          ) : null}
          <SecondaryButton
            title={scanning ? t('common.preparing') : t('rec.scan')}
            onPress={doScan}
            disabled={scanning}
            style={{ marginHorizontal: 0 }}
          />
          {scan ? (
            <View style={{ marginTop: 12 }}>
              {scan.error ? <Text style={styles.warn}>{t('rec.scanError', { msg: scan.error })}</Text> : null}
              <Text style={styles.hint}>
                {t('rec.photoRecords', { n: scan.photoRecords == null ? '?' : scan.photoRecords })}
              </Text>
              {scan.sources.length ? (
                scan.sources.map((src) => (
                  <View key={src.source + src.key} style={styles.recRow}>
                    <Text style={styles.recLabel}>{src.label}</Text>
                    {src.ok ? (
                      <Text style={styles.recMeta}>
                        {t('rec.counts', {
                          trips: src.counts.trips,
                          disc: src.counts.discoveries,
                          exp: src.counts.expenses,
                          photos: src.counts.photos,
                          mb: (src.bytes / 1048576).toFixed(2),
                        })}
                      </Text>
                    ) : (
                      <Text style={styles.recMeta}>{src.error}</Text>
                    )}
                    {src.ok ? (
                      <Pressable onPress={() => doRecover(src)} hitSlop={6}>
                        <Text style={styles.recBtn}>{t('rec.use')}</Text>
                      </Pressable>
                    ) : null}
                  </View>
                ))
              ) : (
                <Text style={styles.warn}>{t('rec.none')}</Text>
              )}
            </View>
          ) : null}
          {recoverNote ? <Text style={styles.okLine}>{recoverNote}</Text> : null}
          <Text style={styles.hint}>{t('rec.howto')}</Text>

          <SecondaryButton
            title={deepBusy ? t('common.preparing') : t('rec.deep')}
            onPress={doDeepScan}
            disabled={deepBusy}
            style={{ marginHorizontal: 0, marginTop: 14 }}
          />
          {deep ? (
            <View style={{ marginTop: 10 }}>
              {deep.cands.length ? (
                <>
                  <Text style={styles.subLabel}>{t('rec.found', { n: deep.cands.length })}</Text>
                  {deep.cands.map((c) => (
                    <View key={c.db + c.store + c.key} style={styles.recRow}>
                      <Text style={styles.recLabel}>{c.db} / {c.key}</Text>
                      <Text style={styles.recMeta}>
                        {t('rec.counts', {
                          trips: c.peek.trips, disc: c.peek.disc, exp: c.peek.exp,
                          photos: c.peek.photos, mb: (c.bytes / 1048576).toFixed(2),
                        })}
                      </Text>
                      <Pressable onPress={() => recoverEntry(c)} hitSlop={6}>
                        <Text style={styles.recBtn}>{t('rec.use')}</Text>
                      </Pressable>
                    </View>
                  ))}
                </>
              ) : (
                <Text style={styles.warn}>{t('rec.deepNone')}</Text>
              )}
              <Pressable onPress={copyReport} hitSlop={6}>
                <Text style={styles.recBtn}>{copied ? t('common.copied') : t('rec.copy')}</Text>
              </Pressable>
              <Text style={styles.report} selectable>{deep.text}</Text>
            </View>
          ) : null}
        </Card>

        <SectionHeader title={t('backup.title')} subtitle={t('backup.sub')} />
        <Card>
          <Text style={styles.hint}>
            {t('backup.mine', { trips: mineStats.trips, disc: mineStats.discoveries, photos: mineStats.photos })}
          </Text>
          {canShareFiles() ? (
            <SecondaryButton
              title={backupBusy === 'share' ? t('common.preparing') : t('backup.share')}
              onPress={() => doExport(true)}
              disabled={!!backupBusy || !mineStats.trips}
              style={{ marginHorizontal: 0, marginTop: 12 }}
            />
          ) : null}
          <SecondaryButton
            title={backupBusy === 'save' ? t('common.preparing') : t('backup.save')}
            onPress={() => doExport(false)}
            disabled={!!backupBusy || !mineStats.trips}
            style={{ marginHorizontal: 0, marginTop: 10 }}
          />
          <SecondaryButton
            title={backupBusy === 'pick' ? t('common.preparing') : t('backup.load')}
            onPress={doPickImport}
            disabled={!!backupBusy}
            style={{ marginHorizontal: 0, marginTop: 10 }}
          />
          {backupNote ? <Text style={styles.okLine}>{backupNote}</Text> : null}
          {backupErr ? <Text style={styles.warn}>{backupErr}</Text> : null}
          <Text style={styles.hint}>{t('backup.howto')}</Text>
        </Card>

        <SectionHeader title={t('set.storage')} subtitle={t('set.storageSub')} />
        <Card>
          {writeFailed ? <Text style={styles.warn}>{t('set.writeFailed')}</Text> : null}
          {missingPhotos ? <Text style={styles.warn}>{t('set.missingPhotos', { n: missingPhotos })}</Text> : null}
          {persisted === true ? (
            <Text style={styles.okLine}>{t('set.persistOn')}</Text>
          ) : persisted === false ? (
            <>
              <Text style={styles.warn}>{t('set.persistOff')}</Text>
              <SecondaryButton
                title={asking ? t('common.preparing') : t('set.persistAsk')}
                onPress={askPersist}
                disabled={asking}
                style={{ marginHorizontal: 0, marginTop: 10 }}
              />
              <Text style={styles.hint}>{t('set.persistHint')}</Text>
            </>
          ) : null}
          {storage === undefined ? (
            <Text style={styles.hint}>{t('set.storageCalc')}</Text>
          ) : storage && storage.quota ? (
            <>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>{t('set.used')}</Text>
                <Text style={styles.statVal}>
                  {fmtBytes(storage.usage)} / {fmtBytes(storage.quota)}
                </Text>
              </View>
              <View style={{ marginTop: 8 }}>
                <ProgressBar ratio={ratio} color={barColor} />
              </View>
              <Text style={styles.hint}>
                {t('set.storageMeta', { pct: Math.round(ratio * 100), photos: photoCount, disc: totalDiscoveries })}
              </Text>
              {ratio > 0.85 ? (
                <Text style={styles.warn}>
                  {t('set.storageWarn')}
                </Text>
              ) : null}
            </>
          ) : (
            <Text style={styles.hint}>
              {t('set.storageNoEstimate', { photos: photoCount, disc: totalDiscoveries })}
            </Text>
          )}
        </Card>

        <SectionHeader title={t('set.summary')} />
        <Card>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>{t('set.tripCount')}</Text>
            <Text style={styles.statVal}>{trips.length}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>{t('set.discTotal')}</Text>
            <Text style={styles.statVal}>{totalDiscoveries}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>{t('set.archiveCount')}</Text>
            <Text style={styles.statVal}>{PLACES.length}</Text>
          </View>
        </Card>

        <Text style={styles.about}>
          {t('set.about')}
        </Text>
      </ScrollView>

      <ConfirmModal
        visible={!!pendingRecover}
        title={t('rec.confirmTitle')}
        message={
          pendingRecover
            ? t('rec.confirmMsg', {
                label: pendingRecover.src.label,
                trips: pendingRecover.count,
                added: pendingRecover.merged.added,
                updated: pendingRecover.merged.updated,
              })
            : ''
        }
        confirmLabel={t('rec.confirmBtn')}
        onConfirm={confirmRecover}
        onCancel={() => setPendingRecover(null)}
      />
      <ConfirmModal
        visible={!!pendingImport}
        title={t('backup.confirmTitle')}
        message={
          pendingImport
            ? t('backup.confirmMsg', {
                trips: pendingImport.stats.trips,
                disc: pendingImport.stats.discoveries,
                photos: pendingImport.stats.photos,
                added: pendingImport.merged.added,
                updated: pendingImport.merged.updated,
              })
            : ''
        }
        confirmLabel={t('backup.confirmBtn')}
        onConfirm={confirmImport}
        onCancel={() => setPendingImport(null)}
      />
      <ConfirmModal
        visible={!!pendingLang}
        title={t('set.langConfirm')}
        message={
          pendingLang
            ? t('set.langConfirmMsg', {
                lang: `${(LANGS.find((l) => l.id === pendingLang) || {}).flag || ''} ${
                  (LANGS.find((l) => l.id === pendingLang) || {}).label || ''
                }`.trim(),
              })
            : ''
        }
        confirmLabel={t('set.apply')}
        onConfirm={() => applyLang(pendingLang)}
        onCancel={() => setPendingLang(null)}
      />

      <ConfirmModal
        visible={!!pendingCatDelete}
        title={t('catmgr.deleteConfirm')}
        message={pendingCatDelete ? t('catmgr.deleteConfirmMsg', { name: pendingCatDelete.label }) : ''}
        confirmLabel={t('common.delete')}
        destructive
        onConfirm={() => {
          deleteExpenseCategory(pendingCatDelete.value);
          setPendingCatDelete(null);
        }}
        onCancel={() => setPendingCatDelete(null)}
      />

      <ConfirmModal
        visible={!!pendingTheme}
        title={t('set.themeConfirm')}
        message={
          pendingTheme
            ? t('set.themeConfirmMsg', {
                theme: `${THEMES[pendingTheme].emoji} ${t('theme.' + pendingTheme)}`,
              })
            : ''
        }
        confirmLabel={t('set.apply')}
        onConfirm={() => applyTheme(pendingTheme)}
        onCancel={() => setPendingTheme(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  appName: { color: colors.text, fontSize: 22, fontWeight: '800' },
  themeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  themeCard: {
    width: '47%',
    flexGrow: 1,
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  themeCardSelected: { borderWidth: 2 },
  themeSwatches: { flexDirection: 'row', gap: 6 },
  swatch: { width: 26, height: 26, borderRadius: 6 },
  themeLabel: { fontSize: 15, fontWeight: '800' },
  themeCheck: { fontSize: 12, fontWeight: '700' },
  label: { color: colors.textMuted, fontSize: 12, marginBottom: 6, marginTop: 12 },
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  catName: { color: colors.text, fontSize: 14, fontWeight: '700' },
  catNamePassive: { color: colors.textMuted, textDecorationLine: 'line-through' },
  catMeta: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  catAction: { color: colors.primary, fontSize: 12, fontWeight: '800' },
  catActionMuted: { color: colors.textMuted },
  catDelete: { color: colors.danger, fontSize: 12, fontWeight: '800' },
  catEditBox: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    backgroundColor: colors.surfaceAlt,
  },
  catEditTitle: { color: colors.text, fontSize: 13, fontWeight: '800' },
  catEditActions: { flexDirection: 'row', alignItems: 'center', gap: 18, marginTop: 12 },
  catAddBox: { marginTop: 6 },
  catAddRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  hint: { color: colors.textMuted, fontSize: 12, marginTop: 12, lineHeight: 18 },
  warn: { color: colors.primary, fontSize: 12, marginTop: 12, lineHeight: 17 },
  okLine: { color: colors.success, fontSize: 12, marginTop: 12, lineHeight: 17 },
  recRow: { borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: 10 },
  recLabel: { color: colors.text, fontSize: 13, fontWeight: '700' },
  recMeta: { color: colors.textMuted, fontSize: 12, marginTop: 3, lineHeight: 17 },
  recBtn: { color: colors.primary, fontSize: 13, fontWeight: '800', marginTop: 6 },
  report: {
    color: colors.textMuted,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 10,
    fontFamily: Platform.OS === 'web' ? 'monospace' : undefined,
  },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  statLabel: { color: colors.textMuted, fontSize: 14 },
  statVal: { color: colors.text, fontSize: 14, fontWeight: '700' },
  about: { color: colors.textMuted, fontSize: 12, textAlign: 'center', paddingHorizontal: 24, marginTop: 20, lineHeight: 18 },
});
