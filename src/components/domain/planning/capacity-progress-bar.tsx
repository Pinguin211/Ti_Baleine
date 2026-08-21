/**
 * Barre de progression de la jauge occupée d'un créneau (SPEC-ADMIN-05, SPEC-ARCH-01 : mono-composant).
 */
import { cn } from '../../../utils/cn';

export interface CapacityProgressBarProps {
  placesOccupees: number;
  jaugeMax: number;
}

export function CapacityProgressBar({ placesOccupees, jaugeMax }: CapacityProgressBarProps) {
  const taux = jaugeMax > 0 ? Math.min(100, Math.round((placesOccupees / jaugeMax) * 100)) : 0;
  const complet = placesOccupees >= jaugeMax;
  const couleur = complet ? 'bg-coral-600' : taux >= 70 ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-ocean-100">
        <div className={cn('h-full rounded-full', couleur)} style={{ width: `${taux}%` }} />
      </div>
      <p className="mt-1 text-xs text-ocean-500">
        {placesOccupees}/{jaugeMax} places {complet && '· Complet'}
      </p>
    </div>
  );
}
