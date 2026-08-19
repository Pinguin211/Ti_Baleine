# CASE-ARCH-1015 — Périmètre d'importation autorisé de src/app/ (Next.js App Router)

**Spécification :** `SPEC-ARCH-02`  
**Critère d'acceptation :** `AC-6`, `Matrice d'import`, `Scénario data-fetching`, `Cas limite #6`, `Rôle app/`, `REQ-ARCH-002`  
**Type :** architecture / App Router Next.js  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'alignement architectural avec Next.js App Router et le respect du pattern Server Component. Les pages et layouts sous `src/app/` ont pour rôle le chargement initial de données (SSR/RSC) et l'assemblage de composants. Ils sont autorisés à importer directement `src/components/`, `src/services/server/`, `src/actions/`, `src/schemas/` et `src/env/`, mais ont l'interdiction formelle d'importer `src/lib/` (encapsulé dans les services) et `src/hooks/` (réservés aux Client Components).

## Cas

```gherkin
Étant donné un Server Component de page dans « src/app/admin/planning/page.tsx »
Quand ses déclarations d'imports sont analysées
Alors la page peut importer « src/services/server/planning.service.ts » pour le data-fetching initial
Et elle peut importer « src/actions/planning.actions.ts » pour lier les mutations aux formulaires
Et elle peut importer « src/schemas/types/planning.types.ts » pour typer ses données
Et elle peut importer « src/env/server.ts » pour la configuration serveur
Et elle peut importer « src/components/ » pour l'affichage de l'interface
Et toute importation directe de « src/lib/ » ou de « src/hooks/ » est rejetée
```

## Données

| Module source | Dépendances internes autorisées | Interdictions formelles directes |
|---|---|---|
| `src/app/` | `components/`, `services/server/`, `actions/`, `schemas/`, `env/` | `lib/` (court-circuit), `hooks/` (Client side only), `services/client/` |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Import de `services/server/` par une page `src/app/` | Autorisé | Data-fetching RSC |
| Import de `actions/` par une page `src/app/` | Autorisé | Orchestration Server Actions |
| Import de `lib/` par une page `src/app/` | Rejet bloquant | Cas limite #6 de SPEC-ARCH-02 |
| Import de `hooks/` par une page `src/app/` | Rejet bloquant | Interdiction hooks en Server Component |

## Ce que ce cas ne vérifie pas

- l'interdiction d'importer `services/` par les composants UI (couvert par `CASE-ARCH-1018`) ;
- l'étanchéité `server-only` (couvert par `CASE-ARCH-1016`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1015_perimetre_imports_autorises_nextjs_app_router`  
**Fichier :** [CASE-ARCH-1015.test.ts](../../tests-unitaires/architecture/spec-arch-02/CASE-ARCH-1015.test.ts)

## Revue du test automatisé

- [x] Le test analyse tous les fichiers sous `src/app/`.
- [x] Le test vérifie que chaque import interne pointe vers `components/`, `services/server/`, `actions/`, `schemas/` ou `env/`.
- [x] Le test échoue si un fichier sous `src/app/` importe un module de `src/lib/` ou un hook de `src/hooks/`.
- [x] Le nom du test contient `CASE_ARCH_1015`.
- [x] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** Antigravity (automatisation Vitest)
**Remarques :** Test automatisé et validé avec ts-morph & Vitest
