# Prompt — écrire la fiche de cas CASE-RES-407

> Nom, prénom ou e-mail manquant à l'étape coordonnées
>
> Étape « spécification → fiche de cas ». La fiche produite devient ensuite
> le contrat de l'étape suivante,
> `docs/prompt/code/reservation/prompt-case-res-407.md`, qui fait
> écrire le test.
>
> À recopier tel quel dans l'agent. Un prompt = une fiche.

```text
CONTEXTE
Stack : Next.js / TypeScript, complétée par Vitest (tests unitaires et
d'intégration) et Playwright (tests de bout en bout).
Commande de test : npm test (exécute `vitest run` pour les tests unitaires et
d'intégration, et `playwright test` pour les tests E2E).
Emplacement des fiches de cas : tests/cases/reservation/
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- La spécification : specs/reservation.md, section SPEC-RESERVATION-03
  (règle, portée, grille tarifaire, plannings et jauges, scénarios nominaux,
  table « Cas limites », critères d'acceptation, § « Ce qui n'est pas défini »).
- Le brief de ce cas, extrait de tests/cases/reservation/sommaire.md :
  - [x] **CASE-RES-407** — Nom, prénom ou e-mail manquant à l'étape
    coordonnées : rejet à la validation du formulaire, distinct du cas limite 8
    qui ne teste que le mobile. *Complément AC-6. Risque : moyen.*
- Le modèle de fiche à suivre : tests/cases/CASE-CANCEL-01.md

TA TÂCHE
Écris UNE fiche de cas, et une seule : tests/cases/reservation/CASE-RES-407.md

CONTRAINTES
1. Structure identique au modèle CASE-CANCEL-01.md, mêmes sections dans le même
   ordre : en-tête (Spécification / Critère d'acceptation / Type / Niveau de
   risque), « Ce que ce cas protège », « Cas » (bloc gherkin), « Données »,
   « Résultat attendu, calculé à la main », « Ce que ce cas ne vérifie pas »,
   puis « Test automatisé », « Revue du test automatisé », « Relu par » et
   « Remarques ».
2. En-tête imposé : Spécification `SPEC-RESERVATION-03` ; Critère
   d'acceptation `AC-6` ; Type acceptation ; Niveau de risque moyen.
3. Toutes les valeurs — tarifs, jauges, horaires, seuils, tranches d'âge —
   proviennent de specs/reservation.md. N'invente aucun chiffre. Si la
   spécification ne tranche pas un point nécessaire au cas, ne le comble pas :
   exclus-le dans « Ce que ce cas ne vérifie pas » et signale-le dans RENDS.
4. Nom du test imposé, à écrire tel quel dans la section « Test automatisé »,
   sans le reformuler :
   test_CASE_RES_407_nom_prenom_email_manquants_rejet_formulaire_contact
   Le champ « Fichier » reste « à renseigner après automatisation ».
5. Dates : les dates de la spécification sont périmées. Choisis des dates
   futures qui respectent les contraintes de planning du cas — jour de la
   semaine, horaire de départ, ouverture du port — et reporte-les à l'identique
   dans le gherkin et dans la table « Données ».
6. La table « Résultat attendu, calculé à la main » montre le calcul, pas
   seulement le résultat : une colonne « Calcul » explicite d'où vient chaque
   valeur.
7. « Ce que ce cas ne vérifie pas » renvoie aux autres cas du bloc CASE-RES-400
   à CASE-RES-417 par leur identifiant, en délimitant la frontière avec eux.
   N'invente aucun identifiant hors de ce bloc.
8. La checklist « Revue du test automatisé » se termine obligatoirement par
   trois items : un item de mutation (« Le test échoue si <la règle protégée>
   est volontairement supprimée du code »), « Le nom du test contient
   `CASE_RES_407` », et « Aucune assertion étrangère à ce cas n'a été
   ajoutée ».
9. Le gherkin décrit un comportement observable, jamais une implémentation.
   Chaque ligne « Alors » doit être vérifiable par un test.
10. Ne modifie aucun fichier en dehors de :
    tests/cases/reservation/CASE-RES-407.md
    Ne touche ni au sommaire, ni aux autres fiches, ni aux specs.

RENDS
- Le fichier de fiche.
- La liste des fichiers créés ou modifiés.
- Pour chaque valeur chiffrée de la table « Données », la ligne ou le tableau
  de specs/reservation.md d'où elle vient.
- Ce que tu as dû supposer et qui n'était ni dans la spécification ni dans le
  brief du sommaire.
```
