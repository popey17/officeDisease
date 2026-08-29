import { useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { DISEASES, type DiseaseId } from '../data/diseases'
import {
  ANATOMY_MODEL_URL,
  DRACO_PATH,
  diseaseFromLabel,
  matchesRegion,
  meshLabel,
} from '../anatomy/regions'
import { AnatomyHotspot } from './AnatomyHotspot'

function fitToPlatform(root: THREE.Object3D, targetHeight = 1.72) {
  root.updateMatrixWorld(true)
  const box = new THREE.Box3().setFromObject(root)
  const size = box.getSize(new THREE.Vector3())
  if (size.y < 0.001) return
  root.scale.multiplyScalar(targetHeight / size.y)
  root.updateMatrixWorld(true)
  box.setFromObject(root)
  root.position.x += -((box.min.x + box.max.x) / 2)
  root.position.z += -((box.min.z + box.max.z) / 2)
  root.position.y += -box.min.y
}

function cloneMaterial(material: THREE.Material | THREE.Material[]) {
  return Array.isArray(material)
    ? material.map((item) => item.clone())
    : material.clone()
}

function colorful(material: THREE.Material | THREE.Material[]) {
  const mat = Array.isArray(material) ? material[0] : material
  if (mat instanceof THREE.MeshStandardMaterial) return mat
  return null
}

export function AnatomyModel({
  selectedId,
  exploring,
  onSelect,
}: {
  selectedId: DiseaseId | null
  exploring: boolean
  onSelect: (id: DiseaseId) => void
}) {
  const { scene } = useGLTF(ANATOMY_MODEL_URL, DRACO_PATH)
  const selected = DISEASES.find((d) => d.id === selectedId)
  const region = selected?.region
  const color = selected?.color ?? '#d06a3a'

  const model = useMemo(() => {
    const cloned = scene.clone(true)
    cloned.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return
      obj.material = cloneMaterial(obj.material)
      obj.castShadow = false
      obj.receiveShadow = true
      const mat = colorful(obj.material)
      if (!mat) return
      obj.userData.baseColor = mat.color.clone()
      obj.userData.baseEmissive = mat.emissive.clone()
      obj.userData.baseEmissiveIntensity = mat.emissiveIntensity
    })
    fitToPlatform(cloned)
    cloned.rotation.y = Math.PI
    return cloned
  }, [scene])

  useEffect(() => {
    const glow = new THREE.Color(color)
    const focused = Boolean(region)
    model.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return
      const mat = colorful(obj.material)
      const base = obj.userData.baseColor
      if (!mat || !(base instanceof THREE.Color)) return
      const lit = !region || matchesRegion(meshLabel(obj), region)
      mat.color.copy(base)
      if (focused && !lit) mat.color.multiplyScalar(0.12)
      const restEmissive = obj.userData.baseEmissive
      mat.emissive.copy(
        lit && focused && restEmissive instanceof THREE.Color
          ? glow
          : restEmissive instanceof THREE.Color
            ? restEmissive
            : glow,
      )
      mat.emissiveIntensity =
        lit && focused
          ? 0.85
          : typeof obj.userData.baseEmissiveIntensity === 'number'
            ? obj.userData.baseEmissiveIntensity
            : 0
    })
  }, [model, region, color])

  return (
    <group
      onClick={(event) => {
        event.stopPropagation()
        if (!exploring) return
        const id = diseaseFromLabel(meshLabel(event.object))
        if (id) onSelect(id)
      }}
    >
      <primitive object={model} />
      {exploring &&
        DISEASES.map((d) => (
          <AnatomyHotspot
            key={d.id}
            position={d.hotspot}
            label={d.nickname}
            index={d.number}
            color={d.color}
            selected={selectedId === d.id}
            hidden={Boolean(selectedId) && selectedId !== d.id}
            onSelect={() => {
              if (!exploring) return
              onSelect(d.id)
            }}
          />
        ))}
    </group>
  )
}

useGLTF.preload(ANATOMY_MODEL_URL, DRACO_PATH)
