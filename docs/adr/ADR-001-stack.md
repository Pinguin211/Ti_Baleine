# ADR-001 — Choix de la stack technique

**Statut :** proposé
**Date :** J2
**Décidé par :** l'équipe
**Validation formateur :** requise avant la fin de J2

À rendre en fin de journée J2. Sans ADR-001 validé, l'équipe ne démarre pas la
conception technique.

---

## 1. Contraintes d'admissibilité

Les cinq sont éliminatoires. Cochez et justifiez ; une case non cochée invalide
le choix.

- [ ] **Déjà pratiquée par au moins deux membres de l'équipe.** Le module
      n'enseigne pas la technologie ; apprendre une stack en 10 jours consommera
      le temps de l'analyse et de la conception.
      → qui, et sur quoi l'ont-ils pratiquée : …
- [ ] **Runner de tests exécutable en une commande.**
      → la commande : `npx playwright test` 
- [ ] **Mécanisme de migration ou de schéma versionné.**
      → lequel : …
- [ ] **Intégration possible d'un prestataire de paiement.**
      → lequel, et sous quelle forme : Crédit Agricole, via API REST
- [ ] **Déployable dans la contrainte budgétaire du client** (`REQ-1xx`).
      → où, et pour combien par mois : …

## 2. Liste admise

Symfony/PHP · Next.js/TypeScript · Spring Boot/Java · ASP.NET

Hors liste : dérogation écrite ci-dessous, accordée ou refusée par le formateur.

**Demande de dérogation :** … *(laisser vide si sans objet)*

## 3. Contexte

Ce que le problème demande réellement : nature des données, transactions,
concurrence sur les places, volumétrie et pics, support d'usage, conditions
réseau, langues, maintenance après livraison. Citer les `REQ` concernées.

Le projet nécessite une application web de réservation de sorties en mer (`REQ-001`). Le parcours client exige une interface réactive et multilingue FR/EN (`REQ-002, REQ-101`),
accessible sur desktop, tablette et smartphone (`REQ-102`),
avec un masquage/blocage dynamique des créneaux complets ou clos à moins de 2h (`REQ-003, REQ-012`).

## 4. Options envisagées

### Option A — …

| | |
|---|---|
| Compétences de l'équipe | 2 membres expérimentés, 2 membres ayant des bases solides en React/TS. |
| Ce qu'elle facilite pour ce problème | Unification du langage (TypeScript) |
| Ce qu'elle coûte | Gestion rigoureuse des composants Server/Client pour éviter les fuites de logique. |
| Coût d'hébergement estimé | 1-10 €/mois (VPS) |
| Ce qu'elle rend difficile plus tard | … |

### Option B — …
| | |
|---|---|
| Compétences de l'équipe | Les membres de l'équipe ne pratiquent pas régulierèment la technologie.|
| Ce qu'elle facilite pour ce problème | Structure très cadrée, sécurité et intégration backend robuste. |
| Coût d'hébergement estimé | ~5 à 15 €/mois (VPS ou hébergement mutualisé). |
| Ce qu'elle coûte | 3 jours de remise à niveau en 10 jours de projet. |
| Ce qu'elle rend difficile plus tard | Nécessite la gestion de deux écosystèmes distincts si une SPA/interface dynamique est ajoutée. |

*(même grille)*

## 5. Décision

Nous choisissons la stack **Next.js / TypeScript**.

## 6. Raisons

Argumenter à partir du problème et des contraintes, pas à partir d'une préférence
générale. « C'est plus moderne » n'est pas une raison. « Le client n'a aucune
compétence technique et personne pour maintenir (`REQ-1xx`), donc nous choisissons
ce que deux d'entre nous savons déjà exploiter » en est une.

1. **Compétences disponibles :** Au moins deux membres maîtrisent la stack.
2. **Unification du langage :** TypeScript côté serveur et côté client.
3. **Coût d'hébergement :** VPS à 1-10 €/mois

## 7. Conséquences acceptées

- Nécessité de bien séparer le code métier de la couche de rendu Next.js pour garder une application testable.
- Montée en compétence rapide nécessaire pour les membres moins à l'aise avec TypeScript strict.

## 8. Ce qui nous ferait revenir dessus

- Découverte d'une incompatibilité bloquante entre le SDK/API REST de paiement du Crédit Agricole et Next.js/TypeScript.

---

> Le choix de la persistance ne se décide **pas** ici. Il fait l'objet de
> `ADR-002-persistance`, après la modélisation du domaine en J4 et le MCD/MLD en
> J5 — parce qu'on ne peut pas choisir un modèle de stockage avant de savoir ce
> qu'on stocke.
