# CASE-ARCH-1008 — Respect des conventions de nommage des fichiers sources en kebab-case

**Spécification :** `SPEC-ARCH-01`  
**Critère d'acceptation :** `AC-5`, `Table des conventions`, `Cas limite #6`, `REQ-ARCH-001`  
**Type :** conformité statique / linter  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège l'uniformité du système de fichiers et prévient les bugs de sensibilité à la casse (notamment entre systèmes de fichiers Windows/macOS et environnements Linux de CI/Production) en exigeant que 100 % des fichiers sources (`.ts`, `.tsx`, `.js`, `.jsx`) soient nommés strictement en `kebab-case`.

## Cas

```gherkin
Étant donné les fichiers sources créés sous l'arborescence « src/ »
Quand l'analyseur de conformité des noms de fichiers est exécuté
Alors les fichiers de composants et de pages portent une extension « .tsx » et un nom en « kebab-case » (ex: « booking-form.tsx », « page.tsx », « layout.tsx »)
Et les fichiers utilitaires, types et services portent une extension « .ts » et un nom en « kebab-case » (ex: « pricing-rules.ts », « slot.service.ts »)
Et tout fichier nommé avec une autre casse (ex: « BookingCard.tsx », « user_service.ts ») est rejeté
```

## Données

| Type de fichier | Extension | Format exigé | Exemples valides | Exemples rejetés |
|---|---|---|---|---|
| Composants & pages | `.tsx` / `.jsx` | `kebab-case` | `booking-form.tsx`, `page.tsx` | `BookingForm.tsx`, `bookingForm.tsx` |
| Services & utilitaires | `.ts` / `.js` | `kebab-case` | `pricing-rules.ts`, `auth.service.ts` | `pricingRules.ts`, `pricing_rules.ts` |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Statut fichiers en `kebab-case` | Conforme (Pass) | Table des conventions de SPEC-ARCH-01 |
| Statut fichiers en `CamelCase` ou `snake_case` | Rejet (Fail) | Cas limite #6 |

## Ce que ce cas ne vérifie pas

- le nommage des symboles internes dans le code (couvert par `CASE-ARCH-1007`) ;
- le nommage des répertoires (couvert par `CASE-ARCH-1009`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1008_respect_nommage_fichiers_sources_kebab_case`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test scanne l'arborescence des fichiers sous `src/`.
- [ ] Le test vérifie que chaque nom de fichier (hors extension) valide l'expression régulière kebab-case (`^[a-z0-9]+(-[a-z0-9]+)*(\.[a-z0-9]+)*$`).
- [ ] Le test échoue si un fichier comme `BookingCard.tsx` est présent.
- [ ] Le nom du test contient `CASE_ARCH_1008`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
