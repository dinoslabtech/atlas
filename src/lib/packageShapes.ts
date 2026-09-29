import { CHIP_EIA, CHIP_SIZES, type ChipSize } from '@/seed/packages'
import type { PartClass } from '@/seed/types'

export type ChipStyle = 'resistor' | 'ceramic' | 'inductor' | 'led'

export type PackageShape =
  | {
      id: string
      label: string
      metric: string
      type: 'chip'
      length: number
      width: number
      thickness: number
      style: ChipStyle
    }
  | { id: string; label: string; metric: string; type: 'can'; diameter: number; height: number }
  | { id: string; label: string; metric: string; type: 'block'; length: number; width: number; height: number; color: string }
  | { id: string; label: string; metric: string; type: 'sod'; length: number; width: number; height: number }
  | { id: string; label: string; metric: string; type: 'sma'; length: number; width: number; height: number }
  | { id: string; label: string; metric: string; type: 'sot23' }
  | { id: string; label: string; metric: string; type: 'to92' }
  | { id: string; label: string; metric: string; type: 'soic' }
  | { id: string; label: string; metric: string; type: 'header'; pins: number }
  | { id: string; label: string; metric: string; type: 'led-tht'; diameter: number }
  | { id: string; label: string; metric: string; type: 'tantalum'; length: number; width: number; height: number }
  | { id: string; label: string; metric: string; type: 'power'; length: number; width: number; height: number }

export const HEADER_PITCH = 2.54
export const HEADER_HOUSING = 2.54
export const HEADER_PIN_ABOVE = 5.0

const TANTALUM: Record<string, { length: number; width: number; height: number }> = {
  A: { length: 3.2, width: 1.6, height: 1.6 },
  B: { length: 3.5, width: 2.8, height: 1.9 },
  C: { length: 6.0, width: 3.2, height: 2.5 },
  D: { length: 7.3, width: 4.3, height: 2.8 },
  E: { length: 7.3, width: 4.3, height: 4.1 },
}

const POWER: Record<string, { length: number; width: number; height: number }> = {
  '2520': { length: 2.5, width: 2.0, height: 1.0 },
  '3015': { length: 3.0, width: 3.0, height: 1.5 },
  '4020': { length: 4.0, width: 4.0, height: 2.0 },
  '5020': { length: 5.0, width: 5.0, height: 2.0 },
  '6028': { length: 6.0, width: 6.0, height: 2.8 },
}

export function chipStyleForClass(key: string): ChipStyle {
  if (key === 'DL') return 'led'
  if (key.startsWith('L') || key === 'FB') return 'inductor'
  if (key.startsWith('C')) return 'ceramic'
  return 'resistor'
}

export function chipShape(chip: ChipSize, style: ChipStyle): PackageShape {
  return {
    id: chip.eia,
    label: chip.eia,
    metric: `${fmt(chip.lengthMm)} × ${fmt(chip.widthMm)} × ${fmt(chip.thicknessMm)} mm`,
    type: 'chip',
    length: chip.lengthMm,
    width: chip.widthMm,
    thickness: chip.thicknessMm,
    style,
  }
}

export function shapesForClass(part: PartClass): PackageShape[] {
  const packageField = part.fields.find(
    (field) => field.id === 'package' || field.id === 'case' || field.id === 'pins',
  )
  if (!packageField) return []

  if (packageField.kind === 'chip-package') {
    const style = chipStyleForClass(part.key)
    const listed = CHIP_SIZES.filter((chip) => packageField.examples.includes(chip.eia))
    const chips = listed.length > 0 ? listed : CHIP_SIZES
    const shapes = chips.map((chip) => chipShape(chip, style))
    for (const token of packageField.examples) {
      if (CHIP_EIA.has(token)) continue
      const extra = shapeFromToken(token, part.key)
      if (extra) shapes.push(extra)
    }
    return shapes
  }

  const shapes: PackageShape[] = []
  const tokens = packageField.id === 'case' ? packageField.examples : packageField.examples
  for (const token of tokens) {
    const shape = shapeFromToken(token, part.key)
    if (shape) shapes.push(shape)
  }
  return shapes
}

