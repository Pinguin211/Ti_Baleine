/**
 * @file components/preview/PdfPreview.tsx
 * @description Viewer PDF dans le navigateur (react-pdf / PDF.js).
 *
 * Fonctionnalités :
 * - Affichage multi-pages du blob PDF généré par useGeneratedPdf
 * - Zoom avec Ctrl+Molette (ou Cmd+Molette sur Mac) + boutons ±
 * - Persistance de la position de scroll dans localStorage
 * - Restauration automatique du scroll après régénération
 * - Responsive : la largeur de page suit le conteneur (ResizeObserver)
 *
 * @example
 *   // Usage minimal (révision contrôlée depuis l'App)
 *   <PdfPreview revision={pdfRevision} renderFn={myRenderFn} />
 *
 *   // Avec clé de stockage personnalisée
 *   <PdfPreview
 *     revision={pdfRevision}
 *     renderFn={myRenderFn}
 *     storageKey="mon-projet-scroll"
 *   />
 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { useGeneratedPdf, type PdfRenderFn } from '../../hooks/useGeneratedPdf'
import {
  createDebouncedScrollSaver,
  getSavedScrollRatio,
  DEFAULT_SCROLL_STORAGE_KEY,
} from '../../utils/pdfScrollStorage'
import './PdfPreview.css'

// Initialiser le worker PDF.js (requis par react-pdf)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

// ---------------------------------------------------------------------------
// Constantes
// ---------------------------------------------------------------------------

const ZOOM_MIN = 0.5
const ZOOM_MAX = 3
const ZOOM_STEP = 0.25
const ZOOM_DEFAULT = 0.5
const SCROLL_RESTORE_MAX_ATTEMPTS = 8

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PdfPreviewProps {
  /**
   * Révision courante du PDF.
   * Incrémenter cette valeur force la régénération du blob.
   */
  revision?: number
  /**
   * Fonction de rendu fournie par le projet consommateur.
   * Reçoit la révision et retourne un Blob PDF.
   */
  renderFn: PdfRenderFn
  /**
   * Clé localStorage pour la persistance du scroll.
   * Défaut : DEFAULT_SCROLL_STORAGE_KEY
   */
  storageKey?: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Restaure la position de scroll de manière robuste (plusieurs tentatives). */
function restoreScrollPosition(
  area: HTMLDivElement,
  ratio: number,
  attempt = 0,
) {
  const maxScroll = area.scrollHeight - area.clientHeight
  area.scrollTop = ratio * maxScroll

  if (attempt >= SCROLL_RESTORE_MAX_ATTEMPTS) return

  const heightBefore = area.scrollHeight
  requestAnimationFrame(() => {
    if (area.scrollHeight !== heightBefore) {
      restoreScrollPosition(area, ratio, attempt + 1)
    }
  })
}

// ---------------------------------------------------------------------------
// Composant
// ---------------------------------------------------------------------------

/**
 * Viewer PDF en navigateur avec zoom, scroll persistant et responsive.
 */
