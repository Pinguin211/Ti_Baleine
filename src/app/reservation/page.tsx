import { AppNavbar } from '../../components/common/app-navbar';
import { AppFooter } from '../../components/common/app-footer';
import { BookingFlow } from '../../components/domain/booking/booking-flow';
import { reserver, type CommandeBooking } from '../../actions/booking.action';
import { emettreFactureAcompteApresPaiement } from '../../actions/emettre-facture-acompte-apres-paiement';
import { chargerDetailReservation } from '../../services/server/db/db-ports-planning';
import {
  versReservationFacturable,
  versPaiementAcompteValide,
  construirePortsFacturationDb,
} from '../../services/server/db/db-ports-facturation';

export default function ReservationPage() {
  async function reserverEtFacturer(commande: CommandeBooking) {
    'use server';
    const resultat = await reserver(commande);
    if (!resultat.reservation) return resultat;

    const detail = await chargerDetailReservation(resultat.reservation.reference);
    if (detail) {
      const { ports, persister } = await construirePortsFacturationDb(detail.id);
      const facture = emettreFactureAcompteApresPaiement(
        {
          reservation: versReservationFacturable(detail, detail.creneau, detail.user, detail.billets),
          paiement: versPaiementAcompteValide(detail.paiements),
        },
        ports,
      );
      if (facture) await persister();
    }
    return resultat;
  }

  return (
    <div className="flex min-h-screen flex-col bg-ocean-50">
      <AppNavbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        <h1 className="text-2xl font-bold text-ocean-950">Réserver une sortie en mer</h1>
        <BookingFlow reserverEtFacturer={reserverEtFacturer} />
      </main>
      <AppFooter />
    </div>
  );
}
