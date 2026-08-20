# CASE-ADMIN-011 — Annulation administrative d'office pour cause météo ou technique

**Spécification :** `SPEC-ADMIN-02`  
**Critère d'acceptation :** `Scénario 2`, `AC-1`, `AC-2`, `AC-3`, `REQ-013`, `REQ-014`, `R-27`  
**Type :** acceptation  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège le traitement d'annulation imposé par l'administrateur pour des raisons de sécurité maritime (houle, avarie), y compris l'affichage à l'administrateur du calcul indicatif de remboursement dérogatoire à 100 %. Si la règle se casse, les clients ne sont pas informés par SMS de l'annulation d'office de leur sortie, les places ne sont pas correctement réinitialisées, ou l'administrateur ne dispose pas du bon calcul dérogatoire pour guider le remboursement manuel.

## Cas

```gherkin
Étant donné une réservation confirmée de 3 passagers sur un départ devant être annulé pour cause météo, ayant versé un acompte de 90,00 €
Quand l'administrateur déclenche l'annulation d'office
Alors le système affiche à l'administrateur le calcul dérogatoire à 100 % : remboursement indicatif de 90,00 € (intégralité des sommes perçues)
Quand l'administrateur saisit le motif « Annulation administrative météo » et confirme
Alors l'ensemble des 3 billets est supprimé de la réservation
Et la réservation est conservée à 0 billet actif
Et les places sont libérées sur le créneau
Et un SMS explicite d'annulation administrative est transmis au client sans aucune mention du calcul de remboursement
```

## Données

| Élément | Valeur |
|---|---:|
| Réservation | 3 passagers |
| Acompte versé | 90,00 € |
| Motif renseigné | « Annulation administrative météo » |
| Canal de notification | SMS transactionnel |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Calcul indicatif affiché (admin) | Remboursement dérogatoire 100 % = 90,00 € | Régime dérogatoire alerte météo (R-27) |
| Billets actifs restants | 0 billet | Suppression totale |
| Places libérées | +3 places | Remise à niveau synchrone |
| SMS client | Émis avec mention d'annulation météo, sans détail financier | Information obligatoire (R-27) |
| Fiche réservation | Conservée en base | Traçabilité financière |

## Ce que ce cas ne vérifie pas

- le remboursement financier effectif intégral dérogatoire manuel (R-27, couvert par `CASE-ADMIN-022`) ;
- l'annulation standard hors alerte (couvert par `CASE-ADMIN-012`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_011_annulation_administrative_office_cause_meteo_technique`  
**Fichier :** tests/tests-unitaires/admin/case-admin-011.test.ts

## Revue du test automatisé

- [ ] Le test instancie une réservation de 3 passagers avec un acompte versé connu.
- [ ] Le test vérifie l'affichage à l'administrateur du calcul dérogatoire à 100 % avant validation.
- [ ] Le test déclenche l'annulation avec le motif météo.
- [ ] Le test vérifie la suppression intégrale des billets.
- [ ] Le test vérifie la mise à jour de la capacité disponible.
- [ ] Le test vérifie l'émission du SMS de notification et l'absence de mention du calcul financier.
- [ ] Le nom du test contient `CASE_ADMIN_011`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
