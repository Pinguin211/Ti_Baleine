/**
 * Pied de page officiel public (SPEC-ARCH-01 : mono-composant).
 */
export function AppFooter() {
  return (
    <footer className="border-t border-ocean-100 bg-ocean-950 py-8 text-sm text-ocean-200">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-semibold text-white">Ti&apos;Baleine</p>
        <p className="mt-1">
          Départs de Saint-Gilles (7h, 10h, 14h) et Saint-Leu (mardi &amp; jeudi, 9h).
        </p>
        <p className="mt-4 text-xs text-ocean-400">
          Démonstration — données et paiements simulés, aucune transaction réelle.
        </p>
      </div>
    </footer>
  );
}
