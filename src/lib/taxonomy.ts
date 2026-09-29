import type { Family, PartClass } from '@/seed/types'

export function cloneTaxonomy<T>(value: T): T {
  return structuredClone(value)
}

export function findFamily(families: Family[], id: string): Family | undefined {
  return families.find((family) => family.id === id)
}

export function findClassInFamily(family: Family, key: string): PartClass | undefined {
  return family.classes.find((item) => item.key === key)
}

export function findClass(families: Family[], key: string): { family: Family; part: PartClass } | undefined {
  for (const family of families) {
    const part = findClassInFamily(family, key)
    if (part) return { family, part }
  }
  return undefined
}

export function valuesInOrder(part: PartClass, values: Record<string, string> | undefined): string[] {
  return part.fields.map((field) => values?.[field.id] ?? '')
}

export function familyIsSpecified(family: Family): boolean {
  return family.classes.some((item) => item.fields.length > 0)
}

export function slugify(name: string): string {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return slug || 'family'
}

export function uniqueId(base: string, taken: Set<string>): string {
  if (!taken.has(base)) return base
  let n = 2
  while (taken.has(`${base}-${n}`)) n += 1
  return `${base}-${n}`
}


