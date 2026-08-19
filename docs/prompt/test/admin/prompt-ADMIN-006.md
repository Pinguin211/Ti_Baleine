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
