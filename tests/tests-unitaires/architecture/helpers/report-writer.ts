/**
 * report-writer.ts
 *
 * Génération du rapport Markdown d'audit de conformité architecturale.
 * Utilisé par les tests SPEC-ARCH-03 (CASE-ARCH-1023 à 1027).
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

// ─── Types publics ────────────────────────────────────────────────────────────

export interface ReportViolation {
  filePath: string;
  line?: number;
  spec: 'SPEC-ARCH-01' | 'SPEC-ARCH-02';
  caseId: string;
  detail: string;
}

export interface ReportInput {
  violations: ReportViolation[];
  scannedFilesCount: number;
  executionDate?: Date;
}

export interface ReportContent {
  raw: string;
  isConform: boolean;
  violationCount: number;
  spec01Count: number;
  spec02Count: number;
}

// ─── Génération du rapport ────────────────────────────────────────────────────

/**
 * Génère le rapport Markdown au format SPEC-ARCH-03.
 */
export function generateReport(input: ReportInput): ReportContent {
  const { violations, scannedFilesCount, executionDate = new Date() } = input;
  const isConform = violations.length === 0;
  const spec01Count = violations.filter((v) => v.spec === 'SPEC-ARCH-01').length;
  const spec02Count = violations.filter((v) => v.spec === 'SPEC-ARCH-02').length;

  const dateStr = executionDate.toISOString().replace('T', ' ').substring(0, 19);
  const statusIcon = isConform ? '🟢' : '🔴';
  const statusText = isConform
    ? `${statusIcon} CONFORME (0 violation)`
    : `${statusIcon} ÉCHEC (${violations.length} violation(s) détectée(s))`;

  const spec01Status = spec01Count === 0 ? '🟢 Conforme' : '🔴 Échec';
  const spec02Status = spec02Count === 0 ? '🟢 Conforme' : '🔴 Échec';

  // ── En-tête ──────────────────────────────────────────────────────────────────
  let report = `# Rapport d'Audit — Conformité Architecture & Qualité (\`ARCH\`)

- **Date d'exécution :** ${dateStr}
- **Statut global :** ${statusText}
- **Fichiers scannés :** ${scannedFilesCount} fichiers

---

## 1. Synthèse par Spécification

| Spécification | Intitulé | Statut | Nombre d'infractions |
|---|---|---|---|
| **\`SPEC-ARCH-01\`** | Règles de codage, volumétrie et nommage | ${spec01Status} | ${spec01Count} |
| **\`SPEC-ARCH-02\`** | Arborescence, étanchéité & flux d'imports | ${spec02Status} | ${spec02Count} |

---

## 2. Répertoire des Fichiers en Infraction

`;

  // ── Corps : violations par fichier ───────────────────────────────────────────
  if (isConform) {
    report += '> ✅ Aucune infraction détectée — la base de code est entièrement conforme.\n';
  } else {
    // Regrouper par fichier
    const byFile = new Map<string, ReportViolation[]>();
    for (const v of violations) {
      const existing = byFile.get(v.filePath) ?? [];
      existing.push(v);
      byFile.set(v.filePath, existing);
    }

    for (const [filePath, fileViolations] of byFile) {
      report += `### 📁 \`${filePath}\`\n`;
      for (const v of fileViolations) {
        report += `- **Règle transgressée :** \`${v.spec}\`\n`;
        report += `- **Cas de test associé :** \`${v.caseId}\`\n`;
        if (v.line !== undefined) {
          report += `- **Localisation :** Ligne ${v.line}\n`;
        }
        report += `- **Détail de l'erreur :** ${v.detail}\n`;
        report += '\n';
      }
    }
  }

  return {
    raw: report,
    isConform,
    violationCount: violations.length,
    spec01Count,
    spec02Count,
  };
}

/**
 * Écrit le rapport Markdown sur le disque, en créant le dossier parent si nécessaire.
 */
export function writeReport(outputPath: string, content: ReportContent): void {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(outputPath, content.raw, 'utf-8');

  // Injection CI : si $GITHUB_STEP_SUMMARY est défini
  const summaryPath = process.env['GITHUB_STEP_SUMMARY'];
  if (summaryPath) {
    fs.appendFileSync(summaryPath, content.raw, 'utf-8');
  }
}

/**
 * Raccourci : génère et écrit le rapport en une seule opération.
 */
export function generateAndWriteReport(
  outputPath: string,
  input: ReportInput,
): ReportContent {
  const content = generateReport(input);
  writeReport(outputPath, content);
  return content;
}
