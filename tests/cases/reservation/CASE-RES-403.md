# CASE-RES-403 — Réservation d'une privatisation demi-journée Tikap à Saint-Leu

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-5`, `AC-8`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège le parcours de réservation d'une privatisation forfaitaire de navire sur le Tikap au départ de Saint-Leu. Il garantit l'application du forfait fixe de 600,00 € sans majoration géographique (la majoration de + 10 € ne s'appliquant qu'aux billets individuels, selon R-05), l'exigence d'un acompte obligatoire de **50 %** (soit 300,00 € au lieu des 30 % des formules individuelles), l'enregistrement de la réservation à l'état « payée partiellement », et le blocage immédiat et intégral de la jauge du créneau (12 places bloquées). Si ce cas échoue, un montant d'acompte erroné (ex: 30 %) est facturé ou la jauge reste partiellement ouverte à d'autres clients.

## Cas

```gherkin
Étant donné un client accédant au site web
Et un créneau disponible pour une privatisation à « Saint-Leu » le mardi 25 août 2026 le matin (dès 9h00)
Quand il sélectionne la prestation « Privatisation », le navire « Tikap », la date du mardi 25 août 2026 et le créneau du matin
Alors le montant forfaitaire affiché est de 600,00 € sans majoration géographique
Et le récapitulatif affiche l'acompte obligatoire de 50 % (300,00 €) et le solde restant dû (300,00 €)
Quand il renseigne ses coordonnées obligatoires avec un mobile valide
Et valide le règlement par carte bancaire de l'acompte de 300,00 €
Alors la réservation est enregistrée à l'état « payée partiellement »
Et la jauge du créneau est intégralement bloquée (0 place restante, créneau privatisé)
```

## Données

| Élément | Valeur |
|---|---:|
| Port de départ | Saint-Leu |
| Prestation | Privatisation demi-journée |
| Navire | Tikap (12 places) |
| Date et horaire | mardi 25 août 2026 (matin dès 9h00) |
| Tarif forfaitaire | 600,00 € |
| Majoration géographique | 0,00 € (non applicable aux forfaits privatisation) |
| Coordonnées | Morel / Thierry / thierry.morel@test.re / +262693445566 |
| Moyen de paiement | carte bancaire (acompte 50 %) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Forfait privatisation Tikap | 600,00 € | grille tarifaire R-05 (forfait demi-journée) |
| Majoration Saint-Leu | 0,00 € | R-05 (forfait fixe exempt de majoration individuelle) |
| Montant total TTC | 600,00 € | forfait 600,00 € |
| Montant acompte obligatoire (50 %) | 300,00 € | 600,00 € × 0,50 (R-07, C-25) |
| Solde restant dû (50 %) | 300,00 € | 600,00 € − 300,00 € |
| Statut de la réservation | payée partiellement | acompte CB validé avec succès |
| Capacité restante du créneau | 0 place (bloqué) | AC-5, privatisation complète du navire |

## Ce que ce cas ne vérifie pas

- la privatisation du Grand Bleu à Saint-Gilles à 1 100,00 € (couvert par `CASE-RES-406`) ;
- la réservation individuelle à Saint-Leu (couvert par `CASE-RES-401`) ;
- l'indisponibilité de la privatisation Tikap le matin à Saint-Gilles les mar/jeu (couvert par `CASE-RES-412`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_RES_403_reservation_privatisation_tikap_saint_leu_acompte_50_pourcent_jauge_bloquee`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test sélectionne une privatisation Tikap à Saint-Leu le mardi matin dès 9h00.
- [ ] Le test vérifie que le forfait de 600,00 € s'applique sans majoration géographique.
- [ ] Le test vérifie le calcul de l'acompte à 50 % (300,00 €) et du solde à 300,00 €.
- [ ] Le test valide le paiement CB de l'acompte de 300,00 €.
- [ ] Le test vérifie l'état « payée partiellement ».
- [ ] Le test vérifie le verrouillage total de la jauge (0 place libre restante).
- [ ] Le nom du test contient `CASE_RES_403`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
