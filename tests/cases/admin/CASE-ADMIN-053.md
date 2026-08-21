# CASE-ADMIN-053 — Préremplissage instantané de la zone de texte par sélection du template type codé en dur « Incident technique »

**Spécification :** `SPEC-ADMIN-06`  
**Critère d'acceptation :** `Portée §3`, `AC-2`, `REQ-018`, `R-23`  
**Type :** acceptation / ergonomie  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège la disponibilité du second modèle type codé en dur « Incident technique » (panne mécanique ou maintenance inopinée d'un navire).

## Cas

```gherkin
Étant donné l'administrateur préparant une alerte pour un navire en panne
Quand il sélectionne le template « Incident technique »
Alors la zone de texte est instantanément remplie avec le modèle bilingue d'incident technique
Et l'administrateur peut adapter le texte avant diffusion
```

## Données

| Élément | Valeur |
|---|---:|
| Template sélectionné | « Incident technique » |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Texte prérempli | Modèle bilingue incident technique (FR + EN) | Règles R-23, R-26 |
| Comportement | Remplacement immédiat dans l'éditeur de message | AC-2 |

## Ce que ce cas ne vérifie pas

- le template météo (couvert par `CASE-ADMIN-052`) ;
- l'envoi effectif du message (couvert par `CASE-ADMIN-048`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_053_preremplissage_instantane_template_incident_technique`  
**Fichier :** tests/tests-unitaires/admin/case-admin-053.test.ts

## Revue du test automatisé

- [ ] Le test clique sur le template 'Incident technique'.
- [ ] Le test vérifie l'insertion du message bilingue technique dans l'éditeur.
- [ ] Le nom du test contient `CASE_ADMIN_053`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
