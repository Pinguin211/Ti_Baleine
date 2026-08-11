# PDF Engine

Moteur d'édition PDF modulable basé sur **React**, **TypeScript**, **@react-pdf/renderer** et **react-pdf**.

Ce projet est un point de départ vierge, conçu pour être configuré et étendu par le développeur selon ses besoins.

---

## Démarrage rapide

```bash
npm install
npm run dev      # → http://localhost:7001
```

---

## Architecture

```
src/
├── shims/           # Isolation de @react-pdf/renderer (point d'entrée unique)
│   ├── react-pdf.ts # Re-export de toutes les primitives PDF
│   └── base64-js.ts # Polyfill Vite ESM
│
├── types/           # Contrats de données partagés
│   └── index.ts     # TextSegment, ContentBlock, DocumentSection, PdfDocumentMeta
│
├── context/         # Injection de données (générique)
│   └── PdfSourceContext.tsx  # PdfSourceProvider + usePdfSources + createPdfSourceContext()
│
├── hooks/           # Hooks React
│   └── useGeneratedPdf.tsx   # Génération PDF async avec cache-busting HMR
│
├── utils/           # Utilitaires
│   ├── pdfAnchors.ts       # Ancres internes (sommaire → sections)
│   ├── pdfScrollStorage.ts # Persistance scroll localStorage
│   └── loadPdfSources.ts   # Factory de chargement de sources (cache-busting)
│
├── styles/          # Système de design tokens PDF
│   ├── tokens.ts    # Valeurs brutes : couleurs, tailles, espacement, bordures
│   ├── typography.ts# StyleSheets de typographie (paragraphes, titres, labels…)
│   ├── layout.ts    # StyleSheets de mise en page (page, blocs, règles…)
│   ├── components.ts# StyleSheets de composants (code, badges, légendes…)
│   └── index.ts     # Barrel export de tout le système de styles
│
├── components/
│   ├── shared/      # Primitives PDF réutilisables
│   │   ├── PdfAnchor.tsx     # Ancre invisible pour liens internes
│   │   ├── RichParagraph.tsx # Paragraphe avec segments bold/italic/color
│   │   ├── ProseContent.tsx  # Renderer de ContentBlock[] (§ + listes)
│   │   ├── CodeExcerpt.tsx   # Bloc de code avec indentation préservée
│   │   └── PageFooter.tsx    # Footer numérotation de pages
│   ├── layout/
│   │   └── SectionWrapper.tsx# Wrapper générique (titre chapitre + règle + titre section)
│   └── preview/
│       ├── PdfPreview.tsx    # Viewer PDF.js (zoom, scroll persistant, responsive)
│       └── PdfPreview.css    # Styles du viewer
│
├── layouts/
│   └── PdfLayout.tsx  # ⚠️ À REMPLACER — layout de démonstration (4 pages)
│
├── demo/            # Composants et données de démonstration
│   ├── data/
│   │   └── sampleDocument.ts  # Données d'exemple typées
│   ├── sections/
│   │   ├── SampleTextSection.tsx  # Démo : ProseContent
│   │   ├── SampleRichSection.tsx  # Démo : RichParagraph
│   │   └── SampleCodeSection.tsx  # Démo : CodeExcerpt
│   └── DemoSources.ts         # Type DemoSources + données par défaut
│
├── App.tsx          # Shell (header + PdfPreview + gestion révision)
├── App.css          # Styles de l'application shell
├── index.css        # Reset global
└── main.tsx         # Point d'entrée React
```

---

## Système de styles

Le dossier `src/styles/` centralise **tous** les tokens de design et les StyleSheets `@react-pdf`.

### Tokens (`tokens.ts`)
Variables brutes réutilisables partout :
```ts
import { colors, fontSizes, spacing, borders } from './styles/tokens'

colors.primary     // '#3b82f6'
fontSizes.base     // 11
spacing.xl         // 14
borders.accentWidth// 3
```

### StyleSheets (`typography.ts`, `layout.ts`, `components.ts`)
```ts
import { typographyStyles as typo } from './styles/typography'
import { layoutStyles as layout }   from './styles/layout'
import { componentStyles as comp }  from './styles/components'

<Text style={typo.chapterTitle}>Mon titre</Text>
<View style={layout.content}>...</View>
<View style={comp.codeBlock}>...</View>
```

