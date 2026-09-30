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
      return chipShape(CHIP_SIZES.find((chip) => chip.eia === '0603')!, 'resistor')
    case 'capacitors':
      return chipShape(CHIP_SIZES.find((chip) => chip.eia === '0603')!, 'ceramic')
    case 'inductors':
      return chipShape(CHIP_SIZES.find((chip) => chip.eia === '0805')!, 'inductor')
    case 'diodes':
      return diodeFromToken('SOD123')!
    case 'transistors':
      return transistorFromToken('SOT23')!
    case 'ics':
      return icFromToken('SOIC8')!
    case 'connectors':
      return headerFromToken('1x4')!
    default:
      return chipShape(CHIP_SIZES.find((chip) => chip.eia === '0603')!, 'resistor')
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
    return Math.max(span * 0.58, 2.8)
  }
  return Math.max(span * 1.15, tallest * 3.2, 8)
}

export function previewCameraDistance(shape: PackageShape): number {
  const width = boundingWidth(shape)
  const height = boundingHeight(shape)
  return Math.max(width * 1.05, height * 1.85, 2.8)
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