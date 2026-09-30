import { CHIP_BODY, COPPER, METAL } from '@/components/models/materials'
import type { PackageShape } from '@/lib/packageShapes'

export function ChipBody({
  shape,
  emissive,
  emissiveIntensity,
}: {
  shape: Extract<PackageShape, { type: 'chip' }>
  emissive: string
  emissiveIntensity: number
}) {
  const cap = Math.min(shape.length * 0.18, 0.35)
  const bodyLen = Math.max(shape.length - cap * 2, shape.length * 0.5)
  const led = shape.style === 'led'
  const shunt = shape.style === 'shunt'
  const color = led ? (shape.ledColor ?? CHIP_BODY.led) : CHIP_BODY[shape.style]
  return (
    <group>
      <mesh position={[0, shape.thickness / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[bodyLen, shape.thickness, shape.width]} />
        <meshStandardMaterial
          color={color}
          roughness={led ? 0.22 : shunt ? 0.28 : 0.55}
          metalness={shunt ? 0.55 : 0.05}
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
      {shape.style === 'wirewound' ? (
        <mesh position={[0, shape.thickness / 2, 0]}>
          <boxGeometry args={[bodyLen * 0.72, shape.thickness * 1.08, shape.width * 0.72]} />
          <meshStandardMaterial color="#8a7a5a" roughness={0.6} metalness={0.12} />
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
