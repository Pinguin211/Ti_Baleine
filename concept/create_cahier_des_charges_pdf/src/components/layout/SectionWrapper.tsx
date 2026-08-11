/**
 * @file components/layout/SectionWrapper.tsx
 * @description Wrapper générique pour une section de document PDF.
 *
 * Gère l'affichage du titre de chapitre (avec règle colorée optionnelle)
 * et du titre de section. Le contenu est passé en tant qu'enfants.
 *
 * @example
 *   <SectionWrapper
 *     chapterTitle="1. Introduction"
 *     sectionTitle="1.1 Présentation du projet"
 *     anchorId="sec-1-1"
 *   >
 *     <ProseContent blocks={myBlocks} />
 *   </SectionWrapper>
 *
 *   // Sans titre de chapitre (suite sur une nouvelle page) :
 *   <SectionWrapper
 *     sectionTitle="1.2 Contexte"
 *     showChapterTitle={false}
 *   >
 *     <ProseContent blocks={otherBlocks} />
 *   </SectionWrapper>
 */
import type { ReactNode } from 'react'
import { Text, View } from '../../shims/react-pdf'
import { PdfAnchor } from '../shared/PdfAnchor'
import { typographyStyles as typo } from '../../styles/typography'
import { layoutStyles as layout } from '../../styles/layout'

interface SectionWrapperProps {
  /** Titre du chapitre (ex: "1. Introduction") */
  chapterTitle?: string
  /** Titre de la section (ex: "1.1 Présentation") */
  sectionTitle: string
  /** Afficher le titre de chapitre (défaut: true) */
  showChapterTitle?: boolean
  /** Identifiant d'ancre PDF pour les liens internes */
  anchorId?: string
  /** Contenu de la section */
  children: ReactNode
  /** Utiliser les variantes compactes des styles */
  compact?: boolean
}

/**
 * Enveloppe standard pour une section de document PDF.
 * Affiche le titre de chapitre + règle + titre de section + contenu.
 */
export function SectionWrapper({
  chapterTitle,
  sectionTitle,
  showChapterTitle = true,
  anchorId,
  children,
  compact = false,
}: SectionWrapperProps) {
  return (
    <View>
      {/* Ancre interne (invisible, pour les liens du sommaire) */}
      {anchorId && <PdfAnchor id={anchorId} />}

      {/* Titre de chapitre + règle colorée */}
      {showChapterTitle && chapterTitle && (
        <>
          <Text style={typo.chapterTitle}>{chapterTitle}</Text>
          <View style={layout.chapterRule} />
        </>
      )}

      {/* Titre de section */}
      <Text style={compact ? typo.sectionTitleCompact : typo.sectionTitle}>
        {sectionTitle}
      </Text>

      {/* Contenu */}
      {children}
    </View>
  )
}
