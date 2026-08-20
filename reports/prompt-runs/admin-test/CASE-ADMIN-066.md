# Run — CASE-ADMIN-066

**Fichier de test :** tests/tests-unitaires/admin/case-admin-066.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-066.test.ts
- tests/cases/admin/CASE-ADMIN-066.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-066.test.ts -t "test_CASE_ADMIN_066_blocage_mixite_activites_meme_navire_creneau_exclusivite"

**Résultat de vérification :** rouge attendu — `Cannot find module '../../../src/actions/affecter-navires-creneau.action'` (aucune erreur de syntaxe TypeScript dans le test).

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/actions/affecter-navires-creneau.action.ts` — même action que CASE-ADMIN-065 (`affecterNaviresCreneau`), ici exercée sur son chemin de rejet.
- `src/services/server/slots/exclusivite-navire.service.ts` — règle de conflit/exclusivité (R-12) : recherche, pour chaque navire de l'affectation demandée, toute autre affectation existante sur un créneau au même horaire portant une activité différente ; retourne le blocage avec le message d'exclusivité si trouvé. C'est la couche « règles d'exclusivité et de conflit » du mapping imposé (`src/services/server/slots/`).
- `src/schemas/types/slots.types.ts` — type `Creneau` étendu par `navires: Bateau[]` (même hypothèse que CASE-ADMIN-065).
- `src/schemas/types/slots-ports.types.ts` — port `DepotCreneaux`.
- `src/schemas/validation/slots/` — schéma Zod de validation de l'entrée (réutilisé de CASE-ADMIN-065).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Même hypothèse que CASE-ADMIN-065 sur l'attribut `navires: Bateau[]` de `Creneau`, absent de `docs/uml/domain.puml`, nécessaire pour représenter l'affectation testée ici.
- Le CASE décrit un seul « créneau de 10h00 » portant successivement deux activités (Baleines puis Dauphins) pour le même navire. Comme `Creneau.activite` est un champ singulier dans le domaine (un créneau = une seule activité), j'ai modélisé la situation avec **deux instances de `Creneau`** distinctes au même horaire (10:00, même port), l'une déjà configurée en Baleines avec Grand Bleu affecté, l'autre configurée en Dauphins vers laquelle on tente d'affecter le même navire Grand Bleu. C'est cette double instanciation concurrente au même horaire que la règle d'exclusivité R-12 doit détecter et bloquer.
- Le message d'erreur asserté reprend mot pour mot la valeur de la colonne « Message d'erreur » du tableau « Résultat attendu, calculé à la main » du CASE.
