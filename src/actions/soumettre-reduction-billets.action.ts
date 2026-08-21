'use server';

/**
 * Frontière Server Action pour la réduction sélective de billets
 * (SPEC-ADMIN-03). Compose l'infrastructure réelle et délègue la décision à
 * `reduireBilletsReservationAction` (contrat testé CASE-ADMIN-027 à 029,
 * 069). Même stratégie que `soumettre-annulation-reservation.action.ts` :
 * la suppression réelle n'a lieu qu'après un retour `succes: true`, preuve
 * que les gardes internes (anti-ajout, créneau inchangé, échéance,
 * quantités) ont été franchies.
 */

import {
  chargerReservationParReference,
  chargerMontantAcompteVerse,
  supprimerBilletsParId,
} from '../services/server/cancellation/reservation-repository.service';
import {
  reduireBilletsReservationAction,
  type RequeteReduction,
  type ResultatActionReduction,
} from './reduire-billets-reservation.action';

function extraireIdsASupprimer(
  billetsDisponibles: { id: string; typeBillet: 'ADULTE' | 'ENFANT' | 'PRIVATISATION' }[],
  adultesARetirer: number,
  enfantsARetirer: number
): string[] {
  const adultes = billetsDisponibles.filter((b) => b.typeBillet === 'ADULTE').slice(0, adultesARetirer);
  const enfants = billetsDisponibles.filter((b) => b.typeBillet === 'ENFANT').slice(0, enfantsARetirer);
  return [...adultes, ...enfants].map((b) => b.id);
}

export async function soumettreReductionBillets(
  requete: RequeteReduction
): Promise<ResultatActionReduction & { reference: string }> {
  const reservation = await chargerReservationParReference(requete.reservationReference);
  if (!reservation) {
    return { succes: false, message: 'Réservation introuvable', reference: requete.reservationReference };
  }

  const montantAcompteVerse = await chargerMontantAcompteVerse(reservation.id);

  const resultat = reduireBilletsReservationAction(
    {
      reservation: {
        reference: reservation.reference,
        creneau: { date: reservation.dateDepart, heureDepart: reservation.heureDepart, port: reservation.port },
        billets: reservation.billets.map((b) => ({ typeBillet: b.typeBillet })),
        montantAcompteVerse,
      },
      requete,
    },
    {
      depotBillets: { supprimerBillets: () => {} },
      depotCreneau: { libererPlaces: () => {} },
      horloge: { maintenant: () => new Date() },
    }
  );

  if (resultat.succes && resultat.type !== 'BASCULE_ANNULATION_REQUISE') {
    const idsASupprimer = extraireIdsASupprimer(
      reservation.billets,
      requete.adultesARetirer ?? 0,
      requete.enfantsARetirer ?? 0
    );
    await supprimerBilletsParId(idsASupprimer);
  }

  return { ...resultat, reference: reservation.reference };
}
