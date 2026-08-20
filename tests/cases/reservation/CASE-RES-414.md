# CASE-RES-414 — Réservation de la dernière place disponible et passage du créneau à l'état complet

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-2`, `AC-8`  
**Type :** acceptation  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège la gestion exacte du palier critique de la dernière place disponible sur un créneau contingenté. Il garantit que l'achat de l'ultime place restante est accepté avec succès (acompte 30 % calculé et encaissé, réservation enregistrée à l'état « payée partiellement »), que la jauge restante tombe exactement à 0 place, et que le créneau bascule immédiatement à l'état « Complet », devenant non sélectionnable pour les visiteurs ultérieurs. Si ce mécanisme est défaillant, le créneau peut rester ouvert à 0 place et générer du surbooking.

## Cas

```gherkin
Étant donné un créneau « Sortie Baleines » à Saint-Gilles disposant d'une unique place libre restante (35 places déjà réservées sur 36)
Quand un client sélectionne ce créneau
Et renseigne 1 adulte
Alors le montant total affiché est de 65,00 €, l'acompte obligatoire de 30 % est de 19,50 € et le solde restant dû est de 45,50 €
Quand il saisit ses coordonnées et valide le paiement bancaire de l'acompte de 19,50 €
Alors la réservation est enregistrée à l'état « payée partiellement »
Et la capacité restante sur le créneau passe à 0 place
Et le créneau est affiché à l'état « Complet » et n'est plus sélectionnable par d'autres clients
```

## Données

| Élément | Valeur |
|---|---:|
| Jauge totale du créneau | 36 places |
| Places occupées avant réservation | 35 places |
| Places libres avant réservation | 1 place |
| Participant | 1 adulte |
| Tarif adulte Baleines | 65,00 € |
| Coordonnées | Hoarau / Alain / alain.hoarau@test.re / +262692334455 |
| Moyen de paiement | carte bancaire (acompte 30 %) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Montant total TTC | 65,00 € | 1 adulte × 65,00 € |
| Montant acompte obligatoire (30 %) | 19,50 € | 65,00 € × 0,30 |
| Solde restant dû (70 %) | 45,50 € | 65,00 € − 19,50 € |
| Statut réservation | payée partiellement | acompte CB validé avec succès |
| Places libres après réservation | 0 place | 1 − 1 = 0 place |
| Statut affiché du créneau | Complet | Jauge saturée (36/36) |
| Sélection ultérieure | Impossible | Retiré de l'offre réservable |

## Ce que ce cas ne vérifie pas

- la tentative de réserver sur un créneau complet (couvert par `CASE-RES-413`) ;
- la réservation nominale multi-places (couvert par `CASE-RES-400`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_RES_414_reservation_derniere_place_passage_creneau_etat_complet`  
**Fichier :** `tests/tests-unitaires/reservation/case-res-414.test.ts`

## Revue du test automatisé

- [ ] Le test initialise un créneau avec 1 place libre restante.
- [ ] Le test réserve 1 adulte pour 65,00 € avec un acompte de 19,50 €.
- [ ] Le test valide le paiement CB de l'acompte.
- [ ] Le test vérifie que la réservation est « payée partiellement ».
- [ ] Le test vérifie que le créneau passe à 0 place libre et affiche « Complet ».
- [ ] Le test s'assure qu'un client ultérieur ne peut plus sélectionner ce créneau.
- [ ] Le nom du test contient `CASE_RES_414`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
