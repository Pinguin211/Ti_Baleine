# CASE-RES-411 — Consultation de Saint-Leu en dehors des mardis et jeudis matin

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-2`  
**Type :** acceptation  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège le planning restreint de Saint-Leu : le port n'est ouvert que
les mardis et jeudis matin (le Tikap regagnant Saint-Gilles l'après-midi).
Si la règle se casse, des clients réservent des départs de Saint-Leu des
jours où aucun navire n'y est présent.

## Cas

```gherkin
Étant donné un client accédant au site web
Quand il choisit le port de départ « Saint-Leu » et consulte le lundi 14 septembre 2026
Alors aucun créneau n'est disponible sur cette date
Quand il consulte le mardi 15 septembre 2026 après-midi
Alors aucun créneau d'après-midi n'est proposé (seul le départ du matin à 9h00 existe)
Quand il consulte le mercredi 16 septembre 2026
Alors aucun créneau n'est disponible sur cette date
```

## Données

| Élément | Valeur |
|---|---:|
| Port consulté | Saint-Leu |
| Date 1 (jour fermé) | lundi 14 septembre 2026 |
| Date 2 (mardi après-midi) | mardi 15 septembre 2026, après-midi |
| Date 3 (jour fermé) | mercredi 16 septembre 2026 |
| Jours d'ouverture de Saint-Leu | mardis et jeudis matin uniquement |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Créneaux le lundi | aucun | Saint-Leu fermé hors mar/jeu matin |
| Créneaux le mardi après-midi | aucun | le Tikap regagne Saint-Gilles l'après-midi |
| Créneaux le mercredi | aucun | Saint-Leu fermé hors mar/jeu matin |

## Ce que ce cas ne vérifie pas

- la réservation valide un mardi matin à Saint-Leu (→ `CASE-RES-401`) ;
- la jauge réduite à Saint-Gilles les mardis/jeudis matin
  (→ `CASE-RES-412`) ;
- les jours de fermeture annuelle (→ `CASE-RES-409`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_RES_411_saint_leu_hors_mardi_jeudi_matin_aucun_creneau`  
**Fichier :** [tests/tests-unitaires/reservation/case-res-411.test.ts](../../tests-unitaires/reservation/case-res-411.test.ts)

## Revue du test automatisé

- [ ] Le test consulte Saint-Leu un lundi, un mardi après-midi et un mercredi.
- [ ] Le test vérifie l'absence totale de créneau sur ces trois consultations.
- [ ] Le test vérifie qu'un mardi matin reste proposé (témoin de non-régression).
- [ ] Le test échoue si Saint-Leu devient réservable un jour fermé.
- [ ] Le nom du test contient `CASE_RES_411`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
