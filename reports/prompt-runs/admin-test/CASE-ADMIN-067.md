# Run — CASE-ADMIN-067

**Fichier de test :** tests/tests-unitaires/admin/case-admin-067.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-067.test.ts
- tests/cases/admin/CASE-ADMIN-067.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-067.test.ts -t "test_CASE_ADMIN_067_blocage_conflit_naturaliste_unique_deux_sorties_baleines_simultanees"

**Résultat de vérification :** rouge attendu — `Cannot find module '../../../src/actions/configurer-activite-creneau.action'` (aucune erreur de syntaxe TypeScript dans le test).

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/actions/configurer-activite-creneau.action.ts` — même action que CASE-ADMIN-064 (`configurerActiviteCreneau`), ici exercée sur son chemin de rejet.
- `src/services/server/slots/conflit-naturaliste.service.ts` — règle de conflit de ressource (R-15, C-19) : lorsqu'une activité `necessiteNaturaliste = true` (cf. `ConfigActivite` du domaine, vrai pour `BALEINES`) est configurée sur un créneau, recherche tout autre créneau du même jour déjà configuré avec une activité nécessitant le naturaliste sur un site distant ; bloque et renvoie le message de conflit si trouvé. S'appuie sur `ConfigSkipper.naturaliste` et `ConfigActivite.necessiteNaturaliste`, tous deux déjà présents dans `docs/uml/domain.puml` — aucune extension du domaine nécessaire ici.
- `src/schemas/types/slots.types.ts` — type `Creneau` (réutilisé, sans extension).
- `src/schemas/types/slots-ports.types.ts` — port `DepotCreneaux`.
- `src/schemas/validation/slots/` — schéma Zod de validation de `{ creneauId, activite }` (réutilisé de CASE-ADMIN-064).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- La section « Données » du CASE indique « Sortie 2 tentée | Mardi 10:00 Saint-Gilles », valeur retenue pour le test (plutôt que « 09h00 ou 10h00 » du gherkin, qui énonce une alternative narrative) conformément à la règle « les valeurs viennent uniquement de la section Données ».
- Une date calendaire concrète (2026-08-25) est utilisée pour représenter « le mardi » des deux créneaux, identique pour les deux, afin de matérialiser l'identité du jour ; cette date précise n'est pas fournie par le CASE et n'a aucune incidence sur l'assertion (seule l'égalité de jour entre les deux créneaux compte pour la règle de conflit).
- Le message d'erreur asserté reprend mot pour mot la valeur de la colonne « Message d'erreur » du tableau « Résultat attendu, calculé à la main » du CASE, qui diffère légèrement de la formulation narrative de la ligne « Et » du gherkin.
