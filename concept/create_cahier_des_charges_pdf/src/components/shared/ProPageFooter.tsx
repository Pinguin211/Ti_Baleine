/**
 * @file components/shared/ProPageFooter.tsx
 * @description Footer exact du Cahier des Charges Pro (Gauche: Titre · Droite: Page X / Y).
 */
import { Text, View, StyleSheet } from '../../shims/react-pdf'
import { colors, fontSizes, spacing, fontFamilies } from '../../styles/tokens'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    left: 40,
    right: 40,
    paddingTop: spacing.xs,
    borderTopWidth: 0.8,
    borderTopColor: colors.borderLight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textLeft: {
    fontSize: fontSizes.micro + 0.5,
    fontFamily: fontFamilies.base,
    color: colors.textMuted,
  },
  textRight: {
    fontSize: fontSizes.micro + 0.5,
    fontFamily: fontFamilies.base,
    color: colors.textMuted,
  },
})

export function ProPageFooter() {
  return (
    <View style={styles.container} fixed>
      <Text style={styles.textLeft}>Ti'Baleine — Cahier des Charges Fonctionnel</Text>
      <Text
        style={styles.textRight}
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} / ${totalPages}`}
      />
    </View>
  )
}
