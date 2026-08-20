# CASE-FAC-723 — Traitement idempotent d'une notification de paiement reçue en double, contrôlé indépendamment pour la facture d'acompte et la facture de solde

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-8`, `Cas limite #4`  
**Type :** robustesse / sécurité  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège le système contre les doublons d'émission de factures et les courriels multiples envoyés au client en cas de renvoi réseau ou réception multiple d'un webhook de paiement (idempotence), pour l'acompte comme pour le solde, chacun étant contrôlé indépendamment via son propre indicateur en base. Si la règle se casse, un client recevrait plusieurs courriels et factures pour une seule et même étape de paiement, ou le blocage d'un doublon d'acompte bloquerait à tort l'émission légitime de la facture de solde.

## Cas

```gherkin
Étant donné une réservation dont le paiement de l'acompte a déjà été validé et dont la facture d'acompte a déjà été marquée « envoyée avec succès » en base de données
Quand une notification de confirmation de paiement d'acompte identique est reçue une seconde fois (webhook en doublon ou rejeu réseau)
Alors le système consulte l'indicateur d'émission de la facture d'acompte déjà présent en base de données
Et le système bloque toute nouvelle génération de fichier PDF d'acompte et tout nouvel envoi de courriel correspondant
Et l'état d'émission de la facture d'acompte en base reste unique sans création d'entrée en double
Quand le solde est ensuite réglé pour la première fois
Alors le système déclenche normalement la génération et l'envoi de la facture de solde, l'indicateur de solde étant contrôlé indépendamment de celui de l'acompte
```

## Données

| Élément | Valeur |
|---|---:|
| État initial en base | Facture d'acompte déjà émise avec statut `envoyée avec succès` |
| Événement entrant | Réception d'une 2nde confirmation de paiement d'acompte pour la même réservation |
| Indicateur de solde | Distinct de l'indicateur d'acompte, non affecté par le doublon |
| Comportement attendu | Traitement idempotent indépendant par type de facture (aucun effet secondaire répété) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Factures d'acompte générées lors du doublon | 0 | Blocage par vérification préalable de l'indicateur d'acompte en base |
| Courriels d'acompte envoyés lors du doublon | 0 | Blocage idempotent |
| Nombre total de courriels d'acompte émis pour la réservation | Exactement 1 | Préservation de l'envoi unique initial |
| Émission de la facture de solde | Non bloquée par le doublon d'acompte | Indicateurs d'émission distincts et indépendants |

## Ce que ce cas ne vérifie pas

- le premier envoi nominal (couvert par `CASE-FAC-700`, `CASE-FAC-717`) ;
- l'échec initial d'envoi SMTP (couvert par `CASE-FAC-718`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_723_traitement_idempotent_notification_paiement_double_acompte_et_solde_independants`  
**Fichier :** `tests/tests-unitaires/facturation/CASE-FAC-723.test.ts`

## Revue du test automatisé

- [ ] Le test exécute un premier paiement d'acompte complet avec génération et envoi de facture d'acompte réussis.
- [ ] Le test envoie une deuxième notification de paiement d'acompte identique pour la même réservation.
- [ ] Le test vérifie qu'aucun nouvel appel de génération PDF ni nouvel envoi SMTP n'a eu lieu pour l'acompte.
- [ ] Le test vérifie que le statut d'émission de l'acompte en base demeure intègre et unique.
- [ ] Le test règle ensuite le solde et vérifie que la facture de solde est bien générée et envoyée normalement, sans être bloquée par le doublon d'acompte.
- [ ] Le nom du test contient `CASE_FAC_723`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
