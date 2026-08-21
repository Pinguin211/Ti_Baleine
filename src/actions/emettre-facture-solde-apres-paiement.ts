import type {
  ReservationFacturable,
  PaiementSoldeValide,
  FactureSolde,
} from '../schemas/types/facturation.types';
import type { PortsFacturation } from '../schemas/types/facturation-ports.types';
import { genererFactureSoldePdf } from '../services/server/generer-facture-solde-pdf.service';
import { envoyerCourrielFacture } from '../services/server/envoyer-courriel-facture.service';
import { enregistrerStatutEmissionFacture } from '../services/server/enregistrer-statut-emission-facture.service';
import { verifierIdempotenceEmissionFacture } from '../services/server/verifier-idempotence-emission-facture.service';

/**
 * Orchestration post-paiement du solde : génération de la facture de solde
 * distincte PDF en mémoire, envoi du courriel transactionnel et
 * persistance du statut d'émission (SPEC-FAC-02, AC-2, AC-3, AC-6).
 */
export function emettreFactureSoldeApresPaiement(
  input: { reservation: ReservationFacturable; paiement: PaiementSoldeValide; acompteRegle: number },
  ports: PortsFacturation,
): FactureSolde | null {
  const { reservation, paiement, acompteRegle } = input;
  if (paiement.statut !== 'validé avec succès') {
    return null;
  }
  if (verifierIdempotenceEmissionFacture(ports.depotEmission, reservation.id, 'solde')) {
    return null;
  }
  const factureSolde = genererFactureSoldePdf(reservation, acompteRegle, paiement.montantRegle, ports.horloge);
  envoyerCourrielFacture(
    ports.envoiCourriel,
    reservation.emailClient,
    `${factureSolde.identifiantUnique}.pdf`,
    factureSolde.contenu,
  );
  enregistrerStatutEmissionFacture(ports.depotEmission, reservation.id, 'solde', ports.horloge.maintenant());
  return factureSolde;
}
