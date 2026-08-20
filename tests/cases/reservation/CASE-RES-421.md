# CASE-RES-421 — Non-utilisation du lien SMS de solde et maintien pour règlement sur place

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-8`, `AC-10`  
**Type :** acceptation  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège la liberté de choix accordée au client quant au mode de règlement de son solde (règle R-07, CDC §1 & §6). Le paiement du solde en ligne via le lien SMS reçu à J-1 est une facilité optionnelle et non une obligation bloquante. Si un client ignore le SMS, ne dispose pas de connexion internet ou préfère régler son solde le jour du départ, le système doit maintenir sa réservation active à l'état « payée partiellement », sans annulation automatique, sans libération de ses places et sans pénalité. Le client peut ainsi finaliser son paiement en carte bancaire directement auprès de l'administrateur à l'embarcadère.

## Cas

```gherkin
Étant donné une réservation enregistrée avec acompte de 30 % versé et places bloquées sur le créneau du lendemain
Et le SMS avec lien sécurisé de solde transmis à J-1 au client
Quand le client n'ouvre pas le lien SMS ou n'effectue aucun paiement en ligne avant le départ
Alors la réservation reste active et maintenue à l'état « payée partiellement »
Et les places réservées demeurent intégralement garanties sur le créneau
Et aucune annulation automatique ni pénalité n'est appliquée au dossier
Et le solde restant dû reste exigible pour un encaissement par carte bancaire sur place par l'administrateur le jour J
```

## Données

| Élément | Valeur |
|---|---:|
| Réservation | 2 adultes Baleines Saint-Gilles (130,00 € total) |
| Acompte versé | 39,00 € (30 %) |
| Solde restant dû | 91,00 € (70 %) |
| Statut initial | payée partiellement |
| Comportement client vis-à-vis du SMS | Lien ignoré / Pas de règlement en ligne |
| Statut le jour J à l'embarquement | payée partiellement (réservation active) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Statut de réservation le jour J | payée partiellement | Conservation du statut sans altération |
| Maintien des places sur le créneau | 2 places réservées | Aucune libération indue de jauge |
| Statut d'annulation | Non annulée | Absence de sanction ou délai couperet |
| Solde exigible à l'embarcadère | 91,00 € | Montant à encaisser sur place par CB (REQ-022) |

## Ce que ce cas ne vérifie pas

- l'encaissement effectif du solde sur place par le back-office admin (couvert par `CASE-ADMIN-048`) ;
- le paiement réussi en ligne via le lien SMS (couvert par `CASE-RES-418`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_RES_421_non_utilisation_lien_solde_maintien_reservation_payee_partiellement`  
**Fichier :** `tests/tests-unitaires/reservation/case-res-421.test.ts`

## Revue du test automatisé

- [ ] Le test initialise une réservation avec acompte et simule l'envoi du SMS à J-1.
- [ ] Le test simule l'absence de paiement en ligne jusqu'au jour de la sortie.
- [ ] Le test vérifie que la réservation conserve l'état « payée partiellement ».
- [ ] Le test vérifie que les places du client restent bien décomptées et attribuées sur le créneau.
- [ ] Le test s'assure qu'aucune annulation ou libération automatique n'est intervenue.
- [ ] Le nom du test contient `CASE_RES_421`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
