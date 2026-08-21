/**
 * Contrôle de la consultation continue du planning par l'administrateur.
 * SPEC-ADMIN-01 | CASE-ADMIN-007 | Cas limite #4, Portée §1
 *
 * L'administrateur, contrairement au parcours public soumis à la clôture
 * H-2, consulte le planning à toute heure sans restriction horaire.
 */

interface ParametresAccesPlanningContinu {
  instant: Date;
  role: 'Administrateur';
}

interface AccesPlanningContinu {
  accesAutorise: boolean;
  restrictionHoraireAppliquee: boolean;
}

/**
 * Vérifie l'absence de restriction horaire de consultation du planning pour
 * l'administrateur (SPEC-ADMIN-01, CASE-ADMIN-007).
 */
export function verifierAccesPlanningContinu(
  parametres: ParametresAccesPlanningContinu,
): AccesPlanningContinu {
  const estAdministrateur = parametres.role === 'Administrateur';
  return {
    accesAutorise: estAdministrateur,
    restrictionHoraireAppliquee: false,
  };
}
