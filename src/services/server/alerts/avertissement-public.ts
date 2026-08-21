/**
 * Service d'affichage public d'avertissement pour les créneaux sous pré-alerte.
 * SPEC-ADMIN-06 | CASE-ADMIN-057, CASE-ADMIN-059
 */

export interface CreneauAvertissement {
  sousPreAlerte: boolean;
  estOuvert: boolean;
}

export interface AffichagePublicCreneauAlerte {
  mention: string | null;
  reservationEncoreAutorisee: boolean;
}

export function obtenirAffichagePublicCreneauAlerte(
  creneau: CreneauAvertissement,
  placesRestantes: number
): AffichagePublicCreneauAlerte {
  const mention = creneau.sousPreAlerte
    ? "Sortie sous pré-alerte météo / risque d'annulation"
    : null;
  const reservationEncoreAutorisee =
    creneau.estOuvert && placesRestantes > 0;

  return {
    mention,
    reservationEncoreAutorisee,
  };
}
