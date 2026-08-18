# CASE-ADMIN-051 — Envoi combiné simultané d'une alerte de pré-annulation par SMS et E-mail

**Spécification :** `SPEC-ADMIN-06`  
**Critère d'acceptation :** `Scénario 1`, `AC-1`, `REQ-017`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la double diffusion simultanée par SMS et E-mail pour garantir une joignabilité maximale des passagers la veille d'une sortie compromise.

## Cas

```gherkin
Étant donné l'administrateur émettant une alerte de pré-annulation
Quand il sélectionne l'option combinée « SMS et E-mail » et clique sur « Envoyer l'alerte »
Alors chaque client réservataire reçoit un SMS sur son numéro mobile ET un courriel à son adresse e-mail
Et les créneaux ciblés passent à l'état sous pré-alerte
```

## Données

| Élément | Valeur |
|---|---:|
| Canal sélectionné | SMS + E-mail (combiné) |
| Destinataires | Clients inscrits sur les créneaux ciblés |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Envoi SMS | Délivré à chaque client | Canal SMS OK |
| Envoi E-mail | Délivré à chaque client | Canal E-mail OK |
| Statut créneau | SOUS_PRE_ALERTE | Basculement d'état |

## Ce que ce cas ne vérifie pas

- la gestion d'un échec individuel sur un canal (couvert par `CASE-ADMIN-061`) ;
- le format bilingue du corps de message (couvert par `CASE-ADMIN-055`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_051_envoi_combine_simultane_alerte_sms_email`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test sélectionne le mode combiné SMS + E-mail.
- [ ] Le test vérifie que chaque destinataire reçoit les deux notifications.
- [ ] Le nom du test contient `CASE_ADMIN_051`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
