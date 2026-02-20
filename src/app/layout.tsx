import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CustomCursor } from '@/components/CustomCursor'
import { SmoothScroll } from '@/components/SmoothScroll'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Other Games | Enter the Otherside',
  description: 'Premium gaming experiences in the Otherside metaverse. We create events, worlds, avatars, and wearables that turn brands into legends.',
  openGraph: {
    title: 'Other Games | Enter the Otherside',
    description: 'Premium gaming experiences in the Otherside metaverse.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Other Games | Enter the Otherside',
    description: 'Premium gaming experiences in the Otherside metaverse.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} cursor-none`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <CustomCursor />
      </body>
    </html>
  )
}
