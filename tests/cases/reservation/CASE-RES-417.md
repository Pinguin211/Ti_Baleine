# CASE-RES-417 — Verrouillage temporaire des places pendant le paiement et libération à expiration

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-2`, `AC-8`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège le mécanisme de prévention des conflits d'accès concurrents et de surbooking pendant la phase de paiement en ligne (REQ-108, Question ouverte n°12 §11 du CDC v5). Dès qu'un client engage la procédure de paiement de l'acompte, les places sélectionnées font l'objet d'un verrouillage temporaire (timer panier de 10 minutes) empêchant d'autres visiteurs de s'en emparer simultanément. Si le client ne confirme pas son paiement dans le temps imparti (expiration du timer de 10 minutes) ou abandonne sa session, le verrou est automatiquement levé et les places sont immédiatement restituées à la jauge publique.

## Cas

```gherkin
Étant donné un créneau « Sortie Baleines » disposant de 5 places libres
Quand un premier client sélectionne 2 places et engage la session de paiement par carte bancaire
Alors les 2 places sont temporairement verrouillées (timer de 10 minutes)
Et un second client consultant le créneau ne voit que 3 places disponibles
Quand le délai de 10 minutes s'écoule sans confirmation de paiement de la part du premier client
Alors la session de paiement du premier client est invalidée pour expiration
Et les 2 places temporairement verrouillées sont automatiquement libérées
Et le créneau affiche de nouveau 5 places disponibles à la réservation
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau testé | Sortie Baleines Saint-Gilles |
| Jauge libre initiale | 5 places |
| Places sélectionnées client 1 | 2 places |
| Durée du verrou temporaire (timer panier) | 10 minutes (choix technique REQ-108) |
| Action client 1 | Aucune validation pendant 10 min (timeout) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Places visibles pendant les 10 min | 3 places | 5 places − 2 places verrouillées |
| Durée de rétention du verrou | 10 minutes (600 secondes) | Timer de session panier |
| Statut session après 10 min | Expirée / Invalide | Clôture automatique du tunnel de paiement |
| Places visibles après expiration | 5 places | Restitution intégrale des 2 places (3 + 2 = 5) |
| Création de réservation définitive | 0 | Aucune réservation validée |

## Ce que ce cas ne vérifie pas

- la validation du paiement avant la fin des 10 minutes (couvert par `CASE-RES-400`) ;
- l'échec immédiat par rejet de carte (couvert par `CASE-RES-416`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_RES_417_verrouillage_temporaire_places_panier_10_min_et_liberation_automatique`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test initialise un créneau avec 5 places libres.
- [ ] Le test démarre un panier de 2 places et vérifie que la jauge disponible passe à 3 places.
- [ ] Le test simule l'écoulement du délai de 10 minutes sans confirmation bancaire.
- [ ] Le test vérifie que la session panier est déclarée expirée.
- [ ] Le test vérifie que la jauge du créneau redevient immédiatement égale à 5 places libres.
- [ ] Le nom du test contient `CASE_RES_417`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
