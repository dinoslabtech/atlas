export type ChipSize = {
  eia: string
  widthMm: number
  heightMm: number
}

export const CHIP_SIZES: ChipSize[] = [
  { eia: '0201', widthMm: 0.6, heightMm: 0.3 },
  { eia: '0402', widthMm: 1.0, heightMm: 0.5 },
  { eia: '0603', widthMm: 1.6, heightMm: 0.8 },
  { eia: '0805', widthMm: 2.0, heightMm: 1.25 },
  { eia: '1206', widthMm: 3.2, heightMm: 1.6 },
  { eia: '1210', widthMm: 3.2, heightMm: 2.5 },
  { eia: '1808', widthMm: 4.5, heightMm: 2.0 },
  { eia: '1812', widthMm: 4.5, heightMm: 3.2 },
  { eia: '2010', widthMm: 5.0, heightMm: 2.5 },
  { eia: '2512', widthMm: 6.4, heightMm: 3.2 },
]

export const CHIP_EIA = new Set(CHIP_SIZES.map((chip) => chip.eia))
