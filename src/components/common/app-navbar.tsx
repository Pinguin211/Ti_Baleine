/**
 * Barre de navigation publique (SPEC-ARCH-01 : mono-composant).
 */
import Link from 'next/link';

export function AppNavbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-ocean-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-ocean-800">
          🐋 Ti&apos;Baleine
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-ocean-700">
          <Link href="/reservation" className="hover:text-ocean-950">
            Réserver une sortie
          </Link>
          <Link
            href="/admin/login"
            className="rounded-lg border border-ocean-200 px-3 py-1.5 hover:bg-ocean-50"
          >
            Espace administrateur
          </Link>
        </nav>
      </div>
    </header>
  );
}
