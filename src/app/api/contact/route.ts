import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, handle, service, budget, description, email } = body

  if (!name || !service || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const discordText = [
    `🔥 **New Lead — Other Games**`,
    ``,
    `**Name:** ${name}`,
    `**Twitter/X:** ${handle || '—'}`,
    `**Email:** ${email}`,
    `**Service:** ${service}`,
    `**Budget:** ${budget || '—'}`,
    `**Message:** ${description || '—'}`,
  ].join('\n')

  const telegramText = [
    `🔥 *New Lead — Other Games*`,
    ``,
    `*Name:* ${name}`,
    `*Twitter/X:* ${handle || '—'}`,
    `*Email:* ${email}`,
    `*Service:* ${service}`,
    `*Budget:* ${budget || '—'}`,
    `*Message:* ${description || '—'}`,
  ].join('\n')

  const results: Record<string, string> = {}

  // Discord webhook
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL
  console.log('DISCORD_WEBHOOK_URL set:', !!discordWebhook)
  if (discordWebhook) {
    try {
      const dr = await fetch(discordWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: discordText }),
      })
      results.discord = `${dr.status}`
      console.log('Discord result:', dr.status)
    } catch (err) {
      results.discord = `error: ${err}`
      console.error('Discord webhook failed:', err)
    }
  } else {
    results.discord = 'no webhook url'
  }

  // Telegram notification (direct to Honey B)
  const tgToken = process.env.TELEGRAM_BOT_TOKEN
  const tgChatId = process.env.TELEGRAM_CHAT_ID
  console.log('TG vars set:', !!tgToken, !!tgChatId)
  if (tgToken && tgChatId) {
    try {
      const tr = await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tgChatId,
          text: telegramText,
          parse_mode: 'Markdown',
        }),
      })
      const trJson = await tr.json()
      results.telegram = `${tr.status}: ${JSON.stringify(trJson).slice(0, 100)}`
      console.log('Telegram result:', tr.status, JSON.stringify(trJson).slice(0, 100))
    } catch (err) {
      results.telegram = `error: ${err}`
      console.error('Telegram notification failed:', err)
    }
  } else {
    results.telegram = 'missing env vars'
  }

  return NextResponse.json({ success: true })
}
