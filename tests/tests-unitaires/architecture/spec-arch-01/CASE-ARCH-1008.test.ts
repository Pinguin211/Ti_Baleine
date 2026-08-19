/**
 * CASE-ARCH-1008 — Respect des conventions de nommage des fichiers sources en kebab-case
 * SPEC-ARCH-01 | AC-5 | Table des conventions | Cas limite #6
 */
import { describe, it, expect } from 'vitest';
import { isFileNameKebabCase } from '../helpers/naming-checker';

describe('CASE_ARCH_1008_respect_nommage_fichiers_sources_kebab_case', () => {
  it('valide des noms de fichiers .tsx en kebab-case', () => {
    expect(isFileNameKebabCase('booking-form.tsx')).toBe(true);
    expect(isFileNameKebabCase('page.tsx')).toBe(true);
    expect(isFileNameKebabCase('layout.tsx')).toBe(true);
    expect(isFileNameKebabCase('booking-card.tsx')).toBe(true);
  });

  it('valide des noms de fichiers .ts en kebab-case', () => {
    expect(isFileNameKebabCase('pricing-rules.ts')).toBe(true);
    expect(isFileNameKebabCase('slot.service.ts')).toBe(true);
    expect(isFileNameKebabCase('auth.service.ts')).toBe(true);
    expect(isFileNameKebabCase('booking.schema.ts')).toBe(true);
  });

  it('rejette un fichier .tsx en PascalCase', () => {
    expect(isFileNameKebabCase('BookingCard.tsx')).toBe(false);
    expect(isFileNameKebabCase('BookingForm.tsx')).toBe(false);
  });

  it('rejette un fichier .tsx en camelCase', () => {
    expect(isFileNameKebabCase('bookingCard.tsx')).toBe(false);
    expect(isFileNameKebabCase('bookingForm.tsx')).toBe(false);
  });

  it('rejette un fichier .ts en snake_case', () => {
    expect(isFileNameKebabCase('pricing_rules.ts')).toBe(false);
    expect(isFileNameKebabCase('user_service.ts')).toBe(false);
  });

  it('rejette un fichier .ts en camelCase', () => {
    expect(isFileNameKebabCase('pricingRules.ts')).toBe(false);
  });

  it('valide les fichiers avec plusieurs segments kebab-case', () => {
    expect(isFileNameKebabCase('admin-booking-form.tsx')).toBe(true);
    expect(isFileNameKebabCase('use-booking-state.ts')).toBe(true);
  });
});
