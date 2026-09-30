import { CHIP_EIA } from '@/seed/packages'
import type { PartClass } from '@/seed/types'

import { chipByEia, chipsFromExamples, chipStyleForClass } from './chip'
import { fmtMm, type PackageShape } from './types'

const ARRAY: Record<string, { length: number; width: number; thickness: number; count: number }> = {
  '0402x4': { length: 2.0, width: 1.0, thickness: 0.35, count: 4 },
  '0603x4': { length: 3.2, width: 1.6, thickness: 0.45, count: 4 },
  '1206x8': { length: 6.4, width: 3.2, thickness: 0.55, count: 8 },
}

export function resistorShapes(part: PartClass): PackageShape[] {
  const field = part.fields.find((item) => item.id === 'package')
  if (!field) return []
  const style = chipStyleForClass(part.key)
  const shapes: PackageShape[] = []

  if (field.kind === 'chip-package') {
    shapes.push(...chipsFromExamples(field.examples, style))
  }

  for (const token of field.examples) {
    if (CHIP_EIA.has(token) && field.kind === 'chip-package') continue
    const extra = resistorFromToken(token, part.key)
    if (extra && !shapes.some((shape) => shape.id === extra.id)) shapes.push(extra)
  }
  return shapes
}

export function resistorFromToken(token: string, classKey: string): PackageShape | undefined {
  const array = ARRAY[token]
  if (array) {
    return {
      id: token,
      label: token,
      metric: `${fmtMm(array.length)} × ${fmtMm(array.width)} × ${fmtMm(array.thickness)} mm`,
      type: 'array',
      ...array,
    }
  }
  if (token === 'SOP8') {
    return {
      id: token,
      label: token,
      metric: '4.9 × 3.9 × 1.75 mm',
      type: 'soic',
      pins: 8,
      length: 4.9,
      width: 3.9,
      height: 1.75,
      pitch: 1.27,
    }
  }
  return chipByEia(token, chipStyleForClass(classKey))
}
