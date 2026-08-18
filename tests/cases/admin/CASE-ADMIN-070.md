# CASE-ADMIN-070 — Déconnexion manuelle explicite de l'administrateur : destruction immédiate de session

**Spécification :** `SPEC-ADMIN-04`  
**Critère d'acceptation :** `Cas limite #5`, `AC-3`, `Contrainte C-16`  
**Type :** sécurité / acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la clôture formelle et sécurisée d'une session administrative lorsque l'administrateur clique volontairement sur « Se déconnecter ». Si la règle se casse, le jeton de session pourrait rester valide et permettre une réutilisation illégitime.

## Cas

```gherkin
Étant donné l'administrateur connecté au back-office
Quand il clique sur le bouton « Déconnexion »
Alors le jeton de session est immédiatement révoqué côté serveur et supprimé côté client
Et l'administrateur est redirigé vers la page « /admin/login »
Et toute tentative de retour arrière dans l'historique du navigateur ne permet pas d'accéder aux pages protégées
```

## Données

| Élément | Valeur |
|---|---:|
| État initial | Connecté |
| Action | Clic sur « Déconnexion » |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Session | Révoquée et invalidée | Cas limite #5 et AC-3 |
| Redirection | Vers /admin/login | Mire de connexion |
| Accès ultérieur | Bloqué sans ré-authentification | Sécurité |

## Ce que ce cas ne vérifie pas

- l'expiration passive par timeout (couvert par `CASE-ADMIN-039`) ;
- la reconnexion ultérieure (couvert par `CASE-ADMIN-033`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_070_deconnexion_manuelle_destruction_session_redirection_login`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test déclenche l'action de déconnexion (/admin/logout).
- [ ] Le test vérifie que le cookie de session est effacé/invalidé.
- [ ] Le test tente d'accéder de nouveau à /admin/planning et vérifie le refus 401/302.
- [ ] Le nom du test contient `CASE_ADMIN_070`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
