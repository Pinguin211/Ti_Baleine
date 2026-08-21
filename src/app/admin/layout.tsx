import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { cookies, headers } from 'next/headers';
import { verifierAccesRouteProtegee } from './garde-route-protegee';
import { ELEMENTS_MENU_ADMIN } from './configuration-menu-admin';
import { validerSessionUtilisateur } from '../../services/server/security/session-validator.service';
import { NOM_COOKIE_SESSION_ADMIN } from '../../actions/connecter-administrateur';
import { AdminHeader } from '../../components/common/admin-header';
import { AdminSidebar } from '../../components/common/admin-sidebar';
import type { SessionAdministrateur } from '../../schemas/types/auth.types';

/**
 * `/admin/login` est nichée sous ce layout (arborescence docs/signature.md)
 * mais ne doit jamais être concernée par la redirection ci-dessous, sous
 * peine de boucle : `verifierAccesRouteProtegee` accepte un paramètre `url`
 * mais ne l'exploite pas pour s'auto-exempter (contrat testé
 * CASE-ADMIN-035/039). L'exemption se fait donc ici, à l'appel, à partir du
 * chemin transmis par `middleware.ts`.
 */
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = (await headers()).get('x-pathname') ?? '';
  const magasin = await cookies();
  const token = magasin.get(NOM_COOKIE_SESSION_ADMIN)?.value;
  const sessionValide = token ? await validerSessionUtilisateur(token) : null;
  const session: SessionAdministrateur | null = sessionValide && token ? { token, ...sessionValide } : null;

  const resultat = verifierAccesRouteProtegee(
    { url: pathname, session },
    { horloge: { maintenant: () => new Date() } }
  );

  if (!resultat.accesAutorise && pathname !== '/admin/login') {
    redirect(resultat.redirection ?? '/admin/login');
  }

  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-sand-50">
      <AdminSidebar elements={ELEMENTS_MENU_ADMIN} />
      <div className="flex flex-1 flex-col">
        <AdminHeader emailAdmin={session.email} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
