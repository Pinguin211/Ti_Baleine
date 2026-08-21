'use server';

/**
 * Action d'annulation de réservation et prévisualisation du remboursement indicatif.
 * SPEC-ADMIN-02 | CASE-ADMIN-079
 */

export interface PrevisualisationAnnulationInput {
  reservation: {
    montantTotal: number;
    montantAcompte: number;
  };
  bareme?: { pourcentagePenalite: number };
  regimeDerogatoireAlerte?: boolean;
}

export function previsualiserAnnulation(params: PrevisualisationAnnulationInput) {
  const {
    reservation,
    bareme = { pourcentagePenalite: 50 },
    regimeDerogatoireAlerte = false,
  } = params;
  const sommePayee = reservation.montantAcompte;
  const pourcentage = regimeDerogatoireAlerte ? 0 : bareme.pourcentagePenalite;
  const penaliteBareme = (reservation.montantTotal * pourcentage) / 100;
  const remboursementIndicatif = Math.max(0, sommePayee - penaliteBareme);

  return {
    sommePayee,
    penaliteBareme,
    remboursementIndicatif,
  };
}

export async function annulerReservation(
  commande: {
    reservation: { reference: string; telephoneMobileClient?: string; montantAcompte: number };
    creneau: { reference: string; dateDepart?: Date; sousPreAlerte?: boolean };
    motif: string;
    bareme?: { pourcentagePenalite: number };
    regimeDerogatoireAlerte?: boolean;
  },
  ports: {
    depotReservation: { supprimerTousLesBillets(ref: string): number };
    depotCreneau: { libererPlaces(ref: string, nombre: number): void };
    passerelleSms: { envoyer(message: { destinataireTelephone: string; message: string }): void };
  }
) {
  const nombreBillets = ports.depotReservation.supprimerTousLesBillets(
    commande.reservation.reference
  );
  ports.depotCreneau.libererPlaces(commande.creneau.reference, nombreBillets);

  if (commande.reservation.telephoneMobileClient) {
    ports.passerelleSms.envoyer({
      destinataireTelephone: commande.reservation.telephoneMobileClient,
      message: 'Votre réservation a été annulée.',
    });
  }

  return { succes: true };
}
