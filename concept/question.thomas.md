# Préparation de Réunion : Cahier des Charges - Système de Réservation

## 1. Analyse et Découpage de la Problématique Client

| Citation Client / Besoin | Problématique & Risque | Fonctionnalité Requise | Règle de Gestion / Impact |
| :--- | :--- | :--- | :--- |
| **"Je gère par téléphone et WhatsApp"** | Canal dispersé, gestion manuelle chronophage, risque de double réservation. | Module de réservation en ligne 24/7 + Calendrier centralisé + Saisie manuelle back-office | Synchronisation en temps réel des disponibilités sur un agenda unique et génération de liens de paiement instantanés (*Pay-by-link*). |
| **"Annulations de dernière minute"** | Perte directe de chiffre d'affaires, créneaux gâchés. | Paiement/Acompte en ligne + Politique d'annulation stricte | Verrouillage de la réservation par paiement CB direct (ou acompte) avec pénalités configurables selon le délai. |
| **"Groupes qui changent de taille"** | Capacités non optimisées, ajustement tarifaire complexe. | Gestion dynamique des jauges et options de groupe | Modification possible du nombre de participants avec recalcul automatique du solde et réajustement instantané de la jauge. |
| **"Météo qui m'oblige à décaler"** | Gestion de crise individuelle laborieuse, perte de temps. | Module d'annulation/report en masse avec notification | Alerte groupée (Email/SMS/WhatsApp) + Lien autonome de replanification ou émission d'un avoir/bon d'achat. |
| **"Réserver en ligne et payer"** | Attente de transfert complet de l'acte d'achat. | Passerelle de paiement sécurisée (Stripe/PayPal/Mollie) | Encaissement automatique, facturation instantanée et validation sécurisée de la réservation. |
| **"Gestion des factures & comptabilité"** | Saisie manuelle lourde, risques d'erreurs de facturation ou de non-conformité fiscale. | Édition et génération automatique de factures PDF / avoirs | Numérotation séquentielle légale, gestion de la TVA, génération automatique des avoirs en cas d'annulation. |

---

## 2. Trame de Questions pour la Réunion Cahier des Charges

