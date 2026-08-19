# CASE-ADMIN-024 — Réduction partielle de passagers par suppression sélective de N billets enfants

**Spécification :** `SPEC-ADMIN-03`  
**Critère d'acceptation :** `AC-1`, `REQ-015`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège le retrait sélectif de billets de catégorie enfant. Si la règle se casse, un billet adulte pourrait être supprimé à la place d'un billet enfant, faussant la typologie des passagers de la sortie.

## Cas

```gherkin
Étant donné une réservation comprenant 2 adultes et 2 enfants
Quand l'administrateur retire 1 billet enfant de la réservation
Alors 1 billet enfant (BOOKING_ITEM) est supprimé
Et la réservation compte désormais 2 adultes et 1 enfant
Et 1 place est synchroniquement libérée sur le créneau
```

## Données

| Élément | Valeur |
|---|---:|
| Composition initiale | 2 adultes, 2 enfants |
| Action | Retrait de 1 billet enfant |
| Composition finale | 2 adultes, 1 enfant |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Billets adultes | 2 adultes (inchangé) | Intégrité du type adulte |
| Billets enfants | 1 enfant | 2 - 1 = 1 |
| Places remises en vente | +1 place | Libération de capacité |

## Ce que ce cas ne vérifie pas

- la réduction mixte adultes + enfants (couvert par `CASE-ADMIN-025`) ;
- la tentative d'ajout de passager (couvert par `CASE-ADMIN-027`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_024_reduction_partielle_passagers_suppression_billet_enfant`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test initialise une réservation de 2 adultes et 2 enfants.
- [ ] Le test applique la réduction sur 1 enfant.
- [ ] Le test vérifie la suppression précise de la ligne tarifaire enfant.
- [ ] Le nom du test contient `CASE_ADMIN_024`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
