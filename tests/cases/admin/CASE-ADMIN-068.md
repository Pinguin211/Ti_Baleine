# CASE-ADMIN-068 — Cloisonnement de sécurité et interdiction d'accès aux réglages de configuration pour les utilisateurs du site public

**Spécification :** `SPEC-ADMIN-07`  
**Critère d'acceptation :** `Portée §4`, `Contrainte C-16`, `REQ-103`  
**Type :** sécurité / RBAC  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège les fonctions de configuration des créneaux contre toute manipulation par un utilisateur anonyme ou client public. Les endpoints d'ouverture, fermeture, affectation de navire et de type d'activité doivent être strictement réservés à l'administrateur authentifié.

## Cas

```gherkin
Étant donné un client ou utilisateur public naviguant sur le site
Quand il tente d'émettre des requêtes POST, PUT ou DELETE sur les endpoints de configuration des créneaux (« /api/admin/slots/configure »)
Alors le serveur rejette les requêtes avec une erreur HTTP 401 Unauthorized ou 403 Forbidden
Et aucune modification de créneau n'est opérée
```

## Données

| Élément | Valeur |
|---|---:|
| Utilisateur | Client public non authentifié en admin |
| Endpoint cible | /api/admin/slots/configure |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Réponse API | Code HTTP 401 / 403 | Cloisonnement RBAC |
| État de configuration | Strictement inchangé | Sécurité frontière |

## Ce que ce cas ne vérifie pas

- l'accès légitime de l'administrateur (couvert par `CASE-ADMIN-064`) ;
- l'interception de l'accès au planning (couvert par `CASE-ADMIN-035`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_068_cloisonnement_securite_interdiction_acces_configuration_creneaux_public`  
**Fichier :** tests/tests-unitaires/admin/case-admin-068.test.ts

## Revue du test automatisé

- [ ] Le test envoie des requêtes d'altération de créneaux sans privilèges administrateur.
- [ ] Le test vérifie le rejet 401/403.
- [ ] Le test confirme que la configuration des créneaux reste inviolée.
- [ ] Le nom du test contient `CASE_ADMIN_068`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
