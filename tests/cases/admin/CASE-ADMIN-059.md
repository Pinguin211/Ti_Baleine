# CASE-ADMIN-059 — Déclenchement d'une alerte sur un créneau sans aucune réservation : passage sous pré-alerte sans message sortant

**Spécification :** `SPEC-ADMIN-06`  
**Critère d'acceptation :** `Cas limite #2`  
**Type :** acceptation / cas limite  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège le comportement du système lorsqu'une alerte est émise sur un créneau ouvert mais sans aucun passager inscrit. Le créneau doit basculer au statut « sous pré-alerte » (pour afficher l'avertissement aux futurs acheteurs) sans provoquer d'erreur due à une liste de destinataires vide.

## Cas

```gherkin
Étant donné un créneau du lendemain sans aucun passager réservé (0 client)
Quand l'administrateur déclenche l'alerte sur ce créneau
Alors le créneau passe au statut « sous pré-alerte »
Et 0 SMS et 0 E-mail ne sont émis (liste de destinataires vide gérée sans erreur)
Et la mention d'avertissement est activée pour les futures réservations
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau | 0 réservation active |
| Action | Déclenchement d'alerte |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Statut créneau | SOUS_PRE_ALERTE | Mise à jour d'état réussie |
| Messages émis | 0 message (aucune erreur levée) | Cas limite #2 SPEC-ADMIN-06 |

## Ce que ce cas ne vérifie pas

- l'alerte avec destinataires existants (couvert par `CASE-ADMIN-048`) ;
- la fermeture administrative du créneau (couvert par `CASE-ADMIN-062`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_059_alerte_creneau_sans_reservation_statut_pre_alerte_sans_message`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test alerte un créneau ayant 0 inscrit.
- [ ] Le test s'assure qu'aucun message n'est envoyé et qu'aucune exception n'est levée.
- [ ] Le test confirme le passage du créneau à l'état SOUS_PRE_ALERTE.
- [ ] Le nom du test contient `CASE_ADMIN_059`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
