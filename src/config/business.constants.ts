/**
 * business.constants.ts
 *
 * Constantes d'exploitation : seuils, délais réglementaires et mentions
 * textuelles affichées au client.
 * Référence : SPEC-RESERVATION-03 (R-02, R-06, R-08, R-09, R-11, R-25,
 * REQ-107), specs/reservation.md (cas limites 1, 2, 7, 10, 12).
 *
 * Constantes pures : 0 import interne (SPEC-ARCH-02).
 */

// ─── Seuils et délais ────────────────────────────────────────────────────────

export const SEUIL_MINIMAL_PASSAGERS = 6;
export const DELAI_CLOTURE_VENTES_HEURES = 2;
export const DUREE_VALIDITE_TOKEN_SOLDE_MINUTES = 60;

/** Fermeture annuelle (R-02), au format `{ mois: Date.getMonth(), jour }`. */
export const JOURS_FERMETURE_ANNUELLE = [
  { mois: 11, jour: 25 },
  { mois: 0, jour: 1 },
] as const;

// ─── Mentions et motifs affichés sur le parcours public ──────────────────────

export const MENTION_CRENEAU_COMPLET = 'Complet';
export const MENTION_VENTES_FERMEES = 'Ventes fermées';
export const MOTIF_CLOTURE_H_MOINS_2 = 'CLOTURE_H_MOINS_2';

export const MENTION_AVERTISSEMENT_PRE_ALERTE =
  'Créneau sous réserve météo — Remboursement à 100 % garanti en cas d\'annulation';

export const MENTION_REGLEMENT_SOLDE_SUR_PLACE =
  'Règlement du solde obligatoire sur place par carte bancaire';

export const MESSAGE_EXPIRATION_LIEN_SOLDE =
  'Le lien de paiement en ligne a expiré pour des raisons de sécurité. Vous pourrez régler votre solde directement par carte bancaire sur place le jour du départ.';

export const MESSAGE_ECHEC_PAIEMENT_ACOMPTE =
  "Le paiement de l'acompte a été refusé par votre banque. Aucune place n'a été réservée : vous pouvez renouveler votre tentative.";

// ─── Références et liens ─────────────────────────────────────────────────────

export const PREFIXE_REFERENCE_RESERVATION = 'RESA-';
export const CHEMIN_PAIEMENT_SOLDE = '/reservation/solde?token=';
export const PREFIXE_MESSAGE_SMS_SOLDE =
  "Ti'Baleine — réglez le solde de votre sortie de demain en ligne : ";
