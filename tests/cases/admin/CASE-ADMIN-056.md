# CASE-ADMIN-056 — Basculement automatique du statut des créneaux ciblés à « sous pré-alerte » dès confirmation d'envoi

**Spécification :** `SPEC-ADMIN-06`  
**Critère d'acceptation :** `Scénario 1`, `AC-4`, `REQ-019`, `R-25`  
**Type :** acceptation / transition d'état  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège le changement d'état du créneau en base de données : dès confirmation de l'envoi de l'alerte, le statut du créneau passe immédiatement à « sous pré-alerte » (règles REQ-019 et R-25).

## Cas

```gherkin
Étant donné un créneau du lendemain initialement à l'état « ouvert » (statut standard)
Quand l'administrateur confirme l'envoi de l'alerte sur ce créneau
Alors le statut du créneau en base de données passe automatiquement à « SOUS_PRE_ALERTE »
Et ce nouveau statut est répercuté immédiatement sur le planning et le site de réservation
```

## Données

| Élément | Valeur |
|---|---:|
| Statut initial créneau | OUVERT (standard) |
| Action | Validation de l'envoi d'alerte |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Nouveau statut créneau | SOUS_PRE_ALERTE | REQ-019, R-25 |
| Horodatage d'alerte | Enregistré en base | Traçabilité |

## Ce que ce cas ne vérifie pas

- l'affichage de l'avertissement en ligne (couvert par `CASE-ADMIN-057`) ;
- l'indicateur visuel sur le planning back-office (couvert par `CASE-ADMIN-003`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_056_basculement_automatique_statut_creneau_sous_pre_alerte`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test envoie une alerte sur un créneau ouvert.
- [ ] Le test inspecte l'état du créneau en base de données.
- [ ] Le test vérifie que le champ statut vaut SOUS_PRE_ALERTE.
- [ ] Le nom du test contient `CASE_ADMIN_056`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
