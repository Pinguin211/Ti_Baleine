/**
 * Test unitaire du cas CASE-RES-415 — Numéro de mobile manquant ou au format
 * invalide (SPEC-RESERVATION-03, AC-6).
 *
 * Portée unitaire : la validation du numéro de mobile — vide, « 0262 » (trop
 * court, indicatif fixe) et « ABCDEF » (non numérique). Nom, prénom et e-mail
 * restent valides sur les trois tentatives, afin de ne pas recouper
 * CASE-RES-407. Rendre le champ facultatif dans le code fait échouer le test.
 *
 * Non couvert à ce niveau : le blocage effectif de l'accès à l'étape de
 * paiement, qui découle de cette validation mais relève de l'orchestration
 * du tunnel, ainsi que la liste exhaustive des formats acceptés, non
 * précisée par la spécification.
 *
 * Fonction visée : `src/schemas/validation/contact.schema.ts` →
 * `validerContact(contact)` → `{ valide, motifs }`.
 */
import { expect, test } from 'vitest';
import { validerContact } from '../../src/schemas/validation/contact.schema';

const CONTACT_VALIDE = {
  nom: 'Dupont',
  prenom: 'Jean',
  email: 'jean.dupont@test.re',
  telephoneMobile: '+262692123456',
};

const TENTATIVES = [
  { libelle: 'mobile vide', mobile: '', motif: 'mobile-obligatoire' },
  { libelle: 'indicatif fixe trop court', mobile: '0262', motif: 'mobile-format-invalide' },
  { libelle: 'valeur non numérique', mobile: 'ABCDEF', motif: 'mobile-format-invalide' },
];

test('test_CASE_RES_415_mobile_manquant_ou_invalide_rejet_formulaire_contact', () => {
  for (const tentative of TENTATIVES) {
    const resultat = validerContact({ ...CONTACT_VALIDE, telephoneMobile: tentative.mobile });
    expect(resultat.valide, tentative.libelle).toBe(false);
    expect(resultat.motifs).toContain(tentative.motif);
  }
});
