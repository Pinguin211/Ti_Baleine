'use client';

import { useState } from 'react';
import { soumettreReductionBillets } from '../../../actions/soumettre-reduction-billets.action';
import { confirmerBasculeAnnulation } from '../../../actions/confirmer-bascule-annulation.action';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

export interface PartialReductionFormProps {
  reference: string;
  adultesActifs: number;
  enfantsActifs: number;
  onClose: () => void;
  onReduite: () => void;
}

export function PartialReductionForm({
  reference,
  adultesActifs,
  enfantsActifs,
  onClose,
  onReduite,
}: PartialReductionFormProps) {
  const [adultesARetirer, setAdultesARetirer] = useState(0);
  const [enfantsARetirer, setEnfantsARetirer] = useState(0);
  const [basculeRequise, setBasculeRequise] = useState(false);
  const [motif, setMotif] = useState('');
  const [enCours, setEnCours] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const soumettre = async () => {
    setEnCours(true);
    setMessage(null);
    const resultat = await soumettreReductionBillets({
      reservationReference: reference,
      operation: 'RETRAIT',
      adultesARetirer,
      enfantsARetirer,
    });
    setEnCours(false);
    if (!resultat.succes) {
      setMessage(resultat.message ?? 'Échec de la réduction');
      return;
    }
    if (resultat.type === 'BASCULE_ANNULATION_REQUISE') {
      setBasculeRequise(true);
      return;
    }
    onReduite();
  };

  const confirmerBascule = async () => {
    setEnCours(true);
    const resultat = await confirmerBasculeAnnulation(reference, motif);
    setEnCours(false);
    if (resultat.succes) {
      onReduite();
    } else {
      setMessage(resultat.message ?? 'Échec de la confirmation');
    }
  };

  if (basculeRequise) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-marine-950/40 backdrop-blur-sm">
        <div className="w-96 rounded-xl bg-white p-6 shadow-marine-lg">
          <h2 className="mb-4 text-lg font-semibold text-marine-900">Retrait total — annulation complète requise</h2>
          <p className="mb-3 text-sm text-marine-600">
            Le retrait demandé porte sur la totalité des billets actifs. Confirmez l&apos;annulation complète.
          </p>
          <label className="block text-sm text-marine-800">
            Motif (transmis au client par SMS)
            <textarea
              value={motif}
              onChange={(e) => setMotif(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-lg border border-marine-200 p-2 text-sm focus:border-lagoon-500 focus:outline-none focus:ring-2 focus:ring-lagoon-100"
            />
          </label>
          {message && <p className="mt-2 text-sm text-coral-600">{message}</p>}
          <div className="mt-4 flex justify-end gap-2">
            <Button type="button" variante="secondaire" onClick={onClose}>
              Fermer
            </Button>
            <Button type="button" disabled={enCours || motif.trim().length === 0} onClick={confirmerBascule}>
              {enCours ? 'Confirmation…' : "Confirmer l'annulation"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-marine-950/40 backdrop-blur-sm">
      <div className="w-96 rounded-xl bg-white p-6 shadow-marine-lg">
        <h2 className="mb-4 text-lg font-semibold text-marine-900">Réduire les billets — {reference}</h2>
        <div className="flex flex-col gap-3 text-sm text-marine-800">
          <label>
            Adultes à retirer (max {adultesActifs})
            <Input
              type="number"
              min={0}
              max={adultesActifs}
              value={adultesARetirer}
              onChange={(e) => setAdultesARetirer(Number(e.target.value))}
            />
          </label>
          <label>
            Enfants à retirer (max {enfantsActifs})
            <Input
              type="number"
              min={0}
              max={enfantsActifs}
              value={enfantsARetirer}
              onChange={(e) => setEnfantsARetirer(Number(e.target.value))}
            />
          </label>
        </div>
        {message && <p className="mt-2 text-sm text-coral-600">{message}</p>}
        <div className="mt-4 flex justify-end gap-2">
          <Button type="button" variante="secondaire" onClick={onClose}>
            Fermer
          </Button>
          <Button type="button" disabled={enCours || (adultesARetirer === 0 && enfantsARetirer === 0)} onClick={soumettre}>
            {enCours ? 'Réduction…' : 'Réduire'}
          </Button>
        </div>
      </div>
    </div>
  );
}
