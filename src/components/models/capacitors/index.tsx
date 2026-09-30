import { BEIGE, METAL, PLASTIC, SLEEVE, SUPERCAP, TANTALUM_STRIPE } from '@/components/models/materials'
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
  const electrolytic = shape.kind === 'electrolytic'
  const lidH = Math.min(0.45, Math.max(0.22, shape.height * 0.06))
  const leadH = shape.tht ? 2.5 : 0
  const baseH = shape.tht ? 0 : Math.min(1.15, Math.max(0.75, shape.height * 0.1))
  const sleeveH = shape.height - lidH - baseH
  const lift = leadH + baseH
  const sleeveY = lift + sleeveH / 2
  const lidY = lift + sleeveH + lidH / 2
  const lidTop = lift + sleeveH + lidH
  const sleeveColor = electrolytic ? SLEEVE : SUPERCAP
  const leadPitch = Math.min(r * 0.85, 5)
  const leadInto = Math.min(2.0, sleeveH * 0.3)
  const leadLen = leadH + leadInto
  const groove = Math.max(0.08, r * 0.05)

  return (
    <group>
      {shape.tht ? (
        <>
          {[-leadPitch / 2, leadPitch / 2].map((x) => (
            <mesh key={x} position={[x, leadLen / 2, 0]}>
              <cylinderGeometry args={[0.18, 0.18, leadLen, 8]} />
              <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.25} />
            </mesh>
          ))}
          <mesh position={[0, leadH + 0.1, 0]}>
            <cylinderGeometry args={[r * 0.92, r * 0.96, 0.22, 24]} />
            <meshStandardMaterial color="#2a2824" roughness={0.7} metalness={0.04} />
          </mesh>
        </>
      ) : (
        <>
          <mesh position={[0, baseH / 2, 0]} castShadow>
            <cylinderGeometry args={[r * 1.02, r * 1.08, baseH, 24]} />
            <meshStandardMaterial color={PLASTIC} roughness={0.5} metalness={0.08} />
          </mesh>
          {[-1, 1].map((side) => (
            <mesh key={side} position={[side * (r * 0.78), 0.07, 0]}>
              <boxGeometry args={[r * 0.7, 0.14, r * 0.95]} />
              <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.25} />
            </mesh>
          ))}
          {electrolytic ? (
            <mesh position={[r * 0.55, baseH + 0.02, 0]}>
              <boxGeometry args={[r * 0.4, 0.06, r * 0.55]} />
              <meshStandardMaterial color="#d8dce2" roughness={0.4} />
            </mesh>
          ) : null}
        </>
      )}
      <mesh position={[0, sleeveY, 0]} castShadow>
        <cylinderGeometry args={[r, r, sleeveH, 32]} />
        <meshStandardMaterial
          color={sleeveColor}
          roughness={electrolytic ? 0.38 : 0.48}
          metalness={electrolytic ? 0.12 : 0.22}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {electrolytic ? (
        <>
          <mesh position={[0, sleeveY, 0]}>
            <cylinderGeometry args={[r + 0.04, r + 0.04, sleeveH * 0.86, 24, 1, true, -0.55, 1.1]} />
            <meshStandardMaterial color="#d8dce2" roughness={0.35} metalness={0.35} />
          </mesh>
          {[-0.25, 0, 0.25].map((t) => (
            <mesh key={t} position={[r + 0.07, sleeveY + t * sleeveH, 0]}>
              <boxGeometry args={[0.06, 0.1, r * 0.34]} />
              <meshStandardMaterial color="#f2f2f2" roughness={0.4} />
            </mesh>
          ))}
        </>
      ) : null}
      <mesh position={[0, lift + sleeveH, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[r - 0.02, Math.min(0.14, lidH * 0.45), 8, 28]} />
        <meshStandardMaterial color={METAL} metalness={0.75} roughness={0.28} />
      </mesh>
      <mesh position={[0, lidY, 0]} castShadow>
        <cylinderGeometry args={[r - 0.1, r - 0.05, lidH, 32]} />
        <meshStandardMaterial color={METAL} metalness={0.82} roughness={0.22} />
      </mesh>
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle) => (
        <mesh
          key={angle}
          position={[Math.cos(angle) * r * 0.2, lidTop + 0.02, Math.sin(angle) * r * 0.2]}
          rotation={[0, -angle, 0]}
        >
          <boxGeometry args={[r * 0.42, 0.05, groove]} />
          <meshStandardMaterial color="#4e535a" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
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
  const term = Math.min(0.28, shape.length * 0.12)
  const stripe = Math.min(0.38, shape.length * 0.16)
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
      <mesh position={[shape.length / 2 - term - stripe / 2, shape.height / 2 + 0.02, 0]} castShadow>
        <boxGeometry args={[stripe, shape.height + 0.02, shape.width + 0.03]} />
        <meshStandardMaterial color={TANTALUM_STRIPE} roughness={0.4} metalness={0.08} />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh position={[(shape.length / 2 - pad / 2) * side, 0.05, 0]}>
            <boxGeometry args={[pad, 0.1, shape.width * 0.78]} />
            <meshStandardMaterial color={METAL} metalness={0.75} roughness={0.28} />
          </mesh>
          <mesh position={[(shape.length / 2 + 0.02) * side, shape.height * 0.28, 0]}>
            <boxGeometry args={[0.1, shape.height * 0.56, shape.width * 0.78]} />
            <meshStandardMaterial color={METAL} metalness={0.75} roughness={0.28} />
          </mesh>
        </group>
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
  const into = Math.min(1.8, shape.height * 0.22)
  const leadLen = leadH + into
  return (
    <group>
      {[-shape.leadPitch / 2, shape.leadPitch / 2].map((x) => (
        <mesh key={x} position={[x, leadLen / 2, 0]}>
          <cylinderGeometry args={[0.2, 0.2, leadLen, 8]} />
          <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.25} />
        </mesh>
      ))}
      <mesh position={[0, leadH + shape.height / 2, 0]} castShadow>
        <boxGeometry args={[shape.length, shape.height, shape.width]} />
        <meshStandardMaterial
          color="#d4a04a"
          roughness={0.5}
          metalness={0.04}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
    </group>
  )
}
