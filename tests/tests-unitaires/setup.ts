// Enregistre les matchers DOM de @testing-library/jest-dom sur l'instance `expect`
// de Vitest. L'import direct de '@testing-library/jest-dom' supposerait `globals: true` ;
// le projet retient `globals: false` (vitest.config.ts), d'où l'extension explicite.
// Exemples : toBeInTheDocument(), toHaveTextContent(), toBeVisible()...
import { expect } from 'vitest';
import * as matchersDom from '@testing-library/jest-dom/matchers';

expect.extend(matchersDom);
