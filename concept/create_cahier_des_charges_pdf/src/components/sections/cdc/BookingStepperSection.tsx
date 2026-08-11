/**
 * @file components/sections/cdc/BookingStepperSection.tsx
 * @description Section 4.1 — Parcours Client de Réservation en 4 Étapes Visuelles.
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
    fontFamilies: fontFamilies.bold,
    color: colors.primaryDeep,
  },
  chapterRule: {
    height: 2,
    backgroundColor: colors.primaryLight,
    marginBottom: spacing.md,
  },
  sectionSub: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },
  stepperGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  stepCard: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderRadius: borders.radiusMedium,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.md,
  },
  stepTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  stepBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.xs,
  },
  stepBadgeText: {
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.bold,
    color: colors.white,
  },
  stepTitle: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: colors.textDark,
  },
  stepDetail: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
    lineHeight: 1.35,
  },
})

const steps = [
  {
    num: "1",
    title: "Sélection Prestation",
    desc: "Choix de l'excursion (Baleines, Dauphins, Sunset) et choix immédiat de la langue sur l'interface.",
  },
  {
    num: "2",
    title: "Date & Créneau",
    desc: "Sélection des départs (7h, 10h, 14h) avec masquage automatique des complets et clôture à H-2.",
  },
  {
    num: "3",
    title: "Participants & Contact",
    desc: "Saisie adultes/enfants et coordonnées minimales (Nom, E-mail, Tél) sans création de compte.",
  },
  {
    num: "4",
    title: "Paiement & Facture",
    desc: "Paiement 100% CB sécurisé, validation instantanée à l'écran et envoi automatique de la facture PDF.",
  },
]

export function BookingStepperSection() {
  return (
    <View style={styles.container} wrap={false}>
      {/* Chapter Title */}
      <View style={styles.chapterTitleRow}>
        <View style={styles.chapterNumberBadge}>
          <Text style={styles.chapterNumberText}>4</Text>
        </View>
        <Text style={styles.chapterTitle}>Description des Fonctionnalités</Text>
      </View>
      <View style={styles.chapterRule} />

      <Text style={styles.sectionSub}>4.1 Parcours Public (Client) — 4 Étapes Sans Friction</Text>
      <View style={styles.stepperGrid}>
        {steps.map((step) => (
          <View key={step.num} style={styles.stepCard}>
            <View style={styles.stepTop}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>{step.num}</Text>
              </View>
              <Text style={styles.stepTitle}>{step.title}</Text>
            </View>
            <Text style={styles.stepDetail}>{step.desc}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
