import type { PartClass } from '@/seed/types'

import type { PackageShape } from './types'

export function transistorShapes(part: PartClass): PackageShape[] {
  const field = part.fields.find((item) => item.id === 'package')
  if (!field) return []
  const shapes: PackageShape[] = []
  for (const token of field.examples) {
    const extra = transistorFromToken(token)
    if (extra) shapes.push(extra)
  }
  return shapes
}

export function transistorFromToken(token: string): PackageShape | undefined {
  if (token === 'SOT23') {
    return { id: token, label: token, metric: '2.9 × 1.3 × 1.1 mm', type: 'sot23' }
  }
  if (token === 'PTH-TO92') {
    return { id: token, label: token, metric: 'TO-92', type: 'to92' }
  }
  return undefined
}
