/**
 * ast-analyzer.ts
 *
 * Analyse statique de fichiers TypeScript/JavaScript via ts-morph.
 * Utilisé par les tests SPEC-ARCH-01 (CASE-ARCH-1000 à 1005, 1021, 1022).
 */

import { Project, SourceFile, SyntaxKind } from 'ts-morph';

// ─── Types publics ────────────────────────────────────────────────────────────

export interface FunctionViolation {
  functionName: string;
  usefulLines: number;
  hasExemption: boolean;
  exemptionReason: string | null;
  lineStart: number;
}

export interface FileAnalysisResult {
  totalLines: number;
  hasFileExemption: boolean;
  fileExemptionReason: string | null;
  fileExemptionIsAtHeader: boolean;
  functions: FunctionViolation[];
  reactFunctionCount: number;
}

// ─── Helpers internes ─────────────────────────────────────────────────────────

/**
 * Compte les lignes utiles dans un extrait de code source.
 * Exclut : lignes vides, commentaires (// et /* *\/), accolades seules,
 *          déclarations de types purs (type Foo = ...) et interfaces.
 */
function countUsefulLinesInText(text: string): number {
  const lines = text.split('\n');
  let count = 0;
  let inBlockComment = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Gestion des commentaires multi-lignes
    if (inBlockComment) {
      if (trimmed.includes('*/')) inBlockComment = false;
      continue;
    }
    if (trimmed.startsWith('/**') || trimmed.startsWith('/*')) {
      if (!trimmed.includes('*/')) inBlockComment = true;
      continue;
    }

    // Ignorer : vide, accolades seules, commentaires inline, types, interfaces
    if (trimmed === '') continue;
    if (trimmed === '{' || trimmed === '}') continue;
    if (trimmed.startsWith('//')) continue;
    if (trimmed.startsWith('*')) continue;
    if (/^type\s+\w+\s*(<[^>]*>)?\s*=/.test(trimmed)) continue;
    if (/^interface\s+\w+/.test(trimmed)) continue;

    count++;
  }

  return count;
}

/**
 * Extrait le contenu du bloc JSDoc/TSDoc placé immédiatement avant un nœud
 * (en recherchant les commentaires dans le texte précédant le nœud).
 */
function getLeadingJsDocText(sourceFile: SourceFile, nodeStart: number): string {
  const fullText = sourceFile.getFullText();
  // Cherche le texte précédant le nœud
  const beforeNode = fullText.substring(0, nodeStart);
  // Cherche le dernier bloc de commentaire /** ... */
  const lastDocBlock = beforeNode.lastIndexOf('/**');
  if (lastDocBlock === -1) return '';
  const endBlock = beforeNode.indexOf('*/', lastDocBlock);
  if (endBlock === -1) return '';
  return beforeNode.substring(lastDocBlock, endBlock + 2);
}

/**
 * Extrait le motif d'une balise @need_more_lines depuis un texte de commentaire.
 * Retourne :
 *   - la chaîne du motif si valide
 *   - '' si le tag est présent mais sans motif
 *   - null si le tag est absent
 */
function extractNeedMoreLinesReason(commentText: string): string | null {
  if (!commentText.includes('@need_more_lines')) return null;
  // Cherche @need_more_lines - "motif"
  const match = commentText.match(/@need_more_lines\s*-\s*"([^"]*)"/);
  if (match) return match[1]; // Peut être '' si motif vide
  // Tag présent mais sans motif entre guillemets
  return '';
}

// ─── API publique ─────────────────────────────────────────────────────────────

/**
 * Crée un projet ts-morph en mémoire à partir d'un contenu de fichier.
 */
export function createInMemorySourceFile(
  content: string,
  fileName = 'fixture.ts',
): SourceFile {
  const project = new Project({ useInMemoryFileSystem: true });
  return project.createSourceFile(fileName, content);
}

/**
 * Analyse un SourceFile ts-morph et retourne les métriques de conformité SPEC-ARCH-01.
 */
