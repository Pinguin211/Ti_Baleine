# CASE-ADMIN-033 — Connexion réussie de l'administrateur avec un identifiant e-mail et un mot de passe valides sur Desktop

**Spécification :** `SPEC-ADMIN-04`  
**Critère d'acceptation :** `Scénario 1`, `AC-1`, `Contrainte C-16`, `REQ-103`, `Question ouverte Q8 §11 CDC v5`  
**Type :** acceptation / sécurité  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège l'authentification sécurisée de l'unique profil administrateur de Ti'Baleine sur poste de travail Desktop, avec un mot de passe conforme à la politique de robustesse du CDC v5. Si la règle se casse, l'administrateur ne peut plus accéder au système de gestion ou un tiers non autorisé pourrait forcer l'accès faute d'une politique de mot de passe suffisamment robuste.

## Cas

```gherkin
Étant donné l'administrateur sur la page d'authentification du back-office depuis un poste Desktop
Quand il saisit son adresse e-mail valide « admin@tibaleine.re » et son mot de passe correct conforme à la politique de robustesse (12 caractères minimum, majuscule, chiffre et caractère spécial)
Et valide le formulaire de connexion
Alors les identifiants sont vérifiés avec succès
Et une session sécurisée est initialisée
```

## Données

| Élément | Valeur |
|---|---:|
| Adresse e-mail | admin@tibaleine.re |
| Mot de passe | `Tib@leine2026!` (14 caractères, valide : majuscule, chiffre, caractère spécial) |
| Politique de robustesse | ≥ 12 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial (CDC v5) |
| Environnement | Poste Desktop (Contrainte C-16) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Authentification | Réussie | REQ-103, AC-1 |
| Session | Créée avec jeton sécurisé | Sécurité back-office |

## Ce que ce cas ne vérifie pas

- la redirection post-connexion (couvert par `CASE-ADMIN-034`) ;
- le traitement des identifiants erronés (couvert par `CASE-ADMIN-036`) ;
- le maintien de session lors de l'actualisation (couvert par `CASE-ADMIN-071`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_033_connexion_reussie_administrateur_identifiants_valides_desktop`  
**Fichier :** tests/tests-unitaires/admin/case-admin-033.test.ts

## Revue du test automatisé

- [ ] Le test soumet des identifiants d'administration valides avec un mot de passe conforme à la politique de robustesse (≥ 12 caractères, majuscule, chiffre, caractère spécial).
- [ ] Le test vérifie la génération du cookie ou token de session.
- [ ] Le test s'assure de la conformité du protocole d'authentification.
- [ ] Le nom du test contient `CASE_ADMIN_033`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
