import { WaveDivider } from './wave-divider';

export function AppFooter() {
  return (
    <footer className="bg-marine-950 text-sand-100">
      <WaveDivider className="text-sand-50" />
      <div className="px-6 pb-6 text-sm text-marine-300">
        Ti&apos;Baleine — Sorties en mer, Saint-Gilles &amp; Saint-Leu, La Réunion.
      </div>
    </footer>
  );
}
