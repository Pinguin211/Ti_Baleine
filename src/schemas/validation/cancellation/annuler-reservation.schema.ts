/**
 * Garde de validation de l'annulation d'une réservation.
 * SPEC-ADMIN-02 | CASE-ADMIN-017, CASE-ADMIN-018 | Cas limites #2, #3
 *
 * Refuse toute annulation sur une réservation déjà à 0 billet actif, ou dont
 * le créneau de départ est déjà passé.
 */

interface BilletActif {
  id: string;
}

interface ReservationAnnulation {
  billetsActifs: BilletActif[];
}

interface CreneauAnnulation {
  dateDepart: Date;
}

interface VerificationAnnulation {
  autorise: boolean;
  motifRefus?: string;
}

/**
 * Vérifie qu'une réservation peut faire l'objet d'une annulation
 * (SPEC-ADMIN-02, CASE-ADMIN-017, CASE-ADMIN-018).
 */
export function verifierReservationAnnulable(
  reservation: ReservationAnnulation,
  creneau: CreneauAnnulation,
  dateActuelle: Date,
): VerificationAnnulation {
  if (reservation.billetsActifs.length === 0) {
    return { autorise: false, motifRefus: 'Réservation déjà à 0 billet actif' };
  }

  if (dateActuelle > creneau.dateDepart) {
    return {
      autorise: false,
      motifRefus: 'Annulation impossible : le départ est déjà passé',
    };
  }

  return { autorise: true };
}
