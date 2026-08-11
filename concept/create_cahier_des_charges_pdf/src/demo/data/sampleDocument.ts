/**
 * @file demo/data/sampleDocument.ts
 * @description Données de démonstration pour le moteur PDF.
 *
 * Ce fichier illustre comment structurer les données d'un document PDF
 * en utilisant les types fournis par le moteur.
 *
 * Dans votre projet réel, remplacez ce fichier par vos propres données.
 */
import type { DocumentSection, PdfDocumentMeta } from '../../types'

// ---------------------------------------------------------------------------
// Métadonnées du document
// ---------------------------------------------------------------------------

export const sampleMeta: PdfDocumentMeta = {
  title: 'PDF Engine — Démonstration',
  subtitle: 'Moteur d\'édition PDF modulable • React + TypeScript',
  author: 'PDF Engine',
  subject: 'Démonstration des composants du moteur PDF',
}

// ---------------------------------------------------------------------------
// Section 1 : Texte simple (ProseContent)
// ---------------------------------------------------------------------------

export const sampleTextSection: DocumentSection = {
  chapterTitle: '1. Composants de texte',
  sectionTitle: '1.1 ProseContent — Paragraphes et listes',
  blocks: [
    {
      type: 'paragraph',
      text: 'Le composant ProseContent est le renderer générique de ContentBlock[]. Il gère automatiquement les paragraphes simples, les paragraphes segmentés (via RichParagraph), et les listes à puces.',
    },
    {
      type: 'paragraph',
      text: 'Chaque bloc est typé et le composant choisit le bon sous-composant selon le type détecté. La variante compact réduit la taille de police et l\'espacement pour les sections à forte densité de contenu.',
    },
    {
      type: 'list',
      items: [
        'Paragraphes simples (type: "paragraph", text: string)',
        'Paragraphes segmentés (type: "paragraph", segments: TextSegment[])',
        'Listes à puces (type: "list", items: string[])',
        'Variante compacte avec prop compact={true}',
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Section 2 : Texte riche (RichParagraph)
// ---------------------------------------------------------------------------

export const sampleRichSection: DocumentSection = {
  chapterTitle: '2. Mise en forme riche',
  sectionTitle: '2.1 RichParagraph — Segments gras, italique et coloré',
  blocks: [
    {
      type: 'paragraph',
      segments: [
        { text: 'Le composant ' },
        { text: 'RichParagraph', bold: true },
        { text: ' permet de composer des paragraphes avec des segments de mise en forme variés. Chaque ' },
        { text: 'TextSegment', bold: true },
        { text: ' peut être ' },
        { text: 'gras', bold: true },
        { text: ', ' },
        { text: 'italique', italic: true },
        { text: ', ou avoir une ' },
        { text: 'couleur personnalisée', color: '#3b82f6' },
        { text: '.' },
      ],
    },
    {
      type: 'paragraph',
      segments: [
        { text: 'Ce pattern résout un problème connu de ' },
        { text: '@react-pdf/renderer', bold: true },
        { text: ' : appliquer un ' },
        { text: 'marginBottom', bold: true, color: '#1e40af' },
        { text: ' directement sur un Text multi-lignes sous-estime souvent la hauteur du composant. La solution est d\'envelopper dans un ' },
        { text: '<View>', bold: true },
        { text: ' qui porte la marge.' },
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Section 3 : Bloc de code (CodeExcerpt)
// ---------------------------------------------------------------------------

export const sampleCodeSection: DocumentSection = {
  chapterTitle: '3. Extraits de code',
  sectionTitle: '3.1 CodeExcerpt — Affichage de code source',
  blocks: [
    {
      type: 'paragraph',
      text: 'Le composant CodeExcerpt affiche des extraits de code avec une police monospace, un fond gris et une bordure. L\'indentation est préservée grâce à des espaces insécables (U+00A0), requis par react-pdf.',
    },
  ],
}

// Lignes de code de démonstration (affichées séparément dans la section)
export const sampleCodeLines = [
  '// Créer un loader de sources typé',
  'const loadSources = createSourceLoader({',
  '  cover:    (rev) => import(`./data/cover?rev=${rev}`),',
  '  chapter1: (rev) => import(`./data/ch1?rev=${rev}`),',
  '})',
  '',
  '// Utiliser dans useGeneratedPdf',
  'const { blob, loading } = useGeneratedPdf(',
  '  revision,',
  '  async (rev) => {',
  '    const sources = await loadSources(rev)',
  '    return pdf(',
  '      <PdfSourceProvider sources={sources}>',
  '        <MyLayout key={rev} />',
  '      </PdfSourceProvider>',
  '    ).toBlob()',
  '  }',
  ')',
]
