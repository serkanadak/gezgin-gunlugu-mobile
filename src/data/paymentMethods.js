// Ödeme şekli: harcamanın nakit mi yoksa kredi kartıyla mı yapıldığı.
import { t } from '../i18n';

export const PAYMENT_METHODS = [
  { value: 'nakit', label: t('pay.cash'), icon: '💵' },
  { value: 'kart', label: t('pay.card'), icon: '💳' },
];

export const DEFAULT_PAYMENT = 'kart';

const BY_VALUE = PAYMENT_METHODS.reduce((m, p) => ((m[p.value] = p), m), {});
export const PAYMENT_VALUES = PAYMENT_METHODS.map((p) => p.value);

export function paymentLabel(value) {
  return (BY_VALUE[value] && BY_VALUE[value].label) || '—';
}

export function paymentIcon(value) {
  return (BY_VALUE[value] && BY_VALUE[value].icon) || '💰';
}
