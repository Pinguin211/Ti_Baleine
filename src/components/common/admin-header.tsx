'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { seDeconnecterAdministrateur } from '../../actions/deconnecter-administrateur.action';
import { Button } from '../ui/button';

export interface AdminHeaderProps {
  emailAdmin: string;
}

export function AdminHeader({ emailAdmin }: AdminHeaderProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const deconnecter = () => {
    startTransition(async () => {
      await seDeconnecterAdministrateur();
      router.push('/admin/login');
    });
  };

  return (
    <header className="flex items-center justify-between border-b border-marine-100 bg-white px-6 py-4">
      <span className="text-sm text-marine-600">{emailAdmin}</span>
      <Button variante="secondaire" onClick={deconnecter} disabled={isPending}>
        Déconnexion
      </Button>
    </header>
  );
}
