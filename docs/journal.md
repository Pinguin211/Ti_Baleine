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

## J5 — 17/08/2026

**Présents.**
Équipe RageGit - KohLanta.

**Décisions.**
- Reformulation de REQ-020 dans le CDC v4 : le motif d'annulation est saisi à la volée pour composer le SMS client, sans persistance en base — aligné avec le comportement déjà décrit dans SPEC-ADMIN-02.
- Correction de la matrice de traçabilité : retrait de REQ-012 sur SPEC-ADMIN-05, ajout de REQ-019 sur SPEC-ADMIN-06, exemple en tête et chemin CDC v4 corrigés.

**Critiques de l'IA acceptées.**
- REQ-012 incorrectement rattachée à SPEC-ADMIN-05 dans `docs/traceability.md` → retirée ; REQ-012 reste sur SPEC-RESERVATION-03 uniquement → `docs/traceability.md`
- REQ-019 absente de la ligne SPEC-ADMIN-06 alors que la spec la couvre déjà (AC-4) → ajoutée dans la matrice et l'en-tête de spec → `docs/traceability.md`, `specs/admin.md`
- Formulation CDC v4 de REQ-020 (« consigne en back-office ») en contradiction avec la spec (motif pour SMS, non persisté) → reformulée → `docs/cdc/cahier-des-charges-v4.md`, `docs/impact-CR-004.md`, `specs/admin.md`

**Critiques de l'IA refusées, et pourquoi.**
- Chevauchement SPEC-ADMIN-01 / SPEC-ADMIN-05 sur REQ-010 → non traité : correction retirée du périmètre, les deux specs restent telles quelles.

**Erreurs produites par l'IA et détectées.**
- Sans objet.

**Ce qui a été généré aujourd'hui.**
- `docs/traceability.md` — corrections matrice, exemple, chemin CDC v4, notes REQ-012/019/020
- `docs/cdc/cahier-des-charges-v4.md` — reformulation REQ-020
- `specs/admin.md` — clarification REQ-020 (SPEC-ADMIN-02), REQ-019 (SPEC-ADMIN-06)
- `docs/impact-CR-004.md` — alignement description REQ-020
- `docs/journal.md` — présente entrée

**Questions ouvertes pour le client.**
- Sans objet.

## J6 — 18/08/2026

**Présents.**
Thomas et Benjamin (seuls contributeurs tracés au dépôt ce jour-là).

