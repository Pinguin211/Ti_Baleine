# Prompt — écrire le code de CASE-ADMIN-041

> Calcul et affichage du taux de remplissage d'un créneau standard à Saint-Gilles sur jauge de 36 places
>
> Étape « test → code ». Le test est le contrat, l'agent produit le code. Suit
> `docs/prompt/prompt-gabarit-code.md`.
>
> Prérequis : le test `tests/tests-unitaires/admin/case-admin-041.test.ts` doit exister et être rouge.
>
> À recopier tel quel dans l'agent. Un prompt = une tâche = un test qui passe du
> rouge au vert.

```text
CONTEXTE
Stack : Next.js / TypeScript, complétée par Vitest (tests unitaires et
d'intégration) et Playwright (tests de bout en bout).
Commande de test : npm test (exécute `vitest run` pour les tests unitaires et
d'intégration, et `playwright test` pour les tests E2E).
Commande pour ce seul test : npx vitest run --project admin tests/tests-unitaires/admin/case-admin-041.test.ts
Commande d'audit d'architecture : npm run arch:report

CE QUE JE TE DONNE
- Le test à faire passer : tests/tests-unitaires/admin/case-admin-041.test.ts::test_CASE_ADMIN_041_calcul_taux_remplissage_creneau_standard_saint_gilles_jauge_36
- Le cas de test : tests/cases/admin/CASE-ADMIN-041.md
- La spécification : specs/admin.md, section SPEC-ADMIN-05
- Les exigences d'architecture : specs/architecture.md
- Les fichiers du domaine que tu peux modifier : src/admin/capacity/, src/admin/planning/

TA TÂCHE
1. Fais passer au vert le test test_CASE_ADMIN_041_calcul_taux_remplissage_creneau_standard_saint_gilles_jauge_36, et lui seul.
2. À la fin de la tâche, lance la commande d'audit `npm run arch:report`, analyse le rapport généré `reports/arch-compliance-report.md`, et applique les corrections nécessaires pour garantir une conformité totale (0 infraction).

CONTRAINTES
1. Ne modifie aucun fichier sous tests/. Le test est le contrat, pas une
   proposition. Si tu le crois faux, arrête-toi et dis-le-moi.
2. Ne le contourne pas : pas de skip, pas de xfail, pas de tolérance élargie,
   pas d'assertion neutralisée.
3. Implémente la règle, pas la valeur attendue. Les nombres écrits dans le cas
   de test ne doivent apparaître nulle part dans le code de production. Le
   calcul part du pourcentage écrit dans la spécification.
4. La règle vit dans le domaine : src/admin/capacity/. Pas dans un contrôleur, pas dans un
   écran, pas dans une requête.
5. N'implémente que ce que ce test exige. Ne traite pas les autres cas, ne
   généralise pas, n'anticipe aucune évolution. Les autres tests rouges restent
   rouges.
6. Respecte strictement les spécifications de specs/architecture.md :
   - Fichiers .ts/.js : max 30 lignes utiles par fonction (sauf dérogation TSDoc @need_more_lines - "motif").
   - Fichiers .tsx/.jsx : mono-composant strict (1 composant par fichier, aucun sous-composant local).
   - Plafond global : max 500 lignes par fichier.
   - Flux d'imports & étanchéité : respect de la matrice modulaire et interdiction des modules serveurs/secrets dans le client et les hooks.
   - Conventions de nommage : kebab-case pour fichiers/dossiers, camelCase pour fonctions/variables/hooks, PascalCase pour classes/types/composants.
7. Ne modifie aucun fichier en dehors de : `src/admin/capacity/`, `src/admin/planning/`.
8. Aucune dépendance nouvelle.

RENDS
- Le diff.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test, et son résultat.
- Le résultat de la commande d'audit `npm run arch:report` confirmant le statut 🟢 CONFORME de `reports/arch-compliance-report.md`.
- Où vit la règle, en une ligne : fichier et fonction.
- Ce que tu as dû supposer et qui n'était ni dans la spécification ni dans le
  test.
```
