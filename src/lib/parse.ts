const PREFIX: [string, number][] = [
  ['T', 1e12],
  ['G', 1e9],
  ['M', 1e6],
  ['k', 1e3],
  ['K', 1e3],
  ['m', 1e-3],
  ['u', 1e-6],
  ['n', 1e-9],
  ['p', 1e-12],
]

export function parseSi(token: string | undefined): number | undefined {
  if (!token) return undefined
  const raw = token.trim()
  if (!raw || raw === 'X') return undefined
  const rForm = raw.match(/^(\d*)R(\d*)$/i)
  if (rForm) {
    const whole = rForm[1] || '0'
    const frac = rForm[2] || '0'
    return Number(`${whole}.${frac}`)
  }
  const vForm = raw.match(/^(\d*)V(\d+)$/i)
  if (vForm) {
    const whole = vForm[1] || '0'
    return Number(`${whole}.${vForm[2]}`)
  }
  const infix = raw.match(/^(\d+)([munp])(\d+)$/)
  if (infix) {
    const scale = PREFIX.find(([letter]) => letter === infix[2])?.[1] ?? 1
    return Number(`${infix[1]}.${infix[3]}`) * scale
  }
  const m = raw.match(/^([+-]?\d+(?:\.\d+)?)([TGMKkmunp])?(.*)?$/)
  if (!m) return undefined
  const value = Number(m[1])
  if (!Number.isFinite(value)) return undefined
  const prefix = m[2]
  const scale = prefix ? PREFIX.find(([letter]) => letter === prefix)?.[1] ?? 1 : 1
  return value * scale
}

export function parsePercent(token: string | undefined): number | undefined {
  if (!token) return undefined
  const raw = token.trim().replace(/%$/, '')
  if (!raw || raw === 'X') return undefined
  const value = Number(raw)
  return Number.isFinite(value) ? value / 100 : undefined
}

export function parsePpm(token: string | undefined): number | undefined {
  if (!token) return undefined
  const raw = token.trim().replace(/ppm$/i, '')
  if (!raw || raw === 'X') return undefined
  const value = Number(raw)
  return Number.isFinite(value) ? value * 1e-6 : undefined
}

export function parseCelsius(token: string | undefined): number | undefined {
  if (token === undefined) return undefined
  const raw = String(token).trim().replace(/C$/i, '')
  if (!raw || raw === 'X') return undefined
  const value = Number(raw)
  return Number.isFinite(value) ? value : undefined
}

export function formatSi(value: number, unit: string, digits = 3): string {
  const abs = Math.abs(value)
  const pick =
    abs >= 1e12
      ? ([1e12, 'T'] as const)
      : abs >= 1e9
        ? ([1e9, 'G'] as const)
        : abs >= 1e6
          ? ([1e6, 'M'] as const)
          : abs >= 1e3
            ? ([1e3, 'k'] as const)
            : abs >= 1
              ? ([1, ''] as const)
              : abs >= 1e-3
                ? ([1e-3, 'm'] as const)
                : abs >= 1e-6
                  ? ([1e-6, 'u'] as const)
                  : abs >= 1e-9
                    ? ([1e-9, 'n'] as const)
                    : ([1e-12, 'p'] as const)
  const scaled = value / pick[0]
  const text = Number(scaled.toPrecision(digits)).toString()
  return `${text}${pick[1]}${unit}`
}
