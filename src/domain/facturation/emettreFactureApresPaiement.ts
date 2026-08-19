import type { ReservationFacturable, PaiementValide, FacturePdf } from './facture.types';
import type { EnvoiCourriel, DepotEmissionFacture, Horloge } from './ports';
import { genererFacturePdf } from './genererFacturePdf';

export interface EmissionFactureCommande {
  reservation: ReservationFacturable;
  paiement: PaiementValide;
}

export interface EmissionFactureDependances {
  envoiCourriel: EnvoiCourriel;
  depotEmission: DepotEmissionFacture;
  horloge: Horloge;
}

export function emettreFactureApresPaiement(
  commande: EmissionFactureCommande,
  dependances: EmissionFactureDependances
): FacturePdf {
  const facture = genererFacturePdf(commande.reservation, commande.paiement);

  dependances.envoiCourriel.envoyer({
    destinataire: '',
    pieceJointe: {
      nomFichier: '',
      contenu: facture.contenu,
      typeMime: 'application/pdf',
    },
    recapitulatifReservation: '',
  });

  dependances.depotEmission.enregistrerStatutEmission({
    reservationId: '',
    statut: '',
    horodatage: dependances.horloge.maintenant(),
  });

  return facture;
}
