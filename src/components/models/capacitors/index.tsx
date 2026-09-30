import { BEIGE, METAL, SLEEVE, SUPERCAP, TANTALUM_STRIPE } from '@/components/models/materials'
import type { PackageShape } from '@/lib/packageShapes'

export function CanBody({
  shape,
  emissive,
  emissiveIntensity,
}: {
  shape: Extract<PackageShape, { type: 'can' }>
  emissive: string
  emissiveIntensity: number
}) {
  const r = shape.diameter / 2
  const lidH = Math.min(0.45, Math.max(0.22, shape.height * 0.06))
  const leadH = shape.tht ? 2.5 : 0
  const sleeveH = shape.height - lidH
  const sleeveY = leadH + sleeveH / 2
  const sleeveColor = shape.kind === 'supercap' ? SUPERCAP : SLEEVE
  return (
    <group>
      {shape.tht
        ? [-r * 0.35, r * 0.35].map((x) => (
            <mesh key={x} position={[x, leadH / 2, 0]}>
              <cylinderGeometry args={[0.18, 0.18, leadH, 8]} />
              <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.25} />
            </mesh>
          ))
        : null}
      <mesh position={[0, sleeveY, 0]} castShadow>
        <cylinderGeometry args={[r, r, sleeveH, 32]} />
        <meshStandardMaterial
          color={sleeveColor}
          roughness={0.38}
          metalness={0.12}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh position={[0, sleeveY, 0]}>
        <cylinderGeometry args={[r + 0.03, r + 0.03, sleeveH * 0.9, 24, 1, false, -0.38, 0.76]} />
        <meshStandardMaterial color="#d8dce2" roughness={0.35} metalness={0.35} />
      </mesh>
      <mesh position={[r * 0.55, sleeveY, 0]}>
        <boxGeometry args={[0.12, sleeveH * 0.7, 0.08]} />
        <meshStandardMaterial color="#f2f2f2" roughness={0.4} />
      </mesh>
      <mesh position={[0, leadH + sleeveH + lidH / 2, 0]} castShadow>
        <cylinderGeometry args={[r - 0.08, r - 0.04, lidH, 32]} />
        <meshStandardMaterial color={METAL} metalness={0.82} roughness={0.22} />
      </mesh>
      <mesh position={[0, leadH + sleeveH + lidH + 0.02, 0]}>
        <torusGeometry args={[r * 0.35, 0.04, 8, 24]} />
        <meshStandardMaterial color={METAL} metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}

export function TantalumBody({
  shape,
  emissive,
  emissiveIntensity,
}: {
  shape: Extract<PackageShape, { type: 'tantalum' }>
  emissive: string
  emissiveIntensity: number
}) {
  const stripe = Math.min(0.4, shape.length * 0.18)
  const pad = Math.min(0.7, shape.length * 0.28)
  return (
    <group>
      <mesh position={[0, shape.height / 2, 0]} castShadow>
        <boxGeometry args={[shape.length, shape.height, shape.width]} />
        <meshStandardMaterial
          color={BEIGE}
          roughness={0.48}
          metalness={0.06}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh position={[shape.length / 2 - stripe / 2, shape.height / 2, 0]} castShadow>
        <boxGeometry args={[stripe, shape.height + 0.04, shape.width + 0.04]} />
        <meshStandardMaterial color={TANTALUM_STRIPE} roughness={0.4} metalness={0.08} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[(shape.length / 2 - pad / 2) * side, 0.04, 0]}>
          <boxGeometry args={[pad, 0.08, shape.width * 0.72]} />
          <meshStandardMaterial color={METAL} metalness={0.75} roughness={0.28} />
        </mesh>
      ))}
    </group>
  )
}

export function FilmBody({
  shape,
  emissive,
  emissiveIntensity,
}: {
  shape: Extract<PackageShape, { type: 'film' }>
  emissive: string
  emissiveIntensity: number
}) {
  const leadH = 2.4
  return (
    <group>
      {[-shape.leadPitch / 2, shape.leadPitch / 2].map((x) => (
        <mesh key={x} position={[x, leadH / 2, 0]}>
          <cylinderGeometry args={[0.2, 0.2, leadH, 8]} />
          <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.25} />
        </mesh>
      ))}
      <mesh position={[0, leadH + shape.height / 2, 0]} castShadow>
        <boxGeometry args={[shape.length, shape.height, shape.width]} />
        <meshStandardMaterial
          color="#c9b48a"
          roughness={0.5}
          metalness={0.04}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
    </group>
  )
}
