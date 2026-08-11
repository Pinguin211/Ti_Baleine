# CAHIER DES CHARGES FONCTIONNEL & PROJET
## Plateforme Web de Réservation en Ligne — Ti'Baleine

---

### Informations Générales
- **Projet :** Plateforme Web de Réservation et Gestion d'Excursions Maritimes
- **Client / Commanditaire :** Ti'Baleine
- **Équipe de réalisation :** Thomas, Loïc, Benjamin et Ivan
- **Langues de l'interface :** Support multilingue (plusieurs langues prises en charge sur l'interface publique)

---

## 1. Contexte et Objectifs du Projet

### 1.1 Présentation de l'Entreprise et Contexte
L'entreprise **Ti'Baleine** propose des sorties en mer à la journée : observation des baleines et des dauphins, ainsi que des sorties « coucher de soleil » (Sunset) et des privatisations de navires.

Afin de moderniser la prise de commande, de rationaliser le suivi des places et de simplifier l'organisation au quotidien, l'entreprise souhaite se doter d'une **plateforme web sur-mesure** dédiée à la réservation en ligne pour le grand public et à la gestion de l'activité.

### 1.2 Objectifs Principaux
- **Ouvrir un canal de réservation 100 % en ligne** : Permettre aux clients (locaux et touristes) de réserver et payer leurs sorties directement sur le web.
- **Offrir une interface multilingue** : Répondre aux besoins d'une clientèle majoritairement étrangère (environ 60 %) grâce à la prise en charge de plusieurs langues.
- **Conserver une gestion simple et accessible** : Mettre à disposition un espace administrateur épuré sur ordinateur, adapté aux besoins de l'entreprise sans complexité inutile.

---

## 2. Périmètre du Projet

### 2.1 Ce que comprend le projet (In-Scope)
- **Un site web public de réservation** (optimisé pour ordinateurs, tablettes et smartphones).
- **Un parcours de commande simple sans création de compte** préalable.
- **Un module de paiement en ligne 100 % sécurisé par Carte Bancaire**.
- **La génération et l'envoi automatique de factures PDF** après validation du paiement.
- **Une interface d'administration unique** (sur ordinateur PC/Desktop) pour la consultation du planning des réservations.
- **Un support multilingue** (prise en charge de plusieurs langues) sur l'ensemble du parcours client.

### 2.2 Ce qui est exclu du projet (Out-of-Scope)
- **Pas de solution SaaS tierce** (développement sur-mesure exclusif).
- **Pas de compte client** (réservation directe en tant qu'invité, sans création de compte ni espace membre client).
- **Pas d'annulation en ligne par le client** (traitement en direct hors système entre le client et l'entreprise).
- **Pas d'accès multi-utilisateurs ni de sous-comptes** (aucun compte spécifique pour les capitaines, les vendeurs ou autres tiers).
- **Pas de gestion ou modification des créneaux dans le planning** (consultation uniquement, planning fixe).
- **Pas de module de répartition des passagers par bateau** (le dispatch s'effectue physiquement avant l'excursion).
- **Pas de gestion automatisée des remboursements** (traité manuellement hors plateforme par l'entreprise).
- **Pas de gestion du manifeste de bord maritime** (registre légal conservé sous format papier/physique).
- **Pas de synchronisation avec des agendas externes** (ex. Google Calendar, Outlook).
- **Pas de notifications ou alertes automatiques vers l'administrateur** (aucun envoi d'e-mail/SMS pour les réservations ou annulations).

---

## 3. Règles Métier et Fonctionnement de l'Activité

### 3.1 Flotte, Capacités et Calendrier
- **Bateaux exploitables :**
    - **Tikap** : Capacité maximale de **12 places**.
    - **Grand Bleu** : Capacité maximale de **24 places**.
    - **Capacité globale cumulée :** **36 places** au maximum par créneau.
- **Créneaux horaires fixes :**
    - **3 départs par jour** : 7h00, 10h00 et 14h00.
    - **Jours d'ouverture :** 7 jours sur 7, du lundi au dimanche (toute l'année).
    - **Fermetures annuelles :** Uniquement le 25 décembre et le 1er janvier.
- **Seuils, jauges et sécurité à la réservation :**
    - **Seuil minimum de maintien :** Il faut au moins **6 passagers payants par bateau** pour maintenir une sortie en mer.
    - **Sécurité et contrôle des jauges de dispatch :** Contrôle automatique à la réservation respectant les capacités de dispatch des navires (**12 places** pour le *Tikap*, **24 places** pour le *Grand Bleu*, blocage absolu à **36 places** par créneau) pour permettre le respect des quotas de dispatch avant l'excursion.
    - **Délai de réservation :** Clôture automatique des réservations en ligne **2 heures avant le départ**.
