import 'server-only';

/**
 * Aucun client SMTP réel n'existe encore dans ce dépôt — même le domaine
 * facturation (SPEC-FAC-02, antérieur), dont le port `EnvoiCourriel` est
 * synchrone (`envoyer(): void`), n'a pas encore de `smtp-client.ts`
 * fonctionnel malgré sa présence dans docs/signature.md. Décider du
 * fournisseur SMTP (hôte, identifiants) n'est pas une décision à prendre
 * en construisant l'écran d'alertes : ce client se contente donc de
 * journaliser l'envoi plutôt que de l'exécuter, en attendant `SMTP_HOST`/
 * `SMTP_PASSWORD` réels (env/server.ts) et la confirmation du fournisseur.
 */
export interface CourrielSortant {
  destinataireEmail: string;
  sujet: string;
  corpsMessage: string;
}

export function envoyerCourrielSMTP(courriel: CourrielSortant): void {
  console.warn(
    `[smtp-client] Envoi SMTP non configuré — courriel non transmis à ${courriel.destinataireEmail} : "${courriel.sujet}"`
  );
}
