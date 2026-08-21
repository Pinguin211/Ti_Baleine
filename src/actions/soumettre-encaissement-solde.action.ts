'use server';

/**
 * Frontière Server Action pour l'encaissement du solde CB sur place
 * (SPEC-ADMIN-08). Compose l'infrastructure réelle autour de
 * `encaisserSoldeCbSurPlace` (contrat testé CASE-ADMIN-074, 075, 080).
 *
 * `DepotReservationSolde` exige des méthodes synchrones : la réservation est
 * chargée au préalable, et le résultat « mis à jour » renvoyé par
 * `enregistrerEncaissementSolde` est calculé à partir de cet état déjà
 * connu (sans écrire en base). L'écriture réelle (paiement + statut) n'a
 * lieu qu'après un retour `succes: true` de la fonction pure.
 */

import { encaisserSoldeCbSurPlace, type ReservationSoldeDu } from './encaisser-solde-cb-sur-place';
import {
  chargerReservationPourSolde,
  enregistrerPaiementSolde,
} from '../services/server/payment/solde-sur-place-repository.service';
import { creerPasserelleCbSurPlaceReelle } from '../services/server/payment/passerelle-cb-sur-place.service';

export async function soumettreEncaissementSolde(
  referenceReservation: string,
  montant: number
): Promise<{ succes: boolean; message?: string; reservation?: ReservationSoldeDu }> {
  const reservation = await chargerReservationPourSolde(referenceReservation);
  if (!reservation) {
    return { succes: false, message: 'Réservation introuvable' };
  }

  let referenceTransaction = '';
  const passerelleReelle = creerPasserelleCbSurPlaceReelle();

  try {
    const resultat = await encaisserSoldeCbSurPlace(
      { referenceReservation, montant },
      {
        depotReservation: {
          chargerReservation: () => reservation,
          enregistrerEncaissementSolde: (_ref, montantEncaisse) => ({
            ...reservation,
            statut: 'PAYEE_COMPLETEMENT',
            montantAcompteRegle: reservation.montantAcompteRegle + montantEncaisse,
            soldeRestantDu: Math.max(0, reservation.soldeRestantDu - montantEncaisse),
          }),
        },
        passerelleCb: {
          validerEncaissement: async (montantDemande) => {
            const validation = await passerelleReelle.validerEncaissement(montantDemande);
            referenceTransaction = validation.referenceTransaction;
            return validation;
          },
        },
        horloge: { maintenant: () => new Date() },
      }
    );

    await enregistrerPaiementSolde(reservation.id, montant, referenceTransaction, 'SUR_PLACE_CB');

    return { succes: true, reservation: resultat.reservation };
  } catch (erreur) {
    return { succes: false, message: erreur instanceof Error ? erreur.message : 'Échec de l’encaissement' };
  }
}
