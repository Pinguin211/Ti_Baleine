import { defineConfig, defineProject } from 'vitest/config';
import react from '@vitejs/plugin-react';

/**
 * Configuration Vitest — deux projets :
 *   • arch  (node)  — Tests de conformité architecturale (analyse AST statique)
 *   • unit  (jsdom) — Tests unitaires React / métier
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
        plugins: [react()],
        test: {
          name: 'unit',
          environment: 'jsdom',
          include: [
            'tests/tests-unitaires/**/*.test.ts',
            'tests/tests-unitaires/**/*.test.tsx',
          ],
          exclude: ['tests/tests-unitaires/architecture/**'],
          setupFiles: ['tests/tests-unitaires/setup.ts'],
          globals: false,
        },
      }),
    ],
  },
});

