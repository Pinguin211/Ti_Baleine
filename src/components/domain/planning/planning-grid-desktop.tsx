'use client';

import { useState } from 'react';
import type { CreneauAffiche, GrillePlanningConsolidee } from '../../../schemas/types/planning.types';
import { cn } from '../../../utils/cn.util';
import { regrouperParPort } from '../../../utils/regrouper-creneaux-par-port.util';
import { SlotDetailDrawer } from './slot-detail-drawer';

export interface PlanningGridDesktopProps {
  grille: GrillePlanningConsolidee;
}

export function PlanningGridDesktop({ grille }: PlanningGridDesktopProps) {
  const [creneauSelectionne, setCreneauSelectionne] = useState<CreneauAffiche | null>(null);

  if (grille.messageEtatVide) {
    return <p className="text-marine-500">{grille.messageEtatVide}</p>;
  }

  const groupes = regrouperParPort(grille.creneaux);

  return (
    <div className="flex gap-6">
      {Array.from(groupes.entries()).map(([port, creneaux]) => (
        <div key={port} className="flex-1">
          <h2 className="mb-3 font-semibold text-marine-900">{port}</h2>
          <div className="flex flex-col gap-3">
            {creneaux.map((creneau) => (
              <button
                key={creneau.id}
                type="button"
                onClick={() => setCreneauSelectionne(creneau)}
                className={cn(
                  'rounded-lg border bg-white p-3 text-left text-sm shadow-marine-sm transition-colors hover:border-lagoon-300',
                  creneau.styleAlerteApplique ? 'border-sand-400 bg-sand-50' : 'border-marine-100'
                )}
              >
                <div className="flex items-center justify-between font-medium text-marine-900">
                  <span>{creneau.heureDepart}</span>
                  <span>{creneau.etatOperationnel}</span>
                </div>
                <p className="text-marine-600">{creneau.activiteLabel}</p>
                <p className={cn('text-marine-700', creneau.invitationCompleterAffectation && 'text-coral-600')}>
                  {creneau.navireLabel}
                </p>
                {creneau.badgePreAlerte && (
                  <span className="mt-1 inline-block rounded-full bg-sand-200 px-2 py-0.5 text-xs text-sand-500">
                    {creneau.badgePreAlerte}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
      <SlotDetailDrawer creneau={creneauSelectionne} onClose={() => setCreneauSelectionne(null)} />
    </div>
  );
}
