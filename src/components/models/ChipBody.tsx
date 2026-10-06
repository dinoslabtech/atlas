import { CHIP_BODY, COPPER, METAL } from '@/components/models/materials'
import type { PackageShape } from '@/lib/packageShapes'

type ChipProps = {
  shape: Extract<PackageShape, { type: 'chip' }>
  emissive: string
  emissiveIntensity: number
}

export function ChipBody({ shape, emissive, emissiveIntensity }: ChipProps) {
  if (shape.style === 'resistor') {
    return <FilmResistorChip shape={shape} emissive={emissive} emissiveIntensity={emissiveIntensity} />
  }
  if (shape.style === 'wirewound') {
    return <WirewoundChip shape={shape} emissive={emissive} emissiveIntensity={emissiveIntensity} />
  }
  if (shape.style === 'shunt') {
    return <ShuntChip shape={shape} emissive={emissive} emissiveIntensity={emissiveIntensity} />
  }
  return <GenericChip shape={shape} emissive={emissive} emissiveIntensity={emissiveIntensity} />
}

function capWidth(length: number): number {
  return Math.min(Math.max(length * 0.16, 0.07), 0.65)
}

function FilmResistorChip({ shape, emissive, emissiveIntensity }: ChipProps) {
  const { length: l, width: w, thickness: t } = shape
  const cap = capWidth(l)
  const coatLen = Math.max(l - cap * 2.15, l * 0.35)
  const coatH = Math.max(0.02, t * 0.08)
  const wrapH = t * 1.06
  const padH = Math.max(0.02, t * 0.08)
  return (
    <group>
      <mesh position={[0, t / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[l, t, w]} />
        <meshStandardMaterial
          color={CHIP_BODY.resistor}
          roughness={0.52}
          metalness={0.04}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh position={[0, t + coatH / 2, 0]}>
        <boxGeometry args={[coatLen, coatH, w * 0.7]} />
        <meshStandardMaterial color="#5c4c36" roughness={0.48} metalness={0.02} />
      </mesh>
      {([-1, 1] as const).map((side) => {
        const x = (l / 2 - cap / 2) * side
        return (
          <group key={side}>
            <mesh position={[x, wrapH / 2, 0]} castShadow>
              <boxGeometry args={[cap, wrapH, w * 1.04]} />
              <meshStandardMaterial color={METAL} metalness={0.82} roughness={0.22} />
            </mesh>
            <mesh position={[x, t + 0.012, 0]}>
              <boxGeometry args={[cap * 1.02, Math.max(0.015, t * 0.05), w * 1.04]} />
              <meshStandardMaterial color={METAL} metalness={0.82} roughness={0.22} />
            </mesh>
            <mesh position={[x, padH / 2, 0]}>
              <boxGeometry args={[cap * 1.12, padH, w * 0.9]} />
              <meshStandardMaterial color={METAL} metalness={0.82} roughness={0.22} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

function WirewoundChip({ shape, emissive, emissiveIntensity }: ChipProps) {
  const { length: l, width: w, thickness: t } = shape
  const cap = capWidth(l)
  const core = Math.max(l - cap * 2, l * 0.45)
  const turns = Math.max(4, Math.min(11, Math.round(core / Math.max(0.12, t * 0.35))))
  const pitch = core / (turns + 1)
  const wire = Math.min(pitch * 0.28, t * 0.12, w * 0.08)
  const bodyH = t * 0.92
  const bodyW = w * 0.9
  return (
    <group>
      <mesh position={[0, bodyH / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[core, bodyH, bodyW]} />
        <meshStandardMaterial
          color="#e6d9c2"
          roughness={0.58}
          metalness={0.04}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {Array.from({ length: turns }, (_, i) => {
        const x = -core / 2 + pitch * (i + 1)
        return (
          <group key={i}>
            <mesh position={[x, bodyH + wire / 2, 0]}>
              <boxGeometry args={[wire * 1.6, wire, bodyW + wire]} />
              <meshStandardMaterial color={COPPER} metalness={0.55} roughness={0.38} />
            </mesh>
            <mesh position={[x, bodyH / 2, bodyW / 2 + wire * 0.15]}>
              <boxGeometry args={[wire * 1.6, bodyH, wire]} />
              <meshStandardMaterial color={COPPER} metalness={0.55} roughness={0.38} />
            </mesh>
            <mesh position={[x, bodyH / 2, -(bodyW / 2 + wire * 0.15)]}>
              <boxGeometry args={[wire * 1.6, bodyH, wire]} />
              <meshStandardMaterial color={COPPER} metalness={0.55} roughness={0.38} />
            </mesh>
          </group>
        )
      })}
      {([-1, 1] as const).map((side) => (
        <mesh key={side} position={[(l / 2 - cap / 2) * side, t / 2, 0]} castShadow>
          <boxGeometry args={[cap, t, w]} />
          <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.24} />
        </mesh>
      ))}
    </group>
  )
}

function ShuntChip({ shape, emissive, emissiveIntensity }: ChipProps) {
  const { length: l, width: w, thickness: t, id } = shape
  const plate = id === '3920' || id === '5930'
  const term = Math.min(Math.max(l * (plate ? 0.28 : 0.22), 0.2), l * 0.34)
  const alloyLen = Math.max(l - term * 2, l * 0.3)
  const alloyW = w * (plate ? 0.72 : 0.82)
  const alloyH = t * 0.78
  const coatH = Math.max(0.03, t * 0.1)
  const metal = { emissive, emissiveIntensity }
  return (
    <group>
      {([-1, 1] as const).map((side) => (
        <mesh key={side} position={[(l / 2 - term / 2) * side, t / 2, 0]} castShadow>
          <boxGeometry args={[term, t, w]} />
          <meshStandardMaterial color={METAL} metalness={0.88} roughness={0.18} {...metal} />
        </mesh>
      ))}
      <mesh position={[0, alloyH / 2, 0]} castShadow>
        <boxGeometry args={[alloyLen + 0.06, alloyH, alloyW]} />
        <meshStandardMaterial color="#8b929c" metalness={0.8} roughness={0.3} {...metal} />
      </mesh>
      <mesh position={[0, alloyH + coatH / 2, 0]}>
        <boxGeometry args={[alloyLen * 0.78, coatH, alloyW * 0.7]} />
        <meshStandardMaterial color="#2a2c30" roughness={0.58} metalness={0.12} />
      </mesh>
    </group>
  )
}

function GenericChip({ shape, emissive, emissiveIntensity }: ChipProps) {
  const cap = Math.min(shape.length * 0.18, 0.35)
  const bodyLen = Math.max(shape.length - cap * 2, shape.length * 0.5)
  const led = shape.style === 'led'
  const color = led ? (shape.ledColor ?? CHIP_BODY.led) : CHIP_BODY[shape.style]
  return (
    <group>
      <mesh position={[0, shape.thickness / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[bodyLen, shape.thickness, shape.width]} />
        <meshStandardMaterial
          color={color}
          roughness={led ? 0.22 : 0.55}
          metalness={0.05}
          emissive={led ? color : emissive}
          emissiveIntensity={led ? Math.max(emissiveIntensity, 0.18) : emissiveIntensity}
        />
      </mesh>
      {led ? (
        <mesh position={[0, shape.thickness + 0.02, 0]}>
          <boxGeometry args={[bodyLen * 0.45, 0.05, shape.width * 0.5]} />
          <meshStandardMaterial
            color={color}
            roughness={0.12}
            emissive={color}
            emissiveIntensity={0.4}
            transparent
            opacity={0.85}
          />
        </mesh>
      ) : null}
      {shape.style === 'inductor' || shape.style === 'ferrite' ? (
        <mesh position={[0, (shape.thickness * 1.1) / 2, 0]} castShadow>
          <boxGeometry args={[bodyLen * 0.55, shape.thickness * 1.1, shape.width * 1.14]} />
          <meshStandardMaterial color={COPPER} metalness={0.58} roughness={0.34} />
        </mesh>
      ) : null}
      <mesh position={[-(bodyLen / 2 + cap / 2), shape.thickness / 2, 0]} castShadow>
        <boxGeometry args={[cap, shape.thickness * 1.02, shape.width]} />
        <meshStandardMaterial color={METAL} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[bodyLen / 2 + cap / 2, shape.thickness / 2, 0]} castShadow>
        <boxGeometry args={[cap, shape.thickness * 1.02, shape.width]} />
        <meshStandardMaterial color={METAL} metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}
