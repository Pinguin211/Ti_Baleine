# CASE-ADMIN-036 — Saisie d'un identifiant ou mot de passe invalide : refus d'accès et message d'erreur générique

**Spécification :** `SPEC-ADMIN-04`  
**Critère d'acceptation :** `Cas limite #1`  
**Type :** sécurité  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège contre la divulgation d'informations sensibles (user enumeration) lors d'un échec de connexion. Le message d'erreur doit être générique sans indiquer si c'est l'e-mail ou le mot de passe qui est erroné.

## Cas

```gherkin
Étant donné un utilisateur sur la page de connexion
Quand il saisit un e-mail inexistant ou un mot de passe erroné
Alors l'accès est refusé
Et le système affiche un message d'erreur générique « Identifiant ou mot de passe incorrect »
Et aucune indication ne précise si le compte existe en base
```

## Données

| Élément | Valeur |
|---|---:|
| E-mail testé | inconnu@test.re ou admin@tibaleine.re avec mauvais mot de passe |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Statut d'accès | Refusé | Cas limite #1 SPEC-ADMIN-04 |
| Message retourné | « Identifiant ou mot de passe incorrect » (générique) | Protection OWASP |
| Session | Aucune session ouverte | Sécurité |

## Ce que ce cas ne vérifie pas

- le blocage après tentatives répétées (couvert par `CASE-ADMIN-038`) ;
- la validation des champs vides (couvert par `CASE-ADMIN-037`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_036_refus_connexion_identifiant_invalide_message_generique`  
**Fichier :** tests/tests-unitaires/admin/case-admin-036.test.ts

## Revue du test automatisé

- [ ] Le test tente une connexion avec un mauvais mot de passe.
- [ ] Le test vérifie que le message affiché est strictement générique.
- [ ] Le test vérifie qu'aucune session n'est initialisée.
- [ ] Le nom du test contient `CASE_ADMIN_036`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
