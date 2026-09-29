import type { FieldDef, FieldKind, PartClass } from './types'

export function field(id: string, label: string, examples: string[], kind?: FieldKind): FieldDef {
  return { id, label, examples, ...(kind ? { kind } : {}) }
}

export function partClass(key: string, name: string, fields: FieldDef[]): PartClass {
  return { key, name, fields }
}

export const chip = 'chip-package' as const
export const plusMinus = 'tolerance-plusminus' as const
