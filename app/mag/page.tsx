import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { mags } from '@/lib/mags';

export const metadata: Metadata = {
  title: 'OG MAG — Other Games',
  description: 'The Other Games magazine catalogue. One theme per volume.'
};

export default function MagPage() {
  return (
    <>
      <div className="grain" />
      <header className="nav-shell">
        <Link href="/" className="nav-brand" aria-label="Other Games home">
          <Image src="/logo-blue.png" alt="Other Games" width={34} height={34} priority />
          <span>Other Games</span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          <Link href="/#events">Events</Link>
          <Link href="/#work">Activations</Link>
          <Link href="/mag" aria-current="page">Mag</Link>
          <Link href="/#start" className="nav-pill">Start a brief</Link>
        </nav>
      </header>

      <main className="mag-page">
        <div className="section-head wide mag-head">
          <span>OG MAG</span>
          <h2>A magazine. Sometimes.</h2>
          <p>
            one theme per volume. done completely, then abandoned. free to read.
            being featured in one costs more than you think.
          </p>
        </div>

        <div className="mag-grid">
          {mags.map((mag) => (
            <a className="mag-card" key={mag.slug} href={mag.href} target="_blank" rel="noreferrer" style={{ ['--accent' as string]: mag.accent }}>
              <div className="mag-cover">
                <Image src={mag.cover} alt={`OG MAG ${mag.volume}: ${mag.theme}`} fill sizes="(max-width: 700px) 84vw, 340px" className="cover" priority />
                <div className="mag-cover-type">
                  <span className="mag-title">OG&nbsp;MAG</span>
                  <span className="mag-vol">{mag.volume}: {mag.theme}</span>
                </div>
                <div className="mag-barcode">$0 OR YOUR SOUL</div>
              </div>
              <div className="mag-meta">
                <span className="mag-date">{mag.date}</span>
                <p>{mag.tagline}</p>
                <span className="mag-read">Read it →</span>
              </div>
            </a>
          ))}

          <div className="mag-card mag-card-next">
            <div className="mag-cover mag-cover-empty">
              <span>VOL. 02</span>
              <span className="mag-soon">theme tba</span>
            </div>
            <div className="mag-meta">
              <span className="mag-date">SOON</span>
              <p>the catalogue grows when something happens to enough people.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div>
          <Image src="/logo-blue.png" alt="Other Games" width={44} height={44} />
          <p>Other Games creates premium playable experiences for digital communities.</p>
        </div>
        <div className="footer-links">
          <a href="https://x.com/OtherGamesXYZ" target="_blank" rel="noreferrer">X</a>
          <a href="https://youtube.com/@othergamesx" target="_blank" rel="noreferrer">YouTube</a>
          <a href="https://twitch.tv/OtherGamesXYZ" target="_blank" rel="noreferrer">Twitch</a>
        </div>
      </footer>
    </>
  );
}
