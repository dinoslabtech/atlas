export type ChipStyle = 'resistor' | 'ceramic' | 'inductor' | 'led' | 'wirewound' | 'shunt' | 'ferrite'

type Base = {
  id: string
  label: string
  metric: string
}

export type PackageShape =
  | (Base & {
      type: 'chip'
      length: number
      width: number
      thickness: number
      style: ChipStyle
      ledColor?: string
    })
  | (Base & {
      type: 'can'
      diameter: number
      height: number
      tht: boolean
      kind: 'electrolytic' | 'supercap'
    })
  | (Base & { type: 'block'; length: number; width: number; height: number; color: string })
  | (Base & { type: 'tantalum'; length: number; width: number; height: number })
  | (Base & { type: 'power'; length: number; width: number; height: number })
  | (Base & { type: 'common-mode'; length: number; width: number; height: number })
  | (Base & { type: 'sod'; length: number; width: number; height: number })
  | (Base & { type: 'sma'; length: number; width: number; height: number })
  | (Base & { type: 'film'; length: number; width: number; height: number; leadPitch: number })
  | (Base & { type: 'array'; length: number; width: number; thickness: number; count: number })
  | (Base & { type: 'sot23' })
  | (Base & { type: 'to92' })
  | (Base & {
      type: 'soic'
      pins: number
      length: number
      width: number
      height: number
      pitch: number
    })
  | (Base & {
      type: 'tssop'
      pins: number
      length: number
      width: number
      height: number
      pitch: number
    })
  | (Base & { type: 'qfn'; pins: number; length: number; width: number; height: number })
  | (Base & {
      type: 'dip'
      pins: number
      length: number
      width: number
      height: number
      pitch: number
    })
  | (Base & { type: 'header'; rows: number; cols: number; pitch: number })
  | (Base & { type: 'led-tht'; diameter: number; color: string })
  | (Base & { type: 'usbc' })
  | (Base & { type: 'rj45' })
  | (Base & { type: 'tb'; poles: number })

export type ShapeOptions = {
  familyId?: string
  ledColor?: string
  connectorType?: string
}

export const HEADER_PITCH = 2.54
export const HEADER_HOUSING = 2.54
export const HEADER_PIN_ABOVE = 5.0
export const HEADER_PIN_BELOW = 3.0

export function fmtMm(value: number): string {
  return Number.isInteger(value) ? value.toFixed(1) : String(value)
}
