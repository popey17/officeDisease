import { useMemo, useRef, useState, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, useCursor } from '@react-three/drei'
import * as THREE from 'three'
import { DISEASES, type DiseaseId, type Vec3 } from '../data/diseases'

const J = {
  head: [0, 1.7, 0.03] as Vec3,
  skull: [0, 1.72, 0.02] as Vec3,
  neck: [0, 1.54, 0] as Vec3,
  solar: [0, 1.18, 0] as Vec3,
  pelvis: [0, 0.98, 0] as Vec3,
  lHip: [-0.1, 0.94, 0] as Vec3,
  rHip: [0.1, 0.94, 0] as Vec3,
  lKnee: [-0.12, 0.52, 0.015] as Vec3,
  rKnee: [0.12, 0.52, 0.015] as Vec3,
  lAnkle: [-0.11, 0.1, 0] as Vec3,
  rAnkle: [0.11, 0.1, 0] as Vec3,
  lToe: [-0.11, 0.035, 0.07] as Vec3,
  rToe: [0.11, 0.035, 0.07] as Vec3,
  lShoulder: [-0.22, 1.46, 0] as Vec3,
  rShoulder: [0.22, 1.46, 0] as Vec3,
  lElbow: [-0.3, 1.16, 0.02] as Vec3,
  rElbow: [0.33, 1.13, 0.06] as Vec3,
  lWrist: [-0.34, 0.88, 0.04] as Vec3,
  rWrist: [0.39, 0.82, 0.13] as Vec3,
  lHand: [-0.36, 0.78, 0.05] as Vec3,
  rHand: [0.43, 0.73, 0.17] as Vec3,
}

function Bone({
  a,
  b,
  radius,
  children,
  onSelect,
}: {
  a: Vec3
  b: Vec3
  radius: number
  children: ReactNode
  onSelect?: () => void
}) {
  const [hovered, setHovered] = useState(false)
  useCursor(hovered && Boolean(onSelect))

  const transform = useMemo(() => {
    const start = new THREE.Vector3(...a)
    const end = new THREE.Vector3(...b)
    const dir = end.clone().sub(start)
    const len = dir.length()
    const mid = start.clone().add(end).multiplyScalar(0.5)
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize(),
    )
    return {
      position: mid.toArray() as Vec3,
      quaternion: quat,
      cyl: Math.max(len - radius * 2, 0.002),
    }
  }, [a, b, radius])

  return (
    <mesh
      position={transform.position}
      quaternion={transform.quaternion}
      castShadow
      onPointerOver={
        onSelect
          ? (event) => {
              event.stopPropagation()
              setHovered(true)
            }
          : undefined
      }
      onPointerOut={onSelect ? () => setHovered(false) : undefined}
      onClick={
        onSelect
          ? (event) => {
              event.stopPropagation()
              onSelect()
            }
          : undefined
      }
    >
      <capsuleGeometry args={[radius, transform.cyl, 5, 14]} />
      {children}
    </mesh>
  )
}

function Shell({
  active,
  dimmed,
  color = '#ddd4c6',
  emissive = '#d06a3a',
}: {
  active: boolean
  dimmed: boolean
  color?: string
  emissive?: string
}) {
  return (
    <meshPhysicalMaterial
      color={active ? emissive : color}
      emissive={active ? emissive : '#000000'}
      emissiveIntensity={active ? 0.5 : 0}
      roughness={0.44}
      metalness={0.06}
      clearcoat={0.72}
      clearcoatRoughness={0.32}
      sheen={0.28}
      sheenColor="#f4ece1"
      transparent
      opacity={dimmed && !active ? 0.14 : 0.96}
      depthWrite={!dimmed || active}
    />
  )
}

