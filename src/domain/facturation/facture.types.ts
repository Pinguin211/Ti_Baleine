export type PortEmbarquement = 'Saint-Gilles' | 'Saint-Leu';

export interface ReservationFacturable {
  id: string;
  prestation: string;
  dateDepart: Date;
  portEmbarquement: PortEmbarquement;
  nombreAdultes: number;
  nombreEnfants?: number;
  tarifUnitaireAdulte: number;
  tarifUnitaireEnfant?: number;
  majorationGeographiqueParPersonne?: number;
  emailClient: string;
}

export interface PaiementValide {
  montantRegle: number;
  statut: 'validé avec succès' | 'échoué' | 'en attente' | 'annulé';
}

export interface FacturePdf {
  identifiantUnique: string;
  mentionAcquittement: string;
  dateDepartFormatee: string;
  portEmbarquement: string;
  ligneSupplement: string;
  format: 'pdf';
  contenu: Uint8Array;
}
