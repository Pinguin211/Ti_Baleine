# CASE-RES-405 — Grille tarifaire Dauphins à Saint-Gilles

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-4`  
**Type :** acceptation  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège la grille tarifaire de l'activité Dauphins à Saint-Gilles
(50 € adulte / 30 € enfant), que les scénarios nominaux ne couvrent pas —
ils ne testent que l'activité Baleines. Si la règle se casse, les sorties
Dauphins sont facturées au tarif Baleines (ou l'inverse) sans qu'aucun test
ne le détecte.

## Cas

```gherkin
Étant donné un client accédant au site web
Quand il choisit le port de départ « Saint-Gilles » et l'activité « Sortie Dauphins »
Et sélectionne le créneau du mercredi 16 septembre 2026 à 14h00
Et renseigne 1 adulte et 1 enfant de 9 ans
Alors le calcul tarifaire affiche 50 € pour l'adulte et 30 € pour l'enfant
Quand il saisit ses coordonnées et valide le paiement de 80 €
Alors la réservation passe à l'état « payée »
Et la capacité restante du créneau est décrémentée de 2 places
```

## Données

| Élément | Valeur |
|---|---:|
| Port de départ | Saint-Gilles |
| Activité | Sortie Dauphins |
| Date et créneau | mercredi 16 septembre 2026 à 14h00 |
| Passagers | 1 adulte + 1 enfant de 9 ans |
| Tarif adulte Dauphins | 50 € |
| Tarif enfant Dauphins | 30 € |
| Moyen de paiement | carte bancaire |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Montant total | 80 € | 50 € + 30 € |
| Statut de la réservation | payée | confirmation du paiement CB |
| Places décomptées | 2 | 1 adulte + 1 enfant |

## Ce que ce cas ne vérifie pas

- le tarif Baleines à Saint-Gilles (→ `CASE-RES-400`) ;
- la grille Dauphins majorée à Saint-Leu (60 € / 40 €) ;
- le rejet d'un enfant de moins de 4 ans (→ `CASE-RES-410`) ;
- les formules de privatisation (→ `CASE-RES-403`, `CASE-RES-406`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_RES_405_tarif_dauphins_saint_gilles_50_adulte_30_enfant`  
**Fichier :** [tests/tests-unitaires/reservation/case-res-405.test.ts](../../tests-unitaires/reservation/case-res-405.test.ts)

## Revue du test automatisé

- [ ] Le test réserve l'activité Dauphins (et non Baleines) à Saint-Gilles.
- [ ] Le test vérifie 50 € pour l'adulte et 30 € pour l'enfant.
- [ ] Le test vérifie un montant total de 80 €.
- [ ] Le test vérifie le passage à l'état « payée » et le décompte de 2 places.
- [ ] Le test échoue si le tarif Baleines (65 € / 40 €) est appliqué à la place.
- [ ] Le nom du test contient `CASE_RES_405`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
