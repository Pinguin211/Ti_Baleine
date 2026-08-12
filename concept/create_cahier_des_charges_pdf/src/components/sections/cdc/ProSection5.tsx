/**
 * @file components/sections/cdc/ProSection5.tsx
 * @description Section 8 — Règles Métier (R-01 à R-19) et Grille Tarifaire du CDC v2.
 */
import { Text, View, StyleSheet } from '../../../shims/react-pdf'
import { colors, fontSizes, spacing, fontFamilies, borders } from '../../../styles/tokens'
import { cdcBusinessRules, cdcTarifs } from '../../../cahier-des-charges'

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing['3xl'],
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamilies.bold,
    color: colors.textDark,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginTop: spacing['2xl'],
    marginBottom: spacing.xs,
  },
  titleUnderline: {
    height: 1.5,
    backgroundColor: colors.primary,
    marginBottom: spacing.md,
  },
  subsectionTitle: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
    marginTop: spacing.xl,
    marginBottom: spacing.xs,
  },
  table: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borders.radiusSmall,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.navyDark,
    paddingVertical: spacing.xs + 1,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
  },
  thText: {
    fontSize: fontSizes.xxs + 0.5,
    fontFamily: fontFamilies.bold,
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 3.5,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    alignItems: 'flex-start',
    backgroundColor: colors.white,
  },
  tableRowAlt: {
    backgroundColor: '#fafbfc',
  },
  colRuleId: {
    width: 32,
    fontSize: fontSizes.xxs + 1,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
  },
  colRuleText: {
    flex: 1,
    fontSize: fontSizes.xxs + 0.8,
    fontFamily: fontFamilies.base,
    color: colors.textDark,
    lineHeight: 1.3,
    paddingRight: spacing.xs,
  },
  colRuleSource: {
    width: 110,
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
  },
  colTarifPrestation: {
    flex: 1.4,
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: colors.textDark,
  },
  colTarifCondition: {
    flex: 1.3,
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
  },
  colTarifValue: {
    flex: 0.9,
    alignItems: 'flex-end',
  },
  pillBlue: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 1.5,
    borderRadius: 3,
  },
  pillBlueText: {
    fontSize: fontSizes.xxs + 0.5,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
  },
  pillRed: {
    backgroundColor: colors.redTag,
    paddingHorizontal: spacing.sm,
    paddingVertical: 1.5,
    borderRadius: 3,
  },
  pillRedText: {
    fontSize: fontSizes.xxs + 0.5,
    fontFamily: fontFamilies.bold,
    color: colors.redText,
  },
})

export function ProSection5() {
  return (
    <View style={styles.container}>
      {/* 8. Règles métier */}
      <Text style={styles.sectionTitle}>8. Règles Métier</Text>
      <View style={styles.titleUnderline} />

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.thText, { width: 32 }]}>#</Text>
          <Text style={[styles.thText, { flex: 1 }]}>RÈGLE MÉTIER</Text>
          <Text style={[styles.thText, { width: 110 }]}>SOURCE</Text>
        </View>
        {cdcBusinessRules.map((r, i) => (
          <View key={r.id} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
            <Text style={styles.colRuleId}>{r.id}</Text>
            <Text style={styles.colRuleText}>{r.rule}</Text>
            <Text style={styles.colRuleSource}>{r.source}</Text>
          </View>
        ))}
      </View>

      {/* Grille Tarifaire associée */}
      <Text style={styles.subsectionTitle}>Grille Tarifaire de Référence (Tarifs Fixes Annuels)</Text>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.thText, { flex: 1.4 }]}>PRESTATION</Text>
          <Text style={[styles.thText, { flex: 1.3 }]}>TRANCHE D'ÂGE / CONDITION</Text>
          <Text style={[styles.thText, { flex: 0.9, textAlign: 'right' }]}>TARIF UNITAIRE</Text>
        </View>
        {cdcTarifs.map((t, i) => (
          <View key={i} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
            <Text style={styles.colTarifPrestation}>{t.prestation}</Text>
            <Text style={styles.colTarifCondition}>{t.condition}</Text>
            <View style={styles.colTarifValue}>
              {t.type === 'restricted' ? (
                <View style={styles.pillRed}>
                  <Text style={styles.pillRedText}>{t.tarif}</Text>
                </View>
              ) : (
                <View style={styles.pillBlue}>
                  <Text style={styles.pillBlueText}>{t.tarif}</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
