# CASE-ADMIN-004 — Affichage d'un état vide explicite lorsqu'aucun créneau n'est programmé

**Spécification :** `SPEC-ADMIN-01`  
**Critère d'acceptation :** `Cas limite #1`  
**Type :** ergonomie / robustesse  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège l'expérience utilisateur et la clarté du back-office lorsqu'aucun créneau n'existe pour une date donnée (ex: jour férié sans sortie, maintenance globale ou jour hors saison). Si la règle se casse, l'interface peut afficher un écran blanc, rester indéfiniment en chargement ou présenter des données corrompues.

## Cas

```gherkin
Étant donné l'administrateur connecté au back-office
Et une date sélectionnée (ex: 25 décembre 2026) pour laquelle aucun créneau n'est créé en base
Quand l'administrateur consulte le planning pour cette date
Alors le système affiche un message d'état vide explicite « Aucun créneau programmé pour cette journée »
Et aucun écran figé, spinner infini ni erreur JavaScript n'apparaît
```

## Données

| Élément | Valeur |
|---|---:|
| Date consultée | 25/12/2026 |
| Nombre de créneaux en base | 0 |
| Action | Consultation de la journée |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Message d'état vide | « Aucun créneau programmé pour cette journée » | Cas limite #1 SPEC-ADMIN-01 |
| État de l'écran | Stable, aucun blocage ni freeze | Conformité UX |

## Ce que ce cas ne vérifie pas

- la fermeture manuelle d'un créneau (couvert par `CASE-ADMIN-062`) ;
- la configuration ou modification d'activité d'un créneau (couvert par `CASE-ADMIN-064`) ;
- l'interception d'une erreur réseau serveur (couvert par `CASE-ADMIN-008`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_004_affichage_etat_vide_explicite_aucun_creneau_programme`  
**Fichier :** tests/tests-unitaires/admin/case-admin-004.test.ts

## Revue du test automatisé

- [ ] Le test consulte une date sans aucun créneau en base de données.
- [ ] Le test vérifie la présence du message informatif d'état vide.
- [ ] Le test vérifie l'absence d'erreurs non gérées dans les composants d'affichage.
- [ ] Le nom du test contient `CASE_ADMIN_004`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
