# CASE-FAC-700 — Émission des factures d'acompte et de solde après paiement d'une réservation individuelle à Saint-Leu

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-1`, `AC-2`, `AC-3`, `AC-6`, `Scénario 1`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège le flux nominal complet d'émission et d'envoi des deux factures distinctes (acompte puis solde) suite au paiement échelonné d'une réservation individuelle à Saint-Leu (150 € TTC, incluant la majoration géographique). Si la règle se casse, le client pourrait ne recevoir aucune facture à mi-parcours, recevoir une facture unique acquittée avant règlement complet, ou ne pas recevoir de facture de solde distincte lors du paiement final.

## Cas

```gherkin
Étant donné une réservation individuelle pour une sortie « Baleines » pour 2 adultes au départ de Saint-Leu le mardi 18/08/2026 à 9h00 (montant total TTC : 150 € incluant le tarif de base de 65 € / adulte et le supplément géographique de 10 € / personne)
Et l'adresse courriel client renseignée « client.exemple@test.re »
Quand le paiement en ligne de l'acompte de 30 % (45 €) est validé avec succès
Alors la facture d'acompte PDF est générée à la volée avec un identifiant unique, la mention explicite « Acompte acquitté », le montant total TTC (150 €), l'acompte réglé (45 €) et le solde restant dû (105 €)
Et un courriel transactionnel contenant la facture d'acompte PDF en pièce jointe et le récapitulatif est envoyé à « client.exemple@test.re »
Et l'état d'émission de la facture d'acompte est persisté en base de données à « envoyée avec succès »
Quand le client règle ultérieurement le solde de 105 € (en ligne via le lien SMS ou sur place en CB)
Alors la facture de solde distincte PDF est générée à la volée avec un identifiant unique distinct, la mention explicite « Acquittée », le rappel de l'acompte (45 €) et l'acquittement complet des 150 €
Et un courriel contenant la facture de solde PDF en pièce jointe est envoyé à « client.exemple@test.re »
Et l'état d'émission de la facture de solde est persisté en base de données à « envoyée avec succès »
```

## Données

| Élément | Valeur |
|---|---:|
| Prestation | Sortie Baleines |
| Port d'embarquement | Saint-Leu |
| Date et heure | 18/08/2026 9h00 |
| Passagers adultes | 2 |
| Tarif de base adulte | 65 € |
| Supplément géographique | 10 € / personne |
| Montant total TTC | 150 € |
| Taux d'acompte (standard) | 30 % |
| Acompte réglé | 45 € |
| Solde restant dû | 105 € |
| Email client | client.exemple@test.re |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Montant total TTC | 150 € | (2 × 65 €) + (2 × 10 €) |
| Acompte (30 %) | 45 € | 150 € × 30 % |
| Solde restant dû après acompte | 105 € | 150 € − 45 € |
| Mention sur la facture d'acompte | Acompte acquitté | Paiement de l'acompte validé |
| Mention sur la facture de solde | Acquittée | Règlement intégral du solde |
| Identifiants de facture | 2 identifiants distincts et non vides | Une facture par étape de paiement |

## Ce que ce cas ne vérifie pas

- la privatisation forfaitaire à taux d'acompte 50 % (couvert par `CASE-FAC-701`, `CASE-FAC-706`) ;
- le détail du format exact et de l'unicité des identifiants (couvert par `CASE-FAC-707`) ;
- l'échec ou l'absence de paiement de l'acompte ou du solde (couvert par `CASE-FAC-720`, `CASE-FAC-721`, `CASE-FAC-722`) ;
- l'idempotence en cas de notification de paiement dupliquée (couvert par `CASE-FAC-723`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_700_emission_facture_acompte_puis_solde_reservation_individuelle_saint_leu`  
**Fichier :** à renseigner après automatisation (ancien test à réécrire : `tests/tests-unitaires/facturation/CASE-FAC-700.test.ts`)

## Revue du test automatisé

- [ ] Le test configure une réservation Baleines pour 2 adultes à Saint-Leu (150 € TTC).
- [ ] Le test simule la validation du paiement de l'acompte de 45 € (30 %) et vérifie la génération de la facture d'acompte (mention « Acompte acquitté », total 150 €, acompte 45 €, solde dû 105 €).
- [ ] Le test vérifie l'envoi du courriel avec la facture d'acompte en pièce jointe.
- [ ] Le test simule ensuite le règlement du solde de 105 € et vérifie la génération d'une facture de solde distincte (mention « Acquittée », rappel acompte 45 €, acquittement 150 €).
- [ ] Le test vérifie l'envoi du courriel avec la facture de solde en pièce jointe.
- [ ] Le test vérifie que les deux factures possèdent des identifiants uniques distincts.
- [ ] Le nom du test contient `CASE_FAC_700`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** Le test automatisé existant (`CASE-FAC-700.test.ts`) implémente encore l'ancien modèle à facture unique acquittée et devra être réécrit pour couvrir le flux à 2 factures distinctes.
