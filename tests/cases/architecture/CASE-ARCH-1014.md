# CASE-ARCH-1014 — Encapsulation stricte du dossier src/lib/ par la couche src/services/

**Spécification :** `SPEC-ARCH-02`  
**Critère d'acceptation :** `AC-5`, `Matrice d'import`, `Scénario 6`, `Cas limite #6`, `REQ-ARCH-002`  
**Type :** architecture / conformité des imports  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'encapsulation de l'infrastructure technique et des wrappers de bibliothèques (ORM, clients Prisma/Drizzle, SDK tiers, drivers de base de données situés sous `src/lib/`). Il garantit que `src/lib/` est exclusivement importé par le dossier `src/services/`, interdisant tout couplage direct ou court-circuit depuis les pages (`src/app/`), les Server Actions (`src/actions/`), les composants UI (`src/components/`) ou les hooks (`src/hooks/`).

## Cas

```gherkin
Étant donné une instance technique dans « src/lib/server/db.ts » ou un wrapper dans « src/lib/client/storage.ts »
Quand l'analyseur de dépendances examine l'ensemble des modules important « src/lib/ »
Alors « src/lib/ » est exclusivement importé par des modules situés sous « src/services/ »
Et toute tentative d'importer directement « src/lib/ » depuis « src/app/ », « src/actions/ », « src/components/ » ou « src/hooks/ » est rejetée
```

## Données

| Module | Dépendances autorisées | Qui peut importer ce module ? |
|---|---|---|
| `src/lib/` | `utils/`, `schemas/`, `config/`, `env/`, `node_modules` | **`src/services/` uniquement** |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Import de `src/lib/server/db.ts` par `src/services/server/auth.service.ts` | Autorisé | Scénario 6 de SPEC-ARCH-02 |
| Import de `src/lib/server/db.ts` par `src/app/admin/planning/page.tsx` | Rejet bloquant | Cas limite #6 de SPEC-ARCH-02 |
| Import de `src/lib/` par `src/actions/` | Rejet bloquant | Matrice d'importation |

## Ce que ce cas ne vérifie pas

- les imports de `src/app/` (couvert par `CASE-ARCH-1015`) ;
- l'isolation de `src/config/` (couvert par `CASE-ARCH-1010`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1014_encapsulation_stricte_lib_par_services_exclusivement`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test liste l'intégralité des fichiers important des modules sous `src/lib/`.
- [ ] Le test vérifie que 100 % de ces fichiers se trouvent sous `src/services/`.
- [ ] Le test simule un import direct de `src/lib/server/db.ts` dans une page Next.js et s'assure du rejet.
- [ ] Le nom du test contient `CASE_ARCH_1014`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
