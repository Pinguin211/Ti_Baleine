'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  traiterSoumissionFormulaireConnexion,
  type DonneesFormulaireConnexion,
} from '../../../schemas/validation/auth/identifiants-connexion.schema';
import { soumettreConnexionAdministrateur } from '../../../actions/connecter-administrateur.action';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

export function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [erreursChamps, setErreursChamps] = useState<Record<string, string>>({});
  const [erreurServeur, setErreurServeur] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<DonneesFormulaireConnexion>();

  const soumettre = (donnees: DonneesFormulaireConnexion) => {
    setErreurServeur(null);
    const resultat = traiterSoumissionFormulaireConnexion(donnees, {
      transmettreConnexion: () => {
        startTransition(async () => {
          const reponse = await soumettreConnexionAdministrateur(donnees);
          if (!reponse.succes) {
            setErreurServeur(reponse.messageErreur ?? 'Connexion impossible');
            return;
          }
          router.push(reponse.redirection ?? '/admin/planning');
        });
      },
    });
    setErreursChamps(resultat.erreursChamps);
  };

  return (
    <form onSubmit={handleSubmit(soumettre)} className="flex w-full max-w-sm flex-col gap-4" noValidate>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-marine-800">
          Adresse e-mail
        </label>
        <Input id="email" type="email" {...register('email')} aria-invalid={Boolean(erreursChamps.email)} />
        {erreursChamps.email && <p className="mt-1 text-sm text-coral-600">{erreursChamps.email}</p>}
      </div>
      <div>
        <label htmlFor="motDePasse" className="mb-1 block text-sm font-medium text-marine-800">
          Mot de passe
        </label>
        <Input
          id="motDePasse"
          type="password"
          {...register('motDePasse')}
          aria-invalid={Boolean(erreursChamps.motDePasse)}
        />
        {erreursChamps.motDePasse && <p className="mt-1 text-sm text-coral-600">{erreursChamps.motDePasse}</p>}
      </div>
      {erreurServeur && (
        <p className="text-sm text-coral-600" role="alert">
          {erreurServeur}
        </p>
      )}
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Connexion…' : 'Se connecter'}
      </Button>
    </form>
  );
}
