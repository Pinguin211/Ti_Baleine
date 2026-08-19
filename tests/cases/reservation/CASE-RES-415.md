# CASE-RES-415 — Numéro de mobile manquant ou au format invalide

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-6`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'obligation du numéro de téléphone mobile valide
(Contrainte 20) : c'est le canal des alertes SMS d'annulation. Si la règle se
casse, des clients injoignables se présentent au ponton pour une sortie
annulée.

## Cas

```gherkin
Étant donné un client ayant sélectionné un créneau et renseigné ses passagers
Et des coordonnées valides pour le nom, le prénom et l'e-mail
Quand il laisse le champ « téléphone mobile » vide et tente de valider le formulaire de contact
Alors la validation est rejetée
Quand il saisit « 0262 » (format invalide) et tente de valider
Alors la validation est rejetée
Quand il saisit « ABCDEF » (format invalide) et tente de valider
Alors la validation est rejetée
Et aucune de ces tentatives n'a donné accès à l'étape de paiement
```

## Données

| Élément | Valeur |
|---|---:|
| Tentative 1 | mobile vide |
| Tentative 2 | « 0262 » (trop court, indicatif fixe) |
| Tentative 3 | « ABCDEF » (non numérique) |
| Autres champs | nom, prénom, e-mail valides et constants |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Validation tentative 1 | rejetée | mobile obligatoire (C-20) |
| Validation tentative 2 | rejetée | format invalide |
| Validation tentative 3 | rejetée | format invalide |
| Accès à l'étape de paiement | jamais atteint | formulaire jamais valide |
| Réservation enregistrée | aucune | aucun paiement effectué |

## Ce que ce cas ne vérifie pas

- le nom, prénom ou e-mail manquant (→ `CASE-RES-407`) ;
- la liste exhaustive des formats de mobile acceptés (ex. +262 vs 0692 —
  non précisée par la spec) ;
- l'envoi effectif d'un SMS (`SPEC-ADMIN-02` / `SPEC-ADMIN-06`, hors
  périmètre) ;
- le comportement avec un mobile valide (→ `CASE-RES-400`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_RES_415_mobile_manquant_ou_invalide_rejet_formulaire_contact`  
**Fichier :** [tests/tests-unitaires/case-res-415.test.ts](../../tests-unitaires/case-res-415.test.ts)

## Revue du test automatisé

- [ ] Le test couvre le mobile vide et au moins deux formats invalides.
- [ ] Le test garde nom, prénom et e-mail valides pour ne pas recouper `CASE-RES-407`.
- [ ] Le test vérifie le rejet de chaque tentative.
- [ ] Le test vérifie que l'étape de paiement n'est jamais atteinte.
- [ ] Le test échoue si le champ mobile devient facultatif dans le code.
- [ ] Le nom du test contient `CASE_RES_415`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
