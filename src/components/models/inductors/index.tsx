import { COPPER, FERRITE, METAL } from '@/components/models/materials'
import type { PackageShape } from '@/lib/packageShapes'

export function PowerInductorBody({
  shape,
  emissive,
  emissiveIntensity,
}: {
  shape: Extract<PackageShape, { type: 'power' }>
  emissive: string
  emissiveIntensity: number
}) {
  const { length: l, width: w, height: h } = shape
  return (
    <group>
      <mesh position={[0, h / 2, 0]} castShadow>
        <boxGeometry args={[l, h, w]} />
        <meshStandardMaterial
          color={FERRITE}
          roughness={0.72}
          metalness={0.08}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh position={[0, h / 2, 0]} castShadow>
        <boxGeometry args={[l * 1.04, h * 0.42, w * 1.06]} />
        <meshStandardMaterial color={COPPER} metalness={0.7} roughness={0.32} />
      </mesh>
      <mesh position={[l * 0.32, 0.05, 0]}>
        <boxGeometry args={[l * 0.28, 0.1, w * 0.72]} />
        <meshStandardMaterial color={METAL} metalness={0.75} roughness={0.28} />
      </mesh>
      <mesh position={[-l * 0.32, 0.05, 0]}>
        <boxGeometry args={[l * 0.28, 0.1, w * 0.72]} />
        <meshStandardMaterial color={METAL} metalness={0.75} roughness={0.28} />
      </mesh>
    </group>
  )
}

export function CommonModeBody({
  shape,
  emissive,
  emissiveIntensity,
}: {
  shape: Extract<PackageShape, { type: 'common-mode' }>
  emissive: string
  emissiveIntensity: number
}) {
  const { length: l, width: w, height: h } = shape
  const pad = l * 0.22
  return (
    <group>
      <mesh position={[0, h / 2, 0]} castShadow>
        <boxGeometry args={[l, h, w]} />
        <meshStandardMaterial
          color={FERRITE}
          roughness={0.68}
          metalness={0.08}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[(l / 2 - pad / 2) * side, 0.05, 0]}>
          <boxGeometry args={[pad, 0.1, w * 0.78]} />
          <meshStandardMaterial color={METAL} metalness={0.75} roughness={0.28} />
        </mesh>
      ))}
      <mesh position={[0, h * 0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[Math.min(l, w) * 0.22, h * 0.12, 8, 16]} />
        <meshStandardMaterial color={COPPER} metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  )
}
