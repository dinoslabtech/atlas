import { GOLD, METAL } from '@/components/models/materials'
import { HEADER_HOUSING, HEADER_PIN_ABOVE, type PackageShape } from '@/lib/packageShapes'

export function HeaderBody({ shape }: { shape: Extract<PackageShape, { type: 'header' }> }) {
  const { rows, cols, pitch } = shape
  return (
    <group>
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          const x = (c - (cols - 1) / 2) * pitch
          const z = (r - (rows - 1) / 2) * pitch
          return (
            <group key={`${r}-${c}`} position={[x, 0, z]}>
              <mesh position={[0, HEADER_HOUSING / 2, 0]} castShadow>
                <boxGeometry args={[2.4, HEADER_HOUSING, 2.4]} />
                <meshStandardMaterial color="#161616" roughness={0.42} metalness={0.06} />
              </mesh>
              <mesh position={[0, HEADER_HOUSING + HEADER_PIN_ABOVE / 2, 0]} castShadow>
                <boxGeometry args={[0.64, HEADER_PIN_ABOVE, 0.64]} />
                <meshStandardMaterial color={GOLD} metalness={0.88} roughness={0.18} />
              </mesh>
              <mesh position={[0, -1.4, 0]}>
                <boxGeometry args={[0.5, 2.8, 0.5]} />
                <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.2} />
              </mesh>
            </group>
          )
        }),
      )}
    </group>
  )
}

export function UsbCBody() {
  return (
    <group>
      <mesh position={[0, 1.6, 0]} castShadow>
        <boxGeometry args={[9.0, 3.2, 7.2]} />
        <meshStandardMaterial color={METAL} metalness={0.75} roughness={0.28} />
      </mesh>
      <mesh position={[0, 1.6, 3.2]}>
        <boxGeometry args={[8.2, 2.4, 1.2]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.6, 3.6]}>
        <boxGeometry args={[7.4, 0.7, 0.4]} />
        <meshStandardMaterial color={GOLD} metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}

export function Rj45Body() {
  return (
    <group>
      <mesh position={[0, 6.5, 0]} castShadow>
        <boxGeometry args={[16, 13, 13]} />
        <meshStandardMaterial color="#1c1c1c" roughness={0.45} metalness={0.05} />
      </mesh>
      <mesh position={[0, 6.2, 5.2]}>
        <boxGeometry args={[11.5, 8, 4]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.55} />
      </mesh>
      {Array.from({ length: 8 }, (_, i) => {
        const x = (i - 3.5) * 1.02
        return (
          <mesh key={i} position={[x, 3.2, 6.4]}>
            <boxGeometry args={[0.4, 4.2, 0.3]} />
            <meshStandardMaterial color={GOLD} metalness={0.8} roughness={0.22} />
          </mesh>
        )
      })}
    </group>
  )
}

export function TerminalBlockBody({ poles }: { poles: number }) {
  const pitch = 5.08
  const length = poles * pitch
  return (
    <group>
      <mesh position={[0, 5, 0]} castShadow>
        <boxGeometry args={[length, 10, 8]} />
        <meshStandardMaterial color="#0e6b3c" roughness={0.5} metalness={0.04} />
      </mesh>
      {Array.from({ length: poles }, (_, i) => {
        const x = (i - (poles - 1) / 2) * pitch
        return (
          <group key={i} position={[x, 0, 0]}>
            <mesh position={[0, 10.3, 0]}>
              <cylinderGeometry args={[1.1, 1.1, 0.6, 12]} />
              <meshStandardMaterial color={METAL} metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[0, 1.4, 0]}>
              <boxGeometry args={[0.7, 2.8, 0.7]} />
              <meshStandardMaterial color={METAL} metalness={0.75} roughness={0.28} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
