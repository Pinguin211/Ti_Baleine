/**
 * @file components/sections/cdc/ProHeroHeader.tsx
 * @description En-tête principal du document (Boîte Hero Navy du Cahier des Charges).
 */
import { Text, View, StyleSheet } from '../../../shims/react-pdf'
import { colors, fontSizes, spacing, fontFamilies, borders } from '../../../styles/tokens'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.navyDark,
    borderRadius: borders.radiusLarge,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    marginBottom: spacing['3xl'],
  },
  pillTag: {
    backgroundColor: '#1e3a5f',
    borderWidth: 1,
    borderColor: '#2e588a',
    borderRadius: borders.radiusSmall,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  pillTagText: {
    fontSize: fontSizes.micro + 0.5,
    fontFamily: fontFamilies.bold,
    color: '#93c5fd',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  mainTitle: {
    fontSize: fontSizes.hero,
    fontFamily: fontFamilies.bold,
    color: colors.white,
    letterSpacing: -0.3,
    marginBottom: 3,
  },
  subtitle: {
    fontSize: fontSizes.md,
    fontFamily: fontFamilies.base,
    color: '#bae6fd',
    marginBottom: spacing.lg,
  },
  divider: {
    height: 1,
    backgroundColor: '#1e3a5f',
    marginBottom: spacing.md,
  },
  metaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaCol: {
    flex: 1,
  },
  metaLabel: {
    fontSize: fontSizes.micro + 0.5,
    fontFamily: fontFamilies.bold,
    color: '#93c5fd',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  metaValue: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: colors.white,
  },
})

export function ProHeroHeader() {
  return (
    <View style={styles.container}>
      {/* Badge Haut */}
      <View style={styles.pillTag}>
        <Text style={styles.pillTagText}>SPÉCIFICATIONS TECHNIQUES & FONCTIONNELLES</Text>
      </View>

      {/* Titres */}
      <Text style={styles.mainTitle}>Cahier des Charges Fonctionnel</Text>
      <Text style={styles.subtitle}>Plateforme Web de Réservation en Ligne — Ti'Baleine</Text>

      <View style={styles.divider} />

      {/* Métadonnées en 3 colonnes */}
      <View style={styles.metaGrid}>
        <View style={styles.metaCol}>
          <Text style={styles.metaLabel}>COMMANDITAIRE</Text>
          <Text style={styles.metaValue}>Ti'Baleine</Text>
        </View>
        <View style={[styles.metaCol, { flex: 1.3 }]}>
          <Text style={styles.metaLabel}>ÉQUIPE DE RÉALISATION</Text>
          <Text style={styles.metaValue}>Thomas, Loïc, Benjamin & Ivan</Text>
        </View>
        <View style={styles.metaCol}>
          <Text style={styles.metaLabel}>LANGUES INTERFACE</Text>
          <Text style={styles.metaValue}>Multilingue (Public)</Text>
        </View>
      </View>
    </View>
  )
}
