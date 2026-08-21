'use client';

/**
 * Tableau de configuration des créneaux : ouverture/fermeture, navires et
 * activité (SPEC-ADMIN-07, SPEC-ARCH-01 : mono-composant).
 */
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  fermerCreneauAdmin,
  rouvrirCreneauAdmin,
  affecterNaviresAdmin,
  configurerActiviteAdmin,
} from '../../../actions/gestion-creneaux.action';
import { Table } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Select } from '../../ui/select';

interface CreneauConfigurable {
  id: string;
  port: string;
  date: string;
  heureDepart: string;
  activite: string | null;
  navires: string[];
  estOuvert: boolean;
}

const NAVIRES_DISPONIBLES = ['TIKAP', 'GRAND_BLEU'] as const;

export function SlotConfigTable({ creneaux }: { creneaux: CreneauConfigurable[] }) {
  const router = useRouter();
  const [enCours, demarrer] = useTransition();

  function executer(action: () => Promise<unknown>) {
    demarrer(async () => {
      await action();
      router.refresh();
    });
  }

  function basculerNavire(creneau: CreneauConfigurable, navire: string) {
    const navires = creneau.navires.includes(navire)
      ? creneau.navires.filter((n) => n !== navire)
      : [...creneau.navires, navire];
    executer(() => affecterNaviresAdmin(creneau.id, navires));
  }

  return (
    <Table className="mt-6">
      <thead className="bg-ocean-50 text-xs uppercase text-ocean-500">
        <tr>
          <th className="px-4 py-2">Créneau</th>
          <th className="px-4 py-2">Statut</th>
          <th className="px-4 py-2">Activité</th>
          <th className="px-4 py-2">Navires</th>
          <th className="px-4 py-2" />
        </tr>
      </thead>
      <tbody>
        {creneaux.map((creneau) => (
          <tr key={creneau.id} className="border-t border-ocean-100">
            <td className="px-4 py-3 text-sm">
              {creneau.port} · {creneau.date} · {creneau.heureDepart}
            </td>
            <td className="px-4 py-3">
              <Badge tone={creneau.estOuvert ? 'green' : 'red'}>{creneau.estOuvert ? 'Ouvert' : 'Fermé'}</Badge>
            </td>
            <td className="px-4 py-3">
              <Select
                value={creneau.activite ?? ''}
                disabled={enCours}
                onChange={(e) => executer(() => configurerActiviteAdmin(creneau.id, e.target.value))}
              >
                <option value="">—</option>
                <option value="BALEINES">Baleines</option>
                <option value="DAUPHINS">Dauphins</option>
              </Select>
            </td>
            <td className="px-4 py-3 text-sm">
              {NAVIRES_DISPONIBLES.map((navire) => (
                <label key={navire} className="mr-3 inline-flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={creneau.navires.includes(navire)}
                    disabled={enCours}
                    onChange={() => basculerNavire(creneau, navire)}
                  />
                  {navire}
                </label>
              ))}
            </td>
            <td className="px-4 py-3">
              <Button
                size="sm"
                variant="secondary"
                disabled={enCours}
                onClick={() => executer(() => (creneau.estOuvert ? fermerCreneauAdmin(creneau.id) : rouvrirCreneauAdmin(creneau.id)))}
              >
                {creneau.estOuvert ? 'Fermer' : 'Rouvrir'}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
