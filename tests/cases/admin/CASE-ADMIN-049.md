# CASE-ADMIN-049 — Envoi d'une alerte de pré-annulation via le canal SMS uniquement

**Spécification :** `SPEC-ADMIN-06`  
**Critère d'acceptation :** `Portée §2`, `AC-1`, `REQ-017`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'option de diffusion exclusive par SMS lors de l'émission d'une pré-alerte. Le message doit être transmis aux numéros de téléphone mobiles des réservataires sans déclencher d'envoi de courriel.

## Cas

```gherkin
Étant donné l'administrateur configurant une alerte de pré-annulation sur un créneau du lendemain
Quand il sélectionne le canal de diffusion « SMS uniquement » et confirme l'envoi
Alors des SMS transactionnels sont expédiés aux numéros de téléphone de tous les clients réservataires
Et aucun courriel électronique n'est émis sur le serveur SMTP
```

## Données

| Élément | Valeur |
|---|---:|
| Canal choisi | SMS uniquement |
| Créneau | Sortie Baleines lendemain 07h00 |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| SMS envoyés | 100 % des numéros mobiles clients | Canal SMS activé |
| Courriels envoyés | 0 e-mail émis | Canal E-mail non sollicité |

## Ce que ce cas ne vérifie pas

- l'envoi par E-mail uniquement (couvert par `CASE-ADMIN-050`) ;
- l'envoi combiné simultané (couvert par `CASE-ADMIN-051`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_049_envoi_alerte_pre_annulation_canal_sms_uniquement`  
**Fichier :** tests/tests-unitaires/admin/case-admin-049.test.ts

## Revue du test automatisé

- [ ] Le test sélectionne l'option SMS uniquement.
- [ ] Le test déclenche l'envoi d'alerte.
- [ ] Le test vérifie les appels vers la passerelle SMS et l'absence d'appels SMTP.
- [ ] Le nom du test contient `CASE_ADMIN_049`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
