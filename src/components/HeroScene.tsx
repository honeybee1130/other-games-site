'use client'
import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { KodaModel } from './KodaModel'
import { StarField, NebulaClouds } from './StarField'

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
      <torusGeometry args={[radius, 0.015, 16, 100]} />
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
      <planeGeometry args={[30, 30, 30, 30]} />
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
            
            // Fade with distance
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

// Main scene content
function SceneContent() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.5, 6]} fov={50} />
      
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00D4FF" />
      <pointLight position={[-5, 3, 5]} intensity={0.8} color="#8B5CF6" />
      <pointLight position={[0, -2, 3]} intensity={0.5} color="#FF6B00" />
      <spotLight 
        position={[0, 10, 0]} 
        intensity={1} 
        angle={0.4} 
        penumbra={1} 
        color="#ffffff"
      />

      {/* Background */}
      <StarField count={800} />
      <NebulaClouds />
      
      {/* Character */}
      <KodaModel scale={1.5} position={[0, -0.8, 0]} />
      
      {/* Portal effect */}
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
      
      {/* Energy effects */}
      <EnergyBeams />
      <FloorGrid />
      
      {/* Environment for reflections */}
      <Environment preset="night" />
    </>
  )
}

// Post-processing effects
function Effects() {
  return (
    <EffectComposer>
      <Bloom 
        intensity={0.8}
        luminanceThreshold={0.3}
        luminanceSmoothing={0.9}
      />
      <Vignette 
        darkness={0.5}
        offset={0.3}
      />
      <Noise 
        opacity={0.02}
        blendFunction={BlendFunction.OVERLAY}
      />
    </EffectComposer>
  )
}

export function HeroScene() {
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
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <SceneContent />
          <Effects />
        </Suspense>
      </Canvas>
    </div>
  )
}
