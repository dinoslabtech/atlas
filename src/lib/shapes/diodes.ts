import { CHIP_EIA } from '@/seed/packages'
import type { PartClass } from '@/seed/types'

import { chipByEia, chipsFromExamples } from './chip'
import { type PackageShape, type ShapeOptions } from './types'

const LED_COLORS: Record<string, string> = {
  RED: '#d32f2f',
  BLUE: '#1e88e5',
  GREEN: '#43a047',
  YELLOW: '#fdd835',
  WHITE: '#eeeeee',
}

export function ledHex(token: string | undefined): string {
  if (!token) return LED_COLORS.RED!
  return LED_COLORS[token.toUpperCase()] ?? LED_COLORS.RED!
}

export function diodeShapes(part: PartClass, options?: ShapeOptions): PackageShape[] {
  const field = part.fields.find((item) => item.id === 'package')
  if (!field) return []
  const color = ledHex(options?.ledColor)
  const shapes: PackageShape[] = []
  if (field.kind === 'chip-package') {
    shapes.push(...chipsFromExamples(field.examples, 'led', color))
  }
  for (const token of field.examples) {
    if (CHIP_EIA.has(token) && field.kind === 'chip-package') continue
    const extra = diodeFromToken(token, color)
    if (extra && !shapes.some((shape) => shape.id === extra.id)) shapes.push(extra)
  }
  return shapes
}

export function diodeFromToken(token: string, ledColor = LED_COLORS.RED!): PackageShape | undefined {
  if (token === 'SOD123') {
    return { id: token, label: token, metric: '2.7 × 1.6 × 1.1 mm', type: 'sod', length: 2.7, width: 1.6, height: 1.1 }
  }
  if (token === 'SOD323') {
    return { id: token, label: token, metric: '1.7 × 1.25 × 1.0 mm', type: 'sod', length: 1.7, width: 1.25, height: 1.0 }
  }
  if (token === 'SMA') {
    return { id: token, label: token, metric: '4.3 × 2.6 × 2.2 mm', type: 'sma', length: 4.3, width: 2.6, height: 2.2 }
  }
  if (token === 'PTH-3mm') {
    return { id: token, label: token, metric: 'Ø3 mm', type: 'led-tht', diameter: 3, color: ledColor }
  }
  return chipByEia(token, 'led', ledColor)
}
