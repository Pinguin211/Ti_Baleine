/**
 * @file demo/sections/SampleRichSection.tsx
 * @description Section de démonstration — paragraphes riches avec RichParagraph.
 *
 * Illustre l'utilisation de :
 * - RichParagraph (segments bold, italic, colorés)
 * - ProseContent avec blocs segmentés
 * - layoutStyles.content (bloc de section)
 */
import { View } from '../../shims/react-pdf'
import { usePdfSources } from '../../context/PdfSourceContext'
import { SectionWrapper } from '../../components/layout/SectionWrapper'
import { ProseContent } from '../../components/shared/ProseContent'
import { layoutStyles as layout } from '../../styles/layout'
import type { DemoSources } from '../DemoSources'

/**
 * Section démo affichant des paragraphes riches (segments) via ProseContent.
 * Illustre le support bold/italic/color dans RichParagraph.
 */
export function SampleRichSection() {
  const { richSection } = usePdfSources<DemoSources>()
  const { chapterTitle, sectionTitle, blocks } = richSection

  return (
    <SectionWrapper
      chapterTitle={chapterTitle}
      sectionTitle={sectionTitle}
      anchorId="sec-2-1"
    >
      <View style={layout.content}>
        <ProseContent blocks={blocks} />
      </View>
    </SectionWrapper>
  )
}
