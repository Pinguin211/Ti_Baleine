/**
 * Test de CASE-ADMIN-047 — Affichage spécifique d'un créneau privatisé
 * indiquant « Navire privatisé » et bloquant la totalité de la jauge
 * (SPEC-ADMIN-05, Cas limite #4, R-12).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-047.md :
 * trois assertions, une par ligne « Alors »/« Et ».
 *
 * Rien n'est simulé : le blocage de la jauge et la mention d'affichage pour
 * un créneau privatisé sont l'objet même du cas. Conformément à
 * docs/uml/domain.puml (note de la classe Reservation : « Privatisation :
 * regroupe 1 billet forfaitaire (PRIVATISATION) »), le créneau ne comporte
 * qu'un seul billet forfaitaire malgré le blocage intégral de la jauge.
 */
import { expect, test } from 'vitest';
import { calculerRemplissageCreneau } from '../../../src/services/server/capacity/calculer-remplissage-creneau';

test('test_CASE_ADMIN_047_affichage_specifique_creneau_privatise_blocage_jauge', () => {
  // Étant donné un créneau horaire réservé au forfait « Privatisation » pour
  // le navire Tikap
  const remplissage = calculerRemplissageCreneau({
    jaugeMax: 12,
    placesReservees: 1,
    estPrivatise: true,
  });

  // Alors le créneau indique la mention spécifique « Navire privatisé »
  expect(remplissage.libelleAffichage).toBe('Navire privatisé');

  // Et la jauge bloque l'intégralité des 12 places du navire (0 place restante)
  expect(remplissage.placesRestantes).toBe(0);

  // Et aucune réservation individuelle ne peut s'ajouter sur ce créneau (R-12)
  expect(remplissage.estReservable).toBe(false);
});
