# Prompt — écrire le test de CASE-ADMIN-031

> Garantie de cohérence transactionnelle de la jauge et des billets lors d'une réduction partielle
>
> Étape « cas de test → test ». Le cas de test est le contrat, l'agent produit
> le test. Suit `docs/prompt/prompt-GABARIT-test.md`.
>
> Prérequis : le cas `tests/cases/admin/CASE-ADMIN-031.md` doit exister.
>
> À recopier tel quel dans l'agent. Un prompt = un test.

```text
CONTEXTE
Stack : Next.js / TypeScript, complétée par Vitest (tests unitaires et
d'intégration) et Playwright (tests de bout en bout).
Commande de test : npm test (exécute `vitest run` pour les tests unitaires et
d'intégration, et `playwright test` pour les tests E2E).
Emplacement des tests : tests/tests-unitaires/admin/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/admin/CASE-ADMIN-031.md
- La spécification métier : specs/admin.md, section SPEC-ADMIN-03
- Les exigences d'architecture : specs/architecture.md (règles SPEC-ARCH-01 et SPEC-ARCH-02)

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-ADMIN-031.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. Interdiction formelle d'écrire ou de modifier des fichiers sous src/. N'écris
   aucune règle métier, aucune signature et ne crée aucun fichier dans src/.
3. Déduis dans le test où sera le code cible sous src/ en t'appuyant strictement
   sur specs/architecture.md (SPEC-ARCH-01 pour les conventions de nommage,
   SPEC-ARCH-02 pour l'arborescence modulaire et le flux d'imports :
   ex. src/services/server/, src/schemas/, src/utils/).
4. Les valeurs sont celles de la section « Données ». N'en invente aucune.
5. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
6. Ne modifie aucun fichier en dehors de :
   - tests/tests-unitaires/admin/case-admin-031.test.ts
   - tests/cases/admin/CASE-ADMIN-031.md (uniquement le champ « Fichier »)
   Ne touche à aucun fichier sous src/ ni à aucun autre test existant.
7. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test.
- L'emplacement et l'interface déduits pour le futur code sous src/ selon specs/architecture.md.
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.
```
