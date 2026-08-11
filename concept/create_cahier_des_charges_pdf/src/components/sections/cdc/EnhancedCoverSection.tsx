/**
 * @file components/sections/cdc/EnhancedCoverSection.tsx
 * @description Page de couverture prestige pour le Cahier des Charges Ti'Baleine.
 */
import { Text, View, StyleSheet } from '../../../shims/react-pdf'
import { colors, fontSizes, spacing, fontFamilies, borders } from '../../../styles/tokens'

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 44,
    paddingVertical: 40,
    backgroundColor: '#ffffff',
  },
  topAccentBar: {
    width: '100%',
    height: 5,
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginBottom: spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing['5xl'],
  },
  clientBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryDeep,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: borders.radiusSmall,
  },
  clientBadgeText: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: colors.white,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  statusBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: borders.radiusSmall,
  },
  statusBadgeText: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
    letterSpacing: 0.4,
  },
  heroBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  heroBadgeIcon: {
    fontSize: 26,
  },
  tagline: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: colors.primary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  mainTitle: {
    fontSize: 26,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDeep,
    letterSpacing: -0.4,
    lineHeight: 1.2,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSizes.md,
    fontFamily: fontFamilies.base,
    color: colors.textMuted,
    lineHeight: 1.4,
    marginBottom: spacing.xxl,
  },
  kpiGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing['4xl'],
  },
  kpiCard: {
    flex: 1,
    backgroundColor: colors.bgSection,
    borderRadius: borders.radiusMedium,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.md,
  },
  kpiValue: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
    marginBottom: 2,
  },
  kpiLabel: {
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.base,
    color: colors.textMuted,
    lineHeight: 1.3,
  },
  metaContainer: {
    backgroundColor: colors.primarySuperLight,
    borderRadius: borders.radiusMedium,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderFocus,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  metaRowLast: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  metaLabel: {
    width: 90,
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.bold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  metaValue: {
    flex: 1,
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: colors.textDark,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  footerLeft: {
    fontSize: fontSizes.micro,
    color: colors.textSubtle,
    fontFamily: fontFamilies.base,
    letterSpacing: 0.3,
  },
  footerRight: {
    fontSize: fontSizes.micro,
    color: colors.textSubtle,
    fontFamily: fontFamilies.base,
  },
})

export function EnhancedCoverSection() {
  return (
    <View style={styles.page}>
      {/* Top Header */}
      <View>
        <View style={styles.topAccentBar} />
        <View style={styles.headerRow}>
          <View style={styles.clientBadge}>
            <Text style={styles.clientBadgeText}>Ti'Baleine · Excursions</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>Version 1.0 · 2026</Text>
          </View>
        </View>
      </View>

      {/* Main Title & Hero */}
      <View>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeIcon}>🐋</Text>
        </View>

        <Text style={styles.tagline}>Spécifications & Cadrage Projet</Text>
        <Text style={styles.mainTitle}>Cahier des Charges Fonctionnel</Text>
        <Text style={styles.subtitle}>Plateforme Web de Réservation en Ligne & Gestion d'Excursions</Text>

        {/* 4 KPI Hero Stats */}
        <View style={styles.kpiGrid}>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiValue}>2 Navires</Text>
            <Text style={styles.kpiLabel}>Tikap (12) & Grand Bleu (24)</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiValue}>36 Places</Text>
            <Text style={styles.kpiLabel}>Capacité max. par créneau</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiValue}>60% Int.</Text>
            <Text style={styles.kpiLabel}>Clientèle multilingue ciblée</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiValue}>100% Web</Text>
            <Text style={styles.kpiLabel}>Paiement CB & Facture PDF</Text>
          </View>
        </View>

        {/* Metadata Card */}
        <View style={styles.metaContainer}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Commanditaire</Text>
            <Text style={styles.metaValue}>Ti'Baleine (Sorties baleines, dauphins & sunset)</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Équipe Projet</Text>
            <Text style={styles.metaValue}>Thomas, Loïc, Benjamin et Ivan</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Interface</Text>
            <Text style={styles.metaValue}>Support multilingue (Public) & Espace d'administration (PC)</Text>
          </View>
          <View style={styles.metaRowLast}>
            <Text style={styles.metaLabel}>Statut</Text>
            <Text style={styles.metaValue}>Document de cadrage validé pour développement</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footerRow}>
        <Text style={styles.footerLeft}>DOCUMENT CONFIDENTIEL · PROJET TI'BALEINE</Text>
        <Text style={styles.footerRight}>2026 — Version 1.0</Text>
      </View>
    </View>
  )
}
