# Questions à poser au client avant le cahier des charges
### Projet : plateforme de réservation en ligne + paiement

L'objectif de cet entretien est de verrouiller un maximum de décisions en amont pour éviter les changements de périmètre en cours de développement (ajout de fonctionnalité, changement de logique métier, nouvel outil à intégrer, etc.). Chaque section correspond à un point qui, si mal cadré au départ, entraîne typiquement un retour en arrière coûteux.

---

## 1. L'activité et l'offre

- Quel est précisément le type d'activité proposé (excursions, sorties en mer, randonnées, plongée, location, cours, événements...) ? Y a-t-il plusieurs types de prestations différentes ?
- Combien de formules/produits différents propose-t-il actuellement (ex. : sortie découverte, sortie premium, sortie privée) ? Cette liste est-elle stable ou évolue-t-elle souvent (saisonnalité, nouvelles offres) ?
- Chaque sortie a-t-elle une durée fixe, ou est-ce variable selon la formule ?
- Combien de sorties/créneaux propose-t-il en moyenne par jour/semaine ?
- Y a-t-il un ou plusieurs prestataires/guides/bateaux/véhicules ? Si plusieurs, faut-il gérer un planning par ressource (guide A dispo, guide B pas dispo) ?
- Y a-t-il une saisonnalité forte (haute/basse saison, fermeture certains mois) ?

## 2. Le processus de réservation actuel

- Aujourd'hui, quelles infos demande-t-il au client au téléphone/WhatsApp avant de confirmer (nom, nombre de personnes, âge des enfants, niveau, allergies, etc.) ?
- Combien de temps s'écoule en général entre la demande et la confirmation ferme ?
- A-t-il un système de suivi actuel (carnet, tableur, agenda papier) qu'il faudra reprendre ou dont il faudra s'inspirer ?
- Souhaite-t-il garder la possibilité de réserver par téléphone/WhatsApp en parallèle du site, au moins au début ? Si oui, comment les deux calendriers restent synchronisés pour éviter le double-booking ?

## 3. Groupes, capacité et disponibilités

- Quelle est la capacité minimale et maximale par sortie (par personne, par bateau/véhicule, par créneau) ?
- Une sortie a-t-elle un nombre minimum de participants pour être maintenue ? Que se passe-t-il si ce minimum n'est pas atteint (annulation, report, sortie maintenue à perte) ?
- Un client peut-il réserver plusieurs places en une seule fois (ex. : famille de 5) ? Y a-t-il une limite par réservation ?
- Les groupes peuvent-ils se combiner (plusieurs réservations indépendantes sur la même sortie) ou une sortie est-elle réservée par un seul groupe à la fois (privatisée) ?
- Si un groupe veut modifier sa taille après réservation (ajouter/retirer des personnes), jusqu'à quand est-ce autorisé et comment le prix est-il recalculé ?
- Faut-il gérer des tarifs différents par profil (adulte/enfant/bébé, résident/touriste, tarif groupe) ?

## 4. Annulations et no-show

- Quel délai minimum avant la sortie pour qu'un client annule sans frais ? Quelles sont les règles au-delà (remboursement partiel, aucun remboursement, avoir) ?
- Qui a le droit d'annuler une réservation : uniquement le client, uniquement lui (le prestataire), les deux ?
- Que doit-il se passer automatiquement en cas de non-présentation (no-show) le jour J ?
- Souhaite-t-il proposer un système d'avoir/crédit plutôt qu'un remboursement dans certains cas ?
- Faut-il une liste d'attente si une sortie est complète, avec notification automatique en cas de désistement ?

## 5. Météo et report de sorties

- Qui décide d'annuler/reporter une sortie pour météo, et sur quels critères (lui-même au jugé, un seuil précis, une source météo particulière) ?
- Combien de temps à l'avance cette décision est-elle généralement prise (la veille, le matin même, quelques heures avant) ?
- Quand une sortie est reportée pour météo, que doit proposer le système au client : remboursement automatique, choix entre remboursement et report sur une autre date, avoir uniquement ?
- Le report doit-il être individuel (chaque client choisit sa nouvelle date) ou groupé (toute la sortie est déplacée en bloc pour tout le monde) ?
- Souhaite-t-il pouvoir décaler une sortie en un clic et que tous les clients concernés soient notifiés automatiquement (SMS/e-mail/WhatsApp) ?

## 6. Paiement

