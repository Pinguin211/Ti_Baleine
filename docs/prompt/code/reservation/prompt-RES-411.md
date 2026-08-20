CONTEXTE
Stack : Next.js / TypeScript, avec Vitest pour les tests unitaires/intégration et Playwright pour l'E2E (ADR-001 §5)
Commande de test : npm test (exécute `vitest run` puis `playwright test` — ADR-001 §1)
Commande pour ce seul test : npx vitest run tests/tests-unitaires/reservation/CASE-RES-411.test.ts -t "test_CASE_RES_411_indisponibilite_creneaux_saint_leu_hors_mardi_jeudi_matin"
Commande d'audit d'architecture : npm run arch:report

CE QUE JE TE DONNE
- Le test à faire passer : tests/tests-unitaires/reservation/CASE-RES-411.test.ts::test_CASE_RES_411_indisponibilite_creneaux_saint_leu_hors_mardi_jeudi_matin
- Le cas de test : tests/cases/reservation/CASE-RES-411.md
- La spécification : specs/reservation.md, section SPEC-RESERVATION-03 (AC-2)
- Les exigences d'architecture : specs/architecture.md (SPEC-ARCH-01, SPEC-ARCH-02, SPEC-ARCH-03)
- Les couches du domaine que tu peux modifier : src/services/server/, src/config/, src/utils/

TA TÂCHE
1. Fais passer au vert le test test_CASE_RES_411_indisponibilite_creneaux_saint_leu_hors_mardi_jeudi_matin, et lui seul.
2. À la fin de la tâche, lance la commande d'audit `npm run arch:report`, analyse le rapport généré `reports/arch-compliance-report.md`, et applique les corrections nécessaires pour garantir une conformité totale (0 infraction).

CONTRAINTES
1. Ne modifie aucun fichier sous tests/. Le test est le contrat, pas une proposition. Si tu le crois faux, arrête-toi et dis-le-moi.
2. Ne le contourne pas : pas de skip, pas de xfail, pas de tolérance élargie, pas d'assertion neutralisée.
3. Implémente la règle, pas la valeur attendue.
4. La règle vit dans le domaine : src/services/server/booking-slot.service.ts et src/utils/date-rules.ts.
5. N'implémente que ce que ce test exige. Ne traite pas les autres cas, ne généralise pas, n'anticipe aucune évolution. Les autres tests rouges restent rouges.
6. Respecte strictement les spécifications de specs/architecture.md :
   - Fichiers .ts/.js : max 30 lignes utiles par fonction (sauf dérogation TSDoc @need_more_lines - "motif").
   - Fichiers .tsx/.jsx : mono-composant strict (1 composant par fichier, aucun sous-composant local).
   - Plafond global : max 500 lignes par fichier.
   - Flux d'imports & étanchéité : respect de la matrice modulaire et interdiction des modules serveurs/secrets dans le client et les hooks.
   - Conventions de nommage : kebab-case pour fichiers/dossiers, camelCase pour fonctions/variables/hooks, PascalCase pour classes/types/composants.
7. Ne modifie aucun fichier en dehors de : src/services/server/, src/config/, src/utils/.
8. Aucune dépendance nouvelle.

RENDS
- Le diff.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test, et son résultat.
- Le résultat de la commande d'audit `npm run arch:report` confirmant le statut 🟢 CONFORME de `reports/arch-compliance-report.md`.
- Où vit la règle, en une ligne : fichier et fonction.
- Ce que tu as dû supposer et qui n'était ni dans la spécification ni dans le test.
