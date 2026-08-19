/**
 * CASE-ARCH-1015 — Périmètre d'importation autorisé de src/app/ (Next.js App Router)
 * SPEC-ARCH-02 | AC-6 | Matrice d'import | Scénario data-fetching | Cas limite #6
 */
import { describe, it, expect } from 'vitest';
import { checkAppPerimeter, type FileNode } from '../helpers/import-graph';

describe('CASE_ARCH_1015_perimetre_importation_autorise_src_app', () => {
  it('rejette app/ important lib/ directement', () => {
    const files: FileNode[] = [
      { path: 'app/admin/planning/page.ts', imports: ['../../../lib/server/db'] },
    ];
    const violations = checkAppPerimeter(files);
    expect(violations).toHaveLength(1);
    expect(violations[0].caseRef).toBe('CASE-ARCH-1015');
  });

  it('rejette app/ important hooks/', () => {
    const files: FileNode[] = [
      { path: 'app/booking/page.ts', imports: ['../../hooks/domain/use-booking'] },
    ];
    const violations = checkAppPerimeter(files);
    expect(violations).toHaveLength(1);
    expect(violations[0].toModule).toBe('hooks');
  });

  it('autorise app/ à importer services/server/', () => {
    const files: FileNode[] = [
      { path: 'app/admin/planning/page.ts', imports: ['../../../services/server/planning.service'] },
    ];
    expect(checkAppPerimeter(files)).toHaveLength(0);
  });

  it('autorise app/ à importer actions/', () => {
    const files: FileNode[] = [
      { path: 'app/admin/page.ts', imports: ['../../actions/planning.actions'] },
    ];
    expect(checkAppPerimeter(files)).toHaveLength(0);
  });

  it('autorise app/ à importer schemas/', () => {
    const files: FileNode[] = [
      { path: 'app/booking/page.ts', imports: ['../../schemas/types/booking.types'] },
    ];
    expect(checkAppPerimeter(files)).toHaveLength(0);
  });

  it('autorise app/ à importer components/', () => {
    const files: FileNode[] = [
      { path: 'app/layout.ts', imports: ['../components/common/navbar'] },
    ];
    expect(checkAppPerimeter(files)).toHaveLength(0);
  });

  it('autorise app/ à importer env/', () => {
    const files: FileNode[] = [
      { path: 'app/admin/page.ts', imports: ['../../env/server'] },
    ];
    expect(checkAppPerimeter(files)).toHaveLength(0);
  });
});
