/**
 * @file layouts/PdfLayout.tsx
 * @description Layout Pro du Cahier des Charges Fonctionnel — Ti'Baleine.
 *
 * Reproduit fidèlement le style professionnel et épuré du document de référence :
 * - Hero header corporate Navy avec badge et métadonnées en 3 colonnes
 * - Sections numérotées avec titres soulignés en bleu
 * - Blocs KPIs, In-Scope / Out-of-Scope comparatifs
 * - Grille tarifaire avec pills de prix et header navy
 * - Stepper parcours client numéroté
 * - Section Maquettes UI (Desktop & Mobile)
 * - Footer corporate avec numérotation Page X / Y
 */
import { Document, Page, View, StyleSheet } from '../shims/react-pdf'
import { ProHeroHeader } from '../components/sections/cdc/ProHeroHeader'
import { ProSection1 } from '../components/sections/cdc/ProSection1'
import { ProSection2 } from '../components/sections/cdc/ProSection2'
import { ProSection3 } from '../components/sections/cdc/ProSection3'
import { ProSection4 } from '../components/sections/cdc/ProSection4'
import { ProSection5_6 } from '../components/sections/cdc/ProSection5_6'
import { ProSection7_Mockups } from '../components/sections/cdc/ProSection7_Mockups'
import { ProPageFooter } from '../components/shared/ProPageFooter'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 40,
    paddingTop: 36,
    paddingBottom: 48,
    fontFamily: 'Helvetica',
  },
  body: {
    flexDirection: 'column',
  },
})

export function PdfLayout() {
  return (
    <Document
      title="Cahier des Charges Fonctionnel — Ti'Baleine"
      author="Thomas, Loïc, Benjamin & Ivan"
      subject="Plateforme Web de Réservation en Ligne — Ti'Baleine"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.body}>
          {/* En-tête Hero Navy (Page 1) */}
          <ProHeroHeader />

          {/* 1. Contexte & Objectifs */}
          <ProSection1 />

          {/* 2. Périmètre du Projet (In-Scope / Out-of-Scope) */}
          <ProSection2 />

          {/* 3. Règles Métier, Flotte & Grille Tarifaire */}
          <ProSection3 />

          {/* 4. Description des Fonctionnalités (Client & Admin) */}
          <ProSection4 />

          {/* 5. Exigences & 6. Livrables */}
          <ProSection5_6 />

          {/* 7. Maquettes UI (Desktop & Mobile) */}
          <ProSection7_Mockups />
        </View>

        {/* Footer récurrent Page X / Y */}
        <ProPageFooter />
      </Page>
    </Document>
  )
}
