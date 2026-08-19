# Spécifications — Facturation

**Domaine :** `FACTURATION`

---

## SPEC-FAC-02 — Émission et envoi automatique des factures distinctes par courriel (acompte et solde)

**Exigence :** REQ-008 (avec R-07, R-31, Contrainte 14, REQ-106)  
**Statut :** revue IA faite  
**Version :** v4 (19/08/2026 — CDC v5)

### Règle

Pour des raisons techniques de sécurité, d'architecture stateless et de conformité RGPD, le système émet **deux factures distinctes** générées exclusivement à la volée en mémoire au format PDF (sans persistance de fichier PDF physique sur le disque serveur) et les transmet automatiquement par courriel au client à l'adresse e-mail renseignée lors de la commande :
1. **Facture d'acompte :** Dès la confirmation du paiement en ligne de l'acompte obligatoire (30 % pour les sorties standard, 50 % pour les formules de privatisation), le système génère à la volée une facture d'acompte au format PDF (portant obligatoirement la mention explicite « Acompte acquitté », un identifiant unique non vide, le montant total TTC de la commande, le montant de l'acompte réglé et le solde restant dû) et la transmet immédiatement par courriel au client avec la confirmation de réservation.
2. **Facture de solde :** Dès le règlement effectif du solde restant (que le paiement s'effectue en ligne via le lien reçu par SMS ou sur place à l'embarcadère par carte bancaire), le système génère à la volée une facture de solde distincte au format PDF (portant obligatoirement la mention explicite « Acquittée », un identifiant unique non vide, le rappel de l'acompte perçu et l'acquittement complet du montant total TTC de la commande) et la transmet immédiatement par courriel au client.

### Portée

Cette spécification couvre la génération dynamique des deux factures PDF distinctes (acompte et solde), la traçabilité de leurs émissions en base de données et leur expédition automatique par courriel suite à chaque validation de paiement.

