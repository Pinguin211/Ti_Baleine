# CASE-RES-414 — Réservation de la dernière place disponible d'un créneau

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-2`, `AC-8`  
**Type :** acceptation  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège le passage d'un créneau à l'état « complet » : la dernière
place doit rester vendable, et une fois vendue le créneau doit disparaître de
l'offre. Si la règle se casse, soit la dernière place est invendable (manque
à gagner), soit un créneau complet reste en vente (surbooking).

## Cas

```gherkin
Étant donné un créneau « Sortie Baleines » à Saint-Gilles le mercredi 16 septembre 2026 à 10h00
Et 1 seule place restante sur ce créneau
Quand un client réserve 1 adulte (65 €) et valide le paiement par carte bancaire
Alors la réservation est acceptée à l'état « payée »
Et le créneau passe à l'état « complet »
Et le créneau n'est plus proposé aux clients suivants
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau visé | mercredi 16 septembre 2026 à 10h00, Saint-Gilles |
| Places restantes avant réservation | 1 |
| Passagers | 1 adulte |
| Tarif adulte Saint-Gilles (Baleines) | 65 € |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Réservation | acceptée, état « payée » | 1 place demandée ≤ 1 restante |
| Montant total | 65 € | 1 adulte |
| Places restantes | 0 | 1 − 1 |
| État du créneau | complet | plus aucune place |
| Créneau visible pour un autre client | non proposé | retiré de l'offre |

## Ce que ce cas ne vérifie pas

- la demande de plus de places que disponibles (→ `CASE-RES-413`) ;
- deux clients en concurrence sur la même dernière place
  (→ `CASE-RES-417`) ;
- le blocage total par privatisation (→ `CASE-RES-403`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_RES_414_derniere_place_acceptee_creneau_complet_retire_de_l_offre`  
**Fichier :** [tests/tests-unitaires/case-res-414.test.ts](../../tests-unitaires/case-res-414.test.ts)

## Revue du test automatisé

- [ ] Le test prépare un créneau avec exactement 1 place restante.
- [ ] Le test vérifie l'acceptation de la réservation et l'état « payée ».
- [ ] Le test vérifie le passage du créneau à l'état « complet ».
- [ ] Le test vérifie que le créneau n'est plus proposé lors d'une consultation suivante.
- [ ] Le test échoue si un créneau complet reste réservable.
- [ ] Le nom du test contient `CASE_RES_414`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
