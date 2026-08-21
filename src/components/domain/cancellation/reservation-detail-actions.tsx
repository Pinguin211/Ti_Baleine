'use client';

/**
 * Barre d'actions de la fiche réservation : annulation, réduction,
 * encaissement du solde sur place et émission des factures
 * (SPEC-ADMIN-02, 03, 08, SPEC-FAC-02, SPEC-ARCH-01 : mono-composant).
 */
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { CancelPreviewModal } from './cancel-preview-modal';
import { PartialReductionForm } from './partial-reduction-form';

export interface ReservationDetailActionsProps {
  reference: string;
  billets: { typeBillet: string }[];
  solde: number;
  boutonEncaisserActif: boolean;
  mentionStatutSolde: string;
  factures: { type: string; identifiantUnique: string }[];
  emettreFactureAcompte: () => Promise<void>;
  emettreFactureSolde: () => Promise<void>;
  encaisserSolde: () => Promise<void>;
}

export function ReservationDetailActions({
  reference,
  billets,
  solde,
  boutonEncaisserActif,
  mentionStatutSolde,
  factures,
  emettreFactureAcompte,
  emettreFactureSolde,
  encaisserSolde,
}: ReservationDetailActionsProps) {
  const router = useRouter();
  const [annulationOuverte, setAnnulationOuverte] = useState(false);
  const [reductionOuverte, setReductionOuverte] = useState(false);
  const [enCours, demarrer] = useTransition();

  const factureAcompteEmise = factures.some((f) => f.type === 'acompte');
  const factureSoldeEmise = factures.some((f) => f.type === 'solde');
  const adultesActifs = billets.filter((b) => b.typeBillet === 'ADULTE').length;
  const enfantsActifs = billets.filter((b) => b.typeBillet === 'ENFANT').length;
  const aDesBillets = billets.length > 0;

  function executer(action: () => Promise<void>) {
    demarrer(async () => {
      await action();
      router.refresh();
    });
  }

  return (
    <>
      <Card className="mt-6 flex flex-wrap items-center gap-3 p-6">
        <Button variant="danger" disabled={!aDesBillets} onClick={() => setAnnulationOuverte(true)}>
          Annuler la réservation
        </Button>
        <Button variant="secondary" disabled={!aDesBillets} onClick={() => setReductionOuverte(true)}>
          Réduire les billets
        </Button>
        <Button variant="secondary" disabled={!boutonEncaisserActif || enCours} onClick={() => executer(encaisserSolde)}>
          Encaisser le solde (CB sur place)
        </Button>
        <span className="text-xs text-ocean-500">{mentionStatutSolde}</span>
      </Card>

      <Card className="mt-4 flex flex-wrap items-center gap-3 p-6">
        <p className="text-sm font-semibold text-ocean-700">Factures</p>
        {factureAcompteEmise ? (
          <Badge tone="green">Facture acompte émise</Badge>
        ) : (
          <Button size="sm" variant="secondary" disabled={enCours} onClick={() => executer(emettreFactureAcompte)}>
            Émettre la facture d&apos;acompte
          </Button>
        )}
        {factureSoldeEmise ? (
          <Badge tone="green">Facture solde émise</Badge>
        ) : (
          <Button size="sm" variant="secondary" disabled={enCours || solde > 0} onClick={() => executer(emettreFactureSolde)}>
            Émettre la facture de solde
          </Button>
        )}
      </Card>

      <CancelPreviewModal reference={reference} open={annulationOuverte} onOpenChange={setAnnulationOuverte} />
      <PartialReductionForm
        reference={reference}
        adultesActifs={adultesActifs}
        enfantsActifs={enfantsActifs}
        open={reductionOuverte}
        onOpenChange={setReductionOuverte}
      />
    </>
  );
}
