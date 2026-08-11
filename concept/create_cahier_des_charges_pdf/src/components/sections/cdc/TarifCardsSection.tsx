/**
 * @file components/sections/cdc/TarifCardsSection.tsx
 * @description Section 3.2 — Grille Tarifaire Moderne par Activité.
 */
import { Text, View, StyleSheet } from '../../../shims/react-pdf'
import { colors, fontSizes, spacing, fontFamilies, borders } from '../../../styles/tokens'

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    fontSize: fontSizes.md,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDeep,
    marginBottom: spacing.xs,
  },
  subtext: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  cardsGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  tarifCard: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderRadius: borders.radiusMedium,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.md,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  badgeWhale: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 3,
    marginRight: spacing.xs,
  },
  badgeDolphin: {
    backgroundColor: '#cffafe',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 3,
    marginRight: spacing.xs,
  },
  badgeSunset: {
    backgroundColor: colors.sunsetAmberLight,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 3,
    marginRight: spacing.xs,
  },
  badgeText: {
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.bold,
    color: colors.textDark,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  priceRowLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 3,
  },
  ageLabel: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
  },
  priceTag: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.bold,
    color: colors.primary,
  },
  priceTagAmber: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.bold,
    color: colors.sunsetAmber,
  },
  bottomWarningRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff1f2',
    borderWidth: 1,
    borderColor: '#fecdd3',
    borderRadius: borders.radiusSmall,
    padding: spacing.sm,
  },
  warningLabel: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: '#9f1239',
  },
  warningDesc: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: '#be123c',
  },
})

export function TarifCardsSection() {
  return (
    <View style={styles.container} wrap={false}>
      <Text style={styles.sectionHeader}>3.2 Grille Tarifaire & Catégories</Text>
      <Text style={styles.subtext}>Tarifs fixes sans variation saisonnière appliqués sur l'ensemble des départs.</Text>

      {/* 3 Activity Cards */}
      <View style={styles.cardsGrid}>
        {/* Baleines */}
        <View style={styles.tarifCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.badgeWhale}>
              <Text style={styles.badgeText}>Observation</Text>
            </View>
            <Text style={styles.cardTitle}>Sortie Baleines</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.ageLabel}>Adulte (12+ ans)</Text>
            <Text style={styles.priceTag}>65 €</Text>
          </View>
          <View style={styles.priceRowLast}>
            <Text style={styles.ageLabel}>Enfant (4-11 ans)</Text>
            <Text style={styles.priceTag}>40 €</Text>
          </View>
        </View>

        {/* Dauphins */}
        <View style={styles.tarifCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.badgeDolphin}>
              <Text style={[styles.badgeText, { color: colors.dolphinCyan }]}>Observation</Text>
            </View>
            <Text style={styles.cardTitle}>Sortie Dauphins</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.ageLabel}>Adulte (12+ ans)</Text>
            <Text style={[styles.priceTag, { color: colors.dolphinCyan }]}>50 €</Text>
          </View>
          <View style={styles.priceRowLast}>
            <Text style={styles.ageLabel}>Enfant (4-11 ans)</Text>
            <Text style={[styles.priceTag, { color: colors.dolphinCyan }]}>30 €</Text>
          </View>
        </View>

        {/* Sunset */}
        <View style={styles.tarifCard}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.badgeSunset}>
              <Text style={[styles.badgeText, { color: colors.sunsetAmber }]}>Privatisation</Text>
            </View>
            <Text style={styles.cardTitle}>Formule Sunset</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.ageLabel}>Tikap (1/2 j.)</Text>
            <Text style={styles.priceTagAmber}>600 €</Text>
          </View>
          <View style={styles.priceRowLast}>
            <Text style={styles.ageLabel}>Grand Bleu (1/2 j.)</Text>
            <Text style={styles.priceTagAmber}>1 100 €</Text>
          </View>
        </View>
      </View>

      {/* Safety Warning */}
      <View style={styles.bottomWarningRow}>
        <Text style={styles.warningLabel}>⚠️ Règle de Sécurité Maritime :</Text>
        <Text style={styles.warningDesc}>Enfants de moins de 4 ans non admis à bord.</Text>
      </View>
    </View>
  )
}
