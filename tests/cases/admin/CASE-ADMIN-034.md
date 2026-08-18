# CASE-ADMIN-034 — Redirection automatique vers le planning consolidé après authentification réussie

**Spécification :** `SPEC-ADMIN-04`  
**Critère d'acceptation :** `Scénario 1`, `AC-1`  
**Type :** acceptation / navigation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège le routage post-authentification : dès que l'administrateur est authentifié, le système doit immédiatement le rediriger vers le tableau de bord / planning consolidé du jour.

## Cas

```gherkin
Étant donné l'administrateur validant son authentification avec succès
Quand la session est validée par le back-end
Alors l'application redirige automatiquement l'administrateur vers l'URL du planning consolidé
Et la vue du planning s'affiche sans étape intermédiaire superflue
```

## Données

| Élément | Valeur |
|---|---:|
| URL initiale | /admin/login |
| URL cible | /admin/planning |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Redirection | Automatique vers /admin/planning | Scénario 1 SPEC-ADMIN-04 |
| Affichage | Planning du jour prêt pour consultation | Continuité de travail |

## Ce que ce cas ne vérifie pas

- l'interception d'accès non authentifié (couvert par `CASE-ADMIN-035`) ;
- le détail de la grille du planning (couvert par `CASE-ADMIN-001`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_034_redirection_automatique_planning_apres_authentification`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test effectue une connexion valide.
- [ ] Le test inspecte l'URL de redirection et vérifie qu'il s'agit de la route planning.
- [ ] Le nom du test contient `CASE_ADMIN_034`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
