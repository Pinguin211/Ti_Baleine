# CASE-ADMIN-044 — Affichage d'un créneau à 0 billet actif avec mention explicite 0 % et 0 place réservée

**Spécification :** `SPEC-ADMIN-05`  
**Critère d'acceptation :** `Cas limite #1`  
**Type :** acceptation / cas limite  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège l'affichage propre d'un créneau vide sans aucune réservation active, évitant les divisions par zéro ou les affichages indéfinis.

## Cas

```gherkin
Étant donné un créneau standard de 36 places à Saint-Gilles n'ayant aucun billet actif
Quand l'administrateur consulte le planning
Alors le décompte affiche 0/36 places
Et le taux de remplissage affiché est de 0 %
Et la totalité des 36 places est indiquée comme disponible
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau | 36 places — 0 billet actif |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Décompte | 0/36 places | COUNT(BOOKING_ITEMS) = 0 |
| Taux affiché | 0 % | Cas limite #1 SPEC-ADMIN-05 |
| Disponibilité | 36 places disponibles | 36 - 0 = 36 |

## Ce que ce cas ne vérifie pas

- le créneau complet (couvert par `CASE-ADMIN-045`) ;
- le créneau sous pré-alerte sans réservation (couvert par `CASE-ADMIN-059`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_044_affichage_creneau_0_billet_actif_taux_0_pourcent`  
**Fichier :** tests/tests-unitaires/admin/case-admin-044.test.ts

## Revue du test automatisé

- [ ] Le test charge un créneau sans aucune réservation.
- [ ] Le test vérifie que le taux calculé est 0 % et que 0/36 est rendu.
- [ ] Le nom du test contient `CASE_ADMIN_044`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
