export interface PieceJointe {
  nomFichier: string;
  contenu: Uint8Array;
  typeMime: string;
}

export interface CourrielFacturation {
  destinataire: string;
  pieceJointe: PieceJointe;
  recapitulatifReservation: string;
}

export interface EnvoiCourriel {
  envoyer(message: CourrielFacturation): void;
}

export type StatutEmission = 'envoyée avec succès' | "échec d'émission" | '';

export interface StatutEmissionFacture {
  reservationId: string;
  statut: StatutEmission;
  horodatage: Date;
}

export interface DepotEmissionFacture {
  enregistrerStatutEmission(entree: StatutEmissionFacture): void;
}

export interface Horloge {
  maintenant(): Date;
}
