# CASE-ADMIN-060 — Blocage de la validation de l'envoi d'alerte lorsque le corps du message est vide ou effacé

**Spécification :** `SPEC-ADMIN-06`  
**Critère d'acceptation :** `Cas limite #3`  
**Type :** robustesse / UI  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège contre l'envoi accidentel de messages d'alerte vides aux passagers.

## Cas

```gherkin
Étant donné des créneaux sélectionnés pour l'envoi d'une alerte
Quand l'administrateur efface totalement le texte du message et tente de valider l'envoi
Alors le système bloque l'envoi avec le message « Le corps du message ne peut pas être vide »
Et aucune notification n'est envoyée
```

## Données

| Élément | Valeur |
|---|---:|
| Créneaux | Sélectionnés |
| Contenu du message | « » (vide ou espaces seuls) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Validation | Bloquée avec message d'erreur | Cas limite #3 SPEC-ADMIN-06 |
| Notifications | 0 notification émise | Protection contre envoi vide |

## Ce que ce cas ne vérifie pas

- la saisie d'un message valide (couvert par `CASE-ADMIN-054`) ;
- l'absence de créneau coché (couvert par `CASE-ADMIN-058`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_060_blocage_envoi_alerte_corps_message_vide`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test vide la zone de texte du message d'alerte.
- [ ] Le test tente de soumettre l'envoi.
- [ ] Le test vérifie le message d'erreur et l'absence d'envoi.
- [ ] Le nom du test contient `CASE_ADMIN_060`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
