/**
 * CASE-ARCH-1025 — Présence de la ligne, règle, cas de test et motif pour chaque infraction
 * SPEC-ARCH-03 | AC-3 | Règle | Scénario 1 | Gabarit
 */
import { describe, it, expect } from 'vitest';
import { generateReport, type ReportInput } from '../helpers/report-writer';

describe('CASE_ARCH_1025_presence_ligne_regle_cas_motif_par_infraction', () => {
  it('inclut le numéro de ligne exact pour chaque infraction', () => {
    const input: ReportInput = {
      scannedFilesCount: 3,
      violations: [
        {
          filePath: 'src/utils/pricing.ts',
          line: 45,
          spec: 'SPEC-ARCH-01',
          caseId: 'CASE-ARCH-1000',
          detail: 'Fonction calculatePricingMatrix compte 48 lignes utiles',
        },
      ],
    };

    const content = generateReport(input);
    expect(content.raw).toContain('Ligne 45');
  });

  it('inclut la référence de spécification (SPEC-ARCH-01 ou SPEC-ARCH-02)', () => {
    const input: ReportInput = {
      scannedFilesCount: 2,
      violations: [
        { filePath: 'src/hooks/use-auth.ts', line: 3, spec: 'SPEC-ARCH-02', caseId: 'CASE-ARCH-1013', detail: 'Import env/server interdit' },
      ],
    };

    const content = generateReport(input);
    expect(content.raw).toContain('SPEC-ARCH-02');
  });

  it('inclut le cas de test associé (CASE-ARCH-xxxx)', () => {
    const input: ReportInput = {
      scannedFilesCount: 2,
      violations: [
        { filePath: 'src/components/ui/button.tsx', line: 82, spec: 'SPEC-ARCH-01', caseId: 'CASE-ARCH-1003', detail: 'Sous-composant détecté' },
      ],
    };

    const content = generateReport(input);
    expect(content.raw).toContain('CASE-ARCH-1003');
  });

  it('inclut l\'explication détaillée de l\'erreur', () => {
    const detail = 'La fonction compte 48 lignes utiles (seuil max : 30) sans balise @need_more_lines';
    const input: ReportInput = {
      scannedFilesCount: 1,
      violations: [
        { filePath: 'src/utils/pricing.ts', line: 45, spec: 'SPEC-ARCH-01', caseId: 'CASE-ARCH-1000', detail },
      ],
    };

    const content = generateReport(input);
    expect(content.raw).toContain(detail);
  });

  it('contient tous les champs obligatoires pour chaque violation', () => {
    const input: ReportInput = {
      scannedFilesCount: 5,
      violations: [
        {
          filePath: 'src/components/ui/user-button.tsx',
          line: 4,
          spec: 'SPEC-ARCH-02',
          caseId: 'CASE-ARCH-1018',
          detail: 'Import direct interdit de src/services/server/auth.service.ts',
        },
      ],
    };

    const content = generateReport(input);
    // Tous les champs doivent être présents
    expect(content.raw).toContain('src/components/ui/user-button.tsx');
    expect(content.raw).toContain('Ligne 4');
    expect(content.raw).toContain('SPEC-ARCH-02');
    expect(content.raw).toContain('CASE-ARCH-1018');
    expect(content.raw).toContain('Import direct interdit');
  });
});
