/**
 * @file components/sections/cdc/ProSection2.tsx
 * @description Section 2 — Périmètre du Projet (In-Scope vs Out-of-Scope).
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
  scopeRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  scopeBoxIn: {
    flex: 1,
    backgroundColor: colors.white,
    borderLeftWidth: 3,
    borderLeftColor: colors.greenBorder,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borders.radiusSmall,
    padding: spacing.md,
  },
  scopeBoxOut: {
    flex: 1.1,
    backgroundColor: '#fffdfd',
    borderLeftWidth: 3,
    borderLeftColor: colors.redBorder,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borders.radiusSmall,
    padding: spacing.md,
  },
  scopeHeaderIn: {
    fontSize: fontSizes.sm + 0.5,
    fontFamily: fontFamilies.bold,
    color: colors.greenText,
    marginBottom: spacing.sm,
  },
  scopeHeaderOut: {
    fontSize: fontSizes.sm + 0.5,
    fontFamily: fontFamilies.bold,
    color: colors.redText,
    marginBottom: spacing.sm,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  bulletDot: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    width: 8,
    marginTop: 1,
  },
  bulletText: {
    flex: 1,
    fontSize: fontSizes.xs + 0.2,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
    lineHeight: 1.35,
  },
})

const inScope = [
  { bold: "Site web public de réservation", rest: " responsive (mobile, tablette, desktop)." },
  { bold: "Parcours de commande fluide sans création de compte", rest: " (invité)." },
  { bold: "Paiement en ligne 100 % sécurisé", rest: " par Carte Bancaire." },
  { bold: "Génération et envoi automatique de factures PDF", rest: " post-paiement." },
  { bold: "Interface d'administration unique", rest: " (sur Desktop/PC) pour consultation du planning." },
  { bold: "Support multilingue nativement intégré", rest: " sur le parcours client." },
]

const outScope = [
  { bold: "Pas de solution SaaS tierce", rest: " (développement sur-mesure exclusif)." },
  { bold: "Pas de compte client ni d'espace membre dédié", rest: "." },
  { bold: "Pas d'annulation ni modification en ligne par le client", rest: "." },
  { bold: "Pas d'accès multi-utilisateurs", rest: " (aucun compte spécifique capitaines/vendeurs)." },
  { bold: "Pas de modification du planning en admin", rest: " (consultation seule, planning fixe)." },
  { bold: "Pas de module de dispatch automatisé par bateau", rest: " (fait sur place)." },
  { bold: "Pas de gestion automatisée des remboursements", rest: " (traités hors plateforme)." },
  { bold: "Pas de registre légal / manifeste de bord maritime", rest: " (format papier)." },
  { bold: "Pas de synchronisation agendas externes", rest: " (Google Calendar, etc.)." },
  { bold: "Pas de notifications/alertes automatiques e-mail/SMS", rest: " à l'administrateur." },
]

export function ProSection2() {
  return (
    <View style={styles.container} wrap={false}>
      {/* Titre 2 */}
      <Text style={styles.sectionTitle}>2. PÉRIMÈTRE DU PROJET</Text>
      <View style={styles.titleUnderline} />

      {/* Colonnes In-Scope / Out-of-Scope */}
      <View style={styles.scopeRow}>
        {/* In-Scope */}
        <View style={styles.scopeBoxIn}>
          <Text style={styles.scopeHeaderIn}>✔ Dans le Périmètre (In-Scope)</Text>
          {inScope.map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={[styles.bulletDot, { color: colors.greenText }]}>•</Text>
              <Text style={styles.bulletText}>
                <Text style={{ fontFamily: fontFamilies.bold }}>{item.bold}</Text>
                {item.rest}
              </Text>
            </View>
          ))}
        </View>

        {/* Out-of-Scope */}
        <View style={styles.scopeBoxOut}>
          <Text style={styles.scopeHeaderOut}>✖ Hors Périmètre (Out-of-Scope)</Text>
          {outScope.map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={[styles.bulletDot, { color: colors.redText }]}>•</Text>
              <Text style={styles.bulletText}>
                <Text style={{ fontFamily: fontFamilies.bold }}>{item.bold}</Text>
                {item.rest}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}
