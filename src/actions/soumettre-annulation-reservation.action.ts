'use server';

/**
 * Frontière Server Action pour l'annulation complète d'une réservation
 * (SPEC-ADMIN-02). Compose l'infrastructure réelle et délègue la décision à
 * `annulerReservationService` (contrat testé CASE-ADMIN-010 à 022, 079).
 *
 * Les ports `depotReservation`/`depotCreneau` ne réalisent pas l'écriture
 * réelle en base au moment où la fonction pure les appelle (son mécanisme
 * de garde interne — réservation déjà à 0 billet, départ déjà passé — doit
 * s'exécuter avant toute suppression). Ils renvoient le compte déjà connu
 * (billets chargés au préalable) ; la suppression effective n'a lieu
 * qu'après un retour sans exception de la fonction pure, preuve que la
 * garde a été franchie.
 */

import {
  chargerReservationParReference,
  supprimerBilletsParId,
  marquerReservationAnnulee,
} from '../services/server/cancellation/reservation-repository.service';
import { annulerReservationService } from '../services/server/cancellation/annuler-reservation.service';
import { envoyerSms } from '../services/server/notifications/envoyer-sms.service';

export interface ResultatSoumissionAnnulation {
  succes: boolean;
  message?: string;
  billetsSupprimes?: number;
  avertissementAdmin?: string;
}

export async function soumettreAnnulationReservation(
  reference: string,
  motif: string
): Promise<ResultatSoumissionAnnulation> {
  const reservation = await chargerReservationParReference(reference);
  if (!reservation) {
    return { succes: false, message: 'Réservation introuvable' };
  }

  const billetIds = reservation.billets.map((b) => b.id);

  try {
    const resultat = await annulerReservationService(
      {
        reservation: {
          reference: reservation.reference,
          billetsActifs: reservation.billets.map((b) => ({ id: b.id })),
          telephoneMobileClient: reservation.telephone,
        },
        creneau: { reference: reservation.creneauId, dateDepart: reservation.dateDepart },
        motif,
      },
      {
        depotReservation: { supprimerTousLesBillets: () => billetIds.length },
        depotCreneau: { libererPlaces: () => {} },
        passerelleSms: { envoyer: (message) => envoyerSms(message) },
        horloge: { maintenant: () => new Date() },
      }
    );

    await Promise.all([supprimerBilletsParId(billetIds), marquerReservationAnnulee(reservation.id)]);

    return { succes: true, billetsSupprimes: resultat.billetsSupprimes, avertissementAdmin: resultat.avertissementAdmin };
  } catch (erreur) {
    return { succes: false, message: erreur instanceof Error ? erreur.message : 'Échec de l’annulation' };
  }
}
