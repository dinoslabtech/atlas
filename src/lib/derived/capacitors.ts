import { formatSi, parseSi } from '@/lib/parse'

import type { DerivedRow } from './types'

type TempBand = {
  tMin: number
  tMax: number
  dMin: number
  dMax: number
}

const CLASS1 = new Set(['C0G', 'NP0', 'COG', 'NPO'])

const EIA_LOW: Record<string, number> = { X: -55, Y: -30, Z: 10 }
const EIA_HIGH: Record<string, number> = { '4': 65, '5': 85, '6': 105, '7': 125, '8': 150 }
const EIA_CHANGE: Record<string, [number, number]> = {
  P: [0.1, -0.1],
  R: [0.15, -0.15],
  S: [0.22, -0.22],
  T: [0.22, -0.33],
  U: [0.22, -0.56],
  V: [0.22, -0.82],
}

function parseVoltage(token: string | undefined): number | undefined {
  if (!token) return undefined
  const raw = token.trim()
  if (!raw || raw === 'X') return undefined
  const infix = raw.match(/^(\d*)V(\d+)$/i)
  if (infix) return parseSi(`${infix[1] || '0'}.${infix[2]}`)
  return parseSi(raw)
}

function bandFor(dielectric: string | undefined): TempBand | undefined {
  if (!dielectric) return undefined
  const code = dielectric.trim().toUpperCase()
  if (!code || code === 'X') return undefined
  if (CLASS1.has(code)) return { tMin: -55, tMax: 125, dMin: 0, dMax: 0 }
  if (code.length !== 3) return undefined
  const [low, high, changeLetter] = code
  const tMin = low ? EIA_LOW[low] : undefined
  const tMax = high ? EIA_HIGH[high] : undefined
  const change = changeLetter ? EIA_CHANGE[changeLetter] : undefined
  if (tMin === undefined || tMax === undefined || !change) return undefined
  return { tMin, tMax, dMin: change[0], dMax: change[1] }
}

// Linear from 25C to the nearer EIA band edge. Outside the band, stay at the edge.
function ctFactor(band: TempBand, ambientC: number): number {
  if (!Number.isFinite(ambientC) || (band.dMin === 0 && band.dMax === 0)) return 1
  if (ambientC >= 25) {
    const span = band.tMax - 25
    if (span === 0) return 1
    const t = Math.min(1, Math.max(0, (ambientC - 25) / span))
    return 1 + t * band.dMax
  }
  const span = 25 - band.tMin
  if (span === 0) return 1
  const t = Math.min(1, Math.max(0, (25 - ambientC) / span))
  return 1 + t * band.dMin
}

export function derive(values: Record<string, string>, ambientC: number): DerivedRow[] {
  const rows: DerivedRow[] = []
  const c = parseSi(values.capacitance)
  const v = parseVoltage(values.voltage)
  if (c !== undefined && v !== undefined) {
    rows.push({ label: 'Energy', value: formatSi(0.5 * c * v * v, 'J') })
    rows.push({ label: 'Charge', value: formatSi(c * v, 'C') })
  }
  if (c !== undefined) {
    const band = bandFor(values.dielectric)
    if (band) rows.push({ label: 'C at ambient', value: formatSi(c * ctFactor(band, ambientC), 'F') })
  }
  return rows
}
