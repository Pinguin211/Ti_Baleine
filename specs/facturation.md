# Spécifications — Facturation

**Domaine :** `FACTURATION`

---

## SPEC-FAC-02 — Envoi automatique de la facture par courriel après paiement

**Exigence :** REQ-008 (avec R-08, Contrainte 14, REQ-106)
**Statut :** revue IA faite
**Version :** v2

### Règle

Dès la confirmation du paiement en ligne d'une réservation, le système génère à la volée une facture acquittée au format PDF à partir des informations de la base de données (sans jamais stocker le fichier PDF physique sur disque) et la transmet immédiatement par courriel au client à l'adresse e-mail renseignée lors de la commande.

### Portée

Cette spécification couvre la génération dynamique de la facture acquittée, la traçabilité de son émission en base de données et son expédition automatique par courriel suite à la confirmation d'un paiement en ligne.

- Couvre la génération à la volée (en mémoire, sans persistance de fichier PDF sur le serveur) du document de facturation PDF reprenant l'ensemble des détails de la réservation (date, horaire, type de sortie baleines / dauphins / privatisation, lieu de départ Saint-Gilles ou Saint-Leu, nombre de personnes, suppléments tarifaires éventuels, montant TTC réglé, statut acquitté).
- Couvre la persistance en base de données d'un indicateur d'émission de facture (statut de succès/échec d'envoi et horodatage).
- Couvre l'envoi immédiat du courriel transactionnel avec la facture acquittée générée en pièce jointe à l'adresse du payeur.
- Ne couvre pas le stockage persistant de fichiers PDF sur le disque ou serveur de fichiers ; le générateur pourra créer un fichier temporaire uniquement en mémoire (ex : `tmpfile` ou `/dev/shm`) qui sera détruit immédiatement après l’envoi du courriel.
- Ne couvre pas le traitement et la validation de la transaction bancaire en ligne → [SPEC-RESERVATION-03](./reservation.md)
- Ne couvre pas la notification par SMS (réservée aux annulations administratives et alertes de pré-annulation selon le CDC v4) → [SPEC-ADMIN-02](./admin.md), [SPEC-ADMIN-06](./admin.md)
- Ne couvre pas la gestion des avoirs ou remboursements financiers en cas d'annulation ou de réduction du nombre de passagers (traitement manuel hors système selon le CDC v4) → hors périmètre
- Ne couvre pas l'export comptable ou l'intégration à un progiciel de comptabilité tiers → hors périmètre

### Scénarios nominaux

```gherkin
Scénario: Envoi de la facture après paiement d'une réservation individuelle avec départ à Saint-Leu
  Étant donné un client ayant sélectionné une sortie « Baleines » pour 2 adultes au départ de Saint-Leu le mardi 18 août à 9h00 (montant total : 150 € incluant le tarif de base de 65 € + le supplément géographique de 10 € / personne)
  Et que le client a renseigné l'adresse courriel « client.exemple@test.re »
  Quand le paiement en ligne de 150 € est validé avec succès par la passerelle de paiement
  Alors la facture acquittée PDF est générée à la volée à partir des données en base avec un identifiant unique (ex: « FACT-2026-00123 ») mentionnant explicitement le port d'embarquement « Saint-Leu »
  Et un courriel transactionnel contenant la facture PDF en pièce jointe et le récapitulatif de la réservation est immédiatement envoyé à « client.exemple@test.re »
  Et l'état d'émission de la facture est persisté en base de données à « envoyée avec succès »

Scénario: Envoi de la facture après paiement d'une privatisation
  Étant donné un client ayant réservé une « Privatisation demi-journée matin (7h–12h) » sur le Tikap (montant forfaitaire : 600 €)
  Et que le client a renseigné l'adresse courriel « contact@entreprise.re »
  Quand le paiement en ligne de 600 € est confirmé
  Alors la facture acquittée d'un montant de 600 € est générée à la volée depuis la base de données
  Et le courriel avec la facture PDF en pièce jointe est envoyé à « contact@entreprise.re »
  Et l'état d'émission de la facture est persisté en base de données à « envoyée avec succès »
```

### Cas limites

| # | Situation | Comportement attendu |
|---|---|---|
| 1 | Échec d'envoi du courriel (serveur SMTP indisponible, coupure réseau) | Une information persistée en base de données enregistre l'état d'échec d'émission de la facture ; l'incident est consigné dans les logs et l'envoi à la volée pourra être réessayé (aucun fichier PDF stocké). |
| 2 | Boîte de réception client pleine ou adresse erronée (Bounce / Rejet) | Aucun mécanisme de récupération ou de secours n'est prévu pour le moment ; le courriel n'est pas délivré et aucune récupération automatique des informations n'est effectuée. |
| 3 | Transaction bancaire rejetée, annulée, abandonnée ou non aboutie (pas de paiement) | La logique de génération de facture n'est pas déclenchée : aucun document n'est produit, aucun courriel n'est émis et aucun statut d'émission n'est créé en base. |
| 4 | Réception multiple de la confirmation de paiement (webhook reçu en doublon) | Traitement idempotent : vérification de l'indicateur d'émission en base ; une seule génération/envoi est exécutée sans créer de doublon. |
| 5 | Variabilité des formules et tarifs (sorties individuelles avec majoration Saint-Leu, privatisations forfaitaires, sorties baleines/dauphins) | Le PDF est systématiquement généré à la volée en intégrant dynamiquement l'ensemble des informations et règles tarifaires propres à l'activité choisie (type de sortie, lieu de départ, détail des passagers adultes/enfants, suppléments appliqués). |

### Ce qui n'est pas défini

- *14/08/2026* — Traitement des erreurs de livraison (boîte de réception pleine ou adresse erronée) : aucune solution technique ni canal de secours n'est prévu pour le moment.
- *14/08/2026* — Choix de la bibliothèque de rendu HTML vers PDF en mémoire (ex: dompdf, Gotenberg, jsPDF côté serveur) : hypothèse retenue = générateur léger de PDF à la volée **sans persistance sur le système de fichiers**. Le moteur pourra créer un fichier temporaire en mémoire (ex : `tmpfile` ou `/dev/shm`) qui sera immédiatement détruit après l’envoi du courriel.
- *14/08/2026* — Choix du service / fournisseur d'e-mails transactionnels (ex: SMTP, SendGrid, Mailjet) : hypothèse retenue = passerelle SMTP transactionnelle standard.
- *14/08/2026* — Mentions légales exactes et charte graphique complète du document de facturation : hypothèse retenue = gabarit HTML/CSS paramétrable converti à la volée.

### Critères d'acceptation

- [ ] AC-1 — Toute confirmation de paiement réussie déclenche la génération à la volée en mémoire d'une facture acquittée au format PDF à partir des informations de la réservation, sans enregistrement de fichier PDF physique sur disque.
- [ ] AC-2 — La facture PDF générée mentionne obligatoirement le port d'embarquement (Saint-Gilles ou Saint-Leu), la date, le créneau horaire, la prestation et la ventilation tarifaire détaillée (adultes / enfants / suppléments).
- [ ] AC-3 — Une information persistée en base de données enregistre obligatoirement le statut d'émission de la facture (succès / échec d'envoi) avec l'horodatage correspondant.
- [ ] AC-4 — En cas d'échec d'envoi SMTP (Cas limite 1), le statut en base de données passe à « échec d'émission » pour permettre un suivi et un renvoi ultérieur à la volée.
- [ ] AC-5 — Le courriel de facturation contenant la facture PDF générée à la volée en pièce jointe est transmis à l'adresse du client dès validation du paiement.
- [ ] AC-6 — En l'absence de confirmation explicite de paiement (paiement échoué, rejeté, abandonné ou en attente), la logique de génération et d'émission de facture n'est pas déclenchée.
- [ ] AC-7 — Le mécanisme d'émission est idempotent (vérification du statut en base de données pour empêcher tout renvoi ou doublon de génération).

