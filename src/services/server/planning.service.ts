/**
 * Domaine — Planning (SPEC-ADMIN-01).
 * Signatures créées pour CASE-ADMIN-001 : non implémentées (corps vide).
 */

export type Port = 'Saint-Gilles' | 'Saint-Leu';

export interface PlanningSlot {
  port: Port;
  heure: string;
  etatOperationnel: string;
}

/**
 * Retourne la grille consolidée des créneaux (tous ports confondus) pour la
 * date donnée. Règle R-01 — non implémentée.
 */
export function getConsolidatedPlanningGrid(date: Date): PlanningSlot[] {
  return [];
}
