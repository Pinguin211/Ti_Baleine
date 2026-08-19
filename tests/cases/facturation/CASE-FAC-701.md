# CASE-FAC-701 — Envoi de la facture PDF acquittée après paiement d'une privatisation standard

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-1`, `AC-2`, `AC-3`, `AC-5`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège le flux nominal d'émission et d'envoi de la facture acquittée suite au paiement intégral d'une privatisation forfaitaire (600 € sur le Tikap). Si la règle se casse, l'entreprise cliente ne reçoit pas sa facture acquittée ou un montant incorrect est facturé (par exemple en appliquant indûment une tarification au passager au lieu du forfait global).

## Cas

```gherkin
Étant donné une réservation de type « Privatisation demi-journée matin (7h–12h) » sur le Tikap
Et un montant forfaitaire total de 600 €
Et l'adresse courriel client renseignée « contact@entreprise.re »
Quand le paiement en ligne de 600 € est validé avec succès
Alors une facture acquittée d'un montant de 600 € TTC est générée à la volée en mémoire au format PDF
Et la facture mentionne l'identifiant unique, le statut « Acquittée » et l'intitulé de la privatisation
Et un courriel transactionnel contenant la facture PDF en pièce jointe et le récapitulatif de la réservation est envoyé à « contact@entreprise.re »
Et aucun fichier PDF physique n'est stocké sur le disque du serveur
Et l'état d'émission de la facture est persisté en base de données à « envoyée avec succès » avec son horodatage
```

## Données

| Élément | Valeur |
|---|---:|
| Prestation | Privatisation demi-journée matin (7h–12h) |
| Navire | Tikap |
| Type de tarification | Forfaitaire |
| Courriel du client | contact@entreprise.re |
| Statut du paiement bancaire | validé avec succès |
| Montant total réglé | 600 € |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Montant forfaitaire privatisation | 600 € | Forfait demi-journée Tikap |
| Majoration passagers | 0 € | Non applicable en privatisation |
| Montant total TTC réglé | 600 € | Forfait fixe |
| Mention d'acquittement sur PDF | Acquittée | Validation du paiement bancaire |
| Persistance PDF sur disque | 0 fichier (en mémoire uniquement) | Règle d'architecture sans stockage physique |
| Courriel transactionnel | Envoyé à contact@entreprise.re | Expédition immédiate avec PDF en pièce jointe |
| Statut d'émission en base | envoyée avec succès | Horodatage de l'envoi SMTP réussi |

## Ce que ce cas ne vérifie pas

- la facturation de réservations individuelles par passager (couvert par `CASE-FAC-700`, `CASE-FAC-702`, `CASE-FAC-704`) ;
- la privatisation spécifique au départ de Saint-Leu sans majoration géographique (couvert par `CASE-FAC-706`) ;
- les échecs SMTP ou coupures réseau (couvert par `CASE-FAC-718`) ;
- les paiements non aboutis, refusés ou en attente (couvert par `CASE-FAC-720`, `CASE-FAC-721`, `CASE-FAC-722`) ;
- l'idempotence des notifications de paiement en doublon (couvert par `CASE-FAC-723`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_701_envoi_facture_pdf_acquittee_privatisation_forfaitaire`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test configure une réservation pour une privatisation matin du Tikap à 600 €.
- [ ] Le test simule la confirmation de paiement intégral de 600 €.
- [ ] Le test vérifie que la facture PDF est générée à la volée avec la mention « Acquittée ».
- [ ] Le test vérifie que le montant total TTC affiché est exactement 600 €.
- [ ] Le test s'assure qu'aucun fichier PDF physique n'est stocké sur le disque.
- [ ] Le test vérifie l'envoi du courriel à `contact@entreprise.re` avec le PDF en pièce jointe.
- [ ] Le test vérifie l'enregistrement en base du statut « envoyée avec succès » avec son horodatage.
- [ ] Le nom du test contient `CASE_FAC_701`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
