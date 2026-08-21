'use server';

/**
 * Mutation de réduction sélective de passagers avec contrôle strict anti-ajout.
 * SPEC-ADMIN-03 | CASE-ADMIN-027, CASE-ADMIN-028, CASE-ADMIN-029
 *
 * Rejette toute tentative d'ajout de billet (R-18), de modification de la
 * date ou du port du créneau, ou de réduction sur une réservation déjà à 0
 * billet actif — avant toute persistance — puis délègue au domaine.
 */

import { reduireBilletsReservation } from '../services/server/cancellation/reduire-billets-reservation.service';

interface CreneauReference {
  date: Date;
  heureDepart: string;
  port: 'SAINT_GILLES' | 'SAINT_LEU';
}

interface Billet {
  typeBillet: 'ADULTE' | 'ENFANT' | 'PRIVATISATION';
}

interface ReservationPourReduction {
  reference: string;
  creneau: CreneauReference;
  billets: Billet[];
}

interface RequeteReduction {
  reservationReference: string;
  operation: 'RETRAIT' | 'AJOUT';
  adultesARetirer?: number;
  enfantsARetirer?: number;
  dateDepartSouhaitee?: string;
  portSouhaite?: 'SAINT_GILLES' | 'SAINT_LEU';
}

interface DepotBillets {
  supprimerBillets(reference: string, billetsASupprimer: Billet[]): void;
}

interface DepotCreneauReduction {
  libererPlaces(creneau: CreneauReference, nombrePlaces: number): void;
}

interface PortsActionReduction {
  depotBillets: DepotBillets;
  depotCreneau?: DepotCreneauReduction;
}

interface ResultatActionReduction {
  succes: boolean;
  code?: number;
  message?: string;
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

/**
 * Applique une réduction de passagers après contrôle strict anti-ajout, de
 * verrouillage du créneau et de garde 0-billet (SPEC-ADMIN-03, R-18).
 */
export function reduireBilletsReservationAction(
  parametres: { reservation: ReservationPourReduction; requete: RequeteReduction },
  ports: PortsActionReduction,
): ResultatActionReduction {
  const { reservation, requete } = parametres;

  if (requete.operation === 'AJOUT') {
    return {
      succes: false,
      code: 400,
      message: "Tout passager supplémentaire doit faire l'objet d'une nouvelle réservation.",
    };
  }
  if (!creneauInchange(reservation.creneau, requete)) {
    return { succes: false, code: 400, message: 'Modification du créneau non autorisée.' };
  }
  if (reservation.billets.length === 0) {
    return { succes: false, code: 400, message: 'Réservation déjà à 0 billet actif.' };
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
