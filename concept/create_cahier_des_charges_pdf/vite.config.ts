import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Plugin Vite qui redirige les imports de 'base64-js' vers le shim ESM,
 * SAUF quand l'import provient du shim lui-même (ce qui créerait une
 * référence circulaire rejetée par rolldown).
 *
 * Pourquoi un plugin et pas un alias ?
 * L'alias `'base64-js' → shims/base64-js.ts` est résolu de manière globale :
 * quand le shim importe 'base64-js', Vite le résout à nouveau vers le shim
 * → boucle infinie / CIRCULAR_REEXPORT.
 * Avec un plugin, on peut inspecter l'importer et court-circuiter la résolution.
 */
function base64JsShimPlugin(): Plugin {
  const shimPath = path.resolve(__dirname, 'src/shims/base64-js.ts')

  return {
    name: 'base64-js-shim',
    enforce: 'pre',
    resolveId(id, importer) {
      if (id !== 'base64-js') return undefined
      // Si l'import vient du shim lui-même, laisser la résolution normale
      // (node_modules/base64-js) s'effectuer.
      if (importer && path.resolve(importer) === shimPath) return undefined
      // Pour tout autre importeur, rediriger vers le shim.
      return shimPath
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), base64JsShimPlugin()],
  define: {
    // Polyfill global requis par certaines dépendances Node.js portées dans le navigateur
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['buffer', 'process', 'react-pdf', 'pdfjs-dist'],
  },
  server: {
    port: 7001,
    strictPort: true,
  },
  preview: {
    port: 7001,
    strictPort: true,
  },
})
