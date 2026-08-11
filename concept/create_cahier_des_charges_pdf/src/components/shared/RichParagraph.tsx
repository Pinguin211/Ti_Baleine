/**
 * @file components/shared/RichParagraph.tsx
 * @description Paragraphe PDF composé de segments texte avec mise en forme (bold, couleur…).
 *
 * Résout un problème de react-pdf : appliquer `marginBottom` directement sur
 * un `<Text>` multi-lignes entraîne souvent une sous-estimation de la hauteur.
 * La solution est d'envelopper dans un `<View>` qui porte la marge.
 *
 * @example
 *   <RichParagraph
 *     segments={[
 *       { text: 'Le projet ' },
 *       { text: 'PDF Engine', bold: true },
 *       { text: ' est modulable.' },
 *     ]}
 *     style={typo.paragraph}
 *   />
 */
import type { Style } from '@react-pdf/types'
import { Text, View } from '../../shims/react-pdf'
import type { TextSegment } from '../../types'
import { typographyStyles as typo } from '../../styles/typography'

interface RichParagraphProps {
  /** Liste de segments de texte */
  segments: TextSegment[]
  /** Style appliqué au conteneur Text (ex: typo.paragraph) */
  style?: Style
}

/**
 * Paragraphe avec segments bold/normal/coloré.
 *
 * La marge basse est extraite du style fourni et appliquée sur le View
 * englobant, pour contourner le bug de mesure de react-pdf.
 */
export function RichParagraph({ segments, style }: RichParagraphProps) {
  const marginBottom =
    style && typeof (style as Record<string, unknown>).marginBottom === 'number'
      ? (style as Record<string, number>).marginBottom
      : 4

  const textStyle: Style = { ...style, marginBottom: 0 }

  return (
    <View style={{ marginBottom }}>
      <Text style={textStyle}>
        {segments.map((segment, index) => {
          const inlineStyle: Style[] = []

          if (segment.bold) inlineStyle.push(typo.bold)
          if (segment.italic) inlineStyle.push({ fontFamily: 'Helvetica-Oblique' })
          if (segment.color) inlineStyle.push({ color: segment.color })

          return (
            <Text key={index} style={inlineStyle.length > 0 ? inlineStyle : undefined}>
              {segment.text}
            </Text>
          )
        })}
      </Text>
    </View>
  )
}
