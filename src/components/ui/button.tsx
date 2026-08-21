/**
 * Bouton standard accessible, à variantes visuelles (SPEC-ARCH-01 : mono-composant).
 */
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md';
}

const VARIANTS: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-ocean-600 text-white hover:bg-ocean-700 disabled:bg-ocean-300',
  secondary: 'bg-white text-ocean-700 border border-ocean-200 hover:bg-ocean-50',
  ghost: 'bg-transparent text-ocean-700 hover:bg-ocean-100',
  danger: 'bg-coral-600 text-white hover:bg-coral-500 disabled:bg-coral-500/40',
};

const TAILLES: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
};

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60',
        VARIANTS[variant],
        TAILLES[size],
        className,
      )}
      {...props}
    />
  );
}
