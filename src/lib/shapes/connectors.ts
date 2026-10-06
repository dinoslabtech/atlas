import type { PartClass } from '@/seed/types'

import { HEADER_PITCH, type PackageShape, type ShapeOptions } from './types'

export function connectorShapes(part: PartClass, options?: ShapeOptions): PackageShape[] {
  const pinField = part.fields.find((item) => item.id === 'pins')
  const typeField = part.fields.find((item) => item.id === 'type')
  const shapes: PackageShape[] = []
  const typeToken = options?.connectorType ?? typeField?.examples[0]
  const typeShape = typeToken ? connectorFromType(typeToken) : undefined
  if (typeShape) shapes.push(typeShape)
  if (pinField) {
    for (const token of pinField.examples) {
      const extra = headerFromToken(token)
      if (extra && !shapes.some((shape) => shape.id === extra.id)) shapes.push(extra)
    }
  }
  return shapes
}

export function connectorFromType(token: string): PackageShape | undefined {
  if (token === 'USBC') {
    return { id: token, label: token, metric: 'USB-C', type: 'usbc' }
  }
  if (token === 'RJ45') {
    return { id: token, label: token, metric: '8P8C', type: 'rj45' }
  }
  if (token === 'TB') {
    return { id: token, label: token, metric: '2-pole', type: 'tb', poles: 2 }
  }
  if (token === 'HDR') {
    const header = headerFromToken('1x4')
    if (!header) return undefined
    return { ...header, id: token, label: token }
  }
  return undefined
}

export function headerFromToken(token: string): PackageShape | undefined {
  const matrix = token.match(/^(\d+)x(\d+)$/i)
  if (matrix) {
    const rows = Number(matrix[1])
    const cols = Number(matrix[2])
    return {
      id: token,
      label: token,
      metric: `${rows} × ${cols}`,
      type: 'header',
      rows,
      cols,
      pitch: HEADER_PITCH,
    }
  }
  const pins = token.match(/^(\d+)PIN$/i)
  if (pins) {
    const cols = Number(pins[1])
    return {
      id: token,
      label: token,
      metric: `${cols} pins`,
      type: 'header',
      rows: 1,
      cols,
      pitch: HEADER_PITCH,
    }
  }
  return undefined
}