function shapeFromToken(token: string, classKey: string): PackageShape | undefined {
  if (CHIP_EIA.has(token)) {
    const chip = CHIP_SIZES.find((item) => item.eia === token)
    return chip ? chipShape(chip, chipStyleForClass(classKey)) : undefined
  }
  if (token in TANTALUM) {
    const size = TANTALUM[token]!
    return {
      id: token,
      label: `Case ${token}`,
      metric: `${fmt(size.length)} × ${fmt(size.width)} × ${fmt(size.height)} mm`,
      type: 'tantalum',
      ...size,
    }
  }
  if (token in POWER) {
    const size = POWER[token]!
    return {
      id: token,
      label: token,
      metric: `${fmt(size.length)} × ${fmt(size.width)} × ${fmt(size.height)} mm`,
      type: 'power',
      ...size,
    }
  }
  if (token === '0810') {
    return { id: token, label: token, metric: 'Ø8 × 10 mm', type: 'can', diameter: 8, height: 10 }
  }
  if (token === 'THT8x16') {
    return { id: token, label: token, metric: 'Ø8 × 16 mm', type: 'can', diameter: 8, height: 16 }
  }
  if (token === 'THT10x30') {
    return { id: token, label: token, metric: 'Ø10 × 30 mm', type: 'can', diameter: 10, height: 30 }
  }
  if (token === 'SOD123') {
    return { id: token, label: token, metric: '2.7 × 1.6 × 1.1 mm', type: 'sod', length: 2.7, width: 1.6, height: 1.1 }
  }
  if (token === 'SOD323') {
    return { id: token, label: token, metric: '1.7 × 1.25 × 1.0 mm', type: 'sod', length: 1.7, width: 1.25, height: 1.0 }
  }
  if (token === 'SMA') {
    return { id: token, label: token, metric: '4.3 × 2.6 × 2.2 mm', type: 'sma', length: 4.3, width: 2.6, height: 2.2 }
  }
  if (token === 'SOT23') {
    return { id: token, label: token, metric: '2.9 × 1.3 × 1.1 mm', type: 'sot23' }
  }
  if (token === 'PTH-TO92') {
    return { id: token, label: token, metric: 'TO-92', type: 'to92' }
  }
  if (token === 'PTH-3mm') {
    return { id: token, label: token, metric: 'Ø3 mm', type: 'led-tht', diameter: 3 }
  }
  if (token.startsWith('THT')) {
    return { id: token, label: token, metric: token, type: 'block', length: 7.5, width: 6, height: 3, color: '#c4b8a0' }
  }
  if (token === 'SOIC8' || token === 'TSSOP14' || token.startsWith('SOIC')) {
    return { id: token, label: token, metric: token, type: 'soic' }
  }
  if (token === 'QFN32' || token === 'DIP8') {
    return { id: token, label: token, metric: token, type: 'block', length: 5, width: 5, height: 1, color: '#1a1a1a' }
  }
  const headerPins = token.match(/^(\d+)x(\d+)$/i) ?? token.match(/^(\d+)PIN$/i)
  if (headerPins) {
    const pins = headerPins[2] ? Number(headerPins[1]) * Number(headerPins[2]) : Number(headerPins[1])
    return { id: token, label: token, metric: `${pins} pins`, type: 'header', pins }
  }
  return undefined
}

export function familyPreviewKind(familyId: string): PackageShape {
  switch (familyId) {
    case 'resistors':
      return chipShape(CHIP_SIZES[2]!, 'resistor')
    case 'capacitors':
      return chipShape(CHIP_SIZES[2]!, 'ceramic')
    case 'inductors':
      return chipShape(CHIP_SIZES[3]!, 'inductor')
    case 'diodes':
      return { id: 'SOD123', label: 'SOD123', metric: '', type: 'sod', length: 2.7, width: 1.6, height: 1.1 }
    case 'transistors':
      return { id: 'SOT23', label: 'SOT23', metric: '', type: 'sot23' }
    case 'ics':
      return { id: 'SOIC', label: 'SOIC', metric: '', type: 'soic' }
    case 'connectors':
      return { id: 'HDR', label: 'Header', metric: '', type: 'header', pins: 4 }
    default:
      return chipShape(CHIP_SIZES[2]!, 'resistor')
  }
}

export function boundingHeight(shape: PackageShape): number {
  switch (shape.type) {
    case 'chip':
      return shape.thickness
    case 'can':
      return shape.height
    case 'block':
    case 'tantalum':
    case 'power':
    case 'sod':
    case 'sma':
      return shape.height
    case 'sot23':
      return 1.1
    case 'to92':
      return 5.5
    case 'soic':
      return 1.75
    case 'header':
      return HEADER_HOUSING + HEADER_PIN_ABOVE
    case 'led-tht':
      return 0.3 + shape.diameter * 1.05
    default:
      return 1
  }
}

export function boundingWidth(shape: PackageShape): number {
  switch (shape.type) {
    case 'chip':
      return shape.length
    case 'can':
      return shape.diameter
    case 'block':
    case 'tantalum':
    case 'power':
    case 'sod':
    case 'sma':
      return shape.length
    case 'sot23':
      return 2.9
    case 'to92':
      return 4.2
    case 'soic':
      return 5.0
    case 'header':
      return shape.pins * HEADER_PITCH
    case 'led-tht':
      return shape.diameter
    default:
      return 2
  }
}

export function isChipLineup(shapes: PackageShape[]): boolean {
  return shapes.length > 0 && shapes.every((shape) => shape.type === 'chip')
}

/** Orbit distance for a package lineup. Chip-only rows use a tighter multiplier than tall cans. */
export function lineupCameraDistance(span: number, tallest: number, shapes: PackageShape[]): number {
  if (isChipLineup(shapes)) {
    return Math.max(span * 0.58, 2.8)
  }
  return Math.max(span * 1.15, tallest * 3.2, 8)
}

/** Homepage / family-card framing from the body's width and height. */
export function previewCameraDistance(shape: PackageShape): number {
  const width = boundingWidth(shape)
  const height = boundingHeight(shape)
  return Math.max(width * 1.05, height * 1.85, 2.8)
}

function fmt(value: number): string {
  return Number.isInteger(value) ? value.toFixed(1) : String(value)
}
