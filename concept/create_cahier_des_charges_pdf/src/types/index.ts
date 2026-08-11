/**
 * @file types/index.ts
 * @description Contrats de données partagés du moteur PDF.
 *
 * Ces types représentent la structure minimale attendue par les composants
 * partagés (RichParagraph, ProseContent, etc.).
 *
 * Le type `PdfSources` n'est PAS défini ici car il est spécifique à chaque
 * projet consommateur. Chaque projet définit ses propres sources en utilisant
 * le context générique `PdfSourceContext<T>`.
 */

// ---------------------------------------------------------------------------
// Blocs de contenu texte
// ---------------------------------------------------------------------------

/**
 * Segment de texte avec mise en forme optionnelle.
 * Utilisé par `RichParagraph` pour composer des paragraphes mixtes.
 */
export interface TextSegment {
  text: string
  bold?: boolean
  italic?: boolean
  color?: string
}

/**
 * Bloc de contenu d'une section PDF.
 * Un bloc est soit un paragraphe (texte simple ou segmenté), soit une liste à puces.
 */
export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'paragraph'; segments: TextSegment[] }
  | { type: 'list'; items: string[] }

// ---------------------------------------------------------------------------
// Structure de section
// ---------------------------------------------------------------------------

/**
 * Section générique d'un document PDF.
 * Une section contient un titre de chapitre, un titre de section et des blocs de contenu.
 */
export interface DocumentSection {
  /** Titre principal du chapitre (ex: "1. Introduction") */
  chapterTitle: string
  /** Titre de la sous-section (ex: "1.1 Présentation") */
  sectionTitle: string
  /** Blocs de contenu à rendre */
  blocks: ContentBlock[]
}

// ---------------------------------------------------------------------------
// Métadonnées du document
// ---------------------------------------------------------------------------

/**
 * Métadonnées du document PDF (page de couverture, en-tête, etc.).
 */
export interface PdfDocumentMeta {
  /** Titre principal affiché en couverture */
  title: string
  /** Sous-titre ou description courte */
  subtitle?: string
  /** Auteur du document */
  author?: string
  /** Sujet / description pour les métadonnées PDF */
  subject?: string
}
