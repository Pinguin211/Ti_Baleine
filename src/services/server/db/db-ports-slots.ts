/**
 * Adaptateur PostgreSQL de configuration des créneaux et d'encaissement du
 * solde sur place (tables `creneaux`, `paiements`, `reservations`).
 * SPEC-ADMIN-07, SPEC-ADMIN-08 — alimente `fermerCreneau`, `rouvrirCreneau`,
 * `affecterNaviresCreneau`, `configurerActiviteCreneau` (non modifiés,
 * `actions/*.action.ts`) et `encaisserSoldeCbSurPlace` (non modifié,
 * `actions/encaisser-solde-cb-sur-place.ts`). Remplace
 * `services/server/demo/demo-ports-slots.ts`.
 *
 * Ces mutations appellent leurs ports de façon synchrone (sans `await`) :
 * les créneaux concernés et le référentiel des créneaux ouverts sont donc
 * pré-chargés avant l'appel du service pur, et l'écriture réelle en base
 * est différée à `persister()`, appelé par l'action après la décision.
 */
import 'server-only';
import { randomUUID } from 'node:crypto';
import { eq } from 'drizzle-orm';
import { db, schema } from '../../../lib/server/db/client';
import { depuisHeureSql, versHeureSql } from '../../../lib/server/db/format';
import type { CreneauSlotPort, DepotCreneaux } from '../../../schemas/types/slots-ports.types';

type LigneCreneau = typeof schema.creneaux.$inferSelect;

function versCreneauSlotPort(creneau: LigneCreneau): CreneauSlotPort {
  return {
    id: creneau.id,
    date: creneau.date,
    heureDepart: depuisHeureSql(creneau.heure_depart),
    port: creneau.port,
    activite: creneau.activite,
    navires: creneau.navires,
    estOuvert: creneau.est_ouvert,
    capaciteMaximale: creneau.capacite_maximale ?? undefined,
  };
}

async function ecrireCreneau(creneau: CreneauSlotPort): Promise<void> {
  await db
    .update(schema.creneaux)
    .set({
      est_ouvert: creneau.estOuvert,
      activite: (creneau.activite ?? 'BALEINES') as 'BALEINES' | 'DAUPHINS',
      navires: creneau.navires ?? [],
      capacite_maximale: creneau.capaciteMaximale ?? null,
      heure_depart: versHeureSql(creneau.heureDepart),
    })
    .where(eq(schema.creneaux.id, creneau.id));
}

/**
 * Port `depotCreneaux` scopé au créneau ciblé : préchargé (le créneau visé,
 * même fermé, et tous les créneaux ouverts pour les contrôles de conflit),
 * écriture différée via `persister()`.
 */
export async function construireDepotCreneauxDb(
  creneauCibleId: string,
): Promise<DepotCreneaux & { persister(): Promise<void> }> {
  const [tousOuverts, [cible]] = await Promise.all([
    db.select().from(schema.creneaux).where(eq(schema.creneaux.est_ouvert, true)),
    db.select().from(schema.creneaux).where(eq(schema.creneaux.id, creneauCibleId)).limit(1),
  ]);

  const cache = new Map<string, CreneauSlotPort>(tousOuverts.map((row) => [row.id, versCreneauSlotPort(row)]));
  if (cible) cache.set(cible.id, versCreneauSlotPort(cible));

  let creneauModifie: CreneauSlotPort | null = null;

  return {
    obtenirParId: (id: string) => cache.get(id),
    enregistrer: (creneau: CreneauSlotPort) => {
      creneauModifie = creneau;
      cache.set(creneau.id, creneau);
    },
    listerCreneauxReservablesPublic: () => Array.from(cache.values()).filter((creneau) => creneau.estOuvert),
    async persister() {
      if (creneauModifie) await ecrireCreneau(creneauModifie);
    },
  };
}

interface ReservationSoldeDu {
  reference: string;
  statut: string;
  montantTotal: number;
  montantAcompteRegle: number;
  soldeRestantDu: number;
  emailClient: string;
}

interface DetailSolde {
  reference: string;
  statut: string;
  montant_total: string;
  montant_acompte: string;
  user: { email: string };
}

function calculerVueSolde(detail: DetailSolde, paiements: number[]): ReservationSoldeDu {
  const montantTotal = Number(detail.montant_total);
  const regle = paiements.reduce((total, montant) => total + montant, 0);
  const soldeRestantDu = Math.max(0, Math.round((montantTotal - regle) * 100) / 100);
  return {
    reference: detail.reference,
    statut: soldeRestantDu <= 0 ? 'PAYEE_COMPLETEMENT' : detail.statut,
    montantTotal,
    montantAcompteRegle: Number(detail.montant_acompte),
    soldeRestantDu,
    emailClient: detail.user.email,
  };
}

async function persisterEncaissementSolde(
  reservationId: string,
  reference: string,
  encaissement: { montant: number; referenceTransaction: string },
  statutFinal: string,
): Promise<void> {
  await db.insert(schema.paiements).values({
    reservation_id: reservationId,
    type_paiement: 'SOLDE',
    canal_paiement: 'SUR_PLACE_CB',
    reference_transaction: encaissement.referenceTransaction,
    montant: encaissement.montant.toFixed(2),
    date_paiement: new Date(),
    reference_facture: `FAC-${reference}-SO`,
  });
  if (statutFinal === 'PAYEE_COMPLETEMENT') {
    await db.update(schema.reservations).set({ statut: 'PAYEE_COMPLETEMENT' }).where(eq(schema.reservations.id, reservationId));
  }
}

/**
 * Port `depotReservation` de `encaisserSoldeCbSurPlace` : réservation et
 * paiements préchargés, encaissement capturé en mémoire et rejoué en base
 * par `persister()`.
 */
export async function construireDepotReservationSoldeDb(reference: string) {
  const detail = await db.query.reservations.findFirst({
    where: eq(schema.reservations.reference, reference),
    with: { paiements: true, user: true },
  });
  if (!detail) throw new Error(`Réservation ${reference} introuvable`);

  let paiements = detail.paiements.map((paiement) => Number(paiement.montant));
  let encaissement: { montant: number; referenceTransaction: string } | null = null;

  return {
    chargerReservation: (_reference: string) => calculerVueSolde(detail, paiements),
    enregistrerEncaissementSolde: (_reference: string, montant: number) => {
      encaissement = { montant, referenceTransaction: `TXN-CB-${reference}-${randomUUID().slice(0, 8)}` };
      paiements = [...paiements, montant];
      return calculerVueSolde(detail, paiements);
    },
    async persister() {
      if (!encaissement) return;
      const vue = calculerVueSolde(detail, paiements);
      await persisterEncaissementSolde(detail.id, reference, encaissement, vue.statut);
    },
  };
}

/** Passerelle CB sur place simulée : accepte systématiquement l'encaissement (hors périmètre : terminal réel). */
export function construirePasserelleCbSurPlaceDb() {
  return {
    validerEncaissement: async (_montant: number) => ({
      referenceTransaction: `TXN-CB-${randomUUID().slice(0, 10)}`,
    }),
  };
}

export function construireHorlogeSlotsDb() {
  return { maintenant: () => new Date() };
}
