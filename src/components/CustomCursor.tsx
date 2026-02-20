'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorTrailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    const trail = cursorTrailRef.current
    
    if (!cursor || !dot || !trail) return

    let mouseX = 0
    let mouseY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      
      // Dot follows instantly
      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out'
      })
      
      // Outer ring follows with delay
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.5,
        ease: 'power3.out'
      })
      
      // Trail follows even slower
      gsap.to(trail, {
        x: mouseX,
        y: mouseY,
        duration: 0.8,
        ease: 'power2.out'
      })
    }

    const onMouseEnterLink = () => {
      gsap.to(cursor, {
        scale: 2,
        borderColor: '#00D4FF',
        duration: 0.3
      })
      gsap.to(dot, {
        scale: 0,
        duration: 0.3
      })
    }

    const onMouseLeaveLink = () => {
      gsap.to(cursor, {
        scale: 1,
        borderColor: 'rgba(255,255,255,0.5)',
        duration: 0.3
      })
      gsap.to(dot, {
        scale: 1,
        duration: 0.3
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    
    // Add hover effects to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterLink)
      el.addEventListener('mouseleave', onMouseLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterLink)
        el.removeEventListener('mouseleave', onMouseLeaveLink)
      })
    }
  }, [])

  return (
    <>
      {/* Trail glow */}
      <div
        ref={cursorTrailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        style={{
          width: '60px',
          height: '60px',
          background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '40px',
          height: '40px',
          border: '1px solid rgba(255,255,255,0.5)',
          borderRadius: '50%',
          transition: 'border-color 0.3s',
        }}
      />
      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '6px',
          height: '6px',
          background: '#00D4FF',
          borderRadius: '50%',
          boxShadow: '0 0 10px #00D4FF, 0 0 20px #00D4FF',
        }}
      />
    </>
  )
}
