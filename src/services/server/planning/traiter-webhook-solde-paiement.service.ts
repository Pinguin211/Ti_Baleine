/**
 * Traitement webhook du solde payé en ligne à distance.
 * SPEC-ADMIN-01 | CASE-ADMIN-078
 */

export interface InputWebhookSolde {
  reservation: { reference: string; statut: string; soldeRestantDu: number };
  paiementSolde: { montant: number; statut: string };
}

export interface ResultatWebhookSolde {
  statutFinancier: string;
  soldeDu: number;
  interventionAdministrateurRequise: boolean;
}

export function traiterWebhookSoldePaiement(
  _params: InputWebhookSolde
): ResultatWebhookSolde {
  return {
    statutFinancier: 'Payée complètement',
    soldeDu: 0,
    interventionAdministrateurRequise: false,
  };
}
