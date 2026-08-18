# CASE-ADMIN-011 — Annulation administrative d'office pour cause météo ou technique

**Spécification :** `SPEC-ADMIN-02`  
**Critère d'acceptation :** `Scénario 2`, `AC-1`, `AC-2`, `AC-3`, `REQ-013`, `REQ-014`, `R-27`  
**Type :** acceptation  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège le traitement d'annulation imposé par l'administrateur pour des raisons de sécurité maritime (houle, avarie). Si la règle se casse, les clients ne sont pas informés par SMS de l'annulation d'office de leur sortie et les places ne sont pas correctement réinitialisées.

## Cas

```gherkin
Étant donné une réservation confirmée de 3 passagers sur un départ devant être annulé pour cause météo
Quand l'administrateur déclenche l'annulation d'office et saisit le motif « Annulation administrative météo »
Alors l'ensemble des 3 billets est supprimé de la réservation
Et la réservation est conservée à 0 billet actif
Et les places sont libérées sur le créneau
Et un SMS explicite d'annulation administrative est transmis au client
```

## Données

| Élément | Valeur |
|---|---:|
| Réservation | 3 passagers |
| Motif renseigné | « Annulation administrative météo » |
| Canal de notification | SMS transactionnel |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Billets actifs restants | 0 billet | Suppression totale |
| Places libérées | +3 places | Remise à niveau synchrone |
| SMS client | Émis avec mention d'annulation météo | Information obligatoire (R-27) |
| Fiche réservation | Conservée en base | Traçabilité financière |

## Ce que ce cas ne vérifie pas

- le remboursement financier intégral dérogatoire manuel (R-27, couvert par `CASE-ADMIN-022`) ;
- l'annulation standard hors alerte (couvert par `CASE-ADMIN-012`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_011_annulation_administrative_office_cause_meteo_technique`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test instancie une réservation de 3 passagers.
- [ ] Le test déclenche l'annulation avec le motif météo.
- [ ] Le test vérifie la suppression intégrale des billets.
- [ ] Le test vérifie la mise à jour de la capacité disponible.
- [ ] Le test vérifie l'émission du SMS de notification.
- [ ] Le nom du test contient `CASE_ADMIN_011`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
