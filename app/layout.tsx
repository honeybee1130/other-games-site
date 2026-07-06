import type { Metadata } from 'next';
import { Bebas_Neue, Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-bebas', display: 'swap' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-inter', display: 'swap' });
const plex = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-plex', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://othergames.xyz'),
  title: 'Other Games | Live games. Lasting culture.',
  description: 'Premium playable activations, live competitions, and brand moments for web3 culture.',
  openGraph: {
    title: 'Other Games | Live games. Lasting culture.',
    description: 'Premium playable activations, live competitions, and brand moments for web3 culture.',
    images: ['/hyperx-arena.jpg']
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bebas.variable} ${inter.variable} ${plex.variable}`}>
      <body>{children}</body>
    </html>
  );
}
