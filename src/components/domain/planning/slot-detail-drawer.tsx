'use client';

/**
 * Volet latéral de détail du créneau et de ses réservations (SPEC-ADMIN-01, SPEC-ARCH-01 : mono-composant).
 */
import Link from 'next/link';
import { Dialog } from '../../ui/dialog';
import { Badge } from '../../ui/badge';
import { CapacityProgressBar } from './capacity-progress-bar';
import { SlotFinancialBadge } from './slot-financial-badge';
import type { CreneauAffichePlanning } from './planning-types';

export interface SlotDetailDrawerProps {
  creneau: CreneauAffichePlanning | null;
  onOpenChange: (ouvert: boolean) => void;
}

export function SlotDetailDrawer({ creneau, onOpenChange }: SlotDetailDrawerProps) {
  if (!creneau) return null;

  return (
    <Dialog open onOpenChange={onOpenChange} titre={`${creneau.port} — ${creneau.heureDepart}`} description={creneau.activiteLabel ?? undefined}>
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={creneau.etatOperationnel === 'Ouvert' ? 'green' : 'red'}>{creneau.etatOperationnel}</Badge>
        {creneau.badgePreAlerte && <Badge tone="orange">{creneau.badgePreAlerte}</Badge>}
        <Badge tone="sand">{creneau.navireLabel}</Badge>
      </div>

      <div className="mt-4">
        <CapacityProgressBar placesOccupees={creneau.occupees} jaugeMax={creneau.jauge} />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <p className="text-sm font-semibold text-ocean-700">Réservations</p>
        {creneau.reservations.length === 0 && <p className="text-sm text-ocean-400">Aucune réservation.</p>}
        {creneau.reservations.map((reservation) => (
          <Link key={reservation.reference} href={`/admin/reservations/detail?ref=${reservation.reference}`}>
            <SlotFinancialBadge {...reservation} />
          </Link>
        ))}
      </div>
    </Dialog>
  );
}
