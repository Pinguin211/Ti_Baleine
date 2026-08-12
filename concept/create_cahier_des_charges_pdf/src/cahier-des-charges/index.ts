/**
 * @file cahier-des-charges/index.ts
 * @description Barrel export de toutes les sources du cahier des charges Ti'Baleine v2.
 */
export { cahierMeta } from './meta'
export { cdcContext, cdcProblem } from './section1'
export { cdcObjectives, cdcStakeholders } from './section2'
export { cdcPersonas } from './section3'
export { cdcScopeIn, cdcScopeOut, cdcConstraints } from './section4'
export { cdcBusinessRules, cdcTarifs } from './section5'
export { cdcFunctionalReqs, cdcNonFunctionalReqs } from './section6'
export { cdcOpenQuestions, cdcValidations } from './section7'

import { cahierMeta } from './meta'
import { cdcContext, cdcProblem } from './section1'
import { cdcObjectives, cdcStakeholders } from './section2'
import { cdcPersonas } from './section3'
import { cdcScopeIn, cdcScopeOut, cdcConstraints } from './section4'
import { cdcBusinessRules, cdcTarifs } from './section5'
import { cdcFunctionalReqs, cdcNonFunctionalReqs } from './section6'
import { cdcOpenQuestions, cdcValidations } from './section7'

/** Sources complètes du cahier des charges Ti'Baleine v2 */
export const cdcSources = {
  meta: cahierMeta,
  context: cdcContext,
  problem: cdcProblem,
  objectives: cdcObjectives,
  stakeholders: cdcStakeholders,
  personas: cdcPersonas,
  scopeIn: cdcScopeIn,
  scopeOut: cdcScopeOut,
  constraints: cdcConstraints,
  businessRules: cdcBusinessRules,
  tarifs: cdcTarifs,
  functionalReqs: cdcFunctionalReqs,
  nonFunctionalReqs: cdcNonFunctionalReqs,
  openQuestions: cdcOpenQuestions,
  validations: cdcValidations,
}

export type CdcSources = typeof cdcSources
