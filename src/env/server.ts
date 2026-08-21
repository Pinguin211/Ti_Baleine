import 'server-only';
import { z } from 'zod';

/**
 * Variables d'environnement privées serveur (SPEC-ARCH-02).
 * `import 'server-only'` interdit toute importation depuis un module client.
 *
 * Liste restreinte aux variables consommées par le socle déjà généré
 * (auth admin). Les autres variables prévues par docs/signature.md
 * (ADMIN_PASSWORD_HASH, SMTP_*, SMS_GATEWAY_API_KEY) seront ajoutées avec
 * leurs fonctionnalités respectives.
 */
const schemaEnvServeur = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET doit faire au moins 32 caractères'),
});

export const envServeur = schemaEnvServeur.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
});
