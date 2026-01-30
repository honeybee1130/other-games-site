import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Other Games | Metaverse Gaming Experiences',
  description: 'Premium gaming experiences in the Otherside metaverse. Events, worlds, avatars, and wearables.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
