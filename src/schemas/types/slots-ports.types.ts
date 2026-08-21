/**
 * Interfaces des ports pour la gestion des créneaux et le contrôle d'accès.
 * SPEC-ADMIN-07 | CASE-ADMIN-062 à CASE-ADMIN-068
 */

export interface CreneauSlotPort {
  id: string;
  date: string | Date;
  heureDepart: string;
  port: 'SAINT_GILLES' | 'SAINT_LEU' | string;
  activite?: 'BALEINES' | 'DAUPHINS' | string | null;
  navires?: string[];
  estOuvert: boolean;
  capaciteMaximale?: number;
}

export interface DepotCreneaux {
  obtenirParId(id: string): CreneauSlotPort | undefined;
  enregistrer(creneau: CreneauSlotPort): void;
  listerCreneauxReservablesPublic(): CreneauSlotPort[];
}

export interface ContexteAcces {
  role: 'ADMIN' | 'PUBLIC' | string;
  estAuthentifie: boolean;
}
