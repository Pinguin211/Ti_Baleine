# CASE-FAC-722 — Non-déclenchement de la facturation lorsque le paiement est au statut « en attente » (pending)

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-6`  
**Type :** sécurité / robustesse  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège contre l'émission prématurée d'une facture acquittée lorsque la passerelle de paiement retourne un statut intermédiaire « en attente » (ex: vérification bancaire en cours, 3D Secure non finalisé). La facture « Acquittée » ne doit être produite que sur validation ferme et définitive des fonds.

## Cas

```gherkin
Étant donné une transaction bancaire signalée avec un statut intermédiaire « en attente » (pending)
Quand le système traite l'état de la réservation
Alors la génération de la facture PDF acquittée reste suspendue
Et aucun courriel avec facture acquittée n'est transmis au client
Et aucun statut « envoyée avec succès » n'est persisté en base de données
```

## Données

| Élément | Valeur |
|---|---:|
| Statut du paiement bancaire | `en attente` (pending) |
| Confirmation finale | Non acquise |
| Effet sur la facturation | Aucune émission de facture acquittée |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Facture acquittée émise | 0 document | En attente de confirmation bancaire finale |
| Courriel de facturation | Non envoyé | Suspendu jusqu'à validation |

## Ce que ce cas ne vérifie pas

- la validation définitive qui suit la mise en attente (couvert par `CASE-FAC-700`) ;
- l'échec définitif (couvert par `CASE-FAC-720`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_722_non_declenchement_facturation_statut_paiement_en_attente`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test configure une réservation dont le paiement retourne le statut `pending`.
- [ ] Le test vérifie que la facturation n'est pas déclenchée.
- [ ] Le test vérifie l'absence de courriel de facture acquittée.
- [ ] Le test vérifie qu'aucun enregistrement d'émission réussie n'est inscrit en base.
- [ ] Le nom du test contient `CASE_FAC_722`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
