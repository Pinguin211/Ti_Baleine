# CASE-FAC-700 — Envoi de la facture PDF acquittée après paiement d'une réservation individuelle à Saint-Leu

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-1`, `AC-2`, `AC-3`, `AC-5`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège le flux nominal d'émission et de transmission de la facture acquittée suite à la confirmation d'un paiement en ligne pour une réservation individuelle avec supplément géographique (Saint-Leu). Si la règle se casse, le client ne reçoit pas sa facture ou reçoit un document erroné (omission du supplément, statut non acquitté, persistance indue de fichiers sur le serveur), et le système ne trace pas correctement l'état d'envoi.

## Cas

```gherkin
Étant donné une réservation individuelle pour une sortie « Baleines » le 18/08/2026 à 9h00
Et un port d'embarquement situé à « Saint-Leu »
Et un groupe composé de 2 adultes
Et un tarif de base de 65 € par adulte et un supplément géographique de 10 € par personne
Et une adresse courriel client renseignée « client.exemple@test.re »
Quand le paiement en ligne d'un montant total de 150 € est validé avec succès
Alors une facture acquittée est générée à la volée en mémoire au format PDF
Et la facture PDF mentionne l'identifiant unique, la mention explicite « Acquittée », la date « 18/08/2026 9h00 », le port « Saint-Leu » et la ligne de supplément (« Majoration / Supplément Saint-Leu » ou « 2 × 10 € »)
Et un courriel transactionnel contenant la facture PDF en pièce jointe et le récapitulatif de la réservation est envoyé à « client.exemple@test.re »
Et aucun fichier PDF physique n'est stocké sur le disque du serveur
Et l'état d'émission de la facture est persisté en base de données à « envoyée avec succès » avec son horodatage
```

## Données

| Élément | Valeur |
|---|---:|
| Prestation | Sortie Baleines |
| Date et heure de départ | 18/08/2026 9h00 |
| Port d'embarquement | Saint-Leu |
| Nombre de participants | 2 adultes |
| Tarif unitaire de base adulte | 65 € |
| Majoration géographique Saint-Leu | 10 € / personne |
| Courriel du client | client.exemple@test.re |
| Statut du paiement bancaire | validé avec succès |
| Montant total réglé | 150 € |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Montant base adultes | 130 € | 2 adultes × 65 € |
| Supplément géographique Saint-Leu | 20 € | 2 adultes × 10 € |
| Montant total TTC réglé | 150 € | 130 € + 20 € |
| Mention d'acquittement sur PDF | Acquittée | Paiement validé avec succès |
| Port d'embarquement sur PDF | Saint-Leu | Valeur issue de la réservation |
| Persistance PDF sur disque | 0 fichier (en mémoire uniquement) | Règle d'architecture sans stockage physique |
| Courriel transactionnel | Envoyé à client.exemple@test.re | Notification immédiate avec PDF en pièce jointe |
| Statut d'émission en base | envoyée avec succès | Horodatage de l'envoi SMTP réussi |

## Ce que ce cas ne vérifie pas

- la facturation d'une réservation au départ de Saint-Gilles sans supplément (couvert par `CASE-FAC-702`) ;
- la facturation d'une sortie « Dauphins » (couvert par `CASE-FAC-703`) ;
- la facturation avec répartition mixte adultes / enfants (couvert par `CASE-FAC-704` et `CASE-FAC-705`) ;
- la facturation d'une privatisation forfaitaire (couvert par `CASE-FAC-701` et `CASE-FAC-706`) ;
- le formatage strict regex du numéro de facture (couvert par `CASE-FAC-707`) ;
- l'échec de transmission SMTP ou coupure réseau (couvert par `CASE-FAC-718`) ;
- le comportement en cas de rebond e-mail / boîte pleine (couvert par `CASE-FAC-719`) ;
- les transactions bancaires refusées, expirées ou en attente (couvert par `CASE-FAC-720`, `CASE-FAC-721`, `CASE-FAC-722`) ;
- la détection et le blocage de doublons de confirmation de paiement (couvert par `CASE-FAC-723`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_700_envoi_facture_pdf_acquittee_reservation_individuelle_saint_leu`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test configure une réservation pour 2 adultes à Saint-Leu au montant de 150 €.
- [ ] Le test valide le calcul : base 130 € + supplément géographique 20 €.
- [ ] Le test simule la confirmation de paiement avec succès.
- [ ] Le test vérifie que la facture PDF est générée à la volée avec la mention « Acquittée ».
- [ ] Le test vérifie la présence explicite du port « Saint-Leu » et du détail des montants.
- [ ] Le test s'assure qu'aucun fichier PDF n'est écrit de manière persistante sur le disque.
- [ ] Le test vérifie l'envoi du courriel à `client.exemple@test.re` avec la pièce jointe PDF.
- [ ] Le test vérifie la persistance du statut « envoyée avec succès » et de l'horodatage en base de données.
- [ ] Le nom du test contient `CASE_FAC_700`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
