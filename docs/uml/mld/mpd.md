# Modèle Physique de Données (MPD) — Ti'Baleine

Ce document définit le **Modèle Physique de Données (MPD)** pour le système de gestion et de réservation d'excursions maritimes **Ti'Baleine**. Il établit la correspondance directe et stricte avec les entités et propriétés du [Diagramme de Classes du Domaine Métier](../domain.puml), en y ajoutant uniquement les identifiants techniques `UUID` (clés primaires et étrangères) et en liant chaque élément aux spécifications fonctionnelles :
* [Spécification Réservation](../../specs/reservation.md) (`SPEC-RESERVATION-03`)
* [Spécification Facturation](../../specs/facturation.md) (`SPEC-FAC-02`)
* [Spécification Administration Back-Office](../../specs/admin.md) (`SPEC-ADMIN-01` à `SPEC-ADMIN-08`)

---

## 1. Matrice de Traçabilité Globale : Spécifications $\leftrightarrow$ Schéma Physique

| Spécification | Titre / Périmètre | Exigences / Règles clés | Tables & Éléments MPD |
| :--- | :--- | :--- | :--- |
| [**`SPEC-RESERVATION-03`**](../../specs/reservation.md) | Parcours de réservation grand public multi-sites et paiement scindé (acompte + solde) | `REQ-001` à `REQ-007`, `REQ-012`, `REQ-016`, `REQ-019`, `REQ-021`, `REQ-107`, `R-01` à `R-08`, `R-10` à `R-12`, `C-01` à `C-07`, `C-20`, `C-25`, `C-26` | `users`, `creneaux`, `reservations`, `billets`, `paiements`, `tokens_paiement_solde`, `port_enum`, `activite_enum`, `type_billet_enum`, `statut_reservation_enum`, `type_paiement_enum`, `canal_paiement_enum` |
| [**`SPEC-FAC-02`**](../../specs/facturation.md) | Facturation dynamique distincte (acompte & solde) & émission par courriel | `REQ-008`, `R-07`, `R-31`, `C-14`, `REQ-106`, `AC-1` à `AC-8` | `paiements` (`type_paiement`, `reference_facture`, `statut_emission_facture`, `date_emission_facture`), `type_paiement_enum`, `statut_emission_facture_enum` |
| [**`SPEC-ADMIN-01`**](../../specs/admin.md#spec-admin-01--consultation-du-planning-et-supervision-multi-sites) | Consultation planning, supervision multi-sites & statuts financiers jour J | `REQ-009`, `REQ-010`, `REQ-023`, `R-01`, `R-03`, `R-10`, `R-25`, `R-30`, `C-03` à `C-05`, `C-16`, `C-28` | `creneaux` (`alerte_id`, `sous_pre_alerte`), `reservations` (`statut`), `paiements`, `port_enum` |
| [**`SPEC-ADMIN-02`**](../../specs/admin.md#spec-admin-02--annulation-dune-réservation-suppression-totale-des-billets-calcul-de-remboursement-indicatif-et-notification-client) | Annulation de réservation (suppression de billets) et calcul indicatif de remboursement | `REQ-013`, `REQ-014`, `REQ-020`, `R-16`, `R-17`, `R-27`, `R-28`, `R-29`, `C-08` à `C-10`, `C-24`, `C-27` | `reservations` (`statut = 'ANNULEE'`), `billets` (`DELETE CASCADE` / 0 billet actif), `paiements` (calcul indicatif basé sur montants perçus) |
| [**`SPEC-ADMIN-03`**](../../specs/admin.md#spec-admin-03--réduction-du-nombre-de-passagers-suppression-partielle-de-billets) | Réduction de passagers (suppression partielle) | `REQ-015`, `R-18`, `C-08`, `REQ-108` | `billets` (`DELETE` sélectif de $N$ lignes), `reservations` |
| [**`SPEC-ADMIN-04`**](../../specs/admin.md#spec-admin-04--authentification-au-back-office-administrateur) | Authentification back-office (profil unique) | `C-16`, `REQ-103`, `AC-1` | `users` (`role = 'ADMIN'`, `mot_de_passe NOT NULL`) |
| [**`SPEC-ADMIN-05`**](../../specs/admin.md#spec-admin-05--visualisation-du-taux-de-remplissage-et-jauges-par-créneau) | Taux de remplissage et jauges par créneau | `REQ-010`, `R-01`, `R-03`, `R-10`, `C-05`, `REQ-108` | `creneaux`, décompte dynamique `COUNT(billets)` |
| [**`SPEC-ADMIN-06`**](../../specs/admin.md#spec-admin-06--envoi-groupé-dalertes-de-pré-annulation-la-veille-à-18h) | Envoi groupé d'alertes météo la veille à 18h | `REQ-017`, `REQ-018`, `R-22` à `R-26`, `C-21` à `C-23` | `alertes` (`date_emission`), `creneaux` (`alerte_id`, `sous_pre_alerte`) |
| [**`SPEC-ADMIN-07`**](../../specs/admin.md#spec-admin-07--configuration-et-gestion-des-créneaux) | Configuration & gestion manuelle des créneaux | `REQ-011`, `R-12`, `R-13`, `R-15`, `C-18`, `C-19` | `creneaux` (`est_ouvert`, `activite`, `port`), `activite_enum` |
| [**`SPEC-ADMIN-08`**](../../specs/admin.md#spec-admin-08--pointage-et-encaissement-du-solde-par-carte-bancaire-sur-place-le-jour-j) | Pointage et encaissement du solde CB sur place le jour J | `REQ-022`, `R-07`, `R-30`, `C-28` | `paiements` (`type_paiement = 'SOLDE'`, `canal_paiement = 'SUR_PLACE_CB'`), `reservations` (`statut → 'PAYEE_COMPLETEMENT'`) |

---

## 2. Choix d'Architecture et Conventions Physiques

- **SGBD cible :** PostgreSQL 14+ (support natif des `UUID`, des types `ENUM`, de l'horodatage `TIMESTAMPTZ` et du type monétaire précis `DECIMAL(10,2)`).
- **Clés primaires & étrangères (`UUID`) :** Toutes les tables utilisent des identifiants `UUID` (v4, générés avec `gen_random_uuid()`), assurant l'unicité globale et l'obscurcissement des identifiants numériques publics.
- **Conformité stricte aux propriétés du domaine :** Aucune colonne supplémentaire non spécifiée dans le domaine n'est injectée. Seules figurent les propriétés persistées du modèle de domaine métier (`date_creation`, `date_expiration`, `date_paiement`, `date_emission`, `nom`, `prenom`, `montant`…) et les clés relationnelles.
- **Principe de Persistance vs Données Volatiles :**
  - **Configurations en dur (non persistées) :** `ConfigBateau`, `ConfigSkipper`, `ConfigPort`, `ConfigActivite` sont définies dans le code/configuration immuable selon `SPEC-RESERVATION-03` et `SPEC-ADMIN-07`.
  - **Objets temporaires à la volée (non persistés) :**
    - `Facture` : PDF généré dynamiquement en mémoire lors du paiement et transmis par courriel sans persistance de fichier PDF physique sur disque ([`SPEC-FAC-02`](../../specs/facturation.md) AC-1).
    - `NotificationSMS` et `NotificationEmail` : flux transactionnels volatils émis lors des alertes, annulations ou envoi de lien de solde ([`SPEC-RESERVATION-03`](../../specs/reservation.md), [`SPEC-ADMIN-02`](../../specs/admin.md), [`SPEC-ADMIN-06`](../../specs/admin.md)).

---

## 3. Types Énumérés (PostgreSQL ENUMs) & Liaisons Spécifications

```sql
-- Rôles utilisateurs (SPEC-RESERVATION-03 mode invité / SPEC-ADMIN-04 profil unique admin)
CREATE TYPE role_enum AS ENUM (
    'CLIENT', 
    'ADMIN'
);

-- Ports d'embarquement (SPEC-RESERVATION-03, SPEC-ADMIN-01 — R-01, R-03, C-03)
CREATE TYPE port_enum AS ENUM (
    'SAINT_GILLES', 
    'SAINT_LEU'
);

-- Prestations d'excursion (SPEC-RESERVATION-03, SPEC-ADMIN-07 — R-04, R-05, R-12, C-18)
CREATE TYPE activite_enum AS ENUM (
    'BALEINES', 
    'DAUPHINS', 
    'PRIVATISATION_TIKAP', 
    'PRIVATISATION_GRAND_BLEU'
);

-- Catégories de billets passagers (SPEC-RESERVATION-03, SPEC-ADMIN-03 — R-04, R-06, AC-4)
CREATE TYPE type_billet_enum AS ENUM (
    'ADULTE', 
    'ENFANT', 
    'PRIVATISATION'
);

-- Statut financier du cycle de réservation (SPEC-RESERVATION-03 AC-8, SPEC-ADMIN-01 AC-3, SPEC-ADMIN-08)
CREATE TYPE statut_reservation_enum AS ENUM (
    'EN_ATTENTE_PAIEMENT', 
    'PAYEE_PARTIELLEMENT', 
    'PAYEE_COMPLETEMENT', 
    'ANNULEE'
);

-- Nature du paiement scindé (SPEC-RESERVATION-03, SPEC-FAC-02 — acompte 30%/50% puis solde)
CREATE TYPE type_paiement_enum AS ENUM (
    'ACOMPTE', 
    'SOLDE'
);

-- Canal de règlement (SPEC-RESERVATION-03 en ligne, SPEC-ADMIN-08 CB sur place)
CREATE TYPE canal_paiement_enum AS ENUM (
    'EN_LIGNE', 
    'SUR_PLACE_CB'
);

-- Traçabilité d'expédition de facture (SPEC-FAC-02 AC-4, AC-5, AC-8)
CREATE TYPE statut_emission_facture_enum AS ENUM (
    'EN_ATTENTE', 
    'ENVOYEE_SUCCES', 
    'ECHEC_ENVOI'
);
```

---

## 4. Description Détaillée des Tables Persistées & Liaisons Métier

### 4.1. Table `users` (Utilisateurs / Clients & Admin)

> **Spécifications associées :**
> - [`SPEC-RESERVATION-03`](../../specs/reservation.md) (Coordonnées obligatoires du client en mode invité : nom, prénom, email, mobile pour alertes SMS et lien de solde J-1 — `REQ-005`, `C-20`, `REQ-105`, `AC-6`).
> - [`SPEC-ADMIN-04`](../../specs/admin.md#spec-admin-04--authentification-au-back-office-administrateur) (Compte unique de l'administrateur back-office sécurisé par mot de passe — `C-16`, `REQ-103`, `AC-1`).

| Colonne | Type de données | Contraintes | Valeur par défaut | Description & Liaison Spécification |
| :--- | :--- | :--- | :--- | :--- |
| **`id`** | `UUID` | **PRIMARY KEY** | `gen_random_uuid()` | Identifiant unique universel du compte. |
| **`nom`** | `VARCHAR(100)` | **NOT NULL** | — | Nom du titulaire (`SPEC-RESERVATION-03` AC-6). |
| **`prenom`** | `VARCHAR(100)` | **NOT NULL** | — | Prénom du titulaire (`SPEC-RESERVATION-03` AC-6). |
| **`email`** | `VARCHAR(255)` | **UNIQUE, NOT NULL** | — | Identifiant de connexion admin (`SPEC-ADMIN-04`) et adresse d'envoi de la facture PDF (`SPEC-FAC-02`). |
| **`telephone`** | `VARCHAR(20)` | **NOT NULL** | — | Numéro de mobile obligatoire pour l'expédition des SMS d'annulation, d'alerte météo et du lien de solde J-1 (`REQ-005`, `C-20`, `SPEC-ADMIN-02`, `SPEC-RESERVATION-03`). |
| **`role`** | `role_enum` | **NOT NULL** | `'CLIENT'` | Niveau d'accès : `CLIENT` (mode invité) ou `ADMIN` (`SPEC-ADMIN-04`). |
| **`mot_de_passe`** | `VARCHAR(255)` | **NULLABLE** | `NULL` | Hash sécurisé du mot de passe (rempli uniquement pour `ADMIN`, `NULL` pour les clients invités sans compte). |

---

### 4.2. Table `alertes` (Alertes Météo & Pré-annulations)

> **Spécifications associées :**
> - [`SPEC-ADMIN-06`](../../specs/admin.md#spec-admin-06--envoi-groupé-dalertes-de-pré-annulation-la-veille-à-18h) (Émission groupée à J-1 18h d'alertes bilingues combinées FR+EN — `REQ-017`, `REQ-018`, `R-22` à `R-26`, `C-21` à `C-23`, `AC-1` à `AC-4`).
> - [`SPEC-RESERVATION-03`](../../specs/reservation.md) (Conditionne l'affichage de la mention d'avertissement en ligne `REQ-019`, `R-25`, `AC-7` et le droit au remboursement 100% `R-27`, `R-28`).

| Colonne | Type de données | Contraintes | Valeur par défaut | Description & Liaison Spécification |
| :--- | :--- | :--- | :--- | :--- |
| **`id`** | `UUID` | **PRIMARY KEY** | `gen_random_uuid()` | Identifiant unique de l'alerte diffusée. |
| **`message`** | `TEXT` | **NOT NULL** | — | Corps textuel combiné regroupant la version FR suivie de la version EN dans un champ unique (`SPEC-ADMIN-06` AC-3, `R-26`). |
| **`date_emission`** | `TIMESTAMPTZ` | **NOT NULL** | `NOW()` | Horodatage de l'émission de l'alerte (typiquement J-1 à 18h). Traduit `dateEmission: DateTime` du domaine. |

---

### 4.3. Table `creneaux` (Planning des Sorties en Mer)

> **Spécifications associées :**
> - [`SPEC-RESERVATION-03`](../../specs/reservation.md) (Départs 7h, 10h, 14h à Saint-Gilles et 9h mar/jeu à Saint-Leu ; fermeture annuelle 25/12 & 01/01 `R-02` ; verrouillage automatique à H-2 `R-11`, `AC-3`).
> - [`SPEC-ADMIN-01`](../../specs/admin.md#spec-admin-01--consultation-du-planning-et-supervision-multi-sites) (Supervision planning multi-sites, indicateur d'alerte et statuts financiers — `REQ-009`, `REQ-010`, `REQ-023`, `AC-1` à `AC-3`).
> - [`SPEC-ADMIN-05`](../../specs/admin.md#spec-admin-05--visualisation-du-taux-de-remplissage-et-jauges-par-créneau) (Jauges réelles : 36 standard, 24 mar/jeu matin St-Gilles, 12 St-Leu — `R-03`, `R-10`, `AC-1`).
> - [`SPEC-ADMIN-06`](../../specs/admin.md#spec-admin-06--envoi-groupé-dalertes-de-pré-annulation-la-veille-à-18h) (Émission d'alerte activant `sous_pre_alerte` — `AC-4`).
> - [`SPEC-ADMIN-07`](../../specs/admin.md#spec-admin-07--configuration-et-gestion-des-créneaux) (Ouverture/fermeture manuelle `est_ouvert`, exclusivité d'activité `R-12`, assignation naturaliste `R-15`).

| Colonne | Type de données | Contraintes | Valeur par défaut | Description & Liaison Spécification |
| :--- | :--- | :--- | :--- | :--- |
| **`id`** | `UUID` | **PRIMARY KEY** | `gen_random_uuid()` | Identifiant unique du créneau au planning. |
| **`date`** | `DATE` | **NOT NULL** | — | Date de l'excursion (`SPEC-RESERVATION-03` ; hors 25/12 et 01/01 `R-02`). |
| **`heure_depart`** | `TIME` | **NOT NULL** | — | Heure de départ standardisée : `07:00:00`, `09:00:00`, `10:00:00`, `14:00:00` (`R-01`). |
| **`port`** | `port_enum` | **NOT NULL** | — | Port de départ : `SAINT_GILLES` ou `SAINT_LEU` (`R-01`, `R-03`). |
| **`activite`** | `activite_enum` | **NOT NULL** | — | Activité exclusive du créneau (`R-12`, `SPEC-ADMIN-07` AC-2). |
| **`est_ouvert`** | `BOOLEAN` | **NOT NULL** | `TRUE` | État d'ouverture (`FALSE` si fermé manuellement par l'admin `SPEC-ADMIN-07` ou clos automatiquement à H-2 `R-11`). |
| **`sous_pre_alerte`** | `BOOLEAN` | **NOT NULL** | `FALSE` | Indicateur de pré-alerte activé lors de l'émission d'une alerte (`SPEC-ADMIN-06` AC-4). Déclenche l'affichage de la mention d'avertissement publique (`SPEC-RESERVATION-03` AC-7) et le badge admin (`SPEC-ADMIN-01` AC-2). |
| **`alerte_id`** | `UUID` | **FOREIGN KEY (`alertes.id`)**, `NULLABLE`, `ON DELETE SET NULL` | `NULL` | Référence de l'alerte active émise la veille (`SPEC-ADMIN-06`). |

*Contrainte d'unicité composite : `CONSTRAINT uq_creneau_port_date_heure_activite UNIQUE (port, date, heure_depart, activite)` permettant la cohabitation de plusieurs activités/navires au même port et horaire.*

---

### 4.4. Table `reservations` (Dossiers de Réservation)

> **Spécifications associées :**
> - [`SPEC-RESERVATION-03`](../../specs/reservation.md) (Tunnel de réservation, paiement scindé acompte/solde, référence publique — `REQ-001`, `REQ-006`, `REQ-007`, `REQ-021`, `AC-8` à `AC-11`).
> - [`SPEC-ADMIN-01`](../../specs/admin.md#spec-admin-01--consultation-du-planning-et-supervision-multi-sites) (Visualisation des statuts financiers jour J : « payée complètement » vs « payée partiellement » — `REQ-023`, `R-30`, `AC-3`).
> - [`SPEC-ADMIN-02`](../../specs/admin.md#spec-admin-02--annulation-dune-réservation-suppression-totale-des-billets-calcul-de-remboursement-indicatif-et-notification-client) (Conservation de l'enregistrement de réservation avec 0 billet actif lors d'une annulation administrative — `REQ-013`, `C-09`, `AC-1`).
> - [`SPEC-ADMIN-03`](../../specs/admin.md#spec-admin-03--réduction-du-nombre-de-passagers-suppression-partielle-de-billets) (Maintien de la réservation sans ajout de billet ni report possible — `REQ-015`, `R-18`, `AC-2`).
> - [`SPEC-ADMIN-08`](../../specs/admin.md#spec-admin-08--pointage-et-encaissement-du-solde-par-carte-bancaire-sur-place-le-jour-j) (Basculement à `PAYEE_COMPLETEMENT` après encaissement du solde sur place — `REQ-022`, `AC-1`).

| Colonne | Type de données | Contraintes | Valeur par défaut | Description & Liaison Spécification |
| :--- | :--- | :--- | :--- | :--- |
| **`id`** | `UUID` | **PRIMARY KEY** | `gen_random_uuid()` | Identifiant unique de la réservation. |
| **`reference`** | `VARCHAR(20)` | **UNIQUE, NOT NULL** | — | Référence publique communiquée au client (ex: `TB-A8F2`, `SPEC-RESERVATION-03`). |
| **`statut`** | `statut_reservation_enum` | **NOT NULL** | `'EN_ATTENTE_PAIEMENT'` | Statut financier du dossier : `EN_ATTENTE_PAIEMENT`, `PAYEE_PARTIELLEMENT` (acompte réglé, solde dû), `PAYEE_COMPLETEMENT` (acompte + solde réglés), ou `ANNULEE` (0 billet actif). |
| **`creneau_id`** | `UUID` | **FOREIGN KEY (`creneaux.id`)**, **NOT NULL**, `ON DELETE RESTRICT` | — | Lien vers le créneau d'excursion retenu (`SPEC-RESERVATION-03`). |
| **`user_id`** | `UUID` | **FOREIGN KEY (`users.id`)**, **NOT NULL**, `ON DELETE RESTRICT` | — | Lien vers le client réservataire (`SPEC-RESERVATION-03` AC-6). |
| **`date_creation`** | `TIMESTAMPTZ` | **NOT NULL** | `NOW()` | Horodatage de l'initiation de la réservation. Traduit `dateCreation: DateTime` du domaine. Nécessaire pour la logique temporelle du cron SMS J-1 (`C-26`). |

---

### 4.5. Table `billets` (Titres de Transport / Passagers Individuels)

> **Spécifications associées :**
> - [`SPEC-RESERVATION-03`](../../specs/reservation.md) (Tarification par type de billet : adulte $\ge 12$ ans, enfant 4–11 ans, forfait privatisation, blocage $< 4$ ans — `REQ-004`, `REQ-016`, `R-04` à `R-06`, `R-19`, `AC-4`, `AC-5`).
> - [`SPEC-ADMIN-02`](../../specs/admin.md#spec-admin-02--annulation-dune-réservation-suppression-totale-des-billets-calcul-de-remboursement-indicatif-et-notification-client) (Suppression totale des billets pour libérer synchroniquement toutes les places du créneau — `REQ-013`, `AC-1`, `AC-2`).
> - [`SPEC-ADMIN-03`](../../specs/admin.md#spec-admin-03--réduction-du-nombre-de-passagers-suppression-partielle-de-billets) (Suppression sélective de $N$ billets libérant synchroniquement $N$ places sur la jauge — `REQ-015`, `AC-1`).
> - [`SPEC-ADMIN-05`](../../specs/admin.md#spec-admin-05--visualisation-du-taux-de-remplissage-et-jauges-par-créneau) (Le nombre de places occupées est calculé dynamiquement par `COUNT(billets)` — `REQ-010`, `AC-1`).

| Colonne | Type de données | Contraintes | Valeur par défaut | Description & Liaison Spécification |
| :--- | :--- | :--- | :--- | :--- |
| **`id`** | `UUID` | **PRIMARY KEY** | `gen_random_uuid()` | Identifiant unique du billet individuel. |
| **`reservation_id`** | `UUID` | **FOREIGN KEY (`reservations.id`)**, **NOT NULL**, `ON DELETE CASCADE` | — | Rattachement au dossier parent (`SPEC-ADMIN-02` / `SPEC-ADMIN-03`). |
| **`type_billet`** | `type_billet_enum` | **NOT NULL** | — | Catégorie tarifaire : `ADULTE` ($\ge 12$ ans), `ENFANT` (4–11 ans) ou `PRIVATISATION` (`R-04`, `R-06`). |

---

### 4.6. Table `paiements` (Transactions Bancaires & Traçabilité Facturation)

> **Spécifications associées :**
> - [`SPEC-RESERVATION-03`](../../specs/reservation.md) (Paiement scindé : acompte obligatoire 30 % standard / 50 % privatisation par CB en ligne, puis solde via SMS J-1 ou CB sur place — `REQ-006`, `REQ-007`, `REQ-021`, `R-07`, `AC-8` à `AC-10`).
> - [`SPEC-FAC-02`](../../specs/facturation.md) (Génération à la volée de deux factures PDF distinctes en mémoire, attribution d'un numéro unique `reference_facture`, persistance de l'état d'envoi SMTP, garantie d'idempotence anti-doublon webhook — `REQ-008`, `R-31`, `C-14`, `AC-1` à `AC-8`).
> - [`SPEC-ADMIN-08`](../../specs/admin.md#spec-admin-08--pointage-et-encaissement-du-solde-par-carte-bancaire-sur-place-le-jour-j) (Encaissement du solde CB sur place : `type_paiement = 'SOLDE'`, `canal_paiement = 'SUR_PLACE_CB'` — `REQ-022`, `AC-1`, `AC-2`).

| Colonne | Type de données | Contraintes | Valeur par défaut | Description & Liaison Spécification |
| :--- | :--- | :--- | :--- | :--- |
| **`id`** | `UUID` | **PRIMARY KEY** | `gen_random_uuid()` | Identifiant unique de la transaction de paiement. |
| **`reservation_id`** | `UUID` | **FOREIGN KEY (`reservations.id`)**, **NOT NULL**, `ON DELETE RESTRICT` | — | Lien vers la réservation (1 à 2 paiements par réservation : acompte puis solde). |
| **`type_paiement`** | `type_paiement_enum` | **NOT NULL** | — | Nature du paiement : `ACOMPTE` (30 % standard ou 50 % privatisation) ou `SOLDE` (complément restant). Traduit `typePaiement` du domaine. |
| **`canal_paiement`** | `canal_paiement_enum` | **NOT NULL** | — | Canal de règlement : `EN_LIGNE` (CB sécurisée via tunnel ou lien SMS) ou `SUR_PLACE_CB` (embarcadère, `SPEC-ADMIN-08`). Traduit `canalPaiement` du domaine. |
| **`reference_transaction`** | `VARCHAR(100)` | **UNIQUE, NOT NULL** | — | Identifiant unique de transaction délivré par la passerelle bancaire. |
| **`montant`** | `DECIMAL(10,2)` | **NOT NULL**, `CHECK (montant > 0)` | — | Montant réglé en euros (acompte ou solde, incluant la majoration géographique si applicable, `R-05`). |
| **`date_paiement`** | `TIMESTAMPTZ` | **NOT NULL** | `NOW()` | Horodatage exact de la validation bancaire (`datePaiement: DateTime` dans le domaine). |
| **`reference_facture`** | `VARCHAR(50)` | **UNIQUE, NOT NULL** | — | Identifiant officiel unique de la facture émise (ex: `FACT-AC-2026-00123` pour l'acompte, `FACT-SO-2026-00456` pour le solde, `SPEC-FAC-02` AC-1, AC-2). |
| **`statut_emission_facture`** | `statut_emission_facture_enum` | **NOT NULL** | `'EN_ATTENTE'` | Indicateur de traçabilité de l'envoi courriel : `EN_ATTENTE`, `ENVOYEE_SUCCES`, `ECHEC_ENVOI` (`SPEC-FAC-02` AC-4, AC-5). |
| **`date_emission_facture`** | `TIMESTAMPTZ` | **NULLABLE** | `NULL` | Horodatage d'envoi réussi du courriel avec la facture PDF (`SPEC-FAC-02` AC-4). |

---

### 4.7. Table `tokens_paiement_solde` (Tokens Sécurisés de Paiement du Solde)

> **Spécifications associées :**
> - [`SPEC-RESERVATION-03`](../../specs/reservation.md) (Envoi automatique à J-1 d'un SMS contenant l'URL sécurisée de paiement du solde avec token temporaire valide 1 heure — `REQ-021`, `REQ-107`, `AC-9`, `AC-10`).

| Colonne | Type de données | Contraintes | Valeur par défaut | Description & Liaison Spécification |
| :--- | :--- | :--- | :--- | :--- |
| **`id`** | `UUID` | **PRIMARY KEY** | `gen_random_uuid()` | Identifiant unique du token. |
| **`reservation_id`** | `UUID` | **FOREIGN KEY (`reservations.id`)**, **UNIQUE, NOT NULL**, `ON DELETE CASCADE` | — | Lien 1..1 strict vers la réservation associée (un seul token par réservation). |
| **`token`** | `VARCHAR(255)` | **UNIQUE, NOT NULL** | — | Jeton sécurisé unique intégré dans l'URL de paiement du solde transmise par SMS (`REQ-107`). |
| **`date_creation`** | `TIMESTAMPTZ` | **NOT NULL** | `NOW()` | Horodatage de la génération du token par le cron J-1. Traduit `dateCreation: DateTime` du domaine. |
| **`date_expiration`** | `TIMESTAMPTZ` | **NOT NULL** | — | Horodatage d'expiration (`date_creation` + 1 heure). Durée de validité technique : 60 minutes (`REQ-107`). Traduit `dateExpiration: DateTime` du domaine. |
| **`est_utilise`** | `BOOLEAN` | **NOT NULL** | `FALSE` | Indicateur de consommation du token (`TRUE` après paiement du solde validé avec succès). |

---

## 5. Matrice des Relations et Règles d'Intégrité Référentielle

| Table Parente | Table Enfant | Clé Étrangère (`FK`) | Cardinalité | Règle `ON DELETE` | Règle `ON UPDATE` | Rationale & Règle Métier |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`alertes`** | **`creneaux`** | `creneaux.alerte_id` | 0..1 $\rightarrow$ 1..* | `SET NULL` | `CASCADE` | Une alerte émise cible obligatoirement au moins un créneau (`1..*`). Si une alerte météo ancienne est purgée, le créneau reste au planning et son fanion d'alerte redevient `NULL` ([`SPEC-ADMIN-06`](../../specs/admin.md#spec-admin-06--envoi-groupé-dalertes-de-pré-annulation-la-veille-à-18h)). |
| **`creneaux`** | **`reservations`** | `reservations.creneau_id` | 1 $\rightarrow$ 0..* | `RESTRICT` | `CASCADE` | Empêche la suppression physique d'un créneau si des réservations y sont rattachées ([`SPEC-ADMIN-07`](../../specs/admin.md#spec-admin-07--configuration-et-gestion-des-créneaux) AC-1). |
| **`users`** | **`reservations`** | `reservations.user_id` | 1 $\rightarrow$ 0..* | `RESTRICT` | `CASCADE` | Préserve l'intégrité de l'historique de commande client ([`SPEC-RESERVATION-03`](../../specs/reservation.md)). |
| **`reservations`** | **`billets`** | `billets.reservation_id` | 1 $\rightarrow$ 0..* | `CASCADE` | `CASCADE` | Les billets sont des entités dépendantes du dossier de réservation. L'annulation admin supprime les billets ([`SPEC-ADMIN-02`](../../specs/admin.md) AC-1). |
| **`reservations`** | **`paiements`** | `paiements.reservation_id` | 1 $\rightarrow$ 0..2 | `RESTRICT` | `CASCADE` | Protège les enregistrements comptables (acompte et solde) ([`SPEC-FAC-02`](../../specs/facturation.md) AC-1, AC-2). |
| **`reservations`** | **`tokens_paiement_solde`** | `tokens_paiement_solde.reservation_id` | 1 $\rightarrow$ 0..1 | `CASCADE` | `CASCADE` | Un token de solde est lié à une unique réservation ; supprimé si la réservation est purgée ([`SPEC-RESERVATION-03`](../../specs/reservation.md) AC-9). |

---

## 6. Règles de Calcul Dynamique & Idempotence (Sans Redondance Physique)

1. **Jauge et Disponibilité des Places ([`SPEC-ADMIN-05`](../../specs/admin.md#spec-admin-05--visualisation-du-taux-de-remplissage-et-jauges-par-créneau), [`SPEC-RESERVATION-03`](../../specs/reservation.md) AC-2) :**
   - Jauge maximale déterminée par les invariants du port et du créneau :
     - Saint-Gilles standard : **36 places** (Tikap 12 + Grand Bleu 24 — `R-10`).
     - Saint-Gilles mardi/jeudi matin (07h et 10h) : **24 places** (Grand Bleu seul — `R-10`).
     - Saint-Leu (mardi/jeudi 09h) : **12 places** (Tikap seul — `R-03`, `R-10`).
   - Places occupées calculées dynamiquement :
     ```sql
     SELECT COUNT(b.id) 
     FROM billets b 
     JOIN reservations r ON b.reservation_id = r.id 
     WHERE r.creneau_id = :creneau_id 
       AND r.statut IN ('PAYEE_PARTIELLEMENT', 'PAYEE_COMPLETEMENT');
     ```
   - Places restantes = $\text{Jauge Max} - \text{Places Occupées}$.

2. **Calcul du Montant et du Paiement Scindé ([`SPEC-RESERVATION-03`](../../specs/reservation.md) AC-4, AC-5, AC-8) :**
   - Tarifs de base (Saint-Gilles) : Baleines (65 € ad / 40 € enf) ; Dauphins (50 € ad / 30 € enf) ; Forfait Tikap (600 €) ; Forfait Grand Bleu (1 100 €).
   - Majoration Saint-Leu : **+10 € / personne** sur les billets individuels (`R-05`). Pas de majoration sur le forfait de privatisation Tikap (600 €).
   - **Acompte :** 30 % du montant total pour les sorties standard, 50 % pour les privatisations (`ConfigActivite.tauxAcompte`).
   - **Solde :** Montant total − acompte (70 % ou 50 %).
   - **Solde restant dû :** Montant total − somme des paiements effectivement reçus.
   - Les montants sont calculés à la volée par le moteur métier.

3. **Idempotence de la Facturation et des Webhooks Bancaires ([`SPEC-FAC-02`](../../specs/facturation.md) AC-7, AC-8) :**
   - L'unicité de `paiements.reference_transaction` et `paiements.reference_facture` empêche tout double encaissement ou doublon de facture.
   - La contrainte d'unicité composite `(reservation_id, type_paiement)` garantit au plus un paiement d'acompte et un paiement de solde par réservation.
   - Si `statut_emission_facture = 'ENVOYEE_SUCCES'`, aucun renvoi de facture n'est réexécuté lors d'un éventuel webhook dupliqué.
   - En cas d'échec SMTP (`statut_emission_facture = 'ECHEC_ENVOI'`), le système peut relancer la génération à la volée du PDF et l'expédition sans créer de nouvel enregistrement (`SPEC-FAC-02` AC-5).

4. **Gestion du Token de Paiement du Solde ([`SPEC-RESERVATION-03`](../../specs/reservation.md) AC-9, AC-10) :**
   - Le cron J-1 sélectionne les réservations `PAYEE_PARTIELLEMENT` prévues pour le lendemain et créées avant l'exécution du cron (`date_creation`).
   - Un `TokenPaiementSolde` est généré avec `date_expiration = date_creation + INTERVAL '1 hour'`.
   - L'unicité de `tokens_paiement_solde.reservation_id` empêche la génération de multiples tokens pour une même réservation.
   - À l'accès de la page de paiement, la validité est vérifiée : `est_utilise = FALSE` ET `NOW() < date_expiration`.

---

## 7. Script DDL PostgreSQL (Création Complète du Schéma)

```sql
-- ====================================================================
-- SCRIPT DDL POSTGRESQL CORRIGÉ — TI'BALEINE (MPD v2)
-- Alignement strict : Specs v4 / CDC v5 / Domaine / MLD / MPD
-- ====================================================================

-- 1. Extension pour la génération automatique des UUID v4
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Création des Types Énumérés
CREATE TYPE role_enum AS ENUM ('CLIENT', 'ADMIN');
CREATE TYPE port_enum AS ENUM ('SAINT_GILLES', 'SAINT_LEU');
CREATE TYPE activite_enum AS ENUM (
    'BALEINES', 
    'DAUPHINS', 
    'PRIVATISATION_TIKAP', 
    'PRIVATISATION_GRAND_BLEU'
);
CREATE TYPE type_billet_enum AS ENUM ('ADULTE', 'ENFANT', 'PRIVATISATION');
CREATE TYPE statut_reservation_enum AS ENUM (
    'EN_ATTENTE_PAIEMENT', 
    'PAYEE_PARTIELLEMENT', 
    'PAYEE_COMPLETEMENT', 
    'ANNULEE'
);
CREATE TYPE type_paiement_enum AS ENUM ('ACOMPTE', 'SOLDE');
CREATE TYPE canal_paiement_enum AS ENUM ('EN_LIGNE', 'SUR_PLACE_CB');
CREATE TYPE statut_emission_facture_enum AS ENUM (
    'EN_ATTENTE', 
    'ENVOYEE_SUCCES', 
    'ECHEC_ENVOI'
);

-- 3. Table des utilisateurs (Clients invités & Admin unique)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    role role_enum NOT NULL DEFAULT 'CLIENT',
    mot_de_passe VARCHAR(255) NULL
);

-- 4. Table des alertes météo / pré-annulations diffusées à J-1 18h
CREATE TABLE alertes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message TEXT NOT NULL,
    date_emission TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Table des créneaux horaires d'excursion au planning (avec unicité corrigée INC-01)
CREATE TABLE creneaux (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    heure_depart TIME NOT NULL,
    port port_enum NOT NULL,
    activite activite_enum NOT NULL,
    est_ouvert BOOLEAN NOT NULL DEFAULT TRUE,
    sous_pre_alerte BOOLEAN NOT NULL DEFAULT FALSE,
    alerte_id UUID NULL REFERENCES alertes(id) ON DELETE SET NULL,
    CONSTRAINT uq_creneau_port_date_heure_activite UNIQUE (port, date, heure_depart, activite)
);

-- 6. Table des réservations (en-têtes de commande)
CREATE TABLE reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference VARCHAR(20) UNIQUE NOT NULL,
    statut statut_reservation_enum NOT NULL DEFAULT 'EN_ATTENTE_PAIEMENT',
    creneau_id UUID NOT NULL REFERENCES creneaux(id) ON DELETE RESTRICT,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    date_creation TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Table des billets passagers (places actives)
CREATE TABLE billets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reservation_id UUID NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
    type_billet type_billet_enum NOT NULL
);

-- 8. Table des paiements et traçabilité de facturation (1 à 2 par réservation : acompte + solde)
CREATE TABLE paiements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reservation_id UUID NOT NULL REFERENCES reservations(id) ON DELETE RESTRICT,
    type_paiement type_paiement_enum NOT NULL,
    canal_paiement canal_paiement_enum NOT NULL,
    reference_transaction VARCHAR(100) UNIQUE NOT NULL,
    montant DECIMAL(10,2) NOT NULL CHECK (montant > 0),
    date_paiement TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reference_facture VARCHAR(50) UNIQUE NOT NULL,
    statut_emission_facture statut_emission_facture_enum NOT NULL DEFAULT 'EN_ATTENTE',
    date_emission_facture TIMESTAMPTZ NULL,
    CONSTRAINT uq_paiement_reservation_type UNIQUE (reservation_id, type_paiement)
);

-- 9. Table des tokens sécurisés de paiement du solde (lien SMS J-1)
CREATE TABLE tokens_paiement_solde (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reservation_id UUID UNIQUE NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    date_creation TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    date_expiration TIMESTAMPTZ NOT NULL,
    est_utilise BOOLEAN NOT NULL DEFAULT FALSE
);

-- ==========================================================
-- INDEX D'OPTIMISATION DE PERFORMANCE
-- ==========================================================
CREATE INDEX idx_creneaux_date_port ON creneaux(date, port);
CREATE INDEX idx_creneaux_alerte_id ON creneaux(alerte_id);
CREATE INDEX idx_creneaux_sous_pre_alerte ON creneaux(sous_pre_alerte) WHERE sous_pre_alerte = TRUE;
CREATE INDEX idx_reservations_creneau_id ON reservations(creneau_id);
CREATE INDEX idx_reservations_user_id ON reservations(user_id);
CREATE INDEX idx_reservations_statut ON reservations(statut);
CREATE INDEX idx_reservations_date_creation ON reservations(date_creation);
CREATE INDEX idx_billets_reservation_id ON billets(reservation_id);
CREATE INDEX idx_paiements_reservation_id ON paiements(reservation_id);
CREATE INDEX idx_tokens_reservation_id ON tokens_paiement_solde(reservation_id);
CREATE INDEX idx_tokens_date_expiration ON tokens_paiement_solde(date_expiration) WHERE est_utilise = FALSE;
```