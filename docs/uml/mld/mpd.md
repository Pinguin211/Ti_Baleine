# Modèle Physique de Données (MPD) / Schéma de Base de Données — Ti'Baleine

---

## 1. Table `users` (Utilisateurs)
Cette table gère l'ensemble des comptes personnes enregistrées (clients et administrateurs).

| Colonne | Type de données | Contraintes | Description |
| :--- | :--- | :--- | :--- |
| **`id`** | `BIGSERIAL` / `UUID` | **PRIMARY KEY** | Identifiant unique de l'utilisateur. |
| **`email`** | `VARCHAR(255)` | **UNIQUE, NOT NULL** | Adresse e-mail de connexion et de contact. |
| **`password_hash`** | `VARCHAR(255)` | **NULLABLE** | Hash du mot de passe (rempli pour les admin, optionnel/null pour client invite). |
| **`first_name`** | `VARCHAR(100)` | **NOT NULL** | Prénom de l'utilisateur. |
| **`last_name`** | `VARCHAR(100)` | **NOT NULL** | Nom de famille de l'utilisateur. |
| **`phone`** | `VARCHAR(20)` | **NULLABLE** | Numéro de téléphone de contact. |
| **`role`** | `ENUM('Client', 'Administrateur')` | **NOT NULL, DEFAULT 'Client'** | Niveau d'accès attribué. |
| **`created_at`** | `TIMESTAMP WITH TIME ZONE` | **NOT NULL, DEFAULT CURRENT_TIMESTAMP** | Date et heure de création de la fiche. |
| **`updated_at`** | `TIMESTAMP WITH TIME ZONE` | **NOT NULL, DEFAULT CURRENT_TIMESTAMP** | Date et heure de dernière modification. |

---

## 2. Table `bookings` (Réservations)
Cette table contient les en-têtes de commande pour chaque réservation d'excursion en mer.

| Colonne | Type de données | Contraintes | Description |
| :--- | :--- | :--- | :--- |
| **`id`** | `BIGSERIAL` / `UUID` | **PRIMARY KEY** | Identifiant unique de la réservation. |
| **`booking_ref`** | `VARCHAR(20)` | **UNIQUE, NOT NULL** | Référence lisible client (ex: `TB-A8F2`). |
| **`invoice_number`** | `VARCHAR(50)` | **UNIQUE, NULLABLE** | Numéro officiel de facture (généré après paiement). |
| **`user_id`** | `BIGSERIAL` / `UUID` | **FOREIGN KEY (`users.id`), NOT NULL** | Lien vers le client ayant effectué la réservation. |
| **`excursion_type`** | `ENUM('Sortie Baleines', 'Sortie Dauphins', 'Privatisation Tikap', 'Privatisation Grand Bleu')` | **NOT NULL** | Prestation d'excursion choisie. |
| **`departure_date`** | `DATE` | **NOT NULL** | Date de départ de la sortie en mer. |
| **`departure_time`** | `TIME` / `ENUM('07:00', '10:00', '14:00')` | **NOT NULL** | Créneau horaire de départ retenu. |
| **`status`** | `ENUM('En attente', 'Confirmée', 'Annulée')` | **NOT NULL, DEFAULT 'En attente'** | État courant du dossier de réservation. |
| **`created_at`** | `TIMESTAMP WITH TIME ZONE` | **NOT NULL, DEFAULT CURRENT_TIMESTAMP** | Horodatage de création de la réservation. |

---

## 3. Table `booking_items` (Passagers / Places réservées)
Chaque ligne correspond à **une place individuelle** associée à une réservation globale.

| Colonne | Type de données | Contraintes | Description |
| :--- | :--- | :--- | :--- |
| **`id`** | `BIGSERIAL` / `UUID` | **PRIMARY KEY** | Identifiant unique de la place réservée. |
| **`booking_id`** | `BIGSERIAL` / `UUID` | **FOREIGN KEY (`bookings.id`) ON DELETE CASCADE, NOT NULL** | Rattachement à la réservation parente. |
| **`passenger_type`** | `ENUM('Adulte', 'Enfant', 'Forfait Privatisation')` | **NOT NULL** | Catégorie de passager / tarif applicable. |

