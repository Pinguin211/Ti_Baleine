/**
 * cn.ts
 *
 * Fusionne des classes Tailwind conditionnelles en résolvant les conflits
 * d'utilitaires (ex. `px-2` vs `px-4`). Aucune règle métier : simple helper
 * de présentation transverse.
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...entrees: ClassValue[]): string {
  return twMerge(clsx(entrees));
}
