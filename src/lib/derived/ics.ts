import type { DerivedFn } from './types'

export const icsDerived: DerivedFn = (values) => {
  const raw = values.pins?.trim() ?? ''
  const pins = Number(raw)
  if (!raw || !Number.isFinite(pins)) return []
  return [{ label: 'Pin count', value: String(pins) }]
}
