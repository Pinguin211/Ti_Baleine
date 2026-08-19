# CASE-ARCH-1013 — Restriction stricte des imports de src/env/server.ts aux modules serveur privés

**Spécification :** `SPEC-ARCH-02`  
**Critère d'acceptation :** `AC-4`, `Matrice d'import`, `Scénario 4`, `Cas limite #4`, `Règle d'étanchéité`, `REQ-ARCH-002`  
**Type :** architecture / sécurité / étanchéité  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège la confidentialité des secrets backend, clés API privées et chaînes de connexion de base de données. Il garantit que `src/env/server.ts` n'est importé que par les modules s'exécutant exclusivement sur le serveur (`src/services/server/`, `src/lib/server/`, `src/actions/` et `src/app/`), et bloque immédiatement tout import dans les hooks React (`src/hooks/`), les composants client (`"use client"`) et les modules isomorphes/client.

## Cas

```gherkin
Étant donné le module « src/env/server.ts »
Quand l'analyseur de conformité et d'étanchéité inspecte ses consommateurs
Alors « src/env/server.ts » est importé exclusivement par « src/services/server/ », « src/lib/server/ », « src/actions/ » et « src/app/ »
Et toute importation de « src/env/server.ts » dans « src/hooks/ », dans un composant « "use client" » ou dans un dossier « client/ » déclenche un rejet immédiat et une erreur bloquante
```

## Données

| Module | Consommateurs autorisés (Serveur exclusif) | Consommateurs formellement interdits |
|---|---|---|
| `src/env/server.ts` | `services/server/`, `lib/server/`, `actions/`, `app/` | `hooks/`, `components/`, `services/client/`, `lib/client/`, `schemas/`, `utils/`, `config/` |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Import par Server Action (`src/actions/`) | Autorisé | Scénario 4 de SPEC-ARCH-02 |
| Import par Server Component (`src/app/`) | Autorisé | Rôle de `src/app/` |
| Import par Hook React (`src/hooks/`) | Rejet bloquant | Cas limite #4 de SPEC-ARCH-02 |
| Import par composant `"use client"` | Rejet bloquant | Règle d'étanchéité (`server-only`) |

## Ce que ce cas ne vérifie pas

- l'import de `env/client.ts` par les hooks (couvert par `CASE-ARCH-1012`) ;
- l'étanchéité globale des sous-dossiers `server/` (couvert par `CASE-ARCH-1016`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1013_restriction_stricte_imports_env_server_aux_modules_serveur`  
**Fichier :** [CASE-ARCH-1013.test.ts](../../tests-unitaires/architecture/spec-arch-02/CASE-ARCH-1013.test.ts)

## Revue du test automatisé

- [x] Le test liste tous les fichiers important `src/env/server.ts`.
- [x] Le test vérifie qu'aucun fichier sous `src/hooks/` ni aucun composant client n'importe `src/env/server.ts`.
- [x] Le test simule un import de `src/env/server.ts` dans un hook `src/hooks/domain/use-auth.ts` et vérifie l'échec immédiat.
- [x] Le nom du test contient `CASE_ARCH_1013`.
- [x] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** Antigravity (automatisation Vitest)
**Remarques :** Test automatisé et validé avec ts-morph & Vitest
