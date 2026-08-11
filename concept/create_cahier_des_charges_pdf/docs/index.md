# PDF Engine — Documentation

Bienvenue dans la documentation du **PDF Engine**, un moteur d'édition PDF modulable basé sur React, TypeScript, `@react-pdf/renderer` et `react-pdf`.

---

## Table des matières

| Fichier | Description |
|---------|-------------|
| [architecture.md](./architecture.md) | Vue d'ensemble de l'architecture et des couches |
| [styles-system.md](./styles-system.md) | Système de design tokens et StyleSheets PDF |
| [components.md](./components.md) | Guide de tous les composants partagés |
| [context-and-data.md](./context-and-data.md) | Context React, types de données et sources |
| [hooks-and-utils.md](./hooks-and-utils.md) | Hooks et utilitaires |
| [integration-guide.md](./integration-guide.md) | Guide pas-à-pas pour créer votre propre document |

---

## Concept en 30 secondes

```
Vos données (TS)
      │
      ▼
PdfSourceProvider    ← injecte vos données dans l'arbre React-PDF
      │
      ▼
PdfLayout            ← compose les pages avec vos sections
      │
      ▼
useGeneratedPdf      ← génère un Blob PDF de manière asynchrone
      │
      ▼
PdfPreview           ← affiche le PDF dans le navigateur (zoom, scroll)
```

Le moteur **ne contient aucune donnée métier**. Il fournit uniquement :

- Les **types** pour structurer vos données
- Le **context** pour les injecter
- Les **composants** pour les afficher
- Les **styles** pour les formater
- Le **viewer** pour les prévisualiser

---

## Démarrage rapide

```bash
npm install
npm run dev   # → http://localhost:7001
```

La démo s'ouvre avec un document de 4 pages illustrant tous les composants.
Pour créer votre propre document, consultez le [guide d'intégration](./integration-guide.md).
