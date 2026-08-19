/**
 * CASE-ARCH-1009 — Respect des conventions de nommage des dossiers en kebab-case
 * SPEC-ARCH-01 | AC-5 | Table des conventions | Cas limite #6
 */
import { describe, it, expect } from 'vitest';
import { isDirKebabCase, checkDirNaming } from '../helpers/naming-checker';
import * as path from 'node:path';

describe('CASE_ARCH_1009_respect_nommage_dossiers_kebab_case', () => {
  it('valide des noms de dossiers en kebab-case', () => {
    expect(isDirKebabCase('components')).toBe(true);
    expect(isDirKebabCase('domain')).toBe(true);
    expect(isDirKebabCase('booking-form')).toBe(true);
    expect(isDirKebabCase('server')).toBe(true);
    expect(isDirKebabCase('use-auth')).toBe(true);
  });

  it('rejette des noms de dossiers en PascalCase', () => {
    expect(isDirKebabCase('Components')).toBe(false);
    expect(isDirKebabCase('BookingCard')).toBe(false);
    expect(isDirKebabCase('AdminPanel')).toBe(false);
  });

  it('rejette des noms de dossiers en snake_case', () => {
    expect(isDirKebabCase('server_side')).toBe(false);
    expect(isDirKebabCase('booking_form')).toBe(false);
  });

  it('rejette des noms de dossiers en camelCase', () => {
    expect(isDirKebabCase('myModule')).toBe(false);
  });

  it("retourne 0 violation sur src/ vide (aucun dossier à vérifier)", () => {
    // src/ est vide dans ce projet → aucune violation attendue
    const srcDir = path.resolve(process.cwd(), 'src');
    const violations = checkDirNaming(srcDir);
    expect(violations).toHaveLength(0);
  });

  it("valide les routes Next.js App Router en kebab-case", () => {
    expect(isDirKebabCase('admin')).toBe(true);
    expect(isDirKebabCase('planning')).toBe(true);
    expect(isDirKebabCase('booking-confirm')).toBe(true);
  });
});
