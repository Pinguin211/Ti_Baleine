/**
 * CASE-ARCH-1001 — Rejet d'une fonction .ts/.js > 30 lignes utiles sans dérogation ou sans motif
 * SPEC-ARCH-01 | AC-1 | Cas limite #1 et #2
 */
import { describe, it, expect } from 'vitest';
import { createInMemorySourceFile, checkArch01Compliance } from '../helpers/ast-analyzer';

describe('CASE_ARCH_1001_rejet_fonction_ts_depassant_30_lignes_sans_derogation_ou_motif', () => {
  it('Situation A — rejette une fonction de 38 lignes utiles sans tag @need_more_lines', () => {
    const lines = Array.from({ length: 38 }, (_, i) => `  const v${i} = ${i};`).join('\n');
    const code = `function calculatePricingMatrix() {\n${lines}\n}`;

    const sf = createInMemorySourceFile(code, 'src/utils/calculator.ts');
    const violations = checkArch01Compliance(sf);

    const tooLong = violations.filter((v) => v.type === 'function_too_long');
    expect(tooLong).toHaveLength(1);
    expect(tooLong[0].detail).toContain('calculatePricingMatrix');
  });

  it('Situation B — rejette une fonction de 38 lignes avec @need_more_lines sans motif textuel', () => {
    const lines = Array.from({ length: 38 }, (_, i) => `  const v${i} = ${i};`).join('\n');
    const code = `
/**
 * @need_more_lines
 */
function calculatePricingMatrix() {
${lines}
}`;

    const sf = createInMemorySourceFile(code, 'src/utils/calculator.ts');
    const violations = checkArch01Compliance(sf);

    const noReason = violations.filter((v) => v.type === 'no_exemption_reason');
    expect(noReason).toHaveLength(1);
    expect(noReason[0].detail).toContain('calculatePricingMatrix');
  });

  it('produit un message de diagnostic explicite mentionnant la fonction et le nombre de lignes', () => {
    const lines = Array.from({ length: 35 }, (_, i) => `  const x${i} = ${i};`).join('\n');
    const code = `function myLargeFunction() {\n${lines}\n}`;

    const sf = createInMemorySourceFile(code, 'src/utils/large.ts');
    const violations = checkArch01Compliance(sf);

    expect(violations).toHaveLength(1);
    expect(violations[0].detail).toMatch(/myLargeFunction/);
  });
});
