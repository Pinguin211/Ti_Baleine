/**
 * @file components/sections/cdc/ProSection1.tsx
 * @description Sections 1 (Contexte) & 2 (Problème) du CDC v2.
 */
import { Text, View, StyleSheet } from '../../../shims/react-pdf'
import { colors, fontSizes, spacing, fontFamilies, borders } from '../../../styles/tokens'
import { cdcContext, cdcProblem } from '../../../cahier-des-charges'

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
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  titleUnderline: {
    height: 1.5,
    backgroundColor: colors.primary,
    marginBottom: spacing.md,
  },
  paragraph: {
    fontSize: fontSizes.xs + 0.5,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
    lineHeight: 1.4,
    marginBottom: spacing.sm,
  },
  kpiRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginVertical: spacing.md,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borders.radiusSmall,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
  },
  kpiNumber: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamilies.bold,
    color: colors.primary,
    marginBottom: 1,
  },
  kpiLabel: {
    fontSize: fontSizes.micro,
    fontFamily: fontFamilies.bold,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  calloutBox: {
    backgroundColor: colors.bgCallout,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    borderRadius: borders.radiusSmall,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  calloutTitle: {
    fontSize: fontSizes.xs + 1,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
    marginBottom: 3,
  },
  calloutText: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
    lineHeight: 1.4,
  },
})

export function ProSection1() {
  return (
    <View style={styles.container}>
      {/* 1. Contexte */}
      <Text style={styles.sectionTitle}>{cdcContext.chapterTitle}</Text>
      <View style={styles.titleUnderline} />

      {cdcContext.paragraphs.map((p, idx) => (
        <Text key={idx} style={styles.paragraph}>
          {p}
        </Text>
      ))}

      {/* 4 KPIs Cards */}
      <View style={styles.kpiRow}>
        {cdcContext.kpis.map((kpi, idx) => (
          <View key={idx} style={styles.kpiCard}>
            <Text style={styles.kpiNumber}>{kpi.value}</Text>
            <Text style={styles.kpiLabel}>{kpi.label}</Text>
          </View>
        ))}
      </View>

      {/* 2. Problème */}
      <View style={styles.calloutBox}>
        <Text style={styles.calloutTitle}>{cdcProblem.chapterTitle}</Text>
        <Text style={styles.calloutText}>{cdcProblem.text}</Text>
      </View>
    </View>
  )
}
