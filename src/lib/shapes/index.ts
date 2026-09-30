import { CHIP_SIZES } from '@/seed/packages'
import type { PartClass } from '@/seed/types'

import { capacitorFromToken, capacitorShapes } from './capacitors'
import { chipShape } from './chip'
import { connectorFromType, connectorShapes, headerFromToken } from './connectors'
import { diodeFromToken, diodeShapes } from './diodes'
import { icFromToken, icShapes } from './ics'
import { inductorFromToken, inductorShapes } from './inductors'
import { resistorFromToken, resistorShapes } from './resistors'
import { transistorFromToken, transistorShapes } from './transistors'
import { HEADER_HOUSING, HEADER_PIN_ABOVE, type PackageShape, type ShapeOptions } from './types'

export type { ChipStyle, PackageShape, ShapeOptions } from './types'
export {
  HEADER_HOUSING,
  HEADER_PIN_ABOVE,
  HEADER_PIN_BELOW,
  HEADER_PITCH,
  fmtMm,
} from './types'
export { chipShape, chipStyleForClass } from './chip'
export { ledHex } from './diodes'

export function familyIdForClass(key: string): string {
  if (key === 'IC') return 'ics'
  if (key === 'JJ') return 'connectors'
  if (key.startsWith('R')) return 'resistors'
  if (key.startsWith('C')) return 'capacitors'
  if (key.startsWith('L') || key === 'FB') return 'inductors'
  if (key.startsWith('D')) return 'diodes'
  if (key.startsWith('Q') || key.startsWith('M')) return 'transistors'
  return 'resistors'
}

export function shapesForClass(part: PartClass, options?: ShapeOptions): PackageShape[] {
  const familyId = options?.familyId ?? familyIdForClass(part.key)
  switch (familyId) {
    case 'resistors':
      return resistorShapes(part)
    case 'capacitors':
      return capacitorShapes(part)
    case 'inductors':
      return inductorShapes(part)
    case 'diodes':
      return diodeShapes(part, options)
    case 'transistors':
      return transistorShapes(part)
    case 'ics':
      return icShapes(part)
    case 'connectors':
      return connectorShapes(part, options)
    default:
      return []
  }
}

export function familyPreviewKind(familyId: string): PackageShape {
  switch (familyId) {
    case 'resistors':
      return chipShape(CHIP_SIZES.find((chip) => chip.eia === '1206')!, 'resistor')
    case 'capacitors':
      return capacitorFromToken('THT8x16', 'CE')!
    case 'inductors':
      return inductorFromToken('4020', 'LP')!
    case 'diodes':
      return diodeFromToken('PTH-3mm')!
    case 'transistors':
      return transistorFromToken('PTH-TO92')!
    case 'ics':
      return icFromToken('SOIC8')!
    case 'connectors':
      return connectorFromType('USBC')!
    default:
      return chipShape(CHIP_SIZES.find((chip) => chip.eia === '1206')!, 'resistor')
  }
}

export function boundingHeight(shape: PackageShape): number {
  switch (shape.type) {
    case 'chip':
    case 'array':
      return shape.thickness
    case 'can':
      return shape.tht ? shape.height + 2.5 : shape.height
    case 'block':
    case 'tantalum':
    case 'power':
    case 'common-mode':
    case 'sod':
    case 'sma':
    case 'soic':
    case 'tssop':
    case 'qfn':
      return shape.height
    case 'film':
      return shape.height + 2.4
    case 'dip':
      return shape.height + 2.8
    case 'sot23':
      return 1.2
    case 'to92':
      return 5.5
    case 'header':
      return HEADER_HOUSING + HEADER_PIN_ABOVE
    case 'led-tht':
      return 1.4 + 0.3 + shape.diameter * 1.05
    case 'usbc':
      return 3.6
    case 'rj45':
      return 13.5
    case 'tb':
      return 10
    default:
      return 1
  }
}

export function boundingWidth(shape: PackageShape): number {
  switch (shape.type) {
    case 'chip':
    case 'array':
      return shape.length
    case 'can':
      return shape.diameter
    case 'block':
    case 'tantalum':
    case 'power':
    case 'common-mode':
    case 'sod':
    case 'sma':
    case 'film':
    case 'soic':
    case 'tssop':
    case 'qfn':
    case 'dip':
      return shape.length
    case 'sot23':
      return 2.9
    case 'to92':
      return 4.2
    case 'header':
      return shape.cols * shape.pitch
    case 'led-tht':
      return shape.diameter
    case 'usbc':
      return 9.0
    case 'rj45':
      return 16
    case 'tb':
      return 10
    default:
      return 2
  }
}

export function isChipLineup(shapes: PackageShape[]): boolean {
  return shapes.length > 0 && shapes.every((shape) => shape.type === 'chip')
}

export function lineupCameraDistance(span: number, tallest: number, shapes: PackageShape[]): number {
  if (isChipLineup(shapes)) {
    return Math.max(span * 0.88, 3.6)
  }
  return Math.max(span * 1.15, tallest * 3.2, 8)
}

export function previewCameraDistance(shape: PackageShape): number {
  const width = boundingWidth(shape)
  const height = boundingHeight(shape)
  const vertical = Math.max(height, width * 0.5)
  const fov = (30 * Math.PI) / 180
  const fill = 0.36
  return Math.max(vertical / (2 * Math.tan(fov / 2) * fill), 5)
}

export type CameraPose = {
  position: [number, number, number]
  target: [number, number, number]
  minDistance: number
  maxDistance: number
}

export function layoutShapes(shapes: PackageShape[]): { items: { shape: PackageShape; x: number }[]; span: number } {
  const widths = shapes.map(boundingWidth)
  const gap = Math.max(1.8, Math.max(...widths, 1) * 0.4)
  const total = widths.reduce((sum, w) => sum + w, 0) + gap * (shapes.length - 1)
  let cursor = -total / 2
  const items = shapes.map((shape, index) => {
    const width = widths[index]!
    const x = cursor + width / 2
    cursor += width + gap
    return { shape, x }
  })
  return { items, span: total }
}

export function lineupPose(shapes: PackageShape[], span: number, tallest: number): CameraPose {
  const chipOnly = isChipLineup(shapes)
  const dist = lineupCameraDistance(span, tallest, shapes)
  const position: [number, number, number] = chipOnly
    ? [dist * 0.04, dist * 0.72, dist * 0.5]
    : [dist * 0.35, dist * 0.55, dist]
  return {
    position,
    target: [0, tallest * 0.35, 0],
    minDistance: chipOnly ? 1.2 : 3,
    maxDistance: Math.max(span * 3, dist * 1.5),
  }
}

export function focusPose(shape: PackageShape, x: number): CameraPose {
  const height = boundingHeight(shape)
  const dist = previewCameraDistance(shape)
  const target: [number, number, number] = [x, height * 0.42, 0]
  return {
    position: [x + dist * 0.72, dist * 0.55, dist * 0.9],
    target,
    minDistance: Math.max(dist * 0.28, 0.6),
    maxDistance: dist * 3.2,
  }
}

export function shapeFromToken(token: string, classKey: string): PackageShape | undefined {
  return (
    resistorFromToken(token, classKey) ??
    capacitorFromToken(token, classKey) ??
    inductorFromToken(token, classKey) ??
    diodeFromToken(token) ??
    transistorFromToken(token) ??
    icFromToken(token) ??
    headerFromToken(token) ??
    connectorFromType(token)
  )
}