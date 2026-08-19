# CASE-RES-413 — Demande de places supérieure aux places restantes

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-2`  
**Type :** acceptation  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège le respect strict de la jauge : impossible de réserver plus de
places qu'il n'en reste sur le créneau. Si la règle se casse, le prestataire
est en surbooking et doit refuser des passagers payés à l'embarquement.

## Cas

```gherkin
Étant donné un créneau « Sortie Baleines » à Saint-Gilles le mercredi 16 septembre 2026 à 10h00
Et 3 places restantes seulement sur ce créneau
Quand un client renseigne 4 adultes et tente de valider
Alors la réservation est bloquée
Et un message indique le nombre maximum de places disponibles (3)
Et aucune place n'est décomptée de la jauge
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau visé | mercredi 16 septembre 2026 à 10h00, Saint-Gilles |
| Places restantes | 3 |
| Places demandées | 4 adultes |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Validation | bloquée | 4 > 3 places restantes |
| Message affiché | maximum disponible : 3 | places restantes du créneau |
| Jauge du créneau | inchangée (3 restantes) | aucune réservation acceptée |
| Réservation enregistrée | aucune | tunnel bloqué avant paiement |

## Ce que ce cas ne vérifie pas

- la réservation exacte des places restantes (3 pour 3), qui doit réussir
  (→ `CASE-RES-414` pour la dernière place) ;
- le comportement en accès concurrent pendant le paiement
  (→ `CASE-RES-417`) ;
- un créneau déjà complet (0 place — → `CASE-RES-414`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_RES_413_demande_superieure_aux_places_restantes_blocage_et_message`  
**Fichier :** [tests/tests-unitaires/reservation/case-res-413.test.ts](../../tests-unitaires/reservation/case-res-413.test.ts)

## Revue du test automatisé

- [ ] Le test prépare un créneau avec exactement 3 places restantes.
- [ ] Le test demande 4 places et vérifie le blocage.
- [ ] Le test vérifie que le message indique le maximum disponible (3).
- [ ] Le test vérifie que la jauge reste inchangée.
- [ ] Le test échoue si le contrôle de jauge est volontairement supprimé du code.
- [ ] Le nom du test contient `CASE_RES_413`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
