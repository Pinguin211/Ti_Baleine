/**
 * @file components/sections/cdc/ProSection4.tsx
 * @description Section 4 — Description des Fonctionnalités (Client & Admin).
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
  subsectionTitle: {
    fontSize: fontSizes.md,
    fontFamily: fontFamilies.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  stepCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    marginTop: 1,
  },
  stepCircleText: {
    color: colors.white,
    fontSize: fontSizes.xxs + 0.5,
    fontFamily: fontFamilies.bold,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: fontSizes.xs + 0.5,
    fontFamily: fontFamilies.bold,
    color: colors.textDark,
    marginBottom: 2,
  },
  stepText: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
    lineHeight: 1.35,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  bulletDot: {
    fontSize: fontSizes.xs,
    color: colors.textDark,
    width: 10,
    marginTop: 1,
  },
  bulletText: {
    flex: 1,
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
    lineHeight: 1.35,
  },
})

const clientSteps = [
  {
    num: "1",
    title: "Consultation & Sélection de la Prestation",
    text: "Choix du type de sortie (Baleines, Dauphins, Privatisation). Bascule de langue accessible à tout moment via le sélecteur multilingue.",
  },
  {
    num: "2",
    title: "Choix de la Date et du Créneau",
    text: "Affichage dynamique des créneaux disponibles (7h, 10h, 14h). Masquage automatique des jours de fermeture (25/12 et 01/01) et des créneaux complets ou clos (< 2h avant le départ).",
  },
  {
    num: "3",
    title: "Saisie des Participants & Coordonnées",
    text: "Sélection du nombre d'adultes et d'enfants (hors enfants de moins de 4 ans, non admis en ligne). Formulaire de contact minimaliste (Nom, Prénom, E-mail, Téléphone).",
  },
  {
    num: "4",
    title: "Paiement & Confirmation",
    text: "Paiement intégral par Carte Bancaire sur passerelle sécurisée. Validation immédiate à l'écran et envoi automatique d'un e-mail de confirmation avec facture PDF attachée.",
  },
]

export function ProSection4() {
  return (
    <View style={styles.container} wrap={false}>
      {/* Titre 4 */}
      <Text style={styles.sectionTitle}>4. DESCRIPTION DES FONCTIONNALITÉS</Text>
      <View style={styles.titleUnderline} />

      {/* 4.1 Parcours Public (Client) */}
      <Text style={styles.subsectionTitle}>4.1 Parcours Public (Client)</Text>
      {clientSteps.map((step) => (
        <View key={step.num} style={styles.stepItem}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepCircleText}>{step.num}</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepText}>{step.text}</Text>
          </View>
        </View>
      ))}

      {/* 4.2 Espace d'Administration (Entreprise) */}
      <View style={{ marginTop: spacing.md }}>
        <Text style={styles.subsectionTitle}>4.2 Espace d'Administration (Entreprise)</Text>

        <View style={styles.bulletRow}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>
            <Text style={{ fontFamily: fontFamilies.bold }}>Accès Sécurisé Unique :</Text> Un seul compte administrateur dédié à l'entreprise (usage sur ordinateur PC/Desktop, aucun sous-compte).
          </Text>
        </View>

        <View style={styles.bulletRow}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>
            <Text style={{ fontFamily: fontFamilies.bold }}>Consultation du Planning :</Text> Visualisation synthétique et consultation des réservations par jour et par créneau (consultation seule). Suivi du taux de remplissage selon les jauges (12, 24, 36 places) pour faciliter le dispatch opérationnel avant l'embarquement.
          </Text>
        </View>

        <View style={styles.bulletRow}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>
            <Text style={{ fontFamily: fontFamilies.bold }}>Traitement des Annulations & Remboursements :</Text> Aucune annulation en ligne. Traitement direct hors système entre le client et l'entreprise (par téléphone, mail ou sur place) pour l'annulation et le remboursement financier.
          </Text>
        </View>
      </View>
    </View>
  )
}
