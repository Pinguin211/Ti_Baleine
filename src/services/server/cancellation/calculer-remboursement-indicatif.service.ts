/**
 * Calcul indicatif de remboursement affiché à l'administrateur avant annulation.
 * SPEC-ADMIN-02 | CASE-ADMIN-010, CASE-ADMIN-012
 *
 * Réservé à l'écran administrateur, jamais communiqué au client (R-29). Le
 * régime dérogatoire alerte météo (R-27, R-28) rembourse 100 % des sommes
 * perçues. Le régime standard (hors alerte) reste plafonné aux sommes
 * perçues (R-29) ; le barème de pénalité appliqué au montant total n'est pas
 * fourni par ce cas et reste hors périmètre (voir CASE-ADMIN-079).
 */

interface ReservationAnnulation {
  montantAcompte: number;
}

interface ParametresPrevisualisationAnnulation {
  reservation: ReservationAnnulation;
  regimeDerogatoireAlerte: boolean;
}

interface CalculRemboursementIndicatif {
  sommePayee: number;
  remboursementIndicatif: number;
  regime: 'DEROGATOIRE_ALERTE' | 'STANDARD';
}

/**
 * Prévisualise le calcul indicatif de remboursement d'une annulation,
 * plafonné aux sommes perçues dans les deux régimes (SPEC-ADMIN-02,
 * CASE-ADMIN-010, CASE-ADMIN-012).
 */
export function calculerRemboursementIndicatif(
  parametres: ParametresPrevisualisationAnnulation,
): CalculRemboursementIndicatif {
  const sommePayee = parametres.reservation.montantAcompte;

  if (parametres.regimeDerogatoireAlerte) {
    return {
      sommePayee,
      remboursementIndicatif: sommePayee,
      regime: 'DEROGATOIRE_ALERTE',
    };
  }

  return { sommePayee, remboursementIndicatif: sommePayee, regime: 'STANDARD' };
}
