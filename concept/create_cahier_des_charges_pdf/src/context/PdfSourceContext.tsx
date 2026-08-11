/**
 * @file context/PdfSourceContext.tsx
 * @description Context React générique pour l'injection de données dans le layout PDF.
 *
 * Le moteur ne connaît pas la forme des données. Chaque projet consommateur :
 * 1. Définit son propre type `T` (ex: `MySources`)
 * 2. Crée un Provider typé avec `createPdfSourceContext<MySources>()`
 * 3. Injecte ses données via `<PdfSourceProvider sources={...}>`
 * 4. Consomme les données dans les sections via `usePdfSources()`
 *
 * @example
 *   // Dans votre projet consommateur :
 *   interface MySources {
 *     cover: typeof coverData
 *     chapter1: typeof chapter1Data
 *   }
 *
 *   const { PdfSourceProvider, usePdfSources } = createPdfSourceContext<MySources>()
 */
import { createContext, useContext, type ReactNode } from 'react'

// ---------------------------------------------------------------------------
// Factory de context générique
// ---------------------------------------------------------------------------

/**
 * Crée un contexte PDF typé pour un projet consommateur.
 *
 * @template T - Type des sources de données (défini par le projet consommateur)
 * @param defaultValue - Valeur par défaut du contexte (optionnel)
 * @returns `{ PdfSourceProvider, usePdfSources }` typés
 */
export function createPdfSourceContext<T extends Record<string, unknown>>(
  defaultValue?: T,
) {
  const Context = createContext<T>(defaultValue as T)

  function PdfSourceProvider({
    sources,
    children,
  }: {
    sources: T
    children: ReactNode
  }) {
    return <Context.Provider value={sources}>{children}</Context.Provider>
  }

  function usePdfSources(): T {
    return useContext(Context)
  }

  return { PdfSourceProvider, usePdfSources }
}

// ---------------------------------------------------------------------------
// Context par défaut (usage direct sans factory)
// ---------------------------------------------------------------------------

/**
 * Context générique utilisable directement sans passer par la factory.
 * Le type `Record<string, unknown>` est intentionnellement large —
 * le projet consommateur le spécialise via un cast ou la factory.
 *
 * @see createPdfSourceContext pour un usage pleinement typé
 */
const DefaultPdfSourceContext = createContext<Record<string, unknown>>({})

export function PdfSourceProvider({
  sources,
  children,
}: {
  sources: Record<string, unknown>
  children: ReactNode
}) {
  return (
    <DefaultPdfSourceContext.Provider value={sources}>
      {children}
    </DefaultPdfSourceContext.Provider>
  )
}

export function usePdfSources<T extends Record<string, unknown> = Record<string, unknown>>(): T {
  return useContext(DefaultPdfSourceContext) as T
}
