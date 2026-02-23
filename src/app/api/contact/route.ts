import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, handle, service, budget, description, email } = body

  if (!name || !service || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const messageText = [
    `🔥 **New Lead — Other Games**`,
    ``,
    `**Name:** ${name}`,
    `**Twitter/X:** ${handle || 'not provided'}`,
    `**Email:** ${email}`,
    `**Service:** ${service}`,
    `**Budget:** ${budget}`,
    `**Message:** ${description || 'none'}`,
  ].join('\n')

  // Discord webhook notification
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL
  if (discordWebhook) {
    try {
      await fetch(discordWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: messageText }),
      })
    } catch (err) {
      console.error('Discord webhook failed:', err)
    }
  }

  // Email notification via Gmail
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.NOTIFY_EMAIL || process.env.GMAIL_USER,
      subject: `🔥 New Lead: ${name} — Other Games`,
      html: `
        <h2>New Lead from othergames.xyz</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
          <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Twitter/X</td><td style="padding:8px">${handle || '—'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Service</td><td style="padding:8px">${service}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Budget</td><td style="padding:8px">${budget}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Message</td><td style="padding:8px">${description || '—'}</td></tr>
        </table>
      `,
    })
  } catch (err) {
    console.error('Email failed:', err)
    // Don't fail the request if email fails — Discord already notified
  }

  return NextResponse.json({ success: true })
}
