# CASE-ADMIN-038 — Protection anti-bruteforce : ralentissement et blocage temporaire après tentatives répétées

**Spécification :** `SPEC-ADMIN-04`  
**Critère d'acceptation :** `Cas limite #3`  
**Type :** sécurité  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège le compte administrateur contre les attaques automatisées par force brute ou par dictionnaire. Après un nombre paramétré d'échecs consécutifs (ex: 5 échecs), le système applique un ralentissement (rate limiting) ou un verrouillage temporaire.

## Cas

```gherkin
Étant donné un attaquant tentant plusieurs connexions successives erronées
Quand le 5ème échec consécutif est atteint
Alors le système applique un blocage temporaire (HTTP 429 Too Many Requests)
Et toute nouvelle tentative immédiate est rejetée sans interrogation de la base de données
```

## Données

| Élément | Valeur |
|---|---:|
| Tentatives erronées consécutives | 5 |
| Délai de blocage | Temporaire (ex: 15 minutes / rate limit) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Comportement système | Blocage 429 Too Many Requests | Cas limite #3 SPEC-ADMIN-04 |
| Protection compte | Préservation contre le brute-force | Sécurité C-16 |

## Ce que ce cas ne vérifie pas

- l'échec ponctuel isolé (couvert par `CASE-ADMIN-036`) ;
- la déconnexion manuelle (couvert par `CASE-ADMIN-070`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_038_protection_anti_bruteforce_blocage_temporaire_tentatives_repetees`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test simule 5 tentatives de connexion erronées successives.
- [ ] Le test tente une 6ème requête et vérifie le renvoi du statut HTTP 429.
- [ ] Le nom du test contient `CASE_ADMIN_038`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
