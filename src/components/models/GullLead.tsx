import { METAL } from '@/components/models/materials'

export function GullLead({
  x,
  side,
  bodyHalfZ,
  bodyH,
  out = 0.16,
  width = 0.38,
}: {
  x: number
  side: 1 | -1
  bodyHalfZ: number
  bodyH: number
  out?: number
  width?: number
}) {
  const t = 0.1
  const footLen = 0.5
  const shoulderY = bodyH * 0.38
  return (
    <group>
      <mesh position={[x, t / 2, side * (bodyHalfZ + footLen * 0.55 + out)]}>
        <boxGeometry args={[width, t, footLen]} />
        <meshStandardMaterial color={METAL} metalness={0.78} roughness={0.26} />
      </mesh>
      <mesh position={[x, shoulderY / 2, side * (bodyHalfZ + 0.1)]}>
        <boxGeometry args={[width, shoulderY, t]} />
        <meshStandardMaterial color={METAL} metalness={0.78} roughness={0.26} />
      </mesh>
      <mesh position={[x, shoulderY, side * (bodyHalfZ + out * 0.5 + 0.08)]}>
        <boxGeometry args={[width, t, 0.32 + out * 0.4]} />
        <meshStandardMaterial color={METAL} metalness={0.78} roughness={0.26} />
      </mesh>
    </group>
  )
}
