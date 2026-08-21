# CASE-ADMIN-042 — Calcul et affichage du taux de remplissage le mardi et jeudi matin à Saint-Gilles sur jauge de 24 places

**Spécification :** `SPEC-ADMIN-05`  
**Critère d'acceptation :** `Scénario 2`, `AC-1`, `R-10`  
**Type :** acceptation / calcul  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège l'adaptation dynamique de la jauge maximale de Saint-Gilles le mardi et jeudi matin (créneaux de 7h et 10h) : pendant que le Tikap opère à Saint-Leu, seul le Grand Bleu (24 places) est présent à Saint-Gilles (règle R-10). Si la règle se casse, la jauge maximale resterait à 36 places, faussant les calculs et risquant de provoquer une surréservation de 12 places.

## Cas

```gherkin
Étant donné un créneau du mardi à 07h00 à Saint-Gilles (Tikap détaché à Saint-Leu, Grand Bleu seul)
Et 18 billets actifs enregistrés sur ce créneau
Quand l'administrateur consulte le planning
Alors la jauge maximale prise en compte est de 24 places
Et le décompte affiché est de 18/24 places
Et le taux de remplissage affiché est de 75 % (18 ÷ 24)
Et la capacité restante affichée est de 6 places
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau | Mardi 07:00 — Saint-Gilles |
| Navire mobilisé | Grand Bleu uniquement (Tikap absent le matin) |
| Jauge applicable (R-10) | 24 places |
| Billets actifs | 18 billets |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Jauge maximale | 24 places | Règle R-10 (Grand Bleu seul) |
| Décompte | 18/24 places | 18 actifs / 24 max |
| Taux de remplissage | 75 % | (18 / 24) × 100 |
| Places restantes | 6 places | 24 - 18 = 6 |

## Ce que ce cas ne vérifie pas

- le créneau du mardi après-midi 14h à Saint-Gilles (couvert par `CASE-ADMIN-072`) ;
- le créneau de Saint-Leu à 9h (couvert par `CASE-ADMIN-043`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_042_calcul_taux_remplissage_mardi_jeudi_matin_saint_gilles_jauge_24`  
**Fichier :** tests/tests-unitaires/admin/case-admin-042.test.ts

## Revue du test automatisé

- [ ] Le test programme un créneau un mardi à 7h à Saint-Gilles avec 18 billets.
- [ ] Le test vérifie que le diviseur de capacité utilisé est 24 (et non 36).
- [ ] Le test vérifie l'affichage de 18/24 et 75 %.
- [ ] Le nom du test contient `CASE_ADMIN_042`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
