/**
 * @file styles/typography.ts
 * @description StyleSheets de typographie réutilisables pour @react-pdf/renderer.
 *
 * Ces styles définissent tous les patterns de texte du document.
 * Ils utilisent exclusivement les tokens de `tokens.ts`.
 *
 * Usage :
 * @example
 *   import { typographyStyles as typo } from '../../styles/typography'
 *   <Text style={typo.paragraph}>Mon texte</Text>
 */
import { StyleSheet } from '../shims/react-pdf'
import {
  colors,
  fontFamilies,
  fontSizes,
  lineHeights,
  letterSpacings,
  spacing,
} from './tokens'

export const typographyStyles = StyleSheet.create({
  // ---------------------------------------------------------------------------
  // Titres
  // ---------------------------------------------------------------------------

  /** Titre de couverture / document */
  heroTitle: {
    fontSize: fontSizes.hero,
    fontFamily: fontFamilies.bold,
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: spacing.md,
  },

  /** Titre principal (page de couverture) */
  documentTitle: {
    fontSize: fontSizes.xxl,
    fontFamily: fontFamilies.bold,
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: spacing.md,
  },

  /** Sous-titre (page de couverture) */
  documentSubtitle: {
    fontSize: fontSizes.base,
    fontFamily: fontFamilies.italic,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing['5xl'],
  },

  /** Titre de chapitre (h1 du PDF) */
  chapterTitle: {
    fontSize: fontSizes.xl,
    fontFamily: fontFamilies.bold,
    color: colors.textDark,
    marginBottom: spacing.sm,
  },

  /** Titre de section (h2 du PDF) */
  sectionTitle: {
    fontSize: fontSizes.md,
    fontFamily: fontFamilies.bold,
    color: colors.textMuted,
    marginBottom: spacing.xl,
    letterSpacing: letterSpacings.wide,
  },

  /** Titre de section compact (h2 dense) */
  sectionTitleCompact: {
    fontSize: fontSizes.base,
    fontFamily: fontFamilies.bold,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    letterSpacing: letterSpacings.wide,
  },

  /** Titre de sous-section (h3 du PDF) */
  subsectionTitle: {
    fontSize: fontSizes.md,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
    letterSpacing: letterSpacings.normal,
  },

  // ---------------------------------------------------------------------------
  // Corps de texte
  // ---------------------------------------------------------------------------

  /** Paragraphe standard */
  paragraph: {
    fontSize: fontSizes.base,
    lineHeight: lineHeights.loose,
    color: colors.textBody,
    marginBottom: spacing.xl,
    textAlign: 'justify',
  },

  /** Dernier paragraphe d'un bloc (sans marge basse) */
  paragraphLast: {
    fontSize: fontSizes.base,
    lineHeight: lineHeights.loose,
    color: colors.textBody,
    marginBottom: spacing.none,
    textAlign: 'justify',
  },

  /** Paragraphe lead (premier paragraphe, légèrement plus grand) */
  paragraphLead: {
    fontSize: fontSizes.md - 0.5,
    lineHeight: lineHeights.spacious,
    color: colors.textBase,
    marginBottom: spacing.xxl,
    textAlign: 'justify',
  },

  /** Paragraphe compact (sections denses) */
  paragraphCompact: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.tight,
    color: colors.textBody,
    marginBottom: spacing.sm,
    textAlign: 'justify',
  },

  /** Dernier paragraphe compact */
  paragraphCompactLast: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.tight,
    color: colors.textBody,
    marginBottom: spacing.none,
    textAlign: 'justify',
  },

  // ---------------------------------------------------------------------------
  // Listes
  // ---------------------------------------------------------------------------

  /** Élément de liste standard */
  listItem: {
    fontSize: fontSizes.base,
    lineHeight: lineHeights.relaxed,
    color: colors.textBody,
    marginBottom: spacing.xs,
    textAlign: 'justify',
  },

  /** Élément de liste compact */
  listItemCompact: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.tight,
    color: colors.textBody,
    marginBottom: spacing.xxs,
    textAlign: 'justify',
  },

  // ---------------------------------------------------------------------------
  // Labels & Meta
  // ---------------------------------------------------------------------------

  /** Label de champ ou d'étiquette */
  label: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: colors.textSubtle,
    marginBottom: spacing.xs,
    letterSpacing: letterSpacings.wide,
  },

  /** Numéro de page (footer) */
  pageNumber: {
    fontSize: fontSizes.xs,
    color: colors.textPlaceholder,
    textAlign: 'center',
  },

  // ---------------------------------------------------------------------------
  // Texte en gras (inline)
  // ---------------------------------------------------------------------------

  /** Style inline pour les segments bold dans RichParagraph */
  bold: {
    fontFamily: fontFamilies.bold,
    color: colors.textDark,
  },
})
