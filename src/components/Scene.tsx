import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls, ContactShadows } from '@react-three/drei'
import { Anatomy } from './Anatomy'
import {
  OVERVIEW_CAMERA,
  TAKEAWAY_CAMERA,
  diseaseById,
  type DiseaseId,
} from '../data/diseases'

function Rig({
  selectedId,
  takeaway,
}: {
  selectedId: DiseaseId | null
  takeaway: boolean
}) {
  const controls = useRef<CameraControls>(null)
  const disease = diseaseById(selectedId)
  const cam = takeaway
    ? TAKEAWAY_CAMERA
    : (disease?.camera ?? OVERVIEW_CAMERA)

  useEffect(() => {
    const c = controls.current
    if (!c) return
    void c.setLookAt(
      cam.position[0],
      cam.position[1],
      cam.position[2],
      cam.target[0],
      cam.target[1],
      cam.target[2],
      true,
    )
  }, [cam])

  return (
    <CameraControls
      ref={controls}
      smoothTime={0.7}
      minDistance={0.55}
      maxDistance={7}
      minPolarAngle={0.15}
      maxPolarAngle={Math.PI / 2 + 0.12}
    />
  )
}

function Platform() {
  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[1.15, 64]} />
        <meshStandardMaterial color="#16191f" roughness={0.86} metalness={0.08} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]}>
        <ringGeometry args={[1.16, 1.2, 72]} />
        <meshBasicMaterial color="#c46a3a" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0]}>
        <ringGeometry args={[0.28, 0.292, 64]} />
        <meshBasicMaterial color="#f3ece1" transparent opacity={0.18} />
      </mesh>
    </group>
  )
}

export function Scene({
  selectedId,
  exploring,
  takeaway,
  onSelect,
}: {
  selectedId: DiseaseId | null
  exploring: boolean
  takeaway: boolean
  onSelect: (id: DiseaseId) => void
}) {
  return (
    <Canvas
      shadows="percentage"
      camera={{ fov: 34, position: OVERVIEW_CAMERA.position, near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#0c0e12']} />
      <fog attach="fog" args={['#0c0e12', 6, 14]} />
      <hemisphereLight args={['#f2ebe1', '#1b2228', 0.7]} />
      <ambientLight intensity={0.45} />
      <spotLight
        position={[3.2, 5.2, 3.4]}
        intensity={90}
        angle={0.46}
        penumbra={0.9}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        color="#fff4e8"
      />
      <directionalLight
        position={[-3.5, 2.2, -1.5]}
        intensity={1.1}
        color="#8fb8c4"
      />
      <directionalLight position={[0.2, 1.4, 4]} intensity={0.55} />
      <Anatomy
        selectedId={selectedId}
        exploring={exploring}
        onSelect={onSelect}
      />
      <Platform />
      <ContactShadows
        position={[0, 0.001, 0]}
        opacity={0.42}
        scale={7}
        blur={2.4}
        far={2.2}
      />
      <Rig selectedId={selectedId} takeaway={takeaway} />
    </Canvas>
  )
}
