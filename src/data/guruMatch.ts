import { knowledge, abuseKeywords, scopeKeywords, gField } from './guruKnowledge';

export type GuruReplyType = 'answer' | 'abuse' | 'outOfScope' | 'routeContact';

export interface GuruReply {
  type: GuruReplyType;
  text: string; // localized answer (empty for abuse — UI shows the chant)
  entryId?: string;
}

function normalize(q: string): string {
  return ` ${q.toLowerCase().trim()} `;
}

function hits(haystack: string, words: string[]): number {
  let n = 0;
  for (const w of words) {
    if (!w) continue;
    if (haystack.includes(w.toLowerCase())) n++;
  }
  return n;
}

// Decide how the guru should respond to a query.
export function matchGuru(query: string, locale: string): GuruReply {
  const q = normalize(query);
  if (q.trim().length === 0) return { type: 'outOfScope', text: '' };

  // 1) Abuse / offensive → chant (no textual answer).
  if (abuseKeywords.some((w) => q.includes(w.toLowerCase()))) {
    return { type: 'abuse', text: '' };
  }

  // 2) Best knowledge match by keyword hits.
  let best: { entry: (typeof knowledge)[number]; score: number } | null = null;
  for (const entry of knowledge) {
    const score = hits(q, entry.keywords);
    if (score > 0 && (!best || score > best.score)) best = { entry, score };
  }
  if (best) {
    return { type: 'answer', text: gField(best.entry.answer, locale), entryId: best.entry.id };
  }

  // 3) No match. If it touches our topics → route to the trust; else out of scope.
  const inScope = hits(q, scopeKeywords) > 0;
  return { type: inScope ? 'routeContact' : 'outOfScope', text: '' };
}
