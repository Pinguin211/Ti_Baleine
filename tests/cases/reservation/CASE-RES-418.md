# CASE-RES-418 — Réception du SMS à J-1 et paiement du solde en ligne dans le délai de 1 heure

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-9`, `AC-10`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège le parcours nominal de paiement du solde en ligne à J-1 par lien sécurisé SMS (REQ-021, REQ-106, REQ-107, R-07). Il garantit que le système planifie et déclenche automatiquement l'envoi du SMS la veille de la sortie pour toute réservation avec acompte versé, que le lien généré contient un token sécurisé avec une durée de validité technique d'une heure, que la page de solde bilingue FR/EN présente le détail exact de la prestation et le solde restant dû (70 % ou 50 %), et que la validation du paiement CB bascule instantanément l'état de la réservation de « payée partiellement » à « payée complètement ». Si ce processus se rompt, les clients ne peuvent pas solder leur commande la veille.

## Cas

```gherkin
Étant donné une réservation individuelle enregistrée à l'état « payée partiellement » (acompte de 31,50 € versé sur un total de 105,00 €) pour une sortie le lendemain à Saint-Gilles
Quand la tâche planifiée automatique de J-1 s'exécute
Alors un SMS contenant une URL sécurisée avec un token temporaire est expédié au numéro mobile du client (+262692123456)
Quand le client clique sur le lien reçu 20 minutes après son émission (délai < 1 heure)
Alors il accède à la page de paiement sécurisée affichant le récapitulatif de la réservation et le solde restant dû de 73,50 €
Quand le client valide le paiement par carte bancaire du solde de 73,50 €
Alors la transaction bancaire est confirmée avec succès
Et le statut de la réservation bascule à « payée complètement »
```

## Données

| Élément | Valeur |
|---|---:|
| Réservation initiale | Baleines Saint-Gilles (1 adulte + 1 enfant) |
| Montant total de la prestation | 105,00 € |
| Acompte déjà versé (30 %) | 31,50 € |
| Solde restant dû (70 %) | 73,50 € |
| Statut initial de la réservation | payée partiellement |
| Numéro mobile destinataire | +262692123456 |
| Délai de clic après génération SMS | 20 minutes (token valide < 60 min) |
| Moyen de règlement du solde | carte bancaire en ligne |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Déclenchement envoi SMS | Effectué à J-1 | REQ-021, AC-9 |
| Validité technique du token | Valide (20 min < 60 min) | REQ-107, AC-10 |
| Montant du solde affiché | 73,50 € | 105,00 € − 31,50 € = 73,50 € |
| Règlement CB du solde | Validé | Transaction bancaire solde 73,50 € |
| Nouveau statut de réservation | payée complètement | Passage à solde acquitté (R-07, AC-10) |
| Jauge du créneau | Inchangée | Les places étaient déjà décomptées lors de l'acompte |

## Ce que ce cas ne vérifie pas

- l'accès à la page de solde après expiration du token (> 1 heure) (couvert par `CASE-RES-420`) ;
- l'absence de paiement en ligne et le règlement du solde sur place (couvert par `CASE-RES-421`) ;
- l'émission et l'envoi de la facture de solde PDF (couvert par `CASE-FAC-701`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_RES_418_envoi_sms_j_moins_1_paiement_solde_en_ligne_statut_payee_completement`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test initialise une réservation à l'état « payée partiellement » à J-1.
- [ ] Le test déclenche la tâche planifiée d'envoi de SMS et vérifie la génération du lien sécurisé.
- [ ] Le test simule l'ouverture du lien dans les 60 minutes de validité.
- [ ] Le test vérifie que la page de solde affiche le montant exact de 73,50 €.
- [ ] Le test valide le paiement du solde par carte bancaire.
- [ ] Le test vérifie la mise à jour du statut à « payée complètement ».
- [ ] Le nom du test contient `CASE_RES_418`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
