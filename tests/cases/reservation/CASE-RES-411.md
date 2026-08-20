# CASE-RES-411 — Indisponibilité des créneaux à Saint-Leu en dehors des mardis et jeudis matin

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-2`  
**Type :** acceptation  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège les contraintes de planning d'exploitation du port secondaire de Saint-Leu. Conformément aux règles R-01, R-10 et au CDC §1, Saint-Leu est exclusivement ouvert le mardi matin et le jeudi matin (départ unique à 9h00, opéré par le Tikap). Le navire regagne ensuite Saint-Gilles pour les départs de l'après-midi. En conséquence, aucun créneau ne doit être proposé à Saint-Leu les lundis, mercredis, vendredis, samedis, dimanches, ni les après-midis des mardis et jeudis. Si cette restriction est rompue, des clients peuvent réserver à Saint-Leu des jours ou heures où aucun navire n'est présent.

## Cas

```gherkin
Étant donné un client accédant au site web
Quand il choisit le port de départ « Saint-Leu »
Et consulte un lundi (ex. lundi 17 août 2026) ou un mercredi (ex. mercredi 19 août 2026)
Alors le calendrier indique qu'aucun créneau n'est disponible pour Saint-Leu sur ces journées
Quand il consulte un mardi (ex. mardi 18 août 2026)
Alors seul le créneau du matin à 9h00 est proposé
Et aucun créneau d'après-midi (ex. 14h00) n'est affiché pour Saint-Leu
```

## Données

| Date testée | Jour de la semaine | Port | Créneaux attendus | Statut |
|---|---|---|---|---|
| 17/08/2026 | Lundi | Saint-Leu | 0 créneau | Indisponible (fermé) |
| 18/08/2026 | Mardi | Saint-Leu | 9h00 uniquement | Ouvert le matin |
| 18/08/2026 | Mardi après-midi | Saint-Leu | 0 créneau à 14h00 | Tikap à Saint-Gilles l'après-midi |
| 19/08/2026 | Mercredi | Saint-Leu | 0 créneau | Indisponible (fermé) |
| 20/08/2026 | Jeudi | Saint-Leu | 9h00 uniquement | Ouvert le matin |
| 21/08/2026 | Vendredi | Saint-Leu | 0 créneau | Indisponible (fermé) |
| 22/08/2026 | Samedi | Saint-Leu | 0 créneau | Indisponible (fermé) |
| 23/08/2026 | Dimanche | Saint-Leu | 0 créneau | Indisponible (fermé) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Jours d'ouverture Saint-Leu | Mardi et Jeudi matin | R-01, REQ-001, REQ-003 |
| Heure de départ standard | 9h00 uniquement | R-01 |
| Créneaux 14h00 à Saint-Leu | 0 créneau disponible | Rotation vers Saint-Gilles l'après-midi |
| Disponibilité hors mar/jeu | Aucune date sélectionnable | Calendrier filtré par port |

## Ce que ce cas ne vérifie pas

- la tarification et majoration de Saint-Leu le mardi à 9h00 (couvert par `CASE-RES-401`) ;
- la jauge réduite à Saint-Gilles pendant la rotation Saint-Leu (couvert par `CASE-RES-412`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_RES_411_indisponibilite_creneaux_saint_leu_hors_mardi_jeudi_matin`  
**Fichier :** `tests/tests-unitaires/reservation/case-res-411.test.ts`

## Revue du test automatisé

- [ ] Le test sélectionne le port de Saint-Leu pour un lundi, mercredi, vendredi et week-end et vérifie l'absence de créneaux.
- [ ] Le test sélectionne Saint-Leu pour un mardi et vérifie la présence unique du départ de 9h00.
- [ ] Le test vérifie qu'aucun départ d'après-midi (14h00) n'existe à Saint-Leu.
- [ ] Le nom du test contient `CASE_RES_411`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
