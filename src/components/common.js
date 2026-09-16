import React from 'react';
import { View, Text, Pressable, TextInput, Modal, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { t } from '../i18n';

export function SectionHeader({ title, subtitle, right }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
      </View>
      {right || null}
    </View>
  );
}

export function Card({ children, style, onPress }) {
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }, style]}>
        {children}
      </Pressable>
    );
  }
  return <View style={[styles.card, style]}>{children}</View>;
}

export function PrimaryButton({ title, onPress, disabled, style }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.button, pressed && { opacity: 0.85 }, disabled && { opacity: 0.5 }, style]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

export function SecondaryButton({ title, onPress, disabled, style }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.secondaryBtn, pressed && { opacity: 0.7 }, disabled && { opacity: 0.5 }, style]}
    >
      <Text style={styles.secondaryText}>{title}</Text>
    </Pressable>
  );
}

export function Field({ label, value, onChangeText, placeholder, multiline, keyboardType, autoCapitalize }) {
  return (
    <View style={styles.field}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={[styles.input, multiline && styles.multiline]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        multiline={multiline}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
      />
    </View>
  );
}

export function ChipPicker({ options, value, onChange, renderLabel }) {
  return (
    <View style={styles.chipRow}>
      {options.map((opt) => {
        const val = typeof opt === 'object' ? opt.value : opt;
        const selected = val === value;
        return (
          <Pressable
            key={val}
            onPress={() => onChange(val)}
            style={[styles.chip, selected && styles.chipSelected]}
          >
            <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
              {renderLabel ? renderLabel(opt) : String(val)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function Pill({ label, color, filled }) {
  const c = color || colors.primary;
  return (
    <View style={[styles.pill, { borderColor: c, backgroundColor: filled ? c : c + '22' }]}>
      <Text style={[styles.pillText, { color: filled ? colors.onPrimary : c }]}>{label}</Text>
    </View>
  );
}

export function EmptyState({ icon, title, subtitle, children }) {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyIcon}>{icon}</Text>
      <Text style={styles.emptyTitle}>{title}</Text>
      {subtitle ? <Text style={styles.emptySubtitle}>{subtitle}</Text> : null}
      {children}
    </View>
  );
}

export function ProgressBar({ ratio, color }) {
  const pct = Math.max(0, Math.min(1, ratio || 0));
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${pct * 100}%`, backgroundColor: color || colors.primary }]} />
    </View>
  );
}

// React Native'in Alert.alert'i web'de (react-native-web) desteklenmediği için
// tüm platformlarda çalışan özel onay modalı.
export function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel,
  destructive,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>{title}</Text>
          {message ? <Text style={styles.modalMessage}>{message}</Text> : null}
          <View style={styles.modalButtonRow}>
            <Pressable style={styles.modalCancelBtn} onPress={onCancel}>
              <Text style={styles.modalCancelText}>{cancelLabel || t('common.cancel')}</Text>
            </Pressable>
            <Pressable
              style={[styles.modalConfirmBtn, destructive && styles.modalConfirmBtnDestructive]}
              onPress={onConfirm}
            >
              <Text style={[styles.modalConfirmText, destructive && styles.modalConfirmTextDestructive]}>
                {confirmLabel || t('common.confirm')}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  sectionSubtitle: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
  },
  buttonText: { color: colors.onPrimary, fontWeight: '800', fontSize: 15 },
  secondaryBtn: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  secondaryText: { color: colors.text, fontWeight: '700', fontSize: 14 },
  field: { marginTop: 12 },
  label: { color: colors.textMuted, fontSize: 12, marginBottom: 6 },
  input: {
    backgroundColor: colors.surfaceAlt,
    color: colors.text,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  multiline: { minHeight: 90, textAlignVertical: 'top' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
  },
  chipSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.textMuted, fontSize: 13, fontWeight: '600' },
  chipTextSelected: { color: colors.onPrimary },
  pill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  pillText: { fontSize: 11, fontWeight: '700' },
  empty: { alignItems: 'center', paddingHorizontal: 32, paddingTop: 48 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { color: colors.text, fontSize: 17, fontWeight: '700', textAlign: 'center' },
  emptySubtitle: { color: colors.textMuted, fontSize: 13, textAlign: 'center', marginTop: 8, lineHeight: 19 },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.surfaceAlt,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 999 },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 360,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalTitle: { color: colors.text, fontSize: 17, fontWeight: '800' },
  modalMessage: { color: colors.textMuted, fontSize: 13, marginTop: 8, lineHeight: 19 },
  modalButtonRow: { flexDirection: 'row', gap: 10, marginTop: 20 },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalCancelText: { color: colors.textMuted, fontWeight: '700' },
  modalConfirmBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  modalConfirmBtnDestructive: { backgroundColor: colors.danger },
  modalConfirmText: { color: colors.onPrimary, fontWeight: '800' },
  modalConfirmTextDestructive: { color: '#fff' },
});
