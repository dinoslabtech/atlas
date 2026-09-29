import { formatSi, parseSi } from '@/lib/parse'

import type { DerivedRow } from './types'

function currentOf(values: Record<string, string>): number | undefined {
  return parseSi(values.isat) ?? parseSi(values.irms) ?? parseSi(values.irated)
}

export function derive(values: Record<string, string>, _ambientC: number): DerivedRow[] {
  const rows: DerivedRow[] = []
  const inductance = parseSi(values.inductance)
  const current = currentOf(values)
  const dcr = parseSi(values.dcr)

  if (inductance !== undefined && current !== undefined) {
    rows.push({ label: 'Energy', value: formatSi(0.5 * inductance * current * current, 'J') })
  }
  if (current !== undefined && dcr !== undefined) {
    rows.push({ label: 'Copper drop', value: formatSi(current * dcr, 'V') })
  }

  return rows
}
