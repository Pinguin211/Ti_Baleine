<<<<<<< HEAD
=======
import { defineConfig, defineProject } from 'vitest/config';
>>>>>>> 362312404acc4aee387d5d5c232036a6cb0e7c9c
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

/**
 * Configuration Vitest — deux projets :
 *   • arch  (node)  — Tests de conformité architecturale (analyse AST statique)
 *   • unit  (jsdom) — Tests unitaires React / métier
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
>>>>>>> 362312404acc4aee387d5d5c232036a6cb0e7c9c
  },
});

