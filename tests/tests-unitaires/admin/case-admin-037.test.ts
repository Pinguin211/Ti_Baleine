/**
 * CASE-ADMIN-037 — Blocage à la validation du formulaire de connexion lorsque des
 * champs obligatoires sont laissés vides
 * SPEC-ADMIN-04 | Cas limite #2
 */
import { it, expect, vi } from 'vitest';
import { traiterSoumissionFormulaireConnexion } from '../../../src/schemas/validation/auth/identifiants-connexion.schema';

it('test_CASE_ADMIN_037_blocage_validation_formulaire_connexion_champs_vides', () => {
  // Étant donné l'administrateur sur l'écran de connexion
  // Quand il laisse le champ e-mail ou mot de passe vide et clique sur « Se connecter »
  const transmettreConnexion = vi.fn();
  const cas = [
    { email: '', motDePasse: 'Tib@leine2026!' }, // Cas 1 : e-mail vide, mot de passe renseigné
    { email: 'admin@tibaleine.re', motDePasse: '' }, // Cas 2 : e-mail renseigné, mot de passe vide
    { email: '', motDePasse: '' }, // Cas 3 : les deux champs vides
  ];

  const resultats = cas.map((donnees) =>
    traiterSoumissionFormulaireConnexion(donnees, { transmettreConnexion })
  );

  // Alors la soumission est bloquée côté client
  expect(resultats.map((resultat) => resultat.bloque)).toEqual([true, true, true]);

  // Et des messages visuels indiquent les champs obligatoires à renseigner
  expect(resultats.map((resultat) => Object.keys(resultat.erreursChamps))).toEqual([
    ['email'],
    ['motDePasse'],
    ['email', 'motDePasse'],
  ]);

  // Et aucune requête d'authentification n'est transmise inutilement au serveur
  expect(transmettreConnexion).not.toHaveBeenCalled();
});
