# CASE-RES-401 — Réservation individuelle au départ de Saint-Leu avec majoration géographique

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-2`, `AC-4`, `AC-8`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'application de la majoration géographique (+ 10 € / personne) sur les billets individuels au départ du port secondaire de Saint-Leu (opéré exclusivement par le navire Tikap, jauge max 12 places, le mardi et jeudi matin à 9h00). Il garantit que le calcul du panier intègre correctement le surcoût de port, calcule fidèlement l'acompte obligatoire de 30 % et le solde restant dû (70 %), enregistre la réservation à l'état « payée partiellement » et décrémente la jauge contingentée du Tikap de 12 à 10 places. Si cette règle est défaillante, l'entreprise subit un manque à gagner financier sur le port secondaire ou des erreurs de contingentement maritime.

## Cas

```gherkin
Étant donné un client accédant au site web
Et un créneau « Sortie Baleines » au port de « Saint-Leu » le mardi 18 août 2026 à 9h00 avec 12 places libres
Quand il choisit le port de départ « Saint-Leu » et l'activité « Sortie Baleines »
Alors seuls les créneaux du mardi et jeudi à 9h00 sont proposés
Quand il sélectionne le créneau du mardi 18 août 2026 à 9h00
Et renseigne 2 adultes
Alors le tarif unitaire affiché pour chaque adulte est de 75,00 € (65,00 € base + 10,00 € majoration Saint-Leu)
Et le montant total calculé est de 150,00 €
Et le récapitulatif affiche l'acompte obligatoire de 30 % (45,00 €) et le solde restant dû (105,00 €)
Quand il renseigne ses coordonnées (« Hoarau », « Marie », « marie.hoarau@test.re », « +262692987654 »)
Et valide le règlement par carte bancaire de l'acompte de 45,00 €
Alors la réservation est enregistrée à l'état « payée partiellement »
Et la capacité restante sur le créneau de Saint-Leu passe à 10 places libres
```

## Données

| Élément | Valeur |
|---|---:|
| Port de départ | Saint-Leu |
| Activité | Sortie Baleines |
| Date et créneau | mardi 18 août 2026 à 9h00 |
| Navire mobilisé | Tikap |
| Jauge maximale du créneau | 12 places |
| Places libres avant réservation | 12 |
| Passagers | 2 adultes |
| Tarif de base adulte Baleines | 65,00 € |
| Majoration géographique Saint-Leu | + 10,00 € / personne |
| Tarif unitaire adulte appliqué | 75,00 € |
| Coordonnées | Hoarau / Marie / marie.hoarau@test.re / +262692987654 |
| Moyen de paiement | carte bancaire (acompte obligatoire 30 %) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Tarif unitaire adulte Saint-Leu | 75,00 € | 65,00 € (base Baleines) + 10,00 € (majoration géographique R-04) |
| Montant total TTC | 150,00 € | 2 adultes × 75,00 € |
| Montant acompte obligatoire (30 %) | 45,00 € | 150,00 € × 0,30 |
| Solde restant dû (70 %) | 105,00 € | 150,00 € − 45,00 € |
| Statut de la réservation | payée partiellement | acompte CB encaissé avec succès |
| Places décomptées | 2 | 2 adultes |
| Places libres après réservation | 10 | 12 − 2 |

## Ce que ce cas ne vérifie pas

- la tarification standard sans majoration à Saint-Gilles (couvert par `CASE-RES-400`) ;
- la privatisation du Tikap à Saint-Leu sans majoration géographique (couvert par `CASE-RES-403`) ;
- la tarification Dauphins avec majoration géographique (couvert par `CASE-RES-405`) ;
- la consultation de Saint-Leu en dehors des mardis et jeudis (couvert par `CASE-RES-411`) ;
- l'envoi du lien de solde à J-1 (couvert par `CASE-RES-418`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_RES_401_reservation_individuelle_saint_leu_majoration_acompte_payee_partiellement`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test initialise un créneau de 12 places à Saint-Leu le mardi 18 août 2026 à 9h00.
- [ ] Le test vérifie que seuls les mardis et jeudis à 9h00 sont disponibles pour Saint-Leu.
- [ ] Le test applique la majoration de + 10 € / personne (75 € au lieu de 65 € par adulte).
- [ ] Le test vérifie le total de 150,00 €, l'acompte de 45,00 € et le solde de 105,00 €.
- [ ] Le test vérifie l'enregistrement à l'état « payée partiellement ».
- [ ] Le test vérifie que la jauge restante du créneau est de 10 places.
- [ ] Le nom du test contient `CASE_RES_401`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
