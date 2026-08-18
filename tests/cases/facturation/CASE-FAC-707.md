# CASE-FAC-707 — Présence obligatoire et unicité de l'identifiant de facture

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-1`, `Scénario 1`, `Portée §1`  
**Type :** conformité  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la présence obligatoire et l'unicité de l'identifiant de facture généré à la volée. Si la règle se casse, deux commandes distinctes pourraient partager le même numéro de facture, ou le numéro pourrait être manquant ou vide, entraînant une rupture de traçabilité et de conformité comptable.

## Cas

```gherkin
Étant donné deux réservations distinctes confirmées et payées en ligne
Quand la facture PDF acquittée de chaque réservation est générée à la volée
Alors chaque facture PDF comporte obligatoirement un identifiant de facture non vide
Et l'identifiant de la première facture est strictement distinct de l'identifiant de la seconde facture
```

## Données

| Élément | Valeur |
|---|---:|
| Déclencheur | Confirmation du paiement bancaire |
| Identifiant de facture | Non nul, non vide (ex: `FACT-2026-00123`) |
| Propriété requise | Unicité garantie par réservation |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Présence de l'identifiant | Identifiant présent et non vide sur le PDF | Exigence AC-1 |
| Unicité entre factures | Deux identifiants distincts ($ID_1 \neq ID_2$) | Traçabilité unique par commande |

## Ce que ce cas ne vérifie pas

- le contenu détaillé des lignes tarifaires (couvert par `CASE-FAC-704`, `CASE-FAC-705`) ;
- la transmission du courriel SMTP (couvert par `CASE-FAC-714`) ;
- la gestion d'un paiement en attente ou échoué (couvert par `CASE-FAC-720`, `CASE-FAC-722`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_707_presence_obligatoire_et_unicite_identifiant_facture_pdf`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test déclenche la génération d'une facture après validation d'un paiement.
- [ ] Le test vérifie que le document PDF contient un identifiant de facture non vide.
- [ ] Le test génère deux factures pour deux réservations distinctes et vérifie qu'elles possèdent deux identifiants uniques différents.
- [ ] Le nom du test contient `CASE_FAC_707`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
