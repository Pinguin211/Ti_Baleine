'use client';

/**
 * Grille de planning consolidée desktop : colonnes par port avec cartes de
 * créneaux (SPEC-ADMIN-01, CASE-ADMIN-001, SPEC-ARCH-01 : mono-composant).
 */
import { useState } from 'react';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { CapacityProgressBar } from './capacity-progress-bar';
import { SlotDetailDrawer } from './slot-detail-drawer';
import { cn } from '../../../utils/cn';
import type { CreneauAffichePlanning } from './planning-types';

export function PlanningGridDesktop({ creneaux }: { creneaux: CreneauAffichePlanning[] }) {
  const [selectionne, setSelectionne] = useState<CreneauAffichePlanning | null>(null);
  const ports = Array.from(new Set(creneaux.map((creneau) => creneau.port)));

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      {ports.map((port) => (
        <section key={port}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ocean-500">{port}</h2>
          <div className="flex flex-col gap-3">
            {creneaux
              .filter((creneau) => creneau.port === port)
              .map((creneau) => (
                <Card
                  key={creneau.id}
                  onClick={() => setSelectionne(creneau)}
                  className={cn(
                    'cursor-pointer p-4 transition hover:shadow-md',
                    creneau.styleAlerteApplique && 'border-amber-300 bg-amber-50',
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-lg font-semibold text-ocean-950">{creneau.heureDepart}</p>
                      <p className="text-sm text-ocean-600">{creneau.activiteLabel ?? 'type non renseigné'}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge tone={creneau.etatOperationnel === 'Ouvert' ? 'green' : 'red'}>{creneau.etatOperationnel}</Badge>
                      {creneau.badgePreAlerte && <Badge tone="orange">{creneau.badgePreAlerte}</Badge>}
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-ocean-500">
                    {creneau.invitationCompleterAffectation ? '⚠ Navire non affecté' : creneau.navireLabel}
                  </p>
                  <div className="mt-3">
                    <CapacityProgressBar placesOccupees={creneau.occupees} jaugeMax={creneau.jauge} />
                  </div>
                </Card>
              ))}
          </div>
        </section>
      ))}
      <SlotDetailDrawer creneau={selectionne} onOpenChange={(ouvert) => !ouvert && setSelectionne(null)} />
    </div>
  );
}
