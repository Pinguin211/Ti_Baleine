/**
 * Menu déroulant de sélection natif stylisé (SPEC-ARCH-01 : mono-composant).
 */
import type { SelectHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'w-full rounded-lg border border-ocean-200 bg-white px-3 py-2 text-sm text-ocean-950',
        'focus:border-ocean-500 focus:outline-none focus:ring-2 focus:ring-ocean-200',
        className,
      )}
      {...props}
    />
  );
}
