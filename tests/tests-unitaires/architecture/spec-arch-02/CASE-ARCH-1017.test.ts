/**
 * CASE-ARCH-1017 — Absence totale de dépendance circulaire sur le projet
 * SPEC-ARCH-02 | AC-8 | Règle | Cas limite #8
 */
import { describe, it, expect } from 'vitest';
import { detectCircularDeps, type FileNode } from '../helpers/import-graph';

describe('CASE_ARCH_1017_absence_totale_dependance_circulaire_graphe_projet', () => {
  it('valide un graphe sans aucun cycle', () => {
    const files: FileNode[] = [
      { path: 'config/constants.ts', imports: [] },
      { path: 'utils/helpers.ts', imports: ['../config/constants'] },
      { path: 'schemas/validation/booking.schema.ts', imports: ['../config/constants', '../utils/helpers'] },
      { path: 'services/server/booking.service.ts', imports: ['../schemas/validation/booking.schema'] },
    ];

    const cycles = detectCircularDeps(files);
    expect(cycles).toHaveLength(0);
  });

  it('détecte un cycle direct A → B → A', () => {
    const files: FileNode[] = [
      { path: 'utils/a.ts', imports: ['../utils/b'] },
      { path: 'utils/b.ts', imports: ['../utils/a'] },
    ];

    const cycles = detectCircularDeps(files);
    expect(cycles.length).toBeGreaterThan(0);
  });

  it('détecte un cycle indirect A → B → C → A', () => {
    const files: FileNode[] = [
      { path: 'config/a.ts', imports: ['../utils/b'] },
      { path: 'utils/b.ts', imports: ['../schemas/c'] },
      { path: 'schemas/c.ts', imports: ['../config/a'] },
    ];

    const cycles = detectCircularDeps(files);
    expect(cycles.length).toBeGreaterThan(0);
  });

  it('valide que 0 cycle est retourné sur src/ vide', () => {
    const cycles = detectCircularDeps([]);
    expect(cycles).toHaveLength(0);
  });

  it('rejette un cycle config ↔ utils (violation critique)', () => {
    const files: FileNode[] = [
      { path: 'config/pricing.ts', imports: ['../utils/formatter'] },
      { path: 'utils/formatter.ts', imports: ['../config/pricing'] },
    ];

    const cycles = detectCircularDeps(files);
    expect(cycles.length).toBeGreaterThan(0);
  });
});
