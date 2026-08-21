import type { ReactNode } from 'react';
import { AppNavbar } from '../../components/common/app-navbar';
import { AppFooter } from '../../components/common/app-footer';

export default function ReservationLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-sand-50">
      <AppNavbar />
      <main className="flex-1 p-6">{children}</main>
      <AppFooter />
    </div>
  );
}
