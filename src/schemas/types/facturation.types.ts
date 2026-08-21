/**
 * DTO isomorphes des factures d'acompte et de solde et des données
 * de réservation/paiement associées (SPEC-FAC-02).
 */

export type PortEmbarquement = 'Saint-Gilles' | 'Saint-Leu';

export type ReservationFacturable = {
  id: string;
  prestation: string;
  dateDepart: Date;
  portEmbarquement: PortEmbarquement;
  nombreAdultes: number;
  tarifUnitaireAdulte: number;
  majorationGeographiqueParPersonne: number;
  emailClient: string;
};

export type PaiementAcompteValide = {
  montantRegle: number;
  statut: 'validé avec succès';
};

export type PaiementSoldeValide = {
  montantRegle: number;
  statut: 'validé avec succès';
};

export type FactureAcompte = {
  identifiantUnique: string;
  mentionAcompte: 'Acompte acquitté';
  montantTotalTtc: number;
  acompteRegle: number;
  soldeRestantDu: number;
  contenu: Uint8Array;
};

export type FactureSolde = {
  identifiantUnique: string;
  mentionSolde: 'Acquittée';
  rappelAcompte: number;
  montantTotalAcquitte: number;
  contenu: Uint8Array;
};
