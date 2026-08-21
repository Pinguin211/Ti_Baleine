/**
 * Pastille de statut stylisée, polymorphe par couleur (SPEC-ARCH-01 : mono-composant).
 */
import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'ocean' | 'green' | 'orange' | 'red' | 'sand';
}

const TONS: Record<NonNullable<BadgeProps['tone']>, string> = {
  ocean: 'bg-ocean-100 text-ocean-700',
  green: 'bg-emerald-100 text-emerald-700',
  orange: 'bg-amber-100 text-amber-800',
  red: 'bg-red-100 text-red-700',
  sand: 'bg-sand-200 text-sand-400/[.9] text-sand-950',
};

export function Badge({ tone = 'ocean', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        TONS[tone],
        className,
      )}
      {...props}
    />
  );
}
