import 'server-only';
import { randomUUID } from 'node:crypto';
import type { PasserellePaiement, ResultatDebit } from '../../../schemas/types/booking.types';

/**
 * Aucune passerelle de paiement en ligne réelle n'est câblée : `debiter()`
 * (port testé — `enregistrerReservationApresPaiementAcompte` n'est ni async
 * ni tolérant à une Promise ici) doit rester strictement synchrone, alors
 * que `stripe` (installé) n'expose qu'une API HTTP asynchrone. Choisir un
 * fournisseur compatible synchrone — ou faire évoluer le contrat testé pour
 * accepter un port asynchrone — n'est pas une décision à prendre en
 * construisant l'écran de réservation : ce stub accepte systématiquement le
 * débit et journalise, en attendant cette décision.
 */
export function creerPasserellePaiementAcompteReelle(): PasserellePaiement {
  return {
    debiter(debit): ResultatDebit {
      console.warn(
        `[passerelle-paiement-acompte] Passerelle de paiement non configurée — débit de ${debit.montant} € pour ${debit.referenceReservation} accepté par défaut (aucun encaissement réel)`
      );
      return { accepte: true, referenceTransaction: randomUUID() };
    },
  };
}
