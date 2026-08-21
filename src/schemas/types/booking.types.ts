/**
 * booking.types.ts
 *
 * Types du domaine de réservation publique : critères de recherche, créneaux,
 * billets, clients, réservations, paiements et ports d'injection.
 * Aligné sur docs/uml/domain.puml (User, Creneau, Reservation, Billet,
 * Paiement, TokenPaiementSolde) et SPEC-RESERVATION-03.
 *
 * SPEC-ARCH-02 : couche isomorphe, n'importe que `config/` et `utils/`.
 */

import type {
  ActiviteTarifee,
  BilletTarifiable,
  PortTarife,
  RecapitulatifTarifaire,
} from '../../utils/pricing-rules';

export type { RecapitulatifTarifaire };

// ─── Énumérations du domaine (docs/uml/domain.puml) ──────────────────────────

export type Port = PortTarife;
export type Activite = ActiviteTarifee;
export type Role = 'CLIENT' | 'ADMIN';
export type TypeBillet = BilletTarifiable['typeBillet'];
export type TypePaiement = 'ACOMPTE' | 'SOLDE';
export type CanalPaiement = 'EN_LIGNE' | 'SUR_PLACE_CB';
export type StatutReservation =
  | 'EN_ATTENTE_PAIEMENT'
  | 'PAYEE_PARTIELLEMENT'
  | 'PAYEE_COMPLETEMENT'
  | 'ANNULEE';

// ─── Entités persistées ──────────────────────────────────────────────────────

/** Client ou administrateur. `motDePasse: null` = réservation en mode invité. */
export interface User {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: Role;
  motDePasse: string | null;
}

export interface Billet {
  typeBillet: TypeBillet;
}

/** Critères de sélection du parcours public : port, activité et date. */
export interface CriteresRecherche {
  port: Port;
  activite: Activite;
  date: Date;
}

/** Créneau retenu par le client : critères de recherche et heure de départ. */
export interface CreneauReserve extends CriteresRecherche {
  heureDepart: string;
}

export interface Reservation {
  reference: string;
  statut: StatutReservation;
  dateCreation: Date;
  creneau: CreneauReserve;
  billets: Billet[];
  montantTotal: number;
  montantAcompte: number;
  soldeRestantDu?: number;
  client?: User;
  referenceTransactionAcompte?: string | null;
  mentionReglementSolde?: string;
}

// ─── Vues du planning public ─────────────────────────────────────────────────

/** Créneau tel qu'affiché sur le parcours public. */
export interface CreneauDisponible {
  heureDepart: string;
  placesRestantes?: number;
  mention?: string;
  estReservable?: boolean;
  mentionAvertissement?: string;
}

/** Créneau placé sous alerte de pré-annulation météo (R-25). */
export interface CreneauSousAlerte {
  heureDepart: string;
  sousPreAlerte: boolean;
}

/** Créneau persisté transmis au filtrage de clôture H-2. */
export interface CreneauPlanifie {
  date: Date;
  heureDepart: string;
  port: Port;
  activite: Activite;
  placesLibres: number;
}

// ─── Ports d'injection (dépendances simulables) ──────────────────────────────

/** Persistance des réservations et de la jauge consommée par créneau. */
export interface DepotReservations {
  enregistrer(reservation: Reservation, placesBloquees: number): void;
  compterPlacesReservees(heureDepart: string): number;
}

export interface DebitBancaire {
  montant: number;
  referenceReservation: string;
}

export interface ResultatDebit {
  accepte: boolean;
  referenceTransaction: string | null;
}

export interface PasserellePaiement {
  debiter(debit: DebitBancaire): ResultatDebit;
}

export interface NotificationSms {
  destinataireTelephone: string;
  message: string;
  dateEnvoi: Date;
}

export interface EnvoiSms {
  envoyer(notification: NotificationSms): void;
}

// ─── Commandes et résultats ──────────────────────────────────────────────────

export interface CommandeReservation {
  client: User;
  creneau: CreneauReserve;
  billets: Billet[];
  dateCreation?: Date;
}

export interface PortsReservation {
  depot: DepotReservations;
  passerellePaiement: PasserellePaiement;
}

export interface ResultatEnregistrementReservation {
  reservation: Reservation | null;
  messageErreur: string | null;
  renouvellementPossible: boolean;
}

export interface DemandeReservation {
  creneau: CreneauPlanifie;
  placesDemandees: number;
}

export interface ResultatSoumission {
  accepte: boolean;
  motif: string | null;
  placesReservees: number;
}
