import { listerCreneauxPersistesDuJour, listerCreneauxPersistesDuMois } from '../../../services/server/planning/lister-creneaux-planning-jour.service';
import { obtenirGrillePlanningConsolidee } from '../../../services/server/planning/obtenir-grille-planning-consolidee.service';
import { obtenirCalendrierPlanningMensuel } from '../../../services/server/planning/obtenir-calendrier-planning-mensuel.service';
import { resoudreNavigationPlanning } from '../../../services/server/planning/resoudre-navigation-planning.service';
import { PlanningGridDesktop } from '../../../components/domain/planning/planning-grid-desktop';
import { PlanningCalendarMonth } from '../../../components/domain/planning/planning-calendar-month';
import { PlanningViewToggle } from '../../../components/domain/planning/planning-view-toggle';

export default async function PagePlanningAdmin({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; vue?: string; mois?: string }>;
}) {
  const { date: dateParam, vue: vueParam, mois: moisParam } = await searchParams;
  const navigation = resoudreNavigationPlanning({ dateParam, vueParam, moisParam });

  const titre =
    navigation.vue === 'calendrier'
      ? navigation.moisAffiche.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
      : navigation.date.toLocaleDateString('fr-FR');

  const entete = (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-xl font-semibold text-marine-900">Planning — {titre}</h1>
      <PlanningViewToggle
        vue={navigation.vue}
        hrefVueJour={navigation.hrefVueJour}
        hrefVueCalendrier={navigation.hrefVueCalendrier}
      />
    </div>
  );

  if (navigation.vue === 'calendrier') {
    const creneauxDuMois = await listerCreneauxPersistesDuMois(navigation.moisAffiche);
    const calendrier = obtenirCalendrierPlanningMensuel({
      moisAffiche: navigation.moisAffiche,
      creneaux: creneauxDuMois,
    });

    return (
      <div>
        {entete}
        <PlanningCalendarMonth
          calendrier={calendrier}
          hrefMoisPrecedent={navigation.hrefMoisPrecedent}
          hrefMoisSuivant={navigation.hrefMoisSuivant}
        />
      </div>
    );
  }

  const creneaux = await listerCreneauxPersistesDuJour(navigation.date);
  const grille = obtenirGrillePlanningConsolidee({ date: navigation.date, creneaux });

  return (
    <div>
      {entete}
      <PlanningGridDesktop grille={grille} />
    </div>
  );
}
