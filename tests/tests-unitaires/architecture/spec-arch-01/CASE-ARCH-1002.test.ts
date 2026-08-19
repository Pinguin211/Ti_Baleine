/**
 * CASE-ARCH-1002 — Validation d'une dérogation de volumétrie fonctionnelle via @need_more_lines
 * SPEC-ARCH-01 | AC-1 | Scénario 3
 */
import { describe, it, expect } from 'vitest';
import { createInMemorySourceFile, checkArch01Compliance } from '../helpers/ast-analyzer';

describe('CASE_ARCH_1002_validation_derogation_fonction_ts_need_more_lines_avec_motif', () => {
  it('valide une fonction de 45 lignes avec @need_more_lines et motif explicite', () => {
    const lines = Array.from({ length: 45 }, (_, i) => `  const v${i} = ${i};`).join('\n');
    const code = `
/**
 * Calcule la matrice tarifaire complète.
 * @need_more_lines - "Calcul tarifaire matriciel non fractionnable"
 */
function calculatePricingMatrix() {
${lines}
}`;

    const sf = createInMemorySourceFile(code, 'src/services/server/pricing.service.ts');
    const violations = checkArch01Compliance(sf);

    expect(violations).toHaveLength(0);
  });

  it('extrait correctement le motif explicite de la dérogation', () => {
    const lines = Array.from({ length: 35 }, (_, i) => `  const v${i} = ${i};`).join('\n');
    const code = `
/**
 * @need_more_lines - "Algorithme de routage non divisible"
 */
function routeBooking() {
${lines}
}`;

    const sf = createInMemorySourceFile(code, 'src/services/server/booking.service.ts');
    const violations = checkArch01Compliance(sf);

    // Motif explicite → pas de violation
    expect(violations.filter((v) => v.type === 'function_too_long')).toHaveLength(0);
    expect(violations.filter((v) => v.type === 'no_exemption_reason')).toHaveLength(0);
  });

  it('ne valide pas une dérogation avec motif vide (guillemets vides)', () => {
    const lines = Array.from({ length: 35 }, (_, i) => `  const v${i} = ${i};`).join('\n');
    const code = `
/**
 * @need_more_lines - ""
 */
function emptyReasonFunction() {
${lines}
}`;

    const sf = createInMemorySourceFile(code, 'src/services/server/empty.service.ts');
    const violations = checkArch01Compliance(sf);

    // Motif vide → rejet
    expect(violations.filter((v) => v.type === 'no_exemption_reason')).toHaveLength(1);
  });
});
