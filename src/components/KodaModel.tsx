'use client'
import { useRef, useMemo, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Load the actual GLB model
function CharacterModel({ scale = 1, position = [0, 0, 0] }: { scale?: number; position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/models/character.glb')
  
  // Clone the scene so we can manipulate it
  const clonedScene = useMemo(() => scene.clone(), [scene])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2 + Math.PI
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} scale={scale} position={position}>
        <primitive object={clonedScene} />
      </group>
    </Float>
  )
}

// Wrapper with suspense fallback
export function KodaModel({ scale = 1, position = [0, 0, 0] }: { scale?: number; position?: [number, number, number] }) {
  return (
    <Suspense fallback={<LoadingPlaceholder position={position} />}>
      <CharacterModel scale={scale} position={position} />
    </Suspense>
  )
}

// Simple loading placeholder
function LoadingPlaceholder({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime
    }
  })
  
  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#00D4FF" wireframe />
    </mesh>
  )
}

// Preload the model
useGLTF.preload('/models/character.glb')

// Portal ring effect
export function PortalRing({ radius = 2, color = '#00D4FF' }: { radius?: number; color?: string }) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshStandardMaterial 
        color={color}
        emissive={color}
        emissiveIntensity={2}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

// Floating particles
export function FloatingParticles({ count = 50 }: { count?: number }) {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00D4FF"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}
