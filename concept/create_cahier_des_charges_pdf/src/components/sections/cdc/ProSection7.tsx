/**
 * @file components/sections/cdc/ProSection7.tsx
 * @description Sections 11 (Questions Ouvertes) & 12 (Validation Client) du CDC v2.
 */
import { Text, View, StyleSheet } from '../../../shims/react-pdf'
import { colors, fontSizes, spacing, fontFamilies, borders } from '../../../styles/tokens'
import { cdcOpenQuestions, cdcValidations } from '../../../cahier-des-charges'

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
  colQNum: {
    width: 18,
    fontSize: fontSizes.xxs + 1,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
  },
  colQText: {
    flex: 1.3,
    fontSize: fontSizes.xxs + 0.8,
    fontFamily: fontFamilies.base,
    color: colors.textDark,
    lineHeight: 1.3,
    paddingRight: spacing.xs,
  },
  colQSource: {
    width: 75,
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
  },
  colQStatus: {
    width: 65,
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.italic,
    color: colors.amberText,
  },
  colQHypo: {
    flex: 1.4,
    fontSize: fontSizes.xxs + 0.8,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
    lineHeight: 1.3,
  },
  quoteBox: {
    backgroundColor: colors.bgCallout,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    padding: spacing.xs + 2,
    borderRadius: borders.radiusSmall,
    marginTop: -spacing.sm,
    marginBottom: spacing.lg,
  },
  quoteText: {
    fontSize: fontSizes.xxs + 0.5,
    fontFamily: fontFamilies.italic,
    color: colors.primaryDark,
  },
  colValVer: {
    width: 60,
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: colors.textDark,
  },
  colValDate: {
    width: 80,
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
  },
  colValPres: {
    width: 100,
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
  },
  colValReturn: {
    flex: 1,
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
  },
})

export function ProSection7() {
  return (
    <View style={styles.container}>
      {/* 11. Questions restées ouvertes */}
      <Text style={styles.sectionTitle}>11. Questions Restées Ouvertes & Hypothèses</Text>
      <View style={styles.titleUnderline} />

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.thText, { width: 18 }]}>#</Text>
          <Text style={[styles.thText, { flex: 1.3 }]}>QUESTION POSÉE</Text>
          <Text style={[styles.thText, { width: 75 }]}>SOURCE</Text>
          <Text style={[styles.thText, { width: 65 }]}>STATUT</Text>
          <Text style={[styles.thText, { flex: 1.4 }]}>HYPOTHÈSE RETENUE EN ATTENDANT</Text>
        </View>
        {cdcOpenQuestions.map((q, i) => (
          <View key={q.id} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
            <Text style={styles.colQNum}>{q.id}</Text>
            <Text style={styles.colQText}>{q.question}</Text>
            <Text style={styles.colQSource}>{q.source}</Text>
            <Text style={styles.colQStatus}>{q.status}</Text>
            <Text style={styles.colQHypo}>{q.hypothesis}</Text>
          </View>
        ))}
      </View>

      <View style={styles.quoteBox}>
        <Text style={styles.quoteText}>
          « Une question sans réponse n'interdit pas d'avancer, à condition que l'hypothèse soit écrite. Une hypothèse non écrite est une erreur en attente. »
        </Text>
      </View>

      {/* 12. Validation client */}
      <Text style={styles.sectionTitle}>12. Validation Client</Text>
      <View style={styles.titleUnderline} />

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.thText, { width: 60 }]}>VERSION</Text>
          <Text style={[styles.thText, { width: 80 }]}>DATE</Text>
          <Text style={[styles.thText, { width: 100 }]}>PRÉSENTÉE</Text>
          <Text style={[styles.thText, { flex: 1 }]}>RETOUR / STATUT</Text>
        </View>
        {cdcValidations.map((v, i) => (
          <View key={i} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
            <Text style={styles.colValVer}>{v.version}</Text>
            <Text style={styles.colValDate}>{v.date}</Text>
            <Text style={styles.colValPres}>{v.presented}</Text>
            <Text style={styles.colValReturn}>{v.feedback}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
