"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Html } from "@react-three/drei"

// Cell membrane component
function CellMembrane() {
  return (
    <mesh>
      <sphereGeometry args={[5, 32, 32]} />
      <meshStandardMaterial color="#a8e6cf" transparent opacity={0.3} />
    </mesh>
  )
}

// Nucleus component
function Nucleus() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial color="#3d5a80" transparent opacity={0.7} />
    </mesh>
  )
}

// MicroRNA component
function MicroRNA({ count, level }) {
  const miRNAs = []

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    const radius = 3 + Math.random() * 0.5
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    const z = Math.random() * 2 - 1

    miRNAs.push(
      <mesh key={i} position={[x, y, z]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ff9a76" />
      </mesh>,
    )
  }

  return <group>{miRNAs}</group>
}

// mRNA component
function MRNA({ count, level }) {
  const mRNAs = []

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    const radius = 3.5 + Math.random() * 0.5
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    const z = Math.random() * 2 - 1

    mRNAs.push(
      <mesh key={i} position={[x, y, z]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#679b9b" />
      </mesh>,
    )
  }

  return <group>{mRNAs}</group>
}

// Ribosome component
function Ribosomes({ count }) {
  const ribosomes = []

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    const radius = 4 + Math.random() * 0.5
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    const z = Math.random() * 2 - 1

    ribosomes.push(
      <group key={i} position={[x, y, z]}>
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#ffd166" />
        </mesh>
        <mesh position={[0.2, 0.2, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#ffd166" />
        </mesh>
      </group>,
    )
  }

  return <group>{ribosomes}</group>
}

// Protein component
function Proteins({ count }) {
  const proteins = []

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    const radius = 4.5 + Math.random() * 0.5
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    const z = Math.random() * 2 - 1

    proteins.push(
      <mesh key={i} position={[x, y, z]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#ef476f" />
      </mesh>,
    )
  }

  return <group>{proteins}</group>
}

// Animation controller
function AnimatedCell({ miRNALevel, targetGene, isSimulating, showLabels }) {
  const groupRef = useRef()

  // Calculate counts based on miRNA level (inverse relationship)
  const miRNACount = Math.floor(miRNALevel / 10) // 0-10 miRNAs
  const mRNACount = Math.floor(20 - miRNALevel / 5) // 20-0 mRNAs
  const ribosomeCount = 10 // Fixed number of ribosomes
  const proteinCount = Math.floor(30 - miRNALevel / 3.33) // 30-0 proteins

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <CellMembrane />
      <Nucleus />
      <MicroRNA count={miRNACount} level={miRNALevel} />
      <MRNA count={mRNACount} level={miRNALevel} />
      <Ribosomes count={ribosomeCount} />
      <Proteins count={proteinCount} />

      {showLabels && (
        <>
          <Html position={[0, 6, 0]}>
            <div className="bg-white px-2 py-1 rounded text-xs shadow-md">Célula</div>
          </Html>

          <Html position={[0, 2.5, 0]}>
            <div className="bg-white px-2 py-1 rounded text-xs shadow-md">Núcleo</div>
          </Html>

          <Html position={[3.5, 3.5, 0]}>
            <div className="bg-white px-2 py-1 rounded text-xs shadow-md text-[#ff9a76]">microARN</div>
          </Html>

          <Html position={[-3.5, 3.5, 0]}>
            <div className="bg-white px-2 py-1 rounded text-xs shadow-md text-[#679b9b]">ARNm</div>
          </Html>

          <Html position={[4, -4, 0]}>
            <div className="bg-white px-2 py-1 rounded text-xs shadow-md text-[#ffd166]">Ribosomas</div>
          </Html>

          <Html position={[-4, -4, 0]}>
            <div className="bg-white px-2 py-1 rounded text-xs shadow-md text-[#ef476f]">Proteínas</div>
          </Html>
        </>
      )}

      <Html position={[0, -6, 0]}>
        <div className="bg-green-100 px-3 py-2 rounded text-sm shadow-md">
          <div className="font-semibold">Gen objetivo: {targetGene}</div>
          <div>Nivel de miARN: {miRNALevel}%</div>
          <div>Expresión proteica: {Math.max(0, 100 - miRNALevel)}%</div>
        </div>
      </Html>
    </group>
  )
}

export default function CellSimulator({ miRNALevel, targetGene, isSimulating, showLabels }) {
  return (
    <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <AnimatedCell
        miRNALevel={miRNALevel}
        targetGene={targetGene}
        isSimulating={isSimulating}
        showLabels={showLabels}
      />
      <OrbitControls enableZoom={true} enablePan={false} />
    </Canvas>
  )
}
