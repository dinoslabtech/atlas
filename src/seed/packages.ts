export type ChipSize = {
  eia: string
  /** Body length between terminations, millimetres (the first EIA digit pair). */
  lengthMm: number
  /** Body width, millimetres (the second EIA digit pair). */
  widthMm: number
  /** Typical molded thickness, millimetres. */
  thicknessMm: number
}

export const CHIP_SIZES: ChipSize[] = [
  { eia: '0201', lengthMm: 0.6, widthMm: 0.3, thicknessMm: 0.23 },
  { eia: '0402', lengthMm: 1.0, widthMm: 0.5, thicknessMm: 0.35 },
  { eia: '0603', lengthMm: 1.6, widthMm: 0.8, thicknessMm: 0.45 },
  { eia: '0805', lengthMm: 2.0, widthMm: 1.25, thicknessMm: 0.5 },
  { eia: '1206', lengthMm: 3.2, widthMm: 1.6, thicknessMm: 0.55 },
  { eia: '1210', lengthMm: 3.2, widthMm: 2.5, thicknessMm: 0.7 },
  { eia: '1808', lengthMm: 4.5, widthMm: 2.0, thicknessMm: 0.7 },
  { eia: '1812', lengthMm: 4.5, widthMm: 3.2, thicknessMm: 1.0 },
  { eia: '2010', lengthMm: 5.0, widthMm: 2.5, thicknessMm: 0.6 },
  { eia: '2512', lengthMm: 6.4, widthMm: 3.2, thicknessMm: 0.65 },
]

export const CHIP_EIA = new Set(CHIP_SIZES.map((chip) => chip.eia))
