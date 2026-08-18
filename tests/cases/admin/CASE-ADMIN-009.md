# CASE-ADMIN-009 — Maintien de l'affichage du créneau au planning sous le seuil de 6 passagers

**Spécification :** `SPEC-ADMIN-01`  
**Critère d'acceptation :** `Portée §3`, `R-09`  
**Type :** conformité / règle métier  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la non-automatisation de l'annulation d'un départ sous le seuil de rentabilité de 6 passagers (règle R-09). Si la règle se casse, le système pourrait annuler prématurément et automatiquement des réservations alors que la décision d'annuler ou de maintenir la sortie doit rester strictement manuelle et humaine.

## Cas

```gherkin
Étant donné un créneau programmé ayant seulement 4 passagers réservés (seuil R-09 non atteint)
Quand l'administrateur consulte le planning à H-2 du départ
Alors le créneau demeure actif et affiché sur le planning
Et le système ne déclenche aucune annulation automatique de la sortie ni des billets
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau | Sortie Baleines — 4 passagers inscrits |
| Seuil minimal de maintien (R-09) | 6 passagers |
| Heure | H-2 avant départ |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Statut du créneau | Actif / Maintenu | Règle R-09 et Portée §3 SPEC-ADMIN-01 |
| Annulation automatique | Non déclenchée (0 action auto) | Décision manuelle hors système |
| Billets des passagers | Tous actifs (4 billets conservés) | Intégrité des réservations |

## Ce que ce cas ne vérifie pas

- l'annulation standard d'une réservation (couvert par `CASE-ADMIN-012`) ou la fermeture manuelle du créneau (couvert par `CASE-ADMIN-062`) ;
- le calcul du taux de remplissage correspondant (couvert par `CASE-ADMIN-041`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_009_maintien_affichage_creneau_sous_seuil_6_passagers_sans_annulation_auto`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test prépare un créneau avec 4 passagers (< seuil de 6).
- [ ] Le test simule l'atteinte de l'échéance H-2.
- [ ] Le test vérifie que le créneau reste au statut actif.
- [ ] Le test vérifie qu'aucun billet n'a été supprimé automatiquement.
- [ ] Le nom du test contient `CASE_ADMIN_009`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
