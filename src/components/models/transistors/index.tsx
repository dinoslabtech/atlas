import { BufferAttribute, BufferGeometry } from 'three'

import { GullLead } from '@/components/models/GullLead'
import { METAL, PLASTIC } from '@/components/models/materials'

const SOT23_L = 2.9
const SOT23_W = 1.3
const SOT23_H = 1.1
const SOT23_Y0 = 0.08
const SOT23_CHAMFER = 0.22
const SOT23_PITCH = 0.95

const TO92_R = 2.1
const TO92_BODY_H = 4.0
const TO92_LEAD_H = 1.5
const TO92_FLAT_Z = 1.1
const TO92_PITCH = 1.27
const TO92_SEGMENTS = 24

const sot23Geometry = prismGeometry(sot23Outline(), SOT23_Y0, SOT23_Y0 + SOT23_H)
const to92Geometry = prismGeometry(to92Outline(), TO92_LEAD_H, TO92_LEAD_H + TO92_BODY_H)

export function Sot23Body({ emissive, emissiveIntensity }: { emissive: string; emissiveIntensity: number }) {
  const hx = SOT23_L / 2
  const hz = SOT23_W / 2
  return (
    <group>
      <mesh geometry={sot23Geometry} castShadow>
        <meshStandardMaterial
          color={PLASTIC}
          roughness={0.4}
          metalness={0.04}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      <mesh position={[-hx + SOT23_CHAMFER + 0.16, SOT23_Y0 + SOT23_H + 0.02, hz - 0.28]}>
        <cylinderGeometry args={[0.12, 0.12, 0.06, 12]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.6} />
      </mesh>
      {[-SOT23_PITCH, SOT23_PITCH].map((x) => (
        <GullLead key={x} x={x} side={1} bodyHalfZ={hz} bodyH={SOT23_H} />
      ))}
      <GullLead x={0} side={-1} bodyHalfZ={hz} bodyH={SOT23_H} />
    </group>
  )
}

export function To92Body({ emissive, emissiveIntensity }: { emissive: string; emissiveIntensity: number }) {
  const leadZ = 0.4
  const leadX = 0.4
  return (
    <group>
      <mesh geometry={to92Geometry} castShadow>
        <meshStandardMaterial
          color={PLASTIC}
          roughness={0.45}
          metalness={0.04}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {[-TO92_PITCH, 0, TO92_PITCH].map((x) => (
        <mesh key={x} position={[x, TO92_LEAD_H / 2, TO92_FLAT_Z - leadZ / 2]}>
          <boxGeometry args={[leadX, TO92_LEAD_H, leadZ]} />
          <meshStandardMaterial color={METAL} metalness={0.75} roughness={0.28} />
        </mesh>
      ))}
    </group>
  )
}

function sot23Outline(): Array<[number, number]> {
  const hx = SOT23_L / 2
  const hz = SOT23_W / 2
  const c = SOT23_CHAMFER
  return [
    [-hx, -hz],
    [-hx, hz - c],
    [-hx + c, hz],
    [hx, hz],
    [hx, -hz],
  ]
}

function to92Outline(): Array<[number, number]> {
  const half = Math.sqrt(TO92_R * TO92_R - TO92_FLAT_Z * TO92_FLAT_Z)
  const thetaRight = Math.atan2(half, TO92_FLAT_Z)
  const thetaLeft = Math.atan2(-half, TO92_FLAT_Z)
  const span = thetaLeft + Math.PI * 2 - thetaRight
  const pts: Array<[number, number]> = [
    [-half, TO92_FLAT_Z],
    [half, TO92_FLAT_Z],
  ]
  for (let i = 1; i < TO92_SEGMENTS; i++) {
    const t = thetaRight + (span * i) / TO92_SEGMENTS
    pts.push([TO92_R * Math.sin(t), TO92_R * Math.cos(t)])
  }
  return pts
}

/** Outline is xz, counter-clockwise from +Y. */
function prismGeometry(outline: ReadonlyArray<readonly [number, number]>, y0: number, y1: number) {
  const n = outline.length
  const positions: number[] = []
  const normals: number[] = []

  const tri = (
    ax: number,
    ay: number,
    az: number,
    bx: number,
    by: number,
    bz: number,
    cx: number,
    cy: number,
    cz: number,
  ) => {
    const ux = bx - ax
    const uy = by - ay
    const uz = bz - az
    const vx = cx - ax
    const vy = cy - ay
    const vz = cz - az
    let nx = uy * vz - uz * vy
    let ny = uz * vx - ux * vz
    let nz = ux * vy - uy * vx
    const len = Math.hypot(nx, ny, nz) || 1
    nx /= len
    ny /= len
    nz /= len
    positions.push(ax, ay, az, bx, by, bz, cx, cy, cz)
    normals.push(nx, ny, nz, nx, ny, nz, nx, ny, nz)
  }

  const origin = outline[0]!
  for (let i = 1; i < n - 1; i++) {
    const b = outline[i]!
    const c = outline[i + 1]!
    tri(origin[0], y1, origin[1], b[0], y1, b[1], c[0], y1, c[1])
    tri(origin[0], y0, origin[1], c[0], y0, c[1], b[0], y0, b[1])
  }

  for (let i = 0; i < n; i++) {
    const [x0, z0] = outline[i]!
    const [x1, z1] = outline[(i + 1) % n]!
    tri(x0, y0, z0, x1, y0, z1, x1, y1, z1)
    tri(x0, y0, z0, x1, y1, z1, x0, y1, z0)
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3))
  geometry.setAttribute('normal', new BufferAttribute(new Float32Array(normals), 3))
  geometry.computeBoundingBox()
  geometry.computeBoundingSphere()
  return geometry
}
