import { useEffect, useRef, type ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { CameraControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { Anatomy } from './Anatomy'
import {
  OVERVIEW_CAMERA,
  TAKEAWAY_CAMERA,
  diseaseById,
  type DiseaseId,
} from '../data/diseases'

/** Keep the WebGL viewport in sync while the stage CSS-animates to 1/3 width. */
function ResizeDuringPresent({ presenting }: { presenting: boolean }) {
  const setSize = useThree((state) => state.setSize)

  useEffect(() => {
    const canvas = document.querySelector('.stage canvas')
    const parent = canvas?.parentElement
    if (!parent) return

    let frame = 0
    const started = performance.now()
    const duration = presenting ? 800 : 800

    const tick = () => {
      const rect = parent.getBoundingClientRect()
      setSize(rect.width, rect.height)
      if (performance.now() - started < duration) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [presenting, setSize])

  return null
}

function AutoRotate({
  enabled,
  children,
}: {
  enabled: boolean
  children: ReactNode
}) {
  const ref = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    const group = ref.current
    if (!group) return
    if (enabled) {
      group.rotation.y += delta * 0.32
      return
    }
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, 0, 3.5, delta)
  })

  return <group ref={ref}>{children}</group>
}

function Rig({
  selectedId,
  takeaway,
  presenting,
}: {
  selectedId: DiseaseId | null
  takeaway: boolean
  presenting: boolean
}) {
  const controls = useRef<CameraControls>(null)
  const disease = diseaseById(selectedId)
  const base = takeaway
    ? TAKEAWAY_CAMERA
    : (disease?.camera ?? OVERVIEW_CAMERA)

  // In the 1/3 panel, pull the camera back a little so the figure still reads.
  const cam = presenting
    ? {
        position: [
          base.position[0] * 1.18,
          base.position[1],
          base.position[2] * 1.22,
        ] as [number, number, number],
        target: base.target,
      }
    : base

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
  presenting = false,
  onSelect,
}: {
  selectedId: DiseaseId | null
  exploring: boolean
  takeaway: boolean
  presenting?: boolean
  onSelect: (id: DiseaseId) => void
}) {
  return (
    <Canvas
      shadows="percentage"
      camera={{
        fov: presenting ? 38 : 34,
        position: OVERVIEW_CAMERA.position,
        near: 0.1,
        far: 40,
      }}
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
      <ResizeDuringPresent presenting={presenting} />
      <AutoRotate enabled={!presenting && !takeaway}>
        <Anatomy
          selectedId={selectedId}
          exploring={exploring}
          onSelect={onSelect}
        />
        <Platform />
      </AutoRotate>
      <ContactShadows
        position={[0, 0.001, 0]}
        opacity={0.42}
        scale={7}
        blur={2.4}
        far={2.2}
      />
      <Rig
        selectedId={selectedId}
        takeaway={takeaway}
        presenting={presenting}
      />
    </Canvas>
  )
}
