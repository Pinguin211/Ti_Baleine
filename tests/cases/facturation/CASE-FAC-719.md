# CASE-FAC-719 — Comportement en cas de rebond / boîte de réception pleine (Bounce) : non-délivrance sans boucle de rattrapage automatique

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `Cas limite #2`, `Ce qui n'est pas défini §1`  
**Type :** cas limite  
**Niveau de risque :** faible

## Ce que ce cas protège

Ce cas protège le comportement du système face aux rebonds de messagerie (adresse de destination inexistante ou boîte de réception saturée), que le courriel rejeté soit celui de la facture d'acompte ou celui de la facture de solde. Conformément aux spécifications, aucun canal de secours (ex: SMS) ni boucle de retry infini de rattrapage automatique n'est déclenché pour le moment.

## Cas

```gherkin
Étant donné une réservation dont le paiement de l'acompte (ou du solde) est validé, associée à une adresse courriel provoquant un rejet de distribution (boîte pleine ou adresse erronée)
Quand le message contenant la facture correspondante est initialement accepté par la passerelle SMTP puis retourne un avis de non-délivrance (Bounce)
Alors le système ne déclenche aucun canal alternatif automatique (pas d'envoi SMS de secours)
Et le système n'entre pas dans une boucle infinie de réexpéditions automatiques
```

## Données

| Élément | Valeur |
|---|---:|
| Événement | Rejet/Bounce asynchrone reçu du serveur de messagerie distant |
| Canal de secours défini | Aucun |
| Règle applicable | Absence de rattrapage automatique |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Envoi de SMS de secours | 0 SMS envoyé | Le SMS est réservé aux alertes/annulations admin |
| Boucle de renvoi infini | 0 nouvelle tentative intempestive | Conforme au cas limite 2 |

## Ce que ce cas ne vérifie pas

- l'erreur de connexion SMTP immédiate (couvert par `CASE-FAC-718`) ;
- l'envoi nominal (couvert par `CASE-FAC-714`, `CASE-FAC-717`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_719_rebond_email_boite_pleine_absence_boucle_rattrapage_automatique`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test simule un retour de bounce / boîte pleine suite à l'expédition.
- [ ] Le test vérifie qu'aucun SMS n'est déclenché en substitution.
- [ ] Le test vérifie l'absence de déclenchement de boucle d'envois répétés.
- [ ] Le nom du test contient `CASE_FAC_719`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
