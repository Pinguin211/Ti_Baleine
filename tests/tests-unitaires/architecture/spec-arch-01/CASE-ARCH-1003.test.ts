/**
 * CASE-ARCH-1003 — Règle de mono-composant React par fichier .tsx/.jsx
 * SPEC-ARCH-01 | AC-2 | Scénario 2 | Cas limite #3
 */
import { describe, it, expect } from 'vitest';
import { createInMemorySourceFile, checkArch01Compliance } from '../helpers/ast-analyzer';

describe('CASE_ARCH_1003_mono_composant_react_par_fichier_tsx_jsx', () => {
  it('valide un fichier .tsx avec un seul composant React (85 lignes de JSX)', () => {
    const jsxLines = Array.from({ length: 80 }, (_, i) => `  const line${i} = ${i};`).join('\n');
    const code = `
import React from 'react';

function BookingCard() {
${jsxLines}
  return <div>BookingCard</div>;
}

export default BookingCard;
`;

    const sf = createInMemorySourceFile(code, 'src/components/domain/booking-card.tsx');
    const violations = checkArch01Compliance(sf);

    expect(violations.filter((v) => v.type === 'multi_function_tsx')).toHaveLength(0);
  });

  it('rejette un fichier .tsx contenant deux composants React', () => {
    const code = `
import React from 'react';

function BookingCard() {
  return <div>BookingCard</div>;
}

function BookingBadge() {
  return <span>badge</span>;
}

export { BookingCard, BookingBadge };
`;

    const sf = createInMemorySourceFile(code, 'src/components/domain/booking-card.tsx');
    const violations = checkArch01Compliance(sf);

    const multiTsx = violations.filter((v) => v.type === 'multi_function_tsx');
    expect(multiTsx).toHaveLength(1);
    expect(multiTsx[0].detail).toContain('2');
  });

  it("n'impose pas la limite de 30 lignes au composant unique d'un .tsx", () => {
    // Composant de 60 lignes utiles : pas de violation de volumétrie par fonction
    const lines = Array.from({ length: 60 }, (_, i) => `  const v${i} = ${i};`).join('\n');
    const code = `
function BigComponent() {
${lines}
  return <div />;
}
export default BigComponent;
`;

    const sf = createInMemorySourceFile(code, 'src/components/domain/big-component.tsx');
    const violations = checkArch01Compliance(sf);

    // Aucune violation de type function_too_long dans un .tsx
    expect(violations.filter((v) => v.type === 'function_too_long')).toHaveLength(0);
  });
});
