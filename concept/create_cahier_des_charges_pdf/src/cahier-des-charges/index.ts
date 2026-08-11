/**
 * @file cahier-des-charges/index.ts
 * @description Barrel export de toutes les sources du cahier des charges Ti'Baleine.
 *
 * Regroupe la totalité des données du document dans un objet typé unique
 * utilisé par le CdcSourceContext pour alimenter les sections PDF.
 */
export { cahierMeta } from './meta'
export { section1_1, section1_2 } from './section1'
export { section2_1, section2_2 } from './section2'
export { section3_1, section3_2 } from './section3'
export { section4_1, section4_2 } from './section4'
export { section5_1, section5_2 } from './section5'
export { section6_1, section6_2 } from './section6'

import { cahierMeta } from './meta'
import { section1_1, section1_2 } from './section1'
import { section2_1, section2_2 } from './section2'
import { section3_1, section3_2 } from './section3'
import { section4_1, section4_2 } from './section4'
import { section5_1, section5_2 } from './section5'
import { section6_1, section6_2 } from './section6'

/** Sources complètes du cahier des charges Ti'Baleine */
export const cdcSources = {
  meta: cahierMeta,
  section1_1,
  section1_2,
  section2_1,
  section2_2,
  section3_1,
  section3_2,
  section4_1,
  section4_2,
  section5_1,
  section5_2,
  section6_1,
  section6_2,
}

export type CdcSources = typeof cdcSources
