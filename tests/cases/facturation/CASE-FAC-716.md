# CASE-FAC-716 — Inclusion du récapitulatif de la réservation dans le corps du courriel transactionnel

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-5`, `Scénario 1`  
**Type :** acceptation  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège la lisibilité directe des informations essentielles de réservation dans le corps même du message électronique (HTML ou texte brut), permettant au client de consulter immédiatement le récapitulatif de sa commande sans devoir ouvrir la pièce jointe PDF.

## Cas

```gherkin
Étant donné une réservation confirmée pour une sortie « Baleines » le 18/08/2026 à 9h00 au départ de Saint-Leu pour 2 adultes (150 €)
Quand le courriel transactionnel d'envoi de facture est généré
Alors le corps du courriel (texte ou HTML) contient le récapitulatif de la réservation
Et ce récapitulatif mentionne explicitement la date (18/08/2026), l'horaire (9h00), le port (Saint-Leu), le nombre de passagers (2 adultes) et le montant total réglé (150 €)
```

## Données

| Élément | Valeur |
|---|---:|
| Prestation | Sortie Baleines |
| Date et heure | 18/08/2026 à 9h00 |
| Port | Saint-Leu |
| Passagers | 2 adultes |
| Montant réglé | 150 € |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Récapitulatif dans le corps du courriel | Présent et complet | Inclusion des données clés de commande |
| Concordance des montants et dates | Identiques au PDF | Cohérence entre le corps de message et le PDF joint |

## Ce que ce cas ne vérifie pas

- la validité binaire du PDF joint (couvert par `CASE-FAC-715`) ;
- l'idempotence des envois (couvert par `CASE-FAC-723`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_716_inclusion_recapitulatif_reservation_corps_courriel`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test intercepte le courriel transactionnel émis après paiement.
- [ ] Le test extrait le corps (body) textuel ou HTML de l'e-mail.
- [ ] Le test vérifie la présence des mentions : prestation, date, heure, lieu et montant (150 €).
- [ ] Le nom du test contient `CASE_FAC_716`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
