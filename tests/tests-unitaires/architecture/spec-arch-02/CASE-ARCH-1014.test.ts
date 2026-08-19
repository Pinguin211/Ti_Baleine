/**
 * CASE-ARCH-1014 — Encapsulation stricte de src/lib/ (accès réservé à services/ uniquement)
 * SPEC-ARCH-02 | AC-5 | Matrice d'import | Scénario 6 | Cas limite #6
 */
import { describe, it, expect } from 'vitest';
import { checkLibEncapsulation, type FileNode } from '../helpers/import-graph';

describe('CASE_ARCH_1014_encapsulation_stricte_lib_services_seulement', () => {
  it('rejette app/ important lib/ directement', () => {
    const files: FileNode[] = [
      { path: 'app/admin/page.ts', imports: ['../../lib/server/db'] },
    ];
    const violations = checkLibEncapsulation(files);
    expect(violations).toHaveLength(1);
    expect(violations[0].caseRef).toBe('CASE-ARCH-1014');
  });

  it('rejette actions/ important lib/', () => {
    const files: FileNode[] = [
      { path: 'actions/booking.actions.ts', imports: ['../lib/server/prisma'] },
    ];
    expect(checkLibEncapsulation(files)).toHaveLength(1);
  });

  it('rejette components/ important lib/', () => {
    const files: FileNode[] = [
      { path: 'components/ui/button.tsx', imports: ['../../lib/client/analytics'] },
    ];
    expect(checkLibEncapsulation(files)).toHaveLength(1);
  });

  it('rejette hooks/ important lib/', () => {
    const files: FileNode[] = [
      { path: 'hooks/domain/use-db.ts', imports: ['../../lib/server/db'] },
    ];
    expect(checkLibEncapsulation(files)).toHaveLength(1);
  });

  it('autorise services/server/ à importer lib/server/', () => {
    const files: FileNode[] = [
      { path: 'services/server/auth.service.ts', imports: ['../../lib/server/auth-client'] },
    ];
    expect(checkLibEncapsulation(files)).toHaveLength(0);
  });

  it('autorise services/client/ à importer lib/client/', () => {
    const files: FileNode[] = [
      { path: 'services/client/booking-api.ts', imports: ['../../lib/client/fetch-client'] },
    ];
    expect(checkLibEncapsulation(files)).toHaveLength(0);
  });
});
