/**
 * CASE-ARCH-1010 — Isolation stricte du dossier src/config/
 * SPEC-ARCH-02 | AC-1 | Matrice d'import | Cas limite #1
 */
import { describe, it, expect } from 'vitest';
import { checkConfigIsolation, type FileNode } from '../helpers/import-graph';

describe('CASE_ARCH_1010_isolation_stricte_config_zero_import_interne', () => {
  it('valide config/ sans aucun import interne', () => {
    const files: FileNode[] = [
      { path: 'config/pricing.constants.ts', imports: ['some-external-lib'] },
      { path: 'config/app.constants.ts', imports: [] },
    ];

    const violations = checkConfigIsolation(files);
    expect(violations).toHaveLength(0);
  });

  it('rejette config/ important src/utils/', () => {
    const files: FileNode[] = [
      { path: 'config/pricing.constants.ts', imports: ['../utils/helpers'] },
    ];

    const violations = checkConfigIsolation(files);
    expect(violations).toHaveLength(1);
    expect(violations[0].fromFile).toBe('config/pricing.constants.ts');
    expect(violations[0].caseRef).toBe('CASE-ARCH-1010');
  });

  it('rejette config/ important src/schemas/', () => {
    const files: FileNode[] = [
      { path: 'config/settings.ts', imports: ['../schemas/types/booking.types'] },
    ];

    const violations = checkConfigIsolation(files);
    expect(violations).toHaveLength(1);
  });

  it('rejette config/ important src/env/', () => {
    const files: FileNode[] = [
      { path: 'config/env-config.ts', imports: ['../env/client'] },
    ];

    const violations = checkConfigIsolation(files);
    expect(violations).toHaveLength(1);
  });

  it('autorise config/ à importer des packages node_modules', () => {
    const files: FileNode[] = [
      { path: 'config/stripe.constants.ts', imports: ['stripe', 'zod', '@prisma/client'] },
    ];

    const violations = checkConfigIsolation(files);
    expect(violations).toHaveLength(0);
  });
});
