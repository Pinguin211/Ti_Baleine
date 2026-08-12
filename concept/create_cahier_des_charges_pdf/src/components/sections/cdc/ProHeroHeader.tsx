/**
 * @file components/sections/cdc/ProHeroHeader.tsx
 * @description En-tête principal du document (Boîte Hero Navy du Cahier des Charges v2).
 */
import { Text, View, StyleSheet } from '../../../shims/react-pdf'
import { colors, fontSizes, spacing, fontFamilies, borders } from '../../../styles/tokens'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.navyDark,
    borderRadius: borders.radiusLarge,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    marginBottom: spacing['2xl'],
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  pillTag: {
    backgroundColor: '#1e3a5f',
    borderWidth: 1,
    borderColor: '#2e588a',
    borderRadius: borders.radiusSmall,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2.5,
  },
  pillTagText: {
    fontSize: fontSizes.micro + 0.5,
    fontFamily: fontFamilies.bold,
    color: '#93c5fd',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  versionTag: {
    fontSize: fontSizes.xxs + 0.5,
    fontFamily: fontFamilies.bold,
    color: '#bae6fd',
    backgroundColor: '#0369a1',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borders.radiusSmall,
  },
  mainTitle: {
    fontSize: fontSizes.hero - 1,
    fontFamily: fontFamilies.bold,
    color: colors.white,
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: fontSizes.sm + 0.5,
    fontFamily: fontFamilies.base,
    color: '#bae6fd',
    marginBottom: spacing.md,
  },
  principleBox: {
    backgroundColor: '#122b47',
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    borderRadius: borders.radiusSmall,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    marginBottom: spacing.md,
  },
  principleText: {
    fontSize: fontSizes.xxs + 0.5,
    fontFamily: fontFamilies.italic,
    color: '#e0f2fe',
    lineHeight: 1.35,
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
    marginBottom: 1,
  },
  metaValue: {
    fontSize: fontSizes.xxs + 1,
    fontFamily: fontFamilies.base,
    color: colors.white,
  },
})

export function ProHeroHeader() {
  return (
    <View style={styles.container}>
      {/* Ligne haute : Badge + Version */}
      <View style={styles.topRow}>
        <View style={styles.pillTag}>
          <Text style={styles.pillTagText}>CAHIER DES CHARGES — DOCUMENT DE CADRAGE</Text>
        </View>
        <Text style={styles.versionTag}>Version v2 — 11/08/2026</Text>
      </View>

      {/* Titres */}
      <Text style={styles.mainTitle}>Cahier des Charges — Ti'Baleine</Text>
      <Text style={styles.subtitle}>Plateforme Web de Réservation en Ligne & Gestion Opérationnelle</Text>

      {/* Règle de cadrage */}
      <View style={styles.principleBox}>
        <Text style={styles.principleText}>
          « Ce document formalise le problème compris, pas la solution. Aucun nom de technologie, aucun nom de framework, aucune structure de base de données ici. »
        </Text>
      </View>

      <View style={styles.divider} />

      {/* Métadonnées en 3 colonnes */}
      <View style={styles.metaGrid}>
        <View style={styles.metaCol}>
          <Text style={styles.metaLabel}>COMMANDITAIRE</Text>
          <Text style={styles.metaValue}>Ti'Baleine</Text>
        </View>
        <View style={[styles.metaCol, { flex: 1.4 }]}>
          <Text style={styles.metaLabel}>ÉQUIPE & GROUPE</Text>
          <Text style={styles.metaValue}>Thomas, Loïc, Benjamin & Ivan | RageGit</Text>
        </View>
        <View style={styles.metaCol}>
          <Text style={styles.metaLabel}>SOURCES CONSIGNÉES</Text>
          <Text style={styles.metaValue}>CR-01 (10/08) & CR-02 (17/08)</Text>
        </View>
      </View>
    </View>
  )
}
