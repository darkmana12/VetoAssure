/**
 * « 2026-05-03 » → « 3 mai 2026 » ; « 2026-05-01 » → « 1er mai 2026 ».
 *
 * Les dates du frontmatter sont stockées en ISO (AAAA-MM-JJ) et s'affichaient telles
 * quelles dans les pages. Formatage en UTC pour qu'une date ISO ne glisse pas d'un
 * jour selon le fuseau du serveur de build. Une valeur non reconnue est renvoyée
 * brute plutôt que de casser l'affichage.
 */
export function formatDateFr(value: unknown): string {
  if (value instanceof Date || typeof value === 'string') {
    const d = value instanceof Date ? value : new Date(value)
    if (!isNaN(d.getTime())) {
      return d
        .toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
        .replace(/^1 /, '1er ')
    }
  }
  return value == null ? '' : String(value)
}
