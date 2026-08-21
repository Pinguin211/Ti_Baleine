import { listerCreneauxCiblesAlerteDuLendemain } from '../../../services/server/alerts/lister-creneaux-cibles-alerte.service';
import { CATALOGUE_TEMPLATES_ALERTE, composerMessageBilingue } from '../../../services/server/alerts/templates-alerte';
import { AlertComposeModal } from '../../../components/domain/alerts/alert-compose-modal';

export default async function PageAlertesAdmin() {
  const creneaux = await listerCreneauxCiblesAlerteDuLendemain(new Date());
  const templates = Object.values(CATALOGUE_TEMPLATES_ALERTE).map((template) => ({
    cle: template.cle,
    titre: template.titre,
    message: composerMessageBilingue(template.texteFr, template.texteEn),
  }));

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-marine-900">Alertes météo — diffusion du lendemain</h1>
      <AlertComposeModal creneauxDisponibles={creneaux} templates={templates} />
    </div>
  );
}
