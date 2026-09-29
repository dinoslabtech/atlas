import type { Family } from '@/seed/types'
import { findClassInFamily, findFamily } from './taxonomy'

export type Route =
  | { screen: 'home' }
  | { screen: 'family'; familyId: string; classKey: string }

export function parseHash(hash: string, families: Family[]): Route {
  const path = hash.replace(/^#\/?/, '').replace(/\/+$/, '')
  if (!path) return { screen: 'home' }
  const [familyId, classKey] = path.split('/')
  const family = familyId ? findFamily(families, familyId) : undefined
  if (!family) return { screen: 'home' }
  const part = (classKey && findClassInFamily(family, classKey)) || family.classes[0]
  return { screen: 'family', familyId: family.id, classKey: part?.key ?? '' }
}

export function writeHash(route: Route): void {
  const next = route.screen === 'home' ? '#/' : `#/${route.familyId}/${route.classKey}`
  if (window.location.hash !== next) {
    window.history.replaceState(null, '', next)
  }
}
