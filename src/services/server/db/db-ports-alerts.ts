/**
 * Adaptateur PostgreSQL d'alerte groupée de pré-annulation (tables
 * `creneaux`, `reservations`). SPEC-ADMIN-06 — alimente
 * `actions/alerte-groupee.action.ts`. Remplace
 * `services/server/demo/demo-ports-alerts.ts`.
 *
 * L'envoi SMS/e-mail reste simulé (journalisé) : aucun Twilio/SMTP réel
 * configuré dans ce périmètre. Le basculement `sous_pre_alerte` est capturé
 * en mémoire par `depotCreneau.basculerSousPreAlerte` (appelé
 * synchroniquement par l'orchestration) et rejoué en base par `persister()`.
 */
import 'server-only';
import { eq, inArray } from 'drizzle-orm';
import { db, schema } from '../../../lib/server/db/client';
import { depuisDateSql, depuisHeureSql } from '../../../lib/server/db/format';

/** Créneaux ciblés par une campagne, avec leurs réservataires actifs (billets > 0). */
export async function chargerCreneauxCiblesAlerte(creneauIds: string[]) {
  if (creneauIds.length === 0) return [];
  const creneaux = await db.select().from(schema.creneaux).where(inArray(schema.creneaux.id, creneauIds));

  return Promise.all(
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

      return {
        id: creneau.id,
        date: depuisDateSql(creneau.date),
        heureDepart: depuisHeureSql(creneau.heure_depart),
        port: creneau.port,
        activite: creneau.activite ?? 'BALEINES',
        estOuvert: creneau.est_ouvert,
        sousPreAlerte: creneau.sous_pre_alerte,
        reservataires,
      };
    }),
  );
}

export function construirePortsAlerteDb() {
  const creneauxAMettreAJour: string[] = [];

  return {
    envoiSms: {
      envoyer: (sms: { destinataireTelephone: string; message: string }) => {
        console.log(`[sms simulé] → ${sms.destinataireTelephone} : ${sms.message}`);
      },
    },
    envoiEmail: {
      envoyer: (email: { destinataireEmail: string; sujet: string; corpsMessage: string }) => {
        console.log(`[email simulé] → ${email.destinataireEmail} : ${email.sujet}`);
      },
    },
    depotCreneau: {
      basculerSousPreAlerte: (creneauId: string) => {
        creneauxAMettreAJour.push(creneauId);
      },
      estSousPreAlerte: (_creneauId: string) => false,
    },
    journal: {
      consignerEchec: (echec: { destinataire: string; canal: string; motif: string }) => console.error('[alerte]', echec),
    },
    async persister() {
      if (creneauxAMettreAJour.length === 0) return;
      await db.update(schema.creneaux).set({ sous_pre_alerte: true }).where(inArray(schema.creneaux.id, creneauxAMettreAJour));
    },
  };
}
