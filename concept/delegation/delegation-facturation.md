# Plan de délégation — `SPEC-FAC-02`

**Écrit avant de confier la première tâche à l'agent.** C'est une prévision, pas un
compte rendu. Écrit après coup, il ne vaut rien : on ne se souvient que de ce qui a
marché, et l'historique du dépôt est daté.

---

## Avant — le découpage

| # | Tâche | Test qui doit passer au vert | Ce que l'agent reçoit | Ce qu'il ne touche pas |
|---|---|---|---|---|
| 1 | Moteur de rendu et génération de la facture PDF acquittée à la volée en mémoire (identifiant unique `FACT-YYYY-XXXXX`, mention « Acquittée », horaire strict sans zéro initial `9h00`, port, ventilation détaillée adultes/enfants, majoration géographique Saint-Leu +10 € / pers, privatisation forfaitaire 600 € sans majoration, sans persistance sur disque) | `CASE-FAC-702`, `CASE-FAC-703`, `CASE-FAC-704`, `CASE-FAC-705`, `CASE-FAC-706`, `CASE-FAC-707`, `CASE-FAC-708`, `CASE-FAC-709`, `CASE-FAC-710`, `CASE-FAC-711`, `CASE-FAC-712`, `CASE-FAC-713` | `specs/facturation.md`, `tests/cases/facturation/CASE-FAC-702.md` à `CASE-FAC-713.md`, `src/facturation/pdf/` | - |
| 2 | Service d'envoi du courriel transactionnel avec pièce jointe PDF en mémoire et récapitulatif complet de commande dans le corps du message (gestion passive des rebonds sans canal SMS ni boucle infinie) | `CASE-FAC-714`, `CASE-FAC-715`, `CASE-FAC-716`, `CASE-FAC-719` | `specs/facturation.md`, `tests/cases/facturation/CASE-FAC-714.md`, `CASE-FAC-715.md`, `CASE-FAC-716.md`, `CASE-FAC-719.md`, `src/facturation/email/` | - |
| 3 | Persistance de la traçabilité de facturation en base de données : enregistrement du statut d'émission (« envoyée avec succès » / « échec d'émission ») avec horodatage suite à l'envoi SMTP | `CASE-FAC-717`, `CASE-FAC-718` | `specs/facturation.md`, `tests/cases/facturation/CASE-FAC-717.md`, `CASE-FAC-718.md`, `src/facturation/repository/` | - |
| 4 | Handler d'événements de paiement : filtrage des transactions non validées (rejet, échec, abandon/timeout, en attente) et verrouillage idempotent par vérification du statut en base contre les doublons de webhooks | `CASE-FAC-720`, `CASE-FAC-721`, `CASE-FAC-722`, `CASE-FAC-723` | `specs/facturation.md`, `tests/cases/facturation/CASE-FAC-720.md`, `CASE-FAC-721.md`, `CASE-FAC-722.md`, `CASE-FAC-723.md`, `src/facturation/handler.ts` | - |
| 5 | Orchestration et validation de bout en bout du pipeline post-paiement (réservation individuelle à Saint-Leu 150 € et privatisation forfaitaire demi-journée matin 600 €) | `CASE-FAC-700`, `CASE-FAC-701` | `specs/facturation.md`, `tests/cases/facturation/CASE-FAC-700.md`, `CASE-FAC-701.md`, `src/facturation/service.ts`, `tests/unit/facturation/` | - |

**Colonne 3.** Un identifiant `CASE`, pas une phrase. Si vous ne savez pas quel test
va changer d'état, la tâche est mal découpée — c'est le repère du module 07.

**Colonne 4.** Ce que l'agent reçoit : les fichiers, les spécifications, les cas de
test. Pas le dépôt entier.

**Colonne 5.** Ce qu'il n'a pas à modifier. Une colonne vide veut dire que vous
n'avez pas pensé au rayon d'action — or « l'agent modifie des fichiers que vous ne
lui avez pas désignés » est le premier des trois signaux de reprise en main.

---

## Après — ce qui s'est passé

Complété au rituel de 16h15, le même jour.

| # | Résultat | Ce qui a fait reprendre la main |
|---|---|---|
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |

| Résultat | Sens |
|---|---|
| `conforme` | la tâche a produit ce qui était prévu, le test attendu est passé au vert |
| `repris` | le résultat a demandé une intervention manuelle avant d'être gardé |
| `redécoupé` | la tâche a dû être scindée ou reformulée, puis relancée |
| `abandonné` | la tâche a été retirée à l'agent et faite à la main |

---

## Ce qui sera regardé

Pas le nombre de `conforme`. Ce qui se lit, c'est **l'écart entre ce que vous aviez
prévu et ce qui est arrivé, et le fait que vous l'ayez vu**.

Une équipe avec quatre `repris` qui sait dire pourquoi pilote mieux qu'une équipe
avec six `conforme` qui n'a rien observé.

C'est une des trois questions obligatoires de la présentation de J10.
