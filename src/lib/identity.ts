import type { FieldDef } from '@/seed/types'

export const MISSING = 'X'

export function fieldToken(value: string | undefined): string {
  const trimmed = value?.trim() ?? ''
  return trimmed.length > 0 ? trimmed : MISSING
}

export function formatId(key: string, values: string[]): string {
  if (values.length === 0) return key
  return [key, ...values.map(fieldToken)].join('-')
}

export function formatName(key: string, fields: Pick<FieldDef, 'kind'>[], values: string[]): string {
  const parts: string[] = [key]
  for (let i = 0; i < fields.length; i++) {
    const token = fieldToken(values[i])
    if (fields[i]?.kind === 'tolerance-plusminus' && parts.length > 0) {
      parts[parts.length - 1] = `${parts[parts.length - 1]}±${token}`
    } else {
      parts.push(token)
    }
  }
  return parts.join(' ')
}

export function identity(
  key: string,
  fields: Pick<FieldDef, 'kind'>[],
  values: string[],
): { key: string; id: string; name: string } {
  return {
    key,
    id: formatId(key, values),
    name: formatName(key, fields, values),
  }
}
