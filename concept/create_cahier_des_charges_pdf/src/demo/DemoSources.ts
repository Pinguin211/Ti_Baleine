/**
 * @file demo/DemoSources.ts
 * @description Sources de données pour la démonstration du moteur PDF.
 *
 * Ce fichier définit le type DemoSources et les données par défaut.
 * Il illustre comment un projet consommateur doit organiser ses sources.
 *
 * Dans votre projet réel :
 * 1. Définir votre propre type de sources (ex: MySources)
 * 2. Créer un fichier de données par section
 * 3. Assembler ici et injecter via PdfSourceProvider
 */
import type { DocumentSection } from '../types'
import {
  sampleTextSection,
  sampleRichSection,
  sampleCodeSection,
  sampleCodeLines,
} from './data/sampleDocument'

// ---------------------------------------------------------------------------
// Type des sources de démo
// ---------------------------------------------------------------------------

/**
 * Type des sources injectées dans le context pour la démo.
 * À remplacer par votre propre type dans votre projet.
 */
export interface DemoSources extends Record<string, unknown> {
  textSection: DocumentSection
  richSection: DocumentSection
  codeSection: DocumentSection
  codeLines: string[]
}

// ---------------------------------------------------------------------------
// Données par défaut de la démo
// ---------------------------------------------------------------------------

/**
 * Sources de données de démonstration.
 * Utilisées par le PdfLayout de démo et les sections demo/*.
 */
export const defaultDemoSources: DemoSources = {
  textSection: sampleTextSection,
  richSection: sampleRichSection,
  codeSection: sampleCodeSection,
  codeLines: sampleCodeLines,
}
