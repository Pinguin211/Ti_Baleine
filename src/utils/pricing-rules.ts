/**
 * pricing-rules.ts
 *
 * Calculs tarifaires purs du parcours de réservation : tarifs unitaires,
 * majoration géographique, forfait de privatisation, acompte obligatoire et
 * solde restant dû.
 * Référence : SPEC-RESERVATION-03 (AC-4, AC-5, R-04, R-05, R-07).
 *
 * SPEC-ARCH-02 : la couche `utils/` ne peut importer que `config/`. Les formes
 * d'entrée sont donc décrites localement de façon structurelle ; les types
 * canoniques du domaine sont réexportés par `schemas/types/booking.types.ts`.
 */

import {
  GRILLE_TARIFAIRE_ACTIVITES,
  MAJORATION_INDIVIDUELLE_PAR_PORT,
} from '../config/pricing.constants';

/** Activités disposant d'un paramétrage tarifaire (ConfigActivite). */
export type ActiviteTarifee = keyof typeof GRILLE_TARIFAIRE_ACTIVITES;

/** Ports disposant d'un paramétrage de majoration individuelle (ConfigPort). */
export type PortTarife = keyof typeof MAJORATION_INDIVIDUELLE_PAR_PORT;

/** Billet réduit à ce dont le calcul tarifaire a besoin. */
export interface BilletTarifiable {
  typeBillet: 'ADULTE' | 'ENFANT' | 'PRIVATISATION';
}

/** Critères de recherche réduits à ce dont le calcul tarifaire a besoin. */
export interface CriteresTarification {
  port: PortTarife;
  activite: ActiviteTarifee;
}

/** Ventilation financière présentée au client avant paiement. */
export interface RecapitulatifTarifaire {
  tarifUnitaireAdulte: number;
  tarifUnitaireEnfant: number;
  montantTotal: number;
  montantAcompte: number;
  soldeRestantDu: number;
}

/** Arrondit un montant au centime, les taux d'acompte étant fractionnaires. */
export function arrondirMontant(montant: number): number {
  return Math.round(montant * 100) / 100;
}

/** Additionne les billets individuels aux tarifs unitaires applicables. */
export function cumulerBilletsIndividuels(
  billets: readonly BilletTarifiable[],
  tarifUnitaireAdulte: number,
  tarifUnitaireEnfant: number,
): number {
  return billets.reduce(
    (total, billet) =>
      total + (billet.typeBillet === 'ADULTE' ? tarifUnitaireAdulte : tarifUnitaireEnfant),
    0,
  );
}

/**
 * Calcule la ventilation financière d'un panier : montant total (forfait de
 * privatisation ou somme des billets majorés du supplément géographique du
 * port), acompte obligatoire au taux de l'activité et solde restant dû.
 */
export function calculerRecapitulatifTarifaire(
  billets: readonly BilletTarifiable[],
  recherche: CriteresTarification,
): RecapitulatifTarifaire {
  const configuration = GRILLE_TARIFAIRE_ACTIVITES[recherche.activite];
  const majoration = MAJORATION_INDIVIDUELLE_PAR_PORT[recherche.port];
  const estForfaitaire = configuration.forfait !== null;
  const tarifUnitaireAdulte = estForfaitaire ? 0 : configuration.tarifBaseAdulte + majoration;
  const tarifUnitaireEnfant = estForfaitaire ? 0 : configuration.tarifBaseEnfant + majoration;
  const montantTotal = arrondirMontant(
    configuration.forfait ??
      cumulerBilletsIndividuels(billets, tarifUnitaireAdulte, tarifUnitaireEnfant),
  );
  const montantAcompte = arrondirMontant(montantTotal * configuration.tauxAcompte);

  return {
    tarifUnitaireAdulte,
    tarifUnitaireEnfant,
    montantTotal,
    montantAcompte,
    soldeRestantDu: arrondirMontant(montantTotal - montantAcompte),
  };
}
