# Run — CASE-ADMIN-057

**Fichier de test :** tests/tests-unitaires/admin/case-admin-057.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-057.test.ts
- tests/cases/admin/CASE-ADMIN-057.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-057.test.ts -t "test_CASE_ADMIN_057_activation_mention_avertissement_site_public_creneau_pre_alerte"

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/services/server/alerts/avertissement-public.ts` exportera `obtenirAffichagePublicCreneauAlerte(creneau: { sousPreAlerte: boolean; estOuvert: boolean }, placesRestantes: number): { mention: string | null; reservationEncoreAutorisee: boolean }`, dérivé de la note du domain.puml sur `Creneau` : « Affiche mention d'avertissement si sousPreAlerte = true ».
- Placement sous `services/server/alerts/` (composition/affichage lié au domaine alertes), consommé ensuite par une future page publique `src/app/.../planning/page.tsx` (hors périmètre de ce test).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le texte exact de la mention (« Sortie sous pré-alerte météo / risque d'annulation ») est repris littéralement de la ligne « Alors » du Gherkin du CASE, ce n'est pas une invention.
- La seconde ligne « Et le client est informé du risque avant toute nouvelle réservation » a été modélisée par un indicateur `reservationEncoreAutorisee: boolean` (le créneau reste réservable malgré l'avertissement), en l'absence d'attribut dédié dans le domain.puml au-delà de `estOuvert`/`placesRestantes` — traité comme relevant de ce qui entoure le calcul de mention.
