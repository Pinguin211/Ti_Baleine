# Spécifications — Admin (back-office)

**Domaine :** `ADMIN`

---

## SPEC-ADMIN-01 — Consultation du planning

**Exigence :** REQ-009, REQ-010
**Statut :** brouillon
**Version :** V1

### Règle

> Le matin à 5h en arrivant sur le back-office, l'administrateur
> peut consulter le planning des réservations.


### Portée

- Ne couvre pas la décision d'annuler un départ sous le seuil de maintien :
  reste manuelle, hors système.
- Ne couvre pas l'authentification au back-office → `SPEC-ADMIN-0x` à venir.
- Ne couvre pas l'annulation d'une réservation et la remise à disposition
  d'une place libérée → `SPEC-ADMIN-02`.

### Scénarios nominaux

```gherkin
Scénario : Affichage de la liste des créneaux
  Étant donné l'administrateur connecté au back-office, depuis un poste de
  bureau
  Quand il ouvre l'écran planning
  Alors il voit la liste des créneaux (jour, heure parmi 7h, 10h, 14h, et le
  port de départ)

Scénario : Détail d'un créneau
  Étant donné un créneau affiché
  Quand l'administrateur le consulte
  Alors il voit le type de sortie affecté, le navire affecté (Tikap ou
  Grand Bleu), et le remplissage — nombre de places réservées sur la
  capacité du navire (12 ou 24)

```

### Cas limites

| # | Situation | Comportement attendu |
|---|---|---|
| 1 |  | … |
| 2 | | … |
| … | … | … |
| … | … | … |
| … | … | … |

### Ce qui n'est pas défini

- …

### Critères d'acceptation

- [ ] AC-1 — Le planning affiche les créneaux du jour avec navire, type de
      sortie et remplissage (`CASE-ADMIN-01`)

### Revue IA

Consigne utilisée :

> Analyse cette spécification. Recherche les ambiguïtés, contradictions,
> comportements non définis, cas limites oubliés et exigences impossibles à
> tester. Ne réécris pas la spécification.

| Remarque de l'IA | Décision | Motif |
|---|---|---|
| … | … | … |

Les refus se reportent aussi dans `docs/journal.md`.

---

## SPEC-ADMIN-02 — Annulation d'une réservation

**Exigence :** REQ-00
**Statut :** brouillon
**Version :**

### Règle

> L'administrateur est en conversation téléphonique avec un client qui souhaite annuler sa réservation.
> Il peut annuler la réservation et remettre la place à disposition.

### Portée

- Ne couvre pas l'annulation d'une réservation par le client : celle-ci est
  externe à l'application (par téléphone).
- Ne couvre pas le remboursement d'une réservation annulée : externe à
  l'application.

### Scénarios nominaux

```gherkin
Scénario : Annulation d'une réservation sur demande téléphonique
  Étant donné l'administrateur connecté au back-office 
  Quand 48h avant le départ, il reçoit un appel d'un client qui souhaite annuler sa réservation
  Alors il peut annuler la réservation
  Et la réservation passe à l'état « annulée »
  Et les places libérées sont remises à disposition sur l'interface de réservation
  Et le client est informé de l'annulation par SMS

```

### Cas limites

| # | Situation | Comportement attendu |
|---|---|---|
| 1 | le client appel 1h avant le départ | la réservation ne peut pas être annulée |
| 2 | la réservation à un nombre de passagers négatif | … |


### Ce qui n'est pas défini

- …

### Critères d'acceptation

- [ ] AC-1 — La réservation est passé à l'état « annulée » (`CASE-ADMIN-02`)
- [ ] AC-2 — Les places libérées sont remises à disposition sur l'interface de réservation (`CASE-ADMIN-03`)
- [ ] AC-3 — Le client est informé de l'annulation par SMS (`CASE-ADMIN-04`)


### Revue IA

Consigne utilisée :

> Analyse cette spécification. Recherche les ambiguïtés, contradictions,
> comportements non définis, cas limites oubliés et exigences impossibles à
> tester. Ne réécris pas la spécification.

| Remarque de l'IA | Décision | Motif |
|---|---|---|
| … | … | … |

Les refus se reportent aussi dans `docs/journal.md`.

---
## SPEC-ADMIN-03 — Réduction du nombre de passagers

**Exigence :** REQ-
**Statut :** brouillon
**Version :** v1

### Règle

> L'administrateur peut réduire le nombre de passagers d'une réservation existante.

