/**
 * @file styles/components.ts
 * @description StyleSheets pour les composants partagés du moteur PDF.
 *
 * Ces styles sont utilisés par les composants de `src/components/shared/`.
 * Ils utilisent exclusivement les tokens de `tokens.ts`.
 *
 * Usage :
 * @example
 *   import { componentStyles as comp } from '../../styles/components'
 *   <View style={comp.codeBlock}>...</View>
 */
import { StyleSheet } from '../shims/react-pdf'
import { colors, fontFamilies, fontSizes, spacing, borders } from './tokens'

export const componentStyles = StyleSheet.create({
  // ---------------------------------------------------------------------------
  // CodeExcerpt — Bloc de code PDF
  // ---------------------------------------------------------------------------

  /** Conteneur principal du CodeExcerpt */
  codeWrapper: {
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },

  /** Conteneur imbriqué du CodeExcerpt (sans marge) */
  codeWrapperNested: {
    marginTop: spacing.none,
    marginBottom: spacing.none,
  },

  /** Label de titre du CodeExcerpt */
  codeTitle: {
    fontSize: fontSizes.xxs + 2,
    fontFamily: fontFamilies.bold,
    color: colors.textMuted,
    marginBottom: spacing.xxs + 1,
  },

  /** Boîte du code */
  codeBlock: {
    backgroundColor: colors.bgCode,
    borderWidth: borders.widthThin,
    borderColor: colors.borderCode,
    borderRadius: borders.radiusSmall,
    paddingVertical: spacing.xs + 1,
    paddingHorizontal: spacing.md - 1,
  },

  /** Ligne de code standard */
  codeLine: {
    fontSize: fontSizes.xxs,
    fontFamily: fontFamilies.mono,
    color: colors.textBase,
    lineHeight: 1.35,
  },

  /** Ligne de code compact */
  codeLineCompact: {
    fontSize: fontSizes.xxs - 0.5,
    lineHeight: 1.3,
  },

  // ---------------------------------------------------------------------------
  // Badge / Numéro de step
  // ---------------------------------------------------------------------------

  /** Badge circulaire (numéro d'étape, index) */
  badge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md - 1,
  },

  /** Texte à l'intérieur du badge */
  badgeText: {
    fontSize: fontSizes.xxs + 2,
    fontFamily: fontFamilies.bold,
    color: colors.white,
  },

  // ---------------------------------------------------------------------------
  // Schema Block (bloc numéroté avec titre + contenu)
  // ---------------------------------------------------------------------------

  /** Conteneur d'un bloc schéma */
  schemaBlock: {
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },

  /** En-tête du bloc (badge + titre) */
  schemaBlockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs - 1,
  },

  /** Titre du bloc schéma */
  schemaBlockTitle: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
    letterSpacing: 0.15,
  },

  /** Corps du bloc schéma */
  schemaBlockContent: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.bgSection,
    borderLeftWidth: borders.accentWidthCompact,
    borderLeftColor: colors.primary,
    borderRadius: borders.radiusSmall,
  },

  /** Description dans le corps du bloc schéma */
  schemaBlockDescription: {
    fontSize: fontSizes.sm,
    lineHeight: 1.55,
    color: colors.textBody,
    marginBottom: spacing.md,
    textAlign: 'justify',
  },

  /** Dernière description dans le corps du bloc schéma */
  schemaBlockDescriptionLast: {
    fontSize: fontSizes.sm,
    lineHeight: 1.55,
    color: colors.textBody,
    marginBottom: spacing.sm,
    textAlign: 'justify',
  },

  // ---------------------------------------------------------------------------
  // Légende (schémas, diagrammes)
  // ---------------------------------------------------------------------------

  /** Conteneur de la légende */
  legend: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: borders.widthThin,
    borderTopColor: colors.borderLight,
  },

  /** Titre de la légende */
  legendTitle: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: colors.textSubtle,
    marginBottom: spacing.xs + 1,
    letterSpacing: 0.2,
  },

  /** Entrée de légende */
  legendEntry: {
    fontSize: fontSizes.xs,
    lineHeight: 1.45,
    color: colors.textSubtle,
    marginBottom: spacing.xs,
    textAlign: 'justify',
  },

  /** Dernière entrée de légende (sans marge basse) */
  legendEntryLast: {
    fontSize: fontSizes.xs,
    lineHeight: 1.45,
    color: colors.textSubtle,
    marginBottom: spacing.none,
    textAlign: 'justify',
  },

  // ---------------------------------------------------------------------------
  // PdfAnchor — Ancre invisible
  // ---------------------------------------------------------------------------

  /** Ancre invisible pour les liens internes */
  anchor: {
    fontSize: 0,
    lineHeight: 0,
    height: 0,
    opacity: 0,
  },

  // ---------------------------------------------------------------------------
  // Table simple
  // ---------------------------------------------------------------------------

  /** Ligne de tableau */
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: borders.widthThin,
    borderBottomColor: colors.borderLight,
    paddingVertical: spacing.xxs + 1,
  },

  /** En-tête de tableau */
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: borders.widthBase,
    borderBottomColor: colors.primary,
    paddingVertical: spacing.xs,
    marginBottom: spacing.xxs,
  },

  /** Cellule de tableau */
  tableCell: {
    flex: 1,
    fontSize: fontSizes.sm,
    color: colors.textBody,
    paddingHorizontal: spacing.xs,
  },

  /** Cellule d'en-tête de tableau */
  tableCellHeader: {
    flex: 1,
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.bold,
    color: colors.textMuted,
    paddingHorizontal: spacing.xs,
  },
})
