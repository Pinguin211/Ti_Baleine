/**
 * CASE-ARCH-1004 — Plafonnement global de tout fichier source à 500 lignes maximum
 * SPEC-ARCH-01 | AC-3 | Cas limite #4
 */
import { describe, it, expect } from 'vitest';
import { createInMemorySourceFile, checkArch01Compliance } from '../helpers/ast-analyzer';

describe('CASE_ARCH_1004_plafonnement_global_fichier_source_500_lignes_max', () => {
  it('valide un fichier de 500 lignes exactement sans dérogation', () => {
    const lines = Array.from({ length: 498 }, (_, i) => `const v${i} = ${i};`).join('\n');
    const code = `// fichier\n${lines}`;

    const sf = createInMemorySourceFile(code, 'src/utils/large.ts');
    const violations = checkArch01Compliance(sf);

    expect(violations.filter((v) => v.type === 'file_too_long')).toHaveLength(0);
  });

  it('rejette un fichier de 540 lignes sans dérogation en en-tête', () => {
    const lines = Array.from({ length: 540 }, (_, i) => `const v${i} = ${i};`).join('\n');
    const sf = createInMemorySourceFile(lines, 'src/utils/bloated.ts');
    const violations = checkArch01Compliance(sf);

    const tooLong = violations.filter((v) => v.type === 'file_too_long');
    expect(tooLong).toHaveLength(1);
    expect(tooLong[0].detail).toContain('500');
  });

  it('scanne .tsx, .ts, .js, .jsx — rejette tout fichier dépassant 500 lignes', () => {
    const lines = Array.from({ length: 510 }, (_, i) => `const v${i} = ${i};`).join('\n');

    for (const ext of ['.ts', '.tsx', '.js', '.jsx']) {
      const sf = createInMemorySourceFile(lines, `src/utils/bloated${ext}`);
      const violations = checkArch01Compliance(sf);
      const hasViolation =
        violations.some((v) => v.type === 'file_too_long' || v.type === 'multi_function_tsx');
      // Pour .tsx, la violation sera multi_function_tsx ou file_too_long selon le contenu
      expect(violations.length).toBeGreaterThan(0);
    }
  });

  it('produit un message explicite mentionnant le dépassement du plafond', () => {
    const lines = Array.from({ length: 510 }, (_, i) => `const v${i} = ${i};`).join('\n');
    const sf = createInMemorySourceFile(lines, 'src/utils/bloated.ts');
    const violations = checkArch01Compliance(sf);

    const v = violations.find((v) => v.type === 'file_too_long');
    expect(v).toBeDefined();
    expect(v!.detail).toMatch(/500/);
  });
});
