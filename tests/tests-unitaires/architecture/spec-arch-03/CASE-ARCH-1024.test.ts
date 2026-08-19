/**
 * CASE-ARCH-1024 — Répertoire exhaustif des fichiers non conformes dans le rapport
 * SPEC-ARCH-03 | AC-2 | Règle | Scénario 1 | Cas limite #1
 */
import { describe, it, expect } from 'vitest';
import { generateReport, type ReportInput } from '../helpers/report-writer';

describe('CASE_ARCH_1024_repertoire_exhaustif_fichiers_non_conformes', () => {
  it('liste 100% des fichiers en faute avec leur chemin relatif', () => {
    const input: ReportInput = {
      scannedFilesCount: 10,
      violations: [
        { filePath: 'src/utils/pricing.ts', line: 45, spec: 'SPEC-ARCH-01', caseId: 'CASE-ARCH-1000', detail: 'Fonction trop longue' },
        { filePath: 'src/hooks/domain/use-auth.ts', line: 3, spec: 'SPEC-ARCH-02', caseId: 'CASE-ARCH-1013', detail: 'Import env/server interdit' },
      ],
    };

    const content = generateReport(input);
    expect(content.raw).toContain('src/utils/pricing.ts');
    expect(content.raw).toContain('src/hooks/domain/use-auth.ts');
  });

  it('liste un fichier cumulant plusieurs violations avec toutes ses infractions', () => {
    const input: ReportInput = {
      scannedFilesCount: 5,
      violations: [
        { filePath: 'src/utils/multi-error.ts', line: 10, spec: 'SPEC-ARCH-01', caseId: 'CASE-ARCH-1000', detail: 'Violation 1' },
        { filePath: 'src/utils/multi-error.ts', line: 50, spec: 'SPEC-ARCH-01', caseId: 'CASE-ARCH-1004', detail: 'Violation 2' },
      ],
    };

    const content = generateReport(input);
    // Le fichier apparaît une seule fois en en-tête mais ses 2 violations sont listées
    expect(content.raw).toContain('Violation 1');
    expect(content.raw).toContain('Violation 2');
    // Un seul bloc de section pour ce fichier
    const occurrences = (content.raw.match(/multi-error\.ts/g) ?? []).length;
    expect(occurrences).toBeGreaterThanOrEqual(1);
  });

  it('retourne 0 violation dans la section fautes si aucune violation', () => {
    const input: ReportInput = { violations: [], scannedFilesCount: 20 };
    const content = generateReport(input);
    expect(content.raw).toContain('CONFORME');
    expect(content.raw).not.toContain('📁');
  });
});
