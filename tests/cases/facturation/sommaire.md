# Sommaire des cas de test — Facturation

**Domaine :** `FACTURATION`  
**Spécification couverte :** [`SPEC-FAC-02`](../../specs/facturation.md) (`REQ-008`, `R-08`, `Contrainte 14`, `REQ-106`)

---

| numero | testfile | description rapide | clause / exigence spec liée |
|---|---|---|---|
| 700 | CASE-FAC-700.md | Envoi de la facture PDF acquittée après paiement d'une réservation individuelle à Saint-Leu (Baleines 2 adultes 150 €) | `Scénario 1`, `AC-1`, `AC-5` |
| 701 | CASE-FAC-701.md | Envoi de la facture PDF acquittée après paiement d'une privatisation standard (forfait demi-journée matin 600 €) | `Scénario 2`, `AC-1`, `AC-5` |
| 702 | CASE-FAC-702.md | Facturation d'une réservation standard au départ de Saint-Gilles (tarif base adulte) | `Portée §1`, `AC-2` |
| 703 | CASE-FAC-703.md | Facturation d'une sortie « Dauphins » au tarif correspondant | `Portée §1`, `Cas limite #5` |
| 704 | CASE-FAC-704.md | Facturation d'une réservation mixte (adultes et enfants) avec ventilation détaillée des lignes tarifaires sur le PDF | `AC-2`, `Cas limite #5` |
| 705 | CASE-FAC-705.md | Application de la majoration géographique Saint-Leu (+10 € / personne) sur le profil tarifaire enfant avec ventilation distincte | `AC-2`, `Cas limite #5`, `Scénario 1` |
| 706 | CASE-FAC-706.md | Facturation d'une privatisation forfaitaire au départ de Saint-Leu sans application de majoration géographique | `Scénario 2`, `Cas limite #5` |
| 707 | CASE-FAC-707.md | Présence obligatoire et respect du format d'identifiant unique de facture (ex: `FACT-YYYY-XXXXX`) | `Scénario 1`, `Portée §1` |
| 708 | CASE-FAC-708.md | Présence obligatoire de la mention explicite « Acquittée » et du montant total TTC réglé sur le PDF | `AC-1`, `Règle` |
| 709 | CASE-FAC-709.md | Présence obligatoire de la date exacte et du créneau horaire de la prestation sur le PDF | `AC-2` |
| 710 | CASE-FAC-710.md | Présence obligatoire de l'intitulé exact de la prestation (Baleines, Dauphins, Privatisation) sur le PDF | `AC-2` |
| 711 | CASE-FAC-711.md | Mention explicite du port d'embarquement (Saint-Gilles ou Saint-Leu) sur la facture PDF | `AC-2`, `Scénario 1` |
| 712 | CASE-FAC-712.md | Ligne détaillée sur le PDF pour le supplément géographique Saint-Leu (10 € par personne) | `AC-2`, `Scénario 1`, `Cas limite #5` |
| 713 | CASE-FAC-713.md | Génération de la facture PDF exclusivement en mémoire sans persistance de fichier physique sur le disque du serveur | `AC-1`, `Règle`, `Portée §4` |
| 714 | CASE-FAC-714.md | Expédition immédiate du courriel transactionnel à l'adresse e-mail renseignée lors de la commande | `AC-5`, `Règle` |
| 715 | CASE-FAC-715.md | Facture PDF acquittée transmise en pièce jointe valide et non corrompue du courriel | `AC-5`, `Portée §3` |
| 716 | CASE-FAC-716.md | Inclusion du récapitulatif de la réservation dans le corps du courriel transactionnel | `Scénario 1` |
| 717 | CASE-FAC-717.md | Enregistrement de l'état d'émission à « envoyée avec succès » avec horodatage en base suite à l'envoi SMTP réussi | `AC-3`, `Scénarios 1 et 2` |
| 718 | CASE-FAC-718.md | Traitement d'un échec d'envoi SMTP : passage à l'état « échec d'émission », horodatage en base et consignation dans les logs | `AC-3`, `AC-4`, `Cas limite #1` |
| 719 | CASE-FAC-719.md | Comportement en cas de rebond / boîte de réception pleine (Bounce) : non-délivrance sans boucle de rattrapage automatique | `Cas limite #2`, `Ce qui n'est pas défini §1` |
| 720 | CASE-FAC-720.md | Non-déclenchement de la facturation (aucun PDF, aucun courriel, aucun statut créé) en cas de transaction bancaire rejetée ou refusée | `AC-6`, `Cas limite #3` |
| 721 | CASE-FAC-721.md | Non-déclenchement de la facturation lors d'un abandon ou d'une expiration de session de paiement (Timeout bancaire) | `AC-6`, `Cas limite #3` |
| 722 | CASE-FAC-722.md | Non-déclenchement de la facturation lorsque le paiement est au statut « en attente » (pending) | `AC-6` |
| 723 | CASE-FAC-723.md | Traitement idempotent d'une notification de paiement reçue en double : vérification en base bloquant toute régénération et réexpédition | `AC-7`, `Cas limite #4` |
