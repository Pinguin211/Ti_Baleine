/**
 * Types d'affichage du registre des réservations back-office.
 * SPEC-ADMIN-02, SPEC-ADMIN-03 — vue admin, distincte du domaine public
 * (`booking.types.ts`).
 */

export interface ReservationRegistreLigne {
  reference: string;
  statut: 'EN_ATTENTE_PAIEMENT' | 'PAYEE_PARTIELLEMENT' | 'PAYEE_COMPLETEMENT' | 'ANNULEE';
  dateCreation: Date;
  clientNom: string;
  clientPrenom: string;
  clientEmail: string;
  clientTelephone: string;
  port: string;
  activite: string;
  dateDepart: Date;
  heureDepart: string;
  adultesActifs: number;
  enfantsActifs: number;
  montantTotal: number;
  montantAcompteVerse: number;
  soldeRestantDu: number;
}
