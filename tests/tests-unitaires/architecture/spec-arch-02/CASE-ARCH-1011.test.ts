/**
 * CASE-ARCH-1011 — Hiérarchie du socle bas : utils/ et schemas/ (exclusion env/)
 * SPEC-ARCH-02 | AC-2 | Matrice d'import | Scénarios 1 et 2 | Cas limite #2, #3
 */
import { describe, it, expect } from 'vitest';
import { checkUtilsAndSchemasHierarchy, type FileNode } from '../helpers/import-graph';

describe('CASE_ARCH_1011_hierarchie_socle_bas_utils_schemas_exclusion_env', () => {
  it('valide utils/ important uniquement config/', () => {
    const files: FileNode[] = [
      { path: 'utils/date-formatter.ts', imports: ['../config/app.constants', 'date-fns'] },
    ];
    expect(checkUtilsAndSchemasHierarchy(files)).toHaveLength(0);
  });

  it('rejette utils/ important schemas/', () => {
    const files: FileNode[] = [
      { path: 'utils/validator.ts', imports: ['../schemas/validation/booking.schema'] },
    ];
    const violations = checkUtilsAndSchemasHierarchy(files);
    expect(violations).toHaveLength(1);
    expect(violations[0].caseRef).toBe('CASE-ARCH-1011');
  });

  it('rejette utils/ important env/', () => {
    const files: FileNode[] = [
      { path: 'utils/env-helper.ts', imports: ['../env/client'] },
    ];
    const violations = checkUtilsAndSchemasHierarchy(files);
    expect(violations).toHaveLength(1);
  });

  it('valide schemas/ important config/ et utils/', () => {
    const files: FileNode[] = [
      {
        path: 'schemas/validation/booking.schema.ts',
        imports: ['../../config/pricing.constants', '../../utils/date-formatter', 'zod'],
      },
    ];
    expect(checkUtilsAndSchemasHierarchy(files)).toHaveLength(0);
  });

  it('rejette schemas/ important env/client directement (pattern factory obligatoire)', () => {
    const files: FileNode[] = [
      { path: 'schemas/validation/upload.schema.ts', imports: ['../../env/client'] },
    ];
    const violations = checkUtilsAndSchemasHierarchy(files);
    expect(violations).toHaveLength(1);
  });

  it('rejette schemas/ important env/server', () => {
    const files: FileNode[] = [
      { path: 'schemas/validation/auth.schema.ts', imports: ['../../env/server'] },
    ];
    const violations = checkUtilsAndSchemasHierarchy(files);
    expect(violations).toHaveLength(1);
  });
});
