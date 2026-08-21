import Link from 'next/link';
import { cn } from '../../../utils/cn.util';

export interface PlanningViewToggleProps {
  vue: 'jour' | 'calendrier';
  hrefVueJour: string;
  hrefVueCalendrier: string;
}

const CLASSE_BASE = 'rounded-full px-3 py-1.5 text-sm transition-colors';
const CLASSE_ACTIVE = 'bg-gradient-to-r from-marine-800 to-lagoon-600 text-white shadow-marine-sm';
const CLASSE_INACTIVE = 'border border-marine-200 bg-white text-marine-700 hover:bg-marine-50';

export function PlanningViewToggle({ vue, hrefVueJour, hrefVueCalendrier }: PlanningViewToggleProps) {
  return (
    <div className="flex gap-2">
      <Link href={hrefVueJour} className={cn(CLASSE_BASE, vue === 'jour' ? CLASSE_ACTIVE : CLASSE_INACTIVE)}>
        Vue jour
      </Link>
      <Link
        href={hrefVueCalendrier}
        className={cn(CLASSE_BASE, vue === 'calendrier' ? CLASSE_ACTIVE : CLASSE_INACTIVE)}
      >
        Vue calendrier
      </Link>
    </div>
  );
}
