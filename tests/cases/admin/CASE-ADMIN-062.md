# CASE-ADMIN-062 — Fermeture administrative manuelle d'un créneau ouvert sans passager

**Spécification :** `SPEC-ADMIN-07`  
**Critère d'acceptation :** `Scénario 1`, `AC-1`, `REQ-011`, `R-13`  
**Type :** acceptation / gestion de créneau  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la capacité de l'administrateur à fermer manuellement un créneau sans passager (ex. pour maintenance navire ou décision d'exploitation, règle R-13). Le créneau passe au statut « fermé » et disparaît immédiatement des créneaux réservables sur le site public.

## Cas

```gherkin
Étant donné un créneau ouvert à la réservation n'ayant aucun passager inscrit
Quand l'administrateur sélectionne l'action « Fermer le créneau » dans son tableau de bord
Alors le statut du créneau passe à « FERMÉ »
Et le créneau disparaît instantanément de l'interface de réservation publique (REQ-011, R-13)
Et aucune réservation ne peut plus être effectuée sur ce créneau
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau | Ouvert — 0 passager |
| Action admin | Fermeture manuelle |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Statut créneau | FERMÉ | REQ-011, R-13 |
| Visibilité site public | Masqué / Non réservable | Disparition immédiate |

## Ce que ce cas ne vérifie pas

- la réouverture exceptionnelle d'un créneau fermé (couvert par `CASE-ADMIN-063`) ;
- l'annulation d'un créneau ayant déjà des passagers (couvert par SPEC-ADMIN-02).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_062_fermeture_administrative_manuelle_creneau_sans_passager`  
**Fichier :** tests/tests-unitaires/admin/case-admin-062.test.ts

## Revue du test automatisé

- [ ] Le test ferme un créneau ouvert sans réservation.
- [ ] Le test vérifie le passage du statut à FERMÉ en base.
- [ ] Le test vérifie que le créneau n'est plus retourné par l'API publique de réservation.
- [ ] Le nom du test contient `CASE_ADMIN_062`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
