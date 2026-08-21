'use server';

/**
 * Réduction de billets et bascule vers annulation, persistée en base de données.
 * SPEC-ADMIN-03
 *
 * Remplace `actions/demo-reduire-billets.action.ts` (store en mémoire).
 * Appelle directement les services du domaine (`services/server/cancellation/`,
 * non modifiés) avec les ports PostgreSQL de
 * `services/server/db/db-ports-cancellation.ts`. La garde anti-ajout /
 * anti-changement-créneau / anti-0-billet reproduit fidèlement celle
 * de `actions/demo-reduire-billets.action.ts`.
 */
import { reduireBilletsReservation } from '../services/server/cancellation/reduire-billets-reservation.service';
import { confirmerAnnulationApresReduction } from '../services/server/cancellation/confirmer-annulation-apres-reduction.service';
import {
  chargerReservationAnnulable,
  construirePortsReductionDb,
  construirePortsConfirmationDb,
} from '../services/server/db/db-ports-cancellation';

interface RequeteReduction {
  adultesARetirer: number;
  enfantsARetirer: number;
}

function garderReduction(
  billets: { typeBillet: string }[],
  requete: RequeteReduction,
): { valide: true } | { valide: false; message: string } {
  if (billets.length === 0) {
    return { valide: false, message: 'Réservation déjà à 0 billet actif' };
  }
  const adultesActifs = billets.filter((billet) => billet.typeBillet === 'ADULTE').length;
  const enfantsActifs = billets.filter((billet) => billet.typeBillet === 'ENFANT').length;
  if (requete.adultesARetirer > adultesActifs || requete.enfantsARetirer > enfantsActifs) {
    return { valide: false, message: 'Quantité de billets à retirer supérieure au solde actif' };
  }
  return { valide: true };
}

export async function reduireBillets(reference: string, requete: RequeteReduction) {
  const detail = await chargerReservationAnnulable(reference);

  const garde = garderReduction(
    detail.billets.map((billet) => ({ typeBillet: billet.type_billet })),
    requete,
  );
  if (!garde.valide) return { succes: false, message: garde.message };

  const billetsAvecId: { id: string; typeBillet: 'ADULTE' | 'ENFANT' | 'PRIVATISATION' }[] = detail.billets.map((billet) => ({
    id: billet.id,
    typeBillet: billet.type_billet,
  }));

  const ports = construirePortsReductionDb(detail.id, detail.billets.length);
  const resultat = reduireBilletsReservation(
    {
      reservation: {
        reference,
        creneau: detail.creneauDomaine,
        billets: billetsAvecId,
        montantAcompteVerse: Number(detail.montant_acompte),
      },
      adultesARetirer: requete.adultesARetirer,
      enfantsARetirer: requete.enfantsARetirer,
    },
    { depotBillets: ports.depotBillets, depotCreneau: ports.depotCreneau },
  );
  await ports.persister();

  return { ...resultat, succes: true };
}

export async function confirmerAnnulationApresReductionAdmin(reference: string, motifAnnulation: string) {
  const detail = await chargerReservationAnnulable(reference);
  const ports = construirePortsConfirmationDb(detail.id);

  confirmerAnnulationApresReduction(
    {
      reservation: {
        reference,
        billets: detail.billets.map((billet) => ({ typeBillet: billet.type_billet })),
        telephoneMobileClient: detail.user.telephone,
      },
      motifAnnulation,
    },
    ports,
  );
  await ports.persister();
}
