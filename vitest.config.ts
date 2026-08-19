<<<<<<< HEAD
=======
import { defineConfig, defineProject } from 'vitest/config';
>>>>>>> 362312404acc4aee387d5d5c232036a6cb0e7c9c
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

/**
 * Configuration Vitest — quatre projets :
 *   • arch        (node)  — Tests de conformité architecturale (analyse AST statique)
 *   • admin       (node)  — Tests unitaires du domaine ADMIN (logique métier, sans DOM)
 *   • facturation (node)  — Tests unitaires du domaine facturation (calcul/orchestration, sans DOM)
 *   • unit        (jsdom) — Tests unitaires React / métier avec rendu DOM
 */
export default defineConfig({
<<<<<<< HEAD
  plugins: [react()],
  test: {
    /* Tests unitaires uniquement — tests/e2e/ reste à Playwright. */
    environment: 'jsdom',
    setupFiles: ['./tests/tests-unitaires/setup.ts'],
    include: ['tests/tests-unitaires/**/*.test.ts?(x)', 'src/**/*.test.ts?(x)'],
=======
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
          name: 'admin',
          environment: 'node',
          include: ['tests/tests-unitaires/admin/**/*.test.ts'],
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
            'tests/tests-unitaires/admin/**',
            'tests/tests-unitaires/facturation/**',
          ],
          setupFiles: ['tests/tests-unitaires/setup.ts'],
          globals: false,
        },
      }),
    ],
>>>>>>> 362312404acc4aee387d5d5c232036a6cb0e7c9c
  },
});

