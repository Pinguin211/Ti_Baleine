# CASE-ARCH-1016 — Étanchéité stricte server-only pour les composants et modules client

**Spécification :** `SPEC-ARCH-02`  
**Critère d'acceptation :** `AC-7`, `Règle d'étanchéité`, `Cas limite #7`, `REQ-ARCH-002`  
**Type :** architecture / sécurité / build  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège l'application contre les fuites critiques de code serveur, d'accès direct aux bases de données ou de clés privées vers le bundle JavaScript transmis au navigateur. Il garantit que tout composant React annoté `"use client"` ou tout module sous un dossier `client/` ne peut jamais importer directement ou indirectement un fichier situé sous un sous-dossier `server/` ou `src/env/server.ts`.

## Cas

```gherkin
Étant donné un composant React annoté « "use client" » dans « src/components/ui/button.tsx » ou un module dans « src/services/client/ »
Quand l'analyseur de bundles et de conformité des dépendances est exécuté
Alors aucun import direct ou indirect ne pointe vers un module sous « */server/ » ou vers « src/env/server.ts »
Et toute tentative d'import de code serveur dans un module client déclenche un échec bloquant immédiat de compilation / test
```

## Données

| Contexte d'exécution | Dossiers serveur interdits | Fichiers serveur interdits |
|---|---|---|
| Composants `"use client"` | `services/server/`, `lib/server/` | `src/env/server.ts` |
| Modules isomorphes/client | `services/server/`, `lib/server/` | `src/env/server.ts` |
| Hooks React (`src/hooks/`) | `services/server/`, `lib/server/` | `src/env/server.ts` |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Import de `services/server/` dans un composant `"use client"` | Rejet bloquant immédiat | Cas limite #7 de SPEC-ARCH-02 |
| Import de `env/server.ts` dans un hook | Rejet bloquant immédiat | Règle d'étanchéité (`server-only`) |
| Présence de code privé serveur côté navigateur | 0 octet | Sécurité et étanchéité |

## Ce que ce cas ne vérifie pas

- l'accès à `src/env/client.ts` par les composants (couvert par `CASE-ARCH-1012`) ;
- la détection de cycles d'imports (couvert par `CASE-ARCH-1017`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1016_etancheite_stricte_server_only_modules_client`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test identifie tous les fichiers annotés `"use client"` et ceux situés dans les dossiers `client/` et `hooks/`.
- [ ] Le test vérifie qu'aucun de ces fichiers n'importe un chemin contenant `/server/` ou `src/env/server.ts`.
- [ ] Le test simule un import de `src/services/server/auth.service.ts` dans un composant client et vérifie le blocage.
- [ ] Le nom du test contient `CASE_ARCH_1016`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
