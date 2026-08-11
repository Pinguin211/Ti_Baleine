/**
 * @file styles/index.ts
 * @description Point d'entrée unique du système de styles PDF.
 *
 * Importer depuis ce fichier pour accéder à tous les tokens et StyleSheets.
 *
 * @example
 *   // Import groupé (recommandé)
 *   import { typographyStyles as typo, layoutStyles as layout, colors } from '../../styles'
 *
 *   // Import spécifique
 *   import { colors, spacing } from '../../styles/tokens'
 *   import { typographyStyles } from '../../styles/typography'
 */

// Tokens bruts (valeurs primitives)
export * from './tokens'

// StyleSheets typographie
export { typographyStyles } from './typography'

// StyleSheets mise en page
export { layoutStyles } from './layout'

// StyleSheets composants
export { componentStyles } from './components'
