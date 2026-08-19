/**
 * CASE-ARCH-1016 — Étanchéité stricte server-only dans les composants "use client"
 * SPEC-ARCH-02 | AC-7 | Règle d'étanchéité | Cas limite #7
 */
import { describe, it, expect } from 'vitest';
import { checkServerOnlyViolations, type FileNode } from '../helpers/import-graph';

describe('CASE_ARCH_1016_etancheite_stricte_server_only_use_client', () => {
  it('rejette un composant "use client" important env/server', () => {
    const files: FileNode[] = [
      {
        path: 'components/ui/user-button.tsx',
        imports: ['../../env/server'],
        isClientComponent: true,
      },
    ];
    const violations = checkServerOnlyViolations(files);
    expect(violations).toHaveLength(1);
    expect(violations[0].caseRef).toBe('CASE-ARCH-1016');
    expect(violations[0].toModule).toBe('env/server');
  });

  it('rejette un composant "use client" important services/server/', () => {
    const files: FileNode[] = [
      {
        path: 'components/domain/booking-card.tsx',
        imports: ['../../services/server/booking.service'],
        isClientComponent: true,
      },
    ];
    const violations = checkServerOnlyViolations(files);
    expect(violations).toHaveLength(1);
  });

  it('rejette un composant "use client" important lib/server/', () => {
    const files: FileNode[] = [
      {
        path: 'components/ui/auth-guard.tsx',
        imports: ['../../lib/server/auth-client'],
        isClientComponent: true,
      },
    ];
    expect(checkServerOnlyViolations(files)).toHaveLength(1);
  });

  it('valide un composant "use client" important seulement des modules client/isomorphes', () => {
    const files: FileNode[] = [
      {
        path: 'components/ui/booking-form.tsx',
        imports: [
          '../../hooks/domain/use-booking',
          '../../actions/booking.actions',
          '../../utils/date-formatter',
          'react',
        ],
        isClientComponent: true,
      },
    ];
    expect(checkServerOnlyViolations(files)).toHaveLength(0);
  });

  it("ne vérifie pas les composants serveur (sans directive 'use client')", () => {
    const files: FileNode[] = [
      {
        path: 'components/domain/booking-summary.tsx',
        imports: ['../../services/server/booking.service'],
        isClientComponent: false,
      },
    ];
    // Pas de violation : c'est un Server Component
    expect(checkServerOnlyViolations(files)).toHaveLength(0);
  });
});
