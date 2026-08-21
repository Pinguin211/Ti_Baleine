# Plan de délégation — `SPEC-ADMIN-01` à `SPEC-ADMIN-08`

**Écrit avant de confier la première tâche à l'agent.** C'est une prévision, pas un
compte rendu. Écrit après coup, il ne vaut rien : on ne se souvient que de ce qui a
marché, et l'historique du dépôt est daté.

> **Mise à jour du 20/08/2026.** Le CDC v5 a ajouté `SPEC-ADMIN-08` (pointage et
> encaissement du solde par carte bancaire sur place) et deux compléments de
> portée à `SPEC-ADMIN-01` / `SPEC-ADMIN-02` (`CASE-ADMIN-074` à `080`), postérieurs
> au découpage initial des tâches 1 à 7. La tâche 8 est ajoutée et les tâches 1 et 2
> sont étendues ci-dessous, avant toute délégation à l'agent sur ce périmètre.

---

## Avant — le découpage

| # | Tâche | Test qui doit passer au vert | Ce que l'agent reçoit | Ce qu'il ne touche pas |
|---|---|---|---|---|
| 1 | Consultation du planning consolidé multi-sites et supervision opérationnelle (grille Desktop Saint-Gilles 7h/10h/14h et Saint-Leu mardi/jeudi 9h, détail des créneaux avec type d'activité et navires mobilisés Tikap/Grand Bleu, badge et indicateur visuel « Sous pré-alerte », gestion des états vides explicites, statuts distinctifs « non affecté » et « type non renseigné », accessibilité 24h/24, résilience réseau avec bouton de nouvel essai, maintien de l'affichage sous le seuil de rentabilité de 6 passagers sans annulation automatique, affichage le jour J du statut financier — badge « Payée complètement »/« Payée partiellement » et solde dû — de chaque réservation sur le détail d'un créneau, et bascule automatique de ce statut dès validation du webhook bancaire du solde réglé en ligne) | `CASE-ADMIN-001`, `CASE-ADMIN-002`, `CASE-ADMIN-003`, `CASE-ADMIN-004`, `CASE-ADMIN-005`, `CASE-ADMIN-006`, `CASE-ADMIN-007`, `CASE-ADMIN-008`, `CASE-ADMIN-009`, `CASE-ADMIN-077`, `CASE-ADMIN-078` | `specs/admin.md`, `tests/cases/admin/CASE-ADMIN-001.md` à `CASE-ADMIN-009.md`, `tests/cases/admin/CASE-ADMIN-077.md`, `tests/cases/admin/CASE-ADMIN-078.md`, `src/app/admin/planning/`, `src/components/domain/planning/`, `src/services/server/planning/`, `src/hooks/domain/planning/` | - |
| 2 | Service d'annulation totale de réservation et notification client par SMS (action technique de suppression intégrale des `BOOKING_ITEMS`, conservation de la réservation `BOOKINGS` avec 0 billet actif pour l'historique et la conformité comptable, libération synchrone immédiate des places sur la jauge, composition à la volée du SMS transactionnel selon motif sans persistance en base, gestion des erreurs d'envoi SMS et logs, règle temporelle autorisant l'annulation jusqu'à H-0 et rejet strict après départ échu, blocage sur réservation à 0 billet, atomicité transactionnelle et absence de remboursement financier automatique, plafonnement du remboursement indicatif à 0,00 € — sans complément réclamé au client — lorsque le montant déjà payé est insuffisant pour couvrir la pénalité du barème) | `CASE-ADMIN-010`, `CASE-ADMIN-011`, `CASE-ADMIN-012`, `CASE-ADMIN-013`, `CASE-ADMIN-014`, `CASE-ADMIN-015`, `CASE-ADMIN-016`, `CASE-ADMIN-017`, `CASE-ADMIN-018`, `CASE-ADMIN-019`, `CASE-ADMIN-020`, `CASE-ADMIN-021`, `CASE-ADMIN-022`, `CASE-ADMIN-079` | `specs/admin.md`, `tests/cases/admin/CASE-ADMIN-010.md` à `CASE-ADMIN-022.md`, `tests/cases/admin/CASE-ADMIN-079.md`, `src/actions/`, `src/services/server/cancellation/`, `src/schemas/validation/cancellation/`, `src/lib/sms/` | - |
| 3 | Service de réduction partielle de passagers et basculement automatique en annulation (suppression sélective de N billets adultes et/ou enfants `BOOKING_ITEMS`, libération synchrone immédiate des places correspondantes, contrôle strict des quantités contre les dépassements, basculement automatique vers la procédure complète d'annulation `SPEC-ADMIN-02` avec motif et SMS si le total de billets actifs restants atteint 0, interdiction formelle d'ajouter des billets ou de modifier la date/port, blocage sur réservation à 0 billet ou créneau échu, cohérence transactionnelle et absence de remboursement automatique) | `CASE-ADMIN-023`, `CASE-ADMIN-024`, `CASE-ADMIN-025`, `CASE-ADMIN-026`, `CASE-ADMIN-027`, `CASE-ADMIN-028`, `CASE-ADMIN-029`, `CASE-ADMIN-030`, `CASE-ADMIN-031`, `CASE-ADMIN-032`, `CASE-ADMIN-069` | `specs/admin.md`, `tests/cases/admin/CASE-ADMIN-023.md` à `CASE-ADMIN-032.md`, `tests/cases/admin/CASE-ADMIN-069.md`, `src/actions/`, `src/services/server/cancellation/`, `src/schemas/validation/cancellation/` | - |
| 4 | Module d'authentification administrateur, gestion des sessions et sécurisation des routes back-office (identifiant e-mail unique et mot de passe, rejet des champs vides et messages d'erreur génériques, protection anti-bruteforce par temporisation, persistance de session active inter-pages et rechargement F5, déconnexion manuelle explicite et expiration automatique sur inactivité, interception et redirection stricte des accès non authentifiés vers la mire de connexion, profil administrateur unique sans création de sous-comptes) | `CASE-ADMIN-033`, `CASE-ADMIN-034`, `CASE-ADMIN-035`, `CASE-ADMIN-036`, `CASE-ADMIN-037`, `CASE-ADMIN-038`, `CASE-ADMIN-039`, `CASE-ADMIN-040`, `CASE-ADMIN-070`, `CASE-ADMIN-071` | `specs/admin.md`, `tests/cases/admin/CASE-ADMIN-033.md` à `CASE-ADMIN-040.md`, `tests/cases/admin/CASE-ADMIN-070.md`, `tests/cases/admin/CASE-ADMIN-071.md`, `src/actions/`, `src/app/admin/`, `src/lib/server/auth/`, `src/schemas/validation/auth/` | - |
| 5 | Moteur de calcul et visualisation en temps réel des jauges et taux de remplissage par créneau (décompte dynamique `COUNT(BOOKING_ITEMS)`, adaptation des jauges selon site et horaire : 12 places Saint-Leu mardi/jeudi 9h, 24 places Saint-Gilles mardi/jeudi 7h/10h, 36 places standard Saint-Gilles et 14h, affichage 0 % / 0 place réservée, créneau complet 100 % avec badge « Complet », affichage spécifique pour navire privatisé bloquant toute la jauge, recalcul immédiat en temps réel post-annulation/réduction) | `CASE-ADMIN-041`, `CASE-ADMIN-042`, `CASE-ADMIN-043`, `CASE-ADMIN-044`, `CASE-ADMIN-045`, `CASE-ADMIN-046`, `CASE-ADMIN-047`, `CASE-ADMIN-072` | `specs/admin.md`, `tests/cases/admin/CASE-ADMIN-041.md` à `CASE-ADMIN-047.md`, `tests/cases/admin/CASE-ADMIN-072.md`, `src/app/admin/planning/`, `src/components/domain/planning/`, `src/components/domain/capacity/`, `src/services/server/planning/`, `src/services/server/capacity/`, `src/hooks/domain/capacity/` | - |
| 6 | Envoi groupé d'alertes de pré-annulation multi-créneaux la veille à 18h et diffusion bilingue FR/EN (sélection groupée de créneaux du lendemain à Saint-Gilles et/ou Saint-Leu, choix des canaux SMS / E-mail / combiné, sélection de templates bilingues types codés en dur avec personnalisation libre du motif, composition et diffusion obligatoire d'un message bilingue combiné FR + EN unique à tous les réservataires, basculement automatique et idempotent des créneaux au statut « sous pré-alerte » avec mention d'avertissement en ligne, contrôles de validation contre sélection vide ou corps vide, gestion des créneaux sans réservation et journalisation des échecs individuels sans blocage de file) | `CASE-ADMIN-048`, `CASE-ADMIN-049`, `CASE-ADMIN-050`, `CASE-ADMIN-051`, `CASE-ADMIN-052`, `CASE-ADMIN-053`, `CASE-ADMIN-054`, `CASE-ADMIN-055`, `CASE-ADMIN-056`, `CASE-ADMIN-057`, `CASE-ADMIN-058`, `CASE-ADMIN-059`, `CASE-ADMIN-060`, `CASE-ADMIN-061`, `CASE-ADMIN-073` | `specs/admin.md`, `tests/cases/admin/CASE-ADMIN-048.md` à `CASE-ADMIN-061.md`, `tests/cases/admin/CASE-ADMIN-073.md`, `src/actions/`, `src/services/server/alerts/`, `src/schemas/validation/alerts/`, `src/lib/sms/`, `src/lib/email/` | - |
| 7 | Configuration, disponibilité et affectation des créneaux horaires (fermeture administrative manuelle avec masquage immédiat sur le site public, réouverture manuelle d'un créneau fermé, affectation du type d'activité et des navires mobilisés, contrôle strict d'exclusivité d'activité interdisant la mixité par navire, prévention des conflits du naturaliste unique sur sorties Baleines simultanées sur sites distants, cloisonnement de sécurité interdisant l'accès client aux réglages) | `CASE-ADMIN-062`, `CASE-ADMIN-063`, `CASE-ADMIN-064`, `CASE-ADMIN-065`, `CASE-ADMIN-066`, `CASE-ADMIN-067`, `CASE-ADMIN-068` | `specs/admin.md`, `tests/cases/admin/CASE-ADMIN-062.md` à `CASE-ADMIN-068.md`, `src/actions/`, `src/services/server/slots/`, `src/schemas/validation/slots/` | - |
| 8 | Pointage et encaissement du solde par carte bancaire sur place le jour J (validation de l'encaissement CB à l'embarcadère pour toute réservation « payée partiellement », bascule synchrone vers « payée complètement », solde ramené à 0,00 €, déclenchement de la génération et de l'envoi de la facture de solde distincte PDF en réutilisant sans le modifier le service de facturation existant `SPEC-FAC-02`, blocage strict sur réservation déjà soldée, rejet de tout encaissement en espèces ou en chèques vacances, résilience à une perte de connexion réseau en cours de validation avec conservation de l'état antérieur) | `CASE-ADMIN-074`, `CASE-ADMIN-075`, `CASE-ADMIN-076`, `CASE-ADMIN-080` | `specs/admin.md`, `tests/cases/admin/CASE-ADMIN-074.md` à `CASE-ADMIN-076.md`, `tests/cases/admin/CASE-ADMIN-080.md`, `src/actions/`, `src/services/server/payment/`, `src/schemas/validation/payment/` (lecture seule, sans modification : `src/actions/emettre-facture-apres-paiement.ts`, `src/services/server/generer-facture-pdf.ts`) | - |

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
| 8 | | |

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
