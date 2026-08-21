/**
 * Formatage du panneau de détail d'un créneau planning.
 * SPEC-ADMIN-01 | CASE-ADMIN-002
 *
 * Extrait du créneau persisté les informations à afficher dans le panneau
 * de détail : activité programmée, navires mobilisés et port d'embarquement.
 */

interface CreneauDetailPersiste {
  id: string;
  date: Date;
  heureDepart: string;
  port: string;
  activite: string;
  navires: string[];
  estOuvert: boolean;
  sousPreAlerte: boolean;
}

interface CreneauDetailAffiche {
  activite: string;
  navires: string[];
  port: string;
}

interface ParametresDetailCreneau {
  creneau: CreneauDetailPersiste;
}

/**
 * Formate le panneau de détail d'un créneau : activité, navires mobilisés
 * et port d'embarquement (SPEC-ADMIN-01, CASE-ADMIN-002).
 */
export function obtenirDetailCreneau(
  parametres: ParametresDetailCreneau,
): CreneauDetailAffiche {
  const { creneau } = parametres;
  return {
    activite: creneau.activite,
    navires: creneau.navires,
    port: creneau.port,
  };
}
