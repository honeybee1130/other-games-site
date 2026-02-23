import type { Metadata } from 'next'
import { Inter, Chakra_Petch } from 'next/font/google'
import './globals.css'
import { CustomCursor } from '@/components/CustomCursor'
import { SmoothScroll } from '@/components/SmoothScroll'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const chakra = Chakra_Petch({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-chakra' })

export const metadata: Metadata = {
  title: 'Other Games | Enter the Otherside',
  description: 'Premium gaming experiences in the Otherside metaverse. We create events, worlds, avatars, and wearables that turn brands into legends.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
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
      <body className={`${inter.variable} ${chakra.variable} ${inter.className} cursor-none`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <CustomCursor />
      </body>
    </html>
  )
}
