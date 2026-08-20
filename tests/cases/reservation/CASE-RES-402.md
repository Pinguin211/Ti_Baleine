# CASE-RES-402 — Réservation sur un créneau sous alerte de pré-annulation météo

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-7`, `AC-8`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'obligation d'information et de transparence commerciale lorsqu'un créneau ouvert à la vente se trouve sous pré-alerte météo émise par l'administrateur la veille à 18h00. Il garantit que tout visiteur souhaitant réserver les places restantes voit une mention d'avertissement explicite avant la commande, que le calcul de réservation et de l'acompte (30 %) s'effectue normalement, que le dossier passe à l'état « payée partiellement », et que le créneau conserve sa mention d'avertissement visible tant qu'il reste sous pré-alerte. Si cette mention est absente, les clients réservent sans être informés du risque d'annulation le lendemain matin.

## Cas

```gherkin
Étant donné un créneau « Sortie Baleines » à Saint-Gilles le lendemain à 10h00 disposant de 4 places libres
Et une alerte de pré-annulation météo émise par l'administrateur la veille à 18h00 sur ce créneau
Quand un client consulte le planning sur le parcours public
Alors le créneau de 10h00 est affiché avec une mention textuelle d'avertissement (« Créneau sous réserve météo — Remboursement à 100 % garanti en cas d'annulation »)
Quand le client sélectionne ce créneau pour 2 adultes
Alors le récapitulatif affiche un montant total de 130,00 €, un acompte obligatoire de 30 % (39,00 €) et un solde restant dû de 91,00 €
Quand le client renseigne ses coordonnées et valide le paiement de l'acompte de 39,00 € par carte bancaire
Alors la réservation est enregistrée à l'état « payée partiellement »
Et la jauge du créneau affiche 2 places libres restantes
Et le créneau conserve sa mention d'avertissement affichée sur le site public
```

## Données

| Élément | Valeur |
|---|---:|
| Port de départ | Saint-Gilles |
| Activité | Sortie Baleines |
| Date et horaire | lendemain à 10h00 |
| Statut opérationnel du créneau | sous alerte de pré-annulation météo (J-1 18h00) |
| Places libres avant réservation | 4 places |
| Participants | 2 adultes |
| Tarif unitaire adulte | 65,00 € |
| Coordonnées | Payet / Luc / luc.payet@test.re / +262692112233 |
| Moyen de paiement | carte bancaire (acompte 30 %) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Présence mention d'avertissement | Affichée | REQ-019, R-25, AC-7 |
| Montant total TTC | 130,00 € | 2 adultes × 65,00 € |
| Montant acompte obligatoire (30 %) | 39,00 € | 130,00 € × 0,30 |
| Solde restant dû (70 %) | 91,00 € | 130,00 € − 39,00 € |
| Statut de la réservation | payée partiellement | acompte CB validé avec succès |
| Places restantes sur le créneau | 2 | 4 − 2 |
| Maintien de l'avertissement post-achat | Présent | Le créneau reste sous alerte météo tant qu'il n'est pas clôturé |

## Ce que ce cas ne vérifie pas

- l'émission initiale de l'alerte par l'administrateur (couvert par `CASE-ADMIN-051` à `055`) ;
- l'annulation effective ou par anticipation post-alerte et le remboursement à 100 % (couvert par `CASE-ADMIN-066` à `070`) ;
- la réservation sans alerte météo (couvert par `CASE-RES-400`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_RES_402_reservation_creneau_sous_alerte_preannulation_meteo_mention_avertissement`  
**Fichier :** `tests/tests-unitaires/reservation/case-res-402.test.ts`

## Revue du test automatisé

- [ ] Le test configure un créneau avec 4 places libres et le marque sous pré-alerte météo.
- [ ] Le test vérifie la présence de la mention textuelle d'avertissement avant réservation.
- [ ] Le test sélectionne 2 adultes et valide le total de 130,00 €, acompte 39,00 € et solde 91,00 €.
- [ ] Le test simule le paiement de l'acompte de 39,00 € par carte bancaire.
- [ ] Le test vérifie le passage à l'état « payée partiellement ».
- [ ] Le test vérifie qu'il reste 2 places libres et que la mention d'avertissement demeure visible.
- [ ] Le nom du test contient `CASE_RES_402`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