- Couvre la génération à la volée (en mémoire, sans persistance de fichier PDF sur le serveur) de la **facture d'acompte PDF** reprenant les détails de la réservation. Pour des raisons techniques de standardisation et de parsing strict, la date et l'horaire sont formatés selon la convention JJ/MM/AAAA HhMM sans zéro initial pour les heures à un chiffre (ex: 18/08/2026 9h00 via regex `\b([0-9]|1[0-9]|2[0-3])h[0-5][0-9]\b` — le format avec zéro initial ex: 09h00 n'étant pas admis dans ce gabarit), avec mention du type de sortie, port d'embarquement Saint-Gilles ou Saint-Leu, détail des passagers adultes/enfants, ligne de supplément géographique éventuelle, montant total TTC de la commande, montant de l'acompte réglé, solde restant dû, mention explicite « Acompte acquitté », identifiant unique non vide.
- Couvre la génération à la volée de la **facture de solde distincte PDF** reprenant les détails de la commande, le montant total TTC acquitté, le rappel du montant d'acompte initialement versé, le montant du solde réglé, la mention explicite « Acquittée » et un identifiant unique distinct non vide.
- Couvre la persistance en base de données des indicateurs d'émission de chaque facture (statut de succès/échec d'envoi et horodatage pour la facture d'acompte et pour la facture de solde).
- Couvre l'envoi immédiat du courriel transactionnel avec la facture correspondante en pièce jointe valide à l'adresse de contact du client.
- Pour des raisons techniques et de conformité RGPD (minimisation des données stockées), ne couvre pas le stockage persistant de fichiers PDF sur le disque ou serveur de fichiers ; le générateur crée un fichier temporaire uniquement en mémoire vive (ex : `tmpfile` ou `/dev/shm`) qui est détruit immédiatement après l'envoi du courriel.
- Ne couvre pas le traitement et la validation de la transaction bancaire de l'acompte en ligne ou du solde en ligne → [SPEC-RESERVATION-03](./reservation.md).
- Ne couvre pas l'encaissement du solde par carte bancaire sur place par l'administrateur → [SPEC-ADMIN-08](./admin.md).
- Ne couvre pas la notification par SMS (réservée aux rappels de solde à J-1, aux annulations administratives et aux alertes de pré-annulation selon le CDC v5) → [SPEC-RESERVATION-03](./reservation.md), [SPEC-ADMIN-02](./admin.md), [SPEC-ADMIN-06](./admin.md).
- Ne couvre pas la gestion des avoirs ou remboursements financiers en cas d'annulation ou de réduction du nombre de passagers (traitement manuel hors système selon le CDC v5) → hors périmètre.
- Ne couvre pas l'export comptable ou l'intégration à un progiciel de comptabilité tiers → hors périmètre.

### Scénarios nominaux

```gherkin
Scénario: Émission de la facture d'acompte puis de la facture de solde pour une réservation individuelle à Saint-Leu
  Étant donné un client ayant réservé une sortie « Baleines » pour 2 adultes au départ de Saint-Leu le mardi 18/08/2026 à 9h00 (montant total : 150 € incluant le tarif de base de 65 € + le supplément géographique de 10 € / personne)
  Et que le client a renseigné l'adresse courriel « client.exemple@test.re »
  Quand le paiement en ligne de l'acompte de 30 % (45 €) est validé avec succès par la passerelle de paiement
  Alors la facture d'acompte PDF est générée à la volée à partir des données en base avec un identifiant unique (ex: « FACT-AC-2026-00123 »), la date « 18/08/2026 9h00 », la mention explicite « Acompte acquitté », le montant total (150 €), l'acompte réglé (45 €) et le solde restant dû (105 €)
  Et un courriel transactionnel contenant la facture d'acompte PDF en pièce jointe et le récapitulatif est immédiatement envoyé à « client.exemple@test.re »
  Et l'état d'émission de la facture d'acompte est persisté en base de données à « envoyée avec succès »
  Quand le client règle ultérieurement le solde de 105 € (en ligne via le lien SMS ou sur place en CB)
  Alors la facture de solde distincte PDF est générée à la volée avec un identifiant unique distinct (ex: « FACT-SO-2026-00456 »), la mention explicite « Acquittée », le récapitulatif complet et l'acquittement intégral des 150 €
  Et un courriel contenant la facture de solde PDF est immédiatement envoyé à « client.exemple@test.re »
  Et l'état d'émission de la facture de solde est persisté en base de données à « envoyée avec succès »

Scénario: Émission des deux factures pour une privatisation de navire
  Étant donné un client ayant réservé une « Privatisation demi-journée matin (7h–12h) » sur le Tikap (montant total fixe : 600 €)
  Et que le client a renseigné l'adresse courriel « contact@entreprise.re »
  Quand le paiement en ligne de l'acompte de 50 % (300 €) est confirmé
  Alors la facture d'acompte PDF est générée à la volée avec la mention « Acompte acquitté », mentionnant le total de 600 €, l'acompte réglé de 300 € et le solde restant de 300 €
  Et le courriel avec la facture d'acompte PDF en pièce jointe est envoyé à « contact@entreprise.re »
  Quand le solde de 300 € est réglé (via SMS ou à l'embarcadère par CB)
  Alors la facture de solde distincte PDF de 600 € acquittée est générée à la volée avec la mention explicite « Acquittée » et transmise par courriel à « contact@entreprise.re »
```

### Cas limites

| # | Situation | Comportement attendu |
|---|---|---|
| 1 | Échec d'envoi du courriel (serveur SMTP indisponible, coupure réseau) pour l'acompte ou le solde | Une information persistée en base de données enregistre l'état d'échec d'émission de la facture concernée avec son horodatage ; l'envoi à la volée pourra être réessayé ultérieurement (aucun fichier PDF stocké sur disque). |
| 2 | Boîte de réception client pleine ou adresse erronée (Bounce / Rejet) | Aucun mécanisme de récupération ou de secours n'est prévu ; le courriel n'est pas délivré et aucune récupération automatique des informations n'est effectuée. |
| 3 | Transaction bancaire rejetée, annulée ou non aboutie (acompte ou solde) | La logique de génération de facture correspondante n'est pas déclenchée : aucun document n'est produit, aucun courriel n'est émis et aucun statut d'émission n'est créé en base. |
| 4 | Réception multiple de confirmation de paiement (webhook reçu en doublon) | Traitement idempotent : vérification de l'indicateur d'émission en base pour la facture concernée (acompte ou solde) ; une seule génération/envoi est exécutée sans doublon. |
| 5 | Variabilité des formules et tarifs (sorties individuelles avec majoration Saint-Leu, privatisations forfaitaires, sorties baleines/dauphins) | Le PDF est systématiquement généré à la volée en intégrant dynamiquement l'ensemble des informations et règles tarifaires propres à l'activité choisie (type de sortie, lieu de départ, détail des passagers adultes/enfants selon les données transmises). Les formules de privatisation forfaitaires (600 €) sont des forfaits fixes non soumis à la majoration géographique par passager de Saint-Leu. |
| 6 | Règlement du solde effectué sur place par carte bancaire | La validation de l'encaissement CB sur place par l'administrateur déclenche immédiatement la génération à la volée et l'envoi par courriel de la facture de solde distincte à l'adresse du client. |

### Ce qui n'est pas défini

- *19/08/2026* — Traitement des erreurs de livraison (boîte de réception pleine ou adresse erronée) : aucune solution technique ni canal de secours n'est prévu pour le moment.
- *19/08/2026* — Choix de la bibliothèque de rendu HTML vers PDF en mémoire (ex: dompdf, Gotenberg, jsPDF côté serveur) : pour des raisons techniques d'architecture stateless et d'économie de ressources, choix retenu d'un générateur léger de PDF à la volée **sans persistance sur le système de fichiers**. Le moteur crée un fichier temporaire en mémoire (`tmpfile` ou `/dev/shm`) qui est immédiatement détruit après l'envoi du courriel.
- *19/08/2026* — Choix du service / fournisseur d'e-mails transactionnels (ex: SMTP, SendGrid, Mailjet) : hypothèse retenue = passerelle SMTP transactionnelle standard.
- *19/08/2026* — Mentions légales exactes et charte graphique complète du document de facturation : hypothèse retenue = gabarit HTML/CSS paramétrable converti à la volée.

### Critères d'acceptation

- [ ] AC-1 — Toute confirmation de paiement d'acompte réussie déclenche la génération à la volée en mémoire d'une facture d'acompte au format PDF portant obligatoirement la mention explicite « Acompte acquitté », un identifiant unique non vide, le montant total TTC de la commande, le montant de l'acompte réglé et le solde restant dû, sans enregistrement de fichier physique sur disque (REQ-008, R-31).
- [ ] AC-2 — Tout règlement effectif du solde (en ligne via lien SMS ou sur place par carte bancaire) déclenche la génération à la volée en mémoire d'une facture de solde distincte au format PDF portant obligatoirement la mention explicite « Acquittée », un identifiant unique distinct non vide, le rappel du montant d'acompte initial et l'acquittement intégral du montant total TTC (REQ-008, R-31).
- [ ] AC-3 — Les factures PDF générées mentionnent obligatoirement le port d'embarquement (Saint-Gilles ou Saint-Leu), la date et l'horaire au format standard sans zéro initial (JJ/MM/AAAA HhMM, ex: 18/08/2026 9h00 — 09h00 non admis dans ce gabarit), la prestation et la ventilation tarifaire détaillée (adultes / enfants / ligne dédiée pour le supplément géographique Saint-Leu pour les sorties individuelles).
- [ ] AC-4 — Une information persistée en base de données enregistre obligatoirement le statut d'émission de chaque facture (acompte et solde : succès / échec d'envoi) avec l'horodatage correspondant.
- [ ] AC-5 — En cas d'échec d'envoi SMTP (Cas limite 1), le statut en base de données passe à « échec d'émission » avec horodatage pour permettre un suivi et un renvoi ultérieur à la volée.
- [ ] AC-6 — Le courriel de facturation contenant la facture PDF générée à la volée en pièce jointe valide et le récapitulatif dans le corps du message est transmis à l'adresse du client dès validation du paiement correspondant (acompte ou solde).
- [ ] AC-7 — En l'absence de confirmation explicite de paiement (paiement échoué, rejeté, abandonné ou en attente), la logique de génération et d'émission de la facture correspondante n'est pas déclenchée.
- [ ] AC-8 — Le mécanisme d'émission est idempotent pour chaque type de facture (vérification du statut en base de données pour empêcher tout renvoi ou doublon de génération).

