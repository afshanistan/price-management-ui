/*
  Vendor search (decision log, "Step 1 pressure test: decisions"):
  - Matching ignores case, accents, punctuation, hyphens and spaces: "nestle" finds Nestlé,
    "campbells" finds Campbell's, "coca cola" finds Coca-Cola, "land o lakes" finds Land O'Lakes.
  - Results are ordered by best match: the name starts with the query, then a word in it does,
    then the query appears anywhere. Ties keep the list's order.
  - An ESN matches from its first digit only.
*/

/** Each character's searchable form: lowercase letters and digits only, accents removed. */
function fold(char: string) {
  return char.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '')
}

/** The folded text, plus where each folded character came from in the original. */
function folded(text: string) {
  let value = ''
  const origin: number[] = []
  let i = 0
  for (const char of text) {
    for (const c of fold(char)) {
      value += c
      origin.push(i)
    }
    i += char.length
  }
  return { value, origin }
}

/** Where words start in the folded text (after a space, hyphen or other separator in the original). */
function wordStarts(text: string, origin: number[]) {
  return origin.flatMap((index, k) => (k === 0 || /[^\p{L}\p{N}'’.]/u.test(text[index - 1] ?? ' ') ? [k] : []))
}

export type MatchRank = 0 | 1 | 2

/**
 * The best place the query matches in the text: its rank (0 = the text starts with it,
 * 1 = a word starts with it, 2 = anywhere) and the matched range in the original text.
 */
export function findMatch(text: string, query: string): { rank: MatchRank; start: number; end: number } | null {
  const q = folded(query).value
  if (!q) return null
  const t = folded(text)
  const at = (k: number) => ({ start: t.origin[k], end: t.origin[k + q.length - 1] + 1 })
  if (t.value.startsWith(q)) return { rank: 0, ...at(0) }
  const word = wordStarts(text, t.origin).find((k) => t.value.startsWith(q, k))
  if (word !== undefined) return { rank: 1, ...at(word) }
  const k = t.value.indexOf(q)
  return k >= 0 ? { rank: 2, ...at(k) } : null
}

/** An ESN matches from its first digit: "0563" finds 05631234, "563" doesn't. */
export function findPrefix(text: string, query: string): { start: number; end: number } | null {
  const q = folded(query).value
  return q && folded(text).value.startsWith(q) ? { start: 0, end: q.length } : null
}

/** Vendors matching the query by name or ESN, best match first. An empty query returns them all. */
export function searchVendors<V extends { name: string; esn: string }>(vendors: V[], query: string): V[] {
  if (!folded(query).value) return vendors
  return vendors
    .map((vendor, index) => {
      const name = findMatch(vendor.name, query)
      // An ESN-only match ranks after every name match.
      const rank = name ? name.rank : findPrefix(vendor.esn, query) ? 3 : null
      return { vendor, index, rank }
    })
    .filter((r) => r.rank !== null)
    .sort((a, b) => a.rank! - b.rank! || a.index - b.index)
    .map((r) => r.vendor)
}
