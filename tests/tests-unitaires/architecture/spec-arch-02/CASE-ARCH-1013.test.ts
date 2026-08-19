/**
 * CASE-ARCH-1013 — Restriction stricte des imports de src/env/server.ts
 * SPEC-ARCH-02 | AC-4 | Matrice d'import | Scénario 4 | Cas limite #4
 */
import { describe, it, expect } from 'vitest';
import { checkEnvServerConsumers, type FileNode } from '../helpers/import-graph';

describe('CASE_ARCH_1013_restriction_imports_env_server_ts', () => {
  it('rejette hooks/ important env/server (violation critique)', () => {
    const files: FileNode[] = [
      { path: 'hooks/domain/use-auth.ts', imports: ['../../env/server'] },
    ];
    const violations = checkEnvServerConsumers(files);
    expect(violations).toHaveLength(1);
    expect(violations[0].caseRef).toBe('CASE-ARCH-1013');
    expect(violations[0].toModule).toBe('env/server');
  });

  it('rejette services/client/ important env/server', () => {
    const files: FileNode[] = [
      { path: 'services/client/public-api.ts', imports: ['../../env/server'] },
    ];
    expect(checkEnvServerConsumers(files)).toHaveLength(1);
  });

  it('rejette lib/client/ important env/server', () => {
    const files: FileNode[] = [
      { path: 'lib/client/analytics.ts', imports: ['../../env/server'] },
    ];
    expect(checkEnvServerConsumers(files)).toHaveLength(1);
  });

  it('rejette components/ important env/server', () => {
    const files: FileNode[] = [
      { path: 'components/ui/secret-badge.tsx', imports: ['../../env/server'] },
    ];
    expect(checkEnvServerConsumers(files)).toHaveLength(1);
  });

  it('autorise services/server/ à importer env/server', () => {
    const files: FileNode[] = [
      { path: 'services/server/auth.service.ts', imports: ['../../env/server'] },
    ];
    expect(checkEnvServerConsumers(files)).toHaveLength(0);
  });

  it('autorise actions/ à importer env/server', () => {
    const files: FileNode[] = [
      { path: 'actions/auth.actions.ts', imports: ['../env/server'] },
    ];
    expect(checkEnvServerConsumers(files)).toHaveLength(0);
  });

  it('autorise app/ à importer env/server', () => {
    const files: FileNode[] = [
      { path: 'app/admin/page.ts', imports: ['../../env/server'] },
    ];
    expect(checkEnvServerConsumers(files)).toHaveLength(0);
  });
});
