/**
 * Calcul indicatif de remboursement affiché à l'administrateur avant annulation.
 * SPEC-ADMIN-02 | CASE-ADMIN-010, CASE-ADMIN-012, CASE-ADMIN-079
 *
 * Réservé à l'écran administrateur, jamais communiqué au client (R-29). Le
 * régime dérogatoire alerte météo (R-27, R-28) rembourse 100 % des sommes
 * perçues. Le régime standard (hors alerte) reste plafonné aux sommes
 * perçues (R-29) ; le barème de pénalité appliqué au montant total (CASE-ADMIN-079)
 * permet de déduire la pénalité contractuelle sans jamais réclamer de complément si
 * l'acompte est insuffisant.
 */

interface ReservationAnnulation {
  montantTotal?: number;
  montantAcompte: number;
}

interface BaremePenalite {
  pourcentagePenalite: number;
}

interface ParametresPrevisualisationAnnulation {
  reservation: ReservationAnnulation;
  regimeDerogatoireAlerte?: boolean;
  bareme?: BaremePenalite;
}

interface CalculRemboursementIndicatif {
  sommePayee: number;
  penaliteBareme?: number;
  remboursementIndicatif: number;
  regime: 'DEROGATOIRE_ALERTE' | 'STANDARD';
}

/**
 * Prévisualise le calcul indicatif de remboursement d'une annulation,
 * plafonné aux sommes perçues dans les deux régimes (SPEC-ADMIN-02,
 * CASE-ADMIN-010, CASE-ADMIN-012, CASE-ADMIN-079).
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

  if (parametres.bareme) {
    const montantBase = parametres.reservation.montantTotal ?? sommePayee;
    const penaliteBareme = (montantBase * parametres.bareme.pourcentagePenalite) / 100;
    const remboursementIndicatif = Math.max(0, sommePayee - penaliteBareme);
    return {
      sommePayee,
      penaliteBareme,
      remboursementIndicatif,
      regime: 'STANDARD',
    };
  }

  return { sommePayee, remboursementIndicatif: sommePayee, regime: 'STANDARD' };
}