### Revue IA

Consigne utilisée :

> Analyse cette spécification. Recherche les ambiguïtés, contradictions,
> comportements non définis, cas limites oubliés et exigences impossibles à
> tester. Ne réécris pas la spécification.

| Remarque de l'IA | Décision | Motif |
|---|---|---|
| Préciser l'absence de stockage de fichiers PDF physiques sur disque | Acceptée | Les fichiers PDF sont exclusivement générés à la volée en mémoire lors de la demande/envoi, évitant la gestion de stockage/fichiers statiques. |
| Traiter la persistance de l'état d'émission en base de données | Acceptée | Ajout de la persistance de l'indicateur d'état d'émission de la facture (succès/échec) dans le cas limite #1 et les critères AC-4 et AC-5. |
| Intégrer le modèle à deux factures distinctes issu du CDC v5 (acompte + solde) | Acceptée | Conforme à R-31, REQ-008 et Contrainte 14 du CDC v5 : émission d'une facture d'acompte (avec solde restant dû) puis d'une facture de solde distincte (avec acquittement complet). |
| Clarifier la distinction entre les canaux de notification (SMS vs Email) | Acceptée | Conformément au CDC v5, le SMS est utilisé pour le lien de solde à J-1, les annulations et les alertes de pré-annulation ; les factures PDF sont expédiées exclusivement par courriel. |
| Traiter le risque de doublons lors de confirmations de paiement réseau | Acceptée | Intégration de la règle d'idempotence basée sur le statut persisté en base pour chaque facture (cas limite #4, AC-8). |
| Intégrer les spécificités tarifaires issues du CR-03 (Saint-Leu +10€/pers vs privatisation 600€) | Acceptée | Explicité dans les scénarios nominaux et le cas limite #5. |
| Définir la gestion des factures d'avoirs ou remboursements suite à annulation | Refusée | Hors périmètre : le CDC v5 indique que le traitement financier consécutif aux annulations/modifications est opéré manuellement hors système par l'entreprise. |
