# CASE-ADMIN-010 — Annulation complète d'une réservation à la demande du client suite à pré-alerte météo

**Spécification :** `SPEC-ADMIN-02`  
**Critère d'acceptation :** `Scénario 1`, `AC-1`, `AC-2`, `AC-3`, `REQ-013`, `REQ-014`, `REQ-020`, `R-28`  
**Type :** acceptation  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège l'annulation intégrale d'une réservation à la demande du client suite à l'émission d'une pré-alerte météo, y compris l'affichage à l'administrateur du calcul indicatif de remboursement dérogatoire à 100 %. Si la règle se casse, les billets restent bloqués, la jauge n'est pas libérée, le client ne reçoit pas sa confirmation par SMS, l'administrateur ne dispose pas du bon calcul dérogatoire, ou la réservation est indûment détruite au lieu d'être conservée à 0 billet pour la comptabilité.

## Cas

```gherkin
Étant donné une réservation confirmée détenant 2 billets adultes sur un créneau sous pré-alerte, ayant versé un acompte de 45,00 €
Et l'administrateur recevant l'appel du client souhaitant annuler sa venue par peur de la météo
Quand l'administrateur clique sur « Annuler toute la réservation »
Alors le système affiche à l'administrateur le calcul dérogatoire à 100 % : remboursement indicatif de 45,00 € (intégralité des sommes perçues)
Quand l'administrateur sélectionne le motif « Annulation client par peur suite à alerte météo »
Alors les 2 billets (BOOKING_ITEMS) rattachés à la commande sont supprimés
Et la réservation (BOOKINGS) est conservée en base avec 0 billet actif
Et les 2 places sont immédiatement remises à disposition sur le créneau
Et un SMS transactionnel d'information est envoyé au numéro mobile du client sans aucune mention du calcul de remboursement
```

## Données

| Élément | Valeur |
|---|---:|
| Réservation initiale | 2 billets adultes |
| Créneau | Sous pré-alerte météo |
| Acompte versé | 45,00 € |
| Motif sélectionné | Annulation client par peur suite à alerte météo |
| Numéro mobile client | +262692001122 |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Calcul indicatif affiché (admin) | Remboursement dérogatoire 100 % = 45,00 € | Régime dérogatoire alerte météo (R-28) |
| Billets supprimés | 2 billets (BOOKING_ITEMS) | Suppression totale des billets |
| État de la réservation | Conservée avec 0 billet actif | Conformité comptable (REQ-013) |
| Places libérées sur créneau | +2 places immédiatement | Libération synchrone (REQ-013) |
| SMS envoyé | Envoyé à +262692001122, sans détail financier | Notification d'annulation (REQ-014, R-28) |

## Ce que ce cas ne vérifie pas

- le remboursement financier effectif (géré manuellement à 100 % hors système selon R-28 et C-10, couvert par `CASE-ADMIN-022`) ;
- la réduction partielle d'un seul billet (couvert par `CASE-ADMIN-023`) ;
- l'annulation administrative d'office météo (couvert par `CASE-ADMIN-011`) ;
- le régime de calcul standard hors alerte (couvert par `CASE-ADMIN-012`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_010_annulation_complete_reservation_demande_client_suite_pre_alerte`  
**Fichier :** tests/tests-unitaires/admin/case-admin-010.test.ts

## Revue du test automatisé

- [ ] Le test configure une réservation de 2 billets sur un créneau sous pré-alerte avec un acompte versé connu.
- [ ] Le test vérifie l'affichage à l'administrateur du calcul dérogatoire à 100 % avant validation de l'annulation.
- [ ] Le test sélectionne le motif de désistement client suite à alerte.
- [ ] Le test valide la suppression des 2 enregistrements BOOKING_ITEMS.
- [ ] Le test s'assure que l'entité BOOKINGS subsiste avec 0 billet.
- [ ] Le test vérifie que la jauge du créneau augmente de 2 places.
- [ ] Le test intercepte l'envoi du SMS de confirmation et vérifie l'absence de toute mention du calcul financier.
- [ ] Le nom du test contient `CASE_ADMIN_010`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