### Revue IA

Consigne utilisée :

> Analyse cette spécification. Recherche les ambiguïtés, contradictions,
> comportements non définis, cas limites oubliés et exigences impossibles à
> tester. Ne réécris pas la spécification.

| Remarque de l'IA | Décision | Motif |
|---|---|---|
| Préciser l'absence de stockage de fichiers PDF physiques sur disque | Acceptée | Les fichiers PDF sont exclusivement générés à la volée en mémoire lors de la demande/envoi, évitant la gestion de stockage/fichiers statiques. |
| Traiter la persistance de l'état d'émission en base de données | Acceptée | Ajout de la persistance de l'indicateur d'état d'émission de la facture (succès/échec) dans le cas limite #1 et les critères AC-2 et AC-3. |
| Clarifier la distinction entre les canaux de notification (SMS vs Email) | Acceptée | Conformément au CDC v4, le SMS est réservé aux annulations et alertes de pré-annulation émises par l'administrateur ; la facturation s'effectue exclusivement par courriel. |
| Traiter le risque de doublons lors de confirmations de paiement réseau | Acceptée | Intégration de la règle d'idempotence basée sur le statut persisté en base (cas limite #4, AC-6). |
| Intégrer les spécificités tarifaires issues du CR-03 (Saint-Leu +10€/pers vs privatisation 600€) | Acceptée | Explicité dans les scénarios nominaux et le cas limite #5. |
| Définir la gestion des factures d'avoirs ou remboursements suite à annulation | Refusée | Hors périmètre : le CR-03 indique que le traitement financier consécutif aux annulations/modifications est opéré manuellement hors système par l'entreprise. |
