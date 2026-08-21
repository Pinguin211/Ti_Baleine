# CASE-ADMIN-080 — Perte temporaire de connexion internet lors de la validation du pointage et de l'encaissement du solde sur place

**Spécification :** `SPEC-ADMIN-08`  
**Critère d'acceptation :** `Cas limite #3`, `AC-1`  
**Type :** robustesse  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège l'intégrité financière et l'expérience de l'administrateur lors d'une coupure réseau survenant pendant la validation d'un encaissement à l'embarcadère. Si la règle se casse, l'administrateur peut croire à tort qu'un encaissement a échoué alors qu'il a été transmis (risque de double encaissement), ou au contraire voir la réservation basculer prématurément à « Payée complètement » sans confirmation réelle de la transaction.

## Cas

```gherkin
Étant donné une réservation « Payée partiellement » avec un solde dû de 105,00 €
Et l'administrateur validant l'encaissement du solde par carte bancaire sur place à l'embarcadère
Quand une perte temporaire de connexion internet survient pendant la transmission de la validation du pointage
Alors un message d'erreur explicite est affiché à l'administrateur (transmission du paiement non confirmée)
Et l'état antérieur de la réservation (« Payée partiellement », solde dû 105,00 €) est conservé sans bascule prématurée vers « Payée complètement »
Et aucune facture de solde n'est générée tant que la confirmation de la transmission réseau n'est pas reçue
```

## Données

| Élément | Valeur |
|---|---:|
| Statut initial réservation | Payée partiellement |
| Solde dû | 105,00 € |
| Incident | Perte temporaire de connexion internet pendant la validation du pointage |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Message affiché | Message d'erreur explicite, transmission non confirmée | Cas limite #3 SPEC-ADMIN-08 |
| Statut financier | Inchangé : « Payée partiellement », solde dû 105,00 € | Conservation de l'état jusqu'à confirmation réseau |
| Facture de solde | Non générée | Aucune bascule tant que la transmission n'est pas confirmée |

## Ce que ce cas ne vérifie pas

- le déroulement nominal de l'encaissement du solde par carte bancaire (couvert par `CASE-ADMIN-074`) ;
- la gestion d'une perte de connexion pendant le chargement du planning (couvert par `CASE-ADMIN-008`) ;
- la cohérence transactionnelle lors d'une coupure réseau pendant une annulation (couvert par `CASE-ADMIN-021`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_080_perte_connexion_pointage_encaissement_solde_sur_place`  
**Fichier :** `tests/tests-unitaires/admin/case-admin-080.test.ts`

## Revue du test automatisé

- [ ] Le test configure une réservation « Payée partiellement » avec un solde dû non nul.
- [ ] Le test simule une coupure réseau pendant la transmission de la validation du pointage CB sur place.
- [ ] Le test vérifie l'affichage d'un message d'erreur explicite à l'administrateur.
- [ ] Le test vérifie que le statut financier et le solde dû restent inchangés jusqu'à confirmation.
- [ ] Le test vérifie qu'aucune facture de solde n'est générée tant que la transmission n'est pas confirmée.
- [ ] Le nom du test contient `CASE_ADMIN_080`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
