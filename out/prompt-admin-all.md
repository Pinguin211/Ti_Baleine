<!-- ============================================================ -->
<!-- [1/73] Fichier : prompt-ADMIN-001.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-01/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-001.md
- La spécification : specs/admin.md, section SPEC-ADMIN-01
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-001.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-01/CASE-ADMIN-001.test.ts (à créer)
   - src/services/server/case-admin-001.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-001.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-01/CASE-ADMIN-001.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [2/73] Fichier : prompt-ADMIN-002.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-01/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-002.md
- La spécification : specs/admin.md, section SPEC-ADMIN-01
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-002.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-01/CASE-ADMIN-002.test.ts (à créer)
   - src/services/server/case-admin-002.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-002.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-01/CASE-ADMIN-002.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [3/73] Fichier : prompt-ADMIN-003.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-01/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-003.md
- La spécification : specs/admin.md, section SPEC-ADMIN-01
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-003.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-01/CASE-ADMIN-003.test.ts (à créer)
   - src/services/server/case-admin-003.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-003.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-01/CASE-ADMIN-003.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [4/73] Fichier : prompt-ADMIN-004.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-01/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-004.md
- La spécification : specs/admin.md, section SPEC-ADMIN-01
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-004.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-01/CASE-ADMIN-004.test.ts (à créer)
   - src/services/server/case-admin-004.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-004.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-01/CASE-ADMIN-004.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [5/73] Fichier : prompt-ADMIN-005.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-01/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-005.md
- La spécification : specs/admin.md, section SPEC-ADMIN-01
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-005.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-01/CASE-ADMIN-005.test.ts (à créer)
   - src/services/server/case-admin-005.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-005.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-01/CASE-ADMIN-005.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [6/73] Fichier : prompt-ADMIN-006.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-01/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-006.md
- La spécification : specs/admin.md, section SPEC-ADMIN-01
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-006.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-01/CASE-ADMIN-006.test.ts (à créer)
   - src/services/server/case-admin-006.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-006.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-01/CASE-ADMIN-006.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [7/73] Fichier : prompt-ADMIN-007.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-01/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-007.md
- La spécification : specs/admin.md, section SPEC-ADMIN-01
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-007.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-01/CASE-ADMIN-007.test.ts (à créer)
   - src/services/server/case-admin-007.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-007.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-01/CASE-ADMIN-007.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [8/73] Fichier : prompt-ADMIN-008.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-01/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-008.md
- La spécification : specs/admin.md, section SPEC-ADMIN-01
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-008.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-01/CASE-ADMIN-008.test.ts (à créer)
   - src/services/server/case-admin-008.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-008.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-01/CASE-ADMIN-008.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [9/73] Fichier : prompt-ADMIN-009.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-01/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-009.md
- La spécification : specs/admin.md, section SPEC-ADMIN-01
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-009.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-01/CASE-ADMIN-009.test.ts (à créer)
   - src/services/server/case-admin-009.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-009.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-01/CASE-ADMIN-009.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [10/73] Fichier : prompt-ADMIN-010.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-02/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-010.md
- La spécification : specs/admin.md, section SPEC-ADMIN-02
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-010.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-010.test.ts (à créer)
   - src/services/server/case-admin-010.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-010.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-010.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [11/73] Fichier : prompt-ADMIN-011.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-02/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-011.md
- La spécification : specs/admin.md, section SPEC-ADMIN-02
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-011.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-011.test.ts (à créer)
   - src/services/server/case-admin-011.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-011.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-011.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [12/73] Fichier : prompt-ADMIN-012.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-02/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-012.md
- La spécification : specs/admin.md, section SPEC-ADMIN-02
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-012.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-012.test.ts (à créer)
   - src/services/server/case-admin-012.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-012.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-012.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [13/73] Fichier : prompt-ADMIN-013.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-02/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-013.md
- La spécification : specs/admin.md, section SPEC-ADMIN-02
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-013.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-013.test.ts (à créer)
   - src/services/server/case-admin-013.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-013.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-013.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [14/73] Fichier : prompt-ADMIN-014.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-02/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-014.md
- La spécification : specs/admin.md, section SPEC-ADMIN-02
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-014.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-014.test.ts (à créer)
   - src/services/server/case-admin-014.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-014.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-014.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [15/73] Fichier : prompt-ADMIN-015.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-02/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-015.md
- La spécification : specs/admin.md, section SPEC-ADMIN-02
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-015.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-015.test.ts (à créer)
   - src/services/server/case-admin-015.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-015.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-015.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [16/73] Fichier : prompt-ADMIN-016.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-02/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-016.md
