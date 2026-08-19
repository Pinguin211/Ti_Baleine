/**
 * CASE-ARCH-1022 — Rejet de sous-fonctions utilitaires déclarées dans un fichier .tsx
 * SPEC-ARCH-01 | AC-2 | Règle §2 | Portée §3
 */
import { describe, it, expect } from 'vitest';
import { createInMemorySourceFile, checkArch01Compliance } from '../helpers/ast-analyzer';

describe('CASE_ARCH_1022_rejet_fonctions_utilitaires_auxiliaires_fichier_tsx', () => {
  it('valide un .tsx avec un unique composant React (sans helper local)', () => {
    const code = `
import React from 'react';
import { formatPrice } from '@/utils/price-formatter';

function BookingCard({ amount }: { amount: number }) {
  return <div>{formatPrice(amount)}</div>;
}

export default BookingCard;
`;

    const sf = createInMemorySourceFile(code, 'src/components/domain/booking-card.tsx');
    const violations = checkArch01Compliance(sf);

    expect(violations.filter((v) => v.type === 'multi_function_tsx')).toHaveLength(0);
  });

  it('rejette un .tsx avec un composant React + une fonction helper locale', () => {
    const code = `
import React from 'react';

function formatPrice(amount: number): string {
  return \`\${amount} €\`;
}

function BookingCard({ amount }: { amount: number }) {
  return <div>{formatPrice(amount)}</div>;
}

export default BookingCard;
`;

    const sf = createInMemorySourceFile(code, 'src/components/domain/booking-card.tsx');
    const violations = checkArch01Compliance(sf);

    const multiTsx = violations.filter((v) => v.type === 'multi_function_tsx');
    expect(multiTsx).toHaveLength(1);
    expect(multiTsx[0].detail).toContain('2');
  });

  it('détecte aussi les helpers non exportés dans un .tsx', () => {
    const code = `
function internalHelper(x: number) {
  return x * 2;
}

function MyComponent() {
  return <span>{internalHelper(1)}</span>;
}

export default MyComponent;
`;

    const sf = createInMemorySourceFile(code, 'src/components/ui/my-component.tsx');
    const violations = checkArch01Compliance(sf);

    // 2 fonctions dans un .tsx → violation
    expect(violations.filter((v) => v.type === 'multi_function_tsx')).toHaveLength(1);
  });
});
