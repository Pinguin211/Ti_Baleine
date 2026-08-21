import { BookingWizard } from '../../components/domain/booking/booking-wizard';

export default function PageReservation() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-marine-900">Réserver une sortie en mer</h1>
      <BookingWizard />
    </div>
  );
}