- La spécification : specs/admin.md, section SPEC-ADMIN-02
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-016.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-016.test.ts (à créer)
   - src/services/server/case-admin-016.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-016.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-016.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [17/73] Fichier : prompt-ADMIN-017.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-02/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-017.md
- La spécification : specs/admin.md, section SPEC-ADMIN-02
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-017.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-017.test.ts (à créer)
   - src/services/server/case-admin-017.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-017.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-017.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [18/73] Fichier : prompt-ADMIN-018.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-02/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-018.md
- La spécification : specs/admin.md, section SPEC-ADMIN-02
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-018.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-018.test.ts (à créer)
   - src/services/server/case-admin-018.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-018.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-018.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [19/73] Fichier : prompt-ADMIN-019.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-02/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-019.md
- La spécification : specs/admin.md, section SPEC-ADMIN-02
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-019.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-019.test.ts (à créer)
   - src/services/server/case-admin-019.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-019.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-019.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [20/73] Fichier : prompt-ADMIN-020.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-02/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-020.md
- La spécification : specs/admin.md, section SPEC-ADMIN-02
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-020.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-020.test.ts (à créer)
   - src/services/server/case-admin-020.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-020.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-020.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [21/73] Fichier : prompt-ADMIN-021.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-02/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-021.md
- La spécification : specs/admin.md, section SPEC-ADMIN-02
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-021.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-021.test.ts (à créer)
   - src/services/server/case-admin-021.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-021.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-021.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [22/73] Fichier : prompt-ADMIN-022.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-02/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-022.md
- La spécification : specs/admin.md, section SPEC-ADMIN-02
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-022.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-022.test.ts (à créer)
   - src/services/server/case-admin-022.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-022.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-02/CASE-ADMIN-022.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [23/73] Fichier : prompt-ADMIN-023.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-03/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-023.md
- La spécification : specs/admin.md, section SPEC-ADMIN-03
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-023.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-03/CASE-ADMIN-023.test.ts (à créer)
   - src/services/server/case-admin-023.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-023.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-03/CASE-ADMIN-023.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [24/73] Fichier : prompt-ADMIN-024.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-03/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-024.md
- La spécification : specs/admin.md, section SPEC-ADMIN-03
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-024.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-03/CASE-ADMIN-024.test.ts (à créer)
   - src/services/server/case-admin-024.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-024.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-03/CASE-ADMIN-024.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [25/73] Fichier : prompt-ADMIN-025.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-03/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-025.md
- La spécification : specs/admin.md, section SPEC-ADMIN-03
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-025.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-03/CASE-ADMIN-025.test.ts (à créer)
   - src/services/server/case-admin-025.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-025.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-03/CASE-ADMIN-025.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [26/73] Fichier : prompt-ADMIN-026.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-03/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-026.md
- La spécification : specs/admin.md, section SPEC-ADMIN-03
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-026.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-03/CASE-ADMIN-026.test.ts (à créer)
   - src/services/server/case-admin-026.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-026.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-03/CASE-ADMIN-026.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [27/73] Fichier : prompt-ADMIN-027.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-03/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-027.md
- La spécification : specs/admin.md, section SPEC-ADMIN-03
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-027.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-03/CASE-ADMIN-027.test.ts (à créer)
   - src/services/server/case-admin-027.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-027.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-03/CASE-ADMIN-027.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [28/73] Fichier : prompt-ADMIN-028.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-03/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-028.md
- La spécification : specs/admin.md, section SPEC-ADMIN-03
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-028.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-03/CASE-ADMIN-028.test.ts (à créer)
   - src/services/server/case-admin-028.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-028.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-03/CASE-ADMIN-028.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [29/73] Fichier : prompt-ADMIN-029.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-03/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-029.md
- La spécification : specs/admin.md, section SPEC-ADMIN-03
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-029.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-03/CASE-ADMIN-029.test.ts (à créer)
   - src/services/server/case-admin-029.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-029.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-03/CASE-ADMIN-029.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [30/73] Fichier : prompt-ADMIN-030.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-03/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-030.md
- La spécification : specs/admin.md, section SPEC-ADMIN-03
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-030.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-03/CASE-ADMIN-030.test.ts (à créer)
   - src/services/server/case-admin-030.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-030.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-03/CASE-ADMIN-030.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [31/73] Fichier : prompt-ADMIN-031.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-03/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-031.md
- La spécification : specs/admin.md, section SPEC-ADMIN-03
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-031.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-03/CASE-ADMIN-031.test.ts (à créer)
   - src/services/server/case-admin-031.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-031.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-03/CASE-ADMIN-031.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [32/73] Fichier : prompt-ADMIN-032.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-03/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-032.md
