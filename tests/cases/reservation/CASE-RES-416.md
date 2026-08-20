# CASE-RES-416 — Annulation ou rejet du paiement de l'acompte par carte bancaire

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-8`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège le comportement transactionnel négatif lors du paiement de l'acompte par carte bancaire. Si la transaction bancaire est refusée par la banque émettrice, interrompue par l'utilisateur (abandon de saisie ou retour arrière) ou échoue lors de l'authentification forte (3D-Secure), le système ne doit en aucun cas créer de réservation active ni décompter définitivement des places sur la jauge du créneau. Si une défaillance survient dans ce cas nominal négatif, des réservations fantômes non payées peuvent bloquer artificiellement les capacités des navires.

## Cas

```gherkin
Étant donné un client ayant renseigné son panier pour 2 adultes à Saint-Gilles (acompte de 39,00 €) sur un créneau avec 10 places libres
Quand le client engage le paiement de l'acompte par carte bancaire
Et que la transaction est rejetée par la passerelle de paiement (refus bancaire ou échec 3D-Secure)
Alors le système affiche un message d'erreur de paiement explicite
Et invite le client à renouveler sa tentative
Et aucune réservation n'est persistée à l'état « payée » ou « payée partiellement »
Et la jauge du créneau conserve ses 10 places libres disponibles
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau testé | Saint-Gilles 10h00 |
| Places libres initiales | 10 places |
| Participants | 2 adultes |
| Montant acompte engagé | 39,00 € |
| Résultat transaction bancaire | Refus / Échec 3D-Secure / Annulation client |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Statut transaction bancaire | Échec / Refusé | Retour webhook / passerelle bancaire |
| Réservation enregistrée | Aucune (ou état « rejetée/annulée ») | R-07, AC-8 (condition sine qua non) |
| Décompte définitif jauge | 0 place décomptée | Préservation des capacités |
| Places libres après échec | 10 places | Jauge inchangée (10 places libres) |
| Facture émise | Aucune | Pas de facture pour paiement non abouti |

## Ce que ce cas ne vérifie pas

- la libération après expiration du verrou temporaire (timer panier) (couvert par `CASE-RES-417`) ;
- le paiement nominal réussi de l'acompte (couvert par `CASE-RES-400`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_RES_416_echec_paiement_acompte_cb_aucune_reservation_jauge_intacte`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test initialise un créneau avec 10 places libres.
- [ ] Le test simule une tentative de réservation avec rejet bancaire ou abandon de transaction.
- [ ] Le test vérifie que le système affiche un message d'erreur d'échec de paiement.
- [ ] Le test vérifie qu'aucune réservation active n'est enregistrée.
- [ ] Le test vérifie que la jauge du créneau est strictement conservée à 10 places.
- [ ] Le test vérifie qu'aucun e-mail ni facture n'est généré.
- [ ] Le nom du test contient `CASE_RES_416`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
