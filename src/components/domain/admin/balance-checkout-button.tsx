'use client';

import { useState } from 'react';
import { soumettreEncaissementSolde } from '../../../actions/soumettre-encaissement-solde.action';
import { Button } from '../../ui/button';

export interface BalanceCheckoutButtonProps {
  reference: string;
  soldeDu: number;
  estSolde: boolean;
  onEncaisse: () => void;
}

export function BalanceCheckoutButton({ reference, soldeDu, estSolde, onEncaisse }: BalanceCheckoutButtonProps) {
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  if (estSolde) {
    return <span className="text-xs text-marine-400">Solde déjà réglé</span>;
  }

  const encaisser = async () => {
    setEnCours(true);
    setErreur(null);
    const resultat = await soumettreEncaissementSolde(reference, soldeDu);
    setEnCours(false);
    if (resultat.succes) {
      onEncaisse();
    } else {
      setErreur(resultat.message ?? "Échec de l'encaissement");
    }
  };

  return (
    <span>
      <Button type="button" variante="secondaire" disabled={enCours || soldeDu <= 0} onClick={encaisser}>
        {enCours ? 'Encaissement…' : `Encaisser ${soldeDu.toFixed(2)} €`}
      </Button>
      {erreur && <p className="mt-1 text-xs text-coral-600">{erreur}</p>}
    </span>
  );
}
