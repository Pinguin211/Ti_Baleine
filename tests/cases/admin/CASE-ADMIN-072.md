# CASE-ADMIN-072 — Calcul et affichage du taux de remplissage le mardi et jeudi après-midi à Saint-Gilles sur jauge pleine de 36 places

**Spécification :** `SPEC-ADMIN-05`  
**Critère d'acceptation :** `Portée §2`, `R-01`, `R-10`  
**Type :** acceptation / calcul  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la restauration de la jauge pleine de 36 places à Saint-Gilles le mardi et jeudi après-midi (créneau de 14h00), suite au retour du Tikap depuis Saint-Leu après sa sortie matinale de 9h. Si la règle se casse, le créneau de 14h pourrait être limité à tort à 24 places.

## Cas

```gherkin
Étant donné le créneau du mardi à 14h00 à Saint-Gilles (Tikap revenu de Saint-Leu + Grand Bleu présents)
Et 30 billets actifs enregistrés sur ce créneau
Quand l'administrateur consulte le planning
Alors la jauge maximale appliquée est de 36 places (flotte complète réunie)
Et le décompte affiché est de 30/36 places
Et le taux de remplissage affiché est de 83,33 %
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau | Mardi 14:00 — Saint-Gilles |
| Flotte présente l'après-midi | Tikap (12) + Grand Bleu (24) = 36 places |
| Billets actifs | 30 |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Jauge maximale | 36 places | Règles R-01 et R-10 (retour Tikap l'après-midi) |
| Décompte | 30/36 places | 30 / 36 |
| Taux calculé | 83,33 % | (30 / 36) × 100 |

## Ce que ce cas ne vérifie pas

- le créneau du matin mardi à Saint-Gilles (jauge 24, couvert par `CASE-ADMIN-042`) ;
- le créneau du matin mardi à Saint-Leu (jauge 12, couvert par `CASE-ADMIN-043`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_072_calcul_taux_remplissage_mardi_jeudi_apres_midi_saint_gilles_jauge_36`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test configure un créneau un mardi à 14h à Saint-Gilles.
- [ ] Le test vérifie que la jauge retenue est bien de 36 places.
- [ ] Le test injecte 30 billets et vérifie le résultat 30/36 (83,33 %).
- [ ] Le nom du test contient `CASE_ADMIN_072`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
