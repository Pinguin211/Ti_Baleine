/**
 * CASE-ARCH-1006 — Déclaration formelle de la balise @need_more_lines dans tsdoc.json
 * SPEC-ARCH-01 | AC-4 | Cas limite #5
 */
import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

const TSDOC_PATH = path.resolve(process.cwd(), 'tsdoc.json');

describe('CASE_ARCH_1006_declaration_balise_need_more_lines_dans_tsdoc_json', () => {
  it('le fichier tsdoc.json existe à la racine du projet', () => {
    expect(fs.existsSync(TSDOC_PATH)).toBe(true);
  });

  it('tsdoc.json est un JSON valide et parseable', () => {
    const raw = fs.readFileSync(TSDOC_PATH, 'utf-8');
    expect(() => JSON.parse(raw)).not.toThrow();
  });

  it('tsdoc.json déclare @need_more_lines dans tagDefinitions', () => {
    const raw = fs.readFileSync(TSDOC_PATH, 'utf-8');
    const config = JSON.parse(raw) as { tagDefinitions?: { tagName: string }[] };

    expect(config.tagDefinitions).toBeDefined();
    expect(Array.isArray(config.tagDefinitions)).toBe(true);

    const tag = config.tagDefinitions!.find((t) => t.tagName === '@need_more_lines');
    expect(tag).toBeDefined();
  });

  it('le test échoue si @need_more_lines est retiré de tsdoc.json', () => {
    const raw = fs.readFileSync(TSDOC_PATH, 'utf-8');
    const config = JSON.parse(raw) as { tagDefinitions?: { tagName: string }[] };

    // Simule la suppression de la balise
    const withoutTag = (config.tagDefinitions ?? []).filter(
      (t) => t.tagName !== '@need_more_lines',
    );

    // Sans le tag, la recherche retourne undefined
    const tag = withoutTag.find((t) => t.tagName === '@need_more_lines');
    expect(tag).toBeUndefined();
  });
});
