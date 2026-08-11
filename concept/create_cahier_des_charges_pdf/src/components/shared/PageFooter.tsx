/**
 * @file components/shared/PageFooter.tsx
 * @description Footer de numérotation de pages pour le document PDF.
 *
 * Doit être placé comme enfant direct d'un `<Page>` avec `fixed`.
 * Le rendu utilise la prop `render` de react-pdf pour accéder à
 * `pageNumber` et `totalPages`.
 *
 * @example
 *   <Page size="A4" style={styles.page}>
 *     <MySectionContent />
 *     <PageFooter />
 *   </Page>
 *
 *   // Personnaliser le format :
 *   <PageFooter format={(page, total) => `Page ${page} sur ${total}`} />
 */
import { Text } from '../../shims/react-pdf'
import { layoutStyles as layout } from '../../styles/layout'

interface PageFooterProps {
  /**
   * Fonction de formatage du texte du footer.
   * Par défaut : "N / Total"
   */
  format?: (pageNumber: number, totalPages: number) => string
}

/** Footer fixe avec numérotation "N / Total" (ou format personnalisé). */
export function PageFooter({
  format = (page, total) => `${page} / ${total}`,
}: PageFooterProps) {
  return (
    <Text
      style={layout.pageFooter}
      render={({ pageNumber, totalPages }) => format(pageNumber, totalPages)}
      fixed
    />
  )
}
