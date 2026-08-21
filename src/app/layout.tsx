import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const police_titres = Fraunces({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
});

const police_texte = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Ti'Baleine",
  description: 'Sorties en mer à La Réunion — observation des baleines et dauphins.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${police_titres.variable} ${police_texte.variable}`}>
      <body>{children}</body>
    </html>
  );
}
