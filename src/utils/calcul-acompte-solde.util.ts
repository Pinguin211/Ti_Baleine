/**
 * Calcule le solde restant dû après règlement de l'acompte (SPEC-FAC-02,
 * AC-1).
 */
export function calculerSoldeRestantDu(montantTotalTtc: number, acompteRegle: number): number {
  return montantTotalTtc - acompteRegle;
}

/**
 * Calcule le montant total acquitté après règlement du solde, à partir de
 * l'acompte initial et du solde réglé (SPEC-FAC-02, AC-2).
 */
export function calculerMontantTotalAcquitte(acompteRegle: number, soldeRegle: number): number {
  return acompteRegle + soldeRegle;
}
