import type { PreviewAnnulation } from '../../../actions/previsualiser-annulation.action';

export interface RefundIndicatorCalloutProps {
  calcul: PreviewAnnulation;
}

export function RefundIndicatorCallout({ calcul }: RefundIndicatorCalloutProps) {
  return (
    <div className="rounded-lg border border-marine-100 bg-marine-50 p-3 text-sm text-marine-800">
      <p>Somme perçue : {calcul.sommePayee.toFixed(2)} €</p>
      {calcul.penaliteBareme !== undefined && <p>Pénalité barème : {calcul.penaliteBareme.toFixed(2)} €</p>}
      <p className="font-semibold text-marine-900">Remboursement indicatif : {calcul.remboursementIndicatif.toFixed(2)} €</p>
      <p className="text-xs text-marine-500">
        Régime {calcul.regime === 'DEROGATOIRE_ALERTE' ? 'dérogatoire (pré-alerte météo)' : 'standard'} — usage
        interne, jamais communiqué au client. Remboursement effectif manuel, hors système.
      </p>
    </div>
  );
}
