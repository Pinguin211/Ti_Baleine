import type { CreneauDisponible } from '../../../schemas/types/booking.types';
import { cn } from '../../../utils/cn.util';

export interface SlotPickerProps {
  creneaux: CreneauDisponible[];
  heureSelectionnee: string | null;
  onSelect: (heureDepart: string) => void;
}

export function SlotPicker({ creneaux, heureSelectionnee, onSelect }: SlotPickerProps) {
  if (creneaux.length === 0) {
    return <p className="text-sm text-marine-500">Aucun créneau pour cette date.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {creneaux.map((creneau) => (
        <button
          key={creneau.heureDepart}
          type="button"
          disabled={creneau.estReservable === false}
          onClick={() => onSelect(creneau.heureDepart)}
          className={cn(
            'rounded-lg border px-3 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40',
            heureSelectionnee === creneau.heureDepart
              ? 'border-transparent bg-gradient-to-r from-marine-800 to-lagoon-600 text-white shadow-marine-sm'
              : 'border-marine-200 bg-white text-marine-800 hover:bg-marine-50'
          )}
        >
          {creneau.heureDepart}
          {creneau.mention && <span className="block text-xs">{creneau.mention}</span>}
          {creneau.mentionAvertissement && <span className="block text-xs text-coral-600">{creneau.mentionAvertissement}</span>}
        </button>
      ))}
    </div>
  );
}
