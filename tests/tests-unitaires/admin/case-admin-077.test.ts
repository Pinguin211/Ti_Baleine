/**
 * Test de CASE-ADMIN-077 — Affichage des statuts financiers des réservations sur le détail
 * d'un créneau le jour J
 * SPEC-ADMIN-01 | Scénario 2, AC-3, REQ-023, R-30
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-077.md :
 * une assertion par ligne « Alors » / « Et », soit deux.
 *
 * Les réservations sont fournies en dur (persistance simulée). Le calcul du
 * badge et du solde dû affichés à partir du statut financier est l'objet
 * même du cas et n'est pas simulé.
 */
import { expect, test } from 'vitest';
import type { ReservationPersiste } from '../../../src/schemas/types/planning.types';
import { obtenirStatutsFinanciersReservations } from '../../../src/services/server/planning/obtenir-statuts-financiers-reservations.service';

// RES-001 : 2 places, soldée, solde dû 0,00 € — RES-002 : 1 place, acompte versé, solde dû 52,50 €
const RESERVATIONS: ReservationPersiste[] = [
  { reference: 'RES-001', statut: 'PAYEE_COMPLETEMENT', soldeRestantDu: 0 },
  { reference: 'RES-002', statut: 'PAYEE_PARTIELLEMENT', soldeRestantDu: 52.5 },
];

test('test_CASE_ADMIN_077_affichage_statuts_financiers_reservations_detail_creneau_jour_j', () => {
  const statuts = obtenirStatutsFinanciersReservations(RESERVATIONS);
  const res001 = statuts.find((statut) => statut.reference === 'RES-001');
  const res002 = statuts.find((statut) => statut.reference === 'RES-002');

  // Alors la liste des réservations affiche pour RES-001 le badge vert « Payée complètement » avec un solde dû de 0,00 €
  expect({ badge: res001?.badge, couleurBadge: res001?.couleurBadge, soldeDu: res001?.soldeDu }).toEqual({
    badge: 'Payée complètement',
    couleurBadge: 'vert',
    soldeDu: 0,
  });

  // Et la liste des réservations affiche pour RES-002 le badge « Payée partiellement » avec le montant du solde restant dû de 52,50 €
  expect({ badge: res002?.badge, soldeDu: res002?.soldeDu }).toEqual({
    badge: 'Payée partiellement',
    soldeDu: 52.5,
  });
});
