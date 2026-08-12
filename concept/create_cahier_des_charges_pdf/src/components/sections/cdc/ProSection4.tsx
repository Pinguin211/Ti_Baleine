/**
 * @file components/sections/cdc/ProSection4.tsx
 * @description Sections 6 (Périmètre : In/Out) et 7 (Contraintes) du CDC v2.
 */
import { Text, View, StyleSheet } from '../../../shims/react-pdf'
import { colors, fontSizes, spacing, fontFamilies, borders } from '../../../styles/tokens'
import { cdcScopeIn, cdcScopeOut, cdcConstraints } from '../../../cahier-des-charges'

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
  scopeRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
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
    flex: 1.15,
    backgroundColor: '#fffdfd',
    borderLeftWidth: 3,
    borderLeftColor: colors.redBorder,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borders.radiusSmall,
    padding: spacing.md,
  },
  scopeHeaderIn: {
    fontSize: fontSizes.xs + 1,
    fontFamily: fontFamilies.bold,
    color: colors.greenText,
    marginBottom: spacing.xs,
  },
  scopeHeaderOut: {
    fontSize: fontSizes.xs + 1,
    fontFamily: fontFamilies.bold,
    color: colors.redText,
    marginBottom: spacing.xs,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bulletDot: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    width: 8,
    marginTop: 1,
  },
  bulletText: {
    flex: 1,
    fontSize: fontSizes.xxs + 1,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
    lineHeight: 1.35,
  },
  table: {
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
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    alignItems: 'flex-start',
    backgroundColor: colors.white,
  },
  tableRowAlt: {
    backgroundColor: '#fafbfc',
  },
  colConstNum: {
    width: 20,
    fontSize: fontSizes.xxs + 1,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
  },
  colConstText: {
    flex: 1.5,
    fontSize: fontSizes.xxs + 1,
    fontFamily: fontFamilies.base,
    color: colors.textDark,
    lineHeight: 1.3,
    paddingRight: spacing.xs,
  },
  colConstNature: {
    width: 90,
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.italic,
    color: colors.textMuted,
    paddingRight: spacing.xs,
  },
  colConstSource: {
    width: 105,
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
  },
})

export function ProSection4() {
  return (
    <View style={styles.container}>
      {/* 6. Périmètre */}
      <Text style={styles.sectionTitle}>6. Périmètre du Projet</Text>
      <View style={styles.titleUnderline} />

      <View style={styles.scopeRow}>
        {/* In-Scope */}
        <View style={styles.scopeBoxIn}>
          <Text style={styles.scopeHeaderIn}>✔ Dans le Périmètre (In-Scope)</Text>
          {cdcScopeIn.map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={[styles.bulletDot, { color: colors.greenText }]}>•</Text>
              <Text style={styles.bulletText}>
                <Text style={{ fontFamily: fontFamilies.bold }}>{item.title} : </Text>
                {item.description}
              </Text>
            </View>
          ))}
        </View>

        {/* Out-of-Scope */}
        <View style={styles.scopeBoxOut}>
          <Text style={styles.scopeHeaderOut}>✖ Hors Périmètre (Out-of-Scope)</Text>
          {cdcScopeOut.map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={[styles.bulletDot, { color: colors.redText }]}>•</Text>
              <Text style={styles.bulletText}>
                <Text style={{ fontFamily: fontFamilies.bold }}>{item.element} : </Text>
                <Text style={{ color: colors.textMuted }}>{item.reason}</Text>
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* 7. Contraintes */}
      <Text style={styles.sectionTitle}>7. Contraintes</Text>
      <View style={styles.titleUnderline} />

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.thText, { width: 20 }]}>#</Text>
          <Text style={[styles.thText, { flex: 1.5 }]}>CONTRAINTE</Text>
          <Text style={[styles.thText, { width: 90 }]}>NATURE</Text>
          <Text style={[styles.thText, { width: 105 }]}>SOURCE</Text>
        </View>
        {cdcConstraints.map((c, i) => (
          <View key={c.id} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
            <Text style={styles.colConstNum}>{c.id}</Text>
            <Text style={styles.colConstText}>{c.constraint}</Text>
            <Text style={styles.colConstNature}>{c.nature}</Text>
            <Text style={styles.colConstSource}>{c.source}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
