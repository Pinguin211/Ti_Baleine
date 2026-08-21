import {
  chargerProchainsCreneaux,
  libellePort,
  depuisDateSql,
  depuisHeureSql,
} from '../../../services/server/db/db-ports-planning';
import { exigerSessionAdmin } from '../../../actions/authentifier-admin.action';
import { AdminShell } from '../../../components/common/admin-shell';
import { SlotConfigTable } from '../../../components/domain/admin/slot-config-table';

export default async function ConfigurationPage() {
  const session = await exigerSessionAdmin();
  const creneauxRows = await chargerProchainsCreneaux(14);
  const creneaux = creneauxRows.map((creneau) => ({
    id: creneau.id,
    port: libellePort(creneau.port as 'SAINT_GILLES' | 'SAINT_LEU'),
    date: depuisDateSql(creneau.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }),
    heureDepart: depuisHeureSql(creneau.heure_depart),
    activite: creneau.activite,
    navires: creneau.navires,
    estOuvert: creneau.est_ouvert,
  }));

  return (
    <AdminShell email={session.email}>
      <h1 className="text-2xl font-bold text-ocean-950">Configuration des créneaux</h1>
      <p className="mt-1 text-sm text-ocean-600">Ouverture/fermeture, affectation des navires et de l&apos;activité.</p>
      <SlotConfigTable creneaux={creneaux} />
    </AdminShell>
  );
}
