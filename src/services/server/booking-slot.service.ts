/**
 * booking-slot.service.ts
 *
 * Composition du planning public : créneaux ouverts à la vente par port et par
 * date, jauge restante, mention d'avertissement de pré-annulation, clôture
 * automatique des ventes à H-2 et fermeture annuelle.
 * Référence : SPEC-RESERVATION-03 (AC-2, AC-3, AC-7, R-01, R-02, R-11, R-25),
 * CASE-RES-400 à 403, 405, 406, 408, 409, 411, 414, 416.
 */

import {
  DELAI_CLOTURE_VENTES_HEURES,
  MENTION_AVERTISSEMENT_PRE_ALERTE,
  MENTION_CRENEAU_COMPLET,
  MENTION_VENTES_FERMEES,
  MOTIF_CLOTURE_H_MOINS_2,
} from '../../config/business.constants';
import {
  calculerDifferenceHeures,
  calculerJaugeStandard,
  convertirEnHorodatageDepart,
  listerHeuresDepart,
} from '../../utils/slot-rules';
import type {
  CreneauDisponible,
  CreneauPlanifie,
  CreneauSousAlerte,
  CriteresRecherche,
  DemandeReservation,
  DepotReservations,
  Port,
  ResultatSoumission,
} from '../../schemas/types/booking.types';

export { estJourDeFermetureAnnuelle } from '../../utils/slot-rules';

/** Vrai tant que le départ est distant de plus de deux heures (R-11). */
function estOuvertALaVente(creneau: { date: Date; heureDepart: string }, maintenant: Date): boolean {
  const depart = convertirEnHorodatageDepart(creneau.date, creneau.heureDepart);
  return calculerDifferenceHeures(maintenant, depart) >= DELAI_CLOTURE_VENTES_HEURES;
}

/** Vrai lorsqu'une alerte de pré-annulation cible l'heure de départ donnée. */
function estSousPreAlerte(
  creneauxSousAlerte: readonly CreneauSousAlerte[],
  heureDepart: string,
): boolean {
  return creneauxSousAlerte.some(
    (alerte) => alerte.heureDepart === heureDepart && alerte.sousPreAlerte,
  );
}

/**
 * Compose la vue publique d'un créneau : les mentions « Complet » et
 * d'avertissement météo ne sont portées que lorsqu'elles s'appliquent.
 */
function composerCreneauDisponible(
  heureDepart: string,
  placesRestantes: number,
  sousPreAlerte: boolean,
): CreneauDisponible {
  const creneau: CreneauDisponible = { heureDepart, placesRestantes };
  if (placesRestantes <= 0) {
    creneau.mention = MENTION_CRENEAU_COMPLET;
    creneau.estReservable = false;
  }
  if (sousPreAlerte) {
    creneau.mentionAvertissement = MENTION_AVERTISSEMENT_PRE_ALERTE;
  }
  return creneau;
}

/** Décline le planning du jour en y reportant la jauge déjà consommée. */
function composerPlanningAvecJauge(
  recherche: CriteresRecherche,
  depot: DepotReservations,
  creneauxSousAlerte: readonly CreneauSousAlerte[],
): CreneauDisponible[] {
  const jauge = calculerJaugeStandard(recherche.port);
  return listerHeuresDepart(recherche.port, recherche.date).map((heureDepart) =>
    composerCreneauDisponible(
      heureDepart,
      jauge - depot.compterPlacesReservees(heureDepart),
      estSousPreAlerte(creneauxSousAlerte, heureDepart),
    ),
  );
}

export function listerCreneauxDuJour(port: Port, date: Date): CreneauDisponible[];
export function listerCreneauxDuJour(
  recherche: CriteresRecherche,
  depot: DepotReservations,
  creneauxSousAlerte?: readonly CreneauSousAlerte[],
): CreneauDisponible[];
/**
 * Liste les créneaux du jour, sous deux formes : le simple calendrier
 * d'ouverture (port + date), ou le planning complet valorisé par la jauge
 * restante et les alertes (critères + dépôt) — surcharges INC-02.
 */
export function listerCreneauxDuJour(
  cible: Port | CriteresRecherche,
  contexte: Date | DepotReservations,
  creneauxSousAlerte: readonly CreneauSousAlerte[] = [],
): CreneauDisponible[] {
  if (typeof cible === 'string') {
    return listerHeuresDepart(cible, contexte as Date).map((heureDepart) => ({ heureDepart }));
  }
  return composerPlanningAvecJauge(cible, contexte as DepotReservations, creneauxSousAlerte);
}

/**
 * Marque les créneaux dont les ventes sont closes : à moins de deux heures du
 * départ, le créneau n'est plus sélectionnable et porte la mention de clôture.
 */
export function listerCreneauxVendables(
  creneaux: readonly CreneauPlanifie[],
  maintenant: Date,
): CreneauDisponible[] {
  return creneaux.map((creneau) => {
    const ouvert = estOuvertALaVente(creneau, maintenant);
    return {
      heureDepart: creneau.heureDepart,
      placesRestantes: creneau.placesLibres,
      estReservable: ouvert,
      mention: ouvert ? undefined : MENTION_VENTES_FERMEES,
    };
  });
}

/**
 * Arbitre une demande de réservation soumise au système : toute demande
 * déposée à moins de deux heures du départ est rejetée sans réserver de place.
 */
export function soumettreDemandeReservation(
  demande: DemandeReservation,
  maintenant: Date,
): ResultatSoumission {
  if (!estOuvertALaVente(demande.creneau, maintenant)) {
    return { accepte: false, motif: MOTIF_CLOTURE_H_MOINS_2, placesReservees: 0 };
  }
  return { accepte: true, motif: null, placesReservees: demande.placesDemandees };
}
