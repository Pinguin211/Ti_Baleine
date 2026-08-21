/**
 * Interfaces des ports d'infrastructure de facturation : expédition
 * courriel, persistance du statut d'émission, horloge (SPEC-FAC-02).
 */

export type TypeFacture = 'acompte' | 'solde';

export type CourrielFacturation = {
  destinataire: string;
  pieceJointe: {
    nomFichier: string;
    contenu: Uint8Array;
    typeMime: 'application/pdf';
  };
  recapitulatifReservation: string;
};

export interface EnvoiCourriel {
  envoyer(message: CourrielFacturation): void;
}

export type StatutEmissionFacture = {
  reservationId: string;
  typeFacture: TypeFacture;
  statut: 'envoyée avec succès';
  horodatage: Date;
};

export interface DepotEmissionFacture {
  enregistrerStatutEmission(entree: StatutEmissionFacture): void;
}

export interface Horloge {
  maintenant(): Date;
}

export type PortsFacturation = {
  envoiCourriel: EnvoiCourriel;
  depotEmission: DepotEmissionFacture;
  horloge: Horloge;
};
