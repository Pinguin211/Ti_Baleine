/**
 * Champ de saisie texte / nombre accessible (SPEC-ARCH-01 : mono-composant).
 */
import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-lg border border-ocean-200 bg-white px-3 py-2 text-sm text-ocean-950 placeholder:text-ocean-400',
        'focus:border-ocean-500 focus:outline-none focus:ring-2 focus:ring-ocean-200',
        'disabled:cursor-not-allowed disabled:bg-ocean-50',
        className,
      )}
      {...props}
    />
  );
}
