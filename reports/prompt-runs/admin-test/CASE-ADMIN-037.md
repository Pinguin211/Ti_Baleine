# Run — CASE-ADMIN-037

**Fichier de test :** tests/tests-unitaires/admin/case-admin-037.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-037.test.ts
- tests/cases/admin/CASE-ADMIN-037.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-037.test.ts -t "test_CASE_ADMIN_037_blocage_validation_formulaire_connexion_champs_vides"

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/schemas/validation/auth/identifiants-connexion.schema.ts` (mapping "validation des
  identifiants -> src/schemas/validation/auth/") exportant un schéma Zod `schemaIdentifiantsConnexion`
  (champs `email`/`motDePasse` requis non vides) et une fonction de garde
  `traiterSoumissionFormulaireConnexion(donnees: { email: string; motDePasse: string }, ports: { transmettreConnexion: (donnees) => void }): { bloque: boolean; erreursChamps: Record<string, string> }`
  qui n'invoque `ports.transmettreConnexion` que si la validation réussit.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Les 3 lignes Alors/Et du Gherkin sont vérifiées globalement sur les 3 cas de la section Données
  (via des tableaux de résultats), plutôt que par 3 assertions par cas, afin de respecter à la fois
  « une assertion par ligne Alors/Et » et l'utilisation exhaustive des 3 lignes de Données fournies.
- La fonction de garde `traiterSoumissionFormulaireConnexion` (qui décide de ne pas transmettre la
  requête réseau) est placée dans le même module que le schéma Zod, par proximité fonctionnelle ;
  l'architecture définitive au moment de l'écriture du code pourrait la déplacer dans un hook/action
  qui consomme ce schéma — ceci n'est pas fixé par `specs/architecture.md`.
- Les clés d'erreurs (`email`, `motDePasse`) et leur présence dans `erreursChamps` sont déduites du
  besoin d'« indiquer les champs obligatoires à renseigner », non explicitement nommées dans le CASE.