### Portée 
- Ne couvre pas le remboursement du client pour la réduction du nombre de passagers : externe à l'application.

### Scénarios nominaux

```gherkin
Scénario : Réduction du nombre de passagers
  Étant donné l'administrateur connecté au back-office
    Quand il reçoit un appel d'un client qui souhaite réduire le nombre de passagers de sa réservation
    Alors il peut réduire le nombre de passagers
    Et le nombre de places réservées est mis à jour
    Et les places libérées sont remises à disposition sur l'interface de réservation
```
### Cas limites

| # | Situation | Comportement attendu |
|---|---|---|
| 1 | … | … |
| 2 | … | … |

### Ce qui n'est pas défini

- …

### Critères d'acceptation

- [ ] AC-1 — Le nombre de places réservées est mis à jour (`CASE-ADMIN-05`)
- [ ] AC-2 — Les places libérées sont remises à disposition sur l'interface de réservation (`CASE-ADMIN-06`)

### Revue IA
Consigne utilisée :

> Analyse cette spécification. Recherche les ambiguïtés, contradictions,
> comportements non définis, cas limites oubliés et exigences impossibles à
> tester. Ne réécris pas la spécification.

| Remarque de l'IA | Décision | Motif |
|---|---|---|
| … | … | … |

Les refus se reportent aussi dans `docs/journal.md`.

---

# SPEC-ADMIN-04 — Login administrateur
**Exigence :** REQ-0xx
**Statut :** brouillon
**Version :** v1

### Règle

> L'administrateur peut se connecter au back-office avec un identifiant et un mot de passe valides.

### Portée

- Ne couvre pas la gestion des mots de passe oubliés ou réinitialisés → `SPEC-ADMIN-0x` à venir.

### Scénarios nominaux

```gherkin
Scénario : Login administrateur
  Étant donné l'administrateur sur la page de connexion du back-office
  Quand il saisit un identifiant et un mot de passe valides
  Alors il est connecté au back-office et redirigé vers le planning des réservations
```
### Cas limites

| # | Situation | Comportement attendu |
|---|---|---|
| 1 | L'administrateur a oublié le mot de passe | Il ne peut pas se connecter au back-office|
| 2 | L'administrateur saisit un identifiant ou un mot de passe incorrect | Il ne peut pas se connecter au back-office|

### Ce qui n'est pas défini

- Quel est le comportement attendu en cas de tentatives de connexion multiples échouées
 (blocage du compte, délai d'attente, etc.) ?

### Critères d'acceptation

- [ ] AC-1 — L'administrateur peut se connecter au back-office avec un identifiant et un mot de passe valides (`CASE-ADMIN-07`)

### Revue IA
Consigne utilisée :

> Analyse cette spécification. Recherche les ambiguïtés, contradictions,
> comportements non définis, cas limites oubliés et exigences impossibles à
> tester. Ne réécris pas la spécification.

| Remarque de l'IA | Décision | Motif |
|---|---|---|
| … | … | … |

Les refus se reportent aussi dans `docs/journal.md`.

---

## SPEC-ADMIN-05 visualisation du taux de remplissage

**Exigence :** REQ-010 
**Statut :** brouillon
**Version :** v1

### Règle
> L'administrateur peut visualiser le taux de remplissage des créneaux sur le planning.

### Portée
- Ne couvre pas la modification du taux de remplissage → `SPEC-ADMIN-0x` à venir.

### Scénarios nominaux
```gherkin
Scénario : Visualisation du taux de remplissage
  Étant donné l'administrateur connecté au back-office
  Quand il consulte le planning des réservations
  Alors il peut voir le taux de remplissage de chaque créneau (nombre de places réservées / capacité totale)
```
### Cas limites
| # | Situation | Comportement attendu |
|---|---|---|
| 1 | Il y a plus de places réservées que la capacité du navire| Réservations bloqués après avoir ateinte le quota |
| 2 | … | … |

### Ce qui n'est pas défini

### Critères d'acceptation
- [ ] AC-1 — L'administrateur peut visualiser le taux de remplissage des créneaux sur le planning (`CASE-ADMIN-08`)

### Revue IA
Consigne utilisée :

> Analyse cette spécification. Recherche les ambiguïtés, contradictions,
> comportements non définis, cas limites oubliés et exigences impossibles à
> tester. Ne réécris pas la spécification.

| Remarque de l'IA | Décision | Motif |
|---|---|---|
| … | … | … |

Les refus se reportent aussi dans `docs/journal.md`.

---