- La spécification : specs/admin.md, section SPEC-ADMIN-03
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-032.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-03/CASE-ADMIN-032.test.ts (à créer)
   - src/services/server/case-admin-032.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-032.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-03/CASE-ADMIN-032.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [33/73] Fichier : prompt-ADMIN-033.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-04/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-033.md
- La spécification : specs/admin.md, section SPEC-ADMIN-04
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-033.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-04/CASE-ADMIN-033.test.ts (à créer)
   - src/services/server/case-admin-033.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-033.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-04/CASE-ADMIN-033.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [34/73] Fichier : prompt-ADMIN-034.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-04/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-034.md
- La spécification : specs/admin.md, section SPEC-ADMIN-04
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-034.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-04/CASE-ADMIN-034.test.ts (à créer)
   - src/services/server/case-admin-034.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-034.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-04/CASE-ADMIN-034.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [35/73] Fichier : prompt-ADMIN-035.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-04/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-035.md
- La spécification : specs/admin.md, section SPEC-ADMIN-04
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-035.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-04/CASE-ADMIN-035.test.ts (à créer)
   - src/services/server/case-admin-035.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-035.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-04/CASE-ADMIN-035.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [36/73] Fichier : prompt-ADMIN-036.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-04/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-036.md
- La spécification : specs/admin.md, section SPEC-ADMIN-04
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-036.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-04/CASE-ADMIN-036.test.ts (à créer)
   - src/services/server/case-admin-036.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-036.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-04/CASE-ADMIN-036.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [37/73] Fichier : prompt-ADMIN-037.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-04/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-037.md
- La spécification : specs/admin.md, section SPEC-ADMIN-04
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-037.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-04/CASE-ADMIN-037.test.ts (à créer)
   - src/services/server/case-admin-037.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-037.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-04/CASE-ADMIN-037.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [38/73] Fichier : prompt-ADMIN-038.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-04/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-038.md
- La spécification : specs/admin.md, section SPEC-ADMIN-04
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-038.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-04/CASE-ADMIN-038.test.ts (à créer)
   - src/services/server/case-admin-038.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-038.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-04/CASE-ADMIN-038.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [39/73] Fichier : prompt-ADMIN-039.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-04/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-039.md
- La spécification : specs/admin.md, section SPEC-ADMIN-04
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-039.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-04/CASE-ADMIN-039.test.ts (à créer)
   - src/services/server/case-admin-039.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-039.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-04/CASE-ADMIN-039.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [40/73] Fichier : prompt-ADMIN-040.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-04/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-040.md
- La spécification : specs/admin.md, section SPEC-ADMIN-04
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-040.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-04/CASE-ADMIN-040.test.ts (à créer)
   - src/services/server/case-admin-040.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-040.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-04/CASE-ADMIN-040.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [41/73] Fichier : prompt-ADMIN-041.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-05/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-041.md
- La spécification : specs/admin.md, section SPEC-ADMIN-05
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/utils/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-041.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-05/CASE-ADMIN-041.test.ts (à créer)
   - src/utils/case-admin-041.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-041.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/utils/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-05/CASE-ADMIN-041.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [42/73] Fichier : prompt-ADMIN-042.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-05/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-042.md
- La spécification : specs/admin.md, section SPEC-ADMIN-05
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/utils/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-042.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-05/CASE-ADMIN-042.test.ts (à créer)
   - src/utils/case-admin-042.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-042.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/utils/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-05/CASE-ADMIN-042.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [43/73] Fichier : prompt-ADMIN-043.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-05/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-043.md
- La spécification : specs/admin.md, section SPEC-ADMIN-05
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/utils/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-043.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-05/CASE-ADMIN-043.test.ts (à créer)
   - src/utils/case-admin-043.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-043.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/utils/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-05/CASE-ADMIN-043.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [44/73] Fichier : prompt-ADMIN-044.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-05/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-044.md
- La spécification : specs/admin.md, section SPEC-ADMIN-05
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/utils/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-044.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-05/CASE-ADMIN-044.test.ts (à créer)
   - src/utils/case-admin-044.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-044.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/utils/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-05/CASE-ADMIN-044.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [45/73] Fichier : prompt-ADMIN-045.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-05/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-045.md
- La spécification : specs/admin.md, section SPEC-ADMIN-05
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/utils/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-045.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-05/CASE-ADMIN-045.test.ts (à créer)
   - src/utils/case-admin-045.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-045.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/utils/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-05/CASE-ADMIN-045.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [46/73] Fichier : prompt-ADMIN-046.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-05/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-046.md
