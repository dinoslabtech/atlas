import { describe, expect, test } from 'bun:test'

import { seedFamilies } from '@/seed/taxonomy'
import { locationWithHash, parseHash } from './hash'

describe('parseHash', () => {
  test('empty hash is the homepage', () => {
    expect(parseHash('', seedFamilies)).toEqual({ screen: 'home' })
    expect(parseHash('#', seedFamilies)).toEqual({ screen: 'home' })
    expect(parseHash('#/', seedFamilies)).toEqual({ screen: 'home' })
  })

  test('family path opens that family on its first class', () => {
    expect(parseHash('#/resistors', seedFamilies)).toEqual({
      screen: 'family',
      familyId: 'resistors',
      classKey: 'RR',
    })
  })

  test('family and class path opens that class', () => {
    expect(parseHash('#/diodes/DL', seedFamilies)).toEqual({
      screen: 'family',
      familyId: 'diodes',
      classKey: 'DL',
    })
  })

  test('unknown family is the homepage', () => {
    expect(parseHash('#/nope', seedFamilies)).toEqual({ screen: 'home' })
  })
})

describe('locationWithHash', () => {
  test('keeps the query string so ?edit=1 survives navigation', () => {
    expect(locationWithHash('/', '?edit=1', { screen: 'home' })).toBe('/?edit=1#/')
    expect(
      locationWithHash('/', '?edit=1', { screen: 'family', familyId: 'resistors', classKey: 'RR' }),
    ).toBe('/?edit=1#/resistors/RR')
    expect(locationWithHash('/', '', { screen: 'home' })).toBe('/#/')
  })
})

