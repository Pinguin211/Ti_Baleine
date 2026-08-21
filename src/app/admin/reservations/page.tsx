import { listerRegistreReservations } from '../../../services/server/reservations-registry.service';
import { ReservationsTable } from '../../../components/domain/reservations/reservations-table';

export default async function PageReservationsAdmin({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const lignes = await listerRegistreReservations(q);

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-marine-900">Réservations</h1>
      <form className="mb-4">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Référence, nom ou e-mail"
          className="w-72 rounded-lg border border-marine-200 bg-white p-2 text-sm text-marine-900 placeholder:text-marine-400 focus:border-lagoon-500 focus:outline-none focus:ring-2 focus:ring-lagoon-100"
        />
      </form>
      <ReservationsTable lignes={lignes} />
    </div>
  );
}
