/**
 * CASE-ARCH-1019 — Encapsulation stricte de src/hooks/ (réservé à components/ uniquement)
 * SPEC-ARCH-02 | AC-10 | Matrice d'import
 */
import { describe, it, expect } from 'vitest';
import { checkHooksEncapsulation, type FileNode } from '../helpers/import-graph';

describe('CASE_ARCH_1019_encapsulation_stricte_hooks_components_seulement', () => {
  it('rejette services/ important hooks/', () => {
    const files: FileNode[] = [
      { path: 'services/client/booking-api.ts', imports: ['../../hooks/domain/use-booking'] },
    ];
    const violations = checkHooksEncapsulation(files);
    expect(violations).toHaveLength(1);
    expect(violations[0].caseRef).toBe('CASE-ARCH-1019');
  });

  it('rejette actions/ important hooks/', () => {
    const files: FileNode[] = [
      { path: 'actions/booking.actions.ts', imports: ['../hooks/domain/use-session'] },
    ];
    expect(checkHooksEncapsulation(files)).toHaveLength(1);
  });

  it('rejette utils/ important hooks/', () => {
    const files: FileNode[] = [
      { path: 'utils/form-helpers.ts', imports: ['../hooks/common/use-debounce'] },
    ];
    expect(checkHooksEncapsulation(files)).toHaveLength(1);
  });

  it('rejette schemas/ important hooks/', () => {
    const files: FileNode[] = [
      { path: 'schemas/validation/booking.schema.ts', imports: ['../../hooks/domain/use-slot'] },
    ];
    expect(checkHooksEncapsulation(files)).toHaveLength(1);
  });

  it('autorise components/ à importer hooks/', () => {
    const files: FileNode[] = [
      { path: 'components/domain/booking-form.tsx', imports: ['../../hooks/domain/use-booking'] },
    ];
    expect(checkHooksEncapsulation(files)).toHaveLength(0);
  });
});
