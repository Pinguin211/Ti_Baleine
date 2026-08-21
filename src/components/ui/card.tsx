/**
 * Conteneur carte avec bordure, utilisé comme brique de mise en page (SPEC-ARCH-01 : mono-composant).
 */
import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('rounded-xl border border-ocean-100 bg-white shadow-sm', className)}
      {...props}
    />
  );
}