export function analyzeSourceFile(sourceFile: SourceFile): FileAnalysisResult {
  const fullText = sourceFile.getFullText();
  const totalLines = fullText.split('\n').length;

  // ── Dérogation fichier : cherche @need_more_lines dans les premiers commentaires ──
  const firstDocStart = fullText.indexOf('/**');
  const firstDocEnd = firstDocStart !== -1 ? fullText.indexOf('*/', firstDocStart) : -1;
  let fileExemptionReason: string | null = null;
  let fileExemptionIsAtHeader = false;

  if (firstDocStart !== -1 && firstDocEnd !== -1) {
    const headerComment = fullText.substring(firstDocStart, firstDocEnd + 2);
    const reason = extractNeedMoreLinesReason(headerComment);
    if (reason !== null) {
      fileExemptionReason = reason;
      // Valide uniquement si le bloc est en tout début de fichier (avant tout code)
      const beforeComment = fullText.substring(0, firstDocStart).trim();
      fileExemptionIsAtHeader = beforeComment === '';
    }
  }

  // ── Analyse des fonctions ──────────────────────────────────────────────────
  const functions: FunctionViolation[] = [];

  // Collecte toutes les déclarations de fonctions (top-level et méthodes)
  const fnDeclarations = [
    ...sourceFile.getFunctions(),
    ...sourceFile.getClasses().flatMap((c) => c.getMethods()),
  ];

  for (const fn of fnDeclarations) {
    const body = fn.getBody();
    if (!body) continue;

    const bodyText = body.getText();
    const usefulLines = countUsefulLinesInText(bodyText);

    // Cherche la dérogation TSDoc précédant la fonction
    let leadingDoc = '';
    if ('getJsDocs' in fn && typeof (fn as any).getJsDocs === 'function') {
      const docs = (fn as any).getJsDocs();
      if (docs.length > 0) {
        leadingDoc = docs.map((d: any) => d.getText()).join('\n');
      }
    }
    if (!leadingDoc && 'getLeadingCommentRanges' in fn && typeof (fn as any).getLeadingCommentRanges === 'function') {
      const ranges = (fn as any).getLeadingCommentRanges();
      if (ranges.length > 0) {
        leadingDoc = ranges.map((r: any) => r.getText()).join('\n');
      }
    }
    const reason = extractNeedMoreLinesReason(leadingDoc);

    const fnName =
      'getName' in fn && typeof fn.getName === 'function'
        ? (fn.getName() ?? '<anonymous>')
        : '<anonymous>';

    functions.push({
      functionName: fnName,
      usefulLines,
      hasExemption: reason !== null,
      exemptionReason: reason,
      lineStart: fn.getStartLineNumber(),
    });
  }

  // ── Composants React : compte les déclarations de fonctions dans .tsx ──────
  const isJsx = sourceFile.getFilePath().endsWith('.tsx') ||
    sourceFile.getFilePath().endsWith('.jsx');

  let reactFunctionCount = 0;
  if (isJsx) {
    // Compte les fonctions de premier niveau (exportées ou non)
    reactFunctionCount = sourceFile.getChildrenOfKind(SyntaxKind.FunctionDeclaration).length
      + sourceFile.getChildrenOfKind(SyntaxKind.VariableStatement).filter((vs) => {
          const decl = vs.getDeclarations()[0];
          if (!decl) return false;
          const init = decl.getInitializer();
          return (
            init?.getKind() === SyntaxKind.ArrowFunction ||
            init?.getKind() === SyntaxKind.FunctionExpression
          );
        }).length;
  }

  return {
    totalLines,
    hasFileExemption: fileExemptionReason !== null,
    fileExemptionReason,
    fileExemptionIsAtHeader,
    functions,
    reactFunctionCount,
  };
}

/**
 * Vérifie la conformité SPEC-ARCH-01 d'un SourceFile et retourne les violations.
 */
export interface ArchViolation {
  type: 'function_too_long' | 'no_exemption_reason' | 'file_too_long' | 'multi_function_tsx' | 'exemption_not_at_header';
  detail: string;
  line?: number;
}

export function checkArch01Compliance(
  sourceFile: SourceFile,
  maxFunctionLines = 30,
  maxFileLines = 500,
): ArchViolation[] {
  const result = analyzeSourceFile(sourceFile);
  const violations: ArchViolation[] = [];
  const isJsx = sourceFile.getFilePath().endsWith('.tsx') || sourceFile.getFilePath().endsWith('.jsx');

  // Règle 3 : plafond global de fichier
  if (result.totalLines > maxFileLines) {
    if (!result.hasFileExemption) {
      violations.push({
        type: 'file_too_long',
        detail: `Fichier dépasse ${maxFileLines} lignes (${result.totalLines}) sans dérogation @need_more_lines en en-tête.`,
      });
    } else if (!result.fileExemptionIsAtHeader) {
      violations.push({
        type: 'exemption_not_at_header',
        detail: `@need_more_lines présent mais non positionné en en-tête de fichier (doit être le premier bloc TSDoc).`,
      });
    } else if (result.fileExemptionReason === '') {
      violations.push({
        type: 'no_exemption_reason',
        detail: `@need_more_lines présent en en-tête mais sans motif explicite entre guillemets.`,
      });
    }
  }

  // Règle 2 : mono-composant par .tsx
  if (isJsx && result.reactFunctionCount > 1) {
    violations.push({
      type: 'multi_function_tsx',
      detail: `Fichier .tsx contient ${result.reactFunctionCount} fonctions/composants (max : 1).`,
    });
  }

  // Règle 1 : plafond par fonction dans les .ts/.js
  if (!isJsx) {
    for (const fn of result.functions) {
      if (fn.usefulLines > maxFunctionLines) {
        if (!fn.hasExemption) {
          violations.push({
            type: 'function_too_long',
            detail: `Fonction "${fn.functionName}" : ${fn.usefulLines} lignes utiles (max : ${maxFunctionLines}) sans @need_more_lines.`,
            line: fn.lineStart,
          });
        } else if (fn.exemptionReason === '') {
          violations.push({
            type: 'no_exemption_reason',
            detail: `Fonction "${fn.functionName}" : @need_more_lines présent mais sans motif explicite.`,
            line: fn.lineStart,
          });
        }
      }
    }
  }

  return violations;
}
