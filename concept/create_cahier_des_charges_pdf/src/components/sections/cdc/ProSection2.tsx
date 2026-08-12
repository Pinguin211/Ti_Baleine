/**
 * @file components/sections/cdc/ProSection2.tsx
 * @description Sections 3 (Objectifs) et 4 (Parties Prenantes) du CDC v2.
 */
import { Text, View, StyleSheet } from '../../../shims/react-pdf'
import { colors, fontSizes, spacing, fontFamilies, borders } from '../../../styles/tokens'
import { cdcObjectives, cdcStakeholders } from '../../../cahier-des-charges'

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
  table: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borders.radiusSmall,
    overflow: 'hidden',
    marginBottom: spacing.md,
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
    alignItems: 'flex-start',
    backgroundColor: colors.white,
  },
  tableRowAlt: {
    backgroundColor: '#fafbfc',
  },
  colObjNum: {
    width: 20,
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
  },
  colObjTitle: {
    width: 170,
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: colors.textDark,
    paddingRight: spacing.xs,
  },
  colObjCriteria: {
    flex: 1,
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
    lineHeight: 1.35,
  },
  colStakeName: {
    width: 140,
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: colors.textDark,
    paddingRight: spacing.xs,
  },
  colStakeRole: {
    flex: 1.2,
    fontSize: fontSizes.xxs + 1,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
    paddingRight: spacing.xs,
    lineHeight: 1.3,
  },
  colStakeExpect: {
    flex: 1.1,
    fontSize: fontSizes.xxs + 1,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
    paddingRight: spacing.xs,
    lineHeight: 1.3,
  },
  colStakeUses: {
    width: 45,
    alignItems: 'center',
  },
  pillYes: {
    backgroundColor: colors.greenTag,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 3,
  },
  pillYesText: {
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.bold,
    color: colors.greenText,
    textTransform: 'uppercase',
  },
  pillNo: {
    backgroundColor: colors.borderLight,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 3,
  },
  pillNoText: {
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.bold,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
})

export function ProSection2() {
  return (
    <View style={styles.container}>
      {/* 3. Objectifs */}
      <Text style={styles.sectionTitle}>3. Objectifs</Text>
      <View style={styles.titleUnderline} />

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.thText, { width: 20 }]}>#</Text>
          <Text style={[styles.thText, { width: 170 }]}>OBJECTIF</Text>
          <Text style={[styles.thText, { flex: 1 }]}>COMMENT ON SAURA QUE C'EST ATTEINT</Text>
        </View>
        {cdcObjectives.map((obj, i) => (
          <View key={obj.id} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
            <Text style={styles.colObjNum}>{obj.id}</Text>
            <Text style={styles.colObjTitle}>{obj.objective}</Text>
            <Text style={styles.colObjCriteria}>{obj.criteria}</Text>
          </View>
        ))}
      </View>

      {/* 4. Parties prenantes */}
      <Text style={styles.sectionTitle}>4. Parties Prenantes</Text>
      <View style={styles.titleUnderline} />

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.thText, { width: 140 }]}>PARTIE PRENANTE</Text>
          <Text style={[styles.thText, { flex: 1.2 }]}>RÔLE</Text>
          <Text style={[styles.thText, { flex: 1.1 }]}>CE QU'ELLE ATTEND</Text>
          <Text style={[styles.thText, { width: 45, textAlign: 'center' }]}>UTILISE ?</Text>
        </View>
        {cdcStakeholders.map((s, i) => (
          <View key={i} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
            <Text style={styles.colStakeName}>{s.name}</Text>
            <Text style={styles.colStakeRole}>{s.role}</Text>
            <Text style={styles.colStakeExpect}>{s.expectation}</Text>
            <View style={styles.colStakeUses}>
              {s.usesApp === 'oui' ? (
                <View style={styles.pillYes}>
                  <Text style={styles.pillYesText}>OUI</Text>
                </View>
              ) : (
                <View style={styles.pillNo}>
                  <Text style={styles.pillNoText}>NON</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
