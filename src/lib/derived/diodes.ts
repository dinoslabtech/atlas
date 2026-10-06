import { formatSi, parseSi } from '@/lib/parse'

import type { DerivedFn, DerivedRow } from './types'

function parseVf(token: string | undefined): number | undefined {
  if (!token) return undefined
  const raw = token.trim()
  // parseSi uses R as a decimal mark; Vf tokens use V the same way (0V7, 3V3).
  const vForm = raw.match(/^(\d*)V(\d+)$/i)
  if (vForm) return parseSi(`${vForm[1] || '0'}.${vForm[2]}`)
  return parseSi(raw)
}

function powerDissipation(values: Record<string, string>): DerivedRow[] {
  const iF = parseSi(values.current)
  const vF = parseVf(values.vf)
  if (iF === undefined || vF === undefined) return []
  return [{ label: 'Pd', value: formatSi(iF * vF, 'W') }]
}

function izmax(values: Record<string, string>): DerivedRow[] {
  const p = parseSi(values.power)
  const vZ = parseSi(values.voltage)
  if (p === undefined || vZ === undefined || vZ === 0) return []
  return [{ label: 'Izmax', value: formatSi(p / vZ, 'A') }]
}

export const diodesDerived: Record<'DD' | 'DS' | 'DZ' | 'DL', DerivedFn> = {
  DD: (values) => powerDissipation(values),
  DS: (values) => powerDissipation(values),
  DZ: (values) => izmax(values),
  DL: (values) => powerDissipation(values),
}
