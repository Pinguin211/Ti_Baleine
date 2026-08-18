# CASE-ADMIN-037 — Blocage à la validation du formulaire de connexion lorsque des champs obligatoires sont laissés vides

**Spécification :** `SPEC-ADMIN-04`  
**Critère d'acceptation :** `Cas limite #2`  
**Type :** robustesse / UI  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège contre la soumission de formulaires incomplets, en prévenant l'envoi de requêtes serveur inutiles lorsque l'e-mail ou le mot de passe est absent.

## Cas

```gherkin
Étant donné l'administrateur sur l'écran de connexion
Quand il laisse le champ e-mail ou mot de passe vide et clique sur « Se connecter »
Alors la soumission est bloquée côté client
Et des messages visuels indiquent les champs obligatoires à renseigner
Et aucune requête d'authentification n'est transmise inutilement au serveur
```

## Données

| Élément | Valeur |
|---|---:|
| Cas 1 | E-mail vide, mot de passe renseigné |
| Cas 2 | E-mail renseigné, mot de passe vide |
| Cas 3 | Les deux champs vides |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Validation formulaire | Bloquée avec indicateurs requis | Cas limite #2 SPEC-ADMIN-04 |
| Requête HTTP | Non émise | Optimisation réseau et UX |

## Ce que ce cas ne vérifie pas

- la saisie d'un format d'e-mail incorrect ;
- les identifiants erronés (couvert par `CASE-ADMIN-036`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_037_blocage_validation_formulaire_connexion_champs_vides`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test tente de soumettre le formulaire de login avec des champs vides.
- [ ] Le test vérifie l'apparition des messages d'erreur de validation requis.
- [ ] Le nom du test contient `CASE_ADMIN_037`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
