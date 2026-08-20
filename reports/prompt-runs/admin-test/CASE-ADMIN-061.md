# Run — CASE-ADMIN-061

**Fichier de test :** tests/tests-unitaires/admin/case-admin-061.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-061.test.ts
- tests/cases/admin/CASE-ADMIN-061.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-061.test.ts -t "test_CASE_ADMIN_061_traitement_echec_individuel_delivrance_alerte_groupee_log"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/actions/envoyer-alerte-groupee.ts` exportant `envoyerAlerteGroupee(...)` avec injection d'un port `JournalAuditAlertes` et `PasserelleSmsAlertes`.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Un échec d'envoi vers un destinataire spécifique (numéro erroné ou panne) est journalisé individuellement.
- Cet échec individuel ne bloque pas l'envoi aux autres destinataires de la campagne groupée (continuité du traitement de la file).
