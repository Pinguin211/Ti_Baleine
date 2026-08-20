# Modèle Logique de Données (MLD) — Ti'Baleine

Ce MLD traduit les **entités persistées** du diagramme de domaine (`docs/uml/domain.puml`), aligné sur les spécifications v4 / CDC v5 et harmonisé en langue française. Il exclut volontairement :

* les **configurations constantes** (`ConfigPort`, `ConfigBateau`, `ConfigActivite`, `ConfigSkipper`), codées en dur et non stockées en base — leurs valeurs deviennent des **types énumérés** (colonnes ENUM) ;
* les **entités temporaires** (`Facture`, `NotificationSMS`, `NotificationEmail`), générées à la volée et non persistées — seule la **traçabilité de la facture** est conservée dans `PAIEMENTS`.

Les attributs *calculés* du domaine (`calculerJauge`, `placesRestantes`, `calculerMontantTotal`, `calculerMontantAcompte`, `calculerMontantSolde`, `soldeRestantDu`…) ne sont pas stockés : ils se recalculent à la demande.

---

## 1. Table `UTILISATEURS` (Clients & Administrateur)
Personnes enregistrées sur la plateforme : clients (mode invité) et administrateur. Traduit l'entité `User` du domaine.

* **Identifiant unique (`id`) :** Numéro d'identification exclusif de l'utilisateur.
* **Adresse e-mail (`email`) :** Adresse électronique unique de contact / connexion.
* **Mot de passe chiffré (`mot_de_passe`) :** Code d'accès back-office. **Vide (`null`) pour un client invité**, renseigné pour un administrateur authentifiable (`motDePasse [0..1]` du domaine).
* **Nom de famille (`nom`) / Prénom (`prenom`) :** Identité de la personne.
* **Numéro de téléphone mobile (`telephone`) :** Coordonnée obligatoire pour un client (envoi des SMS d'alerte / annulation / lien de solde J-1).
* **Rôle (`role`) :** Niveau d'accès (`CLIENT`, `ADMIN`).

*Conformément au principe de minimisation des données (RGPD) et au profilage des clients invités sans compte pérenne, aucun champ d'audit temporel (`created_at`, `updated_at`) n'est conservé sur cette table.*

---

## 2. Table `ALERTES` (Alertes de pré-annulation)
Alertes de pré-annulation émises la veille au soir (SPEC-ADMIN-06). Traduit l'entité `Alerte`.

* **Identifiant unique (`id`) :** Numéro d'enregistrement de l'alerte.
* **Message (`message`) :** Corps du message tel qu'expédié, en version **bilingue combinée** (texte français suivi de sa traduction anglaise dans un champ unique). Le motif (météo, technique…) est intégré au message. Aucun indicateur de langue du client n'est stocké. Le **canal** (SMS / e-mail) n'est pas persisté : il est porté par les notifications temporaires émises.
* **Date d'émission (`date_emission`) :** Horodatage de l'émission de l'alerte (typiquement J-1 à 18h). Traduit `dateEmission: DateTime` du domaine.

---

## 3. Table `CRENEAUX` (Créneaux de sortie)
Créneaux de sortie proposés. Traduit l'entité `Creneau`. Un créneau est identifié de façon unique par la combinaison **date + heure_depart + port + activite**.

* **Identifiant unique (`id`) :** Numéro d'enregistrement du créneau.
* **Date de la sortie (`date`) :** Jour du départ.
* **Heure de départ (`heure_depart`) :** Créneau horaire (`07:00`, `09:00`, `10:00`, `14:00`).
* **Port d'embarquement (`port`) :** Site de départ (`SAINT_GILLES`, `SAINT_LEU`) — source **unique** du port (attribut `port` du domaine).
* **Prestation (`activite`) :** Activité proposée (`BALEINES`, `DAUPHINS`, `PRIVATISATION_TIKAP`, `PRIVATISATION_GRAND_BLEU`).
* **Ouvert à la vente (`est_ouvert`) :** Indicateur d'ouverture (`estOuvert` : clôture H-2, fermeture annuelle…).
* **Sous pré-alerte (`sous_pre_alerte`) :** Indicateur booléen activé lors de l'émission d'une alerte de pré-annulation (SPEC-ADMIN-06), déclenchant l'affichage de la mention d'avertissement publique et le badge admin. Traduit `sousPreAlerte: Boolean` du domaine.
* **Alerte associée (`alerte_id`) :** Lien optionnel vers l'alerte de pré-annulation ciblant ce créneau. Un créneau est **« sous alerte »** lorsque ce lien est renseigné (domaine : *ciblé par 0..1 Alerte*).

*Jauge, places réservées et places restantes ne sont pas stockées : elles se calculent (config navire/port + billets).*

---

## 4. Table `RESERVATIONS` (Dossiers de réservation)
Commandes de sortie en mer. Traduit l'entité `Reservation`.

* **Identifiant unique (`id`) :** Numéro d'enregistrement interne de la réservation.
* **Référence de réservation (`reference`) :** Code lisible fourni au client (ex. `TB-A8F2`).
* **Client associé (`user_id`) :** Lien vers l'utilisateur ayant effectué (ou l'admin gérant) la réservation.
* **Créneau réservé (`creneau_id`) :** Lien vers le créneau (`CRENEAUX`) sur lequel porte la réservation (composition `Creneau *— Reservation`).
* **Statut (`statut`) :** État financier du dossier (`EN_ATTENTE_PAIEMENT`, `PAYEE_PARTIELLEMENT`, `PAYEE_COMPLETEMENT`, `ANNULEE`). `PAYEE_PARTIELLEMENT` indique que seul l'acompte a été réglé (solde encore dû). `PAYEE_COMPLETEMENT` indique que l'acompte et le solde ont tous deux été réglés. Une réservation annulée conserve son enregistrement (avec 0 billet actif).
* **Date de création (`date_creation`) :** Horodatage de l'initiation de la réservation. Traduit `dateCreation: DateTime` du domaine. Nécessaire pour la logique temporelle du cron SMS J-1 : si la réservation est créée avant l'exécution du cron, le SMS de solde est envoyé ; si créée après, aucun SMS n'est envoyé.

