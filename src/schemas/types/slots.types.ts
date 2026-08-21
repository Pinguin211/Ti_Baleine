/**
 * Types et entités du domaine de gestion des créneaux.
 * SPEC-ADMIN-07 | CASE-ADMIN-062 à CASE-ADMIN-068
 */

export type ActiviteCreneau = 'BALEINES' | 'DAUPHINS';
export type NomNavire = 'TIKAP' | 'GRAND_BLEU';

export interface Creneau {
  id: string;
  date: string | Date;
  heureDepart: string;
  port: 'SAINT_GILLES' | 'SAINT_LEU' | string;
  activite?: ActiviteCreneau | string | null;
  navires?: (NomNavire | string)[];
  estOuvert: boolean;
  capaciteMaximale?: number;
}
