# ADR-002 — Choix du modèle et de la solution de persistance des données

**Statut :** proposé
**Date :** J3
**Décidé par :** l'équipe
**Validation formateur :** requise

Un ADR conserve la trace d'une décision et de ses raisons : *voilà ce que nous
avons décidé, et pourquoi*. Il ne se réécrit pas quand on change d'avis — on en
crée un nouveau qui remplace celui-ci.

À distinguer :
- une **spec** dit ce que le système doit faire ;
- une **RFC** propose une manière de résoudre un problème, pour discussion ;
- une **ADR** enregistre une décision prise.

---

## Contexte

L'application Ti'Baleine gère la réservation et le paiement en ligne d'excursions maritimes en milieu naturel (`REQ-001`, `REQ-006`). L'activité repose sur des contraintes physiques, réglementaires et financières strictes :
- **Jauges et capacités rigides (`REQ-010`, `REQ-012`) :** Les bateaux possèdent une capacité maximale fixée (12 places pour le *Tikap*, 24 places pour le *Grand Bleu*, blocage absolu à 36 places par créneau). Tout surbooking est interdit pour des raisons évidentes de sécurité maritime et de réglementation.
- **Gestion des créneaux fixes (`REQ-003`, `REQ-107`) :** 4 départs quotidiens fixes (`07:00`, `09:00`, `10:00`, `14:00`), 7j/7, avec masquage automatique des créneaux complets ou clos à moins de 2h du départ.
- **Transactions financières et conformité (`REQ-006`, `REQ-008`, `REQ-104`) :** Paiement CB à 100 % via passerelle bancaire, génération automatique d'une facture PDF avec numéro unique légal (`invoice_number`), enregistrement des traces bancaires (`transaction_ref`, montants en centimes).
- **Parcours client sans compte obligatoire (`REQ-005`, `REQ-105`) :** Collecte des données de contact minimales (nom, prénom, e-mail, téléphone) avec rattachement aux réservations passées, tout en prévoyant l'authentification de l'administrateur (`role`, `password_hash`).

