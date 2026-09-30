import { GullLead } from '@/components/models/GullLead'
import { GOLD, METAL, PLASTIC } from '@/components/models/materials'
import type { PackageShape } from '@/lib/packageShapes'

function pinXs(pins: number, pitch: number): number[] {
  const perSide = pins / 2
  return Array.from({ length: perSide }, (_, i) => (i - (perSide - 1) / 2) * pitch)
}

export function SoicBody({
  shape,
  emissive,
  emissiveIntensity,
}: {
  shape: Extract<PackageShape, { type: 'soic' | 'tssop' }>
  emissive: string
  emissiveIntensity: number
}) {
  const { length: l, width: w, height: h, pitch, pins } = shape
  const xs = pinXs(pins, pitch)
  const leadW = Math.min(0.38, pitch * 0.45)
  return (
    <group>
      <mesh position={[0, h / 2 + 0.12, 0]} castShadow>
        <boxGeometry args={[l, h, w]} />
        <meshStandardMaterial
          color={PLASTIC}
          roughness={0.38}
          metalness={0.05}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh position={[0, h + 0.14, 0]}>
        <boxGeometry args={[l * 0.72, 0.06, w * 0.55]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>
      <mesh position={[-l / 2 + 0.35, h + 0.16, w / 2 - 0.45]}>
        <cylinderGeometry args={[0.18, 0.18, 0.08, 12]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.6} />
      </mesh>
      {xs.flatMap((x) =>
        ([-1, 1] as const).map((side) => (
          <GullLead
            key={`${x}${side}`}
            x={x}
            side={side}
            bodyHalfZ={w / 2}
            bodyH={h}
            out={shape.type === 'tssop' ? 0.22 : 0.38}
            width={leadW}
          />
        )),
      )}
    </group>
  )
}

export function QfnBody({
  shape,
  emissive,
  emissiveIntensity,
}: {
  shape: Extract<PackageShape, { type: 'qfn' }>
  emissive: string
  emissiveIntensity: number
}) {
  const { length: l, width: w, height: h, pins } = shape
  const perSide = pins / 4
  const pitch = (l - 0.8) / Math.max(perSide - 1, 1)
  const pad = Math.min(0.28, pitch * 0.55)
  const xs = Array.from({ length: perSide }, (_, i) => (i - (perSide - 1) / 2) * pitch)
  return (
    <group>
      <mesh position={[0, h / 2, 0]} castShadow>
        <boxGeometry args={[l, h, w]} />
        <meshStandardMaterial
          color={PLASTIC}
          roughness={0.4}
          metalness={0.05}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[l * 0.55, 0.08, w * 0.55]} />
        <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.22} />
      </mesh>
      <mesh position={[-l / 2 + 0.35, h + 0.02, -w / 2 + 0.35]}>
        <cylinderGeometry args={[0.16, 0.16, 0.06, 10]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.6} />
      </mesh>
      {xs.map((x) => (
        <group key={x}>
          <mesh position={[x, 0.04, w / 2 - 0.12]}>
            <boxGeometry args={[pad, 0.08, 0.35]} />
            <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[x, 0.04, -w / 2 + 0.12]}>
            <boxGeometry args={[pad, 0.08, 0.35]} />
            <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[l / 2 - 0.12, 0.04, x]}>
            <boxGeometry args={[0.35, 0.08, pad]} />
            <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[-l / 2 + 0.12, 0.04, x]}>
            <boxGeometry args={[0.35, 0.08, pad]} />
            <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.25} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export function DipBody({
  shape,
  emissive,
  emissiveIntensity,
}: {
  shape: Extract<PackageShape, { type: 'dip' }>
  emissive: string
  emissiveIntensity: number
}) {
  const { length: l, width: w, height: h, pitch, pins } = shape
  const xs = pinXs(pins, pitch)
  const leadH = 2.8
  return (
    <group>
      <mesh position={[0, leadH + h / 2, 0]} castShadow>
        <boxGeometry args={[l, h, w]} />
        <meshStandardMaterial
          color={PLASTIC}
          roughness={0.42}
          metalness={0.04}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh position={[-l / 2 + 0.6, leadH + h + 0.04, -w / 2 + 0.7]}>
        <cylinderGeometry args={[0.28, 0.28, 0.08, 12]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.6} />
      </mesh>
      {xs.flatMap((x) =>
        ([-1, 1] as const).map((side) => (
          <mesh key={`${x}${side}`} position={[x, leadH / 2, side * (w / 2 + 0.15)]}>
            <boxGeometry args={[0.45, leadH, 0.22]} />
            <meshStandardMaterial color={GOLD} metalness={0.7} roughness={0.28} />
          </mesh>
        )),
      )}
    </group>
  )
}
