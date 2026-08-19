/**
 * CASE-ARCH-1023 — Production systématique du rapport Markdown d'audit de conformité
 * SPEC-ARCH-03 | AC-1 | Scénarios 1 et 2 | Portée §1
 */
import { describe, it, expect, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { generateAndWriteReport, type ReportInput } from '../helpers/report-writer';

const REPORT_PATH = path.resolve(process.cwd(), 'reports/arch-compliance-report.md');
const REPORTS_DIR = path.dirname(REPORT_PATH);

afterEach(() => {
  // Nettoyage : supprime le rapport de test pour ne pas polluer
  if (fs.existsSync(REPORT_PATH)) fs.unlinkSync(REPORT_PATH);
  if (fs.existsSync(REPORTS_DIR) && fs.readdirSync(REPORTS_DIR).length === 0) {
    fs.rmdirSync(REPORTS_DIR);
  }
});

describe('CASE_ARCH_1023_production_systematique_rapport_markdown_audit_conformite', () => {
  it('génère le fichier reports/arch-compliance-report.md après exécution', () => {
    const input: ReportInput = {
      violations: [],
      scannedFilesCount: 10,
    };

    generateAndWriteReport(REPORT_PATH, input);

    expect(fs.existsSync(REPORT_PATH)).toBe(true);
  });

  it('crée automatiquement le dossier reports/ s\'il n\'existe pas', () => {
    // Supprime le dossier s'il existe
    if (fs.existsSync(REPORTS_DIR)) {
      fs.rmSync(REPORTS_DIR, { recursive: true });
    }

    const input: ReportInput = { violations: [], scannedFilesCount: 5 };
    generateAndWriteReport(REPORT_PATH, input);

    expect(fs.existsSync(REPORTS_DIR)).toBe(true);
    expect(fs.existsSync(REPORT_PATH)).toBe(true);
  });

  it('génère un fichier en Markdown valide (commence par #)', () => {
    const input: ReportInput = { violations: [], scannedFilesCount: 3 };
    generateAndWriteReport(REPORT_PATH, input);

    const content = fs.readFileSync(REPORT_PATH, 'utf-8');
    expect(content.startsWith('#')).toBe(true);
  });

  it('inclut la date d\'exécution dans le rapport', () => {
    const input: ReportInput = {
      violations: [],
      scannedFilesCount: 0,
      executionDate: new Date('2026-08-18T10:00:00'),
    };
    generateAndWriteReport(REPORT_PATH, input);

    const content = fs.readFileSync(REPORT_PATH, 'utf-8');
    expect(content).toContain('2026-08-18');
  });

  it('inclut le nombre de fichiers scannés dans le rapport', () => {
    const input: ReportInput = { violations: [], scannedFilesCount: 42 };
    generateAndWriteReport(REPORT_PATH, input);

    const content = fs.readFileSync(REPORT_PATH, 'utf-8');
    expect(content).toContain('42');
  });
});
