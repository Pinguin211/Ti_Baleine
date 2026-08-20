# CASE-FAC-721 — Non-déclenchement de la facturation lors d'un abandon ou d'une expiration de session de paiement de l'acompte ou du solde (Timeout bancaire)

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-7`, `Cas limite #3`  
**Type :** sécurité / robustesse  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège le système contre la génération intempestive de factures (d'acompte ou de solde) lors d'un abandon volontaire par le client (fermeture de l'onglet/navigateur) ou lors de l'expiration du délai de session de paiement (timeout passerelle bancaire), que l'abandon survienne pendant le règlement de l'acompte ou pendant celui du solde.

## Cas

```gherkin
Étant donné une session de paiement de l'acompte ou du solde initiée
Quand le client abandonne la saisie bancaire ou que le délai de session de paiement expire sans confirmation
Alors le système ne déclenche aucune génération de facture PDF (ni d'acompte, ni de solde) pour cette étape
Et aucun courriel transactionnel n'est expédié
Et aucun enregistrement d'émission de facture n'est créé en base de données pour cette étape
```

## Données

| Élément | Valeur |
|---|---:|
| Événement | Abandon utilisateur ou Expiration de session (Timeout) |
| Confirmation de paiement | Absente |
| Effet facturation attendu | Néant |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Factures générées | 0 | Paiement non confirmé |
| Courriels émis | 0 | Aucune notification de facturation |
| Statut d'émission | Inexistant | Aucune trace d'émission créée |

## Ce que ce cas ne vérifie pas

- le rejet explicite avec code erreur bancaire (couvert par `CASE-FAC-720`) ;
- le paiement confirmé (couvert par `CASE-FAC-700`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_721_non_declenchement_facturation_abandon_ou_expiration_session_paiement_acompte_ou_solde`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test simule une expiration de session de paiement bancaire lors du règlement de l'acompte, puis lors du règlement du solde.
- [ ] Le test vérifie qu'aucun flux PDF n'est généré en mémoire.
- [ ] Le test vérifie qu'aucun courriel n'est envoyé.
- [ ] Le test vérifie qu'aucune ligne d'état d'émission de facture n'est insérée en base.
- [ ] Le nom du test contient `CASE_FAC_721`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
