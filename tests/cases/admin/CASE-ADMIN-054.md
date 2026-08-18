# CASE-ADMIN-054 — Personnalisation et ajustement libre du texte/motif par l'administrateur dans le champ éditable

**Spécification :** `SPEC-ADMIN-06`  
**Critère d'acceptation :** `Scénario 1`, `Portée §4`  
**Type :** acceptation / ergonomie  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège la liberté de l'administrateur de modifier, compléter ou réécrire librement le contenu du message d'alerte avant l'envoi final.

## Cas

```gherkin
Étant donné un template prérempli dans la zone de texte
Quand l'administrateur ajoute des précisions personnalisées (ex: « Forte houle australe de 3m prévue »)
Alors le texte modifié est pris en compte dans sa totalité
Et c'est exactement la version personnalisée qui est transmise aux destinataires
```

## Données

| Élément | Valeur |
|---|---:|
| Texte initial | Template générique |
| Modification admin | Ajout de précisions météorologiques personnalisées |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Corps de message transmis | Texte exact saisi et personnalisé par l'admin | Portée §4 SPEC-ADMIN-06 |

## Ce que ce cas ne vérifie pas

- le blocage en cas de texte entièrement vide (couvert par `CASE-ADMIN-060`) ;
- la structure bilingue requise (couvert par `CASE-ADMIN-055`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_054_personnalisation_ajustement_libre_texte_motif_avant_envoi`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test modifie le texte prérempli dans l'éditeur.
- [ ] Le test valide l'envoi et vérifie que le payload expédié contient les ajouts de l'admin.
- [ ] Le nom du test contient `CASE_ADMIN_054`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
