/**
 * Test unitaire du cas CASE-RES-407 — Nom, prénom ou e-mail manquant à
 * l'étape coordonnées (SPEC-RESERVATION-03, AC-6).
 *
 * Portée unitaire : la validation des coordonnées obligatoires du mode
 * invité, chacun des trois champs étant omis isolément tandis que les deux
 * autres restent valides. Le numéro de mobile reste valide sur les trois
 * tentatives, afin de ne pas recouper CASE-RES-415. Rendre l'un des trois
 * champs facultatif dans le code fait échouer le test.
 *
 * Non couvert à ce niveau : le blocage effectif de l'accès à l'étape de
 * paiement, qui découle de cette validation mais relève de l'orchestration
 * du tunnel. Les motifs vérifiés sont des codes machine ; leur libellé
 * traduit relève des composants.
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
  { champ: 'nom', contact: { ...CONTACT_VALIDE, nom: '' }, motif: 'nom-obligatoire' },
  { champ: 'prénom', contact: { ...CONTACT_VALIDE, prenom: '' }, motif: 'prenom-obligatoire' },
  { champ: 'e-mail', contact: { ...CONTACT_VALIDE, email: '' }, motif: 'email-obligatoire' },
];

test('test_CASE_RES_407_nom_prenom_email_manquants_rejet_formulaire_contact', () => {
  for (const tentative of TENTATIVES) {
    const resultat = validerContact(tentative.contact);
    expect(resultat.valide, `champ manquant : ${tentative.champ}`).toBe(false);
    expect(resultat.motifs).toContain(tentative.motif);
  }
});
