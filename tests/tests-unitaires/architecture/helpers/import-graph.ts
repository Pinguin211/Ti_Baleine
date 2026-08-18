/**
 * import-graph.ts
 *
 * Analyse du graphe d'imports entre modules de src/.
 * Utilisé par les tests SPEC-ARCH-02 (CASE-ARCH-1010 à 1020).
 */

import * as path from 'node:path';

// ─── Types publics ────────────────────────────────────────────────────────────

/** Module interne identifié dans la matrice SPEC-ARCH-02 */
export type InternalModule =
  | 'config'
  | 'utils'
  | 'schemas'
  | 'env/client'
  | 'env/server'
  | 'lib/client'
  | 'lib/server'
  | 'lib'
  | 'services/client'
  | 'services/server'
  | 'services'
  | 'hooks'
  | 'actions'
  | 'components'
  | 'app'
  | 'external';

export interface FileNode {
  /** Chemin relatif depuis src/, ex: "config/constants.ts" */
  path: string;
  /** Chemins importés (tels qu'écrits dans le fichier, relatifs ou alias @/) */
  imports: string[];
  /** true si le fichier contient la directive "use client" */
  isClientComponent?: boolean;
}

export interface ImportViolation {
  fromFile: string;
  toModule: string;
  rule: string;
  specRef: string;
  caseRef: string;
}

// ─── Résolution de module ─────────────────────────────────────────────────────

/**
 * Détermine la catégorie de module interne depuis un chemin d'import et
 * le fichier source.
 * Retourne 'external' pour les packages node_modules.
 */
export function resolveModule(importPath: string, fromFilePath: string): InternalModule {
  // Package externe
  if (!importPath.startsWith('.') && !importPath.startsWith('@/') && !importPath.startsWith('src/')) {
    return 'external';
  }

  // Résoudre le chemin relatif à partir de src/
  let resolved: string;
  if (importPath.startsWith('@/')) {
    resolved = importPath.slice(2); // @/ = src/
  } else if (importPath.startsWith('src/')) {
    resolved = importPath.slice(4);
  } else {
    // Chemin relatif : résoudre depuis le répertoire du fichier source
    const fromDir = path.dirname(fromFilePath);
    resolved = path.join(fromDir, importPath).replace(/\\/g, '/');
    // Normaliser pour retirer le préfixe src/ si présent
    if (resolved.startsWith('src/')) resolved = resolved.slice(4);
  }

  return classifyPath(resolved);
}

function classifyPath(resolvedFromSrc: string): InternalModule {
  const parts = resolvedFromSrc.split('/');
  const first = parts[0];
  const second = parts[1] ?? '';

  switch (first) {
    case 'config': return 'config';
    case 'utils': return 'utils';
    case 'schemas': return 'schemas';
    case 'env':
      if (second.startsWith('server')) return 'env/server';
      if (second.startsWith('client')) return 'env/client';
      return 'env/client'; // fallback
    case 'lib':
      if (second === 'server') return 'lib/server';
      if (second === 'client') return 'lib/client';
      return 'lib';
    case 'services':
      if (second === 'server') return 'services/server';
      if (second === 'client') return 'services/client';
      return 'services';
    case 'hooks': return 'hooks';
    case 'actions': return 'actions';
    case 'components': return 'components';
    case 'app': return 'app';
    default: return 'external';
  }
}

/** Extrait le module de premier niveau d'un path src/ relatif. */
function topLevel(filePath: string): InternalModule {
  return classifyPath(filePath);
}

// ─── Matrice d'autorisations ──────────────────────────────────────────────────

/**
 * Vérifie si un import de `toModule` depuis `fromModule` est autorisé
 * selon la matrice SPEC-ARCH-02.
 */
