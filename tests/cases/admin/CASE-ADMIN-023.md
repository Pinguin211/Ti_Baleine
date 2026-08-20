# CASE-ADMIN-023 — Réduction partielle de passagers par suppression sélective de N billets adultes

**Spécification :** `SPEC-ADMIN-03`  
**Critère d'acceptation :** `Scénario 1`, `AC-1`, `REQ-015`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la réduction unitaire du nombre de passagers adultes sur une réservation existante. Si la règle se casse, la commande n'est pas mise à jour ou le nombre de places libérées sur le créneau ne correspond pas exactement au nombre de billets retirés.

## Cas

```gherkin
Étant donné une réservation confirmée détenant 3 billets adultes et 1 billet enfant
Quand l'administrateur sélectionne la réservation et retire 1 billet adulte
Alors 1 billet adulte (BOOKING_ITEM) est supprimé de la base
Et la réservation détient désormais 2 billets adultes et 1 billet enfant
Et exactement 1 place est immédiatement libérée et remise à disposition sur le créneau
```

## Données

| Élément | Valeur |
|---|---:|
| Composition initiale | 3 adultes, 1 enfant (4 billets) |
| Action | Retrait de 1 billet adulte |
| Composition finale attendue | 2 adultes, 1 enfant (3 billets) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Billets adultes restants | 2 billets | 3 - 1 = 2 |
| Billets enfants restants | 1 billet | Inchangé |
| Places libérées sur jauge | +1 place | Libération synchrone (REQ-015) |

## Ce que ce cas ne vérifie pas

- la réduction de billets enfants (couvert par `CASE-ADMIN-024`) ;
- le remboursement financier lié au billet retiré (manuel hors système, couvert par `CASE-ADMIN-032`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_023_reduction_partielle_passagers_suppression_billet_adulte`  
**Fichier :** tests/tests-unitaires/admin/case-admin-023.test.ts

## Revue du test automatisé

- [ ] Le test crée une réservation avec 3 adultes et 1 enfant.
- [ ] Le test supprime 1 billet adulte via l'écran de réduction.
- [ ] Le test vérifie qu'il reste 2 billets adultes et 1 enfant actifs.
- [ ] Le test vérifie que la jauge du créneau gagne 1 place.
- [ ] Le nom du test contient `CASE_ADMIN_023`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
