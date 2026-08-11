/**
 * @file demo/sections/SampleCodeSection.tsx
 * @description Section de démonstration — extrait de code avec CodeExcerpt.
 *
 * Illustre l'utilisation de :
 * - CodeExcerpt (bloc de code monospace avec indentation préservée)
 * - formatCodeLinesForPdf (utilitaire d'indentation)
 * - Combinaison ProseContent + CodeExcerpt dans une même section
 */
import { View } from '../../shims/react-pdf'
import { usePdfSources } from '../../context/PdfSourceContext'
import { SectionWrapper } from '../../components/layout/SectionWrapper'
import { ProseContent } from '../../components/shared/ProseContent'
import { CodeExcerpt } from '../../components/shared/CodeExcerpt'
import { layoutStyles as layout } from '../../styles/layout'
import type { DemoSources } from '../DemoSources'

/**
 * Section démo affichant un extrait de code.
 * Illustre le composant CodeExcerpt et la combinaison avec ProseContent.
 */
export function SampleCodeSection() {
  const { codeSection, codeLines } = usePdfSources<DemoSources>()
  const { chapterTitle, sectionTitle, blocks } = codeSection

  return (
    <SectionWrapper
      chapterTitle={chapterTitle}
      sectionTitle={sectionTitle}
      anchorId="sec-3-1"
    >
      <View style={layout.content}>
        <ProseContent blocks={blocks} />

        <CodeExcerpt
          title="src/hooks/useGeneratedPdf.tsx — Exemple d'intégration"
          lines={codeLines}
        />
      </View>
    </SectionWrapper>
  )
}
