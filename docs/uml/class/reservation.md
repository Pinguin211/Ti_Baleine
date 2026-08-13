# Diagramme de Classes Orienté Métier — Ti'Baleine (Module Réservation & Paiement)

---

## 1. Entité `Client`
Cette entité représente la personne (touriste ou local) qui effectue le parcours de réservation en ligne pour une sortie en mer.

* **Prénom :** Prénom du client.
* **Nom de famille :** Nom de famille du client.
* **Adresse e-mail :** Adresse électronique servant à l'envoi de la confirmation de réservation et de la facture.
* **Numéro de téléphone mobile :** Numéro de contact obligatoire permettant de joindre le client ou de lui envoyer un SMS d'information en cas d'annulation de la sortie par l'administrateur.

---

## 2. Entité `Réservation`
Cette entité regroupe l'ensemble des choix logistiques et des détails choisis par le client pour sa sortie en mer.

* **Référence de réservation :** Code lisible transmis au client pour identifier son dossier.
* **Lieu de départ :** Point d'embarquement retenu pour la sortie (`Saint-Gilles` ou `Saint-Leu`).
* **Date de départ :** Jour prévu pour l'excursion en mer.
* **Heure de départ :** Créneau horaire choisi selon la grille disponible (`07:00`, `09:00`, `10:00` ou `14:00`).
* **Nombre d'adultes :** Nombre de passagers bénéficiant du tarif plein (à partir de 12 ans).
* **Nombre d'enfants :** Nombre de passagers bénéficiant du tarif enfant (de 4 à 11 ans inclus, les enfants de moins de 4 ans n'étant pas admis à bord).
* **Statut de la réservation :** État d'avancement de la réservation dans le parcours (`Confirmée` après règlement intégral, `Annulée` en cas de modification par l'administrateur).

---

## 3. Entité `Type de Sortie`
Cette entité définit la formule et le type d'excursion sélectionnés par le client.

* **Nom de la prestation :** Type d'activité choisie (`Sortie Baleines`, `Sortie Dauphins`, `Privatisation`).
* **Format :** Mode de réservation retenu (`Billets individuels` au siège ou `Forfait Privatisation` du navire en demi-journée).

---

## 4. Entité `Paiement`
Cette entité conserve la trace du règlement financier effectué en ligne par carte bancaire pour valider la commande.

* **Référence de la transaction :** Identifiant officiel délivré par la banque lors du paiement en ligne.
* **Montant total réglé :** Somme globale payée par le client lors du règlement (100 % de la commande).
* **Date et heure du règlement :** Moment exact où le paiement a été validé.
* **Statut du paiement :** Résultat direct du traitement de la carte bancaire (`Réussi` ou `Échoué`). *Note : Le statut "Remboursé" n'existe pas dans le système applicatif, car toute opération de remboursement financier est gérée manuellement par l'entreprise hors plateforme.*
* **Facture transmise au client :** Indicateur de confirmation (`Oui` / `Non`) attestant du bon envoi de la facture au format PDF à l'adresse e-mail du client après paiement réussi.

---

## 5. Relations entre les entités métier

* **Un Client → Une ou plusieurs Réservations :** Un même client peut effectuer une ou plusieurs réservations pour lui-même ou son groupe.
* **Une Réservation → Un Type de Sortie :** Chaque réservation porte sur un type de prestation et un format précis.
* **Une Réservation → Un Paiement :** Chaque réservation confirmée fait l'objet d'un règlement intégral en ligne (avec la transmission de son reçu PDF associés).