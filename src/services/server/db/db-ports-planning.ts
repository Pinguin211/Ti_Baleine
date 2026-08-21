/**
 * Adaptateur PostgreSQL de lecture pour le planning administrateur et le
 * parcours public post-réservation (tables `creneaux`, `reservations`,
 * `billets`, `paiements`, `users`). SPEC-ADMIN-01 — alimente
 * `obtenirGrillePlanningConsolidee`, `obtenirDetailCreneau` et
 * `obtenirStatutsFinanciersReservations` (non modifiés) depuis
 * `app/admin/planning`, `app/admin/reservations`,
 * `app/admin/reservations/detail`, `app/admin/configuration`,
 * `app/admin/alertes` et `app/reservation/confirmation`.
 * Remplace `services/server/demo/demo-ports-planning.ts` et les accès
 * directs à `demo-store.ts` faits par ces pages.
 */
import 'server-only';
import { and, eq, gte, inArray } from 'drizzle-orm';
import { db, schema } from '../../../lib/server/db/client';
import { versDateSql, depuisDateSql, depuisHeureSql } from '../../../lib/server/db/format';

export { depuisDateSql, depuisHeureSql };
import { PORT_LABELS, ACTIVITE_LABELS, NAVIRE_LABELS, estMemeJour } from '../../../utils/slot-rules';

type LigneCreneau = typeof schema.creneaux.$inferSelect;
type LignePaiement = typeof schema.paiements.$inferSelect;

type LabelMap = Record<string, string>;

/** Convertit un créneau persisté en entrée attendue par `obtenirGrillePlanningConsolidee`/`obtenirDetailCreneau`. */
export function versCreneauPlanningPersiste(creneau: LigneCreneau) {
  return {
    id: creneau.id,
    date: depuisDateSql(creneau.date),
    heureDepart: depuisHeureSql(creneau.heure_depart),
    port: PORT_LABELS[creneau.port as 'SAINT_GILLES' | 'SAINT_LEU'],
    activite: creneau.activite ? ((ACTIVITE_LABELS as LabelMap)[creneau.activite] ?? creneau.activite) : null,
    navires: creneau.navires.map((navire) => (NAVIRE_LABELS as LabelMap)[navire] ?? navire),
    estOuvert: creneau.est_ouvert,
    sousPreAlerte: creneau.sous_pre_alerte,
  };
}

export function libellePort(port: 'SAINT_GILLES' | 'SAINT_LEU'): string {
  return PORT_LABELS[port];
}

export function memeJour(a: Date, b: Date): boolean {
  return estMemeJour(a, b);
}

/** Solde restant dû : montant figé à la réservation, moins la somme des paiements enregistrés. */
export function soldeRestantDu(montantTotal: string, paiements: LignePaiement[]): number {
  const regle = paiements.reduce((total, paiement) => total + Number(paiement.montant), 0);
  return Math.max(0, Math.round((Number(montantTotal) - regle) * 100) / 100);
}

/** Tous les créneaux d'une journée calendaire, tous ports confondus (grille planning). */
export async function chargerCreneauxDuJour(date: Date): Promise<LigneCreneau[]> {
  return db.select().from(schema.creneaux).where(eq(schema.creneaux.date, versDateSql(date)));
}

/** Réservations actives (avec billets) rattachées à un ensemble de créneaux. */
export async function chargerReservationsParCreneauIds(creneauIds: string[]) {
  if (creneauIds.length === 0) return [];
  return db.query.reservations.findMany({
    where: inArray(schema.reservations.creneau_id, creneauIds),
    with: { billets: true, paiements: true },
  });
}

/** Toutes les réservations, avec client et créneau, triées par date de création décroissante. */
export async function chargerToutesReservationsAvecDetails() {
  const reservations = await db.query.reservations.findMany({
    with: { billets: true, paiements: true, user: true, creneau: true },
    orderBy: (table, { desc }) => [desc(table.date_creation)],
  });
  return reservations;
}

/** Réservation unique par référence, avec client, créneau, billets et paiements. */
export async function chargerDetailReservation(reference: string) {
  return db.query.reservations.findFirst({
    where: eq(schema.reservations.reference, reference),
    with: { billets: true, paiements: true, user: true, creneau: true },
  });
}

/** Prochains créneaux programmés (toutes dates à venir), pour l'écran de configuration. */
export async function chargerProchainsCreneaux(limite: number): Promise<LigneCreneau[]> {
  const aujourdHui = versDateSql(new Date());
  const creneaux = await db
    .select()
    .from(schema.creneaux)
    .where(gte(schema.creneaux.date, aujourdHui))
    .orderBy(schema.creneaux.date, schema.creneaux.heure_depart)
    .limit(limite);
  return creneaux;
}

/** Créneaux d'une journée non déjà sous pré-alerte, avec leurs réservataires actifs (alerte groupée). */
export async function chargerCreneauxPourAlerte(date: Date) {
  const creneaux = await db
    .select()
    .from(schema.creneaux)
    .where(and(eq(schema.creneaux.date, versDateSql(date)), eq(schema.creneaux.sous_pre_alerte, false)));

  const creneauxAvecReservataires = await Promise.all(
    creneaux.map(async (creneau) => {
      const reservations = await db.query.reservations.findMany({
        where: eq(schema.reservations.creneau_id, creneau.id),
        with: { billets: true, user: true },
      });
      const reservataires = reservations
        .filter((reservation) => reservation.billets.length > 0)
        .map((reservation) => ({
          nom: reservation.user.nom,
          prenom: reservation.user.prenom,
          email: reservation.user.email,
          telephone: reservation.user.telephone,
        }));
      return { creneau, reservataires };
    }),
  );

  return creneauxAvecReservataires;
}
