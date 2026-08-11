/**
 * @file styles/layout.ts
 * @description StyleSheets de mise en page pour @react-pdf/renderer.
 *
 * Ces styles gèrent la structure spatiale des pages et des blocs de section.
 * Ils utilisent exclusivement les tokens de `tokens.ts`.
 *
 * Usage :
 * @example
 *   import { layoutStyles as layout } from '../../styles/layout'
 *   <View style={layout.content}>...</View>
 */
import { StyleSheet } from '../shims/react-pdf'
import { colors, spacing, borders, dimensions } from './tokens'

export const layoutStyles = StyleSheet.create({
  // ---------------------------------------------------------------------------
  // Page
  // ---------------------------------------------------------------------------

  /** Style de page standard A4 */
  page: {
    paddingTop: dimensions.pagePaddingV,
    paddingBottom: dimensions.pagePaddingV,
    paddingHorizontal: dimensions.pagePaddingH,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.5,
    color: colors.textBase,
  },

  /** Style de page compact (moins de padding) */
  pageCompact: {
    paddingTop: dimensions.pagePaddingCompact,
    paddingBottom: dimensions.pagePaddingCompact,
    paddingHorizontal: dimensions.pagePaddingH,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.5,
    color: colors.textBase,
  },

  /** Footer de page (position absolue) */
  pageFooter: {
    position: 'absolute',
    bottom: dimensions.pagePaddingCompact,
    left: dimensions.pagePaddingH,
    right: dimensions.pagePaddingH,
    fontSize: 9,
    color: colors.textPlaceholder,
    textAlign: 'center',
  },

  // ---------------------------------------------------------------------------
  // Blocs de section
  // ---------------------------------------------------------------------------

  /** Conteneur de bloc de section (fond coloré + bordure gauche bleue) */
  content: {
    paddingVertical: spacing['3xl'],
    paddingHorizontal: spacing['3xl'] + 2,
    backgroundColor: colors.bgSection,
    borderLeftWidth: borders.accentWidth,
    borderLeftColor: colors.primary,
    borderRadius: borders.radiusSmall,
    marginBottom: spacing.xxl,
  },

  /** Variante compacte du bloc de section */
  contentCompact: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.bgSection,
    borderLeftWidth: borders.accentWidthCompact,
    borderLeftColor: colors.primary,
    borderRadius: borders.radiusSmall,
    marginBottom: spacing.sm,
  },

  // ---------------------------------------------------------------------------
  // Séparateurs visuels
  // ---------------------------------------------------------------------------

  /** Règle colorée sous les titres de chapitre */
  chapterRule: {
    borderBottomWidth: borders.widthBase,
    borderBottomColor: colors.primary,
    marginBottom: spacing['3xl'],
    width: dimensions.chapterRuleWidth,
  },

  /** Séparateur léger entre sections */
  divider: {
    borderBottomWidth: borders.widthThin,
    borderBottomColor: colors.borderLight,
    marginVertical: spacing.xl,
  },

  // ---------------------------------------------------------------------------
  // Grilles & colonnes (flexbox PDF)
  // ---------------------------------------------------------------------------

  /** Ligne flex */
  row: {
    flexDirection: 'row',
  },

  /** Colonne flex */
  column: {
    flexDirection: 'column',
  },

  /** Ligne flex avec alignement centré */
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  /** Ligne flex avec espace entre éléments */
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // ---------------------------------------------------------------------------
  // Espacements utilitaires
  // ---------------------------------------------------------------------------

  /** Espace vertical petit entre blocs */
  gapSm: {
    marginTop: spacing.xs,
  },

  /** Espace vertical moyen entre blocs */
  gapMd: {
    marginTop: spacing.xl,
  },

  /** Espace vertical grand entre blocs */
  gapLg: {
    marginTop: spacing['3xl'],
  },

  /** Espace vertical très grand entre blocs */
  gapXl: {
    marginTop: spacing['6xl'],
  },
})
