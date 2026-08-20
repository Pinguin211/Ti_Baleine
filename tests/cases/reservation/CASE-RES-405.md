# CASE-RES-405 — Grille tarifaire standard Saint-Gilles sur l'activité Dauphins

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-4`, `AC-8`  
**Type :** acceptation  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège l'application de la grille tarifaire spécifique à l'activité « Sortie Dauphins » au départ de Saint-Gilles (50,00 € par adulte, 30,00 € par enfant de 4 à 11 ans inclus), distincte de la tarification « Sortie Baleines » (65,00 € / 40,00 €). Il garantit que le calcul du panier applique les tarifs unitaires exacts des Dauphins, calcule fidèlement l'acompte obligatoire de 30 % (24,00 € pour 1 adulte + 1 enfant) et le solde restant de 70 % (56,00 €), et passe la réservation à l'état « payée partiellement ». Si cette tarification est erronée, l'activité Dauphins est sur-facturée au tarif Baleines ou sous-facturée.

## Cas

```gherkin
Étant donné un client accédant au site web
Et un créneau disponible pour une « Sortie Dauphins » à Saint-Gilles le vendredi 18 septembre 2026 à 7h00
Quand le client sélectionne le port « Saint-Gilles », l'activité « Sortie Dauphins » et la date du 18 septembre 2026
Et choisit le créneau de 7h00
Et renseigne 1 adulte et 1 enfant de 7 ans
Alors le tarif affiché est de 50,00 € pour l'adulte et de 30,00 € pour l'enfant
Et le montant total calculé est de 80,00 €
Et le récapitulatif affiche l'acompte obligatoire de 30 % (24,00 €) et le solde restant dû (56,00 €)
Quand il saisit ses coordonnées et valide le paiement sécurisé par carte bancaire de 24,00 €
Alors la réservation est enregistrée à l'état « payée partiellement »
Et la capacité du créneau est décrémentée de 2 places
```

## Données

| Élément | Valeur |
|---|---:|
| Port de départ | Saint-Gilles |
| Activité | Sortie Dauphins |
| Date et horaire | vendredi 18 septembre 2026 à 7h00 |
| Jauge maximale | 36 places |
| Participants | 1 adulte + 1 enfant de 7 ans |
| Tarif adulte Dauphins Saint-Gilles | 50,00 € |
| Tarif enfant Dauphins Saint-Gilles | 30,00 € |
| Coordonnées | Robert / Sophie / sophie.robert@test.re / +262692778899 |
| Moyen de paiement | carte bancaire (acompte 30 %) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Tarif adulte Dauphins | 50,00 € | grille tarifaire standard R-04 (Dauphins Saint-Gilles) |
| Tarif enfant Dauphins | 30,00 € | grille tarifaire standard R-04 (enfant 4-11 ans) |
| Montant total TTC | 80,00 € | 50,00 € + 30,00 € |
| Montant acompte obligatoire (30 %) | 24,00 € | 80,00 € × 0,30 |
| Solde restant dû (70 %) | 56,00 € | 80,00 € − 24,00 € |
| Statut de la réservation | payée partiellement | acompte CB validé avec succès |
| Décompte de places | 2 | 1 adulte + 1 enfant |

## Ce que ce cas ne vérifie pas

- la tarification Baleines à Saint-Gilles (couvert par `CASE-RES-400`) ;
- la majoration de + 10 € / pers à Saint-Leu sur les Dauphins (couvert par `CASE-RES-401`) ;
- l'envoi de la facture d'acompte PDF Dauphins (couvert par `CASE-FAC-703`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_RES_405_grille_tarifaire_dauphins_saint_gilles_acompte_30_pourcent`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test sélectionne l'activité Dauphins à Saint-Gilles.
- [ ] Le test vérifie les tarifs unitaires (50 € adulte / 30 € enfant).
- [ ] Le test vérifie le calcul du total à 80,00 €.
- [ ] Le test vérifie l'acompte de 30 % à 24,00 € et le solde de 56,00 €.
- [ ] Le test valide le paiement CB de 24,00 € et le statut « payée partiellement ».
- [ ] Le test vérifie la décrémentation de 2 places sur le créneau.
- [ ] Le nom du test contient `CASE_RES_405`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
