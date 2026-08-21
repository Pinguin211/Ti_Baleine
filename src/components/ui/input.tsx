import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn.util';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-lg border border-marine-200 bg-white px-3 py-2 text-sm text-marine-900 placeholder:text-marine-400 transition-colors focus:border-lagoon-500 focus:outline-none focus:ring-2 focus:ring-lagoon-100',
        className
      )}
      {...props}
    />
  );
}
