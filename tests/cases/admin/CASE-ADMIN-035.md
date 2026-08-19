# CASE-ADMIN-035 — Interception de toute tentative d'accès non authentifié aux URL protégées avec redirection vers le login

**Spécification :** `SPEC-ADMIN-04`  
**Critère d'acceptation :** `AC-2`  
**Type :** sécurité / contrôle d'accès  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège l'inviolabilité des URL d'administration contre les accès directs non authentifiés (guards de routage / middleware de sécurité). Si la règle se casse, un utilisateur anonyme pourrait visualiser le planning ou manipuler des réservations sans être connecté.

## Cas

```gherkin
Étant donné un utilisateur anonyme ou non authentifié
Quand il tente d'accéder directement à l'URL « /admin/planning » ou « /admin/reservations »
Alors le middleware de sécurité intercepte la requête
Et bloque l'accès aux données sensibles
Et redirige immédiatement le navigateur vers la page « /admin/login »
```

## Données

| Élément | Valeur |
|---|---:|
| Utilisateur | Non connecté (sans session valide) |
| URL tentée | /admin/planning |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Accès aux données | Refusé (code HTTP 401 / 302) | AC-2 SPEC-ADMIN-04 |
| Redirection | Vers /admin/login | Mire de connexion obligatoire |

## Ce que ce cas ne vérifie pas

- le cloisonnement des accès clients publics (couvert par `CASE-ADMIN-068`) ;
- l'expiration de session active (couvert par `CASE-ADMIN-039`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_035_interception_acces_non_authentifie_redirection_login`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test envoie une requête GET sur /admin/planning sans cookie de session.
- [ ] Le test vérifie la redirection vers /admin/login.
- [ ] Le test s'assure qu'aucun fragment de données du planning n'est retourné.
- [ ] Le nom du test contient `CASE_ADMIN_035`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
