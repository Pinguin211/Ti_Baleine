'use client';

/**
 * Modale d'annulation : calcul indicatif de remboursement et confirmation
 * avec motif (SPEC-ADMIN-02, SPEC-ARCH-01 : mono-composant).
 */
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { previsualiserAnnulation, annulerReservation } from '../../../actions/annulation-reservation.action';
import { Dialog } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Select } from '../../ui/select';

const MOTIFS = [
  'Annulation standard',
  'Annulation administrative météo',
  'Annulation client par peur suite à alerte météo',
] as const;

export interface CancelPreviewModalProps {
  reference: string;
  open: boolean;
  onOpenChange: (ouvert: boolean) => void;
}

export function CancelPreviewModal({ reference, open, onOpenChange }: CancelPreviewModalProps) {
  const router = useRouter();
  const [motif, setMotif] = useState<string>(MOTIFS[0]);
  const [derogatoire, setDerogatoire] = useState(false);
  const [calcul, setCalcul] = useState<{ sommePayee: number; remboursementIndicatif: number; regime: string } | null>(null);
  const [enCours, demarrer] = useTransition();

  function previsualiser(regime: boolean) {
    setDerogatoire(regime);
    demarrer(async () => setCalcul(await previsualiserAnnulation(reference, regime)));
  }

  function confirmer() {
    demarrer(async () => {
      await annulerReservation(reference, motif);
      onOpenChange(false);
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} titre="Annuler la réservation" description="Calcul indicatif réservé à l'administrateur — jamais communiqué au client.">
      {!calcul ? (
        <div className="flex flex-col gap-3">
          <Button variant="secondary" disabled={enCours} onClick={() => previsualiser(false)}>
            Régime standard
          </Button>
          <Button variant="secondary" disabled={enCours} onClick={() => previsualiser(true)}>
            Régime dérogatoire (alerte météo)
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <dl className="grid grid-cols-2 gap-2 text-sm">
            <dt className="text-ocean-500">Somme payée</dt>
            <dd className="text-right font-medium">{calcul.sommePayee.toFixed(2)} €</dd>
            <dt className="text-ocean-500">Régime</dt>
            <dd className="text-right font-medium">{calcul.regime}</dd>
            <dt className="text-ocean-500">Remboursement indicatif</dt>
            <dd className="text-right font-semibold text-ocean-950">{calcul.remboursementIndicatif.toFixed(2)} €</dd>
          </dl>
          <label className="text-sm font-medium text-ocean-700">
            Motif (SMS client)
            <Select className="mt-1" value={motif} onChange={(e) => setMotif(e.target.value)}>
              {MOTIFS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </Select>
          </label>
          <Button variant="danger" disabled={enCours} onClick={confirmer}>
            {enCours ? 'Annulation…' : "Confirmer l'annulation"}
          </Button>
        </div>
      )}
    </Dialog>
  );
}
