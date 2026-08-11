/**
 * @file styles/tokens.ts
 * @description Design tokens bruts du moteur PDF — Thème Maritime Prestige Ti'Baleine.
 */

// ---------------------------------------------------------------------------
// Palette de couleurs Maritime & Premium
// ---------------------------------------------------------------------------

export const colors = {
  // Bleus Océan & Lagons (Identité Ti'Baleine)
  primary: '#0284c7',        // Bleu Lagon éclatant
  primaryDark: '#0369a1',    // Bleu Océan profond (titres, accents)
  primaryDeep: '#0f2b48',    // Bleu Nuit Maritime (titres majeurs, couvertures)
  primaryNavy: '#081c2e',    // Noir bleuté marine
  primaryLight: '#e0f2fe',   // Bleu ciel très doux (badges, fonds légers)
  primarySuperLight: '#f0f9ff', // Fond subtil avec nuance marine

  // Tons neutres (typographie éditoriale)
  textDark: '#0f172a',       // Quasi-noir (titres)
  textBase: '#1e293b',       // Ardoise foncé (texte courant)
  textBody: '#334155',       // Gris doux (paragraphes)
  textMuted: '#475569',      // Gris moyen (sous-titres, étiquettes)
  textSubtle: '#64748b',     // Gris clair (métadonnées)
  textPlaceholder: '#94a3b8',// Gris léger (légendes, footer)

  // Fonds & Surfaces
  bgPage: '#ffffff',         // Fond de page
  bgSection: '#f8fafc',      // Fond de bloc doux
  bgCard: '#ffffff',         // Fond de carte blanc net
  bgCardAlt: '#f8fafc',      // Fond de carte secondaire
  bgCode: '#f1f5f9',         // Fond bloc technique
  borderLight: '#e2e8f0',    // Bordure subtile
  borderMedium: '#cbd5e1',   // Bordure nette
  borderFocus: '#bae6fd',    // Bordure surlignée lagon

  // Couleurs d'activités & Sémantique
  whaleBlue: '#0284c7',      // Sorties Baleines
  whaleBlueLight: '#e0f2fe',
  dolphinCyan: '#0891b2',    // Sorties Dauphins
  dolphinCyanLight: '#cffafe',
  sunsetAmber: '#d97706',    // Privatisations Sunset
  sunsetAmberLight: '#fef3c7',
  sunsetCoral: '#ea580c',
  sunsetCoralLight: '#ffedd5',

  // Sémantique & Statuts
  success: '#10b981',        // Vert Émeraude (In-Scope, Validé)
  successLight: '#dcfce7',
  successDark: '#047857',
  warning: '#f59e0b',        // Ambre (Attention, conditions)
  warningLight: '#fef3c7',
  error: '#ef4444',          // Corail / Rouge (Out-of-Scope, exclusions)
  errorLight: '#fee2e2',
  info: '#0284c7',           // Bleu info

  // Divers
  white: '#ffffff',
  transparent: 'transparent',
} as const

export type ColorToken = keyof typeof colors

// ---------------------------------------------------------------------------
// Typographie
// ---------------------------------------------------------------------------

export const fontFamilies = {
  base: 'Helvetica',
  bold: 'Helvetica-Bold',
  italic: 'Helvetica-Oblique',
  boldItalic: 'Helvetica-BoldOblique',
  mono: 'Courier',
  monoBold: 'Courier-Bold',
} as const

export const fontSizes = {
  micro: 5.5,
  xxs: 6.5,  // Badges micro
  xs: 7.5,   // Légendes, meta, pill tags
  sm: 8.5,   // Texte compact de cartes
  base: 9.5, // Texte courant
  body: 10,  // Paragraphe standard
  md: 11.5,  // Sous-titres de section
  lg: 13,    // Titres de blocs majeurs
  xl: 16,    // Titres de chapitre
  xxl: 22,   // Titre principal
  hero: 28,  // Très grand titre de couverture
} as const

export const lineHeights = {
  tight: 1.25,
  snug: 1.35,
  normal: 1.45,
  relaxed: 1.55,
  loose: 1.65,
} as const

export const letterSpacings = {
  tight: -0.3,
  normal: 0,
  wide: 0.3,
  wider: 0.6,
  widest: 1.0,
} as const

// ---------------------------------------------------------------------------
// Espacement
// ---------------------------------------------------------------------------

export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
  xxl: 16,
  '3xl': 20,
  '4xl': 24,
  '5xl': 28,
  '6xl': 36,
  '7xl': 44,
  '8xl': 52,
} as const

// ---------------------------------------------------------------------------
// Bordures & Rayons
// ---------------------------------------------------------------------------

export const borders = {
  radiusSmall: 3,
  radiusMedium: 6,
  radiusLarge: 10,
  radiusFull: 999,
  widthThin: 1,
  widthBase: 1.5,
  widthThick: 2.5,
  accentWidth: 3.5,
  accentWidthCompact: 2,
} as const

// ---------------------------------------------------------------------------
// Dimensions
// ---------------------------------------------------------------------------

export const dimensions = {
  pagePaddingH: 48,
  pagePaddingV: 40,
  pagePaddingCompact: 28,
  chapterRuleWidth: 40,
} as const
