import { cn } from '../../utils/cn.util';

export interface StatusBadgeProps {
  statut: string;
  variante: 'success' | 'warning' | 'danger' | 'info';
}

const CLASSES_VARIANTE: Record<StatusBadgeProps['variante'], string> = {
  success: 'bg-lagoon-50 text-lagoon-700 ring-1 ring-inset ring-lagoon-200',
  warning: 'bg-sand-100 text-sand-500 ring-1 ring-inset ring-sand-300',
  danger: 'bg-coral-50 text-coral-700 ring-1 ring-inset ring-coral-200',
  info: 'bg-marine-50 text-marine-700 ring-1 ring-inset ring-marine-200',
};

export function StatusBadge({ statut, variante }: StatusBadgeProps) {
  return (
    <span className={cn('inline-block rounded-full px-2.5 py-0.5 text-xs font-medium', CLASSES_VARIANTE[variante])}>
      {statut}
    </span>
  );
}
