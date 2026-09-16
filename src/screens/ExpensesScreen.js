import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '../state/JournalContext';
import { pickImages } from '../logic/imagePicker';
import { preparePhoto } from '../logic/imageStore';
import { readReceipt } from '../logic/receipt';
import { getRates, convertAll, formatMoney, currencySymbol, CURRENCIES, TARGETS } from '../logic/fx';
import {
  DEFAULT_EXPENSE_CATEGORY,
  resolveCategories,
  activeCategories,
  catLabel,
  catIcon,
} from '../data/expenseCategories';
import { PAYMENT_METHODS, DEFAULT_PAYMENT, paymentLabel, paymentIcon } from '../data/paymentMethods';
import { todayKey, isValidDateKey, formatShortDate } from '../logic/date';
import { colors } from '../theme';
import { t } from '../i18n';
import { Field, ChipPicker, PrimaryButton, SecondaryButton, ConfirmModal, EmptyState, Card } from '../components/common';

// Saklanan fiş görüntüsü ayarı: okunaklı ama küçük (veri tek JSON blob'unda tutulur).
const RECEIPT_STORE_OPTS = { maxPx: 900, quality: 0.5 };

function emptyForm() {
  return {
    kind: DEFAULT_EXPENSE_CATEGORY,
    label: '',
    amount: '',
    currency: 'EUR',
    payment: DEFAULT_PAYMENT,
    stopId: null,
    date: todayKey(),
    receiptPhoto: null,
  };
}

