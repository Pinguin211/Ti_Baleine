/**
 * @file components/shared/ProseContent.tsx
 * @description Renderer générique pour un tableau de ContentBlock[].
 *
 * Gère les trois types de blocs :
 * - `paragraph` (texte simple)
 * - `paragraph` (segments : délégué à RichParagraph)
 * - `list` (liste à puces)
 *
 * @example
 *   const blocks: ContentBlock[] = [
 *     { type: 'paragraph', text: 'Premier paragraphe.' },
 *     { type: 'list', items: ['Point A', 'Point B'] },
 *   ]
 *   <ProseContent blocks={blocks} />
 */
import { Text, View } from '../../shims/react-pdf'
import type { ContentBlock, TextSegment } from '../../types'
import { RichParagraph } from './RichParagraph'
import { typographyStyles as typo } from '../../styles/typography'
import { spacing } from '../../styles/tokens'

export interface ProseContentProps {
  /** Blocs de contenu à rendre */
  blocks: ContentBlock[]
  /** Utiliser la variante compacte (plus petite police, moins d'espacement) */
  compact?: boolean
}

/** Vérifie si un bloc paragraphe est segmenté (pour RichParagraph). */
function isSegmentedBlock(
  block: ContentBlock,
): block is { type: 'paragraph'; segments: TextSegment[] } {
  return block.type === 'paragraph' && 'segments' in block
}

/**
 * Rend un tableau de ContentBlock en PDF.
 * Choisit automatiquement le bon composant selon le type de bloc.
 */
export function ProseContent({ blocks, compact = false }: ProseContentProps) {
  const paragraphStyle = compact ? typo.paragraphCompact : typo.paragraph
  const itemStyle = compact ? typo.listItemCompact : typo.listItem
  const listIndent = compact ? spacing.sm : spacing.md

  return (
    <View>
      {blocks.map((block, index) => {
        if (block.type === 'paragraph') {
          // Paragraphe segmenté → RichParagraph
          if (isSegmentedBlock(block)) {
            return (
              <RichParagraph
                key={index}
                segments={block.segments}
                style={paragraphStyle}
              />
            )
          }

          // Paragraphe simple → Text
          return (
            <Text key={index} style={paragraphStyle}>
              {block.text}
            </Text>
          )
        }

        // Liste à puces
        return (
          <View key={index} style={{ marginBottom: spacing.md, marginLeft: listIndent }}>
            {block.items.map((item, itemIndex) => (
              <Text key={itemIndex} style={itemStyle}>
                • {item}
              </Text>
            ))}
          </View>
        )
      })}
    </View>
  )
}
