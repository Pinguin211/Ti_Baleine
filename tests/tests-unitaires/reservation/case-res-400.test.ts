/**
 * Test de CASE-RES-400 — Réservation individuelle standard au départ de
 * Saint-Gilles (SPEC-RESERVATION-03, AC-2, AC-4, AC-8).
 *
 * Traduction directe du gherkin de tests/cases/reservation/CASE-RES-400.md :
 * une assertion par ligne « Alors » ou « Et » conclusive, soit cinq.
 *
 * Seule la passerelle bancaire est simulée — ce qui entoure le cas. Le
 * planning, la jauge, la tarification et le passage à l'état « payée » sont
 * l'objet même du cas et ne sont pas simulés.
 */
import { expect, test, vi } from 'vitest';
import {
  creerTunnelReservation,
  type RechercheCreneaux,
} from '../../../src/reservation/tunnel/tunnel-reservation';

const RECHERCHE: RechercheCreneaux = {
  port: 'Saint-Gilles',
  activite: 'Sortie Baleines',
  date: '2026-09-16',
};
const HEURE_CRENEAU = '10h00';
const CONTACT = {
  nom: 'Dupont',
  prenom: 'Jean',
  email: 'jean.dupont@test.re',
  telephoneMobile: '+262692123456',
};

test('test_CASE_RES_400_reservation_individuelle_saint_gilles_payee_jauge_moins_2', () => {
  const passerellePaiement = { debiter: vi.fn(() => ({ accepte: true })) };
  const tunnel = creerTunnelReservation({ passerellePaiement });

  expect(tunnel.listerCreneaux(RECHERCHE)).toEqual([
    { heure: '07h00', placesLibres: 36 },
    { heure: '10h00', placesLibres: 36 },
    { heure: '14h00', placesLibres: 36 },
  ]);

  tunnel.selectionnerCreneau(HEURE_CRENEAU);
  const montant = tunnel.definirPassagers({ adultes: 1, agesEnfants: [8] });
  expect({ adulte: montant.tarifAdulte, enfant: montant.tarifEnfant }).toEqual({
    adulte: 65,
    enfant: 40,
  });
  expect(montant.montantTotal).toBe(105);

  tunnel.definirContact(CONTACT);
  expect(tunnel.payerParCarte().statut).toBe('payée');

  const creneauApres = tunnel
    .listerCreneaux(RECHERCHE)
    .find((creneau) => creneau.heure === HEURE_CRENEAU);
  expect(creneauApres?.placesLibres).toBe(34);
});
