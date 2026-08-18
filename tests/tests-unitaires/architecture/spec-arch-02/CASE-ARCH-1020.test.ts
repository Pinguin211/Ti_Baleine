/**
 * CASE-ARCH-1020 — Encapsulation stricte de src/actions/ (components/ et app/ seulement)
 * SPEC-ARCH-02 | AC-11 | Matrice d'import
 */
import { describe, it, expect } from 'vitest';
import { checkActionsEncapsulation, type FileNode } from '../helpers/import-graph';

describe('CASE_ARCH_1020_encapsulation_stricte_actions_components_et_app_seulement', () => {
  it('rejette services/ important actions/', () => {
    const files: FileNode[] = [
      { path: 'services/server/booking.service.ts', imports: ['../../actions/booking.actions'] },
    ];
    const violations = checkActionsEncapsulation(files);
    expect(violations).toHaveLength(1);
    expect(violations[0].caseRef).toBe('CASE-ARCH-1020');
  });

  it('rejette lib/ important actions/', () => {
    const files: FileNode[] = [
      { path: 'lib/server/db.ts', imports: ['../../actions/payment.actions'] },
    ];
    expect(checkActionsEncapsulation(files)).toHaveLength(1);
  });

  it('rejette utils/ important actions/', () => {
    const files: FileNode[] = [
      { path: 'utils/action-runner.ts', imports: ['../actions/booking.actions'] },
    ];
    expect(checkActionsEncapsulation(files)).toHaveLength(1);
  });

  it('rejette schemas/ important actions/', () => {
    const files: FileNode[] = [
      { path: 'schemas/validation/booking.schema.ts', imports: ['../../actions/booking.actions'] },
    ];
    expect(checkActionsEncapsulation(files)).toHaveLength(1);
  });

  it('autorise components/ à importer actions/', () => {
    const files: FileNode[] = [
      { path: 'components/domain/booking-form.tsx', imports: ['../../actions/booking.actions'] },
    ];
    expect(checkActionsEncapsulation(files)).toHaveLength(0);
  });

  it('autorise app/ à importer actions/', () => {
    const files: FileNode[] = [
      { path: 'app/admin/page.ts', imports: ['../../actions/planning.actions'] },
    ];
    expect(checkActionsEncapsulation(files)).toHaveLength(0);
  });
});