export function isImportAllowed(from: InternalModule, to: InternalModule): boolean {
  if (to === 'external') return true; // node_modules toujours OK

  const allowed: Record<InternalModule, InternalModule[]> = {
    config: ['external'],
    utils: ['config', 'external'],
    schemas: ['config', 'utils', 'external'],
    'env/client': ['config', 'utils', 'external'],
    'env/server': ['config', 'utils', 'env/client', 'external'],
    'lib/client': ['utils', 'schemas', 'config', 'env/client', 'external'],
    'lib/server': ['utils', 'schemas', 'config', 'env/client', 'env/server', 'external'],
    lib: ['utils', 'schemas', 'config', 'env/client', 'env/server', 'external'],
    'services/client': ['lib/client', 'utils', 'schemas', 'config', 'env/client', 'external'],
    'services/server': ['lib/server', 'lib/client', 'utils', 'schemas', 'config', 'env/client', 'env/server', 'external'],
    services: ['lib', 'lib/client', 'lib/server', 'utils', 'schemas', 'config', 'env/client', 'env/server', 'external'],
    hooks: ['services/client', 'utils', 'schemas', 'config', 'env/client', 'external'],
    actions: ['services/client', 'services/server', 'services', 'utils', 'schemas', 'config', 'env/client', 'env/server', 'external'],
    components: ['hooks', 'actions', 'utils', 'schemas', 'config', 'components', 'external'],
    app: ['components', 'services/server', 'actions', 'env/client', 'env/server', 'schemas', 'external'],
    external: [],
  };

  return (allowed[from] ?? []).includes(to);
}

// ─── Vérifications ciblées (une par CASE) ────────────────────────────────────

/** CASE-ARCH-1010 : config/ n'a aucun import interne */
export function checkConfigIsolation(files: FileNode[]): ImportViolation[] {
  return files
    .filter((f) => f.path.startsWith('config/'))
    .flatMap((f) =>
      f.imports
        .map((imp) => resolveModule(imp, f.path))
        .filter((mod) => mod !== 'external')
        .map((mod) => ({
          fromFile: f.path,
          toModule: mod,
          rule: 'src/config/ ne doit contenir aucun import interne (0 import interne)',
          specRef: 'SPEC-ARCH-02',
          caseRef: 'CASE-ARCH-1010',
        })),
    );
}

/** CASE-ARCH-1011 : utils/ → config seulement ; schemas/ → config + utils, jamais env/ */
export function checkUtilsAndSchemasHierarchy(files: FileNode[]): ImportViolation[] {
  const violations: ImportViolation[] = [];
  for (const f of files) {
    const fromMod = topLevel(f.path);
    for (const imp of f.imports) {
      const toMod = resolveModule(imp, f.path);
      if (toMod === 'external') continue;
      if (!isImportAllowed(fromMod, toMod)) {
        violations.push({
          fromFile: f.path,
          toModule: toMod,
          rule: `${fromMod} n'est pas autorisé à importer ${toMod}`,
          specRef: 'SPEC-ARCH-02',
          caseRef: 'CASE-ARCH-1011',
        });
      }
    }
  }
  return violations;
}

/** CASE-ARCH-1012 : env/client.ts consommateurs autorisés vs interdits */
export function checkEnvClientConsumers(files: FileNode[]): ImportViolation[] {
  const forbidden: InternalModule[] = ['components', 'schemas', 'utils', 'config'];
  return files.flatMap((f) => {
    const fromMod = topLevel(f.path);
    if (!forbidden.includes(fromMod)) return [];
    return f.imports
      .filter((imp) => resolveModule(imp, f.path) === 'env/client')
      .map(() => ({
        fromFile: f.path,
        toModule: 'env/client',
        rule: `${fromMod} n'est pas autorisé à importer env/client directement`,
        specRef: 'SPEC-ARCH-02',
        caseRef: 'CASE-ARCH-1012',
      }));
  });
}

