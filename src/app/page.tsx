import Link from 'next/link';
import { AppNavbar } from '../components/common/app-navbar';
import { AppFooter } from '../components/common/app-footer';

export default function PageAccueil() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppNavbar />
      <main className="flex flex-1 flex-col">
        <section className="relative flex flex-1 flex-col items-center justify-center gap-6 overflow-hidden bg-gradient-to-b from-marine-950 via-marine-800 to-lagoon-700 p-6 text-center text-white">
          <span className="text-4xl" aria-hidden="true">
            🐬
          </span>
          <h1 className="max-w-2xl text-3xl font-semibold text-balance sm:text-5xl">
            Sorties baleines &amp; dauphins à La Réunion
          </h1>
          <p className="max-w-md text-marine-100">
            Départs quotidiens de Saint-Gilles, et le mardi/jeudi de Saint-Leu.
          </p>
          <Link
            href="/reservation"
            className="mt-2 rounded-lg bg-white px-6 py-3 font-medium text-marine-900 shadow-marine-lg transition-transform hover:scale-[1.03] hover:bg-sand-50"
          >
            Réserver une sortie
          </Link>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
