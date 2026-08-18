/**
 * CASE-ARCH-1027 — Génération du rapport en conformité totale (0 violation)
 * SPEC-ARCH-03 | AC-5 | Scénario 2
 */
import { describe, it, expect } from 'vitest';
import { generateReport, type ReportInput } from '../helpers/report-writer';

describe('CASE_ARCH_1027_rapport_genere_en_conformite_totale_zero_violation', () => {
  it('génère le rapport même avec 0 violation', () => {
    const input: ReportInput = { violations: [], scannedFilesCount: 25 };
    const content = generateReport(input);
    expect(content.raw).toBeTruthy();
    expect(content.raw.length).toBeGreaterThan(0);
  });

  it('affiche explicitement le statut CONFORME quand 0 violation', () => {
    const input: ReportInput = { violations: [], scannedFilesCount: 12 };
    const content = generateReport(input);

    expect(content.raw).toContain('CONFORME');
    expect(content.isConform).toBe(true);
  });

  it('affiche le statut 🟢 en cas de conformité totale', () => {
    const input: ReportInput = { violations: [], scannedFilesCount: 8 };
    const content = generateReport(input);

    expect(content.raw).toContain('🟢');
  });

  it('affiche "0 violation" dans le statut global', () => {
    const input: ReportInput = { violations: [], scannedFilesCount: 5 };
    const content = generateReport(input);

    expect(content.raw).toContain('0');
    expect(content.violationCount).toBe(0);
  });

  it('la section "Répertoire des Fichiers en Infraction" indique l\'absence de violations', () => {
    const input: ReportInput = { violations: [], scannedFilesCount: 10 };
    const content = generateReport(input);

    expect(content.raw).toContain('Répertoire');
    // Aucun bloc de fichier listé (pas de 📁)
    expect(content.raw).not.toContain('📁');
    expect(content.raw).toContain('entièrement conforme');
  });

  it('les compteurs par spec valent 0 en cas de conformité totale', () => {
    const input: ReportInput = { violations: [], scannedFilesCount: 15 };
    const content = generateReport(input);

    expect(content.spec01Count).toBe(0);
    expect(content.spec02Count).toBe(0);
  });
});