- **Contraintes d'encadrement et d'exclusivité :**
    - **Ressource humaine unique :** L'entreprise dispose d'**1 seul naturaliste** disponible, dédié et obligatoire pour encadrer les **sorties baleines**.
    - **Séparation stricte des activités :** Chaque créneau horaire et chaque bateau sont dédiés à une seule activité exclusive (pas de mélange de prestations sur une même sortie).

### 3.2 Grille Tarifaire et Catégories
Les tarifs sont fixes, sans variation saisonnière :

| Prestation / Catégorie | Tranche d'Âge | Tarif Unitaire |
| :--- | :--- | :--- |
| **Sortie Baleines — Adulte** | 12 ans et plus | 65 € |
| **Sortie Baleines — Enfant** | 4 à 11 ans inclus | 40 € |
| **Sortie Dauphins — Adulte** | 12 ans et plus | 50 € |
| **Sortie Dauphins — Enfant** | 4 à 11 ans inclus | 30 € |
| **Enfants de moins de 4 ans** | Moins de 4 ans | Gratuit / Sur demande de sécurité |
| **Privatisation du Tikap** | Demi-journée (Formula Sunset) | 600 € (Forfait) |
| **Privatisation du Grand Bleu** | Demi-journée (Formula Sunset) | 1 100 € (Forfait) |

---

## 4. Description des Fonctionnalités

### 4.1 Parcours Public (Client)
1. **Consultation et Sélection de la Prestation :**
    - Choix du type de sortie (Baleines, Dauphins, Privatisation).
    - Bascule de langue à tout moment (sélecteur multilingue avec prise en charge de plusieurs langues).
2. **Choix de la Date et du Créneau :**
    - Affichage des créneaux disponibles (7h, 10h, 14h).
    - Masquage des jours fermés (25 décembre et 1er janvier) et des créneaux complets ou clos (< 2h).
3. **Saisie des Participants et Coordonnées :**
    - Sélection du nombre d'adultes et d'enfants.
    - Formulaire de contact minimal : Nom, Prénom, Adresse e-mail, Numéro de téléphone.
4. **Paiement et Confirmation :**
    - Paiement de 100 % du montant par Carte Bancaire via une passerelle de paiement sécurisée.
    - Validation immédiate à l'écran.
    - Envoi automatique d'un e-mail de confirmation accompagné de la **facture PDF**.

### 4.2 Espace d'Administration (Entreprise)
- **Accès Sécurisé Unique (Pas de multi-utilisateurs) :** Un seul profil administrateur pour l'entreprise (aucun sous-compte pour les capitaines ou les vendeurs, usage sur ordinateur PC/Desktop).
- **Consultation du Planning :**
    - Visualisation synthétique et consultation des réservations par jour et par créneau (consultation uniquement, pas de gestion ni d'ouverture/fermeture manuelle de créneaux).
    - Suivi du remplissage global selon les capacités d'embarquement (12, 24, 36 places) pour faciliter le dispatch opérationnel avant départ.
- **Traitement des Annulations et Remboursements :**
    - **Aucune annulation en ligne par les clients** : Toute demande d'annulation est effectuée en contact direct avec l'entreprise (téléphone, e-mail, accueil).
    - Traitement financier des remboursements et gestion de l'annulation pris en charge **directement par l'entreprise avec le client**, en dehors du système web.

---

## 5. Exigences Générales et Ergonomie

### 5.1 Ergonomie et Langues
- **Simplicité d'utilisation :** L'interface doit être claire, directe et accessible pour des utilisateurs non informaticiens.
- **Multilinguisme :** Intégration native d'un support multilingue (plusieurs langues disponibles) sur l'ensemble du parcours client.
- **Design Adaptatif :** Navigation fluide aussi bien sur mobile pour les clients que sur ordinateur de bureau pour l'administrateur.

### 5.2 Sécurité et Données
- **Paiement Sécurisé :** Transactions par carte bancaire répondant aux normes de sécurité bancaire en vigueur (contrat monétique direct).
- **Protection des Données Personnelles (RGPD) :** Saisie limitée aux données strictement nécessaires pour l'excursion et la facturation (nom, e-mail, téléphone).

---

## 6. Modalités d'Organisation et Livrables

### 6.1 Livrables Attendus
1. **La Plateforme Web Fonctionnelle :**
    - Module de réservation en ligne public multilingue (plusieurs langues).
    - Module d'administration Desktop/PC.
    - Module d'émission automatique des factures PDF.
2. **La Documentation & Prise en Main :**
    - Guide d'utilisation simplifié à destination de l'administrateur.

### 6.2 Points à Finaliser lors de la Mise en Œuvre
- Choix final du nom de domaine et de la solution d'hébergement.
- Fourniture des textes légaux (CGV, mentions légales) par l'entreprise.
- Validation des contenus et traductions dans les différentes langues retenues (textes d'accueil, fiches descriptives, etc.).