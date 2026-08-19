# CASE-RES-400 — Réservation individuelle standard au départ de Saint-Gilles

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-2`, `AC-4`, `AC-8`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège le parcours de vente le plus fréquent du site : une sortie
Baleines individuelle au départ de Saint-Gilles, payée intégralement par carte
bancaire. Il couvre d'un bout à l'autre les trois règles qui font la recette du
prestataire — le planning et la jauge du port, la tarification différenciée
adulte / enfant, et la décrémentation de la jauge à la confirmation du
paiement. Si ce parcours se casse, plus aucune vente en ligne n'aboutit.

## Cas

```gherkin
Étant donné un client accédant au site web
Et un créneau « Sortie Baleines » à Saint-Gilles le mercredi 16 septembre 2026 à 10h00 encore vide
Quand il choisit le port de départ « Saint-Gilles », l'activité « Sortie Baleines » et la date du mercredi 16 septembre 2026
Alors il voit les créneaux de 7h00, 10h00 et 14h00 proposés avec 36 places libres chacun
Quand il sélectionne le créneau de 10h00
Et renseigne 1 adulte et 1 enfant de 8 ans
Alors le tarif affiché est de 65 € pour l'adulte et de 40 € pour l'enfant
Et le montant total à payer est de 105 €
Quand il saisit ses coordonnées (« Dupont », « Jean », « jean.dupont@test.re », « +262692123456 »)
Et valide le paiement sécurisé par carte bancaire de 105 €
Alors la réservation est enregistrée à l'état « payée »
Et le créneau de 10h00 affiche 34 places libres
```

## Données

| Élément | Valeur |
|---|---:|
| Port de départ | Saint-Gilles |
| Activité | Sortie Baleines |
| Date et créneau | mercredi 16 septembre 2026 à 10h00 |
| Créneaux proposés à Saint-Gilles | 7h00, 10h00, 14h00 |
| Jauge maximale du créneau | 36 places |
| Places libres avant réservation | 36 |
| Passagers | 1 adulte + 1 enfant de 8 ans |
| Tarif adulte Baleines Saint-Gilles | 65 € |
| Tarif enfant Baleines Saint-Gilles | 40 € |
| Coordonnées | Dupont / Jean / jean.dupont@test.re / +262692123456 |
| Moyen de paiement | carte bancaire, 100 % du montant |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Tarif appliqué à l'adulte | 65 € | grille Baleines Saint-Gilles, tranche adulte (dès 12 ans) |
| Tarif appliqué à l'enfant | 40 € | grille Baleines Saint-Gilles, tranche enfant (4 à 11 ans inclus), 8 ans |
| Montant total | 105 € | 65 € + 40 € |
| Statut de la réservation | payée | paiement CB intégral confirmé |
| Places décomptées | 2 | 1 adulte + 1 enfant |
| Places libres après réservation | 34 | 36 − 2 |

## Ce que ce cas ne vérifie pas

- la majoration géographique appliquée à Saint-Leu (→ `CASE-RES-401`) ;
- la mention d'avertissement d'un créneau sous alerte (→ `CASE-RES-402`) ;
- les formules de privatisation (→ `CASE-RES-403`, `CASE-RES-406`) ;
- la bascule bilingue en cours de tunnel (→ `CASE-RES-404`) ;
- la grille tarifaire Dauphins (→ `CASE-RES-405`) ;
- le contrôle des champs obligatoires du formulaire de contact
  (→ `CASE-RES-407`, `CASE-RES-415`) ;
- la clôture automatique 2 heures avant le départ (→ `CASE-RES-408`) ;
- le rejet d'un enfant de moins de 4 ans (→ `CASE-RES-410`) ;
- la jauge réduite à 24 places les mardis et jeudis matin (→ `CASE-RES-412`) ;
- le rejet ou l'abandon du paiement (→ `CASE-RES-416`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_RES_400_reservation_individuelle_saint_gilles_payee_jauge_moins_2`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test part d'un créneau de 36 places libres à Saint-Gilles, le 16 septembre 2026 à 10h00.
- [ ] Le test vérifie que les créneaux de 7h00, 10h00 et 14h00 sont proposés avec 36 places.
- [ ] Le test reprend 1 adulte à 65 € et 1 enfant de 8 ans à 40 €.
- [ ] Le test vérifie un montant total de 105 €.
- [ ] Le test vérifie le passage à l'état « payée » après le paiement CB.
- [ ] Le test vérifie qu'il reste 34 places libres sur le créneau.
- [ ] Le test échoue si la tarification différenciée adulte / enfant est volontairement supprimée du code.
- [ ] Le nom du test contient `CASE_RES_400`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
