# CASE-ADMIN-067 — Alerte et blocage de toute tentative de programmation simultanée de deux sorties Baleines nécessitant le naturaliste unique

**Spécification :** `SPEC-ADMIN-07`  
**Critère d'acceptation :** `Cas limite #2`, `R-15`, `Contrainte C-19`  
**Type :** sécurité / règle opérationnelle  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège la gestion de la ressource rare 'Naturaliste unique obligatoire' (règle R-15 et Contrainte C-19). L'entreprise ne dispose que d'un seul naturaliste qualifié pour les sorties Baleines. Le système doit empêcher la programmation simultanée de deux sorties Baleines au même horaire sur deux sites géographiques distants (Saint-Gilles et Saint-Leu).

## Cas

```gherkin
Étant donné une sortie « Baleines » déjà programmée le mardi à 09h00 à Saint-Leu (mobilisant l'unique naturaliste)
Quand l'administrateur tente de programmer une seconde sortie « Baleines » le mardi à 09h00 ou 10h00 à Saint-Gilles
Alors le système déclenche une alerte de conflit de ressource et bloque la validation
Et indique que l'unique naturaliste est déjà mobilisé à Saint-Leu
```

## Données

| Élément | Valeur |
|---|---:|
| Ressource | Naturaliste unique (R-15, C-19) |
| Sortie 1 | Mardi 09:00 Saint-Leu (Baleines) |
| Sortie 2 tentée | Mardi 10:00 Saint-Gilles (Baleines — Conflit) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Contrôle opérationnel | Blocage pour indisponibilité du naturaliste | R-15, C-19, Cas limite #2 |
| Message d'erreur | « Conflit naturaliste : ressource unique déjà allouée sur un autre site » | Alerte explicite |

## Ce que ce cas ne vérifie pas

- la programmation d'une sortie Dauphins (qui ne requiert pas le naturaliste unique) ;
- la sortie Baleines nominale avec naturaliste présent.

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_067_blocage_conflit_naturaliste_unique_deux_sorties_baleines_simultanees`  
**Fichier :** tests/tests-unitaires/admin/case-admin-067.test.ts

## Revue du test automatisé

- [ ] Le test programme une sortie Baleines à Saint-Leu.
- [ ] Le test tente de programmer simultanément une seconde sortie Baleines à Saint-Gilles.
- [ ] Le test vérifie le blocage de la seconde programmation.
- [ ] Le nom du test contient `CASE_ADMIN_067`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
