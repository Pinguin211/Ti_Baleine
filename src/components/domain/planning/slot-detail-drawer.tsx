import type { CreneauAffiche } from '../../../schemas/types/planning.types';

export interface SlotDetailDrawerProps {
  creneau: CreneauAffiche | null;
  onClose: () => void;
}

/**
 * Volet de détail d'un créneau. Reprend les champs déjà résolus par
 * `obtenirGrillePlanningConsolidee` plutôt que d'appeler
 * `obtenirDetailCreneau` (qui exige un tableau `navires` réel — non
 * persisté en base, docs/signature.md §6.2 ; SPEC-ADMIN-07 l'introduira).
 */
export function SlotDetailDrawer({ creneau, onClose }: SlotDetailDrawerProps) {
  if (!creneau) {
    return null;
  }

  return (
    <aside className="fixed inset-y-0 right-0 w-80 border-l border-marine-100 bg-white p-6 shadow-marine-lg">
      <button type="button" onClick={onClose} className="mb-4 text-sm text-marine-500 hover:text-marine-900">
        Fermer ✕
      </button>
      <h2 className="text-lg font-semibold text-marine-900">
        {creneau.port} — {creneau.heureDepart}
      </h2>
      <dl className="mt-4 flex flex-col gap-3 text-sm text-marine-800">
        <div>
          <dt className="text-marine-500">Activité</dt>
          <dd>{creneau.activiteLabel}</dd>
        </div>
        <div>
          <dt className="text-marine-500">Navire(s)</dt>
          <dd>{creneau.navireLabel}</dd>
        </div>
        <div>
          <dt className="text-marine-500">État opérationnel</dt>
          <dd>{creneau.etatOperationnel}</dd>
        </div>
        {creneau.badgePreAlerte && (
          <div>
            <dt className="text-marine-500">Alerte</dt>
            <dd className="font-medium text-sand-500">{creneau.badgePreAlerte}</dd>
          </div>
        )}
      </dl>
    </aside>
  );
}
