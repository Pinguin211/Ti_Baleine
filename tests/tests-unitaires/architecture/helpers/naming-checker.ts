/**
 * naming-checker.ts
 *
 * Validation des conventions de nommage SPEC-ARCH-01 (CASE-ARCH-1007 à 1009).
 * - Symboles de code : camelCase, PascalCase, UPPER_SNAKE_CASE
 * - Fichiers sources : kebab-case.ts / .tsx
 * - Dossiers sous src/ : kebab-case
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { Project, SyntaxKind } from 'ts-morph';

// ─── Patterns de casse ────────────────────────────────────────────────────────

const KEBAB_CASE = /^[a-z0-9]+(-[a-z0-9]+)*(\.[a-z0-9]+)*$/;
const CAMEL_CASE = /^[a-z][a-zA-Z0-9]*$/;
const PASCAL_CASE = /^[A-Z][a-zA-Z0-9]*$/;
const UPPER_SNAKE_CASE = /^[A-Z][A-Z0-9]*(_[A-Z0-9]+)*$/;
const DIR_KEBAB_CASE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export function isKebabCase(name: string): boolean {
  return KEBAB_CASE.test(name);
}

export function isCamelCase(name: string): boolean {
  return CAMEL_CASE.test(name);
}

export function isPascalCase(name: string): boolean {
  return PASCAL_CASE.test(name);
}

export function isUpperSnakeCase(name: string): boolean {
  return UPPER_SNAKE_CASE.test(name);
}

export function isDirKebabCase(name: string): boolean {
  return DIR_KEBAB_CASE.test(name);
}

// ─── Violation de nommage ─────────────────────────────────────────────────────

export interface NamingViolation {
  name: string;
  kind: string;
  expected: string;
  actual: string;
  line?: number;
}

// ─── Validation des symboles de code ─────────────────────────────────────────

/**
 * CASE-ARCH-1007 : Vérifie les conventions de nommage des symboles dans un fichier TypeScript.
 */
export function checkSymbolNaming(sourceCode: string, fileName = 'fixture.ts'): NamingViolation[] {
  const project = new Project({ useInMemoryFileSystem: true });
  const sourceFile = project.createSourceFile(fileName, sourceCode);
  const violations: NamingViolation[] = [];

  // Fonctions et méthodes → camelCase
  for (const fn of sourceFile.getFunctions()) {
    const name = fn.getName();
    if (!name) continue;
    if (!isCamelCase(name)) {
      violations.push({
        name,
        kind: 'function',
        expected: 'camelCase',
        actual: name,
        line: fn.getStartLineNumber(),
      });
    }
  }

  // Variables → camelCase (hors constantes globales)
  for (const varStmt of sourceFile.getVariableStatements()) {
    for (const decl of varStmt.getDeclarations()) {
      const name = decl.getName();
      const isConst = varStmt.getDeclarationKind() === 'const';
      const isGlobalConst = isConst && UPPER_SNAKE_CASE.test(name);

      // Constante globale UPPER_SNAKE_CASE → valide
      if (isGlobalConst) continue;
      // Arrow function → camelCase
      if (!isCamelCase(name)) {
        violations.push({
          name,
          kind: 'variable',
          expected: 'camelCase',
          actual: name,
          line: decl.getStartLineNumber(),
        });
      }
    }
  }

  // Classes → PascalCase
  for (const cls of sourceFile.getClasses()) {
    const name = cls.getName();
    if (!name) continue;
    if (!isPascalCase(name)) {
      violations.push({
        name,
        kind: 'class',
        expected: 'PascalCase',
        actual: name,
        line: cls.getStartLineNumber(),
      });
    }
  }

  // Interfaces → PascalCase
  for (const iface of sourceFile.getInterfaces()) {
    const name = iface.getName();
    if (!isPascalCase(name)) {
      violations.push({
        name,
        kind: 'interface',
        expected: 'PascalCase',
        actual: name,
        line: iface.getStartLineNumber(),
      });
    }
  }

  // Types → PascalCase
  for (const typeAlias of sourceFile.getTypeAliases()) {
    const name = typeAlias.getName();
    if (!isPascalCase(name)) {
      violations.push({
        name,
        kind: 'type',
        expected: 'PascalCase',
        actual: name,
        line: typeAlias.getStartLineNumber(),
      });
    }
  }

  // Enums → PascalCase
  for (const enumDecl of sourceFile.getEnums()) {
    const name = enumDecl.getName();
    if (!isPascalCase(name)) {
      violations.push({
        name,
        kind: 'enum',
        expected: 'PascalCase',
        actual: name,
        line: enumDecl.getStartLineNumber(),
      });
    }
  }

  return violations;
}

// ─── Validation des noms de fichiers ─────────────────────────────────────────

/**
 * CASE-ARCH-1008 : Vérifie que le nom d'un fichier source est en kebab-case.
 * Accepte les patterns spéciaux Next.js : page.tsx, layout.tsx, etc.
 */
export function isFileNameKebabCase(filePath: string): boolean {
  const basename = path.basename(filePath);
  // Retirer l'extension pour la validation
  const withoutExt = basename.replace(/\.(ts|tsx|js|jsx)$/, '');
  // Autoriser les points dans le nom (ex: slot.service.ts)
  const segments = withoutExt.split('.');
  return segments.every((seg) => KEBAB_CASE.test(seg) || /^[a-z0-9]+(-[a-z0-9]+)*$/.test(seg));
}

/**
 * Scanne récursivement un dossier et retourne les fichiers dont le nom n'est pas kebab-case.
 */
export function checkFileNaming(srcDir: string): string[] {
  const violations: string[] = [];

  if (!fs.existsSync(srcDir)) return violations;

  function walk(dir: string): void {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
        if (!isFileNameKebabCase(entry.name)) {
          violations.push(fullPath);
        }
      }
    }
  }

  walk(srcDir);
  return violations;
}

// ─── Validation des noms de dossiers ─────────────────────────────────────────

/**
 * CASE-ARCH-1009 : Scanne récursivement un dossier src/ et retourne les dossiers
 * dont le nom n'est pas kebab-case.
 */
export function checkDirNaming(srcDir: string): string[] {
  const violations: string[] = [];

  if (!fs.existsSync(srcDir)) return violations;

  function walk(dir: string): void {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      // Ignorer les dossiers système
      if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;

      if (!isDirKebabCase(entry.name)) {
        violations.push(path.join(dir, entry.name));
      }
      walk(path.join(dir, entry.name));
    }
  }

  walk(srcDir);
  return violations;
}
