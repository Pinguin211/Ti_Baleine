# CASE-RES-407 — Nom, prénom ou e-mail manquant à l'étape coordonnées

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-6`  
**Type :** acceptation  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège l'obligation de saisie des coordonnées minimales en mode
invité : nom, prénom et e-mail. Il est distinct du cas limite 8
(→ `CASE-RES-415`) qui ne teste que le numéro de mobile. Si la règle se
casse, des réservations payées existent sans identité ni moyen de contact
e-mail, rendant la facture et le suivi client impossibles.

## Cas

```gherkin
Étant donné un client ayant sélectionné un créneau et renseigné ses passagers
Quand il laisse le champ « nom » vide à l'étape des coordonnées
Et tente de valider le formulaire de contact
Alors la validation est rejetée avec une erreur sur le champ manquant
Quand il renseigne le nom mais laisse le champ « prénom » vide
Et tente de valider
Alors la validation est rejetée
Quand il renseigne le prénom mais laisse le champ « e-mail » vide
Et tente de valider
Alors la validation est rejetée
Et aucune de ces tentatives n'a donné accès à l'étape de paiement
```

## Données

| Élément | Valeur |
|---|---:|
| Tentative 1 | nom vide, autres champs valides |
| Tentative 2 | prénom vide, autres champs valides |
| Tentative 3 | e-mail vide, autres champs valides |
| Numéro de mobile | +262692123456 (valide, constant sur les 3 tentatives) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Validation tentative 1 | rejetée | nom obligatoire (AC-6) |
| Validation tentative 2 | rejetée | prénom obligatoire (AC-6) |
| Validation tentative 3 | rejetée | e-mail obligatoire (AC-6) |
| Accès à l'étape de paiement | jamais atteint | formulaire jamais valide |
| Réservation enregistrée | aucune | aucun paiement effectué |

## Ce que ce cas ne vérifie pas

- le numéro de mobile manquant ou invalide (→ `CASE-RES-415`) ;
- la validité du *format* de l'e-mail (seule l'absence est testée ici) ;
- la création de compte (hors périmètre : mode invité uniquement) ;
- le comportement une fois le formulaire correctement rempli
  (→ `CASE-RES-400`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_RES_407_nom_prenom_email_manquants_rejet_formulaire_contact`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test couvre les trois champs : nom, prénom, e-mail, chacun manquant isolément.
- [ ] Le test vérifie le rejet de la validation à chaque tentative.
- [ ] Le test vérifie que l'étape de paiement n'est jamais atteinte.
- [ ] Le test utilise un mobile valide pour ne pas recouper `CASE-RES-415`.
- [ ] Le test échoue si l'un des trois champs devient facultatif dans le code.
- [ ] Le nom du test contient `CASE_RES_407`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
