'use client';

import { useState } from 'react';
import { soumettrePaiementSolde } from '../../../actions/soumettre-paiement-solde.action';
import { Button } from '../../ui/button';

export interface SoldePaymentFormProps {
  token: string;
  soldeRestantDu: number;
}

export function SoldePaymentForm({ token, soldeRestantDu }: SoldePaymentFormProps) {
  const [enCours, setEnCours] = useState(false);
  const [resultat, setResultat] = useState<string | null>(null);

  const payer = async () => {
    setEnCours(true);
    const reponse = await soumettrePaiementSolde(token);
    setEnCours(false);
    setResultat(reponse.succes ? 'Paiement accepté — merci !' : (reponse.message ?? 'Échec du paiement'));
  };

  if (resultat) {
    return <p className="text-sm text-marine-800">{resultat}</p>;
  }

  return (
    <Button type="button" disabled={enCours} onClick={payer}>
      {enCours ? 'Traitement…' : `Régler ${soldeRestantDu.toFixed(2)} € par carte`}
    </Button>
  );
}
