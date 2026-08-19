# CASE-ARCH-1018 — Interdiction pour la couche UI (src/components/) d'importer directement src/services/

**Spécification :** `SPEC-ARCH-02`  
**Critère d'acceptation :** `AC-9`, `Matrice d'import`, `Rôle components/`, `REQ-ARCH-002`  
**Type :** architecture / conformité des imports  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège le découplage fondamental entre la couche de présentation UI (`src/components/`) et la couche d'accès aux données / services métier (`src/services/`). Il interdit formellement à tout composant React d'importer directement un service : l'accès aux données doit systématiquement transiter par des props injectées par les Server Components (`src/app/`), par des hooks dédiés (`src/hooks/`) ou par des Server Actions (`src/actions/`).

## Cas

```gherkin
Étant donné un composant React situé sous « src/components/ » (ex. « src/components/domain/booking-card.tsx »)
Quand ses déclarations d'imports sont analysées
Alors il n'importe aucun module situé sous « src/services/ » (ni « services/client/ », ni « services/server/ »)
Et toute tentative d'import direct d'un service dans un composant UI déclenche une erreur bloquante
```

## Données

| Module | Dépendances internes autorisées | Interdictions formelles |
|---|---|---|
| `src/components/` | `hooks/`, `actions/`, `utils/`, `schemas/`, `config/`, `components/` | **`src/services/` (client & server)**, `src/lib/`, `src/env/` |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Import de `src/services/` dans `src/components/` | Rejet bloquant (Fail) | Matrice d'importation de SPEC-ARCH-02 |
| Consommation de données via `src/hooks/` | Autorisé | Flux architectural nominal |
| Consommation de mutations via `src/actions/` | Autorisé | Flux architectural nominal |

## Ce que ce cas ne vérifie pas

- les imports de `src/app/` (couvert par `CASE-ARCH-1015`) ;
- l'encapsulation des hooks (couvert par `CASE-ARCH-1019`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1018_interdiction_import_services_par_components_ui`  
**Fichier :** [CASE-ARCH-1018.test.ts](../../tests-unitaires/architecture/spec-arch-02/CASE-ARCH-1018.test.ts)

## Revue du test automatisé

- [x] Le test scanne l'intégralité des fichiers sous `src/components/`.
- [x] Le test vérifie qu'aucun fichier n'importe de chemin contenant `services/`.
- [x] Le test simule un import de `src/services/client/booking.service.ts` dans un composant et s'assure du rejet.
- [x] Le nom du test contient `CASE_ARCH_1018`.
- [x] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** Antigravity (automatisation Vitest)
**Remarques :** Test automatisé et validé avec ts-morph & Vitest
