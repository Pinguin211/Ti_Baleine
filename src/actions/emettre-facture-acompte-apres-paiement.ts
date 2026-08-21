import type {
  ReservationFacturable,
  PaiementAcompteValide,
  FactureAcompte,
} from '../schemas/types/facturation.types';
import type { PortsFacturation } from '../schemas/types/facturation-ports.types';
import { genererFactureAcomptePdf } from '../services/server/generer-facture-acompte-pdf.service';
import { envoyerCourrielFacture } from '../services/server/envoyer-courriel-facture.service';
import { enregistrerStatutEmissionFacture } from '../services/server/enregistrer-statut-emission-facture.service';
import { verifierIdempotenceEmissionFacture } from '../services/server/verifier-idempotence-emission-facture.service';

/**
 * Orchestration post-paiement de l'acompte : génération de la facture PDF
 * en mémoire, envoi du courriel transactionnel et persistance du statut
 * d'émission (SPEC-FAC-02, AC-1, AC-3, AC-6).
 */
export function emettreFactureAcompteApresPaiement(
  input: { reservation: ReservationFacturable; paiement: PaiementAcompteValide },
  ports: PortsFacturation,
): FactureAcompte | null {
  const { reservation, paiement } = input;
  if (paiement.statut !== 'validé avec succès') {
    return null;
  }
  if (verifierIdempotenceEmissionFacture(ports.depotEmission, reservation.id, 'acompte')) {
    return null;
  }
  const factureAcompte = genererFactureAcomptePdf(reservation, paiement.montantRegle, ports.horloge);
  envoyerCourrielFacture(
    ports.envoiCourriel,
    reservation.emailClient,
    `${factureAcompte.identifiantUnique}.pdf`,
    factureAcompte.contenu,
  );
  enregistrerStatutEmissionFacture(ports.depotEmission, reservation.id, 'acompte', ports.horloge.maintenant());
  return factureAcompte;
}
