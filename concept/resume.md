# Questionnaire de Cadrage Intelligent – Projet Ti Baleine

---

## 0️⃣ Question Filtre Majeure – Stratégie & Budget
> **QUESTION ÉLIMINATOIRE** : Préfères‑tu une **solution SaaS clé‑en‑main** (ex. Bokun, Resagenda) avec abonnement/commission, ou un **développement sur‑mesure** qui t’appartient ?
- └─► **Si SaaS** : Ignore les questions de la Section 8 (développement). Concentre‑toi sur la configuration de l’outil.
- └─► **Si Sur‑Mesure** : Traite l’ensemble du questionnaire.

---

## 1️⃣ Business Overview & Offre

### 1.1 Activités & Produits
- Quels types d’activités proposes‑tu ? (excursions, observation baleines, plongée, privatisation, etc.)
- Quelles formules/produits existent (découverte, premium, groupe) ? Durées associées ?

### 1.2 Intégration Web
- Le système doit‑il être **intégré** à un site web existant ou **développé** comme une plateforme autonome ?
  - **Si site existant** : Quel CMS/technologie (WordPress, Wix, Shopify…) ? As‑tu les accès admin ?
  - **Si autonome** : Dispose‑tu d’un nom de domaine, d’un logo et d’une charte graphique ?

### 1.3 Multilingue
- L’interface doit‑elle être **multilingue dès le lancement** ?
  - **Si NON** : Passe à la section 2.
  - **Si OUI** : Quelles langues (FR, EN, DE, …) ? Qui fournit les traductions ?

---

## 2️⃣ Capacité, Créneaux & Ressources

### 2.1 Planning
- Nombre de départs **par jour / semaine** ?
- Horaires fixes ou variables selon la saison ?
- **Délai minimum** de réservation avant le départ (ex. 2 h, 24 h, 48 h) ?

### 2.2 Gestion des Capacités
- Capacité **minimale** et **maximale** par sortie (places, bateau, véhicule) ?
- Existe‑t‑il un **seuil de rentabilité** (nombre minimum de participants) ?
  - **Si NON** : Passe à 2.3.
  - **Si OUI** : Que se passe‑t‑il si le seuil n’est pas atteint **X heures avant** le départ ? (annulation automatique, alerte admin, etc.)

### 2.3 Ressources & Flotte
- Combien de bateaux / ressources à gérer ?
  - **Si 1 seul** : Passe à 2.4.
  - **Si plusieurs** : Faut‑il affecter un bateau/capitaine précis à chaque créneau ?

### 2.4 Synchronisation Agenda
- Le calendrier doit‑il être **synchronisé** avec des agendas externes (Google Calendar, Apple, Outlook) ?

---

## 3️⃣ Tarification & Groupes

### 3.1 Structure Tarifaire
- Quels tarifs proposes‑tu ? (adulte, enfant, bébé, résident, privatisation) ?
- La tarification varie‑t‑elle selon la **saison** ou le **jour de la semaine** ?

### 3.2 Réductions & Promotions
- Souhaites‑tu gérer des **codes promo** ou des tarifs partenaires (hôtels, offices de tourisme) ?
  - **Si NON** : Passe à 3.3.
  - **Si OUI** : Quel type (pourcentage, montant fixe, usage unique/multiple) ?

### 3.3 Garantie Observation (Baleines)
- Proposes‑tu une **garantie "observation non vue"** ?
  - **Si NON** : Passe à la section 4.
  - **If OUI** : Que reçoit le client ? (code promo -50 % sur prochaine sortie, bon d’achat, re‑réservation gratuite)

---

## 4️⃣ Paiement & Encaissement
> **QUESTION ÉLIMINATOIRE** : Les clients doivent‑ils **payer en ligne** lors de la réservation ?
- └─► **Si NON** : Ignore le reste de la Section 4 et passe à la Section 5.
- └─► **Si OUI** : Réponds aux sous‑questions suivantes :

### 4.1 Modalités de Paiement
- Exiges‑tu **100 % du paiement** à la réservation ou un **acompte** ?
  - **Si acompte** : Quel pourcentage ou montant fixe ?
  - Comment le **solde** est‑il réglé ? (en ligne, sur place – TPE, espèces, chèques vacances)

### 4.2 Moyens de Paiement & Passerelle
- Quels moyens accepter en ligne ? (CB, Stripe, PayPal, Apple Pay, Google Pay, chèques vacances) ?
- As‑tu déjà un compte Stripe / PayPal professionnel vérifié ?

### 4.3 Paiement à Distance (Pay‑by‑Link)
- Souhaites‑tu envoyer un **lien de paiement sécurisé** par SMS/WhatsApp pour valider une réservation prise par téléphone ?

---

## 5️⃣ Annulations Clients, No‑Show & Remboursements

