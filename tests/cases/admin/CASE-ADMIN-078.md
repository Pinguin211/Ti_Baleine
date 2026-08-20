# CASE-ADMIN-078 — Bascule automatique vers « Payée complètement » après validation du webhook bancaire du solde en ligne

**Spécification :** `SPEC-ADMIN-01`  
**Critère d'acceptation :** `Cas limite #7`, `AC-3`, `REQ-023`, `R-30`  
**Type :** acceptation / cas limite  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la mise à jour automatique et sans intervention manuelle du statut financier d'une réservation lorsque le client règle son solde en ligne à distance (hors embarcadère). Si la règle se casse, une réservation en réalité soldée continue d'apparaître comme « Payée partiellement » sur le planning, risquant un encaissement en double à l'embarcadère ou une confusion pour l'administrateur le jour J.

## Cas

```gherkin
Étant donné une réservation affichée sur le planning à l'état « Payée partiellement », avec un acompte déjà réglé et un solde dû de 52,50 €
Et le client réglant le solde restant en ligne à distance, la veille du départ, via le lien de paiement transmis
Quand le webhook bancaire confirmant la validation du paiement du solde est reçu et traité par le système
Alors le statut financier de la réservation bascule immédiatement à « Payée complètement »
Et le solde dû affiché sur le détail du créneau est ramené à 0,00 €
Et aucune action de l'administrateur sur place n'est requise pour opérer cette bascule
```

## Données

| Élément | Valeur |
|---|---:|
| Statut initial réservation | Payée partiellement |
| Solde dû avant paiement en ligne | 52,50 € |
| Moyen de règlement | Paiement en ligne à distance (webhook bancaire) |
| Moment du règlement | Veille du départ |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Statut financier affiché | Payée complètement | Bascule dès validation du webhook bancaire (Cas limite #7 SPEC-ADMIN-01, R-30) |
| Solde dû affiché | 0,00 € | 52,50 € réglés en ligne |
| Intervention administrateur | Aucune | Bascule automatique, sans encaissement sur place |

## Ce que ce cas ne vérifie pas

- la bascule vers « Payée complètement » consécutive à un encaissement CB sur place par l'administrateur (couvert par `CASE-ADMIN-074`) ;
- l'affichage statique et simultané des deux statuts financiers sur une liste de réservations déjà établie (couvert par `CASE-ADMIN-077`) ;
- le traitement technique interne de validation du webhook bancaire (couvert par `SPEC-PAY`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_078_bascule_payee_completement_webhook_bancaire_solde_en_ligne`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test configure une réservation « Payée partiellement » avec un solde dû non nul.
- [ ] Le test simule la réception et le traitement d'un webhook bancaire validant le paiement du solde en ligne.
- [ ] Le test vérifie la bascule du statut affiché à « Payée complètement ».
- [ ] Le test vérifie que le solde dû affiché est ramené à 0,00 €.
- [ ] Le test s'assure qu'aucune action administrateur sur place n'est nécessaire à la bascule.
- [ ] Le nom du test contient `CASE_ADMIN_078`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
