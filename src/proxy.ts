import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Transmet le chemin de la requête aux Server Components via un en-tête
 * (`headers()` ne l'expose pas nativement hors de ce fichier). Ne contient
 * aucune logique d'authentification : la garde réelle (SPEC-ADMIN-04) reste
 * dans `app/admin/layout.tsx`, seul capable d'exécuter la vérification
 * cryptographique de session en environnement Node.js (`node:crypto`, non
 * disponible dans le runtime Edge par défaut).
 *
 * `proxy.ts` remplace `middleware.ts` (convention dépréciée depuis Next.js
 * 16.3 — voir https://nextjs.org/docs/messages/middleware-to-proxy).
 */
export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: '/admin/:path*',
};
