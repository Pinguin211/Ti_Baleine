/**
 * balance-payment.service.ts
 *
 * Orchestration du règlement du solde : tâche planifiée d'envoi du SMS à J-1
 * porteur d'un lien sécurisé, contrôle de la validité technique du token
 * (1 heure), encaissement en ligne et bascule « payée complètement », maintien
 * du dossier lorsque le lien n'est pas utilisé.
 * Référence : SPEC-RESERVATION-03 (AC-9, AC-10, AC-11, R-07, R-08, REQ-021,
 * REQ-107, cas limites 10 à 12), CASE-RES-418 à 421.
 */

import { randomUUID } from 'node:crypto';
import {
  CHEMIN_PAIEMENT_SOLDE,
  DUREE_VALIDITE_TOKEN_SOLDE_MINUTES,
  MESSAGE_EXPIRATION_LIEN_SOLDE,
  PREFIXE_MESSAGE_SMS_SOLDE,
} from '../../config/business.constants';
import { arrondirMontant } from '../../utils/pricing-rules';
import { estMemeJour } from '../../utils/slot-rules';
import type {
  CanalPaiement,
  EnvoiSms,
  PasserellePaiement,
  Reservation,
  StatutReservation,
  TypePaiement,
} from '../../schemas/types/booking.types';

const MILLISECONDES_PAR_MINUTE = 60_000;

/** Token de paiement du solde et dossier suivi qu'il désigne. */
interface DossierSolde {
  token: string;
  dateCreation: Date;
  dateExpiration: Date;
  estUtilise: boolean;
  reservation: Reservation;
}

export interface EnvoiSoldeEffectue {
  token: string;
  reservation: Reservation;
}

export interface PagePaiementSolde {
  tokenValide: boolean;
  referenceReservation: string;
  soldeRestantDu: number;
  reservation: Reservation;
  formulaireBancaireAffiche: boolean;
  messageExpiration: string | null;
}

export interface PaiementSolde {
  typePaiement: TypePaiement;
  canalPaiement: CanalPaiement;
  montant: number;
  referenceTransaction: string | null;
  datePaiement: Date;
  reservation: Reservation;
}

export interface DossierAuDepart {
  statut: StatutReservation;
  placesGaranties: number;
  annuleAutomatiquement: boolean;
  penaliteAppliquee: boolean;
  soldeExigible: number;
  canalReglementAttendu: CanalPaiement;
}

const dossiersParToken = new Map<string, DossierSolde>();
const dossiersParReference = new Map<string, DossierSolde>();

/** Solde restant dû : le total de la prestation moins l'acompte déjà versé. */
function calculerSoldeRestantDu(reservation: Reservation): number {
  return arrondirMontant(reservation.montantTotal - reservation.montantAcompte);
}

/**
 * Éligibilité au SMS de solde : un acompte doit avoir été versé, et la
 * réservation ne doit pas avoir été créée le jour même de la sortie, auquel
 * cas le solde se règle obligatoirement sur place (R-08).
 */
function estEligibleAuSmsDeSolde(reservation: Reservation): boolean {
  if (reservation.statut !== 'PAYEE_PARTIELLEMENT') return false;
  return !estMemeJour(reservation.dateCreation, reservation.creneau.date);
}

/** Ouvre un dossier de solde et son token, valide une heure durant. */
function ouvrirDossierSolde(reservation: Reservation, maintenant: Date): DossierSolde {
  const dossier: DossierSolde = {
    token: randomUUID(),
    dateCreation: maintenant,
    dateExpiration: new Date(
      maintenant.getTime() + DUREE_VALIDITE_TOKEN_SOLDE_MINUTES * MILLISECONDES_PAR_MINUTE,
    ),
    estUtilise: false,
    reservation: { ...reservation },
  };
  dossiersParToken.set(dossier.token, dossier);
  dossiersParReference.set(dossier.reservation.reference, dossier);
  return dossier;
}

