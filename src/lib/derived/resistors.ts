import { formatSi, parsePpm, parseSi } from '@/lib/parse'

const DERATE_FULL_C = 70
const DERATE_ZERO_C = 155
const TCR_REF_C = 25

function pushFinite(
  rows: { label: string; value: string }[],
  label: string,
  value: number,
  unit: string,
) {
  if (!Number.isFinite(value)) return
  rows.push({ label, value: formatSi(value, unit) })
}

export function derive(
  values: Record<string, string>,
  ambientC: number,
): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = []
  const r = parseSi(values.resistance)
  const p = parseSi(values.power)
  const vmax = parseSi(values.voltage)
  const tcr = parsePpm(values.tcr)

  if (r !== undefined && p !== undefined) {
    pushFinite(rows, 'Rated current', Math.sqrt(p / r), 'A')
    const vFromPower = Math.sqrt(p * r)
    pushFinite(rows, 'Voltage from power', vFromPower, 'V')
    if (vmax !== undefined) {
      pushFinite(rows, 'Rated voltage', Math.min(vmax, vFromPower), 'V')
    }
  }

  if (p !== undefined && ambientC > DERATE_FULL_C) {
    const factor = Math.max(0, (DERATE_ZERO_C - ambientC) / (DERATE_ZERO_C - DERATE_FULL_C))
    pushFinite(rows, 'Derated power', p * factor, 'W')
  }

  if (r !== undefined && tcr !== undefined) {
    pushFinite(rows, 'Resistance at ambient', r * (1 + tcr * (ambientC - TCR_REF_C)), 'R')
  }

  return rows
}
