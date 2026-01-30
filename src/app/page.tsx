'use client'
import { useEffect, useState } from 'react'

const clients = [
  { name: 'Yuga Labs', img: '/logos/yuga.jpg' },
  { name: 'Otherside', img: '/logos/otherside.jpg' },
  { name: 'HyperPlay', img: '/logos/hyperplay.jpg' },
  { name: 'Solana', img: '/logos/solana.jpg' },
  { name: 'Arbitrum', img: '/logos/arbitrum.jpg' },
  { name: 'OpenPage', img: '/logos/openpage.jpg' },
  { name: 'BNB Chain', img: '/logos/bnb.png' },
  { name: 'ApeCoin', img: '/logos/apecoin.png' },
]

const services = [
  { icon: '/icons/game-events.png', title: 'Game Events', desc: 'Weekly "Game Time" series with 200+ attendance.' },
  { icon: '/icons/avatars.png', title: 'Avatars', desc: 'Custom branded avatars for your community.' },
  { icon: '/icons/worlds.png', title: 'Worlds', desc: 'ODK-prepped custom worlds for your brand.' },
  { icon: '/icons/wearables.png', title: 'Wearables', desc: 'In-game apparel via OpenPage partnership.' },
]

const stats = [
  { value: '15M+', label: 'Impressions', sub: 'Across 6 accounts', color: 'cyan' },
  { value: '200+', label: 'Attendance', sub: 'Per event', color: 'purple' },
  { value: '10.67%', label: 'Mindshare', sub: 'APE ecosystem', color: 'cyan' },
  { value: '30+', label: 'Events', sub: 'And counting', color: 'purple' },
]

const cases = [
  { tag: '5 Days', label: 'Yuga Labs Official', title: 'Nexus Launch', desc: 'Official launch event for Koda Nexus', img: '/nexus-launch.jpg', url: 'https://x.com/OtherGamesXYZ/status/1988673150775873629' },
  { tag: 'Campaign', label: 'Amazon Gaming x Otherside', title: 'Boximus', desc: 'Voyager avatar collaboration', img: '/boximus.png', url: 'https://x.com/OtherGamesXYZ/status/2002064207723065611' },
  { tag: 'Live Event', label: 'Apefest Vegas', title: 'HyperX Arena', desc: 'IRL Otherside gaming experience', img: '/hyperx-arena.jpg', url: 'https://x.com/OthersideMeta/status/1982262846340956295' },
]

