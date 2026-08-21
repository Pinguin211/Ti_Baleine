/**
 * Retrait sélectif de N billets adultes et/ou enfants d'une réservation.
 * SPEC-ADMIN-03 | CASE-ADMIN-023, CASE-ADMIN-024, CASE-ADMIN-025, CASE-ADMIN-026
 *
 * Supprime sélectivement les billets demandés, libère synchroniquement le
 * même nombre de places sur le créneau, et consigne une trace d'audit
 * lorsqu'un journal est fourni. Lorsque le retrait demandé porte sur la
 * totalité des billets actifs, bascule sur le flux d'annulation complète
 * (SPEC-ADMIN-02) plutôt que de supprimer directement les billets : le
 * calcul indicatif de remboursement est exposé et un motif est requis avant
 * toute suppression effective (voir `confirmer-annulation-apres-reduction.service.ts`).
 *
 * Le calcul indicatif est recalculé localement (plafonné aux sommes perçues,
 * SPEC-ADMIN-02 R-29) plutôt qu'importé de `calculer-remboursement-indicatif.service.ts`
 * — SPEC-ARCH-02 interdit les imports croisés entre fichiers de `services/server/`.
 */

interface Billet {
  typeBillet: 'ADULTE' | 'ENFANT' | 'PRIVATISATION';
}

interface CreneauReference {
  date: Date;
  heureDepart: string;
  port: 'SAINT_GILLES' | 'SAINT_LEU';
}

interface ReservationPourReduction {
  reference: string;
  creneau: CreneauReference;
  billets: Billet[];
  montantAcompteVerse?: number;
}

interface CommandeReduction {
  reservation: ReservationPourReduction;
  adultesARetirer: number;
  enfantsARetirer: number;
}

interface DepotBillets {
  supprimerBillets(reference: string, billetsASupprimer: Billet[]): void;
}

interface DepotCreneauReduction {
  libererPlaces(creneau: CreneauReference, nombrePlaces: number): void;
}

interface JournalAudit {
  consigner(entree: { reservationReference: string }): void;
}

interface PortsReduction {
  depotBillets: DepotBillets;
  depotCreneau?: DepotCreneauReduction;
  journalAudit?: JournalAudit;
}

interface ResultatReduction {
  succes: true;
  billetsRetires?: number;
  type?: 'BASCULE_ANNULATION_REQUISE';
  calculRemboursementIndicatif?: unknown;
  motifRequis?: boolean;
}

/**
 * Calcul indicatif de remboursement en régime standard, plafonné aux sommes
 * perçues (SPEC-ADMIN-02, R-29).
 */
function calculerRemboursementIndicatifStandard(
  reservation: ReservationPourReduction,
): { sommePayee: number; remboursementIndicatif: number; regime: 'STANDARD' } {
  const sommePayee = reservation.montantAcompteVerse ?? 0;
  return { sommePayee, remboursementIndicatif: sommePayee, regime: 'STANDARD' };
}

/**
 * Bascule sur le flux d'annulation complète lorsque le retrait demandé
 * porte sur la totalité des billets actifs (SPEC-ADMIN-03, CASE-ADMIN-026).
 */
function basculerVersAnnulation(reservation: ReservationPourReduction): ResultatReduction {
  return {
    succes: true,
    type: 'BASCULE_ANNULATION_REQUISE',
    calculRemboursementIndicatif: calculerRemboursementIndicatifStandard(reservation),
    motifRequis: true,
  };
}

function construireBilletsARetirer(
  adultesARetirer: number,
  enfantsARetirer: number,
): Billet[] {
  const adultes = Array.from({ length: adultesARetirer }, (): Billet => ({
    typeBillet: 'ADULTE',
  }));
  const enfants = Array.from({ length: enfantsARetirer }, (): Billet => ({
    typeBillet: 'ENFANT',
  }));
  return [...adultes, ...enfants];
}

/**
 * Retire sélectivement N billets adultes/enfants d'une réservation et libère
 * les places correspondantes sur le créneau (SPEC-ADMIN-03, CASE-ADMIN-023,
 * 024, 025).
 */
export function reduireBilletsReservation(
  commande: CommandeReduction,
  ports: PortsReduction,
): ResultatReduction {
  const { reservation, adultesARetirer, enfantsARetirer } = commande;
  const billetsARetirer = construireBilletsARetirer(adultesARetirer, enfantsARetirer);
  const billetsRetires = billetsARetirer.length;

  if (billetsRetires >= reservation.billets.length) {
    return basculerVersAnnulation(reservation);
  }

  ports.depotBillets.supprimerBillets(reservation.reference, billetsARetirer);
  ports.depotCreneau?.libererPlaces(reservation.creneau, billetsRetires);
  ports.journalAudit?.consigner({ reservationReference: reservation.reference });

  return { succes: true, billetsRetires };
}
