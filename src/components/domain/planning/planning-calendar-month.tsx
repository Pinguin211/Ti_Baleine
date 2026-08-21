import Link from 'next/link';
import type { CalendrierPlanningMensuel } from '../../../schemas/types/planning.types';
import { cn } from '../../../utils/cn.util';
import { formaterDateSql } from '../../../utils/formater-date-sql.util';

export interface PlanningCalendarMonthProps {
  calendrier: CalendrierPlanningMensuel;
  hrefMoisPrecedent: string;
  hrefMoisSuivant: string;
}

export function PlanningCalendarMonth({ calendrier, hrefMoisPrecedent, hrefMoisSuivant }: PlanningCalendarMonthProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-marine-100 bg-white shadow-marine-sm">
      <div className="flex items-center justify-between border-b border-marine-100 bg-marine-50 px-4 py-3">
        <Link
          href={hrefMoisPrecedent}
          aria-label="Mois précédent"
          className="rounded-full px-2 py-1 text-marine-600 hover:bg-marine-100 hover:text-marine-900"
        >
          ‹
        </Link>
        <h2 className="font-semibold text-marine-900">{calendrier.libelleMois}</h2>
        <Link
          href={hrefMoisSuivant}
          aria-label="Mois suivant"
          className="rounded-full px-2 py-1 text-marine-600 hover:bg-marine-100 hover:text-marine-900"
        >
          ›
        </Link>
      </div>

      <div className="grid grid-cols-7 border-b border-marine-100 text-center text-xs font-medium text-marine-500">
        {calendrier.entetesJours.map((entete) => (
          <div key={entete} className="py-2">
            {entete}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {calendrier.semaines.flatMap((semaine) =>
          semaine.map((jour) => (
            <Link
              key={jour.date.toISOString()}
              href={`/admin/planning?date=${formaterDateSql(jour.date)}`}
              className={cn(
                'flex min-h-20 flex-col gap-1 border-b border-r border-marine-50 p-2 text-left text-sm transition-colors last:border-r-0 hover:bg-lagoon-50',
                !jour.dansLeMoisAffiche && 'bg-marine-50/50 text-marine-300'
              )}
            >
              <span
                className={cn(
                  'inline-flex h-6 w-6 items-center justify-center rounded-full text-xs',
                  jour.estAujourdhui ? 'bg-marine-900 text-white' : jour.dansLeMoisAffiche ? 'text-marine-800' : 'text-marine-300'
                )}
              >
                {jour.date.getDate()}
              </span>
              {jour.nombreCreneaux > 0 && (
                <span
                  className={cn(
                    'inline-flex w-fit items-center rounded-full px-2 py-0.5 text-xs',
                    jour.nombreCreneauxOuverts > 0 ? 'bg-lagoon-50 text-lagoon-700' : 'bg-coral-50 text-coral-700'
                  )}
                >
                  {jour.nombreCreneauxOuverts}/{jour.nombreCreneaux} ouverts
                </span>
              )}
              {jour.auMoinsUneAlerte && (
                <span className="inline-flex w-fit items-center rounded-full bg-sand-200 px-2 py-0.5 text-xs text-sand-500">
                  Alerte
                </span>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