/** CASE-ARCH-1013 : env/server.ts interdit dans hooks/ et modules client/ */
export function checkEnvServerConsumers(files: FileNode[]): ImportViolation[] {
  const forbidden: InternalModule[] = ['hooks', 'services/client', 'lib/client', 'components'];
  return files.flatMap((f) => {
    const fromMod = topLevel(f.path);
    if (!forbidden.includes(fromMod)) return [];
    return f.imports
      .filter((imp) => resolveModule(imp, f.path) === 'env/server')
      .map(() => ({
        fromFile: f.path,
        toModule: 'env/server',
        rule: `${fromMod} est interdit d'importer env/server`,
        specRef: 'SPEC-ARCH-02',
        caseRef: 'CASE-ARCH-1013',
      }));
  });
}

/** CASE-ARCH-1014 : lib/ exclusivement importé par services/ */
export function checkLibEncapsulation(files: FileNode[]): ImportViolation[] {
  const allowed: InternalModule[] = ['services', 'services/client', 'services/server'];
  return files.flatMap((f) => {
    const fromMod = topLevel(f.path);
    if (allowed.includes(fromMod)) return [];
    return f.imports
      .filter((imp) => {
        const to = resolveModule(imp, f.path);
        return to === 'lib' || to === 'lib/client' || to === 'lib/server';
      })
      .map((imp) => ({
        fromFile: f.path,
        toModule: resolveModule(imp, f.path),
        rule: 'lib/ est réservé à services/ uniquement',
        specRef: 'SPEC-ARCH-02',
        caseRef: 'CASE-ARCH-1014',
      }));
  });
}

/** CASE-ARCH-1015 : app/ interdit d'importer lib/ et hooks/ */
export function checkAppPerimeter(files: FileNode[]): ImportViolation[] {
  const forbidden = ['lib', 'lib/client', 'lib/server', 'hooks'] as InternalModule[];
  return files
    .filter((f) => f.path.startsWith('app/'))
    .flatMap((f) =>
      f.imports
        .map((imp) => ({ imp, mod: resolveModule(imp, f.path) }))
        .filter(({ mod }) => forbidden.includes(mod))
        .map(({ mod }) => ({
          fromFile: f.path,
          toModule: mod,
          rule: `app/ interdit d'importer ${mod}`,
          specRef: 'SPEC-ARCH-02',
          caseRef: 'CASE-ARCH-1015',
        })),
    );
}

/** CASE-ARCH-1016 : composant "use client" n'importe pas de modules server-only */
export function checkServerOnlyViolations(files: FileNode[]): ImportViolation[] {
  return files
    .filter((f) => f.isClientComponent)
    .flatMap((f) =>
      f.imports
        .map((imp) => ({ imp, mod: resolveModule(imp, f.path) }))
        .filter(({ mod }) =>
          mod === 'env/server' || mod === 'services/server' || mod === 'lib/server',
        )
        .map(({ mod }) => ({
          fromFile: f.path,
          toModule: mod,
          rule: `Composant "use client" importe un module serveur (${mod}) — violation server-only`,
          specRef: 'SPEC-ARCH-02',
          caseRef: 'CASE-ARCH-1016',
        })),
    );
}

/** CASE-ARCH-1018 : components/ n'importe pas services/ */
export function checkComponentsDoNotImportServices(files: FileNode[]): ImportViolation[] {
  return files
    .filter((f) => f.path.startsWith('components/'))
    .flatMap((f) =>
      f.imports
        .map((imp) => ({ imp, mod: resolveModule(imp, f.path) }))
        .filter(({ mod }) =>
          mod === 'services' || mod === 'services/client' || mod === 'services/server',
        )
        .map(({ mod }) => ({
          fromFile: f.path,
          toModule: mod,
          rule: 'components/ ne doit pas importer services/ directement',
          specRef: 'SPEC-ARCH-02',
          caseRef: 'CASE-ARCH-1018',
        })),
    );
}

