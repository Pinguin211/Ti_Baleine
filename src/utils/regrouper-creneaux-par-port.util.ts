/**
 * SPEC-ARCH-02 : `utils/` n'importe que `config/` — générique plutôt que
 * couplé à `CreneauAffiche` (`schemas/`) pour respecter cette étanchéité.
 */
export function regrouperParPort<T extends { port: string }>(items: readonly T[]): Map<string, T[]> {
  const parPort = new Map<string, T[]>();
  for (const item of items) {
    const groupe = parPort.get(item.port) ?? [];
    groupe.push(item);
    parPort.set(item.port, groupe);
  }
  return parPort;
}
