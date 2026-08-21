/**
 * Types pour le planning et les statuts financiers des réservations.
 * SPEC-ADMIN-01 | CASE-ADMIN-077, CASE-ADMIN-078
 */

export interface CreneauPlanningPersiste {
  id: string;
  date: Date;
  heureDepart: string;
  port: string;
  activite: string | null;
  navires?: string[];
  estOuvert: boolean;
  sousPreAlerte: boolean;
}

export interface CreneauDetailPersiste {
  id: string;
  date: Date;
  heureDepart: string;
  port: string;
  activite: string;
  navires: string[];
  estOuvert: boolean;
  sousPreAlerte: boolean;
}

export interface CreneauAffiche {
  id: string;
  port: string;
  heureDepart: string;
  etatOperationnel: string;
  badgePreAlerte?: string;
  styleAlerteApplique: boolean;
  navireLabel: string;
  invitationCompleterAffectation: boolean;
  activiteLabel: string;
}

export interface GrillePlanningConsolidee {
  creneaux: CreneauAffiche[];
  messageEtatVide?: string;
}

export interface JourCalendrierPlanning {
  date: Date;
  dansLeMoisAffiche: boolean;
  estAujourdhui: boolean;
  nombreCreneaux: number;
  nombreCreneauxOuverts: number;
  auMoinsUneAlerte: boolean;
}

export interface CalendrierPlanningMensuel {
  libelleMois: string;
  entetesJours: readonly string[];
  semaines: JourCalendrierPlanning[][];
}

export interface ReservationPersiste {
  reference: string;
  statut: 'PAYEE_PARTIELLEMENT' | 'PAYEE_COMPLETEMENT' | 'EN_ATTENTE_PAIEMENT' | 'ANNULEE' | string;
  soldeRestantDu: number;
}

export interface StatutFinancierAffiche {
  reference: string;
  badge: string;
  couleurBadge?: string;
  soldeDu: number;
}
