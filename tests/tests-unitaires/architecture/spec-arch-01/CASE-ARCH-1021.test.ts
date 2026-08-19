/**
 * CASE-ARCH-1021 — Rejet d'une dérogation @need_more_lines fichier non positionnée en en-tête
 * SPEC-ARCH-01 | AC-3 | Portée §6 | Scénario 4
 */
import { describe, it, expect } from 'vitest';
import { createInMemorySourceFile, checkArch01Compliance } from '../helpers/ast-analyzer';

describe('CASE_ARCH_1021_rejet_derogation_need_more_lines_fichier_non_positionnee_en_tete', () => {
  it('rejette un fichier > 500 lignes avec @need_more_lines en milieu de fichier (ligne 250)', () => {
    // Construit un fichier de 560 lignes avec le tag à la ligne ~250
    const before = Array.from({ length: 245 }, (_, i) => `const a${i} = ${i};`).join('\n');
    const tagBlock = `/**\n * @need_more_lines - "Motif quelconque"\n */`;
    const after = Array.from({ length: 310 }, (_, i) => `const b${i} = ${i};`).join('\n');
    const code = `${before}\n${tagBlock}\n${after}`;

    const sf = createInMemorySourceFile(code, 'src/schemas/validation/large.schema.ts');
    const violations = checkArch01Compliance(sf);

    // Le tag n'est pas en en-tête → la dérogation est invalide
    const exemptionViolation = violations.filter(
      (v) => v.type === 'file_too_long' || v.type === 'exemption_not_at_header',
    );
    expect(exemptionViolation.length).toBeGreaterThan(0);
  });

  it('rejette un fichier > 500 lignes avec @need_more_lines en fin de fichier', () => {
    const body = Array.from({ length: 505 }, (_, i) => `const v${i} = ${i};`).join('\n');
    const tagAtEnd = `/**\n * @need_more_lines - "Motif en fin de fichier"\n */`;
    const code = `${body}\n${tagAtEnd}`;

    const sf = createInMemorySourceFile(code, 'src/schemas/validation/end-tag.schema.ts');
    const violations = checkArch01Compliance(sf);

    const exemptionViolation = violations.filter(
      (v) => v.type === 'file_too_long' || v.type === 'exemption_not_at_header',
    );
    expect(exemptionViolation.length).toBeGreaterThan(0);
  });

  it("confirme que seul un bloc TSDoc d'en-tête (ligne 1) est accepté pour la dérogation fichier", () => {
    // Version valide : tag en ligne 1
    const bodyLines = Array.from({ length: 516 }, (_, i) => `const v${i} = ${i};`).join('\n');
    const validCode = `/**\n * @need_more_lines - "Dérogation en en-tête"\n */\n${bodyLines}`;

    const sfValid = createInMemorySourceFile(validCode, 'src/schemas/validation/valid.schema.ts');
    const validViolations = checkArch01Compliance(sfValid);
    expect(validViolations.filter((v) => v.type === 'file_too_long')).toHaveLength(0);

    // Version invalide : tag après du code
    const invalidCode = `const first = 1;\n/**\n * @need_more_lines - "Trop tard"\n */\n${bodyLines}`;
    const sfInvalid = createInMemorySourceFile(invalidCode, 'src/schemas/validation/invalid.schema.ts');
    const invalidViolations = checkArch01Compliance(sfInvalid);
    expect(
      invalidViolations.filter((v) => v.type === 'file_too_long' || v.type === 'exemption_not_at_header').length,
    ).toBeGreaterThan(0);
  });
});
