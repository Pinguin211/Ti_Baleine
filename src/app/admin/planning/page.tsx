import { obtenirGrillePlanningConsolidee } from '../../../services/server/planning/obtenir-grille-planning-consolidee.service';
import { determinerJaugeCreneau, type JourSemaine } from '../../../services/server/planning/determiner-jauge-creneau';
import { obtenirStatutsFinanciersReservations } from '../../../services/server/planning/obtenir-statuts-financiers-reservations.service';
import {
  chargerCreneauxDuJour,
  chargerReservationsParCreneauIds,
  versCreneauPlanningPersiste,
  soldeRestantDu,
  depuisDateSql,
} from '../../../services/server/db/db-ports-planning';
import { exigerSessionAdmin } from '../../../actions/authentifier-admin.action';
import { AdminShell } from '../../../components/common/admin-shell';
import { PlanningGridDesktop } from '../../../components/domain/planning/planning-grid-desktop';

const JOURS_SEMAINE: JourSemaine[] = ['DIMANCHE', 'LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI'];

export default async function PlanningPage() {
  const session = await exigerSessionAdmin();
  const date = new Date();

  const creneauxRows = await chargerCreneauxDuJour(date);
  const grille = obtenirGrillePlanningConsolidee({
    date,
    creneaux: creneauxRows.map(versCreneauPlanningPersiste),
  });

  const reservationsParCreneau = await chargerReservationsParCreneauIds(creneauxRows.map((creneau) => creneau.id));

  const creneauxAffiches = grille.creneaux.map((creneauAffiche) => {
    const creneauSource = creneauxRows.find((c) => c.id === creneauAffiche.id)!;
    const reservationsDuCreneau = reservationsParCreneau.filter((r) => r.creneau_id === creneauSource.id);
    const occupees = reservationsDuCreneau.reduce((total, r) => total + r.billets.length, 0);
    const jauge = determinerJaugeCreneau({
      port: creneauSource.port,
      jourSemaine: JOURS_SEMAINE[depuisDateSql(creneauSource.date).getDay()],
      heureDepart: creneauAffiche.heureDepart,
    });
    const statuts = obtenirStatutsFinanciersReservations(
      reservationsDuCreneau.map((r) => ({
        reference: r.reference,
        statut: r.statut,
        soldeRestantDu: soldeRestantDu(r.montant_total, r.paiements),
      })),
    );
    return { ...creneauAffiche, occupees, jauge, reservations: statuts };
  });

  return (
    <AdminShell email={session.email}>
      <h1 className="text-2xl font-bold text-ocean-950">Planning consolidé</h1>
      <p className="mt-1 text-sm text-ocean-600">
        {date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
      {grille.messageEtatVide ? (
        <p className="mt-8 text-ocean-500">{grille.messageEtatVide}</p>
      ) : (
        <PlanningGridDesktop creneaux={creneauxAffiches} />
      )}
    </AdminShell>
  );
}
