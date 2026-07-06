// Receives "Start a brief" submissions and files them into the Notion
// "Inbound Briefs" database. Requires two env vars on the host (Vercel):
//   NOTION_TOKEN        - an internal Notion integration secret
//   NOTION_BRIEFS_DB_ID - the Inbound Briefs database id (defaults below)
// The database must be shared with that integration in Notion.

const DEFAULT_DB_ID = '783b67ca-0ab5-4ff8-90a3-829d12d0bc88';
const BUDGETS = ['Under $5k', '$5k-$15k', '$15k+', 'Not sure'];

function rt(value: unknown) {
  return { rich_text: [{ text: { content: String(value ?? '').slice(0, 1900) } }] };
}

export async function POST(req: Request) {
  let data: Record<string, string>;
  try {
    data = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (data.company) return Response.json({ ok: true });

  const name = (data.name || '').trim();
  const contact = (data.contact || '').trim();
  const want = (data.want || '').trim();
  if (!name || !contact || !want) {
    return Response.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  }

  const token = process.env.NOTION_TOKEN;
  if (!token) {
    // Not configured yet — tell the client to fall back to email so no lead is lost.
    return Response.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }
  const dbId = process.env.NOTION_BRIEFS_DB_ID || DEFAULT_DB_ID;

  const properties: Record<string, unknown> = {
    Name: { title: [{ text: { content: name.slice(0, 200) } }] },
    'Brand / Project': rt(data.brand),
    'Community / World': rt(data.community),
    'Audience Size': rt(data.audience),
    'What They Want': rt(want),
    Timing: rt(data.timing),
    Contact: rt(contact),
    Source: rt('Website brief'),
    Status: { select: { name: 'New' } },
    Submitted: { date: { start: new Date().toISOString() } }
  };
  if (data.budget && BUDGETS.includes(data.budget)) {
    properties.Budget = { select: { name: data.budget } };
  }

  try {
    const r = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify({ parent: { database_id: dbId }, properties })
    });
    if (!r.ok) {
      return Response.json({ ok: false, error: 'notion_error' }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: 'network' }, { status: 502 });
  }
}
