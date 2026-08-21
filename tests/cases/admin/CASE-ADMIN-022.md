# CASE-ADMIN-022 — Absence de flux financier sortant automatisé lors de l'annulation

**Spécification :** `SPEC-ADMIN-02`  
**Critère d'acceptation :** `Portée §7`, `Contrainte C-10`, `R-27`, `R-28`  
**Type :** sécurité financière  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège le système contre tout déclenchement non maîtrisé de flux financier sortant (virement bancaire ou recrédit carte automatique). Conformément au CDC v5 (Contrainte C-10), 100 % des remboursements doivent être exécutés manuellement par l'entreprise en dehors de la plateforme.

## Cas

```gherkin
Étant donné une réservation payée de 260 € faisant l'objet d'une annulation administrative
Quand l'annulation est validée dans le back-office
Alors aucun appel d'API de remboursement vers la passerelle bancaire n'est émis
Et le solde bancaire de la commande reste inchangé dans le système
Et l'opération de remboursement effectif est laissée au traitement manuel de l'entreprise
```

## Données

| Élément | Valeur |
|---|---:|
| Montant payé initial | 260 € |
| Appels API bancaires sortants autorisés | 0 (aucun appel de remboursement) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Flux financier automatique | Aucun (0 € émis par le système) | Contrainte C-10 et Portée §7 |
| Statut bancaire système | Manuel hors système | Règles R-27, R-28 |

## Ce que ce cas ne vérifie pas

- le traitement manuel bancaire en comptabilité externe ;
- le calcul théorique des retenues (couvert par SPEC-CANCEL-03).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_022_absence_flux_financier_sortant_automatique_annulation`  
**Fichier :** tests/tests-unitaires/admin/case-admin-022.test.ts

## Revue du test automatisé

- [ ] Le test instrumente l'API de passerelle de paiement (mock).
- [ ] Le test exécute l'annulation d'une réservation payée.
- [ ] Le test vérifie qu'aucun endpoint de remboursement/recrédit n'a été appelé.
- [ ] Le nom du test contient `CASE_ADMIN_022`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
