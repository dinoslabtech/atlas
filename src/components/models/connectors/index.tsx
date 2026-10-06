import { Path, Shape } from 'three'

import { GOLD, METAL, PLASTIC } from '@/components/models/materials'
import { HEADER_HOUSING, HEADER_PIN_ABOVE, type PackageShape } from '@/lib/packageShapes'

const PIN_TAIL = 3
const USB_C_W = 9
const USB_C_H = 3.2
const USB_C_D = 7
const RJ45_W = 16
const RJ45_H = 13.3
const RJ45_D = 13.5
const RJ45_BEZEL = 3.4

const USB_C_EXTRUDE = { depth: USB_C_D, bevelEnabled: false, curveSegments: 16, steps: 1 }
const USB_C_CAP = { depth: 0.45, bevelEnabled: false, curveSegments: 16, steps: 1 }
const RJ45_EXTRUDE = { depth: RJ45_BEZEL, bevelEnabled: false, curveSegments: 2, steps: 1 }

const usbCShell = stadiumShape(USB_C_W, USB_C_H, 0, false)
usbCShell.holes.push(stadiumPath(8.34, 2.4, 0.4, true))
const usbCCap = stadiumShape(USB_C_W, USB_C_H, 0, false)
const rj45Front = rj45FrontShape()

function stadiumPath(width: number, height: number, yBottom: number, clockwise: boolean): Path {
  const path = new Path()
  drawStadium(path, width, height, yBottom, clockwise)
  return path
}

function stadiumShape(width: number, height: number, yBottom: number, clockwise: boolean): Shape {
  const shape = new Shape()
  drawStadium(shape, width, height, yBottom, clockwise)
  return shape
}

function drawStadium(path: Path, width: number, height: number, yBottom: number, clockwise: boolean) {
  const r = height / 2
  const half = Math.max((width - height) / 2, 0.01)
  const cy = yBottom + r
  const yTop = yBottom + height
  if (!clockwise) {
    path.moveTo(-half, yBottom)
    path.lineTo(half, yBottom)
    path.absarc(half, cy, r, -Math.PI / 2, Math.PI / 2, false)
    path.lineTo(-half, yTop)
    path.absarc(-half, cy, r, Math.PI / 2, (Math.PI * 3) / 2, false)
  } else {
    path.moveTo(-half, yBottom)
    path.absarc(-half, cy, r, (Math.PI * 3) / 2, Math.PI / 2, true)
    path.lineTo(half, yTop)
    path.absarc(half, cy, r, Math.PI / 2, -Math.PI / 2, true)
  }
  path.closePath()
}

function rj45FrontShape(): Shape {
  const shape = new Shape()
  shape.moveTo(-RJ45_W / 2, 0)
  shape.lineTo(RJ45_W / 2, 0)
  shape.lineTo(RJ45_W / 2, RJ45_H)
  shape.lineTo(-RJ45_W / 2, RJ45_H)
  shape.closePath()

  const hole = new Path()
  const left = -5.8
  const right = 5.8
  const top = 10.4
  const cavBottom = 2.8
  const latchW = 3.4
  const latchBottom = 1.1
  hole.moveTo(left, cavBottom)
  hole.lineTo(left, top)
  hole.lineTo(right, top)
  hole.lineTo(right, cavBottom)
  hole.lineTo(latchW / 2, cavBottom)
  hole.lineTo(latchW / 2, latchBottom)
  hole.lineTo(-latchW / 2, latchBottom)
  hole.lineTo(-latchW / 2, cavBottom)
  hole.closePath()
  shape.holes.push(hole)
  return shape
}

