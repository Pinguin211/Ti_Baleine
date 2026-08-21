'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import type { CreneauSlotPort } from '../../../schemas/types/slots-ports.types';
import {
  soumettreFermetureCreneau,
  soumettreReouvertureCreneau,
  soumettreConfigurationActivite,
  soumettreAffectationNavires,
} from '../../../actions/soumettre-configuration-creneau.action';
import { Button } from '../../ui/button';

export interface SlotConfigurationTableProps {
  creneaux: CreneauSlotPort[];
}

const NAVIRES_DISPONIBLES = ['TIKAP', 'GRAND_BLEU'] as const;

export function SlotConfigurationTable({ creneaux }: SlotConfigurationTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [erreur, setErreur] = useState<string | null>(null);

  const basculerOuverture = (creneau: CreneauSlotPort) => {
    setErreur(null);
    startTransition(async () => {
      await (creneau.estOuvert ? soumettreFermetureCreneau(creneau.id) : soumettreReouvertureCreneau(creneau.id));
      router.refresh();
    });
  };

  const changerActivite = (creneauId: string, activite: 'BALEINES' | 'DAUPHINS') => {
    setErreur(null);
    startTransition(async () => {
      const resultat = await soumettreConfigurationActivite(creneauId, activite);
      if (!resultat.accepte) setErreur(resultat.message);
      router.refresh();
    });
  };

  const toggleNavire = (creneau: CreneauSlotPort, navire: string) => {
    setErreur(null);
    const actuels = creneau.navires ?? [];
    const suivants = actuels.includes(navire) ? actuels.filter((n) => n !== navire) : [...actuels, navire];
    startTransition(async () => {
      const resultat = await soumettreAffectationNavires(creneau.id, suivants);
      if (!resultat.accepte) setErreur(resultat.message);
      router.refresh();
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-marine-100 bg-white shadow-marine-sm">
      {erreur && <p className="p-3 text-sm text-coral-600">{erreur}</p>}
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-marine-100 bg-marine-50 text-marine-600">
            <th className="px-4 py-3">Créneau</th>
            <th>Activité</th>
            <th>Navires</th>
            <th>Statut</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {creneaux.map((creneau) => (
            <tr key={creneau.id} className="border-b border-marine-50 last:border-0">
              <td className="px-4 py-3 text-marine-900">
                {creneau.port} — {creneau.heureDepart}
              </td>
              <td>
                <select
                  defaultValue={creneau.activite ?? ''}
                  onChange={(e) => changerActivite(creneau.id, e.target.value as 'BALEINES' | 'DAUPHINS')}
                  className="rounded-lg border border-marine-200 p-1 text-sm text-marine-800 focus:border-lagoon-500 focus:outline-none"
                >
                  <option value="">—</option>
                  <option value="BALEINES">Sortie Baleines</option>
                  <option value="DAUPHINS">Sortie Dauphins</option>
                </select>
              </td>
              <td>
                {NAVIRES_DISPONIBLES.map((navire) => (
                  <label key={navire} className="mr-2 inline-flex items-center gap-1 text-marine-700">
                    <input
                      type="checkbox"
                      checked={(creneau.navires ?? []).includes(navire)}
                      onChange={() => toggleNavire(creneau, navire)}
                      className="accent-lagoon-600"
                    />
                    {navire}
                  </label>
                ))}
              </td>
              <td>
                <span
                  className={
                    creneau.estOuvert
                      ? 'text-lagoon-700'
                      : 'text-coral-600'
                  }
                >
                  {creneau.estOuvert ? 'Ouvert' : 'Fermé'}
                </span>
              </td>
              <td className="px-4 py-3">
                <Button type="button" variante="secondaire" disabled={isPending} onClick={() => basculerOuverture(creneau)}>
                  {creneau.estOuvert ? 'Fermer' : 'Rouvrir'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
