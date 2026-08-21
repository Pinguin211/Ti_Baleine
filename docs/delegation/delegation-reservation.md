# Plan de délégation — `SPEC-RESERVATION-03`

**Écrit avant de confier la première tâche à l'agent.** C'est une prévision, pas un
compte rendu. Écrit après coup, il ne vaut rien : on ne se souvient que de ce qui a
marché, et l'historique du dépôt est daté.

---

## Avant — le découpage

| # | Tâche | Test qui doit passer au vert | Ce que l'agent reçoit | Ce qu'il ne touche pas |
|---|---|---|---|---|
| 1 | Moteur de disponibilité des créneaux multi-sites : plannings des deux ports (Saint-Gilles 7h/10h/14h, Saint-Leu mardi/jeudi 9h00 uniquement), jauges par créneau (36 places standard, 24 places mardi/jeudi matin à Saint-Gilles — Grand Bleu seul, 12 places à Saint-Leu — Tikap), rotation des navires R-10, jours de fermeture annuelle 25/12 et 01/01 (R-02), clôture automatique des ventes 2 heures avant le départ appliquée côté serveur (R-11) | `CASE-RES-408`, `CASE-RES-409`, `CASE-RES-411`, `CASE-RES-412` | `specs/reservation.md`, `tests/cases/reservation/CASE-RES-408.md`, `CASE-RES-409.md`, `CASE-RES-411.md`, `CASE-RES-412.md`, `src/reservation/planning/` | - |
| 2 | Tunnel de réservation individuelle et calcul tarifaire automatique : grilles Saint-Gilles (Baleines 65 € / 40 €, Dauphins 50 € / 30 €), majoration géographique + 10 € / personne à Saint-Leu (75 € / 50 €, 60 € / 40 €), passage à l'état « payée » après confirmation CB et décrémentation immédiate de la jauge | `CASE-RES-400`, `CASE-RES-401`, `CASE-RES-405` | `specs/reservation.md`, `tests/cases/reservation/CASE-RES-400.md`, `CASE-RES-401.md`, `CASE-RES-405.md`, `src/reservation/tunnel/`, `src/reservation/tarification/` | - |
| 3 | Formules de privatisation demi-journée : forfaits fixes sans majoration géographique (Tikap 600 €, Grand Bleu 1 100 €), créneaux autorisés par navire (Tikap : mar/jeu matin dès 9h00 à Saint-Leu, après-midi dès 14h00 à Saint-Gilles ; Grand Bleu : Saint-Gilles), blocage de la totalité de la capacité du créneau et retrait de l'offre individuelle | `CASE-RES-403`, `CASE-RES-406` | `specs/reservation.md`, `tests/cases/reservation/CASE-RES-403.md`, `CASE-RES-406.md`, `src/reservation/privatisation/` | - |
| 4 | Validation des passagers et du formulaire de contact en mode invité : rejet immédiat des enfants de moins de 4 ans avec message d'inadmissibilité à bord (R-06), champs obligatoires nom / prénom / e-mail (AC-6), numéro de téléphone mobile obligatoire et contrôle de format (Contrainte 20), blocage de l'accès à l'étape de paiement tant que le formulaire est invalide | `CASE-RES-407`, `CASE-RES-410`, `CASE-RES-415` | `specs/reservation.md`, `tests/cases/reservation/CASE-RES-407.md`, `CASE-RES-410.md`, `CASE-RES-415.md`, `src/reservation/validation/` | - |
| 5 | Intégrité de la jauge et concurrence au paiement : refus d'une demande supérieure aux places restantes avec message du maximum disponible, vente de la dernière place et passage du créneau à l'état « complet » retiré de l'offre, aucune réservation ni décompte en cas de rejet bancaire ou d'abandon, verrouillage temporaire des places pendant la fenêtre de paiement (timer 10 min — hypothèse, paramétrable) et libération automatique à expiration | `CASE-RES-413`, `CASE-RES-414`, `CASE-RES-416`, `CASE-RES-417` | `specs/reservation.md`, `tests/cases/reservation/CASE-RES-413.md`, `CASE-RES-414.md`, `CASE-RES-416.md`, `CASE-RES-417.md`, `src/reservation/jauge/` | - |
| 6 | Affichage de la mention d'avertissement sur les créneaux sous alerte de pré-annulation restés ouverts à la vente : présence de la mention avant et après réservation (AC-7 — l'émission de l'alerte elle-même relève de `SPEC-ADMIN-06` et est posée en précondition ; seule la *présence* de la mention est vérifiée, sa formulation n'étant pas validée par la direction) | `CASE-RES-402` | `specs/reservation.md`, `tests/cases/reservation/CASE-RES-402.md`, `src/reservation/alerte/` | - |
| 7 | Bascule bilingue français/anglais à chaque étape du tunnel sans perte des données saisies (port, créneau, passagers, coordonnées, montant), sans stockage d'indicateur de langue en base (AC-1) | `CASE-RES-404` | `specs/reservation.md`, `tests/cases/reservation/CASE-RES-404.md`, `src/reservation/i18n/`, `src/reservation/tunnel/` | - |

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
| 6 | | |
| 7 | | |

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
