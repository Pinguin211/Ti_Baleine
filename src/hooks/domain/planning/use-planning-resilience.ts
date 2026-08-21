/**
 * Résilience réseau du chargement du planning.
 * SPEC-ADMIN-01 | CASE-ADMIN-008 | Cas limite #5
 *
 * En cas d'échec du chargement (coupure réseau, HTTP 503), expose un message
 * d'erreur explicite et une action de réessai plutôt que de bloquer l'écran.
 */

const MESSAGE_ERREUR_CHARGEMENT = 'Impossible de charger le planning';

interface EtatChargementPlanning<T> {
  messageErreur?: string;
  reessayer: () => void;
  donnees?: T;
}

/**
 * Charge le planning et capture un échec réseau en exposant un message
 * d'erreur explicite ainsi qu'une action « Réessayer » (CASE-ADMIN-008).
 */
export async function chargerPlanningAvecGestionErreur<T>(
  chargementPlanning: () => Promise<T>,
): Promise<EtatChargementPlanning<T>> {
  const reessayer = () => {
    void chargerPlanningAvecGestionErreur(chargementPlanning);
  };

  try {
    const donnees = await chargementPlanning();
    return { donnees, reessayer };
  } catch {
    return { messageErreur: MESSAGE_ERREUR_CHARGEMENT, reessayer };
  }
}
