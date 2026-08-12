## SPEC-<DOM>-03 — <Reserver une sortie>

**Exigence :** REQ-0xx
**Statut :** brouillon | revue IA faite | validée
**Version :** v1

### Règle

Une phrase, à l'indicatif, qui dit ce qui doit être vrai. Pas de « le système
pourrait », pas de « idéalement ».

> Dés l'arrivé du client sur le site, il doit pouvoir consulter les créneau disponible et effectuer une reservation jusqu'a son paiment.


### Portée

Ce que cette spécification couvre, et surtout **ce qu'elle ne couvre pas**. Nommer
explicitement les cas voisins traités ailleurs, avec leur ID.

- Ne couvre pas la facturation
- Couvre du lieu au paiment

### Scénarios nominaux

```gherkin
Étant donné un client arrivé sur le site
Quand il consulte les disponibilités pour la semaine du 12 juillet
Alors seuls les créneaux avec au moins une place libre sont proposés
Et chaque créneau affiche sa date, son heure et son prix
```
```gherkin
Étant donné un client arrivé sur le site
Et un créneau « Sortie baleine » disponible le 12 juillet à 10h00 à 60 €
Quand le client sélectionne ce créneau
Et renseigne 2 participants
Et procède au paiement de 120 €
Alors la réservation est enregistrée à l'état « payée »
Et le créneau affiche 2 places de moins
```
### Cas limites

Un cas limite par ligne, avec le comportement attendu. C'est la partie qui
distingue une spécification d'une intention.

| # | Situation | Comportement attendu |
|---|---|---|
| 1 | réservation de la dernière place restante du créneau | réservation acceptée, le créneau passe à l'état « complet » et n'est plus proposé |
| 2 | réservation d'un groupe correspondant exactement au nombre de places libres | réservation acceptée pour la totalité des participants, aucune place restante |
| 3 | créneau devenu complet entre l'affichage et la validation | réservation refusée, aucune place décomptée, message invitant à choisir un autre créneau |
| 4 | paiement refusé ou interrompu | réservation non enregistrée, la ou les places restent disponibles pour un autre client |
| 5 | créneau déjà passé (date/heure antérieure au moment présent) | créneau non proposé, toute tentative de réservation refusée |
| 6 | nombre de participants supérieur aux places restantes | réservation refusée, aucune place décomptée |
| 7 | nombre de participants nul ou négatif | réservation refusée, saisie signalée comme invalide |
| 8 | double soumission (double-clic / rafraîchissement) sur la même réservation | une seule réservation enregistrée, un seul paiement encaissé |

### Ce qui n'est pas défini

Assumé et daté. Une zone grise déclarée vaut mieux qu'une zone grise ignorée.

- Chaque créneau possède un nombre de places fixe, connu à l'avance ; ce stock est décrémenté à la réservation et n'est pas modifiable en cours de créneau. *(hypothèse retenue le 2026-08-12, en attente de confirmation client)*

### Critères d'acceptation

Chacun doit être vérifiable sans interprétation, et donne lieu à au moins un cas
de test.

- [ ] AC-1 — À l'arrivée sur le site, seuls les créneaux ayant au moins une place libre sont proposés, et chacun affiche sa date, son heure et son prix. *(scénario nominal 1)*
- [ ] AC-2 — Une réservation payée est enregistrée à l'état « payée » et décrémente le nombre de places du créneau du nombre de participants réservés. *(scénario nominal 2)*
- [ ] AC-3 — La réservation de la dernière place fait passer le créneau à « complet », qui n'est alors plus proposé. *(cas limite 1)*
- [ ] AC-4 — Une réservation portant sur un nombre de participants égal aux places restantes est acceptée en totalité, sans place résiduelle. *(cas limite 2)*
- [ ] AC-5 — Une tentative de validation sur un créneau devenu complet est refusée avec le motif « créneau complet », sans décompter de place. *(cas limite 3)*
- [ ] AC-6 — Un paiement refusé ou interrompu n'enregistre aucune réservation et laisse les places disponibles pour un autre client. *(cas limite 4)*
- [ ] AC-7 — Le montant réglé est égal au nombre de participants multiplié par le prix du créneau ; tout écart empêche l'enregistrement de la réservation. *(scénario nominal 2)*

### Revue IA

Consigne utilisée :

> Analyse cette spécification. Recherche les ambiguïtés, contradictions,
> comportements non définis, cas limites oubliés et exigences impossibles à
> tester. Ne réécris pas la spécification.

| Remarque de l'IA | Décision | Motif |
|---|---|---|
| Le client n'est jamais identifié dans le parcours (nom / e-mail / compte) : impossible de savoir à qui appartient la réservation | acceptée | Gap réel ; identité du client à poser comme hypothèse dans « Ce qui n'est pas défini » |
| Scénario nominal 3 en doublon avec le cas limite 1 (« dernière place → complet ») | acceptée | Corrigé : scénario nominal 3 retiré |
| Paiement « magique » : passage direct à l'état « payée » sans étape intermédiaire | acceptée | Hypothèse de paiement synchrone à confirmer avec le client |
| Bornes manquantes : créneau passé, groupe > places libres, 0 participant, double soumission | acceptée | Corrigé : cas limites 5 à 8 ajoutés |
| Redondance cas limite 1 ≈ scénario nominal 3 | acceptée | Corrigé : même cause que le doublon ci-dessus, nominal 3 retiré |
| Montant payé jamais vérifié (montant = participants × prix) : sous-paiement indétectable | acceptée | Corrigé : AC-7 ajouté |
| AC-5 couplé à une formulation d'UI (« invite à choisir un autre créneau ») | acceptée | Corrigé : AC-5 reformulé avec le motif métier « créneau complet » |

Les refus se reportent aussi dans `docs/journal.md`.
