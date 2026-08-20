import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  date,
  time,
  numeric,
  unique,
  index,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ====================================================================
// ENUMS
// ====================================================================
export const roleEnum = pgEnum('role_enum', ['CLIENT', 'ADMIN']);

export const portEnum = pgEnum('port_enum', ['SAINT_GILLES', 'SAINT_LEU']);

export const activiteEnum = pgEnum('activite_enum', [
  'BALEINES',
  'DAUPHINS',
  'PRIVATISATION_TIKAP',
  'PRIVATISATION_GRAND_BLEU',
]);

export const typeBilletEnum = pgEnum('type_billet_enum', ['ADULTE', 'ENFANT', 'PRIVATISATION']);

export const statutReservationEnum = pgEnum('statut_reservation_enum', [
  'EN_ATTENTE_PAIEMENT',
  'PAYEE_PARTIELLEMENT',
  'PAYEE_COMPLETEMENT',
  'ANNULEE',
]);

export const typePaiementEnum = pgEnum('type_paiement_enum', ['ACOMPTE', 'SOLDE']);

export const canalPaiementEnum = pgEnum('canal_paiement_enum', ['EN_LIGNE', 'SUR_PLACE_CB']);

export const statutEmissionFactureEnum = pgEnum('statut_emission_facture_enum', [
  'EN_ATTENTE',
  'ENVOYEE_SUCCES',
  'ECHEC_ENVOI',
]);

// ====================================================================
// TABLES
// ====================================================================

// 1. Users
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  nom: varchar('nom', { length: 100 }).notNull(),
  prenom: varchar('prenom', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  telephone: varchar('telephone', { length: 20 }).notNull(),
  role: roleEnum('role').default('CLIENT').notNull(),
  mot_de_passe: varchar('mot_de_passe', { length: 255 }),
});

// 2. Alertes
export const alertes = pgTable('alertes', {
  id: uuid('id').defaultRandom().primaryKey(),
  message: text('message').notNull(),
  date_emission: timestamp('date_emission', { withTimezone: true }).defaultNow().notNull(),
});

// 3. Creneaux
export const creneaux = pgTable(
  'creneaux',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    date: date('date', { mode: 'string' }).notNull(),
    heure_depart: time('heure_depart').notNull(),
    port: portEnum('port').notNull(),
    activite: activiteEnum('activite').notNull(),
    est_ouvert: boolean('est_ouvert').default(true).notNull(),
    sous_pre_alerte: boolean('sous_pre_alerte').default(false).notNull(),
    alerte_id: uuid('alerte_id').references(() => alertes.id, { onDelete: 'set null' }),
  },
  (table) => [
    unique('uq_creneau_port_date_heure_activite').on(
      table.port,
      table.date,
      table.heure_depart,
      table.activite
    ),
    index('idx_creneaux_date_port').on(table.date, table.port),
    index('idx_creneaux_alerte_id').on(table.alerte_id),
  ]
);

// 4. Reservations
export const reservations = pgTable(
  'reservations',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    reference: varchar('reference', { length: 20 }).unique().notNull(),
    statut: statutReservationEnum('statut').default('EN_ATTENTE_PAIEMENT').notNull(),
    creneau_id: uuid('creneau_id')
      .references(() => creneaux.id, { onDelete: 'restrict' })
      .notNull(),
    user_id: uuid('user_id')
      .references(() => users.id, { onDelete: 'restrict' })
      .notNull(),
    date_creation: timestamp('date_creation', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index('idx_reservations_creneau_id').on(table.creneau_id),
    index('idx_reservations_user_id').on(table.user_id),
    index('idx_reservations_statut').on(table.statut),
    index('idx_reservations_date_creation').on(table.date_creation),
  ]
);

// 5. Billets
export const billets = pgTable(
  'billets',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    reservation_id: uuid('reservation_id')
      .references(() => reservations.id, { onDelete: 'cascade' })
      .notNull(),
    type_billet: typeBilletEnum('type_billet').notNull(),
  },
  (table) => [index('idx_billets_reservation_id').on(table.reservation_id)]
);

// 6. Paiements
export const paiements = pgTable(
  'paiements',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    reservation_id: uuid('reservation_id')
      .references(() => reservations.id, { onDelete: 'restrict' })
      .notNull(),
    type_paiement: typePaiementEnum('type_paiement').notNull(),
    canal_paiement: canalPaiementEnum('canal_paiement').notNull(),
    reference_transaction: varchar('reference_transaction', { length: 100 }).unique().notNull(),
    montant: numeric('montant', { precision: 10, scale: 2 }).notNull(),
    date_paiement: timestamp('date_paiement', { withTimezone: true }).defaultNow().notNull(),
    reference_facture: varchar('reference_facture', { length: 50 }).unique().notNull(),
    statut_emission_facture: statutEmissionFactureEnum('statut_emission_facture')
      .default('EN_ATTENTE')
      .notNull(),
    date_emission_facture: timestamp('date_emission_facture', { withTimezone: true }),
  },
  (table) => [
    unique('uq_paiement_reservation_type').on(table.reservation_id, table.type_paiement),
    index('idx_paiements_reservation_id').on(table.reservation_id),
  ]
);

// 7. Tokens Paiement Solde
export const tokensPaiementSolde = pgTable(
  'tokens_paiement_solde',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    reservation_id: uuid('reservation_id')
      .references(() => reservations.id, { onDelete: 'cascade' })
      .unique()
      .notNull(),
    token: varchar('token', { length: 255 }).unique().notNull(),
    date_creation: timestamp('date_creation', { withTimezone: true }).defaultNow().notNull(),
    date_expiration: timestamp('date_expiration', { withTimezone: true }).notNull(),
    est_utilise: boolean('est_utilise').default(false).notNull(),
  },
  (table) => [
    index('idx_tokens_reservation_id').on(table.reservation_id),
    index('idx_tokens_date_expiration').on(table.date_expiration),
  ]
);

// ====================================================================
// RELATIONS
// ====================================================================
export const usersRelations = relations(users, ({ many }) => ({
  reservations: many(reservations),
}));

export const alertesRelations = relations(alertes, ({ many }) => ({
  creneaux: many(creneaux),
}));

export const creneauxRelations = relations(creneaux, ({ one, many }) => ({
  alerte: one(alertes, {
    fields: [creneaux.alerte_id],
    references: [alertes.id],
  }),
  reservations: many(reservations),
}));

export const reservationsRelations = relations(reservations, ({ one, many }) => ({
  user: one(users, {
    fields: [reservations.user_id],
    references: [users.id],
  }),
  creneau: one(creneaux, {
    fields: [reservations.creneau_id],
    references: [creneaux.id],
  }),
  billets: many(billets),
  paiements: many(paiements),
  tokenPaiementSolde: one(tokensPaiementSolde, {
    fields: [reservations.id],
    references: [tokensPaiementSolde.reservation_id],
  }),
}));

export const billetsRelations = relations(billets, ({ one }) => ({
  reservation: one(reservations, {
    fields: [billets.reservation_id],
    references: [reservations.id],
  }),
}));

export const paiementsRelations = relations(paiements, ({ one }) => ({
  reservation: one(reservations, {
    fields: [paiements.reservation_id],
    references: [reservations.id],
  }),
}));

export const tokensPaiementSoldeRelations = relations(tokensPaiementSolde, ({ one }) => ({
  reservation: one(reservations, {
    fields: [tokensPaiementSolde.reservation_id],
    references: [reservations.id],
  }),
}));
