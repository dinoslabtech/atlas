import { CHIP_EIA } from '@/seed/packages'
import type { PartClass } from '@/seed/types'

import { chipByEia, chipsFromExamples, chipStyleForClass } from './chip'
import { fmtMm, type PackageShape } from './types'

const TANTALUM: Record<string, { length: number; width: number; height: number }> = {
  A: { length: 3.2, width: 1.6, height: 1.6 },
  B: { length: 3.5, width: 2.8, height: 1.9 },
  C: { length: 6.0, width: 3.2, height: 2.5 },
  D: { length: 7.3, width: 4.3, height: 2.8 },
  E: { length: 7.3, width: 4.3, height: 4.1 },
}

const FILM: Record<string, { length: number; width: number; height: number; leadPitch: number }> = {
  THT5mm: { length: 7.2, width: 3.0, height: 8.0, leadPitch: 5.0 },
  THT7R5mm: { length: 10.5, width: 5.0, height: 10.0, leadPitch: 7.5 },
}

export function capacitorShapes(part: PartClass): PackageShape[] {
  const field = part.fields.find((item) => item.id === 'package' || item.id === 'case')
  if (!field) return []
  const shapes: PackageShape[] = []
  if (field.kind === 'chip-package') {
    shapes.push(...chipsFromExamples(field.examples, chipStyleForClass(part.key)))
  }
  for (const token of field.examples) {
    if (CHIP_EIA.has(token) && field.kind === 'chip-package') continue
    const extra = capacitorFromToken(token, part.key)
    if (extra && !shapes.some((shape) => shape.id === extra.id)) shapes.push(extra)
  }
  return shapes
}

export function capacitorFromToken(token: string, classKey: string): PackageShape | undefined {
  if (token in TANTALUM) {
    const size = TANTALUM[token]!
    return {
      id: token,
      label: `Case ${token}`,
      metric: `${fmtMm(size.length)} × ${fmtMm(size.width)} × ${fmtMm(size.height)} mm`,
      type: 'tantalum',
      ...size,
    }
  }
  if (token in FILM) {
    const size = FILM[token]!
    return {
      id: token,
      label: token,
      metric: `${fmtMm(size.leadPitch)} mm pitch`,
      type: 'film',
      ...size,
    }
  }
  if (token === '0810') {
    return {
      id: token,
      label: token,
      metric: 'Ø8 × 10 mm',
      type: 'can',
      diameter: 8,
      height: 10,
      tht: false,
      kind: 'electrolytic',
    }
  }
  if (token === 'THT8x16') {
    return {
      id: token,
      label: token,
      metric: 'Ø8 × 16 mm',
      type: 'can',
      diameter: 8,
      height: 16,
      tht: true,
      kind: 'electrolytic',
    }
  }
  if (token === 'THT10x30') {
    return {
      id: token,
      label: token,
      metric: 'Ø10 × 30 mm',
      type: 'can',
      diameter: 10,
      height: 30,
      tht: true,
      kind: 'supercap',
    }
  }
  if (token === 'THT8x12') {
    return {
      id: token,
      label: token,
      metric: 'Ø8 × 12 mm',
      type: 'can',
      diameter: 8,
      height: 12,
      tht: true,
      kind: 'supercap',
    }
  }
  return chipByEia(token, chipStyleForClass(classKey))
}
