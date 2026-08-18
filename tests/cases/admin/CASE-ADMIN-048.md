# CASE-ADMIN-048 — Envoi groupé d'une alerte météo bilingue la veille à 18h sur plusieurs créneaux ciblés du lendemain

**Spécification :** `SPEC-ADMIN-06`  
**Critère d'acceptation :** `Scénario 1`, `AC-1`, `Cas limite #5`, `REQ-017`, `R-22`, `R-24`  
**Type :** acceptation  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège la fonctionnalité maîtresse d'alerte groupée la veille au soir à 18h sur plusieurs créneaux du lendemain en une seule action administrative (règles R-22 et R-24). Si la règle se casse, l'administrateur devrait alerter créneau par créneau au risque d'oublis majeurs.

## Cas

```gherkin
Étant donné l'administrateur sur l'écran d'envoi d'alerte le lundi à 18h00
Quand il sélectionne simultanément les créneaux du mardi 7h00 et 10h00 à Saint-Gilles et 9h00 à Saint-Leu
Et sélectionne le motif météo prérempli avec le message bilingue
Et valide l'envoi groupé
Alors le système diffuse en une seule opération le message d'alerte à l'ensemble des clients réservataires des 3 créneaux
Et les 3 créneaux basculent immédiatement à l'état « sous pré-alerte »
```

## Données

| Élément | Valeur |
|---|---:|
| Date et heure | Lundi 18:00 (veille) |
| Créneaux ciblés | Mardi 7h Saint-Gilles, Mardi 10h Saint-Gilles, Mardi 9h Saint-Leu |
| Mode d'envoi | Groupé multi-créneaux (R-24) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| File d'envoi | Destinataires consolidés des 3 créneaux alertés | Diffusion groupée (REQ-017) |
| Statut des 3 créneaux | Tous basculés à SOUS_PRE_ALERTE | Règle R-25 |

## Ce que ce cas ne vérifie pas

- le déclenchement d'une alerte sur un créneau sans réservation (couvert par `CASE-ADMIN-059`) ;
- le choix spécifique du canal SMS seul (couvert par `CASE-ADMIN-049`) ;
- le choix spécifique du canal E-mail seul (couvert par `CASE-ADMIN-050`) ;
- la personnalisation du texte (couvert par `CASE-ADMIN-054`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_048_envoi_groupe_alerte_meteo_veille_18h_multi_creneaux`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test sélectionne 3 créneaux du lendemain avec des passagers inscrits.
- [ ] Le test déclenche l'envoi groupé.
- [ ] Le test vérifie que chaque client reçoit l'alerte.
- [ ] Le test confirme que les 3 créneaux passent au statut sous pré-alerte.
- [ ] Le nom du test contient `CASE_ADMIN_048`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
