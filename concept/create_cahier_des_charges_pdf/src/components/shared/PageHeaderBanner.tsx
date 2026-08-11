/**
 * @file components/shared/PageHeaderBanner.tsx
 * @description En-tête de page discret et élégant répété sur les pages de contenu.
 */
import { Text, View, StyleSheet } from '../../shims/react-pdf'
import { colors, fontSizes, spacing, fontFamilies } from '../../styles/tokens'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.sm,
    marginBottom: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    borderBottomStyle: 'solid',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: fontSizes.sm,
    marginRight: spacing.xs,
  },
  brandText: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
    letterSpacing: 0.5,
  },
  separator: {
    fontSize: fontSizes.xs,
    color: colors.textPlaceholder,
    marginHorizontal: spacing.xs,
  },
  docTitle: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: colors.textSubtle,
  },
  versionTag: {
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 3,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
})

interface PageHeaderBannerProps {
  currentSection?: string
}

export function PageHeaderBanner({ currentSection = "Cahier des Charges" }: PageHeaderBannerProps) {
  return (
    <View style={styles.container} fixed>
      <View style={styles.leftGroup}>
        <Text style={styles.logoIcon}>🐋</Text>
        <Text style={styles.brandText}>Ti'Baleine</Text>
        <Text style={styles.separator}>·</Text>
        <Text style={styles.docTitle}>{currentSection}</Text>
      </View>
      <Text style={styles.versionTag}>v1.0 · 2026</Text>
    </View>
  )
}
