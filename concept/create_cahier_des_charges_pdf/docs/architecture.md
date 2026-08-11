# Architecture

## Vue d'ensemble

Le projet est organisé en **couches strictement séparées**. Chaque couche ne connaît que les couches inférieures, jamais les supérieures.

```
┌─────────────────────────────────────────────────────────┐
│  App.tsx  —  Shell de l'application (UI navigateur)     │
├─────────────────────────────────────────────────────────┤
│  layouts/PdfLayout.tsx  —  Composition du document PDF  │
├──────────────────────┬──────────────────────────────────┤
│  components/preview/ │  components/shared/ & layout/    │
│  PdfPreview          │  Primitives PDF réutilisables     │
├──────────────────────┴──────────────────────────────────┤
│  hooks/useGeneratedPdf  —  Génération async du blob PDF │
├─────────────────────────────────────────────────────────┤
│  context/PdfSourceContext  —  Injection de données      │
├─────────────────────────────────────────────────────────┤
│  styles/  —  Design tokens + StyleSheets PDF            │
├─────────────────────────────────────────────────────────┤
│  types/   —  Contrats de données (interfaces TS)        │
├─────────────────────────────────────────────────────────┤
│  shims/   —  Isolation de @react-pdf/renderer           │
└─────────────────────────────────────────────────────────┘
```

---

## Structure des dossiers

```
pdf-engine/
│
├── docs/                    ← Cette documentation
│
├── src/
│   ├── shims/               ← Couche 0 : isolation des dépendances
│   │   ├── react-pdf.ts     # Point d'import unique pour @react-pdf/renderer
│   │   └── base64-js.ts     # Polyfill Vite ESM
│   │
│   ├── types/               ← Couche 1 : contrats de données
│   │   └── index.ts         # TextSegment, ContentBlock, DocumentSection…
│   │
│   ├── styles/              ← Couche 2 : design tokens et StyleSheets
│   │   ├── tokens.ts        # Valeurs primitives (couleurs, tailles, espacement)
│   │   ├── typography.ts    # StyleSheets de texte
│   │   ├── layout.ts        # StyleSheets de mise en page
│   │   ├── components.ts    # StyleSheets de composants
│   │   └── index.ts         # Barrel export
│   │
│   ├── context/             ← Couche 3 : injection de données dans React-PDF
│   │   └── PdfSourceContext.tsx
│   │
│   ├── utils/               ← Couche 3 : fonctions utilitaires
│   │   ├── pdfAnchors.ts    # Génération d'identifiants d'ancres
│   │   ├── pdfScrollStorage.ts # Persistance du scroll
│   │   └── loadPdfSources.ts   # Factory de chargement cache-busting
│   │
│   ├── hooks/               ← Couche 4 : génération du blob PDF
│   │   └── useGeneratedPdf.tsx
│   │
│   ├── components/          ← Couche 5 : primitives et viewer
│   │   ├── shared/          # PdfAnchor, RichParagraph, ProseContent…
│   │   ├── layout/          # SectionWrapper
│   │   └── preview/         # PdfPreview (viewer navigateur)
│   │
│   ├── layouts/             ← Couche 6 : composition du document
│   │   └── PdfLayout.tsx    # ← À remplacer dans votre projet
│   │
│   ├── demo/                ← Composants de démonstration
│   │   ├── data/            # Données de démo
│   │   └── sections/        # Sections de démo
│   │
│   ├── App.tsx              # Shell navigateur
│   ├── App.css              # Styles de l'application
│   ├── index.css            # Reset global
│   └── main.tsx             # Point d'entrée React
│
├── package.json
├── vite.config.ts
└── tsconfig*.json
```

---

## Flux de données

### 1. Génération du PDF (côté `@react-pdf/renderer`)

```
Données TS  →  PdfSourceProvider  →  PdfLayout
                                          │
                                   (Document > Page > Section...)
                                          │
                                    @react-pdf/renderer
                                          │
                                       Blob PDF
```

`@react-pdf/renderer` prend un arbre de composants React (avec ses propres primitives `Document`, `Page`, `View`, `Text`…) et le rend en un **fichier PDF binaire**.

### 2. Affichage du PDF (côté `react-pdf` / PDF.js)

```
Blob PDF  →  URL.createObjectURL()  →  react-pdf (PDF.js)  →  Canvas HTML
```

`react-pdf` prend un fichier PDF (blob ou URL) et l'affiche page par page dans le navigateur via PDF.js.

> ⚠️ **Les deux librairies sont différentes** et ne partagent rien :
> - `@react-pdf/renderer` : **génère** le PDF (côté React-PDF)
> - `react-pdf` : **affiche** le PDF (côté PDF.js)

---

## La couche Shim

Tous les imports de `@react-pdf/renderer` passent **exclusivement** par `src/shims/react-pdf.ts` :

```ts
// ✅ Correct
import { Document, Page, Text, View } from '../../shims/react-pdf'

// ❌ À éviter
import { Document } from '@react-pdf/renderer'
```

**Pourquoi ?** Si la lib sous-jacente change (ex: migration vers une future version), on ne modifie qu'un seul fichier au lieu de modifier chaque composant.

---

## Le problème du HMR (Hot Module Replacement)

En développement Vite, les modules importés statiquement sont **mis en cache**. Si vous modifiez `src/data/mySection.ts`, le PDF ne se régénère pas automatiquement car Vite ne re-exécute pas les imports statiques dans un contexte PDF.

**La solution** : paramètre `?rev=N` sur chaque import dynamique.

```ts
// Chaque fois que revision change, Vite recharge le module depuis le disque
import(`../data/mySection?rev=${revision}`)
```

C'est le rôle du hook `useGeneratedPdf` et de la factory `createSourceLoader`.

---

## Technologies utilisées

| Lib | Version | Rôle |
|-----|---------|------|
| React | 19 | Framework UI |
| TypeScript | 6 | Typage statique |
| Vite | 8 | Bundler + dev server |
| `@react-pdf/renderer` | 4.x | Génération PDF côté React |
| `react-pdf` | 10.x | Affichage PDF.js dans le navigateur |
| `buffer` / `process` | — | Polyfills Node.js pour le navigateur |
