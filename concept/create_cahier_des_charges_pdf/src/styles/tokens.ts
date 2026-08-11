/**
 * @file styles/tokens.ts
 * @description Design tokens pour le Cahier des Charges Pro — Style Ti'Baleine.
 */

export const colors = {
  // Couleurs corporate / cahier des charges
  navyDark: '#0b2239',       // En-tête principal & headers de table
  navyMedium: '#163352',     // Cartes et sous-titres
  primary: '#0284c7',        // Bleu Lagon / Titres h2 et accents
  primaryDark: '#0369a1',    // Bleu foncé pour textes forts
  primaryLight: '#e0f2fe',   // Fonds pills et légers
  primaryBorder: '#bae6fd',  // Bordures bleues légères

  // Neutres typographiques
  textDark: '#0f172a',       // Quasi-noir (titres)
  textBase: '#1e293b',       // Texte principal
  textBody: '#334155',       // Paragraphes
  textMuted: '#64748b',      // Textes secondaires
  textLight: '#94a3b8',      // Footer / légendes

  // Fonds & bordures
  bgPage: '#ffffff',
  bgSection: '#f8fafc',
  bgCallout: '#f0f9ff',
  borderLight: '#e2e8f0',
  borderDark: '#cbd5e1',

  // Statuts In/Out scope & tarifs
  greenText: '#15803d',
  greenBg: '#f0fdf4',
  greenBorder: '#22c55e',
  greenTag: '#dcfce7',

  redText: '#dc2626',
  redBg: '#fef2f2',
  redBorder: '#ef4444',
  redTag: '#fee2e2',

  amberText: '#b45309',
  amberBg: '#fffbeb',
  amberBorder: '#f59e0b',

  white: '#ffffff',
} as const

export const fontFamilies = {
  base: 'Helvetica',
  bold: 'Helvetica-Bold',
  italic: 'Helvetica-Oblique',
  boldItalic: 'Helvetica-BoldOblique',
} as const

export const fontSizes = {
  micro: 6,
  xxs: 7,
  xs: 8,
  sm: 9,
  base: 9.5,
  body: 10,
  md: 11,
  lg: 12.5,
  xl: 14.5,
  xxl: 18,
  hero: 22,
} as const

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
  '5xl': 30,
} as const

export const borders = {
  radiusSmall: 3,
  radiusMedium: 6,
  radiusLarge: 8,
  widthThin: 0.8,
  widthBase: 1.5,
  widthThick: 3,
} as const
