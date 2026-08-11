'use client';

import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { activations, capabilities, partners } from '@/lib/activations';
import { Arrow, Mark } from '@/components/Primitives';
import { ActivationCard } from '@/components/ActivationCard';
import { EventsStrip } from '@/components/EventsStrip';
import { BriefForm } from '@/components/BriefForm';

const fade = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.75, ease: 'easeOut' }
} as const;

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -180]);
  const mediaY = useTransform(scrollYProgress, [0, 0.35], [0, 120]);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    let frame = 0;
    let lenis: Lenis | undefined;
    if (!reduce) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      const raf = (time: number) => {
        lenis!.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    }

    const move = (event: MouseEvent) => {
      cursorX.set(event.clientX - 18);
      cursorY.set(event.clientY - 18);
    };
    if (finePointer && !reduce) window.addEventListener('mousemove', move);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', move);
      lenis?.destroy();
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
      <motion.div className="cursor" style={{ x: cursorX, y: cursorY }} />
      <div className="grain" />

      <header className="nav-shell">
        <Link href="/" className="nav-brand" aria-label="Other Games home">
          <Image src="/logo-blue.png" alt="Other Games" width={34} height={34} priority />
          <span>Other Games</span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#events">Events</a>
          <a href="#work">Activations</a>
          <a href="#partners">Partners</a>
          <a href="#studio">Studio</a>
          <Link href="/mag">Mag</Link>
          <a href="#start" className="nav-pill">Start a brief</a>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <motion.div className="hero-copy" style={{ y: heroY }}>
            <motion.div className="kicker" {...fade}>
              <span className="pulse" /> Premium playable experiences
            </motion.div>
            <motion.h1 {...fade} transition={{ ...fade.transition, delay: 0.08 }}>
              Live games.<br />Lasting culture.
            </motion.h1>
            <motion.p className="hero-subtitle" {...fade} transition={{ ...fade.transition, delay: 0.16 }}>
              Other Games designs live competitions, branded activations, and community moments for the worlds shaping web3 culture.
            </motion.p>
            <motion.div className="hero-actions" {...fade} transition={{ ...fade.transition, delay: 0.24 }}>
              <a href="#work" className="button primary">View activations <Arrow /></a>
              <a href="#start" className="button secondary">Build with us</a>
            </motion.div>
          </motion.div>

          <motion.a
            className="mag-sticker"
            href="https://honeyb-ogmag.vercel.app"
            target="_blank"
            rel="noreferrer"
            aria-label="Read OG MAG Vol. 01: LUCK"
            initial={{ opacity: 0, scale: 0.6, rotate: -14 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={{ delay: 1, duration: 0.5, type: 'spring', bounce: 0.55 }}
            whileHover={{ scale: 1.08, rotate: -4 }}
          >
            <Image src="/logos/apechurch.png" alt="" width={40} height={40} />
            <span className="mag-sticker-text">
              <b>OG LUCK</b>
              <i>the mag is out — read it</i>
            </span>
          </motion.a>

          <motion.div className="hero-media" style={{ y: mediaY }}>
            <div className="media-frame large">
              <Image src="/hyperx-arena.jpg" alt="Other Games live activation" fill sizes="(max-width: 900px) 100vw, 48vw" priority className="cover" />
              <div className="frame-label">ApeFest Vegas / HyperX Arena</div>
            </div>
            <div className="media-frame small one">
              <Image src="/nexus-launch.jpg" alt="Nexus Launch" fill sizes="280px" className="cover" />
            </div>
            <div className="media-frame small two">
              <Image src="/boximus.png" alt="Boximus campaign" fill sizes="240px" className="cover" />
            </div>
          </motion.div>
        </section>

        <section className="manifesto-section">
          <motion.div className="section-number" {...fade}>01</motion.div>
          <motion.div className="manifesto-copy" {...fade}>
            <p>
              We do not make empty metaverse events. We build the rooms people enter, the games they remember, and the proof they post after the moment is over.
            </p>
          </motion.div>
        </section>

        <section className="events-section" id="events">
          <EventsStrip />
        </section>

        <section className="partners-section" id="partners">
          <motion.div className="section-head" {...fade}>
            <span>Trusted worlds</span>
            <h2>Built with the brands already shaping the culture.</h2>
          </motion.div>
          <div className="partner-marquee" aria-label="Partner logos">
            {[...partners, ...partners].map((partner, index) => (
              <div className="partner-card" key={`${partner.name}-${index}`}>
                <Image src={partner.logo} alt={partner.name} width={94} height={54} />
                <span>{partner.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="work-section" id="work">
          <motion.div className="section-head wide" {...fade}>
            <span>Activations</span>
            <h2>Portfolio pieces built to be played, clipped, and talked about.</h2>
            <p>Inspired by luxury case-study archives: strong covers, direct context, and social receipts where community reaction matters more than a KPI wall.</p>
          </motion.div>

          <div className="activation-grid">
            {activations.map((activation, index) => (
              <motion.div key={activation.slug} {...fade} transition={{ ...fade.transition, delay: Math.min(index, 5) * 0.06 }}>
                <ActivationCard activation={activation} index={index} />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="studio-section" id="studio">
          <div className="studio-sticky">
            <motion.div className="section-head" {...fade}>
              <span>Studio</span>
              <h2>A-Z activation design for communities that already have attention.</h2>
            </motion.div>
          </div>
          <div className="capability-list">
            {capabilities.map((item, index) => (
              <motion.div className="capability-row" key={item} {...fade}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item}</h3>
                <Mark />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="cta-section" id="start">
          <motion.div className="cta-panel" {...fade}>
            <span className="kicker"><span className="pulse" /> Now booking partner moments</span>
            <h2>Pitch us your activation.</h2>
            <p>Bring the community and the moment. We shape the format, run it live in-world, and hand you the clips. Tell us what you want to build.</p>
            <BriefForm />
          </motion.div>
        </section>
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
