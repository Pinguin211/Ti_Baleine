/**
 * Service métier de réduction de passagers sur une réservation existante.
 * SPEC-ADMIN-03 | CASE-ADMIN-023, CASE-ADMIN-024, CASE-ADMIN-025, CASE-ADMIN-026,
 * CASE-ADMIN-030, CASE-ADMIN-031, CASE-ADMIN-032
 *
 * Retire sélectivement N billets adultes et/ou enfants d'une réservation, libère
 * synchroniquement le même nombre de places sur le créneau, et consigne une trace
 * d'audit lorsqu'un journal est fourni. Lorsque le retrait demandé porte sur la
 * totalité des billets actifs, bascule sur le flux d'annulation complète
 * (SPEC-ADMIN-02) plutôt que de supprimer directement les billets.
 * Rejette toute opération si l'échéance du créneau est dépassée (CASE-ADMIN-030).
 * Aucun remboursement bancaire automatique n'est initié (traitement manuel hors système, CASE-ADMIN-032).
 */

interface Billet {
  typeBillet: 'ADULTE' | 'ENFANT' | 'PRIVATISATION';
}

interface CreneauReference {
  date: Date;
  heureDepart: string;
  port: string;
}

interface ReservationPourReduction {
  reference: string;
  statut?: string;
  creneau: CreneauReference;
  billets: Billet[];
  montantTotal?: number;
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

interface Horloge {
  maintenant(): Date;
}

interface PasserelleRemboursement {
  rembourser(montant: number): void;
}

interface JournalAudit {
  consigner?(entree: { reservationReference: string }): void;
}

export interface PortsReduction {
  depotBillets: DepotBillets;
  depotCreneau?: DepotCreneauReduction;
  horloge?: Horloge;
  passerelleRemboursement?: PasserelleRemboursement;
  journalAudit?: JournalAudit;
}

export interface ResultatReduction {
  succes: boolean;
  message?: string;
  billetsRetires?: number;
  billetsSupprimes?: number;
  type?: 'BASCULE_ANNULATION_REQUISE';
  calculRemboursementIndicatif?: unknown;
  motifRequis?: boolean;
  traitementFinancier?: string;
}

function estCreneauPasse(date: Date, heureDepart: string, maintenant: Date): boolean {
  const [h, m] = heureDepart.replace('h', ':').split(':').map((val) => Number(val) || 0);
  const depart = new Date(date);
  depart.setHours(h, m, 0, 0);
  return maintenant > depart;
}

function calculerRemboursementIndicatifStandard(
  reservation: ReservationPourReduction,
): { sommePayee: number; remboursementIndicatif: number; regime: 'STANDARD' } {
  const sommePayee = reservation.montantAcompteVerse ?? 0;
  return { sommePayee, remboursementIndicatif: sommePayee, regime: 'STANDARD' };
}

function basculerVersAnnulation(reservation: ReservationPourReduction): ResultatReduction {
  return {
    succes: true,
    type: 'BASCULE_ANNULATION_REQUISE',
    calculRemboursementIndicatif: calculerRemboursementIndicatifStandard(reservation),
    motifRequis: true,
  };
}

function extraireBilletsASupprimer(
  billets: Billet[],
  adultesARetirer: number,
  enfantsARetirer: number,
): Billet[] {
  const adultes = billets.filter((b) => b.typeBillet === 'ADULTE').slice(0, adultesARetirer);
  const enfants = billets.filter((b) => b.typeBillet === 'ENFANT').slice(0, enfantsARetirer);
  return [...adultes, ...enfants];
}

/**
 * Retire sélectivement N billets adultes/enfants d'une réservation et libère
 * les places correspondantes sur le créneau.
 */
export function reduireBilletsReservation(
  commande: CommandeReduction,
  ports: PortsReduction,
): ResultatReduction {
  const { reservation, adultesARetirer, enfantsARetirer } = commande;

  if (
    ports.horloge &&
    estCreneauPasse(reservation.creneau.date, reservation.creneau.heureDepart, ports.horloge.maintenant())
  ) {
    return { succes: false, message: 'Opération refusée : échéance dépassée' };
  }

  const totalARetirer = adultesARetirer + enfantsARetirer;
  if (totalARetirer >= reservation.billets.length) {
    return basculerVersAnnulation(reservation);
  }

  const billetsASupprimer = extraireBilletsASupprimer(reservation.billets, adultesARetirer, enfantsARetirer);
  const billetsRetires = billetsASupprimer.length;

  ports.depotBillets.supprimerBillets(reservation.reference, billetsASupprimer);
  ports.depotCreneau?.libererPlaces(reservation.creneau, billetsRetires);
  ports.journalAudit?.consigner?.({ reservationReference: reservation.reference });

  return {
    succes: true,
    billetsRetires,
    billetsSupprimes: billetsRetires,
    traitementFinancier: 'MANUEL_HORS_SYSTEME',
  };
}
