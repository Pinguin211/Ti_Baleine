/**
 * CASE-ARCH-1007 — Respect des conventions de nommage des symboles de code
 * SPEC-ARCH-01 | AC-5 | Table des conventions | Cas limite #6
 */
import { describe, it, expect } from 'vitest';
import { checkSymbolNaming } from '../helpers/naming-checker';

describe('CASE_ARCH_1007_respect_conventions_nommage_symboles_code', () => {
  it('valide les variables en camelCase', () => {
    const code = `
      const bookingId = '123';
      const passengerCount = 3;
      const isOpen = true;
    `;
    expect(checkSymbolNaming(code)).toHaveLength(0);
  });

  it('rejette une variable en PascalCase', () => {
    const code = `const BookingId = '123';`;
    const violations = checkSymbolNaming(code);
    expect(violations.some((v) => v.name === 'BookingId')).toBe(true);
  });

  it('rejette une variable en snake_case', () => {
    const code = `const booking_id = '123';`;
    const violations = checkSymbolNaming(code);
    expect(violations.some((v) => v.name === 'booking_id')).toBe(true);
  });

  it('valide les fonctions en camelCase', () => {
    const code = `
      function calculatePrice() { return 0; }
      function useBooking() { return null; }
    `;
    expect(checkSymbolNaming(code)).toHaveLength(0);
  });

  it('rejette une fonction en PascalCase (non-composant dans un .ts)', () => {
    const code = `function CalculatePrice() { return 0; }`;
    const violations = checkSymbolNaming(code);
    expect(violations.some((v) => v.name === 'CalculatePrice' && v.kind === 'function')).toBe(true);
  });

  it('valide les types, interfaces, classes et enums en PascalCase', () => {
    const code = `
      type BookingStatus = string;
      interface SlotDetails { id: string; }
      class BookingService {}
      enum BookingStep { Init, Confirm }
    `;
    expect(checkSymbolNaming(code)).toHaveLength(0);
  });

  it('rejette un type en camelCase', () => {
    const code = `type bookingStatus = string;`;
    const violations = checkSymbolNaming(code);
    expect(violations.some((v) => v.name === 'bookingStatus' && v.kind === 'type')).toBe(true);
  });

  it('valide les constantes globales en UPPER_SNAKE_CASE', () => {
    const code = `const MAX_CAPACITY_ST_LEU = 12;`;
    expect(checkSymbolNaming(code)).toHaveLength(0);
  });
});
