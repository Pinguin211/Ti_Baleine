import { chargerCreneauxAVenir } from '../../../services/server/slots/creneaux-config-repository.service';
import { SlotConfigurationTable } from '../../../components/domain/admin/slot-configuration-table';

export default async function PageConfigurationAdmin() {
  const creneauxAVenir = await chargerCreneauxAVenir();

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-marine-900">Configuration des créneaux</h1>
      <SlotConfigurationTable creneaux={creneauxAVenir} />
    </div>
  );
}
