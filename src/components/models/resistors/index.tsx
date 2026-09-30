import { CHIP_BODY, METAL } from '@/components/models/materials'
import type { PackageShape } from '@/lib/packageShapes'

export function ArrayBody({
  shape,
  emissive,
  emissiveIntensity,
}: {
  shape: Extract<PackageShape, { type: 'array' }>
  emissive: string
  emissiveIntensity: number
}) {
  const cap = Math.min(shape.length * 0.08, 0.22)
  const slot = shape.length / shape.count
  return (
    <group>
      <mesh position={[0, shape.thickness / 2, 0]} castShadow>
        <boxGeometry args={[shape.length, shape.thickness, shape.width]} />
        <meshStandardMaterial
          color={CHIP_BODY.resistor}
          roughness={0.5}
          metalness={0.05}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {Array.from({ length: shape.count - 1 }, (_, i) => {
        const x = -shape.length / 2 + slot * (i + 1)
        return (
          <mesh key={i} position={[x, shape.thickness * 0.7, 0]}>
            <boxGeometry args={[0.04, shape.thickness * 0.5, shape.width * 0.9]} />
            <meshStandardMaterial color="#5c4a32" roughness={0.6} />
          </mesh>
        )
      })}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[(shape.length / 2 - cap / 2) * side, shape.thickness / 2, 0]}>
          <boxGeometry args={[cap, shape.thickness * 1.02, shape.width]} />
          <meshStandardMaterial color={METAL} metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  )
}