/** Expédie le SMS porteur de l'URL sécurisée de règlement du solde. */
function expedierSmsSolde(
  reservation: Reservation,
  maintenant: Date,
  envoiSms: EnvoiSms,
): EnvoiSoldeEffectue {
  const dossier = ouvrirDossierSolde(reservation, maintenant);
  envoiSms.envoyer({
    destinataireTelephone: reservation.client?.telephone ?? '',
    message: `${PREFIXE_MESSAGE_SMS_SOLDE}${CHEMIN_PAIEMENT_SOLDE}${dossier.token}`,
    dateEnvoi: maintenant,
  });
  return { token: dossier.token, reservation: dossier.reservation };
}

/**
 * Tâche planifiée de J-1 : génère un token et expédie le SMS de règlement du
 * solde à chaque réservation éligible, en excluant les dossiers du jour même.
 */
export function executerTacheEnvoiSmsSoldeJMoins1(
  reservations: readonly Reservation[],
  maintenant: Date,
  ports: { envoiSms: EnvoiSms },
): EnvoiSoldeEffectue[] {
  return reservations
    .filter((reservation) => estEligibleAuSmsDeSolde(reservation))
    .map((reservation) => expedierSmsSolde(reservation, maintenant, ports.envoiSms));
}

/** Vrai tant que le token n'a pas servi et que l'heure de validité court. */
function estTokenValide(dossier: DossierSolde, horloge: Date): boolean {
  return !dossier.estUtilise && horloge.getTime() <= dossier.dateExpiration.getTime();
}

/**
 * Ouvre la page sécurisée de règlement du solde : au-delà d'une heure, le
 * token est refusé, aucun formulaire bancaire n'est présenté et le dossier
 * reste en l'état pour un encaissement sur place (REQ-107).
 */
export function ouvrirPagePaiementSolde(token: string, horloge: Date): PagePaiementSolde {
  const dossier = dossiersParToken.get(token);
  if (!dossier) {
    throw new ReferenceError(`Aucun dossier de solde ne correspond au token « ${token} ».`);
  }
  const valide = estTokenValide(dossier, horloge);
  return {
    tokenValide: valide,
    referenceReservation: dossier.reservation.reference,
    soldeRestantDu: calculerSoldeRestantDu(dossier.reservation),
    reservation: dossier.reservation,
    formulaireBancaireAffiche: valide,
    messageExpiration: valide ? null : MESSAGE_EXPIRATION_LIEN_SOLDE,
  };
}

/**
 * Encaisse le solde en ligne : le token est consommé et la réservation bascule
 * à « payée complètement » dès confirmation bancaire (AC-10).
 */
export function payerSoldeEnLigne(
  token: string,
  horloge: Date,
  ports: { passerellePaiement: PasserellePaiement },
): PaiementSolde {
  const dossier = dossiersParToken.get(token);
  if (!dossier || !estTokenValide(dossier, horloge)) {
    throw new ReferenceError('Le lien de paiement du solde est expiré ou déjà utilisé.');
  }
  const montant = calculerSoldeRestantDu(dossier.reservation);
  const debit = ports.passerellePaiement.debiter({
    montant,
    referenceReservation: dossier.reservation.reference,
  });
  dossier.estUtilise = debit.accepte;
  if (debit.accepte) dossier.reservation.statut = 'PAYEE_COMPLETEMENT';

  return {
    typePaiement: 'SOLDE',
    canalPaiement: 'EN_LIGNE',
    montant,
    referenceTransaction: debit.referenceTransaction,
    datePaiement: horloge,
    reservation: dossier.reservation,
  };
}

/**
 * État du dossier le jour du départ lorsque le lien SMS n'a pas été utilisé :
 * réservation maintenue, places garanties, ni annulation ni pénalité, solde
 * exigible en carte bancaire à l'embarcadère (R-07, cas limite 11).
 */
export function evaluerDossierAuDepart(reference: string, horloge: Date): DossierAuDepart {
  const dossier = dossiersParReference.get(reference);
  if (!dossier) {
    throw new ReferenceError(`Aucun dossier de solde suivi pour la réservation « ${reference} ».`);
  }
  const reservation = dossier.reservation;
  return {
    statut: reservation.statut,
    placesGaranties: reservation.billets.length,
    annuleAutomatiquement: false,
    penaliteAppliquee: false,
    soldeExigible: calculerSoldeRestantDu(reservation),
    canalReglementAttendu: 'SUR_PLACE_CB',
  };
}
