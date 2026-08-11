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
