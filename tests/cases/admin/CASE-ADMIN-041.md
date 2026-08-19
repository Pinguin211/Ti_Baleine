# CASE-ADMIN-041 — Calcul et affichage du taux de remplissage d'un créneau standard à Saint-Gilles sur jauge de 36 places

**Spécification :** `SPEC-ADMIN-05`  
**Critère d'acceptation :** `Scénario 1`, `AC-1`, `REQ-010`  
**Type :** acceptation / calcul  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'exactitude mathématique du calcul du taux de remplissage pour les créneaux standards à Saint-Gilles, basés sur la mobilisation des deux navires (Tikap 12 places + Grand Bleu 24 places = 36 places). Si la règle se casse, le taux de remplissage affiché induira en erreur l'administrateur.

## Cas

```gherkin
Étant donné un créneau standard du mercredi à 10h00 à Saint-Gilles mobilisant le Tikap et le Grand Bleu (jauge 36 places)
Et 27 billets actifs (BOOKING_ITEMS) enregistrés sur ce créneau
Quand l'administrateur consulte le planning
Alors le décompte affiché est de 27/36 places
Et le taux de remplissage calculé et affiché est exactement de 75 % (27 ÷ 36)
Et la capacité restante affichée est de 9 places
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau | Mercredi 10:00 — Saint-Gilles |
| Flotte | Tikap (12) + Grand Bleu (24) |
| Jauge maximale | 36 places |
| Billets actifs | 27 billets |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Décompte des places | 27/36 places | COUNT(BOOKING_ITEMS) / 36 |
| Taux de remplissage | 75 % | (27 / 36) × 100 |
| Places restantes | 9 places | 36 - 27 = 9 |

## Ce que ce cas ne vérifie pas

- le calcul sur créneau mardi/jeudi matin Saint-Gilles (couvert par `CASE-ADMIN-042`) ;
- le calcul à Saint-Leu (couvert par `CASE-ADMIN-043`) ;
- le créneau complet à 100 % (couvert par `CASE-ADMIN-045`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_041_calcul_taux_remplissage_creneau_standard_saint_gilles_jauge_36`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test crée un créneau standard de 36 places à Saint-Gilles avec 27 billets actifs.
- [ ] Le test interroge le calcul de remplissage.
- [ ] Le test valide la fraction 27/36 et le pourcentage de 75 %.
- [ ] Le nom du test contient `CASE_ADMIN_041`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
