import { DEFAULT_CLASS_KEY, DEFAULT_FAMILY_ID } from '@/seed/taxonomy'
import type { Family } from '@/seed/types'
import { findClassInFamily, findFamily } from './taxonomy'

export type Route = {
  familyId: string
  classKey: string
}

export function parseHash(hash: string, families: Family[]): Route {
  const path = hash.replace(/^#\/?/, '')
  const [familyId, classKey] = path.split('/')
  const family = (familyId && findFamily(families, familyId)) || findFamily(families, DEFAULT_FAMILY_ID)
  if (!family) {
    return { familyId: DEFAULT_FAMILY_ID, classKey: DEFAULT_CLASS_KEY }
  }
  const part = (classKey && findClassInFamily(family, classKey)) || family.classes[0]
  return {
    familyId: family.id,
    classKey: part?.key ?? DEFAULT_CLASS_KEY,
  }
}

export function writeHash(route: Route): void {
  const next = `#/${route.familyId}/${route.classKey}`
  if (window.location.hash !== next) {
    window.history.replaceState(null, '', next)
  }
}