const process = [
  { step: '01', title: 'Discovery Call', desc: 'We learn about your brand and goals.' },
  { step: '02', title: 'Experience Design', desc: 'Custom event with promo, avatars, worlds.' },
  { step: '03', title: 'Hype & Launch', desc: 'Pregame Space + livestreamed main event.' },
  { step: '04', title: 'Proof of Play', desc: '10K+ UGC posts driving organic reach.' },
]

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500)
    
    // Intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })
    
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Loading Screen */}
      <div className={`loading-screen ${!loading ? 'hidden' : ''}`}>
        <div className="flame-container">
          <div className="flame">
            <div className="flame-inner"></div>
            <div className="flame-inner"></div>
            <div className="flame-inner"></div>
          </div>
          <div className="flame-glow"></div>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <a href="/">
          <img src="/logo-blue.png" alt="Other Games" className="logo-img" width={36} height={36} />
        </a>
        <button className="menu-btn">Menu</button>
      </header>

      <main>
        {/* Hero */}
        <section className="hero-section">
          <div className="hero-glow"></div>
          <div className="hero-logo fade-in">
            <img src="/logo-blue.png" alt="Other Games" width={80} height={80} style={{borderRadius: 16}} />
          </div>
          <h2 className="hero-subheadline fade-in">
            We turn brands into <span className="text-gradient">unforgettable experiences</span> in the Otherside metaverse
          </h2>
          <p className="hero-value-prop fade-in">15M+ impressions • 200+ attendees • Partnered with Otherside & Apecoin</p>
          <div className="hero-cta fade-in">
            <a href="https://twitter.com/OtherGamesXYZ" target="_blank" className="btn-primary">Book a Call</a>
            <a href="#work" className="btn-ghost">See Our Work</a>
          </div>
          <div className="hero-clients fade-in">
            <p className="clients-label">Trusted by</p>
            <div className="clients-carousel">
              <div className="clients-track">
                {[...clients, ...clients].map((c, i) => (
                  <div key={i} className="client-item" title={c.name}>
                    <img src={c.img} alt={c.name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="section">
          <div className="container-sm text-center">
            <div className="fade-in">
              <p className="section-label">The Problem</p>
              <h2 className="section-title">The metaverse is <span className="text-dim">confusing</span>, <span className="text-dim">expensive</span>, and most activations <span className="text-dim">flop</span></h2>
              <p className="section-text">Brands spend months trying to figure out Otherside — only to launch events nobody attends. Without the right connections and promotional engine, your investment goes to waste.</p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section section-alt" id="services">
          <div className="container">
            <div className="text-center fade-in">
              <p className="section-label">The Solution</p>
              <h2 className="section-title">A-Z Gaming Experiences<br/><span className="text-gradient">Done For You</span></h2>
            </div>
            <div className="services-grid">
              {services.map((s, i) => (
                <div key={i} className="fade-in" style={{transitionDelay: `${i * 0.1}s`}}>
                  <div className="service-card">
                    <div className="service-icon"><img src={s.icon} alt={s.title} className="service-icon-img" /></div>
                    <h3 className="service-title">{s.title}</h3>
                    <p className="service-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="section">
          <div className="container-sm">
            <div className="text-center fade-in">
              <p className="section-label">How It Works</p>
              <h2 className="section-title">From Idea to Viral Event<br/>in 4 Simple Steps</h2>
            </div>
            <div style={{marginTop: 60}}>
              {process.map((p, i) => (
                <div key={i} className="fade-in" style={{transitionDelay: `${i * 0.1}s`, display: 'flex', gap: 24, marginBottom: 32, alignItems: 'flex-start'}}>
                  <div style={{color: i === 0 ? 'var(--cyan)' : 'var(--text-dim)', fontSize: '1.5rem', fontWeight: 700, minWidth: 50}}>{p.step}</div>
                  <div>
                    <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: 4}}>{p.title}</h3>
                    <p style={{color: 'var(--text-dim)'}}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="section section-alt">
          <div className="container">
            <div className="stats-grid">
              {stats.map((s, i) => (
                <div key={i} className="fade-in stat-item" style={{transitionDelay: `${i * 0.1}s`}}>
                  <div className={`stat-value ${s.color}`}>{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-subtext">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work */}
        <section className="section" id="work">
          <div className="container">
            <div className="text-center fade-in">
              <p className="section-label">Proof of Work</p>
              <h2 className="section-title">Events That Made Headlines</h2>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginTop: 60}}>
              {cases.map((c, i) => (
                <a key={i} href={c.url} target="_blank" className="fade-in" style={{transitionDelay: `${i * 0.15}s`, textDecoration: 'none', color: 'inherit'}}>
                  <div style={{background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 20, overflow: 'hidden', transition: 'all 0.5s', cursor: 'pointer'}}>
                    <div style={{position: 'relative', aspectRatio: '16/10', overflow: 'hidden', background: '#111'}}>
                      <img src={c.img} alt={c.title} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(30%)', transition: 'all 0.7s'}} />
                      <div style={{position: 'absolute', top: 16, left: 16, padding: '6px 14px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', borderRadius: 100, fontSize: 12, color: 'var(--cyan)', fontWeight: 500}}>{c.tag}</div>
                    </div>
                    <div style={{padding: 24}}>
                      <p style={{color: 'var(--purple)', fontSize: 12, fontWeight: 500, marginBottom: 8, letterSpacing: '0.05em'}}>{c.label}</p>
                      <h3 style={{fontSize: 20, fontWeight: 600, marginBottom: 8}}>{c.title}</h3>
                      <p style={{color: 'var(--text-dim)', fontSize: 14}}>{c.desc}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section" id="contact" style={{position: 'relative'}}>
          <div className="hero-glow" style={{top: '50%', transform: 'translate(-50%, -50%)'}}></div>
          <div className="container-sm text-center fade-in">
            <h2 className="section-title">Ready to Create Your<br/><span className="text-gradient">Otherside Moment?</span></h2>
            <p className="section-text" style={{marginBottom: 40}}>Join brands like Amazon, HyperX, and Yuga Labs who trusted us to bring their vision to life.</p>
            <a href="https://twitter.com/OtherGamesXYZ" target="_blank" className="btn-primary" style={{display: 'inline-block'}}>Let's Talk</a>
            <p style={{color: 'var(--text-dim)', marginTop: 20, fontSize: 14}}>DM us on X or email othergamesxyz@gmail.com</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            <img src="/logo-blue.png" alt="Other Games" width={48} height={48} style={{borderRadius: 12}} />
            <h2 className="brand-title">Other Games</h2>
            <p className="brand-desc">Premium gaming experiences in the Otherside metaverse. We create events, worlds, avatars, and wearables.</p>
          </div>
          <div>
            <h3 className="column-title cyan">Socials</h3>
            <ul className="column-list">
              <li><a href="https://twitter.com/OtherGamesXYZ" target="_blank" className="footer-link">Twitter</a></li>
              <li><a href="https://youtube.com/@othergamesx" target="_blank" className="footer-link">YouTube</a></li>
              <li><a href="https://twitch.tv/OtherGamesXYZ" target="_blank" className="footer-link">Twitch</a></li>
            </ul>
          </div>
          <div>
            <h3 className="column-title purple">Contact</h3>
            <ul className="column-list">
              <li><a href="mailto:othergamesxyz@gmail.com" className="footer-link">othergamesxyz@gmail.com</a></li>
              <li><a href="https://twitter.com/honeybd" target="_blank" className="footer-link">@honeybd</a></li>
              <li><a href="https://twitter.com/Timmygspt" target="_blank" className="footer-link">@Timmygspt</a></li>
              <li><a href="https://twitter.com/MakaveliDlaCruz" target="_blank" className="footer-link">@MakaveliDlaCruz</a></li>
              <li><a href="https://twitter.com/morethenhype" target="_blank" className="footer-link">@morethenhype</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Other Games. All rights reserved.</span>
          <span>Powered by <span className="cyan">Otherside</span></span>
        </div>
      </footer>
    </>
  )
}
