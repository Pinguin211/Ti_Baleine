/**
 * Ventilation tarifaire d'une facture (une ligne par composante de prix),
 * conformément à SPEC-FAC-02 (AC-3).
 */
export type LigneTarifaire = {
  libelle: string;
  quantite: number;
  montantUnitaire: number;
  montantLigne: number;
};

/**
 * Construit la ligne tarifaire des passagers adultes.
 */
export function calculerLigneAdultes(nombreAdultes: number, tarifUnitaireAdulte: number): LigneTarifaire {
  return {
    libelle: 'Adulte',
    quantite: nombreAdultes,
    montantUnitaire: tarifUnitaireAdulte,
    montantLigne: nombreAdultes * tarifUnitaireAdulte,
  };
}

/**
 * Construit la ligne tarifaire des passagers enfants, ou aucune ligne en
 * l'absence d'enfant dans la réservation.
 */
export function calculerLigneEnfants(nombreEnfants: number, tarifUnitaireEnfant: number): LigneTarifaire | null {
  if (nombreEnfants <= 0) return null;
  return {
    libelle: 'Enfant',
    quantite: nombreEnfants,
    montantUnitaire: tarifUnitaireEnfant,
    montantLigne: nombreEnfants * tarifUnitaireEnfant,
  };
}

/**
 * Construit la ligne de supplément géographique, appliquée à chaque
 * passager individuel (adultes et enfants compris), ou aucune ligne si la
 * majoration n'est pas applicable (ex : départ de Saint-Gilles, 0 €).
 */
export function calculerLigneMajorationGeographique(
  nombreAdultes: number,
  nombreEnfants: number,
  majorationGeographiqueParPersonne: number,
): LigneTarifaire | null {
  if (majorationGeographiqueParPersonne <= 0) return null;
  const nombrePersonnes = nombreAdultes + nombreEnfants;
  return {
    libelle: 'Supplément géographique',
    quantite: nombrePersonnes,
    montantUnitaire: majorationGeographiqueParPersonne,
    montantLigne: nombrePersonnes * majorationGeographiqueParPersonne,
  };
}

/**
 * Construit la ligne tarifaire forfaitaire (privatisation), sans
 * ventilation par passager (SPEC-FAC-02, cas limite 5).
 */
export function calculerLigneForfait(libelle: string, montantForfaitaire: number): LigneTarifaire {
  return {
    libelle,
    quantite: 1,
    montantUnitaire: montantForfaitaire,
    montantLigne: montantForfaitaire,
  };
}

/**
 * Additionne la ventilation tarifaire pour obtenir le montant total TTC.
 */
export function calculerMontantTotalTtc(lignesTarifaires: LigneTarifaire[]): number {
  return lignesTarifaires.reduce((total, ligne) => total + ligne.montantLigne, 0);
}

export type ParametresVentilationTarifaire = {
  montantForfaitaire?: number;
  libelleForfait?: string;
  nombreAdultes?: number;
  tarifUnitaireAdulte?: number;
  nombreEnfants?: number;
  tarifUnitaireEnfant?: number;
  majorationGeographiqueParPersonne?: number;
};

/**
 * Construit la ventilation tarifaire complète d'une facture, forfaitaire
 * (privatisation) ou détaillée par passager (adultes, enfants, supplément
 * géographique), conformément à SPEC-FAC-02 (AC-3, cas limite 5).
 */
export function construireLignesTarifaires(params: ParametresVentilationTarifaire): LigneTarifaire[] {
  if (params.montantForfaitaire !== undefined) {
    return [calculerLigneForfait(params.libelleForfait ?? '', params.montantForfaitaire)];
  }
  const nombreAdultes = params.nombreAdultes ?? 0;
  const nombreEnfants = params.nombreEnfants ?? 0;
  const lignes = [calculerLigneAdultes(nombreAdultes, params.tarifUnitaireAdulte ?? 0)];
  const ligneEnfants = calculerLigneEnfants(nombreEnfants, params.tarifUnitaireEnfant ?? 0);
  if (ligneEnfants) lignes.push(ligneEnfants);
  const ligneMajoration = calculerLigneMajorationGeographique(
    nombreAdultes,
    nombreEnfants,
    params.majorationGeographiqueParPersonne ?? 0,
  );
  if (ligneMajoration) lignes.push(ligneMajoration);
  return lignes;
}
