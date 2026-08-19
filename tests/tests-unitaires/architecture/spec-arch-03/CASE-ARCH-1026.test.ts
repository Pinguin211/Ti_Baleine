/**
 * CASE-ARCH-1026 — Tableau de synthèse chiffré par spécification dans le rapport
 * SPEC-ARCH-03 | AC-4 | Portée §2 | Gabarit §1
 */
import { describe, it, expect } from 'vitest';
import { generateReport, type ReportInput } from '../helpers/report-writer';

describe('CASE_ARCH_1026_tableau_synthese_chiffre_par_specification', () => {
  it('inclut le tableau de synthèse avec SPEC-ARCH-01 et SPEC-ARCH-02', () => {
    const input: ReportInput = {
      scannedFilesCount: 10,
      violations: [
        { filePath: 'src/utils/a.ts', spec: 'SPEC-ARCH-01', caseId: 'CASE-ARCH-1000', detail: 'x' },
        { filePath: 'src/hooks/b.ts', spec: 'SPEC-ARCH-02', caseId: 'CASE-ARCH-1013', detail: 'y' },
      ],
    };

    const content = generateReport(input);
    expect(content.raw).toContain('SPEC-ARCH-01');
    expect(content.raw).toContain('SPEC-ARCH-02');
    expect(content.raw).toContain('Synthèse');
  });

  it('compte correctement les violations par spécification', () => {
    const input: ReportInput = {
      scannedFilesCount: 5,
      violations: [
        { filePath: 'src/utils/a.ts', spec: 'SPEC-ARCH-01', caseId: 'CASE-ARCH-1000', detail: 'x' },
        { filePath: 'src/utils/b.ts', spec: 'SPEC-ARCH-01', caseId: 'CASE-ARCH-1001', detail: 'y' },
        { filePath: 'src/hooks/c.ts', spec: 'SPEC-ARCH-02', caseId: 'CASE-ARCH-1013', detail: 'z' },
      ],
    };

    const content = generateReport(input);
    expect(content.spec01Count).toBe(2);
    expect(content.spec02Count).toBe(1);
  });

  it('affiche 0 violation pour une spec sans infraction', () => {
    const input: ReportInput = {
      scannedFilesCount: 3,
      violations: [
        { filePath: 'src/utils/a.ts', spec: 'SPEC-ARCH-01', caseId: 'CASE-ARCH-1000', detail: 'x' },
      ],
    };

    const content = generateReport(input);
    expect(content.spec02Count).toBe(0);
    // Le rapport contient "0" pour SPEC-ARCH-02
    expect(content.raw).toMatch(/SPEC-ARCH-02.*0|0.*SPEC-ARCH-02/s);
  });

  it('le rapport contient le statut 🔴 Échec quand il y a des violations', () => {
    const input: ReportInput = {
      scannedFilesCount: 2,
      violations: [
        { filePath: 'src/config/a.ts', spec: 'SPEC-ARCH-02', caseId: 'CASE-ARCH-1010', detail: 'violation' },
      ],
    };

    const content = generateReport(input);
    expect(content.raw).toContain('ÉCHEC');
    expect(content.isConform).toBe(false);
  });
});
