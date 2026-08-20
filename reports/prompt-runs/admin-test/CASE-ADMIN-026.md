# Run — CASE-ADMIN-026

**Fichier de test :** tests/tests-unitaires/admin/case-admin-026.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-026.test.ts
- tests/cases/admin/CASE-ADMIN-026.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-026.test.ts -t "test_CASE_ADMIN_026_reduction_a_0_billet_bascule_automatique_annulation_sms"

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/services/server/cancellation/reduire-billets-reservation.service.ts` → `reduireBilletsReservation`
  détecte que le retrait demandé ramène les billets actifs à 0 et retourne, sans supprimer les
  billets, un résultat `{ succes: true, type: 'BASCULE_ANNULATION_REQUISE',
  calculRemboursementIndicatif, motifRequis: true }` (couvre SPEC-ADMIN-02 réutilisée par
  unification technique, Portée SPEC-ADMIN-03).
- `src/services/server/cancellation/confirmer-annulation-apres-reduction.service.ts` →
  `confirmerAnnulationApresReduction({ reservation, motifAnnulation }, { depotBillets, envoiSMS })`
  exécute la suppression effective (réservation conservée à 0 billet actif, conforme à la note du
  domaine « Conserve son enregistrement avec 0 billet actif si annulée ») et déclenche le SMS
  informatif sans mention du calcul financier.
- Ces deux fonctions vivent sous `services/server/cancellation/` car elles portent la
  persistance/atomicité et la règle métier (SPEC-ARCH-02).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le motif transmis à la confirmation (« Annulation standard ») n'est pas donné par la section
  Données du CASE ; il est repris du catalogue de motifs défini par SPEC-ADMIN-02 (specs/admin.md)
  plutôt qu'inventé arbitrairement, puisque le CASE ne teste pas la valeur du motif elle-même mais
  seulement le fait qu'il est requis puis utilisé.
- La composition des 2 billets initiaux (2 adultes) n'est pas précisée par les Données (seul le
  nombre total « 2 billets » est donné) ; un choix arbitraire mais neutre a été fait car aucune
  assertion ne dépend du type de billet dans ce cas.
- Le contenu exact du SMS n'étant pas fourni, l'assertion vérifie l'absence des termes
  « remboursement » et du symbole « € » plutôt qu'un texte figé.
