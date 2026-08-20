# CASE-FAC-701 — Émission des factures d'acompte et de solde après paiement d'une privatisation standard

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-1`, `AC-2`, `AC-3`, `AC-6`, `Scénario 2`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège le flux nominal d'émission et d'envoi des deux factures distinctes (acompte puis solde) suite au paiement échelonné d'une privatisation forfaitaire (600 € sur le Tikap), avec le taux d'acompte spécifique de 50 % applicable aux formules de privatisation. Si la règle se casse, l'entreprise cliente pourrait ne recevoir qu'une facture unique acquittée au lieu des deux factures distinctes requises, ou un taux d'acompte erroné (30 % au lieu de 50 %) pourrait être appliqué.

## Cas

```gherkin
Étant donné une réservation de type « Privatisation demi-journée matin (7h–12h) » sur le Tikap
Et un montant forfaitaire total de 600 €
Et l'adresse courriel client renseignée « contact@entreprise.re »
Quand le paiement en ligne de l'acompte de 50 % (300 €) est confirmé
Alors la facture d'acompte PDF est générée à la volée en mémoire avec un identifiant unique, la mention explicite « Acompte acquitté », le montant total (600 €), l'acompte réglé (300 €) et le solde restant dû (300 €)
Et un courriel transactionnel contenant la facture d'acompte PDF en pièce jointe et le récapitulatif de la réservation est envoyé à « contact@entreprise.re »
Et l'état d'émission de la facture d'acompte est persisté en base de données à « envoyée avec succès » avec son horodatage
Quand le solde de 300 € est réglé (en ligne via le lien SMS ou sur place en CB)
Alors la facture de solde distincte PDF de 600 € est générée à la volée avec un identifiant unique distinct, la mention explicite « Acquittée », le rappel de l'acompte perçu (300 €) et l'acquittement complet des 600 €
Et un courriel contenant la facture de solde PDF est envoyé à « contact@entreprise.re »
Et aucun fichier PDF physique n'est stocké sur le disque du serveur pour l'une ou l'autre facture
Et l'état d'émission de la facture de solde est persisté en base de données à « envoyée avec succès » avec son horodatage
```

## Données

| Élément | Valeur |
|---|---:|
| Prestation | Privatisation demi-journée matin (7h–12h) |
| Navire | Tikap |
| Type de tarification | Forfaitaire |
| Courriel du client | contact@entreprise.re |
| Montant total TTC | 600 € |
| Taux d'acompte (privatisation) | 50 % |
| Acompte réglé | 300 € |
| Solde restant dû | 300 € |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Montant forfaitaire privatisation | 600 € | Forfait demi-journée Tikap |
| Acompte (50 %) | 300 € | 600 € × 50 % |
| Solde restant dû après acompte | 300 € | 600 € − 300 € |
| Mention sur la facture d'acompte | Acompte acquitté | Validation du paiement de l'acompte |
| Mention sur la facture de solde | Acquittée | Règlement intégral du solde |
| Persistance PDF sur disque | 0 fichier (en mémoire uniquement) pour les 2 factures | Règle d'architecture sans stockage physique |
| Identifiants de facture | 2 identifiants uniques distincts | Une facture par étape de paiement |

## Ce que ce cas ne vérifie pas

- la facturation de réservations individuelles par passager avec acompte à 30 % (couvert par `CASE-FAC-700`, `CASE-FAC-702`, `CASE-FAC-704`) ;
- la privatisation spécifique au départ de Saint-Leu sans majoration géographique (couvert par `CASE-FAC-706`) ;
- les échecs SMTP ou coupures réseau (couvert par `CASE-FAC-718`) ;
- les paiements non aboutis, refusés ou en attente, sur l'acompte comme sur le solde (couvert par `CASE-FAC-720`, `CASE-FAC-721`, `CASE-FAC-722`) ;
- l'idempotence des notifications de paiement en doublon (couvert par `CASE-FAC-723`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_701_emission_facture_acompte_puis_solde_privatisation_forfaitaire`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test configure une réservation pour une privatisation matin du Tikap à 600 €.
- [ ] Le test simule la confirmation du paiement de l'acompte de 300 € (50 %) et vérifie la génération de la facture d'acompte (mention « Acompte acquitté », total 600 €, acompte 300 €, solde dû 300 €).
- [ ] Le test vérifie l'envoi du courriel avec la facture d'acompte en pièce jointe à `contact@entreprise.re`.
- [ ] Le test simule ensuite le règlement du solde de 300 € et vérifie la génération d'une facture de solde distincte (mention « Acquittée », rappel acompte 300 €, acquittement 600 €).
- [ ] Le test s'assure qu'aucun fichier PDF physique n'est stocké sur le disque pour l'une ou l'autre facture.
- [ ] Le test vérifie l'enregistrement en base du statut « envoyée avec succès » avec horodatage pour chacune des deux factures.
- [ ] Le test vérifie que les deux factures possèdent des identifiants uniques distincts.
- [ ] Le nom du test contient `CASE_FAC_701`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
