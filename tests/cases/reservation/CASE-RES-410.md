# CASE-RES-410 — Rejet de la saisie d'un participant de moins de 4 ans

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-4`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la règle de sécurité maritime R-06 interdisant strictement l'embarquement des enfants de moins de 4 ans sur les navires de Ti'Baleine. Il garantit que le module de saisie des passagers bloque immédiatement toute tentative d'ajout d'un participant âgé de moins de 4 ans, affiche un message explicite informant des contraintes de sécurité en mer, et empêche la poursuite du tunnel de réservation. Si ce contrôle n'est pas appliqué, des familles peuvent réserver pour des nourrissons ou enfants en bas âge, aboutissant à un refus d'embarquement au port.

## Cas

```gherkin
Étant donné un client ayant choisi un créneau disponible
Quand il arrive sur l'étape de configuration des participants
Et qu'il tente d'ajouter un enfant en renseignant un âge de 2 ans (ou inférieur à 4 ans)
Alors le système bloque l'ajout du passager
Et un message d'alerte explicite s'affiche indiquant que les enfants de moins de 4 ans ne sont pas admis à bord pour des raisons de sécurité
Et le bouton de validation du panier reste désactivé tant qu'un participant inadmissible est présent
```

## Données

| Cas testé | Âge saisi | Tranche attendue | Comportement attendu |
|---|---|---|---|
| Enfant de 2 ans | 2 ans | < 4 ans | Rejet immédiat / Message d'inadmissibilité (R-06) |
| Enfant de 3 ans | 3 ans | < 4 ans | Rejet immédiat / Message d'inadmissibilité (R-06) |
| Enfant de 4 ans | 4 ans | Enfant (4 à 11 ans) | Admis au tarif enfant standard |
| Adolescent de 12 ans | 12 ans | Adulte ($\ge 12$ ans) | Admis au tarif adulte |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Statut d'admission (< 4 ans) | Rejeté / Bloqué | Règle de sécurité R-06, AC-4 |
| Message de sécurité | Affiché | Information claire sur l'interdiction maritime |
| Passage à l'étape suivante | Bloqué | Le panier ne peut contenir de passager de moins de 4 ans |
| Réservation créée | 0 | Aucune transaction permise |

## Ce que ce cas ne vérifie pas

- la tarification enfant pour la tranche autorisée 4–11 ans (couvert par `CASE-RES-400`, `CASE-RES-405`) ;
- la saisie des coordonnées de contact (couvert par `CASE-RES-407`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_RES_410_rejet_participant_moins_de_4_ans_securite_maritime`  
**Fichier :** `tests/tests-unitaires/reservation/case-res-410.test.ts`

## Revue du test automatisé

- [ ] Le test tente de renseigner un passager de 2 ans et vérifie le blocage immédiat.
- [ ] Le test tente de renseigner un passager de 3 ans et vérifie le blocage immédiat.
- [ ] Le test vérifie l'affichage du message d'inadmissibilité pour sécurité en mer.
- [ ] Le test vérifie que la validation du panier est désactivée.
- [ ] Le test renseigne un enfant de 4 ans et s'assure qu'il est admis au tarif enfant.
- [ ] Le nom du test contient `CASE_RES_410`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
