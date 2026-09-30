import { METAL, PLASTIC } from '@/components/models/materials'
import type { PackageShape } from '@/lib/packageShapes'

export function DiodeTabBody({
  shape,
  emissive,
  emissiveIntensity,
}: {
  shape: Extract<PackageShape, { type: 'sod' | 'sma' }>
  emissive: string
  emissiveIntensity: number
}) {
  const bodyLen = shape.length * 0.58
  const overlap = 0.06
  const tabLen = (shape.length - bodyLen) / 2 + overlap
  const tabH = Math.max(shape.height * 0.22, 0.16)
  const tabW = shape.width * 0.78
  const tabX = bodyLen / 2 + tabLen / 2 - overlap
  const band = Math.min(0.22, bodyLen * 0.18)
  return (
    <group>
      <mesh position={[0, shape.height / 2, 0]} castShadow>
        <boxGeometry args={[bodyLen, shape.height, shape.width]} />
        <meshStandardMaterial
          color={PLASTIC}
          roughness={0.42}
          metalness={0.04}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh position={[bodyLen / 2 - band / 2 - 0.08, shape.height / 2, 0]}>
        <boxGeometry args={[band, shape.height + 0.04, shape.width + 0.04]} />
        <meshStandardMaterial color="#ececec" roughness={0.35} metalness={0.1} />
      </mesh>
      <mesh position={[tabX, tabH / 2, 0]} castShadow>
        <boxGeometry args={[tabLen, tabH, tabW]} />
        <meshStandardMaterial color={METAL} metalness={0.78} roughness={0.26} />
      </mesh>
      <mesh position={[-tabX, tabH / 2, 0]} castShadow>
        <boxGeometry args={[tabLen, tabH, tabW]} />
        <meshStandardMaterial color={METAL} metalness={0.78} roughness={0.26} />
      </mesh>
    </group>
  )
}

export function LedDomeBody({
  diameter,
  color,
  emissive,
  emissiveIntensity,
}: {
  diameter: number
  color: string
  emissive: string
  emissiveIntensity: number
}) {
  const r = diameter / 2
  const cylH = diameter * 0.55
  const flangeH = 0.3
  const leadH = 1.4
  return (
    <group>
      {[-0.5, 0.5].map((x) => (
        <mesh key={x} position={[x, leadH / 2, 0]}>
          <boxGeometry args={[0.22, leadH, 0.14]} />
          <meshStandardMaterial color={METAL} metalness={0.75} roughness={0.28} />
        </mesh>
      ))}
      <mesh position={[0, leadH + flangeH / 2, 0]} castShadow>
        <cylinderGeometry args={[r * 1.18, r * 1.18, flangeH, 24]} />
        <meshStandardMaterial color={color} roughness={0.28} metalness={0.05} />
      </mesh>
      <mesh position={[0, leadH + flangeH + cylH / 2, 0]} castShadow>
        <cylinderGeometry args={[r, r, cylH, 24]} />
        <meshStandardMaterial
          color={color}
          roughness={0.18}
          transparent
          opacity={0.88}
          emissive={emissive === '#000000' ? color : emissive}
          emissiveIntensity={Math.max(emissiveIntensity, 0.2)}
        />
      </mesh>
      <mesh position={[0, leadH + flangeH + cylH, 0]} castShadow>
        <sphereGeometry args={[r, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color={color}
          roughness={0.14}
          transparent
          opacity={0.88}
          emissive={emissive === '#000000' ? color : emissive}
          emissiveIntensity={Math.max(emissiveIntensity, 0.22)}
        />
      </mesh>
    </group>
  )
}
