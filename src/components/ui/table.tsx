/**
 * Tableau de données tabulaires, conteneur scrollable (SPEC-ARCH-01 : mono-composant).
 */
import type { TableHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export function Table({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-ocean-100">
      <table className={cn('w-full min-w-max text-left text-sm', className)} {...props} />
    </div>
  );
}
