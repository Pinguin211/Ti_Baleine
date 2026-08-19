/**
 * scripts/arch-audit.ts
 *
 * Script d'audit de conformité architecturale et de génération de rapport.
 * Scanne l'ensemble du code sous src/ et produit reports/arch-compliance-report.md.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { Project } from 'ts-morph';
import {
  checkArch01Compliance,
  type ArchViolation,
} from '../tests/tests-unitaires/architecture/helpers/ast-analyzer.ts';
import {
  checkFileNaming,
  checkDirNaming,
  checkSymbolNaming,
} from '../tests/tests-unitaires/architecture/helpers/naming-checker.ts';
import {
  type FileNode,
  checkConfigIsolation,
  checkUtilsAndSchemasHierarchy,
  checkEnvClientConsumers,
  checkEnvServerConsumers,
  checkLibEncapsulation,
  checkAppPerimeter,
  checkServerOnlyViolations,
  checkComponentsDoNotImportServices,
  checkHooksEncapsulation,
  checkActionsEncapsulation,
  detectCircularDeps,
} from '../tests/tests-unitaires/architecture/helpers/import-graph.ts';
import {
  generateAndWriteReport,
  type ReportViolation,
  type ReportInput,
} from '../tests/tests-unitaires/architecture/helpers/report-writer.ts';

const ROOT_DIR = process.cwd();
const SRC_DIR = path.resolve(ROOT_DIR, 'src');
const REPORT_PATH = path.resolve(ROOT_DIR, 'reports/arch-compliance-report.md');

export function runArchAudit(srcDir = SRC_DIR, reportPath = REPORT_PATH) {
  const violations: ReportViolation[] = [];
  let scannedFilesCount = 0;

  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true });
  }

  // 1. Initialiser le projet ts-morph
  const project = new Project();
  const pattern = path.join(srcDir, '**/*.{ts,tsx,js,jsx}');
  project.addSourceFilesAtPaths(pattern);
  const sourceFiles = project.getSourceFiles();
  scannedFilesCount = sourceFiles.length;

  // 2. SPEC-ARCH-01 — Volumétrie, mono-composant et TSDoc
  for (const sf of sourceFiles) {
    const relPath = path.relative(ROOT_DIR, sf.getFilePath()).replace(/\\/g, '/');
    const arch01Violations = checkArch01Compliance(sf);

    for (const v of arch01Violations) {
      let caseId = 'CASE-ARCH-1000';
      if (v.type === 'no_exemption_reason') caseId = v.line ? 'CASE-ARCH-1001' : 'CASE-ARCH-1005';
      else if (v.type === 'file_too_long') caseId = 'CASE-ARCH-1004';
      else if (v.type === 'multi_function_tsx') caseId = 'CASE-ARCH-1003';
      else if (v.type === 'exemption_not_at_header') caseId = 'CASE-ARCH-1021';

      violations.push({
        filePath: relPath,
        line: v.line,
        spec: 'SPEC-ARCH-01',
        caseId,
        detail: v.detail,
      });
    }

    // Conventions de nommage des symboles internes (CASE-ARCH-1007)
    const symbolViolations = checkSymbolNaming(sf.getFullText(), sf.getFilePath());
    for (const sv of symbolViolations) {
      violations.push({
        filePath: relPath,
        line: sv.line,
        spec: 'SPEC-ARCH-01',
        caseId: 'CASE-ARCH-1007',
        detail: `Symbole "${sv.name}" (${sv.kind}) doit respecter ${sv.expected}, reçu : "${sv.actual}".`,
      });
    }
  }

  // 3. SPEC-ARCH-01 — Nommage des fichiers (CASE-ARCH-1008) et dossiers (CASE-ARCH-1009)
  const fileNamingViolations = checkFileNaming(srcDir);
  for (const f of fileNamingViolations) {
    const relPath = path.relative(ROOT_DIR, f).replace(/\\/g, '/');
    violations.push({
      filePath: relPath,
      spec: 'SPEC-ARCH-01',
      caseId: 'CASE-ARCH-1008',
      detail: `Nom de fichier "${path.basename(f)}" non conforme à la convention kebab-case.`,
    });
  }

  const dirNamingViolations = checkDirNaming(srcDir);
  for (const d of dirNamingViolations) {
    const relPath = path.relative(ROOT_DIR, d).replace(/\\/g, '/');
    violations.push({
      filePath: relPath,
      spec: 'SPEC-ARCH-01',
      caseId: 'CASE-ARCH-1009',
      detail: `Nom de dossier "${path.basename(d)}" non conforme à la convention kebab-case.`,
    });
  }

  // 4. SPEC-ARCH-02 — Extraction du graphe d'imports
  const fileNodes: FileNode[] = sourceFiles.map((sf) => {
    const relFromSrc = path.relative(srcDir, sf.getFilePath()).replace(/\\/g, '/');
    const fullText = sf.getFullText();
    const isClientComponent =
      fullText.includes('"use client"') || fullText.includes("'use client'");

    // Collecte de tous les imports et exports ré-exportant
    const imports = [
      ...sf.getImportDeclarations().map((id) => id.getModuleSpecifierValue()),
      ...sf
        .getExportDeclarations()
        .filter((ed) => ed.hasModuleSpecifier())
        .map((ed) => ed.getModuleSpecifierValue()!),
    ];

    return {
      path: relFromSrc,
      imports,
      isClientComponent,
    };
  });

  // Vérifications SPEC-ARCH-02
  const arch02Checkers = [
    checkConfigIsolation,
    checkUtilsAndSchemasHierarchy,
    checkEnvClientConsumers,
    checkEnvServerConsumers,
    checkLibEncapsulation,
    checkAppPerimeter,
    checkServerOnlyViolations,
    checkComponentsDoNotImportServices,
    checkHooksEncapsulation,
    checkActionsEncapsulation,
  ];

  for (const checker of arch02Checkers) {
    const checkViolations = checker(fileNodes);
    for (const cv of checkViolations) {
      const relPath = path.join('src', cv.fromFile).replace(/\\/g, '/');
      violations.push({
        filePath: relPath,
        spec: 'SPEC-ARCH-02',
        caseId: cv.caseRef,
        detail: cv.rule,
      });
    }
  }

  // Dépendances circulaires (CASE-ARCH-1017)
  const circularCycles = detectCircularDeps(fileNodes);
  for (const cycle of circularCycles) {
    const firstFile = path.join('src', cycle[0]).replace(/\\/g, '/');
    violations.push({
      filePath: firstFile,
      spec: 'SPEC-ARCH-02',
      caseId: 'CASE-ARCH-1017',
      detail: `Dépendance circulaire détectée : ${cycle.map((p) => path.join('src', p)).join(' -> ')}`,
    });
  }

  // 5. Générer et écrire le rapport Markdown
  const reportInput: ReportInput = {
    violations,
    scannedFilesCount,
    executionDate: new Date(),
  };

  const content = generateAndWriteReport(reportPath, reportInput);

  // 6. Affichage console
  console.log('\n============================================================');
  console.log(" Rapport d'Audit — Conformité Architecture & Qualité (ARCH)");
  console.log('============================================================');
  console.log(` Statut : ${content.isConform ? '🟢 CONFORME' : '🔴 ÉCHEC'}`);
  console.log(` Fichiers scannés : ${scannedFilesCount}`);
  console.log(` Violations SPEC-ARCH-01 : ${content.spec01Count}`);
  console.log(` Violations SPEC-ARCH-02 : ${content.spec02Count}`);
  console.log(` Total violations : ${content.violationCount}`);
  console.log(` Rapport écrit dans : ${path.relative(ROOT_DIR, reportPath)}`);
  console.log('============================================================\n');

  return {
    isConform: content.isConform,
    violationCount: content.violationCount,
    reportPath,
  };
}

// Exécution directe en CLI
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('arch-audit.ts')) {
  const result = runArchAudit();
  if (!result.isConform) {
    process.exit(1);
  }
}