### 5.1 Politique d’Annulation Client
- Quel est le **délai** et le **pourcentage** de remboursement selon le moment de l’annulation ?
  - Exemple : 100 % si > 48 h, 50 % entre 48 h et 24 h, 0 % si < 24 h.

### 5.2 Gestion du No‑Show
- Que faire si le client ne se présente pas le jour J ? (conserver 100 % de la somme, crédit, etc.)

### 5.3 Mode de Remboursement
- En cas d’annulation valide, le système doit‑il **émettre un remboursement bancaire automatique** ou privilégier un **avoir / bon d’achat** ?

---

## 6️⃣ Météo & Gestion des Incidents (Critique)

### 6.1 Prise de Décision
- Qui décide de l’annulation météo et selon quels **critères** ? (seuils, source météo) ?
- Combien de temps **avant le départ** (veille, H‑2) ?

### 6.2 Workflow d’Annulation Météo (Organisateur)
- En cas d’annulation par le prestataire (météo/panne), comment gérer les clients **en masse** ?
  - **Option A** : Envoi d’un SMS/Email avec **lien de re‑choix** de date.
  - **Option B** : Génération automatique d’un **avoir / bon d’achat**.
  - **Option C** : Remboursement automatique global.

### 6.3 Incident Technique (Panne Bâteau)
- En cas d’indisponibilité d’un navire, faut‑il **basculer automatiquement** la liste de passagers sur un autre bateau/créneau ?

---

## 7️⃣ Communication & Automatisations

### 7.1 Canaux de Communication
- Quels canaux utiliser ? (Email, SMS, WhatsApp API)
  - **Si SMS/WhatsApp** : Es‑tu prêt à prendre en charge les **frais d’envoi** (ex. Twilio, Meta API) ?

### 7.2 Messages Automatiques Attendues
- [ ] Confirmation de réservation (+ facture/billet)
- [ ] Rappel automatique (J‑1 / H‑2) avec consignes vestimentaires et point GPS
- [ ] Alerte météo / report de dernière minute
- [ ] Demande d’avis client post‑sortie (TripAdvisor, Google Reviews)

### 7.3 Alertes Prestataire
- Souhaites‑tu recevoir une notification (SMS/Email) à chaque **nouvelle réservation** ou **annulation** ?

---

## 8️⃣ Administration & Back‑Office (Gestion au quotidien)

### 8.1 Profils Utilisateurs
- Combien de personnes accéderont au back‑office ? (Admin, Capitaine, Vendeur/Billetterie)
  - **Si OUI** : Faut‑il **restreindre les droits** (ex. le capitaine voit le planning mais pas le chiffre d’affaires) ?

### 8.2 Embarkement & Check‑in
- Comment se fera le contrôle des passagers à l’embarquement ?
  - Papier, tablette, scanner QR‑code, application mobile…

### 8.3 Rapports & Suivi
- Besoin d’un **tableau de bord** affichant chiffre d’affaires, taux de remplissage et encaissements du jour ?

---

## 9️⃣ Facturation, Comptabilité & Juridique

### 9.1 Assujettissement TVA
- Êtes‑vous **assujetti à la TVA** ?
  - **Si NON** : Afficher *"TVA non applicable, art. 293 B du CGI"*.
  - **Si OUI** : Quels taux ? (Réunion 8,5 % / Métropole 20 % / 10 %)

### 9.2 Édition de Factures
- Le site doit‑il **générer automatiquement** une **facture PDF** à la validation de la commande ?
- Faut‑il pouvoir **modifier manuellement** une facture depuis le back‑office (ajustement prix, changement de nom) ?
- En cas d’annulation/remboursement, le système doit‑il créer une **facture d’avoir** conforme ?

### 9.3 Export Comptable
- Besoin d’un **export automatique** (CSV/Excel) des ventes mensuelles ou d’une **connexion** à un logiciel (Pennylane, QuickBooks) ?

### 9.4 Obligations Maritimes & Légales
- Le système doit‑il générer automatiquement le **manifeste des passagers** (liste obligatoire pour la capitainerie) ?
- Faut‑il faire signer une **décharge de responsabilité / CGV** en ligne lors de la réservation ?

---

## 🔟 Synthèse des Coûts & Maintenance (Agence/Développeur)

### 10.1 Budget & Délais
- Quel est le **budget** alloué à la création de l’outil ?
- Quelle est la **date cible** de mise en service (avant la saison des baleines) ?

### 10.2 Coûts de Fonctionnement
- Quel **budget mensuel maximum** acceptez‑vous pour l’hébergement, les API (SMS) et la maintenance ?

### 10.3 Support Technique
- Souhaitez‑vous un **contrat de maintenance** avec assistance prioritaire **7j/7** en cas de bug bloquant le week‑end ?

---

*Ce questionnaire, structuré en logique d’arbre décisionnel, permet de cibler rapidement les besoins essentiels tout en évitant les doublons.*