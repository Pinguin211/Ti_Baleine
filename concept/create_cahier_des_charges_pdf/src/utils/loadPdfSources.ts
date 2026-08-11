/**
 * @file utils/loadPdfSources.ts
 * @description Factory générique de chargement de sources PDF avec cache-busting HMR.
 *
 * Problème résolu : en développement Vite, les modules importés statiquement
 * sont mis en cache. Pour que le PDF se régénère avec les données à jour
 * après une modification, il faut invalider ce cache via un paramètre `?rev=N`.
 *
 * Usage (dans votre projet consommateur) :
 *
 * @example
 *   // 1. Définir la map de modules
 *   const SOURCE_MODULES = {
 *     cover:    (rev: number) => import(`../data/cover?rev=${rev}`),
 *     chapter1: (rev: number) => import(`../data/chapter1?rev=${rev}`),
 *   }
 *
 *   // 2. Créer le loader
 *   const loadMySources = createSourceLoader(SOURCE_MODULES)
 *
 *   // 3. Utiliser dans useGeneratedPdf
 *   const sources = await loadMySources(revision)
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Map de modules : clé → factory d'import dynamique cache-busting */
export type SourceModuleMap<T extends Record<string, unknown>> = {
  [K in keyof T]: (revision: number) => Promise<T[K]>
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * Crée un loader de sources typé qui charge tous les modules en parallèle.
 *
 * @template T - Type des sources (ex: { cover: CoverData, ch1: Ch1Data })
 * @param moduleMap - Map clé → factory d'import dynamique
 * @returns Fonction asynchrone `loadSources(revision) => Promise<T>`
 */
export function createSourceLoader<T extends Record<string, unknown>>(
  moduleMap: SourceModuleMap<T>,
): (revision: number) => Promise<T> {
  return async (revision: number): Promise<T> => {
    const keys = Object.keys(moduleMap) as (keyof T)[]
    const values = await Promise.all(
      keys.map((key) => moduleMap[key](revision)),
    )

    const result = {} as T
    keys.forEach((key, index) => {
      result[key] = values[index] as T[typeof key]
    })

    return result
  }
}
