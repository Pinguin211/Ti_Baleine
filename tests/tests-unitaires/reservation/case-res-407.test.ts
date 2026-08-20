/**
 * CASE-RES-407 — Rejet du formulaire de coordonnées en cas de nom, prénom ou
 * e-mail manquant ou invalide
 * SPEC-RESERVATION-03 | AC-6
 *
 * Une assertion par ligne « Alors » / « Et » conclusive du Gherkin, soit quatre.
 * Vocabulaire aligné sur docs/uml/domain.puml (User : nom, prenom, email, telephone).
 */
import { it, expect } from 'vitest';
import { bookingContactSchema } from '../../../src/schemas/validation/booking-contact.schema';

/** Champs en défaut relevés par le schéma, sous forme de chemins Zod. */
function champsEnDefaut(donnees: unknown): string[] {
  const resultat = bookingContactSchema.safeParse(donnees);
  return resultat.success
    ? []
    : resultat.error.issues.map((probleme) => String(probleme.path[0]));
}

it('test_CASE_RES_407_rejet_formulaire_coordonnees_nom_prenom_email_manquant_ou_invalide', () => {
  // Quand il omet de renseigner son nom de famille (champ vide) et tente de valider
  // Alors la validation est bloquée et un message d'erreur indique que le nom est obligatoire
  expect(
    champsEnDefaut({
      nom: '',
      prenom: 'Jean',
      email: 'jean@test.re',
      telephone: '+262692112233',
    })
  ).toContain('nom');

  // Quand il renseigne son nom mais omet son prénom
  // Alors la validation est bloquée et un message d'erreur indique que le prénom est obligatoire
  expect(
    champsEnDefaut({
      nom: 'Dupont',
      prenom: '',
      email: 'jean@test.re',
      telephone: '+262692112233',
    })
  ).toContain('prenom');

  // Quand il saisit une adresse e-mail invalide
  // Alors la validation est bloquée et un message d'erreur indique que le format
  // de l'e-mail est invalide
  expect(
    champsEnDefaut({
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'test.sansarobase',
      telephone: '+262692112233',
    })
  ).toContain('email');

  // Et aucune redirection vers la passerelle de paiement CB n'est autorisée tant
  // que les champs ne sont pas valides
  expect(
    bookingContactSchema.safeParse({
      nom: 'Dupont',
      prenom: 'Jean',
      email: '',
      telephone: '+262692112233',
    }).success
  ).toBe(false);
});