/** CASE-ARCH-1019 : hooks/ importé seulement par components/ */
export function checkHooksEncapsulation(files: FileNode[]): ImportViolation[] {
  const allowed: InternalModule[] = ['components'];
  return files.flatMap((f) => {
    const fromMod = topLevel(f.path);
    if (allowed.includes(fromMod)) return [];
    return f.imports
      .filter((imp) => resolveModule(imp, f.path) === 'hooks')
      .map(() => ({
        fromFile: f.path,
        toModule: 'hooks',
        rule: 'hooks/ est réservé à components/ uniquement',
        specRef: 'SPEC-ARCH-02',
        caseRef: 'CASE-ARCH-1019',
      }));
  });
}

/** CASE-ARCH-1020 : actions/ importé seulement par components/ et app/ */
export function checkActionsEncapsulation(files: FileNode[]): ImportViolation[] {
  const allowed: InternalModule[] = ['components', 'app'];
  return files.flatMap((f) => {
    const fromMod = topLevel(f.path);
    if (allowed.includes(fromMod)) return [];
    return f.imports
      .filter((imp) => resolveModule(imp, f.path) === 'actions')
      .map(() => ({
        fromFile: f.path,
        toModule: 'actions',
        rule: 'actions/ réservé à components/ et app/ uniquement',
        specRef: 'SPEC-ARCH-02',
        caseRef: 'CASE-ARCH-1020',
      }));
  });
}

/**
 * Résout le chemin relatif d'un import (depuis la racine src/).
 * Retourne 'external' pour les modules node_modules.
 */
export function resolveImportPath(importPath: string, fromFilePath: string): string {
  if (!importPath.startsWith('.') && !importPath.startsWith('@/') && !importPath.startsWith('src/')) {
    return 'external';
  }
  let resolved: string;
  if (importPath.startsWith('@/')) {
    resolved = importPath.slice(2);
  } else if (importPath.startsWith('src/')) {
    resolved = importPath.slice(4);
  } else {
    const fromDir = path.dirname(fromFilePath);
    resolved = path.join(fromDir, importPath).replace(/\\/g, '/');
    if (resolved.startsWith('src/')) resolved = resolved.slice(4);
  }
  return resolved;
}

/**
 * CASE-ARCH-1017 : détecte les dépendances circulaires dans le graphe d'imports.
 * Retourne un tableau de cycles, chaque cycle étant une liste de chemins de fichiers.
 */
export function detectCircularDeps(files: FileNode[]): string[][] {
  // Normalise un chemin de fichier (sans extension)
  const norm = (p: string) => p.replace(/\.(ts|tsx|js|jsx)$/, '');

  // Indexe les fichiers par chemin normalisé
  const fileMap = new Map<string, string>();
  for (const f of files) {
    fileMap.set(norm(f.path), f.path);
  }

  const graph = new Map<string, string[]>();
  for (const f of files) {
    const targets: string[] = [];
    for (const imp of f.imports) {
      const resolved = resolveImportPath(imp, f.path);
      if (resolved === 'external') continue;
      const targetPath = fileMap.get(norm(resolved)) ?? resolved;
      targets.push(targetPath);
    }
    graph.set(f.path, targets);
  }

  const cycles: string[][] = [];
  const visited = new Set<string>();
  const stack = new Set<string>();

  function dfs(node: string, currentPath: string[]): void {
    if (stack.has(node)) {
      const cycleStart = currentPath.indexOf(node);
      if (cycleStart !== -1) {
        cycles.push([...currentPath.slice(cycleStart), node]);
      } else {
        cycles.push([...currentPath, node]);
      }
      return;
    }
    if (visited.has(node)) return;
    visited.add(node);
    stack.add(node);
    for (const neighbor of graph.get(node) ?? []) {
      dfs(neighbor, [...currentPath, node]);
    }
    stack.delete(node);
  }

  for (const f of files) {
    if (!visited.has(f.path)) dfs(f.path, []);
  }

  return cycles;
}
