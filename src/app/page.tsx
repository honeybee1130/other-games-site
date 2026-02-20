'use client'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import { SplitText } from '../utils/SplitText'

// Dynamic import for 3D scene (no SSR)
const HeroScene = dynamic(() => import('../components/HeroScene').then(mod => mod.HeroScene), {
  ssr: false,
  loading: () => null
})

gsap.registerPlugin(ScrollTrigger)

// Data
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
  { icon: '/icons/game-events.png', title: 'Game Events', desc: 'Weekly immersive experiences with 200+ attendance.' },
  { icon: '/icons/avatars.png', title: 'Avatars', desc: 'Custom branded avatars that represent your community.' },
  { icon: '/icons/worlds.png', title: 'Worlds', desc: 'ODK-prepped custom worlds built for your brand.' },
  { icon: '/icons/wearables.png', title: 'Wearables', desc: 'In-game apparel via OpenPage partnership.' },
]

const cases = [
  { tag: '5 Days', label: 'Yuga Labs Official', title: 'Nexus Launch', desc: 'Official launch event for Koda Nexus', img: '/nexus-launch.jpg', url: 'https://x.com/OtherGamesXYZ/status/1988673150775873629' },
  { tag: 'Campaign', label: 'Amazon Gaming x Otherside', title: 'Boximus', desc: 'Voyager avatar collaboration', img: '/boximus.png', url: 'https://x.com/OtherGamesXYZ/status/2002064207723065611' },
  { tag: 'Live Event', label: 'Apefest Vegas', title: 'HyperX Arena', desc: 'IRL Otherside gaming experience', img: '/hyperx-arena.jpg', url: 'https://x.com/OthersideMeta/status/1982262846340956295' },
]

const stats = [
  { value: 15, suffix: 'M+', label: 'Impressions' },
  { value: 200, suffix: '+', label: 'Per Event' },
  { value: 10.67, suffix: '%', label: 'Mindshare' },
  { value: 30, suffix: '+', label: 'Events' },
]

// Scramble text effect
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
const scrambleText = (element: HTMLElement, finalText: string, duration: number = 1000) => {
  const iterations = 20
  const stepDuration = duration / iterations
  let currentIteration = 0
  
  const interval = setInterval(() => {
    element.textContent = finalText
      .split('')
      .map((char, index) => {
        if (index < currentIteration) return finalText[index]
        if (char === ' ') return ' '
        return chars[Math.floor(Math.random() * chars.length)]
      })
      .join('')
    
    currentIteration++
    if (currentIteration > finalText.length) clearInterval(interval)
  }, stepDuration)
}

