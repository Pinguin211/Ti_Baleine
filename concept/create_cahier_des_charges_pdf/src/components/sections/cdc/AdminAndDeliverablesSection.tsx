/**
 * @file components/sections/cdc/AdminAndDeliverablesSection.tsx
 * @description Sections 4.2, 5 & 6 — Espace Admin, Exigences et Livrables du Projet.
 */
import { Text, View, StyleSheet } from '../../../shims/react-pdf'
import { colors, fontSizes, spacing, fontFamilies, borders } from '../../../styles/tokens'

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  adminBox: {
    backgroundColor: colors.primarySuperLight,
    borderRadius: borders.radiusMedium,
    borderLeftWidth: 3,
    borderLeftColor: colors.primaryDark,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderFocus,
  },
  adminHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  badgeAdmin: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 3,
    marginRight: spacing.xs,
  },
  badgeAdminText: {
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.bold,
    color: colors.white,
    textTransform: 'uppercase',
  },
  adminTitle: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDeep,
  },
  adminDesc: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
    lineHeight: 1.4,
  },
  twoColsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  colCard: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderRadius: borders.radiusMedium,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.md,
  },
  colHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  colNumberBadge: {
    backgroundColor: colors.primary,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.xs,
  },
  colNumberText: {
    color: colors.white,
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.bold,
  },
  colTitle: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDeep,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bulletIcon: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: colors.primary,
    width: 12,
    marginTop: 1,
  },
  bulletText: {
    flex: 1,
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
    lineHeight: 1.35,
  },
  checklistRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  checklistBox: {
    flex: 1,
    backgroundColor: '#f0fdf4',
    borderRadius: borders.radiusMedium,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    padding: spacing.md,
  },
  pendingBox: {
    flex: 1,
    backgroundColor: '#fffbeb',
    borderRadius: borders.radiusMedium,
    borderWidth: 1,
    borderColor: '#fde68a',
    padding: spacing.md,
  },
  checklistTitle: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: '#166534',
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pendingTitle: {
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.bold,
    color: '#92400e',
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
})

export function AdminAndDeliverablesSection() {
  return (
    <View style={styles.container} wrap={false}>
      {/* 4.2 Espace Administration */}
      <View style={styles.adminBox}>
        <View style={styles.adminHeaderRow}>
          <View style={styles.badgeAdmin}>
            <Text style={styles.badgeAdminText}>Desktop / PC</Text>
          </View>
          <Text style={styles.adminTitle}>4.2 Espace d'Administration Unique & Planning</Text>
        </View>
        <Text style={styles.adminDesc}>
          • <Text style={{ fontFamily: fontFamilies.bold }}>Profil Unique</Text> : Accès direct épuré pour l'entreprise (aucun sous-compte à gérer).{'\n'}
          • <Text style={{ fontFamily: fontFamilies.bold }}>Consultation Synthétique</Text> : Suivi visuel des réservations du jour et par créneau.{'\n'}
          • <Text style={{ fontFamily: fontFamilies.bold }}>Facilitation du Dispatch</Text> : Jauges de remplissage (12, 24, 36) pour organiser l'embarquement physique.{'\n'}
          • <Text style={{ fontFamily: fontFamilies.bold }}>Traitement Direct</Text> : Annulations et remboursements traités hors système avec le client.
        </Text>
      </View>

      {/* 5. Exigences Générales & Sécurité (2 colonnes) */}
      <View style={styles.twoColsRow}>
        <View style={styles.colCard}>
          <View style={styles.colHeaderRow}>
            <View style={styles.colNumberBadge}>
              <Text style={styles.colNumberText}>5</Text>
            </View>
            <Text style={styles.colTitle}>5.1 Ergonomie & Langues</Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bulletIcon}>•</Text>
            <Text style={styles.bulletText}>Simplicité d'usage pour des non-initiés.</Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bulletIcon}>•</Text>
            <Text style={styles.bulletText}>Multilinguisme natif sur tout le parcours.</Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bulletIcon}>•</Text>
            <Text style={styles.bulletText}>Interface adaptative (Smartphone, Tablette, PC).</Text>
          </View>
        </View>

        <View style={styles.colCard}>
          <View style={styles.colHeaderRow}>
            <View style={styles.colNumberBadge}>
              <Text style={styles.colNumberText}>5</Text>
            </View>
            <Text style={styles.colTitle}>5.2 Sécurité & RGPD</Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bulletIcon}>•</Text>
            <Text style={styles.bulletText}>Paiement CB sécurisé aux normes bancaires.</Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bulletIcon}>•</Text>
            <Text style={styles.bulletText}>Contrat monétique direct avec l'entreprise.</Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bulletIcon}>•</Text>
            <Text style={styles.bulletText}>Collecte minimale RGPD (Nom, E-mail, Tél).</Text>
          </View>
        </View>
      </View>

      {/* 6. Livrables & Points Clés */}
      <View style={styles.checklistRow}>
        <View style={styles.checklistBox}>
          <Text style={styles.checklistTitle}>6.1 Livrables Attendus</Text>
          <Text style={styles.bulletText}>✓ Plateforme web de réservation multilingue</Text>
          <Text style={styles.bulletText}>✓ Espace d'administration Desktop / PC</Text>
          <Text style={styles.bulletText}>✓ Module de facturation PDF automatique</Text>
          <Text style={styles.bulletText}>✓ Guide utilisateur synthétique pour l'admin</Text>
        </View>

        <View style={styles.pendingBox}>
          <Text style={styles.pendingTitle}>6.2 Points à Finaliser lors du Déploiement</Text>
          <Text style={styles.bulletText}>⏳ Choix du nom de domaine & hébergement</Text>
          <Text style={styles.bulletText}>⏳ Fourniture des CGV et mentions légales</Text>
          <Text style={styles.bulletText}>⏳ Validation finale des textes et traductions</Text>
        </View>
      </View>
    </View>
  )
}
