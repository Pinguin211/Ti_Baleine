/**
 * @file App.tsx
 * @description Application shell — Cahier des Charges Ti'Baleine.
 *
 * Orchestre la génération et l'affichage du PDF du cahier des charges.
 */
import { useCallback, useState } from 'react'
import { pdf, PDFDownloadLink } from './shims/react-pdf'
import { PdfSourceProvider } from './context/PdfSourceContext'
import { PdfLayout } from './layouts/PdfLayout'
import { PdfPreview } from './components/preview/PdfPreview'
import { cdcSources } from './cahier-des-charges'
import type { PdfRenderFn } from './hooks/useGeneratedPdf'
import './App.css'

/**
 * Fonction de rendu du PDF Cahier des Charges Ti'Baleine.
 */
const cdcRenderFn: PdfRenderFn = async (revision: number) => {
  const sources = { ...cdcSources, _revision: revision }

  return pdf(
    <PdfSourceProvider sources={sources}>
      <PdfLayout key={revision} />
    </PdfSourceProvider>,
  ).toBlob()
}

/**
 * App shell — header + viewer PDF.
 */
function App() {
  const [pdfRevision, setPdfRevision] = useState(0)

  const bumpRevision = useCallback(() => {
    setPdfRevision((rev) => rev + 1)
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__brand">
          <div className="app-header__logo">🐋</div>
          <span className="app-header__title">Ti'Baleine</span>
        </div>
        <span className="app-header__subtitle">Cahier des Charges Fonctionnel & Projet</span>
        <div className="app-header__spacer" />

        <div className="header-actions">
          <button
            id="btn-refresh"
            type="button"
            className="refresh-btn"
            onClick={bumpRevision}
            title="Régénérer le PDF"
          >
            ↺ Actualiser
          </button>

          <PDFDownloadLink
            id="btn-download"
            document={
              <PdfSourceProvider sources={cdcSources}>
                <PdfLayout />
              </PdfSourceProvider>
            }
            fileName="cahier-des-charges-ti-baleine.pdf"
            className="download-btn"
          >
            {({ loading }) => (loading ? 'Génération…' : '↓ Télécharger')}
          </PDFDownloadLink>
        </div>
      </header>

      <main className="preview">
        <PdfPreview revision={pdfRevision} renderFn={cdcRenderFn} />
      </main>
    </div>
  )
}

export default App
