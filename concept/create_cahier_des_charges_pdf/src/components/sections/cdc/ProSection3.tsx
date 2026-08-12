/**
 * @file components/sections/cdc/ProSection3.tsx
 * @description Section 5 (Personas) du CDC v2.
 */
import { Text, View, StyleSheet } from '../../../shims/react-pdf'
import { colors, fontSizes, spacing, fontFamilies, borders } from '../../../styles/tokens'
import { cdcPersonas } from '../../../cahier-des-charges'

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing['3xl'],
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamilies.bold,
    color: colors.textDark,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginTop: spacing['2xl'],
    marginBottom: spacing.xs,
  },
  titleUnderline: {
    height: 1.5,
    backgroundColor: colors.primary,
    marginBottom: spacing.md,
  },
  personaGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  personaCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderTopWidth: 3,
    borderTopColor: colors.primary,
    borderRadius: borders.radiusSmall,
    padding: spacing.md,
  },
  headerRow: {
    marginBottom: spacing.xs,
  },
  nameText: {
    fontSize: fontSizes.sm + 0.5,
    fontFamily: fontFamilies.bold,
    color: colors.textDark,
  },
  roleText: {
    fontSize: fontSizes.xxs + 0.5,
    fontFamily: fontFamilies.base,
    color: colors.textMuted,
  },
  tagPill: {
    backgroundColor: colors.primaryLight,
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 3,
    marginTop: 3,
    marginBottom: spacing.xs,
  },
  tagPillText: {
    fontSize: fontSizes.micro + 0.5,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
    textTransform: 'uppercase',
  },
  fieldBlock: {
    marginBottom: 5,
  },
  fieldLabel: {
    fontSize: fontSizes.micro + 0.5,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 1,
  },
  fieldValue: {
    fontSize: fontSizes.xxs + 1,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
    lineHeight: 1.35,
  },
  blockerBox: {
    backgroundColor: '#fff7ed',
    borderLeftWidth: 2,
    borderLeftColor: colors.amberBorder,
    padding: 4,
    borderRadius: 2,
    marginTop: 2,
  },
  blockerText: {
    fontSize: fontSizes.xxs + 0.5,
    fontFamily: fontFamilies.italic,
    color: colors.amberText,
    lineHeight: 1.3,
  },
})

export function ProSection3() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>5. Personas</Text>
      <View style={styles.titleUnderline} />

      <View style={styles.personaGrid}>
        {cdcPersonas.map((p, i) => (
          <View key={i} style={styles.personaCard}>
            <View style={styles.headerRow}>
              <Text style={styles.nameText}>{p.name}</Text>
              <Text style={styles.roleText}>{p.role}</Text>
            </View>

            <View style={styles.tagPill}>
              <Text style={styles.tagPillText}>{p.tag}</Text>
            </View>

            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>Contexte d'usage :</Text>
              <Text style={styles.fieldValue}>{p.usageContext}</Text>
            </View>

            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>Objectif :</Text>
              <Text style={styles.fieldValue}>{p.goal}</Text>
            </View>

            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>Ce qui le bloque aujourd'hui :</Text>
              <View style={styles.blockerBox}>
                <Text style={styles.blockerText}>{p.blocker}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
