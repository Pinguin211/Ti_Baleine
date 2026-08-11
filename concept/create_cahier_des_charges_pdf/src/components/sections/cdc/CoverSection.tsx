/**
 * @file components/sections/cdc/CoverSection.tsx
 * @description Page de couverture du cahier des charges Ti'Baleine.
 *
 * Affiche : titre principal, sous-titre, client, équipe, date.
 */
import { Text, View } from '../../../shims/react-pdf'
import { usePdfSources } from '../../../context/PdfSourceContext'
import { colors, fontSizes, spacing } from '../../../styles/tokens'
import { StyleSheet } from '../../../shims/react-pdf'
import type { CdcSources } from '../../../cahier-des-charges'

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 56,
    paddingVertical: 56,
  },
  topBand: {
    width: '100%',
    height: 6,
    backgroundColor: colors.primary,
    marginBottom: 0,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing['7xl'],
  },
  clientTag: {
    fontSize: fontSizes.xs,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 3,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  versionTag: {
    fontSize: fontSizes.xs,
    color: colors.textSubtle,
    fontFamily: 'Helvetica',
    letterSpacing: 0.3,
  },
  heroBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing['4xl'],
  },
  heroBadgeText: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
  },
  titleBlock: {
    marginBottom: spacing['5xl'],
  },
  tagline: {
    fontSize: fontSizes.xs,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: spacing.xl,
  },
  mainTitle: {
    fontSize: 30,
    fontFamily: 'Helvetica-Bold',
    color: colors.textDark,
    letterSpacing: -0.5,
    lineHeight: 1.2,
    marginBottom: spacing.xl,
  },
  subtitle: {
    fontSize: fontSizes.lg,
    fontFamily: 'Helvetica',
    color: colors.textMuted,
    lineHeight: 1.5,
  },
  divider: {
    height: 2,
    backgroundColor: colors.primaryLight,
    marginVertical: spacing['5xl'],
    width: 64,
  },
  infoGrid: {
    flexDirection: 'column',
    gap: 0,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  infoLabel: {
    fontSize: fontSizes.xs,
    fontFamily: 'Helvetica-Bold',
    color: colors.textMuted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    width: 100,
    paddingTop: 1,
  },
  infoValue: {
    fontSize: fontSizes.sm,
    fontFamily: 'Helvetica',
    color: colors.textBase,
    flex: 1,
    lineHeight: 1.5,
  },
  bottomBand: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    borderTopStyle: 'solid',
  },
  bottomLeft: {
    fontSize: fontSizes.xxs,
    color: colors.textSubtle,
    fontFamily: 'Helvetica',
  },
  bottomRight: {
    fontSize: fontSizes.xxs,
    color: colors.textSubtle,
    fontFamily: 'Helvetica',
  },
})

export function CoverSection() {
  const { meta } = usePdfSources<CdcSources>()

  return (
    <View style={styles.page}>
      {/* En-tête */}
      <View>
        <View style={styles.topBand} />
        <View style={{ height: spacing['4xl'] }} />
        <View style={styles.headerRow}>
          <Text style={styles.clientTag}>{meta.client}</Text>
          <Text style={styles.versionTag}>{meta.version} · {meta.date}</Text>
        </View>
      </View>

      {/* Corps central */}
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {/* Badge visuel */}
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>🐋</Text>
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.tagline}>Document Fonctionnel & Projet</Text>
          <Text style={styles.mainTitle}>{meta.title}</Text>
          <Text style={styles.subtitle}>{meta.subtitle}</Text>
        </View>

        <View style={styles.divider} />

        {/* Informations générales */}
        <View style={styles.infoGrid}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Projet</Text>
            <Text style={styles.infoValue}>Plateforme Web de Réservation et Gestion d'Excursions Maritimes</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Client</Text>
            <Text style={styles.infoValue}>{meta.client}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Équipe</Text>
            <Text style={styles.infoValue}>{meta.team}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Langues</Text>
            <Text style={styles.infoValue}>Support multilingue (plusieurs langues sur l'interface publique)</Text>
          </View>
        </View>
      </View>

      {/* Pied de page couverture */}
      <View style={styles.bottomBand}>
        <Text style={styles.bottomLeft}>CONFIDENTIEL · Usage interne</Text>
        <Text style={styles.bottomRight}>{meta.date} — {meta.version}</Text>
      </View>
    </View>
  )
}
