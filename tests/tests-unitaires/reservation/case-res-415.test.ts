/**
 * CASE-RES-415 — Rejet du formulaire de coordonnées si numéro de mobile manquant
 * ou au format invalide
 * SPEC-RESERVATION-03 | AC-6 (Contrainte 20)
 *
 * Une assertion par ligne « Alors » / « Et » conclusive du Gherkin, soit trois.
 * Vocabulaire aligné sur docs/uml/domain.puml (User.telephone).
 */
import { it, expect } from 'vitest';
import { bookingContactSchema } from '../../../src/schemas/validation/booking-contact.schema';

const CONTACT_VALIDE = {
  nom: 'Dupont',
  prenom: 'Jean',
  email: 'jean@test.re',
};

/** Messages d'erreur portés par le champ « telephone ». */
function messagesTelephone(telephone: string): string[] {
  const resultat = bookingContactSchema.safeParse({ ...CONTACT_VALIDE, telephone });
  return resultat.success
    ? []
    : resultat.error.issues
        .filter((probleme) => probleme.path[0] === 'telephone')
        .map((probleme) => probleme.message);
}

it('test_CASE_RES_415_rejet_formulaire_coordonnees_mobile_manquant_ou_format_invalide', () => {
  // Et laisse le champ « Téléphone mobile » vide, et valide le formulaire
  // Alors la soumission est bloquée avec le message d'obligation de saisie
  expect(messagesTelephone('')).toContain(
    'Le numéro de téléphone mobile est obligatoire pour recevoir les notifications et le lien de paiement'
  );

  // Quand il saisit un numéro dans un format invalide et valide le formulaire
  // Alors la soumission est bloquée avec le message de format invalide
  expect(messagesTelephone('0262123456')).toContain(
    "Le numéro de mobile n'est pas au format valide"
  );

  // Et aucun accès à la transaction de paiement CB n'est permis
  expect(
    ['', '0692', '0262123456', '+262692abc'].map(
      (numero) =>
        bookingContactSchema.safeParse({ ...CONTACT_VALIDE, telephone: numero }).success
    )
  ).toEqual([false, false, false, false]);
});
