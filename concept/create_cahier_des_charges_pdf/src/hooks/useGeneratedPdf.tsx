/**
 * @file hooks/useGeneratedPdf.tsx
 * @description Hook de génération PDF asynchrone avec cache-busting HMR.
 *
 * Ce hook résout deux problèmes de développement :
 * 1. En dev Vite, les modules sont mis en cache — il faut un `?rev=N` pour forcer
 *    le rechargement des données modifiées.
 * 2. La génération est async et peut être annulée si une nouvelle révision démarre.
 *
 * Usage dans votre projet :
 *
 * @example
 *   // Définir une renderFn dans votre App ou layout
 *   async function myRenderFn(revision: number): Promise<Blob> {
 *     const sources = await myLoadSources(revision)
 *     return pdf(
 *       <PdfSourceProvider sources={sources}>
 *         <MyPdfLayout key={revision} />
 *       </PdfSourceProvider>
 *     ).toBlob()
 *   }
 *
 *   // Utiliser le hook
 *   const { blob, loading, error } = useGeneratedPdf(revision, myRenderFn)
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GeneratedPdfState {
  /** Blob du PDF généré, ou null si en cours de génération */
  blob: Blob | null
  /** true pendant la génération */
  loading: boolean
  /** Erreur de génération, ou null */
  error: Error | null
  /**
   * Révision pour laquelle le blob actuel a été généré.
   * null pendant la régénération. Comparer avec `revision` pour savoir
   * si le blob est à jour.
   */
  blobRevision: number | null
}

/**
 * Fonction de rendu fournie par le projet consommateur.
 * Reçoit la révision courante et retourne un Blob PDF.
 */
export type PdfRenderFn = (revision: number) => Promise<Blob>

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Génère un blob PDF de manière asynchrone.
 *
 * @param revision - Incrémenter pour forcer la régénération
 * @param renderFn - Fonction async qui produit le blob PDF (définie par le consommateur)
 * @returns État de génération : blob, loading, error, blobRevision
 */
export function useGeneratedPdf(
  revision: number,
  renderFn: PdfRenderFn,
): GeneratedPdfState {
  const [blob, setBlob] = useState<Blob | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [blobRevision, setBlobRevision] = useState<number | null>(null)

  // Identifiant de génération pour annuler les générations périmées
  const generationRef = useRef(0)

  // Réinitialiser l'état dès que la révision change (avant le prochain render)
  useLayoutEffect(() => {
    setBlob(null)
    setBlobRevision(null)
    setLoading(true)
    setError(null)
  }, [revision])

  useEffect(() => {
    const generationId = ++generationRef.current

    renderFn(revision)
      .then((generated) => {
        // Ignorer si une nouvelle génération a démarré entre-temps
        if (generationId !== generationRef.current) return

        setBlob(generated)
        setBlobRevision(revision)
        setLoading(false)
      })
      .catch((err: unknown) => {
        if (generationId !== generationRef.current) return

        setError(err instanceof Error ? err : new Error(String(err)))
        setLoading(false)
      })
  }, [revision, renderFn])

  return { blob, loading, error, blobRevision }
}
