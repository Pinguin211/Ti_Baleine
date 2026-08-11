/**
 * @file components/sections/cdc/ProSection3.tsx
 * @description Section 3 — Règles Métier, Flotte & Grille Tarifaire.
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
  groupBlock: {
    marginBottom: spacing.sm,
  },
  groupHeader: {
    fontSize: fontSizes.xs + 0.5,
    fontFamily: fontFamilies.bold,
    color: colors.textDark,
    marginBottom: 2,
  },
  subBulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: spacing.md,
    marginBottom: 2,
  },
  subBulletDot: {
    fontSize: fontSizes.xs,
    color: colors.textMuted,
    width: 10,
    marginTop: 1,
  },
  subBulletText: {
    flex: 1,
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
    lineHeight: 1.35,
  },
  table: {
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borders.radiusSmall,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.navyDark,
    paddingVertical: spacing.xs + 1,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
  },
  thText: {
    fontSize: fontSizes.xxs + 0.5,
    fontFamily: fontFamilies.bold,
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  tableRowAlt: {
    backgroundColor: '#fafbfc',
  },
  colPrestation: {
    flex: 1.4,
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: colors.textDark,
  },
  colTranche: {
    flex: 1.4,
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
  },
  colTarif: {
    flex: 1,
    alignItems: 'flex-end',
  },
  pillBlue: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 3,
  },
  pillBlueText: {
    fontSize: fontSizes.xxs + 0.5,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
  },
  pillRed: {
    backgroundColor: colors.redTag,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 3,
  },
  pillRedText: {
    fontSize: fontSizes.xxs + 0.5,
    fontFamily: fontFamilies.bold,
    color: colors.redText,
  },
})

export function ProSection3() {
  return (
    <View style={styles.container} wrap={false}>
      {/* Titre 3 */}
      <Text style={styles.sectionTitle}>3. RÈGLES MÉTIER ET FONCTIONNEMENT DE L'ACTIVITÉ</Text>
      <View style={styles.titleUnderline} />

      {/* 3.1 Flotte, Capacités et Calendrier */}
      <Text style={styles.subsectionTitle}>3.1 Flotte, Capacités et Calendrier</Text>

      {/* Bateaux et Capacités */}
      <View style={styles.groupBlock}>
        <Text style={styles.groupHeader}>• Bateaux et Capacités :</Text>
        <View style={styles.subBulletRow}>
          <Text style={styles.subBulletDot}>◦</Text>
          <Text style={styles.subBulletText}>
            <Text style={{ fontFamily: fontFamilies.bold }}>Tikap :</Text> Capacité maximale de <Text style={{ fontFamily: fontFamilies.bold }}>12 places</Text>.
          </Text>
        </View>
        <View style={styles.subBulletRow}>
          <Text style={styles.subBulletDot}>◦</Text>
          <Text style={styles.subBulletText}>
            <Text style={{ fontFamily: fontFamilies.bold }}>Grand Bleu :</Text> Capacité maximale de <Text style={{ fontFamily: fontFamilies.bold }}>24 places</Text>.
          </Text>
        </View>
        <View style={styles.subBulletRow}>
          <Text style={styles.subBulletDot}>◦</Text>
          <Text style={styles.subBulletText}>
            <Text style={{ fontFamily: fontFamilies.bold }}>Capacité globale cumulée :</Text> <Text style={{ fontFamily: fontFamilies.bold }}>36 places</Text> au maximum par créneau horaire.
          </Text>
        </View>
      </View>

      {/* Créneaux Horaires & Calendrier */}
      <View style={styles.groupBlock}>
        <Text style={styles.groupHeader}>• Créneaux Horaires & Calendrier :</Text>
        <View style={styles.subBulletRow}>
          <Text style={styles.subBulletDot}>◦</Text>
          <Text style={styles.subBulletText}>
            <Text style={{ fontFamily: fontFamilies.bold }}>3 départs quotidiens :</Text> 7h00, 10h00 et 14h00 (7j/7, du lundi au dimanche toute l'année).
          </Text>
        </View>
        <View style={styles.subBulletRow}>
          <Text style={styles.subBulletDot}>◦</Text>
          <Text style={styles.subBulletText}>
            <Text style={{ fontFamily: fontFamilies.bold }}>Fermetures annuelles :</Text> Uniquement le 25 décembre et le 1er janvier.
          </Text>
        </View>
      </View>

      {/* Seuils, Jauges et Sécurité */}
      <View style={styles.groupBlock}>
        <Text style={styles.groupHeader}>• Seuils, Jauges et Sécurité :</Text>
        <View style={styles.subBulletRow}>
          <Text style={styles.subBulletDot}>◦</Text>
          <Text style={styles.subBulletText}>
            <Text style={{ fontFamily: fontFamilies.bold }}>Seuil de maintien :</Text> Minimum de <Text style={{ fontFamily: fontFamilies.bold }}>6 passagers payants par bateau</Text> pour confirmer une sortie.
          </Text>
        </View>
        <View style={styles.subBulletRow}>
          <Text style={styles.subBulletDot}>◦</Text>
          <Text style={styles.subBulletText}>
            <Text style={{ fontFamily: fontFamilies.bold }}>Contrôle des jauges :</Text> Contrôle automatique lors de la réservation respectant les capacités des navires (12 places pour Tikap, 24 places pour Grand Bleu, blocage strict à 36 places au total).
          </Text>
        </View>
        <View style={styles.subBulletRow}>
          <Text style={styles.subBulletDot}>◦</Text>
          <Text style={styles.subBulletText}>
            <Text style={{ fontFamily: fontFamilies.bold }}>Délai de réservation :</Text> Clôture automatique des réservations en ligne <Text style={{ fontFamily: fontFamilies.bold }}>2 heures avant le départ</Text>.
          </Text>
        </View>
      </View>

      {/* Contraintes d'Encadrement */}
      <View style={styles.groupBlock}>
        <Text style={styles.groupHeader}>• Contraintes d'Encadrement :</Text>
        <View style={styles.subBulletRow}>
          <Text style={styles.subBulletDot}>◦</Text>
          <Text style={styles.subBulletText}>
            <Text style={{ fontFamily: fontFamilies.bold }}>Ressource humaine unique :</Text> 1 seul naturaliste disponible et obligatoire pour l'encadrement des <Text style={{ fontFamily: fontFamilies.italic }}>sorties baleines</Text>.
          </Text>
        </View>
        <View style={styles.subBulletRow}>
          <Text style={styles.subBulletDot}>◦</Text>
          <Text style={styles.subBulletText}>
            <Text style={{ fontFamily: fontFamilies.bold }}>Séparation stricte des activités :</Text> Chaque créneau et bateau est dédié à une seule prestation (pas de mixage d'activités sur une même sortie).
          </Text>
        </View>
      </View>

      {/* 3.2 Grille Tarifaire */}
      <View style={{ marginTop: spacing.md }}>
        <Text style={styles.subsectionTitle}>3.2 Grille Tarifaire</Text>

        <View style={styles.table}>
          {/* Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.thText, { flex: 1.4 }]}>PRESTATION / CATÉGORIE</Text>
            <Text style={[styles.thText, { flex: 1.4 }]}>TRANCHE D'ÂGE / CONDITION</Text>
            <Text style={[styles.thText, { flex: 1, textAlign: 'right' }]}>TARIF UNITAIRE</Text>
          </View>

          {/* Lignes */}
          <View style={styles.tableRow}>
            <Text style={styles.colPrestation}>Sortie Baleines — Adulte</Text>
            <Text style={styles.colTranche}>12 ans et plus</Text>
            <View style={styles.colTarif}>
              <View style={styles.pillBlue}><Text style={styles.pillBlueText}>65 €</Text></View>
            </View>
          </View>

          <View style={[styles.tableRow, styles.tableRowAlt]}>
            <Text style={styles.colPrestation}>Sortie Baleines — Enfant</Text>
            <Text style={styles.colTranche}>4 à 11 ans inclus</Text>
            <View style={styles.colTarif}>
              <View style={styles.pillBlue}><Text style={styles.pillBlueText}>40 €</Text></View>
            </View>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.colPrestation}>Sortie Dauphins — Adulte</Text>
            <Text style={styles.colTranche}>12 ans et plus</Text>
            <View style={styles.colTarif}>
              <View style={styles.pillBlue}><Text style={styles.pillBlueText}>50 €</Text></View>
            </View>
          </View>

          <View style={[styles.tableRow, styles.tableRowAlt]}>
            <Text style={styles.colPrestation}>Sortie Dauphins — Enfant</Text>
            <Text style={styles.colTranche}>4 à 11 ans inclus</Text>
            <View style={styles.colTarif}>
              <View style={styles.pillBlue}><Text style={styles.pillBlueText}>30 €</Text></View>
            </View>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.colPrestation}>Enfants de moins de 4 ans</Text>
            <Text style={styles.colTranche}>Moins de 4 ans (Non admis en réservation en ligne)</Text>
            <View style={styles.colTarif}>
              <View style={styles.pillRed}><Text style={styles.pillRedText}>Non admis</Text></View>
            </View>
          </View>

          <View style={[styles.tableRow, styles.tableRowAlt]}>
            <Text style={styles.colPrestation}>Privatisation Tikap</Text>
            <Text style={styles.colTranche}>Demi-journée (Formule Sunset)</Text>
            <View style={styles.colTarif}>
              <View style={styles.pillBlue}><Text style={styles.pillBlueText}>600 € (Forfait)</Text></View>
            </View>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.colPrestation}>Privatisation Grand Bleu</Text>
            <Text style={styles.colTranche}>Demi-journée (Formule Sunset)</Text>
            <View style={styles.colTarif}>
              <View style={styles.pillBlue}><Text style={styles.pillBlueText}>1 100 € (Forfait)</Text></View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
