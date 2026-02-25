'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Vertex shader
const vertexShader = `
  attribute float size;
  attribute float opacity;
  varying float vOpacity;
  uniform float time;
  
  void main() {
    vOpacity = opacity;
    vec3 pos = position;
    pos.x += sin(time * 0.5 + position.z) * 0.1;
    pos.y += cos(time * 0.3 + position.x) * 0.1;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

// Fragment shader - makes CIRCULAR particles with glow
const fragmentShader = `
  varying float vOpacity;
  uniform vec3 color;
  
  void main() {
    // Calculate distance from center of point
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    
    // Soft circle with glow
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha *= vOpacity;
    
    // Add glow
    float glow = exp(-dist * 3.0) * 0.5;
    alpha += glow * vOpacity;
    
    if (alpha < 0.01) discard;
    
    gl_FragColor = vec4(color, alpha);
  }
`

export function StarField({ count = 2000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const { positions, sizes, opacities } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const opacities = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      // Distribute in a sphere around camera
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 5 + Math.random() * 25
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      
      // Varying sizes for depth
      sizes[i] = Math.random() * 2 + 0.5
      
      // Varying opacity for depth
      opacities[i] = Math.random() * 0.7 + 0.3
    }
    
    return { positions, sizes, opacities }
  }, [count])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-opacity"
          count={count}
          array={opacities}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 },
          color: { value: new THREE.Color('#ffffff') }
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Nebula clouds for extra atmosphere
export function NebulaClouds() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -15]}>
      <planeGeometry args={[50, 50]} />
      <shaderMaterial
        transparent
        uniforms={{
          time: { value: 0 },
          color1: { value: new THREE.Color('#0a0a2e') },
          color2: { value: new THREE.Color('#1a0a3e') },
          color3: { value: new THREE.Color('#00D4FF').multiplyScalar(0.1) }
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 color1;
          uniform vec3 color2;
          uniform vec3 color3;
          varying vec2 vUv;
          
          // Simplex noise function
          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
          
          float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
            vec2 i  = floor(v + dot(v, C.yy));
            vec2 x0 = v - i + dot(i, C.xx);
            vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod289(i);
            vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
            m = m*m; m = m*m;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
            vec3 g;
            g.x = a0.x * x0.x + h.x * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
          }
          
          void main() {
            vec2 uv = vUv * 2.0 - 1.0;
            float noise = snoise(uv * 2.0) * 0.5 + 0.5;
            float noise2 = snoise(uv * 4.0 + 10.0) * 0.5 + 0.5;
            
            vec3 color = mix(color1, color2, noise);
            color = mix(color, color3, noise2 * 0.3);
            
            float alpha = noise * noise2 * 0.3;
            alpha *= 1.0 - length(uv) * 0.5;
            
            gl_FragColor = vec4(color, alpha);
          }
        `}
        depthWrite={false}
      />
    </mesh>
  )
}