**Décisions.**
- Rédaction de `specs/architecture.md` : `SPEC-ARCH-01` (30 lignes utiles maximum par fonction `.ts`, mono-composant strict par fichier `.tsx`, plafond de 500 lignes par fichier, dérogation TSDoc `@need_more_lines - "motif"`, conventions de casse), `SPEC-ARCH-02` (arborescence modulaire sous `src/`, étanchéité serveur/client, matrice d'imports unidirectionnelle) et `SPEC-ARCH-03` (génération systématique de `reports/arch-compliance-report.md`) — c8f4af6, 9e2e89b.
- Correction de l'étanchéité du module `env/` : séparation explicite de `env/client.ts` et `env/server.ts` dans la matrice, interdiction faite aux hooks React d'importer `env/server.ts`, isomorphisme strict de `schemas/` (aucun import de `env/`, pattern factory obligatoire pour toute valeur d'environnement) — 2feaea8.
- Adoption de Vitest pour l'unitaire et l'intégration, Playwright pour l'E2E, inscrite dans `ADR-001-stack.md` ; initialisation de la configuration et déclaration de la balise personnalisée `@need_more_lines` dans `tsdoc.json` — 04d7df6, 0960dc5, def583b.
- Automatisation de l'audit d'architecture : 28 cas `CASE-ARCH-1000` à `1027` et leurs tests, analyse AST via `ts-morph` — 9e18a8f, 9e2e89b, def583b.
- Écriture des trois plans de délégation par domaine : architecture, facturation et réservation — 664d995, 8e7332c, 52f9af0.
- Pose de l'intégralité des cas de test métier : 80 cas `CASE-ADMIN`, 24 cas `CASE-FAC`, 22 cas `CASE-RES`, avec leurs sommaires — 1ef5390, db49254, 230175a.
- Alignement de la configuration Docker sur le devcontainer VS Code et suppression de `tools/traceability.sh`, devenu inutile depuis `docs/traceability.md` — e0a5c67, e8ac8d9.

**Critiques de l'IA acceptées.**
- Matrice d'imports traitant `env/` comme un module unique, ce qui autorisait implicitement un hook client à atteindre les secrets serveur → scindée en deux lignes distinctes `env/client.ts` et `env/server.ts`, avec périmètres de consommateurs séparés → `specs/architecture.md` — 2feaea8
- `hooks/` autorisé à importer `services/` et `env/` sans distinction → restreint à `services/client/` et `env/client.ts` uniquement → `specs/architecture.md` — 2feaea8
- `schemas/` autorisé à importer `env/`, ce qui liait la couche de validation à un environnement d'exécution → interdiction formelle et imposition du pattern factory dynamique (`createBookingSchema(options)`), l'appelant injectant la valeur → `specs/architecture.md` — 2feaea8
- Absence de règle de vérification opposable aux deux specs d'architecture → ajout de `SPEC-ARCH-03` et du gabarit normalisé du rapport d'audit (synthèse chiffrée par spécification, répertoire exhaustif des fichiers en faute avec ligne, règle et cas de test) — 9e2e89b

**Critiques de l'IA refusées, et pourquoi.**
- Aucune tracée dans le dépôt pour cette journée : elle porte sur la rédaction initiale de `SPEC-ARCH-01/02/03` et sur la pose des cas de test, où les remarques de l'IA ont toutes été retenues ou reformulées. À compléter par l'équipe si un arbitrage oral non commité a eu lieu.

**Erreurs produites par l'IA et détectées.**
- La première version de `SPEC-ARCH-02` fusionnait `env/client.ts` et `env/server.ts` en une seule ligne de matrice et laissait `schemas/` libre d'importer `env/` : la règle telle qu'écrite permettait à un hook exécuté dans le navigateur d'atteindre les variables serveur privées, et rendait la couche Zod dépendante de l'environnement → repéré à la relecture croisée de la matrice et de la règle d'étanchéité → corrigé le jour même (matrice scindée, interdiction `schemas/` → `env/`, pattern factory, trois scénarios Gherkin ajoutés) — 2feaea8.

**Ce qui a été généré aujourd'hui.**
- `specs/architecture.md` (SPEC-ARCH-01, 02, 03) — c8f4af6, 9e2e89b, 2feaea8
- `tests/cases/architecture/CASE-ARCH-1000.md` à `1027.md` + `sommaire.md` — 9e18a8f, 9e2e89b
- `tests/tests-unitaires/architecture/**` (tests et helpers AST), `vitest.config.ts`, `tsdoc.json` — def583b, 0960dc5
- `docs/delegation/delegation-architecture.md`, `delegation-facturation.md`, `delegation-reservation.md` — 664d995, 8e7332c, 52f9af0
- `tests/cases/admin/CASE-ADMIN-001.md` à `073.md` + `sommaire.md` — 1ef5390
- `tests/cases/facturation/CASE-FAC-700.md` à `723.md` + `sommaire.md` — db49254
- `tests/cases/reservation/CASE-RES-400.md` à `421.md` + `sommaire.md` — 230175a
- `docs/adr/ADR-001-stack.md` (ajout Vitest / Playwright) — 04d7df6
- `docker-compose.yml` (devcontainer), suppression de `tools/traceability.sh` — e0a5c67, e8ac8d9
- `docs/journal.md` — présente entrée

**Questions ouvertes pour le client.**
- Sans objet : journée à dominante technique interne (architecture, outillage de test), aucune nouvelle question métier soulevée.

## J7 — 19/08/2026

**Présents.**
Loïc, Thomas, Benjamin et Ivan.

**Décisions.**
- Entretien n° 5 : le client acte le **paiement en deux temps** (acompte obligatoire à la réservation, solde réglé ensuite), fondement de tout le modèle financier du projet — bd77148, 83aa948.
- Correction de la politique de remboursement sur retour client (question Q01) : le remboursement se calcule sur le **montant total** de la réservation (barème RM-07/08/09), **plafonné aux sommes déjà perçues** et sans jamais réclamer de complément au client (RM-55, corrige RM-52) — 7b5e5d6.
- Analyse d'impact `docs/impact-CR-005.md` puis publication du **CDC v5**, et répercussion sur l'ensemble des specs, `specs/reservation.md` en tête — d4918d3, 3219335, 70020a6.
- Adoption d'un gabarit unique pour les prompts de génération de code (`docs/prompt/prompt-gabarit-code.md`), pendant du gabarit de test — a8d9494, ed81501.
- Mise en place de la commande d'audit `npm run arch:report` et de `scripts/arch-audit.ts`, qui matérialise `SPEC-ARCH-03` — 8cf957d.
- Figeage des librairies retenues dans `ADR-001-stack.md` et `package.json` — da99429.
- Report de l'automatisation des cas ADMIN : le test `CASE-ADMIN-001` est retiré, mais le projet Vitest `admin` (4 projets `arch` / `admin` / `facturation` / `unit`) est conservé — 211101f.

**Critiques de l'IA acceptées.**
- Domaine facturation rangé sous `src/domain/facturation/`, dossier absent de l'arborescence imposée par `SPEC-ARCH-02` → déplacé vers `schemas/types/`, `services/server/` et `actions/`, fichiers renommés en kebab-case, imports du test `CASE-FAC-700` et 24 prompts de facturation mis à jour ; audit `arch-audit.ts` repassé **CONFORME (0 violation)** — 1039600
- Rapport d'analyse IA sur les cas ADMIN après CDC v5 : `CASE-ADMIN-073` réécrit en régression (la ré-émission d'une alerte sur un créneau déjà sous pré-alerte devient un **rejet strict** et non plus un renvoi idempotent — `SPEC-ADMIN-06` cas limite #6) → `tests/cases/admin/` — 4f51fe6
- Couverture manquante sur `SPEC-ADMIN-08` et `SPEC-ADMIN-01` AC-3 → ajout de `CASE-ADMIN-074` à `076` (encaissement du solde CB sur place, blocage si déjà soldée, rejet des espèces et chèques vacances) et `CASE-ADMIN-077` (badges financiers du jour J) — 4f51fe6
- `CASE-ADMIN-010`, `011`, `012`, `026` ne vérifiaient pas que le calcul de remboursement indicatif est affiché à l'administrateur **et absent du SMS client** → assertions ajoutées — 4f51fe6
- `CASE-ADMIN-033` : mot de passe de test resté sur un masque générique → aligné sur la politique de sécurité (12 caractères minimum, majuscule, chiffre, caractère spécial) — 4f51fe6

**Critiques de l'IA refusées, et pourquoi.**
- Après le retrait du test `CASE-ADMIN-001`, proposition de supprimer également le projet Vitest `admin` et le script `test:admin` devenus sans test → refusé, le découpage en quatre projets (`arch`, `admin`, `facturation`, `unit`) est une décision d'architecture de test indépendante d'un cas particulier, et l'automatisation des cas ADMIN était déjà programmée — 211101f
- Proposition de conserver `src/services/server/planning.service.ts` comme signature de départ pour la future implémentation → refusé, la phase de test interdit toute écriture sous `src/` ; l'emplacement cible doit être déduit de `specs/architecture.md`, pas matérialisé — 211101f

**Erreurs produites par l'IA et détectées.**
- Automatisation de `CASE-ADMIN-001` accompagnée de la création d'une signature de production `src/services/server/planning.service.ts`, en violation de l'interdiction d'écrire sous `src/` pendant la phase de test → détecté à la relecture du commit → test et signature supprimés, champ « Fichier » du cas remis à « à renseigner après automatisation » — 5a99ab4 puis 211101f.
- `package.json` et `vitest.config.ts` commités avec des **marqueurs de conflit Git non résolus** : JSON invalide, `npm install` et `npm test` cassés pour toute l'équipe → détecté à la première exécution → fusion manuelle de `test:e2e` avec les scripts `test:arch`, `test:admin`, `test:facturation`, `test:unit`, et de la configuration à quatre projets avec les imports dupliqués nettoyés — 67eeb7b.
- Première vague de tests unitaires réservation écrite avec un vocabulaire étranger à `docs/uml/domain.puml` (`'saint-gilles'` en minuscules, `agesEnfants`, fonction cible `src/utils/panier.ts` absente de l'arborescence) → détecté au croisement avec le modèle du domaine → lot entièrement régénéré. **`case-res-404.test.ts` et `case-res-417.test.ts` ont été supprimés à cette occasion et jamais recréés** — 823f9e0, db6b110, 2b97abd.

**Ce qui a été généré aujourd'hui.**
- `docs/compte-rendu-entretien-05.md`, `docs/impact-CR-005.md`, `docs/cdc/cahier-des-charges-v5.md` — bd77148, 83aa948, 7b5e5d6, d4918d3, 3219335
- `specs/` mises à jour sur CDC v5, `specs/reservation.md` en tête — 70020a6
- `tests/cases/admin/` : `CASE-ADMIN-073` réécrit, ajout de `074` à `077`, sommaire synchronisé — 4f51fe6
- `docs/prompt/test/facturation/prompt-FAC-700.md` à `723.md`, `tests/tests-unitaires/facturation/` et le cas `CASE-FAC-700` — 73d8054, 90c5ae6, de745b5
- Réorganisation du domaine facturation sur l'arborescence `SPEC-ARCH-02` — 1039600
- `docs/prompt/code/reservation/`, `tests/cases/reservation/` et `tests/tests-unitaires/reservation/` (première vague, régénérée) — 823f9e0, db6b110, 2b97abd, 093807c
- `docs/prompt/prompt-gabarit-code.md` — a8d9494, ed81501
- `scripts/arch-audit.ts` et la commande `npm run arch:report`, `scripts/concat.ts` — 8cf957d, 9c16942
- `docs/adr/ADR-001-stack.md` et `package.json` (librairies finales), `vitest.config.ts` et `package.json` réparés — da99429, 67eeb7b
- `docs/journal.md` — présente entrée

**Questions ouvertes pour le client.**
- Q01 (base de calcul du remboursement) : **tranchée** par le client lors du CR n° 5 — calcul sur le montant total, plafonné aux sommes perçues.
- Nouvelles questions ouvertes introduites par le CDC v5 (§11) et laissées en attente : n° 12 (durée du verrouillage temporaire des places pendant la transaction bancaire), n° 14 (heure exacte d'envoi du SMS de solde à J-1), n° 15 (articulation entre le SMS de solde et l'alerte météo de 18h la veille).

## J8 — 20/08/2026

**Présents.**
Loïc, Thomas, Benjamin et Ivan.

**Décisions.**
- Réalignement des 80 prompts de code ADMIN sur la matrice modulaire de `SPEC-ARCH-02` : abandon du découpage domaine-first (`src/admin/planning/`, `src/admin/cancellation/`, `src/admin/auth/`, `src/admin/capacity/`, `src/admin/alerts/`, `src/admin/slots/`, `src/admin/payment/`) au profit des seules couches techniques autorisées (`actions/`, `app/`, `components/`, `env/`, `hooks/`, `services/`, `schemas/`, `utils/`, `lib/`, `config/`) — 3b0020d.
- Interdiction formelle, dans les prompts de test, d'écrire ou de créer une signature sous `src/` : l'emplacement du futur code cible doit être *déduit* depuis `specs/architecture.md`, sans y toucher — 583ce96, 1f892f1.
- Uniformisation du chemin des tests sur les projets déclarés dans `vitest.config.ts` : `tests/tests-unitaires/<domaine>/case-<domaine>-XXX.test.ts` (abandon du sous-dossier par spec) — 583ce96.
- Ancrage des deux gabarits (code et test) sur `docs/uml/domain.puml` : mêmes classes, attributs, relations et vocabulaire, interdiction d'inventer une entité absente du diagramme — a249e49.
- Ajout de `SPEC-ADMIN-08` (pointage et encaissement du solde par carte bancaire sur place le jour J) et de la tâche 8 correspondante au plan de délégation — a2d171a.
- Choix de persistance mis en œuvre (ADR-002) : PostgreSQL + Drizzle ORM, schéma relationnel, migration initiale, script de seed et `docker-compose` — a7eda71.
- Rédaction de `docs/signature.md`, cartographie unique de `src/` (emplacements, types, ports d'injection, signatures), déclarée explicitement « reste à corriger » — 4796e5a.
- Nettoyage des prompts legacy devenus contradictoires avec les gabarits courants — 9df97af.

**Critiques de l'IA acceptées.**
- Les 80 prompts de code ADMIN restreignaient l'agent à des dossiers `src/admin/**` absents de la matrice `SPEC-ARCH-02` → chaque domaine reréparti sur les couches autorisées, mise à jour de la ligne « fichiers modifiables », de la contrainte 4 (emplacement de la règle métier) et de la contrainte 8 (liste blanche) — 3b0020d, `docs/delegation/delegation-admin.md`
- Préfixes « [Choix déduit — …] » devenus obsolètes sur `CASE-ADMIN-016`, `018`, `025`, les points étant désormais tranchés par `SPEC-ADMIN-02` (cas limites #1 et #3) et `SPEC-ADMIN-03` (AC-1) → retirés — 224ef42
- Références `CDC v4` périmées sur `CASE-ADMIN-016`, `018`, `022`, `040`, `055` → basculées sur `CDC v5` (C-10, §6, Q1 §11) — 224ef42
- Trous de couverture signalés après la mise à jour CDC v5 → ajout de `CASE-ADMIN-078` (bascule automatique en « payée complètement » sur webhook bancaire), `CASE-ADMIN-079` (remboursement indicatif plafonné à 0,00 € — R-29) et `CASE-ADMIN-080` (perte de connexion pendant l'encaissement CB sur place) — 224ef42
- `CASE-FAC-700` écrit pour une facture unique alors que le CDC v5 impose deux factures distinctes (acompte puis solde) → cas et test réécrits — 0c10906, 4d24cb2
- Tolérance de format date/heure trop large et références « Portée » obsolètes sur les CASE-FAC → resserrées — 86127dd, d2faa7a

**Critiques de l'IA refusées, et pourquoi.**
- `CASE-FAC-719` (rebond e-mail, boîte pleine) : l'IA a demandé l'autorisation de modéliser un port de rebond (« Bounce ») et un canal SMS de secours pour rendre le cas testable → refusé, aucune de ces entités n'existe dans `docs/uml/domain.puml` et `specs/facturation.md` indique explicitement qu'aucune solution technique n'est prévue. Le cas prouve l'absence de rattrapage *par construction* (aucun port SMS injecté, un seul appel `envoyer`), le rebond étant simulé par un artefact de test local — `concept/signature/RAPPORT-CASE-FAC-701-a-723.md`
- Mention d'avertissement de pré-annulation : l'IA a produit une formulation et proposé de la remonter dans `specs/reservation.md` comme texte de référence → refusé, la formulation reste classée « Ce qui n'est pas défini » en attente de validation direction. Le texte ne vit que dans `tests/cases/reservation/CASE-RES-402.md`, et l'en-tête du test le signale explicitement — 1d8d774

**Erreurs produites par l'IA et détectées.**
- Périmètres `src/` inventés dans les 80 prompts de code ADMIN (`src/admin/**`), sans correspondance dans la matrice modulaire → repéré en croisant `docs/delegation/delegation-admin.md` avec `specs/architecture.md` (`SPEC-ARCH-02`) → corrigé par redistribution sur les couches techniques — 3b0020d.
- Les gabarits de prompts de test autorisaient l'agent à *créer* les fichiers de signature sous `src/` quand ils manquaient, ce qui revenait à écrire du code de production pendant la phase de test → repéré à la relecture des prompts FAC puis ADMIN → interdiction formelle ajoutée aux 80 + 24 prompts — 1f892f1, 583ce96.
- Lot de tests réservation incomplet : 20 fichiers produits pour 22 cas, `CASE-RES-404` (bascule bilingue FR/EN) et `CASE-RES-417` (verrouillage panier 10 min) sans test généré alors que leurs prompts existent. Les deux fichiers avaient été supprimés la veille lors de la régénération du lot (2b97abd, cf. J7) et n'ont pas été recréés ici → constaté le 21/08 au lancement des prompts de code réservation → non corrigé à ce jour, les deux cas restent non couverts — 1d8d774.
- `docs/signature.md` livré avec des écarts connus par rapport aux specs (notamment la tranche d'âge adulte, `>= 13 ans` dans la signature contre `>= 12 ans` dans `specs/reservation.md` et `docs/uml/domain.puml`) → signalé dès le commit (« reste a corriger ») → non corrigé à ce jour — 4796e5a.

**Ce qui a été généré aujourd'hui.**
- `docs/prompt/code/admin/prompt-ADMIN-code-001.md` à `080.md` (80 prompts de code) et `docs/delegation/delegation-admin.md` (tâche 8) — a2d171a, 3b0020d
- `docs/prompt/test/admin/prompt-ADMIN-001.md` à `080.md` réalignés sur le gabarit — 583ce96
- `docs/prompt/code/facturation/` et `docs/prompt/test/facturation/` (24 prompts chacun, CASE-FAC-700 à 723) — be8e67d, 9e26d85, 27624af, 1f892f1
- `docs/prompt/code/reservation/prompt-RES-400.md` à `421.md` et `docs/prompt/test/reservation/` — c4ba2db, e9bba87, 82119b4, 522f4de
- `tests/cases/reservation/CASE-RES-400.md` à `421.md` + `sommaire.md` — 128e408, 2cb04d0
- `tests/tests-unitaires/reservation/case-res-400` à `421.test.ts` (20 fichiers, 404 et 417 manquants) et `tests/tests-unitaires/setup.ts` — 1d8d774
- `tests/tests-unitaires/facturation/CASE-FAC-701` à `723.test.ts` — af80611, 0c10906
- `specs/admin.md` (SPEC-ADMIN-08), `tests/cases/admin/CASE-ADMIN-078/079/080.md` — a2d171a, 224ef42
- `drizzle/schema.ts`, `drizzle/migrations/0000_hesitant_gladiator.sql`, `drizzle.config.ts`, `scripts/db-seed.ts`, `docker-compose.yml`, `.env.example` — a7eda71
- `docs/uml/domain.puml`, `docs/uml/mld/` (mld, mpd) et déplacement des diagrammes obsolètes — c8637ee, 43ff3a0
- `docs/signature.md` — 4796e5a
- `reports/prompt-runs/admin-test/CASE-ADMIN-001.md` à `080.md`, `concept/signature/RAPPORT-CASE-ADMIN-001-a-080.md`, `concept/signature/RAPPORT-CASE-FAC-701-a-723.md` — 7b6f7bc, 5b9b3f7, b4fd285
- `docs/journal.md` — présente entrée

**Questions ouvertes pour le client.**
- Heure exacte d'envoi du SMS de solde à J-1 (question ouverte n°14, §11 du CDC v5) : toujours classée « non définie » dans `specs/reservation.md`, alors que `docs/signature.md` et les cas `CASE-RES-418` à `421` figent déjà 18h00 par déduction.
- Articulation entre le SMS de solde J-1 et l'alerte météo de 18h la veille (question ouverte n°15, §11 du CDC v5) : quel message prime si les deux tombent sur le même créneau ?
- Durée du verrouillage temporaire des places pendant la transaction bancaire (question ouverte n°12, §11 du CDC v5) : 10 minutes retenues par déduction technique.
- Formulation textuelle exacte, validée par la direction, de la mention d'avertissement affichée sur un créneau sous pré-alerte de pré-annulation.

## J9 — 21/08/2026

**Présents.**
Thomas, Benjamin et Ivan (contributeurs tracés au dépôt ce jour-là).

**Décisions.**
- Bascule de la phase de spécification à la phase d'implémentation : les trois domaines (administration, facturation, réservation) passent des tests rouges au code de production sous `src/`, en TDD strict, un prompt de code par cas de test — 5c7bed2, 94c32ad, f13ca18.
- Adoption de `docs/prompt/PROMPT_CONTEXTE_INITIAL.md`, consigne système commune injectée avant tout prompt de code : sources de vérité du dépôt, protocole TDD, invariants (`tests/` intouchable, règle métier et non valeur, socle `src/`, aucune dépendance nouvelle), commandes de validation et format de livrable attendu — 8f2b089.
- Réorganisation documentaire : tout ce qui relève du cadrage (CDC, comptes rendus, délégations, impacts, journal) déplacé de `docs/` vers `concept/` — b085123.
- Journal de projet ramené sous `docs/journal.md` après sa restauration, l'emplacement `concept/` s'étant révélé exposé aux suppressions de masse.
- Mise à jour des diagrammes de séquence UML, dont le flux réservation → facturation — 651e92d.
- Intégration des trois lots d'implémentation sur une branche `code` commune, puis remontée sur `main` — 79d2aff, fa0f8ad, 6fa2ebf, fb59c77.

**Critiques de l'IA acceptées.**
- La matrice `SPEC-ARCH-02` n'autorise pas `services/server/` à importer `services/server/` : `booking.service.ts` ne pouvait donc pas appeler `booking-capacity.service.ts` → logique partagée (rotation des ports, jauge nominale, fermeture annuelle, découpage matin / après-midi) descendue dans `src/utils/slot-rules.ts` → f13ca18
- `utils/` n'a pas le droit d'importer `schemas/`, y compris en `import type` (l'audit compte les imports de types) → types canoniques déclarés dans `src/utils/pricing-rules.ts` et **réexportés** par `src/schemas/types/booking.types.ts`, plutôt que dupliqués dans les deux couches → f13ca18
- Proposition d'ajouter `import 'server-only'` en tête des services serveur → vérifiée puis écartée : hors bundle React Server Components le paquet lève une exception et casserait l'exécution Vitest ; l'étanchéité est déjà contrôlée par l'audit statique → f13ca18
- Calcul de l'acompte en flottant : `105 × 0,30` vaut `31.499999999999996`, et `130 × 0,30` vaut `39.00000000000001` → arrondi au centime imposé par `arrondirMontant()` sur le montant total, l'acompte et le solde → `src/utils/pricing-rules.ts`

**Critiques de l'IA refusées, et pourquoi.**
- Coder en dur le numéro `+262692123456` dans `balance-payment.service.ts` pour faire passer `CASE-RES-418` → refusé, la contrainte 3 des prompts de code interdit qu'une valeur écrite dans le cas de test apparaisse dans le code de production. Le test reste rouge et l'incohérence est remontée à l'équipe plutôt que masquée.
- Aligner `listerCreneauxDuJour` sur `calculerJaugeCreneau` pour appliquer partout la jauge de 24 places les mardis et jeudis matin → refusé en l'état : cela ferait tomber `CASE-RES-402`. Les deux fonctions restent séparées jusqu'à arbitrage métier, et l'écart est documenté.
- Compléter les valeurs laissées ouvertes par le CDC v5 (heure du SMS J-1, timer panier, formulation de la mention météo) directement dans le code de production → refusé, ces points relèvent des questions ouvertes n° 12, 14 et 15 et doivent être tranchés par le client.

**Erreurs produites par l'IA et détectées.**
- `CASE-RES-418` : le test exige `destinataireTelephone: '+262692123456'`, mais la fixture `RESERVATION` ne porte **ni client ni téléphone** et la fonction ne reçoit que la réservation, l'horloge et le port d'envoi SMS — la valeur attendue n'existe dans aucune entrée → détecté à l'exécution du prompt de code RES-418 → non corrigeable sans toucher à `tests/` : mécanisme complet implémenté (token, URL, expiration, page, débit, bascule de statut), assertion du téléphone laissée en échec et signalée. Correctif proposé : ajouter `client` à la fixture du test.
- Conflit entre deux cas de test sur la jauge : `CASE-RES-402` porte sur le **jeudi** 17/09/2026 à Saint-Gilles 10h00 et attend une jauge de 36 places, alors que R-10 et `CASE-RES-412` imposent 24 places les mardis et jeudis matin → détecté en recalculant les jours de la semaine des dates de test → contourné en séparant la jauge nominale du port (planning public) du plafond de rotation (`booking-capacity.service.ts`) ; les deux tests passent, mais la règle métier reste à trancher.
- `docs/signature.md` fixe la tranche adulte à `>= 13 ans` alors que `specs/reservation.md` (AC-4) et `docs/uml/domain.puml` disent `>= 12 ans` → détecté au croisement des trois sources → spec et UML retenus pour l'implémentation, `docs/signature.md` reste à corriger.
- **Suppression accidentelle de 27 fichiers de `concept/`** par le commit `8f2b089` : CDC v2, v3, v4 et versions PDF, comptes rendus d'entretien 01 à 05, les 4 fichiers de délégation, les 5 analyses d'impact, `traceability.md`, `point-relevés.md`, les deux gabarits de prompt et `journal.md` → détecté en voulant compléter le journal, qui avait disparu du disque → journal restauré depuis `b085123` puis replacé sous `docs/journal.md` ; **les 26 autres fichiers restent à restaurer** (`git checkout b085123 -- concept/cdc concept/compte-rendu concept/delegation concept/impact …`).

**Ce qui a été généré aujourd'hui.**
- `src/` réservation — 13 fichiers, 1 114 lignes : `config/pricing.constants.ts`, `ports.constants.ts`, `vessels.constants.ts`, `business.constants.ts`, `utils/pricing-rules.ts`, `utils/slot-rules.ts`, `schemas/types/booking.types.ts`, `schemas/validation/booking-contact.schema.ts`, `passenger.schema.ts`, `services/server/booking-slot.service.ts`, `booking-capacity.service.ts`, `booking.service.ts`, `balance-payment.service.ts` — f13ca18
- `src/` administration — 36 fichiers pour `CASE-ADMIN-030` à `080` (actions, services serveur, schémas de validation, hooks) — 5c7bed2, fa0f8ad
- `src/` facturation — 12 fichiers pour `CASE-FAC-700` à `723` — 94c32ad
- `docs/prompt/PROMPT_CONTEXTE_INITIAL.md` — 8f2b089
- `docs/uml/sequences/` (dont `reservation-2-facturation.puml`) — 651e92d
- Déplacement `docs/` → `concept/` — b085123
- `docs/journal.md` — restauration depuis git, entrées J6, J7, J8 et J9, et remise du journal sous `docs/`

**État du dépôt en fin de journée.**
- `npx vitest run` : **261 tests verts sur 262**, 151 fichiers sur 152. Seul échec : `case-res-418.test.ts`, pour l'incohérence décrite ci-dessus.
- `npm run arch:report` : **🟢 CONFORME**, 71 fichiers scannés, 0 violation `SPEC-ARCH-01`, 0 violation `SPEC-ARCH-02`.
- Cas non couverts : `CASE-RES-404` (bascule bilingue FR/EN) et `CASE-RES-417` (verrouillage panier 10 min), dont les tests supprimés à J7 n'ont jamais été recréés.

**Questions ouvertes pour le client.**
- **Nouvelle** — Jauge d'un créneau du matin à Saint-Gilles un mardi ou un jeudi : 24 places (R-10, `CASE-RES-412`) ou 36 places (`CASE-RES-402`) ? Deux cas de test validés se contredisent sur la même règle.
- Toujours ouvertes, sans réponse : n° 12 (durée du verrouillage temporaire des places), n° 14 (heure exacte d'envoi du SMS de solde à J-1), n° 15 (articulation SMS de solde / alerte météo de 18h la veille), et la formulation validée de la mention d'avertissement de pré-annulation.
