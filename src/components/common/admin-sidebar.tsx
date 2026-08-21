'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../utils/cn.util';

export interface ElementMenuAdminAffiche {
  libelle: string;
  route: string;
}

export interface AdminSidebarProps {
  elements: readonly ElementMenuAdminAffiche[];
}

export function AdminSidebar({ elements }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="flex w-56 shrink-0 flex-col gap-4 bg-marine-950 p-4">
      <span className="flex items-center gap-2 px-3 font-display text-base font-semibold text-white">
        <span aria-hidden="true">🐋</span>
        Ti&apos;Baleine
      </span>
      <ul className="flex flex-col gap-1">
        {elements.map((element) => (
          <li key={element.route}>
            <Link
              href={element.route}
              className={cn(
                'block rounded-lg px-3 py-2 text-sm transition-colors',
                pathname === element.route
                  ? 'bg-lagoon-600 text-white'
                  : 'text-marine-200 hover:bg-marine-900 hover:text-white'
              )}
            >
              {element.libelle}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
