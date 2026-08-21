'use server';

/**
 * Action d'annulation complète d'une réservation depuis le back-office.
 * SPEC-ADMIN-02 | CASE-ADMIN-010
 *
 * Orchestration fine : délègue le calcul indicatif de remboursement et
 * l'exécution de l'annulation aux services du domaine cancellation, sans
 * porter elle-même de règle métier (SPEC-ARCH-02).
 */

import { calculerRemboursementIndicatif } from '../services/server/cancellation/calculer-remboursement-indicatif.service';
import { annulerReservationService } from '../services/server/cancellation/annuler-reservation.service';

export const previsualiserAnnulation = calculerRemboursementIndicatif;
export const annulerReservation = annulerReservationService;
