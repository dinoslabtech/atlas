import { GullLead } from '@/components/models/GullLead'
import { METAL, PLASTIC } from '@/components/models/materials'

export function Sot23Body({ emissive, emissiveIntensity }: { emissive: string; emissiveIntensity: number }) {
  const l = 2.9
  const w = 1.3
  const h = 1.1
  return (
    <group>
      <mesh position={[0, h / 2 + 0.08, 0]} castShadow>
        <boxGeometry args={[l, h, w]} />
        <meshStandardMaterial
          color={PLASTIC}
          roughness={0.4}
          metalness={0.04}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh position={[-l / 2 + 0.28, h + 0.1, -w / 2 + 0.28]}>
        <cylinderGeometry args={[0.12, 0.12, 0.06, 10]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.6} />
      </mesh>
      {[-0.95, 0.95].map((x) => (
        <GullLead key={`a${x}`} x={x} side={1} bodyHalfZ={w / 2} bodyH={h} />
      ))}
      <GullLead x={0} side={-1} bodyHalfZ={w / 2} bodyH={h} />
    </group>
  )
}

export function To92Body({ emissive, emissiveIntensity }: { emissive: string; emissiveIntensity: number }) {
  const r = 2.1
  const bodyH = 4.0
  const leadH = 1.5
  const bodyY = leadH + bodyH / 2
  return (
    <group>
      <mesh position={[0, bodyY, 0.15]} castShadow>
        <cylinderGeometry args={[r, r, bodyH, 24, 1, false, Math.PI * 0.15, Math.PI * 1.7]} />
        <meshStandardMaterial
          color={PLASTIC}
          roughness={0.45}
          metalness={0.04}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh position={[0, bodyY, -r * 0.55]} castShadow>
        <boxGeometry args={[r * 1.7, bodyH, 0.18]} />
        <meshStandardMaterial color={PLASTIC} roughness={0.45} metalness={0.04} />
      </mesh>
      {[-1.27, 0, 1.27].map((x) => (
        <mesh key={x} position={[x, leadH / 2, 0]}>
          <boxGeometry args={[0.4, leadH, 0.18]} />
          <meshStandardMaterial color={METAL} metalness={0.75} roughness={0.28} />
        </mesh>
      ))}
    </group>
  )
}
