import { CHIP_EIA } from '@/seed/packages'
import type { PartClass } from '@/seed/types'

import { chipByEia, chipsFromExamples, chipStyleForClass } from './chip'
import { fmtMm, type PackageShape } from './types'

const ARRAY: Record<string, { length: number; width: number; thickness: number; count: number }> = {
  '0402x4': { length: 2.0, width: 1.0, thickness: 0.35, count: 4 },
  '0603x4': { length: 3.2, width: 1.6, thickness: 0.45, count: 4 },
  '1206x8': { length: 6.4, width: 3.2, thickness: 0.55, count: 8 },
}

/** EIA 3920/5930 metal shunts are 0.39"×0.20" and 0.59"×0.30", not 3.9×2.0 mm. */
const SHUNT_EIA: Record<string, { length: number; width: number; thickness: number }> = {
  '3920': { length: 10.0, width: 5.2, thickness: 0.5 },
  '5930': { length: 15.0, width: 7.7, thickness: 0.6 },
}

function asWirewound(shape: PackageShape): PackageShape {
  if (shape.type !== 'chip') return shape
  const thickness = Math.round(Math.max(shape.thickness * 1.8, shape.width * 0.55) * 50) / 50
  return {
    ...shape,
    thickness,
    metric: `${fmtMm(shape.length)} × ${fmtMm(shape.width)} × ${fmtMm(thickness)} mm`,
  }
}

function asShunt(shape: PackageShape): PackageShape {
  if (shape.type !== 'chip') return shape
  const sized = SHUNT_EIA[shape.id]
  if (!sized) return shape
  return {
    ...shape,
    ...sized,
    metric: `${fmtMm(sized.length)} × ${fmtMm(sized.width)} × ${fmtMm(sized.thickness)} mm`,
  }
}

export function resistorShapes(part: PartClass): PackageShape[] {
  const field = part.fields.find((item) => item.id === 'package')
  if (!field) return []
  const style = chipStyleForClass(part.key)
  const shapes: PackageShape[] = []

  if (field.kind === 'chip-package') {
    let chips = chipsFromExamples(field.examples, style)
    if (style === 'wirewound') chips = chips.map(asWirewound)
    if (style === 'shunt') chips = chips.map(asShunt)
    shapes.push(...chips)
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
  const chip = chipByEia(token, chipStyleForClass(classKey))
  if (!chip) return undefined
  if (classKey === 'RW') return asWirewound(chip)
  if (classKey === 'RS') return asShunt(chip)
  return chip
}
