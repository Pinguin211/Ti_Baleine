/**
 * pricing.constants.ts
 *
 * Grille tarifaire de référence, suppléments géographiques, taux d'acompte
 * obligatoires et tranches d'âge d'embarquement.
 * Référence : SPEC-RESERVATION-03 (R-04, R-05, R-06), docs/uml/domain.puml
 * (ConfigActivite, ConfigPort).
 *
 * Constantes pures : 0 import interne (SPEC-ARCH-02).
 */

// ─── Tarifs individuels de base (Saint-Gilles, hors majoration) ──────────────

export const TARIF_BASE_ADULTE_BALEINES = 65;
export const TARIF_BASE_ENFANT_BALEINES = 40;
export const TARIF_BASE_DAUPHINS_ADULTE = 50;
export const TARIF_BASE_DAUPHINS_ENFANT = 30;

// ─── Forfaits de privatisation (sans majoration géographique) ────────────────

export const FORFAIT_PRIVATISATION_TIKAP = 600;
export const FORFAIT_PRIVATISATION_GRAND_BLEU = 1100;

// ─── Majoration géographique et taux d'acompte ───────────────────────────────

export const MAJORATION_SAINT_LEU = 10;
export const TAUX_ACOMPTE_STANDARD = 0.3;
export const TAUX_ACOMPTE_PRIVATISATION = 0.5;

// ─── Tranches d'âge (R-06 : accès interdit en dessous de 4 ans) ──────────────

export const AGE_MINIMAL_EMBARQUEMENT = 4;
export const AGE_MINIMAL_ADULTE = 12;

/** Supplément individuel appliqué par port d'embarquement (ConfigPort). */
export const MAJORATION_INDIVIDUELLE_PAR_PORT = {
  SAINT_GILLES: 0,
  SAINT_LEU: MAJORATION_SAINT_LEU,
} as const;

/**
 * Paramétrage tarifaire par activité (ConfigActivite) : tarifs individuels,
 * forfait de privatisation (`null` hors privatisation) et taux d'acompte.
 */
export const GRILLE_TARIFAIRE_ACTIVITES = {
  BALEINES: {
    tarifBaseAdulte: TARIF_BASE_ADULTE_BALEINES,
    tarifBaseEnfant: TARIF_BASE_ENFANT_BALEINES,
    forfait: null as number | null,
    tauxAcompte: TAUX_ACOMPTE_STANDARD,
  },
  DAUPHINS: {
    tarifBaseAdulte: TARIF_BASE_DAUPHINS_ADULTE,
    tarifBaseEnfant: TARIF_BASE_DAUPHINS_ENFANT,
    forfait: null as number | null,
    tauxAcompte: TAUX_ACOMPTE_STANDARD,
  },
  PRIVATISATION_TIKAP: {
    tarifBaseAdulte: 0,
    tarifBaseEnfant: 0,
    forfait: FORFAIT_PRIVATISATION_TIKAP as number | null,
    tauxAcompte: TAUX_ACOMPTE_PRIVATISATION,
  },
  PRIVATISATION_GRAND_BLEU: {
    tarifBaseAdulte: 0,
    tarifBaseEnfant: 0,
    forfait: FORFAIT_PRIVATISATION_GRAND_BLEU as number | null,
    tauxAcompte: TAUX_ACOMPTE_PRIVATISATION,
  },
} as const;
