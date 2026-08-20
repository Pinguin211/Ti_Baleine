# CASE-ADMIN-050 — Envoi d'une alerte de pré-annulation via le canal E-mail uniquement

**Spécification :** `SPEC-ADMIN-06`  
**Critère d'acceptation :** `Portée §2`, `AC-1`, `REQ-017`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'option de diffusion exclusive par courriel électronique lors de l'alerte de pré-annulation.

## Cas

```gherkin
Étant donné l'administrateur configurant une alerte sur un créneau du lendemain
Quand il sélectionne le canal « E-mail uniquement » et valide l'envoi
Alors des courriels contenant le message d'alerte bilingue sont émis vers les adresses des clients réservataires
Et aucun SMS n'est émis par la passerelle téléphonique
```

## Données

| Élément | Valeur |
|---|---:|
| Canal choisi | E-mail uniquement |
| Créneau | Lendemain 10h00 Saint-Gilles |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Courriels SMTP | Émis à tous les clients réservataires | Canal E-mail activé |
| SMS téléphoniques | 0 SMS émis | Passerelle SMS non sollicitée |

## Ce que ce cas ne vérifie pas

- l'envoi par SMS seul (couvert par `CASE-ADMIN-049`) ;
- l'envoi combiné (couvert par `CASE-ADMIN-051`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_050_envoi_alerte_pre_annulation_canal_email_uniquement`  
**Fichier :** tests/tests-unitaires/admin/case-admin-050.test.ts

## Revue du test automatisé

- [ ] Le test choisit le canal E-mail uniquement.
- [ ] Le test vérifie l'émission des e-mails et l'absence d'appels SMS.
- [ ] Le nom du test contient `CASE_ADMIN_050`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
