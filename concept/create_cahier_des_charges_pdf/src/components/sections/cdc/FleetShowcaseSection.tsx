/**
 * @file components/sections/cdc/FleetShowcaseSection.tsx
 * @description Section 3.1 — Flotte, Capacités, Seuils et Planning Départs.
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
  boatsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  boatCard: {
    flex: 1,
    backgroundColor: colors.primarySuperLight,
    borderWidth: 1,
    borderColor: colors.borderFocus,
    borderRadius: borders.radiusMedium,
    padding: spacing.md,
  },
  boatCardAlt: {
    backgroundColor: '#ecfeff',
    borderColor: '#a5f3fc',
  },
  boatTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  boatName: {
    fontSize: fontSizes.md,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDeep,
  },
  capacityPill: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 3,
  },
  capacityPillText: {
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.bold,
    color: colors.white,
    letterSpacing: 0.4,
  },
  boatMeta: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: colors.textMuted,
    lineHeight: 1.35,
    marginBottom: spacing.xs,
  },
  sunsetTag: {
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.bold,
    color: colors.sunsetAmber,
    backgroundColor: colors.sunsetAmberLight,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 2,
    alignSelf: 'flex-start',
  },
  kpiRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  kpiBox: {
    flex: 1,
    backgroundColor: colors.bgSection,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borders.radiusSmall,
    padding: spacing.sm,
    alignItems: 'center',
  },
  kpiBoxValue: {
    fontSize: fontSizes.md,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
    marginBottom: 2,
  },
  kpiBoxLabel: {
    fontSize: fontSizes.micro,
    fontFamily: fontFamilies.base,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 1.2,
  },
  scheduleBox: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borders.radiusMedium,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  scheduleHeader: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  departurePillsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
  },
  slotPill: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: 4,
  },
  slotPillText: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: colors.white,
  },
  closureTag: {
    backgroundColor: colors.errorLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: 4,
    marginLeft: 'auto',
  },
  closureText: {
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.bold,
    color: colors.error,
  },
  naturalistAlert: {
    backgroundColor: '#fffbeb',
    borderLeftWidth: 3,
    borderLeftColor: colors.warning,
    borderRadius: borders.radiusSmall,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: '#fef3c7',
  },
  alertTitle: {
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.bold,
    color: '#92400e',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  alertText: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: '#78350f',
    lineHeight: 1.35,
  },
})

export function FleetShowcaseSection() {
  return (
    <View style={styles.container} wrap={false}>
      {/* Chapter Title */}
      <View style={styles.chapterTitleRow}>
        <View style={styles.chapterNumberBadge}>
          <Text style={styles.chapterNumberText}>3</Text>
        </View>
        <Text style={styles.chapterTitle}>Règles Métier et Fonctionnement de l'Activité</Text>
      </View>
      <View style={styles.chapterRule} />

      {/* 3.1 Flotte de Bateaux */}
      <View style={styles.boatsRow}>
        {/* Tikap */}
        <View style={styles.boatCard}>
          <View style={styles.boatTopRow}>
            <Text style={styles.boatName}>Navire Tikap</Text>
            <View style={styles.capacityPill}>
              <Text style={styles.capacityPillText}>12 PLACES</Text>
            </View>
          </View>
          <Text style={styles.boatMeta}>
            Navire rapide et agile · Observation cétacés & privatisations.
          </Text>
          <Text style={styles.sunsetTag}>Forfait Sunset : 600 €</Text>
        </View>

        {/* Grand Bleu */}
        <View style={[styles.boatCard, styles.boatCardAlt]}>
          <View style={styles.boatTopRow}>
            <Text style={[styles.boatName, { color: colors.dolphinCyan }]}>Navire Grand Bleu</Text>
            <View style={[styles.capacityPill, { backgroundColor: colors.dolphinCyan }]}>
              <Text style={styles.capacityPillText}>24 PLACES</Text>
            </View>
          </View>
          <Text style={styles.boatMeta}>
            Grand navire confortable · Groupes et grand public.
          </Text>
          <Text style={[styles.sunsetTag, { color: '#0e7490', backgroundColor: '#cffafe' }]}>
            Forfait Sunset : 1 100 €
          </Text>
        </View>
      </View>

      {/* 3 Jauges clés */}
      <View style={styles.kpiRow}>
        <View style={styles.kpiBox}>
          <Text style={styles.kpiBoxValue}>36 places</Text>
          <Text style={styles.kpiBoxLabel}>Capacité max. cumulée par créneau</Text>
        </View>
        <View style={styles.kpiBox}>
          <Text style={[styles.kpiBoxValue, { color: colors.warning }]}>6 pax min.</Text>
          <Text style={styles.kpiBoxLabel}>Seuil de maintien par bateau</Text>
        </View>
        <View style={styles.kpiBox}>
          <Text style={[styles.kpiBoxValue, { color: colors.success }]}>H − 2h</Text>
          <Text style={styles.kpiBoxLabel}>Clôture automatique résa web</Text>
        </View>
      </View>

      {/* Planning départs quotidiens */}
      <View style={styles.scheduleBox}>
        <Text style={styles.scheduleHeader}>3.1.1 Départs Quotidiens (7j/7 Toute l'Année)</Text>
        <View style={styles.departurePillsRow}>
          <View style={styles.slotPill}>
            <Text style={styles.slotPillText}>07h00</Text>
          </View>
          <View style={styles.slotPill}>
            <Text style={styles.slotPillText}>10h00</Text>
          </View>
          <View style={styles.slotPill}>
            <Text style={styles.slotPillText}>14h00</Text>
          </View>
          <View style={styles.closureTag}>
            <Text style={styles.closureText}>Fermetures : 25 Déc. & 1er Janv.</Text>
          </View>
        </View>
      </View>

      {/* Règle Encadrement Naturaliste */}
      <View style={styles.naturalistAlert}>
        <Text style={styles.alertTitle}>Contrainte d'Encadrement & Exclusivité</Text>
        <Text style={styles.alertText}>
          L'entreprise dispose d'<Text style={{ fontFamily: fontFamilies.bold }}>1 seul naturaliste</Text> obligatoire pour encadrer les sorties baleines. Chaque créneau et bateau est dédié à une activité exclusive (pas de panachage).
        </Text>
      </View>
    </View>
  )
}
