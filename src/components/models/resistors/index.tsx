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
  const { length: l, width: w, thickness: t, count } = shape
  const slot = l / count
  const gap = Math.min(0.05, slot * 0.1)
  const seg = slot - gap
  const termD = Math.min(0.22, Math.max(0.08, w * 0.14))
  const termW = Math.min(slot * 0.7, seg * 0.78)
  const bulge = Math.min(0.045, w * 0.05)
  const coatH = Math.max(0.02, t * 0.08)
  const body = {
    color: CHIP_BODY.resistor,
    roughness: 0.5,
    metalness: 0.04,
    emissive,
    emissiveIntensity,
  }
  return (
    <group>
      <mesh position={[0, t * 0.4, 0]} castShadow>
        <boxGeometry args={[l, t * 0.8, w * 0.86]} />
        <meshStandardMaterial {...body} />
      </mesh>
      {Array.from({ length: count }, (_, i) => {
        const x = -l / 2 + slot * (i + 0.5)
        return (
          <group key={i}>
            <mesh position={[x, t / 2, 0]} castShadow>
              <boxGeometry args={[seg, t, w * 0.78]} />
              <meshStandardMaterial {...body} roughness={0.48} />
            </mesh>
            <mesh position={[x, t + coatH / 2, 0]}>
              <boxGeometry args={[seg * 0.62, coatH, w * 0.42]} />
              <meshStandardMaterial color="#5c4c36" roughness={0.5} metalness={0.02} />
            </mesh>
            {([-1, 1] as const).map((side) => (
              <group key={side}>
                <mesh position={[x, t * 0.52, side * (w / 2 - termD / 2 + bulge)]} castShadow>
                  <boxGeometry args={[termW, t * 1.04, termD]} />
                  <meshStandardMaterial color={METAL} metalness={0.82} roughness={0.22} />
                </mesh>
                <mesh position={[x, 0.02, side * (w / 2 - termD * 0.35)]}>
                  <boxGeometry args={[termW, 0.04, termD * 1.15]} />
                  <meshStandardMaterial color={METAL} metalness={0.82} roughness={0.22} />
                </mesh>
              </group>
            ))}
          </group>
        )
      })}
    </group>
  )
}