// Generate stars with more variety
const stars = Array.from({ length: 150 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 500,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 4 + 2,
  type: i % 10 === 0 ? 'shooting' : 'normal'
}))

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [loadText, setLoadText] = useState('INITIALIZING')
  const mainRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const chapter1Ref = useRef<HTMLDivElement>(null)
  const chapter2Ref = useRef<HTMLDivElement>(null)
  const chapter3Ref = useRef<HTMLDivElement>(null)
  const chapter4Ref = useRef<HTMLDivElement>(null)
  const chapter5Ref = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorTextRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Loading sequence with phases
  useEffect(() => {
    const loadingTexts = [
      'INITIALIZING',
      'LOADING ASSETS',
      'BUILDING PORTAL',
      'CALIBRATING',
      'ENTERING'
    ]
    
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 8 + 2
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setTimeout(() => {
          // Dramatic exit
          gsap.to('.loading-screen', {
            clipPath: 'circle(0% at 50% 50%)',
            duration: 1.2,
            ease: 'power4.inOut',
            onComplete: () => setLoading(false)
          })
        }, 600)
      }
      setLoadProgress(progress)
      
      // Update loading text based on progress
      const textIndex = Math.min(Math.floor(progress / 25), loadingTexts.length - 1)
      setLoadText(loadingTexts[textIndex])
    }, 80)
    
    return () => clearInterval(interval)
  }, [])

  // Enhanced cursor with states
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    // Smooth cursor animation
    const animateCursor = () => {
      const dx = mousePos.current.x - cursorPos.current.x
      const dy = mousePos.current.y - cursorPos.current.y
      
      cursorPos.current.x += dx * 0.15
      cursorPos.current.y += dy * 0.15
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px)`
      }
      
      requestAnimationFrame(animateCursor)
    }
    animateCursor()
    
    // Cursor interactions
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('.case-card')) {
        setCursorVariant('link')
      }
    }
    
    const handleMouseLeave = () => {
      setCursorVariant('default')
    }
    
    document.querySelectorAll('a, button, .case-card, .service-card').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [loading])

  // Main GSAP + Lenis setup
  useEffect(() => {
    if (loading) return

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Scroll progress bar
    gsap.to('.scroll-progress-bar', {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      }
    })

    // ============================================
    // HERO ANIMATIONS
    // ============================================
    
    // Hero entrance
    const heroTl = gsap.timeline({ delay: 0.3 })
    
    // Split hero headline
    const heroHeadline = document.querySelector('.hero-headline')
    if (heroHeadline) {
      const split = new SplitText(heroHeadline, { type: 'chars, words, lines' })
      
      heroTl
        .from('.hero-badge', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        })
        .from(split.chars, {
          y: 100,
          opacity: 0,
          rotateX: -90,
          stagger: 0.02,
          duration: 1,
          ease: 'power4.out'
        }, '-=0.4')
        .from('.hero-sub', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-scroll-hint', {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out'
        }, '-=0.3')
    }

    // Hero parallax on scroll
    if (heroRef.current) {
      gsap.to('.hero-content', {
        yPercent: -80,
        opacity: 0,
        scale: 0.9,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      })
      
      gsap.to('.hero-bg', {
        scale: 1.2,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      })
    }

    // ============================================
    // CHAPTER 1 - THE VOID
    // ============================================
    if (chapter1Ref.current) {
      const chapter1Texts = chapter1Ref.current.querySelectorAll('.chapter-text')
      
      // Stagger reveal text lines
      chapter1Texts.forEach((text) => {
        const split = new SplitText(text, { type: 'lines' })
        
        gsap.from(split.lines, {
          y: 60,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        })
      })
      
      // Chapter number reveal
      gsap.fromTo(chapter1Ref.current.querySelector('.chapter-number'),
        { scale: 0.5, opacity: 0, rotateY: -30 },
        {
          scale: 1,
          opacity: 0.05,
          rotateY: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: chapter1Ref.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      )
      
      // Chapter label with scramble
      const label1 = chapter1Ref.current.querySelector('.chapter-label')
      if (label1) {
        ScrollTrigger.create({
          trigger: chapter1Ref.current,
          start: 'top 80%',
          onEnter: () => scrambleText(label1 as HTMLElement, 'Chapter One', 800),
          once: true
        })
      }
    }

    // ============================================
    // CHAPTER 2 - PORTAL OPENS
    // ============================================
    if (chapter2Ref.current) {
      // Portal animation
      gsap.fromTo('.portal-visual',
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: chapter2Ref.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          }
        }
      )
      
      // Stats counter animation
      const statElements = chapter2Ref.current.querySelectorAll('.stat-value')
      statElements.forEach((el, i) => {
        const stat = stats[i]
        
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(el, 
              { textContent: '0' },
              {
                textContent: stat.value,
                duration: 2,
                ease: 'power2.out',
                snap: { textContent: stat.value % 1 === 0 ? 1 : 0.01 },
                onUpdate: function() {
                  const current = parseFloat(gsap.getProperty(el, 'textContent') as string)
                  if (stat.value % 1 === 0) {
                    el.textContent = Math.round(current) + stat.suffix
                  } else {
                    el.textContent = current.toFixed(2) + stat.suffix
                  }
                }
              }
            )
          },
          once: true
        })
      })
      
      // Stats stagger in
      gsap.from('.stat', {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stats-row',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      })
    }

    // ============================================
    // CHAPTER 3 - HORIZONTAL SCROLL SERVICES (Desktop only)
    // ============================================
    const servicesTrack = document.querySelector('.services-track')
    if (servicesTrack && window.innerWidth > 768) {
      const totalScroll = servicesTrack.scrollWidth - window.innerWidth + 200
      
      gsap.to(servicesTrack, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: '.services-section',
          start: 'top top',
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      })
      
      // Service cards entrance
      document.querySelectorAll('.service-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 100, opacity: 0, rotateY: -20 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'left 80%',
              end: 'left 50%',
              containerAnimation: gsap.getById('services-scroll') || undefined,
              toggleActions: 'play none none reverse',
              horizontal: true,
            }
          }
        )
      })
    }

    // ============================================
    // CHAPTER 4 - CASE STUDIES
    // ============================================
    if (chapter4Ref.current) {
      // Title reveal
      const caseTitle = chapter4Ref.current.querySelector('.chapter-title')
      if (caseTitle) {
        const split = new SplitText(caseTitle, { type: 'chars' })
        
        gsap.from(split.chars, {
          y: 80,
          opacity: 0,
          rotateX: -90,
          stagger: 0.03,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: chapter4Ref.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        })
      }
      
      // Case cards with 3D effect
      gsap.utils.toArray('.case-card').forEach((card: any, i) => {
        gsap.fromTo(card,
          { 
            y: 150, 
            opacity: 0, 
            rotateX: 20,
            rotateY: -10,
            transformPerspective: 1000
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            rotateY: 0,
            duration: 1.2,
            delay: i * 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      })
    }

    // ============================================
    // CHAPTER 5 - FINAL CTA
    // ============================================
    if (chapter5Ref.current) {
      // Dramatic title entrance
      const finalTitle = chapter5Ref.current.querySelector('.chapter-title')
      if (finalTitle) {
        const split = new SplitText(finalTitle, { type: 'words, chars' })
        
        gsap.from(split.chars, {
          y: 100,
          opacity: 0,
          scale: 0.5,
          rotateZ: () => gsap.utils.random(-20, 20),
          stagger: 0.02,
          duration: 1.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: chapter5Ref.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          }
        })
      }
      
      // CTA buttons
      gsap.from('.cta-buttons > *', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cta-buttons',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      })
      
      // Background glow pulse
      gsap.to('.chapter-bg-glow', {
        opacity: 0.8,
        scale: 1.2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }

    // ============================================
    // GLOBAL EFFECTS
    // ============================================
    
    // Noise overlay flicker
    gsap.to('.noise-overlay', {
      opacity: 0.03,
      duration: 0.05,
      repeat: -1,
      yoyo: true,
      ease: 'none'
    })

    // Magnetic buttons
    document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
      btn.addEventListener('mousemove', (e: any) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
      
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        })
      })
    })

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [loading])

  return (
    <>
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Loading Screen */}
      <div className={`loading-screen ${!loading ? 'hidden' : ''}`} style={{ clipPath: 'circle(100% at 50% 50%)' }}>
        <div className="loader-content">
          <div className="loader-shapes">
            <div className="loader-shape shape-1" />
            <div className="loader-shape shape-2" />
            <div className="loader-shape shape-3" />
          </div>
          <div className="loader-logo">
            <img src="/logo-blue.png" alt="Other Games" width={80} height={80} />
          </div>
          <div className="loader-text">{loadText}</div>
          <div className="loader-bar">
            <div className="loader-progress" style={{ width: `${Math.min(loadProgress, 100)}%` }} />
          </div>
          <div className="loader-percent">{Math.min(Math.round(loadProgress), 100)}%</div>
        </div>
        <div className="loader-grid" />
      </div>

      {/* Custom Cursor */}
      <div className={`cursor cursor-ring ${cursorVariant}`} ref={cursorRef}>
        <span className="cursor-text" ref={cursorTextRef}>View</span>
      </div>
      <div className="cursor cursor-dot" ref={cursorDotRef} />

      {/* Starfield */}
      <div className="starfield">
        {stars.map(star => (
          <div
            key={star.id}
            className={`star ${star.type}`}
            style={{
              left: `${star.left}%`,
              top: `${star.top}vh`,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="nav">
        <a href="/" className="nav-logo">
          <img src="/logo-blue.png" alt="Other Games" width={40} height={40} />
        </a>
        <div className="nav-links">
          <a href="#chapter-2">About</a>
          <a href="#chapter-3">Services</a>
          <a href="#chapter-4">Work</a>
          <a href="#chapter-5" className="nav-cta">Enter</a>
        </div>
        <button 
          className="nav-menu-btn" 
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen)
            // Disable/enable scroll when menu is open
            if (lenisRef.current) {
              if (!mobileMenuOpen) {
                lenisRef.current.stop()
              } else {
                lenisRef.current.start()
              }
            }
          }}
          aria-label="Menu"
        >
          <span style={{ transform: mobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
          <span style={{ opacity: mobileMenuOpen ? 0 : 1 }} />
          <span style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
        </button>
      </nav>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="#chapter-2" onClick={() => { setMobileMenuOpen(false); lenisRef.current?.start(); lenisRef.current?.scrollTo('#chapter-2') }}>About</a>
        <a href="#chapter-3" onClick={() => { setMobileMenuOpen(false); lenisRef.current?.start(); lenisRef.current?.scrollTo('#chapter-3') }}>Services</a>
        <a href="#chapter-4" onClick={() => { setMobileMenuOpen(false); lenisRef.current?.start(); lenisRef.current?.scrollTo('#chapter-4') }}>Work</a>
        <a href="#chapter-5" onClick={() => { setMobileMenuOpen(false); lenisRef.current?.start(); lenisRef.current?.scrollTo('#chapter-5') }}>Enter</a>
      </div>

      {/* Progress indicator */}
      <div className="scroll-progress">
        <div className="scroll-progress-bar" />
      </div>

      <main ref={mainRef}>
        {/* HERO - The Portal */}
        <section className="hero" ref={heroRef}>
          <div className="hero-bg">
            <div className="hero-gradient" />
            <div className="hero-gradient-2" />
            <div className="hero-grid" />
            <HeroScene />
          </div>
          
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot" />
              Now Entering
            </div>
            <h1 className="hero-headline">
              <span className="hero-line">THE</span>
              <span className="hero-line gradient-text">OTHERSIDE</span>
            </h1>
            <p className="hero-sub">Where brands come to tell their stories</p>
            <div className="hero-scroll-hint">
              <span>Scroll to explore</span>
              <div className="scroll-arrow">
                <div className="arrow-line" />
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 1 - The Void */}
        <section className="chapter chapter-dark" ref={chapter1Ref} id="chapter-1">
          <div className="chapter-number">01</div>
          <div className="chapter-content">
            <div className="chapter-label">Chapter One</div>
            <h2 className="chapter-title">The Void</h2>
            <div className="chapter-divider">
              <div className="divider-line" />
              <div className="divider-glow" />
            </div>
            <p className="chapter-text">
              The metaverse promised everything.<br/>
              <span className="text-dim">But delivered confusion.</span>
            </p>
            <p className="chapter-text">
              Brands spend months navigating Otherside.<br/>
              <span className="text-dim">Only to launch events nobody attends.</span>
            </p>
            <p className="chapter-text large">
              Without the right guide,<br/>
              <span className="gradient-text">you're just wandering in the dark.</span>
            </p>
          </div>
        </section>

        {/* CHAPTER 2 - The Portal Opens */}
        <section className="chapter chapter-reveal" ref={chapter2Ref} id="chapter-2">
          <div className="chapter-number">02</div>
          <div className="chapter-content">
            <div className="chapter-label">Chapter Two</div>
            <h2 className="chapter-title">The Portal Opens</h2>
            <div className="chapter-divider">
              <div className="divider-line" />
              <div className="divider-glow" />
            </div>
            <div className="portal-visual">
              <div className="portal-ring" />
              <div className="portal-ring" />
              <div className="portal-ring" />
              <div className="portal-particles">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="portal-particle" style={{ '--i': i } as any} />
                ))}
              </div>
              <img src="/logo-blue.png" alt="Other Games" className="portal-logo" />
            </div>
            <p className="chapter-text center">
              We are <span className="gradient-text">Other Games</span>
            </p>
            <p className="chapter-text center text-dim">
              The premier gaming experience studio in the Otherside metaverse.
            </p>
            <div className="stats-row">
              {stats.map((stat, i) => (
                <div key={i} className="stat">
                  <div className="stat-value">0{stat.suffix}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="clients-carousel">
              <div className="clients-track">
                {[...clients, ...clients].map((client, i) => (
                  <div key={i} className="client-logo">
                    <img src={client.img} alt={client.name} title={client.name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 3 - The Games Begin (Horizontal Scroll) */}
        <section className="chapter services-section" ref={chapter3Ref} id="chapter-3">
          <div className="chapter-number">03</div>
          <div className="services-track">
            <div className="services-intro">
              <div className="chapter-label">Chapter Three</div>
              <h2 className="chapter-title">The Games<br/>Begin</h2>
              <div className="chapter-divider">
                <div className="divider-line" />
                <div className="divider-glow" />
              </div>
              <p className="text-dim">Scroll to discover →</p>
            </div>
            {services.map((service, i) => (
              <div key={i} className="service-card">
                <div className="service-number">0{i + 1}</div>
                <div className="service-glow" />
                <div className="service-icon"><img src={service.icon} alt={service.title} /></div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
                <div className="service-line" />
              </div>
            ))}
            <div className="services-outro">
              <p className="gradient-text large">A-Z Done For You</p>
              <p className="text-dim">From concept to viral event</p>
            </div>
          </div>
        </section>

        {/* CHAPTER 4 - Legends */}
        <section className="chapter" ref={chapter4Ref} id="chapter-4">
          <div className="chapter-number">04</div>
          <div className="chapter-content">
            <div className="chapter-label">Chapter Four</div>
            <h2 className="chapter-title">Proof of Story</h2>
            <div className="chapter-divider">
              <div className="divider-line" />
              <div className="divider-glow" />
            </div>
            <p className="chapter-text center text-dim">
              Events that made headlines. Experiences that made history.
            </p>
            <div className="cases-grid">
              {cases.map((c, i) => (
                <a key={i} href={c.url} target="_blank" rel="noopener" className="case-card">
                  <div className="case-image">
                    <img src={c.img} alt={c.title} />
                    <div className="case-overlay" />
                    <div className="case-tag">{c.tag}</div>
                  </div>
                  <div className="case-content">
                    <div className="case-label">{c.label}</div>
                    <h3 className="case-title">{c.title}</h3>
                    <p className="case-desc">{c.desc}</p>
                  </div>
                  <div className="case-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CHAPTER 5 - Enter */}
        <section className="chapter chapter-final" ref={chapter5Ref} id="chapter-5">
          <div className="chapter-number">05</div>
          <div className="chapter-bg-glow" />
          <div className="chapter-content">
            <div className="chapter-label">Chapter Five</div>
            <h2 className="chapter-title">
              Your <span className="gradient-text">Story</span><br/>Awaits
            </h2>
            <div className="chapter-divider">
              <div className="divider-line" />
              <div className="divider-glow" />
            </div>
            <p className="chapter-text center">
              Join Yuga Labs, Amazon, and HyperX.<br/>
              <span className="text-dim">Create your Otherside moment.</span>
            </p>
            <div className="cta-buttons">
              <a href="https://twitter.com/OtherGamesXYZ" target="_blank" className="btn-primary">
                <span>Let's Talk</span>
                <div className="btn-glow" />
                <div className="btn-shine" />
              </a>
              <a href="mailto:othergamesxyz@gmail.com" className="btn-secondary">
                othergamesxyz@gmail.com
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src="/logo-blue.png" alt="Other Games" width={48} height={48} />
              <h3>Other Games</h3>
              <p>Premium gaming experiences in the Otherside metaverse.</p>
              <p className="gradient-text" style={{marginTop: 12, fontSize: 14}}>Your story awaits.</p>
            </div>
            <div className="footer-links">
              <h4>Socials</h4>
              <a href="https://twitter.com/OtherGamesXYZ" target="_blank">Twitter</a>
              <a href="https://youtube.com/@othergamesx" target="_blank">YouTube</a>
              <a href="https://twitch.tv/OtherGamesXYZ" target="_blank">Twitch</a>
            </div>
            <div className="footer-links">
              <h4>Team</h4>
              <a href="https://twitter.com/honeybd" target="_blank">@honeybd</a>
              <a href="https://twitter.com/Timmygspt" target="_blank">@Timmygspt</a>
              <a href="https://twitter.com/MakaveliDlaCruz" target="_blank">@MakaveliDlaCruz</a>
              <a href="https://twitter.com/morethenhype" target="_blank">@morethenhype</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Other Games. All rights reserved.</span>
            <span>Powered by Otherside</span>
          </div>
        </footer>
      </main>
    </>
  )
}
