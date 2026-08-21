/**
 * Mutation de réduction sélective de passagers avec contrôle strict anti-ajout et validation des quantités.
 * SPEC-ADMIN-03 | CASE-ADMIN-027, CASE-ADMIN-028, CASE-ADMIN-029, CASE-ADMIN-069
 *
 * Pas de directive `'use server'` ici : `reduireBilletsReservationAction`
 * est une fonction pure et synchrone (contrat testé). La frontière Server
 * Action réelle vit dans `soumettre-reduction-billets.action.ts`.
 *
 * Rejette toute tentative d'ajout de billet (R-18), de modification de la
 * date ou du port du créneau, ou de réduction sur une réservation déjà à 0
 * billet actif, ou excédentaire par rapport aux billets actifs — avant toute persistance —
 * puis délègue au service du domaine.
 */

import { reduireBilletsReservation, type PortsReduction } from '../services/server/cancellation/reduire-billets-reservation.service';

interface CreneauReference {
  date: Date;
  heureDepart: string;
  port: string;
}

interface Billet {
  typeBillet: 'ADULTE' | 'ENFANT' | 'PRIVATISATION';
}

interface ReservationPourReduction {
  reference: string;
  statut?: string;
  creneau: CreneauReference;
  billets: Billet[];
  montantTotal?: number;
  montantAcompteVerse?: number;
}

export interface RequeteReduction {
  reservationReference: string;
  operation: 'RETRAIT' | 'AJOUT' | string;
  adultesARetirer?: number;
  enfantsARetirer?: number;
  adultesAAjouter?: number;
  enfantsAAjouter?: number;
  dateDepartSouhaitee?: string;
  portSouhaite?: string;
}

export interface ResultatActionReduction {
  succes: boolean;
  code?: number;
  message?: string;
  billetsRetires?: number;
  billetsSupprimes?: number;
  type?: string;
  calculRemboursementIndicatif?: unknown;
  motifRequis?: boolean;
}

function estMemeDate(date: Date, dateSouhaitee: string): boolean {
  const [annee, mois, jour] = dateSouhaitee.split('-').map(Number);
  return (
    date.getFullYear() === annee && date.getMonth() + 1 === mois && date.getDate() === jour
  );
}

function creneauInchange(creneau: CreneauReference, requete: RequeteReduction): boolean {
  const dateInchangee =
    !requete.dateDepartSouhaitee || estMemeDate(creneau.date, requete.dateDepartSouhaitee);
  const portInchange = !requete.portSouhaite || requete.portSouhaite === creneau.port;
  return dateInchangee && portInchange;
}

function validerRequeteReduction(
  reservation: ReservationPourReduction,
  requete: RequeteReduction,
): { valide: true } | { valide: false; code: number; message: string } {
  if (requete.operation === 'AJOUT' || (requete.adultesAAjouter ?? 0) > 0 || (requete.enfantsAAjouter ?? 0) > 0) {
    return {
      valide: false,
      code: 400,
      message: "Tout passager supplémentaire doit faire l'objet d'une nouvelle réservation.",
    };
  }

  if (!creneauInchange(reservation.creneau, requete)) {
    return {
      valide: false,
      code: 400,
      message: 'La modification de la date ou du port est interdite lors d’une réduction',
    };
  }

  if (reservation.billets.length === 0) {
    return {
      valide: false,
      code: 400,
      message: 'La réservation ne comporte aucun billet actif à réduire',
    };
  }

  const adultesActifs = reservation.billets.filter((b) => b.typeBillet === 'ADULTE').length;
  const enfantsActifs = reservation.billets.filter((b) => b.typeBillet === 'ENFANT').length;
  if ((requete.adultesARetirer ?? 0) > adultesActifs || (requete.enfantsARetirer ?? 0) > enfantsActifs) {
    return {
      valide: false,
      code: 422,
      message: 'Quantité de billets à retirer supérieure au solde actif',
    };
  }

  return { valide: true };
}

/**
 * Applique une réduction de passagers après contrôles stricts anti-ajout, de
 * verrouillage du créneau, de garde 0-billet et de vérification des quantités (SPEC-ADMIN-03, R-18).
 */
export function reduireBilletsReservationAction(
  parametres: { reservation: ReservationPourReduction; requete: RequeteReduction },
  ports: PortsReduction,
): ResultatActionReduction {
  const { reservation, requete } = parametres;
  const validation = validerRequeteReduction(reservation, requete);
  if (!validation.valide) {
    return {
      succes: false,
      code: validation.code,
      message: validation.message,
    };
  }

  const resultat = reduireBilletsReservation(
    {
      reservation,
      adultesARetirer: requete.adultesARetirer ?? 0,
      enfantsARetirer: requete.enfantsARetirer ?? 0,
    },
    ports,
  );

  return { ...resultat };
}
