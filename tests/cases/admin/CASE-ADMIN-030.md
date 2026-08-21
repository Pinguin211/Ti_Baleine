# CASE-ADMIN-030 — Rejet strict de toute tentative de réduction de passagers sur un créneau déjà passé

**Spécification :** `SPEC-ADMIN-03`  
**Critère d'acceptation :** `Cas limite #5`  
**Type :** sécurité / règle temporelle  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège contre la modification rétrospective du nombre de passagers sur une sortie dont la date et l'heure de départ sont déjà échues.

## Cas

```gherkin
Étant donné une réservation dont le départ a eu lieu hier à 14h00
Quand l'administrateur tente de réduire le nombre de passagers de cette réservation
Alors le système refuse l'opération avec un message d'erreur d'échéance dépassée
Et les billets restent enregistrés à leur état d'origine
```

## Données

| Élément | Valeur |
|---|---:|
| Départ de la sortie | Date passée (hier 14h00) |
| Action | Tentative de réduction |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Statut | Rejeté avec message explicite | Cas limite #5 SPEC-ADMIN-03 |
| Billets en base | Intacts | Aucune modification rétroactive |

## Ce que ce cas ne vérifie pas

- la réduction avant le départ (couvert par `CASE-ADMIN-023`) ;
- le rejet d'annulation après départ (couvert par `CASE-ADMIN-018`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_030_rejet_strict_reduction_passagers_creneau_deja_passe`  
**Fichier :** tests/tests-unitaires/admin/case-admin-030.test.ts

## Revue du test automatisé

- [ ] Le test configure un créneau passé.
- [ ] Le test tente d'exécuter une réduction de passagers.
- [ ] Le test vérifie que la demande est refusée.
- [ ] Le nom du test contient `CASE_ADMIN_030`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
