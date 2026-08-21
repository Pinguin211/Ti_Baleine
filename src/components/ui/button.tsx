import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn.util';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?: 'primaire' | 'secondaire';
};

export function Button({ variante = 'primaire', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50',
        variante === 'primaire' &&
          'bg-gradient-to-r from-marine-800 to-lagoon-600 text-white shadow-marine-sm hover:from-marine-700 hover:to-lagoon-500 hover:shadow-marine-md active:from-marine-800 active:to-lagoon-600',
        variante === 'secondaire' &&
          'border border-marine-200 bg-white text-marine-800 hover:border-lagoon-300 hover:bg-lagoon-50',
        className
      )}
      {...props}
    />
  );
}
