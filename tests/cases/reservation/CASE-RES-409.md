# CASE-RES-409 — Consultation des jours de fermeture annuelle

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-2`  
**Type :** acceptation  
**Niveau de risque :** faible

## Ce que ce cas protège

Ce cas protège le masquage des deux jours de fermeture annuelle (R-02) :
25 décembre et 1er janvier. Si la règle se casse, des clients réservent une
sortie un jour où aucun navire ne part, et le prestataire doit annuler et
rembourser.

## Cas

```gherkin
Étant donné un client accédant au site web
Quand il consulte les créneaux du 25 décembre 2026 pour Saint-Gilles
Alors aucun créneau n'est proposé sur cette date
Quand il consulte les créneaux du 1er janvier 2027 pour Saint-Gilles
Alors aucun créneau n'est proposé sur cette date
```

## Données

| Élément | Valeur |
|---|---:|
| Date consultée 1 | 25 décembre 2026 |
| Date consultée 2 | 1er janvier 2027 |
| Port consulté | Saint-Gilles |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Créneaux proposés le 25/12/2026 | aucun | fermeture annuelle (R-02) |
| Créneaux proposés le 01/01/2027 | aucun | fermeture annuelle (R-02) |

## Ce que ce cas ne vérifie pas

- les veilles et lendemains de ces dates (ouverts normalement) ;
- la fermeture côté Saint-Leu (déjà fermé hors mardi/jeudi matin —
  → `CASE-RES-411` ; le 25/12/2026 est un vendredi et le 01/01/2027 un
  vendredi, jours où Saint-Leu est fermé indépendamment de la règle testée) ;
- la clôture H-2 (→ `CASE-RES-408`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_RES_409_fermeture_annuelle_25_decembre_1er_janvier_aucun_creneau`  
**Fichier :** [tests/tests-unitaires/case-res-409.test.ts](../../tests-unitaires/case-res-409.test.ts)

## Revue du test automatisé

- [ ] Le test consulte le 25 décembre et le 1er janvier.
- [ ] Le test vérifie qu'aucun créneau n'est proposé sur ces deux dates.
- [ ] Le test consulte un port ouvert ce jour-là en temps normal (Saint-Gilles).
- [ ] Le test échoue si la liste des jours de fermeture est volontairement vidée.
- [ ] Le nom du test contient `CASE_RES_409`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
