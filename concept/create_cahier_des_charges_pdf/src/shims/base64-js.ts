/**
 * @file shims/base64-js.ts
 * @description Polyfill de base64-js requis par @react-pdf/renderer dans un contexte Vite ESM.
 *
 * Vite résout 'base64-js' vers ce fichier via l'alias défini dans vite.config.ts.
 *
 * ⚠️ Le namespace ESM (`import * as`) ne se comporte pas comme l'objet CJS attendu
 * par @react-pdf/renderer — les méthodes doivent être extraites et ré-exportées
 * explicitement dans le default export.
 */
import { toByteArray, fromByteArray, byteLength } from 'base64-js'

// Named exports (pour les imports destructurés)
export { toByteArray, fromByteArray, byteLength }

// Default export explicite — @react-pdf/renderer appelle `base64js.toByteArray(...)`
export default { toByteArray, fromByteArray, byteLength }
