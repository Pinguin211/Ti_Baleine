/**
 * CASE-ARCH-1005 — Dérogation d'en-tête pour fichier source dépassant 500 lignes
 * SPEC-ARCH-01 | AC-3 | Scénario 4
 */
import { describe, it, expect } from 'vitest';
import { createInMemorySourceFile, checkArch01Compliance } from '../helpers/ast-analyzer';

describe('CASE_ARCH_1005_validation_derogation_en_tete_fichier_superieur_500_lignes', () => {
  it('valide un fichier de 620 lignes avec @need_more_lines en en-tête et motif explicite', () => {
    const bodyLines = Array.from({ length: 616 }, (_, i) => `const v${i} = ${i};`).join('\n');
    const code = `/**
 * Schéma consolidé des réservations — fichier volumineux autorisé.
 * @need_more_lines - "Schéma consolidé des réservations"
 */
${bodyLines}`;

    const sf = createInMemorySourceFile(code, 'src/schemas/validation/booking.schema.ts');
    const violations = checkArch01Compliance(sf);

    expect(violations.filter((v) => v.type === 'file_too_long')).toHaveLength(0);
    expect(violations.filter((v) => v.type === 'exemption_not_at_header')).toHaveLength(0);
  });

  it('exige un motif non vide dans la dérogation de fichier', () => {
    const bodyLines = Array.from({ length: 516 }, (_, i) => `const v${i} = ${i};`).join('\n');
    const code = `/**
 * @need_more_lines - ""
 */
${bodyLines}`;

    const sf = createInMemorySourceFile(code, 'src/schemas/validation/empty-reason.schema.ts');
    const violations = checkArch01Compliance(sf);

    expect(violations.filter((v) => v.type === 'no_exemption_reason')).toHaveLength(1);
  });

  it('extrait et valide le motif explicite de la dérogation de fichier', () => {
    const bodyLines = Array.from({ length: 516 }, (_, i) => `const v${i} = ${i};`).join('\n');
    const code = `/**
 * @need_more_lines - "Dictionnaire de constantes d'état"
 */
${bodyLines}`;

    const sf = createInMemorySourceFile(code, 'src/config/status.constants.ts');
    const violations = checkArch01Compliance(sf);

    // Motif valide → 0 violation de plafond fichier
    expect(violations.filter((v) => v.type === 'file_too_long')).toHaveLength(0);
  });
});