> **Note technique :** Le nombre total de passagers est calculé dynamiquement avec la requête SQL :
> `SELECT COUNT(*) FROM booking_items WHERE booking_id = <ID_RESERVATION>;`

---

## 4. Table `payments` (Transactions bancaires)
Cette table stocke l'historique des tentatives et validations de paiement par carte bancaire.

| Colonne | Type de données | Contraintes | Description |
| :--- | :--- | :--- | :--- |
| **`id`** | `BIGSERIAL` / `UUID` | **PRIMARY KEY** | Identifiant unique de la transaction. |
| **`booking_id`** | `BIGSERIAL` / `UUID` | **FOREIGN KEY (`bookings.id`), NOT NULL** | Rattachement à la réservation payée. |
| **`transaction_ref`** | `VARCHAR(100)` | **UNIQUE, NOT NULL** | Référence de confirmation transmise par la banque. |
| **`amount_cents`** | `INTEGER` | **NOT NULL** | Montant encaissé exprimé en centimes (evite les erreurs de précision décimale). |
| **`status`** | `ENUM('Réussi', 'Échoué', 'Remboursé')` | **NOT NULL** | Résultat du traitement du paiement. |
| **`raw_data`** | `JSONB` / `TEXT` | **NULLABLE** | Payload / Réponse brute transmise par le gateway de paiement. |
| **`paid_at`** | `TIMESTAMP WITH TIME ZONE` | **NOT NULL, DEFAULT CURRENT_TIMESTAMP** | Horodatage exact de l'encaissement. |

---

## 5. Script SQL DDL (PostgreSQL)

```sql
-- Création des types ENUM
CREATE TYPE user_role AS ENUM ('Client', 'Administrateur');
CREATE TYPE excursion_type AS ENUM ('Sortie Baleines', 'Sortie Dauphins', 'Privatisation Tikap', 'Privatisation Grand Bleu');
CREATE TYPE booking_status AS ENUM ('En attente', 'Confirmée', 'Annulée');
CREATE TYPE passenger_type AS ENUM ('Adulte', 'Enfant', 'Forfait Privatisation');
CREATE TYPE payment_status AS ENUM ('Réussi', 'Échoué', 'Remboursé');

-- Table USERS
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NULL,
    role user_role NOT NULL DEFAULT 'Client',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Table BOOKINGS
CREATE TABLE bookings (
    id BIGSERIAL PRIMARY KEY,
    booking_ref VARCHAR(20) UNIQUE NOT NULL,
    invoice_number VARCHAR(50) UNIQUE NULL,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    excursion_type excursion_type NOT NULL,
    departure_date DATE NOT NULL,
    departure_time TIME NOT NULL,
    status booking_status NOT NULL DEFAULT 'En attente',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Table BOOKING_ITEMS
CREATE TABLE booking_items (
    id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    passenger_type passenger_type NOT NULL
);

-- Table PAYMENTS
CREATE TABLE payments (
    id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT NOT NULL REFERENCES bookings(id) ON DELETE RESTRICT,
    transaction_ref VARCHAR(100) UNIQUE NOT NULL,
    amount_cents INTEGER NOT NULL,
    status payment_status NOT NULL,
    raw_data JSONB NULL,
    paid_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Index pour optimiser les performances de recherche
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_departure ON bookings(departure_date, departure_time);
CREATE INDEX idx_booking_items_booking_id ON booking_items(booking_id);
CREATE INDEX idx_payments_booking_id ON payments(booking_id);
```

---

## 6. Relations & Contraintes d'intégrité

1. **`users` 1 — N `bookings`**
    * Un utilisateur peut posséder plusieurs réservations (`user_id` clé étrangère dans `bookings`).
2. **`bookings` 1 — N `booking_items`**
    * Une réservation comprend 1 à plusieurs passagers/places (`booking_id` dans `booking_items` avec suppression en cascade `ON DELETE CASCADE`).
3. **`bookings` 1 — N `payments`**
    * Une réservation enregistre 1 ou plusieurs tentatives/validations de paiement (`booking_id` dans `payments`).