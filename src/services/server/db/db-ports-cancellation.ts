/**
 * Adaptateur PostgreSQL d'annulation et de réduction de billets (tables
 * `reservations`, `billets`). SPEC-ADMIN-02, SPEC-ADMIN-03 — alimente
 * `annulerReservationService`, `reduireBilletsReservation` et
 * `confirmerAnnulationApresReduction` (non modifiés,
 * `services/server/cancellation/`) depuis
 * `actions/annulation-reservation.action.ts` et
 * `actions/reduction-billets.action.ts`. Remplace
 * `services/server/demo/demo-ports-cancellation.ts`.
 *
 * Ces services appellent leurs ports de façon synchrone (annulation) ou sont
 * eux-mêmes synchrones (réduction) : la réservation ciblée (billets, créneau,
 * client) est donc préchargée, les suppressions sont capturées en mémoire, et
 * l'écriture réelle en base est différée à `persister()`, appelé par
 * l'action après la décision du service pur. L'envoi du SMS informatif reste
 * simulé (journalisé) : aucun Twilio réel configuré dans ce périmètre.
 */
import 'server-only';
import { eq, inArray } from 'drizzle-orm';
import { db, schema } from '../../../lib/server/db/client';
import { depuisDateSql, depuisHeureSql } from '../../../lib/server/db/format';

/**
 * Réservation, créneau, billets et client nécessaires à une
 * annulation/réduction. `creneauDomaine` porte la date/l'heure déjà
 * converties au format du domaine (`Date`, « 09h00 ») : `actions/` ne peut
 * pas importer `lib/server/db/format` directement (SPEC-ARCH-02,
 * CASE-ARCH-1014, réservé à `services/`).
 */
export async function chargerReservationAnnulable(reference: string) {
  const detail = await db.query.reservations.findFirst({
    where: eq(schema.reservations.reference, reference),
    with: { billets: true, user: true, creneau: true },
  });
  if (!detail) throw new Error(`Réservation ${reference} introuvable`);
  return {
    ...detail,
    creneauDomaine: {
      date: depuisDateSql(detail.creneau.date),
      heureDepart: depuisHeureSql(detail.creneau.heure_depart),
      port: detail.creneau.port,
    },
  };
}

function simulerEnvoiSms(message: { destinataireTelephone: string; message: string }): void {
  console.log(`[sms simulé] → ${message.destinataireTelephone} : ${message.message}`);
}

/** Ports d'annulation complète, scopés à une réservation préchargée. */
export function construirePortsAnnulationDb(reservationId: string, nombreBillets: number) {
  let toutSupprime = false;

  return {
    depotReservation: {
      supprimerTousLesBillets: (_reference: string) => {
        toutSupprime = true;
        return nombreBillets;
      },
    },
    depotCreneau: { libererPlaces: (_cible: unknown, _nombre: number) => undefined },
    passerelleSms: { envoyer: simulerEnvoiSms },
    horloge: { maintenant: () => new Date() },
    journal: {
      consignerErreur: (evenement: { code: string; details: string }) => console.error('[annulation]', evenement),
    },
    async persister() {
      if (!toutSupprime) return;
      await db.delete(schema.billets).where(eq(schema.billets.reservation_id, reservationId));
      await db.update(schema.reservations).set({ statut: 'ANNULEE' }).where(eq(schema.reservations.id, reservationId));
    },
  };
}

/** Ports de réduction sélective, scopés à une réservation préchargée. */
export function construirePortsReductionDb(reservationId: string, totalBillets: number) {
  let idsASupprimer: string[] = [];

  return {
    depotBillets: {
      // `billetsASupprimer` n'est typé `{ typeBillet }` que par le contrat du
      // service pur (`DepotBillets` local à reduire-billets-reservation.service.ts) ;
      // ce sont en réalité les mêmes objets que ceux passés en commande par
      // `actions/reduction-billets.action.ts` (`billetsAvecId`), qui portent
      // aussi `id` — jamais reconstruits par le service pur, juste filtrés/tranchés.
      supprimerBillets: (_reference: string, billetsASupprimer: { typeBillet: string }[]) => {
        idsASupprimer = (billetsASupprimer as { id: string; typeBillet: string }[]).map((billet) => billet.id);
      },
    },
    depotCreneau: { libererPlaces: (_creneau: unknown, _nombrePlaces: number) => undefined },
    horloge: { maintenant: () => new Date() },
    journalAudit: { consigner: (_entree: { reservationReference: string }) => undefined },
    async persister() {
      if (idsASupprimer.length === 0) return;
      await db.delete(schema.billets).where(inArray(schema.billets.id, idsASupprimer));
      if (totalBillets - idsASupprimer.length <= 0) {
        await db.update(schema.reservations).set({ statut: 'ANNULEE' }).where(eq(schema.reservations.id, reservationId));
      }
    },
  };
}

/** Ports de confirmation d'annulation après bascule depuis une réduction totale. */
export function construirePortsConfirmationDb(reservationId: string) {
  let supprime = false;

  return {
    depotBillets: {
      supprimerBillets: (_reference: string, _billetsASupprimer: unknown[]) => {
        supprime = true;
      },
    },
    envoiSMS: { envoyer: simulerEnvoiSms },
    async persister() {
      if (!supprime) return;
      await db.delete(schema.billets).where(eq(schema.billets.reservation_id, reservationId));
      await db.update(schema.reservations).set({ statut: 'ANNULEE' }).where(eq(schema.reservations.id, reservationId));
    },
  };
}