*Les montants (total, acompte, solde, solde restant dû) ne sont pas stockés : ils sont recalculés à la demande (`calculerMontantTotal`, `calculerMontantAcompte`, `calculerMontantSolde`, `soldeRestantDu`).*

---

## 5. Table `BILLETS` (Titres de transport passagers)
Chaque ligne représente **un billet** de la réservation. Traduit l'entité `Billet`.

* **Identifiant unique (`id`) :** Numéro d'enregistrement du billet.
* **Réservation associée (`reservation_id`) :** Lien rattachant le billet à sa réservation.
* **Type de billet (`type_billet`) :** Catégorie tarifaire (`ADULTE` ≥ 12 ans, `ENFANT` 4–11 ans, `PRIVATISATION` = billet unique forfaitaire du navire privatisé). Les moins de 4 ans sont interdits (R-06).

---

## 6. Table `PAIEMENTS` (Transactions bancaires)
Transactions bancaires. Traduit l'entité `Paiement` — **présent uniquement en cas de règlement réussi**. Porte aussi la traçabilité de la facture (entité `Facture` non persistée, générée à la volée). Une réservation peut comporter **1 à 2 paiements** : un paiement d'acompte (30 % standard ou 50 % privatisation) puis un paiement de solde (70 % ou 50 %).

