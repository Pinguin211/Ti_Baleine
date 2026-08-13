# Journal de projet — équipe `<NOM>`

Une entrée par jour, remplie au créneau 16h15. Aucune rubrique ne reste vide sans
justification.

Ce document est la seule trace de ce que vous avez **refusé** à l'IA, et de ce que
vos **acceptations ont changé**. Deux des trois questions obligatoires de la
présentation de J10 y trouvent leur réponse — ou n'en trouvent pas.

Une critique acceptée qui n'a rien changé est une acceptation fictive. À J9, une
autre équipe ira le vérifier dans votre dépôt.

---

## Gabarit d'entrée

```markdown
## J<n> — <date>

**Présents.** …

**Décisions.**
- …

**Critiques de l'IA acceptées.**
- <ce qu'elle a signalé> → <ce que nous avons changé> — <fichier ou sha court>

**Critiques de l'IA refusées, et pourquoi.**
- <ce qu'elle a signalé> → refusé, car <raison métier ou de conception>

**Erreurs produites par l'IA et détectées.**
- <ce qu'elle a produit> → <comment nous l'avons repéré> → <correction>

**Ce qui a été généré aujourd'hui.**
- <fichiers ou portions> — commits <sha courts>

**Questions ouvertes pour le client.**
- …
```

Le rattachement de la ligne « acceptées » à un fichier ou un commit n'est pas
décoratif : c'est ce qui permet de distinguer un arbitrage d'un acquiescement.

---

## J1 — <10/08/2026>

**Présents.**
Loic, Thomas, Benjamin et Ivan.
**Décisions.**

**Critiques de l'IA acceptées.**
- Aucune : l'IA n'intervient pas en J1.

**Critiques de l'IA refusées, et pourquoi.**
- Sans objet.

**Erreurs produites par l'IA et détectées.**
- Sans objet.

**Ce qui a été généré aujourd'hui.**
- Rien.

**Questions ouvertes pour le client.**
- L'annulation d'une réservation doit-elle être faite par téléphone ou par l'application ?

## J2 — <11/08/2026>

**Présents.**
 Thomas, Benjamin et Ivan.
**Décisions.**
Redaction du cahier-des-charges-V1.md en se référent aux comptes-rendu-entretien-01.md et compte-rendu-entretien-02.md.
Redaction du cahier-des-charges-V2.md en se référent au cahier-des-charges-V1.md et des point-relevés.md.
Redaction de l'ADR-001-stack.md en se référent au cahier-des-charges-V2.md

Choix de la stack technique : Next.js / TypeScript. Voir ADR-001-stack.md.
**Critiques de l'IA acceptées.**
- Aucune : l'IA n'intervient pas en J2.

**Critiques de l'IA refusées, et pourquoi.**
- Sans objet.

**Erreurs produites par l'IA et détectées.**
- Sans objet.

**Ce qui a été généré aujourd'hui.**
- Rien.

**Questions ouvertes pour le client.**
- L'ajout de la gestion des annulations en back-office est-elle acceptable?

## J3 — <12/08/2026>

**Présents.**
 Loic, Thomas, Benjamin et Ivan.
**Décisions.**
Redaction du cahier-des-charges-V3.md en se référent au cahier-des-charges-V2.md et du compte-rendu-entretien-03.md.
Redaction des specs en se référent au cahier-des-charges-V3.md et plus précisement les éxigences fonctionnelles.
**Critiques de l'IA acceptées.**
- Aucune : l'IA n'intervient pas en J3.

**Critiques de l'IA refusées, et pourquoi.**
- Sans objet.

**Erreurs produites par l'IA et détectées.**
- Sans objet.

**Ce qui a été généré aujourd'hui.**
- Rien.

**Questions ouvertes pour le client.**

## J4 — 13/08/2026

**Présents.**
Loïc, Thomas, Benjamin et Ivan.

