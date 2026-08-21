/**
 * Coque visuelle du back-office (sidebar + en-tête) partagée par les pages
 * admin protégées — chacune appelle sa propre garde (SPEC-ARCH-01 : mono-composant).
 */
import type { ReactNode } from 'react';
import { AdminSidebar } from './admin-sidebar';
import { AdminHeader } from './admin-header';

export function AdminShell({ email, children }: { email: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-ocean-50">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminHeader email={email} />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
