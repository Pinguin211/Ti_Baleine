/**
 * @file components/sections/cdc/ObjectiveCards.tsx
 * @description Section 1 — Contexte de l'Entreprise et 3 Piliers d'Objectifs.
 */
import { Text, View, StyleSheet } from '../../../shims/react-pdf'
import { colors, fontSizes, spacing, fontFamilies, borders } from '../../../styles/tokens'

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  chapterTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  chapterNumberBadge: {
    backgroundColor: colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  chapterNumberText: {
    color: colors.white,
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
  },
  chapterTitle: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDeep,
  },
  chapterRule: {
    height: 2,
    backgroundColor: colors.primaryLight,
    marginBottom: spacing.md,
  },
  introCard: {
    backgroundColor: colors.primarySuperLight,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    borderRadius: borders.radiusMedium,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderFocus,
  },
  introText: {
    fontSize: fontSizes.base,
    fontFamily: fontFamilies.base,
    color: colors.textBase,
    lineHeight: 1.45,
  },
  introHighlight: {
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
  },
  pillarsTitle: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },
  pillarsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  pillarCard: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borders.radiusMedium,
    padding: spacing.md,
  },
  pillarIconBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  pillarIcon: {
    fontSize: fontSizes.xs,
  },
  pillarHeading: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
    marginBottom: spacing.xxs,
  },
  pillarDesc: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
    lineHeight: 1.35,
  },
})

export function ObjectiveCards() {
  return (
    <View style={styles.container} wrap={false}>
      {/* Chapter Title */}
      <View style={styles.chapterTitleRow}>
        <View style={styles.chapterNumberBadge}>
          <Text style={styles.chapterNumberText}>1</Text>
        </View>
        <Text style={styles.chapterTitle}>Contexte et Objectifs du Projet</Text>
      </View>
      <View style={styles.chapterRule} />

      {/* 1.1 Contexte */}
      <View style={styles.introCard}>
        <Text style={styles.introText}>
          L'entreprise <Text style={styles.introHighlight}>Ti'Baleine</Text> propose des sorties maritimes d'exception :
          observation des baleines et des dauphins, formules « coucher de soleil » (Sunset) et privatisations de navires.
          Afin de rationaliser le suivi des places et de simplifier l'organisation au quotidien, le projet consiste à déployer
          une <Text style={styles.introHighlight}>plateforme web sur-mesure</Text> dédiée à la réservation en direct et à la gestion de l'activité.
        </Text>
      </View>

      {/* 1.2 Trois Piliers */}
      <Text style={styles.pillarsTitle}>1.2 Objectifs Stratégiques</Text>
      <View style={styles.pillarsRow}>
        <View style={styles.pillarCard}>
          <View style={styles.pillarIconBadge}>
            <Text style={styles.pillarIcon}>🌐</Text>
          </View>
          <Text style={styles.pillarHeading}>Canal 100% En Ligne</Text>
          <Text style={styles.pillarDesc}>
            Réservation et paiement sécurisé immédiat sans obligation de créer un compte client.
          </Text>
        </View>

        <View style={styles.pillarCard}>
          <View style={[styles.pillarIconBadge, { backgroundColor: '#cffafe' }]}>
            <Text style={styles.pillarIcon}>🌍</Text>
          </View>
          <Text style={[styles.pillarHeading, { color: colors.dolphinCyan }]}>Interface Multilingue</Text>
          <Text style={styles.pillarDesc}>
            Accueil fluide d'une clientèle à 60% étrangère grâce à la prise en charge de plusieurs langues.
          </Text>
        </View>

        <View style={styles.pillarCard}>
          <View style={[styles.pillarIconBadge, { backgroundColor: '#fef3c7' }]}>
            <Text style={styles.pillarIcon}>⚡</Text>
          </View>
          <Text style={[styles.pillarHeading, { color: colors.sunsetAmber }]}>Gestion Simplifiée</Text>
          <Text style={styles.pillarDesc}>
            Espace administrateur épuré sur ordinateur PC pour un suivi immédiat des réservations.
          </Text>
        </View>
      </View>
    </View>
  )
}
