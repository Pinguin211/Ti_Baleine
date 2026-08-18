# CASE-ADMIN-040 — Respect de la contrainte d'administrateur unique : accès restreint sans mécanisme de sous-comptes

**Spécification :** `SPEC-ADMIN-04`  
**Critère d'acceptation :** `Portée §3`, `Contrainte C-16`  
**Type :** conformité / architecture  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège l'architecture du système Ti'Baleine selon laquelle il existe un profil administrateur unique (Contrainte C-16). L'application ne doit comporter aucun écran ni API de création, délégation ou gestion de sous-comptes utilisateurs dans le back-office.

## Cas

```gherkin
Étant donné l'administrateur connecté au back-office
Quand il parcourt l'ensemble des menus et paramètres de configuration
Alors aucun menu de création de compte ni de gestion de rôles multi-utilisateurs n'est présent
Et le système fonctionne exclusivement sur la base de l'administrateur unique défini
```

## Données

| Élément | Valeur |
|---|---:|
| Profil administrateur | Unique (Contrainte C-16) |
| Fonctionnalités multi-comptes | Absentes par conception |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Gestion multi-utilisateurs | Non proposée (0 menu de création de compte) | Contrainte C-16 |
| Modèle de sécurité | Mono-administrateur | Conformité CDC v4 |

## Ce que ce cas ne vérifie pas

- l'authentification nominale (couvert par `CASE-ADMIN-033`) ;
- la gestion des droits clients publics (couvert par `CASE-ADMIN-068`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_040_respect_contrainte_administrateur_unique_sans_sous_comptes`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test vérifie l'absence de routes de gestion de sous-comptes (/admin/users, /admin/roles).
- [ ] Le test s'assure que le système respecte le périmètre mono-admin de la contrainte C-16.
- [ ] Le nom du test contient `CASE_ADMIN_040`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