La structure des données a été formellement modélisée dans le dossier `docs/uml/mld/` à travers le MLD ([mld.md](file:///home/thomaz/Documents/project/Expernet/ti_baleine/docs/uml/mld/mld.md), [mld.puml](file:///home/thomaz/Documents/project/Expernet/ti_baleine/docs/uml/mld/mld.puml)) et le MPD ([mpd.md](file:///home/thomaz/Documents/project/Expernet/ti_baleine/docs/uml/mld/mpd.md), [mpd.puml](file:///home/thomaz/Documents/project/Expernet/ti_baleine/docs/uml/mld/mpd.puml)), comprenant 4 entités fortement reliées : `USERS`, `BOOKINGS`, `BOOKING_ITEMS` et `PAYMENTS`.

---

## Options envisagées

### Option A — Base de données relationnelle SQL (PostgreSQL / SQLite basée sur le MLD/MPD)

Implémentation fidèle du Modèle Logique et Physique de Données conçu dans `docs/uml/mld/` sous la forme de tables relationnelles normalisées (`users`, `bookings`, `booking_items`, `payments`) exploitées via un ORM / Query Builder TypeScript (ex: Kysely, Drizzle).

| | |
|---|---|
| **Ce qu'elle apporte** | • **Garanties ACID strictes** : Transactions atomiques liant la création de la réservation, l'insertion des passagers (`booking_items`) et la confirmation du règlement (`payments`).<br>• **Prévention absolue du surbooking (`REQ-012`)** : Verrous transactionnels (`SELECT ... FOR UPDATE` ou transactions sérialisables) garantissant qu'aucun client simultané ne peut réserver au-delà de la capacité maximale du créneau.<br>• **Intégrité référentielle native** : Clés étrangères avec contraintes (`ON DELETE CASCADE` pour les places, `ON DELETE RESTRICT` pour l'historique comptable et client).<br>• **Typage strict et contraintes d'unicité** : Champs `ENUM` (`departure_time`, `excursion_type`, `status`), contraintes `UNIQUE` sur `email`, `booking_ref`, `invoice_number` et `transaction_ref`.<br>• **Indexation et requêtage performant** : Calcul instantané des taux d'occupation (`COUNT(*)`) pour le filtrage temps réel et l'espace d'administration. |
| **Ce qu'elle coûte** | • Nécessite la configuration d'un moteur de base de données (PostgreSQL sur VPS ou SQLite avec mode WAL).<br>• Mise en place d'un outil de migrations versionnées de schéma (`ADR-001`). |
| **Ce qu'elle rend difficile plus tard** | • Nécessite la rédaction de migrations SQL formelles lors de l'ajout ou de la modification de colonnes/tables. |

---

### Option B — Persistance sur fichiers plats JSON (Flat-file Storage : `bookings.json`, `users.json`...)

Stockage des réservations, utilisateurs et paiements directement au format JSON dans le système de fichiers du serveur (fichiers `data/bookings.json`, `data/users.json`, `data/payments.json`), manipulés via le module natif `fs/promises` de Node.js.

| | |
|---|---|
| **Ce qu'elle apporte** | • **Simplicité initiale** : Zéro SGBD à installer ni à configurer, aucun coût d'infrastructure additionnel pour un service de base de données.<br>• **Visibilité directe** : Données lisibles et modifiables directement dans un éditeur de texte.<br>• Prototypage ultra-rapide sans dépendance externe. |
| **Ce qu'elle coûte** | • **Aucune garantie ACID** : Risque majeur de corruption ou de perte de données en cas d'interruption/crash du processus Node.js pendant la réécriture d'un fichier (`fs.writeFile`).<br>• **Race conditions sur les réservations critiques** : Incapacité à gérer les accès concurrents lors des achats de places simultanés ; risque avéré de sur-réservation en violation directe de `REQ-012`.<br>• **Gestion manuelle de l'intégrité** : Nécessite de recoder dans la couche applicative l'unicité des références, les liaisons entre passagers/commandes/paiements et les cascades de suppression.<br>• **Performances non scalables** : Obligation de charger et désérialiser en mémoire l'intégralité du fichier JSON à chaque lecture/écriture, devenant lent à mesure que l'historique s'accumule. |
| **Ce qu'elle rend difficile plus tard** | • Requêtage complexe, calculs statistiques et filtrage multi-critères pour l'espace d'administration.<br>• Sauvegardes à chaud fiables et déploiement horizontal (multi-instances ou serverless) impossible sans système de fichiers partagé cohérent. |

---

## Décision

Nous retenons **l'Option A : Base de données relationnelle SQL (conforme au MLD/MPD de `docs/uml/mld/`)**.

---

## Raisons

1. **Tolérance zéro au surbooking (`REQ-012`) :** La capacité des bateaux (12 et 24 places) et le plafond de 36 places par créneau sont des impératifs physiques et de sécurité. Seule une base de données relationnelle avec support transactionnel permet de verrouiller l'état d'un créneau et de garantir qu'une dernière place n'est pas vendue deux fois simultanément.
2. **Intégrité financière et légale (`REQ-006`, `REQ-008`, `REQ-104`) :** Le traitement des paiements bancaires et l'attribution de numéros de factures uniques imposent une cohérence parfaite entre `bookings`, `booking_items` et `payments`.
3. **Modèle de données déjà mature et formalisé :** Le travail de modélisation logique et physique ([mld.md](file:///home/thomaz/Documents/project/Expernet/ti_baleine/docs/uml/mld/mld.md) et [mpd.md](file:///home/thomaz/Documents/project/Expernet/ti_baleine/docs/uml/mld/mpd.md)) structure précisément 4 tables normalisées. Ce schéma se transpose immédiatement et sans friction dans un SGBD relationnel.
4. **Cohérence avec la stack Next.js / TypeScript (`ADR-001`) :** L'association d'un SGBD SQL avec un ORM TypeScript (Prisma ou Drizzle) offre un typage de bout en bout, des migrations automatisées et une maintenance aisée sans nécessiter d'expertise DBA dédiée.

---

## Conséquences acceptées

- Gestion rigoureuse des migrations de schéma au fil des évolutions applicatives.
- Configuration et sécurisation des variables d'environnement de connexion à la base de données.
- Mise en place d'une routine de sauvegarde régulière (dump SQL ou snapshots automatisés).

---

## Ce qui nous ferait revenir dessus

- Une contrainte d'hébergement budgétaire ou technique imprévue interdisant tout accès à PostgreSQL ou à une base SQLite persistante sur le serveur de déploiement.
- Une décision client de déléguer l'intégralité du système de réservation à une plateforme SaaS tierce clé en main (ex: FareHarbor, Bokun).
