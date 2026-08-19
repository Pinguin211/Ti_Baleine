import type {
  ReservationFacturable,
  PaiementValide,
  FacturePdf,
} from '../schemas/types/facturation.types';
import type {
  EnvoiCourriel,
  DepotEmissionFacture,
  Horloge,
} from '../schemas/types/facturation-ports.types';
import { genererFacturePdf } from '../services/server/generer-facture-pdf';

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
