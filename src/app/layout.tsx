import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: "Ti'Baleine — Sorties baleines & dauphins à La Réunion",
  description:
    "Réservez votre sortie en mer au départ de Saint-Gilles ou Saint-Leu : baleines, dauphins, privatisation.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
