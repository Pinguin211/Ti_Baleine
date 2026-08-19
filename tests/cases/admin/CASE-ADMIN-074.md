# CASE-ADMIN-074 — Encaissement du solde par carte bancaire sur place et bascule vers « Payée complètement »

**Spécification :** `SPEC-ADMIN-08`  
**Critère d'acceptation :** `Scénario 1`, `AC-1`, `AC-2`, `REQ-022`, `R-07`, `R-30`  
**Type :** acceptation  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège le pointage et l'encaissement du solde restant par carte bancaire sur place à l'embarcadère le jour du départ. Si la règle se casse, le solde encaissé n'est pas reflété dans le statut financier de la réservation, le client repart sans facture de solde, ou le montant dû restant affiché reste erroné.

## Cas

```gherkin
Étant donné une réservation pour 2 adultes à Saint-Leu (total : 150,00 €) affichée à l'état « Payée partiellement » avec un acompte réglé de 45,00 € et un solde dû de 105,00 €
Et le client se présentant à l'embarcadère le matin du départ
Quand l'administrateur valide le paiement du solde de 105,00 € par carte bancaire sur place via le bouton « Encaisser le solde (CB sur place) »
Alors la réservation passe à l'état « Payée complètement »
Et le solde restant dû affiché est mis à 0,00 €
Et la facture de solde distincte PDF est générée à la volée et envoyée par courriel à l'adresse du client
```

## Données

| Élément | Valeur |
|---|---:|
| Montant total réservation | 150,00 € |
| Acompte déjà réglé | 45,00 € |
| Solde dû avant encaissement | 105,00 € |
| Moyen de règlement | Carte bancaire sur place |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Statut financier | Payée complètement | Bascule synchrone après validation CB (R-07, R-30) |
| Solde restant dû affiché | 0,00 € | 105,00 € − 105,00 € encaissés |
| Facture de solde | Générée à la volée et envoyée par e-mail au client | AC-2, REQ-008, SPEC-FAC-02 |

## Ce que ce cas ne vérifie pas

- le blocage de l'encaissement sur une réservation déjà « Payée complètement » (couvert par `CASE-ADMIN-075`) ;
- l'absence d'option d'encaissement en espèces ou en chèques vacances (couvert par `CASE-ADMIN-076`) ;
- le contenu détaillé de la facture de solde PDF (couvert par `SPEC-FAC-02`) ;
- l'affichage du badge de statut financier sur le planning (couvert par `CASE-ADMIN-077`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_074_encaissement_solde_cb_sur_place_bascule_payee_completement`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test configure une réservation « Payée partiellement » avec un solde dû non nul.
- [ ] Le test déclenche l'action « Encaisser le solde (CB sur place) ».
- [ ] Le test vérifie la bascule du statut à « Payée complètement ».
- [ ] Le test vérifie que le solde restant dû affiché est ramené à 0,00 €.
- [ ] Le test vérifie la génération et l'envoi par e-mail de la facture de solde PDF.
- [ ] Le nom du test contient `CASE_ADMIN_074`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
