import { chargerCreneauxDuJour, libellePort, depuisHeureSql } from '../../../services/server/db/db-ports-planning';
import { CATALOGUE_TEMPLATES_ALERTE, preremplirZoneMessageAvecTemplate } from '../../../services/server/alerts/templates-alerte';
import { exigerSessionAdmin } from '../../../actions/authentifier-admin.action';
import { AdminShell } from '../../../components/common/admin-shell';
import { AlertComposer } from '../../../components/domain/alerts/alert-composer';

export default async function AlertesPage() {
  const session = await exigerSessionAdmin();
  const demain = new Date();
  demain.setDate(demain.getDate() + 1);

  const creneauxRows = await chargerCreneauxDuJour(demain);
  const creneauxDemain = creneauxRows
    .filter((creneau) => !creneau.sous_pre_alerte)
    .map((creneau) => ({
      id: creneau.id,
      port: libellePort(creneau.port as 'SAINT_GILLES' | 'SAINT_LEU'),
      heureDepart: depuisHeureSql(creneau.heure_depart),
      sousPreAlerte: creneau.sous_pre_alerte,
    }));

  return (
    <AdminShell email={session.email}>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-ocean-950">Alerte de pré-annulation groupée</h1>
        <p className="mt-1 text-sm text-ocean-600">
          Créneaux du {demain.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
        <AlertComposer
          creneaux={creneauxDemain}
          templates={Object.values(CATALOGUE_TEMPLATES_ALERTE).map((template) => ({
            cle: template.cle,
            titre: template.titre,
            message: preremplirZoneMessageAvecTemplate(template.cle).valeur,
          }))}
        />
      </div>
    </AdminShell>
  );
}
