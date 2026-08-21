import Link from 'next/link';
import { obtenirStatutsFinanciersReservations } from '../../../services/server/planning/obtenir-statuts-financiers-reservations.service';
import {
  chargerToutesReservationsAvecDetails,
  versCreneauPlanningPersiste,
  soldeRestantDu,
} from '../../../services/server/db/db-ports-planning';
import { exigerSessionAdmin } from '../../../actions/authentifier-admin.action';
import { AdminShell } from '../../../components/common/admin-shell';
import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';

export default async function ReservationsPage() {
  const session = await exigerSessionAdmin();
  const reservations = await chargerToutesReservationsAvecDetails();
  const statuts = obtenirStatutsFinanciersReservations(
    reservations.map((r) => ({ reference: r.reference, statut: r.statut, soldeRestantDu: soldeRestantDu(r.montant_total, r.paiements) })),
  );
  const statutParReference = new Map(statuts.map((s) => [s.reference, s]));

  return (
    <AdminShell email={session.email}>
      <h1 className="text-2xl font-bold text-ocean-950">Réservations</h1>
      <p className="mt-1 text-sm text-ocean-600">{reservations.length} dossier(s)</p>

      <div className="mt-6 flex flex-col gap-3">
        {reservations.map((reservation) => {
          const creneau = versCreneauPlanningPersiste(reservation.creneau);
          const statut = statutParReference.get(reservation.reference);
          return (
            <Link key={reservation.reference} href={`/admin/reservations/detail?ref=${reservation.reference}`}>
              <Card className="flex items-center justify-between p-4 hover:shadow-md">
                <div>
                  <p className="font-semibold text-ocean-950">{reservation.reference}</p>
                  <p className="text-sm text-ocean-600">
                    {reservation.user.prenom} {reservation.user.nom} — {creneau.port} {creneau.heureDepart} —{' '}
                    {reservation.billets.length} billet(s)
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-ocean-700">{Number(reservation.montant_total).toFixed(2)} €</span>
                  {statut && (
                    <Badge tone={statut.soldeDu > 0 ? 'orange' : 'green'}>
                      {statut.badge}
                      {statut.soldeDu > 0 && ` · ${statut.soldeDu.toFixed(2)} €`}
                    </Badge>
                  )}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </AdminShell>
  );
}
