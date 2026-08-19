# CASE-RES-400 — Réservation individuelle standard au départ de Saint-Gilles

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-2`, `AC-4`, `AC-8`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège le parcours de réservation le plus fréquent : une sortie
individuelle standard à Saint-Gilles, avec tarification adulte/enfant et
paiement intégral par carte bancaire. Si ce parcours se casse, plus aucune
vente en ligne n'aboutit sur le site principal.

## Cas

```gherkin
Étant donné un client accédant au site web
Quand il choisit le port de départ « Saint-Gilles », l'activité « Sortie Baleines » et la date du mercredi 16 septembre 2026
Alors il voit les créneaux disponibles à 7h00, 10h00 et 14h00 avec leurs places libres (jauge max : 36 places)
Quand il sélectionne le créneau de 10h00
Et renseigne 1 adulte (65 €) et 1 enfant de 8 ans (40 €)
Et saisit ses coordonnées (« Dupont », « Jean », « jean.dupont@test.re », « +262692123456 »)
Et valide le paiement sécurisé par carte bancaire de 105 €
Alors le paiement est confirmé, la réservation passe à l'état « payée »
Et la capacité restante du créneau est décrémentée de 2 places
```

## Données

| Élément | Valeur |
|---|---:|
| Port de départ | Saint-Gilles |
| Activité | Sortie Baleines |
| Date et créneau | mercredi 16 septembre 2026 à 10h00 |
| Jauge maximale du créneau | 36 places |
| Passagers | 1 adulte + 1 enfant de 8 ans |
| Tarif adulte | 65 € |
| Tarif enfant | 40 € |
| Coordonnées | Dupont / Jean / jean.dupont@test.re / +262692123456 |
| Moyen de paiement | carte bancaire |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Montant total | 105 € | 65 € + 40 € |
| Statut de la réservation | payée | confirmation du paiement CB |
| Places décomptées | 2 | 1 adulte + 1 enfant |
| Capacité restante | 34 places | 36 − 2 (créneau initialement vide) |

## Ce que ce cas ne vérifie pas

- la majoration géographique de Saint-Leu (→ `CASE-RES-401`) ;
- la grille tarifaire Dauphins (→ `CASE-RES-405`) ;
- les formules de privatisation (→ `CASE-RES-403`, `CASE-RES-406`) ;
- le rejet d'un enfant de moins de 4 ans (→ `CASE-RES-410`) ;
- le rejet ou l'abandon du paiement (→ `CASE-RES-416`) ;
- la bascule bilingue en cours de tunnel (→ `CASE-RES-404`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_RES_400_reservation_individuelle_saint_gilles_payee_jauge_moins_2`  
**Fichier :** [tests/tests-unitaires/case-res-400.test.ts](../../tests-unitaires/case-res-400.test.ts)

## Revue du test automatisé

- [ ] Le test réserve sur Saint-Gilles, activité Baleines, créneau 10h00.
- [ ] Le test reprend 1 adulte à 65 € et 1 enfant de 8 ans à 40 €.
- [ ] Le test vérifie un montant total de 105 €.
- [ ] Le test vérifie le passage à l'état « payée » après paiement CB.
- [ ] Le test vérifie la décrémentation de la jauge de 2 places (36 → 34).
- [ ] Le test échoue si le calcul tarifaire adulte/enfant est volontairement faussé.
- [ ] Le nom du test contient `CASE_RES_400`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
