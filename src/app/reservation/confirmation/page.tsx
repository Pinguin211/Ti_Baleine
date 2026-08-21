import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AppNavbar } from '../../../components/common/app-navbar';
import { AppFooter } from '../../../components/common/app-footer';
import { chargerDetailReservation, versCreneauPlanningPersiste, soldeRestantDu } from '../../../services/server/db/db-ports-planning';
import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';

export default async function ConfirmationPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams;
  const detail = ref ? await chargerDetailReservation(ref) : undefined;
  if (!detail) notFound();
  const reservation = detail;
  const creneau = detail.creneau ? versCreneauPlanningPersiste(detail.creneau) : null;
  const solde = soldeRestantDu(detail.montant_total, detail.paiements);

  return (
    <div className="flex min-h-screen flex-col bg-ocean-50">
      <AppNavbar />
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
        <Badge tone="green">Acompte confirmé</Badge>
        <h1 className="mt-3 text-2xl font-bold text-ocean-950">Réservation {reservation.reference}</h1>
        <p className="mt-1 text-sm text-ocean-600">Un e-mail de confirmation avec la facture d&apos;acompte a été envoyé.</p>

        <Card className="mt-6 p-6">
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-ocean-500">Départ</dt>
              <dd className="font-medium text-ocean-950">
                {creneau?.port} · {creneau?.heureDepart}
              </dd>
            </div>
            <div>
              <dt className="text-ocean-500">Passagers</dt>
              <dd className="font-medium text-ocean-950">{reservation.billets.length}</dd>
            </div>
            <div>
              <dt className="text-ocean-500">Montant total</dt>
              <dd className="font-medium text-ocean-950">{Number(reservation.montant_total).toFixed(2)} €</dd>
            </div>
            <div>
              <dt className="text-ocean-500">Acompte réglé</dt>
              <dd className="font-medium text-ocean-950">{Number(reservation.montant_acompte).toFixed(2)} €</dd>
            </div>
            <div>
              <dt className="text-ocean-500">Solde restant dû</dt>
              <dd className="font-medium text-ocean-950">{solde.toFixed(2)} €</dd>
            </div>
          </dl>
        </Card>

        <Link href="/" className="mt-6 inline-block text-sm text-ocean-600 underline">
          Retour à l&apos;accueil
        </Link>
      </main>
      <AppFooter />
    </div>
  );
}
