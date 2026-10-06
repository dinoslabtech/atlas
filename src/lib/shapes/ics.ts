import type { PartClass } from '@/seed/types'

import type { PackageShape } from './types'

export function icShapes(part: PartClass): PackageShape[] {
  const field = part.fields.find((item) => item.id === 'package')
  if (!field) return []
  return field.examples.map(icFromToken).filter((shape): shape is PackageShape => Boolean(shape))
}

export function icFromToken(token: string): PackageShape | undefined {
  if (token === 'SOIC8' || token.startsWith('SOIC')) {
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
  if (token === 'TSSOP14') {
    return {
      id: token,
      label: token,
      metric: '5.0 × 4.4 × 1.1 mm',
      type: 'tssop',
      pins: 14,
      length: 5.0,
      width: 4.4,
      height: 1.1,
      pitch: 0.65,
    }
  }
  if (token === 'QFN32') {
    return {
      id: token,
      label: token,
      metric: '5.0 × 5.0 × 0.9 mm',
      type: 'qfn',
      pins: 32,
      length: 5.0,
      width: 5.0,
      height: 0.9,
    }
  }
  if (token === 'DIP8') {
    return {
      id: token,
      label: token,
      metric: '9.3 × 6.35 × 3.3 mm',
      type: 'dip',
      pins: 8,
      length: 9.3,
      width: 6.35,
      height: 3.3,
      pitch: 2.54,
    }
  }
  return undefined
}
