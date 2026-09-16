import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '../state/JournalContext';
import {
  sumIn,
  categoryBreakdown,
  tripComparison,
  paymentSplit,
  categoryTripMatrix,
  paymentTripMatrix,
  currencyBreakdown,
  currencyTripMatrix,
  stopBreakdown,
} from '../logic/expenseReport';
import { formatMoney, currencySymbol, TARGETS } from '../logic/fx';
import { resolveCategories, catLabel, catIcon } from '../data/expenseCategories';
import { PAYMENT_METHODS, paymentLabel, paymentIcon } from '../data/paymentMethods';
import { formatShortDate } from '../logic/date';
import { colors } from '../theme';
import { t } from '../i18n';
import { ChipPicker, EmptyState, SecondaryButton } from '../components/common';
import { exportExpenseReportPdf } from '../logic/expenseDoc';

function pct(part, whole) {
  if (!whole) return 0;
  return Math.max(0, Math.min(1, part / whole));
}

// Satır = { value, label, icon, total }, kolon = seyahat; hücre seçilen birimde harcama.
function MatrixTable({ rows, cols, data, grand, currentId, cur, headerLabel }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator style={styles.tableScroll}>
      <View>
        <View style={[styles.trow, styles.trowHead]}>
          <View style={styles.thCat}>
            <Text style={styles.thText}>{headerLabel}</Text>
          </View>
          {cols.map((col) => (
            <View key={col.id} style={[styles.tcell, col.id === currentId && styles.tcellCurrent]}>
              <Text style={styles.thText} numberOfLines={1}>
                {col.id === currentId ? '➤ ' : ''}
                {col.title}
              </Text>
              {col.startDate ? <Text style={styles.thSub}>{formatShortDate(col.startDate)}</Text> : null}
            </View>
          ))}
          <View style={[styles.tcell, styles.tcellTotal]}>
            <Text style={styles.thText}>{t('common.total')}</Text>
          </View>
        </View>
        {rows.map((r) => (
          <View key={r.value} style={styles.trow}>
            <View style={styles.thCat}>
              <Text style={styles.tdCat} numberOfLines={1}>
                {r.icon} {r.label}
              </Text>
            </View>
            {cols.map((col) => {
              const v = (data[r.value] && data[r.value][col.id]) || 0;
              return (
                <View key={col.id} style={[styles.tcell, col.id === currentId && styles.tcellCurrent]}>
                  <Text style={styles.td}>{v ? formatMoney(v, cur) : '–'}</Text>
                </View>
              );
            })}
            <View style={[styles.tcell, styles.tcellTotal]}>
              <Text style={styles.tdTotal}>{formatMoney(r.total, cur)}</Text>
            </View>
          </View>
        ))}
        <View style={[styles.trow, styles.trowTotal]}>
          <View style={styles.thCat}>
            <Text style={styles.tdTotal}>{t('common.total')}</Text>
          </View>
          {cols.map((col) => (
            <View key={col.id} style={[styles.tcell, col.id === currentId && styles.tcellCurrent]}>
              <Text style={styles.tdTotal}>{formatMoney(col.total, cur)}</Text>
            </View>
          ))}
          <View style={[styles.tcell, styles.tcellTotal]}>
            <Text style={styles.tdTotal}>{formatMoney(grand, cur)}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default function ExpenseReportScreen({ route, navigation }) {
  const { tripId } = route.params;
  const { getTrip, trips, settings } = useJournal();
  const trip = getTrip(tripId);
  const [cur, setCur] = useState('EUR');
  const [compCat, setCompCat] = useState('all'); // karşılaştırma türü: 'all' | kategori değeri
  const [compPay, setCompPay] = useState('all'); // karşılaştırma ödeme şekli: 'all' | 'nakit' | 'kart'

  useLayoutEffect(() => {
    navigation.setOptions({ title: t('nav.expenseReport') });
  }, [navigation]);

  // Raporu olduğu gibi (ekrandaki tüm bölümlerle) yazdırılabilir hâle getirir.
  const [pdfBusy, setPdfBusy] = useState(false);
  const makePdf = async () => {
    if (Platform.OS !== 'web') {
      Alert.alert(t('pdf.webOnly'), t('disc.pdfWebOnlyMsg'));
      return;
    }
    setPdfBusy(true);
    try {
      const res = await exportExpenseReportPdf(trip, trips, cur, settings);
      if (res && !res.ok && res.reason === 'popup') {
        Alert.alert(t('pdf.popupBlocked'), t('pdf.popupBlockedMsg'));
      }
    } catch (e) {
      Alert.alert(t('pdf.failed'), t('common.unexpectedError'));
    } finally {
      setPdfBusy(false);
    }
  };

  if (!trip) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState icon="📊" title={t('exp.notFound')} />
      </SafeAreaView>
    );
  }

  const expenses = trip.expenses || [];
  const s = sumIn(expenses, cur);
  const pay = paymentSplit(expenses, cur);
  const catalog = resolveCategories(settings);
  const cats = categoryBreakdown(expenses, cur, catalog).filter((c) => c.count > 0);
  const maxCat = cats.reduce((m, c) => Math.max(m, c.total), 0);

  // Güzergah durağına göre kırılım (bu seyahat içinde).
  const stopRows = stopBreakdown(trip, cur);
  const maxStop = stopRows.reduce((m, r) => Math.max(m, r.total), 0);

  // Ödendiği para birimine göre kırılım (ham tutar + seçilen birimde karşılığı).
  const curRows = currencyBreakdown(expenses, cur);
  const maxCur = curRows.reduce((m, c) => Math.max(m, c.total), 0);

  // Tür × Seyahat, Ödeme × Seyahat ve Para birimi × Seyahat çapraz tabloları.
  const matrix = categoryTripMatrix(trips || [], cur, catalog);
  const payMatrix = paymentTripMatrix(trips || [], cur);
  const curMatrix = currencyTripMatrix(trips || [], cur);

  // Karşılaştırma: seyahat bazında; istenirse tür (kategori) ve/veya ödeme şekli süzülür.
  const compCategory = compCat === 'all' ? null : compCat;
  const compPayment = compPay === 'all' ? null : compPay;
  const comp = tripComparison(trips || [], cur, compCategory, compPayment).filter((x) => x.count > 0);
  const maxTrip = comp.reduce((m, x) => Math.max(m, x.total), 0);
  const grand = comp.reduce((a, x) => a + x.total, 0);
  const avg = comp.length ? grand / comp.length : 0;

  // Karşılaştırma süzgecinde yalnızca herhangi bir seyahatte kullanılmış türleri göster.
  const usedCats = new Set();
  for (const tr of trips || []) for (const e of tr.expenses || []) usedCats.add((e && e.kind) || 'diger');
  const compCatOptions = [
    { value: 'all' },
    ...catalog.filter((c) => usedCats.has(c.value)).map((c) => ({ value: c.value })),
  ];

  if (!expenses.length) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState
          icon="📊"
          title={t('rep.empty')}
          subtitle={t('rep.emptySub')}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Para birimi seçimi */}
        <Text style={styles.curLabel}>{t('rep.currency')}</Text>
        <View style={{ paddingHorizontal: 16 }}>
          <ChipPicker
            options={TARGETS.map((code) => ({ value: code }))}
            value={cur}
            onChange={setCur}
            renderLabel={(o) => `${currencySymbol(o.value)} ${o.value}`}
          />
        </View>

        <SecondaryButton
          title={pdfBusy ? t('common.preparing') : t('rep.pdf')}
          onPress={makePdf}
          disabled={pdfBusy}
          style={{ marginTop: 12 }}
        />

        {/* Bu seyahat toplamı */}
        <View style={styles.totalCard}>
          <Text style={styles.totalCaption}>{t('rep.tripTotal', { trip: trip.title })}</Text>
          <Text style={styles.totalBig}>{formatMoney(s.total, cur)}</Text>
          <Text style={styles.totalMeta}>
            {t('rep.expenseCount', { n: s.count })}{s.missing ? t('rep.missing', { n: s.missing }) : ''}
          </Text>
          <View style={styles.paySplit}>
            <Text style={styles.payItem}>💵 {paymentLabel('nakit')} {formatMoney(pay.nakit, cur)}</Text>
            <Text style={styles.payItem}>💳 {paymentLabel('kart')} {formatMoney(pay.kart, cur)}</Text>
            {pay.other ? <Text style={styles.payItem}>• {t('pay.unknown')} {formatMoney(pay.other, cur)}</Text> : null}
          </View>
        </View>

        {/* Tür bazında özet */}
        <Text style={styles.sectionLabel}>{t('rep.byCategory')}</Text>
        {cats.map((c) => {
          const share = s.total ? c.total / s.total : 0;
          return (
            <View key={c.value} style={styles.catRow}>
              <View style={styles.catHead}>
                <Text style={styles.catName}>
                  {c.icon} {c.label}
                </Text>
                <Text style={styles.catAmt}>{formatMoney(c.total, cur)}</Text>
              </View>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${pct(c.total, maxCat) * 100}%` }]} />
              </View>
              <Text style={styles.catMeta}>
                {t('rep.catShare', { pct: Math.round(share * 100), n: c.count })}
              </Text>
            </View>
          );
        })}

        {/* Güzergah durağına göre */}
        {stopRows.length > 1 || (stopRows.length === 1 && stopRows[0].value !== '__free__') ? (
          <>
            <Text style={styles.sectionLabel}>{t('rep.byStop')}</Text>
            <Text style={styles.compSub}>{t('rep.byStopSub')}</Text>
            {stopRows.map((r) => (
              <View key={r.value} style={styles.catRow}>
                <View style={styles.catHead}>
                  <Text style={styles.catName} numberOfLines={1}>
                    {r.icon} {r.label}
                  </Text>
                  <Text style={styles.catAmt}>{formatMoney(r.total, cur)}</Text>
                </View>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${pct(r.total, maxStop) * 100}%` }]} />
                </View>
                <Text style={styles.catMeta}>
                  {t('rep.catShare', { pct: Math.round((s.total ? r.total / s.total : 0) * 100), n: r.count })}
                </Text>
              </View>
            ))}
          </>
        ) : null}

        {/* Ödendiği para birimine göre */}
        {curRows.length > 1 || (curRows.length === 1 && curRows[0].value !== cur) ? (
          <>
            <Text style={styles.sectionLabel}>{t('rep.byCurrency')}</Text>
            <Text style={styles.compSub}>
              {t('rep.byCurrencySub', { cur: `${currencySymbol(cur)} ${cur}` })}
            </Text>
            {curRows.map((c) => (
              <View key={c.value} style={styles.catRow}>
                <View style={styles.catHead}>
                  <Text style={styles.catName}>{c.label}</Text>
                  <Text style={styles.catAmt}>{formatMoney(c.native, c.value)}</Text>
                </View>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${pct(c.total, maxCur) * 100}%` }]} />
                </View>
                <Text style={styles.catMeta}>
                  {t('rep.curMeta', { n: c.count, conv: formatMoney(c.total, cur) })}
                  {c.missing ? t('rep.curMissing', { n: c.missing }) : ''}
                </Text>
              </View>
            ))}
          </>
        ) : null}

        {/* Para birimi × Seyahat çapraz tablosu */}
        {curMatrix.cols.length && curMatrix.rows.length > 1 ? (
          <>
            <Text style={styles.sectionLabel}>{t('rep.curTable')}</Text>
            <Text style={styles.compSub}>
              {t('rep.curTableHint', { cur: `${currencySymbol(cur)} ${cur}` })}
            </Text>
            <MatrixTable
              rows={curMatrix.rows}
              cols={curMatrix.cols}
              data={curMatrix.data}
              grand={curMatrix.grand}
              currentId={tripId}
              cur={cur}
              headerLabel={t('rep.colCurrency')}
            />
          </>
        ) : null}

        {/* Tür × Seyahat çapraz tablosu */}
        <Text style={styles.sectionLabel}>{t('rep.catTable')}</Text>
        {matrix.cols.length && matrix.cats.length ? (
          <>
            <Text style={styles.compSub}>
              {t('rep.catTableHint', { cur: currencySymbol(cur) + ' ' + cur })}
            </Text>
            <MatrixTable
              rows={matrix.cats}
              cols={matrix.cols}
              data={matrix.data}
              grand={matrix.grand}
              currentId={tripId}
              cur={cur}
              headerLabel={t('rep.colCategory')}
            />
          </>
        ) : (
          <Text style={styles.compHint}>{t('rep.tableEmpty')}</Text>
        )}

        {/* Ödeme şekli × Seyahat çapraz tablosu */}
        <Text style={styles.sectionLabel}>{t('rep.payTable')}</Text>
        {payMatrix.cols.length && payMatrix.rows.length ? (
          <>
            <Text style={styles.compSub}>
              {t('rep.payTableHint', { cur: currencySymbol(cur) + ' ' + cur })}
            </Text>
            <MatrixTable
              rows={payMatrix.rows}
              cols={payMatrix.cols}
              data={payMatrix.data}
              grand={payMatrix.grand}
              currentId={tripId}
              cur={cur}
              headerLabel={t('rep.colPayment')}
            />
          </>
        ) : (
          <Text style={styles.compHint}>{t('rep.tableEmpty')}</Text>
        )}

        {/* Seyahat karşılaştırması */}
        <Text style={styles.sectionLabel}>{t('rep.compare')}</Text>
        <Text style={styles.compSub}>{t('rep.compareSub')}</Text>
        <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
          <ChipPicker
            options={compCatOptions}
            value={compCat}
            onChange={setCompCat}
            renderLabel={(o) =>
              o.value === 'all' ? t('rep.allChip') : `${catIcon(catalog, o.value)} ${catLabel(catalog, o.value)}`
            }
          />
        </View>
        <View style={{ paddingHorizontal: 16, marginBottom: 10 }}>
          <ChipPicker
            options={[{ value: 'all' }, ...PAYMENT_METHODS.map((p) => ({ value: p.value }))]}
            value={compPay}
            onChange={setCompPay}
            renderLabel={(o) => (o.value === 'all' ? t('rep.allPaymentsChip') : `${paymentIcon(o.value)} ${paymentLabel(o.value)}`)}
          />
        </View>
        {comp.length ? (
          <Text style={styles.compHint}>
            {compCategory ? `${catIcon(catalog, compCategory)} ${catLabel(catalog, compCategory)}` : t('rep.allCategories')}
            {' · '}
            {compPayment ? `${paymentIcon(compPayment)} ${paymentLabel(compPayment)}` : t('rep.allPayments')}
            {' · '}
            {t('rep.compareMeta', { n: comp.length, avg: formatMoney(avg, cur), total: formatMoney(grand, cur) })}
          </Text>
        ) : (
          <Text style={styles.compHint}>
            {compCategory || compPayment ? t('rep.compareEmptyFiltered') : t('rep.compareEmpty')}
          </Text>
        )}
        {comp.map((tr) => {
          const isCurrent = tr.id === tripId;
          return (
            <View key={tr.id} style={[styles.tripRow, isCurrent && styles.tripRowCurrent]}>
              <View style={styles.catHead}>
                <Text style={[styles.tripName, isCurrent && styles.tripNameCurrent]} numberOfLines={1}>
                  {isCurrent ? '➤ ' : ''}
                  {tr.title}
                  {tr.startDate ? `  ·  ${formatShortDate(tr.startDate)}` : ''}
                </Text>
                <Text style={[styles.tripAmt, isCurrent && styles.tripNameCurrent]}>
                  {formatMoney(tr.total, cur)}
                </Text>
              </View>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    isCurrent && styles.barFillCurrent,
                    { width: `${pct(tr.total, maxTrip) * 100}%` },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  curLabel: { color: colors.textMuted, fontSize: 12, marginHorizontal: 16, marginTop: 16, marginBottom: 8 },
  totalCard: {
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 16,
    padding: 18,
  },
  totalCaption: { color: colors.onPrimary, fontSize: 13, fontWeight: '700', opacity: 0.9 },
  totalBig: { color: colors.onPrimary, fontSize: 26, fontWeight: '800', marginTop: 6 },
  totalMeta: { color: colors.onPrimary, fontSize: 12, opacity: 0.85, marginTop: 8 },
  paySplit: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.25)',
  },
  payItem: { color: colors.onPrimary, fontSize: 13, fontWeight: '700' },
  sectionLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 10,
  },
  catRow: { marginHorizontal: 16, marginBottom: 14 },
  catHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  catName: { color: colors.text, fontSize: 14, fontWeight: '700', flex: 1, marginRight: 10 },
  catAmt: { color: colors.text, fontSize: 14, fontWeight: '800' },
  barTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.surfaceAlt,
    overflow: 'hidden',
    marginTop: 6,
  },
  barFill: { height: '100%', borderRadius: 999, backgroundColor: colors.accent },
  barFillCurrent: { backgroundColor: colors.primary },
  catMeta: { color: colors.textMuted, fontSize: 11, marginTop: 5 },
  compSub: { color: colors.textMuted, fontSize: 12, marginHorizontal: 16, marginBottom: 10 },
  tableScroll: { marginHorizontal: 16, marginBottom: 4 },
  trow: { flexDirection: 'row', alignItems: 'stretch', borderBottomWidth: 1, borderBottomColor: colors.border },
  trowHead: { borderBottomWidth: 2, borderBottomColor: colors.primary },
  trowTotal: { borderBottomWidth: 0, borderTopWidth: 2, borderTopColor: colors.primary },
  thCat: {
    width: 132,
    paddingVertical: 9,
    paddingRight: 8,
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    paddingLeft: 8,
  },
  tcell: { width: 96, paddingVertical: 9, paddingHorizontal: 8, justifyContent: 'center', alignItems: 'flex-end' },
  tcellCurrent: { backgroundColor: colors.primary + '14' },
  tcellTotal: { backgroundColor: colors.surfaceAlt },
  thText: { color: colors.text, fontSize: 12, fontWeight: '800' },
  thSub: { color: colors.textMuted, fontSize: 10, marginTop: 2 },
  tdCat: { color: colors.text, fontSize: 12, fontWeight: '700' },
  td: { color: colors.text, fontSize: 12 },
  tdTotal: { color: colors.primary, fontSize: 12, fontWeight: '800' },
  compHint: { color: colors.textMuted, fontSize: 12, marginHorizontal: 16, marginBottom: 12 },
  tripRow: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  tripRowCurrent: { borderColor: colors.primary },
  tripName: { color: colors.text, fontSize: 13, fontWeight: '600', flex: 1, marginRight: 10 },
  tripNameCurrent: { color: colors.primary, fontWeight: '800' },
  tripAmt: { color: colors.text, fontSize: 13, fontWeight: '800' },
});