### Import groupé
```ts
import { typographyStyles, layoutStyles, colors, spacing } from './styles'
```

---

## Ajouter votre propre document

### 1. Définir vos sources

```ts
// src/data/mySources.ts
import type { DocumentSection } from '../types'

export const chapter1: DocumentSection = {
  chapterTitle: '1. Mon Chapitre',
  sectionTitle: '1.1 Ma Section',
  blocks: [
    { type: 'paragraph', text: 'Contenu du premier paragraphe.' },
    { type: 'list', items: ['Point A', 'Point B'] },
  ],
}
```

### 2. Typer vos sources

```ts
// src/MySources.ts
import type { DocumentSection } from './types'

export interface MySources extends Record<string, unknown> {
  chapter1: DocumentSection
  chapter2: DocumentSection
}
```

### 3. Créer un loader avec cache-busting

```ts
// src/utils/mySourceLoader.ts
import { createSourceLoader } from './utils/loadPdfSources'
import type { MySources } from './MySources'

export const loadMySources = createSourceLoader<MySources>({
  chapter1: (rev) => import(/* @vite-ignore */ `./data/chapter1?rev=${rev}`),
  chapter2: (rev) => import(/* @vite-ignore */ `./data/chapter2?rev=${rev}`),
})
```

### 4. Créer vos sections

```tsx
// src/components/sections/Chapter1Section.tsx
import { View } from '../../shims/react-pdf'
import { usePdfSources } from '../../context/PdfSourceContext'
import { SectionWrapper } from '../layout/SectionWrapper'
import { ProseContent } from '../shared/ProseContent'
import { layoutStyles as layout } from '../../styles/layout'
import type { MySources } from '../../MySources'

export function Chapter1Section() {
  const { chapter1 } = usePdfSources<MySources>()
  return (
    <SectionWrapper
      chapterTitle={chapter1.chapterTitle}
      sectionTitle={chapter1.sectionTitle}
    >
      <View style={layout.content}>
        <ProseContent blocks={chapter1.blocks} />
      </View>
    </SectionWrapper>
  )
}
```

### 5. Composer votre layout

```tsx
// src/layouts/PdfLayout.tsx  ← remplacer le fichier de démo
import { Document, Page } from '../shims/react-pdf'
import { PageFooter } from '../components/shared/PageFooter'
import { Chapter1Section } from '../components/sections/Chapter1Section'
import { layoutStyles as layout } from '../styles/layout'

export function PdfLayout() {
  return (
    <Document title="Mon Document" author="Moi">
      <Page size="A4" style={layout.page}>
        <Chapter1Section />
        <PageFooter />
      </Page>
    </Document>
  )
}
```

### 6. Brancher dans App.tsx

```tsx
const myRenderFn: PdfRenderFn = async (revision) => {
  const sources = await loadMySources(revision)
  return pdf(
    <PdfSourceProvider sources={sources}>
      <PdfLayout key={revision} />
    </PdfSourceProvider>
  ).toBlob()
}

// Dans App.tsx
<PdfPreview revision={pdfRevision} renderFn={myRenderFn} />
```

---

## Composants disponibles

| Composant | Description |
|-----------|-------------|
| `PdfPreview` | Viewer PDF.js avec zoom Ctrl+molette, scroll persistant, responsive |
| `SectionWrapper` | Wrapper section : titre chapitre + règle bleue + titre section |
| `ProseContent` | Renderer de `ContentBlock[]` (§ simples, § segmentés, listes) |
| `RichParagraph` | Paragraphe avec segments bold/italic/color |
| `CodeExcerpt` | Bloc de code monospace avec indentation préservée |
| `PdfAnchor` | Ancre invisible pour les liens internes du sommaire |
| `PageFooter` | Footer numérotation `N / Total` (format personnalisable) |

---

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarrer le serveur de développement (port 7001) |
| `npm run build` | Compiler pour la production |
| `npm run preview` | Prévisualiser le build de production |
| `npm run lint` | Vérifier les erreurs ESLint |
