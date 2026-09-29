import { formatSi, parseSi } from '@/lib/parse'

import type { DerivedFn, DerivedRow } from './types'

export const derivedTransistors: DerivedFn = (values, ambientC) => {
  void ambientC
  const rows: DerivedRow[] = []
  const current = parseSi(values.current)
  const voltage = parseSi(values.voltage)
  const power = parseSi(values.power)
  const rds = parseSi(values.rds)

  if (current !== undefined && voltage !== undefined && power !== undefined) {
    const estimate = current * voltage
    rows.push({ label: 'Dissipation estimate', value: formatSi(estimate, 'W') })
    rows.push({ label: 'Power rating', value: formatSi(power, 'W') })
    rows.push({ label: 'Estimate vs rating', value: estimate > power ? 'over' : 'ok' })
  }

  if (current !== undefined && rds !== undefined) {
    rows.push({ label: 'Conduction loss', value: formatSi(current * current * rds, 'W') })
  }

  return rows
}
