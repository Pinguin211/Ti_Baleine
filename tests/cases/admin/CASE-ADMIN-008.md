# CASE-ADMIN-008 — Gestion d'une perte de connexion réseau pendant le chargement du planning

**Spécification :** `SPEC-ADMIN-01`  
**Critère d'acceptation :** `Cas limite #5`  
**Type :** robustesse  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège l'application contre les pannes silencieuses ou les blocages UI lors d'une rupture de communication avec l'API ou la base de données. Si la règle se casse, l'administrateur reste face à une page bloquée sans indication ni possibilité de recharger les données facilement.

## Cas

```gherkin
Étant donné l'administrateur demandant l'affichage du planning
Et une coupure réseau ou indisponibilité momentanée du serveur survenant pendant la requête
Quand la requête échoue
Alors l'interface affiche un message d'erreur explicite (« Impossible de charger le planning »)
Et un bouton d'action « Réessayer » est mis à disposition de l'administrateur
```

## Données

| Élément | Valeur |
|---|---:|
| État réseau | Erreur HTTP 503 / Déconnexion socket |
| Action déclenchée | Chargement initial du planning |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Message d'erreur | « Impossible de charger le planning » | Cas limite #5 SPEC-ADMIN-01 |
| Bouton réessai | Présent et fonctionnel | Rétablissement de l'état |

## Ce que ce cas ne vérifie pas

- la cohérence transactionnelle lors d'une mise à jour (couvert par `CASE-ADMIN-021`, `CASE-ADMIN-031`) ;
- la reconnexion après expiration de session (couvert par `CASE-ADMIN-039`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_008_gestion_perte_reseau_chargement_planning_erreur_retry`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test simule un échec réseau lors de la récupération des données du planning.
- [ ] Le test vérifie que l'erreur est interceptée et qu'un message explicite s'affiche.
- [ ] Le test vérifie la présence du bouton de réessai ('Réessayer').
- [ ] Le nom du test contient `CASE_ADMIN_008`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
