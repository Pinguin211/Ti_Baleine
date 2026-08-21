'use client';

/**
 * Fenêtre modale accessible, enveloppe fine de Radix Dialog (SPEC-ARCH-01 : mono-composant).
 */
import * as RadixDialog from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface DialogProps {
  open: boolean;
  onOpenChange: (ouvert: boolean) => void;
  titre: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Dialog({ open, onOpenChange, titre, description, children, className }: DialogProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-40 bg-ocean-950/40" />
        <RadixDialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-[min(32rem,90vw)] -translate-x-1/2 -translate-y-1/2',
            'rounded-xl border border-ocean-100 bg-white p-6 shadow-xl focus:outline-none',
            className,
          )}
        >
          <RadixDialog.Title className="text-lg font-semibold text-ocean-950">{titre}</RadixDialog.Title>
          {description && (
            <RadixDialog.Description className="mt-1 text-sm text-ocean-600">
              {description}
            </RadixDialog.Description>
          )}
          <div className="mt-4">{children}</div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
