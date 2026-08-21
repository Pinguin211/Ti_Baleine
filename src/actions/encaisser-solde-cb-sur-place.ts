'use server';

/**
 * Mutation d'encaissement du solde par carte bancaire sur place à l'embarcadère.
 * SPEC-ADMIN-08 | CASE-ADMIN-074, CASE-ADMIN-075, CASE-ADMIN-080
 */

export interface ReservationSoldeDu {
  reference: string;
  statut: 'PAYEE_PARTIELLEMENT' | 'PAYEE_COMPLETEMENT' | string;
  montantTotal?: number;
  montantAcompteRegle?: number;
  soldeRestantDu: number;
  emailClient: string;
}

export interface DepotReservationSolde {
  chargerReservation(reference: string): ReservationSoldeDu;
  enregistrerEncaissementSolde(reference: string, montant: number): ReservationSoldeDu;
}

export interface PasserelleCbSurPlace {
  validerEncaissement(montant: number): Promise<{ referenceTransaction: string }>;
}

export interface Horloge {
  maintenant(): Date;
}

export async function encaisserSoldeCbSurPlace(
  commande: { referenceReservation: string; montant: number },
  ports: {
    depotReservation: DepotReservationSolde;
    passerelleCb: PasserelleCbSurPlace;
    horloge: Horloge;
  }
): Promise<{ succes: boolean; reservation: ReservationSoldeDu }> {
  const reservation = ports.depotReservation.chargerReservation(commande.referenceReservation);
  if (!reservation) {
    throw new Error(`Réservation introuvable : ${commande.referenceReservation}`);
  }

  if (reservation.statut === 'PAYEE_COMPLETEMENT' || reservation.soldeRestantDu <= 0) {
    throw new Error('La réservation est déjà entièrement réglée');
  }

  await ports.passerelleCb.validerEncaissement(commande.montant);

  const reservationMiseAJour = ports.depotReservation.enregistrerEncaissementSolde(
    commande.referenceReservation,
    commande.montant
  );

  const { emettreFactureApresPaiement } = await import('./emettre-facture-apres-paiement');
  await emettreFactureApresPaiement({
    reservation: reservationMiseAJour,
    typeFacture: 'SOLDE',
  });

  return {
    succes: true,
    reservation: reservationMiseAJour,
  };
}
