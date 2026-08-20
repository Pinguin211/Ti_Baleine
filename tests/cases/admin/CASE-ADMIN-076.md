# CASE-ADMIN-076 — Rejet strict de tout encaissement en espèces ou en chèques vacances

**Spécification :** `SPEC-ADMIN-08`  
**Critère d'acceptation :** `Portée §5`, `Cas limite #2`, `AC-3`, `CDC v5 §6`  
**Type :** rejet / cas limite  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège le périmètre strict du CDC v5, qui restreint l'encaissement du solde sur place exclusivement à la carte bancaire. Si la règle se casse, l'interface propose ou accepte un règlement en espèces ou en chèques vacances, hors périmètre fonctionnel et non pris en charge par le système.

## Cas

```gherkin
Étant donné une réservation « Payée partiellement » consultée par l'administrateur sur l'écran d'encaissement du solde
Quand l'administrateur recherche une option de règlement autre que la carte bancaire
Alors aucune option d'encaissement en espèces n'est proposée dans l'interface
Et aucune option d'encaissement en chèques vacances n'est proposée dans l'interface
Et seul le bouton « Encaisser le solde (CB sur place) » est disponible
```

## Données

| Élément | Valeur |
|---|---:|
| Statut initial réservation | Payée partiellement |
| Moyens de règlement recherchés | Espèces, chèques vacances |
| Moyen de règlement disponible | Carte bancaire (unique) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Option « Espèces » | Absente de l'interface | Cas limite #2 SPEC-ADMIN-08, CDC v5 §6 |
| Option « Chèques vacances » | Absente de l'interface | Cas limite #2 SPEC-ADMIN-08, CDC v5 §6 |
| Moyen de règlement proposé | Carte bancaire uniquement | AC-3 |

## Ce que ce cas ne vérifie pas

- le déroulement nominal de l'encaissement par carte bancaire (couvert par `CASE-ADMIN-074`) ;
- le blocage de l'encaissement sur une réservation déjà soldée (couvert par `CASE-ADMIN-075`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_076_rejet_encaissement_especes_cheques_vacances_absent_interface`  
**Fichier :** `tests/tests-unitaires/admin/case-admin-076.test.ts`

## Revue du test automatisé

- [ ] Le test charge l'écran d'encaissement du solde d'une réservation « Payée partiellement ».
- [ ] Le test vérifie l'absence de toute option d'encaissement en espèces dans le DOM/l'interface.
- [ ] Le test vérifie l'absence de toute option d'encaissement en chèques vacances dans le DOM/l'interface.
- [ ] Le test vérifie que seul le moyen de règlement carte bancaire est exposé.
- [ ] Le nom du test contient `CASE_ADMIN_076`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
