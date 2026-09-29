import type { DerivedFn } from './types'

export const derivedConnectors: DerivedFn = (values) => {
  const match = values.pitch?.trim().match(/^([+-]?\d+(?:\.\d+)?)mm$/i)
  if (!match || !/\d/.test(values.pins ?? '')) return []
  const pitchM = Number(match[1]) * 1e-3
  if (!Number.isFinite(pitchM)) return []
  return [{ label: 'Pitch', value: `${pitchM} m` }]
}
