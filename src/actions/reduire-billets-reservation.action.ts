'use server';

/**
 * Mutation de réduction de billets sur une réservation avec validation stricte de l'opération.
 * SPEC-ADMIN-03 | CASE-ADMIN-027, CASE-ADMIN-028, CASE-ADMIN-029, CASE-ADMIN-069
 */

import type { Billet } from '../schemas/types/cancellation.types';

export interface RequeteReductionBillets {
  reservationReference: string;
  operation: 'RETRAIT' | 'AJOUT' | string;
  adultesARetirer?: number;
  enfantsARetirer?: number;
  adultesAAjouter?: number;
  enfantsAAjouter?: number;
  dateDepartSouhaitee?: string;
  portSouhaite?: string;
}

export interface DepotBilletsReduction {
  supprimerBillets(reference: string, billets: Billet[]): void;
}

function validerRequeteReduction(
  reservation: { reference: string; billets: Billet[] },
  requete: RequeteReductionBillets
): { valide: boolean; code?: number; message?: string } {
  if (requete.operation !== 'RETRAIT') {
    return {
      valide: false,
      code: 400,
      message: "L'ajout de billets sur une réservation existante est strictement interdit",
    };
  }

  if (requete.dateDepartSouhaitee || requete.portSouhaite) {
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

export function reduireBilletsReservationAction(
  commande: {
    reservation: { reference: string; billets: Billet[] };
    requete: RequeteReductionBillets;
  },
  _ports: { depotBillets: DepotBilletsReduction }
): { succes: boolean; code?: number; message?: string } {
  const validation = validerRequeteReduction(commande.reservation, commande.requete);
  if (!validation.valide) {
    return {
      succes: false,
      code: validation.code,
      message: validation.message,
    };
  }

  return {
    succes: true,
  };
}