- La spécification : specs/admin.md, section SPEC-ADMIN-05
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/utils/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-046.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-05/CASE-ADMIN-046.test.ts (à créer)
   - src/utils/case-admin-046.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-046.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/utils/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-05/CASE-ADMIN-046.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [47/73] Fichier : prompt-ADMIN-047.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-05/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-047.md
- La spécification : specs/admin.md, section SPEC-ADMIN-05
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/utils/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-047.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-05/CASE-ADMIN-047.test.ts (à créer)
   - src/utils/case-admin-047.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-047.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/utils/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-05/CASE-ADMIN-047.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [48/73] Fichier : prompt-ADMIN-048.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-06/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-048.md
- La spécification : specs/admin.md, section SPEC-ADMIN-06
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-048.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-048.test.ts (à créer)
   - src/services/server/case-admin-048.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-048.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-048.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [49/73] Fichier : prompt-ADMIN-049.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-06/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-049.md
- La spécification : specs/admin.md, section SPEC-ADMIN-06
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-049.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-049.test.ts (à créer)
   - src/services/server/case-admin-049.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-049.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-049.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [50/73] Fichier : prompt-ADMIN-050.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-06/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-050.md
- La spécification : specs/admin.md, section SPEC-ADMIN-06
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-050.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-050.test.ts (à créer)
   - src/services/server/case-admin-050.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-050.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-050.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [51/73] Fichier : prompt-ADMIN-051.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-06/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-051.md
- La spécification : specs/admin.md, section SPEC-ADMIN-06
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-051.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-051.test.ts (à créer)
   - src/services/server/case-admin-051.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-051.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-051.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [52/73] Fichier : prompt-ADMIN-052.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-06/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-052.md
- La spécification : specs/admin.md, section SPEC-ADMIN-06
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-052.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-052.test.ts (à créer)
   - src/services/server/case-admin-052.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-052.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-052.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [53/73] Fichier : prompt-ADMIN-053.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-06/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-053.md
- La spécification : specs/admin.md, section SPEC-ADMIN-06
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-053.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-053.test.ts (à créer)
   - src/services/server/case-admin-053.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-053.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-053.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [54/73] Fichier : prompt-ADMIN-054.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-06/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-054.md
- La spécification : specs/admin.md, section SPEC-ADMIN-06
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-054.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-054.test.ts (à créer)
   - src/services/server/case-admin-054.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-054.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-054.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [55/73] Fichier : prompt-ADMIN-055.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-06/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-055.md
- La spécification : specs/admin.md, section SPEC-ADMIN-06
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-055.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-055.test.ts (à créer)
   - src/services/server/case-admin-055.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-055.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-055.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [56/73] Fichier : prompt-ADMIN-056.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-06/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-056.md
- La spécification : specs/admin.md, section SPEC-ADMIN-06
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-056.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-056.test.ts (à créer)
   - src/services/server/case-admin-056.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-056.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-056.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [57/73] Fichier : prompt-ADMIN-057.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-06/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-057.md
- La spécification : specs/admin.md, section SPEC-ADMIN-06
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-057.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-057.test.ts (à créer)
   - src/services/server/case-admin-057.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-057.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-057.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [58/73] Fichier : prompt-ADMIN-058.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-06/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-058.md
- La spécification : specs/admin.md, section SPEC-ADMIN-06
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-058.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-058.test.ts (à créer)
   - src/services/server/case-admin-058.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-058.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-058.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [59/73] Fichier : prompt-ADMIN-059.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-06/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-059.md
- La spécification : specs/admin.md, section SPEC-ADMIN-06
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-059.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-059.test.ts (à créer)
   - src/services/server/case-admin-059.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-059.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-059.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [60/73] Fichier : prompt-ADMIN-060.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-06/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-060.md
- La spécification : specs/admin.md, section SPEC-ADMIN-06
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-060.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-060.test.ts (à créer)
   - src/services/server/case-admin-060.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-060.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-060.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [61/73] Fichier : prompt-ADMIN-061.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-06/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-061.md
- La spécification : specs/admin.md, section SPEC-ADMIN-06
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-061.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-061.test.ts (à créer)
   - src/services/server/case-admin-061.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-061.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-061.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [62/73] Fichier : prompt-ADMIN-062.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-07/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-062.md
- La spécification : specs/admin.md, section SPEC-ADMIN-07
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-062.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-07/CASE-ADMIN-062.test.ts (à créer)
   - src/services/server/case-admin-062.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-062.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-07/CASE-ADMIN-062.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [63/73] Fichier : prompt-ADMIN-063.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-07/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-063.md
