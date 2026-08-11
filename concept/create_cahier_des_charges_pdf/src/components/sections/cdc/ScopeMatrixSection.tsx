/**
 * @file components/sections/cdc/ScopeMatrixSection.tsx
 * @description Section 2 — Matrice comparative In-Scope vs Out-of-Scope.
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
  matrixRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  colIn: {
    flex: 1,
    backgroundColor: '#f0fdf4',
    borderRadius: borders.radiusMedium,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    padding: spacing.md,
  },
  colOut: {
    flex: 1.1,
    backgroundColor: '#fff1f2',
    borderRadius: borders.radiusMedium,
    borderWidth: 1,
    borderColor: '#fecdd3',
    padding: spacing.md,
  },
  headerBadgeIn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingBottom: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: '#bbf7d0',
  },
  headerBadgeOut: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingBottom: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: '#fecdd3',
  },
  tagPillIn: {
    backgroundColor: colors.success,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 3,
    marginRight: spacing.xs,
  },
  tagPillOut: {
    backgroundColor: colors.error,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 3,
    marginRight: spacing.xs,
  },
  tagPillText: {
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.bold,
    color: colors.white,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.bold,
    color: colors.textDark,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  iconCheck: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: colors.success,
    width: 14,
    marginTop: 1,
  },
  iconCross: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: colors.error,
    width: 14,
    marginTop: 1,
  },
  itemTextIn: {
    flex: 1,
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: '#166534',
    lineHeight: 1.35,
  },
  itemTextOut: {
    flex: 1,
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: '#9f1239',
    lineHeight: 1.35,
  },
  keyDecisionsBox: {
    backgroundColor: colors.bgSection,
    borderRadius: borders.radiusMedium,
    borderLeftWidth: 3,
    borderLeftColor: colors.primaryDark,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  decisionsTitle: {
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.bold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: spacing.xxs,
  },
  decisionsContent: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
    lineHeight: 1.4,
  },
})

const inScopeList = [
  "Site public de réservation responsive (mobile, tablette, PC).",
  "Parcours invité simplifié sans création obligatoire de compte.",
  "Module de paiement en ligne 100% sécurisé par Carte Bancaire.",
  "Émission et envoi automatique des factures PDF par e-mail.",
  "Interface d'administration sur PC pour la consultation du planning.",
  "Support multilingue natif sur tout le parcours client.",
]

const outScopeList = [
  "Pas de solution SaaS tierce (développement sur-mesure exclusif).",
  "Pas de compte client ni espace membre.",
  "Pas d'annulation directe en ligne par les clients.",
  "Pas de multi-utilisateurs ni sous-comptes capitaines/vendeurs.",
  "Pas de modification manuelle des créneaux dans le planning.",
  "Pas d'algorithme de dispatch automatique des passagers par bateau.",
  "Pas de gestion automatisée des remboursements (traitement direct).",
  "Pas de registre légal de manifeste de bord dématérialisé.",
  "Pas de synchronisation avec des agendas externes (Google/Outlook).",
  "Pas d'alertes automatiques par e-mail/SMS vers l'administrateur.",
]

export function ScopeMatrixSection() {
  return (
    <View style={styles.container} wrap={false}>
      {/* Chapter Title */}
      <View style={styles.chapterTitleRow}>
        <View style={styles.chapterNumberBadge}>
          <Text style={styles.chapterNumberText}>2</Text>
        </View>
        <Text style={styles.chapterTitle}>Périmètre du Projet (In-Scope & Out-of-Scope)</Text>
      </View>
      <View style={styles.chapterRule} />

      {/* Comparative Matrix */}
      <View style={styles.matrixRow}>
        {/* In-Scope */}
        <View style={styles.colIn}>
          <View style={styles.headerBadgeIn}>
            <View style={styles.tagPillIn}>
              <Text style={styles.tagPillText}>Inclus</Text>
            </View>
            <Text style={styles.headerTitle}>2.1 Périmètre Retenu</Text>
          </View>
          {inScopeList.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.iconCheck}>✓</Text>
              <Text style={styles.itemTextIn}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Out-of-Scope */}
        <View style={styles.colOut}>
          <View style={styles.headerBadgeOut}>
            <View style={styles.tagPillOut}>
              <Text style={styles.tagPillText}>Exclu</Text>
            </View>
            <Text style={styles.headerTitle}>2.2 Hors Périmètre</Text>
          </View>
          {outScopeList.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.iconCross}>✗</Text>
              <Text style={styles.itemTextOut}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Architecture Decision note */}
      <View style={styles.keyDecisionsBox}>
        <Text style={styles.decisionsTitle}>Principe Directeur de Conception</Text>
        <Text style={styles.decisionsContent}>
          Le système privilégie la <Text style={{ fontFamily: fontFamilies.bold }}>fluidité transactionnelle sans friction</Text> pour les réservations en ligne,
          tout en conservant les opérations maritimes physiques (dispatch à quai, registre papier, gestion humaine des annulations) entre les mains de l'équipe.
        </Text>
      </View>
    </View>
  )
}
