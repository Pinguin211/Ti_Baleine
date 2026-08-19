# CASE-RES-401 — Réservation individuelle à Saint-Leu avec majoration géographique

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-2`, `AC-4`, `AC-8`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'application de la majoration géographique de + 10 € par
personne sur les billets individuels à Saint-Leu, ainsi que le planning
restreint de ce port (mardis et jeudis matin, départ unique 9h00, jauge de
12 places sur le Tikap). Si la règle se casse, le prestataire vend à perte la
rotation du navire ou ouvre des créneaux inexistants.

## Cas

```gherkin
Étant donné un client accédant au site web
Quand il choisit le port de départ « Saint-Leu » et l'activité « Sortie Baleines »
Alors seuls les mardis et jeudis matin sont proposés avec le départ unique de 9h00 (jauge max : 12 places sur le Tikap)
Quand il sélectionne le mardi 1er septembre 2026 à 9h00 (créneau standard, non privatisé)
Et renseigne 2 adultes (tarif majoré : 75 € × 2 = 150 €)
Et saisit ses coordonnées obligatoires avec un numéro de téléphone mobile valide
Et valide le paiement de 150 €
Alors la réservation est enregistrée à l'état « payée » et le créneau décompte 2 places
```

## Données

| Élément | Valeur |
|---|---:|
| Port de départ | Saint-Leu |
| Activité | Sortie Baleines |
| Date et créneau | mardi 1er septembre 2026 à 9h00 |
| Jauge maximale du créneau | 12 places (Tikap) |
| Passagers | 2 adultes |
| Tarif adulte Saint-Leu | 75 € (65 € + 10 € de majoration) |
| Moyen de paiement | carte bancaire |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Montant total | 150 € | 75 € × 2 |
| Statut de la réservation | payée | confirmation du paiement CB |
| Places décomptées | 2 | 2 adultes |
| Capacité restante | 10 places | 12 − 2 (créneau initialement vide) |

## Ce que ce cas ne vérifie pas

- la disponibilité de Saint-Leu en dehors des mardis et jeudis matin
  (→ `CASE-RES-411`) ;
- la privatisation du Tikap sur ce même type de créneau (→ `CASE-RES-403`,
  qui utilise un mardi distinct où le créneau est entièrement bloqué) ;
- le tarif enfant majoré à Saint-Leu (50 €) ;
- la grille Dauphins à Saint-Leu (60 € / 40 €) ;
- le rejet du paiement (→ `CASE-RES-416`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_RES_401_reservation_saint_leu_majoration_10_euros_par_personne`  
**Fichier :** [tests/tests-unitaires/reservation/case-res-401.test.ts](../../tests-unitaires/reservation/case-res-401.test.ts)

## Revue du test automatisé

- [ ] Le test vérifie que seuls les mardis et jeudis matin sont proposés à Saint-Leu.
- [ ] Le test réserve un mardi à 9h00 sur une jauge de 12 places.
- [ ] Le test vérifie le tarif majoré de 75 € par adulte (et non 65 €).
- [ ] Le test vérifie un montant total de 150 €.
- [ ] Le test vérifie le passage à l'état « payée » et le décompte de 2 places.
- [ ] Le test échoue si la majoration de + 10 € est volontairement supprimée du code.
- [ ] Le nom du test contient `CASE_RES_401`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
