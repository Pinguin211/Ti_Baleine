# CASE-RES-412 — Plafonnement de la jauge à 24 places à Saint-Gilles les mardis et jeudis matin

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-2`, `AC-5`  
**Type :** acceptation  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège l'exactitude des capacités contingentées à Saint-Gilles lors des rotations bi-hebdomadaires du Tikap vers Saint-Leu (règles R-01, R-10, REQ-108). Les mardis et jeudis matin (créneaux de 7h00 et 10h00), le Tikap (12 places) se trouve physiquement à Saint-Leu. En conséquence, seul le navire Grand Bleu (24 places) opère à Saint-Gilles : la jauge maximale du créneau doit être strictement plafonnée à 24 places (au lieu des 36 places standard), et la formule de privatisation du Tikap ne doit pas être sélectionnable le matin à Saint-Gilles. Si cette contrainte n'est pas respectée, un surbooking de 12 passagers peut se produire.

## Cas

```gherkin
Étant donné un client accédant au site web
Quand il consulte les départs de Saint-Gilles pour un mardi matin (ex. mardi 18 août 2026)
Alors le créneau de 7h00 affiche une jauge maximale de 24 places (Grand Bleu seul)
Et le créneau de 10h00 affiche une jauge maximale de 24 places (Grand Bleu seul)
Et le créneau d'après-midi de 14h00 affiche la jauge complète de 36 places (retour du Tikap à Saint-Gilles)
Quand un client souhaite réserver une formule de privatisation à Saint-Gilles le mardi matin
Alors seule la privatisation du « Grand Bleu » est disponible
Et la privatisation du « Tikap » est indisponible pour le matin à Saint-Gilles
```

## Données

| Port | Date | Créneau | Navires présents | Jauge maximale | Formules privatisation |
|---|---|---|---|---|---|
| Saint-Gilles | Mardi 18/08/2026 | 7h00 | Grand Bleu seul | 24 places | Grand Bleu uniquement |
| Saint-Gilles | Mardi 18/08/2026 | 10h00 | Grand Bleu seul | 24 places | Grand Bleu uniquement |
| Saint-Gilles | Mardi 18/08/2026 | 14h00 | Tikap + Grand Bleu | 36 places | Grand Bleu ou Tikap |
| Saint-Gilles | Mercredi 19/08/2026 | 7h00 | Tikap + Grand Bleu | 36 places | Grand Bleu ou Tikap |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Jauge max Saint-Gilles mar/jeu 7h | 24 places | Grand Bleu (24 places), Tikap absent |
| Jauge max Saint-Gilles mar/jeu 10h | 24 places | Grand Bleu (24 places), Tikap absent |
| Jauge max Saint-Gilles mar/jeu 14h | 36 places | Grand Bleu (24) + Tikap (12) réunis l'après-midi |
| Privatisation Tikap matin Saint-Gilles | Indisponible | Tikap mobilisé à Saint-Leu (R-10, C-25) |

## Ce que ce cas ne vérifie pas

- la jauge de Saint-Leu le mardi matin (couvert par `CASE-RES-401`) ;
- la réservation standard d'un créneau à 36 places (couvert par `CASE-RES-400`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_RES_412_plafonnement_jauge_24_places_saint_gilles_mardi_jeudi_matin`  
**Fichier :** `tests/tests-unitaires/reservation/case-res-412.test.ts`

## Revue du test automatisé

- [ ] Le test consulte les créneaux de 7h00 et 10h00 à Saint-Gilles un mardi.
- [ ] Le test vérifie que la capacité maximale affichée est de 24 places.
- [ ] Le test consulte le créneau de 14h00 le même mardi et vérifie la jauge de 36 places.
- [ ] Le test vérifie que la privatisation du Tikap est indisponible le matin à Saint-Gilles.
- [ ] Le nom du test contient `CASE_RES_412`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
