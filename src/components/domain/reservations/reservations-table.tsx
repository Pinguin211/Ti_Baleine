'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { ReservationRegistreLigne } from '../../../schemas/types/reservations-registre.types';
import { StatusBadge } from '../../common/status-badge';
import { Button } from '../../ui/button';
import { CancelPreviewModal } from '../cancellation/cancel-preview-modal';
import { PartialReductionForm } from '../cancellation/partial-reduction-form';
import { BalanceCheckoutButton } from '../admin/balance-checkout-button';

export interface ReservationsTableProps {
  lignes: ReservationRegistreLigne[];
}

const VARIANTE_STATUT: Record<ReservationRegistreLigne['statut'], 'success' | 'warning' | 'danger' | 'info'> = {
  PAYEE_COMPLETEMENT: 'success',
  PAYEE_PARTIELLEMENT: 'warning',
  EN_ATTENTE_PAIEMENT: 'info',
  ANNULEE: 'danger',
};

export function ReservationsTable({ lignes }: ReservationsTableProps) {
  const router = useRouter();
  const [modaleAnnulation, setModaleAnnulation] = useState<string | null>(null);
  const [modaleReduction, setModaleReduction] = useState<ReservationRegistreLigne | null>(null);

  const rafraichir = () => {
    setModaleAnnulation(null);
    setModaleReduction(null);
    router.refresh();
  };

  return (
    <>
      <table className="w-full overflow-hidden rounded-xl border border-marine-100 bg-white text-left text-sm shadow-marine-sm">
        <thead>
          <tr className="border-b border-marine-100 bg-marine-50 text-marine-600">
            <th className="px-4 py-3">Référence</th>
            <th>Client</th>
            <th>Créneau</th>
            <th>Statut</th>
            <th>Solde dû</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {lignes.map((ligne) => (
            <tr key={ligne.reference} className="border-b border-marine-50 last:border-0">
              <td className="px-4 py-3 text-marine-900">{ligne.reference}</td>
              <td className="text-marine-700">
                {ligne.clientPrenom} {ligne.clientNom}
              </td>
              <td className="text-marine-700">
                {ligne.port} — {ligne.heureDepart}
              </td>
              <td>
                <StatusBadge statut={ligne.statut} variante={VARIANTE_STATUT[ligne.statut]} />
              </td>
              <td className="text-marine-700">{ligne.soldeRestantDu.toFixed(2)} €</td>
              <td className="flex gap-2 px-4 py-3">
                {ligne.statut !== 'ANNULEE' && (
                  <>
                    <BalanceCheckoutButton
                      reference={ligne.reference}
                      soldeDu={ligne.soldeRestantDu}
                      estSolde={ligne.statut === 'PAYEE_COMPLETEMENT'}
                      onEncaisse={rafraichir}
                    />
                    <Button type="button" variante="secondaire" onClick={() => setModaleReduction(ligne)}>
                      Réduire
                    </Button>
                    <Button type="button" variante="secondaire" onClick={() => setModaleAnnulation(ligne.reference)}>
                      Annuler
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modaleAnnulation && (
        <CancelPreviewModal reference={modaleAnnulation} onClose={() => setModaleAnnulation(null)} onAnnulee={rafraichir} />
      )}
      {modaleReduction && (
        <PartialReductionForm
          reference={modaleReduction.reference}
          adultesActifs={modaleReduction.adultesActifs}
          enfantsActifs={modaleReduction.enfantsActifs}
          onClose={() => setModaleReduction(null)}
          onReduite={rafraichir}
        />
      )}
    </>
  );
}
