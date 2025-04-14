"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Text } from "@react-three/drei"
import { Vector3 } from "three"

// RNA Nucleotide component
function Nucleotide({ position, color, label }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {label && (
        <Text position={[0, 0.6, 0]} fontSize={0.3} color="black" anchorX="center" anchorY="middle">
          {label}
        </Text>
      )}
    </group>
  )
}

// RNA Backbone component
function RNABackbone({ points }) {
  const positions = []

  // Create a curved line connecting all points
  for (let i = 0; i < points.length - 1; i++) {
    const start = points[i]
    const end = points[i + 1]
    const segments = 10

    for (let j = 0; j <= segments; j++) {
      const t = j / segments
      const x = start.x * (1 - t) + end.x * t
      const y = start.y * (1 - t) + end.y * t
      const z = start.z * (1 - t) + end.z * t
      positions.push(x, y, z)
    }
  }

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={new Float32Array(positions)}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#999" linewidth={2} />
    </line>
  )
}

// MicroRNA structure
function MicroRNA() {
  const groupRef = useRef()

  // Define nucleotide positions for a simple microRNA structure
  const nucleotides = [
    { position: new Vector3(-2, 0, 0), color: "#ff9a76", label: "A" },
    { position: new Vector3(-1, 0.5, 0), color: "#679b9b", label: "U" },
    { position: new Vector3(0, 0.8, 0), color: "#ff9a76", label: "G" },
    { position: new Vector3(1, 0.5, 0), color: "#679b9b", label: "C" },
    { position: new Vector3(2, 0, 0), color: "#ff9a76", label: "A" },
    { position: new Vector3(2, -1, 0), color: "#679b9b", label: "U" },
    { position: new Vector3(1, -1.5, 0), color: "#ff9a76", label: "G" },
    { position: new Vector3(0, -1.8, 0), color: "#679b9b", label: "C" },
    { position: new Vector3(-1, -1.5, 0), color: "#ff9a76", label: "A" },
    { position: new Vector3(-2, -1, 0), color: "#679b9b", label: "U" },
  ]

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {nucleotides.map((nucleotide, index) => (
        <Nucleotide key={index} position={nucleotide.position} color={nucleotide.color} label={nucleotide.label} />
      ))}
      <RNABackbone points={nucleotides.map((n) => n.position)} />

      <Text
        position={[0, 2.5, 0]}
        fontSize={0.6}
        color="#333"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter_Regular.json"
      >
        microARN
      </Text>
    </group>
  )
}

// Main component
export default function MicroARNVisualization() {
  return (
    <div className="w-full h-[400px] bg-gray-50 rounded-lg">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <MicroRNA />
        <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={1} />
        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}
