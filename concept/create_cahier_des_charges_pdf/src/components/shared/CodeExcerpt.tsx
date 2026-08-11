/**
 * @file components/shared/CodeExcerpt.tsx
 * @description Bloc de code stylisé pour les extraits de code dans le PDF.
 *
 * Gère l'indentation en espaces insécables (requis par react-pdf qui ne
 * supporte pas les espaces multiples en début de ligne).
 *
 * @example
 *   <CodeExcerpt
 *     title="src/utils/example.ts"
 *     lines={[
 *       'export function greet(name: string) {',
 *       '  return `Hello, ${name}!`',
 *       '}',
 *     ]}
 *   />
 */
import { Text, View } from '../../shims/react-pdf'
import { componentStyles as comp } from '../../styles/components'

export interface CodeExcerptProps {
  /** Titre affiché au-dessus du bloc (ex: nom du fichier) */
  title: string
  /** Lignes de code à afficher */
  lines: string[]
  /** Variante compacte (police plus petite) */
  compact?: boolean
  /** Mode imbriqué (sans marge externe) */
  nested?: boolean
}

/** Largeur d'une tabulation en espaces */
const TAB_WIDTH = 2

/**
 * Convertit une ligne de code pour react-pdf :
 * - Remplace les tabulations par des espaces
 * - Convertit l'indentation en espaces insécables (U+00A0)
 *
 * @param line - Ligne de code brute
 * @param tabWidth - Largeur d'une tabulation (défaut: 2)
 * @returns Ligne formatée pour react-pdf
 */
export function formatCodeLineForPdf(line: string, tabWidth = TAB_WIDTH): string {
  const expanded = line.replace(/\t/g, ' '.repeat(tabWidth))
  const leading = expanded.match(/^( +)/)
  if (!leading) return expanded
  return '\u00A0'.repeat(leading[1].length) + expanded.slice(leading[1].length)
}

/**
 * Formate un tableau de lignes de code pour react-pdf.
 * @param lines - Lignes de code brutes
 * @param tabWidth - Largeur d'une tabulation (défaut: 2)
 */
export function formatCodeLinesForPdf(lines: string[], tabWidth = TAB_WIDTH): string[] {
  return lines.map((line) => formatCodeLineForPdf(line, tabWidth))
}

/** Bloc de code avec titre, fond gris et police monospace. */
export function CodeExcerpt({
  title,
  lines,
  compact = false,
  nested = false,
}: CodeExcerptProps) {
  return (
    <View
      style={nested ? comp.codeWrapperNested : comp.codeWrapper}
      wrap={false}
    >
      <Text style={comp.codeTitle}>{title}</Text>
      <View style={comp.codeBlock} wrap={false}>
        {lines.map((line, index) => (
          <Text
            key={index}
            style={compact ? [comp.codeLine, comp.codeLineCompact] : comp.codeLine}
          >
            {formatCodeLineForPdf(line) || ' '}
          </Text>
        ))}
      </View>
    </View>
  )
}
