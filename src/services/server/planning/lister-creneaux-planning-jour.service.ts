import 'server-only';
import { and, eq, gte, lte } from 'drizzle-orm';
import { db } from '../../../lib/server/db/client';
import { creneaux } from '../../../../drizzle/schema';
import { PORT_LABELS, ACTIVITE_LABELS } from '../../../utils/slot-rules';
import { formaterDateSql } from '../../../utils/formater-date-sql.util';
import { premierJourDuMois, decalerDeMois } from '../../../utils/mois-navigation.util';
import type { CreneauPlanningPersiste } from '../../../schemas/types/planning.types';

/**
 * Note (docs/signature.md §6.2) : les navires mobilisés ne sont pas
 * persistés en base (aucune colonne/table dédiée) — le champ reste
 * `undefined`, géré par `obtenirGrillePlanningConsolidee` comme
 * « non affecté » (CASE-ADMIN-005). SPEC-ADMIN-07 introduira la
 * persistance réelle de l'affectation.
 */
export async function listerCreneauxPersistesDuJour(date: Date): Promise<CreneauPlanningPersiste[]> {
  const lignes = await db.select().from(creneaux).where(eq(creneaux.date, formaterDateSql(date)));

  return lignes.map((ligne) => ({
    id: ligne.id,
    date,
    heureDepart: ligne.heure_depart.slice(0, 5),
    port: PORT_LABELS[ligne.port],
    activite: ACTIVITE_LABELS[ligne.activite],
    estOuvert: ligne.est_ouvert,
    sousPreAlerte: ligne.sous_pre_alerte,
  }));
}

/**
 * Créneaux persistés couvrant le mois calendaire de `moisAffiche`, pour la
 * vue calendrier planning (SPEC-ADMIN-01). Chaque ligne porte sa propre date,
 * contrairement à `listerCreneauxPersistesDuJour` où la date est fixée par
 * le paramètre.
 */
export async function listerCreneauxPersistesDuMois(moisAffiche: Date): Promise<CreneauPlanningPersiste[]> {
  const debutMois = formaterDateSql(premierJourDuMois(moisAffiche));
  const finMois = formaterDateSql(new Date(decalerDeMois(moisAffiche, 1).getTime() - 1));

  const lignes = await db
    .select()
    .from(creneaux)
    .where(and(gte(creneaux.date, debutMois), lte(creneaux.date, finMois)));

  return lignes.map((ligne) => ({
    id: ligne.id,
    date: new Date(`${ligne.date}T00:00:00`),
    heureDepart: ligne.heure_depart.slice(0, 5),
    port: PORT_LABELS[ligne.port],
    activite: ACTIVITE_LABELS[ligne.activite],
    estOuvert: ligne.est_ouvert,
    sousPreAlerte: ligne.sous_pre_alerte,
  }));
}
