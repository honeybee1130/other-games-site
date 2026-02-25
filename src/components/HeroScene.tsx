'use client'
import { Suspense, useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { KodaModel } from './KodaModel'
import { StarField } from './StarField'

// Animated portal ring with shader
function PortalRing({ radius = 2, color = '#00D4FF', speed = 0.5 }: { radius?: number; color?: string; speed?: number }) {
  const ringRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * speed
    }
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.015, 8, 48]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          time: { value: 0 },
          color: { value: new THREE.Color(color) }
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          uniform vec3 color;
          varying vec2 vUv;
          
          void main() {
            float pulse = sin(vUv.x * 20.0 + time * 3.0) * 0.5 + 0.5;
            float glow = pulse * 0.5 + 0.5;
            vec3 finalColor = color * glow * 2.0;
            float alpha = glow * 0.9;
            gl_FragColor = vec4(finalColor, alpha);
          }
        `}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

// Energy beam effect
function EnergyBeams() {
  const beamsRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (beamsRef.current) {
      beamsRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={beamsRef}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh 
          key={i} 
          position={[
            Math.cos(i * Math.PI / 3) * 1.8,
            0,
            Math.sin(i * Math.PI / 3) * 1.8
          ]}
          rotation={[0, -i * Math.PI / 3, 0]}
        >
          <planeGeometry args={[0.02, 4]} />
          <meshBasicMaterial 
            color="#00D4FF" 
            transparent 
            opacity={0.3}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

// Floor grid
function FloorGrid() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[30, 30, 10, 10]} />
      <shaderMaterial
        uniforms={{
          color: { value: new THREE.Color('#00D4FF') }
        }}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vPosition;
          void main() {
            vUv = uv;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 color;
          varying vec2 vUv;
          varying vec3 vPosition;
          
          void main() {
            vec2 grid = abs(fract(vPosition.xy * 0.5) - 0.5);
            float line = min(grid.x, grid.y);
            float alpha = 1.0 - smoothstep(0.0, 0.02, line);
            float dist = length(vPosition.xy);
            alpha *= 1.0 - smoothstep(5.0, 15.0, dist);
            alpha *= 0.3;
            gl_FragColor = vec4(color, alpha);
          }
        `}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// Main 3D scene — desktop only
function SceneContent() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.5, 6]} fov={50} />
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00D4FF" />
      <pointLight position={[-5, 3, 5]} intensity={0.8} color="#8B5CF6" />
      <pointLight position={[0, -2, 3]} intensity={0.5} color="#FF6B00" />
      <spotLight position={[0, 10, 0]} intensity={1} angle={0.4} penumbra={1} color="#ffffff" />
      <StarField count={600} />
      <KodaModel scale={1.5} position={[0, -0.8, 0]} />
      <group position={[0, 0.5, 0]}>
        <PortalRing radius={1.8} color="#00D4FF" speed={0.3} />
        <group rotation={[0.15, 0, 0.1]}>
          <PortalRing radius={2.1} color="#8B5CF6" speed={-0.4} />
        </group>
        <group rotation={[-0.1, 0, -0.15]}>
          <PortalRing radius={2.4} color="#00D4FF" speed={0.5} />
        </group>
        <group rotation={[0.05, 0.1, 0]}>
          <PortalRing radius={2.7} color="#FF6B00" speed={-0.2} />
        </group>
      </group>
      <EnergyBeams />
      <FloorGrid />
      <hemisphereLight args={['#0a0a2e', '#000000', 0.3]} />
    </>
  )
}

function Effects() {
  return (
    <EffectComposer>
      <Bloom intensity={0.8} luminanceThreshold={0.3} luminanceSmoothing={0.9} />
      <Vignette darkness={0.5} offset={0.3} />
    </EffectComposer>
  )
}

// Pure CSS hero for mobile — zero WebGL
function MobileHero() {
  const mobileStars = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 1,
    dur: 2 + Math.random() * 3,
    delay: Math.random() * 3,
  })), [])

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 1,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes mring-cw  { to { transform: rotate(360deg); } }
        @keyframes mring-ccw { to { transform: rotate(-360deg); } }
        @keyframes mglow-pulse     { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes mstar-twinkle   { 0%,100% { opacity: 0.2; } 50% { opacity: 0.8; } }
      `}</style>

      {/* radial gradient backdrop */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 55%, rgba(0,212,255,0.08) 0%, rgba(139,92,246,0.06) 40%, transparent 70%)',
      }} />

      {/* CSS stars */}
      {mobileStars.map((s) => (
        <div key={s.id} style={{
          position: 'absolute',
          left: `${s.left}%`,
          top: `${s.top}%`,
          width: s.size,
          height: s.size,
          borderRadius: '50%',
          background: '#fff',
          animation: `mstar-twinkle ${s.dur}s ${s.delay}s ease-in-out infinite`,
        }} />
      ))}

      {/* portal rings — 2D ellipses only, no 3D compositing */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 280, height: 280,
      }}>
        {[
          { w: 190, h: 72,  color: '#00D4FF', dur: '8s',  dir: 'mring-cw',  opacity: 0.75 },
          { w: 220, h: 84,  color: '#8B5CF6', dur: '11s', dir: 'mring-ccw', opacity: 0.65 },
          { w: 250, h: 95,  color: '#00D4FF', dur: '14s', dir: 'mring-cw',  opacity: 0.5  },
          { w: 280, h: 106, color: '#FF6B00', dur: '18s', dir: 'mring-ccw', opacity: 0.4  },
        ].map((r, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: r.w, height: r.h,
            marginLeft: -r.w / 2, marginTop: -r.h / 2,
            borderRadius: '50%',
            border: `1.5px solid ${r.color}`,
            opacity: r.opacity,
            animation: `${r.dir} ${r.dur} linear infinite`,
            willChange: 'transform',
          }} />
        ))}

        {/* center glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 80, height: 80,
          marginLeft: -40, marginTop: -40,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.4) 0%, transparent 70%)',
          animation: 'mglow-pulse 3s ease-in-out infinite',
        }} />

        {/* logo */}
        <img
          src="/logo-blue.png"
          alt="Other Games"
          style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 52, height: 52,
            marginLeft: -26, marginTop: -26,
          }}
        />
      </div>
    </div>
  )
}

export function HeroScene() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Don't render anything until we know the screen size (avoids SSR mismatch)
  if (!mounted) return null

  if (isMobile) {
    return <MobileHero />
  }

  return (
    <div style={{ 
      position: 'absolute', 
      inset: 0, 
      zIndex: 1,
      pointerEvents: 'none'
    }}>
      <Canvas
        gl={{ 
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={1}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <SceneContent />
          <Effects />
        </Suspense>
      </Canvas>
    </div>
  )
}
