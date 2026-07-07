'use client';

import { useEffect, useState } from 'react';
import { Arrow } from '@/components/Primitives';

type CalEvent = { uid: string; summary: string; description: string; start: string };

const CALENDAR_URL = 'https://othersidecalendar.apechain.com/';

// Events are Otherside-community time (US Eastern). Display in ET so it reads
// the same for everyone, matching how the community announces game times.
const dayFmt = new Intl.DateTimeFormat('en-US', {
  weekday: 'short', month: 'short', day: 'numeric', timeZone: 'America/New_York'
});
const timeFmt = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric', minute: '2-digit', timeZoneName: 'short', timeZone: 'America/New_York'
});

export function EventsStrip() {
  const [events, setEvents] = useState<CalEvent[] | null>(null);

  useEffect(() => {
    let alive = true;
    fetch('/api/events')
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return;
        const list: CalEvent[] = Array.isArray(d.events) ? d.events : [];
        // Defensive: even if a cached response is stale, never show past events
        // (keep anything that started <1h ago — likely still live), max 6.
        const cutoff = Date.now() - 60 * 60 * 1000;
        setEvents(list.filter((e) => new Date(e.start).getTime() >= cutoff).slice(0, 6));
      })
      .catch(() => { if (alive) setEvents([]); });
    return () => { alive = false; };
  }, []);

  // Nothing upcoming or feed unavailable: still show the link out, not a dead section.
  const hasEvents = events && events.length > 0;

  return (
    <div className="events-panel">
      <div className="events-head">
        <span className="case-section-label">Play</span>
        <h2>Next games in the Otherside.</h2>
        <p>Live from the community calendar. Jump into a game night, a tournament, or a bubble session.</p>
        <a href={CALENDAR_URL} target="_blank" rel="noreferrer" className="button secondary events-cal-btn">
          Full calendar <Arrow />
        </a>
      </div>

      <div className="events-list">
        {events === null && <div className="event-row loading">Loading upcoming games…</div>}
        {events !== null && !hasEvents && (
          <a href={CALENDAR_URL} target="_blank" rel="noreferrer" className="event-row empty">
            <span>See what&apos;s coming up on the Otherside calendar</span>
            <Arrow />
          </a>
        )}
        {hasEvents &&
          events!.map((e) => {
            const d = new Date(e.start);
            return (
              <a href={CALENDAR_URL} target="_blank" rel="noreferrer" className="event-row" key={e.uid || e.start + e.summary}>
                <div className="event-when">
                  <span className="event-day">{dayFmt.format(d)}</span>
                  <span className="event-time">{timeFmt.format(d)}</span>
                </div>
                <div className="event-title">{e.summary}</div>
                <Arrow />
              </a>
            );
          })}
      </div>
    </div>
  );
}
