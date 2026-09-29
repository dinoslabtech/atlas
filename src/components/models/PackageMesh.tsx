import { type ThreeEvent } from '@react-three/fiber'
import {
  HEADER_HOUSING,
  HEADER_PIN_ABOVE,
  HEADER_PITCH,
  type PackageShape,
} from '@/lib/packageShapes'

const BODY: Record<string, string> = {
  resistor: '#c9b896',
  ceramic: '#6b4a2b',
  inductor: '#3a3a3a',
  led: '#e53935',
}

const METAL = '#c5c9d0'
const GOLD = '#e2c36a'
const PLASTIC = '#1a1a1a'
const COPPER = '#b87333'
const FERRITE = '#2c2c2c'
const BEIGE = '#d7c4a3'
const TANTALUM_STRIPE = '#6b3e2e'
const SLEEVE = '#1a4a8c'
const LED_RED = '#d32f2f'

type PackageMeshProps = {
  shape: PackageShape
  selected?: boolean
  onSelect?: (id: string) => void
}

export function PackageMesh({ shape, selected, onSelect }: PackageMeshProps) {
  const emissive = selected ? '#111111' : '#000000'
  const emissiveIntensity = selected ? 0.12 : 0

  function handleClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation()
    onSelect?.(shape.id)
  }

  const radius = markerRadius(shape)
  return (
    <group onClick={onSelect ? handleClick : undefined}>
      {selected ? (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <ringGeometry args={[radius * 0.7, radius, 48]} />
          <meshBasicMaterial color="#18181b" />
        </mesh>
      ) : null}
      <ShapeBody shape={shape} emissive={emissive} emissiveIntensity={emissiveIntensity} />
    </group>
  )
}

function ShapeBody({
  shape,
  emissive,
  emissiveIntensity,
}: {
  shape: PackageShape
  emissive: string
  emissiveIntensity: number
}) {
  switch (shape.type) {
    case 'chip':
      return <ChipBody shape={shape} emissive={emissive} emissiveIntensity={emissiveIntensity} />
    case 'can':
      return <CanBody shape={shape} emissive={emissive} emissiveIntensity={emissiveIntensity} />
    case 'block':
      return (
        <mesh position={[0, shape.height / 2, 0]} castShadow>
          <boxGeometry args={[shape.length, shape.height, shape.width]} />
          <meshStandardMaterial
            color={shape.color}
            roughness={0.45}
            metalness={0.08}
            emissive={emissive}
            emissiveIntensity={emissiveIntensity}
          />
        </mesh>
      )
    case 'tantalum':
      return <TantalumBody shape={shape} emissive={emissive} emissiveIntensity={emissiveIntensity} />
    case 'power':
      return <PowerInductorBody shape={shape} emissive={emissive} emissiveIntensity={emissiveIntensity} />
    case 'sod':
    case 'sma':
      return <DiodeTabBody shape={shape} emissive={emissive} emissiveIntensity={emissiveIntensity} />
    case 'sot23':
      return <Sot23Body emissive={emissive} emissiveIntensity={emissiveIntensity} />
    case 'to92':
      return <To92Body emissive={emissive} emissiveIntensity={emissiveIntensity} />
    case 'soic':
      return <SoicBody emissive={emissive} emissiveIntensity={emissiveIntensity} />
    case 'header':
      return <HeaderBody pins={shape.pins} />
    case 'led-tht':
      return <LedDomeBody diameter={shape.diameter} emissive={emissive} emissiveIntensity={emissiveIntensity} />
    default:
      return null
  }
}

