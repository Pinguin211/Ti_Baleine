/**
 * Schéma et validateurs de sélection pour la campagne d'envoi d'alertes météo.
 * SPEC-ADMIN-06 | CASE-ADMIN-058, CASE-ADMIN-060, CASE-ADMIN-073
 */

export interface SelectionAlerte {
  creneauxSelectionnes: unknown[];
  message?: string;
}

export interface ValidationEnvoiAlerte {
  valide: boolean;
  motifErreur?: string;
}

export function boutonEnvoiAlerteEstActif(selection: SelectionAlerte): boolean {
  const auMoinsUnCreneau = selection.creneauxSelectionnes.length > 0;
  const messageRenseigne = Boolean(selection.message && selection.message.trim().length > 0);
  return auMoinsUnCreneau && messageRenseigne;
}

export function validerEnvoiAlerte(selection: SelectionAlerte): ValidationEnvoiAlerte {
  if (selection.creneauxSelectionnes.length === 0) {
    return {
      valide: false,
      motifErreur: 'Veuillez sélectionner au moins un créneau',
    };
  }

  if (!selection.message || selection.message.trim().length === 0) {
    return {
      valide: false,
      motifErreur: 'Le corps du message ne peut pas être vide',
    };
  }

  return { valide: true };
}

export function creneauEstSelectionnablePourAlerte(creneau: {
  sousPreAlerte: boolean;
}): boolean {
  return !creneau.sousPreAlerte;
}