**Décisions.**
- Correction des champs `Exigence` des SPEC-ADMIN-01 à 05 (`specs/admin.md`) pour les faire pointer vers les REQ réels du cahier-des-charges-v3.md (REQ-013/REQ-014 pour l'annulation, REQ-015 pour la réduction) au lieu d'IDs vides ou incomplets.
- Retrait du seuil de « 48h avant le départ » des scénarios et cas limites d'annulation (SPEC-ADMIN-02) et de réduction (SPEC-ADMIN-03) : ce seuil n'est fondé sur aucune règle métier du CDC v3 et contredisait l'hypothèse retenue à la question ouverte Q1 (§11).
- Décision de soumettre au client, lors du prochain entretien (CR-04 à venir), l'idée de faire évoluer le modèle actuel (annulation/réduction exclusivement par appel téléphonique + saisie manuelle admin) vers davantage d'autonomie côté application, le double canal téléphone/application rendant impossible aujourd'hui la vérification fiable qu'une information (SMS, annulation) a bien été transmise et traitée.
- Passage des 5 SPEC-ADMIN à travers la consigne de revue IA standard (ambiguïtés, contradictions, comportements non définis, cas limites oubliés, exigences impossibles à tester), tableaux « Revue IA » remplis dans `specs/admin.md`.

**Critiques de l'IA acceptées.**
- Exigences manquantes ou incorrectes (`REQ-00`, `REQ-` vide, `REQ-0xx` non résolu) sur SPEC-ADMIN-02/03/04 → corrigées vers REQ-013/REQ-014, REQ-015, et signalement explicite de l'absence d'exigence fonctionnelle dédiée à l'authentification admin dans le CDC v3 → `specs/admin.md`
- Contenu des SPEC-ADMIN-01 et 05 encore rédigé pour un seul navire/port (« capacité du navire 12 ou 24 ») alors que le CDC v3 décrit un modèle multi-sites (Saint-Gilles/Saint-Leu, jauges 12/24/36 — R-10) → scénarios et cas limites mis à jour → `specs/admin.md`
- Tableaux « Cas limites » lacunaires (lignes vides `…`) sur les 5 SPEC-ADMIN → complétés → `specs/admin.md`
- Revue IA formelle des 5 SPEC-ADMIN : cas limites non résolus sans renvoi, chevauchement non déclaré entre SPEC-ADMIN-01 et SPEC-ADMIN-05, Portées incomplètes (affectation navire, recalcul du montant après réduction, canal téléphonique présenté à tort comme une contrainte système), cas limites oubliés liés au R-12 (mixité d'activité) et au format d'identifiant (Q8), titre `# SPEC-ADMIN-04` cassant la hiérarchie Markdown → corrigés → `specs/admin.md`

**Critiques de l'IA refusées, et pourquoi.**
- Cas limite proposé sur la consultation concurrente du planning par le même administrateur (SPEC-ADMIN-01) → refusé, un seul profil administrateur et un usage desktop mono-poste d'après le CDC v3, cas non exprimé par le client.
- AC-3 de SPEC-ADMIN-02 jugé non strictement vérifiable (prestataire SMS et seuil de délivrabilité non choisis) → refusé de le modifier maintenant, le flou porte sur l'implémentation déjà tracée en question ouverte (Q2) et en NFR (REQ-106), pas sur l'exigence elle-même.
- Cas limite proposé sur l'annulation groupée de plusieurs réservations en un seul appel (SPEC-ADMIN-02) → refusé, non mentionné dans les 3 comptes-rendus d'entretien.
- Cas limite proposé sur une « réduction » redemandant le même nombre de passagers (SPEC-ADMIN-03) → refusé, ergonomie mineure sans règle métier engagée.
- Cellule laissée en « … » sur le rafraîchissement temps réel du taux de remplissage (SPEC-ADMIN-05) → refusé de forcer une réponse, déjà correctement tracé en question ouverte juste en dessous.
- AC-1 de SPEC-ADMIN-05 jugé non strictement vérifiable (format pourcentage/fraction non tranché) → refusé de le reformuler maintenant, anticiperait une décision UI non prise.

**Erreurs produites par l'IA et détectées.**
- L'IA avait elle-même ajouté un cas limite « le client appelle exactement à 48h du départ » sur SPEC-ADMIN-02 lors d'une première passe, sans vérifier son fondement → détecté lors du croisement avec le cahier-des-charges-v3.md (aucune règle ne fixe ce seuil pour une annulation admin, et l'hypothèse de la Q1 §11 pose l'inverse) → corrigé en retirant le seuil et en rattachant le cas limite à la question ouverte Q1.
- Sur SPEC-ADMIN-03, l'IA avait proposé (et fait valider en Revue IA) un refus de la réduction à 0 passager, obligeant l'administrateur à repasser par l'écran d'annulation → erreur de conception détectée par l'équipe : le choix produit est d'avoir une seule logique back-end pour l'annulation et la réduction, donc une réduction à 0 doit déclencher directement l'annulation (état « annulée », libération des places, SMS) → corrigé dans `specs/admin.md` (cas limite #1, Portée, AC-3 de SPEC-ADMIN-03 ; note de cohérence ajoutée dans SPEC-ADMIN-02).

**Ce qui a été généré aujourd'hui.**
- `specs/admin.md` — corrections des exigences, cas limites complétés, 5 tableaux « Revue IA » remplis (non commité)
- `docs/cdc/cahier-des-charges-v3.md` — ajout de la question ouverte n°9 (§11) sur le transfert de fonctionnalités du téléphone vers l'application (non commité)
- `docs/journal.md` — présente entrée

**Questions ouvertes pour le client.**
- Cf. question n°9 ajoutée au §11 du `cahier-des-charges-v3.md` : le prestataire est-il ouvert à transférer une partie de l'annulation/réduction de passagers vers l'application plutôt que de tout gérer par téléphone + back-office, pour fiabiliser le suivi (SMS, annulations) ?

