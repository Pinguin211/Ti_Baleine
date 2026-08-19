# ADR-001 — Choix de la stack technique

**Statut :** validé  
**Date :** J2 (mis à jour J4)  
**Décidé par :** l'équipe (Thomas, Loïc, Benjamin, Ivan | RageGit)  
**Validation formateur :** validé  

---

## 1. Contraintes d'admissibilité

Les cinq sont éliminatoires et validées :

- [x] **Déjà pratiquée par au moins deux membres de l'équipe.**  
      → Thomas et Loïc ont une solide expérience sur React, Next.js et TypeScript ; Benjamin et Ivan maîtrisent TypeScript et le développement web moderne.
- [x] **Runner de tests exécutable en une commande.**  
      → `npm test` (exécute `vitest ^4.1.10` pour les tests unitaires métier et la suite d'architecture `arch` avec `ts-morph ^28.0.0`, et `@playwright/test ^1.62.1` pour les tests E2E de bout en bout).
- [x] **Mécanisme de migration ou de schéma versionné.**  
      → **Drizzle ORM** (`drizzle-orm ^0.45.2`) avec **`drizzle-kit ^0.31.10`** pour la génération et l'exécution de migrations SQL versionnées et typées sur PostgreSQL (`pg ^8.23.0`), couplé à **Kysely** (`kysely ^0.29.5`) pour les requêtes complexes et verrous pessimistes (`FOR UPDATE`).
- [x] **Intégrité et intégration d'un prestataire de paiement.**  
      → **Stripe** (`stripe ^22.5.0`, `@stripe/stripe-js ^9.13.0`) avec gestion sécurisée des sessions de paiement CB à 100 % et traitement idempotent des webhooks de confirmation.
- [x] **Déployable dans la contrainte budgétaire du client (`REQ-1xx`).**  
      → Déploiement sur VPS Linux (OVH / Hetzner) avec conteneur PostgreSQL Docker ou service managé, pour un coût maîtrisé estimé entre 5 et 10 €/mois.

---

## 2. Liste admise

Symfony/PHP · **Next.js/TypeScript** · Spring Boot/Java · ASP.NET

---

## 3. Contexte

L'application Ti'Baleine gère la réservation, le paiement en ligne et l'administration d'excursions maritimes (`REQ-001`) :
- **Parcours grand public réactif et bilingue FR/EN (`REQ-002`, `REQ-101`) :** Sélection multi-sites (Saint-Gilles et Saint-Leu), calcul tarifaire dynamique (adultes, enfants $\ge 4$ ans, majoration Saint-Leu + 10 €/pers), et réservation en mode invité sans création de compte obligatoire (`REQ-005`).
- **Tolérance zéro au surbooking et gestion des jauges physiques (`REQ-010`, `REQ-012`) :** Bateaux *Tikap* (12 places) et *Grand Bleu* (24 places), verrouillage des créneaux à $H-2$ du départ, transactions ACID concurrentes et blocage d'accès aux enfants de moins de 4 ans.
- **Facturation automatique PDF en mémoire (`REQ-008`, `SPEC-FAC-02`) :** Génération dynamique de facture acquittée au format PDF directement en mémoire RAM (sans stockage persistant sur disque) et envoi immédiat par courriel.
- **Back-office administrateur & alertes de pré-annulation (`SPEC-ADMIN-01` à `07`) :** Planning consolidé, annulation totale et réduction de passagers avec libération synchrone des places, diffusion groupée d'alertes météo bilingues (SMS/Email) à J-1 18h et authentification sécurisée.

---

## 4. Options envisagées

### Option A — Next.js / TypeScript + Drizzle ORM & Kysely (PostgreSQL) + Vitest & Playwright

| Critère | Évaluation |
|---|---|
| **Compétences de l'équipe** | Maîtrise confirmée de React/Next.js/TypeScript par l'ensemble du groupe. |
| **Ce qu'elle facilite pour ce problème** | • **Unification du langage (Full TypeScript) :** Du frontend aux Server Actions et schémas de BDD.<br>• **Persistance PostgreSQL performante :** Définition déclarative avec **Drizzle ORM** (`drizzle-orm ^0.45.2`) et transactions atomiques anti-surbooking avec **Kysely** (`kysely ^0.29.5`).<br>• **Génération PDF & Emails :** Génération PDF en mémoire via `@react-pdf/renderer ^4.6.1` et expédition SMTP via `nodemailer ^9.0.5`.<br>• **Architecture stricte :** Validation Zod isomorphe (`zod ^4.4.3`), étanchéité `server-only ^0.0.1` et suite d'audit automatisée (`npm run arch:report`). |
| **Ce qu'elle coûte** | Gestion rigoureuse des frontières Server / Client Components imposée par Next.js App Router. |
| **Coût d'hébergement estimé** | ~5 à 10 €/mois (VPS Dockerisé). |

---

### Option B — Symfony / PHP + Doctrine ORM + PHPUnit

| Critère | Évaluation |
|---|---|
| **Compétences de l'équipe** | Moins de pratique récente de l'écosystème PHP/Symfony moderne dans l'équipe. |
| **Ce qu'elle facilite pour ce problème** | Structure MVC très cadrée, robustesse de Doctrine ORM pour PostgreSQL. |
| **Ce qu'elle coûte** | Nécessite un apprentissage et ralentit l'analyse/conception sur le calendrier court du projet (10 jours) ; nécessite de gérer deux technologies distinctes pour une UI réactive bilingue. |
| **Coût d'hébergement estimé** | ~5 à 15 €/mois. |

---

## 5. Décision

Nous retenons **l'Option A : Stack Next.js / TypeScript**, adossée à une base de données **PostgreSQL** gérée conjointement par **Drizzle ORM** et **Kysely**, complétée par **Vitest** et **Playwright**.

### Composition détaillée de la stack technique & versions (`package.json`) :

1. **Framework & Langage :**
   - **Next.js** (`next ^16.3.1`) — App Router, Server Components & Server Actions
   - **React & React-DOM** (`react ^19.2.8`, `react-dom ^19.2.8`)
   - **TypeScript & Typages** (`@types/node ^26.2.0`, `@types/react ^19.0.10`, `@types/react-dom ^19.0.4`)
   - **`server-only`** (`^0.0.1`) pour l'étanchéité stricte des modules backend
2. **Base de données & Persistance relationnelle :**
   - **PostgreSQL** (base de données relationnelle conforme au MLD/MPD)
   - **Drizzle ORM** (`drizzle-orm ^0.45.2`) : Définition déclarative du schéma TypeScript, inférence de types et requêtes CRUD
   - **Drizzle Kit** (`drizzle-kit ^0.31.10`) : Génération et application des migrations SQL versionnées
   - **Kysely** (`kysely ^0.29.5`) : Query builder SQL typé pour les transactions atomiques, agrégations et verrous pessimistes (`SELECT ... FOR UPDATE`)
   - **Driver PostgreSQL** (`pg ^8.23.0`, `@types/pg ^8.23.1`)
3. **Validation & Données :**
   - **Zod** (`zod ^4.4.3`) : Schémas de validation runtime isomorphes et pattern factory
4. **Facturation & Notifications :**
   - **`@react-pdf/renderer`** (`^4.6.1`) : Génération de la facture acquittée PDF à la volée en mémoire RAM (`Buffer`)
   - **`nodemailer`** (`^9.0.5`, `@types/nodemailer ^8.0.1`) : Expédition des courriels transactionnels et alertes e-mails
   - **`twilio`** (`^6.1.0`) : Diffusion des SMS d'annulation et alertes de pré-annulation groupées
5. **Paiement en ligne :**
   - **Stripe** (`stripe ^22.5.0`, `@stripe/stripe-js ^9.13.0`)
6. **Authentification & Sécurité Admin :**
   - **`bcryptjs`** (`^3.0.3`, `@types/bcryptjs ^2.4.6`) : Hachage du mot de passe admin
   - **`jose`** (`^6.2.9`) : Sessions JWT chiffrées en cookies `HttpOnly`
7. **UI, Formulaires & Styles :**
   - **React Hook Form** (`react-hook-form ^7.85.0`, `@hookform/resolvers ^5.9.1`)
   - **Tailwind CSS** (`tailwindcss ^4.3.3`, `postcss ^8.5.26`, `autoprefixer ^10.5.4`, `clsx ^2.1.1`, `tailwind-merge ^3.6.0`)
   - **Lucide React** (`lucide-react ^1.32.0`)
   - **Radix UI Primitives** (`@radix-ui/react-dialog ^1.1.23`, `@radix-ui/react-popover ^1.1.23`, `@radix-ui/react-select ^2.3.7`)
   - **`date-fns`** (`^4.4.0`) : Manipulation et calculs stricts des dates et horaires ($H-2$, $J-1$ 18h, formatage sans zéro initial)
8. **Tests, Qualité & Architecture :**
   - **Vitest** (`vitest ^4.1.10`, `jsdom ^30.0.1`, `@vitejs/plugin-react ^6.0.5`, `@testing-library/react ^16.3.2`, `@testing-library/jest-dom ^7.0.1`)
   - **`ts-morph`** (`^28.0.0`) : Analyse AST de conformité architecturale
   - **Playwright** (`@playwright/test ^1.62.1`) : Tests E2E de bout en bout
   - **Audit d'architecture** : Script `npm run arch:report` (`scripts/arch-audit.ts` conforme à `SPEC-ARCH-01` à `03`)

---

## 6. Raisons

1. **Adéquation totale avec les compétences de l'équipe :** Deux membres maîtrisent parfaitement React et Next.js, permettant un démarrage immédiat sans perte de temps d'apprentissage.
2. **Unification TypeScript de bout en bout :** Les types TypeScript des schémas Drizzle, des formulaires Zod et des Server Actions sont partagés sans rupture de typage.
3. **Garantie anti-surbooking absolue (`REQ-012`) :** Kysely permet d'exécuter des verrous pessimistes SQL (`FOR UPDATE`) sur PostgreSQL dans des transactions sérialisables, garantissant qu'aucune place n'est vendue en doublon.
4. **Conformité stricte aux contraintes légales et architecturales :**
   - La génération PDF en mémoire (`@react-pdf/renderer ^4.6.1`) respecte l'obligation de non-stockage de fichiers physiques (`SPEC-FAC-02`).
   - L'utilisation de `server-only ^0.0.1` et du pattern Factory Zod respecte à 100 % `SPEC-ARCH-02`.
5. **Stratégie de test complète :** Exécution instantanée en mémoire avec Vitest (`npm test`, `npm run test:arch`) et validation E2E avec Playwright.
6. **Coût d'hébergement maîtrisé :** Hébergement VPS économique (5 à 10 €/mois) respectant le budget client.

---

## 7. Conséquences acceptées

- Séparation rigoureuse de la logique métier et de la persistance sous `src/services/` et `src/lib/server/db/` conformément à `SPEC-ARCH-02`.
- Gestion des migrations de schéma via `drizzle-kit` à chaque évolution du modèle de données.
- Exécution systématique de la commande d'audit `npm run arch:report` avant chaque commit pour prévenir toute dérive de code.

---

## 8. Ce qui nous ferait revenir dessus

- Découverte d'une incompatibilité bloquante imprévue entre l'environnement de déploiement client et le moteur PostgreSQL / Next.js.
- Décision de la direction de déléguer la billetterie à une solution SaaS tierce hébergée clé en main.