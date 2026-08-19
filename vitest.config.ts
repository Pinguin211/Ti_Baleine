import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    /* Tests unitaires uniquement — tests/e2e/ reste à Playwright. */
    environment: 'jsdom',
    setupFiles: ['./tests/tests-unitaires/setup.ts'],
    include: ['tests/tests-unitaires/**/*.test.ts?(x)', 'src/**/*.test.ts?(x)'],
  },
});
