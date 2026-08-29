import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, useCursor } from '@react-three/drei'
import * as THREE from 'three'
import { type Vec3 } from '../data/diseases'

export function AnatomyHotspot({
  position,
  label,
  index,
  color,
  selected,
  hidden,
  onSelect,
}: {
  position: Vec3
  label: string
  index: string
  color: string
  selected: boolean
  hidden: boolean
  onSelect: () => void
}) {
  const [hovered, setHovered] = useState(false)
  useCursor(hovered && !hidden)
  const ring = useRef<THREE.Mesh>(null)
  const showLabel = hovered || selected

  useFrame((state) => {
    if (!ring.current) return
    const s = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.08
    ring.current.scale.setScalar(s)
  })

  if (hidden) return null

  return (
    <group position={position}>
      <mesh
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.038, 18, 18]} />
        <meshBasicMaterial color={selected || hovered ? color : '#f3ece1'} />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05, 0.062, 24]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={selected || hovered ? 0.9 : 0.45}
          side={THREE.DoubleSide}
        />
      </mesh>
      {showLabel && (
        <Html position={[0.1, 0.08, 0]} style={{ pointerEvents: 'none' }}>
          <div className="hot-label">
            {index} {label}
          </div>
        </Html>
      )}
    </group>
  )
}
