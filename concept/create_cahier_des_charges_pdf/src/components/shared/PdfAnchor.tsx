/**
 * @file components/shared/PdfAnchor.tsx
 * @description Marqueur invisible pour les liens internes du document PDF.
 *
 * Placer ce composant juste avant un titre de section pour que les liens
 * du sommaire pointent au bon endroit.
 *
 * @example
 *   <PdfAnchor id={sectionAnchorId('1.1')} />
 *   <Text style={typo.sectionTitle}>1.1 Mon titre</Text>
 */
import { Text } from '../../shims/react-pdf'
import { componentStyles as comp } from '../../styles/components'

interface PdfAnchorProps {
  /** Identifiant unique de l'ancre (utilisé comme valeur de l'attribut `id`) */
  id: string
}

/** Marqueur invisible (hauteur 0) pour les liens internes du sommaire. */
export function PdfAnchor({ id }: PdfAnchorProps) {
  return <Text id={id} style={comp.anchor} />
}
