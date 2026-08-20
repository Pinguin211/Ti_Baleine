# Sommaire des cas de test — Facturation

**Domaine :** `FACTURATION`  
**Spécification couverte :** [`SPEC-FAC-02`](../../specs/facturation.md) (`REQ-008`, `R-08`, `Contrainte 14`, `REQ-106`)

---

| numero | testfile | description rapide | clause / exigence spec liée |
|---|---|---|---|
| 700 | CASE-FAC-700.md | Émission des factures d'acompte et de solde après paiement d'une réservation individuelle à Saint-Leu (Baleines 2 adultes, 150 € : acompte 45 € + solde 105 €) | `Scénario 1`, `AC-1`, `AC-2`, `AC-3`, `AC-6` |
| 701 | CASE-FAC-701.md | Émission des factures d'acompte et de solde après paiement d'une privatisation standard (forfait demi-journée matin 600 € : acompte 300 € + solde 300 €) | `Scénario 2`, `AC-1`, `AC-2`, `AC-3`, `AC-6` |
| 702 | CASE-FAC-702.md | Facturation de l'acompte (30 %) d'une réservation standard au départ de Saint-Gilles (tarif base adulte) | `Portée §1`, `AC-1`, `AC-3` |
| 703 | CASE-FAC-703.md | Facturation de l'acompte (30 %) d'une sortie « Dauphins » au tarif correspondant | `Portée §1`, `Cas limite #5` |
| 704 | CASE-FAC-704.md | Facturation de l'acompte (30 %) d'une réservation mixte (adultes et enfants) avec ventilation détaillée des lignes tarifaires sur le PDF | `AC-1`, `AC-3`, `Cas limite #5` |
| 705 | CASE-FAC-705.md | Application de la majoration géographique Saint-Leu (+10 € / personne) sur le profil tarifaire enfant avec ventilation distincte sur la facture d'acompte | `AC-1`, `AC-3`, `Cas limite #5`, `Scénario 1` |
| 706 | CASE-FAC-706.md | Émission des factures d'acompte et de solde d'une privatisation forfaitaire au départ de Saint-Leu sans application de majoration géographique | `AC-1`, `AC-2`, `AC-3`, `Scénario 2`, `Cas limite #5` |
| 707 | CASE-FAC-707.md | Présence obligatoire et unicité des identifiants de facture d'acompte et de solde (ex: `FACT-AC-YYYY-XXXXX` / `FACT-SO-YYYY-XXXXX`) | `Scénario 1`, `Portée §1`, `AC-1`, `AC-2` |
| 708 | CASE-FAC-708.md | Présence obligatoire des mentions explicites « Acompte acquitté » / « Acquittée » et des montants correspondants sur les factures PDF | `AC-1`, `AC-2`, `Règle` |
| 709 | CASE-FAC-709.md | Présence obligatoire de la date exacte et du créneau horaire de la prestation sur les factures PDF (acompte et solde) | `AC-3` |
| 710 | CASE-FAC-710.md | Présence obligatoire de l'intitulé exact de la prestation (Baleines, Dauphins, Privatisation) sur les factures PDF (acompte et solde) | `AC-3` |
| 711 | CASE-FAC-711.md | Mention explicite du port d'embarquement (Saint-Gilles ou Saint-Leu) sur les factures PDF (acompte et solde) | `AC-3`, `Scénario 1` |
| 712 | CASE-FAC-712.md | Ligne détaillée sur les factures d'acompte et de solde pour le supplément géographique Saint-Leu (10 € par personne) | `AC-1`, `AC-2`, `AC-3`, `Scénario 1`, `Cas limite #5` |
| 713 | CASE-FAC-713.md | Génération de la facture (acompte ou solde) exclusivement en mémoire sans persistance de fichier physique sur le disque du serveur | `AC-1`, `AC-2`, `Règle`, `Portée §5` |
| 714 | CASE-FAC-714.md | Expédition immédiate du courriel transactionnel (facture d'acompte ou de solde) à l'adresse e-mail renseignée lors de la commande | `AC-6`, `Règle` |
| 715 | CASE-FAC-715.md | Facture d'acompte ou de solde transmise en pièce jointe PDF valide et non corrompue du courriel | `AC-6`, `Portée §4` |
| 716 | CASE-FAC-716.md | Inclusion du récapitulatif de la réservation (acompte réglé / solde dû, puis acquittement) dans le corps des courriels transactionnels | `AC-6`, `Scénario 1` |
| 717 | CASE-FAC-717.md | Enregistrement de l'état d'émission à « envoyée avec succès » avec horodatage en base, indépendamment pour la facture d'acompte et la facture de solde | `AC-4`, `Scénarios 1 et 2` |
| 718 | CASE-FAC-718.md | Traitement d'un échec d'envoi SMTP pour la facture d'acompte ou de solde : passage à l'état « échec d'émission » et horodatage en base | `AC-4`, `AC-5`, `Cas limite #1` |
| 719 | CASE-FAC-719.md | Comportement en cas de rebond / boîte de réception pleine (Bounce) : non-délivrance sans boucle de rattrapage automatique | `Cas limite #2`, `Ce qui n'est pas défini §1` |
| 720 | CASE-FAC-720.md | Non-déclenchement de la facturation (aucun PDF, aucun courriel, aucun statut créé) en cas de transaction bancaire rejetée ou refusée, sur l'acompte comme sur le solde | `AC-7`, `Cas limite #3` |
| 721 | CASE-FAC-721.md | Non-déclenchement de la facturation lors d'un abandon ou d'une expiration de session de paiement de l'acompte ou du solde (Timeout bancaire) | `AC-7`, `Cas limite #3` |
| 722 | CASE-FAC-722.md | Non-déclenchement de la facturation lorsque le paiement de l'acompte ou du solde est au statut « en attente » (pending) | `AC-7` |
| 723 | CASE-FAC-723.md | Traitement idempotent d'une notification de paiement reçue en double, contrôlé indépendamment pour la facture d'acompte et la facture de solde | `AC-8`, `Cas limite #4` |
