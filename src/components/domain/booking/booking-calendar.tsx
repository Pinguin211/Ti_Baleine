'use client';

import { estJourDeFermetureAnnuelle, estJourMardiOuJeudi } from '../../../utils/slot-rules';
import { Input } from '../../ui/input';

export interface BookingCalendarProps {
  port: 'SAINT_GILLES' | 'SAINT_LEU';
  dateSelectionnee: string;
  onSelectDate: (date: string) => void;
}

export function BookingCalendar({ port, dateSelectionnee, onSelectDate }: BookingCalendarProps) {
  const valider = (value: string) => {
    const date = new Date(`${value}T00:00:00`);
    if (estJourDeFermetureAnnuelle(date)) return false;
    if (port === 'SAINT_LEU' && !estJourMardiOuJeudi(date)) return false;
    return true;
  };

  return (
    <div>
      <label className="block text-sm font-medium text-marine-800">
        Date de sortie
        <Input
          type="date"
          value={dateSelectionnee}
          onChange={(e) => e.target.value && onSelectDate(e.target.value)}
          className="mt-1"
        />
      </label>
      {dateSelectionnee && !valider(dateSelectionnee) && (
        <p className="mt-1 text-sm text-coral-600">
          {port === 'SAINT_LEU'
            ? 'Saint-Leu propose uniquement des sorties le mardi et le jeudi.'
            : 'Aucune sortie ce jour-là (fermeture annuelle).'}
        </p>
      )}
    </div>
  );
}
