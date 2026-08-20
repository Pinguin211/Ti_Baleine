# CASE-ADMIN-055 — Présence obligatoire du message bilingue combiné FR + EN dans le corps unique de message

**Spécification :** `SPEC-ADMIN-06`  
**Critère d'acceptation :** `Scénario 1`, `AC-3`, `REQ-018`, `R-26`  
**Type :** conformité  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'obligation de diffuser un message combiné bilingue (la version française suivie obligatoirement de sa version anglaise dans un seul corps de message, règle R-26), sans nécessiter de ciblage de langue par profil client.

## Cas

```gherkin
Étant donné le message d'alerte prêt pour diffusion
Quand le message est généré pour expédition
Alors le corps unique du message contient la section en langue française
Et le corps unique du message contient immédiatement à la suite la section en langue anglaise
Et un seul et même message bilingue est expédié à tous les destinataires indistinctement
```

## Données

| Élément | Valeur |
|---|---:|
| Règle linguistique | Bilingue combiné FR + EN obligatoire (R-26) |
| Format | Corps unique regroupant les deux versions |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Section française | Présente en première partie du message | REQ-018 |
| Section anglaise | Présente à la suite dans le même message | R-26 |
| Ciblage linguistique | Indistinct (aucun filtre par langue requis) | Conformité CDC v5 |

## Ce que ce cas ne vérifie pas

- la personnalisation du motif (couvert par `CASE-ADMIN-054`) ;
- l'envoi multi-canaux (couvert par `CASE-ADMIN-051`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_055_presence_obligatoire_message_bilingue_combine_fr_en`  
**Fichier :** tests/tests-unitaires/admin/case-admin-055.test.ts

## Revue du test automatisé

- [ ] Le test vérifie la structure du message généré par les templates.
- [ ] Le test confirme la présence simultanée des portions FR et EN dans le même corps.
- [ ] Le nom du test contient `CASE_ADMIN_055`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
