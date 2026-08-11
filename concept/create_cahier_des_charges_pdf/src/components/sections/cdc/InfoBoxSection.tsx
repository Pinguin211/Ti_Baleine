/**
 * @file components/sections/cdc/InfoBoxSection.tsx
 * @description Encadrés d'information (flotte, capacités, créneaux) pour le PDF Ti'Baleine.
 *
 * Affiche des blocs visuels résumant les données clés de la section 3.1.
 */
import { Text, View, StyleSheet } from '../../../shims/react-pdf'
import { colors, fontSizes, spacing, borders } from '../../../styles/tokens'

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 0,
    marginBottom: spacing.lg,
  },
  card: {
    flex: 1,
    backgroundColor: colors.bgSection,
    borderRadius: borders.radiusMedium,
    borderLeftWidth: borders.accentWidth,
    borderLeftColor: colors.primary,
    borderLeftStyle: 'solid',
    padding: spacing.lg,
    marginRight: spacing.md,
  },
  cardLast: {
    marginRight: 0,
  },
  cardWarn: {
    borderLeftColor: colors.warning,
    backgroundColor: '#fffbeb',
  },
  cardSuccess: {
    borderLeftColor: colors.success,
    backgroundColor: '#f0fdf4',
  },
  cardTitle: {
    fontSize: fontSizes.xs,
    fontFamily: 'Helvetica-Bold',
    color: colors.textMuted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  cardValue: {
    fontSize: fontSizes.xl,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  cardValueWarn: {
    color: colors.warning,
  },
  cardValueSuccess: {
    color: colors.success,
  },
  cardDesc: {
    fontSize: fontSizes.xs,
    fontFamily: 'Helvetica',
    color: colors.textMuted,
    lineHeight: 1.4,
  },
  separator: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.md,
  },
  boatRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  boatCard: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    borderRadius: borders.radiusMedium,
    padding: spacing.lg,
    marginRight: spacing.md,
    alignItems: 'center',
  },
  boatCardLast: {
    marginRight: 0,
    backgroundColor: '#e0f2fe',
  },
  boatName: {
    fontSize: fontSizes.sm,
    fontFamily: 'Helvetica-Bold',
    color: colors.primaryDark,
    marginBottom: spacing.xs,
  },
  boatCapacity: {
    fontSize: fontSizes.xxl,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    marginBottom: spacing.xxs,
  },
  boatLabel: {
    fontSize: fontSizes.xxs,
    fontFamily: 'Helvetica',
    color: colors.textSubtle,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
})

export function FlotteInfoBox() {
  return (
    <View style={styles.container}>
      {/* Bateaux */}
      <View style={styles.boatRow}>
        <View style={styles.boatCard}>
          <Text style={styles.boatName}>Tikap</Text>
          <Text style={styles.boatCapacity}>12</Text>
          <Text style={styles.boatLabel}>places max.</Text>
        </View>
        <View style={[styles.boatCard, styles.boatCardLast]}>
          <Text style={styles.boatName}>Grand Bleu</Text>
          <Text style={styles.boatCapacity}>24</Text>
          <Text style={styles.boatLabel}>places max.</Text>
        </View>
      </View>

      {/* Indicateurs clés */}
      <View style={styles.gridRow}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Capacité globale</Text>
          <Text style={styles.cardValue}>36</Text>
          <Text style={styles.cardDesc}>places max. par créneau (cumul des 2 bateaux)</Text>
        </View>
        <View style={[styles.card, styles.cardWarn]}>
          <Text style={styles.cardTitle}>Seuil minimum</Text>
          <Text style={[styles.cardValue, styles.cardValueWarn]}>6</Text>
          <Text style={styles.cardDesc}>passagers payants par bateau pour maintenir la sortie</Text>
        </View>
        <View style={[styles.card, styles.cardSuccess, styles.cardLast]}>
          <Text style={styles.cardTitle}>Clôture réservation</Text>
          <Text style={[styles.cardValue, styles.cardValueSuccess]}>−2h</Text>
          <Text style={styles.cardDesc}>avant le départ du créneau (automatique)</Text>
        </View>
      </View>

      {/* Créneaux */}
      <View style={[styles.card, { marginRight: 0, marginBottom: 0 }]}>
        <Text style={styles.cardTitle}>Créneaux horaires — 3 départs / jour · 7j/7</Text>
        <View style={{ flexDirection: 'row', marginTop: spacing.sm }}>
          {['7h00', '10h00', '14h00'].map((h) => (
            <View
              key={h}
              style={{
                backgroundColor: colors.primary,
                borderRadius: borders.radiusMedium,
                paddingHorizontal: spacing.lg,
                paddingVertical: spacing.sm,
                marginRight: spacing.sm,
              }}
            >
              <Text style={{ color: colors.white, fontFamily: 'Helvetica-Bold', fontSize: fontSizes.sm }}>
                {h}
              </Text>
            </View>
          ))}
          <View style={{ flex: 1 }} />
          <View
            style={{
              backgroundColor: '#fee2e2',
              borderRadius: borders.radiusMedium,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
            }}
          >
            <Text style={{ color: colors.error, fontFamily: 'Helvetica-Bold', fontSize: fontSizes.xxs }}>
              Fermé : 25/12 & 01/01
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}
