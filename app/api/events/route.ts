// Pulls the community Otherside calendar feed and returns the next upcoming
// events as JSON. Cached/revalidated hourly so we hit the feed at most ~once
// an hour regardless of traffic. The feed is a standard iCal (.ics) file.

export const revalidate = 1800; // 30 minutes

const FEED_URL = 'https://othersidecalendar.apechain.com/api/calendar/feed.ics';

type CalEvent = { uid: string; summary: string; description: string; start: number };

function unescapeText(v: string): string {
  return v
    .replace(/\\n/gi, ' ')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\')
    .trim();
}

// Parse an iCal DTSTART value into epoch ms. Handles UTC (…Z), all-day dates,
// and falls back to a naive parse for TZID-qualified local times.
function parseStart(key: string, value: string): number | null {
  const v = value.trim();
  let m = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/.exec(v);
  if (m) {
    const [, y, mo, d, h, mi, s] = m.map(Number) as unknown as number[];
    return Date.UTC(y, mo - 1, d, h, mi, s);
  }
  m = /^(\d{4})(\d{2})(\d{2})$/.exec(v); // all-day
  if (m) {
    const [, y, mo, d] = m.map(Number) as unknown as number[];
    return Date.UTC(y, mo - 1, d);
  }
  m = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/.exec(v); // local/TZID — best effort
  if (m) {
    const [, y, mo, d, h, mi, s] = m.map(Number) as unknown as number[];
    return Date.UTC(y, mo - 1, d, h, mi, s);
  }
  return null;
}

function parseICS(text: string): CalEvent[] {
  // Unfold folded lines (continuation lines start with a space or tab).
  const unfolded = text.replace(/\r?\n[ \t]/g, '');
  const lines = unfolded.split(/\r?\n/);
  const events: CalEvent[] = [];
  let cur: Partial<CalEvent> | null = null;

  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') {
      cur = {};
    } else if (line === 'END:VEVENT') {
      if (cur && cur.start && cur.summary) {
        events.push({
          uid: cur.uid || '',
          summary: cur.summary,
          description: cur.description || '',
          start: cur.start
        });
      }
      cur = null;
    } else if (cur) {
      const idx = line.indexOf(':');
      if (idx === -1) continue;
      const key = line.slice(0, idx);
      const val = line.slice(idx + 1);
      const name = key.split(';')[0].toUpperCase();
      if (name === 'DTSTART') {
        const start = parseStart(key, val);
        if (start !== null) cur.start = start;
      } else if (name === 'SUMMARY') {
        cur.summary = unescapeText(val);
      } else if (name === 'DESCRIPTION') {
        cur.description = unescapeText(val);
      } else if (name === 'UID') {
        cur.uid = val.trim();
      }
    }
  }
  return events;
}

export async function GET() {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate } });
    if (!res.ok) throw new Error(`feed ${res.status}`);
    const text = await res.text();
    const now = Date.now();
    const events = parseICS(text)
      .filter((e) => e.start >= now)
      .sort((a, b) => a.start - b.start)
      .slice(0, 6)
      .map((e) => ({
        uid: e.uid,
        summary: e.summary,
        description: e.description.slice(0, 160),
        start: new Date(e.start).toISOString()
      }));
    return Response.json(
      { events },
      { headers: { 'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600' } }
    );
  } catch {
    return Response.json({ events: [] }, { status: 200 });
  }
}
