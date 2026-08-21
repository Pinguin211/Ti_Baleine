'use server';

/**
 * Frontière Server Action pour la soumission d'une réservation publique
 * (SPEC-RESERVATION-03). Compose l'infrastructure réelle autour de
 * `enregistrerReservationApresPaiementAcompte` (fonction pure et
 * synchrone, contrat testé) : la jauge déjà consommée est chargée au
 * préalable (le port `depot.compterPlacesReservees` doit rester
 * synchrone), et l'écriture réelle (créneau, utilisateur invité,
 * réservation, billets, paiement) n'a lieu qu'après un retour positif.
 */

import { enregistrerReservationApresPaiementAcompte } from '../services/server/booking.service';
import {
  compterPlacesReserveesPourCreneau,
  enregistrerReservationReelle,
} from '../services/server/booking-repository.service';
import { creerPasserellePaiementAcompteReelle } from '../services/server/payment/passerelle-paiement-acompte.service';
import type { CommandeReservation, ResultatEnregistrementReservation } from '../schemas/types/booking.types';

export async function soumettreReservation(
  commande: CommandeReservation
): Promise<ResultatEnregistrementReservation> {
  const placesDejaReservees = await compterPlacesReserveesPourCreneau(
    commande.creneau.port,
    commande.creneau.date,
    commande.creneau.heureDepart
  );

  const resultat = enregistrerReservationApresPaiementAcompte(commande, {
    depot: {
      compterPlacesReservees: () => placesDejaReservees,
      enregistrer: () => {},
    },
    passerellePaiement: creerPasserellePaiementAcompteReelle(),
  });

  if (resultat.reservation) {
    const referenceTransaction = resultat.reservation.referenceTransactionAcompte ?? resultat.reservation.reference;
    await enregistrerReservationReelle(resultat.reservation, referenceTransaction);
  }

  return resultat;
}
