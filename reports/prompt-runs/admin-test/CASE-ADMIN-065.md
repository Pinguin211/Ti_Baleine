# Run — CASE-ADMIN-065

**Fichier de test :** tests/tests-unitaires/admin/case-admin-065.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-065.test.ts
- tests/cases/admin/CASE-ADMIN-065.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-065.test.ts -t "test_CASE_ADMIN_065_configuration_affectation_navires_mobilises_creneau"

**Résultat de vérification :** rouge attendu — `Cannot find module '../../../src/actions/affecter-navires-creneau.action'` (aucune erreur de syntaxe TypeScript dans le test).

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/actions/affecter-navires-creneau.action.ts` — orchestration : `affecterNaviresCreneau(input: { creneauId: string; navires: Bateau[] }, ports: { depotCreneaux: DepotCreneaux }): { accepte: true; creneau: Creneau; capaciteMaximale: number } | { accepte: false; message: string }`. Type retour discriminé pour permettre la réutilisation par CASE-ADMIN-066 (exclusivité navire), qui bloque cette même action.
- `src/services/server/slots/` — accueillera le calcul de capacité (dérivé de `ConfigBateau.capacite` par navire, cf. `docs/uml/domain.puml`) et le contrôle d'exclusivité navire/créneau (R-12, exercé par CASE-ADMIN-066).
- `src/schemas/types/slots.types.ts` — type `Creneau` étendu (voir hypothèse ci-dessous) et enum `Bateau` (`TIKAP | GRAND_BLEU`, conforme au diagramme).
- `src/schemas/types/slots-ports.types.ts` — port `DepotCreneaux`.
- `src/schemas/validation/slots/` — schéma Zod de validation de `{ creneauId, navires }` (dont non-vacuité et appartenance à l'enum `Bateau`).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- `docs/uml/domain.puml` ne modélise **aucune** relation `Creneau -> Bateau` explicite (seule `ConfigBateau` définit une capacité par navire, à portée globale de configuration, pas d'affectation par créneau). J'ai donc supposé, pour satisfaire ce CASE, un attribut `Creneau.navires: Bateau[]` et un champ dérivé `capaciteMaximale: number` sur le résultat de l'action (somme des `ConfigBateau.capacite` des navires affectés). Cette extension n'est pas contredite par le diagramme (la note de `Creneau` mentionne « Jauge max selon navire(s) mobilisé(s) (R-03, C-04) », ce qui présuppose une telle association sans la formaliser) mais reste **à valider avec l'équipe domaine** avant implémentation — elle mériterait d'être ajoutée explicitement à `docs/uml/domain.puml`.
- La capacité de 36 places (12 + 24) est reprise telle quelle de la section « Résultat attendu, calculé à la main » du CASE, cohérente avec les notes `ConfigBateau` (Tikap 12, Grand Bleu 24) du diagramme.
