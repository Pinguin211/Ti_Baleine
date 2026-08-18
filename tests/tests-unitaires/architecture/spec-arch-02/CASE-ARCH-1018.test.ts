/**
 * CASE-ARCH-1018 — Interdiction pour components/ d'importer services/ directement
 * SPEC-ARCH-02 | AC-9 | Matrice d'import
 */
import { describe, it, expect } from 'vitest';
import { checkComponentsDoNotImportServices, type FileNode } from '../helpers/import-graph';

describe('CASE_ARCH_1018_interdiction_components_importer_services', () => {
  it('rejette components/ important services/server/', () => {
    const files: FileNode[] = [
      { path: 'components/ui/user-button.tsx', imports: ['../../services/server/auth.service'] },
    ];
    const violations = checkComponentsDoNotImportServices(files);
    expect(violations).toHaveLength(1);
    expect(violations[0].caseRef).toBe('CASE-ARCH-1018');
  });

  it('rejette components/ important services/client/', () => {
    const files: FileNode[] = [
      { path: 'components/domain/booking-list.tsx', imports: ['../../services/client/booking-api'] },
    ];
    expect(checkComponentsDoNotImportServices(files)).toHaveLength(1);
  });

  it('valide components/ passant par hooks/ pour accéder aux données', () => {
    const files: FileNode[] = [
      {
        path: 'components/domain/booking-card.tsx',
        imports: ['../../hooks/domain/use-booking', 'react'],
      },
    ];
    expect(checkComponentsDoNotImportServices(files)).toHaveLength(0);
  });

  it('valide components/ utilisant actions/ pour les mutations', () => {
    const files: FileNode[] = [
      { path: 'components/domain/booking-form.tsx', imports: ['../../actions/booking.actions'] },
    ];
    expect(checkComponentsDoNotImportServices(files)).toHaveLength(0);
  });

  it('ne cible que les fichiers sous components/', () => {
    // Un fichier hors components/ peut importer services/ sans violation CASE-1018
    const files: FileNode[] = [
      { path: 'app/booking/page.ts', imports: ['../../services/server/booking.service'] },
    ];
    expect(checkComponentsDoNotImportServices(files)).toHaveLength(0);
  });
});
