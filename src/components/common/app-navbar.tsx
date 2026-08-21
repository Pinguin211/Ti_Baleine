import Link from 'next/link';

export function AppNavbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-marine-950/95 px-6 py-4 backdrop-blur">
      <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-white">
        <span aria-hidden="true" className="text-xl">
          🐋
        </span>
        Ti&apos;Baleine
      </Link>
    </header>
  );
}
