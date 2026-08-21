/**
 * Maintien du créneau au planning sous le seuil minimal de passagers.
 * SPEC-ADMIN-01 | CASE-ADMIN-009 | Portée §3, R-09
 *
 * La décision d'annuler un départ sous le seuil de maintien reste strictement
 * manuelle et hors système (R-09) : le créneau et ses billets ne sont jamais
 * annulés automatiquement, quel que soit le nombre de passagers ou l'échéance.
 */

interface ParametresMaintienCreneau {
  billetsActifs: number;
  seuilMaintien: number;
  estAHeureMoins2: boolean;
}

interface ResultatMaintienCreneau {
  creneauActif: boolean;
  creneauAfficheAuPlanning: boolean;
  annulationAutomatiqueDeclenchee: boolean;
  billetsActifsRestants: number;
}

/**
 * Vérifie le maintien de l'affichage du créneau au planning sans déclencher
 * d'annulation automatique, conformément à R-09 (CASE-ADMIN-009).
 */
export function verifierMaintienCreneauSousSeuil(
  parametres: ParametresMaintienCreneau,
): ResultatMaintienCreneau {
  return {
    creneauActif: true,
    creneauAfficheAuPlanning: true,
    annulationAutomatiqueDeclenchee: false,
    billetsActifsRestants: parametres.billetsActifs,
  };
}
