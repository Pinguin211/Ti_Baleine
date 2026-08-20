# Run — CASE-ADMIN-080

**Fichier de test :** tests/tests-unitaires/admin/case-admin-080.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-080.test.ts
- tests/cases/admin/CASE-ADMIN-080.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-080.test.ts -t "test_CASE_ADMIN_080_perte_connexion_pointage_encaissement_solde_sur_place"

Vérifié rouge pour la bonne raison : `Error: Cannot find module '/src/actions/encaisser-solde-cb-sur-place'` (aucune erreur de syntaxe TypeScript dans le test).

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/actions/encaisser-solde-cb-sur-place.ts` — même action que CASE-ADMIN-074 : doit intercepter
  l'échec de la passerelle CB (rejet/erreur réseau simulé dans le test par
  `PasserelleCbCoupureReseau`), le transformer en erreur explicite propagée à l'appelant, ne
  procéder à AUCUNE écriture de statut auprès de `src/services/server/payment/`
  (`depotReservation.enregistrerEncaissementSolde` n'est jamais appelé lorsque la passerelle échoue)
  et ne jamais appeler `src/actions/emettre-facture-apres-paiement.ts`.
- `src/services/server/payment/` — la bascule de statut ne doit être déclenchée qu'après
  confirmation réussie de la passerelle CB (relation de dépendance stricte : passerelle → bascule
  → facture), garantissant la cohérence transactionnelle décrite au cas limite #3 de SPEC-ADMIN-08.
- Entités du domaine mobilisées : `Reservation.statut` (reste `PAYEE_PARTIELLEMENT`),
  `Reservation.soldeRestantDu()` (reste 105,00 €), `Paiement` (jamais créé dans ce scénario, la
  transaction n'étant pas confirmée).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le mécanisme technique par lequel la perte de connexion se manifeste (rejet de promesse levé par
  la passerelle CB) est une hypothèse de simulation de l'environnement réseau (autorisée par la
  contrainte « tu peux simuler ce qui l'entoure — réseau, passerelle CB ») ; le CASE ne précise pas
  s'il s'agit d'un timeout, d'une exception ou d'un code d'erreur HTTP — seule l'observabilité du
  résultat (message d'erreur non vide, état inchangé, pas de facture) est testée, jamais le
  mécanisme réseau lui-même.
- Le contenu exact du message d'erreur n'est pas repris littéralement du CASE (qui ne fournit qu'une
  description, pas un libellé UI figé) : l'assertion vérifie uniquement qu'un message explicite
  (non vide) est présent, sans imposer de formulation précise absente de la section « Données ».
- Identifiants synthétiques (référence, e-mail) : même hypothèse que CASE-ADMIN-074.