function ChipBody({
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
  return (
    <group>
      <mesh position={[0, shape.thickness / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[bodyLen, shape.thickness, shape.width]} />
        <meshStandardMaterial
          color={BODY[shape.style]}
          roughness={led ? 0.22 : 0.55}
          metalness={0.05}
          emissive={led ? LED_RED : emissive}
          emissiveIntensity={led ? Math.max(emissiveIntensity, 0.18) : emissiveIntensity}
        />
      </mesh>
      {led ? (
        <mesh position={[0, shape.thickness + 0.02, 0]}>
          <boxGeometry args={[bodyLen * 0.45, 0.05, shape.width * 0.5]} />
          <meshStandardMaterial
            color="#ff8a80"
            roughness={0.12}
            emissive="#ff1744"
            emissiveIntensity={0.4}
            transparent
            opacity={0.85}
          />
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

function CanBody({
  shape,
  emissive,
  emissiveIntensity,
}: {
  shape: Extract<PackageShape, { type: 'can' }>
  emissive: string
  emissiveIntensity: number
}) {
  const r = shape.diameter / 2
  const lidH = Math.min(0.45, Math.max(0.22, shape.height * 0.06))
  const sleeveH = shape.height - lidH
  return (
    <group>
      <mesh position={[0, sleeveH / 2, 0]} castShadow>
        <cylinderGeometry args={[r, r, sleeveH, 32]} />
        <meshStandardMaterial
          color={SLEEVE}
          roughness={0.38}
          metalness={0.12}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh position={[0, sleeveH / 2, 0]}>
        <cylinderGeometry args={[r + 0.03, r + 0.03, sleeveH * 0.9, 24, 1, false, -0.38, 0.76]} />
        <meshStandardMaterial color="#d8dce2" roughness={0.35} metalness={0.35} />
      </mesh>
      <mesh position={[0, sleeveH + lidH / 2, 0]} castShadow>
        <cylinderGeometry args={[r - 0.08, r - 0.04, lidH, 32]} />
        <meshStandardMaterial color={METAL} metalness={0.82} roughness={0.22} />
      </mesh>
    </group>
  )
}

function TantalumBody({
  shape,
  emissive,
  emissiveIntensity,
}: {
  shape: Extract<PackageShape, { type: 'tantalum' }>
  emissive: string
  emissiveIntensity: number
}) {
  const stripe = Math.min(0.4, shape.length * 0.18)
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
      <mesh position={[shape.length / 2 - stripe / 2, shape.height / 2, 0]} castShadow>
        <boxGeometry args={[stripe, shape.height + 0.04, shape.width + 0.04]} />
        <meshStandardMaterial color={TANTALUM_STRIPE} roughness={0.4} metalness={0.08} />
      </mesh>
    </group>
  )
}

function PowerInductorBody({
  shape,
  emissive,
  emissiveIntensity,
}: {
  shape: Extract<PackageShape, { type: 'power' }>
  emissive: string
  emissiveIntensity: number
}) {
  const { length: l, width: w, height: h } = shape
  return (
    <group>
      <mesh position={[0, h / 2, 0]} castShadow>
        <boxGeometry args={[l, h, w]} />
        <meshStandardMaterial
          color={FERRITE}
          roughness={0.72}
          metalness={0.08}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh position={[0, h / 2, 0]} castShadow>
        <boxGeometry args={[l * 1.04, h * 0.42, w * 1.06]} />
        <meshStandardMaterial color={COPPER} metalness={0.7} roughness={0.32} />
      </mesh>
      <mesh position={[l * 0.32, 0.05, 0]}>
        <boxGeometry args={[l * 0.28, 0.1, w * 0.72]} />
        <meshStandardMaterial color={METAL} metalness={0.75} roughness={0.28} />
      </mesh>
      <mesh position={[-l * 0.32, 0.05, 0]}>
        <boxGeometry args={[l * 0.28, 0.1, w * 0.72]} />
        <meshStandardMaterial color={METAL} metalness={0.75} roughness={0.28} />
      </mesh>
    </group>
  )
}

function DiodeTabBody({
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

function Sot23Body({ emissive, emissiveIntensity }: { emissive: string; emissiveIntensity: number }) {
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
      {[-0.95, 0.95].map((x) => (
        <GullLead key={`a${x}`} x={x} side={1} bodyHalfZ={w / 2} bodyH={h} />
      ))}
      <GullLead x={0} side={-1} bodyHalfZ={w / 2} bodyH={h} />
    </group>
  )
}

function SoicBody({ emissive, emissiveIntensity }: { emissive: string; emissiveIntensity: number }) {
  const l = 5.0
  const w = 4.0
  const h = 1.75
  const pitch = 1.27
  const pins = [-1.5, -0.5, 0.5, 1.5].map((i) => i * pitch)
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
      {pins.flatMap((x) =>
        ([-1, 1] as const).map((side) => (
          <GullLead key={`${x}${side}`} x={x} side={side} bodyHalfZ={w / 2} bodyH={h} out={0.38} />
        )),
      )}
    </group>
  )
}

function GullLead({
  x,
  side,
  bodyHalfZ,
  bodyH,
  out = 0.16,
}: {
  x: number
  side: 1 | -1
  bodyHalfZ: number
  bodyH: number
  out?: number
}) {
  const t = 0.1
  const w = 0.38
  const footLen = 0.5
  const shoulderY = Math.min(bodyH * 0.38, 0.42)
  return (
    <group>
      <mesh position={[x, t / 2, side * (bodyHalfZ + footLen * 0.55 + out)]}>
        <boxGeometry args={[w, t, footLen]} />
        <meshStandardMaterial color={METAL} metalness={0.78} roughness={0.26} />
      </mesh>
      <mesh position={[x, shoulderY / 2, side * (bodyHalfZ + 0.1)]}>
        <boxGeometry args={[w, shoulderY, t]} />
        <meshStandardMaterial color={METAL} metalness={0.78} roughness={0.26} />
      </mesh>
      <mesh position={[x, shoulderY, side * (bodyHalfZ + out * 0.5 + 0.08)]}>
        <boxGeometry args={[w, t, 0.32 + out * 0.4]} />
        <meshStandardMaterial color={METAL} metalness={0.78} roughness={0.26} />
      </mesh>
    </group>
  )
}

function To92Body({ emissive, emissiveIntensity }: { emissive: string; emissiveIntensity: number }) {
  const r = 2.1
  const bodyH = 4.0
  const leadH = 1.5
  const bodyY = leadH + bodyH / 2
  return (
    <group>
      <mesh position={[0, bodyY, 0]} castShadow>
        <cylinderGeometry args={[r, r, bodyH, 24, 1, false, Math.PI, Math.PI]} />
        <meshStandardMaterial
          color={PLASTIC}
          roughness={0.45}
          metalness={0.04}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh position={[0, bodyY, 0.06]} castShadow>
        <boxGeometry args={[r * 2, bodyH, 0.14]} />
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

function HeaderBody({ pins }: { pins: number }) {
  return (
    <group>
      {Array.from({ length: pins }, (_, i) => {
        const x = (i - (pins - 1) / 2) * HEADER_PITCH
        return (
          <group key={i} position={[x, 0, 0]}>
            <mesh position={[0, HEADER_HOUSING / 2, 0]} castShadow>
              <boxGeometry args={[2.4, HEADER_HOUSING, 2.4]} />
              <meshStandardMaterial color="#161616" roughness={0.42} metalness={0.06} />
            </mesh>
            <mesh position={[0, HEADER_HOUSING + HEADER_PIN_ABOVE / 2, 0]} castShadow>
              <boxGeometry args={[0.64, HEADER_PIN_ABOVE, 0.64]} />
              <meshStandardMaterial color={GOLD} metalness={0.88} roughness={0.18} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

function LedDomeBody({
  diameter,
  emissive,
  emissiveIntensity,
}: {
  diameter: number
  emissive: string
  emissiveIntensity: number
}) {
  const r = diameter / 2
  const cylH = diameter * 0.55
  const flangeH = 0.3
  const color = LED_RED
  return (
    <group>
      <mesh position={[0, flangeH / 2, 0]} castShadow>
        <cylinderGeometry args={[r * 1.18, r * 1.18, flangeH, 24]} />
        <meshStandardMaterial color={color} roughness={0.28} metalness={0.05} />
      </mesh>
      <mesh position={[0, flangeH + cylH / 2, 0]} castShadow>
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
      <mesh position={[0, flangeH + cylH, 0]} castShadow>
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

function markerRadius(shape: PackageShape): number {
  switch (shape.type) {
    case 'chip':
      return Math.max(shape.length, shape.width) * 0.7
    case 'can':
      return shape.diameter * 0.7
    case 'header':
      return (shape.pins * HEADER_PITCH) / 2 + 1.2
    case 'block':
    case 'tantalum':
    case 'power':
    case 'sod':
    case 'sma':
      return Math.max(shape.length, shape.width) * 0.7
    case 'sot23':
      return 2.0
    case 'to92':
      return 3.4
    case 'soic':
      return 4.2
    case 'led-tht':
      return shape.diameter * 0.8
    default:
      return 2
  }
}
