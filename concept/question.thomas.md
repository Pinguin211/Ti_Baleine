# Préparation de Réunion : Cahier des Charges - Système de Réservation

## 1. Analyse et Découpage de la Problématique Client

| Citation Client | Problématique & Risque | Fonctionnalité Requise | Règle de Gestion / Impact |
| :--- | :--- | :--- | :--- |
| **"Je gère par téléphone et WhatsApp"** | Canal dispersé, gestion manuelle chronophage, risque de double réservation. | Module de réservation en ligne 24/7 + Calendrier centralisé | Synchronisation en temps réel des disponibilités sur un agenda unique. |
| **"Annulations de dernière minute"** | Perte directe de chiffre d'affaires, créneaux gâchés. | Paiement/Acompte en ligne + Politique d'annulation | Verrouillage de la réservation par paiement CB direct. |
| **"Groupes qui changent de taille"** | Capacités non optimisées, ajustement tarifaire complexe. | Gestion dynamique des jauges et options de groupe | Modification possible du nombre de participants avec ajustement automatique du solde. |
| **"Météo qui m'oblige à décaler"** | Gestion de crise individuelle laborieuse, perte de temps. | Module d'annulation/report en masse avec notification | Alerte groupée (Email/SMS) + Lien autonome de ré-réservation ou bon d'achat. |
| **"Réserver en ligne et payer"** | Attente de transfert complet de l'acte d'achat. | Passerelle de paiement sécurisée (Stripe/PayPal) | Encaissement automatique et émission instantanée des confirmations/factures. |

---

## 2. Trame de Questions pour la Réunion Cahier des Charges

### A. Offre et Capacité
1. Combien de prestations ou parcours différents proposes-tu ?
2. Existe-t-il des jauges minimales et maximales par sortie (ex: min 4 pers., max 12 pers.) ?
3. Les horaires des créneaux sont-ils fixes toute l'année ou s'adaptent-ils aux saisons ?

### B. Gestion des Aléas Météo & Annulations Organisateur
1. Jusqu'à combien de temps avant le départ la décision d'annuler pour météo est-elle prise ?
2. Quel est le process souhaité en cas d'annulation météo ?
    * **Option A :** Émission automatique d'un bon d'achat / avoir.
    * **Option B :** Lien permettant au client de replanifier sa sortie en autonomie.
    * **Option C :** Remboursement automatique sur la carte bancaire.
3. Quel canal prioritaire utiliser pour les alertes urgentes (SMS vs Email vs WhatsApp API) ?

### C. Paiement et Conditions d'Annulation Client
1. Quel mode d'encaissement appliquer à la commande : 100% d'acompte, un pourcentage, ou un montant fixe ?
2. Quelle est la politique de remboursement si le client annule de son propre chef ?
    * Ex. : 100% si > 48h, 50% entre 48h et 24h, 0% si < 24h.
3. Quels sont les moyens de paiement acceptés (CB, Apple Pay/Google Pay, Chèques Vacances Connect) ?

### D. Expérience Client et Workflow de Communication
1. Souhaites-tu envoyer des rappels automatiques (J-1 / H-2) avec consigne vestimentaire/points de rendez-vous ?
2. Faut-il collecter des informations spécifiques lors de la réservation (taille/poids pour équipement, niveau de pratique) ?
3. As-tu un site internet existant ou faut-il intégrer un widget de réservation / créer une landing page dédiée ?

### E. Organisation Interne et Synchronisation
1. Faut-il synchroniser le calendrier de réservation avec un agenda personnel (Google Calendar, Outlook, Apple Calendar) ?
2. Y a-t-il plusieurs guides ou moniteurs à affecter aux sorties ?

---

## 3. Synthèse des Priorités Projets

* **P0 (Vital) :** Réservation 24/7, calendrier unique, paiement Stripe/Mollie, politique d'annulation configurable.
* **P1 (Essentiel) :** Outil de report météo groupé (email/SMS automatique avec lien de ré-choix).
* **P2 (Confort) :** Synchronisation Google Calendar, rappels automatiques avant la sortie, gestion multi-guides.