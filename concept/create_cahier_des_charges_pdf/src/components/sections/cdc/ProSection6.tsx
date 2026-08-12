/**
 * @file components/sections/cdc/ProSection6.tsx
 * @description Sections 9 (Exigences Fonctionnelles) & 10 (Exigences Non Fonctionnelles) du CDC v2.
 */
import { Text, View, StyleSheet } from '../../../shims/react-pdf'
import { colors, fontSizes, spacing, fontFamilies, borders } from '../../../styles/tokens'
import { cdcFunctionalReqs, cdcNonFunctionalReqs } from '../../../cahier-des-charges'

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
    marginBottom: spacing.lg,
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
    paddingVertical: 3.5,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    alignItems: 'flex-start',
    backgroundColor: colors.white,
  },
  tableRowAlt: {
    backgroundColor: '#fafbfc',
  },
  colReqId: {
    width: 52,
    fontSize: fontSizes.xxs + 1,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
  },
  colReqText: {
    flex: 1.6,
    fontSize: fontSizes.xxs + 0.8,
    fontFamily: fontFamilies.base,
    color: colors.textDark,
    lineHeight: 1.3,
    paddingRight: spacing.xs,
  },
  colReqPriority: {
    width: 48,
    alignItems: 'center',
  },
  colReqPersona: {
    width: 80,
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.italic,
    color: colors.textMuted,
    paddingRight: spacing.xs,
  },
  colReqSource: {
    width: 95,
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
  },
  colNfReqId: {
    width: 52,
    fontSize: fontSizes.xxs + 1,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
  },
  colNfReqText: {
    flex: 1.2,
    fontSize: fontSizes.xxs + 0.8,
    fontFamily: fontFamilies.base,
    color: colors.textDark,
    lineHeight: 1.3,
    paddingRight: spacing.xs,
  },
  colNfReqVerif: {
    flex: 1.3,
    fontSize: fontSizes.xxs + 0.8,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
    lineHeight: 1.3,
    paddingRight: spacing.xs,
  },
  colNfReqSource: {
    width: 95,
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
  },
  pillMust: {
    backgroundColor: colors.redTag,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 2,
  },
  pillMustText: {
    fontSize: fontSizes.micro + 0.5,
    fontFamily: fontFamilies.bold,
    color: colors.redText,
    textTransform: 'uppercase',
  },
  pillShould: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 2,
  },
  pillShouldText: {
    fontSize: fontSizes.micro + 0.5,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
    textTransform: 'uppercase',
  },
  pillCould: {
    backgroundColor: colors.borderLight,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 2,
  },
  pillCouldText: {
    fontSize: fontSizes.micro + 0.5,
    fontFamily: fontFamilies.bold,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  captionNote: {
    fontSize: fontSizes.micro + 0.5,
    fontFamily: fontFamilies.italic,
    color: colors.textMuted,
    marginTop: -spacing.sm,
    marginBottom: spacing.md,
  },
})

export function ProSection6() {
  return (
    <View style={styles.container}>
      {/* 9. Exigences fonctionnelles */}
      <Text style={styles.sectionTitle}>9. Exigences Fonctionnelles (Matrice MoSCoW)</Text>
      <View style={styles.titleUnderline} />

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.thText, { width: 52 }]}>ID</Text>
          <Text style={[styles.thText, { flex: 1.6 }]}>EXIGENCE</Text>
          <Text style={[styles.thText, { width: 48, textAlign: 'center' }]}>PRIO.</Text>
          <Text style={[styles.thText, { width: 80 }]}>PERSONA</Text>
          <Text style={[styles.thText, { width: 95 }]}>SOURCE</Text>
        </View>
        {cdcFunctionalReqs.map((r, i) => (
          <View key={r.id} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
            <Text style={styles.colReqId}>{r.id}</Text>
            <Text style={styles.colReqText}>{r.requirement}</Text>
            <View style={styles.colReqPriority}>
              {r.priority === 'Must' && (
                <View style={styles.pillMust}><Text style={styles.pillMustText}>Must</Text></View>
              )}
              {r.priority === 'Should' && (
                <View style={styles.pillShould}><Text style={styles.pillShouldText}>Should</Text></View>
              )}
              {r.priority === 'Could' && (
                <View style={styles.pillCould}><Text style={styles.pillCouldText}>Could</Text></View>
              )}
            </View>
            <Text style={styles.colReqPersona}>{r.persona}</Text>
            <Text style={styles.colReqSource}>{r.source}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.captionNote}>* Rappel méthodologique : Le client plafonne le Must have à 3 cas d'usage majeurs.</Text>

      {/* 10. Exigences non fonctionnelles */}
      <Text style={styles.sectionTitle}>10. Exigences Non Fonctionnelles</Text>
      <View style={styles.titleUnderline} />

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.thText, { width: 52 }]}>ID</Text>
          <Text style={[styles.thText, { flex: 1.2 }]}>EXIGENCE</Text>
          <Text style={[styles.thText, { flex: 1.3 }]}>COMMENT ON LA VÉRIFIE</Text>
          <Text style={[styles.thText, { width: 95 }]}>SOURCE</Text>
        </View>
        {cdcNonFunctionalReqs.map((r, i) => (
          <View key={r.id} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
            <Text style={styles.colNfReqId}>{r.id}</Text>
            <Text style={styles.colNfReqText}>{r.requirement}</Text>
            <Text style={styles.colNfReqVerif}>{r.verification}</Text>
            <Text style={styles.colNfReqSource}>{r.source}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