function Hotspot({
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

export function Anatomy({
  selectedId,
  exploring,
  onSelect,
}: {
  selectedId: DiseaseId | null
  exploring: boolean
  onSelect: (id: DiseaseId) => void
}) {
  const selected = DISEASES.find((d) => d.id === selectedId)
  const dimmed = Boolean(selected)
  const chest = useRef<THREE.Group>(null)
  const heart = useRef<THREE.Mesh>(null)

  const region = selected?.region
  const color = selected?.color ?? '#d06a3a'

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (chest.current) {
      const breathe = 1 + Math.sin(t * 1.35) * 0.012
      chest.current.scale.set(breathe, 1 + Math.sin(t * 1.35) * 0.007, breathe)
    }
    if (heart.current) {
      const beat =
        region === 'system' ? 1 + Math.abs(Math.sin(t * 3.2)) * 0.18 : 1
      heart.current.scale.setScalar(beat)
    }
  })

  const pick = (id: DiseaseId) => {
    if (!exploring) return
    onSelect(id)
  }

  const lumbar = region === 'lumbar'
  const cervical = region === 'cervical'
  const eyes = region === 'eyes'
  const wrist = region === 'wrist'
  const brain = region === 'brain' || region === 'cns'
  const lungs = region === 'lungs'
  const system = region === 'system'

  const vertebrae = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const t = i / 23
      const y = 0.96 + t * 0.58
      const z = -0.08 + Math.sin(t * Math.PI * 2) * 0.028
      const kind = i < 5 ? 'lumbar' : i > 16 ? 'cervical' : 'thoracic'
      return { i, y, z, kind }
    })
  }, [])

  return (
    <group>
      <group ref={chest}>
        <Bone a={J.solar} b={J.neck} radius={0.145} onSelect={() => pick('plague')}>
          <Shell active={system || lungs} dimmed={dimmed} emissive={color} />
        </Bone>
      </group>

      <Bone a={J.pelvis} b={J.solar} radius={0.12} onSelect={() => pick('chair')}>
        <Shell active={lumbar || system} dimmed={dimmed} emissive={color} />
      </Bone>

      <mesh
        position={J.pelvis}
        castShadow
        onClick={(event) => {
          event.stopPropagation()
          pick('chair')
        }}
      >
        <sphereGeometry args={[0.13, 20, 16]} />
        <Shell active={lumbar || system} dimmed={dimmed} emissive={color} />
      </mesh>

      <mesh position={J.lShoulder} castShadow>
        <sphereGeometry args={[0.055, 16, 12]} />
        <Shell active={system} dimmed={dimmed} emissive={color} />
      </mesh>
      <mesh position={J.rShoulder} castShadow>
        <sphereGeometry args={[0.055, 16, 12]} />
        <Shell active={wrist || system} dimmed={dimmed} emissive={color} />
      </mesh>

      <Bone a={J.neck} b={J.head} radius={0.048} onSelect={() => pick('turtle')}>
        <Shell active={cervical || system} dimmed={dimmed} emissive={color} />
      </Bone>

      <mesh
        position={J.skull}
        castShadow
        onClick={(event) => {
          event.stopPropagation()
          pick('deadline')
        }}
      >
        <sphereGeometry args={[0.118, 32, 28]} />
        <Shell
          active={brain || eyes || system}
          dimmed={dimmed}
          emissive={color}
        />
      </mesh>

      <mesh
        position={[0, 1.64, 0.08]}
        castShadow
        onClick={(event) => {
          event.stopPropagation()
          pick('excel')
        }}
      >
        <sphereGeometry args={[0.07, 20, 16]} />
        <Shell
          active={eyes || brain || system}
          dimmed={dimmed}
          color="#d9d0c3"
          emissive={color}
        />
      </mesh>

      <Bone a={J.lHip} b={J.lKnee} radius={0.072}>
        <Shell active={system} dimmed={dimmed} emissive={color} />
      </Bone>
      <Bone a={J.rHip} b={J.rKnee} radius={0.072}>
        <Shell active={system} dimmed={dimmed} emissive={color} />
      </Bone>
      <Bone a={J.lKnee} b={J.lAnkle} radius={0.05}>
        <Shell active={system} dimmed={dimmed} emissive={color} />
      </Bone>
      <Bone a={J.rKnee} b={J.rAnkle} radius={0.05}>
        <Shell active={system} dimmed={dimmed} emissive={color} />
      </Bone>
      <Bone a={J.lAnkle} b={J.lToe} radius={0.038}>
        <Shell active={system} dimmed={dimmed} emissive={color} />
      </Bone>
      <Bone a={J.rAnkle} b={J.rToe} radius={0.038}>
        <Shell active={system} dimmed={dimmed} emissive={color} />
      </Bone>

      <Bone a={J.lShoulder} b={J.lElbow} radius={0.048}>
        <Shell active={system} dimmed={dimmed} emissive={color} />
      </Bone>
      <Bone a={J.rShoulder} b={J.rElbow} radius={0.048} onSelect={() => pick('mouse')}>
        <Shell active={wrist || system} dimmed={dimmed} emissive={color} />
      </Bone>
      <Bone a={J.lElbow} b={J.lWrist} radius={0.038}>
        <Shell active={system} dimmed={dimmed} emissive={color} />
      </Bone>
      <Bone a={J.rElbow} b={J.rWrist} radius={0.038} onSelect={() => pick('mouse')}>
        <Shell active={wrist || system} dimmed={dimmed} emissive={color} />
      </Bone>
      <mesh position={J.lHand} castShadow>
        <sphereGeometry args={[0.042, 14, 12]} />
        <Shell active={system} dimmed={dimmed} emissive={color} />
      </mesh>
      <mesh
        position={J.rHand}
        castShadow
        onClick={(event) => {
          event.stopPropagation()
          pick('mouse')
        }}
      >
        <sphereGeometry args={[0.044, 14, 12]} />
        <Shell active={wrist || system} dimmed={dimmed} emissive={color} />
      </mesh>

      {vertebrae.map((v) => {
        const active =
          (v.kind === 'lumbar' && lumbar) ||
          (v.kind === 'cervical' && cervical) ||
          system
        return (
          <mesh key={v.i} position={[0, v.y, v.z]} castShadow>
            <boxGeometry args={[0.046, 0.016, 0.038]} />
            <meshPhysicalMaterial
              color={active ? color : '#cfc6b8'}
              emissive={active ? color : '#000000'}
              emissiveIntensity={active ? 0.8 : 0}
              roughness={0.35}
              transparent
              opacity={dimmed && !active ? 0.2 : 0.95}
            />
          </mesh>
        )
      })}

      <mesh position={[-0.07, 1.34, 0.04]} visible={lungs} castShadow>
        <sphereGeometry args={[0.09, 18, 14]} />
        <meshPhysicalMaterial
          color="#8fbf96"
          emissive="#5aaa72"
          emissiveIntensity={0.7}
          roughness={0.5}
          transparent
          opacity={0.88}
        />
      </mesh>
      <mesh position={[0.07, 1.34, 0.04]} visible={lungs} castShadow>
        <sphereGeometry args={[0.09, 18, 14]} />
        <meshPhysicalMaterial
          color="#8fbf96"
          emissive="#5aaa72"
          emissiveIntensity={0.7}
          roughness={0.5}
          transparent
          opacity={0.88}
        />
      </mesh>

      <mesh position={[0, 1.73, 0.02]} visible={brain}>
        <icosahedronGeometry args={[0.078, 1]} />
        <meshPhysicalMaterial
          color={region === 'cns' ? '#b8895a' : '#9b86c9'}
          emissive={color}
          emissiveIntensity={0.75}
          roughness={0.4}
        />
      </mesh>

      <mesh
        position={[-0.038, 1.705, 0.112]}
        castShadow
        onClick={(event) => {
          event.stopPropagation()
          pick('excel')
        }}
      >
        <sphereGeometry args={[0.016, 12, 10]} />
        <meshStandardMaterial
          color={eyes ? '#dff4ff' : '#2a2723'}
          emissive={eyes ? '#6cb6e0' : '#000000'}
          emissiveIntensity={eyes ? 1.1 : 0}
        />
      </mesh>
      <mesh
        position={[0.038, 1.705, 0.112]}
        castShadow
        onClick={(event) => {
          event.stopPropagation()
          pick('excel')
        }}
      >
        <sphereGeometry args={[0.016, 12, 10]} />
        <meshStandardMaterial
          color={eyes ? '#dff4ff' : '#2a2723'}
          emissive={eyes ? '#6cb6e0' : '#000000'}
          emissiveIntensity={eyes ? 1.1 : 0}
        />
      </mesh>

      <mesh ref={heart} position={[0.03, 1.32, 0.05]} visible={system}>
        <sphereGeometry args={[0.042, 16, 12]} />
        <meshStandardMaterial
          color="#c44b3a"
          emissive="#c44b3a"
          emissiveIntensity={1.2}
        />
      </mesh>

      {exploring &&
        DISEASES.map((d) => (
          <Hotspot
            key={d.id}
            position={d.hotspot}
            label={d.nickname}
            index={d.number}
            color={d.color}
            selected={selectedId === d.id}
            hidden={Boolean(selectedId) && selectedId !== d.id}
            onSelect={() => pick(d.id)}
          />
        ))}
    </group>
  )
}
