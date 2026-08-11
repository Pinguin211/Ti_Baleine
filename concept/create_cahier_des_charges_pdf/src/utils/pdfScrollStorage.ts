/**
 * @file utils/pdfScrollStorage.ts
 * @description Persistance de la position de scroll du viewer PDF dans localStorage.
 *
 * Permet de restaurer automatiquement la position de lecture après un refresh
 * de développement ou une régénération du PDF.
 *
 * @example
 *   // Sauvegarder le scroll (debounced)
 *   const saver = createDebouncedScrollSaver()
 *   area.addEventListener('scroll', () => saver.touch(area))
 *
 *   // Restaurer au chargement
 *   const ratio = getSavedScrollRatio()
 *   area.scrollTop = ratio * (area.scrollHeight - area.clientHeight)
 */

// ---------------------------------------------------------------------------
// Clé de stockage (configurable par le projet consommateur)
// ---------------------------------------------------------------------------

/** Clé localStorage par défaut. Surcharger via le paramètre `storageKey`. */
export const DEFAULT_SCROLL_STORAGE_KEY = 'pdf-engine-scroll-ratio'

/** Délai de debounce par défaut (ms) avant sauvegarde du scroll. */
export const SCROLL_SAVE_DELAY_MS = 150

/** Ratio proche de 1 considéré comme « en bas » (snapshot potentiellement effondré). */
const COLLAPSED_RATIO_THRESHOLD = 0.98

/** Bornes d'un ratio « milieu de document » pour détecter un faux bas de page. */
const MID_RATIO_MIN = 0.02
const MID_RATIO_MAX = 0.98

// ---------------------------------------------------------------------------
// Lecture / écriture
// ---------------------------------------------------------------------------

/**
 * Retourne le ratio de scroll sauvegardé [0–1], ou 0 si absent/invalide.
 * @param storageKey - Clé localStorage (défaut: DEFAULT_SCROLL_STORAGE_KEY)
 */
export function getSavedScrollRatio(
  storageKey = DEFAULT_SCROLL_STORAGE_KEY,
): number {
  try {
    const raw = localStorage.getItem(storageKey)
    if (raw === null) return 0

    const ratio = Number.parseFloat(raw)
    if (!Number.isFinite(ratio) || ratio < 0 || ratio > 1) return 0

    return ratio
  } catch {
    return 0
  }
}

/**
 * Sauvegarde un ratio de scroll [0–1] en localStorage.
 * @param ratio - Valeur entre 0 et 1
 * @param storageKey - Clé localStorage (défaut: DEFAULT_SCROLL_STORAGE_KEY)
 */
export function saveScrollRatio(
  ratio: number,
  storageKey = DEFAULT_SCROLL_STORAGE_KEY,
): void {
  try {
    localStorage.setItem(storageKey, String(ratio))
  } catch {
    // localStorage indisponible (mode privé, quota, etc.)
  }
}

/**
 * Efface la position de scroll sauvegardée.
 * @param storageKey - Clé localStorage (défaut: DEFAULT_SCROLL_STORAGE_KEY)
 */
export function clearSavedScrollRatio(
  storageKey = DEFAULT_SCROLL_STORAGE_KEY,
): void {
  try {
    localStorage.removeItem(storageKey)
  } catch {
    // Silencieux
  }
}

/**
 * Détecte un snapshot « effondré » : contenu DOM fortement réduit + ratio ≈ 1
 * alors que le dernier ratio utilisateur était au milieu du document.
 * Ne bloque pas un vrai scroll vers le bas (hauteur stable).
 */
export function isCollapsedScrollSnapshot(
  newRatio: number,
  previousRatio: number,
  scrollHeight: number,
  previousScrollHeight: number,
): boolean {
  if (previousScrollHeight <= 0) return false

  const heightCollapsed = scrollHeight < previousScrollHeight * 0.5

  return (
    heightCollapsed &&
    newRatio >= COLLAPSED_RATIO_THRESHOLD &&
    previousRatio > MID_RATIO_MIN &&
    previousRatio < MID_RATIO_MAX
  )
}

// ---------------------------------------------------------------------------
// Sauvegarde debounced
// ---------------------------------------------------------------------------

/**
 * Crée un sauvegardeur de scroll debounced.
 * Appelle `touch(area)` à chaque événement scroll — la sauvegarde n'a lieu
 * qu'après `delayMs` ms d'inactivité.
 *
 * Ignore les snapshots effondrés pour préserver le dernier ratio utilisateur.
 *
 * @param delayMs - Délai de debounce (défaut: SCROLL_SAVE_DELAY_MS)
 * @param storageKey - Clé localStorage (défaut: DEFAULT_SCROLL_STORAGE_KEY)
 * @returns `{ touch(area), cancel() }`
 */
export function createDebouncedScrollSaver(
  delayMs = SCROLL_SAVE_DELAY_MS,
  storageKey = DEFAULT_SCROLL_STORAGE_KEY,
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let lastUserRatio = getSavedScrollRatio(storageKey)
  let lastScrollHeight = 0

  return {
    touch(area: HTMLElement) {
      if (timeoutId !== null) clearTimeout(timeoutId)

      timeoutId = setTimeout(() => {
        const { scrollHeight, clientHeight, scrollTop } = area
        const maxScroll = scrollHeight - clientHeight
        if (maxScroll > 0) {
          const ratio = scrollTop / maxScroll
          if (
            !isCollapsedScrollSnapshot(
              ratio,
              lastUserRatio,
              scrollHeight,
              lastScrollHeight,
            )
          ) {
            saveScrollRatio(ratio, storageKey)
            lastUserRatio = ratio
            lastScrollHeight = scrollHeight
          }
        }
        timeoutId = null
      }, delayMs)
    },
    cancel() {
      if (timeoutId !== null) clearTimeout(timeoutId)
      timeoutId = null
    },
  }
}