- La spécification : specs/admin.md, section SPEC-ADMIN-07
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-063.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-07/CASE-ADMIN-063.test.ts (à créer)
   - src/services/server/case-admin-063.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-063.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-07/CASE-ADMIN-063.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [64/73] Fichier : prompt-ADMIN-064.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-07/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-064.md
- La spécification : specs/admin.md, section SPEC-ADMIN-07
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-064.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-07/CASE-ADMIN-064.test.ts (à créer)
   - src/services/server/case-admin-064.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-064.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-07/CASE-ADMIN-064.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [65/73] Fichier : prompt-ADMIN-065.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-07/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-065.md
- La spécification : specs/admin.md, section SPEC-ADMIN-07
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-065.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-07/CASE-ADMIN-065.test.ts (à créer)
   - src/services/server/case-admin-065.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-065.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-07/CASE-ADMIN-065.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [66/73] Fichier : prompt-ADMIN-066.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-07/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-066.md
- La spécification : specs/admin.md, section SPEC-ADMIN-07
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-066.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-07/CASE-ADMIN-066.test.ts (à créer)
   - src/services/server/case-admin-066.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-066.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-07/CASE-ADMIN-066.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [67/73] Fichier : prompt-ADMIN-067.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-07/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-067.md
- La spécification : specs/admin.md, section SPEC-ADMIN-07
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-067.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-07/CASE-ADMIN-067.test.ts (à créer)
   - src/services/server/case-admin-067.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-067.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-07/CASE-ADMIN-067.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [68/73] Fichier : prompt-ADMIN-068.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-07/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-068.md
- La spécification : specs/admin.md, section SPEC-ADMIN-07
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-068.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-07/CASE-ADMIN-068.test.ts (à créer)
   - src/services/server/case-admin-068.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-068.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-07/CASE-ADMIN-068.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [69/73] Fichier : prompt-ADMIN-069.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-03/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-069.md
- La spécification : specs/admin.md, section SPEC-ADMIN-03
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-069.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-03/CASE-ADMIN-069.test.ts (à créer)
   - src/services/server/case-admin-069.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-069.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-03/CASE-ADMIN-069.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [70/73] Fichier : prompt-ADMIN-070.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-04/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-070.md
- La spécification : specs/admin.md, section SPEC-ADMIN-04
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-070.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-04/CASE-ADMIN-070.test.ts (à créer)
   - src/services/server/case-admin-070.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-070.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-04/CASE-ADMIN-070.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [71/73] Fichier : prompt-ADMIN-071.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-04/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-071.md
- La spécification : specs/admin.md, section SPEC-ADMIN-04
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-071.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-04/CASE-ADMIN-071.test.ts (à créer)
   - src/services/server/case-admin-071.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-071.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-04/CASE-ADMIN-071.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [72/73] Fichier : prompt-ADMIN-072.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-05/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-072.md
- La spécification : specs/admin.md, section SPEC-ADMIN-05
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/utils/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-072.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-05/CASE-ADMIN-072.test.ts (à créer)
   - src/utils/case-admin-072.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-072.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/utils/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-05/CASE-ADMIN-072.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.

---

<!-- ============================================================ -->
<!-- [73/73] Fichier : prompt-ADMIN-073.md -->
<!-- ============================================================ -->

CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Emplacement des tests : tests/tests-unitaires/admin/spec-admin-06/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-073.md
- La spécification : specs/admin.md, section SPEC-ADMIN-06
- Les exigences d'architecture : specs/architecture.md (arborescence et flux d'imports imposés par SPEC-ARCH-02)
- Les signatures existantes du domaine : src/services/server/ (aucune signature existante à ce jour pour ce cas — à créer)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-073.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. N'écris aucune règle métier. Si une classe ou une méthode nécessaire au test
   n'existe pas, crée sa signature avec un corps vide ou une exception « non
   implémenté ». Rien d'autre.
3. Les valeurs sont celles de la section « Données ». N'en invente aucune.
4. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
5. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-073.test.ts (à créer)
   - src/services/server/case-admin-073.service.ts (à créer si nécessaire)
   - tests/cases/admin/CASE-ADMIN-073.md (uniquement le champ « Fichier »)
   Ne touche à aucun test existant.
6. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.
7. Le test doit échouer sur son assertion, pas à l'import ni à la collecte.
8. Respecte l'arborescence et le flux d'imports de specs/architecture.md
   (SPEC-ARCH-02) : la signature de domaine vit sous src/services/server/, jamais
   ailleurs (pas de dossier src/domain/ — absent de l'architecture imposée).

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test :
  npx vitest run --project admin tests/tests-unitaires/admin/spec-admin-06/CASE-ADMIN-073.test.ts
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.
