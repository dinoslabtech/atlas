import { CHIP_EIA, CHIP_SIZES, type ChipSize } from '@/seed/packages'

import { fmtMm, type ChipStyle, type PackageShape } from './types'

export function chipStyleForClass(key: string): ChipStyle {
  if (key === 'DL') return 'led'
  if (key === 'FB') return 'ferrite'
  if (key === 'RW') return 'wirewound'
  if (key === 'RS') return 'shunt'
  if (key.startsWith('L')) return 'inductor'
  if (key.startsWith('C')) return 'ceramic'
  return 'resistor'
}

export function chipShape(chip: ChipSize, style: ChipStyle, ledColor?: string): PackageShape {
  return {
    id: chip.eia,
    label: chip.eia,
    metric: `${fmtMm(chip.lengthMm)} × ${fmtMm(chip.widthMm)} × ${fmtMm(chip.thicknessMm)} mm`,
    type: 'chip',
    length: chip.lengthMm,
    width: chip.widthMm,
    thickness: chip.thicknessMm,
    style,
    ...(style === 'led' && ledColor ? { ledColor } : {}),
  }
}

export function chipsFromExamples(examples: string[], style: ChipStyle, ledColor?: string): PackageShape[] {
  const listed = CHIP_SIZES.filter((chip) => examples.includes(chip.eia))
  const chips = listed.length > 0 ? listed : CHIP_SIZES
  return chips.map((chip) => chipShape(chip, style, ledColor))
}

export function chipByEia(token: string, style: ChipStyle, ledColor?: string): PackageShape | undefined {
  if (!CHIP_EIA.has(token)) return undefined
  const chip = CHIP_SIZES.find((item) => item.eia === token)
  return chip ? chipShape(chip, style, ledColor) : undefined
}
