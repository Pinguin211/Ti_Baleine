# CASE-ARCH-1004 — Plafonnement global de tout fichier source à 500 lignes maximum

**Spécification :** `SPEC-ARCH-01`  
**Critère d'acceptation :** `AC-3`, `Cas limite #4`, `Portée §5`, `Règle §3`, `REQ-ARCH-001`  
**Type :** conformité statique / architecture  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'ensemble du projet contre l'inflation démesurée des fichiers sources (`.ts`, `.tsx`, `.js`, `.jsx`). Il impose un plafond global strict de 500 lignes au total par fichier, forçant le découpage modulaire et garantissant que les modules restent à taille humaine et facilement maintenables.

## Cas

```gherkin
Étant donné un fichier source (« .ts », « .tsx », « .js » ou « .jsx »)
Et que ce fichier compte plus de 500 lignes au total (ex. 520 lignes)
Et que le fichier ne comporte aucun bloc TSDoc d'en-tête de dérogation « @need_more_lines »
Quand le test de conformité est exécuté
Alors le linter / test lève une erreur de volumétrie globale
Et le fichier est rejeté avec obligation de le découper en plusieurs modules
```

## Données

| Élément | Fichier Conforme | Fichier Non Conforme |
|---|---:|---:|
| Nature du fichier | `.ts` ou `.tsx` | `.ts` ou `.tsx` |
| Nombre total de lignes | $\le 500$ lignes | 540 lignes |
| Tag de dérogation d'en-tête | Absent ou non requis | Absent |
| Résultat attendu | Validé (Pass) | Rejet bloquant (Fail) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Statut fichier $\le 500$ lignes | Conforme | Règle §3 de SPEC-ARCH-01 |
| Statut fichier $> 500$ lignes sans tag | Rejet | Cas limite #4 de SPEC-ARCH-01 |
| Message de rejet | Explicite | Dépassement du plafond de 500 lignes |

## Ce que ce cas ne vérifie pas

- la validation d'un fichier $> 500$ lignes avec une dérogation d'en-tête valide (couvert par `CASE-ARCH-1005`) ;
- le positionnement incorrect du tag de dérogation en milieu/fin de fichier (couvert par `CASE-ARCH-1021`) ;
- la limite de 30 lignes par fonction dans les fichiers `.ts` (couvert par `CASE-ARCH-1000`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1004_plafonnement_global_fichier_source_500_lignes_max`  
**Fichier :** [CASE-ARCH-1004.test.ts](../../tests-unitaires/architecture/spec-arch-01/CASE-ARCH-1004.test.ts)

## Revue du test automatisé

- [x] Le test scanne l'ensemble des fichiers `.ts`, `.tsx`, `.js`, `.jsx` sous `src/`.
- [x] Le test vérifie que tout fichier sans dérogation compte au maximum 500 lignes.
- [x] Le test simule un fichier de 501 lignes sans dérogation et s'assure du rejet.
- [x] Le nom du test contient `CASE_ARCH_1004`.
- [x] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** Antigravity (automatisation Vitest)
**Remarques :** Test automatisé et validé avec ts-morph & Vitest
