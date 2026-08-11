/**
 * @file layouts/PdfLayout.tsx
 * @description Layout Prestige du Cahier des Charges Fonctionnel — Ti'Baleine.
 *
 * Structure en flux continu & naturel :
 *   - Page 1 : Page de Couverture Prestige
 *   - Pages suivantes : Flux continu naturel avec en-tête récurrent et pagination dynamique
 */
import { Document, Page, View, StyleSheet } from '../shims/react-pdf'
import { PageFooter } from '../components/shared/PageFooter'
import { PageHeaderBanner } from '../components/shared/PageHeaderBanner'
import { EnhancedCoverSection } from '../components/sections/cdc/EnhancedCoverSection'
import { ObjectiveCards } from '../components/sections/cdc/ObjectiveCards'
import { ScopeMatrixSection } from '../components/sections/cdc/ScopeMatrixSection'
import { FleetShowcaseSection } from '../components/sections/cdc/FleetShowcaseSection'
import { TarifCardsSection } from '../components/sections/cdc/TarifCardsSection'
import { BookingStepperSection } from '../components/sections/cdc/BookingStepperSection'
import { AdminAndDeliverablesSection } from '../components/sections/cdc/AdminAndDeliverablesSection'
import { MockupsSection } from '../components/sections/cdc/MockupsSection'
import { dimensions } from '../styles/tokens'

const styles = StyleSheet.create({
  coverPage: {
    backgroundColor: '#ffffff',
    padding: 0,
  },
  contentPage: {
    backgroundColor: '#ffffff',
    paddingTop: dimensions.pagePaddingCompact,
    paddingBottom: dimensions.pagePaddingV,
    paddingHorizontal: dimensions.pagePaddingH,
    fontFamily: 'Helvetica',
  },
  bodyContainer: {
    flexDirection: 'column',
  },
})

export function PdfLayout() {
  return (
    <Document
      title="Cahier des Charges Fonctionnel — Ti'Baleine"
      author="Thomas, Loïc, Benjamin et Ivan"
      subject="Plateforme Web de Réservation et Gestion d'Excursions Maritimes"
    >
      {/* ── Page 1 : Couverture Prestige ──────────────────────────────────── */}
      <Page size="A4" style={styles.coverPage}>
        <EnhancedCoverSection />
      </Page>

      {/* ── Pages de Contenu en Flux Continu ──────────────────────────────── */}
      <Page size="A4" style={styles.contentPage}>
        {/* En-tête de page répété sur chaque page générée */}
        <PageHeaderBanner currentSection="Cahier des Charges Fonctionnel" />

        {/* Flux de contenu structuré en composants riches */}
        <View style={styles.bodyContainer}>
          {/* Section 1 : Contexte & Objectifs */}
          <ObjectiveCards />

          {/* Section 2 : Périmètre In-Scope vs Out-of-Scope */}
          <ScopeMatrixSection />

          {/* Section 3.1 : Flotte, Règles Métier & Planning */}
          <FleetShowcaseSection />

          {/* Section 3.2 : Grille Tarifaire par Activité */}
          <TarifCardsSection />

          {/* Section 4.1 : Stepper Parcours Client */}
          <BookingStepperSection />

          {/* Sections 4.2, 5 & 6 : Espace Admin, Exigences & Livrables */}
          <AdminAndDeliverablesSection />

          {/* Section 7 : Maquettes UI Desktop & Mobile */}
          <MockupsSection />
        </View>

        {/* Numérotation continue au pied de chaque page */}
        <PageFooter format={(page, total) => `Ti'Baleine · Cahier des Charges — Page ${page} sur ${total}`} />
      </Page>
    </Document>
  )
}
