/**
 * @file components/sections/cdc/ProSection1.tsx
 * @description Section 1 — Contexte et Objectifs du Projet (Format Pro).
 */
import { Text, View, StyleSheet } from '../../../shims/react-pdf'
import { colors, fontSizes, spacing, fontFamilies, borders } from '../../../styles/tokens'

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing['3xl'],
  },
  sectionTitle: {
    fontSize: fontSizes.xl,
    fontFamily: fontFamilies.bold,
    color: colors.textDark,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: spacing.xs,
  },
  titleUnderline: {
    height: 1.5,
    backgroundColor: colors.primary,
    marginBottom: spacing.md,
  },
  introParagraph: {
    fontSize: fontSizes.sm + 0.5,
    fontFamily: fontFamilies.base,
    color: colors.textBase,
    lineHeight: 1.45,
    marginBottom: spacing.lg,
  },
  kpiRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borders.radiusSmall,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
  },
  kpiNumber: {
    fontSize: fontSizes.xl,
    fontFamily: fontFamilies.bold,
    color: colors.primary,
    marginBottom: 2,
  },
  kpiLabel: {
    fontSize: fontSizes.micro + 0.5,
    fontFamily: fontFamilies.bold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  calloutBox: {
    backgroundColor: colors.bgCallout,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    borderRadius: borders.radiusSmall,
    padding: spacing.md,
  },
  calloutTitle: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
    marginBottom: spacing.xs,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bulletDot: {
    fontSize: fontSizes.sm,
    color: colors.primary,
    width: 10,
    marginTop: 1,
  },
  bulletText: {
    flex: 1,
    fontSize: fontSizes.xs + 0.5,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
    lineHeight: 1.4,
  },
})

export function ProSection1() {
  return (
    <View style={styles.container} wrap={false}>
      {/* Titre 1 */}
      <Text style={styles.sectionTitle}>1. CONTEXTE ET OBJECTIFS DU PROJET</Text>
      <View style={styles.titleUnderline} />

      {/* Paragraphe d'intro */}
      <Text style={styles.introParagraph}>
        L'entreprise <Text style={{ fontFamily: fontFamilies.bold }}>Ti'Baleine</Text> est spécialisée dans les excursions maritimes à la journée : observation des baleines et des dauphins, sorties au coucher de soleil (« Sunset ») et privatisations de navires. Afin de moderniser la prise de commande, de rationaliser le suivi des jauges et de simplifier l'organisation opérationnelle au quotidien, l'entreprise souhaite déployer une <Text style={{ fontFamily: fontFamilies.bold }}>plateforme web sur-mesure</Text>.
      </Text>

      {/* 4 KPIs Cards */}
      <View style={styles.kpiRow}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiNumber}>100%</Text>
          <Text style={styles.kpiLabel}>CANAL EN LIGNE</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiNumber}>60%</Text>
          <Text style={styles.kpiLabel}>CLIENTÈLE ÉTRANGÈRE</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiNumber}>36</Text>
          <Text style={styles.kpiLabel}>CAPACITÉ MAX / CRÉNEAU</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiNumber}>3</Text>
          <Text style={styles.kpiLabel}>DÉPARTS / JOUR</Text>
        </View>
      </View>

      {/* Callout Objectifs Clés */}
      <View style={styles.calloutBox}>
        <Text style={styles.calloutTitle}>Objectifs Clés du Projet</Text>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>
            <Text style={{ fontFamily: fontFamilies.bold }}>Canal de vente 100 % en ligne :</Text> Permettre aux clients (locaux et touristes) de réserver et payer leurs sorties directement sur internet.
          </Text>
        </View>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>
            <Text style={{ fontFamily: fontFamilies.bold }}>Interface Multilingue :</Text> Adapter le parcours aux besoins de la clientèle étrangère (~60 %) via un support multi-langues.
          </Text>
        </View>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>
            <Text style={{ fontFamily: fontFamilies.bold }}>Gestion simplifiée :</Text> Mettre à disposition un espace d'administration épuré sur ordinateur, focalisé sur la consultation du planning sans complexité inutile.
          </Text>
        </View>
      </View>
    </View>
  )
}
