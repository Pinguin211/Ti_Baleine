/**
 * Barre latérale de navigation du back-office administrateur (SPEC-ARCH-01 : mono-composant).
 * Items de menu déduits de SPEC-ADMIN-04 (C-16, administrateur unique).
 */
import Link from 'next/link';

const ELEMENTS_MENU_ADMIN = [
  { libelle: 'Planning', route: '/admin/planning' },
  { libelle: 'Réservations', route: '/admin/reservations' },
  { libelle: 'Alertes météo', route: '/admin/alertes' },
  { libelle: 'Configuration', route: '/admin/configuration' },
] as const;

export function AdminSidebar() {
  return (
    <aside className="w-60 shrink-0 border-r border-ocean-100 bg-white">
      <div className="px-5 py-5 text-lg font-bold text-ocean-800">🐋 Ti&apos;Baleine</div>
      <nav className="flex flex-col gap-1 px-3">
        {ELEMENTS_MENU_ADMIN.map((element) => (
          <Link
            key={element.route}
            href={element.route}
            className="rounded-lg px-3 py-2 text-sm font-medium text-ocean-700 hover:bg-ocean-50 hover:text-ocean-950"
          >
            {element.libelle}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
