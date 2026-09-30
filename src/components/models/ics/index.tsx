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
  const tssop = shape.type === 'tssop'
  const xs = pinXs(pins, pitch)
  const standoff = tssop ? 0.08 : 0.14
  const leadW = tssop ? Math.min(0.22, pitch * 0.34) : Math.min(0.42, pitch * 0.36)
  const out = tssop ? 0.42 : 0.55
  const dimpleR = tssop ? 0.11 : 0.2
  const bodyY = h / 2 + standoff
  return (
    <group>
      <mesh position={[0, bodyY, 0]} castShadow>
        <boxGeometry args={[l, h, w]} />
        <meshStandardMaterial
          color={PLASTIC}
          roughness={0.38}
          metalness={0.05}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh position={[0, standoff + h + 0.02, 0]}>
        <boxGeometry args={[l * (tssop ? 0.58 : 0.74), 0.05, w * (tssop ? 0.4 : 0.56)]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>
      <mesh position={[-l / 2 + (tssop ? 0.28 : 0.42), standoff + h + 0.04, -w / 2 + (tssop ? 0.28 : 0.42)]}>
        <cylinderGeometry args={[dimpleR, dimpleR, 0.08, 12]} />
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
            out={out}
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
  const corner = 0.75
  const pitch = (l - corner * 2) / Math.max(perSide - 1, 1)
  const padW = Math.min(0.24, pitch * 0.48)
  const padLen = 0.48
  const padH = 0.07
  const flankH = 0.32
  const xs = Array.from({ length: perSide }, (_, i) => (i - (perSide - 1) / 2) * pitch)
  const ep = Math.min(l, w) * 0.68
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
      <mesh position={[0, h + 0.02, 0]}>
        <boxGeometry args={[l * 0.7, 0.05, w * 0.7]} />
        <meshStandardMaterial color="#242424" roughness={0.5} />
      </mesh>
      <mesh position={[-l / 2 + 0.22, h / 2, -w / 2 + 0.22]}>
        <boxGeometry args={[0.44, h + 0.02, 0.44]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.55} />
      </mesh>
      <mesh position={[-l / 2 + 0.48, h + 0.03, -w / 2 + 0.48]}>
        <cylinderGeometry args={[0.18, 0.18, 0.08, 12]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.6} />
      </mesh>
      <mesh position={[0, padH / 2, 0]}>
        <boxGeometry args={[ep, padH, ep]} />
        <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.22} />
      </mesh>
      {xs.map((x) => (
        <group key={x}>
          <mesh position={[x, padH / 2, w / 2 - padLen / 2 + 0.08]}>
            <boxGeometry args={[padW, padH, padLen]} />
            <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[x, flankH / 2, w / 2 + 0.03]}>
            <boxGeometry args={[padW, flankH, 0.08]} />
            <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[x, padH / 2, -w / 2 + padLen / 2 - 0.08]}>
            <boxGeometry args={[padW, padH, padLen]} />
            <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[x, flankH / 2, -w / 2 - 0.03]}>
            <boxGeometry args={[padW, flankH, 0.08]} />
            <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[l / 2 - padLen / 2 + 0.08, padH / 2, x]}>
            <boxGeometry args={[padLen, padH, padW]} />
            <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[l / 2 + 0.03, flankH / 2, x]}>
            <boxGeometry args={[0.08, flankH, padW]} />
            <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[-l / 2 + padLen / 2 - 0.08, padH / 2, x]}>
            <boxGeometry args={[padLen, padH, padW]} />
            <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[-l / 2 - 0.03, flankH / 2, x]}>
            <boxGeometry args={[0.08, flankH, padW]} />
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
  const row = 7.62
  const leadW = 0.46
  const leadT = 0.25
  const shoulderY = leadH + 0.7
  const halfRow = row / 2
  const shoulderLen = halfRow - w / 2 + 0.2
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
      <mesh position={[0, leadH + h + 0.04, 0]}>
        <boxGeometry args={[l * 0.7, 0.08, w * 0.52]} />
        <meshStandardMaterial color="#222222" roughness={0.5} />
      </mesh>
      <mesh position={[-l / 2, leadH + h / 2, 0]}>
        <cylinderGeometry args={[0.85, 0.85, h + 0.06, 20]} />
        <meshStandardMaterial color="#0c0c0c" roughness={0.55} />
      </mesh>
      <mesh position={[-l / 2 + 0.9, leadH + h + 0.06, -w / 2 + 0.7]}>
        <cylinderGeometry args={[0.28, 0.28, 0.1, 12]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.6} />
      </mesh>
      {xs.flatMap((x) =>
        ([-1, 1] as const).map((side) => (
          <group key={`${x}${side}`}>
            <mesh position={[x, shoulderY / 2, side * halfRow]}>
              <boxGeometry args={[leadW, shoulderY, leadT]} />
              <meshStandardMaterial color={GOLD} metalness={0.7} roughness={0.28} />
            </mesh>
            <mesh position={[x, shoulderY, side * (w / 2 + shoulderLen / 2 - 0.05)]}>
              <boxGeometry args={[leadW, leadT, shoulderLen]} />
              <meshStandardMaterial color={GOLD} metalness={0.7} roughness={0.28} />
            </mesh>
          </group>
        )),
      )}
    </group>
  )
}
