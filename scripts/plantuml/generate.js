#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const plantumlEncoder = require('plantuml-encoder');

const ROOT_DIR = path.resolve(__dirname, '../..');
const DEFAULT_UML_DIR = path.join(ROOT_DIR, 'docs/uml');

/**
 * Affiche l'aide
 */
function showHelp() {
  console.log(`
Usage :
  npm run puml:generate [-- [options] [cible]]
  node scripts/plantuml/generate.js [options] [cible]

Options :
  -s, --skip-existing, --only-missing   Ne régénère pas les fichiers SVG s'ils existent déjà
  -h, --help                            Affiche ce message d'aide

Cible (optionnel) :
  Chemin relatif ou absolu d'un fichier .puml ou d'un sous-dossier, ou nom de fichier.
  Si omis, analyse récursivement "docs/uml/".

Exemples :
  npm run puml:generate
  npm run puml:generate -- --skip-existing
  npm run puml:generate -- -s docs/uml/mld
  npm run puml:generate docs/uml/mld/mld.puml
`);
}

/**
 * Analyse les arguments CLI (flags et cible)
 * @param {string[]} args 
 * @returns {{ target: string | null, skipExisting: boolean, help: boolean }}
 */
function parseArgs(args) {
  let target = null;
  let skipExisting = false;
  let help = false;

  for (const arg of args) {
    if (arg === '-h' || arg === '--help') {
      help = true;
    } else if (
      arg === '-s' ||
      arg === '--skip-existing' ||
      arg === '--skip' ||
      arg === '--only-missing' ||
      arg === '--no-overwrite'
    ) {
      skipExisting = true;
    } else if (!arg.startsWith('-')) {
      target = arg;
    }
  }

  return { target, skipExisting, help };
}

/**
 * Recherche récursivement tous les fichiers .puml dans un répertoire.
 * @param {string} dirPath 
 * @returns {string[]} Liste des chemins absolus vers les fichiers .puml
 */
function findPumlFilesRecursively(dirPath) {
  let results = [];
  if (!fs.existsSync(dirPath)) {
    return results;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findPumlFilesRecursively(fullPath));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.puml')) {
      results.push(fullPath);
    }
  }

  return results;
}

/**
 * Résout la liste des fichiers .puml à traiter selon l'argument fourni.
 * @param {string} [specified] 
 * @returns {string[]}
 */
function resolveTargets(specified) {
  if (!specified) {
    return findPumlFilesRecursively(DEFAULT_UML_DIR);
  }

  // 1. Essai chemin absolu ou relatif direct au CWD
  let resolvedPath = path.resolve(process.cwd(), specified);
  if (fs.existsSync(resolvedPath)) {
    const stat = fs.statSync(resolvedPath);
    if (stat.isDirectory()) {
      return findPumlFilesRecursively(resolvedPath);
    }
    if (stat.isFile()) {
      return [resolvedPath];
    }
  }

  // 2. Essai relatif au dossier racine du projet
  resolvedPath = path.resolve(ROOT_DIR, specified);
  if (fs.existsSync(resolvedPath)) {
    const stat = fs.statSync(resolvedPath);
    if (stat.isDirectory()) {
      return findPumlFilesRecursively(resolvedPath);
    }
    if (stat.isFile()) {
      return [resolvedPath];
    }
  }

  // 3. Essai relatif à docs/uml
  resolvedPath = path.resolve(DEFAULT_UML_DIR, specified);
  if (fs.existsSync(resolvedPath)) {
    const stat = fs.statSync(resolvedPath);
    if (stat.isDirectory()) {
      return findPumlFilesRecursively(resolvedPath);
    }
    if (stat.isFile()) {
      return [resolvedPath];
    }
  }

  // 4. Recherche par nom de fichier dans docs/uml si c'est un simple nom (ex: "mld.puml")
  const allFiles = findPumlFilesRecursively(DEFAULT_UML_DIR);
  const matched = allFiles.filter(file => path.basename(file).toLowerCase() === specified.toLowerCase());
  if (matched.length > 0) {
    return matched;
  }

  console.error(`❌ Fichier ou dossier introuvable : "${specified}"`);
  process.exit(1);
}

/**
 * Convertit un fichier .puml en .svg via le serveur PlantUML.
 * @param {string} filePath 
 * @param {number} index
 * @param {number} total
 * @param {{ skipExisting: boolean }} options
 * @returns {Promise<'success' | 'skipped' | 'error'>}
 */
