# CASE-ADMIN-031 — Garantie de cohérence transactionnelle de la jauge et des billets lors d'une réduction partielle

**Spécification :** `SPEC-ADMIN-03`  
**Critère d'acceptation :** `Cas limite #6`, `REQ-107`  
**Type :** intégrité / transactionnel  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège l'intégrité transactionnelle lors d'une réduction partielle de billets en cas de crash ou déconnexion réseau (REQ-107). La suppression du billet et l'incrément de disponibilité de la jauge doivent être validés de manière atomique.

## Cas

```gherkin
Étant donné une réduction partielle initiée pour 1 billet
Et un incident de communication avec la base de données intervenant pendant la requête
Quand l'erreur se produit
Alors un rollback complet est exécuté
Et la réservation conserve l'ensemble de ses billets initiaux
Et la capacité du créneau n'est pas modifiée
```

## Données

| Élément | Valeur |
|---|---:|
| Opération | Réduction de 1 billet |
| Incident | Perte de connexion BDD pendant commit |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| État transaction | Rollback automatique | Atomicité (REQ-107) |
| Cohérence BDD | 0 désynchronisation entre billets et jauge | Intégrité des données |

## Ce que ce cas ne vérifie pas

- la cohérence lors d'une annulation totale (couvert par `CASE-ADMIN-021`) ;
- la gestion réseau de consultation (couvert par `CASE-ADMIN-008`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_031_coherence_transactionnelle_jauge_billets_reduction_partielle`  
**Fichier :** tests/tests-unitaires/admin/case-admin-031.test.ts

## Revue du test automatisé

- [ ] Le test injecte une erreur SQL durant la réduction.
- [ ] Le test s'assure que le rollback est total.
- [ ] Le test valide l'intégrité de la table BOOKING_ITEMS et des places.
- [ ] Le nom du test contient `CASE_ADMIN_031`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
