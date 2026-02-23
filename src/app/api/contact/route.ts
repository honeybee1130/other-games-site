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

  // Discord webhook
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL
  if (discordWebhook) {
    try {
      await fetch(discordWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: discordText }),
      })
    } catch (err) {
      console.error('Discord webhook failed:', err)
    }
  }

  // Telegram notification (direct to Honey B)
  const tgToken = process.env.TELEGRAM_BOT_TOKEN
  const tgChatId = process.env.TELEGRAM_CHAT_ID
  if (tgToken && tgChatId) {
    try {
      await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tgChatId,
          text: telegramText,
          parse_mode: 'Markdown',
        }),
      })
    } catch (err) {
      console.error('Telegram notification failed:', err)
    }
  }

  return NextResponse.json({ success: true })
}
