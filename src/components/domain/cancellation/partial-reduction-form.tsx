'use client';

/**
 * Formulaire de suppression sélective de billets, avec bascule vers
 * l'annulation complète si la réduction porte sur tous les billets restants
 * (SPEC-ADMIN-03, SPEC-ARCH-01 : mono-composant).
 */
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { reduireBillets, confirmerAnnulationApresReductionAdmin } from '../../../actions/reduction-billets.action';
import { Dialog } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

export interface PartialReductionFormProps {
  reference: string;
  adultesActifs: number;
  enfantsActifs: number;
  open: boolean;
  onOpenChange: (ouvert: boolean) => void;
}

export function PartialReductionForm({ reference, adultesActifs, enfantsActifs, open, onOpenChange }: PartialReductionFormProps) {
  const router = useRouter();
  const [adultes, setAdultes] = useState(0);
  const [enfants, setEnfants] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [bascule, setBascule] = useState<{ calculRemboursementIndicatif?: unknown } | null>(null);
  const [enCours, demarrer] = useTransition();

  function soumettre() {
    setMessage(null);
    demarrer(async () => {
      const resultat = await reduireBillets(reference, { adultesARetirer: adultes, enfantsARetirer: enfants });
      if (!resultat.succes) {
        setMessage(resultat.message ?? 'Réduction refusée');
        return;
      }
      if (resultat.type === 'BASCULE_ANNULATION_REQUISE') {
        setBascule(resultat);
        return;
      }
      onOpenChange(false);
      router.refresh();
    });
  }

  function confirmerBascule() {
    demarrer(async () => {
      await confirmerAnnulationApresReductionAdmin(reference, 'Annulation standard');
      onOpenChange(false);
      router.refresh();
    });
  }

  if (bascule) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange} titre="Bascule vers l'annulation complète" description="Le retrait porte sur la totalité des billets restants.">
        <pre className="rounded-lg bg-ocean-50 p-3 text-xs">{JSON.stringify(bascule.calculRemboursementIndicatif, null, 2)}</pre>
        <Button variant="danger" className="mt-4" disabled={enCours} onClick={confirmerBascule}>
          {enCours ? 'Confirmation…' : "Confirmer l'annulation complète"}
        </Button>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} titre="Réduire le nombre de billets">
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-ocean-700">
          Adultes à retirer (sur {adultesActifs})
          <Input type="number" min={0} max={adultesActifs} value={adultes} onChange={(e) => setAdultes(Number(e.target.value))} className="mt-1" />
        </label>
        <label className="text-sm font-medium text-ocean-700">
          Enfants à retirer (sur {enfantsActifs})
          <Input type="number" min={0} max={enfantsActifs} value={enfants} onChange={(e) => setEnfants(Number(e.target.value))} className="mt-1" />
        </label>
        {message && <p className="text-sm text-coral-600">{message}</p>}
        <Button disabled={enCours || (adultes === 0 && enfants === 0)} onClick={soumettre}>
          {enCours ? 'Réduction…' : 'Confirmer la réduction'}
        </Button>
      </div>
    </Dialog>
  );
}
