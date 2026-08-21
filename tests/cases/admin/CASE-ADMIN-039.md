# CASE-ADMIN-039 — Expiration de session après un délai d'inactivité prolongée : déconnexion automatique

**Spécification :** `SPEC-ADMIN-04`  
**Critère d'acceptation :** `Cas limite #4`  
**Type :** sécurité  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'accès au back-office laissé sans surveillance sur un poste Desktop. Si aucune action n'est effectuée pendant une durée d'inactivité configurée, la session est invalidée et l'utilisateur est redirigé vers l'écran de login.

## Cas

```gherkin
Étant donné l'administrateur connecté au back-office
Et une période d'inactivité supérieure au timeout configuré sans aucune interaction
Quand l'administrateur tente d'effectuer une nouvelle action ou de naviguer
Alors la session est considérée comme expirée
Et l'administrateur est automatiquement déconnecté et redirigé vers « /admin/login »
```

## Données

| Élément | Valeur |
|---|---:|
| État initial | Session active |
| Durée d'inactivité | > Timeout paramétré |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| État session | Invalidée / Détruite | Cas limite #4 SPEC-ADMIN-04 |
| Action suivante | Redirection vers mire de connexion | Sécurité des postes ouverts |

## Ce que ce cas ne vérifie pas

- la déconnexion volontaire explicite (couvert par `CASE-ADMIN-070`) ;
- le rafraîchissement au cours d'une session active (couvert par `CASE-ADMIN-071`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_039_expiration_session_inactivite_prolongee_deconnexion_auto`  
**Fichier :** tests/tests-unitaires/admin/case-admin-039.test.ts

## Revue du test automatisé

- [ ] Le test simule l'écoulement du délai de timeout de session.
- [ ] Le test tente une action sur une route protégée.
- [ ] Le test vérifie l'invalidation de la session et la redirection vers le login.
- [ ] Le nom du test contient `CASE_ADMIN_039`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
