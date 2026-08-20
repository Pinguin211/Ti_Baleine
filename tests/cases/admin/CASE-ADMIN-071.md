# CASE-ADMIN-071 — Maintien de l'état authentifié lors de la navigation inter-pages et du rafraîchissement (F5)

**Spécification :** `SPEC-ADMIN-04`  
**Critère d'acceptation :** `AC-1`, `Contrainte C-16`  
**Type :** acceptation / ergonomie  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège la persistance de l'authentification active pendant la navigation normale de l'administrateur (changement d'onglets, rechargement de page F5, consultation d'un créneau). L'administrateur ne doit pas être déconnecté inopportunément au moindre rafraîchissement.

## Cas

```gherkin
Étant donné l'administrateur connecté consultant le planning
Quand il rafraîchit la page du navigateur (F5) ou navigue vers le détail d'un créneau
Alors sa session active est reconnue
Et l'administrateur reste sur la page demandée sans être invité à ressaisir ses identifiants
```

## Données

| Élément | Valeur |
|---|---:|
| Session | Active et valide |
| Action | Rafraîchissement complet de la page (F5) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| État de session | Maintenu sans interruption | AC-1 SPEC-ADMIN-04 |
| Affichage | Données rechargées avec succès | Confort d'utilisation |

## Ce que ce cas ne vérifie pas

- l'expiration de session après inactivité (couvert par `CASE-ADMIN-039`) ;
- la déconnexion explicite (couvert par `CASE-ADMIN-070`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_071_maintien_etat_authentifie_navigation_rafraichissement_f5`  
**Fichier :** tests/tests-unitaires/admin/case-admin-071.test.ts

## Revue du test automatisé

- [ ] Le test s'authentifie avec succès.
- [ ] Le test simule un rafraîchissement de page tout en conservant le cookie.
- [ ] Le test vérifie que la réponse renvoie le contenu authentifié et non la page de login.
- [ ] Le nom du test contient `CASE_ADMIN_071`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
