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

export function hashHref(route: Route): string {
  return route.screen === 'home' ? '#/' : `#/${route.familyId}/${route.classKey}`
}

export function locationWithHash(pathname: string, search: string, route: Route): string {
  return `${pathname}${search}${hashHref(route)}`
}

export function writeHash(route: Route): void {
  const hash = hashHref(route)
  if (window.location.hash === hash) return
  window.history.replaceState(null, '', locationWithHash(window.location.pathname, window.location.search, route))
}
