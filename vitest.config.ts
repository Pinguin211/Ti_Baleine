import { defineConfig, defineProject } from 'vitest/config';
import react from '@vitejs/plugin-react';

/**
 * Configuration Vitest — trois projets :
 *   • arch        (node)  — Tests de conformité architecturale (analyse AST statique)
 *   • facturation (node)  — Tests unitaires du domaine facturation (calcul/orchestration, sans DOM)
 *   • unit        (jsdom) — Tests unitaires React / métier
 */
export default defineConfig({
  test: {
    projects: [
      defineProject({
        test: {
          name: 'arch',
          environment: 'node',
          include: ['tests/tests-unitaires/architecture/**/*.test.ts'],
          globals: false,
        },
      }),
      defineProject({
        test: {
          name: 'facturation',
          environment: 'node',
          include: ['tests/tests-unitaires/facturation/**/*.test.ts'],
          globals: false,
        },
      }),
      defineProject({
        plugins: [react()],
        test: {
          name: 'unit',
          environment: 'jsdom',
          include: [
            'tests/tests-unitaires/**/*.test.ts',
            'tests/tests-unitaires/**/*.test.tsx',
          ],
          exclude: [
            'tests/tests-unitaires/architecture/**',
            'tests/tests-unitaires/facturation/**',
          ],
          setupFiles: ['tests/tests-unitaires/setup.ts'],
          globals: false,
        },
      }),
    ],
  },
});