export function PdfPreview({
  revision = 0,
  renderFn,
  storageKey = DEFAULT_SCROLL_STORAGE_KEY,
}: PdfPreviewProps) {
  const { blob, loading, error, blobRevision } = useGeneratedPdf(revision, renderFn)
  const canvasAreaRef = useRef<HTMLDivElement>(null)

  const [numPages, setNumPages] = useState(0)
  const [pageWidth, setPageWidth] = useState(0)
  const [zoom, setZoom] = useState(ZOOM_DEFAULT)
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const [renderedPageCount, setRenderedPageCount] = useState(0)

  const shouldRestoreScrollRef = useRef(getSavedScrollRatio(storageKey) > 0)
  const prevBlobUrlRef = useRef<string | null>(null)
  const isRestoringScrollRef = useRef(false)
  const allowScrollSaveRef = useRef(false)
  const scrollSaverRef = useRef(createDebouncedScrollSaver(undefined, storageKey))
  const renderedPagesRef = useRef(new Set<number>())
  const numPagesRef = useRef(0)
  const renderedPageCountRef = useRef(0)

  const isBlobReady = blobRevision === revision && blob !== null

  // Mis à jour pendant le render pour bloquer les snapshots dès l'effondrement du DOM
  allowScrollSaveRef.current =
    !loading && !!blobUrl && !isRestoringScrollRef.current

  // --------------------------------------------------------------------------
  // Restauration du scroll
  // --------------------------------------------------------------------------

  const tryRestoreScroll = useCallback(() => {
    if (!shouldRestoreScrollRef.current) return
    if (!isBlobReady || !blobUrl || loading || blobRevision !== revision) return
    if (numPagesRef.current === 0 || renderedPageCountRef.current < numPagesRef.current) return

    const ratio = getSavedScrollRatio(storageKey)
    if (ratio <= 0) {
      shouldRestoreScrollRef.current = false
      return
    }

    shouldRestoreScrollRef.current = false
    isRestoringScrollRef.current = true

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const area = canvasAreaRef.current
        if (!area) {
          isRestoringScrollRef.current = false
          return
        }
        restoreScrollPosition(area, ratio)
        // Laisser le navigateur appliquer le scroll avant de réautoriser les snapshots
        requestAnimationFrame(() => {
          isRestoringScrollRef.current = false
        })
      })
    })
  }, [blobRevision, blobUrl, isBlobReady, loading, revision, storageKey])

  // Réarmer la restauration à chaque nouveau blob (Actualiser + HMR)
  useLayoutEffect(() => {
    if (!blobUrl || blobUrl === prevBlobUrlRef.current) return

    shouldRestoreScrollRef.current = getSavedScrollRatio(storageKey) > 0
    prevBlobUrlRef.current = blobUrl
    renderedPagesRef.current = new Set()
    numPagesRef.current = 0
    renderedPageCountRef.current = 0
    setRenderedPageCount(0)
    setNumPages(0)
  }, [blobUrl, storageKey])

  // Créer / révoquer l'URL objet du blob
  useLayoutEffect(() => {
    if (!isBlobReady || !blob) {
      setBlobUrl(null)
      return
    }

    const url = URL.createObjectURL(blob)
    setBlobUrl(url)

    return () => URL.revokeObjectURL(url)
  }, [blob, blobRevision, revision, isBlobReady])

  // --------------------------------------------------------------------------
  // Effets : scroll, resize, zoom
  // --------------------------------------------------------------------------

  // Annuler tout snapshot en attente dès que la sauvegarde n'est plus autorisée
  useLayoutEffect(() => {
    if (!allowScrollSaveRef.current) {
      scrollSaverRef.current.cancel()
    }
  }, [loading, blobUrl])

  // Sauvegarder la position de scroll (debounced).
  // Pas de snapshot pendant génération / restauration — conserve le dernier ratio utilisateur.
  useEffect(() => {
    const area = canvasAreaRef.current
    if (!area) return

    const scrollSaver = createDebouncedScrollSaver(undefined, storageKey)
    scrollSaverRef.current = scrollSaver

    const onScroll = () => {
      if (!allowScrollSaveRef.current || isRestoringScrollRef.current) return
      scrollSaver.touch(area)
    }

    area.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      area.removeEventListener('scroll', onScroll)
      scrollSaver.cancel()
    }
  }, [storageKey])

  // Tenter la restauration quand les pages sont prêtes
  useEffect(() => {
    tryRestoreScroll()
  }, [tryRestoreScroll, renderedPageCount, numPages])

  // Observer la largeur du conteneur (responsive)
  useEffect(() => {
    const area = canvasAreaRef.current
    if (!area) return

    const updateWidth = () => setPageWidth(area.clientWidth)
    updateWidth()

    const observer = new ResizeObserver(updateWidth)
    observer.observe(area)
    return () => observer.disconnect()
  }, [])

  // Zoom avec Ctrl/Cmd + molette
  useEffect(() => {
    const area = canvasAreaRef.current
    if (!area) return

    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return
      event.preventDefault()
      const delta = event.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP
      setZoom((current) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, current + delta)))
    }

    area.addEventListener('wheel', onWheel, { passive: false })
    return () => area.removeEventListener('wheel', onWheel)
  }, [])

  // --------------------------------------------------------------------------
  // Callbacks PDF.js
  // --------------------------------------------------------------------------

  const onDocumentLoadSuccess = useCallback(
    ({ numPages: total }: { numPages: number }) => {
      renderedPagesRef.current = new Set()
      renderedPageCountRef.current = 0
      numPagesRef.current = total
      setRenderedPageCount(0)
      setNumPages(total)
    },
    [],
  )

  const markPageReady = useCallback((pageNumber: number) => {
    if (renderedPagesRef.current.has(pageNumber)) return
    renderedPagesRef.current.add(pageNumber)
    renderedPageCountRef.current = renderedPagesRef.current.size
    setRenderedPageCount(renderedPageCountRef.current)
  }, [])

  // --------------------------------------------------------------------------
  // Contrôles de zoom
  // --------------------------------------------------------------------------

  const zoomOut = () => setZoom((z) => Math.max(ZOOM_MIN, z - ZOOM_STEP))
  const zoomIn = () => setZoom((z) => Math.min(ZOOM_MAX, z + ZOOM_STEP))
  const resetZoom = () => setZoom(ZOOM_DEFAULT)

  const renderedWidth = pageWidth > 0 ? pageWidth * zoom : undefined
  const isGenerating = loading || !isBlobReady || !blobUrl

  // --------------------------------------------------------------------------
  // Rendu
  // --------------------------------------------------------------------------

  return (
    <div className="pdf-viewer">
      {/* Toolbar */}
      <div className="pdf-toolbar">
        <span className="pdf-toolbar__page">
          {numPages > 0 ? `${numPages} page${numPages > 1 ? 's' : ''}` : '—'}
        </span>

        <span className="pdf-toolbar__separator" aria-hidden />

        <div className="pdf-toolbar__group">
          <button
            type="button"
            id="pdf-zoom-out"
            className="pdf-toolbar__icon-btn"
            onClick={zoomOut}
            disabled={isGenerating || zoom <= ZOOM_MIN}
            title="Dézoomer (Ctrl−)"
            aria-label="Dézoomer"
          >
            −
          </button>
          <button
            type="button"
            id="pdf-zoom-reset"
            className="pdf-toolbar__zoom-label"
            onClick={resetZoom}
            disabled={isGenerating}
            title="Réinitialiser le zoom"
          >
            {Math.round(zoom * 100)} %
          </button>
          <button
            type="button"
            id="pdf-zoom-in"
            className="pdf-toolbar__icon-btn"
            onClick={zoomIn}
            disabled={isGenerating || zoom >= ZOOM_MAX}
            title="Zoomer (Ctrl+)"
            aria-label="Zoomer"
          >
            +
          </button>
        </div>
      </div>

      {/* Zone de rendu PDF */}
      <div ref={canvasAreaRef} className="pdf-canvas-area">
        {isGenerating && (
          <p className="pdf-viewer__status">Génération du PDF…</p>
        )}

        {error && (
          <p className="pdf-viewer__error">Erreur : {error.message}</p>
        )}

        {blobUrl && !error && !loading && (
          <Document
            key={blobUrl}
            file={blobUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<p className="pdf-viewer__status">Chargement du document…</p>}
            error={<p className="pdf-viewer__error">Impossible d'afficher le PDF.</p>}
          >
            {Array.from({ length: numPages }, (_, index) => (
              <Page
                key={`page-${index + 1}`}
                pageNumber={index + 1}
                width={renderedWidth}
                onLoadSuccess={() => markPageReady(index + 1)}
                loading={
                  <p className="pdf-viewer__status">Rendu de la page {index + 1}…</p>
                }
              />
            ))}
          </Document>
        )}
      </div>
    </div>
  )
}
