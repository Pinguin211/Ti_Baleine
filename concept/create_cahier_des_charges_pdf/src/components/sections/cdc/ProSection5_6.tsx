/**
 * @file components/sections/cdc/ProSection5_6.tsx
 * @description Sections 5 & 6 — Exigences, Sécurité & Livrables (Format Pro).
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
  twoColRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing['3xl'],
  },
  cardErgonomie: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopWidth: 3,
    borderTopColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borders.radiusSmall,
    padding: spacing.md,
  },
  cardSecurite: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopWidth: 3,
    borderTopColor: colors.navyDark,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borders.radiusSmall,
    padding: spacing.md,
  },
  cardTitle: {
    fontSize: fontSizes.xs + 0.8,
    fontFamily: fontFamilies.bold,
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bulletDot: {
    fontSize: fontSizes.xs,
    color: colors.textDark,
    width: 8,
    marginTop: 1,
  },
  bulletText: {
    flex: 1,
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
    lineHeight: 1.35,
  },
  subsectionTitle: {
    fontSize: fontSizes.md,
    fontFamily: fontFamilies.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  numRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  numText: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: colors.textDark,
    width: 16,
  },
})

export function ProSection5_6() {
  return (
    <View style={styles.container} wrap={false}>
      {/* ── 5. Exigences Générales ────────────────────────────────────────── */}
      <Text style={styles.sectionTitle}>5. EXIGENCES GÉNÉRALES, ERGONOMIE & SÉCURITÉ</Text>
      <View style={styles.titleUnderline} />

      <View style={styles.twoColRow}>
        {/* Ergonomie */}
        <View style={styles.cardErgonomie}>
          <Text style={styles.cardTitle}>Ergonomie & Ergonomie Web</Text>
          <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={{ fontFamily: fontFamilies.bold }}>Simplicité :</Text> Interface fluide, claire et intuitive pour des utilisateurs non-experts.
            </Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={{ fontFamily: fontFamilies.bold }}>Multilinguisme :</Text> Intégration native du choix des langues sur tout le parcours client.
            </Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={{ fontFamily: fontFamilies.bold }}>Design Adaptatif :</Text> Web responsive pour mobile/tablette (clients) et ordinateur (admin).
            </Text>
          </View>
        </View>

        {/* Sécurité */}
        <View style={styles.cardSecurite}>
          <Text style={styles.cardTitle}>Sécurité & Données (RGPD)</Text>
          <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={{ fontFamily: fontFamilies.bold }}>Paiement Sécurisé :</Text> Conforme aux normes bancaires monétiques en vigueur.
            </Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={{ fontFamily: fontFamilies.bold }}>Protection des données :</Text> Traitement des données strictement nécessaires à l'excursion et la facturation (Nom, E-mail, Tél).
            </Text>
          </View>
        </View>
      </View>

      {/* ── 6. Modalités d'Organisation et Livrables ──────────────────────── */}
      <Text style={styles.sectionTitle}>6. MODALITÉS D'ORGANISATION ET LIVRABLES</Text>
      <View style={styles.titleUnderline} />

      {/* 6.1 */}
      <View style={{ marginBottom: spacing.md }}>
        <Text style={styles.subsectionTitle}>6.1 Livrables Attendus</Text>
        <View style={styles.numRow}>
          <Text style={styles.numText}>1.</Text>
          <Text style={styles.bulletText}>
            <Text style={{ fontFamily: fontFamilies.bold }}>Plateforme Web Fonctionnelle :</Text> Module de réservation public multilingue, module d'administration Desktop/PC et module d'émission automatique des factures PDF.
          </Text>
        </View>
        <View style={styles.numRow}>
          <Text style={styles.numText}>2.</Text>
          <Text style={styles.bulletText}>
            <Text style={{ fontFamily: fontFamilies.bold }}>Documentation :</Text> Guide d'utilisation simplifié à destination de l'administrateur.
          </Text>
        </View>
      </View>

      {/* 6.2 */}
      <View>
        <Text style={styles.subsectionTitle}>6.2 Points à Finaliser lors de la Mise en Œuvre</Text>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>Choix final du nom de domaine et de la solution d'hébergement web.</Text>
        </View>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>Fourniture des textes légaux (CGV, mentions légales) par Ti'Baleine.</Text>
        </View>
        <View style={styles.bulletRow}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>Validation des contenus rédigés et des traductions dans les différentes langues retenues.</Text>
        </View>
      </View>
    </View>
  )
}
