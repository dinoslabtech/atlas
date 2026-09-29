import type { ExampleValues, Family } from '@/seed/types'

export const STORAGE_KEY = 'atlas.taxonomy.v1'

export type Snapshot = {
  version: 1
  families: Family[]
  values: ExampleValues
}

function isSnapshot(value: unknown): value is Snapshot {
  if (!value || typeof value !== 'object') return false
  const record = value as Record<string, unknown>
  return record.version === 1 && Array.isArray(record.families) && typeof record.values === 'object'
}

export function loadSnapshot(): Snapshot | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    return isSnapshot(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function saveSnapshot(snapshot: Snapshot): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))
}

export function clearSnapshot(): void {
  localStorage.removeItem(STORAGE_KEY)
}
