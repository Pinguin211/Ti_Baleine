/**
 * CASE-ARCH-1000 — Plafonnement strict des fonctions à 30 lignes utiles dans les fichiers .ts/.js
 * SPEC-ARCH-01 | AC-1 | Scénario 1
 */
import { describe, it, expect } from 'vitest';
import { createInMemorySourceFile, checkArch01Compliance } from '../helpers/ast-analyzer';

describe('CASE_ARCH_1000_plafonnement_fonctions_30_lignes_utiles_ts_js', () => {
  it('valide une fonction de exactement 30 lignes utiles', () => {
    // 30 lignes utiles exactement (instructions simples)
    const lines = Array.from({ length: 30 }, (_, i) => `  const v${i} = ${i};`).join('\n');
    const code = `function calculatePricingMatrix() {\n${lines}\n}`;

    const sf = createInMemorySourceFile(code, 'src/services/server/pricing.service.ts');
    const violations = checkArch01Compliance(sf);

    expect(violations).toHaveLength(0);
  });

  it('valide une fonction de moins de 30 lignes utiles', () => {
    const code = `
      function getBookingTotal(price: number, count: number): number {
        const base = price * count;
        const tax = base * 0.2;
        return base + tax;
      }
    `;

    const sf = createInMemorySourceFile(code, 'src/services/server/pricing.service.ts');
    const violations = checkArch01Compliance(sf);

    expect(violations).toHaveLength(0);
  });

  it('exclut du comptage les lignes vides, commentaires et déclarations de types', () => {
    const code = `
      function processSlot(): void {
        // Commentaire non compté
        /* bloc non compté */
        type LocalType = string; // type non compté

        const a = 1; // utile
        const b = 2; // utile
      }
    `;

    const sf = createInMemorySourceFile(code, 'src/services/server/slot.service.ts');
    const violations = checkArch01Compliance(sf);

    // Seules 2 lignes utiles → pas de violation
    expect(violations.filter((v) => v.type === 'function_too_long')).toHaveLength(0);
  });

  it('valide un fichier complet avec plusieurs fonctions toutes ≤ 30 lignes', () => {
    const fn = (name: string, count: number) => {
      const body = Array.from({ length: count }, (_, i) => `  const x${i} = ${i};`).join('\n');
      return `function ${name}() {\n${body}\n}`;
    };

    const code = [fn('alpha', 10), fn('beta', 20), fn('gamma', 5)].join('\n\n');
    const sf = createInMemorySourceFile(code, 'src/utils/helpers.ts');
    const violations = checkArch01Compliance(sf);

    expect(violations).toHaveLength(0);
  });
});
