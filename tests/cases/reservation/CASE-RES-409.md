# CASE-RES-409 — Fermeture annuelle les 25 décembre et 1er janvier

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-2`  
**Type :** acceptation  
**Niveau de risque :** faible

## Ce que ce cas protège

Ce cas protège le respect des deux seuls jours de fermeture annuelle de l'entreprise Ti'Baleine : le 25 décembre (Noël) et le 1er janvier (Jour de l'An), conformément à la règle R-02 du cahier des charges. Il garantit que le calendrier de réservation en ligne ne propose aucun créneau horaire à la vente sur ces deux dates pour l'ensemble des ports (Saint-Gilles et Saint-Leu) et pour toutes les prestations. Si cette règle est enfreinte, des clients peuvent acheter des billets pour des journées où l'équipage et les bateaux sont à l'arrêt.

## Cas

```gherkin
Étant donné un client accédant au calendrier de réservation sur le site public
Quand il sélectionne la date du 25 décembre 2026
Alors le calendrier indique que la date est fermée / indisponible
Et aucun créneau de départ (7h00, 10h00, 14h00) n'est affiché ni sélectionnable
Quand il sélectionne la date du 1er janvier 2027
Alors le calendrier indique que la date est fermée / indisponible
Et aucun créneau de départ n'est affiché ni sélectionnable
```

## Données

| Date consultée | Port testé | Statut attendu | Créneaux affichés |
|---|---|---|---|
| 25/12/2026 | Saint-Gilles | Fermé (fermeture annuelle R-02) | 0 créneau |
| 25/12/2026 | Saint-Leu | Fermé (fermeture annuelle R-02) | 0 créneau |
| 01/01/2027 | Saint-Gilles | Fermé (fermeture annuelle R-02) | 0 créneau |
| 01/01/2027 | Saint-Leu | Fermé (fermeture annuelle R-02) | 0 créneau |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Disponibilité 25 décembre | Désactivée / Grisée | Règle R-02 (fermeture de Noël) |
| Disponibilité 1er janvier | Désactivée / Grisée | Règle R-02 (fermeture du Jour de l'An) |
| Nombre de créneaux retournés | 0 créneau | Aucun départ planifié |
| Soumission directe de réservation | Rejetée (Erreur 400/422) | Blocage backend strict |

## Ce que ce cas ne vérifie pas

- la disponibilité des créneaux sur les autres jours d'ouverture (couvert par `CASE-RES-400`, `CASE-RES-401`) ;
- la gestion des jauges (couvert par `CASE-RES-412`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_RES_409_fermeture_annuelle_25_decembre_et_1er_janvier_aucun_creneau`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test interroge les disponibilités pour la date du 25 décembre 2026.
- [ ] Le test vérifie qu'aucun créneau n'est disponible et que la date est grisée/fermée.
- [ ] Le test interroge les disponibilités pour la date du 1er janvier 2027.
- [ ] Le test vérifie qu'aucun créneau n'est disponible et que la date est grisée/fermée.
- [ ] Le test s'assure qu'aucune réservation ne peut être validée sur ces dates.
- [ ] Le nom du test contient `CASE_RES_409`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
