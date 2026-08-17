# Modèle Logique de Données (MLD) — Ti'Baleine

Ce MLD traduit les **entités persistées** du diagramme de domaine (`docs/uml/domain.puml`). Il exclut volontairement :

* les **configurations constantes** (`ConfigPort`, `ConfigBateau`, `ConfigActivite`, `ConfigSkipper`), codées en dur et non stockées en base — leurs valeurs deviennent des **types énumérés** (colonnes ENUM) ;
* les **entités temporaires** (`Facture`, `NotificationSMS`, `NotificationEmail`), générées à la volée et non persistées — seule la **traçabilité de la facture** est conservée dans `PAYMENTS`.

Les attributs *calculés* du domaine (`calculerJauge`, `placesRestantes`, `calculerMontantTotal`…) ne sont pas stockés : ils se recalculent à la demande.

---

## 1. Table `USERS` (Utilisateurs)
Personnes enregistrées sur la plateforme : clients (mode invité) et administrateur. Traduit l'entité `User`.

* **Identifiant unique :** Numéro d'identification exclusif de l'utilisateur.
* **Adresse e-mail :** Adresse électronique unique de contact / connexion.
* **Mot de passe chiffré :** Code d'accès back-office. **Vide (`null`) pour un client invité**, renseigné pour un administrateur authentifiable (`motDePasse [0..1]` du domaine).
* **Prénom / Nom :** Identité de la personne.
* **Numéro de téléphone mobile :** Coordonnée obligatoire pour un client (envoi des SMS d'alerte / annulation).
* **Rôle :** Niveau d'accès (`CLIENT`, `ADMIN`).
* **Date de création / de modification :** Horodatage technique de la fiche.

---

## 2. Table `ALERTS` (Alertes de pré-annulation)
Alertes de pré-annulation émises la veille au soir (CR-004). Traduit l'entité `Alerte`.

* **Identifiant unique :** Numéro d'enregistrement de l'alerte.
* **Message :** Corps du message tel qu'expédié, en version **bilingue combinée** (texte français suivi de sa traduction anglaise). Le motif (météo, technique…) est intégré au message — le domaine ne modélise qu'un champ `message`. Aucun indicateur de langue du client n'est stocké. Le **canal** (SMS / e-mail) n'est pas persisté : il est porté par les notifications temporaires émises.
* **Date d'émission :** Horodatage de l'émission (typiquement J-1 à 18h).

---

## 3. Table `SLOTS` (Créneaux)
Créneaux de sortie proposés. Traduit l'entité `Creneau`. Un créneau est identifié de façon unique par la combinaison **date + heure + port + activité**.

* **Identifiant unique :** Numéro d'enregistrement du créneau.
* **Date de la sortie :** Jour du départ.
* **Heure de départ :** Créneau horaire (`07:00`, `09:00`, `10:00`, `14:00`).
* **Port d'embarquement :** Site de départ (`SAINT_GILLES`, `SAINT_LEU`) — source **unique** du port (attribut `port` du domaine).
* **Prestation :** Activité proposée (`BALEINES`, `DAUPHINS`, `PRIVATISATION_TIKAP`, `PRIVATISATION_GRAND_BLEU`).
* **Ouvert à la vente :** Indicateur d'ouverture (`estOuvert` : clôture H-2, fermeture annuelle…).
* **Alerte associée :** Lien optionnel vers l'alerte de pré-annulation ciblant ce créneau. Un créneau est **« sous alerte »** lorsque ce lien est renseigné (domaine : *ciblé par 0..1 Alerte*).

*Jauge, places réservées et places restantes ne sont pas stockées : elles se calculent (config navire/port + billets).*

---

## 4. Table `BOOKINGS` (Réservations)
Commandes de sortie en mer. Traduit l'entité `Reservation`.

* **Identifiant unique :** Numéro d'enregistrement interne de la réservation.
* **Référence de réservation :** Code lisible fourni au client (ex. `TB-A8F2`).
* **Client associé :** Lien vers l'utilisateur ayant effectué (ou l'admin gérant) la réservation.
* **Créneau réservé :** Lien vers le créneau (`SLOTS`) sur lequel porte la réservation (composition `Creneau *— Reservation`).
* **Statut :** État du dossier (`EN_ATTENTE_PAIEMENT`, `CONFIRMEE`, `ANNULEE`). Une réservation annulée conserve son enregistrement (avec 0 billet actif).
* **Date de création :** Horodatage de l'initiation de la réservation.

*Le montant total n'est pas stocké : il est recalculé (`calculerMontantTotal`).*

---

## 5. Table `BOOKING_ITEMS` (Billets)
Chaque ligne représente **un billet** de la réservation. Traduit l'entité `Billet`.

* **Identifiant unique :** Numéro d'enregistrement du billet.
* **Réservation associée :** Lien rattachant le billet à sa réservation.
* **Type de billet :** Catégorie tarifaire (`ADULTE` ≥ 12 ans, `ENFANT` 4–11 ans, `PRIVATISATION` = billet unique forfaitaire du navire privatisé). Les moins de 4 ans sont interdits (R-06).

---

## 6. Table `PAYMENTS` (Paiements)
Transactions bancaires. Traduit l'entité `Paiement` — **présent uniquement en cas de règlement réussi**. Porte aussi la traçabilité de la facture (entité `Facture` non persistée, générée à la volée).

* **Identifiant unique :** Numéro d'enregistrement du paiement.
* **Réservation réglée :** Lien vers la réservation (au plus un paiement par réservation).
* **Référence de transaction :** Numéro de confirmation du prestataire bancaire sécurisé.
* **Montant encaissé :** Somme réglée (en centimes).
* **Date du paiement :** Horodatage du règlement.
* **Référence de facture :** Identifiant unique de la facture émise (ex. `FACT-2026-00123`).
* **Statut d'émission facture :** Résultat de l'envoi par e-mail (`EN_ATTENTE`, `ENVOYEE_SUCCES`, `ECHEC_ENVOI`) — permet le renvoi et l'idempotence.
* **Date d'émission de la facture :** Horodatage de l'émission de la facture.

---

## 7. Relations entre les données

* **Un Utilisateur → Plusieurs Réservations :** Un client (ou l'admin) est lié à plusieurs réservations.
* **Un Créneau → Plusieurs Réservations :** Un créneau regroupe zéro à plusieurs réservations ; une réservation porte sur **exactement un** créneau.
* **Une Alerte → Un ou plusieurs Créneaux :** Une alerte cible `1..*` créneaux (envoi groupé) ; un créneau est ciblé par **au plus une** alerte (`alert_id` nullable).
* **Une Réservation → Plusieurs Billets :** Une réservation contient zéro (si annulée) à plusieurs billets ; au moins un à la création.
* **Une Réservation → Au plus un Paiement :** Une réservation confirmée fait l'objet d'un paiement réussi unique.

---

## 8. Éléments du domaine non matérialisés

| Élément du domaine | Nature | Traitement dans le MLD |
|---|---|---|
| `ConfigPort`, `ConfigBateau`, `ConfigActivite`, `ConfigSkipper` | Constantes (fichiers en dur) | Non persistés ; valeurs → colonnes ENUM (`port`, `activite`, `type_billet`…). |
| `Facture` | Temporaire (PDF à la volée) | Non persistée ; traçabilité (référence + statut d'émission) portée par `PAYMENTS`. |
| `NotificationSMS`, `NotificationEmail` | Temporaires (envoi éphémère) | Non persistées ; le canal d'envoi n'est pas stocké. |
