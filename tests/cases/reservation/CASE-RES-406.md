# CASE-RES-406 — Privatisation Grand Bleu à Saint-Gilles

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-5`, `AC-8`  
**Type :** acceptation  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège la formule de privatisation haut de gamme sur le navire Grand Bleu (capacité 24 places) au départ de Saint-Gilles. Il garantit l'application du forfait de 1 100,00 € pour la demi-journée (matin 7h–12h ou après-midi dès 14h), l'exigence de l'acompte obligatoire de **50 %** (soit 550,00 €), le calcul exact du solde restant dû (550,00 €), le passage du dossier à l'état « payée partiellement », et le blocage de la totalité de la capacité du navire (24 places bloquées). Si ce cas échoue, un montant forfaitaire erroné ou un pourcentage d'acompte individuel (30 %) risque d'être appliqué.

## Cas

```gherkin
Étant donné un client souhaitant réserver une formule exclusive
Et un créneau disponible pour une privatisation à Saint-Gilles le samedi 19 septembre 2026 l'après-midi (dès 14h00)
Quand il choisit la prestation « Privatisation », le navire « Grand Bleu », le port « Saint-Gilles » et le créneau après-midi
Alors le montant forfaitaire total affiché est de 1 100,00 €
Et le récapitulatif affiche l'acompte obligatoire de 50 % (550,00 €) et le solde restant dû (550,00 €)
Quand le client renseigne ses coordonnées complètes avec un mobile valide
Et valide le règlement par carte bancaire de l'acompte de 550,00 €
Alors la réservation est enregistrée à l'état « payée partiellement »
Et la jauge du créneau est intégralement bloquée (capacité de 24 places réservée)
```

## Données

| Élément | Valeur |
|---|---:|
| Port de départ | Saint-Gilles |
| Prestation | Privatisation demi-journée après-midi |
| Navire | Grand Bleu (24 places) |
| Date et horaire | samedi 19 septembre 2026 dès 14h00 |
| Tarif forfaitaire | 1 100,00 € |
| Coordonnées | Fontaine / Guillaume / guillaume.fontaine@test.re / +262692556677 |
| Moyen de paiement | carte bancaire (acompte 50 %) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Forfait privatisation Grand Bleu | 1 100,00 € | grille tarifaire R-05 (forfait Grand Bleu demi-journée) |
| Montant total TTC | 1 100,00 € | forfait fixe 1 100,00 € |
| Montant acompte obligatoire (50 %) | 550,00 € | 1 100,00 € × 0,50 (R-07, C-25) |
| Solde restant dû (50 %) | 550,00 € | 1 100,00 € − 550,00 € |
| Statut de la réservation | payée partiellement | acompte CB validé avec succès |
| Capacité bloquée | 24 places | AC-5, blocage intégral du navire Grand Bleu |

## Ce que ce cas ne vérifie pas

- la privatisation du Tikap à 600,00 € (couvert par `CASE-RES-403`) ;
- la facturation d'une privatisation Grand Bleu (couvert par `CASE-FAC-706`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_RES_406_reservation_privatisation_grand_bleu_saint_gilles_acompte_50_pourcent`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test sélectionne une privatisation Grand Bleu à Saint-Gilles l'après-midi.
- [ ] Le test vérifie que le montant total est de 1 100,00 €.
- [ ] Le test vérifie le calcul de l'acompte à 50 % (550,00 €) et du solde à 550,00 €.
- [ ] Le test valide le paiement CB de l'acompte de 550,00 €.
- [ ] Le test vérifie l'état « payée partiellement ».
- [ ] Le test vérifie le verrouillage de la capacité du navire (24 places).
- [ ] Le nom du test contient `CASE_RES_406`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
