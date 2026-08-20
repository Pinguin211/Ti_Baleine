/**
 * scripts/db-seed.ts
 *
 * Script d'initialisation et d'injection des données de test / seed en base de données.
 * Usage : npm run db:seed
 */

import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const connectionString =
  process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/ti_baleine';

async function seedAdminUser(pool: Pool): Promise<void> {
  const adminEmail = 'admin@tibaleine.re';
  const existing = await pool.query('SELECT id FROM users WHERE email = $1', [adminEmail]);

  if (existing.rowCount && existing.rowCount > 0) {
    console.log(`ℹ️ L'administrateur "${adminEmail}" existe déjà.`);
    return;
  }

  const hashedPassword = await bcrypt.hash('AdminTiBaleine2026!', 10);
  await pool.query(
    `INSERT INTO users (nom, prenom, email, telephone, role, mot_de_passe)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    ['Administrateur', 'TiBaleine', adminEmail, '+262692000000', 'ADMIN', hashedPassword]
  );
  console.log(`✅ Administrateur "${adminEmail}" créé avec succès.`);
}

export async function runDatabaseSeed(): Promise<void> {
  console.log('\n============================================================');
  console.log(' Initialisation des données de base (DB Seed) — Ti Baleine');
  console.log('============================================================');

  const pool = new Pool({ connectionString });

  try {
    const res = await pool.query('SELECT NOW()');
    console.log(`📡 Connexion PostgreSQL réussie (${res.rows[0].now}).`);

    await seedAdminUser(pool);

    console.log('✅ Seeding terminé avec succès.');
  } catch (error) {
    console.error('❌ Erreur lors du seeding de la base de données :', error);
    process.exit(1);
  } finally {
    await pool.end();
    console.log('============================================================\n');
  }
}

// Exécution directe en CLI
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('db-seed.ts')) {
  runDatabaseSeed();
}
