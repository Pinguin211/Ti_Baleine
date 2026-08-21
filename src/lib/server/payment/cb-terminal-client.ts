import 'server-only';

/**
 * Aucune passerelle de paiement carte sur place n'est décidée. `stripe` est
 * installé mais Stripe est un gestionnaire de paiement EN LIGNE — un
 * encaissement « sur place » à l'embarcadère passe normalement par un
 * terminal de paiement physique (TPE), dont l'intégration (protocole,
 * identifiants) n'est spécifiée nulle part. Cette fonction se contente donc
 * de générer une référence de transaction, en attendant que l'équipe
 * précise comment le TPE réel remonte sa confirmation au système.
 */
export async function validerEncaissementTerminalCb(montant: number): Promise<{ referenceTransaction: string }> {
  console.warn(`[cb-terminal-client] Terminal CB non configuré — encaissement de ${montant} € non validé électroniquement`);
  return { referenceTransaction: `TPE-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` };
}
