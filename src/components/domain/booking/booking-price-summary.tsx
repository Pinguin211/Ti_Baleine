import type { RecapitulatifTarifaire } from '../../../utils/pricing-rules';

export interface BookingPriceSummaryProps {
  recapitulatif: RecapitulatifTarifaire;
  adultes: number;
  enfants: number;
}

export function BookingPriceSummary({ recapitulatif, adultes, enfants }: BookingPriceSummaryProps) {
  return (
    <div className="rounded-lg border border-lagoon-100 bg-lagoon-50/40 p-4 text-sm text-marine-800">
      {adultes > 0 && (
        <p>
          {adultes} adulte(s) × {recapitulatif.tarifUnitaireAdulte.toFixed(2)} €
        </p>
      )}
      {enfants > 0 && (
        <p>
          {enfants} enfant(s) × {recapitulatif.tarifUnitaireEnfant.toFixed(2)} €
        </p>
      )}
      <p className="mt-2 font-semibold text-marine-900">Total : {recapitulatif.montantTotal.toFixed(2)} €</p>
      <p>Acompte à régler maintenant : {recapitulatif.montantAcompte.toFixed(2)} €</p>
      <p className="text-marine-500">Solde restant (réglé plus tard) : {recapitulatif.soldeRestantDu.toFixed(2)} €</p>
    </div>
  );
}
