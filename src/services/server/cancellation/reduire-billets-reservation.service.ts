/**
 * Service métier de réduction de passagers sur une réservation existante.
 * SPEC-ADMIN-03 | CASE-ADMIN-030, CASE-ADMIN-031, CASE-ADMIN-032
 */

import type { Billet } from '../../../schemas/types/cancellation.types';

export interface CreneauPourReduction {
  date: Date;
  heureDepart: string;
  port: string;
}

export interface ReservationPourReductionService {
  reference: string;
  statut: string;
  creneau: CreneauPourReduction;
  billets: Billet[];
  montantTotal?: number;
}

export interface PortsReductionBillets {
  depotBillets: { supprimerBillets(reference: string, billets: Billet[]): void };
  depotCreneau?: { libererPlaces(creneau: CreneauPourReduction, nombrePlaces: number): void };
  horloge?: { maintenant(): Date };
  passerelleRemboursement?: { rembourser(montant: number): void };
}

function estCreneauPasse(date: Date, heureDepart: string, maintenant: Date): boolean {
  const [h, m] = heureDepart.replace('h', ':').split(':').map((val) => Number(val) || 0);
  const depart = new Date(date);
  depart.setHours(h, m, 0, 0);
  return maintenant > depart;
}

function extraireBilletsASupprimer(
  billets: Billet[],
  adultesARetirer: number,
  enfantsARetirer: number
): Billet[] {
  const adultes = billets.filter((b) => b.typeBillet === 'ADULTE').slice(0, adultesARetirer);
  const enfants = billets.filter((b) => b.typeBillet === 'ENFANT').slice(0, enfantsARetirer);
  return [...adultes, ...enfants];
}

export function reduireBilletsReservation(
  commande: {
    reservation: ReservationPourReductionService;
    adultesARetirer: number;
    enfantsARetirer: number;
  },
  ports: PortsReductionBillets
): { succes: boolean; message?: string; billetsSupprimes?: number; traitementFinancier?: string } {
  const { reservation, adultesARetirer, enfantsARetirer } = commande;

  if (ports.horloge && estCreneauPasse(reservation.creneau.date, reservation.creneau.heureDepart, ports.horloge.maintenant())) {
    return { succes: false, message: 'Opération refusée : échéance dépassée' };
  }

  const billetsASupprimer = extraireBilletsASupprimer(reservation.billets, adultesARetirer, enfantsARetirer);
  ports.depotBillets.supprimerBillets(reservation.reference, billetsASupprimer);

  if (ports.depotCreneau) {
    ports.depotCreneau.libererPlaces(reservation.creneau, billetsASupprimer.length);
  }

  return {
    succes: true,
    billetsSupprimes: billetsASupprimer.length,
    traitementFinancier: 'MANUEL_HORS_SYSTEME',
  };
}
