/**
 * @file demo/sections/SampleTextSection.tsx
 * @description Section de démonstration — texte simple avec ProseContent.
 *
 * Illustre l'utilisation de :
 * - SectionWrapper (titre chapitre + règle + titre section)
 * - ProseContent (paragraphes et listes)
 * - usePdfSources (consommation du context)
 * - layoutStyles.content (bloc de section avec bordure gauche)
 */
import { View } from '../../shims/react-pdf'
import { usePdfSources } from '../../context/PdfSourceContext'
import { SectionWrapper } from '../../components/layout/SectionWrapper'
import { ProseContent } from '../../components/shared/ProseContent'
import { layoutStyles as layout } from '../../styles/layout'
import type { DemoSources } from '../DemoSources'

/**
 * Section démo affichant des paragraphes et une liste via ProseContent.
 * Montre comment consommer les sources via le context et structurer une section.
 */
export function SampleTextSection() {
  const { textSection } = usePdfSources<DemoSources>()
  const { chapterTitle, sectionTitle, blocks } = textSection

  return (
    <SectionWrapper
      chapterTitle={chapterTitle}
      sectionTitle={sectionTitle}
      anchorId="sec-1-1"
    >
      <View style={layout.content}>
        <ProseContent blocks={blocks} />
      </View>
    </SectionWrapper>
  )
}
