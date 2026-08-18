import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  test: {
    // Environnement jsdom : active le DOM et les APIs navigateur pour les tests React
    environment: 'jsdom',

    // Découverte des tests dans le dossier dédié (non colocalisés)
    include: ['tests/tests-unitaires/**/*.test.ts', 'tests/tests-unitaires/**/*.test.tsx'],

    // Setup global : importe @testing-library/jest-dom pour les matchers DOM
    setupFiles: ['tests/tests-unitaires/setup.ts'],

    // Globals désactivés : import explicite de describe/it/expect dans chaque fichier
    globals: false,
  },
});
