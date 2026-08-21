import Link from 'next/link';
import { AppNavbar } from '../components/common/app-navbar';
import { AppFooter } from '../components/common/app-footer';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export default function AccueilPage() {
  return (
    <div className="flex min-h-screen flex-col bg-ocean-50">
      <AppNavbar />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-ocean-500">
            La Réunion — Océan Indien
          </p>
          <h1 className="mt-4 text-4xl font-bold text-ocean-950 sm:text-5xl">
            Baleines et dauphins, au large de Saint-Gilles &amp; Saint-Leu
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ocean-700">
            Sorties en mer à bord du Tikap et du Grand Bleu, formules individuelles ou
            privatisées. Acompte en ligne, solde réglé la veille ou sur place.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/reservation">
              <Button size="md">Réserver une sortie</Button>
            </Link>
            <Link href="/admin/login">
              <Button variant="secondary" size="md">
                Espace administrateur
              </Button>
            </Link>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 sm:grid-cols-3">
          <Card className="p-6">
            <p className="text-sm font-semibold text-ocean-500">Saint-Gilles</p>
            <p className="mt-2 text-ocean-950">Départs quotidiens à 7h, 10h et 14h.</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm font-semibold text-ocean-500">Saint-Leu</p>
            <p className="mt-2 text-ocean-950">Départ à 9h les mardis et jeudis.</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm font-semibold text-ocean-500">Privatisation</p>
            <p className="mt-2 text-ocean-950">Tikap (12 places) ou Grand Bleu (24 places).</p>
          </Card>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
