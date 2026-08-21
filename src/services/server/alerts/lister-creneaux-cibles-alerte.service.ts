import 'server-only';
import { and, eq, ne } from 'drizzle-orm';
import { db } from '../../../lib/server/db/client';
import { creneaux, reservations, users } from '../../../../drizzle/schema';
import { PORT_LABELS, ACTIVITE_LABELS } from '../../../utils/slot-rules';
import { formaterDateSql } from '../../../utils/formater-date-sql.util';
import type { CreneauCibleAlerte } from '../../../schemas/types/alerte.types';

type LigneCreneauReservataire = {
  creneauId: string;
  heureDepart: string;
  port: 'SAINT_GILLES' | 'SAINT_LEU';
  activite: 'BALEINES' | 'DAUPHINS' | 'PRIVATISATION_TIKAP' | 'PRIVATISATION_GRAND_BLEU';
  estOuvert: boolean;
  sousPreAlerte: boolean;
  nom: string | null;
  prenom: string | null;
  email: string | null;
  telephone: string | null;
};

/** Regroupe les lignes jointes par créneau, dédupliquées par e-mail réservataire. */
function regrouperParCreneau(lignes: LigneCreneauReservataire[], lendemain: Date): CreneauCibleAlerte[] {
  const parCreneau = new Map<string, CreneauCibleAlerte>();
  for (const ligne of lignes) {
    if (!parCreneau.has(ligne.creneauId)) {
      parCreneau.set(ligne.creneauId, {
        id: ligne.creneauId,
        date: lendemain,
        heureDepart: ligne.heureDepart.slice(0, 5),
        port: PORT_LABELS[ligne.port],
        activite: ACTIVITE_LABELS[ligne.activite],
        estOuvert: ligne.estOuvert,
        sousPreAlerte: ligne.sousPreAlerte,
        reservataires: [],
      });
    }
    if (!ligne.email) continue;
    const cible = parCreneau.get(ligne.creneauId)!;
    if (!cible.reservataires.some((r) => r.email === ligne.email)) {
      cible.reservataires.push({ nom: ligne.nom!, prenom: ligne.prenom!, email: ligne.email, telephone: ligne.telephone! });
    }
  }
  return Array.from(parCreneau.values());
}

/**
 * Créneaux du lendemain avec leurs réservataires actifs (réservation non
 * `ANNULEE`), pour la sélection de diffusion d'alerte météo à 18h
 * (SPEC-ADMIN-06). Un même client réservant plusieurs billets sur un
 * créneau n'apparaît qu'une fois (déduplication par email).
 */
export async function listerCreneauxCiblesAlerteDuLendemain(dateDuJour: Date): Promise<CreneauCibleAlerte[]> {
  const lendemain = new Date(dateDuJour.getTime());
  lendemain.setDate(lendemain.getDate() + 1);

  const lignes = await db
    .select({
      creneauId: creneaux.id,
      date: creneaux.date,
      heureDepart: creneaux.heure_depart,
      port: creneaux.port,
      activite: creneaux.activite,
      estOuvert: creneaux.est_ouvert,
      sousPreAlerte: creneaux.sous_pre_alerte,
      nom: users.nom,
      prenom: users.prenom,
      email: users.email,
      telephone: users.telephone,
    })
    .from(creneaux)
    .leftJoin(
      reservations,
      and(eq(reservations.creneau_id, creneaux.id), ne(reservations.statut, 'ANNULEE'))
    )
    .leftJoin(users, eq(users.id, reservations.user_id))
    .where(eq(creneaux.date, formaterDateSql(lendemain)));

  return regrouperParCreneau(lignes, lendemain);
}
