# CASE-FAC-723 — Traitement idempotent d'une notification de paiement reçue en double : vérification en base bloquant toute régénération et réexpédition

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-7`, `Cas limite #4`  
**Type :** robustesse / sécurité  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège le système contre les doublons d'émission de factures et les courriels multiples envoyés au client en cas de renvoi réseau ou réception multiple d'un webhook de paiement (idempotence). Si la règle se casse, un client recevrait plusieurs courriels et factures pour une seule et même commande payée.

## Cas

```gherkin
Étant donné une réservation dont le paiement a déjà été validé et dont la facture a déjà été marquée « envoyée avec succès » en base de données
Quand une notification de confirmation de paiement identique est reçue une seconde fois (webhook en doublon ou rejeu réseau)
Alors le système consulte l'indicateur d'émission déjà présent en base de données
Et le système bloque toute nouvelle génération de fichier PDF
Et le système bloque tout nouvel envoi de courriel au client
Et l'état d'émission en base reste unique sans création d'entrée en double
```

## Données

| Élément | Valeur |
|---|---:|
| État initial en base | Facture déjà émise avec statut `envoyée avec succès` |
| Événement entrant | Réception d'une 2nde confirmation de paiement pour la même réservation |
| Comportement attendu | Traitement idempotent (aucun effet secondaire répété) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Factures générées lors du doublon | 0 | Blocage par vérification préalable en base |
| Courriels envoyés lors du doublon | 0 | Blocage idempotent |
| Nombre total de courriels émis pour la réservation | Exactement 1 | Préservation de l'envoi unique initial |

## Ce que ce cas ne vérifie pas

- le premier envoi nominal (couvert par `CASE-FAC-700`, `CASE-FAC-717`) ;
- l'échec initial d'envoi SMTP (couvert par `CASE-FAC-718`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_723_traitement_idempotent_notification_paiement_recue_en_double`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test exécute un premier paiement complet avec génération et envoi de facture réussis.
- [ ] Le test envoie une deuxième notification de paiement identique pour la même réservation.
- [ ] Le test vérifie qu'aucun nouvel appel de génération PDF ni nouvel envoi SMTP n'a eu lieu.
- [ ] Le test vérifie que le statut en base demeure intègre et unique.
- [ ] Le nom du test contient `CASE_FAC_723`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
