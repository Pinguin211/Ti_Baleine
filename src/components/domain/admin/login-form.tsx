'use client';

/**
 * Formulaire de connexion sécurisée du back-office (SPEC-ADMIN-04, SPEC-ARCH-01 : mono-composant).
 */
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { authentifierAdmin } from '../../../actions/authentifier-admin.action';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Input } from '../../ui/input';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@ti-baleine.re');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, demarrer] = useTransition();

  function soumettre(evenement: React.FormEvent<HTMLFormElement>) {
    evenement.preventDefault();
    setErreur(null);
    demarrer(async () => {
      const resultat = await authentifierAdmin(email, motDePasse);
      if (!resultat.succes) {
        setErreur(resultat.messageErreur ?? 'Connexion refusée');
        return;
      }
      router.push('/admin/planning');
      router.refresh();
    });
  }

  return (
    <Card className="w-full max-w-sm p-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-ocean-500">Back-office</p>
      <h1 className="mt-1 text-xl font-bold text-ocean-950">Connexion administrateur</h1>
      <form onSubmit={soumettre} className="mt-6 flex flex-col gap-4">
        <label className="text-sm font-medium text-ocean-700">
          E-mail
          <Input
            type="email"
            required
            value={email}
            onChange={(evenement) => setEmail(evenement.target.value)}
            className="mt-1"
          />
        </label>
        <label className="text-sm font-medium text-ocean-700">
          Mot de passe
          <Input
            type="password"
            required
            value={motDePasse}
            onChange={(evenement) => setMotDePasse(evenement.target.value)}
            className="mt-1"
          />
        </label>
        {erreur && <p className="text-sm text-coral-600">{erreur}</p>}
        <Button type="submit" disabled={enCours} className="mt-2">
          {enCours ? 'Connexion…' : 'Se connecter'}
        </Button>
        <p className="text-xs text-ocean-400">
          Démo : admin@ti-baleine.re / Baleine#2026!
        </p>
      </form>
    </Card>
  );
}