export function HeaderBody({ shape }: { shape: Extract<PackageShape, { type: 'header' }> }) {
  const { rows, cols, pitch } = shape
  const pin = Math.min(0.64, pitch * 0.28)
  const housingL = cols * pitch
  const housingW = rows * pitch
  return (
    <group>
      <mesh position={[0, HEADER_HOUSING / 2, 0]} castShadow>
        <boxGeometry args={[housingL, HEADER_HOUSING, housingW]} />
        <meshStandardMaterial color={PLASTIC} roughness={0.42} metalness={0.06} />
      </mesh>
      {Array.from({ length: cols - 1 }, (_, c) => {
        const x = (c + 0.5 - (cols - 1) / 2) * pitch
        return (
          <mesh key={`gx${c}`} position={[x, HEADER_HOUSING, 0]}>
            <boxGeometry args={[0.14, 0.12, housingW - 0.16]} />
            <meshStandardMaterial color="#0d0d0d" roughness={0.55} />
          </mesh>
        )
      })}
      {Array.from({ length: rows - 1 }, (_, r) => {
        const z = (r + 0.5 - (rows - 1) / 2) * pitch
        return (
          <mesh key={`gz${r}`} position={[0, HEADER_HOUSING, z]}>
            <boxGeometry args={[housingL - 0.16, 0.12, 0.14]} />
            <meshStandardMaterial color="#0d0d0d" roughness={0.55} />
          </mesh>
        )
      })}
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          const x = (c - (cols - 1) / 2) * pitch
          const z = (r - (rows - 1) / 2) * pitch
          return (
            <group key={`${r}-${c}`} position={[x, 0, z]}>
              <mesh position={[0, HEADER_HOUSING + HEADER_PIN_ABOVE / 2, 0]} castShadow>
                <boxGeometry args={[pin, HEADER_PIN_ABOVE, pin]} />
                <meshStandardMaterial color={GOLD} metalness={0.88} roughness={0.18} />
              </mesh>
              <mesh position={[0, -PIN_TAIL / 2, 0]}>
                <boxGeometry args={[pin * 0.78, PIN_TAIL, pin * 0.78]} />
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
      <mesh position={[0, 0, -USB_C_D / 2]} castShadow>
        <extrudeGeometry args={[usbCShell, USB_C_EXTRUDE]} />
        <meshStandardMaterial color={METAL} metalness={0.78} roughness={0.26} />
      </mesh>
      <mesh position={[0, 0, -USB_C_D / 2]}>
        <extrudeGeometry args={[usbCCap, USB_C_CAP]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, USB_C_H / 2, 0.9]}>
        <boxGeometry args={[6.6, 0.62, 4.6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.45} />
      </mesh>
      {Array.from({ length: 6 }, (_, i) => {
        const x = (i - 2.5) * 0.92
        return (
          <mesh key={i} position={[x, USB_C_H / 2 + 0.36, 2.55]}>
            <boxGeometry args={[0.42, 0.08, 1.6]} />
            <meshStandardMaterial color={GOLD} metalness={0.82} roughness={0.22} />
          </mesh>
        )
      })}
    </group>
  )
}

export function Rj45Body() {
  const bodyD = RJ45_D - RJ45_BEZEL
  const front = RJ45_D / 2
  return (
    <group>
      <mesh position={[0, RJ45_H / 2, front - RJ45_BEZEL - bodyD / 2]} castShadow>
        <boxGeometry args={[RJ45_W, RJ45_H, bodyD]} />
        <meshStandardMaterial color={PLASTIC} roughness={0.45} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0, front - RJ45_BEZEL]} castShadow>
        <extrudeGeometry args={[rj45Front, RJ45_EXTRUDE]} />
        <meshStandardMaterial color={PLASTIC} roughness={0.45} metalness={0.05} />
      </mesh>
      <mesh position={[0, 6.6, front - RJ45_BEZEL - 0.15]}>
        <boxGeometry args={[11.4, 8.6, 0.3]} />
        <meshStandardMaterial color="#080808" roughness={0.58} />
      </mesh>
      {Array.from({ length: 8 }, (_, i) => {
        const x = (i - 3.5) * 1.02
        return (
          <mesh key={i} position={[x, 8.15, front - 1.35]} rotation={[0.38, 0, 0]}>
            <boxGeometry args={[0.38, 3.8, 0.16]} />
            <meshStandardMaterial color={GOLD} metalness={0.82} roughness={0.22} />
          </mesh>
        )
      })}
    </group>
  )
}

export function TerminalBlockBody({ poles }: { poles: number }) {
  const pitch = 5.08
  const length = poles * pitch
  const depth = 10
  const bodyH = 9.2
  return (
    <group>
      <mesh position={[0, bodyH / 2, 0]} castShadow>
        <boxGeometry args={[length, bodyH, depth]} />
        <meshStandardMaterial color="#0e6b3c" roughness={0.5} metalness={0.04} />
      </mesh>
      {Array.from({ length: poles - 1 }, (_, i) => {
        const x = (i + 1 - poles / 2) * pitch
        return (
          <mesh key={`div-${i}`} position={[x, bodyH / 2, 0]}>
            <boxGeometry args={[0.45, bodyH + 0.16, depth + 0.08]} />
            <meshStandardMaterial color="#0b5a32" roughness={0.52} metalness={0.04} />
          </mesh>
        )
      })}
      {Array.from({ length: poles }, (_, i) => {
        const x = (i - (poles - 1) / 2) * pitch
        return (
          <group key={i} position={[x, 0, 0]}>
            <mesh position={[0, bodyH + 0.06, -0.5]}>
              <cylinderGeometry args={[1.35, 1.35, 0.18, 16]} />
              <meshStandardMaterial color="#0a4f2c" roughness={0.55} />
            </mesh>
            <mesh position={[0, bodyH + 0.42, -0.5]}>
              <cylinderGeometry args={[1.12, 1.12, 0.7, 16]} />
              <meshStandardMaterial color={METAL} metalness={0.72} roughness={0.28} />
            </mesh>
            <mesh position={[0, bodyH + 0.8, -0.5]}>
              <boxGeometry args={[1.55, 0.12, 0.22]} />
              <meshStandardMaterial color="#3a3a3a" roughness={0.5} metalness={0.4} />
            </mesh>
            <mesh position={[0, 3.5, depth / 2 - 0.12]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[1.3, 1.3, 0.4, 16]} />
              <meshStandardMaterial color="#071f12" roughness={0.62} />
            </mesh>
            <mesh position={[0, 3.5, depth / 2 - 0.55]}>
              <boxGeometry args={[1.55, 1.15, 0.28]} />
              <meshStandardMaterial color={METAL} metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[0, -0.9, -0.5]}>
              <boxGeometry args={[0.7, 1.8, 0.7]} />
              <meshStandardMaterial color={METAL} metalness={0.75} roughness={0.28} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
