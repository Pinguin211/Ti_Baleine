/**
 * Badge financier du jour J d'une réservation (SPEC-ADMIN-01, SPEC-ARCH-01 : mono-composant).
 */
import { Badge } from '../../ui/badge';

export interface SlotFinancialBadgeProps {
  reference: string;
  badge: string;
  soldeDu: number;
}

export function SlotFinancialBadge({ reference, badge, soldeDu }: SlotFinancialBadgeProps) {
  const tone = soldeDu > 0 ? 'orange' : 'green';
  return (
    <div className="flex items-center justify-between rounded-lg border border-ocean-100 px-3 py-2 text-sm">
      <span className="font-medium text-ocean-800">{reference}</span>
      <Badge tone={tone}>
        {badge}
        {soldeDu > 0 && ` · ${soldeDu.toFixed(2)} €`}
      </Badge>
    </div>
  );
}