### A. Offre, Capacité & Modèle Commercial
1. **Prestations & Parcours :** Combien de types de sorties proposes-tu (ex: observation baleines, dauphins, coucher de soleil, snorkeling / nage libre) ?
2. **Jauges et Capacités :** Existe-t-il des jauges minimales (seuil de rentabilité pour déclencher un départ) et maximales par sortie (ex: min 4 pers., max 12 pers.) ?
3. **Saisonnalité & Périodes :** Les horaires et créneaux sont-ils fixes toute l'année ou s'adaptent-ils aux saisons (saison des baleines vs reste de l'année) ?
4. **Sortie Partagée vs Privatisation :** Proposes-tu la privatisation complète du bateau (charter privé) ? Si oui, comment cela bloque-t-il la réservation des places individuelles ?
5. **Grille Tarifaire & Réductions :** Quels sont les tarifs appliqués (Adultes, Enfants < 12 ans, Bébés, Résidents, codes promos partenaires/hôtels) ?
6. **Politique "Garantie d'observation" (Vu / Pas vu) :** Si aucun cétacé n'est observé durant la sortie, appliques-tu un geste commercial (ex: bon de réduction pour une prochaine sortie, ticket re-board) ?

### B. Gestion des Aléas Météo & Incidents Flotte (Annulations Organisateur)
1. **Délai de décision :** Jusqu'à combien de temps avant le départ la décision d'annuler pour mauvaise météo ou houle est-elle prise ?
2. **Processus d'annulation / report météo :**
    * **Option A :** Lien autonome envoyé au client pour replanifier sa sortie sur un autre créneau disponible.
    * **Option B :** Émission automatique d'un bon d'achat / avoir valable X mois.
    * **Option C :** Remboursement automatique sur la carte bancaire.
3. **Canaux d'alertes urgentes :** Quel canal prioritaire utiliser pour prévenir rapidement les clients (SMS vs WhatsApp API vs Email) ?
4. **Panne mécanique ou indisponibilité d'un bateau :** Que fait-on si un bateau a une avarie technique (bascule sur un autre bateau ou procédure d'annulation d'urgence) ?

### C. Paiement, Acomptes & Annulations Client
1. **Modalités d'encaissement :** Quel mode de règlement appliquer à la réservation : 100% à la commande, un acompte en pourcentage (ex: 30%), ou un montant fixe par place ?
2. **Encaissement du solde sur place :** En cas d'acompte partiel, comment encaissez-vous le reste au ponton (TPE carte bancaire, espèces, chèques vacances) ?
3. **Politique de remboursement si le client annule :**
    * Quel barème appliquer (ex: 100% remboursé si > 48h, 50% entre 48h et 24h, 0% si < 24h) ?
4. **Moyens de paiement acceptés :** Quels prestataires et modes de paiement intégrer (CB / Visa / Mastercard, Apple Pay, Google Pay, Chèques Vacances Connect) ?

### D. Facturation, Avoirs & Édition Comptable
1. **Automatisation des factures :** Veux-tu que le site génère et envoie **automatiquement une facture PDF** dès que le paiement est validé ?
2. **Édition et modifications manuelles :** As-tu besoin de pouvoir **éditer / modifier des factures** depuis le back-office admin (ajuster un prix après négociation groupe, ajouter une option sur place, modifier l'adresse de facturation/nom de société) ?
3. **Gestion des Avoirs / Remboursements :** En cas d'annulation ou de remboursement (ex: annulation météo), faut-il générer automatiquement une **facture d'avoir** conforme ?
4. **Conformité & Comptabilité :**
    * Es-tu assujetti à la TVA ? (TVA applicable à 20%, 10%, 8.5% selon région/activité, ou franchise de TVA) ?
    * As-tu des mentions spécifiques obligatoires à faire figurer (N° SIRET, RCS, conditions d'escompte, assurance) ?
    * Souhaites-tu un **export automatique** des écritures / ventes (fichier CSV/Excel mensuel) pour transmission à ton comptable ou connexion à un logiciel (Pennylane, QuickBooks, Sage) ?

### E. Cadre Légal, Sécurité & Réglementation Maritime
1. **Manifeste des passagers (Obligation maritime) :** Avez-vous l'obligation de consigner la liste nominative des passagers (Nom, Prénom, date de naissance/âge, téléphone d'urgence) avant de quitter le port ? Faut-il un bouton d'export PDF/affichage en 1 clic pour la capitainerie ?
2. **Restrictions & Contre-indications :** Y a-t-il des restrictions physiques ou médicales (femmes enceintes, enfants en bas âge, personnes à mobilité réduite, niveau de nage minimum requis) nécessitant une acceptation/décharge de responsabilité obligatoire à la réservation ?
3. **Matériel & Équipements :** Fournissez-vous des équipements (combinaisons, palmes, masques, tubas) nécessitant de collecter les pointures/tailles en amont ?

### F. Gestion du "Jour J", Embarquement & Logistique Terrain
1. **Émargement / Check-in au ponton :** Comment validez-vous la présence des passagers à l'embarquement (scan de QR Code sur smartphone, émargement tactile sur tablette, liste d'émargement papier) ?
2. **Consignes et gestion des retards :** Quel est le délai de convocation avant le départ (ex: 20 min avant pour le briefing) ? Que se passe-t-il si un client est en retard (départ du bateau sans remboursement) ?
3. **Usage mobile sur le terrain :** L'interface d'administration sera-t-elle principalement utilisée sur ordinateur au bureau, ou en direct sur smartphone/tablette sur le ponton / en mer (nécessitant une interface très rapide et tactile) ?

### G. Transition Opérationnelle & Gestion Hybride (Téléphone / WhatsApp)
1. **Saisie express "Admin / Guichet" :** Lorsqu'un client réserve par téléphone, par WhatsApp ou se présente directement au ponton, avez-vous besoin d'une interface de saisie rapide pour bloquer des places en quelques secondes ?
2. **Paiement par lien (Pay-by-Link) :** Souhaitez-vous pouvoir envoyer un lien de paiement sécurisé par SMS ou WhatsApp à un client pour finaliser une réservation prise par téléphone ?
3. **Gestion des listes d'attente :** En haute saison lorsque les créneaux sont complets, souhaitez-vous une liste d'attente automatique alertant les personnes inscrites dès qu'une place se libère ?

### H. Expérience Client, Communication & Post-Sortie
1. **Rappels automatiques avant départ :** Souhaitez-vous envoyer des notifications automatiques (J-1 / H-2) avec localisation GPS exacte du ponton, consignes vestimentaires (crème solaire, coupe-vent) et briefing ?
2. **Partage des photos de la sortie :** Prenez-vous des photos des animaux marins pendant la sortie ? Faut-il prévoir un email post-sortie avec un lien vers un album photo / cloud ?
3. **Collecte d'avis clients :** Faut-il automatiser l'envoi d'un message après l'excursion (H+2) pour inciter les clients à laisser un avis sur Google My Business / TripAdvisor ?
4. **Intégration Web :** Avez-vous déjà un site internet existant (sur lequel intégrer un widget) ou faut-il concevoir une landing page complète de réservation ?

### I. Organisation Interne, Flotte & Ressources Humaines
1. **Flotte et bateaux :** Combien de bateaux exploitez-vous ? Ont-ils des caractéristiques et des jauges différentes ?
2. **Multi-moniteurs / Skippers :** Y a-t-il plusieurs capitaines / moniteurs à affecter aux sorties ?
3. **Synchronisation d'agendas :** Faut-il synchroniser le calendrier des sorties avec des agendas personnels (Google Calendar, Apple Calendar, Outlook) ?

### J. Technique, Infrastructure & Modèle Économique
1. **Budget Initial & Récurrent :**
    * Quel est ton budget global pour la réalisation de ce projet ?
    * Quel budget mensuel max acceptes-tu pour les frais d'outils récurrents (hébergement, abonnements logiciels, envoi de SMS) ?
2. **Choix d'Architecture (SaaS vs Développé sur-mesure) :**
    * Préfères-tu payer un abonnement mensuel/commission pour un outil déjà existant et clé en main (ex: Bokun, Resagenda), ou investir dans une solution 100% sur-mesure qui t'appartient ?
3. **Frais de Transaction & Paiement :**
    * Es-tu prêt à accepter une commission par transaction (ex: 1,4% + 0,25 € avec Stripe) répercutée ou absorbée dans tes tarifs ?
4. **Infrastructure & Hébergement :**
    * As-tu déjà un nom de domaine, un hébergement web ou un compte Stripe/PayPal entreprise existant ?
    * Qui est le propriétaire des accès techniques actuels ?
5. **Maintenance & Support Opérationnel :**
    * En cas de bug le samedi matin avant une sortie, quel niveau d'assistance/support technique attends-tu ?
    * Souhaites-tu souscrire à un contrat de maintenance mensuel (TMA) ou gérer les mises à jour en autonomie ?
6. **Sécurité & Données (RGPD) :**
    * Collectes-tu des données sensibles nécessitant une conformité RGPD spécifique (certificats médicaux, décharges de responsabilité) ?

---

## 3. Synthèse des Priorités Projets

* **P0 (Vital pour le lancement) :**
  * Module de réservation en ligne 24/7 avec calendrier centralisé en temps réel.
  * Passerelle de paiement en ligne sécurisée (Stripe/Mollie) avec acompte ou totalité et politique d'annulation configurable.
  * Saisie rapide back-office pour les réservations manuelles (téléphone / WhatsApp) avec génération de liens de paiement (*Pay-by-link*).
  * Outil d'annulation / report météo groupé en 1 clic (Email/SMS avec lien de ré-réservation ou bon d'achat).
  * Génération automatique et envoi de factures PDF conformes.
  * Affichage / export rapide du manifeste des passagers pour la sécurité maritime.
* **P1 (Essentiel pour la rentabilité & l'expérience) :**
  * Interface d'émargement / check-in responsive mobile pour le ponton.
  * Édition manuelle des factures et génération des avoirs depuis l'admin.
  * Notifications automatiques de rappel (J-1 / H-2) avec lieu de rendez-vous GPS et consignes.
  * Gestion des jauges minimales / maximales et alertes de rentabilité.
  * Module d'avis post-sortie (Google Reviews) et partage de photos.
* **P2 (Confort & Optimisations avancées) :**
  * Export comptable automatique (QuickBooks, Pennylane, CSV/Excel).
  * Liste d'attente automatique en cas de désistement sur créneau complet.
  * Synchronisation bidirectionnelle Google Calendar / Apple Calendar.
  * Gestion avancée multi-bateaux et affectation des skippers.
  * Contrat de maintenance applicative (TMA) et monitoring.