# CASE-FAC-713 — Génération de la facture PDF exclusivement en mémoire sans persistance de fichier physique sur le disque du serveur

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-1`, `Règle`, `Portée §4`  
**Type :** architecture / conformité  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la contrainte architecturale interdisant tout stockage persistant de fichiers PDF sur le disque ou serveur de fichiers de l'application (respect de la minimisation de données et prévention de la saturation du disque). Si la règle se casse, le serveur accumulerait des fichiers PDF de factures sur son système de fichiers local sans politique de purge.

## Cas

```gherkin
Étant donné une réservation dont le paiement vient d'être validé
Quand le moteur de facturation génère la facture acquittée PDF et l'expédie par courriel
Alors le flux binaire du PDF est produit exclusivement en mémoire vive (ou via un fichier temporaire en mémoire détruit immédiatement)
Et aucun nouveau fichier PDF persistant n'est présent sur le système de fichiers du serveur à l'issue de l'opération
```

## Données

| Élément | Valeur |
|---|---:|
| Déclencheur | Génération de facture suite à paiement |
| Mode de génération | En mémoire vive (ex: buffer mémoire, `tmpfile`, `/dev/shm`) |
| Persistance disque autorisée | Aucune (0 fichier résiduel) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Fichiers PDF persistants sur disque | 0 fichier | Inspection du système de fichiers après émission |
| Génération en mémoire | Succès | Flux binaire valide généré et transmis au client SMTP |

## Ce que ce cas ne vérifie pas

- le contenu textuel interne de la facture (couvert par `CASE-FAC-708` à `CASE-FAC-712`) ;
- le statut d'envoi SMTP en base (couvert par `CASE-FAC-717`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_713_generation_facture_pdf_exclusivement_en_memoire_sans_persistance_disque`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test surveille le système de fichiers avant et après la génération/envoi de la facture.
- [ ] Le test confirme que le flux PDF est produit en mémoire.
- [ ] Le test vérifie qu'aucun fichier `.pdf` ne subsiste sur le disque du serveur une fois le processus terminé.
- [ ] Le nom du test contient `CASE_FAC_713`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
