# CASE-FAC-716 — Inclusion du récapitulatif de la réservation dans le corps du courriel transactionnel

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-6`, `Scénario 1`  
**Type :** acceptation  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège la lisibilité directe des informations essentielles de réservation dans le corps même du message électronique (HTML ou texte brut), permettant au client de consulter immédiatement le récapitulatif de sa commande sans devoir ouvrir la pièce jointe PDF, aussi bien pour le courriel d'acompte que pour le courriel de solde.

## Cas

```gherkin
Étant donné une réservation confirmée pour une sortie « Baleines » le 18/08/2026 à 9h00 au départ de Saint-Leu pour 2 adultes (montant total TTC de 150 €, acompte de 45 € réglé, solde restant dû de 105 €)
Quand le courriel transactionnel d'envoi de la facture d'acompte est généré
Alors le corps du courriel (texte ou HTML) contient le récapitulatif de la réservation
Et ce récapitulatif mentionne explicitement la date (18/08/2026), l'horaire (9h00), le port (Saint-Leu), le nombre de passagers (2 adultes), le montant total TTC (150 €), l'acompte réglé (45 €) et le solde restant dû (105 €)
Quand le solde est réglé et que le courriel transactionnel d'envoi de la facture de solde est généré
Alors le récapitulatif de ce second courriel mentionne le rappel de l'acompte perçu (45 €) et l'acquittement complet du montant total TTC (150 €)
```

## Données

| Élément | Valeur |
|---|---:|
| Prestation | Sortie Baleines |
| Date et heure | 18/08/2026 à 9h00 |
| Port | Saint-Leu |
| Passagers | 2 adultes |
| Montant total TTC | 150 € |
| Acompte réglé | 45 € |
| Solde restant dû | 105 € |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Récapitulatif dans le corps du courriel d'acompte | Présent et complet (dont acompte et solde dû) | Inclusion des données clés de commande |
| Récapitulatif dans le corps du courriel de solde | Présent et complet (dont rappel de l'acompte et acquittement) | Inclusion des données clés de commande |
| Concordance des montants et dates | Identiques aux PDF joints | Cohérence entre le corps de message et chaque PDF joint |

## Ce que ce cas ne vérifie pas

- la validité binaire du PDF joint (couvert par `CASE-FAC-715`) ;
- l'idempotence des envois (couvert par `CASE-FAC-723`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_716_inclusion_recapitulatif_reservation_corps_courriel`  
**Fichier :** `tests/tests-unitaires/facturation/CASE-FAC-716.test.ts`

## Revue du test automatisé

- [ ] Le test intercepte le courriel transactionnel émis après paiement de l'acompte, puis après règlement du solde.
- [ ] Le test extrait le corps (body) textuel ou HTML de chaque e-mail.
- [ ] Le test vérifie la présence des mentions : prestation, date, heure, lieu, montant total (150 €), acompte (45 €) et solde dû (105 €) dans le courriel d'acompte.
- [ ] Le test vérifie la présence du rappel de l'acompte (45 €) et de l'acquittement (150 €) dans le courriel de solde.
- [ ] Le nom du test contient `CASE_FAC_716`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