* **Identifiant unique (`id`) :** Numéro d'enregistrement du paiement.
* **Réservation réglée (`reservation_id`) :** Lien vers la réservation (1 à 2 paiements par réservation : acompte puis solde).
* **Nature du paiement (`type_paiement`) :** Type (`ACOMPTE` ou `SOLDE`). Traduit `typePaiement: TypePaiement` du domaine.
* **Canal de règlement (`canal_paiement`) :** Mode de paiement utilisé (`EN_LIGNE` via CB sécurisée, ou `SUR_PLACE_CB` à l'embarcadère). Traduit `canalPaiement: CanalPaiement` du domaine.
* **Référence de transaction (`reference_transaction`) :** Numéro de confirmation du prestataire bancaire sécurisé.
* **Montant encaissé (`montant`) :** Somme réglée en euros décimaux (`DECIMAL(10,2)`).
* **Date du paiement (`date_paiement`) :** Horodatage du règlement.
* **Référence de facture (`reference_facture`) :** Identifiant unique de la facture émise (ex. `FACT-AC-2026-00123` pour l'acompte, `FACT-SO-2026-00456` pour le solde).
* **Statut d'émission facture (`statut_emission_facture`) :** Résultat de l'envoi par e-mail (`EN_ATTENTE`, `ENVOYEE_SUCCES`, `ECHEC_ENVOI`) — permet le renvoi et l'idempotence.
* **Date d'émission de la facture (`date_emission_facture`) :** Horodatage de l'émission de la facture.

---

## 7. Table `TOKENS_PAIEMENT_SOLDE` (Tokens de paiement du solde)
Tokens sécurisés à usage unique pour le paiement en ligne du solde. Traduit l'entité `TokenPaiementSolde`.

* **Identifiant unique (`id`) :** Numéro d'enregistrement du token.
* **Réservation associée (`reservation_id`) :** Lien vers la réservation concernée (au plus un token par réservation).
* **Token (`token`) :** Jeton sécurisé unique intégré dans l'URL de paiement transmise par SMS à J-1.
* **Date de création (`date_creation`) :** Horodatage de la génération du token par le cron J-1.
* **Date d'expiration (`date_expiration`) :** Horodatage d'expiration (date de création + 1 heure / 60 minutes). Traduit `dateExpiration: DateTime` du domaine.
* **Utilisé (`est_utilise`) :** Indicateur booléen signalant si le token a déjà été consommé pour un paiement.

*Non généré pour les réservations créées après l'exécution du cron J-1 (C-26).*

---

## 8. Relations entre les données

* **Un Utilisateur → Plusieurs Réservations :** Un client (ou l'admin) est lié à plusieurs réservations (`UTILISATEURS 1 -- 0..* RESERVATIONS`).
* **Un Créneau → Plusieurs Réservations :** Un créneau regroupe zéro à plusieurs réservations ; une réservation porte sur **exactement un** créneau (`CRENEAUX 1 -- 0..* RESERVATIONS`).
* **Une Alerte → Un ou plusieurs Créneaux :** Une alerte cible `1..*` créneaux (envoi groupé) ; un créneau est ciblé par **au plus une** alerte (`ALERTES 0..1 -- 1..* CRENEAUX`).
* **Une Réservation → Plusieurs Billets :** Une réservation contient zéro (si annulée) à plusieurs billets ; au moins un à la création (`RESERVATIONS 1 -- 0..* BILLETS`).
* **Une Réservation → Un à deux Paiements :** Une réservation validée fait l'objet d'un paiement d'acompte, puis éventuellement d'un paiement de solde (`RESERVATIONS 1 -- 0..2 PAIEMENTS`).
* **Une Réservation → Au plus un Token de solde :** Une réservation avec acompte versé peut disposer d'un token sécurisé de paiement du solde, généré par le cron J-1 (`RESERVATIONS 1 -- 0..1 TOKENS_PAIEMENT_SOLDE`).

---

## 9. Éléments du domaine non matérialisés

| Élément du domaine | Nature | Traitement dans le MLD |
|---|---|---|
| `ConfigPort`, `ConfigBateau`, `ConfigActivite`, `ConfigSkipper` | Constantes (fichiers en dur) | Non persistés ; valeurs → colonnes ENUM (`port`, `activite`, `type_billet`…). |
| `Facture` | Temporaire (PDF à la volée) | Non persistée ; traçabilité (référence + statut d'émission + type facture) portée par `PAIEMENTS`. |
| `NotificationSMS`, `NotificationEmail` | Temporaires (envoi éphémère) | Non persistées ; le canal d'envoi n'est pas stocké. |
| `TypeFacture` (ACOMPTE, SOLDE) | Énumération temporaire | Non persistée ; déduite du `type_paiement` du `PAIEMENTS` correspondant. |
