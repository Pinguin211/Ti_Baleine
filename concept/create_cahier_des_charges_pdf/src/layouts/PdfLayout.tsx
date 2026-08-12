/**
 * @file layouts/PdfLayout.tsx
 * @description Layout Pro du Cahier des Charges Fonctionnel v2 — Ti'Baleine.
 *
 * Structure les 12 sections normées du CDC v2 + Maquettes UI :
 * - Hero header corporate Navy avec badge et métadonnées en 3 colonnes
 * - 1. Contexte & 2. Problème
 * - 3. Objectifs & 4. Parties Prenantes
 * - 5. Personas (Sophie, Marc, Administrateur)
 * - 6. Périmètre (In/Out-of-Scope) & 7. Contraintes
 * - 8. Règles Métier (R-01 à R-19) & Grille Tarifaire
 * - 9. Exigences Fonctionnelles (MoSCoW) & 10. Exigences Non Fonctionnelles
 * - 11. Questions Restées Ouvertes & 12. Validation Client
 * - 13. Maquettes UI (Desktop & Mobile)
 * - Footer corporate récurrent avec numérotation Page X / Y
 */
import { Document, Page, View, StyleSheet } from '../shims/react-pdf'
import { ProHeroHeader } from '../components/sections/cdc/ProHeroHeader'
import { ProSection1 } from '../components/sections/cdc/ProSection1'
import { ProSection2 } from '../components/sections/cdc/ProSection2'
import { ProSection3 } from '../components/sections/cdc/ProSection3'
import { ProSection4 } from '../components/sections/cdc/ProSection4'
import { ProSection5 } from '../components/sections/cdc/ProSection5'
import { ProSection6 } from '../components/sections/cdc/ProSection6'
import { ProSection7 } from '../components/sections/cdc/ProSection7'
import { ProSectionMockups } from '../components/sections/cdc/ProSectionMockups'
import { ProPageFooter } from '../components/shared/ProPageFooter'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 36,
    paddingTop: 32,
    paddingBottom: 44,
    fontFamily: 'Helvetica',
  },
  body: {
    flexDirection: 'column',
  },
})

export function PdfLayout() {
  return (
    <Document
      title="Cahier des Charges — Ti'Baleine v2"
      author="Thomas, Loïc, Benjamin & Ivan | RageGit"
      subject="Plateforme Web de Réservation en Ligne — Ti'Baleine"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.body}>
          {/* En-tête Hero Navy */}
          <ProHeroHeader />

          {/* 1. Contexte & 2. Problème */}
          <ProSection1 />

          {/* 3. Objectifs & 4. Parties Prenantes */}
          <ProSection2 />

          {/* 5. Personas */}
          <ProSection3 />

          {/* 6. Périmètre & 7. Contraintes */}
          <ProSection4 />

          {/* 8. Règles Métier & Grille Tarifaire */}
          <ProSection5 />

          {/* 9. Exigences Fonctionnelles & 10. Exigences Non Fonctionnelles */}
          <ProSection6 />

          {/* 11. Questions Restées Ouvertes & 12. Validation Client */}
          <ProSection7 />

          {/* 13. Maquettes UI (Desktop & Mobile) */}
          <ProSectionMockups />
        </View>

        {/* Footer récurrent Page X / Y */}
        <ProPageFooter />
      </Page>
    </Document>
  )
}
