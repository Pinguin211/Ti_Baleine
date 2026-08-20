# CASE-ADMIN-043 — Calcul et affichage du taux de remplissage le mardi et jeudi matin à Saint-Leu sur jauge de 12 places

**Spécification :** `SPEC-ADMIN-05`  
**Critère d'acceptation :** `Portée §2`, `AC-1`, `R-01`  
**Type :** acceptation / calcul  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège le calcul de la jauge sur le port de Saint-Leu, opéré exclusivement par le navire Tikap avec une capacité fixe de 12 places (règle R-01). Si la règle se casse, la jauge de Saint-Leu pourrait être calculée sur une mauvaise capacité.

## Cas

```gherkin
Étant donné le créneau du jeudi à 09h00 à Saint-Leu (navire Tikap)
Et 9 billets actifs enregistrés sur ce créneau
Quand l'administrateur consulte le planning
Alors la jauge maximale appliquée est de 12 places
Et le décompte affiché est de 9/12 places
Et le taux de remplissage affiché est de 75 % (9 ÷ 12)
Et la capacité disponible affichée est de 3 places
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau | Jeudi 09:00 — Saint-Leu |
| Navire | Tikap |
| Jauge applicable (R-01) | 12 places |
| Billets actifs | 9 billets |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Jauge maximale | 12 places | Capacité Tikap à Saint-Leu |
| Décompte | 9/12 places | 9 / 12 |
| Taux de remplissage | 75 % | (9 / 12) × 100 |
| Places restantes | 3 places | 12 - 9 = 3 |

## Ce que ce cas ne vérifie pas

- le départ de Saint-Gilles le jeudi (couvert par `CASE-ADMIN-042`) ;
- la privatisation du Tikap (couvert par `CASE-ADMIN-047`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_043_calcul_taux_remplissage_mardi_jeudi_matin_saint_leu_jauge_12`  
**Fichier :** tests/tests-unitaires/admin/case-admin-043.test.ts

## Revue du test automatisé

- [ ] Le test prépare le créneau de Saint-Leu avec 9 billets.
- [ ] Le test s'assure que la jauge maximale est bien 12 places.
- [ ] Le test valide le résultat de 9/12 (75 %).
- [ ] Le nom du test contient `CASE_ADMIN_043`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
