/**
 * Test de CASE-ADMIN-009 — Maintien de l'affichage du créneau au planning sous le seuil de
 * 6 passagers
 * SPEC-ADMIN-01 | Portée §3, R-09
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-009.md :
 * une assertion par ligne « Alors » / « Et », soit deux.
 *
 * L'échéance H-2 est simulée (booléen fourni en dur représentant l'horloge,
 * ce qui entoure le cas). L'absence d'annulation automatique sous le seuil
 * de maintien est l'objet même du cas et n'est pas simulée.
 */
import { expect, test } from 'vitest';
import { verifierMaintienCreneauSousSeuil } from '../../../src/services/server/planning/verifier-maintien-creneau-sous-seuil.service';

// Créneau : Sortie Baleines — 4 passagers réservés — Seuil minimal de maintien (R-09) : 6 passagers
// Heure : H-2 avant départ
const PARAMETRES = {
  billetsActifs: 4,
  seuilMaintien: 6,
  estAHeureMoins2: true,
};

test('test_CASE_ADMIN_009_maintien_affichage_creneau_sous_seuil_6_passagers_sans_annulation_auto', () => {
  const resultat = verifierMaintienCreneauSousSeuil(PARAMETRES);

  // Alors le créneau demeure actif et affiché sur le planning
  expect({
    creneauActif: resultat.creneauActif,
    creneauAfficheAuPlanning: resultat.creneauAfficheAuPlanning,
  }).toEqual({ creneauActif: true, creneauAfficheAuPlanning: true });

  // Et le système ne déclenche aucune annulation automatique de la sortie ni des billets
  expect({
    annulationAutomatiqueDeclenchee: resultat.annulationAutomatiqueDeclenchee,
    billetsActifsRestants: resultat.billetsActifsRestants,
  }).toEqual({ annulationAutomatiqueDeclenchee: false, billetsActifsRestants: 4 });
});
