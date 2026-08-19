# CASE-ADMIN-075 — Blocage de l'encaissement sur une réservation déjà « Payée complètement »

**Spécification :** `SPEC-ADMIN-08`  
**Critère d'acceptation :** `Scénario 2`, `Cas limite #1`, `AC-1`, `REQ-022`  
**Type :** rejet / cas limite  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège contre le double encaissement du solde d'une réservation. Si la règle se casse, l'administrateur pourrait valider un second paiement sur une réservation déjà intégralement soldée, générant un encaissement indu ou une seconde facture de solde erronée.

## Cas

```gherkin
Étant donné une réservation déjà à l'état « Payée complètement » (solde réglé en ligne ou déjà encaissé sur place)
Quand l'administrateur consulte la fiche de la réservation
Alors le bouton « Encaisser le solde (CB sur place) » est désactivé
Et le statut affiché indique « Solde déjà réglé »
Et aucune action d'encaissement supplémentaire n'est réalisable
```

## Données

| Élément | Valeur |
|---|---:|
| Statut initial réservation | Payée complètement |
| Solde restant dû | 0,00 € |
| Action tentée | Encaissement du solde CB sur place |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Bouton d'encaissement | Désactivé | Cas limite #1 SPEC-ADMIN-08 |
| Mention affichée | « Solde déjà réglé » | Information à l'administrateur |
| Double encaissement | Impossible | Intégrité financière (R-07) |

## Ce que ce cas ne vérifie pas

- le déroulement nominal de l'encaissement du solde (couvert par `CASE-ADMIN-074`) ;
- l'absence d'option de règlement en espèces ou en chèques vacances (couvert par `CASE-ADMIN-076`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_075_blocage_encaissement_solde_reservation_deja_payee_completement`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test configure une réservation déjà à l'état « Payée complètement ».
- [ ] Le test vérifie que le bouton d'encaissement du solde est désactivé.
- [ ] Le test vérifie l'affichage de la mention « Solde déjà réglé ».
- [ ] Le test s'assure qu'aucun encaissement ni facture supplémentaire n'est généré.
- [ ] Le nom du test contient `CASE_ADMIN_075`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
