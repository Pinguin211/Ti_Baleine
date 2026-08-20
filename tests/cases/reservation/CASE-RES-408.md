# CASE-RES-408 — Clôture automatique des réservations à moins de 2 heures du départ

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-3`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la règle opérationnelle de clôture automatique des ventes en ligne deux heures avant le départ (règle R-11, Contrainte 7). Cette règle est essentielle pour permettre à l'équipage et à l'administrateur de figer le manifeste des passagers, d'armer les navires et d'accueillir les participants sans modification de dernière minute. Si un créneau reste ouvert à moins de deux heures du départ, des clients peuvent acheter en ligne des billets pour un bateau déjà en préparation ou en cours d'embarquement.

## Cas

```gherkin
Étant donné un client accédant au site web le 20 août 2026 à 8h15
Et un créneau « Sortie Baleines » prévu le 20 août 2026 à 10h00 au port de Saint-Gilles disposant de 10 places libres
Quand le client consulte les créneaux disponibles pour le jour même
Alors le créneau de 10h00 (départ dans 1h45) est affiché comme clos (« Ventes fermées ») et n'est pas sélectionnable
Quand une requête de réservation tente d'être soumise programmatiquement pour ce créneau de 10h00
Alors le système rejette la requête avec un message indiquant la clôture des ventes à moins de 2 heures du départ
Et aucune place n'est réservée
```

## Données

| Élément | Valeur |
|---|---:|
| Horodatage courant de la requête | 20/08/2026 à 8h15 |
| Date et heure du créneau | 20/08/2026 à 10h00 |
| Délai avant le départ | 1 heure 45 minutes (< 2 heures) |
| Places physiques disponibles | 10 places |
| Règle applicable | R-11 (clôture automatique H-2) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Délai restant avant départ | 105 minutes | 10h00 − 8h15 = 105 min |
| Seuil limite de réservation | 120 minutes (2h) | R-11, Contrainte 7 |
| Statut du créneau en ligne | Clos / Non sélectionnable | 105 min < 120 min → verrouillage automatique |
| Soumission directe de réservation | Rejetée (Erreur 400/422) | Blocage strict côté API / backend |
| Modification de jauge | 0 place | Aucune réservation admise |

## Ce que ce cas ne vérifie pas

- la réservation le jour même autorisée à plus de 2 heures du départ (ex. à 8h15 pour un départ à 14h00, couvert par `CASE-RES-419`) ;
- la gestion des jauges standard (couvert par `CASE-RES-400`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_RES_408_cloture_automatique_reservation_moins_de_2_heures_du_depart`  
**Fichier :** `tests/tests-unitaires/reservation/case-res-408.test.ts`

## Revue du test automatisé

- [ ] Le test simule une consultation à 8h15 pour un créneau fixé à 10h00 le même jour.
- [ ] Le test vérifie que le créneau est marqué comme clos et non sélectionnable dans l'interface.
- [ ] Le test tente de forcer une soumission de réservation sur ce créneau et vérifie le rejet.
- [ ] Le test vérifie qu'aucun décompte de place n'a lieu.
- [ ] Le nom du test contient `CASE_RES_408`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
