# Prompt — écrire le test de CASE-RES-417

> Verrouillage temporaire des places pendant le paiement
>
> Étape « fiche de cas → test ». La fiche est le contrat, l'agent produit le
> test. Décalque de `docs/prompt/prompt-gabarit-code.md`, direction inversée :
> là-bas le test est le contrat et l'agent produit le code.
>
> Prérequis : la fiche `tests/cases/reservation/CASE-RES-417.md` doit exister
> (produite par `docs/prompt/test/reservation/prompt-case-res-417.md`).
>
> À recopier tel quel dans l'agent. Un prompt = un test.

```text
CONTEXTE
Stack : Next.js / TypeScript, complétée par Vitest (tests unitaires et
d'intégration) et Playwright (tests de bout en bout).
Commande de test : npm test (exécute `vitest run` pour les tests unitaires et
d'intégration, et `playwright test` pour les tests E2E).
Commande pour ce seul test : npx vitest run --project unit tests/tests-unitaires/reservation/case-res-417.test.ts
Commande d'audit d'architecture : npm run arch:report
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le test à écrire : tests/tests-unitaires/reservation/case-res-417.test.ts::test_CASE_RES_417_verrou_10_min_pendant_paiement_liberation_a_expiration
- Le cas de test : tests/cases/reservation/CASE-RES-417.md
- La spécification : specs/reservation.md, section SPEC-RESERVATION-03
- Les exigences d'architecture : specs/architecture.md
- Les fichiers du domaine que tu peux modifier : src/reservation/jauge/
  (tâche 5 du plan docs/delegation/delegation-reservation.md)

TA TÂCHE
1. Écris UN test automatisé, et un seul, qui traduit CASE-RES-417.
2. À la fin de la tâche, lance la commande d'audit `npm run arch:report`, analyse
   le rapport généré `reports/arch-compliance-report.md`, et applique les
   corrections nécessaires pour garantir une conformité totale (0 infraction).

CONTRAINTES
1. Ne modifie pas la fiche de cas. Elle est le contrat, pas une proposition. Si
   tu la crois fausse ou incomplète, arrête-toi et dis-le-moi.
2. Ne contourne pas le cas : pas de skip, pas de xfail, pas de tolérance
   élargie, pas d'assertion neutralisée.
3. N'écris aucune règle métier. Si une fonction ou une classe nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre. Le code de production est écrit dans une tâche
   séparée, avec `docs/prompt/prompt-gabarit-code.md`.
4. Nom du test : exactement celui écrit dans la section « Test automatisé » de la
   fiche, soit :
   test_CASE_RES_417_verrou_10_min_pendant_paiement_liberation_a_expiration
   Ne le reformule pas.
5. Les valeurs sont celles de la section « Données » de la fiche. N'en invente
   aucune, n'en reconstruis aucune par calcul intermédiaire.
6. Les assertions correspondent exactement aux lignes « Alors » et « Et »
   conclusives du gherkin de la fiche : une assertion par ligne, aucune de plus.
   Si une de ces lignes décrit un effet que ce niveau de test ne peut pas
   observer, ne l'invente pas : signale-la dans RENDS.
7. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
8. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
9. Respecte strictement les spécifications de specs/architecture.md :
   - Fichiers .ts/.js : max 30 lignes utiles par fonction (sauf dérogation TSDoc @need_more_lines - "motif").
   - Fichiers .tsx/.jsx : mono-composant strict (1 composant par fichier, aucun sous-composant local).
   - Plafond global : max 500 lignes par fichier.
   - Flux d'imports & étanchéité : respect de la matrice modulaire et interdiction des modules serveurs/secrets dans le client et les hooks.
   - Conventions de nommage : kebab-case pour fichiers/dossiers, camelCase pour fonctions/variables/hooks, PascalCase pour classes/types/composants.
10. Ne modifie aucun fichier en dehors de : tests/tests-unitaires/reservation/case-res-417.test.ts, src/reservation/jauge/
    Ne touche à aucun test existant, ni au sommaire, ni aux specs.
11. Aucune dépendance nouvelle.

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test, et son résultat : il doit être
  rouge sur une assertion, pas sur un import.
- Le résultat de la commande d'audit `npm run arch:report` confirmant le statut
  🟢 CONFORME de `reports/arch-compliance-report.md`.
- Les lignes du gherkin que tu n'as pas pu traduire en assertion, s'il y en a,
  et pourquoi.
- Ce que tu as dû supposer et qui n'était ni dans la fiche ni dans la
  spécification.
```
