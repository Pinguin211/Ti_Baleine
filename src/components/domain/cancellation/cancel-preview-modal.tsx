'use client';

import { useEffect, useState } from 'react';
import { previsualiserAnnulationAction, type PreviewAnnulation } from '../../../actions/previsualiser-annulation.action';
import { soumettreAnnulationReservation } from '../../../actions/soumettre-annulation-reservation.action';
import { Button } from '../../ui/button';
import { RefundIndicatorCallout } from './refund-indicator-callout';

export interface CancelPreviewModalProps {
  reference: string;
  onClose: () => void;
  onAnnulee: () => void;
}

export function CancelPreviewModal({ reference, onClose, onAnnulee }: CancelPreviewModalProps) {
  const [calcul, setCalcul] = useState<PreviewAnnulation | null>(null);
  const [motif, setMotif] = useState('');
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    previsualiserAnnulationAction(reference).then(setCalcul);
  }, [reference]);

  const confirmer = async () => {
    setEnCours(true);
    setErreur(null);
    const resultat = await soumettreAnnulationReservation(reference, motif);
    setEnCours(false);
    if (resultat.succes) {
      onAnnulee();
    } else {
      setErreur(resultat.message ?? "Échec de l'annulation");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-marine-950/40 backdrop-blur-sm">
      <div className="w-96 rounded-xl bg-white p-6 shadow-marine-lg">
        <h2 className="mb-4 text-lg font-semibold text-marine-900">Annuler la réservation {reference}</h2>
        {calcul && <RefundIndicatorCallout calcul={calcul} />}
        <label className="mt-4 block text-sm text-marine-800">
          Motif (transmis au client par SMS)
          <textarea
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-lg border border-marine-200 p-2 text-sm focus:border-lagoon-500 focus:outline-none focus:ring-2 focus:ring-lagoon-100"
          />
        </label>
        {erreur && <p className="mt-2 text-sm text-coral-600">{erreur}</p>}
        <div className="mt-4 flex justify-end gap-2">
          <Button type="button" variante="secondaire" onClick={onClose}>
            Fermer
          </Button>
          <Button type="button" disabled={enCours || motif.trim().length === 0} onClick={confirmer}>
            {enCours ? 'Annulation…' : "Confirmer l'annulation"}
          </Button>
        </div>
      </div>
    </div>
  );
}