async function generateSvgForFile(filePath, index, total, options) {
  const relPath = path.relative(ROOT_DIR, filePath);
  const targetSvgPath = filePath.replace(/\.puml$/i, '.svg');
  const relSvgPath = path.relative(ROOT_DIR, targetSvgPath);
  const startTime = Date.now();

  console.log(`\n[${index}/${total}] 📄 Traitement : ${relPath}`);

  // Vérification de l'option skipExisting
  if (options.skipExisting && fs.existsSync(targetSvgPath)) {
    console.log(`   ⏭️  [SKIP] Le fichier SVG existe déjà : ${relSvgPath}`);
    return 'skipped';
  }

  try {
    // 1. Lecture du fichier
    console.log(`   📖 Lecture du fichier source...`);
    const pumlContent = fs.readFileSync(filePath, 'utf-8');

    // 2. Encodage PlantUML
    console.log(`   ⚙️  Encodage PlantUML...`);
    const encoded = plantumlEncoder.encode(pumlContent);
    const urlSVG = `https://www.plantuml.com/plantuml/svg/${encoded}`;
    console.log(`   🌐 Requête HTTP : ${urlSVG.slice(0, 75)}...`);

    // 3. Téléchargement SVG avec timeout de 15s
    console.log(`   ⏳ En attente de réponse du serveur PlantUML...`);
    const response = await fetch(urlSVG, {
      signal: AbortSignal.timeout(15000), // Timeout 15s
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status} (${response.statusText})`);
    }

    // 4. Lecture du contenu SVG
    const svgContent = await response.text();
    const sizeKb = (Buffer.byteLength(svgContent, 'utf-8') / 1024).toFixed(2);
    console.log(`   📥 SVG reçu avec succès (${sizeKb} Ko).`);

    // 5. Sauvegarde sur disque
    console.log(`   💾 Écriture dans : ${relSvgPath}`);
    fs.writeFileSync(targetSvgPath, svgContent, 'utf-8');

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`   ✔ [OK] Diagramme généré en ${duration}s.`);
    return 'success';
  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    if (error.name === 'TimeoutError') {
      console.error(`   ✖ [TIMEOUT] La requête a expiré après 15s pour ${relPath}`);
    } else {
      console.error(`   ✖ [ERREUR] Impossible de générer ${relPath} (${duration}s) : ${error.message}`);
    }
    return 'error';
  }
}

/**
 * Point d'entrée principal
 */
async function main() {
  const parsed = parseArgs(process.argv.slice(2));

  if (parsed.help) {
    showHelp();
    return;
  }

  console.log('========================================');
  console.log('🚀 Générateur SVG PlantUML');
  console.log('========================================');

  if (parsed.skipExisting) {
    console.log('⚡ Mode : Ignorer les fichiers SVG déjà existants (--skip-existing)');
  }

  if (parsed.target) {
    console.log(`🎯 Cible demandée : ${parsed.target}`);
  } else {
    console.log(`📁 Répertoire analysé : ${path.relative(ROOT_DIR, DEFAULT_UML_DIR)}/`);
  }

  console.log(`🔍 Recherche des fichiers .puml...`);
  const targets = resolveTargets(parsed.target);

  if (targets.length === 0) {
    console.log('⚠️ Aucun fichier .puml trouvé.');
    return;
  }

  console.log(`📌 ${targets.length} fichier(s) .puml trouvé(s) à traiter.`);

  let successCount = 0;
  let skippedCount = 0;
  let errorCount = 0;
  const globalStartTime = Date.now();

  for (let i = 0; i < targets.length; i++) {
    const filePath = targets[i];
    const status = await generateSvgForFile(filePath, i + 1, targets.length, {
      skipExisting: parsed.skipExisting,
    });

    if (status === 'success') {
      successCount++;
    } else if (status === 'skipped') {
      skippedCount++;
    } else {
      errorCount++;
    }
  }

  const totalDuration = ((Date.now() - globalStartTime) / 1000).toFixed(2);

  console.log('\n========================================');
  console.log('📊 Résumé de l\'exécution');
  console.log('========================================');
  console.log(`⏱️  Temps total : ${totalDuration}s`);
  console.log(`✅ Générés     : ${successCount}`);
  if (skippedCount > 0) {
    console.log(`⏭️  Ignorés     : ${skippedCount} (déjà existants)`);
  }
  if (errorCount > 0) {
    console.log(`❌ Échecs      : ${errorCount}`);
    process.exitCode = 1;
  } else {
    console.log('🎉 Terminé avec succès !');
  }
}

main().catch(err => {
  console.error('Erreur inattendue :', err);
  process.exit(1);
});
