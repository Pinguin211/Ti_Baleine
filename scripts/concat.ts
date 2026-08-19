/**
 * scripts/concat.ts
 *
 * Script de concaténation de fichiers numérotés d'un dossier.
 * Usage : npm run concat <chemin-vers-dossier>
 * Exemple : npm run concat docs/prompt/test/admin
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

interface MatchedFile {
  filename: string;
  fullPath: string;
  prefix: string;
  num: number;
  rawNum: string;
  suffix: string;
  template: string;
}

export function concatNumberedFiles(targetDirArg?: string, customOutputDir?: string) {
  const rootDir = process.cwd();

  // 1. Récupération du dossier cible
  const rawTarget = targetDirArg ?? process.argv.slice(2).find((arg) => !arg.startsWith('--'));

  if (!rawTarget) {
    console.error('❌ Erreur : Veuillez spécifier un chemin de dossier.');
    console.error('Usage : npm run concat <chemin-vers-dossier>');
    console.error('Exemple : npm run concat docs/prompt/test/admin\n');
    process.exit(1);
  }

  const targetDir = path.isAbsolute(rawTarget)
    ? rawTarget
    : path.resolve(rootDir, rawTarget);

  if (!fs.existsSync(targetDir)) {
    console.error(`❌ Erreur : Le dossier "${rawTarget}" n'existe pas.`);
    process.exit(1);
  }

  const stat = fs.statSync(targetDir);
  if (!stat.isDirectory()) {
    console.error(`❌ Erreur : Le chemin "${rawTarget}" n'est pas un dossier.`);
    process.exit(1);
  }

  // 2. Lecture des fichiers réguliers du dossier
  const entries = fs.readdirSync(targetDir, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile() && !e.name.startsWith('.'));

  if (files.length === 0) {
    console.warn(`⚠️ Avertissement : Le dossier "${rawTarget}" est vide.`);
    return null;
  }

  // 3. Détection par Regex du motif avec numéro
  // Capture : (préfixe)(nombre)(suffixe/extension)
  const regex = /^(.*?)(\d+)(.*)$/;
  const matchedFiles: MatchedFile[] = [];
  const templateGroups = new Map<string, MatchedFile[]>();

  for (const f of files) {
    const match = f.name.match(regex);
    if (match) {
      const prefix = match[1];
      const rawNum = match[2];
      const suffix = match[3];
      const num = parseInt(rawNum, 10);
      const template = `${prefix.toLowerCase()}{NUM}${suffix.toLowerCase()}`;

      const item: MatchedFile = {
        filename: f.name,
        fullPath: path.join(targetDir, f.name),
        prefix,
        num,
        rawNum,
        suffix,
        template,
      };

      matchedFiles.push(item);
      const group = templateGroups.get(template) ?? [];
      group.push(item);
      templateGroups.set(template, group);
    }
  }

  if (matchedFiles.length === 0) {
    console.error(`❌ Aucun fichier contenant un identifiant numérique n'a été trouvé dans "${rawTarget}".`);
    process.exit(1);
  }

  // 4. Sélection du format de nommage dominant
  let dominantTemplate = '';
  let dominantGroup: MatchedFile[] = [];

  for (const [template, group] of templateGroups.entries()) {
    if (group.length > dominantGroup.length) {
      dominantTemplate = template;
      dominantGroup = group;
    }
  }

  // 5. Tri des fichiers par ordre numérique croissant
  dominantGroup.sort((a, b) => a.num - b.num);

  // 6. Détermination du nom de fichier de sortie dans out/
  const dirName = path.basename(targetDir).toLowerCase();
  let outFileName: string;

  // Déduit un nom propre : ex. prompt-admin-all.md, prompt-facturation-all.md
  if (dominantGroup[0].prefix.toLowerCase().startsWith('prompt')) {
    outFileName = `prompt-${dirName}-all.md`;
  } else {
    const cleanPrefix = dominantGroup[0].prefix.replace(/[-_.]+$/, '').toLowerCase();
    outFileName = cleanPrefix
      ? `${cleanPrefix}-${dirName}-all${dominantGroup[0].suffix || '.md'}`
      : `${dirName}-all${dominantGroup[0].suffix || '.md'}`;
  }

  // 7. Concaténation des contenus
  const outDir = customOutputDir ?? path.resolve(rootDir, 'out');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const separator = '\n\n---\n\n';
  const concatenatedContent = dominantGroup
    .map((item, index) => {
      const content = fs.readFileSync(item.fullPath, 'utf-8').trim();
      return `<!-- ============================================================ -->\n<!-- [${index + 1}/${dominantGroup.length}] Fichier : ${item.filename} -->\n<!-- ============================================================ -->\n\n${content}`;
    })
    .join(separator);

  const outFilePath = path.join(outDir, outFileName);
  fs.writeFileSync(outFilePath, concatenatedContent + '\n', 'utf-8');

  // 8. Rapport console
  console.log('\n============================================================');
  console.log(' Concaténation de fichiers numérotés');
  console.log('============================================================');
  console.log(` Dossier source      : ${path.relative(rootDir, targetDir) || targetDir}`);
  console.log(` Format identifié    : "${dominantTemplate}"`);
  console.log(` Fichiers concaténés : ${dominantGroup.length} fichier(s)`);
  console.log(` Plage de numéros    : ${dominantGroup[0].rawNum} ➔ ${dominantGroup[dominantGroup.length - 1].rawNum}`);
  console.log(` Fichier généré      : ${path.relative(rootDir, outFilePath)}`);
  console.log('============================================================\n');

  return {
    outFilePath,
    count: dominantGroup.length,
    firstNum: dominantGroup[0].rawNum,
    lastNum: dominantGroup[dominantGroup.length - 1].rawNum,
  };
}

// Exécution directe en CLI
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('concat.ts')) {
  concatNumberedFiles();
}
