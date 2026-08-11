/**
 * @file components/sections/cdc/TarifTableSection.tsx
 * @description Tableau des tarifs Ti'Baleine affiché dans le PDF.
 *
 * Rendu personnalisé (table PDF) pour la grille tarifaire de la section 3.2.
 */
import { Text, View, StyleSheet } from '../../../shims/react-pdf'
import { colors, fontSizes, spacing, borders } from '../../../styles/tokens'

const col = {
  prestation: '50%',
  tranche: '28%',
  tarif: '22%',
} as const

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
    marginBottom: spacing.xxl,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borders.radiusSmall,
    marginBottom: spacing.xxs,
  },
  tableHeaderText: {
    fontFamily: 'Helvetica-Bold',
    fontSize: fontSizes.xs,
    color: colors.white,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    borderBottomStyle: 'solid',
  },
  tableRowAlt: {
    backgroundColor: colors.bgSection,
  },
  tableRowSunset: {
    backgroundColor: '#fef3c7',
  },
  cellPrestation: {
    width: col.prestation,
    fontFamily: 'Helvetica-Bold',
    fontSize: fontSizes.sm,
    color: colors.textBase,
  },
  cellTranche: {
    width: col.tranche,
    fontFamily: 'Helvetica',
    fontSize: fontSizes.sm,
    color: colors.textMuted,
  },
  cellTarif: {
    width: col.tarif,
    fontFamily: 'Helvetica-Bold',
    fontSize: fontSizes.sm,
    color: colors.primary,
    textAlign: 'right',
  },
  cellTarifSpecial: {
    width: col.tarif,
    fontFamily: 'Helvetica-Bold',
    fontSize: fontSizes.sm,
    color: '#d97706',
    textAlign: 'right',
  },
  cellNonAdmis: {
    width: col.tarif,
    fontFamily: 'Helvetica-Bold',
    fontSize: fontSizes.xs,
    color: colors.error,
    textAlign: 'right',
  },
  noteText: {
    fontSize: fontSizes.xxs,
    color: colors.textSubtle,
    fontFamily: 'Helvetica',
    marginTop: spacing.sm,
    fontStyle: 'italic',
  },
})

type TarifRow = {
  prestation: string
  tranche: string
  tarif: string
  isNonAdmis?: boolean
  isSunset?: boolean
  isAlt?: boolean
}

const tarifsData: TarifRow[] = [
  { prestation: 'Sortie Baleines — Adulte', tranche: '12 ans et plus', tarif: '65 €' },
  { prestation: 'Sortie Baleines — Enfant', tranche: '4 à 11 ans inclus', tarif: '40 €', isAlt: true },
  { prestation: 'Sortie Dauphins — Adulte', tranche: '12 ans et plus', tarif: '50 €' },
  { prestation: 'Sortie Dauphins — Enfant', tranche: '4 à 11 ans inclus', tarif: '30 €', isAlt: true },
  { prestation: 'Enfants de moins de 4 ans', tranche: 'Moins de 4 ans', tarif: 'Non admis', isNonAdmis: true },
  { prestation: 'Privatisation Tikap', tranche: 'Demi-journée (Formula Sunset)', tarif: '600 € (Forfait)', isSunset: true },
  { prestation: 'Privatisation Grand Bleu', tranche: 'Demi-journée (Formula Sunset)', tarif: '1 100 € (Forfait)', isSunset: true, isAlt: true },
]

export function TarifTableSection() {
  return (
    <View style={styles.container}>
      {/* En-tête */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, { width: col.prestation }]}>Prestation / Catégorie</Text>
        <Text style={[styles.tableHeaderText, { width: col.tranche }]}>Tranche d'Âge</Text>
        <Text style={[styles.tableHeaderText, { width: col.tarif, textAlign: 'right' }]}>Tarif Unitaire</Text>
      </View>

      {/* Lignes */}
      {tarifsData.map((row, i) => (
        <View
          key={i}
          style={[
            styles.tableRow,
            row.isSunset ? styles.tableRowSunset : (row.isAlt ? styles.tableRowAlt : {}),
          ]}
        >
          <Text style={styles.cellPrestation}>{row.prestation}</Text>
          <Text style={styles.cellTranche}>{row.tranche}</Text>
          {row.isNonAdmis ? (
            <Text style={styles.cellNonAdmis}>{row.tarif}</Text>
          ) : row.isSunset ? (
            <Text style={styles.cellTarifSpecial}>{row.tarif}</Text>
          ) : (
            <Text style={styles.cellTarif}>{row.tarif}</Text>
          )}
        </View>
      ))}

      <Text style={styles.noteText}>
        * Tarifs fixes, sans variation saisonnière. Les privatisations (Sunset) sont au forfait par bateau.
      </Text>
    </View>
  )
}
