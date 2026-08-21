'use server';

/**
 * Enregistrement d'une réservation publique après paiement simulé de l'acompte,
 * persisté en base de données. SPEC-RESERVATION-03
 *
 * Remplace `actions/demo-booking.action.ts` (store en mémoire). Appelle
 * directement `services/server/booking.service.ts` (non modifié) avec les
 * ports PostgreSQL de `services/server/db/db-ports-booking.ts` ; le paiement
 * reste simulé (toujours accepté), aucune passerelle bancaire réelle n'est
 * jamais sollicitée.
 */
import { enregistrerReservationApresPaiementAcompte } from '../services/server/booking.service';
import {
  construireDepotReservationsPubliquesDb,
  construirePasserellePaiementSimuleeDb,
} from '../services/server/db/db-ports-booking';

export interface CommandeBooking {
  client: { nom: string; prenom: string; email: string; telephone: string };
  port: 'SAINT_GILLES' | 'SAINT_LEU';
  activite: 'BALEINES' | 'DAUPHINS' | 'PRIVATISATION_TIKAP' | 'PRIVATISATION_GRAND_BLEU';
  date: Date;
  heureDepart: string;
  billets: { typeBillet: 'ADULTE' | 'ENFANT' | 'PRIVATISATION' }[];
}

export async function reserver(commande: CommandeBooking) {
  const depot = await construireDepotReservationsPubliquesDb(commande.port, commande.date);

  const resultat = enregistrerReservationApresPaiementAcompte(
    {
      client: { ...commande.client, role: 'CLIENT', motDePasse: null },
      creneau: {
        port: commande.port,
        activite: commande.activite,
        date: commande.date,
        heureDepart: commande.heureDepart,
      },
      billets: commande.billets,
    },
    { depot, passerellePaiement: construirePasserellePaiementSimuleeDb() },
  );

  if (resultat.reservation) {
    await depot.persister();
  }

  return resultat;
}
