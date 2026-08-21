/**
 * booking.service.ts
 *
 * Enregistrement d'une réservation publique après encaissement de l'acompte
 * obligatoire : qualification des billets par tranche d'âge, débit bancaire,
 * persistance à l'état « payée partiellement » et décompte de la jauge.
 * Référence : SPEC-RESERVATION-03 (AC-4, AC-5, AC-8, AC-11, R-06, R-07, R-08),
 * CASE-RES-400 à 403, 405, 406, 414, 416, 419.
 */

import {
  MENTION_REGLEMENT_SOLDE_SUR_PLACE,
  MESSAGE_ECHEC_PAIEMENT_ACOMPTE,
  PREFIXE_REFERENCE_RESERVATION,
} from '../../config/business.constants';
import { AGE_MINIMAL_ADULTE, AGE_MINIMAL_EMBARQUEMENT } from '../../config/pricing.constants';
import { calculerRecapitulatifTarifaire } from '../../utils/pricing-rules';
import type { RecapitulatifTarifaire } from '../../utils/pricing-rules';
import { calculerJaugeStandard, estMemeJour } from '../../utils/slot-rules';
import type {
  CommandeReservation,
  PortsReservation,
  Reservation,
  ResultatDebit,
  ResultatEnregistrementReservation,
  TypeBillet,
} from '../../schemas/types/booking.types';

let compteurReferences = 0;

/** Référence fonctionnelle unique attribuée à chaque dossier enregistré. */
function genererReferenceReservation(): string {
  compteurReferences += 1;
  return `${PREFIXE_REFERENCE_RESERVATION}${Date.now().toString(36).toUpperCase()}-${compteurReferences}`;
}

/**
 * Qualifie un participant par sa tranche d'âge : adulte à partir de 12 ans,
 * enfant de 4 à 11 ans inclus, accès refusé en dessous de 4 ans (R-06).
 */
export function determinerTypeBillet(age: number): TypeBillet {
  if (age < AGE_MINIMAL_EMBARQUEMENT) {
    throw new RangeError(
      `Participant de moins de ${AGE_MINIMAL_EMBARQUEMENT} ans : accès interdit à bord (R-06).`,
    );
  }
  return age >= AGE_MINIMAL_ADULTE ? 'ADULTE' : 'ENFANT';
}

/**
 * Places retirées de la jauge : une par billet individuel, la totalité de la
 * capacité du créneau lorsque le navire est privatisé (AC-5).
 */
function calculerPlacesBloquees(commande: CommandeReservation): number {
  const estPrivatisation = commande.billets.some(
    (billet) => billet.typeBillet === 'PRIVATISATION',
  );
  return estPrivatisation
    ? calculerJaugeStandard(commande.creneau.port)
    : commande.billets.length;
}

/** Assemble le dossier confirmé à partir du panier et du débit accepté. */
function composerReservation(
  commande: CommandeReservation,
  recapitulatif: RecapitulatifTarifaire,
  debit: ResultatDebit,
  reference: string,
): Reservation {
  const dateCreation = commande.dateCreation ?? new Date();
  const reservation: Reservation = {
    reference,
    statut: 'PAYEE_PARTIELLEMENT',
    dateCreation,
    creneau: commande.creneau,
    billets: commande.billets,
    client: commande.client,
    montantTotal: recapitulatif.montantTotal,
    montantAcompte: recapitulatif.montantAcompte,
    soldeRestantDu: recapitulatif.soldeRestantDu,
    referenceTransactionAcompte: debit.referenceTransaction,
  };
  if (estMemeJour(dateCreation, commande.creneau.date)) {
    reservation.mentionReglementSolde = MENTION_REGLEMENT_SOLDE_SUR_PLACE;
  }
  return reservation;
}

/**
 * Encaisse l'acompte obligatoire puis enregistre la réservation : en cas de
 * refus bancaire, aucun dossier n'est persisté et la jauge reste intacte ;
 * sinon le dossier passe « payée partiellement » et les places sont retirées.
 */
export function enregistrerReservationApresPaiementAcompte(
  commande: CommandeReservation,
  ports: PortsReservation,
): ResultatEnregistrementReservation {
  const recapitulatif = calculerRecapitulatifTarifaire(commande.billets, commande.creneau);
  const reference = genererReferenceReservation();
  const debit = ports.passerellePaiement.debiter({
    montant: recapitulatif.montantAcompte,
    referenceReservation: reference,
  });

  if (!debit.accepte) {
    return {
      reservation: null,
      messageErreur: MESSAGE_ECHEC_PAIEMENT_ACOMPTE,
      renouvellementPossible: true,
    };
  }

  const reservation = composerReservation(commande, recapitulatif, debit, reference);
  ports.depot.enregistrer(reservation, calculerPlacesBloquees(commande));
  return { reservation, messageErreur: null, renouvellementPossible: false };
}
