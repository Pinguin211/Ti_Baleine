/**
 * CASE-ARCH-1012 — Autorisations et restrictions des imports de src/env/client.ts
 * SPEC-ARCH-02 | AC-3 | Matrice d'import | Scénarios 3 et 5 | Cas limite #5
 */
import { describe, it, expect } from 'vitest';
import { checkEnvClientConsumers, type FileNode } from '../helpers/import-graph';

describe('CASE_ARCH_1012_autorisations_imports_env_client_ts', () => {
  it('rejette components/ important env/client directement', () => {
    const files: FileNode[] = [
      { path: 'components/ui/user-button.tsx', imports: ['../../env/client'] },
    ];
    const violations = checkEnvClientConsumers(files);
    expect(violations).toHaveLength(1);
    expect(violations[0].caseRef).toBe('CASE-ARCH-1012');
  });

  it('rejette schemas/ important env/client directement', () => {
    const files: FileNode[] = [
      { path: 'schemas/validation/booking.schema.ts', imports: ['../../env/client'] },
    ];
    expect(checkEnvClientConsumers(files)).toHaveLength(1);
  });

  it('rejette utils/ important env/client', () => {
    const files: FileNode[] = [
      { path: 'utils/env-reader.ts', imports: ['../env/client'] },
    ];
    expect(checkEnvClientConsumers(files)).toHaveLength(1);
  });

  it('rejette config/ important env/client', () => {
    const files: FileNode[] = [
      { path: 'config/env-config.ts', imports: ['../env/client'] },
    ];
    expect(checkEnvClientConsumers(files)).toHaveLength(1);
  });

  it('autorise hooks/ à importer env/client', () => {
    const files: FileNode[] = [
      { path: 'hooks/domain/use-site-config.ts', imports: ['../../env/client'] },
    ];
    expect(checkEnvClientConsumers(files)).toHaveLength(0);
  });

  it('autorise services/ à importer env/client', () => {
    const files: FileNode[] = [
      { path: 'services/client/booking-api.ts', imports: ['../../env/client'] },
    ];
    expect(checkEnvClientConsumers(files)).toHaveLength(0);
  });

  it('autorise actions/ à importer env/client', () => {
    const files: FileNode[] = [
      { path: 'actions/booking.actions.ts', imports: ['../env/client'] },
    ];
    expect(checkEnvClientConsumers(files)).toHaveLength(0);
  });
});
