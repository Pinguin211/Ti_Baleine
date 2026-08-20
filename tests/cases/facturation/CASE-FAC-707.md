# CASE-FAC-707 — Présence obligatoire et unicité des identifiants de facture d'acompte et de solde

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-1`, `AC-2`, `Scénario 1`, `Portée §1`  
**Type :** conformité  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la présence obligatoire et l'unicité des identifiants de facture générés à la volée, à la fois entre la facture d'acompte et la facture de solde d'une même réservation, et entre les factures de réservations distinctes. Si la règle se casse, la facture d'acompte et la facture de solde d'une même commande pourraient partager le même numéro, deux commandes distinctes pourraient partager un identifiant, ou celui-ci pourrait être manquant ou vide, entraînant une rupture de traçabilité et de conformité comptable.

## Cas

```gherkin
Étant donné une réservation dont l'acompte puis le solde ont été réglés avec succès
Quand la facture d'acompte PDF puis la facture de solde PDF sont générées à la volée pour cette réservation
Alors chaque facture PDF comporte obligatoirement un identifiant de facture non vide
Et l'identifiant de la facture d'acompte (ex: « FACT-AC-2026-00123 ») est strictement distinct de l'identifiant de la facture de solde (ex: « FACT-SO-2026-00456 »)
Et, pour deux réservations distinctes, les identifiants de facture générés sont également strictement distincts entre eux
```

## Données

| Élément | Valeur |
|---|---:|
| Déclencheur | Confirmation du paiement de l'acompte, puis du solde |
| Identifiant de facture d'acompte | Non nul, non vide (ex: `FACT-AC-2026-00123`) |
| Identifiant de facture de solde | Non nul, non vide, distinct du précédent (ex: `FACT-SO-2026-00456`) |
| Propriété requise | Unicité garantie par facture (acompte et solde) et par réservation |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Présence de l'identifiant | Identifiant présent et non vide sur chaque PDF | Exigences AC-1 et AC-2 |
| Unicité acompte / solde | Identifiants distincts au sein d'une même réservation | Traçabilité par type de facture |
| Unicité entre réservations | Deux identifiants distincts entre réservations différentes | Traçabilité unique par commande |

## Ce que ce cas ne vérifie pas

- le contenu détaillé des lignes tarifaires (couvert par `CASE-FAC-704`, `CASE-FAC-705`) ;
- la transmission du courriel SMTP (couvert par `CASE-FAC-714`) ;
- la gestion d'un paiement en attente ou échoué (couvert par `CASE-FAC-720`, `CASE-FAC-722`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_707_presence_obligatoire_et_unicite_identifiants_facture_acompte_solde`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test déclenche la génération de la facture d'acompte puis de la facture de solde après validation des paiements correspondants.
- [ ] Le test vérifie que chaque document PDF contient un identifiant de facture non vide.
- [ ] Le test vérifie que l'identifiant de la facture d'acompte diffère de celui de la facture de solde pour une même réservation.
- [ ] Le test génère les factures de deux réservations distinctes et vérifie qu'elles possèdent des identifiants uniques différents.
- [ ] Le nom du test contient `CASE_FAC_707`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