- Le paiement en ligne doit-il être obligatoire à la réservation, ou souhaite-t-il aussi laisser une option "paiement sur place" ?
- Paiement intégral à la réservation, ou acompte + solde à régler plus tard (et si acompte, quel pourcentage et quand le solde est-il prélevé) ?
- Quels moyens de paiement souhaite-t-il accepter (carte bancaire, Apple Pay/Google Pay, virement) ?
- A-t-il déjà un compte chez un prestataire de paiement (Stripe, PayPal, autre) ou faut-il en créer un ? A-t-il une société/SIRET pour ouvrir ce type de compte ?
- Qui gère les remboursements : automatique selon les règles définies en section 4, ou toujours validé manuellement par lui avant remboursement ?
- Faut-il gérer plusieurs devises (touristes étrangers) ou uniquement l'euro ?
- A-t-il des obligations de facturation (factures automatiques envoyées au client, export pour son comptable) ?

## 7. Notifications et communication

- Quels messages automatiques attend-il : confirmation de réservation, rappel avant la sortie, alerte en cas de report météo, remerciement après la sortie ?
- Par quel(s) canal(aux) : e-mail, SMS, WhatsApp ? (WhatsApp implique une intégration à l'API WhatsApp Business, à budgétiser séparément)
- Souhaite-t-il être notifié lui-même à chaque nouvelle réservation/annulation (et par quel canal) ?

## 8. Compte client et informations collectées

- Le client doit-il créer un compte pour réserver, ou une réservation "invité" (juste nom + e-mail + téléphone) suffit-elle ?
- Quelles informations sont obligatoires à la réservation (âge, niveau de natation, allergies, poids si pertinent pour l'activité, contact d'urgence) ?
- Faut-il collecter une signature électronique de décharge de responsabilité / CGV au moment de la réservation ?

## 9. Langues et clientèle

- Le site doit-il être multilingue (français, anglais, autre) dès le lancement, ou uniquement en français pour commencer ?
- La clientèle est-elle plutôt locale, touristique, ou les deux ? Cela influence-t-il les moyens de paiement ou les langues à prévoir en priorité ?

## 10. Back-office (interface pour le client/prestataire)

- Qui va gérer le planning au quotidien (lui seul, un employé, plusieurs personnes) ? Faut-il des droits d'accès différents ?
- Souhaite-t-il pouvoir créer/modifier/supprimer des créneaux et des tarifs lui-même, sans repasser par le développeur ?
- A-t-il besoin d'une vue d'ensemble (tableau de bord) : réservations du jour, chiffre d'affaires, taux de remplissage ?
- Doit-il pouvoir exporter la liste des participants d'une sortie (ex. pour l'embarquement, l'assurance) ?

## 11. Legal et administratif

- A-t-il déjà des CGV (conditions générales de vente) rédigées, ou faut-il l'orienter vers un professionnel pour les rédiger avant la mise en ligne ?
- Le RGPD s'applique : est-il déjà sensibilisé à la conservation des données clients, ou faut-il prévoir cet accompagnement ?
- L'activité nécessite-t-elle une assurance ou une décharge de responsabilité signée obligatoirement avant la sortie ?
- Y a-t-il un âge minimum, des restrictions médicales ou une réglementation spécifique à afficher/collecter (ex. activité nautique, sport à risque) ?

## 12. Marque, contenu et technique

- A-t-il déjà un nom de domaine, un logo, une charte graphique, ou tout est-il à créer ?
- A-t-il déjà des photos/vidéos de qualité de ses sorties à utiliser sur le site ?
- Utilise-t-il déjà un outil qu'il faudrait connecter (Google Agenda, un logiciel de comptabilité, Instagram/Facebook) ?
- Le site doit-il être accessible facilement depuis un mobile en priorité (probable, vu l'usage WhatsApp) ?

## 13. Budget, délais et évolutions

- Quel budget a-t-il en tête pour la réalisation, et pour l'hébergement/maintenance mensuelle après le lancement ?
- Y a-t-il une date de lancement souhaitée (ex. avant une saison touristique) ?
- Une fois le site en ligne, qui s'occupera des mises à jour de contenu (lui-même via le back-office, ou toi) ?
- Anticipe-t-il d'autres besoins à moyen terme qu'il vaut mieux prévoir dans l'architecture dès maintenant, même sans les développer tout de suite (ex. programme de fidélité, avis clients, vente de bons cadeaux) ?

---

## Points à faire trancher explicitement avant de commencer à coder

Ces sujets sont ceux qui, s'ils changent en cours de route, ont le plus d'impact sur le code déjà écrit — à faire valider noir sur blanc (mail ou document signé) avant le début du développement :

- Règle exacte d'acompte/paiement intégral et de remboursement (section 6)
- Logique précise de gestion météo : qui décide, comment le système traite le report (section 5)
- Paiement en ligne obligatoire ou non, et moyens de paiement retenus (section 6)
- Réservation par téléphone/WhatsApp maintenue en parallèle ou non (section 2)
- Périmètre exact des langues et devises au lancement (section 9)
- Ce qu'il doit pouvoir gérer seul dans le back-office vs ce qui reste de ton ressort (section 10)
