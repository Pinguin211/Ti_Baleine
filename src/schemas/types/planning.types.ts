/**
 * Types pour le planning et les statuts financiers des réservations.
 * SPEC-ADMIN-01 | CASE-ADMIN-077, CASE-ADMIN-078
 */

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
