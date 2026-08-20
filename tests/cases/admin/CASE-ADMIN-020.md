# CASE-ADMIN-020 — Gestion d'un échec temporaire de la passerelle SMS lors de l'annulation

**Spécification :** `SPEC-ADMIN-02`  
**Critère d'acceptation :** `Cas limite #5`  
**Type :** robustesse  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège le déroulement de l'annulation en cas de défaillance externe du fournisseur SMS (ex: timeout de l'API SMS). L'annulation des places reste effective et l'administrateur est notifié du défaut de transmission externe.

## Cas

```gherkin
Étant donné l'administrateur annulant une réservation valide
Et la passerelle SMS renvoyant une erreur HTTP 500 (panne temporaire du prestataire SMS)
Quand la demande d'annulation est soumise
Alors les billets sont supprimés en base et les places libérées
Et l'incident SMS est notifié dans l'interface de l'administrateur pour suivi manuel
```

## Données

| Élément | Valeur |
|---|---:|
| Passerelle SMS | Réponse HTTP 500 / Timeout |
| Opération | Annulation de réservation |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Suppression billets en BDD | Validée | Opération locale réussie |
| Notification admin | Bannière d'avertissement 'Échec d'envoi SMS' | Cas limite #5 SPEC-ADMIN-02 |

## Ce que ce cas ne vérifie pas

- l'échec d'envoi de facture PDF (couvert par le domaine FACTURATION) ;
- la coupure réseau de la BDD locale (couvert par `CASE-ADMIN-021`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_020_gestion_echec_temporaire_passerelle_sms_annulation`  
**Fichier :** tests/tests-unitaires/admin/case-admin-020.test.ts

## Revue du test automatisé

- [ ] Le test simule une panne de l'API externe SMS (mock 500).
- [ ] Le test valide l'annulation locale des billets.
- [ ] Le test vérifie que l'UI affiche une notification d'échec d'envoi SMS.
- [ ] Le nom du test contient `CASE_ADMIN_020`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
