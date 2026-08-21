/**
 * Service de calcul du taux de remplissage, places réservées/restantes et badge « Complet ».
 * SPEC-ADMIN-05 | CASE-ADMIN-041, CASE-ADMIN-042, CASE-ADMIN-043, CASE-ADMIN-044, CASE-ADMIN-045, CASE-ADMIN-046, CASE-ADMIN-047, CASE-ADMIN-072
 */

export interface ParametresCalculRemplissage {
  jaugeMax: number;
  placesReservees: number;
  estPrivatise?: boolean;
}

export interface RemplissageCreneau {
  jaugeMax: number;
  placesReservees: number;
  placesRestantes: number;
  tauxRemplissagePourcent: number;
  estComplet: boolean;
  estReservable?: boolean;
  libelleAffichage?: string;
}

export function calculerRemplissageCreneau(
  params: ParametresCalculRemplissage
): RemplissageCreneau {
  const { jaugeMax, placesReservees, estPrivatise = false } = params;
  const placesRestantes = estPrivatise ? 0 : Math.max(0, jaugeMax - placesReservees);
  const tauxRemplissagePourcent =
    jaugeMax > 0 ? (placesReservees / jaugeMax) * 100 : 0;
  const estComplet = placesReservees >= jaugeMax;
  const estReservable = !estPrivatise && placesRestantes > 0;

  return {
    jaugeMax,
    placesReservees,
    placesRestantes,
    tauxRemplissagePourcent,
    estComplet,
    estReservable,
    ...(estPrivatise ? { libelleAffichage: 'Navire privatisé' } : {}),
  };
}
