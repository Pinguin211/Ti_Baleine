# Modèle Logique de Données (MLD) — Ti'Baleine

---

## 1. Table `USERS` (Utilisateurs)
Cette table regroupe l'ensemble des personnes enregistrées sur la plateforme, qu'il s'agisse des clients effectuant une réservation ou de l'administrateur gérant l'activité.

* **Identifiant unique :** Numéro d'identification exclusif attribué à chaque utilisateur.
* **Adresse e-mail :** Adresse électronique unique servant d'identifiant de contact ou de connexion.
* **Mot de passe chiffré :** Code de sécurité d'accès à l'espace d'administration (laissé vide pour un client).
* **Prénom :** Prénom de la personne.
* **Nom :** Nom de famille de la personne.
* **Numéro de téléphone :** Coordonnée téléphonique de contact (optionnel).
* **Rôle :** Niveau d'accès attribué à la personne (`Client`, `Administrateur`).
* **Date de création :** Date et heure auxquelles la fiche utilisateur a été enregistrée.
* **Date de modification :** Date et heure de la dernière mise à jour des informations de l'utilisateur.

---

## 2. Table `BOOKINGS` (Réservations)
Cette table contient les informations principales relatives à chaque commande de sortie en mer.

* **Identifiant unique :** Numéro d'enregistrement interne propre à la réservation.
* **Référence de réservation :** Code de référence lisible fourni au client pour identifier son dossier (ex: `TB-A8F2`).
* **Numéro de facture :** Numéro officiel de facturation généré uniquement lorsque la réservation est payée.
* **Client associé :** Lien vers la fiche du client ayant effectué cette réservation dans la table des utilisateurs.
* **Type d'excursion :** Prestation choisie par le client (`Sortie Baleines`, `Sortie Dauphins`, `Privatisation Tikap`, `Privatisation Grand Bleu`).
* **Date de départ :** Date prévue pour l'excursion en mer.
* **Heure de départ :** Créneau horaire retenu parmi les 3 départs quotidiens (`07:00`, `9:00`, `10:00`, `14:00`).
* **Statut de la réservation :** État d'avancement du dossier (`En attente`, `Confirmée`, `Annulée`).
* **Date de création :** Date et heure exactes où la réservation a été initiée.

---

## 3. Table `BOOKING_ITEMS` (Passagers / Places réservées)
Chaque ligne de cette table représente **une place individuelle** réservée au sein d'une commande. Le nombre total de passagers et le montant global s'obtiennent en comptant dynamiquement le nombre de places associées à la réservation.

* **Identifiant unique :** Numéro d'enregistrement propre à la place.
* **Réservation associée :** Lien rattachant cette place à la réservation globale correspondante.
* **Catégorie du passager :** Type de tarif applicable à ce passager (`Adulte`, `Enfant`, `Forfait Privatisation`).

---

## 4. Table `PAYMENTS` (Transactions bancaires)
Cette table conserve l'historique et la trace des transactions bancaires effectuées par carte bancaire pour régler les réservations.

* **Identifiant unique :** Numéro d'enregistrement propre à la transaction de paiement.
* **Réservation associée :** Lien rattachant le paiement à la réservation correspondante.
* **Référence de transaction :** Numéro de confirmation officiel transmis par le service de paiement bancaire sécurisé.
* **Montant encaissé :** Somme totale payée lors de la transaction (exprimée en centimes).
* **Statut du paiement :** Résultat du paiement en ligne (`Réussi`, `Échoué`, `Remboursé`).
* **Données brutes de confirmation :** Détails techniques complets renvoyés par la banque (optionnel).
* **Date du paiement :** Date et heure exactes du règlement.

---

## 5. Relations entre les données

* **Un Utilisateur → Plusieurs Réservations :** Un même client peut effectuer une ou plusieurs réservations au fil du temps.
* **Une Réservation → Plusieurs Places (`BOOKING_ITEMS`) :** Une réservation contient une ou plusieurs places individuelles.
* **Une Réservation → Un ou plusieurs Paiements :** Une réservation fait l'objet d'un paiement en ligne (ou de tentatives de règlement).