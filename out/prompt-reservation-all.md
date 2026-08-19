<!-- ============================================================ -->
<!-- [1/18] Fichier : prompt-case-res-400.md -->
<!-- ============================================================ -->

# Prompt — écrire le test de CASE-RES-400

> Réservation individuelle standard au départ de Saint-Gilles
>
> Étape « fiche de cas → test ». La fiche est le contrat, l'agent produit le
> test. Décalque de `docs/prompt/prompt-gabarit-code.md`, direction inversée :
> là-bas le test est le contrat et l'agent produit le code.
>
> Prérequis : la fiche `tests/cases/reservation/CASE-RES-400.md` doit exister
> (produite par `docs/prompt/test/reservation/prompt-case-res-400.md`).
>
> À recopier tel quel dans l'agent. Un prompt = un test.

```text
CONTEXTE
Stack : Next.js / TypeScript, complétée par Vitest (tests unitaires et
d'intégration) et Playwright (tests de bout en bout).
Commande de test : npm test (exécute `vitest run` pour les tests unitaires et
d'intégration, et `playwright test` pour les tests E2E).
Commande pour ce seul test : npx vitest run --project unit tests/tests-unitaires/reservation/case-res-400.test.ts
Commande d'audit d'architecture : npm run arch:report
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le test à écrire : tests/tests-unitaires/reservation/case-res-400.test.ts::test_CASE_RES_400_reservation_individuelle_saint_gilles_payee_jauge_moins_2
- Le cas de test : tests/cases/reservation/CASE-RES-400.md
- La spécification : specs/reservation.md, section SPEC-RESERVATION-03
- Les exigences d'architecture : specs/architecture.md
- Les fichiers du domaine que tu peux modifier : src/reservation/tunnel/, src/reservation/tarification/
  (tâche 2 du plan docs/delegation/delegation-reservation.md)

TA TÂCHE
1. Écris UN test automatisé, et un seul, qui traduit CASE-RES-400.
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
   test_CASE_RES_400_reservation_individuelle_saint_gilles_payee_jauge_moins_2
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
10. Ne modifie aucun fichier en dehors de : tests/tests-unitaires/reservation/case-res-400.test.ts, src/reservation/tunnel/, src/reservation/tarification/
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

---

<!-- ============================================================ -->
<!-- [2/18] Fichier : prompt-case-res-401.md -->
<!-- ============================================================ -->

# Prompt — écrire le test de CASE-RES-401

> Réservation individuelle à Saint-Leu avec majoration géographique
>
> Étape « fiche de cas → test ». La fiche est le contrat, l'agent produit le
> test. Décalque de `docs/prompt/prompt-gabarit-code.md`, direction inversée :
> là-bas le test est le contrat et l'agent produit le code.
>
> Prérequis : la fiche `tests/cases/reservation/CASE-RES-401.md` doit exister
> (produite par `docs/prompt/test/reservation/prompt-case-res-401.md`).
>
> À recopier tel quel dans l'agent. Un prompt = un test.

```text
CONTEXTE
Stack : Next.js / TypeScript, complétée par Vitest (tests unitaires et
d'intégration) et Playwright (tests de bout en bout).
Commande de test : npm test (exécute `vitest run` pour les tests unitaires et
d'intégration, et `playwright test` pour les tests E2E).
Commande pour ce seul test : npx vitest run --project unit tests/tests-unitaires/reservation/case-res-401.test.ts
Commande d'audit d'architecture : npm run arch:report
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le test à écrire : tests/tests-unitaires/reservation/case-res-401.test.ts::test_CASE_RES_401_reservation_saint_leu_majoration_10_euros_par_personne
- Le cas de test : tests/cases/reservation/CASE-RES-401.md
- La spécification : specs/reservation.md, section SPEC-RESERVATION-03
- Les exigences d'architecture : specs/architecture.md
- Les fichiers du domaine que tu peux modifier : src/reservation/tunnel/, src/reservation/tarification/
  (tâche 2 du plan docs/delegation/delegation-reservation.md)

TA TÂCHE
1. Écris UN test automatisé, et un seul, qui traduit CASE-RES-401.
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
   test_CASE_RES_401_reservation_saint_leu_majoration_10_euros_par_personne
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
10. Ne modifie aucun fichier en dehors de : tests/tests-unitaires/reservation/case-res-401.test.ts, src/reservation/tunnel/, src/reservation/tarification/
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

---

<!-- ============================================================ -->
<!-- [3/18] Fichier : prompt-case-res-402.md -->
<!-- ============================================================ -->

# Prompt — écrire le test de CASE-RES-402

> Réservation sur un créneau sous alerte de pré-annulation
>
> Étape « fiche de cas → test ». La fiche est le contrat, l'agent produit le
> test. Décalque de `docs/prompt/prompt-gabarit-code.md`, direction inversée :
> là-bas le test est le contrat et l'agent produit le code.
>
> Prérequis : la fiche `tests/cases/reservation/CASE-RES-402.md` doit exister
> (produite par `docs/prompt/test/reservation/prompt-case-res-402.md`).
>
> À recopier tel quel dans l'agent. Un prompt = un test.

```text
CONTEXTE
Stack : Next.js / TypeScript, complétée par Vitest (tests unitaires et
d'intégration) et Playwright (tests de bout en bout).
Commande de test : npm test (exécute `vitest run` pour les tests unitaires et
d'intégration, et `playwright test` pour les tests E2E).
Commande pour ce seul test : npx vitest run --project unit tests/tests-unitaires/reservation/case-res-402.test.ts
Commande d'audit d'architecture : npm run arch:report
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le test à écrire : tests/tests-unitaires/reservation/case-res-402.test.ts::test_CASE_RES_402_creneau_sous_alerte_mention_affichee_avant_et_apres_reservation
- Le cas de test : tests/cases/reservation/CASE-RES-402.md
- La spécification : specs/reservation.md, section SPEC-RESERVATION-03
- Les exigences d'architecture : specs/architecture.md
- Les fichiers du domaine que tu peux modifier : src/reservation/alerte/
  (tâche 6 du plan docs/delegation/delegation-reservation.md)

TA TÂCHE
1. Écris UN test automatisé, et un seul, qui traduit CASE-RES-402.
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
   test_CASE_RES_402_creneau_sous_alerte_mention_affichee_avant_et_apres_reservation
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
10. Ne modifie aucun fichier en dehors de : tests/tests-unitaires/reservation/case-res-402.test.ts, src/reservation/alerte/
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

---

<!-- ============================================================ -->
<!-- [4/18] Fichier : prompt-case-res-403.md -->
<!-- ============================================================ -->

# Prompt — écrire le test de CASE-RES-403

> Privatisation demi-journée du Tikap à Saint-Leu
>
> Étape « fiche de cas → test ». La fiche est le contrat, l'agent produit le
> test. Décalque de `docs/prompt/prompt-gabarit-code.md`, direction inversée :
> là-bas le test est le contrat et l'agent produit le code.
>
> Prérequis : la fiche `tests/cases/reservation/CASE-RES-403.md` doit exister
> (produite par `docs/prompt/test/reservation/prompt-case-res-403.md`).
>
> À recopier tel quel dans l'agent. Un prompt = un test.

```text
CONTEXTE
Stack : Next.js / TypeScript, complétée par Vitest (tests unitaires et
d'intégration) et Playwright (tests de bout en bout).
Commande de test : npm test (exécute `vitest run` pour les tests unitaires et
d'intégration, et `playwright test` pour les tests E2E).
Commande pour ce seul test : npx vitest run --project unit tests/tests-unitaires/reservation/case-res-403.test.ts
Commande d'audit d'architecture : npm run arch:report
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le test à écrire : tests/tests-unitaires/reservation/case-res-403.test.ts::test_CASE_RES_403_privatisation_tikap_saint_leu_forfait_600_capacite_bloquee
- Le cas de test : tests/cases/reservation/CASE-RES-403.md
- La spécification : specs/reservation.md, section SPEC-RESERVATION-03
- Les exigences d'architecture : specs/architecture.md
- Les fichiers du domaine que tu peux modifier : src/reservation/privatisation/
  (tâche 3 du plan docs/delegation/delegation-reservation.md)

TA TÂCHE
1. Écris UN test automatisé, et un seul, qui traduit CASE-RES-403.
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
   test_CASE_RES_403_privatisation_tikap_saint_leu_forfait_600_capacite_bloquee
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
10. Ne modifie aucun fichier en dehors de : tests/tests-unitaires/reservation/case-res-403.test.ts, src/reservation/privatisation/
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

---

<!-- ============================================================ -->
<!-- [5/18] Fichier : prompt-case-res-404.md -->
<!-- ============================================================ -->

# Prompt — écrire le test de CASE-RES-404

> Bascule français/anglais sans perte des données saisies
>
> Étape « fiche de cas → test ». La fiche est le contrat, l'agent produit le
> test. Décalque de `docs/prompt/prompt-gabarit-code.md`, direction inversée :
> là-bas le test est le contrat et l'agent produit le code.
>
> Prérequis : la fiche `tests/cases/reservation/CASE-RES-404.md` doit exister
> (produite par `docs/prompt/test/reservation/prompt-case-res-404.md`).
>
> À recopier tel quel dans l'agent. Un prompt = un test.

```text
CONTEXTE
Stack : Next.js / TypeScript, complétée par Vitest (tests unitaires et
d'intégration) et Playwright (tests de bout en bout).
Commande de test : npm test (exécute `vitest run` pour les tests unitaires et
d'intégration, et `playwright test` pour les tests E2E).
Commande pour ce seul test : npx vitest run --project unit tests/tests-unitaires/reservation/case-res-404.test.ts
Commande d'audit d'architecture : npm run arch:report
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le test à écrire : tests/tests-unitaires/reservation/case-res-404.test.ts::test_CASE_RES_404_bascule_fr_en_conserve_les_donnees_saisies
- Le cas de test : tests/cases/reservation/CASE-RES-404.md
- La spécification : specs/reservation.md, section SPEC-RESERVATION-03
- Les exigences d'architecture : specs/architecture.md
- Les fichiers du domaine que tu peux modifier : src/reservation/i18n/, src/reservation/tunnel/
  (tâche 7 du plan docs/delegation/delegation-reservation.md)

TA TÂCHE
1. Écris UN test automatisé, et un seul, qui traduit CASE-RES-404.
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
   test_CASE_RES_404_bascule_fr_en_conserve_les_donnees_saisies
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
10. Ne modifie aucun fichier en dehors de : tests/tests-unitaires/reservation/case-res-404.test.ts, src/reservation/i18n/, src/reservation/tunnel/
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

---

<!-- ============================================================ -->
<!-- [6/18] Fichier : prompt-case-res-405.md -->
<!-- ============================================================ -->

# Prompt — écrire le test de CASE-RES-405

> Grille tarifaire Dauphins à Saint-Gilles
>
> Étape « fiche de cas → test ». La fiche est le contrat, l'agent produit le
> test. Décalque de `docs/prompt/prompt-gabarit-code.md`, direction inversée :
> là-bas le test est le contrat et l'agent produit le code.
>
> Prérequis : la fiche `tests/cases/reservation/CASE-RES-405.md` doit exister
> (produite par `docs/prompt/test/reservation/prompt-case-res-405.md`).
>
> À recopier tel quel dans l'agent. Un prompt = un test.

```text
CONTEXTE
Stack : Next.js / TypeScript, complétée par Vitest (tests unitaires et
d'intégration) et Playwright (tests de bout en bout).
Commande de test : npm test (exécute `vitest run` pour les tests unitaires et
d'intégration, et `playwright test` pour les tests E2E).
Commande pour ce seul test : npx vitest run --project unit tests/tests-unitaires/reservation/case-res-405.test.ts
Commande d'audit d'architecture : npm run arch:report
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le test à écrire : tests/tests-unitaires/reservation/case-res-405.test.ts::test_CASE_RES_405_tarif_dauphins_saint_gilles_50_adulte_30_enfant
- Le cas de test : tests/cases/reservation/CASE-RES-405.md
- La spécification : specs/reservation.md, section SPEC-RESERVATION-03
- Les exigences d'architecture : specs/architecture.md
- Les fichiers du domaine que tu peux modifier : src/reservation/tunnel/, src/reservation/tarification/
  (tâche 2 du plan docs/delegation/delegation-reservation.md)

TA TÂCHE
1. Écris UN test automatisé, et un seul, qui traduit CASE-RES-405.
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
   test_CASE_RES_405_tarif_dauphins_saint_gilles_50_adulte_30_enfant
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
10. Ne modifie aucun fichier en dehors de : tests/tests-unitaires/reservation/case-res-405.test.ts, src/reservation/tunnel/, src/reservation/tarification/
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

---

<!-- ============================================================ -->
<!-- [7/18] Fichier : prompt-case-res-406.md -->
<!-- ============================================================ -->

# Prompt — écrire le test de CASE-RES-406

> Privatisation du Grand Bleu à Saint-Gilles
>
> Étape « fiche de cas → test ». La fiche est le contrat, l'agent produit le
> test. Décalque de `docs/prompt/prompt-gabarit-code.md`, direction inversée :
> là-bas le test est le contrat et l'agent produit le code.
>
> Prérequis : la fiche `tests/cases/reservation/CASE-RES-406.md` doit exister
> (produite par `docs/prompt/test/reservation/prompt-case-res-406.md`).
>
> À recopier tel quel dans l'agent. Un prompt = un test.

```text
CONTEXTE
Stack : Next.js / TypeScript, complétée par Vitest (tests unitaires et
d'intégration) et Playwright (tests de bout en bout).
Commande de test : npm test (exécute `vitest run` pour les tests unitaires et
d'intégration, et `playwright test` pour les tests E2E).
Commande pour ce seul test : npx vitest run --project unit tests/tests-unitaires/reservation/case-res-406.test.ts
Commande d'audit d'architecture : npm run arch:report
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le test à écrire : tests/tests-unitaires/reservation/case-res-406.test.ts::test_CASE_RES_406_privatisation_grand_bleu_forfait_1100_capacite_bloquee
- Le cas de test : tests/cases/reservation/CASE-RES-406.md
- La spécification : specs/reservation.md, section SPEC-RESERVATION-03
- Les exigences d'architecture : specs/architecture.md
- Les fichiers du domaine que tu peux modifier : src/reservation/privatisation/
  (tâche 3 du plan docs/delegation/delegation-reservation.md)

TA TÂCHE
1. Écris UN test automatisé, et un seul, qui traduit CASE-RES-406.
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
   test_CASE_RES_406_privatisation_grand_bleu_forfait_1100_capacite_bloquee
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
10. Ne modifie aucun fichier en dehors de : tests/tests-unitaires/reservation/case-res-406.test.ts, src/reservation/privatisation/
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

---

<!-- ============================================================ -->
<!-- [8/18] Fichier : prompt-case-res-407.md -->
<!-- ============================================================ -->

# Prompt — écrire le test de CASE-RES-407

> Nom, prénom ou e-mail manquant à l'étape coordonnées
>
> Étape « fiche de cas → test ». La fiche est le contrat, l'agent produit le
> test. Décalque de `docs/prompt/prompt-gabarit-code.md`, direction inversée :
> là-bas le test est le contrat et l'agent produit le code.
>
> Prérequis : la fiche `tests/cases/reservation/CASE-RES-407.md` doit exister
> (produite par `docs/prompt/test/reservation/prompt-case-res-407.md`).
>
> À recopier tel quel dans l'agent. Un prompt = un test.

```text
CONTEXTE
Stack : Next.js / TypeScript, complétée par Vitest (tests unitaires et
d'intégration) et Playwright (tests de bout en bout).
Commande de test : npm test (exécute `vitest run` pour les tests unitaires et
d'intégration, et `playwright test` pour les tests E2E).
Commande pour ce seul test : npx vitest run --project unit tests/tests-unitaires/reservation/case-res-407.test.ts
Commande d'audit d'architecture : npm run arch:report
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le test à écrire : tests/tests-unitaires/reservation/case-res-407.test.ts::test_CASE_RES_407_nom_prenom_email_manquants_rejet_formulaire_contact
- Le cas de test : tests/cases/reservation/CASE-RES-407.md
- La spécification : specs/reservation.md, section SPEC-RESERVATION-03
- Les exigences d'architecture : specs/architecture.md
- Les fichiers du domaine que tu peux modifier : src/reservation/validation/
  (tâche 4 du plan docs/delegation/delegation-reservation.md)

TA TÂCHE
1. Écris UN test automatisé, et un seul, qui traduit CASE-RES-407.
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
   test_CASE_RES_407_nom_prenom_email_manquants_rejet_formulaire_contact
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
10. Ne modifie aucun fichier en dehors de : tests/tests-unitaires/reservation/case-res-407.test.ts, src/reservation/validation/
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

---

<!-- ============================================================ -->
<!-- [9/18] Fichier : prompt-case-res-408.md -->
<!-- ============================================================ -->

# Prompt — écrire le test de CASE-RES-408

> Tentative de réservation à moins de 2 heures du départ
>
> Étape « fiche de cas → test ». La fiche est le contrat, l'agent produit le
> test. Décalque de `docs/prompt/prompt-gabarit-code.md`, direction inversée :
> là-bas le test est le contrat et l'agent produit le code.
>
> Prérequis : la fiche `tests/cases/reservation/CASE-RES-408.md` doit exister
> (produite par `docs/prompt/test/reservation/prompt-case-res-408.md`).
>
> À recopier tel quel dans l'agent. Un prompt = un test.

```text
CONTEXTE
Stack : Next.js / TypeScript, complétée par Vitest (tests unitaires et
d'intégration) et Playwright (tests de bout en bout).
Commande de test : npm test (exécute `vitest run` pour les tests unitaires et
d'intégration, et `playwright test` pour les tests E2E).
Commande pour ce seul test : npx vitest run --project unit tests/tests-unitaires/reservation/case-res-408.test.ts
Commande d'audit d'architecture : npm run arch:report
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le test à écrire : tests/tests-unitaires/reservation/case-res-408.test.ts::test_CASE_RES_408_reservation_moins_2h_avant_depart_creneau_clos_rejet
- Le cas de test : tests/cases/reservation/CASE-RES-408.md
- La spécification : specs/reservation.md, section SPEC-RESERVATION-03
- Les exigences d'architecture : specs/architecture.md
- Les fichiers du domaine que tu peux modifier : src/reservation/planning/
  (tâche 1 du plan docs/delegation/delegation-reservation.md)

TA TÂCHE
1. Écris UN test automatisé, et un seul, qui traduit CASE-RES-408.
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
   test_CASE_RES_408_reservation_moins_2h_avant_depart_creneau_clos_rejet
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
10. Ne modifie aucun fichier en dehors de : tests/tests-unitaires/reservation/case-res-408.test.ts, src/reservation/planning/
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

---

<!-- ============================================================ -->
<!-- [10/18] Fichier : prompt-case-res-409.md -->
<!-- ============================================================ -->

# Prompt — écrire le test de CASE-RES-409

> Consultation des jours de fermeture annuelle
>
> Étape « fiche de cas → test ». La fiche est le contrat, l'agent produit le
> test. Décalque de `docs/prompt/prompt-gabarit-code.md`, direction inversée :
> là-bas le test est le contrat et l'agent produit le code.
>
> Prérequis : la fiche `tests/cases/reservation/CASE-RES-409.md` doit exister
> (produite par `docs/prompt/test/reservation/prompt-case-res-409.md`).
>
> À recopier tel quel dans l'agent. Un prompt = un test.

```text
CONTEXTE
Stack : Next.js / TypeScript, complétée par Vitest (tests unitaires et
d'intégration) et Playwright (tests de bout en bout).
Commande de test : npm test (exécute `vitest run` pour les tests unitaires et
d'intégration, et `playwright test` pour les tests E2E).
Commande pour ce seul test : npx vitest run --project unit tests/tests-unitaires/reservation/case-res-409.test.ts
Commande d'audit d'architecture : npm run arch:report
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le test à écrire : tests/tests-unitaires/reservation/case-res-409.test.ts::test_CASE_RES_409_fermeture_annuelle_25_decembre_1er_janvier_aucun_creneau
- Le cas de test : tests/cases/reservation/CASE-RES-409.md
- La spécification : specs/reservation.md, section SPEC-RESERVATION-03
- Les exigences d'architecture : specs/architecture.md
- Les fichiers du domaine que tu peux modifier : src/reservation/planning/
  (tâche 1 du plan docs/delegation/delegation-reservation.md)

TA TÂCHE
1. Écris UN test automatisé, et un seul, qui traduit CASE-RES-409.
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
   test_CASE_RES_409_fermeture_annuelle_25_decembre_1er_janvier_aucun_creneau
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
10. Ne modifie aucun fichier en dehors de : tests/tests-unitaires/reservation/case-res-409.test.ts, src/reservation/planning/
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

---

<!-- ============================================================ -->
<!-- [11/18] Fichier : prompt-case-res-410.md -->
<!-- ============================================================ -->

# Prompt — écrire le test de CASE-RES-410

> Saisie d'un participant de moins de 4 ans
>
> Étape « fiche de cas → test ». La fiche est le contrat, l'agent produit le
> test. Décalque de `docs/prompt/prompt-gabarit-code.md`, direction inversée :
> là-bas le test est le contrat et l'agent produit le code.
>
> Prérequis : la fiche `tests/cases/reservation/CASE-RES-410.md` doit exister
> (produite par `docs/prompt/test/reservation/prompt-case-res-410.md`).
>
> À recopier tel quel dans l'agent. Un prompt = un test.

```text
CONTEXTE
Stack : Next.js / TypeScript, complétée par Vitest (tests unitaires et
d'intégration) et Playwright (tests de bout en bout).
Commande de test : npm test (exécute `vitest run` pour les tests unitaires et
d'intégration, et `playwright test` pour les tests E2E).
Commande pour ce seul test : npx vitest run --project unit tests/tests-unitaires/reservation/case-res-410.test.ts
Commande d'audit d'architecture : npm run arch:report
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le test à écrire : tests/tests-unitaires/reservation/case-res-410.test.ts::test_CASE_RES_410_enfant_moins_4_ans_rejet_immediat_validation_bloquee
- Le cas de test : tests/cases/reservation/CASE-RES-410.md
- La spécification : specs/reservation.md, section SPEC-RESERVATION-03
- Les exigences d'architecture : specs/architecture.md
- Les fichiers du domaine que tu peux modifier : src/reservation/validation/
  (tâche 4 du plan docs/delegation/delegation-reservation.md)

TA TÂCHE
1. Écris UN test automatisé, et un seul, qui traduit CASE-RES-410.
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
   test_CASE_RES_410_enfant_moins_4_ans_rejet_immediat_validation_bloquee
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
10. Ne modifie aucun fichier en dehors de : tests/tests-unitaires/reservation/case-res-410.test.ts, src/reservation/validation/
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

---

<!-- ============================================================ -->
<!-- [12/18] Fichier : prompt-case-res-411.md -->
<!-- ============================================================ -->

# Prompt — écrire le test de CASE-RES-411

> Consultation de Saint-Leu en dehors des mardis et jeudis matin
>
> Étape « fiche de cas → test ». La fiche est le contrat, l'agent produit le
> test. Décalque de `docs/prompt/prompt-gabarit-code.md`, direction inversée :
> là-bas le test est le contrat et l'agent produit le code.
>
> Prérequis : la fiche `tests/cases/reservation/CASE-RES-411.md` doit exister
> (produite par `docs/prompt/test/reservation/prompt-case-res-411.md`).
>
> À recopier tel quel dans l'agent. Un prompt = un test.

```text
CONTEXTE
Stack : Next.js / TypeScript, complétée par Vitest (tests unitaires et
d'intégration) et Playwright (tests de bout en bout).
Commande de test : npm test (exécute `vitest run` pour les tests unitaires et
d'intégration, et `playwright test` pour les tests E2E).
Commande pour ce seul test : npx vitest run --project unit tests/tests-unitaires/reservation/case-res-411.test.ts
Commande d'audit d'architecture : npm run arch:report
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le test à écrire : tests/tests-unitaires/reservation/case-res-411.test.ts::test_CASE_RES_411_saint_leu_hors_mardi_jeudi_matin_aucun_creneau
- Le cas de test : tests/cases/reservation/CASE-RES-411.md
- La spécification : specs/reservation.md, section SPEC-RESERVATION-03
- Les exigences d'architecture : specs/architecture.md
- Les fichiers du domaine que tu peux modifier : src/reservation/planning/
  (tâche 1 du plan docs/delegation/delegation-reservation.md)

TA TÂCHE
1. Écris UN test automatisé, et un seul, qui traduit CASE-RES-411.
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
   test_CASE_RES_411_saint_leu_hors_mardi_jeudi_matin_aucun_creneau
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
10. Ne modifie aucun fichier en dehors de : tests/tests-unitaires/reservation/case-res-411.test.ts, src/reservation/planning/
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

---

<!-- ============================================================ -->
<!-- [13/18] Fichier : prompt-case-res-412.md -->
<!-- ============================================================ -->

# Prompt — écrire le test de CASE-RES-412

> Jauge réduite à Saint-Gilles les mardis et jeudis matin
>
> Étape « fiche de cas → test ». La fiche est le contrat, l'agent produit le
> test. Décalque de `docs/prompt/prompt-gabarit-code.md`, direction inversée :
> là-bas le test est le contrat et l'agent produit le code.
>
> Prérequis : la fiche `tests/cases/reservation/CASE-RES-412.md` doit exister
> (produite par `docs/prompt/test/reservation/prompt-case-res-412.md`).
>
> À recopier tel quel dans l'agent. Un prompt = un test.

```text
CONTEXTE
Stack : Next.js / TypeScript, complétée par Vitest (tests unitaires et
d'intégration) et Playwright (tests de bout en bout).
Commande de test : npm test (exécute `vitest run` pour les tests unitaires et
d'intégration, et `playwright test` pour les tests E2E).
Commande pour ce seul test : npx vitest run --project unit tests/tests-unitaires/reservation/case-res-412.test.ts
Commande d'audit d'architecture : npm run arch:report
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le test à écrire : tests/tests-unitaires/reservation/case-res-412.test.ts::test_CASE_RES_412_saint_gilles_mardi_jeudi_matin_jauge_24_tikap_indisponible
- Le cas de test : tests/cases/reservation/CASE-RES-412.md
- La spécification : specs/reservation.md, section SPEC-RESERVATION-03
- Les exigences d'architecture : specs/architecture.md
- Les fichiers du domaine que tu peux modifier : src/reservation/planning/
  (tâche 1 du plan docs/delegation/delegation-reservation.md)

TA TÂCHE
1. Écris UN test automatisé, et un seul, qui traduit CASE-RES-412.
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
   test_CASE_RES_412_saint_gilles_mardi_jeudi_matin_jauge_24_tikap_indisponible
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
10. Ne modifie aucun fichier en dehors de : tests/tests-unitaires/reservation/case-res-412.test.ts, src/reservation/planning/
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

---

<!-- ============================================================ -->
<!-- [14/18] Fichier : prompt-case-res-413.md -->
<!-- ============================================================ -->

# Prompt — écrire le test de CASE-RES-413

> Demande de places supérieure aux places restantes
>
> Étape « fiche de cas → test ». La fiche est le contrat, l'agent produit le
> test. Décalque de `docs/prompt/prompt-gabarit-code.md`, direction inversée :
> là-bas le test est le contrat et l'agent produit le code.
>
> Prérequis : la fiche `tests/cases/reservation/CASE-RES-413.md` doit exister
> (produite par `docs/prompt/test/reservation/prompt-case-res-413.md`).
>
> À recopier tel quel dans l'agent. Un prompt = un test.

```text
CONTEXTE
Stack : Next.js / TypeScript, complétée par Vitest (tests unitaires et
d'intégration) et Playwright (tests de bout en bout).
Commande de test : npm test (exécute `vitest run` pour les tests unitaires et
d'intégration, et `playwright test` pour les tests E2E).
Commande pour ce seul test : npx vitest run --project unit tests/tests-unitaires/reservation/case-res-413.test.ts
Commande d'audit d'architecture : npm run arch:report
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le test à écrire : tests/tests-unitaires/reservation/case-res-413.test.ts::test_CASE_RES_413_demande_superieure_aux_places_restantes_blocage_et_message
- Le cas de test : tests/cases/reservation/CASE-RES-413.md
- La spécification : specs/reservation.md, section SPEC-RESERVATION-03
- Les exigences d'architecture : specs/architecture.md
- Les fichiers du domaine que tu peux modifier : src/reservation/jauge/
  (tâche 5 du plan docs/delegation/delegation-reservation.md)

TA TÂCHE
1. Écris UN test automatisé, et un seul, qui traduit CASE-RES-413.
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
   test_CASE_RES_413_demande_superieure_aux_places_restantes_blocage_et_message
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
10. Ne modifie aucun fichier en dehors de : tests/tests-unitaires/reservation/case-res-413.test.ts, src/reservation/jauge/
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

---

<!-- ============================================================ -->
<!-- [15/18] Fichier : prompt-case-res-414.md -->
<!-- ============================================================ -->

# Prompt — écrire le test de CASE-RES-414

> Réservation de la dernière place disponible d'un créneau
>
> Étape « fiche de cas → test ». La fiche est le contrat, l'agent produit le
> test. Décalque de `docs/prompt/prompt-gabarit-code.md`, direction inversée :
> là-bas le test est le contrat et l'agent produit le code.
>
> Prérequis : la fiche `tests/cases/reservation/CASE-RES-414.md` doit exister
> (produite par `docs/prompt/test/reservation/prompt-case-res-414.md`).
>
> À recopier tel quel dans l'agent. Un prompt = un test.

```text
CONTEXTE
Stack : Next.js / TypeScript, complétée par Vitest (tests unitaires et
d'intégration) et Playwright (tests de bout en bout).
Commande de test : npm test (exécute `vitest run` pour les tests unitaires et
d'intégration, et `playwright test` pour les tests E2E).
Commande pour ce seul test : npx vitest run --project unit tests/tests-unitaires/reservation/case-res-414.test.ts
Commande d'audit d'architecture : npm run arch:report
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le test à écrire : tests/tests-unitaires/reservation/case-res-414.test.ts::test_CASE_RES_414_derniere_place_acceptee_creneau_complet_retire_de_l_offre
- Le cas de test : tests/cases/reservation/CASE-RES-414.md
- La spécification : specs/reservation.md, section SPEC-RESERVATION-03
- Les exigences d'architecture : specs/architecture.md
- Les fichiers du domaine que tu peux modifier : src/reservation/jauge/
  (tâche 5 du plan docs/delegation/delegation-reservation.md)

TA TÂCHE
1. Écris UN test automatisé, et un seul, qui traduit CASE-RES-414.
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
   test_CASE_RES_414_derniere_place_acceptee_creneau_complet_retire_de_l_offre
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
10. Ne modifie aucun fichier en dehors de : tests/tests-unitaires/reservation/case-res-414.test.ts, src/reservation/jauge/
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

---

<!-- ============================================================ -->
<!-- [16/18] Fichier : prompt-case-res-415.md -->
<!-- ============================================================ -->

# Prompt — écrire le test de CASE-RES-415

> Numéro de mobile manquant ou au format invalide
>
> Étape « fiche de cas → test ». La fiche est le contrat, l'agent produit le
> test. Décalque de `docs/prompt/prompt-gabarit-code.md`, direction inversée :
> là-bas le test est le contrat et l'agent produit le code.
>
> Prérequis : la fiche `tests/cases/reservation/CASE-RES-415.md` doit exister
> (produite par `docs/prompt/test/reservation/prompt-case-res-415.md`).
>
> À recopier tel quel dans l'agent. Un prompt = un test.

```text
CONTEXTE
Stack : Next.js / TypeScript, complétée par Vitest (tests unitaires et
d'intégration) et Playwright (tests de bout en bout).
Commande de test : npm test (exécute `vitest run` pour les tests unitaires et
d'intégration, et `playwright test` pour les tests E2E).
Commande pour ce seul test : npx vitest run --project unit tests/tests-unitaires/reservation/case-res-415.test.ts
Commande d'audit d'architecture : npm run arch:report
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le test à écrire : tests/tests-unitaires/reservation/case-res-415.test.ts::test_CASE_RES_415_mobile_manquant_ou_invalide_rejet_formulaire_contact
- Le cas de test : tests/cases/reservation/CASE-RES-415.md
- La spécification : specs/reservation.md, section SPEC-RESERVATION-03
- Les exigences d'architecture : specs/architecture.md
- Les fichiers du domaine que tu peux modifier : src/reservation/validation/
  (tâche 4 du plan docs/delegation/delegation-reservation.md)

TA TÂCHE
1. Écris UN test automatisé, et un seul, qui traduit CASE-RES-415.
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
   test_CASE_RES_415_mobile_manquant_ou_invalide_rejet_formulaire_contact
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
10. Ne modifie aucun fichier en dehors de : tests/tests-unitaires/reservation/case-res-415.test.ts, src/reservation/validation/
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

---

<!-- ============================================================ -->
<!-- [17/18] Fichier : prompt-case-res-416.md -->
<!-- ============================================================ -->

# Prompt — écrire le test de CASE-RES-416

> Rejet ou abandon du paiement par carte bancaire
>
> Étape « fiche de cas → test ». La fiche est le contrat, l'agent produit le
> test. Décalque de `docs/prompt/prompt-gabarit-code.md`, direction inversée :
> là-bas le test est le contrat et l'agent produit le code.
>
> Prérequis : la fiche `tests/cases/reservation/CASE-RES-416.md` doit exister
> (produite par `docs/prompt/test/reservation/prompt-case-res-416.md`).
>
> À recopier tel quel dans l'agent. Un prompt = un test.

```text
CONTEXTE
Stack : Next.js / TypeScript, complétée par Vitest (tests unitaires et
d'intégration) et Playwright (tests de bout en bout).
Commande de test : npm test (exécute `vitest run` pour les tests unitaires et
d'intégration, et `playwright test` pour les tests E2E).
Commande pour ce seul test : npx vitest run --project unit tests/tests-unitaires/reservation/case-res-416.test.ts
Commande d'audit d'architecture : npm run arch:report
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le test à écrire : tests/tests-unitaires/reservation/case-res-416.test.ts::test_CASE_RES_416_paiement_rejete_ou_abandonne_aucune_reservation_jauge_intacte
- Le cas de test : tests/cases/reservation/CASE-RES-416.md
- La spécification : specs/reservation.md, section SPEC-RESERVATION-03
- Les exigences d'architecture : specs/architecture.md
- Les fichiers du domaine que tu peux modifier : src/reservation/jauge/
  (tâche 5 du plan docs/delegation/delegation-reservation.md)

TA TÂCHE
1. Écris UN test automatisé, et un seul, qui traduit CASE-RES-416.
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
   test_CASE_RES_416_paiement_rejete_ou_abandonne_aucune_reservation_jauge_intacte
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
10. Ne modifie aucun fichier en dehors de : tests/tests-unitaires/reservation/case-res-416.test.ts, src/reservation/jauge/
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

---

<!-- ============================================================ -->
<!-- [18/18] Fichier : prompt-case-res-417.md -->
<!-- ============================================================ -->

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
