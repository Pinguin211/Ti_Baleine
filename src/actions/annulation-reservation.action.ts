'use server';

/**
 * Annulation complète d'une réservation, persistée en base de données.
 * SPEC-ADMIN-02
 *
 * Remplace `actions/demo-annuler-reservation.action.ts` (store en mémoire).
 * Appelle directement les services du domaine (`services/server/cancellation/`,
 * non modifiés) avec les ports PostgreSQL de
 * `services/server/db/db-ports-cancellation.ts`.
 */
import { calculerRemboursementIndicatif } from '../services/server/cancellation/calculer-remboursement-indicatif.service';
import { annulerReservationService } from '../services/server/cancellation/annuler-reservation.service';
import { convertirEnHorodatageDepart } from '../utils/slot-rules';
import { chargerReservationAnnulable, construirePortsAnnulationDb } from '../services/server/db/db-ports-cancellation';

export async function previsualiserAnnulation(reference: string, regimeDerogatoireAlerte: boolean) {
  const detail = await chargerReservationAnnulable(reference);
  return calculerRemboursementIndicatif({
    reservation: { montantAcompte: Number(detail.montant_acompte) },
    regimeDerogatoireAlerte,
  });
}

export async function annulerReservation(reference: string, motif: string) {
  const detail = await chargerReservationAnnulable(reference);
  const ports = construirePortsAnnulationDb(detail.id, detail.billets.length);

  const resultat = await annulerReservationService(
    {
      reservation: {
        reference,
        billetsActifs: detail.billets.map((billet) => ({ id: billet.id })),
        telephoneMobileClient: detail.user.telephone,
      },
      creneau: {
        reference: detail.creneau.id,
        dateDepart: convertirEnHorodatageDepart(detail.creneauDomaine.date, detail.creneauDomaine.heureDepart),
      },
      motif,
    },
    {
      depotReservation: ports.depotReservation,
      depotCreneau: ports.depotCreneau,
      passerelleSms: ports.passerelleSms,
      horloge: ports.horloge,
      journal: ports.journal,
    },
  );
  await ports.persister();

  return resultat;
}
