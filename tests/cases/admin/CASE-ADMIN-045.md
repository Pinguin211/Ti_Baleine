# CASE-ADMIN-045 — Affichage d'un créneau complet avec affichage à 100 % et badge « Complet »

**Spécification :** `SPEC-ADMIN-05`  
**Critère d'acceptation :** `Cas limite #2`  
**Type :** acceptation / visuel  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'affichage d'un créneau ayant atteint sa jauge maximale (12/12, 24/24 ou 36/36). L'interface doit afficher 100 %, 0 place restante et un badge visuel « Complet » bloquant toute nouvelle réservation.

## Cas

```gherkin
Étant donné un créneau de Saint-Leu (jauge 12) ayant 12 billets actifs enregistrés
Quand l'administrateur consulte ce créneau au planning
Alors le décompte indique 12/12 places
Et le taux de remplissage affiche 100 %
Et un badge « Complet » apparaît distinctement sur la fiche du créneau
Et la disponibilité restante indiquée est de 0 place
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau | Saint-Leu 12 places |
| Billets actifs | 12 billets |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Taux de remplissage | 100 % | (12 / 12) × 100 |
| Badge | « Complet » affiché | Cas limite #2 SPEC-ADMIN-05 |
| Places restantes | 0 place disponible | Capacité atteinte |

## Ce que ce cas ne vérifie pas

- la libération de place suite à annulation (couvert par `CASE-ADMIN-046`) ;
- le créneau privatisé (couvert par `CASE-ADMIN-047`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_045_affichage_creneau_complet_taux_100_pourcent_badge_complet`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test remplit un créneau à sa capacité maximale exacte.
- [ ] Le test vérifie l'affichage à 100 %.
- [ ] Le test vérifie la présence du badge 'Complet'.
- [ ] Le nom du test contient `CASE_ADMIN_045`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
