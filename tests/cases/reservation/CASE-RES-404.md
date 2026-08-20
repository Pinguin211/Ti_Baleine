# CASE-RES-404 — Bascule bilingue français/anglais sans perte de données saisies

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-1`, `AC-10`  
**Type :** acceptation  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège l'expérience multilingue (FR/EN) sur l'ensemble du parcours public (environ 60 % de la clientèle étant étrangère, selon CDC §1). Il garantit que le client peut changer de langue à tout moment (sélection du port et du créneau, saisie des passagers, coordonnées de contact, paiement de l'acompte, et page de paiement du solde) sans perdre aucune des données déjà saisies dans le formulaire ou dans le panier. Si la bascule linguistique réinitialise le formulaire ou perd la sélection du créneau, le client est contraint de recommencer tout son parcours, entraînant des abandons de commande.

## Cas

```gherkin
Étant donné un client accédant au site web dans la langue par défaut (français)
Quand il choisit le port « Saint-Gilles », l'activité « Sortie Baleines », la date du 15 octobre 2026 et le créneau de 10h00
Et renseigne 2 adultes et 1 enfant de 6 ans
Et saisit ses coordonnées (« Smith », « John », « john.smith@test.com », « +447911123456 »)
Quand le client bascule la langue vers l'anglais (« EN »)
Alors l'ensemble de l'interface et du récapitulatif s'affiche en anglais
Et le port sélectionné reste « Saint-Gilles », la date le « 15/10/2026 », le créneau « 10:00 AM »
Et les participants restent 2 adultes et 1 enfant
Et les coordonnées saisies (« Smith », « John », « john.smith@test.com », « +447911123456 ») sont intégralement conservées
Et sur la page de paiement du solde issue du SMS, la bascule linguistique FR/EN s'exécute également sans perte d'état
```

## Données

| Élément | Valeur |
|---|---:|
| Langues supportées | Français (FR), Anglais (EN) |
| Port sélectionné avant bascule | Saint-Gilles |
| Date et horaire | 15/10/2026 à 10h00 |
| Passagers saisis | 2 adultes + 1 enfant (6 ans) |
| Coordonnées saisies | Smith / John / john.smith@test.com / +447911123456 |
| Étape de bascule testée | En cours de tunnel (étape coordonnées / récapitulatif) et page solde |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Traduction des libellés | En anglais après clic sur EN | AC-1, REQ-002, REQ-101 |
| Conservation port & date | Saint-Gilles / 15/10/2026 10h00 | Conservation de l'état panier |
| Conservation passagers | 2 adultes + 1 enfant | Conservation des valeurs d'entrée |
| Conservation coordonnées | Smith / John / john.smith@test.com / +447911123456 | Aucune réinitialisation des champs |
| Persistance indicateur langue en base | Aucune (mode stateless / invité) | Règle de confidentialité / mode invité CDC §6 |

## Ce que ce cas ne vérifie pas

- le calcul des tarifs et de l'acompte (couvert par `CASE-RES-400`, `CASE-RES-401`) ;
- l'accès à la page de solde expirée (couvert par `CASE-RES-420`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_RES_404_bascule_bilingue_fr_en_conservation_donnees_tunnel_et_solde`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test préremplit un panier avec port, date, créneau, passagers et coordonnées en français.
- [ ] Le test déclenche le changement de langue vers l'anglais.
- [ ] Le test vérifie que tous les textes UI passent en anglais.
- [ ] Le test vérifie que toutes les données pré-saisies sont strictement préservées.
- [ ] Le test vérifie la disponibilité de la bascule FR/EN sur la page de paiement du solde.
- [ ] Le nom du test contient `CASE_RES_404`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
