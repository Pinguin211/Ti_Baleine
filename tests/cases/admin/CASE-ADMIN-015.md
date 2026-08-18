# CASE-ADMIN-015 — Remise à disposition immédiate et synchrone de la totalité des places libérées sur l'interface publique

**Spécification :** `SPEC-ADMIN-02`  
**Critère d'acceptation :** `AC-2`, `Portée §5`, `REQ-013`  
**Type :** acceptation / synchronisation  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège la remise en vente instantanée des places libérées par une annulation. Si la règle se casse, un décalage ou un cache persistant empêcherait d'autres clients de réserver les places redevenues vacantes jusqu'à l'échéance H-2.

## Cas

```gherkin
Étant donné un créneau affichant 34/36 places occupées (2 places restantes)
Et une réservation de 4 places annulée par l'administrateur
Quand l'annulation est validée
Alors la jauge occupée passe instantanément à 30/36 places (6 places disponibles)
Et l'interface publique de réservation permet immédiatement de sélectionner jusqu'à 6 places
```

## Données

| Élément | Valeur |
|---|---:|
| Jauge initiale | 34/36 (2 disponibles) |
| Places annulées | 4 |
| Jauge finale attendue | 30/36 (6 disponibles) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Places libres | 6 places | 2 + 4 = 6 places immédiatement disponibles |
| Accessibilité publique | Réservable en ligne sans délai | Synchronisme immédiat (REQ-013) |

## Ce que ce cas ne vérifie pas

- la fermeture des ventes à H-2 du départ (couvert par le domaine RÉSERVATION) ;
- la réduction partielle de places (couvert par `CASE-ADMIN-023`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_015_remise_a_disposition_immediate_places_interface_publique`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test initialise un créneau avec 34 places occupées.
- [ ] Le test annule une réservation de 4 places.
- [ ] Le test interroge immédiatement l'API publique de disponibilité.
- [ ] Le test vérifie que 6 places sont disponibles à la vente.
- [ ] Le nom du test contient `CASE_ADMIN_015`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
