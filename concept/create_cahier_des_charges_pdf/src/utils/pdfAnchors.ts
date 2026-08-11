/**
 * @file utils/pdfAnchors.ts
 * @description Utilitaires pour les ancres internes du document PDF.
 *
 * Les ancres permettent de créer des liens cliquables dans le sommaire
 * qui naviguent vers les sections correspondantes.
 *
 * @example
 *   // Dans la section cible :
 *   <Text id={sectionAnchorId('1.1')}>...</Text>
 *
 *   // Dans le sommaire :
 *   <Link src={`#${sectionAnchorId('1.1')}`}>Voir 1.1</Link>
 */

// ---------------------------------------------------------------------------
// Générateurs d'identifiants d'ancres
// ---------------------------------------------------------------------------

/**
 * Génère un identifiant d'ancre pour une section numérotée.
 * @param id - Identifiant de la section (ex: "1.1", "2.3")
 * @returns Identifiant d'ancre (ex: "sec-1-1", "sec-2-3")
 */
export function sectionAnchorId(id: string): string {
  return `sec-${id.replace(/\./g, '-')}`
}

/**
 * Génère un identifiant d'ancre pour un chapitre.
 * @param chapter - Numéro ou identifiant du chapitre
 * @returns Identifiant d'ancre (ex: "ch-1", "ch-intro")
 */
export function chapterAnchorId(chapter: number | string): string {
  return `ch-${chapter}`
}

/**
 * Génère un identifiant d'ancre personnalisé avec préfixe.
 * @param prefix - Préfixe descriptif
 * @param id - Identifiant unique
 * @returns Identifiant d'ancre (ex: "fig-1", "table-2")
 */
export function customAnchorId(prefix: string, id: string | number): string {
  return `${prefix}-${id}`
}

// ---------------------------------------------------------------------------
// Ancres nommées prédéfinies (à étendre par le projet consommateur)
// ---------------------------------------------------------------------------

/**
 * Ancres nommées pour les sections spéciales qui ne sont pas numérotées.
 * Étendre cet objet dans votre projet consommateur :
 *
 * @example
 *   import { PDF_NAMED_ANCHORS } from './utils/pdfAnchors'
 *   const MY_ANCHORS = { ...PDF_NAMED_ANCHORS, annexe: 'annexe' } as const
 */
export const PDF_NAMED_ANCHORS = {
  cover: 'cover',
  toc: 'toc',
  intro: 'intro',
  conclusion: 'conclusion',
} as const

export type PdfNamedAnchor = keyof typeof PDF_NAMED_ANCHORS