export default function ExpensesScreen({ route, navigation }) {
  const { tripId } = route.params;
  const { getTrip, addExpense, updateExpense, removeExpense, settings } = useJournal();
  const trip = getTrip(tripId);

  const [form, setForm] = useState(null); // null = form kapalı
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [reading, setReading] = useState(false);
  const [notice, setNotice] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [filterKind, setFilterKind] = useState('all'); // 'all' | kategori değeri

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('nav.expenses'),
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate('ExpenseReport', { tripId })} hitSlop={10}>
          <Text style={{ color: colors.primary, fontWeight: '700' }}>{t('exp.report')}</Text>
        </Pressable>
      ),
    });
  }, [navigation, tripId]);

  if (!trip) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState icon="🧾" title={t('exp.notFound')} />
      </SafeAreaView>
    );
  }

  const allExpenses = [...(trip.expenses || [])].sort((a, b) => ((a.date || '') < (b.date || '') ? 1 : -1));
  // Bu seyahatte GERÇEKTEN kullanılmış türler (adetleriyle) — filtre şeridi için.
  const usedCounts = allExpenses.reduce((m, e) => {
    const k = e.kind || 'diger';
    m[k] = (m[k] || 0) + 1;
    return m;
  }, {});
  // Türe göre süzülmüş liste; toplamlar da bu listeden hesaplanır.
  const expenses = filterKind === 'all' ? allExpenses : allExpenses.filter((e) => (e.kind || 'diger') === filterKind);

  // Tüm türler (etiket okumak için) ve yalnızca aktif olanlar (seçim için).
  const catalog = resolveCategories(settings);
  const activeList = activeCategories(settings);
  // Hepsi pasifleştirilmişse kilitlenmemek için tüm katalogu göster.
  const active = activeList.length ? activeList : catalog;
  // Düzenlenen kayıt pasif bir türdeyse onu da seçenekler arasında tut ki
  // kullanıcı istemeden türü değiştirmek zorunda kalmasın.
  const pickable =
    form && form.kind && !active.some((c) => c.value === form.kind)
      ? [...active, ...catalog.filter((c) => c.value === form.kind)]
      : active;
  // Harcamanın bağlanabileceği güzergah durakları.
  const stops = trip.stops || [];
  const stopName = (id) => {
    const i = stops.findIndex((st) => st.id === id);
    return i >= 0 ? `${i + 1}. ${stops[i].name}` : null;
  };

  // Yeni kayıt için varsayılan tür: aktifse 'yemek', değilse ilk aktif tür.
  const defaultKind = active.some((c) => c.value === DEFAULT_EXPENSE_CATEGORY)
    ? DEFAULT_EXPENSE_CATEGORY
    : (active[0] && active[0].value) || DEFAULT_EXPENSE_CATEGORY;

  // EUR/USD/TL toplamları (çevrimi olan harcamalar üzerinden).
  const totals = { EUR: 0, USD: 0, TRY: 0 };
  let missing = 0;
  for (const e of expenses) {
    if (e.eq) {
      for (const code of TARGETS) if (typeof e.eq[code] === 'number') totals[code] += e.eq[code];
    } else {
      missing += 1;
    }
  }

  const openAdd = () => {
    setForm({ ...emptyForm(), kind: defaultKind });
    setEditingId(null);
    setNotice('');
  };
  const openEdit = (e) => {
    setForm({
      kind: e.kind || DEFAULT_EXPENSE_CATEGORY,
      label: e.label || '',
      amount: e.amount != null ? String(e.amount) : '',
      currency: e.currency || 'EUR',
      payment: e.payment || DEFAULT_PAYMENT,
      stopId: e.stopId || null,
      date: e.date || todayKey(),
      receiptPhoto: e.receiptPhoto || null,
    });
    setEditingId(e.id);
    setNotice('');
  };
  const closeForm = () => {
    setForm(null);
    setEditingId(null);
    setNotice('');
  };
  const patchForm = (p) => setForm((f) => ({ ...f, ...p }));

  // Fiş fotoğrafı seç + (AI açıksa) tutarları otomatik oku.
  const scanReceipt = async () => {
    try {
      // Seçici fotoğrafı zaten OCR için okunaklı boyutta küçültür; tam boy
      // base64 hiç oluşmadığı için bellek taşması / okuma hatası yaşanmaz.
      const res = await pickImages({ multiple: false, maxPx: 1400, quality: 0.7 });
      if (res.canceled) return;
      if (!res.assets.length) {
        setNotice(res.failed ? t('photo.someFailed', { n: res.failed }) : t('photo.failed'));
        return;
      }
      setReading(true);
      setNotice('');
      // OCR'a okunaklı kopya gider; SAKLANAN kopya daha da küçüktür. Fiş
      // görüntüleri tüm seyahat verisiyle aynı JSON'da tutulduğu için büyük
      // saklamak uygulamayı yavaşlatıp çökmesine yol açıyordu.
      const ocrPhoto = res.assets[0].uri;
      const photo = await preparePhoto(ocrPhoto, RECEIPT_STORE_OPTS);
      const base = form || { ...emptyForm(), kind: defaultKind };
      const next = { ...base, receiptPhoto: photo };
      try {
        const parsed = await readReceipt(ocrPhoto, settings);
        if (parsed.label) next.label = parsed.label;
        if (parsed.amount != null) next.amount = String(parsed.amount);
        if (parsed.currency) next.currency = parsed.currency;
        if (parsed.kind) next.kind = parsed.kind;
        if (parsed.payment) next.payment = parsed.payment;
        setNotice(t('exp.scanned'));
      } catch (err) {
        setNotice(
          /AI kapalı/.test(err.message)
            ? t('exp.scanAiOff')
            : t('exp.scanFailed')
        );
      }
      setForm(next);
    } catch (e) {
      setNotice(t('photo.failed'));
    } finally {
      setReading(false);
    }
  };

  const attachPhotoOnly = async () => {
    try {
      const res = await pickImages({ multiple: false, ...RECEIPT_STORE_OPTS });
      if (res.canceled) return;
      if (!res.assets.length) {
        setNotice(res.failed ? t('photo.someFailed', { n: res.failed }) : t('photo.failed'));
        return;
      }
      patchForm({ receiptPhoto: res.assets[0].uri });
      setNotice('');
    } catch (e) {
      setNotice(t('photo.failed'));
    }
  };

  const amountNum = Number((form?.amount || '').replace(',', '.'));
  const dateOk = !form?.date || isValidDateKey(form.date);
  const canSave = !!form && form.label.trim().length > 0 && isFinite(amountNum) && amountNum > 0 && dateOk;

  const save = async () => {
    if (!canSave || saving) return;
    setSaving(true);
    let eq = null;
    try {
      const rates = await getRates();
      eq = convertAll(amountNum, form.currency, rates);
    } catch (e) {
      eq = null;
    }
    const payload = {
      kind: form.kind,
      label: form.label.trim(),
      amount: amountNum,
      currency: form.currency,
      payment: form.payment,
      stopId: form.stopId || null,
      date: form.date.trim() || todayKey(),
      eq,
      receiptPhoto: form.receiptPhoto || null,
    };
    if (editingId) updateExpense(tripId, editingId, payload);
    else addExpense(tripId, payload);
    setSaving(false);
    closeForm();
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        {/* Toplam özeti */}
        <View style={styles.totalsCard}>
          <Text style={styles.totalsTitle}>
            {filterKind === 'all'
              ? t('exp.totalTitle')
              : t('exp.filteredTitle', { cat: `${catIcon(catalog, filterKind)} ${catLabel(catalog, filterKind)}` })}
          </Text>
          <View style={styles.totalsRow}>
            {TARGETS.map((code) => (
              <View key={code} style={styles.totalCell}>
                <Text style={styles.totalCur}>{currencySymbol(code)} {code}</Text>
                <Text style={styles.totalVal}>{formatMoney(totals[code], code)}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.totalsMeta}>
            {t('exp.recordCount', { n: expenses.length })}
            {missing ? t('exp.missingSome', { n: missing }) : t('exp.convertedLive')}
          </Text>
        </View>

        {/* Türe göre filtre — türe dokununca sadece o tür listelenir */}
        {Object.keys(usedCounts).length > 1 ? (
          <View style={styles.filterWrap}>
            <ChipPicker
              options={[
                { value: 'all' },
                ...catalog.filter((c) => usedCounts[c.value]).map((c) => ({ value: c.value })),
              ]}
              value={filterKind}
              onChange={setFilterKind}
              renderLabel={(o) =>
                o.value === 'all'
                  ? t('exp.filterAll', { n: allExpenses.length })
                  : `${catIcon(catalog, o.value)} ${catLabel(catalog, o.value)} (${usedCounts[o.value]})`
              }
            />
            <Text style={styles.filterHint}>{t('exp.filterHint')}</Text>
          </View>
        ) : null}

        {/* Ekle / Fiş oku eylemleri */}
        {!form ? (
          <View style={styles.actions}>
            <PrimaryButton title={t('exp.add')} onPress={openAdd} style={{ flex: 1, marginHorizontal: 0 }} />
            <SecondaryButton
              title={t('exp.scan')}
              onPress={() => {
                setForm({ ...emptyForm(), kind: defaultKind });
                setEditingId(null);
                setTimeout(scanReceipt, 0);
              }}
              style={{ flex: 1, marginHorizontal: 0, marginTop: 8 }}
            />
          </View>
        ) : null}

        {/* Form */}
        {form ? (
          <Card style={{ marginTop: 14 }}>
            <Text style={styles.formTitle}>{editingId ? t('exp.editTitle') : t('exp.newTitle')}</Text>

            {reading ? (
              <View style={styles.readingRow}>
                <ActivityIndicator color={colors.primary} />
                <Text style={styles.readingText}>{t('exp.reading')}</Text>
              </View>
            ) : null}

            {form.receiptPhoto ? (
              <View style={styles.receiptWrap}>
                <Image source={{ uri: form.receiptPhoto }} style={styles.receiptImg} resizeMode="cover" />
                <Pressable style={styles.receiptRemove} onPress={() => patchForm({ receiptPhoto: null })} hitSlop={8}>
                  <Text style={styles.receiptRemoveText}>✕</Text>
                </Pressable>
              </View>
            ) : null}

            <View style={styles.receiptBtns}>
              <SecondaryButton
                title={reading ? '…' : t('exp.scan')}
                onPress={scanReceipt}
                disabled={reading}
                style={{ flex: 1, marginHorizontal: 0 }}
              />
              <SecondaryButton
                title={t('exp.attachPhoto')}
                onPress={attachPhotoOnly}
                style={{ flex: 1, marginHorizontal: 0, marginLeft: 8 }}
              />
            </View>

            {notice ? <Text style={styles.notice}>{notice}</Text> : null}

            <Text style={styles.fieldLabel}>{t('exp.kind')}</Text>
            <ChipPicker
              options={pickable.map((c) => ({ value: c.value }))}
              value={form.kind}
              onChange={(v) => patchForm({ kind: v })}
              renderLabel={(o) => `${catIcon(catalog, o.value)} ${catLabel(catalog, o.value)}`}
            />

            <Field label={t('exp.label')} value={form.label} onChangeText={(v) => patchForm({ label: v })} placeholder={t('exp.labelPlaceholder')} />

            <View style={styles.amountRow}>
              <View style={{ flex: 1 }}>
                <Field label={t('exp.amount')} value={form.amount} onChangeText={(v) => patchForm({ amount: v })} placeholder="0,00" keyboardType="decimal-pad" />
              </View>
            </View>

            <Text style={styles.fieldLabel}>{t('exp.currency')}</Text>
            <ChipPicker
              options={CURRENCIES.map((c) => ({ value: c.code }))}
              value={form.currency}
              onChange={(v) => patchForm({ currency: v })}
              renderLabel={(o) => `${currencySymbol(o.value)} ${o.value}`}
            />

            <Text style={styles.fieldLabel}>{t('exp.payment')}</Text>
            <ChipPicker
              options={PAYMENT_METHODS.map((p) => ({ value: p.value }))}
              value={form.payment}
              onChange={(v) => patchForm({ payment: v })}
              renderLabel={(o) => `${paymentIcon(o.value)} ${paymentLabel(o.value)}`}
            />

            {stops.length ? (
              <>
                <Text style={styles.fieldLabel}>{t('exp.stop')}</Text>
                <ChipPicker
                  options={[{ value: '' }, ...stops.map((st) => ({ value: st.id }))]}
                  value={form.stopId || ''}
                  onChange={(v) => patchForm({ stopId: v || null })}
                  renderLabel={(o) => (o.value ? `🗺️ ${stopName(o.value)}` : t('exp.stopNone'))}
                />
                <Text style={styles.stopHint}>{t('exp.stopHint')}</Text>
              </>
            ) : null}

            <Field label={t('disc.dateField')} value={form.date} onChangeText={(v) => patchForm({ date: v })} autoCapitalize="none" placeholder={todayKey()} />
            {!dateOk ? <Text style={styles.err}>{t('common.invalidDate')}</Text> : null}

            <View style={styles.formActions}>
              <PrimaryButton title={saving ? t('exp.saving') : t('common.save')} onPress={save} disabled={!canSave || saving} style={{ flex: 1, marginHorizontal: 0 }} />
              <Pressable onPress={closeForm} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>{t('common.cancel')}</Text>
              </Pressable>
            </View>
          </Card>
        ) : null}

        {/* Liste */}
        {expenses.length ? (
          <View style={{ marginTop: 18 }}>
            {expenses.map((e) => (
              <Pressable key={e.id} style={styles.row} onPress={() => openEdit(e)}>
                {e.receiptPhoto ? (
                  <Image source={{ uri: e.receiptPhoto }} style={styles.thumb} resizeMode="cover" />
                ) : (
                  <View style={styles.thumbIcon}>
                    <Text style={{ fontSize: 20 }}>{catIcon(catalog, e.kind)}</Text>
                  </View>
                )}
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowLabel} numberOfLines={1}>{e.label}</Text>
                  <Text style={styles.rowMeta}>
                    {formatShortDate(e.date)} · {catLabel(catalog, e.kind)}
                    {e.payment ? ` · ${paymentIcon(e.payment)} ${paymentLabel(e.payment)}` : ''}
                    {e.stopId && stopName(e.stopId) ? ` · 🗺️ ${stopName(e.stopId)}` : ''}
                  </Text>
                  {e.eq ? (
                    <Text style={styles.rowEq} numberOfLines={1}>
                      {TARGETS.map((code) => formatMoney(e.eq[code], code)).join('  ·  ')}
                    </Text>
                  ) : (
                    <Text style={styles.rowEqMissing}>{t('exp.noConversion')}</Text>
                  )}
                </View>
                <View style={styles.rowRight}>
                  <Text style={styles.rowAmount}>{formatMoney(e.amount, e.currency)}</Text>
                  <View style={styles.rowActions}>
                    <Pressable
                      onPress={() => openEdit(e)}
                      hitSlop={10}
                      style={styles.actBtn}
                      accessibilityLabel={t('exp.editAction')}
                    >
                      <Text style={styles.actEdit}>✏️</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => setConfirmDeleteId(e.id)}
                      hitSlop={10}
                      style={styles.actBtn}
                      accessibilityLabel={t('common.delete')}
                    >
                      <Text style={styles.actDel}>✕</Text>
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        ) : !form ? (
          filterKind !== 'all' ? (
            <View style={styles.filterEmpty}>
              <Text style={styles.filterEmptyText}>{t('exp.filterEmpty')}</Text>
              <Pressable onPress={() => setFilterKind('all')} hitSlop={8}>
                <Text style={styles.clearFilter}>{t('exp.clearFilter')}</Text>
              </Pressable>
            </View>
          ) : (
            <EmptyState icon="🧾" title={t('exp.empty')} subtitle={t('exp.emptySub')} />
          )
        ) : null}
      </ScrollView>

      <ConfirmModal
        visible={!!confirmDeleteId}
        title={t('exp.deleteConfirm')}
        confirmLabel={t('common.delete')}
        destructive
        onConfirm={() => {
          removeExpense(tripId, confirmDeleteId);
          setConfirmDeleteId(null);
        }}
        onCancel={() => setConfirmDeleteId(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  totalsCard: {
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 16,
    padding: 18,
  },
  totalsTitle: { color: colors.onPrimary, fontSize: 13, fontWeight: '700', opacity: 0.9, letterSpacing: 0.5 },
  totalsRow: { flexDirection: 'row', marginTop: 12, gap: 10 },
  totalCell: { flex: 1 },
  totalCur: { color: colors.onPrimary, fontSize: 12, opacity: 0.85, fontWeight: '700' },
  totalVal: { color: colors.onPrimary, fontSize: 17, fontWeight: '800', marginTop: 3 },
  totalsMeta: { color: colors.onPrimary, fontSize: 11, opacity: 0.85, marginTop: 12 },
  actions: { marginHorizontal: 16, marginTop: 14 },
  formTitle: { color: colors.text, fontSize: 16, fontWeight: '800', marginBottom: 4 },
  readingRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  readingText: { color: colors.textMuted, fontSize: 13 },
  receiptWrap: { marginTop: 12, borderRadius: 12, overflow: 'hidden' },
  receiptImg: { width: '100%', height: 180, backgroundColor: colors.surfaceAlt },
  receiptRemove: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiptRemoveText: { color: '#fff', fontWeight: '800' },
  receiptBtns: { flexDirection: 'row', marginTop: 12 },
  notice: { color: colors.accent, fontSize: 12, marginTop: 10, lineHeight: 17 },
  fieldLabel: { color: colors.textMuted, fontSize: 12, marginTop: 14, marginBottom: 8 },
  stopHint: { color: colors.textMuted, fontSize: 11, marginTop: 8, lineHeight: 16 },
  amountRow: { flexDirection: 'row', gap: 10 },
  err: { color: colors.danger, fontSize: 11, marginTop: 4 },
  formActions: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 16 },
  cancelBtn: { paddingHorizontal: 14, paddingVertical: 12 },
  cancelText: { color: colors.textMuted, fontSize: 14, fontWeight: '700' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  thumb: { width: 46, height: 46, borderRadius: 8, backgroundColor: colors.surfaceAlt },
  thumbIcon: {
    width: 46,
    height: 46,
    borderRadius: 8,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: { color: colors.text, fontSize: 15, fontWeight: '700' },
  rowMeta: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  rowEq: { color: colors.textMuted, fontSize: 11, marginTop: 3 },
  rowEqMissing: { color: colors.danger, fontSize: 11, marginTop: 3, fontStyle: 'italic' },
  rowRight: { alignItems: 'flex-end' },
  rowActions: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 8 },
  actBtn: { paddingHorizontal: 2 },
  actEdit: { fontSize: 15 },
  actDel: { color: colors.danger, fontSize: 16, fontWeight: '800' },
  filterWrap: { marginHorizontal: 16, marginTop: 14 },
  filterHint: { color: colors.textMuted, fontSize: 11, marginTop: 8, lineHeight: 16 },
  filterEmpty: { alignItems: 'center', paddingTop: 36, paddingHorizontal: 32 },
  filterEmptyText: { color: colors.textMuted, fontSize: 14 },
  clearFilter: { color: colors.primary, fontSize: 13, fontWeight: '800', marginTop: 12 },
  rowAmount: { color: colors.primary, fontSize: 15, fontWeight: '800' },
});
