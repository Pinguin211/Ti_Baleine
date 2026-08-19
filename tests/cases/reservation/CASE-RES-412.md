# CASE-RES-412 — Jauge réduite à Saint-Gilles les mardis et jeudis matin

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-2`, `AC-5`  
**Type :** acceptation  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège la rotation des navires (R-10) : les mardis et jeudis matin,
le Tikap opère à Saint-Leu, donc les créneaux de 7h00 et 10h00 à Saint-Gilles
sont plafonnés à 24 places (Grand Bleu seul) et la privatisation du Tikap y
est indisponible. Si la règle se casse, le prestataire vend jusqu'à 36 places
sur un créneau où un seul navire de 24 places est à quai.

## Cas

```gherkin
Étant donné un client accédant au site web
Quand il consulte les créneaux de Saint-Gilles du mardi 15 septembre 2026
Alors les créneaux de 7h00 et 10h00 affichent une jauge maximale de 24 places (Grand Bleu seul)
Quand il tente de sélectionner une privatisation du Tikap sur le créneau du mardi 15 septembre 2026 matin à Saint-Gilles
Alors cette privatisation est indisponible sur ce créneau
```

## Données

| Élément | Valeur |
|---|---:|
| Port consulté | Saint-Gilles |
| Date consultée | mardi 15 septembre 2026 |
| Créneaux concernés | 7h00 et 10h00 |
| Jauge attendue | 24 places (au lieu de 36) |
| Navire absent | Tikap (opérant à Saint-Leu le matin) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Jauge des créneaux 7h00 et 10h00 | 24 places | Grand Bleu seul (R-10) |
| Privatisation Tikap matin | indisponible | Tikap à Saint-Leu ce matin-là |

## Ce que ce cas ne vérifie pas

- la jauge standard de 36 places hors mardi/jeudi matin (→ `CASE-RES-400`) ;
- le créneau de 14h00 du même jour (le Tikap est revenu, jauge standard) ;
- la réservation effective à Saint-Leu ce même matin (→ `CASE-RES-401`,
  `CASE-RES-403`) ;
- la privatisation du Grand Bleu, qui reste possible (→ `CASE-RES-406`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_RES_412_saint_gilles_mardi_jeudi_matin_jauge_24_tikap_indisponible`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test consulte un mardi (ou jeudi) matin à Saint-Gilles.
- [ ] Le test vérifie la jauge de 24 places sur les créneaux 7h00 et 10h00.
- [ ] Le test vérifie l'indisponibilité de la privatisation Tikap sur ces créneaux.
- [ ] Le test vérifie en témoin qu'un autre jour la jauge est de 36 places.
- [ ] Le test échoue si la jauge réduite mar/jeu matin est volontairement supprimée.
- [ ] Le nom du test contient `CASE_RES_412`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
