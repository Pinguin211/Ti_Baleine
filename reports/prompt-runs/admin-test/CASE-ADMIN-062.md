# Run — CASE-ADMIN-062

**Fichier de test :** tests/tests-unitaires/admin/case-admin-062.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-062.test.ts
- tests/cases/admin/CASE-ADMIN-062.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-062.test.ts -t "test_CASE_ADMIN_062_fermeture_administrative_manuelle_creneau_sans_passager"

**Résultat de vérification :** rouge attendu — `Cannot find module '../../../src/actions/fermer-creneau.action'` (aucune erreur de syntaxe TypeScript dans le test).

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/actions/fermer-creneau.action.ts` — orchestration : `fermerCreneau(input: { creneauId: string }, ports: { depotCreneaux: DepotCreneaux }): Creneau`. Appelée par le tableau de bord admin (Server Action) au clic sur « Fermer le créneau ».
- `src/services/server/slots/creneau-disponibilite.service.ts` — règle de disponibilité : `estCreneauReservable(creneau: Creneau): boolean` (persistance/dérivation de la réservabilité, dérivée de `Creneau.estReservable()` du domaine).
- `src/schemas/types/slots.types.ts` — type `Creneau` (attributs `date`, `heureDepart`, `port`, `activite`, `estOuvert`, `sousPreAlerte` conformes à `docs/uml/domain.puml`).
- `src/schemas/types/slots-ports.types.ts` — port `DepotCreneaux` (persistance : `obtenirParId`, `enregistrer`, `listerCreneauxReservablesPublic`).
- `src/schemas/validation/slots/` — accueillera le schéma Zod de validation de l'entrée `{ creneauId }` de la Server Action (non testé directement ici, encapsulé dans l'action).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le domaine (`Creneau`) ne possède pas d'attribut `statut` avec valeurs `OUVERT`/`FERMÉ` : il expose `estOuvert: Boolean`. J'ai traduit « statut FERMÉ » par `estOuvert === false`, conformément à `docs/uml/domain.puml`.
- Les valeurs `date`, `heureDepart`, `port`, `activite` du créneau de test ne sont pas fournies par la section « Données » du CASE (qui ne donne que « Ouvert — 0 passager »). Elles servent uniquement de scaffolding technique neutre pour instancier l'objet `Creneau` et n'entrent dans aucune assertion.
- Un identifiant technique (`id`) est utilisé pour le créneau ; ce PK technique n'apparaît pas dans le diagramme UML (convention implicite standard pour toute entité persistée, à l'instar de `Reservation.reference`).
