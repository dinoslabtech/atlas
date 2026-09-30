import { CHIP_EIA } from '@/seed/packages'
import type { PartClass } from '@/seed/types'

import { chipByEia, chipsFromExamples, chipStyleForClass } from './chip'
import { fmtMm, type PackageShape } from './types'

const POWER: Record<string, { length: number; width: number; height: number }> = {
  '2520': { length: 2.5, width: 2.0, height: 1.0 },
  '3015': { length: 3.0, width: 3.0, height: 1.5 },
  '4020': { length: 4.0, width: 4.0, height: 2.0 },
  '5020': { length: 5.0, width: 5.0, height: 2.0 },
  '6028': { length: 6.0, width: 6.0, height: 2.8 },
}

const COMMON_MODE: Record<string, { length: number; width: number; height: number }> = {
  '2012': { length: 2.0, width: 1.2, height: 1.2 },
  '3216': { length: 3.2, width: 1.6, height: 1.8 },
  '4532': { length: 4.5, width: 3.2, height: 2.8 },
}

export function inductorShapes(part: PartClass): PackageShape[] {
  const field = part.fields.find((item) => item.id === 'package')
  if (!field) return []
  const style = chipStyleForClass(part.key)
  const shapes: PackageShape[] = []
  if (field.kind === 'chip-package') {
    const chipExamples =
      part.key === 'LC' ? field.examples.filter((token) => !(token in COMMON_MODE)) : field.examples
    shapes.push(...chipsFromExamples(chipExamples, style))
  }
  for (const token of field.examples) {
    if (CHIP_EIA.has(token) && field.kind === 'chip-package' && !(part.key === 'LC' && token in COMMON_MODE)) {
      continue
    }
    const extra = inductorFromToken(token, part.key)
    if (extra && !shapes.some((shape) => shape.id === extra.id)) shapes.push(extra)
  }
  return shapes
}

export function inductorFromToken(token: string, classKey: string): PackageShape | undefined {
  if (token in POWER) {
    const size = POWER[token]!
    return {
      id: token,
      label: token,
      metric: `${fmtMm(size.length)} × ${fmtMm(size.width)} × ${fmtMm(size.height)} mm`,
      type: 'power',
      ...size,
    }
  }
  if (classKey === 'LC' && token in COMMON_MODE) {
    const size = COMMON_MODE[token]!
    return {
      id: token,
      label: token,
      metric: `${fmtMm(size.length)} × ${fmtMm(size.width)} × ${fmtMm(size.height)} mm`,
      type: 'common-mode',
      ...size,
    }
  }
  return chipByEia(token, chipStyleForClass(classKey))
}
