# CASE-RES-413 — Blocage de réservation demandant plus de places que le reliquat disponible

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-2`  
**Type :** acceptation  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège le contingentement strict des jauges passagers contre le surbooking. Lorsqu'un créneau dispose d'un nombre restreint de places libres (par exemple 3 places restantes), le système doit interdire toute réservation demandant un nombre supérieur de passagers (par exemple 4 personnes). Il garantit qu'un message explicite informe l'utilisateur du reliquat disponible et que le passage à l'étape suivante ou au paiement bancaire est bloqué. Si ce contrôle fait défaut, des passagers supplémentaires peuvent être enregistrés au-delà de la capacité légale des navires.

## Cas

```gherkin
Étant donné un créneau « Sortie Baleines » à Saint-Gilles disposant de 3 places libres restantes (33 places déjà réservées)
Quand un client sélectionne ce créneau
Et tente de renseigner 4 participants (ex. 2 adultes et 2 enfants)
Alors le système bloque la configuration des passagers
Et un message d'information indique que seules 3 places restent disponibles sur ce créneau
Et la validation du formulaire est désactivée
```

## Données

| Élément | Valeur |
|---|---:|
| Jauge totale du créneau | 36 places |
| Places déjà vendues | 33 places |
| Places restantes disponibles | 3 places |
| Nombre de places demandées | 4 places (2 adultes + 2 enfants) |
| Écart jauge / demande | +1 passager au-delà de la capacité |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Places restantes | 3 places | 36 − 33 = 3 places |
| Statut demande (4 places) | Rejetée / Bloquée | 4 > 3 → surcapacité interdite (AC-2) |
| Message affiché | « 3 places maximum disponibles » | Message explicite de dépassement |
| Places décomptées | 0 | Aucune place allouée |

## Ce que ce cas ne vérifie pas

- la réservation exacte des places restantes disponibles (couvert par `CASE-RES-414`) ;
- le décompte nominal de la jauge (couvert par `CASE-RES-400`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_RES_413_blocage_reservation_places_superieures_au_reliquat_disponible`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test initialise un créneau avec 3 places restantes sur 36.
- [ ] Le test tente de soumettre une demande pour 4 passagers.
- [ ] Le test vérifie le rejet immédiat et le message indiquant la limite de 3 places.
- [ ] Le test s'assure qu'aucun décompte de place n'a lieu.
- [ ] Le nom du test contient `CASE_RES_413`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
