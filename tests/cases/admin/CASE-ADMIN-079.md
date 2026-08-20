# CASE-ADMIN-079 — Remboursement indicatif nul lorsque le montant payé est insuffisant pour couvrir la pénalité contractuelle

**Spécification :** `SPEC-ADMIN-02`  
**Critère d'acceptation :** `Cas limite #7`, `AC-1`, `R-29`  
**Type :** rejet / cas limite  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'affichage correct du plancher à 0 € du calcul indicatif de remboursement lorsque la pénalité contractuelle dépasse la somme réellement perçue. Si la règle se casse, l'administrateur pourrait voir affiché un remboursement indicatif négatif erroné, ou le système pourrait à tort tenter de réclamer un complément de paiement au client.

## Cas

```gherkin
Étant donné une réservation confirmée de 100,00 € ayant versé un acompte de 30,00 € (2 billets)
Et l'administrateur recevant une demande d'annulation soumise au barème standard 50 % (pénalité : 50,00 €)
Quand l'administrateur ouvre l'écran d'annulation
Alors le système affiche à l'administrateur le calcul indicatif : « Somme payée : 30,00 € | Pénalité barème : 50,00 € | Remboursement indicatif : 0,00 € »
Quand l'administrateur valide l'annulation avec le motif « Annulation standard »
Alors aucun complément de paiement n'est réclamé au client au titre de la pénalité non couverte par l'acompte
Et le SMS informatif transmis au client ne mentionne aucun montant ni complément à régler
```

## Données

| Élément | Valeur |
|---|---:|
| Montant total réservation | 100,00 € |
| Acompte versé | 30,00 € |
| Barème appliqué | 50 % (pénalité 50,00 €) |
| Motif sélectionné | « Annulation standard » |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Remboursement indicatif affiché | 0,00 € | $\max(0, 30 - 50) = \max(0, -20) = 0$ (R-29) |
| Complément réclamé au client | Aucun | Le déficit de 20,00 € n'est jamais recouvré auprès du client |
| SMS envoyé | Informatif, sans mention financière ni de complément | AC-3 |

## Ce que ce cas ne vérifie pas

- le calcul du régime standard lorsque l'acompte couvre intégralement la pénalité, avec remboursement positif (couvert par `CASE-ADMIN-012`) ;
- le régime dérogatoire à 100 % post-alerte météo (couvert par `CASE-ADMIN-010`, `CASE-ADMIN-011`) ;
- la non-persistance du motif d'annulation en base (couvert par `CASE-ADMIN-013`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_079_remboursement_indicatif_nul_montant_paye_insuffisant_penalite`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test configure une réservation dont l'acompte versé est inférieur à la pénalité du barème appliqué.
- [ ] Le test vérifie que le remboursement indicatif affiché à l'administrateur est plafonné à 0,00 €.
- [ ] Le test valide l'annulation et vérifie qu'aucune demande de complément n'est générée côté client.
- [ ] Le test vérifie que le SMS envoyé ne contient aucune mention financière.
- [ ] Le nom du test contient `CASE_ADMIN_079`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
