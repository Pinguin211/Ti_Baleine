# CASE-RES-410 — Saisie d'un participant de moins de 4 ans

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-4`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'interdiction d'accès à bord des enfants de moins de 4 ans
(R-06), une règle de sécurité maritime. Si la règle se casse, un enfant
inadmissible embarque, ce qui engage la responsabilité du prestataire.

## Cas

```gherkin
Étant donné un client ayant sélectionné un créneau « Sortie Baleines » à Saint-Gilles
Quand il renseigne 1 adulte et 1 enfant de 3 ans
Alors la saisie est rejetée immédiatement
Et un message d'inadmissibilité à bord pour raisons de sécurité est affiché
Et la validation de l'étape passagers est bloquée
Et aucun montant n'est calculé pour l'enfant de 3 ans
```

## Données

| Élément | Valeur |
|---|---:|
| Passager 1 | adulte |
| Passager 2 | enfant de 3 ans |
| Âge minimal admis à bord | 4 ans |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Saisie de l'enfant de 3 ans | rejetée immédiatement | 3 < 4 ans (R-06) |
| Message affiché | inadmissibilité à bord | raison de sécurité |
| Validation de l'étape | bloquée | présence d'un passager inadmissible |
| Réservation enregistrée | aucune | tunnel bloqué avant paiement |

## Ce que ce cas ne vérifie pas

- l'enfant d'exactement 4 ans (admis, tarif enfant) ;
- la frontière enfant/adulte à 12 ans (tarification, pas admission) ;
- le calcul tarifaire d'une saisie valide (→ `CASE-RES-400`,
  `CASE-RES-405`) ;
- la vérification de l'âge réel à l'embarquement (hors périmètre du tunnel
  en ligne).

---

## Test automatisé

**Nom attendu :**
`test_CASE_RES_410_enfant_moins_4_ans_rejet_immediat_validation_bloquee`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test saisit un enfant de 3 ans parmi les passagers.
- [ ] Le test vérifie le rejet immédiat de la saisie.
- [ ] Le test vérifie la présence du message d'inadmissibilité.
- [ ] Le test vérifie que la validation de l'étape reste bloquée.
- [ ] Le test échoue si la limite d'âge est volontairement abaissée dans le code.
- [ ] Le nom du test contient `CASE_RES_410`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
