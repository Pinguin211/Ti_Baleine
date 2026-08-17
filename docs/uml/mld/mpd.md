# Modèle Physique de Données (MPD) — Ti'Baleine

Ce document définit le **Modèle Physique de Données (MPD)** pour le système de gestion et de réservation d'excursions maritimes **Ti'Baleine**. Il établit la correspondance directe et stricte avec les entités et propriétés du [Diagramme de Classes du Domaine Métier](../domain.puml), en y ajoutant uniquement les identifiants techniques `UUID` (clés primaires et étrangères) et en liant chaque élément aux spécifications fonctionnelles :
* [Spécification Réservation](../../specs/reservation.md) (`SPEC-RESERVATION-03`)
* [Spécification Facturation](../../specs/facturation.md) (`SPEC-FAC-02`)
* [Spécification Administration Back-Office](../../specs/admin.md) (`SPEC-ADMIN-01` à `SPEC-ADMIN-07`)

---

## 1. Matrice de Traçabilité Globale : Spécifications $\leftrightarrow$ Schéma Physique

| Spécification | Titre / Périmètre | Exigences / Règles clés | Tables & Éléments MPD |
| :--- | :--- | :--- | :--- |
| [**`SPEC-RESERVATION-03`**](../../specs/reservation.md) | Parcours de réservation grand public multi-sites | `REQ-001` à `REQ-007`, `REQ-012`, `REQ-016`, `REQ-019`, `R-01` à `R-07`, `R-10` à `R-12`, `C-01` à `C-07`, `C-20` | `users`, `creneaux`, `reservations`, `billets`, `paiements`, `port_enum`, `activite_enum`, `type_billet_enum`, `statut_reservation_enum` |
| [**`SPEC-FAC-02`**](../../specs/facturation.md) | Facturation dynamique & émission par courriel | `REQ-008`, `R-08`, `C-14`, `REQ-106`, `AC-1` à `AC-7` | `paiements` (`reference_facture`, `statut_emission_facture`, `date_emission_facture`), `statut_emission_facture_enum` |
| [**`SPEC-ADMIN-01`**](../../specs/admin.md#spec-admin-01--consultation-du-planning-et-supervision-multi-sites) | Consultation planning & supervision multi-sites | `REQ-009`, `REQ-010`, `R-01`, `R-03`, `R-10`, `R-25`, `C-03` à `C-05`, `C-16` | `creneaux` (liaison `alerte_id`), `reservations`, `port_enum` |
| [**`SPEC-ADMIN-02`**](../../specs/admin.md#spec-admin-02--annulation-dune-réservation-suppression-totale-des-billets-et-notification-client) | Annulation de réservation (suppression de billets) | `REQ-013`, `REQ-014`, `REQ-020`, `R-16`, `R-17`, `R-27`, `R-28`, `C-08` à `C-10`, `C-24` | `reservations` (`statut = 'ANNULEE'`), `billets` (`DELETE CASCADE` / 0 billet actif) |
| [**`SPEC-ADMIN-03`**](../../specs/admin.md#spec-admin-03--réduction-du-nombre-de-passagers-suppression-partielle-de-billets) | Réduction de passagers (suppression partielle) | `REQ-015`, `R-18`, `C-08`, `REQ-107` | `billets` (`DELETE` sélectif de $N$ lignes), `reservations` |
| [**`SPEC-ADMIN-04`**](../../specs/admin.md#spec-admin-04--authentification-au-back-office-administrateur) | Authentification back-office (profil unique) | `C-16`, `REQ-103`, `AC-1` | `users` (`role = 'ADMIN'`, `mot_de_passe NOT NULL`) |
| [**`SPEC-ADMIN-05`**](../../specs/admin.md#spec-admin-05--visualisation-du-taux-de-remplissage-et-jauges) | Taux de remplissage et jauges par créneau | `REQ-010`, `R-01`, `R-03`, `R-10`, `C-05`, `REQ-107` | `creneaux`, décompte dynamique `COUNT(billets)` |
| [**`SPEC-ADMIN-06`**](../../specs/admin.md#spec-admin-06--envoi-groupé-dalertes-de-pré-annulation-la-veille-à-18h) | Envoi groupé d'alertes météo la veille à 18h | `REQ-017`, `REQ-018`, `R-22` à `R-26`, `C-21` à `C-23` | `alertes`, `creneaux.alerte_id` |
| [**`SPEC-ADMIN-07`**](../../specs/admin.md#spec-admin-07--configuration-et-gestion-des-créneaux) | Configuration & gestion manuelle des créneaux | `REQ-011`, `R-12`, `R-13`, `R-15`, `C-18`, `C-19` | `creneaux` (`est_ouvert`, `activite`, `port`), `activite_enum` |

---

## 2. Choix d'Architecture et Conventions Physiques

- **SGBD cible :** PostgreSQL 14+ (support natif des `UUID`, des types `ENUM`, de l'horodatage `TIMESTAMPTZ` et du type monétaire précis `DECIMAL(10,2)`).
- **Clés primaires & étrangères (`UUID`) :** Toutes les tables utilisent des identifiants `UUID` (v4, générés avec `gen_random_uuid()`), assurant l'unicité globale et l'obscurcissement des identifiants numériques publics.
- **Conformité stricte aux propriétés du domaine :** Aucune colonne supplémentaire non spécifiée dans le domaine (telles que des dates de création ou d'audit génériques) n'est injectée. Seules figurent les propriétés persistées du modèle de domaine métier et les clés relationnelles.
- **Principe de Persistance vs Données Volatiles :**
  - **Configurations en dur (non persistées) :** `ConfigBateau`, `ConfigSkipper`, `ConfigPort`, `ConfigActivite` sont définies dans le code/configuration immuable selon `SPEC-RESERVATION-03` et `SPEC-ADMIN-07`.
  - **Objets temporaires à la volée (non persistés) :**
    - `Facture` : PDF généré dynamiquement en mémoire lors du paiement et transmis par courriel sans persistance de fichier PDF physique sur disque ([`SPEC-FAC-02`](../../specs/facturation.md) AC-1).
    - `NotificationSMS` et `NotificationEmail` : flux transactionnels volatils émis lors des alertes ou annulations ([`SPEC-ADMIN-02`](../../specs/admin.md#spec-admin-02--annulation-dune-réservation-suppression-totale-des-billets-et-notification-client), [`SPEC-ADMIN-06`](../../specs/admin.md#spec-admin-06--envoi-groupé-dalertes-de-pré-annulation-la-veille-à-18h)).

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

-- Statut du cycle de réservation (SPEC-RESERVATION-03 AC-8, SPEC-ADMIN-02 AC-1)
CREATE TYPE statut_reservation_enum AS ENUM (
    'EN_ATTENTE_PAIEMENT', 
    'CONFIRMEE', 
    'ANNULEE'
);

-- Traçabilité d'expédition de facture acquittée (SPEC-FAC-02 AC-3, AC-4, AC-7)
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
> - [`SPEC-RESERVATION-03`](../../specs/reservation.md) (Coordonnées obligatoires du client en mode invité : nom, prénom, email, mobile pour alertes SMS — `REQ-005`, `C-20`, `REQ-105`, `AC-6`).
> - [`SPEC-ADMIN-04`](../../specs/admin.md#spec-admin-04--authentification-au-back-office-administrateur) (Compte unique de l'administrateur back-office sécurisé par mot de passe — `C-16`, `REQ-103`, `AC-1`).

| Colonne | Type de données | Contraintes | Valeur par défaut | Description & Liaison Spécification |
| :--- | :--- | :--- | :--- | :--- |
| **`id`** | `UUID` | **PRIMARY KEY** | `gen_random_uuid()` | Identifiant unique universel du compte. |
| **`nom`** | `VARCHAR(100)` | **NOT NULL** | — | Nom du titulaire (`SPEC-RESERVATION-03` AC-6). |
| **`prenom`** | `VARCHAR(100)` | **NOT NULL** | — | Prénom du titulaire (`SPEC-RESERVATION-03` AC-6). |
| **`email`** | `VARCHAR(255)` | **UNIQUE, NOT NULL** | — | Identifiant de connexion admin (`SPEC-ADMIN-04`) et adresse d'envoi de la facture PDF (`SPEC-FAC-02`). |
| **`telephone`** | `VARCHAR(20)` | **NOT NULL** | — | Numéro de mobile obligatoire pour l'expédition des SMS d'annulation et d'alerte météo (`REQ-005`, `C-20`, `SPEC-ADMIN-02`). |
| **`role`** | `role_enum` | **NOT NULL** | `'CLIENT'` | Niveau d'accès : `CLIENT` (mode invité) ou `ADMIN` (`SPEC-ADMIN-04`). |
| **`mot_de_passe`** | `VARCHAR(255)` | **NULLABLE** | `NULL` | Hash sécurisé du mot de passe (rempli uniquement pour `ADMIN`, `NULL` pour les clients invités sans compte). |

---

### 4.2. Table `alertes` (Alertes Météo & Pré-annulations)

> **Spécifications associées :**
> - [`SPEC-ADMIN-06`](../../specs/admin.md#spec-admin-06--envoi-groupé-dalertes-de-pré-annulation-la-veille-à-18h) (Émission groupée à J-1 18h d'alertes bilingues combinées FR+EN — `REQ-017`, `REQ-018`, `R-22` à `R-26`, `C-21` à `C-23`, `AC-1` à `AC-3`).
> - [`SPEC-RESERVATION-03`](../../specs/reservation.md) (Conditionne l'affichage de la mention d'avertissement en ligne `REQ-019`, `R-25`, `AC-7` et le droit au remboursement 100% `R-27`, `R-28`).

| Colonne | Type de données | Contraintes | Valeur par défaut | Description & Liaison Spécification |
| :--- | :--- | :--- | :--- | :--- |
| **`id`** | `UUID` | **PRIMARY KEY** | `gen_random_uuid()` | Identifiant unique de l'alerte diffusée. |
| **`message`** | `TEXT` | **NOT NULL** | — | Corps textuel combiné regroupant la version FR suivie de la version EN (`SPEC-ADMIN-06` AC-3, `R-26`). |

---

### 4.3. Table `creneaux` (Planning des Sorties en Mer)

> **Spécifications associées :**
> - [`SPEC-RESERVATION-03`](../../specs/reservation.md) (Départs 7h, 10h, 14h à Saint-Gilles et 9h mar/jeu à Saint-Leu ; fermeture annuelle 25/12 & 01/01 `R-02` ; verrouillage automatique à H-2 `R-11`, `AC-3`).
> - [`SPEC-ADMIN-01`](../../specs/admin.md#spec-admin-01--consultation-du-planning-et-supervision-multi-sites) (Supervision planning multi-sites et indicateur d'alerte — `REQ-009`, `REQ-010`, `AC-1`, `AC-2`).
> - [`SPEC-ADMIN-05`](../../specs/admin.md#spec-admin-05--visualisation-du-taux-de-remplissage-et-jauges) (Jauges réelles : 36 standard, 24 mar/jeu matin St-Gilles, 12 St-Leu — `R-03`, `R-10`, `AC-1`).
> - [`SPEC-ADMIN-07`](../../specs/admin.md#spec-admin-07--configuration-et-gestion-des-créneaux) (Ouverture/fermeture manuelle `est_ouvert`, exclusivité d'activité `R-12`, assignation naturaliste `R-15`).

| Colonne | Type de données | Contraintes | Valeur par défaut | Description & Liaison Spécification |
| :--- | :--- | :--- | :--- | :--- |
| **`id`** | `UUID` | **PRIMARY KEY** | `gen_random_uuid()` | Identifiant unique du créneau au planning. |
| **`date`** | `DATE` | **NOT NULL** | — | Date de l'excursion (`SPEC-RESERVATION-03` ; hors 25/12 et 01/01 `R-02`). |
| **`heure_depart`** | `TIME` | **NOT NULL** | — | Heure de départ standardisée : `07:00:00`, `09:00:00`, `10:00:00`, `14:00:00` (`R-01`). |
| **`port`** | `port_enum` | **NOT NULL** | — | Port de départ : `SAINT_GILLES` ou `SAINT_LEU` (`R-01`, `R-03`). |
| **`activite`** | `activite_enum` | **NOT NULL** | — | Activité exclusive du créneau (`R-12`, `SPEC-ADMIN-07` AC-2). |
| **`est_ouvert`** | `BOOLEAN` | **NOT NULL** | `TRUE` | État d'ouverture (`FALSE` si fermé manuellement par l'admin `SPEC-ADMIN-07` ou clos automatiquement à H-2 `R-11`). |
| **`alerte_id`** | `UUID` | **FOREIGN KEY (`alertes.id`)**, `NULLABLE`, `ON DELETE SET NULL` | `NULL` | Référence de l'alerte active émise la veille (`SPEC-ADMIN-06`) affichant la mention d'avertissement en ligne (`SPEC-RESERVATION-03` AC-7). |

---

### 4.4. Table `reservations` (Dossiers de Réservation)

> **Spécifications associées :**
> - [`SPEC-RESERVATION-03`](../../specs/reservation.md) (Tunnel de réservation, référence publique, état payé après validation CB — `REQ-001`, `REQ-006`, `REQ-007`, `AC-8`).
> - [`SPEC-ADMIN-02`](../../specs/admin.md#spec-admin-02--annulation-dune-réservation-suppression-totale-des-billets-et-notification-client) (Conservation de l'enregistrement de réservation avec 0 billet actif lors d'une annulation administrative — `REQ-013`, `C-09`, `AC-1`).
> - [`SPEC-ADMIN-03`](../../specs/admin.md#spec-admin-03--réduction-du-nombre-de-passagers-suppression-partielle-de-billets) (Maintien de la réservation sans ajout de billet ni report possible — `REQ-015`, `R-18`, `AC-2`).

| Colonne | Type de données | Contraintes | Valeur par défaut | Description & Liaison Spécification |
| :--- | :--- | :--- | :--- | :--- |
| **`id`** | `UUID` | **PRIMARY KEY** | `gen_random_uuid()` | Identifiant unique de la réservation. |
| **`reference`** | `VARCHAR(20)` | **UNIQUE, NOT NULL** | — | Référence publique communiquée au client (ex: `TB-A8F2`, `SPEC-RESERVATION-03`). |
| **`statut`** | `statut_reservation_enum` | **NOT NULL** | `'EN_ATTENTE_PAIEMENT'` | Statut du dossier : `EN_ATTENTE_PAIEMENT`, `CONFIRMEE` (payée), ou `ANNULEE` (`SPEC-ADMIN-02`). |
| **`creneau_id`** | `UUID` | **FOREIGN KEY (`creneaux.id`)**, **NOT NULL**, `ON DELETE RESTRICT` | — | Lien vers le créneau d'excursion retenu (`SPEC-RESERVATION-03`). |
| **`user_id`** | `UUID` | **FOREIGN KEY (`users.id`)**, **NOT NULL**, `ON DELETE RESTRICT` | — | Lien vers le client réservataire (`SPEC-RESERVATION-03` AC-6). |

---

### 4.5. Table `billets` (Titres de Transport / Passagers Individuels)

> **Spécifications associées :**
> - [`SPEC-RESERVATION-03`](../../specs/reservation.md) (Tarification par type de billet : adulte $\ge 12$ ans, enfant 4–11 ans, forfait privatisation, blocage $< 4$ ans — `REQ-004`, `REQ-016`, `R-04` à `R-06`, `R-19`, `AC-4`, `AC-5`).
> - [`SPEC-ADMIN-02`](../../specs/admin.md#spec-admin-02--annulation-dune-réservation-suppression-totale-des-billets-et-notification-client) (Suppression totale des billets pour libérer synchroniquement toutes les places du créneau — `REQ-013`, `AC-1`, `AC-2`).
> - [`SPEC-ADMIN-03`](../../specs/admin.md#spec-admin-03--réduction-du-nombre-de-passagers-suppression-partielle-de-billets) (Suppression sélective de $N$ billets libérant synchroniquement $N$ places sur la jauge — `REQ-015`, `AC-1`).
> - [`SPEC-ADMIN-05`](../../specs/admin.md#spec-admin-05--visualisation-du-taux-de-remplissage-et-jauges) (Le nombre de places occupées est calculé dynamiquement par `COUNT(billets)` — `REQ-010`, `AC-1`).

| Colonne | Type de données | Contraintes | Valeur par défaut | Description & Liaison Spécification |
| :--- | :--- | :--- | :--- | :--- |
| **`id`** | `UUID` | **PRIMARY KEY** | `gen_random_uuid()` | Identifiant unique du billet individuel. |
| **`reservation_id`** | `UUID` | **FOREIGN KEY (`reservations.id`)**, **NOT NULL**, `ON DELETE CASCADE` | — | Rattachement au dossier parent (`SPEC-ADMIN-02` / `SPEC-ADMIN-03`). |
| **`type_billet`** | `type_billet_enum` | **NOT NULL** | — | Catégorie tarifaire : `ADULTE` ($\ge 12$ ans), `ENFANT` (4–11 ans) ou `PRIVATISATION` (`R-04`, `R-06`). |

---

### 4.6. Table `paiements` (Transactions Bancaires & Traçabilité Facturation)

> **Spécifications associées :**
> - [`SPEC-RESERVATION-03`](../../specs/reservation.md) (Règlement intégral à 100 % par carte bancaire sécurisée validant la commande — `REQ-006`, `REQ-007`, `R-07`, `AC-8`).
> - [`SPEC-FAC-02`](../../specs/facturation.md) (Génération à la volée du PDF de facture acquittée en mémoire sans stockage disque, attribution d'un numéro unique `reference_facture`, persistance de l'état d'envoi SMTP `statut_emission_facture`, garantie d'idempotence anti-doublon webhook — `REQ-008`, `R-08`, `C-14`, `AC-1` à `AC-7`).

| Colonne | Type de données | Contraintes | Valeur par défaut | Description & Liaison Spécification |
| :--- | :--- | :--- | :--- | :--- |
| **`id`** | `UUID` | **PRIMARY KEY** | `gen_random_uuid()` | Identifiant unique de la transaction de paiement. |
| **`reservation_id`** | `UUID` | **FOREIGN KEY (`reservations.id`)**, **UNIQUE, NOT NULL**, `ON DELETE RESTRICT` | — | Relation 1..1 stricte avec la réservation payée (`SPEC-RESERVATION-03` AC-8). |
| **`reference_transaction`** | `VARCHAR(100)` | **UNIQUE, NOT NULL** | — | Identifiant unique de transaction délivré par la passerelle bancaire. |
| **`montant`** | `DECIMAL(10,2)` | **NOT NULL**, `CHECK (montant > 0)` | — | Montant total TTC réglé en euros (incluant la majoration géographique de +10 €/pers si départ Saint-Leu, `R-05`). |
| **`date_paiement`** | `TIMESTAMPTZ` | **NOT NULL** | `NOW()` | Horodatage exact de la validation bancaire (`datePaiement: DateTime` dans le domaine). |
| **`reference_facture`** | `VARCHAR(50)` | **UNIQUE, NOT NULL** | — | Identifiant officiel unique de la facture (ex: `FACT-2026-00123`, `SPEC-FAC-02` AC-2). |
| **`statut_emission_facture`** | `statut_emission_facture_enum` | **NOT NULL** | `'EN_ATTENTE'` | Indicateur de traçabilité de l'envoi courriel : `EN_ATTENTE`, `ENVOYEE_SUCCES`, `ECHEC_ENVOI` (`SPEC-FAC-02` AC-3, AC-4). |
| **`date_emission_facture`** | `TIMESTAMPTZ` | **NULLABLE** | `NULL` | Horodatage d'envoi réussi du courriel avec la facture PDF (`dateEmissionFacture: DateTime` dans le domaine, `SPEC-FAC-02` AC-3). |

---

## 5. Matrice des Relations et Règles d'Intégrité Référentielle

| Table Parente | Table Enfant | Clé Étrangère (`FK`) | Cardinalité | Règle `ON DELETE` | Règle `ON UPDATE` | Rationale & Règle Métier |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`alertes`** | **`creneaux`** | `creneaux.alerte_id` | 0..1 $\rightarrow$ 0..* | `SET NULL` | `CASCADE` | Si une alerte météo ancienne est purgée, le créneau reste au planning et son fanion d'alerte redevient `NULL` ([`SPEC-ADMIN-06`](../../specs/admin.md#spec-admin-06--envoi-groupé-dalertes-de-pré-annulation-la-veille-à-18h)). |
| **`creneaux`** | **`reservations`** | `reservations.creneau_id` | 1 $\rightarrow$ 0..* | `RESTRICT` | `CASCADE` | Empêche la suppression physique d'un créneau si des réservations y sont rattachées ([`SPEC-ADMIN-07`](../../specs/admin.md#spec-admin-07--configuration-et-gestion-des-créneaux) AC-1). |
| **`users`** | **`reservations`** | `reservations.user_id` | 1 $\rightarrow$ 0..* | `RESTRICT` | `CASCADE` | Préserve l'intégrité de l'historique de commande client ([`SPEC-RESERVATION-03`](../../specs/reservation.md)). |
| **`reservations`** | **`billets`** | `billets.reservation_id` | 1 $\rightarrow$ 0..* | `CASCADE` | `CASCADE` | Les billets sont des entités dépendantes du dossier de réservation. L'annulation admin supprime les billets ([`SPEC-ADMIN-02`](../../specs/admin.md#spec-admin-02--annulation-dune-réservation-suppression-totale-des-billets-et-notification-client) AC-1). |
| **`reservations`** | **`paiements`** | `paiements.reservation_id` | 1 $\rightarrow$ 0..1 | `RESTRICT` | `CASCADE` | Protège l'enregistrement comptable et fiscal de la transaction bancaire ([`SPEC-FAC-02`](../../specs/facturation.md) AC-1, `C-10`). |

---

## 6. Règles de Calcul Dynamique & Idempotence (Sans Redondance Physique)

1. **Jauge et Disponibilité des Places ([`SPEC-ADMIN-05`](../../specs/admin.md#spec-admin-05--visualisation-du-taux-de-remplissage-et-jauges), [`SPEC-RESERVATION-03`](../../specs/reservation.md) AC-2) :**
   - Jauge maximale déterminée par les invariants du port et du créneau :
     - Saint-Gilles standard : **36 places** (Tikap 12 + Grand Bleu 24 — `R-10`).
     - Saint-Gilles mardi/jeudi matin (07h et 10h) : **24 places** (Grand Bleu seul — `R-10`).
     - Saint-Leu (mardi/jeudi 09h) : **12 places** (Tikap seul — `R-03`, `R-10`).
   - Places occupées calculées dynamiquement :
     ```sql
     SELECT COUNT(b.id) 
     FROM billets b 
     JOIN reservations r ON b.reservation_id = r.id 
     WHERE r.creneau_id = :creneau_id AND r.statut = 'CONFIRMEE';
     ```
   - Places restantes = $\text{Jauge Max} - \text{Places Occupées}$.

2. **Calcul du Montant de la Réservation ([`SPEC-RESERVATION-03`](../../specs/reservation.md) AC-4, AC-5) :**
   - Tarifs de base (Saint-Gilles) : Baleines (65 € ad / 40 € enf) ; Dauphins (50 € ad / 30 € enf) ; Forfait Tikap (600 €) ; Forfait Grand Bleu (1 100 €).
   - Majoration Saint-Leu : **+10 € / personne** sur les billets individuels (`R-05`). Pas de majoration sur le forfait de privatisation Tikap (600 €).
   - Le montant est calculé à la volée par le moteur métier et persisté lors du paiement dans `paiements.montant`.

3. **Idempotence de la Facturation et des Webhooks Bancaires ([`SPEC-FAC-02`](../../specs/facturation.md) AC-7) :**
   - L'unicité de `paiements.reservation_id` et `paiements.reference_transaction` empêche tout double encaissement.
   - Si `statut_emission_facture = 'ENVOYEE_SUCCES'`, aucun renvoi de facture n'est réexécuté lors d'un éventuel webhook dupliqué.
   - En cas d'échec SMTP (`statut_emission_facture = 'ECHEC_ENVOI'`), le système peut relancer la génération à la volée du PDF et l'expédition sans créer de nouvel enregistrement (`SPEC-FAC-02` AC-4).

---

## 7. Script DDL PostgreSQL (Création Complète du Schéma)

```sql
-- ==========================================================
-- SCRIPT DDL POSTGRESQL — TI'BALEINE (MPD)
-- Strict respect du modèle de domaine & spécifications v2
-- ==========================================================

-- 1. Extension pour la génération automatique des UUID v4
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Création des Types Énumérés
CREATE TYPE role_enum AS ENUM ('CLIENT', 'ADMIN');
CREATE TYPE port_enum AS ENUM ('SAINT_GILLES', 'SAINT_LEU');
CREATE TYPE activite_enum AS ENUM ('BALEINES', 'DAUPHINS', 'PRIVATISATION_TIKAP', 'PRIVATISATION_GRAND_BLEU');
CREATE TYPE type_billet_enum AS ENUM ('ADULTE', 'ENFANT', 'PRIVATISATION');
CREATE TYPE statut_reservation_enum AS ENUM ('EN_ATTENTE_PAIEMENT', 'CONFIRMEE', 'ANNULEE');
CREATE TYPE statut_emission_facture_enum AS ENUM ('EN_ATTENTE', 'ENVOYEE_SUCCES', 'ECHEC_ENVOI');

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
    message TEXT NOT NULL
);

-- 5. Table des créneaux horaires d'excursion au planning
CREATE TABLE creneaux (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    heure_depart TIME NOT NULL,
    port port_enum NOT NULL,
    activite activite_enum NOT NULL,
    est_ouvert BOOLEAN NOT NULL DEFAULT TRUE,
    alerte_id UUID NULL REFERENCES alertes(id) ON DELETE SET NULL,
    CONSTRAINT uq_creneau_port_date_heure UNIQUE (port, date, heure_depart)
);

-- 6. Table des réservations (en-têtes de commande)
CREATE TABLE reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference VARCHAR(20) UNIQUE NOT NULL,
    statut statut_reservation_enum NOT NULL DEFAULT 'EN_ATTENTE_PAIEMENT',
    creneau_id UUID NOT NULL REFERENCES creneaux(id) ON DELETE RESTRICT,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT
);

-- 7. Table des billets passagers (places actives)
CREATE TABLE billets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reservation_id UUID NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
    type_billet type_billet_enum NOT NULL
);

-- 8. Table des paiements et traçabilité de facturation
CREATE TABLE paiements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reservation_id UUID UNIQUE NOT NULL REFERENCES reservations(id) ON DELETE RESTRICT,
    reference_transaction VARCHAR(100) UNIQUE NOT NULL,
    montant DECIMAL(10,2) NOT NULL CHECK (montant > 0),
    date_paiement TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reference_facture VARCHAR(50) UNIQUE NOT NULL,
    statut_emission_facture statut_emission_facture_enum NOT NULL DEFAULT 'EN_ATTENTE',
    date_emission_facture TIMESTAMPTZ NULL
);

-- ==========================================================
-- INDEX D'OPTIMISATION DE PERFORMANCE
-- ==========================================================
CREATE INDEX idx_creneaux_date_port ON creneaux(date, port);
CREATE INDEX idx_creneaux_alerte_id ON creneaux(alerte_id);
CREATE INDEX idx_reservations_creneau_id ON reservations(creneau_id);
CREATE INDEX idx_reservations_user_id ON reservations(user_id);
CREATE INDEX idx_reservations_statut ON reservations(statut);
CREATE INDEX idx_billets_reservation_id ON billets(reservation_id);
CREATE INDEX idx_paiements_statut_emission ON paiements(statut_emission_facture);
```