# Run — CASE-ADMIN-059

**Fichier de test :** tests/tests-unitaires/admin/case-admin-059.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-059.test.ts
- tests/cases/admin/CASE-ADMIN-059.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-059.test.ts -t "test_CASE_ADMIN_059_alerte_creneau_sans_reservation_statut_pre_alerte_sans_message"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/actions/envoyer-alerte-groupee.ts` exportant :
- `envoyerAlerteGroupee(commande: { creneauxIds: string[]; message: string }, ports): Promise<{ alertesEnvoyees: number; creneauxMisSousAlerte: number }>`
et `src/services/server/alerts/avertissement-public.ts` exportant :
- `obtenirAffichagePublicCreneauAlerte(creneauId: string, ports): Promise<{ sousPreAlerte: boolean; bandeauAlerteVisible: boolean }>`

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le déclenchement d'une alerte sur un créneau sans passagers inscrits passe le créneau au statut `sousPreAlerte = true` et affiche le bandeau de pré-alerte sur l'interface publique.
- Aucun SMS n'est envoyé puisqu'aucun contact n'est présent dans la file (0 SMS).
