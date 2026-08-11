/**
 * @file components/sections/cdc/ScopeSection.tsx
 * @description Section périmètre — affichage deux colonnes In-Scope / Out-of-Scope.
 */
import { Text, View, StyleSheet } from '../../../shims/react-pdf'
import { colors, fontSizes, spacing, borders } from '../../../styles/tokens'

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    gap: 0,
  },
  col: {
    flex: 1,
    marginRight: spacing.lg,
  },
  colLast: {
    marginRight: 0,
  },
  colHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
  },
  colHeaderIn: {
    borderBottomColor: colors.success,
  },
  colHeaderOut: {
    borderBottomColor: colors.error,
  },
  badge: {
    fontSize: fontSizes.xxs,
    fontFamily: 'Helvetica-Bold',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: borders.radiusSmall,
    marginRight: spacing.sm,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  badgeIn: {
    backgroundColor: '#dcfce7',
    color: colors.success,
  },
  badgeOut: {
    backgroundColor: '#fee2e2',
    color: colors.error,
  },
  colTitle: {
    fontSize: fontSizes.sm,
    fontFamily: 'Helvetica-Bold',
    color: colors.textBase,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  bullet: {
    width: 14,
    fontSize: fontSizes.xs,
    fontFamily: 'Helvetica-Bold',
    marginTop: 1,
  },
  bulletIn: {
    color: colors.success,
  },
  bulletOut: {
    color: colors.error,
  },
  itemText: {
    flex: 1,
    fontSize: fontSizes.xs,
    fontFamily: 'Helvetica',
    color: colors.textBody,
    lineHeight: 1.5,
  },
})

const inScope = [
  "Site web public de réservation (mobile, tablette, desktop).",
  "Parcours de commande sans création de compte.",
  "Module de paiement en ligne sécurisé par Carte Bancaire.",
  "Génération et envoi automatique de factures PDF.",
  "Interface d'administration Desktop/PC (consultation planning).",
  "Support multilingue sur l'ensemble du parcours client.",
]

const outScope = [
  "Pas de solution SaaS tierce.",
  "Pas de compte client ni espace membre.",
  "Pas d'annulation en ligne par le client.",
  "Pas d'accès multi-utilisateurs ni de sous-comptes.",
  "Pas de modification des créneaux dans le planning.",
  "Pas de répartition automatique des passagers par bateau.",
  "Pas de gestion automatisée des remboursements.",
  "Pas de manifeste de bord maritime.",
  "Pas de synchronisation avec agendas externes.",
  "Pas de notifications/alertes automatiques vers l'admin.",
]

export function ScopeSection() {
  return (
    <View style={styles.container}>
      {/* Colonne In-Scope */}
      <View style={styles.col}>
        <View style={[styles.colHeader, styles.colHeaderIn]}>
          <Text style={[styles.badge, styles.badgeIn]}>✓ Inclus</Text>
          <Text style={styles.colTitle}>In-Scope</Text>
        </View>
        {inScope.map((item, i) => (
          <View key={i} style={styles.item}>
            <Text style={[styles.bullet, styles.bulletIn]}>✓</Text>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Colonne Out-of-Scope */}
      <View style={[styles.col, styles.colLast]}>
        <View style={[styles.colHeader, styles.colHeaderOut]}>
          <Text style={[styles.badge, styles.badgeOut]}>✗ Exclu</Text>
          <Text style={styles.colTitle}>Out-of-Scope</Text>
        </View>
        {outScope.map((item, i) => (
          <View key={i} style={styles.item}>
            <Text style={[styles.bullet, styles.bulletOut]}>✗</Text>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
