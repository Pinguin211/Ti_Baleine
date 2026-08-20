# Prompt — écrire le code de CASE-ADMIN-003

> Présence obligatoire de l'indicateur visuel et du badge « Sous pré-alerte » sur un créneau alerté
>
> Étape « test → code ». Le test est le contrat, l'agent produit le code. Suit
> `docs/prompt/prompt-gabarit-code.md`.
>
> Prérequis : le test `tests/tests-unitaires/admin/case-admin-003.test.ts` doit exister et être rouge.
>
> À recopier tel quel dans l'agent. Un prompt = une tâche = un test qui passe du
> rouge au vert.

```text
CONTEXTE
Stack : Next.js / TypeScript, complétée par Vitest (tests unitaires et
d'intégration) et Playwright (tests de bout en bout).
Commande de test : npm test (exécute `vitest run` pour les tests unitaires et
d'intégration, et `playwright test` pour les tests E2E).
Commande pour ce seul test : npx vitest run --project admin tests/tests-unitaires/admin/case-admin-003.test.ts
Commande d'audit d'architecture : npm run arch:report

CE QUE JE TE DONNE
- Le test à faire passer : tests/tests-unitaires/admin/case-admin-003.test.ts::test_CASE_ADMIN_003_presence_indicateur_badge_sous_pre_alerte_sur_creneau
- Le cas de test : tests/cases/admin/CASE-ADMIN-003.md
- La spécification : specs/admin.md, section SPEC-ADMIN-01
- Les exigences d'architecture : specs/architecture.md
- Le modèle du domaine : docs/uml/domain.puml
- Les fichiers du domaine que tu peux modifier : src/app/admin/planning/, src/components/domain/planning/, src/services/server/planning/, src/hooks/domain/planning/

TA TÂCHE
1. Fais passer au vert le test test_CASE_ADMIN_003_presence_indicateur_badge_sous_pre_alerte_sur_creneau, et lui seul.
2. À la fin de la tâche, lance la commande d'audit `npm run arch:report`, analyse le rapport généré `reports/arch-compliance-report.md`, et applique les corrections nécessaires pour garantir une conformité totale (0 infraction).

CONTRAINTES
1. Ne modifie aucun fichier sous tests/. Le test est le contrat, pas une
   proposition. Si tu le crois faux, arrête-toi et dis-le-moi.
2. Ne le contourne pas : pas de skip, pas de xfail, pas de tolérance élargie,
   pas d'assertion neutralisée.
3. Implémente la règle, pas la valeur attendue. Les nombres écrits dans le cas
   de test ne doivent apparaître nulle part dans le code de production. Le
   calcul part du pourcentage écrit dans la spécification.
4. La règle vit dans le domaine : src/services/server/planning/. Pas dans un contrôleur, pas dans un
   écran, pas dans une requête.
5. Respecte le modèle du domaine documenté dans docs/uml/domain.puml : mêmes
   classes, mêmes attributs, mêmes relations, même vocabulaire. N'invente
   aucune entité ni relation absente du diagramme. Si le test l'exige, arrête-
   toi et dis-le-moi plutôt que de t'en écarter.
6. N'implémente que ce que ce test exige. Ne traite pas les autres cas, ne
   généralise pas, n'anticipe aucune évolution. Les autres tests rouges restent
   rouges.
7. Respecte strictement les spécifications de specs/architecture.md :
   - Fichiers .ts/.js : max 30 lignes utiles par fonction (sauf dérogation TSDoc @need_more_lines - "motif").
   - Fichiers .tsx/.jsx : mono-composant strict (1 composant par fichier, aucun sous-composant local).
   - Plafond global : max 500 lignes par fichier.
   - Flux d'imports & étanchéité : respect de la matrice modulaire et interdiction des modules serveurs/secrets dans le client et les hooks.
   - Conventions de nommage : kebab-case pour fichiers/dossiers, camelCase pour fonctions/variables/hooks, PascalCase pour classes/types/composants.
8. Ne modifie aucun fichier en dehors de : `src/app/admin/planning/`, `src/components/domain/planning/`, `src/services/server/planning/`, `src/hooks/domain/planning/`.
9. Aucune dépendance nouvelle.

RENDS
- Le diff.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test, et son résultat.
- Le résultat de la commande d'audit `npm run arch:report` confirmant le statut 🟢 CONFORME de `reports/arch-compliance-report.md`.
- Où vit la règle, en une ligne : fichier et fonction.
- Ce que tu as dû supposer et qui n'était ni dans la spécification ni dans le
  test.
```
